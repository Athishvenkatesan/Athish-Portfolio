/**
 * Dynamic answers — built from the project data instead of fixed templates:
 *   • matchProjects(): "tell me about the Publishing Hub" → the right project(s)
 *   • projectsUsing():  "which projects used Power Automate?" → stack lookup
 * Project names are matched on title words that identify a project (words
 * shared by most projects, like "system" or "agent", are ignored).
 */
import { projects, type Project } from '@/data/projects'

const STOP = new Set([
  'system', 'project', 'application', 'agent', 'video', 'management', 'assessment', 'power', 'report',
  'explainer', 'executive', 'readiness', 'console', 'pipeline', 'the', 'and', 'for', 'with',
])

const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
const keyWords = (p: Project) => [...new Set(words(p.title).filter((w) => w.length >= 3 && !STOP.has(w)))]

/** Projects whose distinctive title words appear in the message (best score only). */
export function matchProjects(message: string): Project[] {
  const said = new Set(words(message))
  const scored = projects
    .map((p) => ({ p, score: keyWords(p).filter((w) => said.has(w)).length }))
    .filter((x) => x.score > 0)
  const best = Math.max(0, ...scored.map((x) => x.score))
  return scored.filter((x) => x.score === best).map((x) => x.p)
}

const ASKING = /\b(which|what|where|who)\b.*\b(project|app|built|used|using|worked)|\b(used|using|built with|worked with)\b/

/** "Which projects used React?" → { tech, list }, or null if not that kind of question. */
export function projectsUsing(message: string): { tech: string; list: Project[] } | null {
  const text = message.toLowerCase()
  if (!ASKING.test(text)) return null
  const techs = [...new Set(projects.flatMap((p) => p.stack))]
    .filter((t) => t.length >= 3 && new RegExp(`(^|[^a-z0-9])${t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(text))
    .sort((a, b) => b.length - a.length)
  const tech = techs[0]
  if (!tech) return null
  const t = tech.toLowerCase()
  return { tech, list: projects.filter((p) => p.stack.some((s) => s.toLowerCase() === t || s.toLowerCase().startsWith(`${t} `))) }
}

export function projectBrief(p: Project): string {
  return `**${p.title}** (${p.category}, ${p.period})\n${p.tagline}.\n\n${p.summary}\n\nBuilt with: ${p.stack.join(', ')}.`
}

export function projectDeep(p: Project): string {
  const bullets = (title: string, xs?: string[]) => (xs?.length ? `\n\n**${title}**\n${xs.map((x) => `• ${x}`).join('\n')}` : '')
  return `More on **${p.title}**:${bullets('Highlights', p.highlights)}${bullets('What Athish did', p.ownership)}${bullets('Outcomes', p.outcomes)}`
}
