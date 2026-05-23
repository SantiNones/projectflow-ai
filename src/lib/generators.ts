import type { DeveloperBrief, GeneratedProject, PMBrief, ProjectAnalysis, ProjectComplexity, ProjectPriority, ProjectProgress, ProjectRequest, ProjectRequestInput, Task } from "@/types/project";

const phases = ["Discovery", "UX/UI", "Development", "Automation", "Testing", "Deployment", "Handover"] as const;
type OutputLanguage = "en" | "es";

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

  if (includesAny(text, ["whatsapp", "instagram", "dm", "dms", "booking", "appointments", "reservations", "leads", "lead", "client requests", "intake", "messages", "manual replies", "slow replies"])) {
    return "Automation / Lead Intake";
  }

  if (includesAny(text, ["website", "landing page", "brand", "outdated site", "online presence", "seo"])) {
    return "Website Sprint";
  }

  if (includesAny(text, ["reports", "data", "tracking", "dashboard", "metrics", "kpi", "analytics"])) {
    return "Dashboard / Internal Tool";
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

function localizedProjectType(projectType: string, language: OutputLanguage) {
  if (language === "en") return projectType;
  if (projectType === "Automation / Lead Intake") return "Automatización / Intake de leads";
  if (projectType === "Website Sprint") return "Sprint de sitio web";
  if (projectType === "Dashboard / Internal Tool") return "Dashboard / Herramienta interna";
  if (projectType === "AI Assistant Prototype") return "Prototipo de asistente con IA";
  return "MVP de herramienta interna";
}

function localizedComplexity(complexity: ProjectComplexity, language: OutputLanguage) {
  if (language === "en") return complexity;
  return complexity === "High" ? "Alta" : complexity === "Low" ? "Baja" : "Media";
}

function localizedPriority(priority: ProjectPriority, language: OutputLanguage) {
  if (language === "en") return priority;
  return priority === "High" ? "Alta" : priority === "Low" ? "Baja" : "Media";
}

function buildRecommendedSolution(projectType: string, packageName: string, language: OutputLanguage) {
  if (language === "es") {
    if (projectType === "Automation / Lead Intake") return "Construir un sistema de intake que capture solicitudes, califique leads y prepare un handoff operativo claro. Centralizar el flujo reduce respuestas manuales y acelera reservas o seguimiento.";
    if (projectType === "Website Sprint") return "Construir un sitio web claro, responsive y orientado a conversión con secciones de servicio, llamadas a la acción y captura de consultas.";
    if (projectType === "Dashboard / Internal Tool") return "Construir una herramienta interna con intake estructurado, seguimiento de estado, métricas clave y exportaciones para decisiones operativas.";
    if (projectType === "AI Assistant Prototype") return "Construir un prototipo de asistente que estructure entradas, genere recomendaciones revisables y prepare una integración de IA con control humano.";
    return `Construir un ${packageName.toLowerCase()} con intake estructurado, tareas accionables y exportación lista para handoff.`;
  }

  if (projectType === "Automation / Lead Intake") return "Build a lead intake system that captures requests, qualifies leads and prepares a clear operational handoff. Centralizing the flow reduces manual replies and accelerates booking or follow-up.";
  if (projectType === "Website Sprint") return "Build a clear, responsive, conversion-focused website with service sections, calls to action and inquiry capture.";
  if (projectType === "Dashboard / Internal Tool") return "Build an internal tool with structured intake, status tracking, key metrics and exports for operational decisions.";
  if (projectType === "AI Assistant Prototype") return "Build an assistant prototype that structures inputs, generates reviewable recommendations and prepares an AI integration with human oversight.";
  return `Build a ${packageName.toLowerCase()} with structured intake, actionable tasks and handoff-ready export.`;
}

function buildAnalysis(request: ProjectRequest, language: OutputLanguage): ProjectAnalysis {
  const text = requestText(request);
  const projectType = inferProjectType(text);
  const complexity = inferComplexity(projectType, text);
  const priority = inferPriority(request, text);
  const packageName = servicePackage(projectType);

  return {
    projectType: localizedProjectType(projectType, language),
    complexity: localizedComplexity(complexity, language) as ProjectComplexity,
    priority: localizedPriority(priority, language) as ProjectPriority,
    recommendedSolution: buildRecommendedSolution(projectType, packageName, language),
    keyRisks: language === "es" ? "Alcance poco definido, ownership de handoff, requisitos incompletos y expectativas de integración pueden afectar la entrega." : "Unclear scope, handoff ownership, incomplete requirements and integration expectations can affect delivery.",
    missingInformation: language === "es" ? "Responsable de aprobación, integraciones obligatorias, métricas de éxito, timeline de lanzamiento y formato de handoff." : "Approval owner, required integrations, success metrics, launch timeline and handoff format.",
    recommendedNextStep: language === "es" ? "Realizar una sesión de discovery enfocada para validar alcance, priorizar el MVP y confirmar requisitos de handoff." : "Run a focused discovery session to validate scope, prioritize the MVP and confirm handoff requirements.",
    suggestedServicePackage: language === "es" ? localizedProjectType(projectType, language) : packageName,
  };
}

function buildPMBrief(request: ProjectRequest, analysis: ProjectAnalysis, language: OutputLanguage): PMBrief {
  const client = request.clientName || (language === "es" ? "el cliente" : "the client");
  if (language === "es") {
    return {
      executiveSummary: `${request.projectName} organiza la solicitud de ${client} en un alcance claro, un plan de entrega y tareas accionables.`,
      clientGoal: "Reducir ambigüedad, acelerar el handoff y convertir la solicitud inicial en un plan ejecutable.",
      mvpScope: "Intake estructurado, análisis del proyecto, briefs para PM y desarrollo, tareas por fase, seguimiento de progreso y exportación JSON/CSV.",
      outOfScope: "Autenticación, pagos, base de datos, IA externa y ejecución real de webhooks.",
      deliveryPhases: "Discovery, UX/UI, desarrollo, automatización, testing, deployment y handover.",
      risks: analysis.keyRisks,
      clientQuestions: "¿Quién aprueba el alcance? ¿Qué herramientas reciben el handoff? ¿Qué métrica define éxito?",
      suggestedNextAction: analysis.recommendedNextStep,
    };
  }

  return {
    executiveSummary: `${request.projectName} turns ${client}'s request into a clear scope, delivery plan and actionable task list.`,
    clientGoal: "Reduce ambiguity, accelerate handoff and convert the initial request into an executable plan.",
    mvpScope: `Capture the current request flow, design a polished intake experience, generate structured outputs and prepare handoff-ready exports for ${request.solutionType || analysis.suggestedServicePackage}.`,
    outOfScope: "Authentication, payments, database persistence, live AI generation and real third-party workflow execution are intentionally excluded from this MVP.",
    deliveryPhases: "Discovery, UX/UI, development, automation preparation, testing, deployment and stakeholder handover.",
    risks: analysis.keyRisks,
    clientQuestions: `Who approves the final scope? Which tools must receive the output? What makes this project successful for ${request.clientName || "the client"}?`,
    suggestedNextAction: analysis.recommendedNextStep,
  };
}

function buildDeveloperBrief(analysis: ProjectAnalysis, language: OutputLanguage): DeveloperBrief {
  const type = language === "es" ? analysis.projectType : analysis.projectType;
  const isSpanish = language === "es";

  if (type.includes("Website") || type.includes("sitio web")) {
    if (isSpanish) return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, secciones responsive, configuración de contenido y SEO básico.",
      mainFeatures: "Secciones de servicio, formulario de contacto, CTAs, navegación responsive y elementos de confianza.",
      reusableComponents: "Hero, encabezados de sección, cards, formulario, bloques CTA y secciones de prueba social.",
      dataModelIdea: "WebsiteProject con pageSections, leadForm, services, seoMetadata y conversionEvents.",
      suggestedApiEndpoints: "POST /api/contact para captura de consultas.",
      integrationOptions: "Email routing, CRM webhook, Make, n8n, Zapier o Power Automate.",
      technicalRisks: "Contenido incompleto, pulido mobile, protección antispam y expectativas SEO.",
    };
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, responsive section components, structured content configuration and basic SEO metadata.",
      mainFeatures: "Landing sections, service overview, lead/contact form, trust indicators, responsive navigation and conversion-focused CTAs.",
      reusableComponents: "Hero, section header, feature cards, FAQ blocks, contact form, CTA bands and testimonial or proof cards.",
      dataModelIdea: "WebsiteProject with pageSections, leadForm, services, seoMetadata and conversionEvents objects.",
      suggestedApiEndpoints: "POST /api/contact for lead capture and structured inquiry routing.",
      integrationOptions: "Email routing, CRM webhook, Make, n8n, Zapier or Power Automate lead handoff.",
      technicalRisks: "Content readiness, mobile polish, form spam protection and SEO expectations.",
    };
  }

  if (type.includes("Dashboard") || type.includes("Herramienta interna")) {
    if (isSpanish) return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, estado local, utilidades de exportación y componentes de tablas/filtros.",
      mainFeatures: "Intake de datos, cards de métricas, tablas, filtros, seguimiento de estado y exportaciones.",
      reusableComponents: "Metric cards, filas de tabla, filtros, badges de estado, paneles de detalle y bloques de exportación.",
      dataModelIdea: "InternalToolProject con entities, metrics, filters, records, tasks, progress y exportPayload.",
      suggestedApiEndpoints: "GET /api/records, POST /api/records y POST /api/export para una versión server-backed.",
      integrationOptions: "CSV, Google Sheets, Airtable, Make, n8n, Zapier y Power Automate.",
      technicalRisks: "Cambios en datos, permisos, performance y alineación con la fuente de verdad.",
    };
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, local state, export utilities and structured table/filter components.",
      mainFeatures: "Data intake, dashboard cards, tables, filters, status tracking, export controls and saved project state.",
      reusableComponents: "Metric cards, table rows, filter bars, status badges, detail panels and export blocks.",
      dataModelIdea: "InternalToolProject with entities, metrics, filters, records, tasks, progress and exportPayload objects.",
      suggestedApiEndpoints: "GET /api/records, POST /api/records and POST /api/export for a server-backed version.",
      integrationOptions: "CSV import/export, Google Sheets, Airtable, Make, n8n, Zapier and Power Automate.",
      technicalRisks: "Data shape changes, permissions, dashboard performance and source-of-truth alignment.",
    };
  }

  if (type.includes("AI") || type.includes("IA")) {
    if (isSpanish) return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, plantillas de prompt, estados de revisión y estructuras listas para IA.",
      mainFeatures: "Intake estructurado, payloads para prompts, recomendaciones revisables, controles de exportación y auditoría.",
      reusableComponents: "Paneles de prompt, cards de resultado, indicadores, checklist de revisión, tareas y exportación.",
      dataModelIdea: "AssistantProject con request, promptTemplate, generatedDraft, reviewNotes, tasks y automationPayload.",
      suggestedApiEndpoints: "POST /api/generate-assistant-response y POST /api/review para una versión server-backed.",
      integrationOptions: "Handoff listo para OpenAI API, Make, n8n, Zapier, Power Automate y revisión interna.",
      technicalRisks: "Consistencia de prompts, control de alucinaciones, datos sensibles y claridad del flujo de revisión.",
    };
    return {
      suggestedStack: "Next.js, TypeScript, Tailwind CSS, prompt templates, review states and AI-ready response structures.",
      mainFeatures: "Structured intake, prompt-ready payloads, generated recommendations, review states, export controls and audit-friendly outputs.",
      reusableComponents: "Prompt panels, result cards, confidence indicators, review checklist, task cards and export blocks.",
      dataModelIdea: "AssistantProject with request, promptTemplate, generatedDraft, reviewNotes, tasks and automationPayload objects.",
      suggestedApiEndpoints: "POST /api/generate-assistant-response and POST /api/review for a server-backed version.",
      integrationOptions: "OpenAI API-ready handoff, Make, n8n, Zapier, Power Automate and internal review queues.",
      technicalRisks: "Prompt consistency, hallucination controls, sensitive data handling and review workflow clarity.",
    };
  }

  return {
    suggestedStack: "Next.js, TypeScript, Tailwind CSS, structured forms, local storage, JSON/CSV export utilities and webhook-ready payloads.",
    mainFeatures: "Project intake, demo loading, generated analysis, PM brief, developer brief, task tracking, progress updates and automation-ready exports.",
    reusableComponents: "Intake fields, demo cards, dashboard cards, brief cards, task status controls, progress bar and export blocks.",
    dataModelIdea: "GeneratedProject with request, analysis, pmBrief, developerBrief, tasks, progress and automationPayload objects.",
    suggestedApiEndpoints: "POST /api/generate-brief, POST /api/load-demo and POST /api/export-webhook for a server-backed version.",
    integrationOptions: "Make webhook, n8n workflow trigger, Zapier catch hook and Power Automate HTTP request.",
    technicalRisks: "Export schema versioning, webhook error handling, inconsistent user inputs and persistence strategy.",
  };
}

function taskTitle(phase: string, analysis: ProjectAnalysis, request: ProjectRequest, index: number, language: OutputLanguage) {
  if (language === "es") {
    const client = request.clientName || "el cliente";
    const titleMap: Record<string, string[]> = {
      Discovery: ["Validar objetivos y criterios de éxito", "Mapear responsables y ruta de aprobación"],
      "UX/UI": ["Diseñar flujo de intake y resultados", "Refinar dashboard responsive del proyecto"],
      Development: ["Construir componentes reutilizables", "Conectar estado generado del proyecto"],
      Automation: ["Preparar schema de exportación", "Definir handoff JSON/CSV listo para workflow"],
      Testing: ["Probar demos y validación del formulario", "Revisar estados de tareas y progreso"],
      Deployment: ["Ejecutar build de producción", "Preparar handoff de deployment"],
      Handover: ["Documentar supuestos y riesgos", `Compartir próximos pasos para ${client}`],
    };
    return titleMap[phase]?.[index] || `Preparar tarea de ${phase.toLowerCase()}`;
  }

  const projectType = analysis.projectType.toLowerCase();
  const titleMap: Record<string, string[]> = {
    Discovery: [`Validate ${projectType} goals`, "Map stakeholder approval path"],
    "UX/UI": ["Design intake and output flow", "Refine responsive project dashboard"],
    Development: ["Build reusable MVP components", "Connect generated project state"],
    Automation: ["Prepare export payload schema", "Define CSV and webhook-ready handoff"],
    Testing: ["Test demo cases and form validation", "Review task status and progress updates"],
    Deployment: ["Run production build", "Prepare Vercel deployment handoff"],
    Handover: ["Document assumptions and risks", `Share next-step recommendations for ${request.clientName || "the client"}`],
  };

  return titleMap[phase]?.[index] || `Prepare ${phase.toLowerCase()} task`;
}

function buildTasks(request: ProjectRequest, analysis: ProjectAnalysis, language: OutputLanguage): Task[] {
  return phases.flatMap((phase, phaseIndex) => [0, 1].map((taskIndex) => ({
    id: createId(`task-${phaseIndex}-${taskIndex}`),
    title: taskTitle(phase, analysis, request, taskIndex, language),
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

export function generateProject(input: ProjectRequestInput, language: OutputLanguage = "en"): GeneratedProject {
  const now = new Date().toISOString();
  const request: ProjectRequest = {
    id: createId("request"),
    ...input,
    createdAt: now,
  };
  const analysis = buildAnalysis(request, language);
  const pmBrief = buildPMBrief(request, analysis, language);
  const developerBrief = buildDeveloperBrief(analysis, language);
  const tasks = buildTasks(request, analysis, language);
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
