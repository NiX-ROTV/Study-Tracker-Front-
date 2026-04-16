import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth({
  ecranCurent,
  inputEmail,
  setInputEmail,
  inputParola,
  setInputParola,
  afiseazaParola,
  setAfiseazaParola,
  inputConfirmaParola,
  setInputConfirmaParola,
  gestioneazaAutentificarea,
  schimbaEcranulDeAuth
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fffcf7] relative overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#cceacf]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[32rem] h-[32rem] bg-[#d9a777]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-12 left-1/4 w-64 h-64 bg-[#cae7f1]/20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm border border-outline-variant/10 shadow-[0px_20px_40px_rgba(56,56,51,0.06)] rounded-[2.5rem] p-10 md:p-14 transition-all duration-500">
          <header className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6f3ed] rounded-2xl mb-4">
              <span className="material-symbols-outlined text-[#506b55] text-3xl">menu_book</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#383833]">Study Tracker</h1>
            <p className="mono-label text-[#65655e] text-[10px] tracking-widest uppercase">
              {ecranCurent === 'login' ? 'Bine ai revenit! Loghează-te.' : 'Creează un cont nou.'}
            </p>
          </header>

          <form className="space-y-6" onSubmit={gestioneazaAutentificarea}>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Email</label>
                <div className="relative group">
                  <input
                    className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] placeholder:text-gray-300 transition-all duration-300"
                    type="email"
                    value={inputEmail}
                    onChange={e => setInputEmail(e.target.value)}
                    placeholder=""
                    required
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#506b55] transition-colors">mail</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Parola</label>
                <div className="relative group">
                  <input
                    className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] placeholder:text-gray-300 transition-all duration-300"
                    type={afiseazaParola ? "text" : "password"}
                    value={inputParola}
                    onChange={e => setInputParola(e.target.value)}
                    placeholder=""
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setAfiseazaParola(!afiseazaParola)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#506b55] transition-colors"
                  >
                    {afiseazaParola ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {ecranCurent === 'login' && (
                  <div className="flex justify-end px-2">
                    <Link to="/forgot-password" title="Resetează parola" className="text-[10px] font-bold text-[#506b55] hover:underline underline-offset-4 tracking-wider uppercase opacity-70 hover:opacity-100 transition-all">
                      Ai uitat parola?
                    </Link>
                  </div>
                )}
              </div>

              {ecranCurent === 'register' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="mono-label text-[10px] uppercase tracking-widest text-[#65655e] ml-4 block">Confirmă Parola</label>
                  <input
                    className="w-full h-14 px-6 rounded-full bg-[#f6f3ed] border-none focus:ring-4 focus:ring-[#506b55]/10 focus:bg-white text-[#383833] placeholder:text-gray-300 transition-all duration-300"
                    type={afiseazaParola ? "text" : "password"}
                    value={inputConfirmaParola}
                    onChange={e => setInputConfirmaParola(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              )}
            </div>

            <button type="submit" className="w-full h-14 rounded-full bg-gradient-to-br from-[#506b55] to-[#cceacf] text-white font-bold text-xs tracking-[0.2em] shadow-lg shadow-[#506b55]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4">
              {ecranCurent === 'login' ? 'INTRA IN CONT' : 'CREEAZĂ CONT'}
            </button>
          </form>

          <footer className="mt-10 text-center">
            <p className="mono-label text-[11px] text-[#65655e] tracking-normal">
              {ecranCurent === 'login' ? 'Nu ai cont?' : 'Ai deja cont?'}
              <button
                onClick={schimbaEcranulDeAuth}
                className="text-[#506b55] font-bold ml-1 hover:underline underline-offset-4 decoration-[#506b55]/30 transition-all"
              >
                {ecranCurent === 'login' ? 'Înregistrează-te.' : 'Loghează-te.'}
              </button>
            </p>
          </footer>
        </div>

        <div className="absolute -right-8 -bottom-12 hidden lg:block rotate-6">
          <div className="bg-[#d9a777] text-white p-6 rounded-lg shadow-xl w-40 aspect-square flex flex-col justify-between">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <p className="mono-label text-[10px] leading-tight font-medium uppercase tracking-tighter">
              "Continuă să înveți, progresul vine în pași mici."
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 right-0 w-1/3 h-1/2 pointer-events-none opacity-10 mix-blend-multiply grayscale">
        <img
          className="w-full h-full object-cover object-top"
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000"
          alt="aesthetic desk"
        />
      </div>
    </div>
  );
}
