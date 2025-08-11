function YearComparison({ selectedPeriod, selectedView }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showAnnotations, setShowAnnotations] = React.useState(true);
    const barChartRef = React.useRef(null);
    const lineChartRef = React.useRef(null);
    const barChartInstance = React.useRef(null);
    const lineChartInstance = React.useRef(null);

    const getYearComparisonData = () => {
      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;
      
      return {
        offsetComparison: {
          thisYear: selectedPeriod === 'week' ? 68 : selectedPeriod === 'month' ? 82 : 76,
          lastYear: selectedPeriod === 'week' ? 62 : selectedPeriod === 'month' ? 75 : 71
        },
        historicalTrends: {
          labels: selectedPeriod === 'week' ? 
            ['Week 1', 'Week 2', 'Week 3', 'Week 4'] :
            selectedPeriod === 'month' ?
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] :
            ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'Dairy',
              data: selectedPeriod === 'week' ? [45, 52, 58, 68] : 
                    selectedPeriod === 'month' ? [42, 48, 55, 62, 68, 75] : 
                    [45, 58, 72, 82],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            },
            {
              label: 'Produce',
              data: selectedPeriod === 'week' ? [38, 45, 52, 61] : 
                    selectedPeriod === 'month' ? [35, 42, 48, 55, 62, 68] : 
                    [38, 52, 65, 75],
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)'
            },
            {
              label: 'Packaged Goods',
              data: selectedPeriod === 'week' ? [42, 48, 55, 64] : 
                    selectedPeriod === 'month' ? [40, 45, 52, 58, 65, 72] : 
                    [42, 55, 68, 78],
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)'
            }
          ]
        },
        annotations: [
          {
            id: 1,
            type: 'reset',
            position: { x: 25, y: 45 },
            date: '2024-02-15',
            title: 'Price Reset',
            description: 'Major price reset on dairy products due to supplier cost changes'
          },
          {
            id: 2,
            type: 'vendor',
            position: { x: 60, y: 62 },
            date: '2024-04-10',
            title: 'Vendor Change',
            description: 'Switched to new produce supplier with better margin structure'
          },
          {
            id: 3,
            type: 'promo',
            position: { x: 80, y: 75 },
            date: '2024-05-20',
            title: 'Promo Spike',
            description: 'Summer promotion campaign resulted in significant offset improvement'
          }
        ]
      };
    };

    const data = getYearComparisonData();

    React.useEffect(() => {
      if (isExpanded && barChartRef.current) {
        createBarChart();
      }
      if (isExpanded && lineChartRef.current) {
        createLineChart();
      }
      
      return () => {
        if (barChartInstance.current) {
          barChartInstance.current.destroy();
        }
        if (lineChartInstance.current) {
          lineChartInstance.current.destroy();
        }
      };
    }, [isExpanded, selectedPeriod]);

    const createBarChart = () => {
      const ctx = barChartRef.current.getContext('2d');
      const ChartJS = window.Chart;
      
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      barChartInstance.current = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: ['This Year', 'Last Year'],
          datasets: [{
            label: 'Offset %',
            data: [data.offsetComparison.thisYear, data.offsetComparison.lastYear],
            backgroundColor: ['#3b82f6', '#94a3b8'],
            borderColor: ['#2563eb', '#64748b'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          }
        }
      });
    };

    const createLineChart = () => {
      const ctx = lineChartRef.current.getContext('2d');
      const ChartJS = window.Chart;
      
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      lineChartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: data.historicalTrends.labels,
          datasets: data.historicalTrends.datasets.map(dataset => ({
            ...dataset,
            fill: true,
            tension: 0.4
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          }
        }
      });
    };

    return (
      <div className="dashboard-card" data-name="year-comparison" data-file="components/YearComparison.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <div className="icon-bar-chart text-lg text-purple-600"></div>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Compare to Last Year</h3>
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
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-[var(--text-secondary)]">
                Showing {selectedPeriod} comparison data
              </div>
              <button
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  showAnnotations 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {showAnnotations ? 'Hide' : 'Show'} Annotations
              </button>
            </div>

            {/* Bar Chart */}
            <div>
              <h4 className="text-md font-medium text-[var(--text-primary)] mb-3">
                Offset % Comparison
              </h4>
              <div className="chart-container">
                <canvas ref={barChartRef}></canvas>
              </div>
            </div>

            {/* Line Chart with Annotations */}
            <div>
              <h4 className="text-md font-medium text-[var(--text-primary)] mb-3">
                Historical Margin Recovery by Category
              </h4>
              <div className="chart-container relative">
                <canvas ref={lineChartRef}></canvas>
                
                {/* Annotation Markers */}
                {showAnnotations && data.annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className={`annotation-marker annotation-${annotation.type}`}
                    style={{
                      left: `${annotation.position.x}%`,
                      top: `${100 - annotation.position.y}%`
                    }}
                    title={annotation.title}
                  >
                    <div className="annotation-tooltip hidden group-hover:block">
                      <div className="font-medium">{annotation.title}</div>
                      <div className="text-xs">{annotation.date}</div>
                      <div className="mt-1">{annotation.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annotation Legend */}
            {showAnnotations && (
              <div className="border-t border-[var(--border-color)] pt-4">
                <h5 className="text-sm font-medium text-[var(--text-primary)] mb-3">Annotations</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-[var(--text-secondary)]">Price Resets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-[var(--text-secondary)]">Vendor Changes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-[var(--text-secondary)]">Promo Spikes</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('YearComparison component error:', error);
    return null;
  }
}