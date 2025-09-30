import { useState, useEffect } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import { FarmState, Seed, SeedType, SEED_CONFIGS, RARITY_INFO } from '../types';

// Helper hook for localStorage fallback in demo mode
function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void, 'local'] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [value, setStoredValue, 'local'];
}

interface VirtualFarmProps {
  onShowSignIn?: () => void;
}

export function VirtualFarm({ onShowSignIn }: VirtualFarmProps) {
  const { useStorage, signOut, usage, subscriptionStatus, user, isSignedIn } = useSubscribeDev();

  // Use cloud storage when signed in, localStorage in demo mode
  const useFarmStorage = isSignedIn && useStorage
    ? useStorage
    : useLocalStorage;

  const useDarkModeStorage = isSignedIn && useStorage
    ? useStorage
    : useLocalStorage;

  const [farmState, setFarmState, syncStatus] = useFarmStorage<FarmState>('farm-state', {
    money: 100,
    seeds: [],
    lastUpdated: Date.now(),
    farmSize: 3
  });

  const [darkMode, setDarkMode] = useDarkModeStorage<boolean>('dark-mode', false);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [clickAnimation, setClickAnimation] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);

  // Ensure farmSize exists for older saves
  useEffect(() => {
    if (farmState.farmSize === undefined) {
      setFarmState({
        ...farmState,
        farmSize: 3
      });
    }
  }, []);

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
    const maxPlots = (farmState.farmSize || 3) * (farmState.farmSize || 3);

    if (farmState.money < config.cost) return;
    if (farmState.seeds.length >= maxPlots) return;

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

  const expandFarm = () => {
    const currentSize = farmState.farmSize || 3;
    const expansionCost = currentSize * 100;

    if (farmState.money < expansionCost) return;
    if (currentSize >= 10) return; // Max size limit

    setFarmState({
      ...farmState,
      money: farmState.money - expansionCost,
      farmSize: currentSize + 1,
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

  const maxPlots = (farmState.farmSize || 3) * (farmState.farmSize || 3);
  const currentSize = farmState.farmSize || 3;
  const expansionCost = currentSize * 100;

  return (
    <div className="virtual-farm">
      <header className="farm-header">
        <div className="farm-title">
          <h1>🌱 Virtual Farm</h1>
          <div className="header-buttons">
            <button
              onClick={() => setShowShopModal(true)}
              className="shop-button"
              title="Open Shop"
            >
              🏪 Shop
            </button>
            <button onClick={toggleDarkMode} className="theme-toggle" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            {isSignedIn ? (
              <button onClick={signOut} className="sign-out-button">
                Sign Out
              </button>
            ) : (
              <button onClick={onShowSignIn} className="sign-in-button">
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="farm-stats">
          <div className="stat-card">
            <span className="stat-label">Balance</span>
            <span className="stat-value">💰 ${farmState.money}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Farm Plots</span>
            <span className="stat-value">📏 {farmState.seeds.length}/{maxPlots}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Farm Size</span>
            <span className="stat-value">🏡 {currentSize}x{currentSize}</span>
          </div>
          {isSignedIn && (
            <>
              <div className="stat-card">
                <span className="stat-label">Credits</span>
                <span className="stat-value">⚡ {usage?.remainingCredits ?? 0}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Plan</span>
                <span className="stat-value">📊 {subscriptionStatus?.plan?.name ?? 'Free'}</span>
              </div>
            </>
          )}
        </div>

        <div className="user-info">
          {isSignedIn ? (
            <>
              <span className="user-email">{user?.email}</span>
              <span className={`sync-status sync-${syncStatus}`}>
                {syncStatus === 'synced' && '✓ Synced'}
                {syncStatus === 'syncing' && '⟳ Syncing...'}
                {syncStatus === 'local' && '○ Local'}
                {syncStatus === 'error' && '✗ Error'}
              </span>
            </>
          ) : (
            <>
              <span className="demo-badge">Demo Mode</span>
              <span className="sync-status sync-local">○ Local Storage</span>
            </>
          )}
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

      {showShopModal && (
        <div className="modal-overlay" onClick={() => setShowShopModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🏪 Farm Shop</h2>
              <button onClick={() => setShowShopModal(false)} className="close-button">
                ✕
              </button>
            </div>

            <div className="shop-tabs">
              <div className="shop-tab active">Seeds</div>
            </div>

            <div className="shop-section-modal">
              <h3>🌱 Seeds</h3>
              <p className="shop-hint">
                {farmState.seeds.length >= maxPlots
                  ? '⚠️ Farm is full! Expand your farm to plant more seeds.'
                  : `Available plots: ${maxPlots - farmState.seeds.length}/${maxPlots}`}
              </p>
              <div className="seed-shop">
                {(Object.keys(SEED_CONFIGS) as SeedType[]).map((seedType) => {
                  const config = SEED_CONFIGS[seedType];
                  const rarityInfo = RARITY_INFO[config.rarity];
                  const canAfford = farmState.money >= config.cost;
                  const farmFull = farmState.seeds.length >= maxPlots;

                  return (
                    <button
                      key={seedType}
                      onClick={() => {
                        plantSeed(seedType);
                        if (farmState.seeds.length + 1 >= maxPlots) {
                          // Don't close modal if farm will be full
                        }
                      }}
                      disabled={!canAfford || farmFull}
                      className={`seed-card rarity-${config.rarity}`}
                      title={
                        farmFull
                          ? 'Farm is full'
                          : !canAfford
                          ? 'Not enough money'
                          : 'Click to plant'
                      }
                    >
                      <span className="rarity-badge" style={{ backgroundColor: rarityInfo.color }}>
                        {rarityInfo.label}
                      </span>
                      <span className="seed-emoji">{config.emoji}</span>
                      <span className="seed-name">{config.name}</span>
                      <span className="seed-cost">💰 ${config.cost}</span>
                      <span className="seed-info">
                        ⏱️ {Math.floor(config.growthDuration / 1000)}s → 💰 ${config.sellPrice}
                      </span>
                      <span className="seed-profit">
                        📈 Profit: ${config.sellPrice - config.cost}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shop-section-modal">
              <h3>🏡 Farm Expansion</h3>
              <p className="shop-hint">
                Current size: {currentSize}x{currentSize} ({maxPlots} plots)
                {currentSize >= 10 ? ' - Maximum size reached!' : ''}
              </p>
              <div className="expansion-area">
                <div className="expansion-card">
                  <span className="expansion-icon">📐</span>
                  <div className="expansion-info">
                    <h4>Expand Farm</h4>
                    <p>Increase farm size to {currentSize + 1}x{currentSize + 1}</p>
                    <p className="expansion-benefit">
                      +{(currentSize + 1) * (currentSize + 1) - maxPlots} new plots
                    </p>
                  </div>
                  <button
                    onClick={expandFarm}
                    disabled={farmState.money < expansionCost || currentSize >= 10}
                    className="expansion-button"
                    title={
                      currentSize >= 10
                        ? 'Maximum size reached'
                        : farmState.money < expansionCost
                        ? `Need $${expansionCost - farmState.money} more`
                        : 'Click to expand'
                    }
                  >
                    <span className="expansion-cost">💰 ${expansionCost}</span>
                    <span>Buy Expansion</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="farm-section">
        <h2>🌾 Your Farm</h2>
        <div className="farm-grid" style={{ gridTemplateColumns: `repeat(${currentSize}, 1fr)` }}>
          {Array.from({ length: maxPlots }).map((_, index) => {
            const seed = farmState.seeds[index];

            if (!seed) {
              // Empty slot
              return (
                <div
                  key={`empty-${index}`}
                  className="plant-card empty-slot"
                  onClick={() => setShowShopModal(true)}
                  title="Click to open shop and plant seeds"
                >
                  <div className="empty-slot-icon">🌱</div>
                  <div className="empty-slot-text">Empty Plot<br/>Click to Plant</div>
                </div>
              );
            }

            // Planted seed
            const config = SEED_CONFIGS[seed.type];
            const rarityInfo = RARITY_INFO[config.rarity];
            const progress = getGrowthProgress(seed);
            const grown = isGrown(seed);

            return (
              <div
                key={seed.id}
                className={`plant-card ${grown ? 'grown' : 'growing'} rarity-${config.rarity}`}
                style={{ borderColor: grown ? rarityInfo.color : undefined }}
              >
                <div className="plant-emoji">{grown ? config.emoji : '🌱'}</div>
                <div className="plant-info">
                  <span className="plant-name">{config.name}</span>
                  <span className="plant-rarity-small" style={{ color: rarityInfo.color }}>
                    {rarityInfo.label}
                  </span>
                  {grown ? (
                    <button onClick={() => harvestSeed(seed.id)} className="harvest-button">
                      Harvest 💰 ${config.sellPrice}
                    </button>
                  ) : (
                    <>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${rarityInfo.color} 0%, ${rarityInfo.color}dd 100%)`
                          }}
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
      </div>
    </div>
  );
}