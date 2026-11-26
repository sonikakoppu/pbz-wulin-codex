import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { EntityRef } from '../../types/codex';
import { MAIN_WEAPONS, PHANTOM_EDGES } from '../../data/arsenal';
import { ACCESSORIES } from '../../data/accessories';
import { QUEST_TALES } from '../../data/quests';
import { CHARACTER_DOSSIERS } from '../../data/story';
import { BOSSES } from '../../data/codex';
import { WORLD_REGIONS } from '../../data/worldMap';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (ref: EntityRef) => void;
}

interface SearchHit {
  ref: EntityRef;
  subtitle: string;
  searchText: string;
}

export function SearchModal({ isOpen, onClose, onSelectEntity }: SearchModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const allHits = useMemo<SearchHit[]>(() => {
    return [
      ...WORLD_REGIONS.map((r) => ({
        ref: { kind: 'region' as const, id: r.id, label: r.name },
        subtitle: `${r.chapterLabel} · ${r.levelBand}`,
        searchText: `${r.name} ${r.chapterLabel} ${r.subtitle} ${r.hanzi}`.toLowerCase(),
      })),
      ...MAIN_WEAPONS.map((w) => ({
        ref: { kind: 'weapon' as const, id: w.id, label: w.name },
        subtitle: `Weapon · ${w.weaponClass} · ${w.region}`,
        searchText: `${w.name} ${w.weaponClass} ${w.region} ${w.soulTempered?.name ?? ''}`.toLowerCase(),
      })),
      ...PHANTOM_EDGES.map((e) => ({
        ref: { kind: 'edge' as const, id: e.id, label: e.name },
        subtitle: `Phantom Edge · ${e.edgeClass} · ${e.region}`,
        searchText: `${e.name} ${e.edgeClass} ${e.region} ${e.combatRole}`.toLowerCase(),
      })),
      ...ACCESSORIES.map((a) => ({
        ref: { kind: 'accessory' as const, id: a.id, label: a.name },
        subtitle: `Accessory · ${a.category} · ${a.region}`,
        searchText: `${a.name} ${a.category} ${a.region} ${a.baseEffect}`.toLowerCase(),
      })),
      ...CHARACTER_DOSSIERS.map((c) => ({
        ref: { kind: 'character' as const, id: c.id, label: c.name },
        subtitle: `Bloodline · ${c.factionLabel}`,
        searchText: `${c.name} ${c.epithet} ${c.factionLabel} ${c.bloodline}`.toLowerCase(),
      })),
      ...BOSSES.map((b) => ({
        ref: { kind: 'boss' as const, id: b.id, label: b.name },
        subtitle: `Boss · ${b.region}`,
        searchText: `${b.name} ${b.region} ${b.rewards}`.toLowerCase(),
      })),
      ...QUEST_TALES.map((q) => ({
        ref: { kind: 'quest' as const, id: q.id, label: q.title },
        subtitle: `Side Quest (${q.type}) · ${q.region}`,
        searchText: `${q.title} ${q.region} ${q.rewards}`.toLowerCase(),
      })),
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allHits.slice(0, 14);
    return allHits.filter((hit) => hit.searchText.includes(q)).slice(0, 24);
  }, [allHits, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setTimeout(() => inputRef.current?.focus(), 20);
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Safari fallback for closedby="any"
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
      if (pressedOutside && outside(e)) dialog.close();
    };
    dialog.addEventListener('pointerdown', onDown);
    dialog.addEventListener('pointerup', onUp);
    return () => {
      dialog.removeEventListener('pointerdown', onDown);
      dialog.removeEventListener('pointerup', onUp);
    };
  }, []);

  const handleClose = () => {
    if (dialogRef.current) dialogRef.current.returnValue = '';
    setQuery('');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="search-modal-dialog"
      aria-labelledby="global-search-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      onClose={handleClose}
    >
      <div className="dialog-head">
        <h1 id="global-search-title">Global Wulin Codex Search</h1>
        <button
          type="button"
          className="dialog-close-btn"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="dialog-body">
        <div className="search-input-wrap" style={{ flex: 'none', width: '100%' }}>
          <Search size={16} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search weapons, Phantom Edges, accessories, bloodlines, bosses, quests, regions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search entire Phantom Blade Zero Codex"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {results.map((hit) => (
            <button
              key={`${hit.ref.kind}-${hit.ref.id}`}
              type="button"
              className="region-mini-btn"
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => {
                dialogRef.current?.close();
                onSelectEntity(hit.ref);
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{hit.ref.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{hit.subtitle}</div>
              </div>
              <span className="badge badge-gold">{hit.ref.kind}</span>
            </button>
          ))}
          {results.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '1.5rem 0' }}>
              No codex entries matched “{query}”.
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
