import type { BloodlineClan, BloodlineRelation } from '../types/codex';

export const BLOODLINE_CLANS: BloodlineClan[] = [
  {
    id: 'bastion-of-mo',
    name: 'Bastion of Mó',
    hanzi: '墨堡血脈',
    accent: 'azure',
    status: 'Shattered Stronghold • Surviving Heirs in Shadow',
    ancestralSeat: 'Bastion of Mó Ruins & Maskwalker Shrines',
    shaChiTrait: 'Artifice-Forged Sha-Chi & Gilded Mask Parry Mastery',
    publicHistory:
      'Once one of the two supreme pillars of ancient Wulin, famed for fusing unorthodox martial arts with lethal clockwork artifice. Destroyed decades ago during The Order’s rise.',
    hiddenTruth:
      'Mu Tianmiao allied with the Lóng Clan to raze the Bastion of Mó, imprisoned patriarch Mó Yuan (the Gold-Masked One), and secretly adopted Mó Yuan’s infant son—Soul—raising him as The Order’s deadliest assassin.',
    spoilerTruth: true,
    keyRelics: [
      { kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' },
      { kind: 'accessory', id: 'nuo-mask', label: 'Nuo Mask (4 Fragments)' },
      { kind: 'weapon', id: 'sanguine', label: 'Sanguine → Infernal Rouge' },
    ],
    memberIds: ['mo-yuan', 'soul'],
  },
  {
    id: 'long-clan',
    name: 'The Lóng Clan',
    hanzi: '龍氏血脈',
    accent: 'gold',
    status: 'Purged Ancient Dynasty • Reclaimed by Usurpation',
    ancestralSeat: 'Five Lóng Pillars & Ancient Sovereign Vaults',
    shaChiTrait: 'Sovereign Lóng Blood — Suppresses Berserk Sha-Chi & Zhuo Erosion',
    publicHistory:
      'An ancient aristocratic martial lineage revered for its innate resistance to Sha-Chi corruption. Vanished mysteriously shortly after the fall of the Bastion of Mó.',
    hiddenTruth:
      'After using the Lóng Clan to destroy the Bastion of Mó, Mu Tianmiao betrayed and eradicated the Lóng Clan too—taking in the lone surviving boy, Zuo Shang. Discovering this betrayal drove Zuo Shang to seize The Order and pursue "The True Lóng" apotheosis.',
    spoilerTruth: true,
    keyRelics: [
      { kind: 'weapon', id: 'aureate', label: 'Aureate (True Lóng Blade)' },
      { kind: 'edge', id: 'you-loongs-deluge', label: "You Loong's Deluge" },
    ],
    memberIds: ['zuo-shang'],
  },
  {
    id: 'mu-order',
    name: 'Mu Lineage & The Order',
    hanzi: '組織 · 沐氏',
    accent: 'crimson',
    status: 'Usurped Shadow Tribunal • Fractured Succession',
    ancestralSeat: 'The Order Inner Sanctum & Mirage Estate',
    shaChiTrait: 'Shadow Edict Illusions & Lethal Assassin Choreography',
    publicHistory:
      'Founded by Shadow Sovereign Mu Tianmiao to police Wulin from the shadows via elite Shadow Wardens and illusionist Shadow Edicts.',
    hiddenTruth:
      'The Order’s golden trio—Mu Xiaokui (biological daughter), Soul (Mó heir), and Zuo Shang (Lóng heir)—was a gilded cage built on their parents’ ashes. After Mu Tianmiao’s assassination, Zuo Shang dispatched Inanis to erase Mu Xiaokui’s childhood memories and sent Lei Dang to silence Soul.',
    spoilerTruth: true,
    keyRelics: [
      { kind: 'weapon', id: 'wild-oriole', label: 'Wild Oriole Sword' },
      { kind: 'edge', id: 'radiant-fan', label: "Inanis' Radiant Fan" },
      { kind: 'edge', id: 'tiger-cannon', label: 'Tiger Cannon' },
    ],
    memberIds: ['mu-tianmiao', 'mu-xiaokui', 'inanis', 'lei-dang'],
  },
  {
    id: 'kunlun-mandate',
    name: 'Three Pillars of Kunlun',
    hanzi: '崑崙三柱 · 天命',
    accent: 'gold',
    status: 'Corrupted Orthodoxy • Internal Betrayal',
    ancestralSeat: 'Mandate Encampment & Mountain of Imprisonment',
    shaChiTrait: 'Orthodox Internal Qi Twisted into Mechanical Transcension',
    publicHistory:
      'The lawful martial confederation of The Mandate, historically upheld by three revered Kunlun grandmasters: Huangxing, Yuyin, and Moji.',
    hiddenTruth:
      'Obsessed with mechanical immortality ("Perfected Transcension"), Huangxing murdered fellow Pillar Yuyin and sealed Moji alive inside a clay statue atop the Mountain of Imprisonment.',
    spoilerTruth: true,
    keyRelics: [
      { kind: 'weapon', id: 'ink-cut', label: 'Ink Cut (Yuyin’s Counter Blade)' },
      { kind: 'edge', id: 'flying-guillotine', label: 'Flying Guillotine' },
      { kind: 'accessory', id: 'twin-fish-pendant', label: 'Twin Fish Pendant' },
    ],
    memberIds: ['huangxing'],
  },
  {
    id: 'veil-eleven',
    name: 'Lady of the Veil & The Eleven',
    hanzi: '面紗夫人 · 十一',
    accent: 'violet',
    status: 'Active Occult Threat • Blight & Puppetry',
    ancestralSeat: 'Village of Lu & Meigu Lake (The Discordance)',
    shaChiTrait: 'Thread-Binding Puppetry & Blight Symbiosis',
    publicHistory:
      'A shadowy esoteric cult expanding across the riverlands, converting devastated settlements into silent puppet strongholds.',
    hiddenTruth:
      'Former prodigy Meng Hua of The Eleven willingly merged with the Blight inside Meigu Lake’s Discordance, while Leng Tu (The Herald) harvests Crystal Puppet Eyes from Village of Lu to fuel the Lady’s ritual.',
    spoilerTruth: true,
    keyRelics: [
      { kind: 'weapon', id: 'the-ladys-fan', label: "The Lady's Fan" },
      { kind: 'edge', id: 'heartrend-pipa', label: 'Heartrend → Illusory Pipa' },
      { kind: 'edge', id: 'puppeteers-bell', label: "Puppeteer's Bell" },
    ],
    memberIds: ['meng-hua', 'leng-tu'],
  },
  {
    id: 'craftswomen-independent',
    name: 'Craftswomen Sisters & Free Brokers',
    hanzi: '無門工匠',
    accent: 'jade',
    status: 'Unaligned Survivors • Soul’s Decisive Edge',
    ancestralSeat: 'Village of Lu (Jewel), Pangzhen (Myst), Crimson Forest (Zhang)',
    shaChiTrait: 'Soul Tempering Metallurgy & Charm Polishing Arts',
    publicHistory:
      'Independent master artisans and relic brokers who survive between the warring bloodlines without pledging fealty to Order or Mandate.',
    hiddenTruth:
      'Myst and Jewel safeguard lost Bastion-era metallurgical craft. Together with Quick Hand Zhang’s contraband manuals, their Soul Tempering and Polishing are the only reason Soul’s 66-day body can rival "The True Lóng."',
    spoilerTruth: false,
    keyRelics: [
      { kind: 'edge', id: 'flying-dagger', label: 'Flying Dagger' },
      { kind: 'accessory', id: 'reflex-device', label: 'Reflex Device (+25%)' },
      { kind: 'weapon', id: 'seamless-death', label: 'Seamless Death' },
    ],
    memberIds: ['myst', 'jewel', 'quick-hand-zhang'],
  },
];

export const BLOODLINE_RELATIONS: BloodlineRelation[] = [
  {
    id: 'rel-mo-soul',
    fromId: 'mo-yuan',
    toId: 'soul',
    type: 'blood',
    label: 'Biological Father & Son (Bastion of Mó)',
    spoilerOnly: true,
  },
  {
    id: 'rel-mu-xiaokui',
    fromId: 'mu-tianmiao',
    toId: 'mu-xiaokui',
    type: 'blood',
    label: 'Biological Father & Daughter',
  },
  {
    id: 'rel-mu-adopt-soul',
    fromId: 'mu-tianmiao',
    toId: 'soul',
    type: 'adopted',
    label: 'Adopted Orphan After Bastion Purge',
    spoilerOnly: true,
  },
  {
    id: 'rel-mu-adopt-zuo',
    fromId: 'mu-tianmiao',
    toId: 'zuo-shang',
    type: 'adopted',
    label: 'Adopted Survivor of Lóng Clan',
    spoilerOnly: true,
  },
  {
    id: 'rel-mu-purge-mo',
    fromId: 'mu-tianmiao',
    toId: 'mo-yuan',
    type: 'purge',
    label: 'Destroyed Bastion & Imprisoned Mó Yuan',
    spoilerOnly: true,
  },
  {
    id: 'rel-zuo-betray-soul',
    fromId: 'zuo-shang',
    toId: 'soul',
    type: 'betrayal',
    label: 'Framed for Murder • Sworn Brothers Turned Rivals',
  },
  {
    id: 'rel-zuo-inanis',
    fromId: 'zuo-shang',
    toId: 'inanis',
    type: 'oath',
    label: 'Ordered Memory Erasure of Mu Xiaokui',
    spoilerOnly: true,
  },
  {
    id: 'rel-zuo-leidang',
    fromId: 'zuo-shang',
    toId: 'lei-dang',
    type: 'oath',
    label: 'Dispatched Shadow Warden to Hunt Soul',
  },
  {
    id: 'rel-soul-xiaokui',
    fromId: 'soul',
    toId: 'mu-xiaokui',
    type: 'oath',
    label: 'Childhood Bond • 5 Crimson Ribbons Anchor',
  },
  {
    id: 'rel-myst-jewel',
    fromId: 'myst',
    toId: 'jewel',
    type: 'blood',
    label: 'Elder & Younger Craftswomen Sisters',
  },
  {
    id: 'rel-meng-leng',
    fromId: 'meng-hua',
    toId: 'leng-tu',
    type: 'oath',
    label: 'Lady of the Veil Blight & Puppet Ritual',
    spoilerOnly: true,
  },
];
