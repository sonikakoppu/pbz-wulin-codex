import { useState, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SpoilerVeilProps {
  spoilerShield: boolean;
  isSpoiler?: boolean;
  label?: string;
  children: ReactNode;
}

export function SpoilerVeil({
  spoilerShield,
  isSpoiler = true,
  label = 'Spoiler Redacted — Click to Reveal',
  children,
}: SpoilerVeilProps) {
  const [localReveal, setLocalReveal] = useState(false);

  if (!isSpoiler || !spoilerShield || localReveal) {
    return <>{children}</>;
  }

  return (
    <div className="spoiler-veil">
      <div className="spoiler-veil-blur" aria-hidden="true">
        {children}
      </div>
      <button
        type="button"
        className="spoiler-veil-btn"
        onClick={() => setLocalReveal(true)}
      >
        <EyeOff size={15} aria-hidden="true" />
        <span>{label}</span>
        <Eye size={14} className="spoiler-veil-eye" aria-hidden="true" />
      </button>
    </div>
  );
}
