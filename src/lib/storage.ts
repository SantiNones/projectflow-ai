import type { GeneratedProject } from "@/types/project";

const historyKey = "projectflow-ai-history";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getProjectHistory(): GeneratedProject[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(historyKey);
    return raw ? (JSON.parse(raw) as GeneratedProject[]) : [];
  } catch {
    return [];
  }
}

export function saveProjectToHistory(project: GeneratedProject) {
  if (!isBrowser()) {
    return [];
  }

  const existing = getProjectHistory().filter((item) => item.id !== project.id);
  const next = [project, ...existing].slice(0, 12);
  window.localStorage.setItem(historyKey, JSON.stringify(next));
  return next;
}

export function deleteProjectFromHistory(projectId: string) {
  if (!isBrowser()) {
    return [];
  }

  const next = getProjectHistory().filter((item) => item.id !== projectId);
  window.localStorage.setItem(historyKey, JSON.stringify(next));
  return next;
}

export function clearProjectHistory() {
  if (!isBrowser()) {
    return [];
  }

  window.localStorage.removeItem(historyKey);
  return [];
}
