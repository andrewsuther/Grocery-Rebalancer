function AlertNotification({ alert, onClick, onDismiss }) {
  try {
    const getAlertClass = (type) => {
      switch (type) {
        case 'critical': return 'alert-critical';
        case 'warning': return 'alert-warning';
        case 'opportunity': return 'alert-opportunity';
        default: return 'alert-info';
      }
    };

    const getAlertIcon = (type) => {
      switch (type) {
        case 'critical': return 'alert-circle';
        case 'warning': return 'alert-triangle';
        case 'opportunity': return 'lightbulb';
        default: return 'info';
      }
    };

    const formatTime = (timestamp) => {
      const now = new Date();
      const alertTime = new Date(timestamp);
      const diffMinutes = Math.floor((now - alertTime) / (1000 * 60));
      
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    };

    return (
      <div
        className={`alert-notification ${getAlertClass(alert.type)} ${!alert.read ? 'font-medium' : ''}`}
        onClick={onClick}
        data-name="alert-notification"
        data-file="components/AlertNotification.js"
      >
        <div className="alert-header">
          <div className="flex items-center space-x-2">
            <div className={`icon-${getAlertIcon(alert.type)} text-sm`}></div>
            <span className="alert-title">{alert.title}</span>
            {!alert.read && <div className="w-2 h-2 bg-current rounded-full"></div>}
          </div>
          <div className="flex items-center space-x-2">
            <span className="alert-time">{formatTime(alert.timestamp)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
            >
              <div className="icon-x text-xs"></div>
            </button>
          </div>
        </div>

        <div className="alert-description">
          {alert.description}
        </div>

        {alert.actions && alert.actions.length > 0 && (
          <div className="alert-actions">
            {alert.actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.handler();
                }}
                className={`alert-action-btn ${
                  index === 0 ? 'alert-primary-btn' : 'alert-secondary-btn'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {alert.metric && (
          <div className="mt-2 text-xs opacity-75">
            Current: {alert.metric.current} | Target: {alert.metric.target}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AlertNotification component error:', error);
    return null;
  }
}