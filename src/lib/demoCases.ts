import type { ProjectRequestInput } from "@/types/project";

export type DemoCase = {
  id: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  request: ProjectRequestInput;
};

export const demoCases: DemoCase[] = [
  {
    id: "clinical-lab",
    title: "Clinical Lab Website + Patient Inquiry Flow",
    industry: "Healthcare diagnostics",
    problem: "Patients ask about services through scattered WhatsApp messages and phone calls.",
    solution: "A service-led website with inquiry routing, patient FAQ capture and follow-up automation.",
    request: {
      projectName: "Clinical lab website and patient inquiry flow",
      clientName: "IZERH Clinical Lab",
      industry: "Healthcare diagnostics",
      mainProblem: "Patients ask about lab services, appointments and results through scattered WhatsApp messages and phone calls.",
      desiredOutcome: "Launch a professional website with clear service information and a structured inquiry flow for patients and companies.",
      currentProcess: "Manual replies, repeated explanations and no central source for service details or patient questions.",
      currentTools: "WhatsApp, phone calls, email and spreadsheets",
      urgency: "High - the team wants to reduce slow replies this month",
      budgetRange: "$5k - $10k",
      solutionType: "Website sprint + lead intake automation",
      extraNotes: "The first version should be credible for both private patients and enterprise clients.",
    },
  },
  {
    id: "tattoo-studio",
    title: "Tattoo Studio Lead Intake + Booking Workflow",
    industry: "Creative services",
    problem: "Artists receive incomplete design requests and spend hours qualifying leads manually.",
    solution: "A guided brief form, quote readiness scoring and booking handoff for approved leads.",
    request: {
      projectName: "Tattoo studio lead intake and booking workflow",
      clientName: "Blackline Tattoo Studio",
      industry: "Creative services",
      mainProblem: "Artists receive incomplete Instagram and WhatsApp messages, then spend hours asking for size, placement, references and availability.",
      desiredOutcome: "Create a guided lead intake flow that qualifies requests and makes booking handoff faster.",
      currentProcess: "Manual replies through Instagram DMs, WhatsApp and notes in spreadsheets.",
      currentTools: "Instagram, WhatsApp, Google Sheets and calendar links",
      urgency: "Medium - clear business need but no hard deadline",
      budgetRange: "$3k - $8k",
      solutionType: "Lead intake system",
      extraNotes: "The team wants a premium client experience without adding payments yet.",
    },
  },
  {
    id: "consulting-intake",
    title: "Internal Consulting Request Intake",
    industry: "Enterprise operations",
    problem: "Departments submit vague improvement requests without success criteria or constraints.",
    solution: "A standardized consulting intake that converts needs into scope, tasks and decision points.",
    request: {
      projectName: "Internal consulting request intake",
      clientName: "Northstar Operations",
      industry: "Enterprise operations",
      mainProblem: "Departments submit vague improvement requests with unclear scope, no metrics and inconsistent context.",
      desiredOutcome: "Standardize request intake and generate clear project scopes, dashboard-ready metrics and delivery tasks.",
      currentProcess: "Manual triage, repeated clarification calls, spreadsheets and slow approval loops.",
      currentTools: "Google Workspace, Slack, Trello and spreadsheets",
      urgency: "High - leadership needs a proposal-ready workflow this week",
      budgetRange: "$8k - $15k",
      solutionType: "Internal tool MVP",
      extraNotes: "The workflow should support reporting dashboards and integration with automation tools.",
    },
  },
];
