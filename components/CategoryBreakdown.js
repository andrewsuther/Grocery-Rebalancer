function CategoryBreakdown({ selectedPeriod, selectedDesk, data }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [sortBy, setSortBy] = React.useState('performance');
    
    const getCategoryData = () => {
      const categories = [
        {
          id: 'dairy',
          name: 'Dairy Products',
          offsetProgress: 85,
          marginRecovered: 24500,
          actionsCount: 42,
          efficiency: 92,
          status: 'on-track',
          trend: 8,
          topAction: 'TPR on Organic Milk'
        },
        {
          id: 'produce',
          name: 'Fresh Produce',
          offsetProgress: 72,
          marginRecovered: 18200,
          actionsCount: 38,
          efficiency: 87,
          status: 'behind',
          trend: -3,
          topAction: 'Cover Pricing on Berries'
        },
        {
          id: 'packaged',
          name: 'Packaged Goods',
          offsetProgress: 89,
          marginRecovered: 31800,
          actionsCount: 56,
          efficiency: 94,
          status: 'on-track',
          trend: 12,
          topAction: 'Fat5 on Cereals'
        },
        {
          id: 'frozen',
          name: 'Frozen Foods',
          offsetProgress: 64,
          marginRecovered: 15600,
          actionsCount: 28,
          efficiency: 78,
          status: 'critical',
          trend: -8,
          topAction: 'Everyday Low on Pizza'
        },
        {
          id: 'meat',
          name: 'Meat & Seafood',
          offsetProgress: 91,
          marginRecovered: 28900,
          actionsCount: 34,
          efficiency: 96,
          status: 'on-track',
          trend: 15,
          topAction: 'TPR on Ground Beef'
        }
      ];
      
      return categories.sort((a, b) => {
        switch (sortBy) {
          case 'performance':
            return b.offsetProgress - a.offsetProgress;
          case 'margin':
            return b.marginRecovered - a.marginRecovered;
          case 'efficiency':
            return b.efficiency - a.efficiency;
          default:
            return a.name.localeCompare(b.name);
        }
      });
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'on-track': return 'bg-green-100 text-green-800';
        case 'behind': return 'bg-yellow-100 text-yellow-800';
        case 'critical': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getProgressColor = (progress) => {
      if (progress >= 85) return 'bg-green-500';
      if (progress >= 70) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const categoryData = getCategoryData();

    return (
      <div className="dashboard-card" data-name="category-breakdown" data-file="components/CategoryBreakdown.js">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <div className="icon-grid-3x3 text-lg text-indigo-600"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Category Breakdown</h3>
              <p className="text-sm text-[var(--text-secondary)]">Individual category performance within division</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
            >
              <option value="performance">Sort by Performance</option>
              <option value="margin">Sort by Margin</option>
              <option value="efficiency">Sort by Efficiency</option>
              <option value="name">Sort by Name</option>
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
          <div className="category-grid">
            {categoryData.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <div className="category-name">{category.name}</div>
                  <span className={`category-status ${getStatusColor(category.status)}`}>
                    {category.status === 'on-track' ? 'On Track' : 
                     category.status === 'behind' ? 'Behind' : 'Critical'}
                  </span>
                </div>

                <div className="category-metrics">
                  <div className="category-metric">
                    <span className="category-metric-label">Offset Progress</span>
                    <span className="category-metric-value">{category.offsetProgress}%</span>
                  </div>
                  <div className="category-progress-mini">
                    <div 
                      className={`category-progress-fill-mini ${getProgressColor(category.offsetProgress)}`}
                      style={{ width: `${category.offsetProgress}%` }}
                    ></div>
                  </div>

                  <div className="category-metric">
                    <span className="category-metric-label">Margin Recovered</span>
                    <span className="category-metric-value">${category.marginRecovered.toLocaleString()}</span>
                  </div>

                  <div className="category-metric">
                    <span className="category-metric-label">Actions Taken</span>
                    <span className="category-metric-value">{category.actionsCount}</span>
                  </div>

                  <div className="category-metric">
                    <span className="category-metric-label">Efficiency</span>
                    <div className="flex items-center space-x-1">
                      <span className="category-metric-value">{category.efficiency}%</span>
                      <div className={`icon-${category.trend >= 0 ? 'trending-up' : 'trending-down'} text-xs ${
                        category.trend >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}></div>
                    </div>
                  </div>

                  <div className="category-metric">
                    <span className="category-metric-label">Top Action</span>
                    <span className="category-metric-value text-xs">{category.topAction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CategoryBreakdown component error:', error);
    return null;
  }
}