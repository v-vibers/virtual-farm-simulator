export type SeedType = 'carrot' | 'tomato' | 'wheat' | 'corn' | 'sunflower' | 'pumpkin' | 'strawberry' | 'potato' | 'eggplant';

export type RarityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Seed {
  id: string;
  type: SeedType;
  plantedAt: number;
  growthDuration: number;
}

export interface SeedConfig {
  name: string;
  cost: number;
  growthDuration: number;
  sellPrice: number;
  emoji: string;
  rarity: RarityTier;
}

export interface FarmState {
  money: number;
  seeds: Seed[];
  lastUpdated: number;
  farmSize: number;
}

export const RARITY_INFO: Record<RarityTier, { label: string; color: string; multiplier: number }> = {
  common: { label: 'Common', color: '#9ca3af', multiplier: 1 },
  uncommon: { label: 'Uncommon', color: '#4ade80', multiplier: 1.5 },
  rare: { label: 'Rare', color: '#3b82f6', multiplier: 2.5 },
  epic: { label: 'Epic', color: '#a855f7', multiplier: 4 },
  legendary: { label: 'Legendary', color: '#f59e0b', multiplier: 6 }
};

export const SEED_CONFIGS: Record<SeedType, SeedConfig> = {
  // Common Tier - Basic crops, low profit
  carrot: {
    name: 'Carrot',
    cost: 15,
    growthDuration: 40000, // 40 seconds
    sellPrice: 35,
    emoji: '🥕',
    rarity: 'common'
  },
  potato: {
    name: 'Potato',
    cost: 20,
    growthDuration: 45000, // 45 seconds
    sellPrice: 42,
    emoji: '🥔',
    rarity: 'common'
  },
  wheat: {
    name: 'Wheat',
    cost: 18,
    growthDuration: 50000, // 50 seconds
    sellPrice: 40,
    emoji: '🌾',
    rarity: 'common'
  },
  // Uncommon Tier - Moderate investment, decent returns
  tomato: {
    name: 'Tomato',
    cost: 35,
    growthDuration: 70000, // 70 seconds
    sellPrice: 85,
    emoji: '🍅',
    rarity: 'uncommon'
  },
  strawberry: {
    name: 'Strawberry',
    cost: 45,
    growthDuration: 80000, // 80 seconds
    sellPrice: 110,
    emoji: '🍓',
    rarity: 'uncommon'
  },
  // Rare Tier - Higher investment, good profits
  eggplant: {
    name: 'Eggplant',
    cost: 75,
    growthDuration: 120000, // 120 seconds (2 minutes)
    sellPrice: 220,
    emoji: '🍆',
    rarity: 'rare'
  },
  corn: {
    name: 'Corn',
    cost: 80,
    growthDuration: 130000, // 130 seconds
    sellPrice: 240,
    emoji: '🌽',
    rarity: 'rare'
  },
  // Epic Tier - Significant investment, high returns
  pumpkin: {
    name: 'Pumpkin',
    cost: 140,
    growthDuration: 180000, // 180 seconds (3 minutes)
    sellPrice: 480,
    emoji: '🎃',
    rarity: 'epic'
  },
  // Legendary Tier - Maximum investment, maximum profit
  sunflower: {
    name: 'Sunflower',
    cost: 250,
    growthDuration: 300000, // 300 seconds (5 minutes)
    sellPrice: 1100,
    emoji: '🌻',
    rarity: 'legendary'
  }
};