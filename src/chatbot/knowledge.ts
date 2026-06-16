/**
 * Chatbot knowledge base — intents matched by keyword against resume data.
 * Add an intent = append one object. Answers can be static strings or
 * functions that build a reply from the live data modules.
 */
import { profile, whatsappLink } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { projects } from '@/data/projects'
import { experience, education, certifications } from '@/data/experience'

export interface Intent {
  id: string
  keywords: string[]
  answer: () => string
}

export const suggestions = [
  'What are your skills?',
  'Tell me about the D2D project',
  'What experience do you have?',
  'How can I contact you?',
  'Hire me',
]

export const greeting = `👋 Hi! I'm Athish's portfolio assistant. Ask me about his **skills**, **projects** (like the React-based D2D system), **experience**, or how to **get in touch**.`

export const fallback = `I'm a lightweight assistant 😊 — try asking about **skills**, **projects**, **experience**, **education**, **certifications**, or **contact**. You can also message Athish directly on [WhatsApp](${whatsappLink()}).`

export const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'greetings'],
    answer: () => greeting,
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'stack', 'technolog', 'know', 'good at', 'expertise', 'react', 'power platform'],
    answer: () => {
      const lines = skillGroups
        .map((g) => `• **${g.title}** — ${g.skills.map((s) => s.name).join(', ')}`)
        .join('\n')
      return `Athish works across the full stack. Here's the breakdown:\n\n${lines}`
    },
  },
  {
    id: 'd2d',
    keywords: ['d2d', 'demand', 'delivery', 'dewa', 'case study', 'featured'],
    answer: () => {
      const d2d = projects.find((p) => p.id === 'd2d')!
      return `**${d2d.title}** — ${d2d.tagline}.\n\n${d2d.summary}\n\nBuilt with: ${d2d.stack.join(', ')}.\n\nIt's the featured React + TypeScript case study — open the Projects section for the full breakdown.`
    },
  },
  {
    id: 'projects',
    keywords: ['project', 'work', 'built', 'portfolio', 'app', 'agent', 'copilot'],
    answer: () => {
      const list = projects.map((p) => `• **${p.title}** (${p.category}) — ${p.tagline}`).join('\n')
      return `Here are Athish's projects:\n\n${list}\n\nThe **D2D system** is the featured React engineering case study.`
    },
  },
  {
    id: 'experience',
    keywords: ['experience', 'job', 'career', 'worked', 'role', 'company', 'years'],
    answer: () => {
      const list = experience
        .map((e) => `• **${e.role}** at ${e.org} (${e.period})`)
        .join('\n')
      return `Athish has ${profile.experienceYears} years of professional experience:\n\n${list}`
    },
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'college', 'study', 'studied', 'university', 'cgpa', 'msc', 'bsc'],
    answer: () => {
      const list = education.map((e) => `• **${e.degree}** — ${e.institution} (${e.score})`).join('\n')
      return `Education:\n\n${list}`
    },
  },
  {
    id: 'certifications',
    keywords: ['certif', 'course', 'credential', 'achievement', 'award', 'prize'],
    answer: () => `Certifications:\n\n${certifications.map((c) => `• ${c}`).join('\n')}`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'connect', 'linkedin', 'message', 'whatsapp'],
    answer: () =>
      `You can reach Athish here:\n\n• 📧 Email: ${profile.email}\n• 📱 WhatsApp: [chat now](${whatsappLink()})\n• 💼 LinkedIn: ${profile.linkedin}\n• ☎️ Phone: ${profile.phoneDisplay}`,
  },
  {
    id: 'hire',
    keywords: ['hire', 'available', 'freelance', 'opportunity', 'recruit', 'open to'],
    answer: () =>
      `Athish is open to opportunities! He brings ${profile.experienceYears} years across React/TypeScript front-end and Power Platform automation.\n\nThe fastest way to start a conversation is [WhatsApp](${whatsappLink()}) or email ${profile.email}.`,
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice'],
    answer: () => `You're welcome! 🙌 Feel free to reach out to Athish on [WhatsApp](${whatsappLink()}) anytime.`,
  },
]
