import type {
  CharacterDossier,
  EndingPrerequisite,
  EndingRoute,
  FactionInfo,
  SideStoryLoreCard,
  TimelineBeat,
} from '../types/codex';

export const FACTIONS: FactionInfo[] = [
  {
    id: 'the-order',
    name: 'The Order',
    shortName: 'The Order',
    accent: 'crimson',
    agenda: 'Wulin’s supreme shadow tribunal enforcing covert balance through elite Shadow Wardens and Shadow Edicts.',
    strongholds: 'The Order Inner Sanctum, Mirage Estate, Mount Soulrend',
    spoilerAgenda: 'Following Mu Tianmiao’s murder, Zuo Shang seizes the Shadow Sovereign mantle and unleashes Shadow Wardens (Lei Dang, Cavalrybane, Soulclaimer) and illusionist Edicts (Inanis) to purge dissent and claim the True Lóng legacy.',
  },
  {
    id: 'the-mandate',
    name: 'The Mandate / Pillars of Kunlun',
    shortName: 'The Mandate',
    accent: 'gold',
    agenda: 'An orthodox martial confederation guided by the Three Pillars of Kunlun, nominally upholding Wulin law.',
    strongholds: 'Mandate Encampment, Mountain of Imprisonment',
    spoilerAgenda: 'Rotten from within: Huangxing hijacks Kunlun’s doctrine to force "Perfected Transcension," murdering fellow Pillar Yuyin and sealing Moji alive inside a clay statue to harvest forbidden Sha-Chi.',
  },
  {
    id: 'bastion-of-mo',
    name: 'Bastion of Mó & Maskwalkers',
    shortName: 'Bastion of Mó',
    accent: 'azure',
    agenda: 'A vanished martial-artifice stronghold whose surviving Maskwalkers haunt Wulin’s fringes in gilded masks.',
    strongholds: 'Weeping Creek Valley Ruins, Hidden Maskwalker Shrines',
    spoilerAgenda: 'Destroyed years ago by Mu Tianmiao alongside the Lóng Clan. Its captured patriarch, Mó Yuan (the Gold-Masked One), is Soul’s biological father—silently guiding Soul from the shadows to break The Order’s cycle.',
  },
  {
    id: 'lady-of-the-veil',
    name: 'Lady of the Veil & Thread-Binding Sect',
    shortName: 'Lady of the Veil',
    accent: 'violet',
    agenda: 'An esoteric cult of puppeteers and Blight-wielders manipulating grieving townsfolk across the riverlands.',
    strongholds: 'Village of Lu, The Lady’s Shrine, Meigu Lake (The Discordance)',
    spoilerAgenda: 'Meng Hua of The Eleven fused with the Blight within the Discordance, while Leng Tu (The Herald) converts entire settlements like Village of Lu into living marionettes.',
  },
  {
    id: 'independent',
    name: 'Independent / Craftswomen Sisters',
    shortName: 'Independent',
    accent: 'jade',
    agenda: 'Wandering master artisans, informants, and rogue blades who survive outside the grand factions’ blood feuds.',
    strongholds: 'Village of Lu (Jewel), Pangzhen (Myst), Crimson Forest (Quick Hand Zhang)',
    spoilerAgenda: 'Though unaligned, Myst’s Soul Tempering, Jewel’s Accessory Polishing, and Quick Hand Zhang’s stashes are the decisive edge that allow Soul to survive his 66-day curse.',
  },
];

export const STORY_TIMELINE: TimelineBeat[] = [
  {
    id: 'act-1-curse',
    actNumber: 'Act I',
    actTitle: 'Premise & The 66-Day Curse',
    region: 'The Order Inner Sanctum → Weeping Creek Valley',
    chapters: 'Prologue – Chapter 1',
    themeTag: 'Betrayal & Borrowed Time',
    summary:
      'Soul, an elite Shadow Warden of The Order, is framed for assassinating Shadow Sovereign Mu Tianmiao. Hunted and mortally wounded by his sworn brother Zuo Shang, Soul is pulled from death’s threshold by a mysterious Flesh Sculptor using a forbidden temporary cure—leaving him exactly 66 days before his body fails.',
    spoilerDetails:
      'The assassination of Mu Tianmiao was orchestrated to shatter The Order’s succession and pin the blood debt on Soul. The Flesh Sculptor’s artificial heart replacement stabilizes Soul’s berserk Sha-Chi only briefly, forcing him to carve through Wulin’s provinces before his vessel collapses.',
    linkedEntities: [
      { kind: 'character', id: 'soul', label: 'Soul' },
      { kind: 'character', id: 'zuo-shang', label: 'Zuo Shang' },
      { kind: 'character', id: 'mu-tianmiao', label: 'Mu Tianmiao' },
      { kind: 'weapon', id: 'sanguine', label: 'Sanguine' },
      { kind: 'medicine', id: 'healing-gourd', label: 'Healing Gourd' },
    ],
  },
  {
    id: 'act-2-bloodlines',
    actNumber: 'Act II',
    actTitle: 'Hidden Bloodlines & Childhood Roots',
    region: 'Weeping Creek Valley → Crimson Forest → Village of Lu',
    chapters: 'Chapters 1 – 3',
    themeTag: 'Shattered Clans & Adopted Heirs',
    summary:
      'Fragments recovered from Weeping Creek Valley and Village of Lu expose the dark origin of Soul’s brotherhood. Years before the coup, Mu Tianmiao wiped out both the Bastion of Mó and the Lóng Clan—rebuilding The Order’s next generation from the orphans of his conquest.',
    spoilerDetails:
      'Mu Tianmiao captured Bastion of Mó patriarch Mó Yuan (later known as the Gold-Masked One) and adopted his infant son Soul, raising him side-by-side with Zuo Shang (last descendant of the Lóng Clan) and Mu Tianmiao’s own biological daughter, Mu Xiaokui. What Soul believed was a sworn brotherhood was actually a gilded cage built atop his parents’ ashes.',
    linkedEntities: [
      { kind: 'character', id: 'mo-yuan', label: 'Mó Yuan / Gold-Masked One' },
      { kind: 'character', id: 'mu-xiaokui', label: 'Mu Xiaokui' },
      { kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' },
      { kind: 'accessory', id: 'reflex-device', label: 'Reflex Device' },
    ],
  },
  {
    id: 'act-3-conspiracy',
    actNumber: 'Act III',
    actTitle: 'The Wulin Conspiracy (Three-Way War)',
    region: 'Pangzhen → Mandate Encampment → Mountain of Imprisonment → Meigu Lake',
    chapters: 'Chapters 4 – 8',
    themeTag: 'Three-Way Faction Collision',
    summary:
      'As Soul pushes deeper into Pangzhen, the Mountain of Imprisonment, and Meigu Lake, the framing reveals itself as one front in a three-way war tearing Wulin apart.',
    spoilerDetails:
      'Every major power is racing to weaponize forbidden Sha-Chi and Blight artifice while erasing witnesses to the Bastion of Mó purge. Soul must survive assassins from his own Order, corrupted Kunlun elders, and the Lady of the Veil’s puppeteers.',
    keyConflicts: [
      {
        factionId: 'the-order',
        factionLabel: 'The Order (Zuo Shang’s Usurpation)',
        moves:
          'Zuo Shang seizes the Shadow Sovereign mantle and dispatches elite Shadow Wardens—Lei Dang, Cavalrybane, and Soulclaimer—to hunt Soul down and seal the truth of Mu Tianmiao’s death.',
      },
      {
        factionId: 'the-mandate',
        factionLabel: 'The Mandate & Three Pillars of Kunlun',
        moves:
          'Huangxing betrays the Three Pillars to force "Perfected Transcension," murdering Yuyin outright and sealing Moji alive inside a clay statue atop the Mountain of Imprisonment.',
      },
      {
        factionId: 'lady-of-the-veil',
        factionLabel: 'Followers of the Lady of the Veil',
        moves:
          'Meng Hua of The Eleven merges with the Blight inside the Discordance at Meigu Lake, while Leng Tu (The Herald) binds Village of Lu into living puppets.',
      },
    ],
    linkedEntities: [
      { kind: 'boss', id: 'huangxing', label: 'Huangxing' },
      { kind: 'boss', id: 'meng-hua', label: 'Meng Hua' },
      { kind: 'boss', id: 'leng-tu', label: 'Leng Tu, The Herald' },
      { kind: 'weapon', id: 'ink-cut', label: 'Ink Cut' },
      { kind: 'edge', id: 'flying-guillotine', label: 'Flying Guillotine' },
    ],
  },
  {
    id: 'act-4-reckoning',
    actNumber: 'Act IV',
    actTitle: 'Mirage Estate & Mount Soulrend Reckoning',
    region: 'Mirage Estate → Mount Soulrend',
    chapters: 'Chapters 9 – 12',
    themeTag: 'Point of No Return & True Lóng',
    summary:
      'Crossing Mirage Estate’s illusionary halls brings Soul face-to-face with the Order’s final guardians—Inanis & The Chord and Warden Lei Dang—before the Last Chance Bell seals the path to Mount Soulrend.',
    spoilerDetails:
      'With only days remaining on his 66-day cure, Soul confronts Zuo Shang atop Mount Soulrend. If Soul uncovered every buried bloodline secret—including Mu Xiaokui’s 5 Ribbons, the 4 Nuo Masks, both Crystal Puppet Eyes, and the Five Lóng Pillars—the duel ascends into "The True Lóng" showdown, unlocking the golden blade Aureate.',
    linkedEntities: [
      { kind: 'boss', id: 'inanis', label: 'Inanis & The Chord' },
      { kind: 'boss', id: 'lei-dang', label: 'Lei Dang' },
      { kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang' },
      { kind: 'weapon', id: 'aureate', label: 'Aureate' },
    ],
  },
];

export const SIDE_STORY_LORE_CARDS: SideStoryLoreCard[] = [
  {
    id: 'lore-peng-meng-four-axes',
    title: 'Peng Meng & The Four Fierce Axes Case',
    subtitle: 'Chapter 1 Side-Story • Weeping Creek Valley',
    region: 'Weeping Creek Valley',
    chapterRef: 'Chapter 1',
    teaser:
      'Four sworn axe-bearers uncovered a covert Order shipment tied to the Bastion of Mó purge—and paid for it with their sanity.',
    fullTruth:
      'Order agents framed the Four Fierce Axes for banditry and poisoned their iron-forging kiln with raw Sha-Chi fumes. Three brothers perished in the kiln; Peng Meng survived only as a berserk sentinel chained to the valley gates.',
    keyDetails: [
      { label: 'Key Figures', value: 'Peng Meng & the Three Fallen Axe Brothers' },
      { label: 'Hidden Clue', value: '5 Chronicle Volumes (grab Book 5 before Bai Chilian)' },
      { label: 'Loot & Impact', value: 'Dread Axe + Blood Oath Dagger material' },
    ],
    tragicOutcome:
      'Defeating Peng Meng ends his agonizing vigil and hands Soul the Dread Axe needed to smash the valley’s iron-chained tombs.',
    linkedEntities: [
      { kind: 'boss', id: 'peng-meng', label: 'Peng Meng, the Axemaster' },
      { kind: 'edge', id: 'dread-axe', label: 'Dread Axe' },
      { kind: 'quest', id: 'four-fierce-axes', label: 'Four Fierce Axes Quest' },
    ],
  },
  {
    id: 'lore-ch2-yuer-flesh-lily',
    title: "Yu'er, the Flesh Lily & The Poisoned Maple Grove",
    subtitle: 'Chapter 2 Side-Story • Crimson Forest',
    region: 'Crimson Forest',
    chapterRef: 'Chapter 2',
    teaser:
      'Beneath Crimson Manor’s red maple canopy, apprentice healer Yu’er discovers that the forest’s plague is not natural disease, but engineered Blight.',
    fullTruth:
      'Toxic cellars beneath Crimson Forest were early Thread-Binding Sect testing grounds feeding on slain disciples. Bringing Yu’er a blooming Flesh Lily before Bai Chilian falls reveals the exact crimson pollen spreading toward Village of Lu.',
    keyDetails: [
      { label: 'Key Figures', value: "Yu'er (Apprentice Healer) & Lanlan" },
      { label: 'Cutoff Trigger', value: 'Deliver Flesh Lily & Clearstream Herbs before Bai Chilian / Jing Ye' },
      { label: 'Loot & Impact', value: 'Medicine Case, Calming Gourd & Blessed Jade Pendant' },
    ],
    tragicOutcome:
      'Yu’er saves the surviving refugees, though the poisoned manor’s disciples are already lost to the Blight.',
    linkedEntities: [
      { kind: 'boss', id: 'bai-chilian', label: 'Bai Chilian' },
      { kind: 'accessory', id: 'medicine-case', label: 'Medicine Case' },
      { kind: 'accessory', id: 'blessed-jade-pendant', label: 'Blessed Jade Pendant' },
    ],
  },
  {
    id: 'lore-hua-puppet-bride',
    title: 'Hua — The Puppet Bride of the Flesh Lilies',
    subtitle: 'Chapter 3 Side-Story • Village of Lu',
    region: 'Village of Lu',
    chapterRef: 'Chapter 3',
    teaser:
      'In a bridal courtyard draped in faded wedding silk, Hua waits endlessly for her groom Hui—feeding crimson Flesh Lilies that drink from his grave.',
    fullTruth:
      'Leng Tu’s Thread-Binding rituals froze Hua’s mind on her wedding eve after Hui was killed resisting the puppet takeover. Trapped in a marionette loop, she tends the Flesh Lilies believing they keep her groom alive.',
    keyDetails: [
      { label: 'Key Figures', value: 'Hua (Puppet Bride), Hui & Leng Tu (The Herald)' },
      { label: 'Hidden Clue', value: 'Deliver Hui’s final keepsake to break the thread trance' },
      { label: 'Loot & Impact', value: 'Crystal Puppet Eye trail + Rouge Box' },
    ],
    tragicOutcome:
      'Hua regains a single lucid moment to grieve Hui before her puppet threads snap forever.',
    linkedEntities: [
      { kind: 'boss', id: 'leng-tu', label: 'Leng Tu, The Herald' },
      { kind: 'character', id: 'leng-tu', label: 'Leng Tu Dossier' },
      { kind: 'quest', id: 'young-mistress', label: 'Young Mistress Quest' },
    ],
  },
  {
    id: 'lore-ch4-pangzhen-laments',
    title: 'Flame, Dahuang & The Dream of Motherhood',
    subtitle: 'Chapter 4 Side-Story • Pangzhen',
    region: 'Pangzhen',
    chapterRef: 'Chapter 4',
    teaser:
      'Three quiet tragedies haunt Pangzhen’s rain-slicked canals: a burned opera theatre, a grieving mother’s lullaby lantern, and a hound waiting by a grave.',
    fullTruth:
      'Lion Dance Grandmaster Flame torched his own theatre rather than let Order killers seize it. Meanwhile, a mother’s spirit guards an empty wooden cradle in the flooded tenements while yellow hound Dahuang refuses to leave his murdered master’s back-alley stash.',
    keyDetails: [
      { label: 'Key Figures', value: 'Flame (Grandmaster), Dahuang & the Canal Mother' },
      { label: 'Hidden Clue', value: 'Inspect the southern canal lullaby lantern & market Bell hound' },
      { label: 'Loot & Impact', value: "Flaming Mane, Mother's Talisman & Pigeon Feed catalyst" },
    ],
    tragicOutcome:
      'Laying Pangzhen’s restless spirits to peace reveals how deeply Wulin’s shadow war crushes ordinary townsfolk.',
    linkedEntities: [
      { kind: 'boss', id: 'flame', label: 'Flame (Lion Dance Grandmaster)' },
      { kind: 'edge', id: 'flaming-mane', label: 'Flaming Mane' },
      { kind: 'accessory', id: 'mothers-talisman', label: "Mother's Talisman" },
    ],
  },
  {
    id: 'lore-ch5-red-dark-sect',
    title: 'Red, Daughter of the Dark Sect & The Seven-Stars Oath',
    subtitle: 'Chapter 5 Side-Story • Mandate Encampment',
    region: 'Mandate Encampment',
    chapterRef: 'Chapter 5',
    teaser:
      'Atop the Dovecote tower above the Mandate’s war camp, Red awaits an Order assassin’s blade—never expecting mercy.',
    fullTruth:
      'Sworn to guard the Chief Disciple of the Seven-Stars Formation even after The Mandate decayed, Red prepares to die alone on the tower. Swinging past her on the chain spares her life, inspiring her honorable Phase 3 stand beside her master.',
    keyDetails: [
      { label: 'Key Figures', value: 'Red (Mysterious Swordswoman) & Chief Disciple' },
      { label: 'Cutoff Trigger', value: 'Swing across the Dovecote chain—DO NOT attack Red early' },
      { label: 'Loot & Impact', value: 'Twin Fish Pendant + Twin Heroes’ Memory Flower' },
    ],
    tragicOutcome:
      'Red falls with honor in Phase 3 rather than as a forgotten lookout, unlocking a mandatory True Ending condition.',
    linkedEntities: [
      { kind: 'boss', id: 'chief-disciple', label: 'Chief Disciple' },
      { kind: 'accessory', id: 'twin-fish-pendant', label: 'Twin Fish Pendant' },
      { kind: 'quest', id: 'daughter-dark-sect', label: 'Daughter of the Dark Sect' },
    ],
  },
  {
    id: 'lore-ch6-kunlun-pillars',
    title: 'Yuyin, Moji & Huangxing’s Perfected Transcension',
    subtitle: 'Chapter 6 Side-Story • Mountain of Imprisonment',
    region: 'Mountain of Imprisonment',
    chapterRef: 'Chapter 6',
    teaser:
      'The Three Pillars of Kunlun shattered from within when Huangxing traded orthodox vows for mechanical immortality.',
    fullTruth:
      'To force "Perfected Transcension," Huangxing murdered fellow Pillar Yuyin and sealed Moji alive inside a clay statue to harvest forbidden Sha-Chi. On the frozen cliff cages below, prisoner Zhou Pingzi and remorseful killer Bai Xue await judgment.',
    keyDetails: [
      { label: 'Key Figures', value: 'Huangxing, Yuyin (slain), Moji (sealed), Zhou Pingzi & Bai Xue' },
      { label: 'Cutoff Trigger', value: 'Free Zhou Pingzi before lift crank; tell Bai Xue sins are unabsolved' },
      { label: 'Loot & Impact', value: 'Ink Cut (boss counter), Flying Guillotine, Snow and Blood, Ultimate Talisman' },
    ],
    tragicOutcome:
      'Using Yuyin’s blade Ink Cut to fell Huangxing avenges Kunlun’s fallen Pillars and frees the prison’s last survivors.',
    linkedEntities: [
      { kind: 'boss', id: 'huangxing', label: 'Huangxing' },
      { kind: 'weapon', id: 'ink-cut', label: 'Ink Cut' },
      { kind: 'accessory', id: 'snow-and-blood', label: 'Snow and Blood' },
    ],
  },
  {
    id: 'lore-ch7-meng-hua-discordance',
    title: 'Meng Hua of The Eleven — Drowned in the Discordance',
    subtitle: 'Chapter 7 Side-Story • Meigu Lake',
    region: 'Meigu Lake',
    chapterRef: 'Chapter 7',
    teaser:
      'Beneath Meigu Lake’s mist barriers, a former prodigy of The Eleven surrendered her humanity to the Blight.',
    fullTruth:
      'Disgusted by The Order’s tyranny and The Mandate’s hypocrisy, Meng Hua merged directly with the Blight in service of the Lady of the Veil. Her shattered acoustic pipa—split into three pieces across Wulin—holds the last resonance of her human life.',
    keyDetails: [
      { label: 'Key Figures', value: 'Meng Hua of The Eleven & Followers of the Lady of the Veil' },
      { label: 'Hidden Clue', value: 'Collect 3 Pipa pieces to forge Illusory Pipa & dispel mist walls' },
      { label: 'Loot & Impact', value: "The Lady's Fan + Illusory Pipa evolution" },
    ],
    tragicOutcome:
      'Ending Meng Hua’s Blighted reign silences the Discordance and exposes the Lady of the Veil’s pact.',
    linkedEntities: [
      { kind: 'boss', id: 'meng-hua', label: 'Meng Hua' },
      { kind: 'weapon', id: 'the-ladys-fan', label: "The Lady's Fan" },
      { kind: 'edge', id: 'heartrend-pipa', label: 'Heartrend Pipa → Illusory Pipa' },
    ],
  },
  {
    id: 'lore-ch8-silenced-witnesses',
    title: 'Zhu Yuan, Commander Bi Feng & The Silenced Witnesses',
    subtitle: 'Chapter 8 Side-Story • Four Serpent Houses',
    region: 'Meigu Lake & Sub-Districts',
    chapterRef: 'Chapter 8',
    teaser:
      'Two veteran commanders vanished overnight after questioning Zuo Shang’s sudden rise to Shadow Sovereign.',
    fullTruth:
      'Zhu Yuan and Commander Bi Feng unearthed sealed dossiers proving Mu Tianmiao orchestrated both the Bastion of Mó and Lóng Clan purges. Refusing to bow to Zuo Shang’s cover-up, they sealed themselves behind the Five Lóng Pillars trials.',
    keyDetails: [
      { label: 'Key Figures', value: 'Zhu Yuan & Commander Bi Feng (Hidden Optional Bosses)' },
      { label: 'Cutoff Trigger', value: 'Defeat both hidden bosses & finish 5 Lóng Pillars before Mirage Estate' },
      { label: 'Loot & Impact', value: 'True Ending verification + endgame tempering catalysts' },
    ],
    tragicOutcome:
      'Both commanders die testing Soul’s resolve, entrusting him with the final proof of The Order’s original sin.',
    linkedEntities: [
      { kind: 'weapon', id: 'baishan-stormswords', label: 'Baishan Stormswords' },
      { kind: 'medicine', id: 'green-serpent', label: 'Green Serpent Brew' },
    ],
  },
  {
    id: 'lore-inanis-the-chord',
    title: 'Inanis & The Chord — Erased Childhood Memories',
    subtitle: 'Chapter 9 Side-Story • Mirage Estate',
    region: 'Mirage Estate',
    chapterRef: 'Chapter 9',
    teaser:
      'Where Shadow Wardens kill with steel, the illusionist Shadow Edicts—Inanis and The Chord—erase bloodlines with resonant silk.',
    fullTruth:
      'As keeper of The Order’s forbidden archives, Inanis was ordered by Zuo Shang to overwrite Mu Xiaokui’s childhood memories of Soul. Torn between duty to the Sovereign’s seal and guilt, Inanis hid the unedited truth inside Mirage Estate’s harmonic chambers.',
    keyDetails: [
      { label: 'Key Figures', value: 'Inanis, The Chord & Shadow Warden Lei Dang' },
      { label: 'Cutoff Trigger', value: 'Break The Chord & loot Quick Hand Zhang’s stash before Last Chance Bell' },
      { label: 'Loot & Impact', value: "Inanis' Radiant Fan, Seamless Death & Thundermoon Lantern" },
    ],
    tragicOutcome:
      'Silencing The Chord restores the encrypted archives right before the Last Chance Bell locks the world behind Soul.',
    linkedEntities: [
      { kind: 'character', id: 'inanis', label: 'Inanis Dossier' },
      { kind: 'boss', id: 'inanis', label: 'Inanis & The Chord' },
      { kind: 'edge', id: 'radiant-fan', label: "Inanis' Radiant Fan" },
    ],
  },
  {
    id: 'lore-ch10-mo-yuan-ashes',
    title: 'Mó Yuan’s Golden Mask & The Bastion of Mó Ashes',
    subtitle: 'Chapter 10 Side-Story • Mount Soulrend Ascent',
    region: 'Mount Soulrend',
    chapterRef: 'Chapter 10',
    teaser:
      'Behind the Gold-Masked One’s silent parry trials lies a father who survived twenty years in chains for one hope.',
    fullTruth:
      'After razing the Bastion of Mó, Mu Tianmiao spared infant Soul to forge him into an Order weapon while imprisoning patriarch Mó Yuan. Recovering all four Nuo Masks reveals Mó Yuan escaped captivity only to temper his son’s blade from the shadows.',
    keyDetails: [
      { label: 'Key Figures', value: 'Mó Yuan (Gold-Masked One) & Bastion of Mó Maskwalkers' },
      { label: 'Hidden Clue', value: '4 Nuo Masks (Sorrow, Wrath, Joy, Wraith) unlock full testimony' },
      { label: 'Loot & Impact', value: 'Counterstrike Bracers + Nuo Mask & Wraith Mask lore' },
    ],
    tragicOutcome:
      'Mó Yuan’s testimony transforms Soul’s climb up Mount Soulrend from blind vengeance into a fight to break The Order’s cycle.',
    linkedEntities: [
      { kind: 'character', id: 'mo-yuan', label: 'Mó Yuan / Gold-Masked One' },
      { kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' },
      { kind: 'accessory', id: 'nuo-mask', label: 'Nuo Mask' },
    ],
  },
  {
    id: 'lore-ch11-xiaokui-ribbons',
    title: 'Mu Xiaokui’s Five Ribbons & The Gilded Cage',
    subtitle: 'Chapter 11 Side-Story • Mount Soulrend Sanctum',
    region: 'Mount Soulrend',
    chapterRef: 'Chapter 11',
    teaser:
      'Five crimson silk ribbons hidden across Village of Lu were the only childhood truths Inanis’s illusions could not erase.',
    fullTruth:
      'Raised as Mu Tianmiao’s biological daughter beside two orphans whose clans her father annihilated, Mu Xiaokui watched Zuo Shang’s grief twist into ruthless ambition. Her five ribbons preserve the memory of who all three children were before the coup.',
    keyDetails: [
      { label: 'Key Figures', value: 'Mu Xiaokui & Shadow Sovereign Mu Tianmiao' },
      { label: 'Hidden Clue', value: 'Collect all 5 red ribbons before Mu Xiaokui’s Village of Lu duel' },
      { label: 'Loot & Impact', value: 'Fiend Saws + Wild Oriole Sword (pick up at dock after Phase 3)' },
    ],
    tragicOutcome:
      'Holding all five ribbons heals the rift between Soul and Mu Xiaokui at the threshold of the Sovereign’s hall.',
    linkedEntities: [
      { kind: 'character', id: 'mu-xiaokui', label: 'Mu Xiaokui' },
      { kind: 'character', id: 'mu-tianmiao', label: 'Mu Tianmiao' },
      { kind: 'weapon', id: 'wild-oriole', label: 'Wild Oriole Sword' },
    ],
  },
  {
    id: 'lore-ch12-true-long-summit',
    title: 'The Sixty-Sixth Dawn — "The True Lóng"',
    subtitle: 'Chapter 12 Side-Story • Mount Soulrend Summit',
    region: 'Mount Soulrend',
    chapterRef: 'Chapter 12',
    teaser:
      'On the final day of Soul’s borrowed life, two orphans of slaughtered clans clash beneath lightning atop Mount Soulrend.',
    fullTruth:
      'Zuo Shang believed only ruthless dominion as the True Lóng could avenge the Lóng Clan and prevent another massacre. Facing Soul armed with every bloodline secret forces Zuo Shang to shed the Shadow Sovereign mask for an unrestrained 3-phase Lóng climax.',
    keyDetails: [
      { label: 'Key Figures', value: 'Soul (Bastion of Mó) vs. Zuo Shang (Lóng Clan Heir)' },
      { label: 'Hidden Clue', value: 'All bloodline relics unlock the secret 3-phase "The True Lóng" duel' },
      { label: 'Loot & Impact', value: 'Aureate (Multi-Surge Golden Blade) & True Ending Epilogue' },
    ],
    tragicOutcome:
      'Defeating Zuo Shang breaks The Order’s shadow cycle and grants Soul peace at the end of his sixty-six days.',
    linkedEntities: [
      { kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang ("The True Lóng")' },
      { kind: 'weapon', id: 'aureate', label: 'Aureate' },
      { kind: 'character', id: 'soul', label: 'Soul' },
    ],
  },
];

export const CHARACTER_DOSSIERS: CharacterDossier[] = [
  {
    id: 'soul',
    name: 'Soul',
    epithet: 'The 66-Day Shadow Warden',
    factionId: 'bastion-of-mo',
    factionLabel: 'Bastion of Mó (Raised by The Order)',
    status: 'Protagonist • Cursed (66 Days)',
    region: 'All 9 Regions of Wulin',
    publicRole: 'Elite assassin of The Order framed for murdering Shadow Sovereign Mu Tianmiao.',
    bloodline: 'Biological son of Mó Yuan (Gold-Masked One), heir to the destroyed Bastion of Mó; adopted as an infant by Mu Tianmiao.',
    trueMotives: 'Uncover the truth behind Mu Tianmiao’s murder, protect Mu Xiaokui, and break the blood-feud cycle before his temporary cure expires.',
    spoilerBio: false,
    linkedBosses: [{ kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang ("The True Lóng")' }],
    linkedGear: [
      { kind: 'weapon', id: 'sanguine', label: 'Sanguine' },
      { kind: 'weapon', id: 'aureate', label: 'Aureate' },
    ],
  },
  {
    id: 'zuo-shang',
    name: 'Zuo Shang',
    epithet: 'Usurper Shadow Sovereign • "The True Lóng"',
    factionId: 'the-order',
    factionLabel: 'The Order (Lóng Clan Bloodline)',
    status: 'Primary Antagonist',
    region: 'The Order Inner Sanctum → Mount Soulrend',
    publicRole: 'Soul’s former sworn brother who struck him down and seized leadership of The Order.',
    bloodline: 'Surviving descendant of the Lóng Clan, taken in by Mu Tianmiao after the Lóng Clan’s destruction.',
    trueMotives: 'Believes only absolute, ruthless dominion as the True Lóng can avenge his shattered clan and unify Wulin—even if it means sacrificing Soul and purging The Order’s old guard.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang ("The True Lóng")' }],
    linkedGear: [{ kind: 'weapon', id: 'aureate', label: 'Aureate' }],
  },
  {
    id: 'mu-xiaokui',
    name: 'Mu Xiaokui',
    epithet: 'Daughter of the Shadow Sovereign',
    factionId: 'the-order',
    factionLabel: 'The Order',
    status: 'Key Story Ally • True Ending Anchor',
    region: 'Village of Lu → Mirage Estate → Mount Soulrend',
    publicRole: 'Sole biological daughter of Mu Tianmiao, raised alongside Soul and Zuo Shang.',
    bloodline: 'Direct biological heir of Shadow Sovereign Mu Tianmiao.',
    trueMotives: 'Refuses to accept Zuo Shang’s version of her father’s death; leaves 5 Ribbons across Village of Lu as breadcrumbs so Soul can piece together their shared childhood truth.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'inanis', label: 'Inanis & The Chord' }],
    linkedGear: [{ kind: 'accessory', id: 'lingran-pendant', label: "Lingran's Pendant" }],
  },
  {
    id: 'mu-tianmiao',
    name: 'Mu Tianmiao',
    epithet: 'Late Shadow Sovereign of The Order',
    factionId: 'the-order',
    factionLabel: 'The Order',
    status: 'Deceased (Inciting Murder)',
    region: 'The Order Inner Sanctum',
    publicRole: 'Architect of modern Wulin’s shadow balance whose assassination ignites the 66-day manhunt.',
    bloodline: 'Patriarch of the Mu lineage; biological father of Mu Xiaokui.',
    trueMotives: 'Destroyed both the Bastion of Mó and the Lóng Clan to monopolize Sha-Chi artifice, then adopted Soul and Zuo Shang to forge living weapons loyal only to The Order—a hubris that doomed him.',
    spoilerBio: true,
    linkedBosses: [],
    linkedGear: [{ kind: 'weapon', id: 'wild-oriole', label: 'Wild Oriole Sword' }],
  },
  {
    id: 'mo-yuan',
    name: 'Mó Yuan',
    epithet: 'The Gold-Masked One',
    factionId: 'bastion-of-mo',
    factionLabel: 'Bastion of Mó & Maskwalkers',
    status: 'Hidden Mentor • Maskwalker',
    region: 'Weeping Creek Valley → Mount Soulrend',
    publicRole: 'Enigmatic gilded-mask warrior testing Soul’s parry discipline in Weeping Creek Valley.',
    bloodline: 'Captured patriarch of the Bastion of Mó and biological father of Soul.',
    trueMotives: 'Having survived imprisonment after Mu Tianmiao’s purge, Mó Yuan watches from behind the Gold Mask to temper Soul’s blade—hoping his son chooses freedom rather than becoming another Shadow Sovereign.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang ("The True Lóng")' }],
    linkedGear: [{ kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' }],
  },
  {
    id: 'huangxing',
    name: 'Huangxing',
    epithet: 'The Kunlun Renegade',
    factionId: 'the-mandate',
    factionLabel: 'The Mandate / Pillars of Kunlun',
    status: 'Major Boss • Corrupt Pillar',
    region: 'Mountain of Imprisonment (Ch. 6)',
    publicRole: 'One of the legendary Three Pillars of Kunlun who turned the Mountain of Imprisonment into a slaughterhouse.',
    bloodline: 'Senior Kunlun orthodox lineage (self-severed via forbidden artifice).',
    trueMotives: 'Obsessed with achieving "Perfected Transcension," Huangxing murdered fellow Pillar Yuyin and sealed Moji alive inside a clay statue to fuse Kunlun martial arts with grotesque mechanical Sha-Chi.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'huangxing', label: 'Huangxing, the Kunlun Renegade' }],
    linkedGear: [
      { kind: 'weapon', id: 'ink-cut', label: 'Ink Cut (Counter)' },
      { kind: 'edge', id: 'flying-guillotine', label: 'Flying Guillotine' },
    ],
  },
  {
    id: 'meng-hua',
    name: 'Meng Hua',
    epithet: 'Of The Eleven • Vessel of the Discordance',
    factionId: 'lady-of-the-veil',
    factionLabel: 'Lady of the Veil & Thread-Binding Sect',
    status: 'Major Boss • Blight-Merged',
    region: 'Meigu Lake / The Discordance (Ch. 7–8)',
    publicRole: 'High-ranking operative of The Eleven operating beneath the misty waters of Meigu Lake.',
    bloodline: 'Former Wulin prodigy inducted into The Eleven before pledging herself to the Lady of the Veil.',
    trueMotives: 'Willingly merged with the Blight inside the Discordance to transcend mortal decay, seeking to drown The Order’s iron grip in an eternal Blighted tide.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'meng-hua', label: 'Meng Hua (Blighted Discordance)' }],
    linkedGear: [{ kind: 'medicine', id: 'green-serpent', label: 'Green Serpent Brew' }],
  },
  {
    id: 'leng-tu',
    name: 'Leng Tu',
    epithet: 'The Herald of Threads',
    factionId: 'lady-of-the-veil',
    factionLabel: 'Lady of the Veil & Thread-Binding Sect',
    status: 'Regional Boss • Puppeteer',
    region: 'Village of Lu (Ch. 3)',
    publicRole: 'Emissary of the Lady of the Veil overseeing the silent occupation of Village of Lu.',
    bloodline: 'Thread-Binding Sect master artisan.',
    trueMotives: 'Turns the grieving inhabitants of Village of Lu into obedient living puppets—creating an army of tireless marionettes and harvesting Crystal Puppet Eyes for the Lady’s grand ritual.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'leng-tu', label: 'Leng Tu, The Herald' }],
    linkedGear: [{ kind: 'weapon', id: 'white-serpent', label: 'White Serpent & Crimson Viper' }],
  },
  {
    id: 'inanis',
    name: 'Inanis',
    epithet: 'Shadow Edict of The Chord',
    factionId: 'the-order',
    factionLabel: 'The Order',
    status: 'Endgame Boss • Illusionist Edict',
    region: 'Mirage Estate (Ch. 9)',
    publicRole: 'Keeper of Mirage Estate and conductor of The Order’s illusionist Shadow Edicts.',
    bloodline: 'Raised within The Order’s covert Edict conservatory.',
    trueMotives: 'Torn between executing Zuo Shang’s decree to seal Mirage Estate’s memories and preserving Mu Tianmiao’s final encrypted archive for whoever proves worthy.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'inanis', label: 'Inanis & The Chord' }],
    linkedGear: [{ kind: 'edge', id: 'radiant-fan', label: "Inanis' Radiant Fan & Bashpole" }],
  },
  {
    id: 'lei-dang',
    name: 'Lei Dang',
    epithet: 'Thunderous Shadow Warden',
    factionId: 'the-order',
    factionLabel: 'The Order',
    status: 'Endgame Boss • Shadow Warden',
    region: 'Mirage Estate (Ch. 9)',
    publicRole: 'Loyalist Shadow Warden dispatched alongside Cavalrybane and Soulclaimer to terminate Soul.',
    bloodline: 'Order-forged vanguard raised under Shadow Warden iron discipline.',
    trueMotives: 'Views Zuo Shang as the only leader strong enough to prevent The Order’s collapse; stands as the final martial gatekeeper before the Last Chance Bell.',
    spoilerBio: true,
    linkedBosses: [{ kind: 'boss', id: 'lei-dang', label: 'Lei Dang, Order Shadow Warden' }],
    linkedGear: [{ kind: 'edge', id: 'tiger-cannon', label: 'Wolfjaw, Tiger Cannon & Parting Hooks' }],
  },
  {
    id: 'myst',
    name: 'Myst',
    epithet: 'Elder Craftswoman • Soul Temperer',
    factionId: 'independent',
    factionLabel: 'Independent / Craftswomen Sisters',
    status: 'Ally NPC • Endgame Forge',
    region: 'Pangzhen (Ch. 4+)',
    publicRole: 'Master weaponsmith hidden in Pangzhen’s labyrinthine alleys who unlocks Soul Tempering.',
    bloodline: 'Elder sister of the Craftswomen Sisters (sister to Jewel).',
    trueMotives: 'Preserves ancient Bastion-era metallurgical arts free from faction politics; awakens dormant Phantom Edges and Soul-Tempered blades for Soul.',
    spoilerBio: false,
    linkedBosses: [],
    linkedGear: [
      { kind: 'edge', id: 'radiant-fan', label: "Inanis' Radiant Fan & Bashpole" },
      { kind: 'weapon', id: 'wild-oriole', label: 'Wild Oriole Sword' },
    ],
  },
  {
    id: 'jewel',
    name: 'Jewel',
    epithet: 'Younger Craftswoman • Charm Polisher',
    factionId: 'independent',
    factionLabel: 'Independent / Craftswomen Sisters',
    status: 'Ally NPC • Accessory Polishing',
    region: 'Village of Lu (Ch. 3+)',
    publicRole: 'Artisan jeweler in Village of Lu who polishes accessories to their maximum stat percentages.',
    bloodline: 'Younger sister of the Craftswomen Sisters (sister to Myst).',
    trueMotives: 'Refuses to abandon Village of Lu’s survivors during Leng Tu’s puppet incursion; polishes Soul’s Reflex Device (+25%) and Counterstrike Bracers (+30%) to keep him alive.',
    spoilerBio: false,
    linkedBosses: [],
    linkedGear: [
      { kind: 'accessory', id: 'reflex-device', label: 'Reflex Device' },
      { kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' },
    ],
  },
  {
    id: 'quick-hand-zhang',
    name: 'Quick Hand Zhang',
    epithet: 'Wulin’s Fastest Relic Broker',
    factionId: 'independent',
    factionLabel: 'Independent / Craftswomen Sisters',
    status: 'Ally NPC • Questline & Stashes',
    region: 'Crimson Forest (Ch. 2) → Pangzhen → Mirage Estate (Ch. 9)',
    publicRole: 'Eccentric treasure hunter rescued in Crimson Forest who rewards Soul with ranged tools and hidden manuals.',
    bloodline: 'Self-made rogue courier with ties to Wulin’s black-market network.',
    trueMotives: 'Outsmarts both The Order and The Mandate by stashing forbidden manuals across every province—gifting Soul the Flying Dagger and late-game Seamless Death Soul Temper.',
    spoilerBio: false,
    linkedBosses: [],
    linkedGear: [
      { kind: 'edge', id: 'flying-dagger', label: 'Flying Dagger' },
      { kind: 'accessory', id: 'quick-hand-pendant', label: 'Quick Hand Pendant' },
      { kind: 'accessory', id: 'quick-hand-pair', label: 'Quick Hand Pair' },
      { kind: 'accessory', id: 'quick-hand-might', label: 'Quick Hand Might' },
    ],
  },
];

export const ENDING_PREREQUISITES: EndingPrerequisite[] = [
  {
    id: 'req-ribbons',
    title: "Collect Mu Xiaokui's 5 Ribbons in Village of Lu",
    region: 'Village of Lu (Ch. 3)',
    cutoff: 'Before Mirage Estate Last Chance Bell',
    detail:
      'Locate all 5 crimson silk ribbons left by Mu Xiaokui across Village of Lu rooftops, tunnels, and shrines to restore the childhood bloodline truth.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'character', id: 'mu-xiaokui', label: 'Mu Xiaokui' }],
  },
  {
    id: 'req-purple-tales',
    title: 'Complete All Purple-Icon Side Tales',
    region: 'Mandate Encampment (Ch. 5) & Meigu Lake (Ch. 7–8)',
    cutoff: 'Before Mirage Estate Last Chance Bell',
    detail:
      'Finish Ch. 5 "Hero or Heretic" and Ch. 7–8 "Secrets at the Heart of the Lake" to uncover both the Kunlun conspiracy and Meng Hua’s Blight pact.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'boss', id: 'meng-hua', label: 'Meng Hua' }],
  },
  {
    id: 'req-spare-red',
    title: 'Spare Red on the Dovecote Tower',
    region: 'Mandate Encampment (Ch. 5)',
    cutoff: 'BEFORE entering Chief Disciple arena',
    detail:
      'Climb the Dovecote tower prior to fighting Chief Disciple and choose to SPARE Red so she returns in Phase 3 and drops the Twin Heroes’ Memory Flower.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'boss', id: 'chief-disciple', label: 'Chief Disciple' }],
  },
  {
    id: 'req-nuo-masks',
    title: 'Collect All 4 Nuo Masks (Sorrow, Wrath, Joy, Wraith)',
    region: 'Pangzhen (Ch. 4) & Mirage Estate (Ch. 9)',
    cutoff: 'Before Mount Soulrend',
    detail:
      'Recover all four Bastion of Mó / Maskwalker Nuo Masks to unlock Mó Yuan’s final testimony.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'character', id: 'mo-yuan', label: 'Mó Yuan / Gold-Masked One' }],
  },
  {
    id: 'req-puppet-eyes',
    title: 'Obtain Both Crystal Puppet Eyes',
    region: 'Village of Lu (Ch. 3) & Riverland Side Quests',
    cutoff: 'Before Mirage Estate Last Chance Bell',
    detail:
      'Complete Hua’s puppet-bride investigation and Leng Tu’s Thread-Binding trail to secure both Crystal Puppet Eyes.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'boss', id: 'leng-tu', label: 'Leng Tu, The Herald' }],
  },
  {
    id: 'req-long-pillars',
    title: 'Clear All Five Lóng Pillars Trials',
    region: 'Across Wulin Provinces (Ch. 1–8)',
    cutoff: 'Before Mount Soulrend',
    detail:
      'Complete all five Lóng Clan combat/shrine trials to expose Zuo Shang’s true lineage and awaken the Aureate resonance.',
    requiredFor: ['true'],
    linkedEntities: [{ kind: 'weapon', id: 'aureate', label: 'Aureate' }],
  },
  {
    id: 'req-hidden-bosses',
    title: 'Defeat Hidden Bosses Zhu Yuan & Commander Bi Feng',
    region: 'Meigu Lake & Sub-Districts (Ch. 7–8)',
    cutoff: 'Before Mirage Estate Last Chance Bell',
    detail:
      'Track down and defeat both optional conspiracy bosses off the critical path before crossing into Mirage Estate’s final threshold.',
    requiredFor: ['true'],
  },
  {
    id: 'req-last-bell',
    title: 'Verify Route Before Mirage Estate Last Chance Bell',
    region: 'Mirage Estate (Ch. 9)',
    cutoff: 'HARD POINT OF NO RETURN',
    detail:
      'Ringing the Last Chance Bell locks world backtracking and commits your save to the Mount Soulrend finale.',
    requiredFor: ['standard', 'true'],
    linkedEntities: [{ kind: 'boss', id: 'lei-dang', label: 'Lei Dang' }],
  },
];

export const ENDING_ROUTES: EndingRoute[] = [
  {
    id: 'standard',
    badge: 'Ending 1 • Critical Path',
    title: 'Standard Ending — A Shadow’s Debt',
    subtitle: 'Default Mount Soulrend Resolution',
    accent: 'bone',
    spoilerSafeTeaser:
      'Triggered by completing the 12-chapter critical path without fulfilling the hidden bloodline and regional investigation prerequisites.',
    fullSummary:
      'Soul defeats Zuo Shang atop Mount Soulrend as the usurper Shadow Sovereign, clearing his name of Mu Tianmiao’s murder. However, because the Bastion of Mó archives and Mu Xiaokui’s full memories remain sealed, Soul’s 66-day cure runs out on the mountain steps—leaving The Order’s shadow cycle unbroken.',
    howToTrigger: [
      'Complete Chapters 1–12 along the main story path and ring Mirage Estate’s Last Chance Bell.',
      'Leave at least one True Ending requirement unfinished (e.g., missing Nuo Masks, Lóng Pillars, or Purple Tales).',
    ],
    finalShowdown: 'Zuo Shang, Shadow Sovereign (2 Phases)',
    unlocks: 'Unlocks New Game+ and Hellwalker / Sixty-Six Days challenge tiers.',
    requirementIds: ['req-last-bell'],
    linkedEntities: [{ kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang' }],
  },
  {
    id: 'bad',
    badge: 'Ending 2 • Failed Cutoffs / Ruthless Path',
    title: 'Bad Ending — Undying Grudge',
    subtitle: 'Consumed by Berserk Sha-Chi & Blight',
    accent: 'crimson',
    spoilerSafeTeaser:
      'Triggered when key mercy/investigation cutoffs are failed (such as killing Red or ignoring the Meigu Lake Blight conspiracy).',
    fullSummary:
      'Blind to the three-way manipulation behind his framing, Soul lets his berserk Sha-Chi consume what remains of his humanity. Even as Mount Soulrend burns, the Lady of the Veil’s Blight spreads unchecked across Pangzhen and Village of Lu, turning Soul into a hollow new enforcer of Wulin’s blood feud.',
    howToTrigger: [
      'Attack and kill Red on the Mandate Encampment Dovecote instead of swinging past her.',
      'Skip regional Blight investigations (Village of Lu puppets & Meigu Lake Discordance) before Mount Soulrend.',
    ],
    finalShowdown: 'Zuo Shang (Ruthless Variant — No True Lóng Phase)',
    unlocks: 'Unlocks NG+ with immediate access to replay missed chapters and rescue cutoffs.',
    requirementIds: [],
    linkedEntities: [{ kind: 'boss', id: 'meng-hua', label: 'Meng Hua' }],
  },
  {
    id: 'true',
    badge: 'Ending 3 • 100% Secret Route',
    title: 'True Ending — "The True Lóng"',
    subtitle: 'Secret Final Showdown & Aureate Unlock',
    accent: 'gold',
    spoilerSafeTeaser:
      'Requires every bloodline relic, Mu Xiaokui’s 5 Ribbons, Purple Tales, 4 Nuo Masks, 2 Crystal Puppet Eyes, 5 Lóng Pillars, sparing Red, and hidden bosses before the Last Chance Bell.',
    fullSummary:
      'Armed with Mó Yuan’s Maskwalker truth and Mu Xiaokui’s 5 Ribbons, Soul shatters the illusions binding The Order. Zuo Shang unleashes his full Lóng Clan heritage in a secret 3-phase "The True Lóng" duel atop Mount Soulrend. Overcoming him breaks the 66-day curse’s hold on Soul’s spirit and ends The Order’s tyranny.',
    howToTrigger: [
      'Collect Mu Xiaokui’s 5 Ribbons in Village of Lu & spare Red on the Mandate Encampment Dovecote.',
      'Finish all Purple Tales, 4 Nuo Masks, 2 Crystal Puppet Eyes, 5 Lóng Pillars, and hidden bosses Zhu Yuan & Bi Feng.',
      'Verify all steps BEFORE ringing Mirage Estate’s Last Chance Bell.',
    ],
    finalShowdown: 'Zuo Shang — "The True Lóng" (Secret 3-Phase Climax)',
    unlocks: 'Unlocks the golden multi-surge blade Aureate + True Ending Epilogue.',
    requirementIds: [
      'req-ribbons',
      'req-purple-tales',
      'req-spare-red',
      'req-nuo-masks',
      'req-puppet-eyes',
      'req-long-pillars',
      'req-hidden-bosses',
      'req-last-bell',
    ],
    linkedEntities: [
      { kind: 'boss', id: 'zuo-shang', label: 'Zuo Shang ("The True Lóng")' },
      { kind: 'weapon', id: 'aureate', label: 'Aureate' },
      { kind: 'character', id: 'mo-yuan', label: 'Mó Yuan' },
    ],
  },
  {
    id: 'ngplus',
    badge: 'Ending 4 • Cycle II & Permadeath',
    title: 'NG+ Variations — Echoes of Wulin & 66 Days',
    subtitle: 'Carry-Over Mastery & Alternate Dialogue',
    accent: 'violet',
    spoilerSafeTeaser:
      'Replaying in New Game+ or Sixty-Six Days mode introduces alternate NPC insights, carry-over Soul-Tempered loadouts, and secret confrontation nuances.',
    fullSummary:
      'Carrying Aureate and Soul-Tempered Phantom Edges into NG+ unlocks knowing dialogue from Mó Yuan (the Gold-Masked One), Myst, and Jewel, plus accelerated access to Sixty-Six Days permadeath completion rewards when finishing "The True Lóng" within 66 deaths.',
    howToTrigger: [
      'Clear any ending once to start Cycle II (NG+) with your Soul-Tempered gear and Aureate carried over.',
      'Complete "The True Lóng" on Sixty-Six Days mode within the 66-death cap for full mastery epilogue.',
    ],
    finalShowdown: 'Enhanced Hellwalker AI Bosses + Sixty-Six Days Permadeath Cap',
    unlocks: 'Mastery Title, full Codex completion, and alternate epilogue voiceovers.',
    requirementIds: ['req-ribbons', 'req-long-pillars', 'req-last-bell'],
    linkedEntities: [
      { kind: 'weapon', id: 'aureate', label: 'Aureate' },
      { kind: 'medicine', id: 'phantom-brew', label: 'Phantom Brew' },
    ],
  },
];
