import type { GeneratedProject, Task } from "@/types/project";

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function projectToJson(project: GeneratedProject) {
  return JSON.stringify(project, null, 2);
}

export function tasksToCsv(tasks: Task[]) {
  const rows = [
    ["Phase", "Task", "Priority", "Status", "Estimated effort"],
    ...tasks.map((task) => [task.phase, task.title, task.priority, task.status, task.estimatedEffort]),
  ];

  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}

export function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function projectToAutomationPayload(project: GeneratedProject) {
  return {
    projectId: project.id,
    projectName: project.request.projectName,
    clientName: project.request.clientName,
    industry: project.request.industry,
    projectType: project.analysis.projectType,
    priority: project.analysis.priority,
    complexity: project.analysis.complexity,
    suggestedServicePackage: project.analysis.suggestedServicePackage,
    recommendedSolution: project.analysis.recommendedSolution,
    nextStep: project.analysis.recommendedNextStep,
    mainProblem: project.request.mainProblem,
    desiredOutcome: project.request.desiredOutcome,
    currentTools: project.request.currentTools,
    progressPercentage: project.progress.percentage,
    completedTasks: project.progress.completedTasks,
    totalTasks: project.progress.totalTasks,
    createdAt: project.createdAt,
  };
}

export function projectToHandoffSummary(project: GeneratedProject, language: "en" | "es" = "en") {
  if (language === "es") {
    return [
      "Nuevo proyecto generado en ProjectFlow AI",
      "",
      `Cliente: ${project.request.clientName || "Sin cliente definido"}`,
      `Proyecto: ${project.request.projectName}`,
      `Industria: ${project.request.industry || "No especificada"}`,
      `Tipo: ${project.analysis.projectType}`,
      `Prioridad: ${project.analysis.priority}`,
      `Complejidad: ${project.analysis.complexity}`,
      `Paquete sugerido: ${project.analysis.suggestedServicePackage}`,
      "",
      "Solución recomendada:",
      project.analysis.recommendedSolution,
      "",
      "Siguiente paso:",
      project.analysis.recommendedNextStep,
      "",
      "Progreso:",
      `${project.progress.completedTasks}/${project.progress.totalTasks} tareas completadas — ${project.progress.percentage}%`,
    ].join("\n");
  }

  return [
    "New ProjectFlow AI project",
    "",
    `Client: ${project.request.clientName || "No client defined"}`,
    `Project: ${project.request.projectName}`,
    `Industry: ${project.request.industry || "Not specified"}`,
    `Type: ${project.analysis.projectType}`,
    `Priority: ${project.analysis.priority}`,
    `Complexity: ${project.analysis.complexity}`,
    `Suggested package: ${project.analysis.suggestedServicePackage}`,
    "",
    "Recommended solution:",
    project.analysis.recommendedSolution,
    "",
    "Next step:",
    project.analysis.recommendedNextStep,
    "",
    "Progress:",
    `${project.progress.completedTasks}/${project.progress.totalTasks} tasks completed — ${project.progress.percentage}%`,
  ].join("\n");
}