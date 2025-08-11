function RebalancerAssistant({ data, selectedPeriod, selectedView }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(true);
    
    const getProgressStatus = () => {
      const avgProgress = (data.costRecovery.percentage + data.cpiOffsetting.percentage) / 2;
      if (avgProgress >= 80) return { status: 'excellent', color: 'text-green-600', icon: 'trending-up' };
      if (avgProgress >= 60) return { status: 'good', color: 'text-blue-600', icon: 'target' };
      return { status: 'needs attention', color: 'text-orange-600', icon: 'alert-triangle' };
    };

    const progressStatus = getProgressStatus();

    return (
      <div className="ai-assistant-card" data-name="rebalancer-assistant" data-file="components/RebalancerAssistant.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="icon-brain text-sm text-white"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Rebalancer Assistant</h3>
              <span className="ai-badge">AI Powered</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-blue-100 rounded"
          >
            <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-sm text-blue-600`}></div>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Progress Overview */}
            <div className="ai-insight">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`icon-${progressStatus.icon} text-sm ${progressStatus.color}`}></div>
                <span className="text-sm font-medium text-[var(--text-primary)]">Overall Status</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Performance is <span className={`font-medium ${progressStatus.color}`}>{progressStatus.status}</span> for {selectedPeriod === 'week' ? 'this week' : selectedPeriod === 'month' ? 'this month' : 'this quarter'} in {selectedView} view.
              </p>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-3">
              <div className="ai-insight">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="icon-trophy text-sm text-yellow-600"></div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">Top Contributor</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {data.aiInsights.topContributor}
                </p>
              </div>

              <div className="ai-insight">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="icon-alert-circle text-sm text-red-600"></div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">Underperforming</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {data.aiInsights.underperformingPromo}
                </p>
              </div>

              <div className="ai-insight">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="icon-calendar text-sm text-blue-600"></div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">Projection</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  On pace to hit offset goal by <span className="font-medium">{data.aiInsights.projectedGoalDate}</span> at current trajectory.
                </p>
              </div>
            </div>

            {/* Suggested Action */}
            <div className="ai-suggestion">
              <div className="flex items-center space-x-2 mb-3">
                <div className="icon-lightbulb text-sm text-green-600"></div>
                <span className="text-sm font-semibold text-green-800">Suggested Action</span>
              </div>
              <p className="text-sm text-green-700 mb-3">
                {data.aiInsights.suggestedAction}
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors">
                  Apply Suggestion
                </button>
                <button className="px-3 py-1 bg-white border border-green-300 text-green-700 text-xs rounded-md hover:bg-green-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-blue-200 pt-4">
              <div className="text-sm font-medium text-[var(--text-primary)] mb-3">Quick Actions</div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center space-x-2">
                  <div className="icon-search text-xs"></div>
                  <span>Analyze Performance Gaps</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center space-x-2">
                  <div className="icon-download text-xs"></div>
                  <span>Export Insights Report</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center space-x-2">
                  <div className="icon-settings text-xs"></div>
                  <span>Configure Alerts</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('RebalancerAssistant component error:', error);
    return null;
  }
}