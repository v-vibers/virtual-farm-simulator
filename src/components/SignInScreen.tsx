interface SignInScreenProps {
  signIn: () => void;
  onSkip?: () => void;
}

export function SignInScreen({ signIn, onSkip }: SignInScreenProps) {
  return (
    <div className="sign-in-screen">
      <div className="sign-in-container">
        <h1>🌱 Virtual Farm Simulator</h1>
        <p className="subtitle">Grow your dream garden and harvest rewards!</p>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">💰</span>
            <p>Click to earn money</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🌾</span>
            <p>Plant & grow seeds</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⏰</span>
            <p>Watch them grow in real-time</p>
          </div>
        </div>

        <div className="button-group">
          <button onClick={signIn} className="sign-in-button">
            Sign In to Start Farming
          </button>
          {onSkip && (
            <button onClick={onSkip} className="skip-button">
              Continue in Demo Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}