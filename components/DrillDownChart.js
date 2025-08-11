function DrillDownChart({ data, selectedPeriod, selectedView }) {
  try {
    const [currentLevel, setCurrentLevel] = React.useState('overview');
    const [breadcrumb, setBreadcrumb] = React.useState(['Overview']);
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const drillDownData = {
      overview: [
        { id: 'dairy', name: 'Dairy Products', value: 85, color: '#3b82f6', items: 156 },
        { id: 'produce', name: 'Fresh Produce', value: 72, color: '#10b981', items: 203 },
        { id: 'packaged', name: 'Packaged Goods', value: 89, color: '#f59e0b', items: 342 },
        { id: 'frozen', name: 'Frozen Foods', value: 64, color: '#ef4444', items: 98 },
        { id: 'meat', name: 'Meat & Seafood', value: 91, color: '#8b5cf6', items: 127 }
      ],
      dairy: [
        { id: 'milk', name: 'Milk Products', value: 92, color: '#3b82f6', items: 45 },
        { id: 'cheese', name: 'Cheese', value: 78, color: '#06b6d4', items: 67 },
        { id: 'yogurt', name: 'Yogurt', value: 85, color: '#0891b2', items: 34 },
        { id: 'butter', name: 'Butter & Spreads', value: 88, color: '#0e7490', items: 10 }
      ],
      produce: [
        { id: 'fruits', name: 'Fresh Fruits', value: 76, color: '#10b981', items: 89 },
        { id: 'vegetables', name: 'Vegetables', value: 68, color: '#059669', items: 114 },
        { id: 'organic', name: 'Organic Produce', value: 82, color: '#047857', items: 45 }
      ]
    };

    const handleDrillDown = (category) => {
      if (drillDownData[category.id]) {
        setCurrentLevel(category.id);
        setSelectedCategory(category);
        setBreadcrumb([...breadcrumb, category.name]);
      } else {
        alert(`Detailed view for ${category.name}: ${category.items} items with ${category.value}% performance`);
      }
    };

    const handleBreadcrumbClick = (index) => {
      if (index === 0) {
        setCurrentLevel('overview');
        setSelectedCategory(null);
        setBreadcrumb(['Overview']);
      } else {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        setBreadcrumb(newBreadcrumb);
        
        if (index === 1) {
          const categoryKey = Object.keys(drillDownData).find(key => 
            drillDownData.overview.some(item => item.name === newBreadcrumb[1])
          );
          setCurrentLevel(categoryKey || 'overview');
        }
      }
    };

    const currentData = drillDownData[currentLevel] || drillDownData.overview;

    return (
      <div className="space-y-4" data-name="drill-down-chart" data-file="components/DrillDownChart.js">
        {/* Breadcrumb Navigation */}
        <div className="drill-down-breadcrumb">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <span
                className={`breadcrumb-item ${index === breadcrumb.length - 1 ? 'font-medium text-[var(--text-primary)]' : ''}`}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {item}
              </span>
              {index < breadcrumb.length - 1 && (
                <div className="icon-chevron-right text-xs"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Drill-Down Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.map(category => (
            <div
              key={category.id}
              className="drill-down-card"
              onClick={() => handleDrillDown(category)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-[var(--text-primary)]">{category.name}</h4>
                <div className="icon-zoom-in text-sm text-blue-600"></div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[var(--text-secondary)]">Performance</span>
                  <span className="text-sm font-medium">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${category.value}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-secondary)]">{category.items} items</span>
                <span className={`performance-indicator ${
                  category.value >= 85 ? 'performance-excellent' :
                  category.value >= 75 ? 'performance-good' :
                  category.value >= 65 ? 'performance-average' : 'performance-poor'
                }`}>
                  {category.value >= 85 ? 'Excellent' :
                   category.value >= 75 ? 'Good' :
                   category.value >= 65 ? 'Average' : 'Needs Attention'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="border-t border-[var(--border-color)] pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--primary-color)]">
                {currentData.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length)}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Avg Performance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {currentData.reduce((sum, item) => sum + item.items, 0)}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {currentData.filter(item => item.value >= 80).length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">High Performers</div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DrillDownChart component error:', error);
    return null;
  }
}