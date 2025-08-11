function HistoricalBaseline({ data, selectedPeriod, selectedView }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);
    const [timeframe, setTimeframe] = React.useState('12m');

    const generateHistoricalData = () => {
      const periods = timeframe === '6m' ? 6 : timeframe === '12m' ? 12 : 24;
      const labels = [];
      const currentYear = [];
      const previousYear = [];
      const baseline = [];

      for (let i = 0; i < periods; i++) {
        labels.push(`Month ${i + 1}`);
        
        // Generate realistic trending data
        const baseValue = 70 + (i * 2) + (Math.random() * 10 - 5);
        currentYear.push(Math.max(0, Math.min(100, baseValue)));
        previousYear.push(Math.max(0, Math.min(100, baseValue - 8 + (Math.random() * 6))));
        baseline.push(75); // Industry baseline
      }

      return { labels, currentYear, previousYear, baseline };
    };

    React.useEffect(() => {
      if (chartRef.current) {
        createHistoricalChart();
      }
      
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [timeframe, selectedPeriod]);

    const createHistoricalChart = () => {
      const ctx = chartRef.current.getContext('2d');
      const ChartJS = window.Chart;
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const historicalData = generateHistoricalData();

      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: historicalData.labels,
          datasets: [
            {
              label: 'Current Period',
              data: historicalData.currentYear,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: false
            },
            {
              label: 'Previous Year',
              data: historicalData.previousYear,
              borderColor: '#94a3b8',
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.4,
              fill: false
            },
            {
              label: 'Industry Baseline',
              data: historicalData.baseline,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              borderDash: [10, 5],
              tension: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: 'top' }
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

    const getPerformanceTrend = () => {
      const currentAvg = 82;
      const previousAvg = 76;
      const improvement = currentAvg - previousAvg;
      
      return {
        improvement,
        trend: improvement > 0 ? 'positive' : improvement < 0 ? 'negative' : 'stable',
        percentage: Math.abs(improvement)
      };
    };

    const trend = getPerformanceTrend();

    return (
      <div className="space-y-6" data-name="historical-baseline" data-file="components/HistoricalBaseline.js">
        <div className="historical-trend">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="icon-trending-up text-lg text-orange-600"></div>
              <h4 className="text-lg font-semibold text-orange-800">Historical Performance Trends</h4>
            </div>
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1 border border-orange-200 rounded-md text-sm"
            >
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
              <option value="24m">Last 24 Months</option>
            </select>
          </div>

          <div className="benchmark-chart">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="baseline-comparison">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                trend.trend === 'positive' ? 'text-green-600' : 
                trend.trend === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trend.trend === 'positive' ? '+' : trend.trend === 'negative' ? '-' : ''}
                {trend.percentage.toFixed(1)}%
              </div>
              <div className="text-sm font-medium text-indigo-700">Year-over-Year Change</div>
              <div className="flex items-center justify-center mt-2">
                <div className={`icon-${
                  trend.trend === 'positive' ? 'trending-up' : 
                  trend.trend === 'negative' ? 'trending-down' : 'minus'
                } text-sm ${
                  trend.trend === 'positive' ? 'text-green-600' : 
                  trend.trend === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}></div>
              </div>
            </div>
          </div>

          <div className="baseline-comparison">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">82%</div>
              <div className="text-sm font-medium text-indigo-700">Current Average</div>
              <div className="text-xs text-indigo-500 mt-1">
                {selectedPeriod} performance
              </div>
            </div>
          </div>

          <div className="baseline-comparison">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">76%</div>
              <div className="text-sm font-medium text-indigo-700">Historical Baseline</div>
              <div className="text-xs text-indigo-500 mt-1">
                Previous year average
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-[var(--text-primary)] mb-3">Historical Insights</h5>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center space-x-2">
              <div className="icon-calendar text-xs text-blue-600"></div>
              <span>Best performing period was 3 months ago with 89% efficiency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="icon-bar-chart text-xs text-green-600"></div>
              <span>Consistent improvement trend over the last 6 months</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="icon-target text-xs text-orange-600"></div>
              <span>On track to exceed historical baseline by 8% this quarter</span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HistoricalBaseline component error:', error);
    return null;
  }
}