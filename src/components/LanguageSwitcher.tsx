import type { Language } from "@/lib/i18n";

export function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1" aria-label="Language selector">
      {(["en", "es"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`h-8 rounded-full px-3 text-xs font-bold transition ${language === option ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          aria-pressed={language === option}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
