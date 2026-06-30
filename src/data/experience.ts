/** Experience timeline + education + certifications + achievements. */

export interface ExperienceItem {
  role: string
  org: string
  period: string
  points: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Automation Engineer',
    org: 'Ducont Systems · Dubai, UAE',
    period: 'Oct 2025 – Present',
    points: [
      'Build dynamic Power Apps integrated with SharePoint and Dataverse, automating workflows with Power Automate.',
      'Create agentic AI solutions with Copilot Studio, integrated across Microsoft Teams, M365 and web apps.',
      'Drive intelligent business automation end to end on the Microsoft Power Platform.',
    ],
    tags: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse', 'Copilot Studio', 'Agentic AI'],
  },
  {
    role: 'Junior RPA Developer',
    org: 'ROR Technologies · Madurai',
    period: 'Jun 2025 – Oct 2025',
    points: [
      'Built Power Apps with dynamic filtering and SharePoint / Dataverse integration.',
      'Created Power Automate workflows for approvals and notifications across Microsoft services.',
      'Worked with Power Pages for external-facing business websites.',
    ],
    tags: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse', 'Power Pages', 'RPA'],
  },
  {
    role: 'AI & Hyper-Automation Intern',
    org: 'ROR Technologies · Madurai',
    period: 'Dec 2024 – Jun 2025',
    points: [
      'Six-month internship building business apps with Power Apps and automating workflows with Power Automate.',
      'Created dashboards in Power BI and delivered hands-on RPA project implementations.',
    ],
    tags: ['Power Apps', 'Power Automate', 'Power BI', 'RPA'],
  },
  {
    role: 'AI / ML / Generative AI Intern',
    org: 'Generative AI Consortium · Remote',
    period: 'Nov 2024 – Apr 2025',
    points: [
      'Remote internship focused on AI, Machine Learning and Generative AI techniques.',
    ],
    tags: ['Generative AI', 'Machine Learning', 'Python'],
  },
  {
    role: 'Machine Learning Intern',
    org: 'Mentorness · Remote',
    period: 'May 2024 – Jun 2024',
    points: [
      'Contributed to practical Machine Learning applications in Python.',
      'Hands-on with EDA, data preprocessing and model building.',
    ],
    tags: ['Python', 'Machine Learning', 'EDA', 'Data Preprocessing'],
  },
  {
    role: 'Web Developer',
    org: 'Magicx Shutterzz Studio',
    period: 'Freelance',
    points: ['Designed and built a website for Magicx Shutterzz Studio on WordPress.'],
    tags: ['WordPress', 'Web Design'],
  },
]

export interface EducationItem {
  degree: string
  institution: string
  score: string
}

export const education: EducationItem[] = [
  { degree: 'M.Sc. Data Science', institution: 'The American College, Madurai', score: 'CGPA 9.1 / 10' },
  { degree: 'B.Sc. Computer Science', institution: 'The American College, Madurai', score: 'CGPA 8.3 / 10' },
]

export const certifications: string[] = [
  'Machine Learning with Python — IBM Cloud',
  'TensorFlow and Keras',
  'UI/UX for Beginners',
  'PHP with MySQL Connectivity',
  'Java',
]

export interface Achievement {
  rank: string
  title: string
  detail: string
}

export const achievements: Achievement[] = [
  {
    rank: '1st',
    title: 'Paper Presentation — "Artificial Intelligence"',
    detail: 'Inter-college competition, The American College, Madurai · Feb 2023',
  },
  {
    rank: '2nd',
    title: 'Web Designing',
    detail: 'Inter-college competition, The American College, Madurai · Feb 2023',
  },
  {
    rank: '3rd',
    title: 'Web Designing',
    detail: 'Inter-college competition, Arul Anandar College, Madurai · Feb 2023',
  },
]

export const languages = ['English', 'Tamil']
