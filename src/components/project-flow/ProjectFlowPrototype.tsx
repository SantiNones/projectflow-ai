import type { ReactNode } from "react";
import { dashboardItems, demoCases, developerBrief, intakeFields, jsonPreview, pmBrief, taskGroups, valueCards } from "./projectFlowData";

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
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
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">PF</div>
            <span className="text-sm font-semibold text-slate-950">ProjectFlow AI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Primary navigation">
            <a href="#intake">Intake</a>
            <a href="#results">Results</a>
            <a href="#briefs">Briefs</a>
            <a href="#export">Export</a>
          </nav>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-24">
          <div>
            <Badge tone="blue">Consulting-grade project scoping</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-7xl">ProjectFlow AI</h1>
            <p className="mt-6 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.03em] text-slate-800 md:text-3xl">Turn vague business requests into clear scopes, tasks and automation-ready delivery plans.</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">A polished intake and planning workspace for consultants, PMs and technical teams who need to turn early conversations into credible execution plans.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#intake" className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/15">Create project brief</a>
              <a href="#demos" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 shadow-sm">Load demo case</a>
            </div>
          </div>
          <Card className="p-5 lg:p-6">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">Generated delivery plan</p>
                <Badge tone="green">Ready for review</Badge>
              </div>
              <div className="mt-6 space-y-3">
                {dashboardItems.slice(0, 4).map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <Card key={card.title} className="p-6">
              <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="intake" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Project intake" title="Capture enough context to create a credible first scope." description="The form is static for now, but laid out as the production intake experience with realistic sample values and clear field hierarchy." />
        <Card className="p-5 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {intakeFields.map(([label, value], index) => (
              <label key={label} className={index === 3 || index === 4 || index === 5 || index === 10 ? "md:col-span-2" : ""}>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                <div className="mt-2 min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">{value}</div>
              </label>
            ))}
          </div>
        </Card>
      </section>

      <section id="demos" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow="Demo cases" title="Professional examples for quick stakeholder demos." />
        <div className="grid gap-5 lg:grid-cols-3">
          {demoCases.map((demo) => (
            <Card key={demo.title} className="flex flex-col p-6">
              <Badge tone="blue">{demo.industry}</Badge>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">{demo.title}</h3>
              <p className="mt-4 text-sm font-semibold text-slate-700">Problem</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{demo.problem}</p>
              <p className="mt-5 text-sm font-semibold text-slate-700">Suggested solution</p>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{demo.solution}</p>
              <button className="mt-6 h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white">Load demo</button>
            </Card>
          ))}
        </div>
      </section>

      <section id="results" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow="Results dashboard" title="Mock generated output with decisions visible at a glance." />
        <Card className="p-5 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardItems.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="briefs" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow="Brief tabs" title="PM and developer views prepared for later interactivity." />
        <div className="grid gap-6 lg:grid-cols-2">
          <BriefCard title="PM Brief" tone="amber" badge="Strategy" items={pmBrief} />
          <BriefCard title="Developer Brief" tone="green" badge="Technical" items={developerBrief} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow="Task breakdown" title="Grouped delivery tasks with effort and status." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {taskGroups.map((group, groupIndex) => group.tasks.map((task, taskIndex) => <TaskCard key={`${group.phase}-${task}`} groupIndex={groupIndex} phase={group.phase} task={task} taskIndex={taskIndex} />))}
        </div>
      </section>

      <section id="export" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <SectionHeader eyebrow="Automation export" title="Output shaped for workflow tools and operational handoff." />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Card className="overflow-hidden">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-white p-5 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">JSON preview</h3>
                <p className="mt-1 text-sm text-slate-600">Static payload preview for future export logic.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">Copy JSON</button>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Download JSON</button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">Download CSV</button>
              </div>
            </div>
            <pre className="overflow-x-auto bg-slate-950 p-6 text-sm leading-7 text-slate-100"><code>{jsonPreview}</code></pre>
          </Card>
          <Card className="p-6 md:p-8">
            <Badge tone="green">Webhook-ready payload</Badge>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">Prepared for automation platforms.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">The export structure is designed to be sent into Make, n8n, Zapier and Power Automate once generation, persistence and webhook delivery are implemented.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Make", "n8n", "Zapier", "Power Automate"].map((tool) => <div key={tool} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800">{tool}</div>)}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

function BriefCard({ title, badge, tone, items }: { title: string; badge: string; tone: "green" | "amber"; items: string[][] }) {
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
        <Badge tone={tone}>{badge}</Badge>
      </div>
      <div className="mt-6 space-y-5">
        {items.map(([label, value]) => (
          <div key={label}>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TaskCard({ groupIndex, phase, task, taskIndex }: { groupIndex: number; phase: string; task: string; taskIndex: number }) {
  const tone = groupIndex < 2 ? "blue" : groupIndex < 5 ? "amber" : "green";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{task}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{phase}</p>
        </div>
        <Badge tone={tone}>{taskIndex === 0 ? "High" : "Medium"}</Badge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Status</p>
          <p className="mt-1 font-semibold text-slate-800">Planned</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Estimated effort</p>
          <p className="mt-1 font-semibold text-slate-800">{taskIndex === 0 ? "3-5h" : "2-4h"}</p>
        </div>
      </div>
    </Card>
  );
}
