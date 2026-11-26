export type NavSectionId =
  | 'overview'
  | 'story-map'
  | 'storylines'
  | 'bloodlines'
  | 'weapons'
  | 'edges'
  | 'accessories'
  | 'quests'
  | 'bosses';

export type NavTabId =
  | 'story'
  | 'endings'
  | 'combat'
  | 'arsenal'
  | 'builder'
  | 'quests'
  | 'chapters'
  | 'bosses';

export type EntityKind =
  | 'weapon'
  | 'edge'
  | 'medicine'
  | 'accessory'
  | 'boss'
  | 'character'
  | 'quest'
  | 'region';

export interface EntityRef {
  kind: EntityKind;
  id: string;
  label: string;
}

export type ArsenalCategory = 'weapon' | 'edge' | 'medicine' | 'accessory';

export interface ArsenalItem {
  id: string;
  category: ArsenalCategory;
  subType: string;
  name: string;
  location: string;
  tier: string;
  summary: string;
  accessorySlotType?: 'Offensive' | 'Defensive' | 'Support';
  relatedBossId?: string;
}

export type WeaponClass = 'One-Handed' | 'Two-Handed' | 'Dual-Wield';

export interface WeaponPerks {
  lv5: string;
  lv10: string;
  lv15: string;
  lv25: string;
}

export interface SoulTemperedEvolution {
  id: string;
  name: string;
  catalyst: string;
  catalystLocation: string;
  damageLv1: number;
  damageLv25: number;
  guardBreakLv1: number;
  guardBreakLv25: number;
  passiveTrait: string;
  powerSurge: string;
  perks: WeaponPerks;
}

export interface MainWeapon {
  id: string;
  name: string;
  weaponClass: WeaponClass;
  tier: 'Starter' | 'Core' | 'A-Tier' | 'S-Tier' | 'Tactical';
  damageLv1: number;
  damageLv25: number;
  guardBreakLv1: number;
  guardBreakLv25: number;
  passiveTrait: string;
  powerSurge: string;
  unlockSource: string;
  region: string;
  perks: WeaponPerks;
  missable?: boolean;
  missableReason?: string;
  spoiler?: boolean;
  tags: string[];
  soulTempered?: SoulTemperedEvolution;
  linkedBossId?: string;
}

export type PhantomEdgeClass = 'Martial' | 'Destructive' | 'Artifice' | 'Summon';

export interface PhantomEdgeEvolution {
  id: string;
  name: string;
  catalyst: string;
  sparkCost: number;
  combatRole: string;
  evolvedBonus: string;
  obstacleId?: string;
}

export interface PhantomEdge {
  id: string;
  name: string;
  edgeClass: PhantomEdgeClass;
  sparkCost: number;
  tier: 'Essential' | 'S-Tier' | 'A-Tier' | 'Tactical';
  combatRole: string;
  unlockSource: string;
  region: string;
  obstacleId?: string;
  obstacleLabel?: string;
  tags: string[];
  spoiler?: boolean;
  evolution?: PhantomEdgeEvolution;
  linkedBossId?: string;
}

export interface ExplorationObstacle {
  id: string;
  name: string;
  edgeId: string;
  edgeName: string;
  description: string;
}

export type AccessoryCategory = 'Offensive' | 'Defensive' | 'Support';

export interface AccessoryStats {
  damagePct?: number;
  guardBreakPct?: number;
  damageReductionPct?: number;
  parryWindowPct?: number;
  healingPct?: number;
  shaChiPct?: number;
  sparkEfficiencyPct?: number;
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: AccessoryCategory;
  region: string;
  unlockLocation: string;
  baseEffect: string;
  maxPolishedEffect: string;
  baseStats: AccessoryStats;
  polishedStats: AccessoryStats;
  synergyTags: string[];
  missable?: boolean;
  spoiler?: boolean;
}

export interface MetaBuildPreset {
  id: string;
  name: string;
  tagline: string;
  weapon1: string;
  weapon2: string;
  edge1: string;
  edge2: string;
  medicine1: string;
  medicine2: string;
  accessories: string[];
  synergySummary: string;
}

export type QuestType = 'missable' | 'side' | 'collectible';

export interface QuestStep {
  id: string;
  text: string;
}

export interface QuestTale {
  id: string;
  title: string;
  region: string;
  type: QuestType;
  missable: boolean;
  cutoffWarning?: string;
  summary: string;
  steps: QuestStep[];
  rewards: string;
  rewardEntities: EntityRef[];
  spoiler?: boolean;
}

export interface BanyanLocation {
  id: string;
  name: string;
  region: string;
  bossRematch: string;
  reward: string;
  notes: string;
}

export interface BossEntry {
  id: string;
  name: string;
  region: string;
  difficulty: string;
  rewards: string;
  rewardEntityIds?: string[];
  weakness: string;
  telegraphs: string[];
  tactics: string[];
  spoiler?: boolean;
}

export interface ChapterEntry {
  id: string;
  num: string;
  title: string;
  region: string;
  threat: string;
  summary: string;
  objectives: string[];
  missables: string;
  spoiler?: boolean;
  linkedEntityRefs?: EntityRef[];
}

export interface TelegraphEntry {
  id: 'blue' | 'red' | 'black' | 'standard';
  label: string;
  title: string;
  correctAction: 'parry' | 'dodge' | 'attack';
  verdict: string;
  avoid: string;
  reward: string;
}

export type FactionId =
  | 'the-order'
  | 'the-mandate'
  | 'bastion-of-mo'
  | 'lady-of-the-veil'
  | 'independent';

export interface FactionInfo {
  id: FactionId;
  name: string;
  shortName: string;
  accent: 'crimson' | 'gold' | 'violet' | 'azure' | 'jade';
  agenda: string;
  strongholds: string;
  spoilerAgenda: string;
}

export interface TimelineBeat {
  id: string;
  actNumber: string;
  actTitle: string;
  region: string;
  chapters: string;
  themeTag: string;
  summary: string;
  spoilerDetails: string;
  keyConflicts?: {
    factionId: FactionId;
    factionLabel: string;
    moves: string;
  }[];
  linkedEntities: EntityRef[];
}

export interface SideStoryLoreCard {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  chapterRef: string;
  teaser: string;
  fullTruth: string;
  keyDetails: { label: string; value: string }[];
  tragicOutcome: string;
  linkedEntities: EntityRef[];
}

export interface CharacterDossier {
  id: string;
  name: string;
  epithet: string;
  factionId: FactionId;
  factionLabel: string;
  status: string;
  region: string;
  publicRole: string;
  bloodline: string;
  trueMotives: string;
  spoilerBio: boolean;
  linkedBosses: EntityRef[];
  linkedGear: EntityRef[];
}

export interface EndingPrerequisite {
  id: string;
  title: string;
  region: string;
  cutoff: string;
  detail: string;
  requiredFor: ('standard' | 'bad' | 'true' | 'ngplus')[];
  linkedEntities?: EntityRef[];
}

export interface EndingRoute {
  id: 'standard' | 'bad' | 'true' | 'ngplus';
  badge: string;
  title: string;
  subtitle: string;
  accent: 'bone' | 'crimson' | 'gold' | 'violet';
  spoilerSafeTeaser: string;
  fullSummary: string;
  howToTrigger: string[];
  finalShowdown: string;
  unlocks: string;
  requirementIds: string[];
  linkedEntities: EntityRef[];
}

export interface WorldRegionNode {
  id: string;
  chapterId: string;
  orderIndex: number;
  chapterLabel: string;
  name: string;
  hanzi: string;
  subtitle: string;
  levelBand: string;
  threat: string;
  bellsCount: number;
  /** Normalized SVG coordinates on 1200x680 viewBox */
  x: number;
  y: number;
  isOptionalBranch?: boolean;
  isPointOfNoReturn?: boolean;
  spoiler?: boolean;
  image: string;
  atmosphere: string;
  storySummary: string;
  spoilerSecret: string;
  cutoffAlert?: string;
  keyLandmarks: string[];
  connectedTo: string[];
  bossIds: string[];
  weaponIds: string[];
  edgeIds: string[];
  accessoryIds: string[];
  questIds: string[];
}

export type BloodlineRelationType = 'blood' | 'adopted' | 'betrayal' | 'oath' | 'purge';

export interface BloodlineClan {
  id: string;
  name: string;
  hanzi: string;
  accent: 'crimson' | 'gold' | 'azure' | 'violet' | 'jade';
  status: string;
  ancestralSeat: string;
  shaChiTrait: string;
  publicHistory: string;
  hiddenTruth: string;
  spoilerTruth: boolean;
  keyRelics: EntityRef[];
  memberIds: string[];
}

export interface BloodlineRelation {
  id: string;
  fromId: string;
  toId: string;
  type: BloodlineRelationType;
  label: string;
  spoilerOnly?: boolean;
}

export interface GallerySlide {
  id: string;
  title: string;
  subtitle: string;
  category: 'World' | 'Combat' | 'Boss' | 'Arsenal';
  image: string;
  caption: string;
  linkedEntity?: EntityRef;
}

export interface SavedBuildState {
  weapon1: string;
  weapon2: string;
  edge1: string;
  edge2: string;
  accessories: string[];
  polished: boolean;
}

export interface PersistedProgress {
  spoilerShield: boolean;
  completedRegions: string[];
  ownedWeapons: string[];
  ownedEdges: string[];
  ownedAccessories: string[];
  completedQuestSteps: string[];
  checkedEndingReqs: string[];
  defeatedBosses: string[];
  savedBuild: SavedBuildState;
}
