import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Layers, RotateCcw, Search, Sparkles, Swords, Zap } from 'lucide-react';
import type { AccessoryCategory, EntityRef, SavedBuildState } from '../../types/codex';
import { ACCESSORIES, META_BUILD_PRESETS } from '../../data/accessories';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { getAccessoryIconUrl } from '../../data/media';
import { analyzeLoadout } from '../../utils/loadoutSynergy';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface AccessoriesViewProps {
  spoilerShield: boolean;
  savedBuild: SavedBuildState;
  onUpdateBuild: (updater: (prev: SavedBuildState) => SavedBuildState) => void;
  onSelectEntity: (ref: EntityRef) => void;
}

function formatSignedPct(val: number): string {
  return val >= 0 ? `+${val}%` : `${val}%`;
}

export function AccessoriesView({
  spoilerShield,
  savedBuild,
  onUpdateBuild,
  onSelectEntity,
}: AccessoriesViewProps) {
  const [category, setCategory] = useState<'All' | AccessoryCategory | 'Missable'>('All');
  const [query, setQuery] = useState('');
  const [targetSlot, setTargetSlot] = useState<number>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACCESSORIES.filter((acc) => {
      if (category === 'Missable' && !acc.missable) return false;
      if (category !== 'All' && category !== 'Missable' && acc.category !== category) return false;
      if (q) {
        const hay = `${acc.name} ${acc.region} ${acc.unlockLocation} ${acc.baseEffect} ${acc.maxPolishedEffect}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, query]);

  const analysis = useMemo(
    () => analyzeLoadout(savedBuild, MAIN_WEAPONS, PHANTOM_EDGES, ACCESSORIES),
    [savedBuild]
  );

  const activePreset = useMemo(
    () =>
      META_BUILD_PRESETS.find(
        (p) =>
          p.weapon1 === analysis.weapon1.id &&
          p.weapon2 === analysis.weapon2.id &&
          p.edge1 === analysis.edge1.id &&
          p.edge2 === analysis.edge2.id &&
          p.accessories.slice(0, 4).every((id, idx) => analysis.slots[idx]?.accessory.id === id)
      ) ?? null,
    [analysis]
  );

  const applyPreset = (presetId: string) => {
    const preset = META_BUILD_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    onUpdateBuild((prev) => ({
      ...prev,
      weapon1: preset.weapon1,
      weapon2: preset.weapon2,
      edge1: preset.edge1,
      edge2: preset.edge2,
      accessories: preset.accessories.slice(0, 4),
    }));
  };

  const resetToDefault = () => {
    onUpdateBuild((prev) => ({
      ...prev,
      weapon1: 'sanguine',
      weapon2: 'white-serpent',
      edge1: 'dread-axe',
      edge2: 'chain-sickle',
      accessories: ['reflex-device', 'counterstrike-bracers', 'battle-wraps', 'lingran-pendant'],
    }));
  };

  const handleQuickEquip = (accessoryId: string) => {
    const existingIndex = analysis.slots.findIndex((sl) => sl.accessory.id === accessoryId);
    if (existingIndex !== -1) {
      setTargetSlot(existingIndex);
      return;
    }
    onUpdateBuild((prev) => {
      const normalized = [0, 1, 2, 3].map(
        (idx) => prev.accessories[idx] ?? analysis.slots[idx]?.accessory.id ?? ACCESSORIES[idx].id
      );
      normalized[targetSlot] = accessoryId;
      return { ...prev, accessories: normalized };
    });
    setTargetSlot((prev) => (prev + 1) % 4);
  };

  const { totals, weapon1Preview, weapon2Preview } = analysis;

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <Layers size={13} aria-hidden="true" />
            <span>CHARMS &amp; BUILD FORGE · ALL {ACCESSORIES.length} ACCESSORIES</span>
          </div>
          <h1 className="section-title">Accessories &amp; Interactive Build Forge</h1>
          <p className="section-desc">
            Every Offensive, Defensive, and Support charm in Wulin—compare Base stats against Jewel’s Max
            Polished upgrades (Village of Lu, Ch. 3) and test 4-slot build synergies below.
          </p>
        </div>
        <button
          type="button"
          className={`spoiler-pill ${savedBuild.polished ? 'is-safe' : 'is-exposed'}`}
          onClick={() => onUpdateBuild((prev) => ({ ...prev, polished: !prev.polished }))}
        >
          <Sparkles size={14} aria-hidden="true" />
          <span>{savedBuild.polished ? 'Viewing: Jewel Max Polished' : 'Viewing: Base Unpolished'}</span>
        </button>
      </div>

      {/* Live Build Forge Sandbox */}
      <div className="build-sandbox-panel">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <div>
            <div className="section-kicker" style={{ marginBottom: 4 }}>LOADOUT SYNERGY PLANNER</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
              Test Weapons, Phantom Edges &amp; 4 Accessory Slots
            </h2>
          </div>
          <div className="filter-pills">
            {META_BUILD_PRESETS.map((preset) => {
              const isSelected = activePreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`btn-ghost-sm ${isSelected ? 'is-active' : ''}`}
                  style={
                    isSelected
                      ? { borderColor: 'var(--gold)', color: 'var(--gold)', background: 'rgba(234, 179, 8, 0.14)' }
                      : undefined
                  }
                  onClick={() => applyPreset(preset.id)}
                  title={preset.synergySummary}
                >
                  Preset: {preset.name}
                </button>
              );
            })}
            <button
              type="button"
              className="btn-ghost-sm"
              onClick={resetToDefault}
              title="Reset Loadout to Default Starter Synergy"
            >
              <RotateCcw size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        {/* Weapons & Phantom Edges Selectors */}
        <div className="build-slots-grid">
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>MAIN WEAPON 1</span>
              <button
                type="button"
                className="entity-chip"
                style={{ padding: '0.08rem 0.4rem', fontSize: '0.66rem' }}
                onClick={() => onSelectEntity({ kind: 'weapon', id: analysis.weapon1.id, label: analysis.weapon1.name })}
              >
                Inspect
              </button>
            </span>
            <select
              className="build-slot-select"
              value={analysis.weapon1.id}
              onChange={(e) => onUpdateBuild((p) => ({ ...p, weapon1: e.target.value }))}
            >
              {MAIN_WEAPONS.map((w) => (
                <option key={w.id} value={w.id}>{w.name} ({w.weaponClass})</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>MAIN WEAPON 2</span>
              <button
                type="button"
                className="entity-chip"
                style={{ padding: '0.08rem 0.4rem', fontSize: '0.66rem' }}
                onClick={() => onSelectEntity({ kind: 'weapon', id: analysis.weapon2.id, label: analysis.weapon2.name })}
              >
                Inspect
              </button>
            </span>
            <select
              className="build-slot-select"
              value={analysis.weapon2.id}
              onChange={(e) => onUpdateBuild((p) => ({ ...p, weapon2: e.target.value }))}
            >
              {MAIN_WEAPONS.map((w) => (
                <option key={w.id} value={w.id}>{w.name} ({w.weaponClass})</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--azure)' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PHANTOM EDGE 1</span>
              <button
                type="button"
                className="entity-chip"
                style={{ padding: '0.08rem 0.4rem', fontSize: '0.66rem' }}
                onClick={() => onSelectEntity({ kind: 'edge', id: analysis.edge1.id, label: analysis.edge1.name })}
              >
                Inspect
              </button>
            </span>
            <select
              className="build-slot-select"
              value={analysis.edge1.id}
              onChange={(e) => onUpdateBuild((p) => ({ ...p, edge1: e.target.value }))}
            >
              {PHANTOM_EDGES.map((ed) => (
                <option key={ed.id} value={ed.id}>
                  {ed.name} ({ed.edgeClass} · {ed.sparkCost}★)
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--azure)' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PHANTOM EDGE 2</span>
              <button
                type="button"
                className="entity-chip"
                style={{ padding: '0.08rem 0.4rem', fontSize: '0.66rem' }}
                onClick={() => onSelectEntity({ kind: 'edge', id: analysis.edge2.id, label: analysis.edge2.name })}
              >
                Inspect
              </button>
            </span>
            <select
              className="build-slot-select"
              value={analysis.edge2.id}
              onChange={(e) => onUpdateBuild((p) => ({ ...p, edge2: e.target.value }))}
            >
              {PHANTOM_EDGES.map((ed) => (
                <option key={ed.id} value={ed.id}>
                  {ed.name} ({ed.edgeClass} · {ed.sparkCost}★)
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* 4 Accessory Slots with Live Condition Feedback */}
        <div className="build-slots-grid">
          {analysis.slots.map((slot) => (
            <div key={slot.slotIndex} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
              >
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>ACCESSORY SLOT {slot.slotIndex + 1}</span>
                  <button
                    type="button"
                    className="entity-chip"
                    style={{ padding: '0.08rem 0.4rem', fontSize: '0.66rem' }}
                    onClick={() =>
                      onSelectEntity({ kind: 'accessory', id: slot.accessory.id, label: slot.accessory.name })
                    }
                  >
                    Inspect
                  </button>
                </span>
                <select
                  className="build-slot-select"
                  value={slot.accessory.id}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateBuild((prev) => {
                      const next = [0, 1, 2, 3].map(
                        (idx) => prev.accessories[idx] ?? analysis.slots[idx]?.accessory.id ?? ACCESSORIES[idx].id
                      );
                      next[slot.slotIndex] = val;
                      return { ...prev, accessories: next };
                    });
                  }}
                >
                  {ACCESSORIES.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.category})
                    </option>
                  ))}
                </select>
              </label>
              <span
                style={{
                  fontSize: '0.71rem',
                  lineHeight: 1.35,
                  color: slot.isDuplicate || !slot.isConditionalMatch ? '#fbbf24' : 'var(--jade)',
                }}
              >
                {slot.reason}
              </span>
            </div>
          ))}
        </div>

        {/* Stat Totals Grid (All 7 Accessory Stats + Loadout Combat Output) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(132px, 1fr))', gap: '0.6rem' }}>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: 'var(--crimson-bright)' }}>
              {formatSignedPct(totals.damagePct)}
            </span>
            <span className="stat-mini-label">
              Bonus Damage
              {totals.effectiveDamagePct !== totals.damagePct ? ` (${totals.effectiveDamagePct}% active)` : ''}
            </span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: 'var(--gold)' }}>
              {formatSignedPct(totals.guardBreakPct)}
            </span>
            <span className="stat-mini-label">Guard Break</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: 'var(--azure)' }}>
              {formatSignedPct(totals.damageReductionPct)}
            </span>
            <span className="stat-mini-label">Dmg Reduction</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: 'var(--jade)' }}>
              {formatSignedPct(totals.parryWindowPct)}
            </span>
            <span className="stat-mini-label">Parry Window</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: '#6ee7b7' }}>
              {formatSignedPct(totals.healingPct)}
            </span>
            <span className="stat-mini-label">Healing Power</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: '#d8b4fe' }}>
              {formatSignedPct(totals.shaChiPct)}
            </span>
            <span className="stat-mini-label">Sha-Chi Efficiency</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-val" style={{ color: '#facc15' }}>
              {formatSignedPct(totals.sparkEfficiencyPct)}
            </span>
            <span className="stat-mini-label">Spark Efficiency</span>
          </div>
        </div>

        {/* Live Weapon & Phantom Edge Scaling + Synergy Report (Updates for ALL Combinations) */}
        <div
          style={{
            marginTop: '0.9rem',
            paddingTop: '0.9rem',
            borderTop: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.85rem',
          }}
        >
          {/* Equipped Weapons & Edges Breakdown */}
          <div
            style={{
              background: 'rgba(11, 13, 16, 0.72)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--gold)' }}>
                <Swords size={13} aria-hidden="true" />
                WEAPONS &amp; EDGES OUTPUT (LV.25)
              </span>
              <span className="badge badge-azure" style={{ fontSize: '0.68rem' }}>
                <Zap size={10} aria-hidden="true" />
                {analysis.totalSparkCost} Sparks Combined
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--bone)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>
                <strong>{weapon1Preview.weapon.name}</strong>{' '}
                <span style={{ color: 'var(--muted)' }}>({weapon1Preview.weapon.weaponClass})</span>:{' '}
                <span style={{ color: 'var(--crimson-bright)', fontFamily: 'var(--font-mono)' }}>
                  {weapon1Preview.effectiveAttackLv25} ATK
                </span>
                {weapon1Preview.effectiveAttackLv25 !== weapon1Preview.baseAttackLv25 && (
                  <span style={{ color: 'var(--muted)', fontSize: '0.73rem' }}> (base {weapon1Preview.baseAttackLv25})</span>
                )}{' '}
                ·{' '}
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {weapon1Preview.effectiveGuardBreakLv25} GB
                </span>
              </div>
              <div>
                <strong>{weapon2Preview.weapon.name}</strong>{' '}
                <span style={{ color: 'var(--muted)' }}>({weapon2Preview.weapon.weaponClass})</span>:{' '}
                <span style={{ color: 'var(--crimson-bright)', fontFamily: 'var(--font-mono)' }}>
                  {weapon2Preview.effectiveAttackLv25} ATK
                </span>
                {weapon2Preview.effectiveAttackLv25 !== weapon2Preview.baseAttackLv25 && (
                  <span style={{ color: 'var(--muted)', fontSize: '0.73rem' }}> (base {weapon2Preview.baseAttackLv25})</span>
                )}{' '}
                ·{' '}
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {weapon2Preview.effectiveGuardBreakLv25} GB
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 2 }}>
                <strong>Edges:</strong> {analysis.edge1.name} ({analysis.edge1.edgeClass}, {analysis.edge1.sparkCost}★) +{' '}
                {analysis.edge2.name} ({analysis.edge2.edgeClass}, {analysis.edge2.sparkCost}★)
                {analysis.obstaclesCovered.length > 0 && (
                  <span> · Opens: {analysis.obstaclesCovered.join(', ')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Synergy Verdict */}
          <div
            style={{
              background: 'rgba(11, 13, 16, 0.72)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--gold)' }}>
                {activePreset ? `PRESET: ${activePreset.name.toUpperCase()}` : `CUSTOM BUILD · ${analysis.archetype.toUpperCase()}`}
              </span>
              <span
                className={`badge ${
                  analysis.synergyRank === 'S'
                    ? 'badge-gold'
                    : analysis.synergyRank === 'A'
                      ? 'badge-jade'
                      : 'badge-crimson'
                }`}
              >
                Synergy Rank {analysis.synergyRank} ({analysis.synergyScore}/100)
              </span>
            </div>

            {activePreset && (
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#fde68a' }}>
                {activePreset.synergySummary}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
              {analysis.synergies.length === 0 ? (
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                  Balanced general-purpose loadout. Pair matching elemental/status Weapons, Phantom Edges, and Charms to unlock combo multipliers.
                </span>
              ) : (
                analysis.synergies.map((syn) => (
                  <div
                    key={syn.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 6,
                      fontSize: '0.77rem',
                      color:
                        syn.tier === 'warning'
                          ? '#fcd34d'
                          : syn.tier === 'combo'
                            ? '#86efac'
                            : '#d1d5db',
                    }}
                  >
                    {syn.tier === 'warning' ? (
                      <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    ) : (
                      <CheckCircle2 size={13} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    )}
                    <span>
                      <strong>{syn.title}:</strong> {syn.detail}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-pills">
          {(['All', 'Offensive', 'Defensive', 'Support', 'Missable'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${category === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            Quick-Equip Target: Slot {targetSlot + 1}
          </span>
          <div className="search-input-wrap">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              placeholder={`Search all ${ACCESSORIES.length} accessories...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter accessories"
            />
          </div>
        </div>
      </div>

      <div className="item-grid">
        {filtered.map((acc) => {
          const equippedSlotIdx = analysis.slots.findIndex((sl) => sl.accessory.id === acc.id);
          const equipped = equippedSlotIdx !== -1;
          return (
            <article key={acc.id} className="gear-card">
              <div className="gear-card-top">
                <div className="gear-art-box" style={{ width: 64, height: 64 }}>
                  <img
                    src={getAccessoryIconUrl(acc.id)}
                    alt={acc.name}
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: 4 }}>
                    <span
                      className={`badge ${
                        acc.category === 'Offensive'
                          ? 'badge-crimson'
                          : acc.category === 'Defensive'
                            ? 'badge-azure'
                            : 'badge-jade'
                      }`}
                    >
                      {acc.category}
                    </span>
                    {acc.missable && <span className="badge badge-gold">Missable</span>}
                    {equipped && <span className="badge badge-jade">In Slot {equippedSlotIdx + 1}</span>}
                  </div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.02rem' }}>
                    {acc.name}
                  </h2>
                  <div style={{ fontSize: '0.73rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {acc.region}
                  </div>
                </div>
              </div>

              <SpoilerVeil
                spoilerShield={spoilerShield}
                isSpoiler={Boolean(acc.spoiler)}
                label={`Late-Game Charm (${acc.name}) — Reveal Effect`}
              >
                <div style={{ fontSize: '0.84rem', color: savedBuild.polished ? '#fde68a' : '#d1d5db' }}>
                  <strong style={{ color: savedBuild.polished ? 'var(--gold)' : 'var(--bone)' }}>
                    {savedBuild.polished ? 'Max Polished:' : 'Base Effect:'}
                  </strong>{' '}
                  {savedBuild.polished ? acc.maxPolishedEffect : acc.baseEffect}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 4 }}>
                  <strong>Where to Find:</strong> {acc.unlockLocation}
                </div>
              </SpoilerVeil>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.4rem', borderTop: '1px solid var(--border)', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-ghost-sm"
                  style={{ fontSize: '0.74rem', padding: '0.26rem 0.58rem' }}
                  onClick={() => handleQuickEquip(acc.id)}
                >
                  {equipped ? `Slot ${equippedSlotIdx + 1} Equipped` : `Equip → Slot ${targetSlot + 1}`}
                </button>
                <button
                  type="button"
                  className="entity-chip"
                  onClick={() => onSelectEntity({ kind: 'accessory', id: acc.id, label: acc.name })}
                >
                  Inspect →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
