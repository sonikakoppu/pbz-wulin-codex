import type { BanyanLocation, QuestTale } from '../types/codex';

export const QUEST_REGIONS = [
  'All Regions',
  'Weeping Creek Valley',
  'Crimson Forest',
  'Village of Lu',
  'Pangzhen',
  'Mandate Encampment',
  'Mountain of Imprisonment',
  'Meigu Lake',
  'Mirage Estate',
  'Multi-Region',
] as const;

export const QUEST_TALES: QuestTale[] = [
  // =========================================================================
  // WEEPING CREEK VALLEY & CRIMSON FOREST
  // =========================================================================
  {
    id: 'severed-mindseal',
    title: 'A Severed Mindseal',
    region: 'Weeping Creek Valley',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Hand over the Primal Stone BEFORE leaving Weeping Creek Valley.',
    summary:
      'A tormented martial hermit near the valley rapids begs Soul to deliver a Primal Stone to break his fractured Sha-Chi seal.',
    steps: [
      { id: 'sm-1', text: 'Speak with the kneeling hermit beside the upper Weeping Creek shrine.' },
      { id: 'sm-2', text: 'Retrieve the Primal Stone from the chained cave (requires Dread Axe).' },
      { id: 'sm-3', text: 'Return and hand over the Primal Stone BEFORE transitioning out of Weeping Creek Valley.' },
    ],
    rewards: 'Mindseal Relic, Upgrade Stones & Early Lore Entry',
    rewardEntities: [{ kind: 'edge', id: 'dread-axe', label: 'Dread Axe (Required)' }],
  },
  {
    id: 'apprentice-healer',
    title: 'Apprentice Healer',
    region: 'Weeping Creek Valley',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Complete Yu’er’s herb delivery BEFORE defeating Jing Ye.',
    summary:
      'Help the young apothecary Yu’er gather uncorrupted mountain herbs to stabilize wounded villagers in Weeping Creek Valley.',
    steps: [
      { id: 'ah-1', text: 'Meet Yu’er near the Weeping Creek Valley settlement Bell.' },
      { id: 'ah-2', text: 'Collect 3 Clearstream Herbs along the misty ravine cliffs.' },
      { id: 'ah-3', text: 'Deliver the herbs to Yu’er BEFORE defeating Jing Ye to claim the Medicine Case.' },
    ],
    rewards: 'Medicine Case (+20% / +35% Healing Efficiency)',
    rewardEntities: [{ kind: 'accessory', id: 'medicine-case', label: 'Medicine Case' }],
  },
  {
    id: 'bloodline-awakening',
    title: 'Bloodline Awakening',
    region: 'Weeping Creek Valley',
    type: 'side',
    missable: false,
    summary:
      'Confront the enigmatic Gold-Masked One (Mó Yuan) on the misty ridge to test Soul’s Ghoststep parry discipline.',
    steps: [
      { id: 'ba-1', text: 'Ascend the side trail past the Sha-Chi Tower overlook.' },
      { id: 'ba-2', text: 'Spar with the Gold-Masked One and land disciplined Blue-Flash parries.' },
      { id: 'ba-3', text: 'Claim the Counterstrike Bracers upon passing his trial.' },
    ],
    rewards: 'Counterstrike Bracers (+20% to +30% Post-Parry Damage)',
    rewardEntities: [
      { kind: 'accessory', id: 'counterstrike-bracers', label: 'Counterstrike Bracers' },
      { kind: 'character', id: 'mo-yuan', label: 'Mó Yuan / Gold-Masked One' },
    ],
  },
  {
    id: 'purge-the-sect',
    title: 'Purge the Sect',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Finish and turn in BEFORE defeating Bai Chilian.',
    summary:
      'The Brooding Old Archer tasks Soul with eliminating corrupted archers infesting the border between Weeping Creek and Crimson Forest.',
    steps: [
      { id: 'pts-1', text: 'Speak to the Brooding Old Archer near the valley watchtower.' },
      { id: 'pts-2', text: 'Clear the Ruthless Archer Camp and recover the Sect Tally.' },
      { id: 'pts-3', text: 'Return the Tally BEFORE defeating Bai Chilian to receive the Feather Bow.' },
    ],
    rewards: 'Feather Bow (Phantom Edge — Snipes Hanging Loot)',
    rewardEntities: [{ kind: 'edge', id: 'feather-bow', label: 'Feather Bow' }],
  },
  {
    id: 'festering-secret',
    title: 'Festering Secret',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Complete BEFORE defeating Bai Chilian.',
    summary:
      'Investigate the toxic cellar beneath Crimson Forest’s maple grove to expose hidden Blight experiments.',
    steps: [
      { id: 'fs-1', text: 'Enter the basement cellar below the burned Crimson Forest manor.' },
      { id: 'fs-2', text: 'Clear the venom-infused elites and collect the Sealed Ledger.' },
      { id: 'fs-3', text: 'Report back to the informant BEFORE challenging Bai Chilian.' },
    ],
    rewards: 'Boulderguard (Defensive Accessory — Physical Mitigation)',
    rewardEntities: [{ kind: 'accessory', id: 'boulderguard', label: 'Boulderguard' }],
  },
  {
    id: 'four-fierce-axes',
    title: 'Four Fierce Axes',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Obtain the 5th Book BEFORE defeating Bai Chilian.',
    summary:
      'Trace the tragic fate of Peng Meng’s former brotherhood by collecting all five chronicle volumes scattered across the forest.',
    steps: [
      { id: 'ffa-1', text: 'Collect Books 1–4 across Weeping Creek Valley and Crimson Forest guardhouses.' },
      { id: 'ffa-2', text: 'Secure the 5th Book from the hidden alcove past the broken bridge BEFORE fighting Bai Chilian.' },
      { id: 'ffa-3', text: 'Deliver the complete set to unlock the Blood Oath Dagger crafting material.' },
    ],
    rewards: 'Blood Oath Dagger Material (Phantom Edge)',
    rewardEntities: [
      { kind: 'edge', id: 'blood-oath-dagger', label: 'Blood Oath Dagger' },
      { kind: 'boss', id: 'peng-meng', label: 'Peng Meng, the Axemaster' },
    ],
  },
  {
    id: 'honor-among-thieves',
    title: 'Honor Among Thieves',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'MISSABLE RIDDLE: Answering incorrectly locks out Silent Wrap for the playthrough.',
    summary:
      'Three masked forest bandits challenge Soul to a nocturnal riddle trial to prove his wit and stealth.',
    steps: [
      { id: 'hat-1', text: 'Locate the three lantern-lit bandit informants in the upper Crimson Forest trail.' },
      { id: 'hat-2', text: 'Riddle 1 Answer: "landowner\'s jade belt"' },
      { id: 'hat-3', text: 'Riddle 2 Answer: "Butterfly"' },
      { id: 'hat-4', text: 'Riddle 3 Answer: "The letter never said"' },
    ],
    rewards: 'Silent Wrap (Stealth & Post-Dodge Mitigation Accessory)',
    rewardEntities: [{ kind: 'accessory', id: 'silent-wrap', label: 'Silent Wrap' }],
  },
  {
    id: 'healers-mercy',
    title: "A Healer's Mercy",
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Complete BEFORE defeating Bai Chilian.',
    summary:
      'Aid a desperate physician trapped in the Crimson Forest medical tent by retrieving clean spring water and clearing raiders.',
    steps: [
      { id: 'hm-1', text: 'Speak with the field healer near the Crimson Forest mid-level Bell.' },
      { id: 'hm-2', text: 'Clear the ambush squad blocking the fresh spring.' },
      { id: 'hm-3', text: 'Return BEFORE defeating Bai Chilian to claim the Calming Gourd.' },
    ],
    rewards: 'Calming Gourd (Defensive Accessory — Post-Heal Damage Reduction)',
    rewardEntities: [{ kind: 'accessory', id: 'calming-gourd', label: 'Calming Gourd' }],
  },
  {
    id: 'flesh-lily-quest',
    title: 'Flesh Lily',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: "CUTOFF: Give the Flesh Lily to Yu'er BEFORE defeating Bai Chilian.",
    summary:
      'Harvest a rare crimson Flesh Lily blooming near the Blighted shrine and bring it to Yu’er for medicinal study.',
    steps: [
      { id: 'fl-1', text: 'Pluck the glowing Flesh Lily from the secluded maple ravine.' },
      { id: 'fl-2', text: "Travel back and hand the Flesh Lily to Yu'er BEFORE fighting Bai Chilian." },
    ],
    rewards: 'Blessed Jade Pendant (Support Accessory — Material Drops & Sha-Chi on Kill)',
    rewardEntities: [{ kind: 'accessory', id: 'blessed-jade-pendant', label: 'Blessed Jade Pendant' }],
  },
  {
    id: 'secrets-baishan-sect',
    title: 'Secrets of the Baishan Sect',
    region: 'Crimson Forest',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Accept quest from Lanlan BEFORE defeating Bai Chilian.',
    summary:
      'Lanlan seeks proof of Baishan Sect defectors hiding within the Crimson Forest borderlands.',
    steps: [
      { id: 'sbs-1', text: 'Find Lanlan near the Crimson Forest tea pavilion BEFORE fighting Bai Chilian.' },
      { id: 'sbs-2', text: 'Retrieve the fractured Baishan seal from the cliffside camp.' },
      { id: 'sbs-3', text: 'Return the seal to Lanlan to earn Broken Vessel.' },
    ],
    rewards: 'Broken Vessel (Offensive Accessory — Low-Medicine Damage Surge)',
    rewardEntities: [{ kind: 'accessory', id: 'broken-vessel', label: 'Broken Vessel' }],
  },
  {
    id: 'triple-threat',
    title: 'Triple Threat',
    region: 'Crimson Forest',
    type: 'side',
    missable: false,
    summary:
      'A secret combat challenge requiring Myst’s Soul-Tempered Blazing Edge to shatter a reinforced clockwork abomination.',
    steps: [
      { id: 'tt-1', text: 'Soul Temper Sanguine Reach into Blazing Edge via Myst in Pangzhen (requires Scorching Flames).' },
      { id: 'tt-2', text: 'Return to the hidden arena and equip Blazing Edge.' },
      { id: 'tt-3', text: 'Defeat Yucong, No. 34 Twisted Puppet while wielding Blazing Edge.' },
    ],
    rewards: 'High-Tier Soul Temper Catalyst & Secret Codex Achievement',
    rewardEntities: [{ kind: 'weapon', id: 'sanguine-reach', label: 'Blazing Edge (Sanguine Reach)' }],
    spoiler: true,
  },

  // =========================================================================
  // VILLAGE OF LU & PANGZHEN
  // =========================================================================
  {
    id: 'young-mistress',
    title: 'Young Mistress (Mu Xiaokui’s 5 Ribbons)',
    region: 'Village of Lu',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CRITICAL TRUE ENDING CUTOFF: Collect all 5 red ribbons BEFORE fighting Mu Xiaokui, then loot Wild Oriole Sword at the dock BEFORE leaving!',
    summary:
      'Recover all five crimson childhood ribbons left by Mu Xiaokui across Village of Lu to unlock her hidden Phase 3 duel and two missable weapons.',
    steps: [
      { id: 'ym-1', text: 'Ribbon 1–2: Rooftop eaves above Jewel’s workshop & lantern alley.' },
      { id: 'ym-2', text: 'Ribbon 3–4: Old Man Gen’s Hideout tunnel ledge & sunken courtyard shrine.' },
      { id: 'ym-3', text: 'Ribbon 5: Waterfront pier archway BEFORE triggering Mu Xiaokui’s boss encounter.' },
      { id: 'ym-4', text: 'Clear Mu Xiaokui’s secret Phase 3 to earn Fiend Saws.' },
      { id: 'ym-5', text: 'IMMEDIATELY pick up Wild Oriole Sword at the dock after Phase 3 before leaving the area!' },
    ],
    rewards: 'True Ending Flag + Fiend Saws + Wild Oriole Sword',
    rewardEntities: [
      { kind: 'weapon', id: 'fiend-saws', label: 'Fiend Saws' },
      { kind: 'weapon', id: 'wild-oriole', label: 'Wild Oriole Sword' },
      { kind: 'character', id: 'mu-xiaokui', label: 'Mu Xiaokui' },
    ],
    spoiler: true,
  },
  {
    id: 'leave-none-alive',
    title: 'Leave None Alive',
    region: 'Village of Lu',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Complete choices BEFORE entering Smuggler’s Tunnel.',
    summary:
      'Navigate a deceptive standoff between a Stately Monk and a Wounded Thief hiding outside the Smuggler’s Tunnel.',
    steps: [
      { id: 'lna-1', text: 'Speak with the Stately Monk in Village of Lu and answer "Do not believe".' },
      { id: 'lna-2', text: 'Obtain the Thief’s Manual and deliver it to the Wounded Thief BEFORE entering Smuggler’s Tunnel.' },
    ],
    rewards: 'Agarwood Prayer Beads + Arrowward',
    rewardEntities: [
      { kind: 'accessory', id: 'agarwood-prayer-beads', label: 'Agarwood Prayer Beads' },
      { kind: 'accessory', id: 'arrowward', label: 'Arrowward' },
    ],
  },
  {
    id: 'journey-home',
    title: 'The Journey Home',
    region: 'Village of Lu',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Report back to Old Man Gen BEFORE leaving Village of Lu for Pangzhen.',
    summary:
      'Escort and clear the route for Old Man Gen’s survivors trapped in the puppet-infested outskirts of Village of Lu.',
    steps: [
      { id: 'jh-1', text: 'Locate Old Man Gen inside his hidden Village of Lu cellar.' },
      { id: 'jh-2', text: 'Clear the Thread-Binding ambush along the riverside road.' },
      { id: 'jh-3', text: 'Report back to Old Man Gen BEFORE departing for Pangzhen to claim War Wagon.' },
    ],
    rewards: 'War Wagon (Summon Phantom Edge — Clockwork Crossbow Turret)',
    rewardEntities: [{ kind: 'edge', id: 'war-wagon', label: 'War Wagon' }],
  },
  {
    id: 'young-master-lan',
    title: 'Young Master Lan',
    region: 'Village of Lu',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Complete BEFORE leaving Village of Lu.',
    summary:
      'Aid the cornered heir Young Master Lan against Leng Tu’s puppet hunters in the eastern courtyard.',
    steps: [
      { id: 'yml-1', text: 'Respond to the cries near the eastern mansion courtyard.' },
      { id: 'yml-2', text: 'Defeat the marionette squad and speak to Young Master Lan BEFORE departing Village of Lu.' },
    ],
    rewards: 'Crimson Resolve (Offensive Bleed Accessory)',
    rewardEntities: [{ kind: 'accessory', id: 'crimson-resolve', label: 'Crimson Resolve' }],
  },
  {
    id: 'undying-heroic-spirit',
    title: 'The Undying Heroic Spirit',
    region: 'Pangzhen',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Defeat the resisting heroes BEFORE their full Maskwalker transformation completes.',
    summary:
      'Honor fallen martial defenders in Pangzhen’s back alleys before the creeping Maskwalker corruption consumes their minds.',
    steps: [
      { id: 'uhs-1', text: 'Track the resonant battle drums across Pangzhen’s upper courtyard.' },
      { id: 'uhs-2', text: 'Defeat the resisting heroes swiftly before they complete Maskwalker transformation.' },
    ],
    rewards: 'Maskwalker Keepsake & High-Tier Upgrade Materials',
    rewardEntities: [{ kind: 'accessory', id: 'nuo-mask', label: 'Nuo Mask' }],
  },
  {
    id: 'daughter-dark-sect',
    title: 'Daughter of the Dark Sect (Spare Red)',
    region: 'Mandate Encampment',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CRITICAL TRUE ENDING CUTOFF: Swing across the chain instead of attacking Red on the Dovecote tower!',
    summary:
      'Encounter Red, the Mysterious Swordswoman atop the Mandate Encampment Dovecote before challenging the Chief Disciple.',
    steps: [
      { id: 'dds-1', text: 'Climb the Dovecote tower BEFORE entering the Chief Disciple boss arena.' },
      { id: 'dds-2', text: 'DO NOT attack Red — use Hunter’s Chain Sickle to swing across the chain and spare her.' },
      { id: 'dds-3', text: 'Defeat Chief Disciple & surprise Phase 3 Red to earn Twin Fish Pendant + Memory Flower.' },
    ],
    rewards: 'Twin Fish Pendant + Twin Heroes’ Memory Flower + True Ending Flag',
    rewardEntities: [
      { kind: 'accessory', id: 'twin-fish-pendant', label: 'Twin Fish Pendant' },
      { kind: 'boss', id: 'chief-disciple', label: 'Chief Disciple' },
    ],
  },
  {
    id: 'dream-of-motherhood',
    title: 'A Dream of Motherhood',
    region: 'Pangzhen',
    type: 'side',
    missable: false,
    summary:
      'Uncover a grieving mother’s keepsake in Pangzhen’s flooded tenement district to lay her restless spirit to peace.',
    steps: [
      { id: 'dom-1', text: 'Inspect the lullaby lantern near Pangzhen’s southern canal.' },
      { id: 'dom-2', text: 'Recover the wooden cradle charm from the locked attic (requires Bashpole or Chain Sickle).' },
      { id: 'dom-3', text: 'Return the charm to receive Mother’s Talisman.' },
    ],
    rewards: "Mother's Talisman (Lethal Blow Survival Accessory)",
    rewardEntities: [{ kind: 'accessory', id: 'mothers-talisman', label: "Mother's Talisman" }],
  },
  {
    id: 'dahuang',
    title: 'Dahuang',
    region: 'Pangzhen',
    type: 'side',
    missable: false,
    summary:
      'Follow the loyal yellow hound Dahuang through Pangzhen’s ruined alleys to uncover its fallen master’s hidden stash.',
    steps: [
      { id: 'dh-1', text: 'Feed and follow Dahuang near the Pangzhen market checkpoint Bell.' },
      { id: 'dh-2', text: 'Clear the street thugs blocking the back alley warehouse.' },
      { id: 'dh-3', text: 'Loot the buried cache Dahuang uncovers.' },
    ],
    rewards: 'Rare Forge Stones, Pigeon Feed Catalyst & Copper Stash',
    rewardEntities: [{ kind: 'character', id: 'myst', label: 'Myst (Soul Tempering)' }],
  },
  {
    id: 'star-performer',
    title: 'The Star Performer',
    region: 'Pangzhen',
    type: 'side',
    missable: false,
    summary:
      'Investigate Pangzhen’s charred opera theatre and settle the rivalry surrounding the Lion Dance troupe.',
    steps: [
      { id: 'sp-1', text: 'Explore the ruined Lion Dance Hall backstage in Pangzhen.' },
      { id: 'sp-2', text: 'Defeat Flame, the Mask-Bound Lion Dance Grandmaster.' },
      { id: 'sp-3', text: 'Return the gilded opera mask to the surviving troupe elder.' },
    ],
    rewards: 'Flaming Mane Components & Auspicious Lion Fireball Lead',
    rewardEntities: [
      { kind: 'edge', id: 'flaming-mane', label: 'Flaming Mane' },
      { kind: 'accessory', id: 'auspicious-lion-fireball', label: 'Auspicious Lion Fireball' },
    ],
  },
  {
    id: 'the-cube',
    title: 'The Cube',
    region: 'Pangzhen',
    type: 'side',
    missable: false,
    summary:
      'Solve a Kungfupunk mechanical puzzle box tucked away inside Pangzhen’s clockwork workshop.',
    steps: [
      { id: 'tc-1', text: 'Locate the locked bronze puzzle pedestal in Pangzhen’s upper foundry.' },
      { id: 'tc-2', text: 'Align the three Sha-Chi gear plates using Wall Mechanism & Chain Sickle paths.' },
      { id: 'tc-3', text: 'Claim the Remnant Spark Cube.' },
    ],
    rewards: 'Remnant Spark Cube (+15% / +28% Phantom Edge Damage)',
    rewardEntities: [{ kind: 'accessory', id: 'remnant-spark-cube', label: 'Remnant Spark Cube' }],
  },
  {
    id: 'quick-hand-zhang-hunts',
    title: "Quick Hand Zhang's Multi-Region Treasure Hunts",
    region: 'Multi-Region',
    type: 'collectible',
    missable: false,
    summary:
      'Track Quick Hand Zhang across four regions to unlock his secret stashes, ranged Phantom Edges, and endgame lightning accessories.',
    steps: [
      { id: 'qhz-1', text: 'Crimson Forest: Rescue Quick Hand Zhang & gather relics → Flying Dagger.' },
      { id: 'qhz-2', text: 'Village of Lu: Follow his roof chalk marks → Fine Thread.' },
      { id: 'qhz-3', text: 'Pangzhen: Unlock his alley safe-house → Goldblaze.' },
      { id: 'qhz-4', text: 'Mirage Estate: Open his endgame vault → Thundermoon Lantern + Seamless Death.' },
    ],
    rewards: 'Flying Dagger, Fine Thread, Goldblaze, Thundermoon Lantern & Seamless Death',
    rewardEntities: [
      { kind: 'edge', id: 'flying-dagger', label: 'Flying Dagger' },
      { kind: 'accessory', id: 'fine-thread', label: 'Fine Thread' },
      { kind: 'edge', id: 'goldblaze', label: 'Goldblaze' },
      { kind: 'accessory', id: 'thundermoon-lantern', label: 'Thundermoon Lantern' },
    ],
  },

  // =========================================================================
  // LATE-GAME & COLLECTIBLE CHAINS
  // =========================================================================
  {
    id: 'bai-xue',
    title: 'Bai Xue',
    region: 'Mountain of Imprisonment',
    type: 'missable',
    missable: true,
    cutoffWarning: 'DIALOGUE CUTOFF: Choose "This won\'t absolve you of your sins" to earn Snow and Blood.',
    summary:
      'Confront the remorseful snow-clad assassin Bai Xue on the frozen prison ledges.',
    steps: [
      { id: 'bx-1', text: 'Locate Bai Xue along the icy cliff path on Mountain of Imprisonment.' },
      { id: 'bx-2', text: 'Complete her confrontation and select: "This won\'t absolve you of your sins".' },
    ],
    rewards: 'Snow and Blood (Offensive Bleed & Freeze Accessory)',
    rewardEntities: [{ kind: 'accessory', id: 'snow-and-blood', label: 'Snow and Blood' }],
    spoiler: true,
  },
  {
    id: 'dont-forget-me',
    title: "Don't Forget Me",
    region: 'Mountain of Imprisonment',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CRITICAL ORDER CUTOFF: Free Zhou Pingzi BEFORE picking up the lift crank!',
    summary:
      'Rescue prisoner Zhou Pingzi from the suspended cages before activating the Mountain of Imprisonment lift mechanism.',
    steps: [
      { id: 'dfm-1', text: 'Find Zhou Pingzi locked in the lower cellblock BEFORE touching the lift crank.' },
      { id: 'dfm-2', text: 'Break his cell chains (Dread Axe) and escort him to safety.' },
      { id: 'dfm-3', text: 'Only THEN pick up the lift crank to retain the Ultimate Talisman reward.' },
    ],
    rewards: 'Ultimate Talisman (+18% / +32% Power Surge Damage)',
    rewardEntities: [{ kind: 'accessory', id: 'ultimate-talisman', label: 'Ultimate Talisman' }],
    spoiler: true,
  },
  {
    id: 'cui-quest',
    title: 'Cui',
    region: 'Mountain of Imprisonment',
    type: 'missable',
    missable: true,
    cutoffWarning: 'CUTOFF: Give Lu Sanqian the Rootless Dew BEFORE fighting Saw & Crusher.',
    summary:
      'Deliver rare Rootless Dew to Lu Sanqian before the twin prison executioners Saw & Crusher seal the lower shaft.',
    steps: [
      { id: 'cui-1', text: 'Gather Rootless Dew from the misty cliff alcove.' },
      { id: 'cui-2', text: 'Give Rootless Dew to Lu Sanqian BEFORE triggering the Saw & Crusher duo fight.' },
    ],
    rewards: 'Rare Tempering Material & Late-Game Story Resolution',
    rewardEntities: [{ kind: 'medicine', id: 'kuye-dew', label: 'Kuye Dew' }],
    spoiler: true,
  },
  {
    id: 'heros-lament',
    title: "Hero's Lament",
    region: 'Mandate Encampment',
    type: 'side',
    missable: false,
    summary:
      'Honor the slain Kunlun Pillar Yuyin to claim the calligraphy-forged blade designed to counter Huangxing.',
    steps: [
      { id: 'hl-1', text: 'Inspect Yuyin’s memorial stele in the Mandate Encampment inner courtyard.' },
      { id: 'hl-2', text: 'Defeat the Kunlun renegade guards desecrating the shrine.' },
      { id: 'hl-3', text: 'Claim Ink Cut — deals massive bonus damage & posture stun to Huangxing.' },
    ],
    rewards: 'Ink Cut (Main Weapon — Huangxing Boss Counter)',
    rewardEntities: [
      { kind: 'weapon', id: 'ink-cut', label: 'Ink Cut' },
      { kind: 'boss', id: 'huangxing', label: 'Huangxing' },
    ],
  },
  {
    id: 'illusory-pipa-chain',
    title: 'Illusory Pipa (3 Pipa Pieces Chain)',
    region: 'Multi-Region',
    type: 'collectible',
    missable: false,
    summary:
      'Gather all three broken Pipa relics across Wulin to evolve Heartrend Pipa into Illusory Pipa, unlocking Supernatural Mist Barriers.',
    steps: [
      { id: 'ip-1', text: 'Pipa Piece 1: Village of Lu riverside pavilion behind weak floorboards.' },
      { id: 'ip-2', text: 'Pipa Piece 2: Pangzhen opera backstage loft.' },
      { id: 'ip-3', text: 'Pipa Piece 3: Meigu Lake sunken shrine chest.' },
      { id: 'ip-4', text: 'Bring all 3 pieces to Myst in Pangzhen to evolve Heartrend Pipa → Illusory Pipa.' },
    ],
    rewards: 'Illusory Pipa (Evolved Phantom Edge — Dispels Supernatural Mist Barriers)',
    rewardEntities: [{ kind: 'edge', id: 'heartrend-pipa', label: 'Heartrend Pipa → Illusory Pipa' }],
  },
  {
    id: 'wily-hares-three-dens',
    title: "The Wily Hare's Three Dens",
    region: 'Multi-Region',
    type: 'collectible',
    missable: false,
    summary:
      'Track down all three subterranean smuggler dens connected by hidden chain and floorboard shortcuts.',
    steps: [
      { id: 'wh-1', text: 'Den 1: Weeping Creek Valley chained cave tunnel (Dread Axe).' },
      { id: 'wh-2', text: 'Den 2: Village of Lu Smuggler’s Tunnel false floorboard (Bashpole).' },
      { id: 'wh-3', text: 'Den 3: Meigu Lake fractured stone chamber (Tiger Cannon).' },
    ],
    rewards: 'Weapon Reforge Talismans, Banyan’s Heart & Rare Forge Materials',
    rewardEntities: [{ kind: 'edge', id: 'tiger-cannon', label: 'Tiger Cannon' }],
  },
];

export const BANYAN_LOCATIONS: BanyanLocation[] = [
  {
    id: 'banyan-1',
    name: 'Heart of the Banyan I — Weeping Creek Root Shrine',
    region: 'Weeping Creek Valley',
    bossRematch: 'Phantom Rematch: Peng Meng & Valley Sentinels',
    reward: "Banyan's Heart (Expands Accessory Slot Capacity to 3)",
    notes: 'Accessible behind the rusted iron chain gate past the Sha-Chi Tower (requires Dread Axe).',
  },
  {
    id: 'banyan-2',
    name: 'Heart of the Banyan II — Crimson Maple Hollow',
    region: 'Crimson Forest',
    bossRematch: 'Phantom Rematch: Bai Chilian Shadow Echo',
    reward: "Banyan's Heart (Expands Accessory Slot Capacity to 4)",
    notes: 'Grapple across the ravine near the Crimson Manor waterfall using Hunter’s Chain Sickle.',
  },
  {
    id: 'banyan-3',
    name: 'Heart of the Banyan III — Old Man Gen’s Sunken Grotto',
    region: 'Village of Lu',
    bossRematch: 'Phantom Rematch: Leng Tu Thread Marionettes',
    reward: "Banyan's Heart (Expands Accessory Slot Capacity to 5)",
    notes: 'Slam through the weak floorboards inside the Smuggler’s Tunnel alcove using Bashpole.',
  },
  {
    id: 'banyan-4',
    name: 'Heart of the Banyan IV — Pangzhen Blazing Courtyard',
    region: 'Pangzhen',
    bossRematch: 'Phantom Rematch: Flame & Shadow Warden Echo',
    reward: "Banyan's Heart (Expands Accessory Slot Capacity to 6 — Max Boundless Capacity)",
    notes: "Extinguish the burning oil barricade in the eastern theatre quarter using You Loong's Deluge.",
  },
  {
    id: 'banyan-5',
    name: 'Heart of the Banyan V — Meigu Lake Mist Sanctum',
    region: 'Meigu Lake',
    bossRematch: 'Phantom Rematch: Huangxing / Meng Hua Echo',
    reward: 'Supreme Banyan Essence + Weapon Reforge Talisman',
    notes: 'Dispel the Supernatural Mist Barrier on the western lake islet using the evolved Illusory Pipa.',
  },
];
