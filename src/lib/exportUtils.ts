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
