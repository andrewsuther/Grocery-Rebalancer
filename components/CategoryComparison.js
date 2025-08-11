function CategoryComparison({ selectedPeriod, selectedDesk, data }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [comparisonView, setComparisonView] = React.useState('performance');
    
    const getCategoryComparisonData = () => {
      return [
        {
          id: 'dairy',
          name: 'Dairy',
          offsetProgress: 85,
          marginRecovered: 24500,
          efficiency: 92,
          actionsCount: 42,
          avgActionImpact: 583,
          riskScore: 'Low'
        },
        {
          id: 'produce',
          name: 'Produce',
          offsetProgress: 72,
          marginRecovered: 18200,
          efficiency: 87,
          actionsCount: 38,
          avgActionImpact: 479,
          riskScore: 'Medium'
        },
        {
          id: 'packaged',
          name: 'Packaged',
          offsetProgress: 89,
          marginRecovered: 31800,
          efficiency: 94,
          actionsCount: 56,
          avgActionImpact: 568,
          riskScore: 'Low'
        },
        {
          id: 'frozen',
          name: 'Frozen',
          offsetProgress: 64,
          marginRecovered: 15600,
          efficiency: 78,
          actionsCount: 28,
          avgActionImpact: 557,
          riskScore: 'High'
        },
        {
          id: 'meat',
          name: 'Meat',
          offsetProgress: 91,
          marginRecovered: 28900,
          efficiency: 96,
          actionsCount: 34,
          avgActionImpact: 850,
          riskScore: 'Low'
        }
      ];
    };

    const getMetricClass = (value, metric, categories) => {
      const values = categories.map(cat => cat[metric]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      
      if (value === max) return 'comparison-metric-good';
      if (value === min) return 'comparison-metric-critical';
      return '';
    };

    const getRowClass = (category, metric, categories) => {
      const values = categories.map(cat => cat[metric]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      
      if (category[metric] === max) return 'comparison-best';
      if (category[metric] === min) return 'comparison-worst';
      return '';
    };

    const getRiskColor = (risk) => {
      switch (risk) {
        case 'Low': return 'text-green-600';
        case 'Medium': return 'text-yellow-600';
        case 'High': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    const categories = getCategoryComparisonData();

    return (
      <div className="dashboard-card" data-name="category-comparison" data-file="components/CategoryComparison.js">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <div className="icon-bar-chart-horizontal text-lg text-purple-600"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Category Comparison Matrix</h3>
              <p className="text-sm text-[var(--text-secondary)]">Side-by-side performance metrics across categories</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={comparisonView}
              onChange={(e) => setComparisonView(e.target.value)}
              className="px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
            >
              <option value="performance">Performance View</option>
              <option value="efficiency">Efficiency View</option>
              <option value="risk">Risk Assessment</option>
            </select>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-lg text-[var(--text-secondary)]`}></div>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="comparison-matrix">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comparison-header">Category</th>
                  <th className="comparison-header">Offset %</th>
                  <th className="comparison-header">Margin Recovered</th>
                  <th className="comparison-header">Efficiency %</th>
                  <th className="comparison-header">Actions Taken</th>
                  <th className="comparison-header">Avg Impact</th>
                  <th className="comparison-header">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="comparison-cell font-medium text-[var(--text-primary)]">
                      {category.name}
                    </td>
                    <td className={`comparison-cell ${getRowClass(category, 'offsetProgress', categories)}`}>
                      <span className={getMetricClass(category.offsetProgress, 'offsetProgress', categories)}>
                        {category.offsetProgress}%
                      </span>
                    </td>
                    <td className={`comparison-cell ${getRowClass(category, 'marginRecovered', categories)}`}>
                      <span className={getMetricClass(category.marginRecovered, 'marginRecovered', categories)}>
                        ${category.marginRecovered.toLocaleString()}
                      </span>
                    </td>
                    <td className={`comparison-cell ${getRowClass(category, 'efficiency', categories)}`}>
                      <span className={getMetricClass(category.efficiency, 'efficiency', categories)}>
                        {category.efficiency}%
                      </span>
                    </td>
                    <td className={`comparison-cell ${getRowClass(category, 'actionsCount', categories)}`}>
                      <span className={getMetricClass(category.actionsCount, 'actionsCount', categories)}>
                        {category.actionsCount}
                      </span>
                    </td>
                    <td className={`comparison-cell ${getRowClass(category, 'avgActionImpact', categories)}`}>
                      <span className={getMetricClass(category.avgActionImpact, 'avgActionImpact', categories)}>
                        ${category.avgActionImpact}
                      </span>
                    </td>
                    <td className="comparison-cell">
                      <span className={getRiskColor(category.riskScore)}>
                        {category.riskScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
                  <span>Best Performer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
                  <span>Needs Attention</span>
                </div>
              </div>
              <div>
                Updated for {selectedPeriod === 'week' ? 'this week' : selectedPeriod === 'month' ? 'this month' : 'this quarter'}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CategoryComparison component error:', error);
    return null;
  }
}