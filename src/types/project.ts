export type ProjectComplexity = "Low" | "Medium" | "High";
export type ProjectPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To do" | "In progress" | "Done";

export interface ProjectRequest {
  id: string;
  projectName: string;
  clientName: string;
  industry: string;
  mainProblem: string;
  desiredOutcome: string;
  currentProcess: string;
  currentTools: string;
  urgency: string;
  budgetRange: string;
  solutionType: string;
  extraNotes: string;
  createdAt: string;
}

export interface ProjectAnalysis {
  projectType: string;
  complexity: ProjectComplexity;
  priority: ProjectPriority;
  recommendedSolution: string;
  keyRisks: string;
  missingInformation: string;
  recommendedNextStep: string;
  suggestedServicePackage: string;
}

export interface PMBrief {
  executiveSummary: string;
  clientGoal: string;
  mvpScope: string;
  outOfScope: string;
  deliveryPhases: string;
  risks: string;
  clientQuestions: string;
  suggestedNextAction: string;
}

export interface DeveloperBrief {
  suggestedStack: string;
  mainFeatures: string;
  reusableComponents: string;
  dataModelIdea: string;
  suggestedApiEndpoints: string;
  integrationOptions: string;
  technicalRisks: string;
}

export interface Task {
  id: string;
  title: string;
  phase: string;
  priority: ProjectPriority;
  status: TaskStatus;
  estimatedEffort: string;
}

export interface ProjectProgress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

export interface GeneratedProject {
  id: string;
  request: ProjectRequest;
  analysis: ProjectAnalysis;
  pmBrief: PMBrief;
  developerBrief: DeveloperBrief;
  tasks: Task[];
  progress: ProjectProgress;
  automationPayload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type ProjectRequestInput = Omit<ProjectRequest, "id" | "createdAt">;
