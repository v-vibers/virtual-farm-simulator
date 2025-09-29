import { useState, useEffect } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import { FarmState, Seed, SeedType, SEED_CONFIGS } from '../types';

export function VirtualFarm() {
  const { useStorage, signOut, usage, subscriptionStatus, user } = useSubscribeDev();

  const [farmState, setFarmState, syncStatus] = useStorage!<FarmState>('farm-state', {
    money: 100,
    seeds: [],
    lastUpdated: Date.now()
  });

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [clickAnimation, setClickAnimation] = useState(false);

  // Update current time every 100ms for smooth growth progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const earnMoney = () => {
    setFarmState({
      ...farmState,
      money: farmState.money + 5,
      lastUpdated: Date.now()
    });
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 300);
  };

  const plantSeed = (seedType: SeedType) => {
    const config = SEED_CONFIGS[seedType];
    if (farmState.money < config.cost) return;

    const newSeed: Seed = {
      id: `${Date.now()}-${Math.random()}`,
      type: seedType,
      plantedAt: Date.now(),
      growthDuration: config.growthDuration
    };

    setFarmState({
      ...farmState,
      money: farmState.money - config.cost,
      seeds: [...farmState.seeds, newSeed],
      lastUpdated: Date.now()
    });
  };

  const harvestSeed = (seedId: string) => {
    const seed = farmState.seeds.find(s => s.id === seedId);
    if (!seed) return;

    const isGrown = currentTime - seed.plantedAt >= seed.growthDuration;
    if (!isGrown) return;

    const config = SEED_CONFIGS[seed.type];
    setFarmState({
      ...farmState,
      money: farmState.money + config.sellPrice,
      seeds: farmState.seeds.filter(s => s.id !== seedId),
      lastUpdated: Date.now()
    });
  };

  const getGrowthProgress = (seed: Seed): number => {
    const elapsed = currentTime - seed.plantedAt;
    return Math.min((elapsed / seed.growthDuration) * 100, 100);
  };

  const isGrown = (seed: Seed): boolean => {
    return getGrowthProgress(seed) >= 100;
  };

  return (
    <div className="virtual-farm">
      <header className="farm-header">
        <div className="farm-title">
          <h1>🌱 Virtual Farm</h1>
          <button onClick={signOut} className="sign-out-button">
            Sign Out
          </button>
        </div>

        <div className="farm-stats">
          <div className="stat-card">
            <span className="stat-label">Balance</span>
            <span className="stat-value">💰 ${farmState.money}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Growing</span>
            <span className="stat-value">🌱 {farmState.seeds.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Credits</span>
            <span className="stat-value">⚡ {usage?.remainingCredits ?? 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Plan</span>
            <span className="stat-value">📊 {subscriptionStatus?.plan?.name ?? 'Free'}</span>
          </div>
        </div>

        <div className="user-info">
          <span className="user-email">{user?.email}</span>
          <span className={`sync-status sync-${syncStatus}`}>
            {syncStatus === 'synced' && '✓ Synced'}
            {syncStatus === 'syncing' && '⟳ Syncing...'}
            {syncStatus === 'local' && '○ Local'}
            {syncStatus === 'error' && '✗ Error'}
          </span>
        </div>
      </header>

      <div className="earn-section">
        <button
          onClick={earnMoney}
          className={`earn-button ${clickAnimation ? 'clicked' : ''}`}
        >
          <span className="earn-icon">💵</span>
          <span>Click to Earn $5</span>
        </button>
      </div>

      <div className="shop-section">
        <h2>🏪 Seed Shop</h2>
        <div className="seed-shop">
          {(Object.keys(SEED_CONFIGS) as SeedType[]).map((seedType) => {
            const config = SEED_CONFIGS[seedType];
            const canAfford = farmState.money >= config.cost;

            return (
              <button
                key={seedType}
                onClick={() => plantSeed(seedType)}
                disabled={!canAfford}
                className="seed-card"
              >
                <span className="seed-emoji">{config.emoji}</span>
                <span className="seed-name">{config.name}</span>
                <span className="seed-cost">💰 ${config.cost}</span>
                <span className="seed-info">
                  ⏱️ {config.growthDuration / 1000}s → 💰 ${config.sellPrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="farm-section">
        <h2>🌾 Your Farm</h2>
        {farmState.seeds.length === 0 ? (
          <div className="empty-farm">
            <p>Your farm is empty. Plant some seeds to get started!</p>
          </div>
        ) : (
          <div className="farm-grid">
            {farmState.seeds.map((seed) => {
              const config = SEED_CONFIGS[seed.type];
              const progress = getGrowthProgress(seed);
              const grown = isGrown(seed);

              return (
                <div key={seed.id} className={`plant-card ${grown ? 'grown' : 'growing'}`}>
                  <div className="plant-emoji">{grown ? config.emoji : '🌱'}</div>
                  <div className="plant-info">
                    <span className="plant-name">{config.name}</span>
                    {grown ? (
                      <button onClick={() => harvestSeed(seed.id)} className="harvest-button">
                        Harvest 💰 ${config.sellPrice}
                      </button>
                    ) : (
                      <>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="progress-text">{Math.floor(progress)}%</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}