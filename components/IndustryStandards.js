function IndustryStandards({ data, selectedPeriod, selectedDesk }) {
  try {
    const getIndustryBenchmarks = () => {
      return {
        offsetRecovery: { current: data.costOffset.percentage, industry: 85, excellent: 95, good: 80, average: 70 },
        efficiency: { current: data.metrics.efficiencyScore, industry: 88, excellent: 95, good: 85, average: 75 },
        actionVelocity: { current: 78, industry: 82, excellent: 90, good: 80, average: 70 },
        marginProtection: { current: 84, industry: 80, excellent: 90, good: 78, average: 65 }
      };
    };

    const getBenchmarkStatus = (current, industry, excellent, good, average) => {
      if (current >= excellent) return { status: 'excellent', label: 'Excellent', class: 'benchmark-above' };
      if (current >= good) return { status: 'good', label: 'Above Average', class: 'benchmark-above' };
      if (current >= industry) return { status: 'average', label: 'At Standard', class: 'benchmark-at' };
      return { status: 'below', label: 'Below Standard', class: 'benchmark-below' };
    };

    const getProgressColor = (current, industry) => {
      if (current >= industry * 1.1) return 'bg-green-500';
      if (current >= industry) return 'bg-blue-500';
      if (current >= industry * 0.9) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const benchmarks = getIndustryBenchmarks();

    return (
      <div className="space-y-6" data-name="industry-standards" data-file="components/IndustryStandards.js">
        <div className="industry-standard">
          <div className="flex items-center space-x-2 mb-4">
            <div className="icon-award text-lg text-emerald-600"></div>
            <h4 className="text-lg font-semibold text-emerald-800">Industry Standards Comparison</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(benchmarks).map(([key, benchmark]) => {
              const status = getBenchmarkStatus(benchmark.current, benchmark.industry, benchmark.excellent, benchmark.good, benchmark.average);
              
              return (
                <div key={key} className={`benchmark-metric ${status.status === 'excellent' ? 'benchmark-excellent' : 
                  status.status === 'good' ? 'benchmark-good' : 
                  status.status === 'average' ? 'benchmark-average' : 'benchmark-poor'}`}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)] capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`benchmark-indicator ${status.class}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <div className="relative mb-2">
                      <div className="benchmark-progress">
                        <div 
                          className={`benchmark-progress-fill ${getProgressColor(benchmark.current, benchmark.industry)}`}
                          style={{ width: `${Math.min(benchmark.current, 100)}%` }}
                        ></div>
                        <div 
                          className="benchmark-target-line"
                          style={{ left: `${benchmark.industry}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                      <span>Current: {benchmark.current}%</span>
                      <span>Industry: {benchmark.industry}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Benchmark Score */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200">
            <div className="text-3xl font-bold text-emerald-700 mb-2">
              {Math.round(Object.values(benchmarks).reduce((sum, b) => sum + (b.current / b.industry * 100), 0) / Object.keys(benchmarks).length)}
            </div>
            <div className="text-sm font-medium text-emerald-600">Overall Benchmark Score</div>
            <div className="text-xs text-emerald-500 mt-1">
              Compared to industry standards
            </div>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-[var(--text-primary)] mb-3">Improvement Opportunities</h5>
          <div className="space-y-2 text-sm">
            {Object.entries(benchmarks)
              .filter(([_, benchmark]) => benchmark.current < benchmark.industry)
              .map(([key, benchmark]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className="icon-arrow-up-right text-xs text-orange-600"></div>
                  <span className="text-[var(--text-secondary)]">
                    Improve {key.replace(/([A-Z])/g, ' $1').trim()} by {Math.round(benchmark.industry - benchmark.current)}% to reach industry standard
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('IndustryStandards component error:', error);
    return null;
  }
}