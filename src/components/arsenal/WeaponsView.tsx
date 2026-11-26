import { useMemo, useState } from 'react';
import { Flame, Search, Sparkles, Swords } from 'lucide-react';
import type { EntityRef, WeaponClass } from '../../types/codex';
import { MAIN_WEAPONS, REFORGE_RULES } from '../../data/arsenal';
import { getWeaponImage } from '../../data/itemImages';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface WeaponsViewProps {
  spoilerShield: boolean;
  onSelectEntity: (ref: EntityRef) => void;
}

function interpolateStat(lv1: number, lv25: number, level: number): number {
  const ratio = (level - 1) / 24;
  return Math.round(lv1 + (lv25 - lv1) * ratio);
}

export function WeaponsView({ spoilerShield, onSelectEntity }: WeaponsViewProps) {
  const [weaponClass, setWeaponClass] = useState<'All' | WeaponClass>('All');
  const [onlyTempered, setOnlyTempered] = useState(false);
  const [query, setQuery] = useState('');
  const [upgradeLevel, setUpgradeLevel] = useState(25);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MAIN_WEAPONS.filter((w) => {
      if (weaponClass !== 'All' && w.weaponClass !== weaponClass) return false;
      if (onlyTempered && !w.soulTempered) return false;
      if (q) {
        const hay = `${w.name} ${w.region} ${w.unlockSource} ${w.passiveTrait} ${w.soulTempered?.name ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [weaponClass, onlyTempered, query]);

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <Swords size={13} aria-hidden="true" />
            <span>PRIMARY ARMORY · ALL {MAIN_WEAPONS.length} MAIN WEAPONS &amp; SOUL TEMPERING</span>
          </div>
          <h1 className="section-title">Primary Weapons Encyclopedia</h1>
          <p className="section-desc">
            {REFORGE_RULES.summary} Slide the forge level below to compare Lv.1–Lv.25 Damage and
            Guard-Break scaling, and see exactly where to unlock every weapon.
          </p>
        </div>
        <div className="panel-card" style={{ padding: '0.8rem 1rem', minWidth: 250 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
            <span style={{ color: 'var(--gold)' }}>FORGE LEVEL PREVIEW</span>
            <span>Lv. {upgradeLevel} / 25</span>
          </div>
          <input
            type="range"
            min={1}
            max={25}
            value={upgradeLevel}
            onChange={(e) => setUpgradeLevel(Number(e.target.value))}
            aria-label="Preview weapon stats at upgrade level"
            style={{ width: '100%', accentColor: 'var(--crimson)', marginTop: '0.45rem' }}
          />
          <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
            Showing {filtered.length} of {MAIN_WEAPONS.length} weapons
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-pills">
          {(['All', 'One-Handed', 'Two-Handed', 'Dual-Wield'] as const).map((cls) => (
            <button
              key={cls}
              type="button"
              className={`filter-pill ${weaponClass === cls ? 'is-active' : ''}`}
              onClick={() => setWeaponClass(cls)}
            >
              {cls}
            </button>
          ))}
          <button
            type="button"
            className={`filter-pill ${onlyTempered ? 'is-active' : ''}`}
            onClick={() => setOnlyTempered((p) => !p)}
          >
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
            Soul-Temperable Only
          </button>
        </div>

        <div className="search-input-wrap">
          <Search size={15} aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Search weapon, region, or catalyst..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter weapons"
          />
        </div>
      </div>

      <div className="item-grid">
        {filtered.map((weapon) => {
          const dmg = interpolateStat(weapon.damageLv1, weapon.damageLv25, upgradeLevel);
          const gb = interpolateStat(weapon.guardBreakLv1, weapon.guardBreakLv25, upgradeLevel);
          return (
            <article key={weapon.id} className="gear-card">
              <div className="gear-card-top">
                <div className="gear-art-box">
                  <img
                    src={getWeaponImage(weapon.id)}
                    alt={weapon.name}
                    loading="lazy"
                    width={72}
                    height={72}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: 4 }}>
                    <span className={`badge ${weapon.tier === 'S-Tier' ? 'badge-gold' : 'badge-crimson'}`}>
                      {weapon.tier}
                    </span>
                    <span className="badge badge-bone">{weapon.weaponClass}</span>
                    {weapon.missable && <span className="badge badge-crimson">Missable</span>}
                  </div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.08rem' }}>
                    {weapon.name}
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {weapon.region}
                  </div>
                </div>
              </div>

              <div className="stat-bars">
                <div className="stat-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--muted)' }}>ATK (Lv.{upgradeLevel})</span>
                    <strong style={{ color: 'var(--bone)' }}>{dmg}</strong>
                  </div>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill" style={{ width: `${Math.min(100, (dmg / 460) * 100)}%` }} />
                  </div>
                </div>
                <div className="stat-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--muted)' }}>GUARD BREAK</span>
                    <strong style={{ color: 'var(--gold)' }}>{gb}</strong>
                  </div>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill" style={{ width: `${Math.min(100, (gb / 320) * 100)}%` }} />
                  </div>
                </div>
              </div>

              <SpoilerVeil
                spoilerShield={spoilerShield}
                isSpoiler={Boolean(weapon.spoiler)}
                label={`Spoiler Blade (${weapon.name}) — Reveal Unlock & Trait`}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: 'var(--gold)' }}>Trait:</strong>{' '}
                    <span style={{ color: '#d1d5db' }}>{weapon.passiveTrait}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--crimson-bright)' }}>
                      <Flame size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                      Power Surge:
                    </strong>{' '}
                    <span style={{ color: '#d1d5db' }}>{weapon.powerSurge}</span>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                    <strong>Where to Find:</strong> {weapon.unlockSource}
                  </div>
                </div>
              </SpoilerVeil>

              {weapon.soulTempered && (
                <div className="temper-callout">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', marginBottom: 3 }}>
                    ✦ SOUL-TEMPER EVOLUTION (MYST IN PANGZHEN)
                  </div>
                  <strong>{weapon.soulTempered.name}</strong> — Catalyst: {weapon.soulTempered.catalyst} (Lv.25 ATK:{' '}
                  {weapon.soulTempered.damageLv25})
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
                <button
                  type="button"
                  className="entity-chip"
                  onClick={() => onSelectEntity({ kind: 'weapon', id: weapon.id, label: weapon.name })}
                >
                  Perks &amp; Full Dossier →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
