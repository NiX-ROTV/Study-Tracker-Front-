import { X } from 'lucide-react';

export default function HistoryModal({
  modalIstoricDeschis,
  setModalIstoricDeschis,
  istoricSesiuni,
  istoricTeme,
  formateazaTimp,
  secundeAstazi,
  totalXP
}) {
  if (!modalIstoricDeschis) return null;

  const istoricMixt = [
    ...istoricSesiuni.map(s => ({ tip: 'studiu', id: s._id, data: s.data_sesiune, titlu: s.materie_nume || s.materie_id?.nume || 'Materie', valoare: `+${formateazaTimp(s.timp_secunde)} min`, xp: Math.floor(s.timp_secunde / 60) * 10 })),
    ...istoricTeme.map(t => ({ tip: 'tema', id: t._id, data: t.data_finalizare, titlu: t.materie_id?.nume || 'Materie', valoare: `Misiune ${t.dificultate}`, xp: t.xp_primit }))
  ].sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div className="modal-overlay" onClick={() => setModalIstoricDeschis(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/20 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-on-surface dark:text-white m-0">Jurnal Universal</h2>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high dark:bg-gray-700 text-on-surface-variant dark:text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors"
            onClick={() => setModalIstoricDeschis(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-principal)', padding: '15px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secundar)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Timp azi</span>
            <h3 style={{ margin: 0, color: 'var(--culoare-accent)', fontSize: '1.5rem' }}>
              {formateazaTimp(secundeAstazi)} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>min</span>
            </h3>
          </div>

          <div style={{ flex: 1, backgroundColor: 'var(--bg-principal)', padding: '15px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secundar)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>XP Total</span>
            <h3 style={{ margin: 0, color: '#8b5cf6', fontSize: '1.5rem' }}>
              {totalXP} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>XP</span>
            </h3>
          </div>
        </div>

        <div className="lista-istoric-detaliat" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '5px' }}>
          {istoricMixt.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secundar)', marginTop: '20px' }}>Fara istoric recent.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {istoricMixt.map(item => (
                <li key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-principal)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderLeft: `5px solid ${item.tip === 'studiu' ? '#10b981' : '#3b82f6'}`,
                  borderTop: '1px solid var(--border)',
                  borderRight: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--text-principal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.titlu}
                      <span style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        backgroundColor: item.tip === 'studiu' ? '#10b98120' : '#3b82f620',
                        color: item.tip === 'studiu' ? '#10b981' : '#3b82f6',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        {item.tip}
                      </span>
                    </strong>
                    <small style={{ color: 'var(--text-secundar)', fontSize: '0.8rem' }}>
                      {new Date(item.data).toLocaleString('ro-RO')}
                    </small>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secundar)' }}>
                      {item.valoare}
                    </span>
                    <span style={{ fontSize: '0.95rem', color: '#8b5cf6', fontWeight: 'bold' }}>
                      +{item.xp} XP
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
