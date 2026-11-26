import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Compass,
  Flame,
  Layers,
  MapPin,
  ShieldAlert,
  Swords,
  Wrench,
} from 'lucide-react';
import type { EntityRef } from '../../types/codex';
import { WORLD_REGIONS } from '../../data/worldMap';
import { assetUrl } from '../../utils/assetUrl';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { ACCESSORIES } from '../../data/accessories';
import { QUEST_TALES } from '../../data/quests';
import { BOSSES } from '../../data/codex';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface StoryMapViewProps {
  spoilerShield: boolean;
  selectedRegionId: string;
  onSelectRegionId: (regionId: string) => void;
  onSelectEntity: (ref: EntityRef) => void;
}

export function StoryMapView({
  spoilerShield,
  selectedRegionId,
  onSelectRegionId,
  onSelectEntity,
}: StoryMapViewProps) {
  const selectedIndex = Math.max(
    0,
    WORLD_REGIONS.findIndex((r) => r.id === selectedRegionId)
  );
  const selectedRegion = WORLD_REGIONS[selectedIndex] ?? WORLD_REGIONS[0];
  const prevRegion = selectedIndex > 0 ? WORLD_REGIONS[selectedIndex - 1] : null;
  const nextRegion = selectedIndex < WORLD_REGIONS.length - 1 ? WORLD_REGIONS[selectedIndex + 1] : null;

  const regionBosses = BOSSES.filter((b) => selectedRegion.bossIds.includes(b.id));
  const regionWeapons = MAIN_WEAPONS.filter((w) => selectedRegion.weaponIds.includes(w.id));
  const regionEdges = PHANTOM_EDGES.filter((e) => selectedRegion.edgeIds.includes(e.id));
  const regionAccessories = ACCESSORIES.filter((a) => selectedRegion.accessoryIds.includes(a.id));
  const regionQuests = QUEST_TALES.filter((q) => selectedRegion.questIds.includes(q.id));

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <Compass size={13} aria-hidden="true" />
            <span>ENTIRE WULIN STORY MAP · PROLOGUE TO MOUNT SOULREND</span>
          </div>
          <h1 className="section-title">Interactive Story Map &amp; Next-Destination Guide</h1>
          <p className="section-desc">
            Click any region node on the map (or step forward with the Next Destination buttons) to see
            every boss, weapon, Phantom Edge, accessory, and side quest you must complete before leaving.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {prevRegion && (
            <button
              type="button"
              className="btn-ghost-sm"
              onClick={() => onSelectRegionId(prevRegion.id)}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Prev: {prevRegion.name}</span>
            </button>
          )}
          {nextRegion && (
            <button
              type="button"
              className="btn-crimson"
              style={{ padding: '0.55rem 1rem', fontSize: '0.75rem' }}
              onClick={() => onSelectRegionId(nextRegion.id)}
            >
              <span>Next Stop: {nextRegion.name}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="story-map-layout">
        {/* Interactive Illustrated Ink-Wash Map */}
        <div className="map-canvas-shell">
          <div className="map-svg-stage">
            <img
              src={assetUrl('/assets/wulin-map-bg.jpg')}
              alt="Dark Shan Shui ink-wash topographic map of the Phantom World"
              className="map-backdrop-img"
              width={1200}
              height={680}
            />
            <svg
              viewBox="0 0 1200 680"
              className="map-svg-overlay"
              role="img"
              aria-label="Interactive Phantom Blade Zero Story Map with 10 regions"
            >
              <defs>
                <filter id="pbz-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {WORLD_REGIONS.map((region) =>
                region.connectedTo.map((targetId) => {
                  const target = WORLD_REGIONS.find((r) => r.id === targetId);
                  if (!target) return null;
                  const midX = (region.x + target.x) / 2;
                  const midY = (region.y + target.y) / 2 - 22;
                  const isOpt = target.isOptionalBranch || region.isOptionalBranch;
                  const isPonr = region.isPointOfNoReturn || target.isPointOfNoReturn;
                  return (
                    <path
                      key={`${region.id}-${target.id}`}
                      d={`M ${region.x} ${region.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      className={`map-route-line ${isOpt ? 'is-optional' : ''} ${isPonr ? 'is-ponr' : ''}`}
                    />
                  );
                })
              )}

              {WORLD_REGIONS.map((region) => {
                const active = region.id === selectedRegion.id;
                const labelBelow = region.y < 260;
                return (
                  <g
                    key={region.id}
                    transform={`translate(${region.x}, ${region.y})`}
                    className={`map-node-group ${active ? 'is-selected' : ''} ${region.isPointOfNoReturn ? 'is-ponr' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${region.chapterLabel}: ${region.name}`}
                    aria-pressed={active}
                    onClick={() => onSelectRegionId(region.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectRegionId(region.id);
                      }
                    }}
                  >
                    {active && <circle r={28} className="map-node-pulse" filter="url(#pbz-glow)" />}
                    <circle r={active ? 16 : 12} className="map-node-ring" filter={active ? 'url(#pbz-glow)' : undefined} />
                    <text
                      textAnchor="middle"
                      dy="4"
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        fill: '#F3F4F6',
                        fontFamily: 'var(--font-mono)',
                        pointerEvents: 'none',
                      }}
                    >
                      {region.orderIndex === 0 ? 'P' : region.orderIndex}
                    </text>

                    <text
                      textAnchor="middle"
                      y={labelBelow ? 32 : -24}
                      className="map-node-label"
                    >
                      {region.name}
                    </text>
                    <text
                      textAnchor="middle"
                      y={labelBelow ? 46 : -38}
                      className="map-node-chapter"
                    >
                      {region.isPointOfNoReturn
                        ? '⚠ POINT OF NO RETURN'
                        : region.isOptionalBranch
                          ? 'OPTIONAL BRANCH'
                          : region.chapterLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="map-legend-bar">
            <div className="map-legend-items">
              <span>
                <span className="legend-dot" style={{ background: 'var(--gold)' }} />
                Main Story Order (P → 9)
              </span>
              <span>
                <span className="legend-dot" style={{ background: 'var(--azure)' }} />
                Optional True-Ending Branch
              </span>
              <span>
                <span className="legend-dot" style={{ background: 'var(--crimson)' }} />
                Point of No Return (Last Chance Bell)
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
              Click any node or loot chip for full details
            </span>
          </div>
        </div>

        {/* Region Inspector Sidebar */}
        <aside className="region-inspector" aria-label="Selected Region Guide">
          <div className="region-inspector-hero">
            <img
              src={assetUrl(selectedRegion.image)}
              alt={selectedRegion.name}
              loading="lazy"
              width={640}
              height={360}
            />
            <div className="region-inspector-title-overlay">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-crimson">{selectedRegion.chapterLabel}</span>
                <span className="badge badge-gold">{selectedRegion.levelBand}</span>
                <span className="badge badge-bone">
                  <Bell size={10} aria-hidden="true" /> {selectedRegion.bellsCount} Bells
                </span>
              </div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>
                {selectedRegion.name}{' '}
                <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 500 }}>
                  {selectedRegion.hanzi}
                </span>
              </h2>
            </div>
          </div>

          <div className="region-inspector-body">
            <div style={{ fontSize: '0.84rem', color: 'var(--gold)', fontWeight: 600 }}>
              {selectedRegion.subtitle}
            </div>

            <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db' }}>{selectedRegion.storySummary}</p>

            {selectedRegion.cutoffAlert && (
              <div className="cutoff-banner">
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                <span>
                  <strong>Before You Leave:</strong> {selectedRegion.cutoffAlert}
                </span>
              </div>
            )}

            <SpoilerVeil
              spoilerShield={spoilerShield}
              isSpoiler={true}
              label="Region Story Secret — Click to Reveal"
            >
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.28)',
                  fontSize: '0.83rem',
                }}
              >
                <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: 4 }}>
                  Hidden Wulin Truth:
                </strong>
                {selectedRegion.spoilerSecret}
              </div>
            </SpoilerVeil>

            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 6 }}>
                <MapPin size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                KEY LANDMARKS TO VISIT
              </div>
              <div className="chip-row">
                {selectedRegion.keyLandmarks.map((lm) => (
                  <span key={lm} className="badge badge-bone">
                    {lm}
                  </span>
                ))}
              </div>
            </div>

            {regionBosses.length > 0 && (
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--crimson-bright)', marginBottom: 6 }}>
                  <ShieldAlert size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                  MAJOR BOSSES ({regionBosses.length})
                </div>
                <div className="chip-row">
                  {regionBosses.map((boss) => (
                    <button
                      key={boss.id}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'boss', id: boss.id, label: boss.name })}
                    >
                      {boss.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {regionWeapons.length > 0 && (
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)', marginBottom: 6 }}>
                  <Swords size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                  WEAPONS TO COLLECT ({regionWeapons.length})
                </div>
                <div className="chip-row">
                  {regionWeapons.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'weapon', id: w.id, label: w.name })}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {regionEdges.length > 0 && (
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--azure)', marginBottom: 6 }}>
                  <Wrench size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                  PHANTOM EDGES ({regionEdges.length})
                </div>
                <div className="chip-row">
                  {regionEdges.map((edge) => (
                    <button
                      key={edge.id}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'edge', id: edge.id, label: edge.name })}
                    >
                      {edge.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {regionAccessories.length > 0 && (
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--jade)', marginBottom: 6 }}>
                  <Layers size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                  KEY ACCESSORIES ({regionAccessories.length})
                </div>
                <div className="chip-row">
                  {regionAccessories.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'accessory', id: acc.id, label: acc.name })}
                    >
                      {acc.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {regionQuests.length > 0 && (
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--violet)', marginBottom: 6 }}>
                  <Flame size={11} style={{ display: 'inline', marginRight: 5 }} aria-hidden="true" />
                  SIDE QUESTS IN THIS REGION ({regionQuests.length})
                </div>
                <div className="chip-row">
                  {regionQuests.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity({ kind: 'quest', id: q.id, label: q.title })}
                    >
                      {q.missable ? '⚠ ' : ''}
                      {q.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Next-Stop Progression */}
            <div
              style={{
                marginTop: '0.25rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap',
              }}
            >
              {prevRegion ? (
                <button
                  type="button"
                  className="btn-ghost-sm"
                  onClick={() => onSelectRegionId(prevRegion.id)}
                >
                  <ArrowLeft size={13} aria-hidden="true" />
                  <span>{prevRegion.name}</span>
                </button>
              ) : (
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Start of Game</span>
              )}
              {nextRegion ? (
                <button
                  type="button"
                  className="btn-gold-outline"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.74rem' }}
                  onClick={() => onSelectRegionId(nextRegion.id)}
                >
                  <span>Go Next: {nextRegion.name}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              ) : (
                <span className="badge badge-gold">Final Showdown Reached</span>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Linear Quick-Jump Region Strip */}
      <div className="region-strip" aria-label="All 10 Campaign Regions in Story Order">
        {WORLD_REGIONS.map((region) => {
          const active = region.id === selectedRegion.id;
          return (
            <button
              key={region.id}
              type="button"
              className={`region-mini-btn ${active ? 'is-active' : ''}`}
              onClick={() => onSelectRegionId(region.id)}
            >
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: region.isPointOfNoReturn ? 'var(--crimson-bright)' : 'var(--gold)' }}>
                {region.chapterLabel} · {region.levelBand}
              </span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{region.name}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                {region.bellsCount} Bells · {region.bossIds.length} Bosses · {region.questIds.length} Quests
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
