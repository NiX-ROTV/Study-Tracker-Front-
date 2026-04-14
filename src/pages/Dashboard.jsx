export default function Dashboard({
  nivelCurent,
  rangCurent,
  calculeazaStreak,
  formateazaTimp,
  totalSecundeAdunate,
  xpInNivelCurent,
  xpPerNivel,
  procentajBara,
  totalXPStudiu,
  totalXPTeme,
  urmatorulRang,
  topMaterii
}) {
  return (
    <div className="pt-8 pb-32 px-4 max-w-4xl mx-auto space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest dark:bg-gray-800 p-8 rounded-[2rem] shadow-[0px_20px_40px_rgba(56,56,51,0.04)] relative overflow-hidden group flex flex-col items-center justify-center text-center border border-outline-variant/20 dark:border-gray-700">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          <p className="mono-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-6 text-center">Nivelul tau</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl font-extrabold" style={{ color: rangCurent.culoare }}>Lv. {nivelCurent}</span>
            <p className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-500 opacity-60 mt-2">Spre Maretie</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-gray-800 p-8 rounded-[2rem] shadow-[0px_20px_40px_rgba(56,56,51,0.04)] flex flex-col justify-between border border-outline-variant/20 dark:border-gray-700">
          <div>
            <p className="mono-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-4">Streak Status</p>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-tertiary dark:text-orange-400">
                {calculeazaStreak() === 0 ? 'Inactiv' : calculeazaStreak() === 1 ? 'Day One 🌱' : `${calculeazaStreak()} Zile`}
              </span>
              {calculeazaStreak() > 0 && (
                <span className="material-symbols-outlined text-tertiary dark:text-orange-400">local_fire_department</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-gray-800 p-8 rounded-[2rem] shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/20 dark:border-gray-700">
          <p className="mono-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-4">Timp Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-secondary dark:text-blue-300">{formateazaTimp(totalSecundeAdunate)}</span>
            <span className="mono-label text-sm text-secondary dark:text-blue-400 opacity-60">MIN</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container-low dark:bg-gray-800/80 p-8 rounded-[2rem] border border-outline-variant/20 dark:border-gray-700">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xl font-bold text-on-surface dark:text-white">Progres spre Nivelul {nivelCurent + 1}</h3>
                <p className="mono-label text-xs text-on-surface-variant dark:text-blue-400 opacity-60 mt-1">Nu te opri acum!</p>
              </div>
              <span className="mono-label text-lg font-bold" style={{ color: rangCurent.culoare }}>{xpInNivelCurent}/{xpPerNivel} XP</span>
            </div>
            <div className="h-4 w-full bg-surface-container-highest dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${procentajBara}%`, backgroundColor: rangCurent.culoare }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-surface-container-lowest dark:bg-gray-900 p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent dark:border-gray-700">
                <div>
                  <p className="mono-label text-[10px] uppercase tracking-tighter text-on-surface-variant dark:text-gray-400">XP STUDIU</p>
                  <p className="text-xl font-bold text-primary dark:text-green-400">{totalXPStudiu}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-green-400/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary dark:text-green-400 text-sm">auto_stories</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest dark:bg-gray-900 p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent dark:border-gray-700">
                <div>
                  <p className="mono-label text-[10px] uppercase tracking-tighter text-on-surface-variant dark:text-gray-400">XP QUESTS</p>
                  <p className="text-xl font-bold text-blue-500 dark:text-blue-400">{totalXPTeme}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500 dark:text-blue-400 text-sm">military_tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-surface-container dark:bg-gray-800 p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden border border-outline-variant/20 dark:border-gray-700">
          <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[160px] dark:text-gray-300">school</span>
          </div>
          <div>
            <p className="mono-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-6">Rang Academic</p>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">Rang Actual</p>
                <p className="text-3xl font-extrabold" style={{ color: rangCurent.culoare }}>{rangCurent.nume}</p>
              </div>
              <div className="w-8 h-[1px] bg-outline-variant/30 dark:bg-gray-600"></div>
              <div>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">Tinta Urmatoare</p>
                <p className="text-2xl font-bold opacity-80" style={{ color: urmatorulRang.culoare }}>{urmatorulRang.nume}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-surface-container-low dark:bg-gray-800/80 rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/20 dark:border-gray-700">
        <div className="px-8 py-6 flex justify-between items-center bg-surface-container-high/50 dark:bg-gray-900/50">
          <h3 className="font-bold text-lg text-on-surface dark:text-white">TIMP ALOCAT PE MATERII</h3>
          <span className="material-symbols-outlined text-on-surface-variant dark:text-gray-400 opacity-40">pie_chart</span>
        </div>
        <div className="px-8 pb-8 space-y-4 pt-4">
          {topMaterii.length === 0 ? (
            <p className="text-on-surface-variant dark:text-gray-400 text-center py-4">Nu ai inregistrat timp inca.</p>
          ) : (
            topMaterii.map(([nume, timp]) => (
              <div key={nume} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-700 transition-colors border border-outline-variant/10 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-blue-400/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary dark:text-blue-400">book</span>
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface dark:text-white">{nume}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="mono-label font-bold text-on-surface dark:text-gray-200">{formateazaTimp(timp)} min</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
