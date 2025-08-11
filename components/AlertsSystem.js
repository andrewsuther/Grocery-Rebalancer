function AlertsSystem({ alerts, showAlerts, onToggleAlerts, onDismissAlert, data, selectedDesk }) {
  try {
    const [settings, setSettings] = React.useState({
      criticalThreshold: 60,
      warningThreshold: 75,
      enableSound: true,
      autoShow: true
    });
    const [showSettings, setShowSettings] = React.useState(false);

    const unreadCount = alerts.filter(alert => !alert.read).length;

    const handleAlertClick = (alert) => {
      if (!alert.read) {
        const updatedAlerts = alerts.map(a => 
          a.id === alert.id ? { ...a, read: true } : a
        );
        // In a real app, this would update the alerts state
      }
      
      if (alert.action) {
        alert.action();
      }
    };

    const handleSettingChange = (key, value) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
      <>


        {/* Alerts Panel */}
        {showAlerts && (
          <div className="fixed top-3 right-3 lg:top-4 lg:right-4 w-72 lg:w-80 max-h-80 lg:max-h-96 overflow-y-auto z-50 bg-white rounded-lg shadow-xl border border-[var(--border-color)]">
            <div className="p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[var(--text-primary)]">Alerts & Notifications</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <div className="icon-settings text-sm text-[var(--text-secondary)]"></div>
                  </button>
                  <button
                    onClick={() => onToggleAlerts(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <div className="icon-x text-sm text-[var(--text-secondary)]"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto p-4">
              {alerts.length === 0 ? (
                <div className="text-center text-[var(--text-secondary)] py-8">
                  <div className="icon-check-circle text-2xl mb-2"></div>
                  <p>No alerts at this time</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <AlertNotification
                    key={alert.id}
                    alert={alert}
                    onClick={() => handleAlertClick(alert)}
                    onDismiss={() => onDismissAlert(alert.id)}
                  />
                ))
              )}
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="alerts-settings">
                <h4 className="font-medium text-[var(--text-primary)] mb-3">Alert Settings</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                      Critical Threshold: {settings.criticalThreshold}%
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="80"
                      value={settings.criticalThreshold}
                      onChange={(e) => handleSettingChange('criticalThreshold', parseInt(e.target.value))}
                      className="threshold-slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                      Warning Threshold: {settings.warningThreshold}%
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="90"
                      value={settings.warningThreshold}
                      onChange={(e) => handleSettingChange('warningThreshold', parseInt(e.target.value))}
                      className="threshold-slider"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-primary)]">Sound Notifications</span>
                    <button
                      onClick={() => handleSettingChange('enableSound', !settings.enableSound)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        settings.enableSound ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.enableSound ? 'transform translate-x-5' : 'transform translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('AlertsSystem component error:', error);
    return null;
  }
}