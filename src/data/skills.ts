/**
 * Skills — grouped capability cards.
 * Front-end engineering leads (per the React repositioning); Power Platform
 * and ML follow. `level` (0-100) drives the animated proficiency bars.
 */

export interface Skill {
  name: string
  level: number
}

export type SkillVariant = 'bars' | 'radial' | 'meter' | 'dots' | 'tags' | 'columns'

export interface SkillGroup {
  title: string
  icon: string
  blurb: string
  /** Which visual form SkillsSection renders this group as — varied on purpose so
   *  six cards on one screen don't all show the identical bar chart. */
  variant: SkillVariant
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front-End Engineering',
    icon: 'code',
    blurb: 'Modern, type-safe single-page apps.',
    variant: 'bars',
    skills: [
      { name: 'React 19', level: 88 },
      { name: 'TypeScript (strict)', level: 86 },
      { name: 'Vite', level: 85 },
      { name: 'Vue 3', level: 78 },
      { name: 'JavaScript (ES2023)', level: 88 },
      { name: 'HTML5 / CSS3', level: 90 },
    ],
  },
  {
    title: 'UI & Component Systems',
    icon: 'layout',
    blurb: 'Design-system-driven, accessible interfaces.',
    variant: 'radial',
    skills: [
      { name: 'Fluent UI v9', level: 85 },
      { name: 'React Router', level: 84 },
      { name: 'Responsive / Glassmorphism UI', level: 88 },
      { name: 'UI / UX design', level: 80 },
    ],
  },
  {
    title: 'Animation & Data',
    icon: 'spark',
    blurb: 'Motion, reporting and document generation.',
    variant: 'meter',
    skills: [
      { name: 'GSAP animation', level: 78 },
      { name: 'jsPDF (PDF export)', level: 80 },
      { name: 'SheetJS / xlsx (Excel)', level: 80 },
      { name: 'Dashboards & data tables', level: 82 },
    ],
  },
  {
    title: 'Integration & APIs',
    icon: 'plug',
    blurb: 'Connecting front-ends to enterprise data.',
    variant: 'dots',
    skills: [
      { name: 'Dataverse Web API', level: 84 },
      { name: 'Postman integration', level: 82 },
      { name: 'Microsoft Entra auth', level: 76 },
      { name: 'Git / version control', level: 84 },
    ],
  },
  {
    title: 'Microsoft Power Platform',
    icon: 'grid',
    blurb: 'Automation delivery at Ducont Systems.',
    variant: 'tags',
    skills: [
      { name: 'Power Apps (incl. Code Apps)', level: 90 },
      { name: 'Power Automate', level: 90 },
      { name: 'Copilot Studio', level: 85 },
      { name: 'SharePoint', level: 84 },
      { name: 'Dataverse', level: 86 },
      { name: 'Power Pages', level: 78 },
    ],
  },
  {
    title: 'Data Science & ML',
    icon: 'brain',
    blurb: 'M.Sc. Data Science foundation.',
    variant: 'columns',
    skills: [
      { name: 'Python', level: 84 },
      { name: 'Machine Learning', level: 80 },
      { name: 'TensorFlow & Keras', level: 76 },
      { name: 'CNNs / Deep Learning', level: 75 },
      { name: 'Data analysis', level: 82 },
    ],
  },
]
