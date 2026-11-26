import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { EntityRef, NavSectionId } from './types/codex';
import { useCodexProgress } from './hooks/useCodexProgress';
import { Navbar } from './components/layout/Navbar';
import { HeroOverview } from './components/hero/HeroOverview';
import { StoryMapView } from './components/map/StoryMapView';
import { StorylinesView } from './components/story/StorylinesView';
import { BloodlinesView } from './components/bloodlines/BloodlinesView';
import { WeaponsView } from './components/arsenal/WeaponsView';
import { PhantomEdgesView } from './components/arsenal/PhantomEdgesView';
import { AccessoriesView } from './components/accessories/AccessoriesView';
import { QuestsView } from './components/quests/QuestsView';
import { BossesView } from './components/quests/BossesView';
import { EntityDrawer } from './components/common/EntityDrawer';
import { SearchModal } from './components/common/SearchModal';

export function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('overview');
  const [focusedRegionId, setFocusedRegionId] = useState<string>('weeping-creek');
  const [activeEntity, setActiveEntity] = useState<EntityRef | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { spoilerShield, savedBuild, toggleSpoilerShield, updateBuild } = useCodexProgress();

  const handleOpenRegionOnMap = (regionId: string) => {
    setFocusedRegionId(regionId);
    setActiveSection('story-map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLSelectElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        spoilerShield={spoilerShield}
        onToggleSpoilerShield={toggleSpoilerShield}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="main-stage">
        {activeSection === 'overview' && (
          <HeroOverview
            onNavigate={setActiveSection}
            onOpenRegion={handleOpenRegionOnMap}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'story-map' && (
          <StoryMapView
            spoilerShield={spoilerShield}
            selectedRegionId={focusedRegionId}
            onSelectRegionId={setFocusedRegionId}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'storylines' && (
          <StorylinesView
            spoilerShield={spoilerShield}
            onOpenRegion={handleOpenRegionOnMap}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'bloodlines' && (
          <BloodlinesView
            spoilerShield={spoilerShield}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'weapons' && (
          <WeaponsView
            spoilerShield={spoilerShield}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'edges' && (
          <PhantomEdgesView
            spoilerShield={spoilerShield}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'accessories' && (
          <AccessoriesView
            spoilerShield={spoilerShield}
            savedBuild={savedBuild}
            onUpdateBuild={updateBuild}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'quests' && (
          <QuestsView
            spoilerShield={spoilerShield}
            onSelectEntity={setActiveEntity}
          />
        )}

        {activeSection === 'bosses' && (
          <BossesView
            spoilerShield={spoilerShield}
            onSelectEntity={setActiveEntity}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={16} style={{ color: 'var(--crimson-bright)' }} aria-hidden="true" />
            <span>
              <strong>PHANTOM BLADE ZERO</strong> — Complete Game &amp; Story Guide
            </span>
          </div>
          <div>
            <span>Complete walkthrough, weapons, Phantom Edges, accessories, bloodlines &amp; zero-missables roadmap.</span>
          </div>
        </div>
      </footer>

      <EntityDrawer
        entity={activeEntity}
        spoilerShield={spoilerShield}
        onClose={() => setActiveEntity(null)}
        onSelectEntity={setActiveEntity}
        onJumpToSection={setActiveSection}
        onOpenRegion={handleOpenRegionOnMap}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectEntity={setActiveEntity}
      />
    </div>
  );
}

export default App;
