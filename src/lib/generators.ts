import type { DeveloperBrief, GeneratedProject, PMBrief, ProjectAnalysis, ProjectComplexity, ProjectPriority, ProjectProgress, ProjectRequest, ProjectRequestInput, Task } from "@/types/project";

const phases = ["Discovery", "UX/UI", "Development", "Automation", "Testing", "Deployment", "Handover"] as const;

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word));
}

function requestText(request: ProjectRequestInput | ProjectRequest) {
  return [request.projectName, request.clientName, request.industry, request.mainProblem, request.desiredOutcome, request.currentProcess, request.currentTools, request.urgency, request.budgetRange, request.solutionType, request.extraNotes].join(" ");
}

function inferProjectType(text: string) {
  if (includesAny(text, ["ai", "assistant", "chatbot", "classification", "summarization", "summarisation", "prompt"])) {
    return "AI Assistant Prototype";
  }

  if (includesAny(text, ["reports", "data", "tracking", "dashboard", "metrics", "kpi", "analytics"])) {
    return "Dashboard / Internal Tool";
  }

  if (includesAny(text, ["website", "landing page", "brand", "outdated site", "online presence", "seo"])) {
    return "Website Sprint";
  }

  if (includesAny(text, ["whatsapp", "booking", "appointments", "leads", "instagram", "messages", "manual replies", "slow replies"])) {
    return "Automation / Lead Intake";
  }

  if (includesAny(text, ["repetitive tasks", "admin work", "manual process", "manual", "spreadsheet", "triage"])) {
    return "Automation / Lead Intake";
  }

  return "Internal Tool MVP";
}

function inferComplexity(projectType: string, text: string): ProjectComplexity {
  if (projectType === "AI Assistant Prototype" || includesAny(text, ["integrations", "multiple tools", "complex workflows", "dashboard", "data", "ai", "webhook", "api"])) {
    return "High";
  }

  if (includesAny(text, ["forms", "exports", "automation", "workflow", "booking", "leads", "sections", "csv", "json"])) {
    return "Medium";
  }

  if (projectType === "Website Sprint" || includesAny(text, ["landing page", "simple intake form"])) {
    return "Low";
  }

  return "Medium";
}

function inferPriority(request: ProjectRequestInput | ProjectRequest, text: string): ProjectPriority {
  const urgent = includesAny(request.urgency, ["high", "alta", "urgent", "this week", "asap", "deadline"]);
  const slowManual = includesAny(text, ["manual", "slow", "repetitive", "admin work", "manual replies", "spreadsheet"]);
  const exploratory = includesAny(text, ["exploratory", "idea", "experiment", "not urgent", "low priority"]);

  if (urgent && slowManual) {
    return "High";
  }

  if (exploratory) {
    return "Low";
  }

  return "Medium";
}

function servicePackage(projectType: string) {
  if (projectType === "Website Sprint") return "Website Sprint";
  if (projectType === "Automation / Lead Intake") return "Lead Intake System";
  if (projectType === "Dashboard / Internal Tool") return "Internal Tool MVP";
  if (projectType === "AI Assistant Prototype") return "AI Assistant Prototype";
  return "Automation Sprint";
}

function buildAnalysis(request: ProjectRequest): ProjectAnalysis {
  const text = requestText(request);
  const projectType = inferProjectType(text);
  const complexity = inferComplexity(projectType, text);
  const priority = inferPriority(request, text);
  const packageName = servicePackage(projectType);

  return {
    projectType,
    complexity,
    priority,
    recommendedSolution: `Create a ${packageName.toLowerCase()} for ${request.clientName || "the client"} that addresses ${request.mainProblem.toLowerCase()} and moves the team toward ${request.desiredOutcome.toLowerCase()}.`,
    keyRisks: complexity === "High" ? "Integration scope, data quality, unclear ownership and workflow edge cases may expand the MVP." : "Incomplete requirements, unclear handoff ownership and missing success criteria could slow delivery.",
    missingInformation: "Decision-maker approval path, must-have integrations, reporting expectations, launch timeline and success metrics.",
    recommendedNextStep: `Run a focused discovery session to validate the ${projectType.toLowerCase()} scope, prioritize MVP features and confirm export or handoff requirements.`,
    suggestedServicePackage: packageName,
  };
}

function buildPMBrief(request: ProjectRequest, analysis: ProjectAnalysis): PMBrief {
  return {
    executiveSummary: `${request.projectName} is a ${analysis.projectType.toLowerCase()} initiative for ${request.clientName || "the client"} designed to solve ${request.mainProblem.toLowerCase()} with a clear MVP and delivery plan.`,
    clientGoal: request.desiredOutcome,
    mvpScope: `Capture the current request flow, design a polished intake experience, generate structured outputs and prepare handoff-ready exports for ${request.solutionType || analysis.suggestedServicePackage}.`,
    outOfScope: "Authentication, payments, database persistence, live AI generation and real third-party workflow execution are intentionally excluded from this MVP.",
    deliveryPhases: "Discovery, UX/UI, development, automation preparation, testing, deployment and stakeholder handover.",
    risks: analysis.keyRisks,
    clientQuestions: `Who approves the final scope? Which tools must receive the output? What makes this project successful for ${request.clientName || "the client"}?`,
    suggestedNextAction: analysis.recommendedNextStep,
  };
}

function buildDeveloperBrief(request: ProjectRequest, analysis: ProjectAnalysis): DeveloperBrief {
  const type = analysis.projectType;

  if (type === "Website Sprint") {
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, responsive section components, static content configuration and basic SEO metadata.",
      mainFeatures: "Landing sections, service overview, lead/contact form, trust indicators, responsive navigation and conversion-focused CTAs.",
      reusableComponents: "Hero, section header, feature cards, FAQ blocks, contact form, CTA bands and testimonial or proof cards.",
      dataModelIdea: "WebsiteProject with pageSections, leadForm, services, seoMetadata and conversionEvents objects.",
      suggestedApiEndpoints: "POST /api/contact later if lead capture moves beyond static export.",
      integrationOptions: "Email routing, CRM webhook, Make, n8n, Zapier or Power Automate lead handoff.",
      technicalRisks: "Content readiness, mobile polish, form spam protection and SEO expectations.",
    };
  }

  if (type === "Dashboard / Internal Tool") {
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, local state first, future API layer and structured table/filter components.",
      mainFeatures: "Data intake, dashboard cards, tables, filters, status tracking, export controls and saved project state.",
      reusableComponents: "Metric cards, table rows, filter bars, status badges, detail panels and export preview blocks.",
      dataModelIdea: "InternalToolProject with entities, metrics, filters, records, tasks, progress and exportPayload objects.",
      suggestedApiEndpoints: "GET /api/records, POST /api/records, POST /api/export later when persistence is added.",
      integrationOptions: "CSV import/export, Google Sheets, Airtable, Make, n8n, Zapier and Power Automate.",
      technicalRisks: "Data shape changes, permissions, dashboard performance and source-of-truth alignment.",
    };
  }

  if (type === "AI Assistant Prototype") {
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, prompt templates, local mock responses now and future OpenAI API integration with human review.",
      mainFeatures: "Structured intake, prompt-ready payloads, generated recommendations, review states, export controls and audit-friendly outputs.",
      reusableComponents: "Prompt panels, result cards, confidence indicators, review checklist, task cards and export preview blocks.",
      dataModelIdea: "AssistantProject with request, promptTemplate, generatedDraft, reviewNotes, tasks and automationPayload objects.",
      suggestedApiEndpoints: "POST /api/generate-assistant-response and POST /api/review later when external AI is introduced.",
      integrationOptions: "Future OpenAI API, Make, n8n, Zapier, Power Automate and internal review queues.",
      technicalRisks: "Prompt consistency, hallucination controls, sensitive data handling and review workflow clarity.",
    };
  }

  return {
    suggestedStack: "Next.js, TypeScript, Tailwind CSS, structured forms, local storage, JSON/CSV export utilities and future webhook handlers.",
    mainFeatures: "Project intake, demo loading, generated analysis, PM brief, developer brief, task tracking, progress updates and automation-ready exports.",
    reusableComponents: "Intake fields, demo cards, dashboard cards, brief cards, task status controls, progress bar and export preview blocks.",
    dataModelIdea: "GeneratedProject with request, analysis, pmBrief, developerBrief, tasks, progress and automationPayload objects.",
    suggestedApiEndpoints: "POST /api/generate-brief, POST /api/load-demo and POST /api/export-webhook later when server-side features are needed.",
    integrationOptions: "Make webhook, n8n workflow trigger, Zapier catch hook and Power Automate HTTP request.",
    technicalRisks: "Export schema versioning, webhook error handling, inconsistent user inputs and future persistence strategy.",
  };
}

function taskTitle(phase: string, analysis: ProjectAnalysis, request: ProjectRequest, index: number) {
  const projectType = analysis.projectType.toLowerCase();
  const titleMap: Record<string, string[]> = {
    Discovery: [`Validate ${projectType} goals`, "Map stakeholder approval path"],
    "UX/UI": ["Design intake and output flow", "Refine responsive project dashboard"],
    Development: ["Build reusable MVP components", "Connect generated project state"],
    Automation: ["Prepare export payload schema", "Define CSV and webhook-ready handoff"],
    Testing: ["Test demo cases and form validation", "Review task status and progress updates"],
    Deployment: ["Run production build", "Prepare Vercel preview handoff"],
    Handover: ["Document assumptions and risks", `Share next-step recommendations for ${request.clientName || "the client"}`],
  };

  return titleMap[phase]?.[index] || `Prepare ${phase.toLowerCase()} task`;
}

function buildTasks(request: ProjectRequest, analysis: ProjectAnalysis): Task[] {
  return phases.flatMap((phase, phaseIndex) => [0, 1].map((taskIndex) => ({
    id: createId(`task-${phaseIndex}-${taskIndex}`),
    title: taskTitle(phase, analysis, request, taskIndex),
    phase,
    priority: taskIndex === 0 || analysis.priority === "High" ? analysis.priority : "Medium",
    status: "To do" as const,
    estimatedEffort: analysis.complexity === "High" ? (taskIndex === 0 ? "4-6h" : "3-5h") : taskIndex === 0 ? "3-5h" : "2-4h",
  })));
}

export function calculateProgress(tasks: Task[]): ProjectProgress {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const percentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return { completedTasks, totalTasks, percentage };
}

export function generateProject(input: ProjectRequestInput): GeneratedProject {
  const now = new Date().toISOString();
  const request: ProjectRequest = {
    id: createId("request"),
    ...input,
    createdAt: now,
  };
  const analysis = buildAnalysis(request);
  const pmBrief = buildPMBrief(request, analysis);
  const developerBrief = buildDeveloperBrief(request, analysis);
  const tasks = buildTasks(request, analysis);
  const progress = calculateProgress(tasks);
  const id = createId("project");

  return {
    id,
    request,
    analysis,
    pmBrief,
    developerBrief,
    tasks,
    progress,
    automationPayload: {
      projectId: id,
      projectName: request.projectName,
      clientName: request.clientName,
      projectType: analysis.projectType,
      priority: analysis.priority,
      complexity: analysis.complexity,
      suggestedServicePackage: analysis.suggestedServicePackage,
      handoffTools: ["Make", "n8n", "Zapier", "Power Automate"],
      nextStep: analysis.recommendedNextStep,
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function updateProjectTasks(project: GeneratedProject, tasks: Task[]): GeneratedProject {
  return {
    ...project,
    tasks,
    progress: calculateProgress(tasks),
    updatedAt: new Date().toISOString(),
  };
}
