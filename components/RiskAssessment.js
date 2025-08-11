function RiskAssessment({ simulationParams, data }) {
  try {
    const [selectedRiskType, setSelectedRiskType] = React.useState('overall');

    const calculateRiskMetrics = () => {
      const priceReduction = simulationParams.priceReduction || 15;
      const duration = simulationParams.duration || 2;
      const categoryCount = simulationParams.targetCategories?.length || 1;
      
      // Calculate risk scores based on parameters
      const priceRisk = priceReduction > 20 ? 'high' : priceReduction > 10 ? 'medium' : 'low';
      const durationRisk = duration > 6 ? 'high' : duration > 3 ? 'medium' : 'low';
      const scopeRisk = categoryCount > 3 ? 'high' : categoryCount > 1 ? 'medium' : 'low';
      
      return {
        overall: calculateOverallRisk([priceRisk, durationRisk, scopeRisk]),
        price: priceRisk,
        duration: durationRisk,
        scope: scopeRisk,
        competitorResponse: priceReduction > 15 ? 'high' : 'medium',
        marginErosion: priceReduction * duration > 40 ? 'high' : 'medium'
      };
    };

    const calculateOverallRisk = (risks) => {
      const highCount = risks.filter(r => r === 'high').length;
      const mediumCount = risks.filter(r => r === 'medium').length;
      
      if (highCount >= 2) return 'high';
      if (highCount >= 1 || mediumCount >= 2) return 'medium';
      return 'low';
    };

    const getRiskColor = (level) => {
      switch (level) {
        case 'low': return 'text-green-600 bg-green-100';
        case 'medium': return 'text-yellow-600 bg-yellow-100';
        case 'high': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getRiskIcon = (level) => {
      switch (level) {
        case 'low': return 'shield-check';
        case 'medium': return 'alert-triangle';
        case 'high': return 'alert-circle';
        default: return 'help-circle';
      }
    };

    const riskMetrics = calculateRiskMetrics();

    const riskCategories = [
      { id: 'overall', label: 'Overall Risk', value: riskMetrics.overall },
      { id: 'price', label: 'Price Risk', value: riskMetrics.price },
      { id: 'duration', label: 'Duration Risk', value: riskMetrics.duration },
      { id: 'scope', label: 'Scope Risk', value: riskMetrics.scope },
      { id: 'competitor', label: 'Competitor Response', value: riskMetrics.competitorResponse },
      { id: 'margin', label: 'Margin Erosion', value: riskMetrics.marginErosion }
    ];

    return (
      <div className="space-y-4" data-name="risk-assessment" data-file="components/RiskAssessment.js">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-[var(--text-primary)]">Risk Assessment</h4>
          <select
            value={selectedRiskType}
            onChange={(e) => setSelectedRiskType(e.target.value)}
            className="px-3 py-1 border border-orange-200 rounded-md text-sm"
          >
            <option value="overall">Overall View</option>
            <option value="detailed">Detailed Breakdown</option>
          </select>
        </div>

        {selectedRiskType === 'overall' ? (
          <div className="scenario-card">
            <div className="text-center mb-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getRiskColor(riskMetrics.overall)}`}>
                <div className={`icon-${getRiskIcon(riskMetrics.overall)} text-xl mr-2`}></div>
                {riskMetrics.overall.toUpperCase()} RISK
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  {simulationParams.priceReduction || 15}%
                </div>
                <div className="text-[var(--text-secondary)]">Price Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {simulationParams.duration || 2} weeks
                </div>
                <div className="text-[var(--text-secondary)]">Duration</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskCategories.map(category => (
              <div key={category.id} className="scenario-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {category.label}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(category.value)}`}>
                    {category.value.toUpperCase()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      category.value === 'high' ? 'bg-red-500' :
                      category.value === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: category.value === 'high' ? '100%' : 
                             category.value === 'medium' ? '60%' : '30%' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('RiskAssessment component error:', error);
    return null;
  }
}
