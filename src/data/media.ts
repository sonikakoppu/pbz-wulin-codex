import type { GallerySlide } from '../types/codex';
import { assetUrl } from '../utils/assetUrl';

export const BOSS_IMAGES: Record<string, string> = {
  'peng-meng': '/assets/bosses-hd/peng-meng.jpg',
  'the-hunt': '/assets/bosses-hd/the-hunt.jpg',
  'bai-chilian': '/assets/bosses-hd/bai-chilian.jpg',
  'leng-tu': '/assets/bosses-hd/leng-tu.png',
  flame: '/assets/bosses-hd/flame.jpg',
  'chief-disciple': '/assets/bosses-hd/chief-disciple.png',
  huangxing: '/assets/bosses-hd/huangxing.png',
  'meng-hua': '/assets/bosses-hd/meng-hua.jpg',
  inanis: '/assets/bosses-hd/inanis.jpg',
  'lei-dang': '/assets/bosses-hd/lei-dang.png',
  'zuo-shang': '/assets/bosses-hd/zuo-shang.jpg',
};

const ACCESSORY_ICON_OVERRIDES: Record<string, string> = {
  'token-pursuit': 'token-of-pursuit-96.webp',
  'ancient-armor': 'ancient-armor-fragment-96.webp',
  'lingran-pendant': 'lingrans-pendant-96.webp',
};

export function getBossImage(id: string): string {
  return assetUrl(BOSS_IMAGES[id] ?? '/assets/combat-shachi.jpg');
}

export function getAccessoryIconUrl(id: string): string {
  const filename = ACCESSORY_ICON_OVERRIDES[id] ?? `${id}-96.webp`;
  return assetUrl(`/assets/items/acc-icons/${filename}`);
}

export const MEDIA_GALLERY: GallerySlide[] = [
  {
    id: 'media-soul',
    title: 'Soul — The 66-Day Assassin',
    subtitle: 'Protagonist Key Art',
    category: 'World',
    image: assetUrl('/assets/hero-soul.jpg'),
    caption: 'Framed for murdering the Shadow Sovereign, Soul carves through Wulin on borrowed time.',
    linkedEntity: { kind: 'character', id: 'soul', label: 'Soul' },
  },
  {
    id: 'media-pangzhen',
    title: 'Pangzhen — Kung-Fu Punk Metropolis',
    subtitle: 'Chapter 4 Vertical Labyrinth',
    category: 'World',
    image: assetUrl('/assets/pangzhen-world.jpg'),
    caption: 'Rain-soaked canals, steam towers, and ruined opera rooftops packed with ten deadly bosses.',
    linkedEntity: { kind: 'region', id: 'pangzhen', label: 'Pangzhen' },
  },
  {
    id: 'media-combat',
    title: 'Sha-Chi Parry & Ghoststep',
    subtitle: 'Choreographed Wuxia Combat',
    category: 'Combat',
    image: assetUrl('/assets/combat-shachi.jpg'),
    caption: 'Deflect Blue-Flash Brutal Moves and Ghoststep behind Red-Flash Killer Moves in fluid sword dances.',
    linkedEntity: { kind: 'weapon', id: 'sanguine', label: 'Sanguine' },
  },
  {
    id: 'media-arsenal',
    title: 'Phantom Edges & Artifice',
    subtitle: '26 Secondary Tools & Contraptions',
    category: 'Arsenal',
    image: assetUrl('/assets/arsenal-edges.jpg'),
    caption: 'Pair primary blades with Dread Axe, Hunter’s Chain Sickle, Tiger Cannon, and Flaming Mane.',
    linkedEntity: { kind: 'edge', id: 'dread-axe', label: 'Dread Axe' },
  },
  {
    id: 'media-huangxing',
    title: 'Huangxing, the Kunlun Renegade',
    subtitle: 'Mountain of Imprisonment Climax',
    category: 'Boss',
    image: assetUrl('/assets/bosses-hd/huangxing.png'),
    caption: 'A fallen Pillar of Kunlun who fused orthodox martial arts with grotesque mechanical Sha-Chi.',
    linkedEntity: { kind: 'boss', id: 'huangxing', label: 'Huangxing' },
  },
  {
    id: 'media-zuo-shang',
    title: 'Zuo Shang — Shadow Sovereign',
    subtitle: 'Mount Soulrend Final Reckoning',
    category: 'Boss',
    image: assetUrl('/assets/bosses-hd/zuo-shang.jpg'),
    caption: 'Soul’s sworn brother turned usurper—and heir to the ancient Lóng Clan bloodline.',
    linkedEntity: { kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang' },
  },
];
