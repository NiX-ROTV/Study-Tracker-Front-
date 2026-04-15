import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, X, Trash2, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

// ─── Constante ────────────────────────────────────────────
const ZILE = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri'];
const ZILE_SCURT = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin'];

const CULORI_MATERII = [
  { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },
  { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-300 dark:border-violet-700' },
  { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700' },
  { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-300 dark:border-orange-700' },
  { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-300 dark:border-pink-700' },
];

const OPTIUNI_DURATA = [
  { label: '30 min', sloturi: 1 },
  { label: '1 oră', sloturi: 2 },
  { label: '1.5 ore', sloturi: 3 },
  { label: '2 ore', sloturi: 4 },
  { label: '2.5 ore', sloturi: 5 },
  { label: '3 ore', sloturi: 6 },
];

function genereazaOptiuniTimp(oraMin, oraMax) {
  const optiuni = [];
  for (let h = oraMin; h <= oraMax; h++) {
    optiuni.push(`${h.toString().padStart(2, '0')}:00`);
    if (h < oraMax) optiuni.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return optiuni;
}

function timpLaSlot(timpStr, oraStartStr) {
  const [h, m] = timpStr.split(':').map(Number);
  const [sh, sm] = oraStartStr.split(':').map(Number);
  return ((h * 60 + m) - (sh * 60 + sm)) / 30;
}

function slotLaTimp(slotIdx, oraStartStr) {
  const [sh, sm] = oraStartStr.split(':').map(Number);
  const totalMin = (sh * 60 + sm) + slotIdx * 30;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

const culoriAlocate = {};
let indexCuloare = 0;
function getCuloareMaterie(materieId) {
  if (!culoriAlocate[materieId]) {
    culoriAlocate[materieId] = CULORI_MATERII[indexCuloare % CULORI_MATERII.length];
    indexCuloare++;
  }
  return culoriAlocate[materieId];
}


// ─── Componenta Setup Wizard ──────────────────────────────
function SetupWizard({ onSalveaza, seIncarca }) {
  const [oraStart, setOraStart] = useState('08:00');
  const [oraEnd, setOraEnd] = useState('16:00');

  const optiuniStart = genereazaOptiuniTimp(7, 16);
  const optiuniEnd = genereazaOptiuniTimp(8, 22);

  const handleSave = () => {
    if (oraStart >= oraEnd) return;
    onSalveaza(oraStart, oraEnd);
  };

  return (
    <section className="bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-[2rem] p-8 md:p-12 shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/20 dark:border-gray-700 text-center space-y-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-2xl bg-[#f6f3ed] dark:bg-gray-800 flex items-center justify-center">
          <span className="material-symbols-outlined text-[#506b55] dark:text-green-400 text-4xl">calendar_month</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-on-surface dark:text-white">Configurează-ți Orarul</h2>
        <p className="text-sm text-on-surface-variant dark:text-gray-400 max-w-sm">
          Spune-ne la ce oră încep și se termină activitățile tale, iar noi îți construim un orar interactiv.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
        <div className="text-left space-y-2">
          <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2 block">Prima oră începe la</label>
          <select value={oraStart} onChange={(e) => setOraStart(e.target.value)}
            className="w-full bg-surface-container dark:bg-gray-900 border-none rounded-xl px-5 py-4 font-bold text-on-surface dark:text-white cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
            {optiuniStart.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="text-left space-y-2">
          <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2 block">Ultima oră se termină la</label>
          <select value={oraEnd} onChange={(e) => setOraEnd(e.target.value)}
            className="w-full bg-surface-container dark:bg-gray-900 border-none rounded-xl px-5 py-4 font-bold text-on-surface dark:text-white cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
            {optiuniEnd.filter(t => t > oraStart).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <button onClick={handleSave} disabled={seIncarca}
        className="bg-gradient-to-br from-[#506b55] to-[#cceacf] dark:from-[#3d5341] dark:to-[#506b55] text-white font-bold py-4 px-12 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[#506b55]/20 disabled:opacity-50">
        {seIncarca ? 'Se salvează...' : 'Generează Orarul →'}
      </button>
    </section>
  );
}


// ─── Componenta Modal Adăugare/Editare ────────────────────
function ModalSlot({ slot, materii, onSalveaza, onSterge, onInchide, seIncarca }) {
  const [materieId, setMaterieId] = useState(slot?.materie_id || '');
  const [durata, setDurata] = useState(slot?.sloturi || 2);
  const [sala, setSala] = useState(slot?.sala || '');
  const [paritate, setParitate] = useState(slot?.paritate || 'toate');
  const [dropMaterieOpen, setDropMaterieOpen] = useState(false);
  const [dropDurataOpen, setDropDurataOpen] = useState(false);
  const [dropParitateOpen, setDropParitateOpen] = useState(false);

  const esteEditare = !!slot?.materie_id;
  const materieSelectata = materii.find(m => m._id === materieId);

  const handleSave = () => {
    if (!materieId) return;
    onSalveaza(materieId, durata, sala, paritate);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onInchide}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-sm bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-[2rem] p-8 shadow-2xl border border-outline-variant/20 dark:border-gray-700 space-y-6"
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-on-surface dark:text-white">
            {esteEditare ? 'Editează Slotul' : 'Adaugă în Orar'}
          </h3>
          <button onClick={onInchide}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high dark:bg-gray-700 text-on-surface-variant dark:text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Selector materie */}
        <div className="relative">
          <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-1">Materie</label>
          <button type="button"
            onClick={() => { setDropMaterieOpen(!dropMaterieOpen); setDropDurataOpen(false); }}
            className={`w-full flex items-center justify-between bg-surface-container dark:bg-gray-900 rounded-xl px-5 py-4 font-semibold text-on-surface dark:text-white transition-all ${dropMaterieOpen ? 'ring-2 ring-primary/30' : ''}`}>
            <span className="truncate">{materieSelectata ? materieSelectata.nume : 'Alege materia'}</span>
            <ChevronDown size={18} className={`text-primary dark:text-green-400 transition-transform duration-300 ${dropMaterieOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropMaterieOpen && (
            <>
              <div className="dropdown-scroll absolute z-50 w-full mt-2 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden" style={{ maxHeight: '13.5rem', overflowY: 'auto' }}>
                {[...materii].sort((a, b) => a.nume.localeCompare(b.nume, 'ro')).map((m) => (
                  <button key={m._id}
                    className={`w-full text-left px-5 py-3 font-semibold transition-colors border-b border-outline-variant/5 last:border-0 ${materieId === m._id ? 'bg-primary/10 text-primary dark:text-green-400' : 'text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-gray-700'}`}
                    onClick={() => { setMaterieId(m._id); setDropMaterieOpen(false); }}>
                    {m.nume}
                  </button>
                ))}
                {materii.length === 0 && (
                  <p className="text-center py-4 text-on-surface-variant dark:text-gray-500 text-sm">Adaugă materii mai întâi!</p>
                )}
              </div>
              <div className="fixed inset-0 z-40" onClick={() => setDropMaterieOpen(false)}></div>
            </>
          )}
        </div>

        {/* Selector durată */}
        <div className="relative">
          <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-1">Durată</label>
          <button type="button"
            onClick={() => { setDropDurataOpen(!dropDurataOpen); setDropMaterieOpen(false); }}
            className={`w-full flex items-center justify-between bg-surface-container dark:bg-gray-900 rounded-xl px-5 py-4 font-semibold text-on-surface dark:text-white transition-all ${dropDurataOpen ? 'ring-2 ring-primary/30' : ''}`}>
            <span>{OPTIUNI_DURATA.find(d => d.sloturi === durata)?.label || 'Alege durata'}</span>
            <ChevronDown size={18} className={`text-primary dark:text-green-400 transition-transform duration-300 ${dropDurataOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropDurataOpen && (
            <>
              <div className="absolute z-50 w-full mt-2 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
                {OPTIUNI_DURATA.map((d) => (
                  <button key={d.sloturi}
                    className={`w-full text-left px-5 py-3 font-semibold transition-colors border-b border-outline-variant/5 last:border-0 ${durata === d.sloturi ? 'bg-primary/10 text-primary dark:text-green-400' : 'text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-gray-700'}`}
                    onClick={() => { setDurata(d.sloturi); setDropDurataOpen(false); }}>
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="fixed inset-0 z-40" onClick={() => setDropDurataOpen(false)}></div>
            </>
          )}
        </div>

        {/* Selector paritate */}
        <div className="relative">
          <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-1">Paritate (opțional)</label>
          <button type="button"
            onClick={() => { setDropParitateOpen(!dropParitateOpen); setDropDurataOpen(false); setDropMaterieOpen(false); }}
            className={`w-full flex items-center justify-between bg-surface-container dark:bg-gray-900 rounded-xl px-5 py-4 font-semibold text-on-surface dark:text-white transition-all ${dropParitateOpen ? 'ring-2 ring-primary/30' : ''}`}>
            <span>{paritate === 'toate' ? 'Fiecare săptămână' : paritate === 'impara' ? 'Săptămâna Impară' : 'Săptămâna Pară'}</span>
            <ChevronDown size={18} className={`text-primary dark:text-green-400 transition-transform duration-300 ${dropParitateOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropParitateOpen && (
            <>
              <div className="absolute z-50 w-full mt-2 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant/20 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
                {[
                  { id: 'toate', label: 'Fiecare săptămână' },
                  { id: 'impara', label: 'Săptămâna Impară (sus)' },
                  { id: 'para', label: 'Săptămâna Pară (jos)' }
                ].map((p) => (
                  <button key={p.id}
                    className={`w-full text-left px-5 py-3 font-semibold transition-colors border-b border-outline-variant/5 last:border-0 ${paritate === p.id ? 'bg-primary/10 text-primary dark:text-green-400' : 'text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-gray-700'}`}
                    onClick={() => { setParitate(p.id); setDropParitateOpen(false); }}>
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="fixed inset-0 z-40" onClick={() => setDropParitateOpen(false)}></div>
            </>
          )}
        </div>

        {/* Câmpul Sala */}
        <div>
          <label className="mono-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2 block ml-1">Sala (opțional)</label>
          <input
            type="text"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
            placeholder="Ex: A301, Lab 2, Amf. III"
            className="w-full bg-surface-container dark:bg-gray-900 border-none rounded-xl px-5 py-4 font-semibold text-on-surface dark:text-white placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Butoane */}
        <div className="flex gap-3 pt-2">
          {esteEditare && (
            <button onClick={onSterge} disabled={seIncarca}
              className="flex-1 py-4 rounded-xl font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              <Trash2 size={18} /> Șterge
            </button>
          )}
          <button onClick={handleSave} disabled={!materieId || seIncarca}
            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all duration-300 ${materieId && !seIncarca ? 'bg-gradient-to-br from-[#506b55] to-[#cceacf] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#506b55]/20' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}>
            {seIncarca ? '...' : (esteEditare ? 'Actualizează' : 'Adaugă')}
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── Grid-ul Interactiv de Orar ───────────────────────────
function GridOrar({ oraStart, oraEnd, materii, intrari, onAdaugaBloc, onEditeazaBloc, onStergeBloc, onResetOrar, seIncarca }) {
  const [modalDeschis, setModalDeschis] = useState(false);
  const [slotSelectat, setSlotSelectat] = useState(null);
  const [ziMobil, setZiMobil] = useState(0);

  const totalSloturi = timpLaSlot(oraEnd, oraStart);

  const eticheteTimp = [];
  for (let i = 0; i < totalSloturi; i++) {
    eticheteTimp.push(slotLaTimp(i, oraStart));
  }

  const handleClickSlotLiber = (ziIdx, slotIdx, defaultSloturi = 2) => {
    setSlotSelectat({ zi: ziIdx, slotIdx, materie_id: '', sloturi: defaultSloturi, paritate: 'toate' });
    setModalDeschis(true);
  };

  const handleClickBloc = (intrare) => {
    setSlotSelectat({
      zi: intrare.zi,
      slotIdx: intrare.slotStart,
      materie_id: typeof intrare.materie_id === 'object' ? intrare.materie_id._id : intrare.materie_id,
      sloturi: intrare.sloturi,
      sala: intrare.sala || '',
      paritate: intrare.paritate || 'toate',
      id: intrare._id
    });
    setModalDeschis(true);
  };

  const handleSalveaza = async (materieId, sloturi, sala, paritate) => {
    if (slotSelectat.id) {
      await onEditeazaBloc(slotSelectat.id, materieId, sloturi, sala, paritate);
    } else {
      await onAdaugaBloc(slotSelectat.zi, slotSelectat.slotIdx, sloturi, materieId, sala, paritate);
    }
    setModalDeschis(false);
    setSlotSelectat(null);
  };

  const handleSterge = async () => {
    if (slotSelectat.id) {
      await onStergeBloc(slotSelectat.id);
    }
    setModalDeschis(false);
    setSlotSelectat(null);
  };

  // Extrage materie_id string din intrare (poate fi obiect sau string)
  const getMaterieId = (intrare) => {
    return typeof intrare.materie_id === 'object' ? intrare.materie_id._id : intrare.materie_id;
  };
  const getMaterieNume = (intrare) => {
    if (typeof intrare.materie_id === 'object' && intrare.materie_id?.nume) return intrare.materie_id.nume;
    const m = materii.find(x => x._id === intrare.materie_id);
    return m?.nume || '?';
  };
  const getMaterieProfesor = (intrare) => {
    if (typeof intrare.materie_id === 'object' && intrare.materie_id?.profesor) return intrare.materie_id.profesor;
    const m = materii.find(x => x._id === getMaterieId(intrare));
    return m?.profesor || '';
  };

  // Funcție generică de randare celulă zi+slot (refolosită de ambele view-uri)
  const randeazaCelulaSlot = (ziIdx, slotIdx, esteMobil = false) => {
    const acoperiri = intrari.filter((e) => e.zi === ziIdx && slotIdx >= e.slotStart && slotIdx < e.slotStart + e.sloturi);
    const inceputuri = intrari.filter((e) => e.zi === ziIdx && e.slotStart === slotIdx);

    const areSpatiu = acoperiri.length === 0 || (acoperiri.length === 1 && acoperiri[0].paritate !== 'toate');
    const slotLiberDeAdaugat = acoperiri.length === 1 ? acoperiri[0].slotStart : slotIdx;
    const durataLiberaDeAdaugat = acoperiri.length === 1 ? acoperiri[0].sloturi : 2;

    const slotH = esteMobil ? 52 : 44;

    if (acoperiri.length === 0) {
      return (
        <div key={ziIdx}
          className="border-l border-outline-variant/10 dark:border-gray-700/30 cursor-pointer hover:bg-primary/5 dark:hover:bg-green-500/5 transition-colors group relative"
          onClick={() => handleClickSlotLiber(ziIdx, slotIdx)}>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-primary dark:text-green-400 text-base">add</span>
          </div>
        </div>
      );
    }

    if (acoperiri.length > 0 && inceputuri.length === 0) {
      return (
        <div key={ziIdx}
          className={`border-l border-outline-variant/10 dark:border-gray-700/30 ${areSpatiu ? 'cursor-pointer hover:bg-primary/5 dark:hover:bg-green-500/5 group relative' : ''}`}
          onClick={areSpatiu ? () => handleClickSlotLiber(ziIdx, slotLiberDeAdaugat, durataLiberaDeAdaugat) : undefined}>
          {areSpatiu && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity z-0">
              <span className="material-symbols-outlined text-primary dark:text-green-400 text-base">add</span>
            </div>
          )}
        </div>
      );
    }

    if (inceputuri.length > 0) {
      return (
        <div key={ziIdx}
          className={`border-l border-outline-variant/10 dark:border-gray-700/30 relative px-0.5 py-0.5 ${areSpatiu ? 'cursor-pointer hover:bg-primary/5 dark:hover:bg-green-500/5 group' : ''}`}
          onClick={areSpatiu ? () => handleClickSlotLiber(ziIdx, slotLiberDeAdaugat, durataLiberaDeAdaugat) : undefined}>

          {areSpatiu && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity z-0">
              <span className="material-symbols-outlined text-primary dark:text-green-400 text-base">add</span>
            </div>
          )}

          {inceputuri.map((bloc) => {
            const mid = getMaterieId(bloc);
            const culoare = getCuloareMaterie(mid);
            const inaltimeBloc = bloc.sloturi;
            const p = bloc.paritate || 'toate';

            let inaltimeCalculata = `calc(${inaltimeBloc * slotH}px - 4px)`;
            let topCalculat = '2px';
            let zIndex = 10;

            if (p === 'impara') {
              inaltimeCalculata = `calc(${(inaltimeBloc * slotH) / 2}px - 4px)`;
              topCalculat = '2px';
              zIndex = 11;
            } else if (p === 'para') {
              inaltimeCalculata = `calc(${(inaltimeBloc * slotH) / 2}px - 4px)`;
              topCalculat = `calc(${(inaltimeBloc * slotH) / 2}px + 2px)`;
              zIndex = 11;
            }

            return (
              <button key={bloc._id}
                onClick={(e) => { e.stopPropagation(); handleClickBloc(bloc); }}
                className={`absolute ${culoare.bg} ${culoare.text} border ${culoare.border} rounded-lg ${esteMobil ? 'p-2' : 'p-1 sm:p-1.5'} overflow-hidden cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 group/btn text-left`}
                style={{
                  height: inaltimeCalculata,
                  width: 'calc(100% - 4px)',
                  left: '2px',
                  top: topCalculat,
                  zIndex: zIndex
                }}>
                <div className="flex flex-col h-full leading-tight">
                  <p className={`font-bold truncate ${esteMobil ? 'text-sm' : 'text-[10px] sm:text-[11px]'}`}>{getMaterieNume(bloc)}</p>
                  {p === 'toate' && inaltimeBloc >= 2 && (
                    <p className={`mono-label opacity-60 mt-0.5 truncate ${esteMobil ? 'text-xs' : 'text-[8px] sm:text-[9px]'}`}>
                      {slotLaTimp(bloc.slotStart, oraStart)} - {slotLaTimp(bloc.slotStart + bloc.sloturi, oraStart)}
                    </p>
                  )}
                  {(p === 'toate' ? inaltimeBloc >= 2 : inaltimeBloc >= 4) && bloc.sala && (
                    <p className={`mono-label opacity-50 truncate flex items-center gap-0.5 ${esteMobil ? 'text-xs' : 'text-[8px] sm:text-[9px]'}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: esteMobil ? '12px' : '10px' }}>location_on</span>
                      {bloc.sala}
                    </p>
                  )}
                  {(p === 'toate' ? inaltimeBloc >= 3 : inaltimeBloc >= 4) && getMaterieProfesor(bloc) && (
                    <p className={`mono-label opacity-40 mt-auto truncate flex-1 block ${esteMobil ? 'text-xs' : 'text-[8px] sm:text-[9px]'}`}>
                      Prof. {getMaterieProfesor(bloc)}
                    </p>
                  )}
                  {p !== 'toate' && (
                    <div className={`mt-auto place-self-start mono-label tracking-tighter uppercase font-bold rounded px-1.5 py-0.5 min-w-max ${esteMobil ? 'text-[9px]' : 'text-[7.5px] sm:text-[8px]'} ${p === 'impara' ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-400' : 'bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400'}`}>
                      {p === 'impara' ? 'Impară' : 'Pară'}
                    </div>
                  )}
                </div>
                <div className="absolute top-1 right-1 opacity-0 group-hover/btn:opacity-60 transition-opacity z-20">
                  <Edit3 size={12} />
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary dark:text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface dark:text-white">Orarul Meu</h2>
        </div>
        <button onClick={onResetOrar}
          className="mono-label text-[10px] font-bold text-on-surface-variant dark:text-gray-500 uppercase tracking-widest hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">settings</span>
          Reconfigurează
        </button>
      </div>

      {/* ═══════ DESKTOP VIEW (ascuns pe mobil) ═══════ */}
      <div className="hidden sm:block bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-[1.5rem] shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/20 dark:border-gray-700 overflow-hidden">
        
        {/* Header cu zilele */}
        <div className="grid border-b border-outline-variant/20 dark:border-gray-700" style={{ gridTemplateColumns: '60px repeat(5, 1fr)' }}>
          <div className="p-3 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant/30 dark:text-gray-600 text-sm">schedule</span>
          </div>
          {ZILE.map((zi, i) => (
            <div key={i} className="p-3 text-center border-l border-outline-variant/10 dark:border-gray-700/50">
              <span className="mono-label text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400">{zi}</span>
            </div>
          ))}
        </div>

        {/* Rândurile */}
        <div className="relative">
          {eticheteTimp.map((timp, slotIdx) => (
            <div key={slotIdx}
              className={`grid ${slotIdx % 2 === 0 ? 'border-t border-outline-variant/15 dark:border-gray-700/40' : 'border-t border-outline-variant/5 dark:border-gray-700/20'}`}
              style={{ gridTemplateColumns: '60px repeat(5, 1fr)', minHeight: '44px' }}>
              
              <div className="flex items-start justify-end pr-3 pt-1">
                {slotIdx % 2 === 0 && (
                  <span className="mono-label text-[10px] text-on-surface-variant/50 dark:text-gray-500 font-medium tabular-nums">{timp}</span>
                )}
              </div>

              {ZILE.map((_, ziIdx) => randeazaCelulaSlot(ziIdx, slotIdx, false))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ MOBILE VIEW (ascuns pe desktop) ═══════ */}
      <div className="sm:hidden space-y-3">
        {/* Taburi zile */}
        <div className="flex gap-1 bg-surface-container dark:bg-gray-900 rounded-xl p-1">
          {ZILE.map((zi, i) => (
            <button key={i}
              onClick={() => setZiMobil(i)}
              className={`flex-1 py-2.5 rounded-lg mono-label text-xs font-bold uppercase tracking-wider transition-all duration-200 ${ziMobil === i
                ? 'bg-primary dark:bg-green-600 text-white shadow-md'
                : 'text-on-surface-variant dark:text-gray-400 hover:bg-surface-container-high dark:hover:bg-gray-800'
              }`}>
              {ZILE_SCURT[i]}
            </button>
          ))}
        </div>

        {/* Grila cu o singură zi */}
        <div className="bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-2xl shadow-[0px_20px_40px_rgba(56,56,51,0.04)] border border-outline-variant/20 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant/20 dark:border-gray-700">
            <h3 className="font-bold text-on-surface dark:text-white text-center">{ZILE[ziMobil]}</h3>
          </div>

          <div className="relative">
            {eticheteTimp.map((timp, slotIdx) => (
              <div key={slotIdx}
                className={`grid ${slotIdx % 2 === 0 ? 'border-t border-outline-variant/15 dark:border-gray-700/40' : 'border-t border-outline-variant/5 dark:border-gray-700/20'}`}
                style={{ gridTemplateColumns: '50px 1fr', minHeight: '52px' }}>

                <div className="flex items-start justify-end pr-2 pt-1.5">
                  {slotIdx % 2 === 0 && (
                    <span className="mono-label text-[10px] text-on-surface-variant/50 dark:text-gray-500 font-medium tabular-nums">{timp}</span>
                  )}
                </div>

                {randeazaCelulaSlot(ziMobil, slotIdx, true)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legendă */}
      {intrari.length > 0 && (
        <div className="flex flex-wrap gap-3 px-2 pt-2">
          {[...new Set(intrari.map(e => getMaterieId(e)))].map(mid => {
            const culoare = getCuloareMaterie(mid);
            const m = materii.find(x => x._id === mid);
            return (
              <div key={mid} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${culoare.bg} border ${culoare.border}`}></div>
                <span className="mono-label text-[10px] text-on-surface-variant dark:text-gray-400 uppercase tracking-wider font-medium">{m?.nume || '?'}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalDeschis && (
        <ModalSlot
          slot={slotSelectat}
          materii={materii}
          onSalveaza={handleSalveaza}
          onSterge={handleSterge}
          onInchide={() => { setModalDeschis(false); setSlotSelectat(null); }}
          seIncarca={seIncarca}
        />
      )}
    </section>
  );
}


// ─── Modal Editare Materie ────────────────────────────────
function ModalEditMaterie({ materie, onSalveaza, onInchide, seIncarca }) {
  const [numeEdit, setNumeEdit] = useState(materie.nume);
  const [profesorEdit, setProfesorEdit] = useState(materie.profesor || '');
  const [areTezaEdit, setAreTezaEdit] = useState(materie.are_teza || false);

  const handleSave = () => {
    if (!numeEdit.trim()) return;
    onSalveaza({
      nume: numeEdit.trim(),
      profesor: profesorEdit,
      are_teza: areTezaEdit
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onInchide}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-sm bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-[2rem] p-8 shadow-2xl border border-outline-variant/20 dark:border-gray-700 space-y-6"
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-on-surface dark:text-white">Editează Materia</h3>
          <button onClick={onInchide}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high dark:bg-gray-700 text-on-surface-variant dark:text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2">NUME MATERIE</label>
            <input value={numeEdit} onChange={(e) => setNumeEdit(e.target.value)}
              className="w-full bg-surface-container dark:bg-gray-900 border-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-full px-6 py-4 text-on-surface dark:text-white transition-all"
              type="text" />
          </div>
          <div className="space-y-1">
            <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2">PROFESOR</label>
            <input value={profesorEdit} onChange={(e) => setProfesorEdit(e.target.value)}
              className="w-full bg-surface-container dark:bg-gray-900 border-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-full px-6 py-4 text-on-surface dark:text-white transition-all"
              type="text" />
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="relative flex items-center">
              <input checked={areTezaEdit} onChange={(e) => setAreTezaEdit(e.target.checked)}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-outline-variant dark:border-gray-600 checked:bg-primary checked:border-primary transition-all"
                id="exam-edit" type="checkbox" />
              <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 text-lg">check</span>
            </div>
            <label className="text-sm font-medium text-on-surface-variant dark:text-gray-400 cursor-pointer" htmlFor="exam-edit">Are teză?</label>
          </div>
        </div>

        <button onClick={handleSave} disabled={!numeEdit.trim() || seIncarca}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${numeEdit.trim() && !seIncarca ? 'bg-gradient-to-br from-[#506b55] to-[#cceacf] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#506b55]/20' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}>
          {seIncarca ? 'Se salvează...' : 'Salvează Modificările'}
        </button>
      </div>
    </div>
  );
}


// ─── Componenta Principală Orar ───────────────────────────
export default function Orar({
  adaugaMaterie,
  numeNou,
  setNumeNou,
  profesorNou,
  setProfesorNou,
  areTezaNou,
  setAreTezaNou,
  materii,
  arataToateMateriile,
  setArataToateMateriile,
  stergeMaterie,
  editeazaMaterie,
  token
}) {
  const [orarConfigurat, setOrarConfigurat] = useState(false);
  const [oraStart, setOraStart] = useState('08:00');
  const [oraEnd, setOraEnd] = useState('16:00');
  const [intrariOrar, setIntrariOrar] = useState([]);
  const [seIncarca, setSeIncarca] = useState(true);

  // State pentru editarea materiei
  const [materieInEditare, setMaterieInEditare] = useState(null);
  const [seEditeaza, setSeEditeaza] = useState(false);

  // ─── Fetch la încărcare ─────────────────────────────────
  useEffect(() => {
    const incarcaOrar = async () => {
      try {
        const raspuns = await fetch('https://study-tracker-production-cbb9.up.railway.app/api/schedule', {
          headers: { 'Authorization': token }
        });
        const date = await raspuns.json();
        if (date && date.oraStart) {
          setOraStart(date.oraStart);
          setOraEnd(date.oraEnd);
          setIntrariOrar(date.blocks || []);
          setOrarConfigurat(true);
        }
      } catch (e) {
        console.log("Eroare la încărcarea orarului:", e);
      } finally {
        setSeIncarca(false);
      }
    };
    if (token) incarcaOrar();
  }, [token]);

  // ─── Reîncarcă orarul (pentru a reflecta modificări materii) ─
  const reincarcaOrar = async () => {
    try {
      const raspuns = await fetch('https://study-tracker-production-cbb9.up.railway.app/api/schedule', {
        headers: { 'Authorization': token }
      });
      const date = await raspuns.json();
      if (date && date.oraStart) {
        setIntrariOrar(date.blocks || []);
      }
    } catch (e) {
      console.log("Eroare la reîncărcarea orarului:", e);
    }
  };

  // ─── Editarea materiei (cu reîncărcare orar) ────────────
  const handleEditeazaMaterie = async (dateNoi) => {
    setSeEditeaza(true);
    const succes = await editeazaMaterie(materieInEditare._id, dateNoi);
    if (succes) {
      // Reîncarcă și orarul ca să se actualizeze numele populate
      await reincarcaOrar();
      setMaterieInEditare(null);
    }
    setSeEditeaza(false);
  };

  // ─── Setup Wizard (Faza 1) ──────────────────────────────
  const handleSetup = async (start, end) => {
    setSeIncarca(true);
    try {
      const raspuns = await fetch('https://study-tracker-production-cbb9.up.railway.app/api/schedule/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ oraStart: start, oraEnd: end })
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        setOraStart(date.oraStart);
        setOraEnd(date.oraEnd);
        setIntrariOrar(date.blocks || []);
        setOrarConfigurat(true);
        toast.success("Orarul a fost configurat!");
      } else {
        toast.error(date.error || "Eroare la configurare.");
      }
    } catch (e) {
      console.log("Eroare:", e);
      toast.error("Eroare de rețea.");
    } finally {
      setSeIncarca(false);
    }
  };

  // ─── Reset Orar ─────────────────────────────────────────
  const handleReset = () => {
    if (window.confirm('Ești sigur? Vei pierde orarul actual.')) {
      setOrarConfigurat(false);
      setIntrariOrar([]);
    }
  };

  // ─── Adaugă bloc ────────────────────────────────────────
  const handleAdaugaBloc = async (zi, slotStart, sloturi, materie_id, sala, paritate) => {
    setSeIncarca(true);
    try {
      const raspuns = await fetch('https://study-tracker-production-cbb9.up.railway.app/api/schedule/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ zi, slotStart, sloturi, materie_id, sala, paritate })
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        setIntrariOrar(date.blocks || []);
      } else {
        toast.error(date.error || "Eroare la adăugare.");
      }
    } catch (e) {
      console.log("Eroare:", e);
      toast.error("Eroare de rețea.");
    } finally {
      setSeIncarca(false);
    }
  };

  // ─── Editează bloc ──────────────────────────────────────
  const handleEditeazaBloc = async (blockId, materie_id, sloturi, sala, paritate) => {
    setSeIncarca(true);
    try {
      const raspuns = await fetch(`https://study-tracker-production-cbb9.up.railway.app/api/schedule/block/${blockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ materie_id, sloturi, sala, paritate })
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        setIntrariOrar(date.blocks || []);
      } else {
        toast.error(date.error || "Eroare la editare.");
      }
    } catch (e) {
      console.log("Eroare:", e);
      toast.error("Eroare de rețea.");
    } finally {
      setSeIncarca(false);
    }
  };

  // ─── Șterge bloc ────────────────────────────────────────
  const handleStergeBloc = async (blockId) => {
    setSeIncarca(true);
    try {
      const raspuns = await fetch(`https://study-tracker-production-cbb9.up.railway.app/api/schedule/block/${blockId}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        setIntrariOrar(date.blocks || []);
        toast.success("Blocul a fost șters.");
      } else {
        toast.error(date.error || "Eroare la ștergere.");
      }
    } catch (e) {
      console.log("Eroare:", e);
      toast.error("Eroare de rețea.");
    } finally {
      setSeIncarca(false);
    }
  };

  // ─── Loading state ──────────────────────────────────────
  if (seIncarca && !orarConfigurat) {
    return (
      <main className="mt-8 px-4 sm:px-6 max-w-5xl mx-auto pb-32">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mono-label text-xs text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">Se încarcă orarul...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-8 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 pb-32">

      {/* Secțiunea de adăugare materie - PRIMUL */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface dark:text-white">Adaugă o materie nouă</h2>
          <span className="mono-label text-[10px] uppercase tracking-widest text-primary/60 dark:text-green-400/60">New Entry</span>
        </div>
        <div className="bg-surface-container-low dark:bg-[#1e1e1e] rounded-xl p-8 space-y-6 shadow-[0px_20px_40px_rgba(56,56,51,0.06)] border border-outline-variant/10 dark:border-gray-700">
          <form onSubmit={adaugaMaterie} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2">NUME MATERIE</label>
                <input value={numeNou} onChange={(e) => setNumeNou(e.target.value)}
                  className="w-full bg-surface-container-lowest dark:bg-gray-900 border-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-full px-6 py-4 text-on-surface dark:text-white placeholder:text-outline-variant transition-all"
                  type="text" />
              </div>
              <div className="space-y-1">
                <label className="mono-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-gray-400 ml-2">PROFESOR</label>
                <input value={profesorNou} onChange={(e) => setProfesorNou(e.target.value)}
                  className="w-full bg-surface-container-lowest dark:bg-gray-900 border-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-full px-6 py-4 text-on-surface dark:text-white placeholder:text-outline-variant transition-all"
                  type="text" />
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <div className="relative flex items-center">
                <input checked={areTezaNou} onChange={(e) => setAreTezaNou(e.target.checked)}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-outline-variant dark:border-gray-600 checked:bg-primary checked:border-primary transition-all"
                  id="exam" type="checkbox" />
                <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 text-lg">check</span>
              </div>
              <label className="text-sm font-medium text-on-surface-variant dark:text-gray-400 cursor-pointer" htmlFor="exam">Această materie are teză?</label>
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-[#506b55] to-[#cceacf] dark:from-[#3d5341] dark:to-[#506b55] text-white font-bold py-4 rounded-full shadow-lg active:scale-95 duration-200 transition-transform">
              Salvează Materia
            </button>
          </form>
        </div>
      </section>

      {/* FAZA 1 sau FAZA 2 - orarul */}
      {!orarConfigurat ? (
        <SetupWizard onSalveaza={handleSetup} seIncarca={seIncarca} />
      ) : (
        <div
          className="relative"
          onClick={materii.length < 2 ? () => toast.warning('Te rugăm să introduci cel puțin două materii înainte de a configura orarul!') : undefined}
        >
          {materii.length < 2 && (
            <div className="absolute inset-0 z-20 rounded-2xl cursor-not-allowed" />
          )}
          <div className={materii.length < 2 ? 'opacity-50 pointer-events-none select-none' : ''}>
            <GridOrar
              oraStart={oraStart}
              oraEnd={oraEnd}
              materii={materii}
              intrari={intrariOrar}
              onAdaugaBloc={handleAdaugaBloc}
              onEditeazaBloc={handleEditeazaBloc}
              onStergeBloc={handleStergeBloc}
              onResetOrar={handleReset}
              seIncarca={seIncarca}
            />
          </div>
        </div>
      )}



      {/* Lista de materii */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface dark:text-white uppercase">Materiile mele</h2>
          <span className="mono-label text-[10px] font-bold uppercase tracking-widest text-primary dark:text-green-400">{materii.length} Total</span>
        </div>
        <div className="space-y-4">
          {materii.length === 0 ? (
            <p className="text-center py-10 text-on-surface-variant opacity-50">Încă nu ai adăugat materii.</p>
          ) : (
            <>
              {(arataToateMateriile ? materii : materii.slice(0, 3)).map((m) => (
                <div key={m._id} className="bg-surface-container-lowest dark:bg-[#1e1e1e] rounded-xl p-6 shadow-[0px_20px_40px_rgba(56,56,51,0.06)] border border-outline-variant/5 dark:border-gray-700/50 flex items-center justify-between group transition-all hover:bg-surface-container-low dark:hover:bg-gray-800">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary-container/30 dark:bg-green-500/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary dark:text-green-400 text-2xl">
                        {m.nume.toLowerCase().includes('mate') ? 'calculate' :
                          m.nume.toLowerCase().includes('info') ? 'terminal' : 'auto_stories'}
                      </span>
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="font-bold text-lg text-on-surface dark:text-gray-100 leading-tight">{m.nume}</h3>
                      <p className="mono-label text-xs text-on-surface-variant dark:text-gray-400 uppercase tracking-wide">Prof. {m.profesor || "Nespecificat"}</p>
                      {m.are_teza && (
                        <div className="inline-flex items-center bg-error/10 dark:bg-red-900/20 text-error dark:text-red-400 px-2 py-0.5 rounded-md">
                          <span className="mono-label text-[9px] font-bold tracking-tighter uppercase">ARE TEZĂ</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setMaterieInEditare(m)}
                      className="text-outline-variant hover:text-primary dark:hover:text-green-400 transition-colors p-2 opacity-0 group-hover:opacity-100">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => stergeMaterie(m._id)} className="text-outline-variant hover:text-error transition-colors p-2">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {materii.length > 3 && (
                <button
                  className="w-full py-4 flex items-center justify-center gap-2 mono-label text-[11px] font-bold text-primary dark:text-green-400 uppercase tracking-widest hover:opacity-70 transition-opacity"
                  onClick={() => setArataToateMateriile(!arataToateMateriile)}>
                  {arataToateMateriile ? (
                    <>MAI PUȚINE <ChevronUp size={16} /></>
                  ) : (
                    <>VEZI TOATE ({materii.length}) <ChevronDown size={16} /></>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal editare materie */}
      {materieInEditare && (
        <ModalEditMaterie
          materie={materieInEditare}
          onSalveaza={handleEditeazaMaterie}
          onInchide={() => setMaterieInEditare(null)}
          seIncarca={seEditeaza}
        />
      )}
    </main>
  );
}
