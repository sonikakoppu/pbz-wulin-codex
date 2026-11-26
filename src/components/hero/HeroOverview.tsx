import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Flame,
  GitFork,
  Layers,
  MapPin,
  Pause,
  Play,
  ScrollText,
  ShieldAlert,
  Sparkles,
  Swords,
  Wrench,
} from 'lucide-react';
import type { EntityRef, NavSectionId } from '../../types/codex';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { ACCESSORIES } from '../../data/accessories';
import { QUEST_TALES } from '../../data/quests';
import { WORLD_REGIONS } from '../../data/worldMap';
import { BLOODLINE_CLANS } from '../../data/bloodlines';
import { BOSSES, TELEGRAPHS } from '../../data/codex';
import { MEDIA_GALLERY } from '../../data/media';
import { assetUrl } from '../../utils/assetUrl';

interface HeroOverviewProps {
  onNavigate: (section: NavSectionId) => void;
  onOpenRegion: (regionId: string) => void;
  onSelectEntity: (ref: EntityRef) => void;
}

export function HeroOverview({ onNavigate, onOpenRegion, onSelectEntity }: HeroOverviewProps) {
  const [embersActive, setEmbersActive] = useState(true);
  const [selectedTelegraph, setSelectedTelegraph] = useState<'blue' | 'red' | 'black' | 'standard'>('blue');
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'World' | 'Combat' | 'Boss' | 'Arsenal'>('All');

  const activeTelegraph = TELEGRAPHS[selectedTelegraph];

  const filteredGallery =
    galleryFilter === 'All'
      ? MEDIA_GALLERY
      : MEDIA_GALLERY.filter((slide) => slide.category === galleryFilter);

  const portals: {
    id: NavSectionId;
    title: string;
    count: string;
    desc: string;
    img: string;
    icon: typeof Compass;
  }[] = [
    {
      id: 'story-map',
      title: 'Entire Story Map',
      count: `${WORLD_REGIONS.length} Interconnected Regions`,
      desc: 'Follow the world route from Prologue to Mount Soulrend with Next-Stop arrows, Bells, loot & missable cutoffs.',
      img: assetUrl('/assets/wulin-map-bg.jpg'),
      icon: Compass,
    },
    {
      id: 'storylines',
      title: 'Storylines & 4 Endings',
      count: '4 Acts · 10 Chapters · 4 Endings',
      desc: 'Understand the 66-Day conspiracy, 12 tragic side-stories, 5 factions, and exact steps for the True Ending.',
      img: assetUrl('/assets/game/screen-1.jpg'),
      icon: ScrollText,
    },
    {
      id: 'bloodlines',
      title: 'Bloodlines & Lineage Web',
      count: `${BLOODLINE_CLANS.length} Major Clans · 13 Characters`,
      desc: 'Explore Bastion of Mó, Lóng Clan, Mu Lineage, Kunlun Pillars & Lady of the Veil family ties.',
      img: assetUrl('/assets/bosses-hd/zuo-shang.jpg'),
      icon: GitFork,
    },
    {
      id: 'weapons',
      title: 'Primary Weapons Armory',
      count: `${MAIN_WEAPONS.length} Blades + Soul Tempering`,
      desc: 'Every One-Handed, Two-Handed & Dual-Wield weapon with Lv.1–25 scaling, Power Surges & upgrades.',
      img: assetUrl('/assets/gear/weapon-onehanded.jpg'),
      icon: Swords,
    },
    {
      id: 'edges',
      title: 'Phantom Edges & Obstacles',
      count: `${PHANTOM_EDGES.length} Secondary Contraptions`,
      desc: 'Every secondary tool, Remnant Spark cost, Myst evolution & which Edge breaks which locked world barrier.',
      img: assetUrl('/assets/arsenal-edges.jpg'),
      icon: Wrench,
    },
    {
      id: 'accessories',
      title: 'Accessories & Build Forge',
      count: `${ACCESSORIES.length} Charms + Loadout Sandbox`,
      desc: 'All Offensive, Defensive & Support charms with Jewel Polishing stats and a live 4-slot build calculator.',
      img: assetUrl('/assets/gear/accessories-charms.jpg'),
      icon: Layers,
    },
    {
      id: 'quests',
      title: 'Side Quests & Missables',
      count: `${QUEST_TALES.length} Quests + Cutoff Alerts`,
      desc: 'Step-by-step quest instructions with red cutoff warnings so you never miss any NPC tale or reward.',
      img: assetUrl('/assets/pangzhen-world.jpg'),
      icon: Flame,
    },
    {
      id: 'bosses',
      title: 'Boss Tactics & Telegraphs',
      count: `${BOSSES.length} Major Boss Dossiers`,
      desc: 'Weaknesses, Blue/Red/Black-Flash cues, secret phase triggers, and guaranteed weapon/Edge drops.',
      img: assetUrl('/assets/bosses-hd/huangxing.png'),
      icon: ShieldAlert,
    },
  ];

  return (
    <>
      <section className="hero-banner" aria-label="Phantom Blade Zero Showcase">
        <div className="hero-media">
          <img
            src={assetUrl('/assets/hero-cinematic.jpg')}
            alt="Soul unsheathing his crimson Sha-Chi blade atop rain-soaked Wuxia eaves"
            className="hero-bg-img"
            fetchPriority="high"
            width={1600}
            height={900}
          />
          <div className="hero-scrim" aria-hidden="true" />
          <div
            className={`hero-ember-layer ${embersActive ? 'is-animating' : ''}`}
            aria-hidden="true"
          />
          <div className="hero-kanji-watermark" aria-hidden="true">
            影之刃零
          </div>
        </div>

        <div className="container hero-content">
          <div>
            <div className="hero-eyebrow">S-GAME · KUNG-FU PUNK DARK WUXIA GUIDE</div>
            <h1 className="hero-title">
              PHANTOM BLADE ZERO
              <span className="hero-title-accent">SIXTY-SIX DAYS TO SHATTER THE ORDER</span>
            </h1>
            <p className="hero-lead">
              You play as <strong>Soul</strong>, an elite assassin framed for murdering Shadow Sovereign Mu Tianmiao
              and kept alive by a failing temporary cure with just <strong>66 days</strong> left. Follow this
              complete guide to understand every mechanic, bloodline, weapon, Phantom Edge, accessory, side quest,
              and <strong>exactly where to go next without missing anything</strong>.
            </p>
            <div className="hero-cta-row">
              <button
                type="button"
                className="btn-crimson"
                onClick={() => onNavigate('story-map')}
              >
                <Compass size={16} aria-hidden="true" />
                <span>Open Entire Story Map</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn-gold-outline"
                onClick={() => onNavigate('quests')}
              >
                <Flame size={16} aria-hidden="true" />
                <span>Zero-Missables Quest Guide</span>
              </button>
              <button
                type="button"
                className="btn-ghost-sm"
                onClick={() => setEmbersActive((prev) => !prev)}
                aria-label={embersActive ? 'Pause ambient ember motion' : 'Play ambient ember motion'}
              >
                {embersActive ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
                <span>{embersActive ? 'Pause Motion' : 'Play Motion'}</span>
              </button>
            </div>
          </div>

          <aside className="lifespan-card" aria-label="Beginner Quick Start Guide">
            <div className="lifespan-header">
              <span>HOW THE GAME WORKS</span>
              <span className="badge badge-gold">NEW PLAYER BRIEF</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#d1d5db' }}>
              <div style={{ paddingLeft: '0.65rem', borderLeft: '2px solid var(--azure)' }}>
                <strong style={{ color: 'var(--azure)' }}>1. Combat Flow:</strong> Attack with Standard &amp;
                Sha-Chi combos. Tap Parry on <strong style={{ color: '#7dd3fc' }}>Blue flashes</strong>; Dodge
                on <strong style={{ color: '#fca5a5' }}>Red &amp; Black flashes</strong> to trigger Ghoststep behind enemies.
              </div>
              <div style={{ paddingLeft: '0.65rem', borderLeft: '2px solid var(--gold)' }}>
                <strong style={{ color: 'var(--gold)' }}>2. Dual-Weapon Reset:</strong> Equip 2 Main Weapons +
                2 Phantom Edges. When your yellow Sha-Chi bar runs low, swap weapons mid-combo for instant stamina &amp; damage.
              </div>
              <div style={{ paddingLeft: '0.65rem', borderLeft: '2px solid var(--jade)' }}>
                <strong style={{ color: 'var(--jade)' }}>3. Free Respec &amp; Upgrades:</strong> Resetting weapon
                materials is 100% free below Lv. 10. Visit <strong>Jewel</strong> (Ch. 3) to polish accessories and{' '}
                <strong>Myst</strong> (Ch. 4) to Soul-Temper weapons &amp; Edges.
              </div>
              <div style={{ paddingLeft: '0.65rem', borderLeft: '2px solid var(--crimson-bright)' }}>
                <strong style={{ color: 'var(--crimson-bright)' }}>4. Never Miss Anything:</strong> Always finish
                each region’s side quests &amp; Purple-Icon Tales <em>before</em> defeating the region’s final boss
                and <em>before</em> ringing Mirage Estate’s <strong>Last Chance Bell</strong> (Ch. 9).
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Complete Golden Path: Where to Go Next Without Missing Anything */}
      <section className="container section-block reveal-on-scroll">
        <div className="section-header">
          <div>
            <div className="section-kicker">
              <MapPin size={13} aria-hidden="true" />
              <span>COMPLETE PROGRESSION PATH · WHERE TO GO NEXT</span>
            </div>
            <h2 className="section-title">Golden Route: Play Step-by-Step With Zero Missables</h2>
            <p className="section-desc">
              Follow these 10 regions in exact order. Every stop tells you what happens, what key weapons or
              Phantom Edges you unlock, and what you must finish before moving to the next region.
            </p>
          </div>
          <button
            type="button"
            className="btn-gold-outline"
            onClick={() => onNavigate('story-map')}
          >
            <Compass size={15} aria-hidden="true" />
            <span>View Full Visual Map</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
          {WORLD_REGIONS.map((region, idx) => {
            const nextRegion = WORLD_REGIONS[idx + 1];
            return (
              <article
                key={region.id}
                className="panel-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  borderColor: region.isPointOfNoReturn ? 'var(--border-crimson)' : undefined,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-crimson">{region.chapterLabel}</span>
                    <span className="badge badge-gold">{region.levelBand}</span>
                    {region.isOptionalBranch && <span className="badge badge-azure">Optional (Required for True Ending)</span>}
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.14rem' }}>
                    {region.orderIndex === 0 ? 'Prologue' : `Step ${region.orderIndex}`}: {region.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: 2 }}>{region.subtitle}</div>
                </div>

                <p style={{ margin: 0, fontSize: '0.84rem', color: '#d1d5db' }}>{region.storySummary}</p>

                {region.cutoffAlert && (
                  <div className="cutoff-banner">
                    <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    <span>
                      <strong>Do Before Leaving:</strong> {region.cutoffAlert}
                    </span>
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
                  <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {nextRegion ? `Next → ${nextRegion.name}` : 'Final Climax & Epilogue'}
                  </span>
                  <button
                    type="button"
                    className="entity-chip"
                    onClick={() => onOpenRegion(region.id)}
                  >
                    Inspect Region &amp; Loot →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Portal Grid */}
      <section className="container section-block reveal-on-scroll">
        <div className="section-header">
          <div>
            <div className="section-kicker">PHANTOM WORLD ENCYCLOPEDIA</div>
            <h2 className="section-title">Explore Every System &amp; Dossier</h2>
            <p className="section-desc">
              Jump directly into any section below—every weapon, Phantom Edge, accessory, bloodline,
              storyline, boss tactic, and side quest is cross-linked in one click.
            </p>
          </div>
        </div>

        <div className="portal-grid">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                type="button"
                className="portal-card"
                onClick={() => onNavigate(portal.id)}
              >
                <img
                  src={portal.img}
                  alt=""
                  className="portal-card-img"
                  loading="lazy"
                  width={640}
                  height={360}
                />
                <div className="portal-card-body">
                  <div className="portal-card-count">
                    <Icon size={12} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" />
                    {portal.count}
                  </div>
                  <h3 className="portal-card-title">{portal.title}</h3>
                  <p className="portal-card-desc">{portal.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sha-Chi Combat Telegraph Strip */}
      <section className="container section-block reveal-on-scroll">
        <div className="section-header">
          <div>
            <div className="section-kicker">COMBAT FUNDAMENTALS</div>
            <h2 className="section-title">Sha-Chi &amp; Ghoststep Telegraph Guide</h2>
            <p className="section-desc">
              Select any attack flash color below to learn the exact timing rule—Parry Blue, Dodge Red &amp; Black.
            </p>
          </div>
          <div className="filter-pills" role="tablist" aria-label="Combat telegraph types">
            {(['blue', 'red', 'black', 'standard'] as const).map((key) => (
              <button
                key={key}
                type="button"
                className={`filter-pill ${selectedTelegraph === key ? 'is-active' : ''}`}
                onClick={() => setSelectedTelegraph(key)}
              >
                {TELEGRAPHS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div>
            <span
              className={`badge ${
                selectedTelegraph === 'blue'
                  ? 'badge-azure'
                  : selectedTelegraph === 'red'
                    ? 'badge-crimson'
                    : selectedTelegraph === 'black'
                      ? 'badge-violet'
                      : 'badge-gold'
              }`}
            >
              {activeTelegraph.label}
            </span>
            <h3 style={{ margin: '0.65rem 0 0.4rem', fontFamily: 'var(--font-display)' }}>
              {activeTelegraph.title}
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--gold)', fontWeight: 700 }}>
              DO THIS: {activeTelegraph.verdict}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--crimson-bright)', textTransform: 'uppercase' }}>
              Mistake to Avoid
            </div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#d1d5db' }}>{activeTelegraph.avoid}</p>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--jade)', textTransform: 'uppercase' }}>
              Payoff
            </div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#d1d5db' }}>{activeTelegraph.reward}</p>
          </div>
        </div>
      </section>

      {/* Official-Style Visual Media Showcase */}
      <section className="container section-block reveal-on-scroll">
        <div className="section-header">
          <div>
            <div className="section-kicker">
              <Sparkles size={13} aria-hidden="true" />
              <span>WORLD, COMBAT &amp; BOSS SHOWCASE</span>
            </div>
            <h2 className="section-title">Phantom World Visual Gallery</h2>
            <p className="section-desc">
              Click any card’s dossier button to open full stats, lore, or boss tactics centered right on screen.
            </p>
          </div>
          <div className="filter-pills">
            {(['All', 'World', 'Combat', 'Arsenal', 'Boss'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${galleryFilter === cat ? 'is-active' : ''}`}
                onClick={() => setGalleryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filteredGallery.map((slide) => (
            <article key={slide.id} className="gallery-card">
              <div className="gallery-thumb-wrap">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="gallery-thumb"
                  loading="lazy"
                  width={640}
                  height={360}
                />
              </div>
              <div className="gallery-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-gold">{slide.category}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {slide.subtitle}
                  </span>
                </div>
                <h3 style={{ margin: '0.25rem 0 0', fontFamily: 'var(--font-display)', fontSize: '1.08rem' }}>
                  {slide.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', flex: 1 }}>
                  {slide.caption}
                </p>
                {slide.linkedEntity && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      className="entity-chip"
                      onClick={() => onSelectEntity(slide.linkedEntity!)}
                    >
                      Inspect {slide.linkedEntity.label} →
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
