function ForecastChart({ simulationParams, selectedPeriod, data }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);
    const [forecastType, setForecastType] = React.useState('offset');
    const [confidenceLevel, setConfidenceLevel] = React.useState(80);

    const generateForecastData = () => {
      const periods = selectedPeriod === 'week' ? 8 : selectedPeriod === 'month' ? 6 : 4;
      const labels = [];
      const baseline = [];
      const optimistic = [];
      const pessimistic = [];
      const projected = [];

      for (let i = 0; i < periods; i++) {
        if (selectedPeriod === 'week') {
          labels.push(`Week ${i + 1}`);
        } else if (selectedPeriod === 'month') {
          labels.push(`Month ${i + 1}`);
        } else {
          labels.push(`Q${i + 1}`);
        }

        const baseValue = 65 + (i * 3);
        const impact = simulationParams.priceReduction * 0.8 * (simulationParams.targetCategories?.length || 1);
        
        baseline.push(baseValue);
        projected.push(Math.min(100, baseValue + impact));
        optimistic.push(Math.min(100, baseValue + impact * 1.3));
        pessimistic.push(Math.max(0, baseValue + impact * 0.7));
      }

      return { labels, baseline, projected, optimistic, pessimistic };
    };

    React.useEffect(() => {
      if (chartRef.current) {
        createChart();
      }
      
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [forecastType, confidenceLevel, simulationParams]);

    const createChart = () => {
      const ctx = chartRef.current.getContext('2d');
      const ChartJS = window.Chart;
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const forecastData = generateForecastData();

      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: forecastData.labels,
          datasets: [
            {
              label: 'Baseline',
              data: forecastData.baseline,
              borderColor: '#94a3b8',
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              borderDash: [5, 5],
              fill: false
            },
            {
              label: 'Projected',
              data: forecastData.projected,
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderWidth: 3,
              fill: false
            },
            {
              label: `${confidenceLevel}% Confidence (Upper)`,
              data: forecastData.optimistic,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 1,
              fill: '+1'
            },
            {
              label: `${confidenceLevel}% Confidence (Lower)`,
              data: forecastData.pessimistic,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderWidth: 1,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              position: 'top'
            },
            title: {
              display: true,
              text: `${forecastType === 'offset' ? 'Offset Progress' : 'Margin Recovery'} Forecast`
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
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    };

    return (
      <div className="space-y-4" data-name="forecast-chart" data-file="components/ForecastChart.js">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-[var(--text-primary)]">Advanced Forecasting</h4>
          <div className="flex items-center space-x-4">
            <select
              value={forecastType}
              onChange={(e) => setForecastType(e.target.value)}
              className="px-3 py-1 border border-orange-200 rounded-md text-sm"
            >
              <option value="offset">Offset Progress</option>
              <option value="margin">Margin Recovery</option>
            </select>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-[var(--text-secondary)]">Confidence:</label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(parseInt(e.target.value))}
                className="px-2 py-1 border border-orange-200 rounded-md text-sm"
              >
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
                <option value={95}>95%</option>
              </select>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="scenario-card">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {Math.round(65 + (simulationParams.priceReduction * 0.8))}%
              </div>
              <div className="text-[var(--text-secondary)]">Projected Peak</div>
            </div>
          </div>
          <div className="scenario-card">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {simulationParams.duration || 2} weeks
              </div>
              <div className="text-[var(--text-secondary)]">Time to Impact</div>
            </div>
          </div>
          <div className="scenario-card">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                ±{Math.round((100 - confidenceLevel) / 2)}%
              </div>
              <div className="text-[var(--text-secondary)]">Variance Range</div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ForecastChart component error:', error);
    return null;
  }
}