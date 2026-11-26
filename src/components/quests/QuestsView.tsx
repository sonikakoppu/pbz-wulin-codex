import { useMemo, useState } from 'react';
import { AlertTriangle, Flame, Search, Trees } from 'lucide-react';
import type { EntityRef, QuestType } from '../../types/codex';
import { BANYAN_LOCATIONS, QUEST_REGIONS, QUEST_TALES } from '../../data/quests';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface QuestsViewProps {
  spoilerShield: boolean;
  onSelectEntity: (ref: EntityRef) => void;
}

export function QuestsView({ spoilerShield, onSelectEntity }: QuestsViewProps) {
  const [region, setRegion] = useState<string>('All Regions');
  const [questType, setQuestType] = useState<'all' | QuestType>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QUEST_TALES.filter((quest) => {
      if (region !== 'All Regions' && quest.region !== region) return false;
      if (questType !== 'all' && quest.type !== questType) return false;
      if (q) {
        const hay = `${quest.title} ${quest.region} ${quest.summary} ${quest.rewards}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [region, questType, query]);

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <Flame size={13} aria-hidden="true" />
            <span>SIDE QUESTS, PURPLE TALES &amp; CUTOFF ALERTS · {QUEST_TALES.length} QUESTS</span>
          </div>
          <h1 className="section-title">Side Quests &amp; Zero-Missables Guide</h1>
          <p className="section-desc">
            Every missable quest, Purple-Icon mystery tale, and collectible chain in exact step-by-step
            detail. Check the crimson cutoff banners before fighting regional bosses so you never miss anything.
          </p>
        </div>
        <div className="badge badge-gold" style={{ padding: '0.55rem 0.9rem', fontSize: '0.78rem' }}>
          Showing {filtered.length} / {QUEST_TALES.length} Quests
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-pills">
          {(['all', 'missable', 'side', 'collectible'] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-pill ${questType === t ? 'is-active' : ''}`}
              onClick={() => setQuestType(t)}
            >
              {t === 'all' ? `All (${QUEST_TALES.length})` : t.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
          <select
            className="build-slot-select"
            style={{ width: 'auto' }}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            aria-label="Filter side quests by region"
          >
            {QUEST_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <div className="search-input-wrap">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              placeholder="Search quest or reward..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter quests"
            />
          </div>
        </div>
      </div>

      <div className="bloodline-grid">
        {filtered.map((quest) => (
          <article
            key={quest.id}
            className="panel-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className={`badge ${quest.missable ? 'badge-crimson' : quest.type === 'collectible' ? 'badge-violet' : 'badge-gold'}`}>
                  {quest.missable ? 'MISSABLE' : quest.type}
                </span>
                <span className="badge badge-bone">{quest.region}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--gold)' }}>
                {quest.steps.length} steps
              </span>
            </div>

            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.14rem' }}>{quest.title}</h2>

            {quest.cutoffWarning && (
              <div className="cutoff-banner">
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                <span>{quest.cutoffWarning}</span>
              </div>
            )}

            <SpoilerVeil
              spoilerShield={spoilerShield}
              isSpoiler={Boolean(quest.spoiler)}
              label={`Spoiler Quest (${quest.title}) — Click to Reveal Steps`}
            >
              <p style={{ margin: '0 0 0.65rem', fontSize: '0.86rem', color: '#d1d5db' }}>{quest.summary}</p>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.84rem',
                  color: '#e5e7eb',
                }}
              >
                {quest.steps.map((step) => (
                  <li key={step.id}>{step.text}</li>
                ))}
              </ol>
            </SpoilerVeil>

            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', marginTop: 'auto', paddingTop: '0.45rem', borderTop: '1px solid var(--border)' }}>
              <strong>Rewards:</strong> <span style={{ color: '#d1d5db' }}>{quest.rewards}</span>
            </div>

            {quest.rewardEntities.length > 0 && (
              <div className="chip-row">
                {quest.rewardEntities.map((ref) => (
                  <button
                    key={`${quest.id}-${ref.id}`}
                    type="button"
                    className="entity-chip"
                    onClick={() => onSelectEntity(ref)}
                  >
                    {ref.label} →
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Banyan Tree Rematch Shrines */}
      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '1rem' }}>
          <Trees size={18} style={{ display: 'inline', marginRight: 8, color: 'var(--jade)' }} aria-hidden="true" />
          Banyan Tree Rematch Shrines ({BANYAN_LOCATIONS.length})
        </h2>
        <div className="item-grid">
          {BANYAN_LOCATIONS.map((tree) => (
            <div key={tree.id} className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <span className="badge badge-jade" style={{ alignSelf: 'flex-start' }}>{tree.region}</span>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.02rem' }}>{tree.name}</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--crimson-bright)' }}>
                <strong>Rematch:</strong> {tree.bossRematch}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>
                <strong>Reward:</strong> {tree.reward}
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{tree.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
