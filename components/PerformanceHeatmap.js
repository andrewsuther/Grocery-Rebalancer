function PerformanceHeatmap({ data, selectedPeriod, selectedDesk }) {
  try {
    const [hoveredCell, setHoveredCell] = React.useState(null);
    const [selectedMetric, setSelectedMetric] = React.useState('performance');

    const generateHeatmapData = () => {
      const categories = ['Dairy', 'Produce', 'Packaged', 'Frozen', 'Meat', 'Bakery'];
      const timeLabels = selectedPeriod === 'week' ? 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
        selectedPeriod === 'month' ?
        ['Week 1', 'Week 2', 'Week 3', 'Week 4'] :
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

      return categories.map((category, categoryIndex) => ({
        category,
        values: timeLabels.map((time, timeIndex) => ({
          time,
          value: Math.round(Math.random() * 40 + 60), // 60-100 range
          actions: Math.round(Math.random() * 20 + 5),
          impact: Math.round(Math.random() * 10000 + 5000)
        }))
      }));
    };

    const getHeatmapColor = (value) => {
      if (value >= 90) return 'bg-green-500';
      if (value >= 80) return 'bg-green-400';
      if (value >= 70) return 'bg-yellow-400';
      if (value >= 60) return 'bg-orange-400';
      return 'bg-red-400';
    };

    const getHeatmapOpacity = (value) => {
      return Math.max(0.3, value / 100);
    };

    const heatmapData = generateHeatmapData();
    const timeLabels = heatmapData[0]?.values.map(v => v.time) || [];

    return (
      <div className="space-y-4" data-name="performance-heatmap" data-file="components/PerformanceHeatmap.js">
        <div className="chart-controls">
          <div className="flex items-center space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="chart-filter"
            >
              <option value="performance">Performance %</option>
              <option value="actions">Action Count</option>
              <option value="impact">Impact Value</option>
            </select>
          </div>
          
          <div className="text-sm text-[var(--text-secondary)]">
            Hover over cells for detailed information
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="relative overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header Row */}
            <div className="flex">
              <div className="w-24 h-10 flex items-center justify-center font-medium text-[var(--text-primary)] border-b border-r border-[var(--border-color)]">
                Category
              </div>
              {timeLabels.map(time => (
                <div key={time} className="w-20 h-10 flex items-center justify-center font-medium text-[var(--text-primary)] border-b border-r border-[var(--border-color)]">
                  {time}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {heatmapData.map((row, rowIndex) => (
              <div key={row.category} className="flex">
                <div className="w-24 h-12 flex items-center justify-center font-medium text-[var(--text-primary)] border-b border-r border-[var(--border-color)] bg-[var(--secondary-color)]">
                  {row.category}
                </div>
                {row.values.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const displayValue = selectedMetric === 'performance' ? cell.value :
                                    selectedMetric === 'actions' ? cell.actions : cell.impact;
                  
                  return (
                    <div
                      key={cellIndex}
                      className={`heatmap-cell w-20 h-12 flex items-center justify-center border-b border-r border-[var(--border-color)] relative ${getHeatmapColor(cell.value)}`}
                      style={{ 
                        opacity: selectedMetric === 'performance' ? getHeatmapOpacity(cell.value) : 0.8 
                      }}
                      onMouseEnter={() => setHoveredCell({ ...cell, category: row.category, cellKey })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-xs font-medium text-white">
                        {selectedMetric === 'impact' ? `$${(displayValue/1000).toFixed(1)}k` : displayValue}
                        {selectedMetric === 'performance' && '%'}
                      </span>
                      
                      {/* Tooltip */}
                      {hoveredCell && hoveredCell.cellKey === cellKey && (
                        <div className="heatmap-tooltip -top-16 left-1/2 transform -translate-x-1/2">
                          <div className="font-medium">{hoveredCell.category} - {hoveredCell.time}</div>
                          <div>Performance: {hoveredCell.value}%</div>
                          <div>Actions: {hoveredCell.actions}</div>
                          <div>Impact: ${hoveredCell.impact.toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color bg-green-500"></div>
            <span>Excellent (90%+)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-green-400"></div>
            <span>Good (80-89%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-yellow-400"></div>
            <span>Average (70-79%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-orange-400"></div>
            <span>Below Average (60-69%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-red-400"></div>
            <span>Poor (&lt;60%)</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PerformanceHeatmap component error:', error);
    return null;
  }
}