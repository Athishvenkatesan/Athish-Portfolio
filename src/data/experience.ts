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
    role: 'Power Platform Developer',
    org: 'ROR Technologies',
    period: '2.6 years',
    points: [
      'Built business applications with Power Apps and modern React + TypeScript front-ends.',
      'Automated end-to-end workflows using Power Automate and Copilot Studio.',
      'Developed dashboards in Power BI and delivered RPA automation projects.',
    ],
    tags: ['React', 'TypeScript', 'Power Apps', 'Power Automate', 'Copilot Studio', 'Power BI'],
  },
  {
    role: 'Machine Learning Intern',
    org: 'Mentorness',
    period: '1 month',
    points: [
      'Completed a one-month internship on real-world Machine Learning projects in Python.',
      'Hands-on with data preprocessing, algorithm implementation and model building.',
    ],
    tags: ['Python', 'Machine Learning', 'Data Preprocessing'],
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
