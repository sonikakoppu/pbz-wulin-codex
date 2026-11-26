import { useState } from 'react';
import { BookOpen, Compass, GitBranch, ScrollText, Sparkles } from 'lucide-react';
import type { EntityRef } from '../../types/codex';
import {
  ENDING_PREREQUISITES,
  ENDING_ROUTES,
  FACTIONS,
  SIDE_STORY_LORE_CARDS,
  STORY_TIMELINE,
} from '../../data/story';
import { CHAPTERS } from '../../data/codex';
import { SpoilerVeil } from '../common/SpoilerVeil';

interface StorylinesViewProps {
  spoilerShield: boolean;
  onOpenRegion: (regionId: string) => void;
  onSelectEntity: (ref: EntityRef) => void;
}

const CHAPTER_TO_REGION_ID: Record<string, string> = {
  prologue: 'order-sanctum',
  ch1: 'weeping-creek',
  ch2: 'crimson-forest',
  ch3: 'village-of-lu',
  ch4: 'pangzhen',
  ch5: 'mandate-encampment',
  ch6: 'mountain-imprisonment',
  'ch7-8': 'meigu-lake',
  ch9: 'mirage-estate',
  'ch10-12': 'mount-soulrend',
};

export function StorylinesView({
  spoilerShield,
  onOpenRegion,
  onSelectEntity,
}: StorylinesViewProps) {
  const [subView, setSubView] = useState<'acts' | 'chapters' | 'sidelore' | 'endings'>('acts');

  return (
    <section className="container section-block">
      <div className="section-header">
        <div>
          <div className="section-kicker">
            <ScrollText size={13} aria-hidden="true" />
            <span>THE 66-DAY CONSPIRACY · ALL ACTS, CHAPTERS &amp; ENDINGS</span>
          </div>
          <h1 className="section-title">Complete Storylines &amp; Endings Guide</h1>
          <p className="section-desc">
            Understand the full story clearly—from the 4-Act conspiracy and all 10 campaign chapters
            to the 12 tragic side-stories, 5 Wulin factions, and exact steps to reach all 4 endings.
          </p>
        </div>

        <div className="filter-pills" role="tablist" aria-label="Storyline sub-sections">
          <button
            type="button"
            className={`filter-pill ${subView === 'acts' ? 'is-active' : ''}`}
            onClick={() => setSubView('acts')}
          >
            4-Act Main Story ({STORY_TIMELINE.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${subView === 'chapters' ? 'is-active' : ''}`}
            onClick={() => setSubView('chapters')}
          >
            All 10 Chapters Walkthrough
          </button>
          <button
            type="button"
            className={`filter-pill ${subView === 'sidelore' ? 'is-active' : ''}`}
            onClick={() => setSubView('sidelore')}
          >
            12 Side-Story Chronicles
          </button>
          <button
            type="button"
            className={`filter-pill ${subView === 'endings' ? 'is-active' : ''}`}
            onClick={() => setSubView('endings')}
          >
            All 4 Endings &amp; True Route
          </button>
        </div>
      </div>

      {/* ACT TIMELINE + FACTIONS */}
      {subView === 'acts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {STORY_TIMELINE.map((beat) => (
            <article key={beat.id} className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-crimson">{beat.actNumber}</span>
                  <span className="badge badge-gold">{beat.chapters}</span>
                  <span className="badge badge-bone">{beat.themeTag}</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                  {beat.region}
                </span>
              </div>

              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>
                {beat.actTitle}
              </h2>
              <p style={{ margin: 0, color: '#d1d5db' }}>{beat.summary}</p>

              <SpoilerVeil
                spoilerShield={spoilerShield}
                isSpoiler={true}
                label={`Reveal ${beat.actNumber} Hidden Conspiracy Details`}
              >
                <div
                  style={{
                    padding: '0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(220, 38, 38, 0.08)',
                    border: '1px solid var(--border-crimson)',
                    fontSize: '0.9rem',
                  }}
                >
                  {beat.spoilerDetails}
                </div>
              </SpoilerVeil>

              {beat.keyConflicts && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  {beat.keyConflicts.map((conflict) => (
                    <div
                      key={conflict.factionId}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(11, 13, 16, 0.7)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gold)', marginBottom: 4 }}>
                        {conflict.factionLabel}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)' }}>{conflict.moves}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="chip-row">
                {beat.linkedEntities.map((ref) => (
                  <button
                    key={`${beat.id}-${ref.kind}-${ref.id}`}
                    type="button"
                    className="entity-chip"
                    onClick={() => onSelectEntity(ref)}
                  >
                    {ref.label} →
                  </button>
                ))}
              </div>
            </article>
          ))}

          {/* Warring Factions Overview */}
          <div style={{ marginTop: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1rem' }}>
              The Five Wulin Powers
            </h2>
            <div className="bloodline-grid">
              {FACTIONS.map((faction) => (
                <div key={faction.id} className={`clan-card accent-${faction.accent}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                      {faction.name}
                    </h3>
                    <span className={`badge badge-${faction.accent}`}>{faction.shortName}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    Strongholds: {faction.strongholds}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db' }}>{faction.agenda}</p>
                  <SpoilerVeil spoilerShield={spoilerShield} label={`Reveal ${faction.shortName} True Agenda`}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fde68a' }}>{faction.spoilerAgenda}</p>
                  </SpoilerVeil>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ALL CHAPTERS WALKTHROUGH */}
      {subView === 'chapters' && (
        <div className="bloodline-grid">
          {CHAPTERS.map((chapter, idx) => {
            const nextChapter = CHAPTERS[idx + 1];
            const regionId = CHAPTER_TO_REGION_ID[chapter.id];
            return (
              <article key={chapter.id} className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-crimson">{chapter.num}</span>
                  <span className="badge badge-gold">{chapter.threat}</span>
                </div>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{chapter.title}</h2>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    Region: {chapter.region}
                  </div>
                </div>
                <SpoilerVeil
                  spoilerShield={spoilerShield}
                  isSpoiler={Boolean(chapter.spoiler)}
                  label={`Reveal ${chapter.num} Late-Game Objectives`}
                >
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db' }}>{chapter.summary}</p>
                  <ol style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.84rem', color: 'var(--muted)' }}>
                    {chapter.objectives.map((obj) => (
                      <li key={obj}>{obj}</li>
                    ))}
                  </ol>
                </SpoilerVeil>

                <div className="cutoff-banner">
                  <span>
                    <strong>Zero-Missables Tip:</strong> {chapter.missables}
                  </span>
                </div>

                {chapter.linkedEntityRefs && (
                  <div className="chip-row">
                    {chapter.linkedEntityRefs.map((ref) => (
                      <button
                        key={`${chapter.id}-${ref.id}`}
                        type="button"
                        className="entity-chip"
                        onClick={() => onSelectEntity(ref)}
                      >
                        {ref.label} →
                      </button>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
                    {nextChapter ? `Next → ${nextChapter.num}: ${nextChapter.region}` : 'Final Chapter'}
                  </span>
                  {regionId && (
                    <button
                      type="button"
                      className="btn-ghost-sm"
                      onClick={() => onOpenRegion(regionId)}
                    >
                      <Compass size={13} aria-hidden="true" />
                      <span>Open on Map</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 12 SIDE STORY LORE CARDS */}
      {subView === 'sidelore' && (
        <div className="bloodline-grid">
          {SIDE_STORY_LORE_CARDS.map((card) => (
            <article key={card.id} className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-gold">{card.chapterRef}</span>
                <span className="badge badge-bone">{card.region}</span>
              </div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.12rem' }}>
                <BookOpen size={15} style={{ display: 'inline', marginRight: 7, color: 'var(--crimson-bright)' }} aria-hidden="true" />
                {card.title}
              </h2>
              <p style={{ margin: 0, fontSize: '0.87rem', color: '#d1d5db' }}>{card.teaser}</p>

              <SpoilerVeil spoilerShield={spoilerShield} label="Reveal Hidden Truth & Outcome">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#fde68a' }}>{card.fullTruth}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem' }}>
                    {card.keyDetails.map((kd) => (
                      <div key={kd.label}>
                        <strong style={{ color: 'var(--bone)' }}>{kd.label}:</strong>{' '}
                        <span style={{ color: 'var(--muted)' }}>{kd.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#fca5a5', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                    <strong>Outcome:</strong> {card.tragicOutcome}
                  </div>
                </div>
              </SpoilerVeil>

              <div className="chip-row">
                {card.linkedEntities.map((ref) => (
                  <button
                    key={`${card.id}-${ref.kind}-${ref.id}`}
                    type="button"
                    className="entity-chip"
                    onClick={() => onSelectEntity(ref)}
                  >
                    {ref.label} →
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4 ENDINGS & TRUE ENDING ROADMAP */}
      {subView === 'endings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div className="build-sandbox-panel">
            <div style={{ marginBottom: '1rem' }}>
              <div className="section-kicker" style={{ marginBottom: 4 }}>
                <Sparkles size={13} aria-hidden="true" />
                <span>HOW TO UNLOCK THE SECRET TRUE ENDING WITHOUT MISSING A STEP</span>
              </div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>
                "The True Lóng" — 8 Mandatory Steps Before the Last Chance Bell
              </h2>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Complete every step below in order before ringing Mirage Estate’s Last Chance Bell in Chapter 9.
                Doing so unlocks the secret 3-phase final battle and the golden blade Aureate.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '0.75rem' }}>
              {ENDING_PREREQUISITES.map((req, idx) => (
                <div
                  key={req.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(11, 13, 16, 0.72)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="badge badge-gold">Step {idx + 1}</span>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--crimson-bright)' }}>
                      {req.cutoff}
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--bone)' }}>{req.title}</strong>
                  <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    Location: {req.region}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#d1d5db' }}>{req.detail}</p>
                  {req.linkedEntities && req.linkedEntities.length > 0 && (
                    <div className="chip-row" style={{ marginTop: 4 }}>
                      {req.linkedEntities.map((ref) => (
                        <button
                          key={`${req.id}-${ref.id}`}
                          type="button"
                          className="entity-chip"
                          onClick={() => onSelectEntity(ref)}
                        >
                          {ref.label} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bloodline-grid">
            {ENDING_ROUTES.map((route) => (
              <article
                key={route.id}
                className={`clan-card accent-${route.accent === 'bone' ? 'gold' : route.accent}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`badge badge-${route.accent}`}>{route.badge}</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                    <GitBranch size={15} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" />
                    {route.title}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gold)', marginTop: 2 }}>{route.subtitle}</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db' }}>{route.spoilerSafeTeaser}</p>

                <SpoilerVeil spoilerShield={spoilerShield} label={`Reveal Full Ending Summary & Climax`}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <p style={{ margin: 0, fontSize: '0.87rem', color: '#fde68a' }}>{route.fullSummary}</p>
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--crimson-bright)' }}>Final Showdown:</strong> {route.finalShowdown}
                    </div>
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--jade)' }}>Unlocks:</strong> {route.unlocks}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {route.howToTrigger.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </SpoilerVeil>

                <div className="chip-row">
                  {route.linkedEntities.map((ref) => (
                    <button
                      key={`${route.id}-${ref.id}`}
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity(ref)}
                    >
                      {ref.label} →
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
