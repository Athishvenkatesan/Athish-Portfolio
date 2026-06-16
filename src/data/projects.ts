/**
 * Projects — portfolio case studies.
 * To add a project: append one object. `id` powers the /projects/:id route.
 * D2D is the featured React + TypeScript engineering case study.
 */

export type ProjectCategory = 'React / Front-End' | 'Power Platform' | 'Copilot Agent' | 'Machine Learning' | 'Web'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  featured?: boolean
  tagline: string
  summary: string
  /** Long-form description rendered on the detail page (array = paragraphs). */
  description: string[]
  stack: string[]
  highlights: string[]
  /** Optional "how Athish handled it end to end" ownership steps. */
  ownership?: string[]
  outcomes?: string[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'd2d',
    title: 'Demand to Delivery System (D2D)',
    category: 'React / Front-End',
    featured: true,
    accent: '#7c5cff',
    tagline: 'Enterprise demand-lifecycle SPA for DEWA — React 19 + TypeScript',
    summary:
      'A React + TypeScript single-page application that consolidates the entire demand-to-delivery lifecycle into one centralized platform, replacing several disconnected systems for an enterprise client (DEWA).',
    description: [
      'D2D is a large enterprise single-page application built in React 19 and TypeScript (strict mode) on Vite. It unifies the full demand-to-delivery lifecycle — intake, evaluation, planning, execution, monitoring and closure — into one centralized platform, replacing multiple disconnected external systems.',
      'The app handles three distinct demand categories — Enhancement, New Solution / Turnkey, and POC — each with its own multi-stage, role-based approval flow. Stage-specific sections are gated by demand type and the current user’s role, so every actor only sees and acts on what is relevant to them.',
      'It is engineered around a clean service layer: every data operation goes through typed service classes, components never touch the API directly, and all loading, error and empty states are handled explicitly. Demand data can be exported to PDF (jsPDF) and Excel (SheetJS), with GSAP powering smooth stage transitions.',
    ],
    stack: [
      'React 19',
      'TypeScript (strict)',
      'Vite',
      'Fluent UI v9',
      'React Router 7',
      'Dataverse Web API',
      'GSAP',
      'jsPDF',
      'SheetJS / xlsx',
      'Microsoft Entra ID',
    ],
    highlights: [
      'Service-layer architecture — all data access isolated in typed services; components stay presentational.',
      'Strict TypeScript domain models mirroring the backend schema (no `any`).',
      'Role-based, multi-stage approval workflows with sequential approvals + parallel stakeholder consents.',
      'Demand-type gating — Enhancement, New Solution/Turnkey and POC each render their own stage flow.',
      'Reusable component library: forms, user pickers, status badges, sequential steppers.',
      'PDF + Excel export of demand data; GSAP-animated stage transitions.',
    ],
    ownership: [
      'Translated a complex multi-role business process into a typed domain model.',
      'Designed the service layer and reusable component library before building screens.',
      'Implemented stage-gated, role-aware rendering for three demand categories.',
      'Added reporting/export (PDF + Excel) and polished interactions with GSAP.',
      'Ran code review and deployment preflight before each release.',
    ],
    outcomes: [
      'Replaced multiple disconnected systems with one centralized platform.',
      'Gave every stakeholder real-time, role-appropriate visibility across departments.',
    ],
  },
  {
    id: 'transmission-power',
    title: 'Transmission Power',
    category: 'Power Platform',
    accent: '#19c2a8',
    tagline: 'Document approval workflow automation',
    summary:
      'Automates and streamlines the organization-wide document approval workflow across roles like Central Planning Coordinator/Manager, Department Head and EVP Office Administrator.',
    description: [
      'Transmission Power automates a structured document approval cycle, moving reports and documents through clearly defined actions — Send Back, Send Comments, Approve and Reject — across multiple organizational roles.',
      'It provides centralized document management with role-based access and real-time visibility across all departments, plus automated notifications and escalations to keep approvals moving.',
    ],
    stack: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
    highlights: [
      'Role-based access and approvals',
      'Centralized document management',
      'Real-time visibility across all departments',
      'Automated notifications and escalations',
    ],
  },
  {
    id: 'project-management-tool',
    title: 'Project Management Tool',
    category: 'Power Platform',
    accent: '#ff7ab6',
    tagline: 'Centralized task, issue and resource tracking',
    summary:
      'A centralized project management system that streamlines tracking of tasks, issues and resources across multiple teams with role-based access and automated workflows.',
    description: [
      'Built to give multiple teams one place to track tasks, issues and resources. It supports role-based access, project-specific dashboards and automated workflows for task assignment, status updates and issue escalation.',
      'Real-time dashboards surface progress, while notifications and reminders keep deadlines and pending tasks on track.',
    ],
    stack: ['Power Apps', 'Power Automate', 'Dataverse', 'Power BI'],
    highlights: [
      'Role-based access and project tracking',
      'Centralized task and issue management',
      'Automated workflows for assignment and status updates',
      'Real-time dashboards + deadline reminders',
    ],
  },
  {
    id: 'handwriting-cnn',
    title: 'Handwriting Recognition (CNN)',
    category: 'Machine Learning',
    accent: '#7c5cff',
    tagline: 'Deep learning over 100k+ handwritten names',
    summary:
      'A Convolutional Neural Network approach to automatic handwriting recognition, tuned for higher accuracy and lower inference time on a dataset of 100,000+ handwritten names.',
    description: [
      'Developed a method to automatically recognize handwriting using Convolutional Neural Networks, with the goal of increasing accuracy while decreasing test/inference time.',
      'Worked with a dataset of more than 100,000 handwritten names to evaluate and refine multiple CNN architectures for real-time applications.',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'CNN', 'NumPy'],
    highlights: [
      'Dataset of 100,000+ handwritten names',
      'Multiple CNN architectures evaluated and refined',
      'Optimized for accuracy and real-time inference',
    ],
  },
  {
    id: 'campus-requirement-system',
    title: 'Campus Requirement System',
    category: 'Web',
    accent: '#19c2a8',
    tagline: 'Placement registration & eligibility automation',
    summary:
      'Automates campus placement: student registration, company listings, applicant details and eligibility checks for each company, plus selected-student tracking.',
    description: [
      'A system to automate and simplify the campus placement process — registration, company views, details of applied students, and checking whether a student meets a given company’s eligibility criteria.',
      'It also lets coordinators view the list of selected students per company.',
    ],
    stack: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    highlights: [
      'Student registration & company listings',
      'Automated eligibility checking',
      'Applicant and selected-student tracking',
    ],
  },
  {
    id: 'cash-forecasting-agent',
    title: 'Cash Forecasting Agent',
    category: 'Copilot Agent',
    accent: '#19c2a8',
    tagline: 'Conversational finance cash-flow forecasting',
    summary:
      'A Copilot Studio agent that automates financial cash forecasting — letting finance teams input, analyze and predict cash inflows and outflows through guided, structured interactions.',
    description: [
      'Automates and streamlines the cash forecasting process so finance teams can predict inflows and outflows more efficiently.',
      'Uses structured workflows and guided conversations to collect finance data and surface real-time forecasts, integrating with existing financial records.',
    ],
    stack: ['Copilot Studio', 'Power Automate', 'Dataverse'],
    highlights: [
      'Automated cash forecasting workflows',
      'Structured input collection for finance data',
      'Real-time prediction and visibility',
      'Integrates with existing financial records',
    ],
  },
  {
    id: 'it-helpdesk-agent',
    title: 'IT Helpdesk Agent',
    category: 'Copilot Agent',
    accent: '#7c5cff',
    tagline: 'Conversational IT support & ticketing',
    summary:
      'A Copilot Studio agent that handles IT support requests through automation — a conversational interface for logging issues, tracking status and getting quick resolutions.',
    description: [
      'Reduces response times and improves service efficiency by letting employees log issues and track status conversationally.',
      'Automates ticket creation and assignment, surfaces a knowledge base for common issues, and routes critical problems through escalation workflows with role-based visibility.',
    ],
    stack: ['Copilot Studio', 'Power Automate', 'SharePoint', 'Dataverse'],
    highlights: [
      'Automated ticket creation and assignment',
      'Real-time status updates',
      'Knowledge base for common IT issues',
      'Escalation workflows + role-based visibility',
    ],
  },
  {
    id: 'hr-onboarding-agent',
    title: 'HR Onboarding Agent',
    category: 'Copilot Agent',
    accent: '#ff7ab6',
    tagline: 'Conversational employee onboarding',
    summary:
      'A Copilot Studio agent that digitizes employee onboarding — guiding new hires through information, formalities and HR resources conversationally.',
    description: [
      'Simplifies and digitizes onboarding so new hires receive the information they need and complete formalities smoothly.',
      'Provides guided onboarding workflows, document submission and verification support, and centralized access to HR policies and resources.',
    ],
    stack: ['Copilot Studio', 'Power Automate', 'SharePoint'],
    highlights: [
      'Guided onboarding workflows for new hires',
      'Document submission & verification',
      'Centralized access to HR policies and resources',
    ],
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export const projectCategories: ProjectCategory[] = [
  'React / Front-End',
  'Power Platform',
  'Copilot Agent',
  'Machine Learning',
  'Web',
]
