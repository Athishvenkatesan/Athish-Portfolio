/**
 * Certifications — one object per credential, newest first.
 * Certificate images live in /public/certificates and open in a lightbox.
 * To add one: drop the image in public/certificates and append an object.
 */

export interface Certification {
  title: string
  issuer: string
  /** Display date, e.g. "Nov 2026". */
  date: string
  /** Path under /public — null when no certificate file is on hand. */
  image: string | null
  /** Optional extra line: duration, credential ID, etc. */
  note?: string
  /** For bundles (e.g. MongoDB) — the individual courses covered. */
  courses?: string[]
}

export const certificationList: Certification[] = [
  {
    title: 'Agentic AI for Beginners: Build AI Agents with LangGraph',
    issuer: 'Udemy · Aakriti E-Learning Academy',
    date: 'Nov 2026',
    image: '/certificates/udemy-agentic-ai-langgraph.jpg',
    note: '10 hours',
  },
  {
    title: 'UAE Vibe Coder — AI Coder Journey',
    issuer: 'Dubai Electricity & Water Authority (DEWA)',
    date: 'Nov 2026',
    image: '/certificates/dewa-uae-vibe-coder.jpg',
    note: 'AI Adoption, Innovation & The Future',
  },
  {
    title: 'AI Coder: Vibe Coder to Agentic Engineer in 3 Weeks',
    issuer: 'Udemy · Ligency, Ed Donner',
    date: 'Apr 2026',
    image: '/certificates/udemy-ai-coder-vibe-to-agentic.jpg',
    note: '16 hours',
  },
  {
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE',
    date: 'Dec 2024',
    image: '/certificates/hp-life-data-science.jpg',
  },
  {
    title: 'Data Science Foundations',
    issuer: 'Great Learning Academy',
    date: 'Nov 2024',
    image: '/certificates/gl-data-science-foundations.jpg',
  },
  {
    title: 'Introduction to TensorFlow and Keras',
    issuer: 'Great Learning Academy',
    date: 'Nov 2024',
    image: '/certificates/gl-tensorflow-keras.jpg',
  },
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM Cloud · Digilabs',
    date: 'Aug 2024',
    image: '/certificates/ibm-ml-python.jpg',
    note: 'Certificate ID 1124087507142',
  },
  {
    title: 'MongoDB University — 12 course completions',
    issuer: 'MongoDB, Inc.',
    date: '2024',
    image: '/certificates/mongodb-document-model.jpg',
    note: 'Sample shown: MongoDB and the Document Model',
    courses: [
      'Introduction to MongoDB for Students',
      'MongoDB and the Document Model',
      'Getting Started with MongoDB Atlas',
      'Connecting to a MongoDB Database',
      'MongoDB CRUD: Insert and Find Documents',
      'MongoDB CRUD: Replace and Delete Documents',
      'MongoDB CRUD: Modifying Query Results',
      'MongoDB Indexes',
      'MongoDB Aggregation',
      'MongoDB Data Modeling Intro',
      'MongoDB Transactions',
      'MongoDB Atlas Search',
    ],
  },
  {
    title: 'UiPath Automation Explorer',
    issuer: 'UiPath Academy',
    date: 'Mar 2024',
    image: '/certificates/uipath-automation-explorer.jpg',
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
    image: '/certificates/cisco-cybersecurity-essentials.jpg',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
    image: '/certificates/cisco-intro-cybersecurity.jpg',
  },
  {
    title: 'Data Visualization using Tableau',
    issuer: 'Great Learning Academy',
    date: 'Jul 2023',
    image: '/certificates/gl-tableau.jpg',
  },
  {
    title: 'UI / UX for Beginners',
    issuer: 'Great Learning Academy',
    date: 'Jul 2023',
    image: '/certificates/gl-uiux-beginners.jpg',
  },
  { title: 'PHP with MySQL Connectivity', issuer: 'Coursework', date: '', image: null },
  { title: 'Java', issuer: 'Coursework', date: '', image: null },
]
