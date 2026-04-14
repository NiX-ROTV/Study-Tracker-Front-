export default function Teme({
  salveazaTema,
  dropdownQuestDeschis,
  setDropdownQuestDeschis,
  materieTema,
  materii,
  setMaterieTema,
  dropdownDificultateDeschis,
  setDropdownDificultateDeschis,
  dificultateTema,
  setDificultateTema,
  descriereTema,
  setDescriereTema,
  istoricTeme
}) {
  return (
    <main className="pt-8 pb-32 px-6 max-w-2xl mx-auto space-y-12">
      <section className="bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-[2rem] p-8 shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/10 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-tertiary dark:text-orange-400" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface dark:text-white">Jurnalul de Misiuni</h1>
        </div>

        <form onSubmit={salveazaTema} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-4">Materia de Studiu</label>
              <button
                type="button"
                onClick={() => setDropdownQuestDeschis(!dropdownQuestDeschis)}
                className={`w-full flex items-center justify-between bg-surface-container-low dark:bg-gray-900 border-none rounded-full px-6 py-4 text-on-surface dark:text-white transition-all ${dropdownQuestDeschis ? 'ring-2 ring-primary/20' : ''}`}
              >
                <span className="truncate">{materieTema ? materii.find(m => m._id === materieTema)?.nume : "Alege materia"}</span>
                <span className="material-symbols-outlined text-outline dark:text-gray-500 transition-transform duration-300" style={{ transform: dropdownQuestDeschis ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
              </button>

              {dropdownQuestDeschis && (
                <>
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {materii.map((m) => (
                      <button
                        key={m._id}
                        type="button"
                        className={`w-full text-left px-6 py-3 font-semibold transition-colors border-b border-outline-variant/5 last:border-0 ${materieTema === m._id ? 'bg-primary/10 text-primary dark:text-green-400' : 'text-on-surface dark:text-gray-200 hover:bg-surface-container dark:hover:bg-gray-700'}`}
                        onClick={() => { setMaterieTema(m._id); setDropdownQuestDeschis(false); }}
                      >
                        {m.nume}
                      </button>
                    ))}
                  </div>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownQuestDeschis(false)}></div>
                </>
              )}
            </div>

            <div className="relative">
              <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-4 text-left">Dificultate</label>

              <button
                type="button"
                onClick={() => setDropdownDificultateDeschis(!dropdownDificultateDeschis)}
                className={`w-full flex items-center justify-between bg-surface-container-low dark:bg-gray-900 border-none rounded-full px-6 py-4 text-on-surface dark:text-white transition-all ${dropdownDificultateDeschis ? 'ring-2 ring-primary/20' : ''}`}
              >
                <span className="truncate capitalize">
                  {dificultateTema === 'usoara' ? 'Tema Usoara (15 XP)' :
                    dificultateTema === 'medie' ? 'Tema Medie (40 XP)' :
                      'Misiune Grea (100 XP)'}
                </span>
                <span className="material-symbols-outlined text-outline dark:text-gray-500 transition-transform duration-300" style={{ transform: dropdownDificultateDeschis ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
              </button>

              {dropdownDificultateDeschis && (
                <>
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col">
                      {[
                        { val: 'usoara', text: 'Tema Usoara (15 XP)' },
                        { val: 'medie', text: 'Tema Medie (40 XP)' },
                        { val: 'grea', text: 'Misiune Grea (100 XP)' }
                      ].map((d) => (
                        <button
                          key={d.val}
                          type="button"
                          className={`w-full text-left px-6 py-4 font-semibold transition-colors border-b border-outline-variant/5 last:border-0 ${dificultateTema === d.val ? 'bg-primary/10 text-primary dark:text-green-400' : 'text-on-surface dark:text-gray-200 hover:bg-surface-container dark:hover:bg-gray-700'}`}
                          onClick={() => {
                            setDificultateTema(d.val);
                            setDropdownDificultateDeschis(false);
                          }}
                        >
                          {d.text}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownDificultateDeschis(false)}></div>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-4">Ce ai lucrat la aceasta tema?</label>
            <textarea
              className="w-full bg-surface-container-low dark:bg-gray-900 border-none rounded-[1.5rem] px-6 py-4 text-on-surface dark:text-white placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 resize-none min-h-[120px]"
              placeholder="Ex: Am rezolvat exercitiile 4 si 5 de la pagina 12..."
              value={descriereTema}
              onChange={(e) => setDescriereTema(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-br from-[#506b55] to-[#cceacf] dark:from-[#3d5341] dark:to-[#506b55] text-white font-bold py-5 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[#506b55]/20">
            FINALIZEAZA MISIUNEA
          </button>
        </form>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="mono-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 font-bold">ULTIMELE MISIUNI FINALIZATE</h2>
          <span className="material-symbols-outlined text-outline-variant dark:text-gray-600">history</span>
        </div>

        <div className="space-y-4">
          {istoricTeme.length === 0 ? (
            <p className="text-center text-on-surface-variant opacity-50 py-10">Inca nicio misiune indeplinita.</p>
          ) : (
            [...istoricTeme].slice(0, 5).map((tema) => (
              <div key={tema._id} className="group bg-surface-container-low dark:bg-[#1e1e1e]/50 p-6 rounded-2xl flex items-center justify-between transition-all hover:bg-surface-container-high dark:hover:bg-gray-800 border border-outline-variant/5 dark:border-gray-700/30">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tema.dificultate === 'grea' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                    tema.dificultate === 'medie' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' :
                      'bg-primary/10 text-primary dark:text-green-400'
                    }`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {tema.dificultate === 'grea' ? 'military_tech' : tema.dificultate === 'medie' ? 'calculate' : 'menu_book'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface dark:text-gray-100">{tema.materie_id ? tema.materie_id.nume : 'Materie stearsa'}</h3>
                    <p className="mono-label text-[11px] text-on-surface-variant dark:text-gray-400 uppercase tracking-wider">
                      Tema {tema.dificultate} • {new Date(tema.data_finalizare).toLocaleDateString('ro-RO')}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-outline-variant/10 shadow-sm">
                  <span className="mono-label font-bold text-primary dark:text-green-400 text-sm">+{tema.xp_primit} XP</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
