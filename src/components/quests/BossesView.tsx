import { ShieldAlert } from 'lucide-react';
import type { EntityRef } from '../../types/codex';
import { BOSSES } from '../../data/codex';
import { getBossImage } from '../../data/media';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { ACCESSORIES } from '../../data/accessories';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface BossesViewProps {
  spoilerShield: boolean;
  onSelectEntity: (ref: EntityRef) => void;
}

function resolveRewardEntity(id: string): EntityRef | null {
  const w = MAIN_WEAPONS.find((item) => item.id === id);
  if (w) return { kind: 'weapon', id: w.id, label: w.name };
  const e = PHANTOM_EDGES.find((item) => item.id === id);
  if (e) return { kind: 'edge', id: e.id, label: e.name };
  const a = ACCESSORIES.find((item) => item.id === id);
  if (a) return { kind: 'accessory', id: a.id, label: a.name };
  return null;
}

export function BossesView({ spoilerShield, onSelectEntity }: BossesViewProps) {
  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <ShieldAlert size={13} aria-hidden="true" />
            <span>WULIN EXECUTIONERS · {BOSSES.length} MAJOR BOSS DOSSIERS</span>
          </div>
          <h1 className="section-title">Boss Tactics &amp; Telegraph Dossiers</h1>
          <p className="section-desc">
            Study every major boss’s Blue/Red/Black-Flash telegraphs, counter-weapons, secret phase triggers,
            and guaranteed loot drops across all 10 regions.
          </p>
        </div>
        <div className="badge badge-crimson" style={{ padding: '0.55rem 0.9rem', fontSize: '0.78rem' }}>
          {BOSSES.length} Major Campaign Bosses
        </div>
      </div>

      <div className="item-grid">
        {BOSSES.map((boss) => {
          const rewardRefs = (boss.rewardEntityIds ?? [])
            .map(resolveRewardEntity)
            .filter((r): r is EntityRef => Boolean(r));

          return (
            <article key={boss.id} className="boss-card">
              <div className="boss-portrait-wrap">
                <img
                  src={getBossImage(boss.id)}
                  alt={boss.name}
                  loading="lazy"
                  width={640}
                  height={400}
                />
              </div>

              <div className="boss-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-crimson">{boss.region}</span>
                  <span className="badge badge-gold">{boss.difficulty}</span>
                </div>

                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.14rem' }}>{boss.name}</h2>

                <SpoilerVeil
                  spoilerShield={spoilerShield}
                  isSpoiler={Boolean(boss.spoiler)}
                  label={`Late-Game Boss Tactics (${boss.name}) — Reveal`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem' }}>
                    <div>
                      <strong style={{ color: 'var(--jade)' }}>Weakness:</strong>{' '}
                      <span style={{ color: '#d1d5db' }}>{boss.weakness}</span>
                    </div>
                    <div className="chip-row">
                      {boss.telegraphs.map((t) => (
                        <span key={t} className="badge badge-violet">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {boss.tactics.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>
                      <strong>Drops:</strong> <span style={{ color: '#d1d5db' }}>{boss.rewards}</span>
                    </div>
                  </div>
                </SpoilerVeil>

                {rewardRefs.length > 0 && (
                  <div className="chip-row">
                    {rewardRefs.map((ref) => (
                      <button
                        key={`${boss.id}-${ref.id}`}
                        type="button"
                        className="entity-chip"
                        onClick={() => onSelectEntity(ref)}
                      >
                        Loot: {ref.label} →
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                  <button
                    type="button"
                    className="entity-chip"
                    onClick={() => onSelectEntity({ kind: 'boss', id: boss.id, label: boss.name })}
                  >
                    Full Dossier →
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
