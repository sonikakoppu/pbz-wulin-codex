import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { EntityRef, NavSectionId } from '../../types/codex';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { ACCESSORIES } from '../../data/accessories';
import { QUEST_TALES } from '../../data/quests';
import { CHARACTER_DOSSIERS } from '../../data/story';
import { ARSENAL_ITEMS, BOSSES } from '../../data/codex';
import { WORLD_REGIONS } from '../../data/worldMap';
import { getEdgeImage, getWeaponImage } from '../../data/itemImages';
import { getAccessoryIconUrl, getBossImage } from '../../data/media';
import { SpoilerVeil } from './SpoilerVeil';

interface EntityDrawerProps {
  entity: EntityRef | null;
  spoilerShield: boolean;
  onClose: () => void;
  onSelectEntity: (ref: EntityRef) => void;
  onJumpToSection: (section: NavSectionId) => void;
  onOpenRegion?: (regionId: string) => void;
}

export function EntityDrawer({
  entity,
  spoilerShield,
  onClose,
  onSelectEntity,
  onJumpToSection,
  onOpenRegion,
}: EntityDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (entity) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [entity]);

  // Safari fallback for closedby="any" using pointer position check
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const outside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    let pressedOutside = false;
    const onDown = (e: PointerEvent) => {
      pressedOutside = outside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (pressedOutside && outside(e)) {
        dialog.close();
      }
    };

    dialog.addEventListener('pointerdown', onDown);
    dialog.addEventListener('pointerup', onUp);
    return () => {
      dialog.removeEventListener('pointerdown', onDown);
      dialog.removeEventListener('pointerup', onUp);
    };
  }, []);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.returnValue = '';
    }
    onClose();
  };

  const renderContent = () => {
    if (!entity) return null;

    if (entity.kind === 'weapon') {
      const w = MAIN_WEAPONS.find((item) => item.id === entity.id || item.soulTempered?.id === entity.id);
      if (!w) return <p>Weapon entry not found.</p>;
      return (
        <>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="gear-art-box">
              <img src={getWeaponImage(w.id)} alt={w.name} width={72} height={72} />
            </div>
            <div>
              <div className="chip-row" style={{ marginBottom: 6 }}>
                <span className="badge badge-gold">{w.tier}</span>
                <span className="badge badge-crimson">{w.weaponClass}</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                Region: {w.region}
              </div>
            </div>
          </div>

          <div className="stat-bars">
            <div className="stat-bar-row">
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>ATTACK</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                Lv.1: {w.damageLv1} → Lv.25: {w.damageLv25}
              </div>
            </div>
            <div className="stat-bar-row">
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>GUARD BREAK</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)' }}>
                Lv.1: {w.guardBreakLv1} → Lv.25: {w.guardBreakLv25}
              </div>
            </div>
          </div>

          <SpoilerVeil spoilerShield={spoilerShield} isSpoiler={Boolean(w.spoiler)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <div><strong style={{ color: 'var(--gold)' }}>Unlock Source:</strong> {w.unlockSource}</div>
              <div><strong style={{ color: 'var(--bone)' }}>Passive Trait:</strong> {w.passiveTrait}</div>
              <div><strong style={{ color: 'var(--crimson-bright)' }}>Power Surge:</strong> {w.powerSurge}</div>
              <div className="panel-card" style={{ padding: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)', marginBottom: 6 }}>
                  MILESTONE PERKS
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.83rem', color: '#d1d5db' }}>
                  <li><strong>Lv.5:</strong> {w.perks.lv5}</li>
                  <li><strong>Lv.10:</strong> {w.perks.lv10}</li>
                  <li><strong>Lv.15:</strong> {w.perks.lv15}</li>
                  <li><strong>Lv.25:</strong> {w.perks.lv25}</li>
                </ul>
              </div>
            </div>
          </SpoilerVeil>

          {w.soulTempered && (
            <div className="temper-callout">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', marginBottom: 4 }}>
                SOUL-TEMPERED FORM: {w.soulTempered.name}
              </div>
              <p style={{ margin: '0 0 6px' }}><strong>Catalyst:</strong> {w.soulTempered.catalystLocation}</p>
              <p style={{ margin: '0 0 6px' }}><strong>Trait:</strong> {w.soulTempered.passiveTrait}</p>
              <p style={{ margin: 0 }}><strong>Power Surge:</strong> {w.soulTempered.powerSurge}</p>
            </div>
          )}

          <button
            type="button"
            className="btn-gold-outline"
            onClick={() => {
              handleClose();
              onJumpToSection('weapons');
            }}
          >
            <span>Open Full Weapons Armory</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </>
      );
    }

    if (entity.kind === 'edge') {
      const e = PHANTOM_EDGES.find((item) => item.id === entity.id || item.evolution?.id === entity.id);
      if (!e) return <p>Phantom Edge entry not found.</p>;
      return (
        <>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="gear-art-box">
              <img src={getEdgeImage(e.id)} alt={e.name} width={72} height={72} />
            </div>
            <div>
              <div className="chip-row" style={{ marginBottom: 6 }}>
                <span className="badge badge-crimson">{e.tier}</span>
                <span className="badge badge-azure">{e.edgeClass}</span>
                <span className="badge badge-gold">{e.sparkCost} Sparks</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                Region: {e.region}
              </div>
            </div>
          </div>

          <SpoilerVeil spoilerShield={spoilerShield} isSpoiler={Boolean(e.spoiler)}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{e.combatRole}</p>
            <div style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.6rem' }}>
              <strong style={{ color: 'var(--bone)' }}>Unlock Source:</strong> {e.unlockSource}
            </div>
          </SpoilerVeil>

          {e.evolution && (
            <div className="temper-callout">
              <strong style={{ color: 'var(--gold)' }}>Evolution: {e.evolution.name}</strong>
              <p style={{ margin: '4px 0 0' }}>Catalyst: {e.evolution.catalyst} — {e.evolution.evolvedBonus}</p>
            </div>
          )}

          <button
            type="button"
            className="btn-gold-outline"
            onClick={() => {
              handleClose();
              onJumpToSection('edges');
            }}
          >
            <span>Open All Phantom Edges</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </>
      );
    }

    if (entity.kind === 'accessory') {
      const a = ACCESSORIES.find((item) => item.id === entity.id);
      if (!a) return <p>Accessory entry not found.</p>;
      return (
        <>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="gear-art-box">
              <img src={getAccessoryIconUrl(a.id)} alt={a.name} width={64} height={64} />
            </div>
            <div>
              <div className="chip-row" style={{ marginBottom: 6 }}>
                <span className="badge badge-gold">{a.category}</span>
                {a.missable && <span className="badge badge-crimson">Missable</span>}
              </div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                {a.region}
              </div>
            </div>
          </div>

          <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
            <div><strong>Base Effect:</strong> {a.baseEffect}</div>
            <div style={{ color: 'var(--gold)' }}><strong>Jewel Max Polished:</strong> {a.maxPolishedEffect}</div>
            <div style={{ color: 'var(--muted)' }}><strong>Location:</strong> {a.unlockLocation}</div>
          </div>

          <button
            type="button"
            className="btn-gold-outline"
            onClick={() => {
              handleClose();
              onJumpToSection('accessories');
            }}
          >
            <span>Equip in Accessories Build Forge</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </>
      );
    }

    if (entity.kind === 'boss') {
      const b = BOSSES.find((item) => item.id === entity.id);
      if (!b) return <p>Boss dossier not found.</p>;
      return (
        <>
          <div className="boss-portrait-wrap" style={{ borderRadius: 6 }}>
            <img src={getBossImage(b.id)} alt={b.name} width={520} height={320} />
          </div>
          <div className="chip-row">
            <span className="badge badge-crimson">{b.region}</span>
            <span className="badge badge-gold">{b.difficulty}</span>
          </div>
          <SpoilerVeil spoilerShield={spoilerShield} isSpoiler={Boolean(b.spoiler)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <div><strong style={{ color: 'var(--jade)' }}>Weakness:</strong> {b.weakness}</div>
              <div><strong style={{ color: 'var(--gold)' }}>Rewards:</strong> {b.rewards}</div>
              <div className="chip-row">
                {b.telegraphs.map((t) => (
                  <span key={t} className="badge badge-violet">{t}</span>
                ))}
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#d1d5db' }}>
                {b.tactics.map((tip) => (
                  <li key={tip} style={{ marginBottom: 4 }}>{tip}</li>
                ))}
              </ul>
            </div>
          </SpoilerVeil>
        </>
      );
    }

    if (entity.kind === 'character') {
      const c = CHARACTER_DOSSIERS.find((item) => item.id === entity.id);
      if (!c) return <p>Character dossier not found.</p>;
      return (
        <>
          <div className="chip-row">
            <span className="badge badge-gold">{c.factionLabel}</span>
            <span className="badge badge-crimson">{c.status}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 600 }}>{c.epithet}</div>
          <p style={{ margin: 0, fontSize: '0.88rem' }}>{c.publicRole}</p>
          <SpoilerVeil spoilerShield={spoilerShield} isSpoiler={c.spoilerBio} label="Reveal Bloodline & True Motives">
            <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.86rem' }}>
              <div><strong style={{ color: 'var(--gold)' }}>Bloodline:</strong> {c.bloodline}</div>
              <div><strong style={{ color: 'var(--crimson-bright)' }}>True Motives:</strong> {c.trueMotives}</div>
            </div>
          </SpoilerVeil>
          {(c.linkedGear.length > 0 || c.linkedBosses.length > 0) && (
            <div className="chip-row">
              {[...c.linkedGear, ...c.linkedBosses].map((ref) => (
                <button key={`${ref.kind}-${ref.id}`} type="button" className="entity-chip" onClick={() => onSelectEntity(ref)}>
                  {ref.label} →
                </button>
              ))}
            </div>
          )}
        </>
      );
    }

    if (entity.kind === 'quest') {
      const q = QUEST_TALES.find((item) => item.id === entity.id);
      if (!q) return <p>Quest entry not found.</p>;
      return (
        <>
          <div className="chip-row">
            <span className={`badge ${q.missable ? 'badge-crimson' : 'badge-gold'}`}>{q.type}</span>
            <span className="badge badge-bone">{q.region}</span>
          </div>
          {q.cutoffWarning && <div className="cutoff-banner">{q.cutoffWarning}</div>}
          <p style={{ margin: 0, fontSize: '0.88rem' }}>{q.summary}</p>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#d1d5db' }}>
            {q.steps.map((s) => (
              <li key={s.id} style={{ marginBottom: 4 }}>{s.text}</li>
            ))}
          </ol>
          <div style={{ fontSize: '0.84rem', color: 'var(--gold)' }}>
            <strong>Rewards:</strong> {q.rewards}
          </div>
          {q.rewardEntities.length > 0 && (
            <div className="chip-row">
              {q.rewardEntities.map((ref) => (
                <button key={ref.id} type="button" className="entity-chip" onClick={() => onSelectEntity(ref)}>
                  {ref.label} →
                </button>
              ))}
            </div>
          )}
        </>
      );
    }

    if (entity.kind === 'region') {
      const reg = WORLD_REGIONS.find((r) => r.id === entity.id);
      if (!reg) return <p>Region entry not found.</p>;
      return (
        <>
          <div className="boss-portrait-wrap" style={{ borderRadius: 6 }}>
            <img src={reg.image} alt={reg.name} width={520} height={300} />
          </div>
          <div className="chip-row">
            <span className="badge badge-crimson">{reg.chapterLabel}</span>
            <span className="badge badge-gold">{reg.levelBand}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem' }}>{reg.storySummary}</p>
          <button
            type="button"
            className="btn-crimson"
            onClick={() => {
              handleClose();
              if (onOpenRegion) {
                onOpenRegion(reg.id);
              } else {
                onJumpToSection('story-map');
              }
            }}
          >
            <span>Jump to {reg.name} on Story Map</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </>
      );
    }

    // Medicine fallback from ARSENAL_ITEMS
    const med = ARSENAL_ITEMS.find((item) => item.id === entity.id);
    if (med) {
      return (
        <>
          <div className="chip-row">
            <span className="badge badge-jade">{med.subType}</span>
            <span className="badge badge-gold">{med.tier}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>{med.summary}</p>
          <div style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>
            <strong>Location:</strong> {med.location}
          </div>
        </>
      );
    }

    return <p>Details available inside the main codex section.</p>;
  };

  return (
    <dialog
      ref={dialogRef}
      className="entity-drawer-dialog"
      aria-labelledby="entity-drawer-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      onClose={handleClose}
    >
      <div className="dialog-head">
        <div>
          <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)', textTransform: 'uppercase' }}>
            {entity?.kind ?? 'CODEX'} DOSSIER
          </div>
          <h1 id="entity-drawer-title">{entity?.label ?? 'Dossier'}</h1>
        </div>
        <button
          type="button"
          className="dialog-close-btn"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close dossier drawer"
          autoFocus
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="dialog-body">{renderContent()}</div>
    </dialog>
  );
}
