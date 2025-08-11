function ScenarioComparison({ scenarios, onActivateScenario, onAddScenario, currentParams }) {
  try {
    const calculateImpact = (params) => {
      const baseImpact = (params.priceReduction / 100) * params.duration * (params.targetCategories?.length || 1);
      return {
        offsetIncrease: Math.round(baseImpact * 12),
        marginImpact: Math.round(baseImpact * 8500),
        roi: Math.round(baseImpact * 125)
      };
    };

    const getPromoTypeColor = (type) => {
      const colors = {
        'TPR': 'bg-blue-100 text-blue-700',
        'Cover': 'bg-green-100 text-green-700',
        'Fat5': 'bg-orange-100 text-orange-700',
        'Everyday': 'bg-purple-100 text-purple-700'
      };
      return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="scenario-card" data-name="scenario-comparison" data-file="components/ScenarioComparison.js">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-[var(--text-primary)]">Scenario Comparison</h4>
          <button
            onClick={onAddScenario}
            className="px-3 py-1 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-1"
          >
            <div className="icon-plus text-xs"></div>
            <span>Add Scenario</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map(scenario => {
            const impact = calculateImpact(scenario.params);
            const isActive = scenario.active;
            
            return (
              <div
                key={scenario.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  isActive 
                    ? 'border-orange-400 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onActivateScenario(scenario.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-[var(--text-primary)]">{scenario.name}</h5>
                    {isActive && (
                      <span className="px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPromoTypeColor(scenario.params.promoType)}`}>
                    {scenario.params.promoType}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Price Reduction:</span>
                    <span className="font-medium">{scenario.params.priceReduction}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Duration:</span>
                    <span className="font-medium">{scenario.params.duration} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Categories:</span>
                    <span className="font-medium">{scenario.params.targetCategories?.length || 0}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-3 pt-3">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">+{impact.offsetIncrease}%</div>
                      <div className="text-[var(--text-secondary)]">Offset</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">${impact.marginImpact.toLocaleString()}</div>
                      <div className="text-[var(--text-secondary)]">Margin</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{impact.roi}%</div>
                      <div className="text-[var(--text-secondary)]">ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ScenarioComparison component error:', error);
    return null;
  }
}