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
  title: 'Power Platform & Automation Engineer',
  /** Secondary line that surfaces the React / front-end capability. */
  subtitle: 'React · TypeScript front-end engineer who ships enterprise web apps end to end',
  tagline:
    'I design, build and deploy automation and front-end solutions — from React + TypeScript single-page apps to Power Apps, Power Automate and Copilot Studio agents.',
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
    'Automation Engineer at Ducont Systems in Dubai, building dynamic Power Apps integrated with SharePoint and Dataverse, automating workflows with Power Automate, and creating agentic AI solutions with Copilot Studio across Teams, M365 and web apps. Equally strong as a front-end engineer in React 19, TypeScript and Vite — I build end-to-end workflows, integrate enterprise systems and craft clean, responsive interfaces, with a focus on solving real business problems in fast-moving team environments.',
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
