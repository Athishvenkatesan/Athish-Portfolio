/**
 * Projects — portfolio case studies.
 * To add a project: append one object. `id` powers the /projects/:id route.
 * D2D is the featured React + TypeScript engineering case study.
 */

export type ProjectCategory =
  | 'React / Front-End'
  | 'Power Platform'
  | 'Copilot Agent'
  | 'Machine Learning'
  | 'Web'
  | 'Video Production'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  featured?: boolean
  /** Flags personal/freelance builds (shown with a badge). */
  freelance?: boolean
  tagline: string
  summary: string
  /** Long-form description rendered on the detail page (array = paragraphs). */
  description: string[]
  stack: string[]
  highlights: string[]
  /** Optional "how Athish handled it end to end" ownership steps. */
  ownership?: string[]
  outcomes?: string[]
  /** Public source link (GitHub) — renders a "Source" button linking out to the repo. */
  repo?: string
  /** Public live URL — renders a "Run in Browser" button that opens an in-page iframe preview (LivePreviewPanel). Omit if there's no publicly reachable deployment. */
  demo?: string
  accent: string
  /** Approximate era this project was built in — powers the /analysis timeline. Display label. */
  period: string
  /** Sortable "YYYY-MM" (or a low placeholder for undated freelance work) backing `period`'s chronological order. */
  periodStart: string
}

export const projects: Project[] = [
  {
    id: 'd2d',
    title: 'Demand to Delivery System (D2D)',
    category: 'React / Front-End',
    featured: true,
    accent: '#7c5cff',
    period: 'Ducont Systems · Oct 2025 – Present',
    periodStart: '2025-10',
    tagline: 'Enterprise demand-lifecycle SPA for DEWA — React 19 + TypeScript',
    summary:
      'A React + TypeScript single-page application that consolidates the entire demand-to-delivery lifecycle into one centralized platform, replacing several disconnected systems for DEWA (Dubai Electricity & Water Authority).',
    description: [
      'D2D is an onsite engineering project for DEWA (Dubai Electricity & Water Authority) — a large enterprise single-page application built in React 19 and TypeScript (strict mode) on Vite. It unifies the full demand-to-delivery lifecycle — intake, evaluation, planning, execution, monitoring and closure — into one centralized platform, replacing multiple disconnected external systems.',
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
    repo: 'https://github.com/Athishvenkatesan/WebApp-D2D',
  },
  {
    id: 'transmission-power',
    title: 'Transmission Power',
    category: 'Power Platform',
    accent: '#19c2a8',
    period: 'Ducont Systems · Oct 2025 – Completed',
    periodStart: '2025-10',
    tagline: 'Document approval workflow automation for DEWA',
    summary:
      'An off-site engagement for DEWA (Dubai Electricity & Water Authority) that automates and streamlines the organization-wide document approval workflow across roles like Central Planning Coordinator/Manager, Department Head and EVP Office Administrator.',
    description: [
      'Transmission Power is an off-site project delivered for DEWA (Dubai Electricity & Water Authority). It automates a structured document approval cycle, moving reports and documents through clearly defined actions — Send Back, Send Comments, Approve and Reject — across multiple organizational roles.',
      'It provides centralized document management with role-based access and real-time visibility across all departments, plus automated notifications and escalations to keep approvals moving.',
    ],
    stack: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
    highlights: [
      'Role-based access and approvals',
      'Centralized document management',
      'Real-time visibility across all departments',
      'Automated notifications and escalations',
    ],
    ownership: [
      'Automated the document approval cycle across Send Back, Send Comments, Approve and Reject actions.',
      'Modeled role-based access for Central Planning Coordinator/Manager, Department Head and EVP Office Administrator.',
      'Built centralized document management on SharePoint and Dataverse.',
      'Wired automated notifications and escalations to keep approvals moving.',
    ],
    outcomes: [
      'Gave every department real-time visibility into document approval status.',
      'Replaced manual, ad-hoc approval routing with a structured, auditable workflow.',
    ],
  },
  {
    id: 'adnh-catering-key-it',
    title: 'ADNHC Key IT Assessment',
    category: 'Power Platform',
    accent: '#d97706',
    period: 'Ducont Systems · Oct 2025 – Completed',
    periodStart: '2025-10',
    tagline: 'Role-based IT assessment workflow across UAE, KSA & Qatar',
    summary:
      'A Power Apps application for ADNH Catering that manages a full, role-based IT assessment workflow — Initiator, Responder and Reviewer — across UAE, KSA and Qatar, with SharePoint-backed data, automatic maturity scoring, and tiered Power Automate reminder emails.',
    description: [
      'ADNHC Key IT Assessment is a Power Apps application that manages a country-wide IT assessment process for UAE, KSA and Qatar end to end, through a role-based workflow of Initiator, Responder and Reviewer. The Initiator creates an assessment — name, year, due date, country and period — and either saves it as a draft or publishes it. Publishing automatically assigns the assessment to the required responders, updates role-based dashboards, stores every detail in SharePoint lists, and sends email notifications via Power Automate.',
      'Responders answer each question with Yes/No, upload supporting evidence, add comments, and can save their progress as a draft to resume from the last answered question — with filters for Control Family, Control Area, Maturity Level, Owner and Expiry Status to navigate large question sets. On submission, the system calculates the maturity level, updates dashboards, and — once every responder has finished — routes the assessment to the Reviewer.',
      "The Reviewer can accept or reject the submitted responses; a rejected assessment goes back to the responder as \"Action Needed\" for one final correction, and only one rejection round is allowed before the assessment completes automatically after the second review. Throughout, Power Automate drives a tiered reminder cadence — none in the first 15 days, weekly in the next 15, daily in the final 15 for responders, and daily for reviewers during their 7-day review window — to keep the whole assessment cycle on schedule.",
    ],
    stack: ['Power Apps', 'Power Automate', 'SharePoint'],
    highlights: [
      'Role-based workflow — Initiator, Responder and Reviewer each see only what applies to their stage',
      'Multi-country assessments (UAE, KSA, Qatar) with country, year and period selection',
      'Draft-and-resume responses with Yes/No answers, evidence attachments and comments',
      'Automatic maturity-level calculation and dashboard updates on submission',
      'Reviewer accept/reject flow — one rejection round before auto-completion',
      'Tiered Power Automate reminder emails (15/15/15-day responder cadence, 7-day reviewer cadence)',
      'Role-based dashboards with country filters, pagination and question-level filtering',
    ],
    ownership: [
      'Designed the Initiator/Responder/Reviewer role-based workflow end to end.',
      'Built the multi-country (UAE, KSA, Qatar) assessment structure with SharePoint-backed storage.',
      'Implemented automatic maturity-level scoring and role-based dashboards.',
      'Configured the tiered Power Automate reminder cadence for responders and reviewers.',
    ],
    outcomes: [
      'Gave ADNH Catering one consistent, auditable IT assessment process across three countries.',
      'Reduced manual follow-up through automated, tiered reminder emails.',
    ],
  },
  {
    id: 'project-management-tool',
    title: 'Project Management Tool',
    category: 'Power Platform',
    accent: '#ff7ab6',
    period: 'Ducont Systems · Jun 2025 – Oct 2025',
    periodStart: '2025-06',
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
    ownership: [
      'Built the centralized task/issue/resource tracking data model in Dataverse.',
      'Implemented role-based access and project-specific dashboards.',
      'Automated workflows for task assignment, status updates and issue escalation.',
      'Added Power BI reporting for real-time progress visibility.',
    ],
    outcomes: [
      'Gave multiple teams one shared system instead of scattered tracking.',
      'Cut missed deadlines through automated reminders and escalation.',
    ],
  },
  {
    id: 'handwriting-cnn',
    title: 'Handwriting Recognition (CNN)',
    category: 'Machine Learning',
    accent: '#7c5cff',
    period: 'Generative AI Consortium · Nov 2024 – Apr 2025',
    periodStart: '2024-11',
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
    ownership: [
      'Preprocessed and prepared the 100,000+ handwritten-name dataset for training.',
      'Designed and trained multiple CNN architectures, tuning for accuracy and inference speed.',
      'Evaluated architectures against accuracy/test-time tradeoffs to select the best-performing model.',
    ],
    outcomes: [
      'Delivered a CNN model tuned for both accuracy and low inference time.',
      'Validated performance across 100,000+ real handwritten name samples.',
    ],
  },
  {
    id: 'campus-requirement-system',
    title: 'Campus Requirement System',
    category: 'Web',
    freelance: true,
    accent: '#19c2a8',
    period: 'Freelance',
    periodStart: '2023-01',
    tagline: 'A job portal that streamlines campus placements',
    summary:
      'A full job-portal web app for campus placements: students register, browse companies, check eligibility and apply; placement officers track applied and selected students and broadcast updates to departments.',
    description: [
      'The Campus Requirement System is a job portal built to streamline the entire campus placement process. Students can register, view detailed company profiles, check their eligibility against each company’s criteria, and apply for openings in a few clicks.',
      'Placement officers get an administrative side to track applied and selected students per company and send placement updates out to the relevant departments — replacing scattered spreadsheets and notice-board announcements with one organized portal.',
    ],
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Student registration & company listings',
      'Automated eligibility checking per company',
      'Apply-to-job workflow',
      'Officer dashboard: applied & selected-student tracking',
      'Department-wide placement update broadcasts',
    ],
    ownership: [
      'Designed the student, company and placement-officer data model in MySQL.',
      'Built the eligibility-checking and apply-to-job workflow end to end.',
      'Implemented the officer dashboard for applied/selected-student tracking.',
      'Deployed the app publicly on GitHub Pages with a working demo.',
    ],
    outcomes: [
      'Replaced spreadsheets and notice-board announcements with one organized portal.',
      "Gave placement officers a single dashboard to track every company's pipeline.",
    ],
    repo: 'https://github.com/Athishvenkatesan/Campus_Requirement_System',
    demo: 'https://athishvenkatesan.github.io/Campus_Requirement_System/',
  },
  {
    id: 'restaurant-billing-system',
    title: 'Restaurant Billing System',
    category: 'Web',
    freelance: true,
    accent: '#ff7ab6',
    period: 'Freelance',
    periodStart: '2023-01',
    tagline: 'Web-based POS & billing for restaurants',
    summary:
      'A PHP + MySQL restaurant billing system that automates customer billing, order tracking and payment processing — with split billing, tax/discount handling, sales reporting and multi-mode payments.',
    description: [
      'A web-based Restaurant Billing System developed in PHP and MySQL to automate and streamline day-to-day restaurant operations — from taking orders to settling the bill.',
      'It handles the full billing flow: order tracking, tax and discount calculation, split billing across guests, and multiple payment modes. Built-in sales reporting gives owners a clear view of revenue and performance.',
    ],
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Automated customer billing & order tracking',
      'Split billing across multiple guests',
      'Tax and discount handling',
      'Multi-mode payment support',
      'Sales reporting for owners',
    ],
    ownership: [
      'Built the full billing flow — order tracking, tax/discount calculation, split billing and payments.',
      'Designed the MySQL schema for orders, bills and sales reporting.',
      'Implemented multi-mode payment support and owner-facing sales reports.',
      'Deployed the app publicly on GitHub Pages with a working demo.',
    ],
    outcomes: [
      'Automated day-to-day billing operations from order to settled bill.',
      'Gave owners a clear, reportable view of revenue and performance.',
    ],
    repo: 'https://github.com/Athishvenkatesan/Restaurant_Billing_System',
    demo: 'https://athishvenkatesan.github.io/Restaurant_Billing_System/',
  },
  {
    id: 'furniture-management-system',
    title: 'Furniture Management System',
    category: 'Web',
    freelance: true,
    accent: '#7c5cff',
    period: 'Freelance',
    periodStart: '2023-01',
    tagline: 'Online furniture booking & inventory',
    summary:
      'An online furniture booking platform where users browse, select and book furniture by category — with a PHP/MySQL backend that streamlines shopping for customers and inventory handling for sellers.',
    description: [
      'An Online Furniture Booking System that lets customers browse, select and book furniture items by category, making the shopping experience quick and intuitive.',
      'The frontend is built with HTML, CSS and JavaScript; PHP powers the backend logic and MySQL stores catalogue, orders and inventory — helping sellers keep stock organized while customers shop.',
    ],
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Browse & book furniture by category',
      'Customer-friendly shopping flow',
      'Order management',
      'Improved inventory handling for sellers',
    ],
    ownership: [
      'Built the browse/select/book furniture flow end to end on a PHP + MySQL backend.',
      'Designed the inventory and order-management schema for sellers.',
      'Implemented the customer-facing booking UI in HTML/CSS/JavaScript.',
      'Deployed the app publicly on GitHub Pages with a working demo.',
    ],
    outcomes: [
      'Gave customers a quick, category-based furniture booking experience.',
      'Improved inventory handling and order visibility for sellers.',
    ],
    repo: 'https://github.com/Athishvenkatesan/Furniture_Management_System',
    demo: 'https://athishvenkatesan.github.io/Furniture_Management_System/',
  },
  {
    id: 'cash-forecasting-agent',
    title: 'Cash Forecasting Agent',
    category: 'Copilot Agent',
    accent: '#19c2a8',
    period: 'Ducont Systems · Oct 2025 – Completed',
    periodStart: '2025-10',
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
    ownership: [
      'Designed the Copilot Studio conversation flow for structured finance data collection.',
      'Built the cash-flow forecasting logic integrating with existing financial records.',
      'Wired Power Automate + Dataverse for real-time prediction and data visibility.',
    ],
    outcomes: [
      'Gave finance teams a conversational way to forecast cash inflows/outflows.',
      'Reduced manual forecasting effort through guided, structured interactions.',
    ],
  },
  {
    id: 'it-helpdesk-agent',
    title: 'IT Helpdesk Agent',
    category: 'Copilot Agent',
    accent: '#7c5cff',
    period: 'Ducont Systems · Oct 2025 – Completed',
    periodStart: '2025-10',
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
    ownership: [
      'Designed the Copilot Studio conversational flow for logging and tracking IT issues.',
      'Automated ticket creation, assignment and status updates.',
      'Built the knowledge-base lookup and escalation workflow with role-based visibility.',
    ],
    outcomes: [
      'Reduced response times for common IT support requests.',
      'Gave employees a self-service conversational path to log and track issues.',
    ],
  },
  {
    id: 'attachment-application',
    title: 'Attachment Application',
    category: 'Power Platform',
    accent: '#19c2a8',
    period: 'Ducont Systems · Aug 2026 – Completed',
    periodStart: '2026-08',
    tagline: 'Power Apps Code App for viewing DEWA D2D attachments stored in SharePoint',
    summary:
      'A Power Apps Code App (React 19 + Vite) that lists every attachment record for the D2D program from Dataverse and lets users preview or download the underlying SharePoint document as a PDF, via a Power Automate flow.',
    description: [
      'Attachment Application is a Microsoft Power Apps Code App that lists every record in the DEWA Dataverse table `dewa_d_to_d_tr_attachment_c` and lets a user preview or download the underlying document — which physically lives in SharePoint — as a PDF, via a Power Automate cloud flow. No file bytes are ever stored in the app or in Dataverse itself; the table only holds metadata about each document, and the actual bytes are fetched on demand.',
      'The flow contract is simple: the app sends the attachment\'s display name to the `AttachmentFlow_CodeApps` flow, which resolves the matching record, pulls the file from SharePoint, and returns it Base64-encoded. The app decodes that into a PDF blob, either rendering it inline in a slide-in preview panel or saving it to disk.',
      'Built with a clean service layer generated by the Power Platform CLI (`pac code add-data-source`) — typed Dataverse and Logic Flow services, with no hand-edited generated code, and no modals anywhere in the UI (only dismissible slide-in panels).',
    ],
    stack: ['React 19', 'TypeScript (strict)', 'Vite', 'Power Apps Code Apps SDK', 'Dataverse Web API', 'Power Automate', 'SharePoint'],
    highlights: [
      'Auto-paginated Dataverse table view with search, not capped at one page',
      'Slide-in "Info" panel showing every field, related demand links, and audit trail',
      'In-app PDF preview + download via a Power Automate flow (Base64 blob transfer)',
      'Two Power Platform connectors: Dataverse (CRUD) and Logic Flows (invoke the cloud flow)',
      'No modals anywhere — all secondary UI is a dismissible slide-in side panel',
    ],
    ownership: [
      'Built the Dataverse + Power Automate service layer with pac-generated typed models.',
      'Implemented the auto-paginated attachment list, search, and Info side panel.',
      'Wired the PDF preview/download flow around the AttachmentFlow_CodeApps cloud flow.',
    ],
    outcomes: [
      'Let D2D users view/download SharePoint-stored attachments without leaving the app.',
      'Kept the app itself stateless — no document bytes stored outside SharePoint.',
    ],
    repo: 'https://github.com/Athishvenkatesan/AttachmentApplication',
  },
  {
    id: 'harmonic-assessment-power-pages',
    title: 'Hab-Reeh Harmonic Assessment (Power Pages)',
    category: 'Power Platform',
    accent: '#0ea5e9',
    period: 'Ducont Systems · Sep 2026 – Completed',
    periodStart: '2026-09',
    tagline: 'DEWA stakeholder engagement portal for solar harmonic & POC compliance assessment',
    summary:
      'A Power Pages site for DEWA solar (PV) stakeholders to submit engagement details and run the Hab-Reeh Harmonic Assessment — evaluating transformer capacity, inverter configuration, and Point-of-Connection compliance at design stage.',
    description: [
      'Harmas (Hab-Reeh Harmonic Assessment) is a Power Pages code site built for DEWA solar/renewable-energy stakeholders. It combines a stakeholder engagement form with an interactive, multi-step harmonic assessment tool.',
      'The assessment walks a stakeholder through entering their max kWac and installed kWp, selecting a DEWA transformer capacity, adding one or more inverter models with quantities, and evaluating Point of Connection (POC) compliance for a solar installation at design stage.',
      'Access is secured with Dataverse table permissions and web roles across the Information, Demand-User and Brand entities, with a Power Automate cloud flow wired in via the site\'s cloud-flow-consumer configuration.',
    ],
    stack: ['Power Pages', 'Dataverse', 'Power Automate', 'Liquid templates', 'JavaScript', 'Table Permissions & Web Roles'],
    highlights: [
      'Multi-step Hab-Reeh Harmonic Assessment: transformer capacity → inverter selection → POC compliance',
      'Stakeholder information entity form backed by Dataverse',
      'Table permissions scoped per entity (Information, Demand-User, Brand)',
      'Cloud flow consumer wired in for backend automation',
    ],
    ownership: [
      'Built the multi-step Hab-Reeh Harmonic Assessment flow — transformer capacity, inverter selection, POC compliance.',
      'Configured Dataverse table permissions and web roles across the Information, Demand-User and Brand entities.',
      'Wired the Power Automate cloud flow consumer for backend automation.',
    ],
    outcomes: [
      'Gave DEWA solar stakeholders a self-service design-stage compliance check.',
      'Secured stakeholder data behind role-based Dataverse permissions.',
    ],
    repo: 'https://github.com/Athishvenkatesan/harmos_powerpage',
  },
  {
    id: 'marketing-operations-hub-video',
    title: 'Marketing Operations Hub — Explainer Video',
    category: 'Video Production',
    accent: '#007560',
    period: 'Ducont Systems · Aug 2026',
    periodStart: '2026-08',
    tagline: '2-minute animated explainer for DEWA\'s Marketing Operations Hub',
    summary:
      'A narrated, fully animated 2-minute explainer video (Remotion + React) turning DEWA Marketing Operations Hub\'s UAT sign-off, solution design, and architecture documents into one stakeholder-ready video.',
    description: [
      'Condenses three source documents — a Solution Design Document, a UAT Sign-Off report (100% pass rate across 45 test cases), and an Architecture deck — into a 2-minute, 9-scene animated video for DEWA marketing leadership and the Power Platform project team.',
      'Built with Remotion (React 19 + TypeScript), each of the 9 scenes is a bespoke composition: a scattered-node diagram for the fragmented as-is process, a hub-and-spoke diagram for the unified solution, dashboard and campaign-view mockups, a Power Platform architecture pipeline (Entra ID → Power Apps → Power Automate → Dataverse), a before/after benefits comparison, and a progress-ring UAT sign-off badge — all narrated with synced ElevenLabs voiceover.',
    ],
    stack: ['Remotion', 'React 19', 'TypeScript', 'ElevenLabs (narration)'],
    highlights: [
      '9 bespoke scene compositions, no reused layouts',
      'Narrates the shift from scattered Excel/email tracking to one Power Apps + Dataverse platform',
      'Communicates measurable benefits — up to 1,200 hours/year saved — and a 100% UAT pass rate',
      'Custom center-expanding crossfade transition + DEWA-green motion design system',
    ],
    ownership: [
      'Condensed three source documents (Solution Design, UAT Sign-Off, Architecture) into a single narrative.',
      'Designed and built all 9 bespoke Remotion scene compositions.',
      'Directed and synced the ElevenLabs narration to picture.',
    ],
    outcomes: [
      'Delivered a 2-minute stakeholder-ready explainer replacing a 3-document read.',
      'Communicated a 100% UAT pass rate and measurable time savings in one watch.',
    ],
    repo: 'https://github.com/Athishvenkatesan/marketing-operations-hub-video',
  },
  {
    id: 'al-sheraa-readiness-video',
    title: 'Al Sheraa Readiness Video',
    category: 'Video Production',
    accent: '#00967d',
    period: 'Ducont Systems · Aug 2026',
    periodStart: '2026-08',
    tagline: '3-minute animated infographic video from a 12-page executive readiness report',
    summary:
      'Turns the Al Sheraa Executive Operational Readiness Report into a fully animated, narrated 3-minute video for DEWA executive stakeholders — 13 bespoke scenes covering physical progress, the CxL5 commissioning bottleneck, and the closing mandate.',
    description: [
      'The source report — 12 pages, dense with funnels, gauges, and layered diagrams — tracks Al Sheraa\'s transition from construction completion to operating as the "world\'s smartest Positive Zero headquarters." This video re-expresses the same data (99.11% physical completion, 84.28% commissioning, the CxL5 integration bottleneck, 26,069 logged defects) as a single animated, ElevenLabs-narrated video.',
      'Built with Remotion (React 19 + TypeScript): 13 scenes spanning the executive command-centre snapshot, contract package status (T2–T9), the BMS/HVAC control hierarchy, the employee/visitor experience, Positive Zero performance, and an 8-point closing mandate.',
    ],
    stack: ['Remotion', 'React 19', 'TypeScript', 'ElevenLabs (narration)'],
    highlights: [
      '13 scenes, 3-minute runtime, full ElevenLabs voiceover synced to picture',
      'Visualizes 99.11% physical completion vs. 84.28% commissioning, and the CxL5 bottleneck',
      'Covers contract package status (T2–T9), snagging trajectory, and Positive Zero performance',
      'Delivered as a final rendered video (h264/aac)',
    ],
    ownership: [
      'Distilled a 12-page executive readiness report into a 13-scene narrative arc.',
      'Built the Remotion + React video-studio pipeline and all bespoke scene compositions.',
      'Directed and synced full ElevenLabs voiceover to picture.',
    ],
    outcomes: [
      'Delivered a 3-minute animated video communicating project health to executives.',
      'Made the CxL5 commissioning bottleneck and closing mandate the clear narrative focus.',
    ],
    repo: 'https://github.com/Athishvenkatesan/al-sheraa-readiness-video',
  },
  {
    id: 'al-sheraa-caio-report-video',
    title: 'Al Sheraa CAIO Executive Report Video',
    category: 'Video Production',
    accent: '#0f4f42',
    period: 'Ducont Systems · Aug 2026',
    periodStart: '2026-08',
    tagline: 'DEWA CAIO Office executive report as a 16-scene animated video',
    summary:
      'A sibling video project turning DEWA CAIO Office\'s 17-page Al Sheraa Executive Readiness Report into a fresh, fully animated video — 16 bespoke scenes covering all 12 report sections plus a new Executive Action & Governance Tracker.',
    description: [
      'Built for the same Al Sheraa program as the sibling readiness video, but sourced from a different, more detailed 17-page DEWA CAIO Office report structured across 12 numbered sections. Per an explicit "unique design for every video" directive, every scene was rewritten from scratch — no reused cards, panels, or transitions from the sibling project, only the white + DEWA-green brand language carried over.',
      'Covers the MD Executive Position, contract package status, the CxL5 critical path across 9 categories, BMS/HVAC restoration, smart-systems governance across 95 systems and six readiness gates, and a 125-item Executive Action Tracker (60 already closed) — all narrated with synced ElevenLabs voiceover.',
    ],
    stack: ['Remotion', 'React 19', 'TypeScript', 'ElevenLabs (narration)'],
    highlights: [
      '16 bespoke scenes, full ElevenLabs voiceover synced to picture',
      'Covers all 12 report sections plus a new 125-item Executive Action & Governance Tracker',
      'Every scene and transition rebuilt from scratch — zero reused layouts from the sibling video',
      'Delivered as a final rendered video (h264/aac)',
    ],
    ownership: [
      'Rebuilt every scene from scratch per the "unique design for every video" directive — no reused layouts from the sibling project.',
      'Mapped all 12 report sections, including the new Executive Action & Governance Tracker, into 16 scenes.',
      'Directed and synced full ElevenLabs voiceover across all 16 scenes.',
    ],
    outcomes: [
      'Delivered a second, visually distinct Al Sheraa video for a different stakeholder report.',
      'Surfaced the 125-item Executive Action Tracker in a format executives will actually watch.',
    ],
    repo: 'https://github.com/Athishvenkatesan/al-sheraa-caio-report-video',
  },
  {
    id: 'hr-onboarding-agent',
    title: 'HR Onboarding Agent',
    category: 'Copilot Agent',
    accent: '#ff7ab6',
    period: 'Ducont Systems · Oct 2025 – Completed',
    periodStart: '2025-10',
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
    ownership: [
      'Designed the Copilot Studio conversational onboarding flow for new hires.',
      'Built document submission/verification support into the conversation.',
      'Centralized HR policy and resource access into the same conversational agent.',
    ],
    outcomes: [
      'Digitized onboarding so new hires get guided, self-service formalities.',
      'Reduced manual HR handholding during the onboarding process.',
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
  'Video Production',
]
