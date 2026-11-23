/**
 * Profile — core identity, contact, and hero content.
 * Edit this file to update name, title, links, and the WhatsApp CTA.
 */

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export const profile = {
  name: 'Athish V',
  initials: 'AV',
  /** Hero title — blends the current Ducont role with the Power Platform brand. */
  title: 'AI Engineer',
  /** Secondary line that surfaces the React / front-end capability. */
  subtitle:
    'I design, build, and deploy enterprise-grade business applications and automation solutions using Microsoft Power Platform and modern web technologies.',
  tagline:
    'My expertise includes developing responsive React and TypeScript single-page applications, building Power Apps, creating intelligent workflows with Power Automate, and developing AI-powered agents using Copilot Studio. I deliver end-to-end solutions by integrating front-end applications with Dataverse, SharePoint, REST APIs, and enterprise systems to streamline business processes and improve operational efficiency.',
  experienceYears: '2+',
  location: 'Dubai, UAE',
  email: 'venkatesanathish@gmail.com',
  phoneDisplay: '+91 95859 91586',
  /** International format, no symbols — used for the wa.me deep link. */
  whatsapp: '919585991586',
  /** Secondary (UAE) mobile number. */
  phoneDisplaySecondary: '+971 50 840 0586',
  /** International format, no symbols — used for the tel: link. */
  phoneSecondary: '971508400586',
  whatsappMessage:
    "Hi Athish, I came across your portfolio and I'd love to connect with you regarding an opportunity.",
  linkedin: 'https://www.linkedin.com/in/athish-venkatesan',
  /** Square head-and-shoulders crop — used for avatars. null = "AV" monogram. */
  photo: '/profile-face.jpg' as string | null,
  /** Hero visual — transparent-background cutout (WebP; ~92KB). */
  portrait: '/profile-ai-portrait.webp' as string | null,
  /** PNG fallback for `portrait`, for browsers without WebP support. */
  portraitFallback: '/profile-ai-portrait.png' as string | null,
  resumePath: '/AthishV-Resume.pdf',
  github: 'https://github.com/Athishvenkatesan',

  about:
    'Automation Engineer at Ducont Systems in Dubai, building agentic AI solutions for enterprise teams. I design Copilot Studio agents across Teams, M365 and web apps, backed by Power Automate workflows, Power Apps, SharePoint and Dataverse. I also build AI-powered applications with React 19, TypeScript and Python — including local-LLM tools (Ollama) and AI-driven video pipelines — on a foundation in machine learning, TensorFlow and LangGraph. I focus on turning real business problems into reliable, production-ready AI automation in fast-moving team environments.',
}

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: profile.github, icon: 'github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Phone (India)', href: `tel:+${profile.whatsapp}`, icon: 'phone' },
  { label: 'Phone (UAE)', href: `tel:+${profile.phoneSecondary}`, icon: 'phone' },
]

/** Builds the WhatsApp click-to-chat deep link with a prefilled message. */
export function whatsappLink(message: string = profile.whatsappMessage): string {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`
}
