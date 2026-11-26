import { useState } from 'react';
import { GitFork, Shield, Sparkles, Users } from 'lucide-react';
import type { BloodlineRelationType, EntityRef } from '../../types/codex';
import { BLOODLINE_CLANS, BLOODLINE_RELATIONS } from '../../data/bloodlines';
import { CHARACTER_DOSSIERS } from '../../data/story';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface BloodlinesViewProps {
  spoilerShield: boolean;
  onSelectEntity: (ref: EntityRef) => void;
}

const TREE_POSITIONS: Record<string, { x: number; y: number; clanColor: string; shortFaction: string }> = {
  'mo-yuan': { x: 165, y: 90, clanColor: '#38bdf8', shortFaction: 'Bastion of Mó' },
  'mu-tianmiao': { x: 530, y: 80, clanColor: '#dc2626', shortFaction: 'The Order Founder' },
  huangxing: { x: 895, y: 90, clanColor: '#eab308', shortFaction: 'Kunlun Pillars' },
  soul: { x: 190, y: 270, clanColor: '#38bdf8', shortFaction: 'Bastion · The Order' },
  'mu-xiaokui': { x: 530, y: 270, clanColor: '#dc2626', shortFaction: 'The Order Heir' },
  'zuo-shang': { x: 870, y: 270, clanColor: '#eab308', shortFaction: 'Lóng Clan · Order' },
  'meng-hua': { x: 165, y: 470, clanColor: '#a855f7', shortFaction: 'Lady of the Veil' },
  'leng-tu': { x: 405, y: 470, clanColor: '#a855f7', shortFaction: 'Thread-Binding Sect' },
  inanis: { x: 655, y: 470, clanColor: '#dc2626', shortFaction: 'Shadow Edicts' },
  'lei-dang': { x: 915, y: 470, clanColor: '#dc2626', shortFaction: 'Shadow Warden' },
  myst: { x: 1085, y: 195, clanColor: '#10b981', shortFaction: 'Soul Temper Smith' },
  jewel: { x: 1085, y: 365, clanColor: '#10b981', shortFaction: 'Charm Polisher' },
};

const RELATION_STYLE: Record<BloodlineRelationType, { color: string; dash?: string; label: string }> = {
  blood: { color: '#eab308', label: 'Blood Lineage' },
  adopted: { color: '#38bdf8', dash: '6 5', label: 'Adopted Orphan' },
  betrayal: { color: '#ef4444', dash: '8 4', label: 'Betrayal / Blood Feud' },
  purge: { color: '#dc2626', dash: '3 4', label: 'Clan Purge' },
  oath: { color: '#a855f7', dash: '5 5', label: 'Oath / Command' },
};

const RELATION_SHORT_LABEL: Record<string, string> = {
  'rel-mo-soul': 'Father & Son',
  'rel-mu-xiaokui': 'Father & Daughter',
  'rel-mu-adopt-soul': 'Adopted After Purge',
  'rel-mu-adopt-zuo': 'Adopted Lóng Heir',
  'rel-mu-purge-mo': 'Purged & Imprisoned',
  'rel-zuo-betray-soul': 'Framed · Sworn Rivals',
  'rel-zuo-inanis': 'Memory Erasure Order',
  'rel-zuo-leidang': 'Sent to Hunt Soul',
  'rel-soul-xiaokui': 'Childhood Bond · 5 Ribbons',
  'rel-myst-jewel': 'Sisters',
  'rel-meng-leng': 'Veil Blight Ritual',
};

function getCurveGeometry(
  relId: string,
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  let cx = (from.x + to.x) / 2;
  let cy = (from.y + to.y) / 2;

  // Route long horizontal arcs cleanly away from middle character boxes
  if (relId === 'rel-zuo-betray-soul') {
    cy = 375;
  } else if (relId === 'rel-mu-purge-mo') {
    cy = 45;
  } else if (relId === 'rel-mu-adopt-soul') {
    cx = 320;
    cy = 155;
  } else if (relId === 'rel-mu-adopt-zuo') {
    cx = 740;
    cy = 155;
  } else if (relId === 'rel-soul-xiaokui') {
    cy = 248;
  }

  // Quadratic Bezier midpoint at t = 0.5
  const midX = 0.25 * from.x + 0.5 * cx + 0.25 * to.x;
  const midY = 0.25 * from.y + 0.5 * cy + 0.25 * to.y;

  return {
    d: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`,
    midX,
    midY,
  };
}

export function BloodlinesView({ spoilerShield, onSelectEntity }: BloodlinesViewProps) {
  const [activeClanId, setActiveClanId] = useState<string>('all');
  const [relationFilter, setRelationFilter] = useState<BloodlineRelationType | 'all'>('all');
  const [focusedCharId, setFocusedCharId] = useState<string>('soul');

  const focusedChar = CHARACTER_DOSSIERS.find((c) => c.id === focusedCharId) ?? CHARACTER_DOSSIERS[0];

  const visibleRelations = BLOODLINE_RELATIONS.filter((rel) => {
    if (spoilerShield && rel.spoilerOnly) return false;
    if (relationFilter !== 'all' && rel.type !== relationFilter) return false;
    return true;
  });

  const focusedRelations = visibleRelations.filter(
    (rel) => rel.fromId === focusedCharId || rel.toId === focusedCharId
  );

  const filteredClans =
    activeClanId === 'all' ? BLOODLINE_CLANS : BLOODLINE_CLANS.filter((c) => c.id === activeClanId);

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <GitFork size={13} aria-hidden="true" />
            <span>WULIN BLOODLINES, PURGED CLANS &amp; CHARACTER LINEAGES</span>
          </div>
          <h1 className="section-title">Bloodlines &amp; Clan Lineage Web</h1>
          <p className="section-desc">
            Click any character in the lineage web below to highlight their exact blood ties, adoptions,
            and betrayals. Toggle Spoiler Shield in the top bar to reveal hidden family secrets.
          </p>
        </div>

        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${relationFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setRelationFilter('all')}
          >
            All Bonds
          </button>
          {(Object.keys(RELATION_STYLE) as BloodlineRelationType[]).map((relType) => (
            <button
              key={relType}
              type="button"
              className={`filter-pill ${relationFilter === relType ? 'is-active' : ''}`}
              onClick={() => setRelationFilter(relType)}
            >
              {RELATION_STYLE[relType].label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Bloodline & Betrayal Graph */}
      <div className="bloodline-web-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.76rem', color: 'var(--muted)' }}>
            {(Object.entries(RELATION_STYLE) as [BloodlineRelationType, { color: string; label: string }][]).map(
              ([type, cfg]) => (
                <span key={type}>
                  <span className="legend-dot" style={{ background: cfg.color }} />
                  {cfg.label}
                </span>
              )
            )}
          </div>
          {spoilerShield && (
            <span className="badge badge-gold">
              Spoiler Shield ON — Secret Bloodlines Veiled (Turn OFF in header to reveal all links)
            </span>
          )}
        </div>

        <svg
          viewBox="0 0 1200 540"
          style={{
            width: '100%',
            minWidth: 780,
            height: 'auto',
            display: 'block',
            background: 'rgba(11, 13, 16, 0.65)',
            borderRadius: 6,
          }}
          role="img"
          aria-label="Interactive Bloodline Lineage Web of Phantom Blade Zero characters"
        >
          {/* Layer 1: Curved Connection Paths */}
          {visibleRelations.map((rel) => {
            const from = TREE_POSITIONS[rel.fromId];
            const to = TREE_POSITIONS[rel.toId];
            if (!from || !to) return null;
            const style = RELATION_STYLE[rel.type];
            const isHighlighted = rel.fromId === focusedCharId || rel.toId === focusedCharId;
            const { d } = getCurveGeometry(rel.id, from, to);
            return (
              <path
                key={rel.id}
                d={d}
                fill="none"
                stroke={style.color}
                strokeWidth={isHighlighted ? 3 : 1.75}
                strokeDasharray={style.dash}
                opacity={isHighlighted ? 0.95 : 0.35}
              />
            );
          })}

          {/* Layer 2: Character Node Cards */}
          {Object.entries(TREE_POSITIONS).map(([charId, pos]) => {
            const dossier = CHARACTER_DOSSIERS.find((c) => c.id === charId);
            if (!dossier) return null;
            const active = charId === focusedCharId;
            return (
              <g
                key={charId}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${dossier.name} bloodline`}
                onClick={() => setFocusedCharId(charId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setFocusedCharId(charId);
                  }
                }}
              >
                <rect
                  x={-84}
                  y={-27}
                  width={168}
                  height={54}
                  rx={6}
                  fill={active ? '#1f2633' : '#141820'}
                  stroke={active ? '#EAB308' : pos.clanColor}
                  strokeWidth={active ? 2.8 : 1.6}
                />
                <text
                  textAnchor="middle"
                  y={-4}
                  style={{ fontSize: '13px', fontWeight: 700, fill: '#F3F4F6', fontFamily: 'var(--font-display)' }}
                >
                  {dossier.name}
                </text>
                <text
                  textAnchor="middle"
                  y={14}
                  style={{ fontSize: '10px', fill: '#9CA3AF', fontFamily: 'var(--font-mono)' }}
                >
                  {pos.shortFaction}
                </text>
              </g>
            );
          })}

          {/* Layer 3: Crisp Relation Label Pills Rendered ABOVE Everything */}
          {focusedRelations.map((rel) => {
            const from = TREE_POSITIONS[rel.fromId];
            const to = TREE_POSITIONS[rel.toId];
            if (!from || !to) return null;
            const style = RELATION_STYLE[rel.type];
            const { midX, midY } = getCurveGeometry(rel.id, from, to);
            const shortText = RELATION_SHORT_LABEL[rel.id] ?? rel.label;
            const pillWidth = Math.max(118, shortText.length * 6.8 + 18);

            return (
              <g key={`pill-${rel.id}`} transform={`translate(${midX}, ${midY})`} style={{ pointerEvents: 'none' }}>
                <rect
                  x={-pillWidth / 2}
                  y={-12}
                  width={pillWidth}
                  height={24}
                  rx={4}
                  fill="#0B0D10"
                  stroke={style.color}
                  strokeWidth={1.3}
                />
                <text
                  textAnchor="middle"
                  dy="4"
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    fill: '#F3F4F6',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {shortText}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Focused Character Inspector Strip */}
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem 1.15rem',
            background: 'rgba(11, 13, 16, 0.85)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: 6 }}>
              <span className="badge badge-gold">{focusedChar.factionLabel}</span>
              <span className="badge badge-bone">{focusedChar.status}</span>
            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
              {focusedChar.name} — <span style={{ color: 'var(--crimson-bright)' }}>{focusedChar.epithet}</span>
            </h3>
            <p style={{ margin: '0.45rem 0 0', fontSize: '0.86rem', color: '#d1d5db' }}>{focusedChar.publicRole}</p>
            {focusedRelations.length > 0 && (
              <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.79rem', color: 'var(--muted)' }}>
                {focusedRelations.map((rel) => {
                  const otherId = rel.fromId === focusedChar.id ? rel.toId : rel.fromId;
                  const other = CHARACTER_DOSSIERS.find((c) => c.id === otherId);
                  return (
                    <div key={`desc-${rel.id}`}>
                      <strong style={{ color: RELATION_STYLE[rel.type].color }}>
                        ↔ {other?.name ?? otherId}:
                      </strong>{' '}
                      {rel.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)', marginBottom: 4 }}>
              BLOODLINE &amp; TRUE MOTIVES
            </div>
            <SpoilerVeil
              spoilerShield={spoilerShield}
              isSpoiler={focusedChar.spoilerBio}
              label={`Reveal ${focusedChar.name} Bloodline Truth`}
            >
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#fde68a' }}>
                <strong>Lineage:</strong> {focusedChar.bloodline}
              </p>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.83rem', color: '#d1d5db' }}>{focusedChar.trueMotives}</p>
            </SpoilerVeil>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.6rem' }}>
            <div className="chip-row">
              {focusedChar.linkedGear.map((g) => (
                <button
                  key={`${focusedChar.id}-${g.id}`}
                  type="button"
                  className="entity-chip"
                  onClick={() => onSelectEntity(g)}
                >
                  {g.label} →
                </button>
              ))}
              {focusedChar.linkedBosses.map((b) => (
                <button
                  key={`${focusedChar.id}-boss-${b.id}`}
                  type="button"
                  className="entity-chip"
                  onClick={() => onSelectEntity(b)}
                >
                  Boss: {b.label} →
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-ghost-sm"
              onClick={() => onSelectEntity({ kind: 'character', id: focusedChar.id, label: focusedChar.name })}
            >
              Open Full Character Dossier →
            </button>
          </div>
        </div>
      </div>

      {/* 6 Major Bloodline Clan Houses */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
          <Shield size={17} style={{ display: 'inline', marginRight: 8, color: 'var(--gold)' }} aria-hidden="true" />
          Six Ancient &amp; Modern Bloodline Houses
        </h2>
        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${activeClanId === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveClanId('all')}
          >
            All Houses ({BLOODLINE_CLANS.length})
          </button>
          {BLOODLINE_CLANS.map((clan) => (
            <button
              key={clan.id}
              type="button"
              className={`filter-pill ${activeClanId === clan.id ? 'is-active' : ''}`}
              onClick={() => setActiveClanId(clan.id)}
            >
              {clan.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bloodline-grid">
        {filteredClans.map((clan) => (
          <article key={clan.id} className={`clan-card accent-${clan.accent}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                  {clan.name}{' '}
                  <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 500 }}>
                    {clan.hanzi}
                  </span>
                </h3>
                <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginTop: 3 }}>
                  {clan.status}
                </div>
              </div>
              <span className={`badge badge-${clan.accent}`}>
                <Sparkles size={10} aria-hidden="true" /> Bloodline
              </span>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>
              <strong>Sha-Chi Trait:</strong> {clan.shaChiTrait}
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db' }}>{clan.publicHistory}</p>

            <SpoilerVeil
              spoilerShield={spoilerShield}
              isSpoiler={clan.spoilerTruth}
              label={`Reveal ${clan.name} Sealed Bloodline Truth`}
            >
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(220, 38, 38, 0.08)',
                  border: '1px solid var(--border-crimson)',
                  fontSize: '0.85rem',
                  color: '#fde68a',
                }}
              >
                {clan.hiddenTruth}
              </div>
            </SpoilerVeil>

            <div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 6 }}>
                <Users size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                HEIRS &amp; KEY RELICS
              </div>
              <div className="chip-row">
                {clan.memberIds.map((mId) => {
                  const char = CHARACTER_DOSSIERS.find((c) => c.id === mId);
                  if (!char) return null;
                  return (
                    <button
                      key={mId}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'character', id: char.id, label: char.name })}
                    >
                      {char.name}
                    </button>
                  );
                })}
                {clan.keyRelics.map((relic) => (
                  <button
                    key={`${clan.id}-${relic.id}`}
                    type="button"
                    className="entity-chip"
                    onClick={() => onSelectEntity(relic)}
                  >
                    {relic.label} →
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
