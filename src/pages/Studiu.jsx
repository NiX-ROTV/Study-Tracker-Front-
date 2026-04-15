import { Square, Play, Save, ChevronDown } from 'lucide-react';

export default function Studiu({
  cronometruPornit,
  dropdownMaterieDeschis,
  setDropdownMaterieDeschis,
  materieStudiu,
  materii,
  setMaterieStudiu,
  formateazaTimp,
  timpSecunde,
  asteaptaConfirmare,
  descriereStudiu,
  setDescriereStudiu,
  setAsteaptaConfirmare,
  setCronometruPornit,
  limitaZilnicaAtinsa,
  inCooldown,
  minutePauzaRamase,
  esteTextValid,
  salveazaSesiune,
  setTimpSecunde,
  istoricSesiuni,
  setModalIstoricDeschis,
  toast
}) {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-10 mt-4">
      <section className="relative group">
        <div className="absolute -inset-4 bg-surface-container-low dark:bg-gray-800/40 rounded-2xl -rotate-1 opacity-50 -z-10 transition-transform duration-500 group-hover:rotate-0"></div>

        <div className="bg-surface-container-lowest dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2rem] shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/20 dark:border-gray-700 text-center space-y-10">

          <div className="flex flex-col items-center gap-2 relative">
            <span className="mono-label text-[11px] uppercase tracking-widest text-on-surface-variant/60 dark:text-gray-400">Sesiune activa</span>

            <div className="relative w-full max-w-xs">
              <button
                type="button"
                disabled={cronometruPornit}
                onClick={() => setDropdownMaterieDeschis(!dropdownMaterieDeschis)}
                className={`w-full flex items-center justify-between bg-surface-container dark:bg-gray-900 border ${dropdownMaterieDeschis ? 'border-primary/50 dark:border-green-500/50 ring-4 ring-primary/10 dark:ring-green-500/20' : 'border-transparent dark:border-gray-700'} rounded-xl px-6 py-4 font-bold text-on-surface dark:text-white cursor-pointer transition-all ${cronometruPornit ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex-1 text-center">
                  {materieStudiu ? materii.find(m => m._id === materieStudiu)?.nume : "Alege materia"}
                </span>
                <ChevronDown size={20} className={`text-primary dark:text-green-400 transition-transform duration-300 ${dropdownMaterieDeschis ? 'rotate-180' : ''}`} />
              </button>

              {dropdownMaterieDeschis && !cronometruPornit && (
                <div className="dropdown-scroll absolute z-50 w-full mt-2 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2" style={{ maxHeight: '13.5rem', overflowY: 'auto' }}>
                  {[...materii].sort((a, b) => a.nume.localeCompare(b.nume, 'ro')).map((m) => (
                    <button
                      key={m._id}
                      className={`w-full text-center px-4 py-3 font-semibold transition-colors ${materieStudiu === m._id ? 'bg-primary/10 dark:bg-green-500/20 text-primary dark:text-green-400' : 'text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-gray-700'}`}
                      onClick={() => {
                        setMaterieStudiu(m._id);
                        setDropdownMaterieDeschis(false);
                      }}
                    >
                      {m.nume}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {dropdownMaterieDeschis && (
              <div className="fixed inset-0 z-40" onClick={() => setDropdownMaterieDeschis(false)}></div>
            )}
          </div>

          <div className="py-8">
            <h2 className="mono-label text-8xl md:text-9xl font-light tracking-tighter text-on-surface/90 dark:text-white drop-shadow-sm">
              {formateazaTimp(timpSecunde)}
            </h2>
            <div className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${cronometruPornit ? 'bg-primary/20 dark:bg-green-500/20' : 'bg-tertiary-container/50 dark:bg-orange-500/20'}`}>
              <div className={`w-2 h-2 rounded-full ${cronometruPornit ? 'bg-primary dark:bg-green-400 animate-pulse' : 'bg-tertiary dark:bg-orange-400'}`}></div>
              <span className={`mono-label text-xs font-bold uppercase tracking-widest ${cronometruPornit ? 'text-primary dark:text-green-400' : 'text-tertiary dark:text-orange-400'}`}>
                {cronometruPornit ? 'In Desfasurare' : 'Inactiv'}
              </span>
            </div>
          </div>

          {timpSecunde > 0 && !cronometruPornit && !asteaptaConfirmare && (
            <div className="text-left bg-surface-container-low dark:bg-gray-900/50 p-6 rounded-2xl border border-outline-variant/30 dark:border-gray-700 mt-6">
              <label className="block text-sm font-bold text-on-surface-variant dark:text-gray-300 mb-3 uppercase tracking-wider">
                Recapitulare rapida: Ce ai retinut?
              </label>
              <textarea
                className="w-full bg-surface-container dark:bg-gray-900 border border-transparent dark:border-gray-700 rounded-xl px-6 py-4 font-medium text-on-surface dark:text-white placeholder-on-surface-variant/50 dark:placeholder-gray-500 focus:outline-none focus:border-primary/50 dark:focus:border-green-500/50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-green-500/20 transition-all resize-none min-h-[120px] shadow-sm"
                placeholder="Ex: Am invatat despre rutele din React..."
                value={descriereStudiu}
                onChange={(e) => setDescriereStudiu(e.target.value)}
              />
            </div>
          )}

          {asteaptaConfirmare ? (
            <div className="text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800/50">
              <h3 className="text-red-600 dark:text-red-400 font-bold text-xl mb-2 mt-0">Esti inca aici? 🤔</h3>
              <p className="text-red-800 dark:text-red-300 mb-6 font-medium">Au trecut 25 de minute. Am pus pauza ca sa nu faci ore fantoma.</p>
              <button
                className="w-full py-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                onClick={() => { setAsteaptaConfirmare(false); setCronometruPornit(true); }}
              >
                DA, SUNT LA BIROU!
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">

              {limitaZilnicaAtinsa && !cronometruPornit && timpSecunde === 0 && (
                <div className="text-red-500 dark:text-red-400 font-bold mb-6 text-center bg-red-50 dark:bg-red-900/10 p-4 rounded-xl w-full border border-red-100 dark:border-red-900/30">
                  🔒 Ai atins limita de 5 ore pe ziua de azi. Ajunge! Mai iesi si pe afara.
                </div>
              )}

              {inCooldown && !cronometruPornit && timpSecunde === 0 && !limitaZilnicaAtinsa && (
                <div className="text-orange-600 dark:text-orange-400 font-bold mb-6 text-center bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl w-full border border-orange-100 dark:border-orange-900/30">
                  ⏳ Pauza obligatorie! Revino in {minutePauzaRamase} minute.
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <button
                  className={`w-full sm:w-48 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:translate-y-[-4px] active:scale-95 ${cronometruPornit ? 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600' : 'bg-gradient-to-br from-primary to-primary-container dark:from-green-600 dark:to-green-400 text-white shadow-primary/20'}`}
                  disabled={(limitaZilnicaAtinsa || inCooldown) && !cronometruPornit && timpSecunde === 0}
                  style={{ opacity: (limitaZilnicaAtinsa || inCooldown) && !cronometruPornit && timpSecunde === 0 ? 0.5 : 1 }}
                  onClick={() => {
                    if (!materieStudiu && !cronometruPornit && toast) return toast("Alege o materie!");
                    setCronometruPornit(!cronometruPornit);
                  }}>
                  {cronometruPornit ? <><Square size={20} fill="currentColor" /> PAUZA</> : <><Play size={20} fill="currentColor" /> START</>}
                </button>

                <button
                  className={`w-full sm:w-48 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${timpSecunde > 0 ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 hover:translate-y-[-4px]' : 'bg-surface-container-highest dark:bg-gray-800 text-on-surface-variant dark:text-gray-400 hover:bg-surface-dim dark:hover:bg-gray-700'}`}
                  onClick={() => {
                    if (timpSecunde > 0) {
                      const validare = esteTextValid(descriereStudiu);
                      if (!validare.valid && toast) return toast(validare.msg);
                      salveazaSesiune();
                    } else {
                      setCronometruPornit(false);
                      setTimpSecunde(0);
                    }
                  }}>
                  {timpSecunde > 0 ? <><Save size={20} /> SALVEAZA</> : <><Square size={20} /> RESET</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6 pt-4">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1 text-left">
            <h3 className="font-bold text-2xl tracking-tight text-on-surface dark:text-white">Ultimele sesiuni</h3>
            <p className="text-sm text-on-surface-variant/70 dark:text-gray-400">Progresul tau recent de studiu</p>
          </div>
          <button className="mono-label text-xs font-bold text-primary dark:text-green-400 uppercase tracking-widest border-b-2 border-primary/20 dark:border-green-400/30 pb-1 hover:border-primary dark:hover:border-green-400 transition-all" onClick={() => { setModalIstoricDeschis(true); }}>
            Vezi tot
          </button>
        </div>

        <div className="space-y-3">
          {istoricSesiuni.length === 0 ? (
            <p className="text-center text-on-surface-variant dark:text-gray-500 py-8">Nu ai studiat nimic inca.</p>
          ) : (
            [...istoricSesiuni].sort((a, b) => new Date(b.data_sesiune) - new Date(a.data_sesiune)).slice(0, 3).map(ses => (
              <div key={ses._id} className="group bg-surface-container-low dark:bg-gray-800 hover:bg-surface-container-lowest dark:hover:bg-gray-700 p-6 rounded-2xl border border-outline-variant/10 dark:border-gray-700 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/50 dark:bg-green-500/10 flex items-center justify-center text-primary dark:text-green-400">
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface dark:text-gray-100">{ses.materie_nume || (ses.materie_id ? ses.materie_id.nume : 'Materie stearsa')}</p>
                    <p className="mono-label text-xs text-on-surface-variant/60 dark:text-gray-500">{new Date(ses.data_sesiune).toLocaleDateString('ro-RO')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="mono-label text-lg font-bold text-primary dark:text-green-400">+{formateazaTimp(ses.timp_secunde)} min</p>
                  <p className="mono-label text-[10px] uppercase tracking-tighter text-on-surface-variant/40 dark:text-gray-500">Sesiune completata</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="bg-surface-container-high/50 dark:bg-blue-900/10 p-6 rounded-2xl flex items-start gap-4 border-l-4 border-tertiary dark:border-blue-500 text-left">
        <span className="material-symbols-outlined text-tertiary dark:text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
        <div>
          <p className="font-bold text-sm text-on-surface dark:text-blue-100">Sfat pentru concentrare</p>
          <p className="text-sm text-on-surface-variant/80 dark:text-blue-200/70 mt-1 leading-relaxed">
            Incearca tehnica Pomodoro: 25 de minute de studiu intens urmate de 5 minute de pauza activa. Lasa cronometrul sa mearga, noi te anuntam cand e timpul pentru pauza.
          </p>
        </div>
      </div>

    </div>
  );
}
