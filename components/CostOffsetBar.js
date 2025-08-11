function CostOffsetBar({ percentage, marginRecovered, cpiTargetMet }) {
  try {
    const getProgressColor = (percentage) => {
      if (percentage <= 25) return 'bg-red-500';
      if (percentage <= 50) return 'bg-orange-500';
      if (percentage <= 75) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    const milestones = [
      { position: 0, label: '0% – Uncovered' },
      { position: 25, label: '25% – Minor Recovery' },
      { position: 50, label: '50% – Halfway There' },
      { position: 75, label: '75% – Almost Recovered' },
      { position: 100, label: '100% – Fully Offset' }
    ];

    return (
      <div className="dashboard-card" data-name="cost-offset-bar" data-file="components/CostOffsetBar.js">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 text-center">
            Progress Toward Cost Offset Goal
          </h2>
          <div className="text-center space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">{percentage}%</div>
            <div className="text-sm sm:text-base text-[var(--text-secondary)]">of Cost Increases Offset</div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="offset-progress-bar">
            <div 
              className={`offset-progress-fill ${getProgressColor(percentage)}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
            
            {/* Milestone markers */}
            {milestones.slice(1, -1).map((milestone) => (
              <div
                key={milestone.position}
                className="milestone-marker"
                style={{ left: `${milestone.position}%` }}
              ></div>
            ))}
          </div>

          {/* Milestone labels */}
          <div className="relative mt-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.position}
                className="milestone-label absolute"
                style={{ 
                  left: `${milestone.position}%`,
                  transform: milestone.position === 0 ? 'translateX(0)' : 
                           milestone.position === 100 ? 'translateX(-100%)' : 
                           'translateX(-50%)',
                  width: 'max-content'
                }}
              >
                {milestone.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="metric-value">${marginRecovered.toLocaleString()}</div>
            <div className="metric-label">Margin Recovered</div>
          </div>
          <div className="text-center md:text-right space-y-1">
            <div className="metric-value">{cpiTargetMet}%</div>
            <div className="metric-label">CPI Target Met</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CostOffsetBar component error:', error);
    return null;
  }
}