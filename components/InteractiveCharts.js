function InteractiveCharts({ data, selectedPeriod, selectedDesk, selectedView }) {
  try {
    const [activeChart, setActiveChart] = React.useState('performance');
    const [isExpanded, setIsExpanded] = React.useState(true);

    const chartTypes = [
      { id: 'performance', label: 'Performance Trends', icon: 'trending-up' },
      { id: 'drilldown', label: 'Drill-Down Analysis', icon: 'zoom-in' },
      { id: 'heatmap', label: 'Performance Heatmap', icon: 'grid-3x3' }
    ];

    return (
      <div className="interactive-chart-container" data-name="interactive-charts" data-file="components/InteractiveCharts.js">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <div className="icon-bar-chart text-lg text-blue-600"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Interactive Charts & Visualizations</h3>
              <p className="text-sm text-[var(--text-secondary)]">Detailed analysis with drill-down capabilities</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-lg text-[var(--text-secondary)]`}></div>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-6">
            {/* Chart Type Navigation */}
            <div className="flex space-x-2">
              {chartTypes.map(chart => (
                <button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id)}
                  className={`chart-tab ${
                    activeChart === chart.id ? 'chart-tab-active' : 'chart-tab-inactive'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`icon-${chart.icon} text-sm`}></div>
                    <span>{chart.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Chart Content */}
            <div className="min-h-96">
              {activeChart === 'performance' && (
                <PerformanceTrendsChart 
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedDesk={selectedDesk}
                />
              )}
              
              {activeChart === 'drilldown' && (
                <DrillDownChart 
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedView={selectedView}
                />
              )}
              
              {activeChart === 'heatmap' && (
                <PerformanceHeatmap 
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedDesk={selectedDesk}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('InteractiveCharts component error:', error);
    return null;
  }
}

function PerformanceTrendsChart({ data, selectedPeriod, selectedDesk }) {
  const chartRef = React.useRef(null);
  const chartInstance = React.useRef(null);
  const [timeRange, setTimeRange] = React.useState('30d');
  const [metric, setMetric] = React.useState('offset');

  React.useEffect(() => {
    if (chartRef.current) {
      createTrendChart();
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeRange, metric, selectedPeriod]);

  const createTrendChart = () => {
    const ctx = chartRef.current.getContext('2d');
    const ChartJS = window.Chart;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = generateTimeLabels(timeRange, selectedPeriod);
    const datasets = generateTrendDatasets(metric, selectedDesk);

    chartInstance.current = new ChartJS(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(context) {
                return `${context[0].label} - Click for details`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return metric === 'offset' ? value + '%' : '$' + value.toLocaleString();
              }
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const dataIndex = elements[0].index;
            alert(`Drill down to ${labels[dataIndex]} details`);
          }
        }
      }
    });
  };

  const generateTimeLabels = (range, period) => {
    const count = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return Array.from({ length: count }, (_, i) => `Day ${i + 1}`);
  };

  const generateTrendDatasets = (metric, desk) => {
    return [
      {
        label: 'Current Performance',
        data: Array.from({ length: 30 }, () => Math.random() * 100 + 50),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Target',
        data: Array.from({ length: 30 }, () => 85),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderDash: [5, 5]
      }
    ];
  };

  return (
    <div className="space-y-4">
      <div className="chart-controls">
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="chart-filter"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="chart-filter"
          >
            <option value="offset">Offset Progress</option>
            <option value="margin">Margin Recovery</option>
            <option value="efficiency">Efficiency Score</option>
          </select>
        </div>
        
        <div className="text-sm text-[var(--text-secondary)]">
          Click on data points for detailed analysis
        </div>
      </div>

      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}