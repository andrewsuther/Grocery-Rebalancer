function MetricCard({ title, value, change, icon }) {
  try {
    const isPositive = change >= 0;
    const changeColor = isPositive ? 'text-[var(--success-color)]' : 'text-[var(--danger-color)]';
    const changeIcon = isPositive ? 'trending-up' : 'trending-down';

    return (
      <div className="dashboard-card" data-name="metric-card" data-file="components/MetricCard.js">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center">
            <div className={`icon-${icon} text-sm sm:text-lg text-[var(--text-secondary)]`}></div>
          </div>
          <div className={`flex items-center space-x-1 ${changeColor}`}>
            <div className={`icon-${changeIcon} text-xs sm:text-sm`}></div>
            <span className="text-xs sm:text-sm font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="metric-value break-words">{value}</div>
        </div>

        <div className="metric-label break-words">{title}</div>
      </div>
    );
  } catch (error) {
    console.error('MetricCard component error:', error);
    return null;
  }
}