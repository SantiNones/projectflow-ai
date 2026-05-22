"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { demoCases } from "@/lib/demoCases";
import { downloadTextFile, projectToJson, tasksToCsv } from "@/lib/exportUtils";
import { generateProject, updateProjectTasks } from "@/lib/generators";
import { type Language, translations } from "@/lib/i18n";
import { clearProjectHistory, deleteProjectFromHistory, getProjectHistory, saveProjectToHistory } from "@/lib/storage";
import type { DeveloperBrief, GeneratedProject, PMBrief, ProjectAnalysis, ProjectRequestInput, Task, TaskStatus } from "@/types/project";

const emptyRequest: ProjectRequestInput = {
  projectName: "",
  clientName: "",
  industry: "",
  mainProblem: "",
  desiredOutcome: "",
  currentProcess: "",
  currentTools: "",
  urgency: "",
  budgetRange: "",
  solutionType: "",
  extraNotes: "",
};

const defaultRequest: ProjectRequestInput = {
  projectName: "Client portal modernization",
  clientName: "Northstar Services",
  industry: "Professional services",
  mainProblem: "Requests arrive through email, calls and spreadsheets with no consistent scope.",
  desiredOutcome: "A clear intake flow that produces actionable delivery plans.",
  currentProcess: "Manual triage, repeated clarification calls and ad hoc task assignment.",
  currentTools: "Google Workspace, Slack, Trello, Typeform",
  urgency: "High - proposal needed this week",
  budgetRange: "$8k - $15k",
  solutionType: "Client intake system + automation",
  extraNotes: "Leadership wants a credible first version before expanding to all departments.",
};

const requestFields: (keyof ProjectRequestInput)[] = ["projectName", "clientName", "industry", "mainProblem", "desiredOutcome", "currentProcess", "currentTools", "urgency", "budgetRange", "solutionType", "extraNotes"];
const wideFields: (keyof ProjectRequestInput)[] = ["mainProblem", "desiredOutcome", "currentProcess", "extraNotes"];
const taskStatuses: TaskStatus[] = ["To do", "In progress", "Done"];

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal>
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
    </Reveal>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] ${className}`}>{children}</div>;
}

function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "blue" | "green" | "amber" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>{children}</span>;
}

export function ProjectFlowPrototype() {
  const [language, setLanguage] = useState<Language>("en");
  const [request, setRequest] = useState<ProjectRequestInput>(defaultRequest);
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [history, setHistory] = useState<GeneratedProject[]>([]);
  const [validation, setValidation] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const outputRef = useRef<HTMLElement | null>(null);
  const t = translations[language];
  const jsonPreview = useMemo(() => (project ? projectToJson(project) : JSON.stringify({ request: emptyRequest, analysis: null, tasks: [] }, null, 2)), [project]);

  useEffect(() => {
    window.requestAnimationFrame(() => setHistory(getProjectHistory()));
  }, []);

  function persistProject(nextProject: GeneratedProject) {
    setProject(nextProject);
    setHistory(saveProjectToHistory(nextProject));
  }

  function scrollToOutput() {
    window.setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function handleGenerate(nextRequest = request) {
    if (!nextRequest.projectName.trim() || !nextRequest.mainProblem.trim() || !nextRequest.desiredOutcome.trim()) {
      setValidation(t.mvp.requiredMessage);
      return;
    }

    setValidation("");
    persistProject(generateProject(nextRequest));
    scrollToOutput();
  }

  function handleDemo(demoRequest: ProjectRequestInput) {
    setRequest(demoRequest);
    handleGenerate(demoRequest);
  }

  function handleTaskStatus(taskId: string, status: TaskStatus) {
    if (!project) return;
    persistProject(updateProjectTasks(project, project.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))));
  }

  async function handleCopyJson() {
    if (!project) return;
    await navigator.clipboard.writeText(projectToJson(project));
    setCopyMessage(t.mvp.copySuccess);
    window.setTimeout(() => setCopyMessage(""), 1800);
  }

  function handleDownloadJson() {
    if (!project) return;
    downloadTextFile(`${project.request.projectName || "project"}.json`, projectToJson(project), "application/json");
  }

  function handleDownloadCsv() {
    if (!project) return;
    downloadTextFile(`${project.request.projectName || "tasks"}-tasks.csv`, tasksToCsv(project.tasks), "text/csv");
  }

  function statusLabel(status: TaskStatus) {
    if (status === "Done") return t.mvp.statusOptions.done;
    if (status === "In progress") return t.mvp.statusOptions.inProgress;
    return t.mvp.statusOptions.todo;
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white/85 px-5 py-3 shadow-sm backdrop-blur md:rounded-full">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">PF</div>
            <span className="text-sm font-semibold text-slate-950">ProjectFlow AI</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Primary navigation">
              <a href="#intake">{t.nav.intake}</a>
              <a href="#results">{t.nav.results}</a>
              <a href="#briefs">{t.nav.briefs}</a>
              <a href="#export">{t.nav.export}</a>
            </nav>
            <LanguageSwitcher language={language} onChange={setLanguage} />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-24">
          <Reveal>
            <div>
              <Badge tone="blue">{t.hero.eyebrow}</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-7xl">{t.hero.title}</h1>
              <p className="mt-6 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.03em] text-slate-800 md:text-3xl">{t.hero.tagline}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.hero.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#intake" className="inline-flex h-13 items-center justify-center rounded-full bg-blue-700 px-7 text-sm font-semibold text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800">{t.mvp.generatePlan}</a>
                <a href="#demos" className="inline-flex h-13 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">{t.hero.secondaryCta}</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Card className="p-5 lg:p-6">
              <div className="rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold">{project ? project.request.projectName : t.hero.previewTitle}</p>
                  <Badge tone="green">{project ? `${project.progress.percentage}%` : t.hero.previewStatus}</Badge>
                </div>
                <div className="mt-6 space-y-3">
                  {(project ? analysisEntries(project.analysis, t.mvp.analysisLabels).slice(0, 4) : t.results.items.slice(0, 4)).map(([label, value], index) => (
                    <Reveal key={label} delay={index * 80}>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-100">{value}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {t.valueCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 100}>
              <Card className="h-full p-6">
                <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="intake" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow={t.intake.eyebrow} title={t.intake.title} description={t.intake.description} />
        <Reveal delay={120}>
          <Card className="p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {requestFields.map((field, index) => (
                <label key={field} className={wideFields.includes(field) ? "md:col-span-2" : ""}>
                  <span className="text-sm font-semibold text-slate-700">{t.mvp.fields[field]}</span>
                  <textarea
                    value={request[field]}
                    onChange={(event) => setRequest((current) => ({ ...current, [field]: event.target.value }))}
                    rows={wideFields.includes(field) ? 3 : 1}
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    style={{ animationDelay: `${index * 30}ms` }}
                  />
                </label>
              ))}
            </div>
            {validation ? <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">{validation}</p> : null}
            <button type="button" onClick={() => handleGenerate()} className="mt-6 h-12 rounded-full bg-blue-700 px-7 text-sm font-semibold text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800">
              {t.mvp.generatePlan}
            </button>
          </Card>
        </Reveal>
      </section>

      <section id="demos" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.demos.eyebrow} title={t.demos.title} />
        <div className="grid gap-5 lg:grid-cols-3">
          {demoCases.map((demo, index) => (
            <Reveal key={demo.id} delay={index * 100}>
              <Card className="flex h-full flex-col p-6">
                <Badge tone="blue">{demo.industry}</Badge>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">{demo.title}</h3>
                <p className="mt-4 text-sm font-semibold text-slate-700">{t.demos.problem}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{demo.problem}</p>
                <p className="mt-5 text-sm font-semibold text-slate-700">{t.demos.solution}</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{demo.solution}</p>
                <button type="button" onClick={() => handleDemo(demo.request)} className="mt-6 h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">{t.demos.loadDemo}</button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="results" ref={outputRef} className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.results.eyebrow} title={t.results.title} />
        {project ? (
          <Reveal delay={120}>
            <Card className="p-5 md:p-8">
              <ProgressPanel project={project} labels={t.mvp} />
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {analysisEntries(project.analysis, t.mvp.analysisLabels).map(([label, value], index) => (
                  <Reveal key={label} delay={(index % 4) * 80}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-800">{value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Card>
          </Reveal>
        ) : <EmptyState title={t.mvp.noProjectTitle} description={t.mvp.noProjectDescription} />}
      </section>

      <section id="briefs" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.briefs.eyebrow} title={t.briefs.title} />
        {project ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal><BriefCard title={t.briefs.pmTitle} tone="amber" badge={t.briefs.pmBadge} items={pmEntries(project.pmBrief, t.mvp.pmLabels)} /></Reveal>
            <Reveal delay={120}><BriefCard title={t.briefs.developerTitle} tone="green" badge={t.briefs.developerBadge} items={developerEntries(project.developerBrief, t.mvp.developerLabels)} /></Reveal>
          </div>
        ) : <EmptyState title={t.mvp.noProjectTitle} description={t.mvp.noProjectDescription} />}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.tasks.eyebrow} title={t.tasks.title} />
        {project?.tasks.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.tasks.map((task, index) => <Reveal key={task.id} delay={(index % 4) * 80}><TaskCard task={task} statusLabel={statusLabel} onStatusChange={handleTaskStatus} labels={t.tasks} /></Reveal>)}
          </div>
        ) : <EmptyState title={t.tasks.title} description={t.mvp.noTasks} />}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.mvp.projectHistory} title={t.mvp.projectHistory} />
        <ProjectHistory history={history} labels={t.mvp} onReload={(item) => { setRequest(item.request); setProject(item); scrollToOutput(); }} onDelete={(id) => setHistory(deleteProjectFromHistory(id))} onClear={() => setHistory(clearProjectHistory())} />
      </section>

      <section id="export" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <SectionHeader eyebrow={t.export.eyebrow} title={t.export.title} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <Card className="overflow-hidden">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-white p-5 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{t.export.jsonTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600">{project ? t.export.jsonDescription : t.mvp.noProjectDescription}</p>
                  {copyMessage ? <p className="mt-2 text-sm font-semibold text-emerald-700">{copyMessage}</p> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" disabled={!project} onClick={handleCopyJson} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45">{t.export.copyJson}</button>
                  <button type="button" disabled={!project} onClick={handleDownloadJson} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45">{t.export.downloadJson}</button>
                  <button type="button" disabled={!project} onClick={handleDownloadCsv} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45">{t.export.downloadCsv}</button>
                </div>
              </div>
              <pre className="max-h-[520px] overflow-auto bg-slate-950 p-6 text-sm leading-7 text-slate-100"><code>{jsonPreview}</code></pre>
            </Card>
          </Reveal>
          <Reveal delay={120}>
            <Card className="p-6 md:p-8">
              <Badge tone="green">{t.export.webhookBadge}</Badge>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{t.export.webhookTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t.export.webhookDescription}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Make", "n8n", "Zapier", "Power Automate"].map((tool, index) => <Reveal key={tool} delay={index * 70}><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800">{tool}</div></Reveal>)}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function analysisEntries(analysis: ProjectAnalysis, labels: TranslationLabels["analysisLabels"]): [string, string][] {
  return Object.entries(labels).map(([key, label]) => [label, String(analysis[key as keyof ProjectAnalysis])]);
}

function pmEntries(brief: PMBrief, labels: TranslationLabels["pmLabels"]): [string, string][] {
  return Object.entries(labels).map(([key, label]) => [label, String(brief[key as keyof PMBrief])]);
}

function developerEntries(brief: DeveloperBrief, labels: TranslationLabels["developerLabels"]): [string, string][] {
  return Object.entries(labels).map(([key, label]) => [label, String(brief[key as keyof DeveloperBrief])]);
}

type TranslationLabels = (typeof translations)[Language]["mvp"];

function ProgressPanel({ project, labels }: { project: GeneratedProject; labels: TranslationLabels }) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-800">{labels.progress}</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{project.progress.completedTasks} of {project.progress.totalTasks} {labels.completedFormat} — {project.progress.percentage}%</p>
        </div>
        <Badge tone={project.progress.percentage === 100 ? "green" : "blue"}>{project.analysis.priority}</Badge>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white ring-1 ring-blue-100">
        <div className="h-full rounded-full bg-blue-700 transition-all duration-500" style={{ width: `${project.progress.percentage}%` }} />
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <Card className="p-8 text-center"><h3 className="text-xl font-semibold text-slate-950">{title}</h3><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p></Card>;
}

function BriefCard({ title, badge, tone, items }: { title: string; badge: string; tone: "green" | "amber"; items: [string, string][] }) {
  return <Card className="h-full p-6 md:p-8"><div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5"><h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3><Badge tone={tone}>{badge}</Badge></div><div className="mt-6 space-y-5">{items.map(([label, value]) => <div key={label}><p className="text-sm font-semibold text-slate-900">{label}</p><p className="mt-1 text-sm leading-6 text-slate-600">{value}</p></div>)}</div></Card>;
}

function TaskCard({ task, statusLabel, onStatusChange, labels }: { task: Task; statusLabel: (status: TaskStatus) => string; onStatusChange: (taskId: string, status: TaskStatus) => void; labels: { status: string; effort: string } }) {
  const tone = task.priority === "High" ? "amber" : task.priority === "Low" ? "green" : "blue";

  return <Card className="h-full p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-950">{task.title}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{task.phase}</p></div><Badge tone={tone}>{task.priority}</Badge></div><div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{labels.status}</p><select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-300">{taskStatuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{labels.effort}</p><p className="mt-3 font-semibold text-slate-800">{task.estimatedEffort}</p></div></div></Card>;
}

function ProjectHistory({ history, labels, onReload, onDelete, onClear }: { history: GeneratedProject[]; labels: TranslationLabels; onReload: (project: GeneratedProject) => void; onDelete: (id: string) => void; onClear: () => void }) {
  if (!history.length) return <EmptyState title={labels.projectHistory} description={labels.noHistory} />;

  return <Card className="p-5 md:p-8"><div className="mb-5 flex justify-end"><button type="button" onClick={onClear} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">{labels.clearAll}</button></div><div className="grid gap-4 lg:grid-cols-2">{history.map((item) => <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-slate-950">{item.request.projectName}</h3><p className="mt-1 text-sm text-slate-600">{item.request.clientName || item.request.industry}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{item.analysis.projectType}</p></div><Badge tone="blue">{item.progress.percentage}%</Badge></div><p className="mt-4 text-xs text-slate-500">{labels.created}: {new Date(item.createdAt).toLocaleDateString()}</p><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => onReload(item)} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">{labels.reload}</button><button type="button" onClick={() => onDelete(item.id)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">{labels.delete}</button></div></div>)}</div></Card>;
}
