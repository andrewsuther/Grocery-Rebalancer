function SimulationPanel({ simulationParams, onParamsChange, selectedPeriod, data }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('scenarios');
    const [scenarios, setScenarios] = React.useState([
      { id: 1, name: 'Conservative TPR', params: { promoType: 'TPR', priceReduction: 10, duration: 2, targetCategories: ['dairy'] }, active: true },
      { id: 2, name: 'Aggressive Cover', params: { promoType: 'Cover', priceReduction: 20, duration: 3, targetCategories: ['produce', 'packaged'] }, active: false }
    ]);
    
    const promoTypes = [
      { value: 'TPR', label: 'Temporary Price Reduction' },
      { value: 'Cover', label: 'Cover Pricing' },
      { value: 'Fat5', label: 'Fat 5 Items' },
      { value: 'Everyday', label: 'Everyday Low Price' }
    ];

    const categories = [
      { value: 'dairy', label: 'Dairy Products' },
      { value: 'produce', label: 'Fresh Produce' },
      { value: 'packaged', label: 'Packaged Goods' },
      { value: 'frozen', label: 'Frozen Foods' },
      { value: 'meat', label: 'Meat & Seafood' }
    ];

    const tabs = [
      { id: 'scenarios', label: 'Scenarios', icon: 'layers' },
      { id: 'forecast', label: 'Forecast', icon: 'trending-up' },
      { id: 'risk', label: 'Risk Analysis', icon: 'shield' }
    ];

    const handleParamChange = (key, value) => {
      onParamsChange({
        ...simulationParams,
        [key]: value
      });
    };

    const handleCategoryToggle = (category) => {
      const currentCategories = simulationParams.targetCategories || [];
      const newCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];
      
      handleParamChange('targetCategories', newCategories);
    };

    const addScenario = () => {
      const newScenario = {
        id: scenarios.length + 1,
        name: `Scenario ${scenarios.length + 1}`,
        params: { ...simulationParams },
        active: false
      };
      setScenarios([...scenarios, newScenario]);
    };

    const activateScenario = (scenarioId) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      if (scenario) {
        onParamsChange(scenario.params);
        setScenarios(scenarios.map(s => ({ ...s, active: s.id === scenarioId })));
      }
    };

    return (
      <div className="simulation-panel" data-name="simulation-panel" data-file="components/SimulationPanel.js">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
              <div className="icon-flask-conical text-sm text-white"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Advanced Scenario Testing</h3>
              <span className="simulation-badge">Enhanced Mode</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-orange-100 rounded"
          >
            <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-sm text-orange-600`}></div>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-orange-50 rounded-lg p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-orange-700 shadow-sm'
                      : 'text-orange-600 hover:text-orange-700'
                  }`}
                >
                  <div className={`icon-${tab.icon} text-sm`}></div>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scenarios Tab */}
            {activeTab === 'scenarios' && (
              <div className="space-y-4">
                <ScenarioComparison
                  scenarios={scenarios}
                  onActivateScenario={activateScenario}
                  onAddScenario={addScenario}
                  currentParams={simulationParams}
                />
                
                {/* Current Scenario Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="scenario-card">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Promotion Type
                    </label>
                    <select
                      value={simulationParams.promoType || 'TPR'}
                      onChange={(e) => handleParamChange('promoType', e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm"
                    >
                      {promoTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="scenario-card">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Price Reduction: {simulationParams.priceReduction || 15}%
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="35"
                      value={simulationParams.priceReduction || 15}
                      onChange={(e) => handleParamChange('priceReduction', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="scenario-card">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Duration: {simulationParams.duration || 2} weeks
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={simulationParams.duration || 2}
                      onChange={(e) => handleParamChange('duration', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="scenario-card">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Target Categories
                    </label>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {categories.map(category => (
                        <label key={category.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={(simulationParams.targetCategories || []).includes(category.value)}
                            onChange={() => handleCategoryToggle(category.value)}
                            className="rounded border-orange-300"
                          />
                          <span className="text-xs">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Forecast Tab */}
            {activeTab === 'forecast' && (
              <ForecastChart
                simulationParams={simulationParams}
                selectedPeriod={selectedPeriod}
                data={data}
              />
            )}

            {/* Risk Analysis Tab */}
            {activeTab === 'risk' && (
              <RiskAssessment
                simulationParams={simulationParams}
                data={data}
              />
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('SimulationPanel component error:', error);
    return null;
  }
}
