/**
 * Chatbot engine — scored keyword intent matching.
 *
 * `askBot()` is the single seam for the future real-AI upgrade: to switch to
 * a live Claude call, replace the body of askBot() with a fetch to a
 * serverless endpoint. Everything that calls askBot() stays unchanged.
 */
import { intents, fallback, suggestions, type ChatChartKind } from './knowledge'

export interface BotReply {
  text: string
  intent: string
  chart?: ChatChartKind
  followUps: string[]
}

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\w\s]/g, ' ')
}

/** Returns the best-matching intent by keyword hit count, or null. */
function matchIntent(input: string) {
  const text = normalize(input)
  let best: { score: number; intent: (typeof intents)[number] } | null = null

  for (const intent of intents) {
    let score = 0
    for (const kw of intent.keywords) {
      if (text.includes(kw)) score += kw.length // longer keywords weigh more
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, intent }
    }
  }
  return best?.intent ?? null
}

/**
 * Produce a reply for a user message. Async on purpose so the UI's "typing"
 * state and the eventual network-backed version share one contract.
 */
export async function askBot(message: string): Promise<BotReply> {
  const intent = matchIntent(message)
  if (intent) {
    return {
      text: intent.answer(),
      intent: intent.id,
      chart: intent.chart,
      followUps: intent.followUps ?? suggestions,
    }
  }
  return { text: fallback, intent: 'fallback', followUps: suggestions }
}
