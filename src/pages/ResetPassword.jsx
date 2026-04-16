import React, { useState } from 'react';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [parola, setParola] = useState('');
  const [confirmaParola, setConfirmaParola] = useState('');
  const [seIncarca, setSeIncarca] = useState(false);
  const API_BASE_URL = 'http://localhost:5000';

  const handleReset = async (e) => {
    e.preventDefault();
    if (parola !== confirmaParola) return toast.error("Parolele nu coincid!");
    if (parola.length < 6) return toast.error("Parola trebuie să aibă minim 6 caractere.");

    setSeIncarca(true);
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/resetpassword/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parola })
      });
      const date = await raspuns.json();

      if (raspuns.ok) {
        toast.success("Parola a fost schimbată! Te poți loga.");
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(date.error || "Token-ul a expirat.");
      }
    } catch (eroare) {
      toast.error("Eroare de conexiune.");
    } finally {
      setSeIncarca(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fffcf7] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-12 w-[32rem] h-[32rem] bg-[#cceacf]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-12 w-[32rem] h-[32rem] bg-[#d9a777]/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm border border-outline-variant/10 shadow-[0px_20px_40px_rgba(56,56,51,0.06)] rounded-[2.5rem] p-10 md:p-14">
          <header className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6f3ed] rounded-2xl mb-4 text-[#506b55]">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#383833]">Schimbă parola</h1>
            <p className="mono-label text-[#65655e] text-[10px] tracking-widest uppercase">
              Introdu noua parolă mai jos.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleReset}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Parola Nouă</label>
                <div className="relative group">
                  <input
                    className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] transition-all duration-300"
                    type="password"
                    value={parola}
                    onChange={e => setParola(e.target.value)}
                    placeholder="Minim 6 caractere"
                    required
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#506b55] transition-colors">lock</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Confirmă Parola</label>
                <div className="relative group">
                  <input
                    className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] transition-all duration-300"
                    type="password"
                    value={confirmaParola}
                    onChange={e => setConfirmaParola(e.target.value)}
                    placeholder="Repetă parola"
                    required
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#506b55] transition-colors">lock</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={seIncarca}
              className="w-full h-14 rounded-full bg-gradient-to-br from-[#506b55] to-[#cceacf] text-white font-bold text-xs tracking-[0.2em] shadow-lg shadow-[#506b55]/20 hover:scale-[1.02] transition-all duration-300 mt-4 disabled:opacity-50"
            >
              {seIncarca ? 'ACTUALIZARE...' : 'SALVEAZĂ PAROLA'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
