export type SeedType = 'carrot' | 'tomato' | 'wheat' | 'corn' | 'sunflower' | 'pumpkin' | 'strawberry' | 'potato' | 'eggplant';

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
  farmSize: number;
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
  },
  pumpkin: {
    name: 'Pumpkin',
    cost: 40,
    growthDuration: 100000, // 100 seconds
    sellPrice: 100,
    emoji: '🎃'
  },
  strawberry: {
    name: 'Strawberry',
    cost: 25,
    growthDuration: 50000, // 50 seconds
    sellPrice: 60,
    emoji: '🍓'
  },
  potato: {
    name: 'Potato',
    cost: 12,
    growthDuration: 40000, // 40 seconds
    sellPrice: 30,
    emoji: '🥔'
  },
  eggplant: {
    name: 'Eggplant',
    cost: 35,
    growthDuration: 75000, // 75 seconds
    sellPrice: 90,
    emoji: '🍆'
  }
};