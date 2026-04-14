import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "px-5 py-2 rounded-full font-bold transition-all duration-300 ";

    return isActive
      ? baseClass + "bg-[#506b55] text-white shadow-lg scale-105" 
      : baseClass + "bg-surface-container-high dark:bg-gray-800 text-on-surface-variant dark:text-gray-300 hover:bg-[#506b55]/10 dark:hover:bg-gray-700";
  };

  return (
    <nav className="flex flex-wrap justify-center gap-3">
      <Link to="/" className={getLinkClass("/")}>🏠 Acasa</Link>
      <Link to="/studiu" className={getLinkClass("/studiu")}>⏱️ Studiu</Link>
      <Link to="/quests" className={getLinkClass("/quests")}>📜 Teme</Link>
      <Link to="/orar" className={getLinkClass("/orar")}>📅 Orar</Link>
    </nav>
  );
}
