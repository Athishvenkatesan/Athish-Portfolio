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
  /** Hero title — kept as the resume title per the owner's choice. */
  title: 'Power Platform Developer',
  /** Secondary line that surfaces the React / front-end capability. */
  subtitle: 'React · TypeScript front-end engineer who ships enterprise web apps end to end',
  tagline:
    'I design, build and deploy automation and front-end solutions — from React + TypeScript single-page apps to Power Apps, Power Automate and Copilot Studio workflows.',
  experienceYears: '2.6',
  location: 'Madurai, India',
  email: 'venkatesanathish@gmail.com',
  phoneDisplay: '+91 95859 91586',
  /** International format, no symbols — used for the wa.me deep link. */
  whatsapp: '919585991586',
  whatsappMessage:
    "Hi Athish, I came across your portfolio and I'd love to connect with you regarding an opportunity.",
  linkedin: 'https://www.linkedin.com/in/athish-venkatesan',
  /** Square head-and-shoulders crop — used for avatars. null = "AV" monogram. */
  photo: '/profile-face.jpg' as string | null,
  /** Full-length portrait — used for the hero visual. */
  portrait: '/profile-full.jpg' as string | null,
  resumePath: '/AthishV-Resume.pdf',
  github: 'https://github.com/Athishvenkatesan',

  about:
    'Power Platform Developer with 2.6 years of experience designing, developing and deploying automation solutions using Power Automate, Power Apps and SharePoint — and an equally strong front-end engineer working in React 19, TypeScript and Vite. I build end-to-end workflows, integrate applications and craft clean, responsive interfaces, with a focus on solving real business problems in fast-moving team environments.',
}

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: profile.github, icon: 'github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Phone', href: `tel:+${profile.whatsapp}`, icon: 'phone' },
]

/** Builds the WhatsApp click-to-chat deep link with a prefilled message. */
export function whatsappLink(message: string = profile.whatsappMessage): string {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`
}
