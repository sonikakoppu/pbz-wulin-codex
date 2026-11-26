import { useEffect, useRef } from 'react';
import {
  Compass,
  Eye,
  EyeOff,
  Flame,
  GitFork,
  Layers,
  Menu,
  ScrollText,
  Search,
  ShieldAlert,
  Sparkles,
  Swords,
  Wrench,
} from 'lucide-react';
import type { NavSectionId } from '../../types/codex';

export const NAV_ITEMS: { id: NavSectionId; label: string; icon: typeof Compass }[] = [
  { id: 'overview', label: 'Home', icon: Sparkles },
  { id: 'story-map', label: 'Story Map', icon: Compass },
  { id: 'storylines', label: 'Storylines', icon: ScrollText },
  { id: 'bloodlines', label: 'Bloodlines', icon: GitFork },
  { id: 'weapons', label: 'Weapons', icon: Swords },
  { id: 'edges', label: 'Phantom Edges', icon: Wrench },
  { id: 'accessories', label: 'Accessories', icon: Layers },
  { id: 'quests', label: 'Side Quests', icon: Flame },
  { id: 'bosses', label: 'Bosses', icon: ShieldAlert },
];

interface NavbarProps {
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
  spoilerShield: boolean;
  onToggleSpoilerShield: () => void;
  onOpenSearch: () => void;
}

export function Navbar({
  activeSection,
  onSelectSection,
  spoilerShield,
  onToggleSpoilerShield,
  onOpenSearch,
}: NavbarProps) {
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menuBtn = menuBtnRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu || !menuBtn) return;

    let lastWidth = 0;

    const syncLayout = () => {
      const currentWidth = header.clientWidth;
      const isCurrentlyWide = header.classList.contains('is-wide');
      if (!isCurrentlyWide && currentWidth <= lastWidth && lastWidth !== 0) {
        return;
      }
      lastWidth = currentWidth;

      const wasOpen = menu.matches(':popover-open') || menu.classList.contains(':popover-open');
      header.classList.add('is-measuring');
      header.classList.add('is-wide');
      menu.removeAttribute('popover');

      const fitsInline = inner.scrollWidth <= inner.clientWidth + 1;

      if (fitsInline) {
        header.classList.add('is-wide');
        menu.removeAttribute('popover');
        menu.style.top = '';
        menu.style.left = '';
      } else {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        if (wasOpen && typeof menu.showPopover === 'function') {
          try {
            menu.showPopover();
          } catch {
            // ignore
          }
        }
      }

      requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
      });
    };

    const positionFallback = () => {
      if (CSS.supports('position-area', 'block-end')) return;
      const btnRect = menuBtn.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const margin = 12;
      const maxTop = window.innerHeight - menuRect.height - margin;
      const top =
        btnRect.bottom + 8 + menuRect.height <= window.innerHeight - margin
          ? btnRect.bottom + 8
          : Math.max(margin, Math.min(maxTop, btnRect.top - menuRect.height - 8));
      const centeredLeft = btnRect.left + btnRect.width / 2 - menuRect.width / 2;
      const left = Math.max(
        margin,
        Math.min(window.innerWidth - menuRect.width - margin, centeredLeft)
      );
      menu.style.top = `${Math.round(top)}px`;
      menu.style.left = `${Math.round(left)}px`;
    };

    const onMenuToggle = (e: Event) => {
      const toggleEvent = e as ToggleEvent;
      if (toggleEvent.newState === 'open') {
        positionFallback();
      }
    };

    syncLayout();
    menu.addEventListener('toggle', onMenuToggle);
    const ro = new ResizeObserver(syncLayout);
    ro.observe(header);
    ro.observe(menu);

    return () => {
      menu.removeEventListener('toggle', onMenuToggle);
      ro.disconnect();
    };
  }, []);

  const handleNavClick = (id: NavSectionId) => {
    onSelectSection(id);
    const menu = menuRef.current;
    if (menu && menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
      try {
        menu.hidePopover();
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header ref={headerRef} className="site-header">
      <div ref={innerRef} className="header-inner">
        <button
          type="button"
          className="brand-mark-btn"
          onClick={() => handleNavClick('overview')}
          aria-label="Phantom Blade Zero Home"
        >
          <span className="brand-seal" aria-hidden="true">
            影
          </span>
          <span className="brand-lockup">
            <span className="brand-name">PHANTOM BLADE ZERO</span>
            <span className="brand-sub">影之刃零 · S-GAME</span>
          </span>
        </button>

        <nav className="site-nav" aria-label="Primary Codex Navigation">
          <button
            ref={menuBtnRef}
            className="menu-button"
            type="button"
            popoverTarget="pbz-site-menu"
            popoverTargetAction="toggle"
            aria-controls="pbz-site-menu"
          >
            <Menu size={16} aria-hidden="true" />
            <span>Menu</span>
          </button>

          <ul id="pbz-site-menu" ref={menuRef} className="site-menu" popover="auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="nav-link-btn"
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className={`spoiler-pill ${spoilerShield ? 'is-safe' : 'is-exposed'}`}
            onClick={onToggleSpoilerShield}
            aria-pressed={spoilerShield}
            title={
              spoilerShield
                ? 'Spoiler Shield ON: Late-game secrets and bloodline twists are veiled'
                : 'Spoiler Shield OFF: All bloodline secrets and True Ending spoilers visible'
            }
          >
            {spoilerShield ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
            <span>{spoilerShield ? 'Spoiler Shield: ON' : 'Spoilers: OPEN'}</span>
          </button>

          <button
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            aria-label="Search entire codex (Command+K)"
          >
            <Search size={14} aria-hidden="true" />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
