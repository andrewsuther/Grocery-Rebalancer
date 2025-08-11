function DashboardConfig({ config, showConfig, onToggleConfig, onConfigChange }) {
  try {
    const [activeTab, setActiveTab] = React.useState('layout');

    const tabs = [
      { id: 'layout', label: 'Layout', icon: 'layout' },
      { id: 'components', label: 'Components', icon: 'grid-3x3' },
      { id: 'order', label: 'Order', icon: 'list' }
    ];

    const layoutOptions = [
      { id: 'default', name: 'Default', description: 'Standard dashboard layout' },
      { id: 'compact', name: 'Compact', description: 'Condensed view with smaller cards' },
      { id: 'wide', name: 'Wide', description: 'Full-width layout for large screens' },
      { id: 'sidebar', name: 'Sidebar', description: 'Main content with right sidebar' }
    ];

    const componentOptions = [
      { id: 'costOffsetBar', name: 'Cost Offset Bar', description: 'Central progress indicator' },
      { id: 'progressCards', name: 'Progress Cards', description: 'Cost recovery and CPI cards' },
      { id: 'yearComparison', name: 'Year Comparison', description: 'Historical comparison charts' },
      { id: 'categoryBreakdown', name: 'Category Breakdown', description: 'Individual category performance' },
      { id: 'categoryComparison', name: 'Category Comparison', description: 'Side-by-side comparison matrix' },
      { id: 'interactiveCharts', name: 'Interactive Charts', description: 'Advanced visualizations' },
      { id: 'benchmarkComparison', name: 'Benchmark Comparison', description: 'Industry standards comparison' },
      { id: 'offsetContributors', name: 'Offset Contributors', description: 'Detailed actions table' },
      { id: 'metrics', name: 'Metrics Grid', description: 'Key performance indicators' }
    ];

    const handleLayoutChange = (layoutId) => {
      onConfigChange({ layout: layoutId });
    };

    const handleComponentToggle = (componentId) => {
      const newVisibleComponents = {
        ...config.visibleComponents,
        [componentId]: !config.visibleComponents[componentId]
      };
      onConfigChange({ visibleComponents: newVisibleComponents });
    };

    const handleOrderChange = (componentId, direction) => {
      const currentOrder = [...config.componentOrder];
      const currentIndex = currentOrder.indexOf(componentId);
      
      if (direction === 'up' && currentIndex > 0) {
        [currentOrder[currentIndex], currentOrder[currentIndex - 1]] = 
        [currentOrder[currentIndex - 1], currentOrder[currentIndex]];
      } else if (direction === 'down' && currentIndex < currentOrder.length - 1) {
        [currentOrder[currentIndex], currentOrder[currentIndex + 1]] = 
        [currentOrder[currentIndex + 1], currentOrder[currentIndex]];
      }
      
      onConfigChange({ componentOrder: currentOrder });
    };

    const resetToDefault = () => {
      onConfigChange({
        layout: 'default',
        visibleComponents: {
          progressCards: true,
          costOffsetBar: true,
          yearComparison: true,
          categoryBreakdown: true,
          categoryComparison: true,
          interactiveCharts: true,
          benchmarkComparison: true,
          offsetContributors: true,
          metrics: true
        },
        componentOrder: [
          'costOffsetBar',
          'yearComparison',
          'categoryBreakdown', 
          'categoryComparison',
          'interactiveCharts',
          'benchmarkComparison',
          'progressCards',
          'offsetContributors',
          'metrics'
        ]
      });
    };

    return (
      <>


        {/* Overlay */}
        {showConfig && (
          <div 
            className="config-overlay"
            onClick={() => onToggleConfig(false)}
          ></div>
        )}

        {/* Configuration Panel */}
        <div className={`fixed top-0 right-0 h-full w-full lg:w-80 bg-white shadow-xl border-l border-[var(--border-color)] z-50 transform transition-transform duration-300 ${showConfig ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="config-section">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Dashboard Settings</h3>
              <button
                onClick={() => onToggleConfig(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <div className="icon-x text-lg text-[var(--text-secondary)]"></div>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="config-section">
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <div className={`icon-${tab.icon} text-xs`}></div>
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'layout' && (
              <div className="config-section">
                <h4 className="font-medium text-[var(--text-primary)] mb-4">Choose Layout</h4>
                <div className="space-y-3">
                  {layoutOptions.map(layout => (
                    <div
                      key={layout.id}
                      className={`layout-option ${
                        config.layout === layout.id ? 'layout-option-active' : ''
                      }`}
                      onClick={() => handleLayoutChange(layout.id)}
                    >
                      <div className="layout-preview">
                        {/* Layout preview visualization would go here */}
                        <div className="layout-block" style={{
                          top: '4px', left: '4px', width: '40%', height: '50%'
                        }}></div>
                        <div className="layout-block" style={{
                          top: '4px', right: '4px', width: '50%', height: '50%'
                        }}></div>
                      </div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">{layout.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{layout.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'components' && (
              <div className="config-section">
                <h4 className="font-medium text-[var(--text-primary)] mb-4">Visible Components</h4>
                <div className="space-y-3">
                  {componentOptions.map(component => (
                    <div key={component.id} className="component-item">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[var(--text-primary)]">
                          {component.name}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {component.description}
                        </div>
                      </div>
                      <button
                        onClick={() => handleComponentToggle(component.id)}
                        className={`component-toggle ${
                          config.visibleComponents[component.id] ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`component-toggle-button ${
                            config.visibleComponents[component.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'order' && (
              <div className="config-section">
                <h4 className="font-medium text-[var(--text-primary)] mb-4">Component Order</h4>
                <div className="space-y-2">
                  {config.componentOrder.map((componentId, index) => {
                    const component = componentOptions.find(c => c.id === componentId);
                    return (
                      <div key={componentId} className="flex items-center space-x-2 p-2 border border-[var(--border-color)] rounded-lg">
                        <div className="drag-handle">
                          <div className="icon-grip-vertical text-sm text-[var(--text-secondary)]"></div>
                        </div>
                        <div className="flex-1 text-sm">{component?.name}</div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleOrderChange(componentId, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                          >
                            <div className="icon-chevron-up text-xs"></div>
                          </button>
                          <button
                            onClick={() => handleOrderChange(componentId, 'down')}
                            disabled={index === config.componentOrder.length - 1}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                          >
                            <div className="icon-chevron-down text-xs"></div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="config-section border-t">
            <div className="flex space-x-3">
              <button
                onClick={resetToDefault}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-gray-50 transition-colors text-sm"
              >
                Reset to Default
              </button>
              <button
                onClick={() => onToggleConfig(false)}
                className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('DashboardConfig component error:', error);
    return null;
  }
}