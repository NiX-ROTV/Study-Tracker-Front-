import { Toaster, toast } from 'sonner'
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// Importăm noile componente și pagini
import TopBar from './components/TopBar'
import Auth from './components/Auth'
import HistoryModal from './components/HistoryModal'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Studiu from './pages/Studiu'
import Teme from './pages/Teme'
import Orar from './pages/Orar'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DynamicBackground = ({ children, modIntunecat }) => {
  const location = useLocation();
  const culoriPagini = {
    "/": "bg-[#f0f7f1]",
    "/quests": "bg-[#f0f7f1]",
    "/studiu": "bg-[#f1f4f9]",
    "/orar": "bg-[#fcf9f3]",
  };
  const fundalActiv = culoriPagini[location.pathname] || "bg-[#fffcf7]";
  const textClass = modIntunecat ? "text-gray-100" : "text-[#383833]";
  const bgClass = modIntunecat ? 'bg-[#121212]' : fundalActiv;
  return (
    <div className={`min-h-screen w-full p-4 transition-colors duration-700 ${bgClass} ${textClass}`}>
      {children}
    </div>
  );
};

function App() {
  const [utilizatorLogat, setUtilizatorLogat] = useState(null)
  const [token, setToken] = useState(null)

  const [ecranCurent, setEcranCurent] = useState('login')
  const [inputEmail, setInputEmail] = useState('')
  const [inputParola, setInputParola] = useState('')
  const [inputConfirmaParola, setInputConfirmaParola] = useState('')
  const [afiseazaParola, setAfiseazaParola] = useState(false)

  const [modIntunecat, setModIntunecat] = useState(false)
  const [meniuSetariDeschis, setMeniuSetariDeschis] = useState(false)
  const [materii, setMaterii] = useState([])
  const [numeNou, setNumeNou] = useState("")
  const [profesorNou, setProfesorNou] = useState("")
  const [areTezaNou, setAreTezaNou] = useState(false)
  const [timpSecunde, setTimpSecunde] = useState(0)
  const [cronometruPornit, setCronometruPornit] = useState(false)
  const [asteaptaConfirmare, setAsteaptaConfirmare] = useState(false)
  const [materieStudiu, setMaterieStudiu] = useState("")
  const [descriereStudiu, setDescriereStudiu] = useState("");
  const [arataToateMateriile, setArataToateMateriile] = useState(false);
  const [istoricSesiuni, setIstoricSesiuni] = useState([])
  const [materieTema, setMaterieTema] = useState("");
  const [descriereTema, setDescriereTema] = useState("");
  const [dificultateTema, setDificultateTema] = useState("usoara");
  const [istoricTeme, setIstoricTeme] = useState([]);
  const [dropdownMaterieDeschis, setDropdownMaterieDeschis] = useState(false);
  const [dropdownQuestDeschis, setDropdownQuestDeschis] = useState(false);
  const [dropdownDificultateDeschis, setDropdownDificultateDeschis] = useState(false);

  const [modalIstoricDeschis, setModalIstoricDeschis] = useState(false)

  const setariRef = useRef(null)

  useEffect(() => {
    const tokenSalvat = localStorage.getItem('studyToken');
    const emailSalvat = localStorage.getItem('studyEmail');
    if (tokenSalvat && emailSalvat) {
      setToken(tokenSalvat);
      setUtilizatorLogat(emailSalvat);
    }
  }, [])

  const esteTextValid = (text) => {
    const cuvinte = text.trim().split(/\s+/);
    if (cuvinte.length < 4) return { valid: false, msg: "Pune pe pauza si scrie macar 4 cuvinte despre ce ai invatat!" };
    const areRepetitiiHidoase = /(.)\1{4,}/.test(text);
    if (areRepetitiiHidoase) return { valid: false, msg: "Nu trisa cu litere repetate!" };
    return { valid: true };
  };

  const gestioneazaAutentificarea = async (e) => {
    e.preventDefault();
    if (!inputEmail || !inputParola) return toast("Completează ambele câmpuri!");
    if (ecranCurent === 'register' && inputParola !== inputConfirmaParola) {
      return toast("Parolele nu coincid!");
    }
    const endpoint = ecranCurent === 'login' ? '/api/login' : '/api/register';
    try {
      const raspuns = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail, parola: inputParola })
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        if (ecranCurent === 'register') {
          toast("Cont creat! Loghează-te.");
          setEcranCurent('login');
          setInputParola('');
          setInputConfirmaParola('');
        } else {
          localStorage.setItem('studyToken', date.token);
          localStorage.setItem('studyEmail', date.email);
          setToken(date.token);
          setUtilizatorLogat(date.email);
        }
      } else {
        toast.error(date.error || "Eroare la autentificare");
      }
    } catch (eroare) { 
      console.log("Eroare server:", eroare); 
      toast.error("Serverul nu răspunde. Verifică dacă este pornit!");
    }
  }

  const logOut = () => {
    localStorage.removeItem('studyToken');
    localStorage.removeItem('studyEmail');
    setToken(null);
    setUtilizatorLogat(null);
    setMeniuSetariDeschis(false);
    setMaterii([]);
    setIstoricSesiuni([]);
  }

  const stergeContul = async () => {
    const confirmare = window.confirm("ESTI SIGUR? Aceasta actiune va sterge DEFINITIV contul. Nu exista cale de intoarcere!");
    if (!confirmare) return;
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/user`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      if (raspuns.ok) {
        toast("Contul tau a fost sters. Ne pare rau sa te vedem plecand!");
        logOut();
      } else {
        const date = await raspuns.json();
        toast(date.error || "A aparut o eroare la stergere.");
      }
    } catch (e) { console.log("Eroare retea:", e); }
  }

  const incarcaMateriile = async () => {
    if (!token) return;
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/subjects`, { headers: { 'Authorization': token } });
      const date = await raspuns.json();
      if (raspuns.ok) setMaterii(date);
      else if (raspuns.status === 400 || raspuns.status === 401) logOut();
    } catch (e) { console.log(e) }
  }

  const incarcaIstoric = async () => {
    if (!token) return;
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/sessions`, { headers: { 'Authorization': token } });
      const date = await raspuns.json();
      if (raspuns.ok) setIstoricSesiuni(date);
      else if (raspuns.status === 400 || raspuns.status === 401) logOut();
    } catch (e) { console.log(e) }
  }

  const incarcaTeme = async () => {
    if (!token) return;
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/homework`, { headers: { 'Authorization': token } });
      const date = await raspuns.json();
      if (raspuns.ok) setIstoricTeme(date);
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    if (utilizatorLogat && token) {
      incarcaMateriile();
      incarcaIstoric();
      incarcaTeme();
    }
  }, [utilizatorLogat, token])

  const salveazaTema = async (e) => {
    e.preventDefault();
    if (!materieTema || !descriereTema) return toast("Completeaza toate campurile!");
    const v = esteTextValid(descriereTema);
    if (!v.valid) return toast(v.msg);

    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/homework`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ materie_id: materieTema, descriere: descriereTema, dificultate: dificultateTema })
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        toast(date.mesaj);
        setDescriereTema("");
        incarcaTeme();
        incarcaIstoric();
      } else {
        toast(date.error);
      }
    } catch (e) { console.log("Eroare retea:", e); }
  };

  const adaugaMaterie = async (e) => {
    e.preventDefault();
    if (numeNou.trim() === "") return toast("Scrie un nume!");
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ nume: numeNou, profesor: profesorNou, are_teza: areTezaNou })
      });
      if (raspuns.ok) { setNumeNou(""); setProfesorNou(""); setAreTezaNou(false); incarcaMateriile(); }
    } catch (e) { console.log(e); }
  }

  const stergeMaterie = async (id) => {
    if (!window.confirm("Sigur stergi materia?")) return;
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/subjects/${id}`, {
        method: 'DELETE', headers: { 'Authorization': token }
      });
      if (raspuns.ok) incarcaMateriile();
    } catch (e) { console.log(e); }
  }

  const editeazaMaterie = async (id, dateNoi) => {
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/subjects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify(dateNoi)
      });
      const date = await raspuns.json();
      if (raspuns.ok) {
        toast.success("Materia a fost actualizată!");
        incarcaMateriile();
        return true;
      } else {
        toast.error(date.error || "Eroare la editare.");
        return false;
      }
    } catch (e) {
      console.log(e);
      toast.error("Eroare de rețea.");
      return false;
    }
  }

  const salveazaSesiune = async () => {
    if (timpSecunde === 0) return toast("Nu ai studiat inca!");
    if (!materieStudiu) return toast("Alege materia!");
    const materieSelectata = materii.find(m => m._id === materieStudiu);
    const numeDeSalvat = materieSelectata ? materieSelectata.nume : "Materie Necunoscuta";
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ materie_id: materieStudiu, materie_nume: numeDeSalvat, timp_secunde: timpSecunde })
      });
      if (raspuns.ok) {
        setCronometruPornit(false); setTimpSecunde(0); setMaterieStudiu(""); incarcaIstoric();
      }
    } catch (e) { console.log(e); }
  }

  const schimbaEcranulDeAuth = () => {
    setEcranCurent(ecranCurent === 'login' ? 'register' : 'login');
    setInputParola(''); setInputConfirmaParola(''); setAfiseazaParola(false);
  }

  useEffect(() => {
    if (modIntunecat) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [modIntunecat])

  useEffect(() => {
    const handleClickInAfara = (e) => {
      if (meniuSetariDeschis && setariRef.current && !setariRef.current.contains(e.target)) {
        setMeniuSetariDeschis(false)
      }
    }
    document.addEventListener('mousedown', handleClickInAfara)
    return () => document.removeEventListener('mousedown', handleClickInAfara)
  }, [meniuSetariDeschis])

  useEffect(() => {
    let interval = null;
    if (cronometruPornit && !asteaptaConfirmare) {
      interval = setInterval(() => {
        setTimpSecunde((t) => {
          const timpNou = t + 1;
          if (timpNou >= 7200) {
            setCronometruPornit(false);
            toast("Sesiune incheiata automat! Ai invatat 2 ore continuu. Creierul tau nu mai retine eficient, trebuie sa iei o pauza si sa salvezi sesiunea.");
            return timpNou;
          }
          if (timpNou > 0 && timpNou % 1500 === 0) {
            setAsteaptaConfirmare(true);
            setCronometruPornit(false);
          }
          return timpNou;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [cronometruPornit, asteaptaConfirmare]);

  const formateazaTimp = (secundeTotal) => {
    const minute = Math.floor(secundeTotal / 60).toString().padStart(2, '0');
    const secunde = (secundeTotal % 60).toString().padStart(2, '0');
    return `${minute}:${secunde}`;
  };

  const calculeazaStreak = () => {
    if (istoricSesiuni.length === 0) return 0;
    const dateUnice = [...new Set(istoricSesiuni.map(s => new Date(s.data_sesiune).toDateString()))]
      .map(d => new Date(d)).sort((a, b) => b - a);
    let streak = 0; let ziVerif = new Date(dateUnice[0]); ziVerif.setHours(0, 0, 0, 0);
    for (let dataSesiune of dateUnice) {
      let d = new Date(dataSesiune); d.setHours(0, 0, 0, 0);
      if (d.getTime() === ziVerif.getTime()) { streak++; ziVerif.setDate(ziVerif.getDate() - 1); }
      else break;
    }
    return streak;
  };

  const statisticiMaterii = istoricSesiuni.reduce((rez, ses) => {
    const nume = ses.materie_nume || (ses.materie_id ? ses.materie_id.nume : 'Materie stearsa');
    if (!rez[nume]) rez[nume] = 0;
    rez[nume] += ses.timp_secunde;
    return rez;
  }, {});
  const topMaterii = Object.entries(statisticiMaterii).sort((a, b) => b[1] - a[1]);

  const secundeAstazi = istoricSesiuni
    .filter(s => new Date(s.data_sesiune).toDateString() === new Date().toDateString())
    .reduce((tot, ses) => tot + ses.timp_secunde, 0);

  const limitaZilnicaAtinsa = secundeAstazi >= 18000;

  let inCooldown = false;
  let minutePauzaRamase = 0;

  if (istoricSesiuni.length > 0) {
    const ultimaSesiune = [...istoricSesiuni].sort((a, b) => new Date(b.data_sesiune) - new Date(a.data_sesiune))[0];
    if (new Date(ultimaSesiune.data_sesiune).toDateString() === new Date().toDateString()) {
      const minuteDeLaUltimaSesiune = (new Date() - new Date(ultimaSesiune.data_sesiune)) / (1000 * 60);
      if (minuteDeLaUltimaSesiune < 15) {
        inCooldown = true;
        minutePauzaRamase = Math.ceil(15 - minuteDeLaUltimaSesiune);
      }
    }
  }

  // Tabelul de ranguri pentru a calcula ce urmeaza
  const totalSecundeAdunate = istoricSesiuni.reduce((tot, ses) => tot + ses.timp_secunde, 0);
  const totalXPStudiu = Math.floor(totalSecundeAdunate / 60) * 10;
  const totalXPTeme = istoricTeme.reduce((tot, tema) => tot + tema.xp_primit, 0);
  const totalXP = totalXPStudiu + totalXPTeme;
  const xpPerNivel = 500;
  const nivelCurent = Math.floor(totalXP / xpPerNivel) + 1;
  const xpInNivelCurent = totalXP % xpPerNivel;
  const procentajBara = (xpInNivelCurent / xpPerNivel) * 100;

  const praguriRanguri = [
    { prag: 1, nume: "Initiate", culoare: "#94a3b8" },
    { prag: 10, nume: "Scholar", culoare: "#3b82f6" },
    { prag: 25, nume: "Specialist", culoare: "#8b5cf6" },
    { prag: 50, nume: "Visionary", culoare: "#f59e0b" },
    { prag: 80, nume: "Architect", culoare: "#ef4444" },
    { prag: 100, nume: "Legacy", culoare: "#10b981" }
  ];

  const rangCurent = [...praguriRanguri].reverse().find(r => nivelCurent >= r.prag) || praguriRanguri[0];
  const urmatorulRang = praguriRanguri.find(r => r.prag > nivelCurent) || praguriRanguri[praguriRanguri.length - 1];

  return (
    <Router>
      <Toaster richColors position="top-center" />
      <Routes>
        {/* Public Routes - Accessible without login */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected app area vs Auth area */}
        <Route path="*" element={
          !utilizatorLogat ? (
            <Auth
              ecranCurent={ecranCurent}
              setEcranCurent={setEcranCurent}
              inputEmail={inputEmail}
              setInputEmail={setInputEmail}
              inputParola={inputParola}
              setInputParola={setInputParola}
              afiseazaParola={afiseazaParola}
              setAfiseazaParola={setAfiseazaParola}
              inputConfirmaParola={inputConfirmaParola}
              setInputConfirmaParola={setInputConfirmaParola}
              gestioneazaAutentificarea={gestioneazaAutentificarea}
              schimbaEcranulDeAuth={schimbaEcranulDeAuth}
            />
          ) : (
            <DynamicBackground modIntunecat={modIntunecat}>
              <TopBar
                setariRef={setariRef}
                meniuSetariDeschis={meniuSetariDeschis}
                setMeniuSetariDeschis={setMeniuSetariDeschis}
                utilizatorLogat={utilizatorLogat}
                modIntunecat={modIntunecat}
                setModIntunecat={setModIntunecat}
                setModalIstoricDeschis={setModalIstoricDeschis}
                stergeContul={stergeContul}
                logOut={logOut}
              />

              <div className="flex flex-col items-center gap-4 py-8 relative z-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface dark:text-white">Study Tracker</h1>
                <Navigation />
              </div>

              <Routes>
                <Route path="/" element={
                  <Dashboard
                    nivelCurent={nivelCurent}
                    rangCurent={rangCurent}
                    calculeazaStreak={calculeazaStreak}
                    formateazaTimp={formateazaTimp}
                    totalSecundeAdunate={totalSecundeAdunate}
                    xpInNivelCurent={xpInNivelCurent}
                    xpPerNivel={xpPerNivel}
                    procentajBara={procentajBara}
                    totalXPStudiu={totalXPStudiu}
                    totalXPTeme={totalXPTeme}
                    urmatorulRang={urmatorulRang}
                    topMaterii={topMaterii}
                  />
                } />

                <Route path="/studiu" element={
                  <Studiu
                    cronometruPornit={cronometruPornit}
                    dropdownMaterieDeschis={dropdownMaterieDeschis}
                    setDropdownMaterieDeschis={setDropdownMaterieDeschis}
                    materieStudiu={materieStudiu}
                    materii={materii}
                    setMaterieStudiu={setMaterieStudiu}
                    formateazaTimp={formateazaTimp}
                    timpSecunde={timpSecunde}
                    asteaptaConfirmare={asteaptaConfirmare}
                    descriereStudiu={descriereStudiu}
                    setDescriereStudiu={setDescriereStudiu}
                    setAsteaptaConfirmare={setAsteaptaConfirmare}
                    setCronometruPornit={setCronometruPornit}
                    limitaZilnicaAtinsa={limitaZilnicaAtinsa}
                    inCooldown={inCooldown}
                    minutePauzaRamase={minutePauzaRamase}
                    esteTextValid={esteTextValid}
                    salveazaSesiune={salveazaSesiune}
                    setTimpSecunde={setTimpSecunde}
                    istoricSesiuni={istoricSesiuni}
                    setModalIstoricDeschis={setModalIstoricDeschis}
                    toast={toast}
                  />
                } />

                <Route path="/quests" element={
                  <Teme
                    salveazaTema={salveazaTema}
                    dropdownQuestDeschis={dropdownQuestDeschis}
                    setDropdownQuestDeschis={setDropdownQuestDeschis}
                    materieTema={materieTema}
                    materii={materii}
                    setMaterieTema={setMaterieTema}
                    dropdownDificultateDeschis={dropdownDificultateDeschis}
                    setDropdownDificultateDeschis={setDropdownDificultateDeschis}
                    dificultateTema={dificultateTema}
                    setDificultateTema={setDificultateTema}
                    descriereTema={descriereTema}
                    setDescriereTema={setDescriereTema}
                    istoricTeme={istoricTeme}
                  />
                } />

                <Route path="/orar" element={
                  <Orar
                    adaugaMaterie={adaugaMaterie}
                    numeNou={numeNou}
                    setNumeNou={setNumeNou}
                    profesorNou={profesorNou}
                    setProfesorNou={setProfesorNou}
                    areTezaNou={areTezaNou}
                    setAreTezaNou={setAreTezaNou}
                    materii={materii}
                    arataToateMateriile={arataToateMateriile}
                    setArataToateMateriile={setArataToateMateriile}
                    stergeMaterie={stergeMaterie}
                    editeazaMaterie={editeazaMaterie}
                    token={token}
                  />
                } />
              </Routes>

              <HistoryModal
                modalIstoricDeschis={modalIstoricDeschis}
                setModalIstoricDeschis={setModalIstoricDeschis}
                istoricSesiuni={istoricSesiuni}
                istoricTeme={istoricTeme}
                formateazaTimp={formateazaTimp}
                secundeAstazi={secundeAstazi}
                totalXP={totalXP}
              />
            </DynamicBackground>
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;