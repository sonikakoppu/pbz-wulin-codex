import type {
  AccessoryItem,
  AccessoryStats,
  MainWeapon,
  PhantomEdge,
  SavedBuildState,
} from '../types/codex';

export interface LoadoutSynergyItem {
  id: string;
  title: string;
  detail: string;
  tier: 'combo' | 'active' | 'warning';
}

export interface AccessoryConditionStatus {
  slotIndex: number;
  accessory: AccessoryItem;
  isDuplicate: boolean;
  isConditionalMatch: boolean;
  reason: string;
  matchedGearNames: string[];
}

export interface LoadoutTotals {
  damagePct: number;
  effectiveDamagePct: number;
  guardBreakPct: number;
  damageReductionPct: number;
  parryWindowPct: number;
  healingPct: number;
  shaChiPct: number;
  sparkEfficiencyPct: number;
}

export interface WeaponEffectivePreview {
  weapon: MainWeapon;
  baseAttackLv25: number;
  effectiveAttackLv25: number;
  baseGuardBreakLv25: number;
  effectiveGuardBreakLv25: number;
  classBonusPct: number;
}

export interface LoadoutAnalysis {
  weapon1: MainWeapon;
  weapon2: MainWeapon;
  edge1: PhantomEdge;
  edge2: PhantomEdge;
  slots: AccessoryConditionStatus[];
  totals: LoadoutTotals;
  weapon1Preview: WeaponEffectivePreview;
  weapon2Preview: WeaponEffectivePreview;
  totalSparkCost: number;
  obstaclesCovered: string[];
  archetype: string;
  synergyScore: number;
  synergyRank: 'S' | 'A' | 'B' | 'C';
  synergies: LoadoutSynergyItem[];
}

function addStats(acc: AccessoryStats, next: AccessoryStats, sign = 1): AccessoryStats {
  return {
    damagePct: (acc.damagePct ?? 0) + sign * (next.damagePct ?? 0),
    guardBreakPct: (acc.guardBreakPct ?? 0) + sign * (next.guardBreakPct ?? 0),
    damageReductionPct: (acc.damageReductionPct ?? 0) + sign * (next.damageReductionPct ?? 0),
    parryWindowPct: (acc.parryWindowPct ?? 0) + sign * (next.parryWindowPct ?? 0),
    healingPct: (acc.healingPct ?? 0) + sign * (next.healingPct ?? 0),
    shaChiPct: (acc.shaChiPct ?? 0) + sign * (next.shaChiPct ?? 0),
    sparkEfficiencyPct: (acc.sparkEfficiencyPct ?? 0) + sign * (next.sparkEfficiencyPct ?? 0),
  };
}

function getWeaponAllTags(w: MainWeapon): Set<string> {
  const tags = new Set<string>(w.tags);
  tags.add(w.weaponClass.toLowerCase());
  const text = `${w.passiveTrait} ${w.powerSurge} ${w.soulTempered?.passiveTrait ?? ''}`.toLowerCase();
  if (text.includes('bleed') || text.includes('hemorrhage')) tags.add('bleed');
  if (text.includes('burn') || text.includes('fire') || text.includes('flame')) {
    tags.add('burn');
    tags.add('fire');
  }
  if (text.includes('lightning') || text.includes('shock') || text.includes('thunder')) tags.add('lightning');
  if (text.includes('freeze') || text.includes('frost') || text.includes('chill')) tags.add('freeze');
  if (text.includes('poison')) tags.add('poison');
  if (text.includes('parry')) tags.add('parry');
  if (text.includes('ghoststep') || text.includes('dodge')) tags.add('ghoststep');
  if (text.includes('guard-break') || text.includes('guard break') || text.includes('posture')) {
    tags.add('guard-break');
  }
  if (text.includes('execution')) tags.add('execution');
  if (text.includes('lifesteal') || text.includes('heal')) tags.add('sustain');
  return tags;
}

function getEdgeAllTags(e: PhantomEdge): Set<string> {
  const tags = new Set<string>(e.tags);
  tags.add(e.edgeClass.toLowerCase());
  const text = `${e.combatRole} ${e.evolution?.combatRole ?? ''}`.toLowerCase();
  if (text.includes('bleed')) tags.add('bleed');
  if (text.includes('burn') || text.includes('fire') || text.includes('flamethrower')) {
    tags.add('burn');
    tags.add('fire');
  }
  if (text.includes('lightning') || text.includes('voltage') || text.includes('shock')) tags.add('lightning');
  if (text.includes('freeze') || text.includes('ice')) tags.add('freeze');
  if (text.includes('poison')) tags.add('poison');
  if (text.includes('wet')) tags.add('wet');
  if (text.includes('parry') || text.includes('deflect')) tags.add('parry');
  if (text.includes('summon') || text.includes('puppet') || text.includes('marionette')) {
    tags.add('summon');
    tags.add('puppet');
  }
  if (text.includes('guard') || text.includes('posture')) tags.add('guard-break');
  return tags;
}

interface ConditionCheck {
  matched: boolean;
  reason: string;
  matchedGearNames: string[];
  weaponClassRestriction?: MainWeapon['weaponClass'];
  isEdgeOnlyDamage?: boolean;
}

function checkAccessoryCondition(
  acc: AccessoryItem,
  w1: MainWeapon,
  w2: MainWeapon,
  e1: PhantomEdge,
  e2: PhantomEdge,
  w1Tags: Set<string>,
  w2Tags: Set<string>,
  e1Tags: Set<string>,
  e2Tags: Set<string>
): ConditionCheck {
  const weapons = [w1, w2];
  const edges = [e1, e2];

  const matchingWeaponsByClass = (cls: MainWeapon['weaponClass']) =>
    weapons.filter((w) => w.weaponClass === cls).map((w) => w.name);

  const matchingByTag = (tag: string) => {
    const names: string[] = [];
    if (w1Tags.has(tag)) names.push(w1.name);
    if (w2Tags.has(tag) && w2.id !== w1.id) names.push(w2.name);
    if (e1Tags.has(tag)) names.push(e1.name);
    if (e2Tags.has(tag) && e2.id !== e1.id) names.push(e2.name);
    return names;
  };

  switch (acc.id) {
    case 'quick-hand-pendant': {
      const m = matchingWeaponsByClass('One-Handed');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts ${m.join(' & ')}` : 'Needs a One-Handed weapon equipped',
        matchedGearNames: m,
        weaponClassRestriction: 'One-Handed',
      };
    }
    case 'quick-hand-pair': {
      const m = matchingWeaponsByClass('Dual-Wield');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts ${m.join(' & ')}` : 'Needs a Dual-Wield weapon equipped',
        matchedGearNames: m,
        weaponClassRestriction: 'Dual-Wield',
      };
    }
    case 'quick-hand-might': {
      const m = matchingWeaponsByClass('Two-Handed');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts ${m.join(' & ')}` : 'Needs a Two-Handed weapon equipped',
        matchedGearNames: m,
        weaponClassRestriction: 'Two-Handed',
      };
    }
    case 'seal-of-dugu': {
      const m = matchingWeaponsByClass('One-Handed');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Sword mastery active on ${m.join(' & ')}` : 'Needs a One-Handed sword equipped',
        matchedGearNames: m,
        weaponClassRestriction: 'One-Handed',
      };
    }
    case 'twin-fish-pendant': {
      const distinct = w1.id !== w2.id;
      return {
        matched: distinct,
        reason: distinct ? `Swap combo between ${w1.name} ↔ ${w2.name}` : 'Equip two different weapons for swap bonus',
        matchedGearNames: distinct ? [w1.name, w2.name] : [],
      };
    }
    case 'guardian-idol': {
      const m = edges.filter((e) => e.edgeClass === 'Summon').map((e) => e.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Empowers Summon Edge: ${m.join(' & ')}` : 'Needs a Summon Phantom Edge (e.g. Bell, War Wagon)',
        matchedGearNames: m,
        isEdgeOnlyDamage: true,
      };
    }
    case 'fine-thread': {
      const m = edges
        .filter((e) => e.edgeClass === 'Summon' || e.tags.includes('puppet'))
        .map((e) => e.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Amplifies Puppet/Summon: ${m.join(' & ')}` : 'Needs a Puppet/Summon Phantom Edge',
        matchedGearNames: m,
        isEdgeOnlyDamage: true,
      };
    }
    case 'puppets-wooden-heart': {
      const m = edges.filter((e) => e.edgeClass === 'Summon').map((e) => e.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Extends uptime of ${m.join(' & ')}` : 'Needs a Summon Phantom Edge',
        matchedGearNames: m,
      };
    }
    case 'feather-fan-plume': {
      const m = edges.filter((e) => e.edgeClass === 'Artifice').map((e) => e.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts Artifice Edge: ${m.join(' & ')}` : 'Needs an Artifice Phantom Edge',
        matchedGearNames: m,
        isEdgeOnlyDamage: true,
      };
    }
    case 'sharpshooters-eye': {
      const m = edges.filter((e) => e.tags.includes('ranged')).map((e) => e.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts ranged Edge: ${m.join(' & ')}` : 'Needs a ranged Phantom Edge (Bow, Dagger, Guillotine, etc.)',
        matchedGearNames: m,
        isEdgeOnlyDamage: true,
      };
    }
    case 'crimson-resolve': {
      const m = matchingByTag('bleed');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Triggers Bleed detonation with ${m.join(', ')}` : 'No Bleed weapon/edge equipped (raw attack still applies)',
        matchedGearNames: m,
      };
    }
    case 'snow-and-blood': {
      const m = Array.from(new Set([...matchingByTag('bleed'), ...matchingByTag('freeze')]));
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Synergizes with ${m.join(', ')} (Bleed/Freeze)` : 'Needs a Bleed or Freeze weapon/edge to proc',
        matchedGearNames: m,
      };
    }
    case 'auspicious-lion-fireball': {
      const m = Array.from(new Set([...matchingByTag('fire'), ...matchingByTag('burn')]));
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Amplifies Fire/Burn from ${m.join(', ')}` : 'Needs a Fire/Burn weapon or Edge (e.g. Flaming Mane, Goldblaze)',
        matchedGearNames: m,
      };
    }
    case 'thundermoon-lantern':
    case 'baishan-writ': {
      const m = Array.from(new Set([...matchingByTag('lightning'), ...matchingByTag('wind')]));
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Amplifies Lightning/Wind on ${m.join(', ')}` : 'Needs Lightning/Wind gear (e.g. Baishan Stormswords, Thunder Spear)',
        matchedGearNames: m,
      };
    }
    case 'venom-pouch': {
      const m = matchingByTag('poison');
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Boosts Poison procs on ${m.join(', ')}` : 'Needs a Poison weapon/edge (e.g. White Serpent, Venom Censer)',
        matchedGearNames: m,
      };
    }
    case 'chaos-ring': {
      const m = Array.from(
        new Set([
          ...matchingByTag('bleed'),
          ...matchingByTag('burn'),
          ...matchingByTag('freeze'),
          ...matchingByTag('lightning'),
          ...matchingByTag('poison'),
        ])
      );
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Refunds Sha-Chi on status procs from ${m.join(', ')}` : 'Pair with any Bleed, Burn, Freeze, Poison, or Shock gear',
        matchedGearNames: m,
      };
    }
    case 'battleforged': {
      const m = weapons
        .filter((w) => w.weaponClass === 'Two-Handed' || w.tags.includes('heavy'))
        .map((w) => w.name);
      return {
        matched: m.length > 0,
        reason: m.length > 0 ? `Reinforces heavy swings on ${m.join(' & ')}` : 'Works on Sha-Chi skills; strongest with Two-Handed weapons',
        matchedGearNames: m,
      };
    }
    default: {
      // General tag overlap check with equipped weapons & edges
      const overlap = new Set<string>();
      for (const tag of acc.synergyTags) {
        if (w1Tags.has(tag)) overlap.add(w1.name);
        if (w2Tags.has(tag)) overlap.add(w2.name);
        if (e1Tags.has(tag)) overlap.add(e1.name);
        if (e2Tags.has(tag)) overlap.add(e2.name);
      }
      const matchedGearNames = Array.from(overlap);
      return {
        matched: true,
        reason:
          matchedGearNames.length > 0
            ? `Universal bonus · Pairs with ${matchedGearNames.join(', ')}`
            : 'Universal passive bonus (always active)',
        matchedGearNames,
      };
    }
  }
}

export function analyzeLoadout(
  build: SavedBuildState,
  weapons: MainWeapon[],
  edges: PhantomEdge[],
  accessories: AccessoryItem[]
): LoadoutAnalysis {
  const weapon1 = weapons.find((w) => w.id === build.weapon1) ?? weapons[0];
  const weapon2 = weapons.find((w) => w.id === build.weapon2) ?? weapons[1] ?? weapons[0];
  const edge1 = edges.find((e) => e.id === build.edge1) ?? edges[0];
  const edge2 = edges.find((e) => e.id === build.edge2) ?? edges[1] ?? edges[0];

  const w1Tags = getWeaponAllTags(weapon1);
  const w2Tags = getWeaponAllTags(weapon2);
  const e1Tags = getEdgeAllTags(edge1);
  const e2Tags = getEdgeAllTags(edge2);

  const seenAccessoryIds = new Set<string>();
  let rawSum: AccessoryStats = {};
  let effectiveGeneralDamagePct = 0;
  let oneHandedBonusPct = 0;
  let dualWieldBonusPct = 0;
  let twoHandedBonusPct = 0;

  const slots: AccessoryConditionStatus[] = [0, 1, 2, 3].map((slotIndex) => {
    const id = build.accessories[slotIndex];
    const accessory = accessories.find((a) => a.id === id) ?? accessories[slotIndex] ?? accessories[0];
    const isDuplicate = seenAccessoryIds.has(accessory.id);
    seenAccessoryIds.add(accessory.id);

    const cond = checkAccessoryCondition(
      accessory,
      weapon1,
      weapon2,
      edge1,
      edge2,
      w1Tags,
      w2Tags,
      e1Tags,
      e2Tags
    );

    const s = build.polished ? accessory.polishedStats : accessory.baseStats;
    if (!isDuplicate) {
      rawSum = addStats(rawSum, s, 1);
      const dmg = s.damagePct ?? 0;
      if (cond.weaponClassRestriction === 'One-Handed') {
        if (cond.matched) oneHandedBonusPct += dmg;
      } else if (cond.weaponClassRestriction === 'Dual-Wield') {
        if (cond.matched) dualWieldBonusPct += dmg;
      } else if (cond.weaponClassRestriction === 'Two-Handed') {
        if (cond.matched) twoHandedBonusPct += dmg;
      } else if (!cond.isEdgeOnlyDamage && cond.matched) {
        effectiveGeneralDamagePct += dmg;
      }
    }

    return {
      slotIndex,
      accessory,
      isDuplicate,
      isConditionalMatch: cond.matched,
      reason: isDuplicate ? 'Duplicate charm in another slot (does not stack)' : cond.reason,
      matchedGearNames: cond.matchedGearNames,
    };
  });

  const buildWeaponPreview = (weapon: MainWeapon): WeaponEffectivePreview => {
    const classBonusPct =
      weapon.weaponClass === 'One-Handed'
        ? oneHandedBonusPct
        : weapon.weaponClass === 'Dual-Wield'
          ? dualWieldBonusPct
          : twoHandedBonusPct;
    const totalDmgPct = effectiveGeneralDamagePct + classBonusPct;
    const gbPct = rawSum.guardBreakPct ?? 0;
    return {
      weapon,
      baseAttackLv25: weapon.damageLv25,
      effectiveAttackLv25: Math.round(weapon.damageLv25 * (1 + totalDmgPct / 100)),
      baseGuardBreakLv25: weapon.guardBreakLv25,
      effectiveGuardBreakLv25: Math.round(weapon.guardBreakLv25 * (1 + gbPct / 100)),
      classBonusPct,
    };
  };

  const weapon1Preview = buildWeaponPreview(weapon1);
  const weapon2Preview = buildWeaponPreview(weapon2);

  const effectiveDamagePct =
    effectiveGeneralDamagePct + oneHandedBonusPct + dualWieldBonusPct + twoHandedBonusPct;

  const totals: LoadoutTotals = {
    damagePct: rawSum.damagePct ?? 0,
    effectiveDamagePct,
    guardBreakPct: rawSum.guardBreakPct ?? 0,
    damageReductionPct: rawSum.damageReductionPct ?? 0,
    parryWindowPct: rawSum.parryWindowPct ?? 0,
    healingPct: rawSum.healingPct ?? 0,
    shaChiPct: rawSum.shaChiPct ?? 0,
    sparkEfficiencyPct: rawSum.sparkEfficiencyPct ?? 0,
  };

  // Detect live cross-gear synergies for ANY combination
  const synergies: LoadoutSynergyItem[] = [];
  const allAccTags = new Set<string>();
  slots.forEach((sl) => {
    if (!sl.isDuplicate) sl.accessory.synergyTags.forEach((t) => allAccTags.add(t));
  });

  const hasWeaponOrEdgeTag = (tag: string) =>
    w1Tags.has(tag) || w2Tags.has(tag) || e1Tags.has(tag) || e2Tags.has(tag);

  // 1. Wet + Lightning combo
  if (hasWeaponOrEdgeTag('wet') && hasWeaponOrEdgeTag('lightning')) {
    synergies.push({
      id: 'wet-lightning',
      title: 'Wet → Lightning Shock Chain',
      detail: `${edge1.tags.includes('wet') ? edge1.name : edge2.name} applies Wet to amplify Lightning shock stuns from your storm gear.`,
      tier: 'combo',
    });
  }

  // 2. Bleed Hemorrhage loop
  const bleedSources = [
    ...(w1Tags.has('bleed') ? [weapon1.name] : []),
    ...(w2Tags.has('bleed') && weapon2.id !== weapon1.id ? [weapon2.name] : []),
    ...(e1Tags.has('bleed') ? [edge1.name] : []),
    ...(e2Tags.has('bleed') && edge2.id !== edge1.id ? [edge2.name] : []),
    ...slots.filter((s) => !s.isDuplicate && s.accessory.synergyTags.includes('bleed')).map((s) => s.accessory.name),
  ];
  if (bleedSources.length >= 2 && hasWeaponOrEdgeTag('bleed')) {
    synergies.push({
      id: 'bleed-engine',
      title: 'Hemorrhage Bleed Engine',
      detail: `Active Bleed stacking & burst across ${bleedSources.slice(0, 4).join(' + ')}.`,
      tier: bleedSources.length >= 3 ? 'combo' : 'active',
    });
  }

  // 3. Fire / Burn synergy
  const fireSources = [
    ...(w1Tags.has('burn') || w1Tags.has('fire') ? [weapon1.name] : []),
    ...(w2Tags.has('burn') || w2Tags.has('fire') ? [weapon2.name] : []),
    ...(e1Tags.has('burn') || e1Tags.has('fire') ? [edge1.name] : []),
    ...(e2Tags.has('burn') || e2Tags.has('fire') ? [edge2.name] : []),
    ...slots
      .filter((s) => !s.isDuplicate && (s.accessory.synergyTags.includes('burn') || s.accessory.synergyTags.includes('fire')))
      .map((s) => s.accessory.name),
  ];
  if (fireSources.length >= 2) {
    synergies.push({
      id: 'burn-engine',
      title: 'Infernal Burn Amplification',
      detail: `Layered Fire & Burn pressure powered by ${Array.from(new Set(fireSources)).join(' + ')}.`,
      tier: 'combo',
    });
  }

  // 4. Freeze Shatter synergy
  if (hasWeaponOrEdgeTag('freeze') && (allAccTags.has('freeze') || slots.some((s) => s.accessory.id === 'snow-and-blood'))) {
    synergies.push({
      id: 'freeze-shatter',
      title: 'Frostbite & Shatter Control',
      detail: 'Chills and freezes aggressive bosses while amplifying follow-up burst.',
      tier: 'combo',
    });
  }

  // 5. Ghoststep / Parry Counter Loop
  const parryCount =
    (w1Tags.has('parry') || w1Tags.has('ghoststep') ? 1 : 0) +
    (w2Tags.has('parry') || w2Tags.has('ghoststep') ? 1 : 0) +
    (e1Tags.has('parry') || e1Tags.has('deflect') ? 1 : 0) +
    (e2Tags.has('parry') || e2Tags.has('deflect') ? 1 : 0) +
    slots.filter((s) => !s.isDuplicate && (s.accessory.synergyTags.includes('parry') || s.accessory.synergyTags.includes('ghoststep'))).length;
  if (parryCount >= 3 || totals.parryWindowPct > 0) {
    synergies.push({
      id: 'parry-ghoststep',
      title: 'Ghoststep & Perfect Parry Counter',
      detail: `${totals.parryWindowPct > 0 ? `+${totals.parryWindowPct}% Parry/Dodge window` : 'High counter tempo'} paired with ${parryCount} parry/Ghoststep synergies.`,
      tier: parryCount >= 3 ? 'combo' : 'active',
    });
  }

  // 6. Spark & Summon Engine
  const hasSummonEdge = edge1.edgeClass === 'Summon' || edge2.edgeClass === 'Summon';
  if (totals.sparkEfficiencyPct > 0 || hasSummonEdge) {
    synergies.push({
      id: 'spark-engine',
      title: hasSummonEdge ? 'Summon & Remnant Spark Engine' : 'Remnant Spark Recycling',
      detail: `${edge1.name} + ${edge2.name} (${edge1.sparkCost + edge2.sparkCost} total Spark cost)${totals.sparkEfficiencyPct > 0 ? ` boosted by +${totals.sparkEfficiencyPct}% Spark Efficiency` : ''}.`,
      tier: hasSummonEdge && totals.sparkEfficiencyPct >= 20 ? 'combo' : 'active',
    });
  }

  // 7. Posture / Guard-Break & Execution
  if (totals.guardBreakPct >= 15 || (hasWeaponOrEdgeTag('guard-break') && (allAccTags.has('guard-break') || allAccTags.has('execution')))) {
    synergies.push({
      id: 'posture-shred',
      title: 'Yellow Sha-Chi Posture Shred',
      detail: `Rapidly breaks boss stances (+${totals.guardBreakPct}% Guard Break from charms) for Deathblow Executions.`,
      tier: totals.guardBreakPct >= 20 ? 'combo' : 'active',
    });
  }

  // 8. Survival / Tank / Hellwalker Sustain
  if (totals.damageReductionPct >= 20 || totals.healingPct >= 18 || w1Tags.has('lifesteal') || w2Tags.has('lifesteal')) {
    synergies.push({
      id: 'sustain-shell',
      title: 'Hellwalker Survival & Sustain',
      detail: `+${totals.damageReductionPct}% Damage Reduction and +${totals.healingPct}% Healing Power keep Soul resilient against Red/Black-Flash punishes.`,
      tier: 'active',
    });
  }

  // Warnings for conflicts / duplicates / unmatched conditionals
  if (weapon1.id === weapon2.id) {
    synergies.push({
      id: 'dup-weapon',
      title: 'Same Main Weapon in Both Slots',
      detail: `Consider pairing ${weapon1.name} with a complementary weapon class (e.g., One-Handed + Two-Handed) for swap versatility.`,
      tier: 'warning',
    });
  }
  if (edge1.id === edge2.id) {
    synergies.push({
      id: 'dup-edge',
      title: 'Same Phantom Edge in Both Slots',
      detail: `Equip two distinct Phantom Edges to cover more combat roles and exploration obstacles.`,
      tier: 'warning',
    });
  }
  slots.forEach((sl) => {
    if (sl.isDuplicate) {
      synergies.push({
        id: `dup-acc-${sl.slotIndex}`,
        title: `Duplicate Charm: ${sl.accessory.name}`,
        detail: `Slot ${sl.slotIndex + 1} duplicates an already-equipped accessory and is excluded from totals.`,
        tier: 'warning',
      });
    } else if (!sl.isConditionalMatch) {
      synergies.push({
        id: `unmatched-${sl.slotIndex}`,
        title: `Unmatched Gear: ${sl.accessory.name}`,
        detail: sl.reason,
        tier: 'warning',
      });
    }
  });

  // Compute Archetype & Synergy Score
  let score = 50;
  score += synergies.filter((s) => s.tier === 'combo').length * 14;
  score += synergies.filter((s) => s.tier === 'active').length * 6;
  score -= synergies.filter((s) => s.tier === 'warning').length * 10;
  if (weapon1.weaponClass !== weapon2.weaponClass) score += 6;
  if (edge1.edgeClass !== edge2.edgeClass) score += 4;
  const synergyScore = Math.max(20, Math.min(100, score));
  const synergyRank: 'S' | 'A' | 'B' | 'C' =
    synergyScore >= 82 ? 'S' : synergyScore >= 68 ? 'A' : synergyScore >= 52 ? 'B' : 'C';

  const topCombo = synergies.find((s) => s.tier === 'combo');
  const archetype =
    topCombo?.title ??
    (totals.damageReductionPct >= 25
      ? 'Armored Hellwalker Bruiser'
      : totals.effectiveDamagePct >= 30
        ? 'High-Burst Martial Duelist'
        : `${weapon1.weaponClass} / ${edge1.edgeClass} Hybrid`);

  const obstaclesCovered = Array.from(
    new Set(
      [edge1.obstacleLabel, edge2.obstacleLabel].filter(
        (label): label is string => Boolean(label)
      )
    )
  );

  return {
    weapon1,
    weapon2,
    edge1,
    edge2,
    slots,
    totals,
    weapon1Preview,
    weapon2Preview,
    totalSparkCost: edge1.sparkCost + edge2.sparkCost,
    obstaclesCovered,
    archetype,
    synergyScore,
    synergyRank,
    synergies,
  };
}
