import { Settings, Moon, Sun, History, LogOut, Trash2 } from 'lucide-react';

export default function TopBar({ 
    setariRef, 
    meniuSetariDeschis, 
    setMeniuSetariDeschis, 
    utilizatorLogat, 
    modIntunecat, 
    setModIntunecat, 
    setModalIstoricDeschis, 
    stergeContul, 
    logOut 
}) {
  return (
    <div className="top-bar">
      <div className="setari-container" ref={setariRef}>
        <button className="buton-setari-icon" onClick={() => setMeniuSetariDeschis(!meniuSetariDeschis)}>
          <Settings size={18} /> <span>Setari</span>
        </button>
        {meniuSetariDeschis && (
          <div className="dropdown-meniu">
            <div className="meniu-header-cont">Salut, <strong style={{ color: 'var(--culoare-accent)' }}>{utilizatorLogat}</strong>!</div>
            <hr className="meniu-separator" />
            <button className="meniu-item" onClick={() => setModIntunecat(!modIntunecat)}>
              {modIntunecat ? <Sun size={18} /> : <Moon size={18} />}
              <span>{modIntunecat ? 'Mod Luminos' : 'Mod Intunecat'}</span>
            </button>
            <button className="meniu-item" onClick={() => { setModalIstoricDeschis(true); setMeniuSetariDeschis(false); }}>
              <History size={18} /> <span>Istoric Studiu</span>
            </button>
            <button className="meniu-item text-rosu" onClick={stergeContul} style={{ opacity: 0.8 }}>
              <Trash2 size={18} /> <span>Sterge Contul</span>
            </button>
            <hr className="meniu-separator" />
            <button className="meniu-item text-rosu" onClick={logOut}>
              <LogOut size={18} /> <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
