function ProgressCard({ title, current, target, percentage, status, icon }) {
  try {
    const getStatusColor = (status) => {
      switch (status) {
        case 'on-track': return 'bg-[var(--success-color)]';
        case 'behind': return 'bg-[var(--warning-color)]';
        case 'critical': return 'bg-[var(--danger-color)]';
        default: return 'bg-[var(--primary-color)]';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'on-track': return 'On Track';
        case 'behind': return 'Behind Target';
        case 'critical': return 'Critical';
        default: return 'In Progress';
      }
    };

    const getStatusIndicatorColor = (status) => {
      switch (status) {
        case 'on-track': return 'bg-green-100 text-green-800';
        case 'behind': return 'bg-yellow-100 text-yellow-800';
        case 'critical': return 'bg-red-100 text-red-800';
        default: return 'bg-blue-100 text-blue-800';
      }
    };

    return (
      <div className="dashboard-card" data-name="progress-card" data-file="components/ProgressCard.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--primary-color)] bg-opacity-10 flex items-center justify-center">
              <div className={`icon-${icon} text-sm sm:text-lg text-[var(--primary-color)]`}></div>
            </div>
            <h3 className="responsive-text-lg font-semibold text-[var(--text-primary)] truncate">{title}</h3>
          </div>
          <span className={`status-indicator ${getStatusIndicatorColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[var(--text-secondary)]">Progress</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">{percentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getStatusColor(status)}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-left">
            <div className="metric-value">${current.toLocaleString()}</div>
            <div className="metric-label">Current</div>
          </div>
          <div className="text-right">
            <div className="metric-value">${target.toLocaleString()}</div>
            <div className="metric-label">Target</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProgressCard component error:', error);
    return null;
  }
}