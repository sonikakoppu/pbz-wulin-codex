import { useMemo, useState } from 'react';
import { Compass, Search, Sparkles, Wrench, Zap } from 'lucide-react';
import type { EntityRef, PhantomEdgeClass } from '../../types/codex';
import { EXPLORATION_OBSTACLES, PHANTOM_EDGES } from '../../data/arsenal';
import { getEdgeImage } from '../../data/itemImages';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface PhantomEdgesViewProps {
  spoilerShield: boolean;
  onSelectEntity: (ref: EntityRef) => void;
}

export function PhantomEdgesView({ spoilerShield, onSelectEntity }: PhantomEdgesViewProps) {
  const [edgeClass, setEdgeClass] = useState<'All' | PhantomEdgeClass>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHANTOM_EDGES.filter((edge) => {
      if (edgeClass !== 'All' && edge.edgeClass !== edgeClass) return false;
      if (q) {
        const hay = `${edge.name} ${edge.region} ${edge.combatRole} ${edge.unlockSource} ${edge.evolution?.name ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [edgeClass, query]);

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <Wrench size={13} aria-hidden="true" />
            <span>SECONDARY ARTIFICE · ALL {PHANTOM_EDGES.length} PHANTOM EDGES</span>
          </div>
          <h1 className="section-title">Phantom Edges &amp; World Obstacles Guide</h1>
          <p className="section-desc">
            Secondary Kung-Fu Punk contraptions fueled by Remnant Sparks. Many Phantom Edges also unlock
            locked gates, hanging loot, grapple points, and illusion walls across the map.
          </p>
        </div>
        <div className="badge badge-gold" style={{ padding: '0.55rem 0.9rem', fontSize: '0.78rem' }}>
          {filtered.length} / {PHANTOM_EDGES.length} Phantom Edges
        </div>
      </div>

      {/* Exploration Obstacle Traversal Matrix */}
      <div className="build-sandbox-panel">
        <div className="section-kicker" style={{ marginBottom: '0.5rem' }}>
          <Compass size={13} aria-hidden="true" />
          <span>WHICH PHANTOM EDGE OPENS EACH LOCKED OBSTACLE</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {EXPLORATION_OBSTACLES.map((obs) => (
            <div
              key={obs.id}
              style={{
                padding: '0.8rem',
                background: 'rgba(11, 13, 16, 0.78)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <strong style={{ fontSize: '0.88rem', color: 'var(--bone)' }}>{obs.name}</strong>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)', flex: 1 }}>{obs.description}</p>
              <button
                type="button"
                className="entity-chip"
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
                onClick={() => onSelectEntity({ kind: 'edge', id: obs.edgeId, label: obs.edgeName })}
              >
                Use: {obs.edgeName} →
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-pills">
          {(['All', 'Destructive', 'Martial', 'Artifice', 'Summon'] as const).map((cls) => (
            <button
              key={cls}
              type="button"
              className={`filter-pill ${edgeClass === cls ? 'is-active' : ''}`}
              onClick={() => setEdgeClass(cls)}
            >
              {cls}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={15} aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Search Phantom Edge, role, or region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter Phantom Edges"
          />
        </div>
      </div>

      <div className="item-grid">
        {filtered.map((edge) => (
          <article key={edge.id} className="gear-card">
            <div className="gear-card-top">
              <div className="gear-art-box">
                <img
                  src={getEdgeImage(edge.id)}
                  alt={edge.name}
                  loading="lazy"
                  width={72}
                  height={72}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: 4 }}>
                  <span className={`badge ${edge.tier === 'Essential' ? 'badge-crimson' : 'badge-gold'}`}>
                    {edge.tier}
                  </span>
                  <span className="badge badge-azure">{edge.edgeClass}</span>
                  <span className="badge badge-bone">
                    <Zap size={10} aria-hidden="true" /> {edge.sparkCost} Sparks
                  </span>
                </div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                  {edge.name}
                </h2>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  {edge.region}
                </div>
              </div>
            </div>

            <SpoilerVeil
              spoilerShield={spoilerShield}
              isSpoiler={Boolean(edge.spoiler)}
              label={`Late-Game Phantom Edge (${edge.name}) — Reveal Details`}
            >
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#d1d5db' }}>{edge.combatRole}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.45rem' }}>
                <strong>Where to Find:</strong> {edge.unlockSource}
              </div>
            </SpoilerVeil>

            {edge.obstacleLabel && (
              <div className="badge badge-jade" style={{ alignSelf: 'flex-start' }}>
                Opens Obstacle: {edge.obstacleLabel}
              </div>
            )}

            {edge.evolution && (
              <div className="temper-callout">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)' }}>
                  <Sparkles size={11} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                  EVOLVED FORM: {edge.evolution.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#d1d5db', marginTop: 2 }}>
                  Catalyst: {edge.evolution.catalyst} · {edge.evolution.evolvedBonus}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                className="entity-chip"
                onClick={() => onSelectEntity({ kind: 'edge', id: edge.id, label: edge.name })}
              >
                Full Details →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
