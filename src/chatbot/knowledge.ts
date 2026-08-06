/**
 * Chatbot knowledge base — intents matched by keyword against resume data.
 * Add an intent = append one object. Answers can be static strings or
 * functions that build a reply from the live data modules.
 *
 * `chart` opts an intent into an inline visualization in the chat bubble
 * (see ChatBot.vue) — kept to the two forms already used on /analysis so the
 * chat and the full report page read as one consistent system.
 * `followUps` become the suggestion chips shown after that reply, so the
 * conversation has an obvious next step instead of resetting to the same
 * five starter prompts every time.
 */
import { profile, whatsappLink } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { projects } from '@/data/projects'
import { experience, education, certifications, languages } from '@/data/experience'

export type ChatChartKind = 'skills-radar' | 'top-skills'

export interface Intent {
  id: string
  keywords: string[]
  answer: () => string
  chart?: ChatChartKind
  followUps?: string[]
}

export const suggestions = [
  'What are your skills?',
  'Give me a report',
  'Tell me about the D2D project',
  'How can I contact you?',
  'Hire me',
]

export const greeting = `👋 Hi! I'm Athish's portfolio assistant. Ask me about his **skills**, **projects** (like the React-based D2D system), **experience**, or how to **get in touch** — I can even pull up a quick chart.`

export const fallback = `I'm a lightweight assistant 😊 — try asking about **skills**, **projects**, **experience**, **education**, **certifications**, or **contact**. You can also message Athish directly on [WhatsApp](${whatsappLink()}).`

export const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    answer: () => greeting,
  },
  {
    id: 'skills',
    keywords: [
      'skill', 'tech', 'stack', 'technolog', 'know', 'good at', 'expertise', 'react', 'power platform',
      'proficient', 'capable', 'strength', 'strong at', 'familiar with', 'toolkit', 'what can you do',
    ],
    chart: 'skills-radar',
    answer: () => {
      const lines = skillGroups
        .map((g) => `• **${g.title}** — ${g.skills.map((s) => s.name).join(', ')}`)
        .join('\n')
      return `Athish works across the full stack. Here's the breakdown:\n\n${lines}`
    },
    followUps: ["What's your best skill?", 'Give me a report', 'Tell me about a project'],
  },
  {
    id: 'top-skills',
    keywords: ['best skill', 'strongest skill', 'top skill', 'favorite skill', 'master', 'rank your skills'],
    chart: 'top-skills',
    answer: () => {
      const top = skillGroups
        .flatMap((g) => g.skills)
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
        .map((s) => `**${s.name}** (${s.level}%)`)
        .join(', ')
      return `Ranked by self-rated proficiency, Athish's top skills are ${top}. Here's the full ranked list:`
    },
    followUps: ['What are your skills?', 'Give me a report', 'Tell me about your projects'],
  },
  {
    id: 'report',
    keywords: [
      'report', 'analysis', 'summary', 'self assessment', 'rate yourself', 'overview of you', 'profile summary',
      'sum up', 'tldr',
    ],
    chart: 'skills-radar',
    answer: () => {
      const all = skillGroups.flatMap((g) => g.skills)
      const avg = Math.round(all.reduce((sum, s) => sum + s.level, 0) / all.length)
      return `Here's the short version: ${profile.experienceYears} years of experience, ${projects.length} projects shipped, and an average self-rated skill level of ${avg}%. The shape below shows strength by skill category — open the full **/analysis** page for the ranked skill list and a project timeline too.`
    },
    followUps: ['What are your skills?', 'Tell me about your projects', 'How can I contact you?'],
  },
  {
    id: 'd2d',
    keywords: ['d2d', 'demand', 'delivery', 'dewa', 'case study', 'featured'],
    answer: () => {
      const d2d = projects.find((p) => p.id === 'd2d')!
      return `**${d2d.title}** — ${d2d.tagline}.\n\n${d2d.summary}\n\nBuilt with: ${d2d.stack.join(', ')}.\n\nIt's the featured React + TypeScript case study — open the Projects section for the full breakdown.`
    },
    followUps: ['Tell me about your projects', 'What are your skills?', 'How can I contact you?'],
  },
  {
    id: 'projects',
    keywords: [
      'project', 'work', 'built', 'portfolio', 'app', 'agent', 'copilot', 'case studies', 'shipped', 'examples',
      'showcase', 'what have you made',
    ],
    answer: () => {
      const list = projects.map((p) => `• **${p.title}** (${p.category}) — ${p.tagline}`).join('\n')
      return `Here are Athish's projects:\n\n${list}\n\nThe **D2D system** is the featured React engineering case study.`
    },
    followUps: ['Tell me about the D2D project', 'Give me a report', 'What are your skills?'],
  },
  {
    id: 'experience',
    keywords: ['experience', 'job', 'career', 'worked', 'role', 'company', 'years', 'background', 'history', 'employment'],
    answer: () => {
      const list = experience
        .map((e) => `• **${e.role}** at ${e.org} (${e.period})`)
        .join('\n')
      return `Athish has ${profile.experienceYears} years of professional experience:\n\n${list}`
    },
    followUps: ['What are your skills?', 'Are you available for hire?', 'Where are you based?'],
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'college', 'study', 'studied', 'university', 'cgpa', 'msc', 'bsc'],
    answer: () => {
      const list = education.map((e) => `• **${e.degree}** — ${e.institution} (${e.score})`).join('\n')
      return `Education:\n\n${list}`
    },
    followUps: ['What certifications do you have?', 'What are your skills?'],
  },
  {
    id: 'certifications',
    keywords: ['certif', 'course', 'credential', 'achievement', 'award', 'prize'],
    answer: () => `Certifications:\n\n${certifications.map((c) => `• ${c}`).join('\n')}`,
    followUps: ['What are your skills?', 'Tell me about your education'],
  },
  {
    id: 'location',
    keywords: ['where are you', 'based', 'location', 'live', 'city', 'dubai', 'uae', 'timezone', 'time zone'],
    answer: () => `Athish is based in ${profile.location}.`,
    followUps: ['Are you available for hire?', 'How can I contact you?'],
  },
  {
    id: 'languages',
    keywords: ['language', 'speak', 'tamil', 'multilingual'],
    answer: () => `Athish speaks ${languages.join(' and ')}.`,
    followUps: ['Where are you based?', 'What are your skills?'],
  },
  {
    id: 'contact',
    keywords: [
      'contact', 'reach', 'email', 'phone', 'connect', 'linkedin', 'message', 'whatsapp', 'github', 'source', 'code',
      'email me', 'get in touch', 'talk', 'call',
    ],
    answer: () =>
      `You can reach Athish here:\n\n• 📧 Email: ${profile.email}\n• 📱 WhatsApp: [chat now](${whatsappLink()})\n• 💼 LinkedIn: ${profile.linkedin}\n• 🐙 GitHub: ${profile.github}\n• ☎️ Phone: ${profile.phoneDisplay} / ${profile.phoneDisplaySecondary}`,
    followUps: ['Hire me', 'What are your skills?'],
  },
  {
    id: 'hire',
    keywords: [
      'hire', 'available', 'freelance', 'opportunity', 'recruit', 'open to', 'looking for', 'job offer', 'position',
      'engage', 'work with you',
    ],
    answer: () =>
      `Athish is open to opportunities! He brings ${profile.experienceYears} years across React/TypeScript front-end and Power Platform automation.\n\nThe fastest way to start a conversation is [WhatsApp](${whatsappLink()}) or email ${profile.email}.`,
    followUps: ['How can I contact you?', 'Give me a report'],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice'],
    answer: () => `You're welcome! 🙌 Feel free to reach out to Athish on [WhatsApp](${whatsappLink()}) anytime.`,
  },
]
