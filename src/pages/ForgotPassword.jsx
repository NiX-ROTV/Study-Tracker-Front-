import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [seIncarca, setSeIncarca] = useState(false);
  const API_BASE_URL = 'http://localhost:5000';

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Te rugăm să introduci adresa de email.");

    setSeIncarca(true);
    try {
      const raspuns = await fetch(`${API_BASE_URL}/api/forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const date = await raspuns.json();

      if (raspuns.ok) {
        toast.success("Link-ul de resetare a fost trimis pe email!");
      } else {
        toast.error(date.error || "A apărut o eroare.");
      }
    } catch (eroare) {
      toast.error("Eroare de conexiune la server.");
    } finally {
      setSeIncarca(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fffcf7] relative overflow-hidden">
      {/* Ornament Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-[#cceacf]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#d9a777]/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm border border-outline-variant/10 shadow-[0px_20px_40px_rgba(56,56,51,0.06)] rounded-[2.5rem] p-10 md:p-14">
          <header className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6f3ed] rounded-2xl mb-4 text-[#506b55]">
              <Mail size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#383833]">Ai uitat parola?</h1>
            <p className="mono-label text-[#65655e] text-[10px] tracking-widest uppercase px-4 leading-relaxed">
              Introdu adresa de email pentru a primi un link de resetare.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleForgot}>
            <div className="space-y-1.5">
              <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Email</label>
              <div className="relative group">
                <input
                  className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] placeholder:text-gray-300 transition-all duration-300"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="exemplu@gmail.com"
                  required
                />
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#506b55] transition-colors">mail</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={seIncarca}
              className="w-full h-14 rounded-full bg-gradient-to-br from-[#506b55] to-[#cceacf] text-white font-bold text-xs tracking-[0.2em] shadow-lg shadow-[#506b55]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 disabled:opacity-50 disabled:scale-100"
            >
              {seIncarca ? 'SE TRIMITE...' : 'TRIMITE LINK'}
            </button>
          </form>

          <footer className="mt-10 text-center">
            <Link to="/" className="text-[#506b55] font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:underline underline-offset-4 overflow-hidden">
               <ArrowLeft size={14} />
               <span>ÎNAPOI LA LOGIN</span>
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
