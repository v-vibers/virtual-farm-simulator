export type SeedType = 'carrot' | 'tomato' | 'wheat' | 'corn' | 'sunflower';

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
}

export interface FarmState {
  money: number;
  seeds: Seed[];
  lastUpdated: number;
}

export const SEED_CONFIGS: Record<SeedType, SeedConfig> = {
  carrot: {
    name: 'Carrot',
    cost: 10,
    growthDuration: 30000, // 30 seconds
    sellPrice: 25,
    emoji: '🥕'
  },
  tomato: {
    name: 'Tomato',
    cost: 20,
    growthDuration: 45000, // 45 seconds
    sellPrice: 50,
    emoji: '🍅'
  },
  wheat: {
    name: 'Wheat',
    cost: 15,
    growthDuration: 60000, // 60 seconds
    sellPrice: 40,
    emoji: '🌾'
  },
  corn: {
    name: 'Corn',
    cost: 30,
    growthDuration: 90000, // 90 seconds
    sellPrice: 80,
    emoji: '🌽'
  },
  sunflower: {
    name: 'Sunflower',
    cost: 50,
    growthDuration: 120000, // 120 seconds
    sellPrice: 150,
    emoji: '🌻'
  }
};