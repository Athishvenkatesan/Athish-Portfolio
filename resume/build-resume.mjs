/**
 * Builds public/AthishV-Resume.pdf from the same data files the portfolio uses
 * (profile, experience, certifications, projects) so the two never drift apart.
 *
 *   node resume/build-resume.mjs
 *
 * Needs Google Chrome (headless print-to-PDF). Output HTML: resume/resume.html
 */
import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tmp = path.join(root, 'resume', '.build')
mkdirSync(tmp, { recursive: true })

const entry = path.join(tmp, 'entry.ts')
writeFileSync(
  entry,
  `export * from '${root}/src/data/profile'
export * from '${root}/src/data/experience'
export * from '${root}/src/data/certifications'
export * from '${root}/src/data/projects'`,
)
const out = path.join(tmp, 'data.mjs')
await build({ entryPoints: [entry], bundle: true, format: 'esm', outfile: out, alias: { '@': path.join(root, 'src') }, logLevel: 'error' })
const d = await import(pathToFileURL(out).href)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const skills = {
  'Microsoft Power Platform': ['Power Apps (incl. Code Apps)', 'Power Automate', 'Copilot Studio', 'SharePoint', 'Dataverse', 'Power Pages', 'Power BI'],
  'Microsoft Azure': ['Blob Storage', 'Intelligent document scanning', 'Custom document models', 'Key Vault', 'Resource Groups', 'Function Apps', 'Custom connectors'],
  'Local AI & LLMs': ['Ollama', 'Qwen2.5-VL vision model', 'Qwen2.5 text model', 'Prompt engineering'],
  'Front-End & Integration': ['React 19', 'TypeScript', 'Vite', 'Vue 3', 'Dataverse Web API', 'REST APIs', 'Git'],
  'AI & Machine Learning': ['Agentic AI (LangGraph)', 'Python', 'Machine Learning', 'TensorFlow & Keras', 'Data analysis'],
  'Other': ['FastAPI', 'Remotion video', 'UI / UX design', 'WordPress'],
}

const certs = d.certificationList.map((c) => {
  const when = c.date ? ` (${c.date})` : ''
  const short = c.title.startsWith('MongoDB University') ? 'MongoDB University — 12 courses' : c.title
  return `${short}${when}`
})

const order = [...d.projects].sort((a, b) => {
  if (a.id === 'd2d') return -1
  if (b.id === 'd2d') return 1
  return b.periodStart.localeCompare(a.periodStart)
})

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Athish V — Resume</title>
<style>
@page { size: A4; margin: 12mm 12mm 12mm 12mm; }
* { box-sizing: border-box; }
body { margin: 0; font: 9.6pt/1.34 'Times New Roman', Times, serif; color: #1a1a1a; }
header { text-align: center; border-bottom: 1.5px solid #1a1a1a; padding-bottom: 6px; margin-bottom: 10px; }
h1 { margin: 0; font-size: 24pt; letter-spacing: 7px; font-weight: 400; }
.role { font-size: 9.5pt; font-weight: 700; letter-spacing: 1.5px; margin-top: 2px; }
.wrap { display: grid; grid-template-columns: 62mm 1fr; gap: 0 9mm; }
h2 { font-size: 12pt; margin: 11px 0 4px; padding-bottom: 2px; border-bottom: 0.75px solid #555; }
aside h2:first-child, main h2:first-child { margin-top: 0; }
ul { margin: 2px 0 4px; padding-left: 14px; }
li { margin: 1px 0; }
aside ul { padding-left: 12px; font-size: 8.8pt; }
.sk { font-weight: 700; font-size: 9pt; margin-top: 5px; }
.small { font-size: 8.8pt; color: #333; }
.item { margin-bottom: 5px; break-inside: avoid; }
.item h3 { margin: 0; font-size: 9.8pt; display: flex; justify-content: space-between; gap: 8px; }
.item h3 span { font-weight: 400; font-style: italic; white-space: nowrap; font-size: 9pt; }
.org { font-style: italic; color: #333; }
.tags { font-size: 8.4pt; color: #444; }
.contact .phones { font-size: 7.4pt; white-space: nowrap; }
.contact div { margin: 1px 0; word-break: break-all; font-size: 8.8pt; }
a { color: inherit; text-decoration: none; }
p { margin: 2px 0; }
</style></head><body>
<header><h1>ATHISH V</h1><div class="role">AI ENGINEER</div></header>
<div class="wrap">
<aside>
  <h2>Contact</h2>
  <div class="contact">
    <div class="phones">${esc(d.profile.phoneDisplaySecondary)} (UAE) · ${esc(d.profile.phoneDisplay)} (India)</div>
    <div>${esc(d.profile.email)}</div>
    <div>linkedin.com/in/athish-venkatesan</div>
    <div>github.com/Athishvenkatesan</div>
    <div>${esc(d.profile.location)}</div>
  </div>
  <h2>Education</h2>
  ${d.education.map((e) => `<div class="item"><strong>${esc(e.degree)}</strong><br>${esc(e.institution)}<br><em class="small">${esc(e.score)}</em></div>`).join('')}
  <h2>Languages</h2>
  <ul>${d.languages.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
  <h2>Skills</h2>
  ${Object.entries(skills).map(([k, v]) => `<div class="sk">${esc(k)}</div><p class="small">${esc(v.join(' · '))}</p>`).join('')}
  <h2>Certifications</h2>
  <ul>${certs.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
</aside>
<main>
  <h2>Career Objective</h2>
  <p>${esc(d.profile.about)}</p>
  <h2>Experience</h2>
  ${d.experience.map((x) => `<div class="item"><h3>${esc(x.role)}<span>${esc(x.period)}</span></h3><div class="org">${esc(x.org)}</div><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}
  <h2>Achievements &amp; Awards</h2>
  <ul>${d.achievements.map((a) => `<li><strong>${esc(a.rank)} prize — ${esc(a.title)}.</strong> ${esc(a.detail)}</li>`).join('')}</ul>
</main></div>
<section class="projects"><h2>Projects</h2>
  ${order.map((p) => `<div class="item"><h3>${esc(p.title)}<span>${esc(p.period.replace('Ducont Systems · ', ''))}</span></h3><p>${esc(p.summary)}</p><div class="tags"><strong>Stack:</strong> ${esc(p.stack.join(', '))}</div></div>`).join('')}
</section></body></html>`

const htmlPath = path.join(root, 'resume', 'resume.html')
writeFileSync(htmlPath, html)
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${path.join(root, 'public', 'AthishV-Resume.pdf')}`, pathToFileURL(htmlPath).href], { stdio: 'ignore' })
console.log('Resume written to public/AthishV-Resume.pdf')
