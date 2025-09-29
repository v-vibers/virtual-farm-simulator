interface SignInScreenProps {
  signIn: () => void;
}

export function SignInScreen({ signIn }: SignInScreenProps) {
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

        <button onClick={signIn} className="sign-in-button">
          Start Farming
        </button>
      </div>
    </div>
  );
}