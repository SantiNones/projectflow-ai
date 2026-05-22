"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { type Language, translations } from "@/lib/i18n";
import { jsonPreview } from "./projectFlowData";

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
  const t = translations[language];

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
                <a href="#intake" className="inline-flex h-13 items-center justify-center rounded-full bg-blue-700 px-7 text-sm font-semibold text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-800">{t.hero.primaryCta}</a>
                <a href="#demos" className="inline-flex h-13 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">{t.hero.secondaryCta}</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Card className="p-5 lg:p-6">
              <div className="rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold">{t.hero.previewTitle}</p>
                  <Badge tone="green">{t.hero.previewStatus}</Badge>
                </div>
                <div className="mt-6 space-y-3">
                  {t.results.items.slice(0, 4).map(([label, value], index) => (
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
              {t.intake.fields.map(([label, value], index) => (
                <Reveal key={label} delay={(index % 4) * 70} className={index === 3 || index === 4 || index === 5 || index === 10 ? "md:col-span-2" : ""}>
                  <label>
                    <span className="text-sm font-semibold text-slate-700">{label}</span>
                    <div className="mt-2 min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">{value}</div>
                  </label>
                </Reveal>
              ))}
            </div>
          </Card>
        </Reveal>
      </section>

      <section id="demos" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.demos.eyebrow} title={t.demos.title} />
        <div className="grid gap-5 lg:grid-cols-3">
          {t.demos.cases.map((demo, index) => (
            <Reveal key={demo.title} delay={index * 100}>
              <Card className="flex h-full flex-col p-6">
                <Badge tone="blue">{demo.industry}</Badge>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">{demo.title}</h3>
                <p className="mt-4 text-sm font-semibold text-slate-700">{t.demos.problem}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{demo.problem}</p>
                <p className="mt-5 text-sm font-semibold text-slate-700">{t.demos.solution}</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{demo.solution}</p>
                <button className="mt-6 h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">{t.demos.loadDemo}</button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="results" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.results.eyebrow} title={t.results.title} />
        <Reveal delay={120}>
          <Card className="p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.results.items.map(([label, value], index) => (
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
      </section>

      <section id="briefs" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.briefs.eyebrow} title={t.briefs.title} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <BriefCard title={t.briefs.pmTitle} tone="amber" badge={t.briefs.pmBadge} items={t.briefs.pm} />
          </Reveal>
          <Reveal delay={120}>
            <BriefCard title={t.briefs.developerTitle} tone="green" badge={t.briefs.developerBadge} items={t.briefs.developer} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <SectionHeader eyebrow={t.tasks.eyebrow} title={t.tasks.title} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.tasks.groups.map((group, groupIndex) =>
            group.tasks.map((task, taskIndex) => (
              <Reveal key={`${group.phase}-${task}`} delay={((groupIndex + taskIndex) % 4) * 80}>
                <TaskCard groupIndex={groupIndex} phase={group.phase} task={task} taskIndex={taskIndex} labels={t.tasks} />
              </Reveal>
            )),
          )}
        </div>
      </section>

      <section id="export" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <SectionHeader eyebrow={t.export.eyebrow} title={t.export.title} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <Card className="overflow-hidden">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-white p-5 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{t.export.jsonTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600">{t.export.jsonDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">{t.export.copyJson}</button>
                  <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">{t.export.downloadJson}</button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">{t.export.downloadCsv}</button>
                </div>
              </div>
              <pre className="overflow-x-auto bg-slate-950 p-6 text-sm leading-7 text-slate-100"><code>{jsonPreview}</code></pre>
            </Card>
          </Reveal>
          <Reveal delay={120}>
            <Card className="p-6 md:p-8">
              <Badge tone="green">{t.export.webhookBadge}</Badge>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{t.export.webhookTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t.export.webhookDescription}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Make", "n8n", "Zapier", "Power Automate"].map((tool, index) => (
                  <Reveal key={tool} delay={index * 70}>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800">{tool}</div>
                  </Reveal>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function BriefCard({ title, badge, tone, items }: { title: string; badge: string; tone: "green" | "amber"; items: readonly (readonly [string, string])[] }) {
  return (
    <Card className="h-full p-6 md:p-8">
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

function TaskCard({ groupIndex, phase, task, taskIndex, labels }: { groupIndex: number; phase: string; task: string; taskIndex: number; labels: { status: string; planned: string; effort: string; high: string; medium: string } }) {
  const tone = groupIndex < 2 ? "blue" : groupIndex < 5 ? "amber" : "green";

  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{task}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{phase}</p>
        </div>
        <Badge tone={tone}>{taskIndex === 0 ? labels.high : labels.medium}</Badge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">{labels.status}</p>
          <p className="mt-1 font-semibold text-slate-800">{labels.planned}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">{labels.effort}</p>
          <p className="mt-1 font-semibold text-slate-800">{taskIndex === 0 ? "3-5h" : "2-4h"}</p>
        </div>
      </div>
    </Card>
  );
}
