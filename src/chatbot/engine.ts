/**
 * Chatbot engine — scored keyword intents plus a few "smart" layers:
 *   1. remembers the visitor's name and the last project discussed
 *   2. answers about a named project, or "which projects used <tech>?"
 *   3. "tell me more" drills into the last project
 *
 * `askBot()` is the single seam for a future real-AI upgrade: replace its body
 * with a fetch to a serverless endpoint and nothing else needs to change.
 */
import { intents, fallback, suggestions, getGreeting, type ChatChartKind, type BotAction } from './knowledge'
import { matchProjects, projectsUsing, projectBrief, projectDeep } from './dynamic'
import { projects, type Project } from '@/data/projects'

export interface BotReply {
  text: string
  intent: string
  chart?: ChatChartKind
  followUps: string[]
  actions?: BotAction[]
}

const memory: { name?: string; last?: Project } = {}

export function resetMemory() {
  memory.name = undefined
  memory.last = undefined
}
export const rememberedName = () => memory.name

const normalize = (input: string) => input.toLowerCase().replace(/[^\w\s]/g, ' ')

/** Returns the best-matching intent by keyword hit count, or null. */
function matchIntent(input: string) {
  const text = `${normalize(input)} `
  let best: { score: number; intent: (typeof intents)[number] } | null = null
  for (const intent of intents) {
    let score = 0
    for (const kw of intent.keywords) if (text.includes(kw)) score += kw.length // longer keywords weigh more
    if (score > 0 && (!best || score > best.score)) best = { score, intent }
  }
  return best?.intent ?? null
}

const NAME = /\b(?:my name is|call me|i am called)\s+([a-z]{2,20})\b/i
const MORE = /^(?:more|tell me more|more details?|go on|elaborate|details?|what else)(?: about (?:it|that|this))?\??$/

const projectActions = (p: Project): BotAction[] => [
  { label: 'Open case study', to: `/projects/${p.id}` },
  ...(p.repo ? [{ label: 'Source code', href: p.repo }] : []),
]

function projectReply(p: Project, text: string, followUps: string[]): BotReply {
  memory.last = p
  return { text, intent: `project:${p.id}`, followUps, actions: projectActions(p) }
}

function smartReply(message: string): BotReply | null {
  const lower = message.trim().toLowerCase()

  const nameHit = message.match(NAME)
  if (nameHit) {
    memory.name = nameHit[1][0].toUpperCase() + nameHit[1].slice(1).toLowerCase()
    return { text: `Nice to meet you, **${memory.name}**! 😊 What would you like to know about Athish?`, intent: 'name', followUps: suggestions }
  }

  if (memory.last && MORE.test(lower)) {
    const p = memory.last
    return projectReply(p, projectDeep(p), ['Which projects used React?', 'Tell me about your projects', 'Hire me'])
  }

  const using = projectsUsing(message)
  if (using) {
    const list = using.list.map((p) => `• **${p.title}** — ${p.tagline}`).join('\n')
    return {
      text: `**${using.tech}** shows up in ${using.list.length} project${using.list.length === 1 ? '' : 's'}:\n\n${list}`,
      intent: 'tech',
      followUps: using.list.slice(0, 2).map((p) => `Tell me about ${p.title}`).concat('What are your skills?'),
      actions: [{ label: 'Open Projects', section: 'projects' }],
    }
  }

  const found = matchProjects(message)
  if (found.length === 1) return projectReply(found[0], `${projectBrief(found[0])}\n\nWant the details? Just say **tell me more**.`, ['Tell me more', 'Tell me about your projects', 'Hire me'])
  if (found.length > 1) {
    const list = found.map((p) => `• **${p.title}** — ${p.tagline}`).join('\n')
    return { text: `A few projects match:\n\n${list}\n\nWhich one should I open up?`, intent: 'project-choice', followUps: found.slice(0, 3).map((p) => `Tell me about ${p.title}`) }
  }
  return null
}

/** Typing time scales with reply length so short answers feel instant. */
export const typingDelay = (text: string) => 350 + Math.min(text.length * 3, 800)

export async function askBot(message: string): Promise<BotReply> {
  const smart = smartReply(message)
  if (smart) return smart

  const intent = matchIntent(message)
  if (intent) {
    const hello = intent.id === 'greeting' ? getGreeting(memory.name) : undefined
    return {
      text: hello ?? intent.answer(),
      intent: intent.id,
      chart: intent.chart,
      followUps: intent.followUps ?? suggestions,
      actions: intent.actions,
    }
  }
  const total = projects.length
  return {
    text: `${fallback}\n\nI know all ${total} of Athish's projects — ask by name, like **Rammas** or **Helpdesk**.`,
    intent: 'fallback',
    followUps: suggestions,
  }
}
