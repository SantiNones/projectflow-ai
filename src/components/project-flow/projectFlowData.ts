export const valueCards = [
  { title: "PM Brief", description: "Executive context, MVP boundaries, delivery phases, risks and client questions." },
  { title: "Developer Brief", description: "Technical scope, suggested architecture, reusable components, API ideas and integrations." },
  { title: "Automation Export", description: "Workflow-ready JSON and CSV output prepared for Make, n8n, Zapier and Power Automate." },
];

export const intakeFields = [
  ["Project name", "Client portal modernization"],
  ["Client / company", "Northstar Services"],
  ["Industry", "Professional services"],
  ["Main problem", "Requests arrive through email, calls and spreadsheets with no consistent scope."],
  ["Desired outcome", "A clear intake flow that produces actionable delivery plans."],
  ["Current process", "Manual triage, repeated clarification calls and ad hoc task assignment."],
  ["Current tools", "Google Workspace, Slack, Trello, Typeform"],
  ["Urgency", "High - proposal needed this week"],
  ["Budget range", "$8k - $15k"],
  ["Solution type", "Client intake system + automation"],
  ["Extra notes", "Leadership wants a credible first version before expanding to all departments."],
];

export const demoCases = [
  { title: "Clinical Lab Website + Patient Inquiry Flow", industry: "Healthcare diagnostics", problem: "Patients ask about services through scattered WhatsApp messages and phone calls.", solution: "A service-led website with inquiry routing, patient FAQ capture and follow-up automation." },
  { title: "Tattoo Studio Lead Intake + Booking Workflow", industry: "Creative services", problem: "Artists receive incomplete design requests and spend hours qualifying leads manually.", solution: "A guided brief form, quote readiness scoring and booking handoff for approved leads." },
  { title: "Internal Consulting Request Intake", industry: "Enterprise operations", problem: "Departments submit vague improvement requests without success criteria or constraints.", solution: "A standardized consulting intake that converts needs into scope, tasks and decision points." },
];

export const dashboardItems = [
  ["Project type", "Digital intake and workflow automation"],
  ["Complexity", "Medium"],
  ["Priority", "High"],
  ["Recommended solution", "Build a structured project brief generator with reusable output templates."],
  ["Key risks", "Incomplete stakeholder input, unclear handoff ownership, undefined success metrics."],
  ["Missing information", "Approval process, exact integrations, reporting requirements, launch timeline."],
  ["Recommended next step", "Run a 45-minute discovery session and validate the MVP scope."],
  ["Suggested service package", "Strategy Sprint + Prototype + Automation Setup"],
];

export const pmBrief = [
  ["Executive summary", "ProjectFlow AI converts unstructured business requests into clear project scope, delivery roadmap and automation-ready task plan."],
  ["Client goal", "Reduce ambiguity during project intake and accelerate handoff from sales or consulting to delivery teams."],
  ["MVP scope", "Guided intake form, demo cases, generated PM brief, developer brief, task plan and export preview."],
  ["Out of scope", "Authentication, billing, live AI generation, database persistence and third-party workflow execution."],
  ["Delivery phases", "Discovery, UX/UI, prototype build, export formatting, QA review and stakeholder handover."],
  ["Risks", "Overly broad inputs, inconsistent terminology and missing decision-maker requirements."],
  ["Questions for the client", "Who approves scope, what tools must receive exported data and what defines a qualified project?"],
  ["Suggested next action", "Confirm intake questions and prioritize the first export format."],
];

export const developerBrief = [
  ["Suggested stack", "Next.js, TypeScript, Tailwind CSS, server actions later, JSON export utilities and optional workflow webhooks."],
  ["Main features", "Project intake, demo loading, generated output panels, brief tabs, task breakdown and export controls."],
  ["Reusable components", "Section shells, cards, field rows, tab panels, status badges, task cards and export preview blocks."],
  ["Data model idea", "ProjectBrief with intake, analysis, pmBrief, developerBrief, tasks and automationPayload objects."],
  ["Suggested API endpoints", "POST /api/generate-brief, POST /api/load-demo, POST /api/export-webhook."],
  ["Integration options", "Make webhook, n8n workflow trigger, Zapier catch hook and Power Automate HTTP request."],
  ["Technical risks", "Prompt consistency, export schema versioning, sensitive client data and webhook error handling."],
];

export const taskGroups = [
  { phase: "Discovery", tasks: ["Validate intake questions", "Map stakeholder approval path"] },
  { phase: "UX/UI", tasks: ["Design intake screen", "Refine generated result hierarchy"] },
  { phase: "Development", tasks: ["Build reusable brief components", "Create export payload model"] },
  { phase: "Automation", tasks: ["Prepare webhook schema", "Define CSV mapping"] },
  { phase: "Testing", tasks: ["Review demo cases", "Test responsive layouts"] },
  { phase: "Deployment", tasks: ["Run production build", "Prepare preview environment"] },
  { phase: "Handover", tasks: ["Document assumptions", "Share next-step recommendations"] },
];

export const jsonPreview = `{
  "projectName": "Client portal modernization",
  "projectType": "Digital intake and workflow automation",
  "priority": "High",
  "recommendedSolution": "Structured project brief generator",
  "integrations": ["Make", "n8n", "Zapier", "Power Automate"],
  "nextStep": "Run discovery session and validate MVP scope"
}`;
