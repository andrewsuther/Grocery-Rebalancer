function SmartRecommendations({ data, selectedPeriod, selectedDesk, simulationMode }) {
  try {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('insights');
    const [refreshing, setRefreshing] = React.useState(false);

    const tabs = [
      { id: 'insights', label: 'AI Insights', icon: 'brain' },
      { id: 'actions', label: 'Quick Actions', icon: 'zap' },
      { id: 'trends', label: 'Trends', icon: 'trending-up' }
    ];

    const generateSmartRecommendations = () => {
      const avgProgress = (data.costRecovery.percentage + data.cpiOffsetting.percentage) / 2;
      const efficiency = data.metrics.efficiencyScore;
      
      const insights = [];
      const actions = [];
      const trends = [];

      // Performance-based insights
      if (avgProgress < 70) {
        insights.push({
          id: 1,
          type: 'critical',
          title: 'Performance Gap Detected',
          description: `Your ${selectedPeriod} progress is ${avgProgress.toFixed(1)}% below target. Consider increasing TPR frequency.`,
          confidence: 92,
          impact: 'high'
        });
        actions.push({
          id: 1,
          title: 'Boost TPR Campaign',
          description: 'Launch targeted TPR on top 5 velocity items',
          estimatedImpact: '+12-18% offset improvement',
          effort: 'medium',
          priority: 'high'
        });
      }

      if (efficiency < 85) {
        insights.push({
          id: 2,
          type: 'warning',
          title: 'Efficiency Optimization Opportunity',
          description: 'Your pricing actions could be more targeted. Focus on high-impact categories.',
          confidence: 87,
          impact: 'medium'
        });
      }

      // Desk-specific recommendations
      const deskRecommendations = getDeskSpecificRecommendations(selectedDesk);
      insights.push(...deskRecommendations.insights);
      actions.push(...deskRecommendations.actions);

      // Trend analysis
      trends.push({
        id: 1,
        title: 'Seasonal Pattern Detected',
        description: `${selectedDesk} category shows 15% higher performance in current period`,
        trend: 'positive',
        prediction: 'Continue trend for 2-3 weeks'
      });

      trends.push({
        id: 2,
        title: 'Competitor Activity',
        description: 'Increased promotional activity in your category segment',
        trend: 'neutral',
        prediction: 'Monitor and adjust pricing strategy'
      });

      return { insights, actions, trends };
    };

    const getDeskSpecificRecommendations = (desk) => {
      const recommendations = {
        oils: {
          insights: [{
            id: 3,
            type: 'opportunity',
            title: 'Premium Oil Opportunity',
            description: 'Premium olive oils showing 23% higher margin recovery potential',
            confidence: 89,
            impact: 'high'
          }],
          actions: [{
            id: 2,
            title: 'Premium SKU Focus',
            description: 'Shift promotional mix toward premium olive oils',
            estimatedImpact: '+8-12% margin improvement',
            effort: 'low',
            priority: 'medium'
          }]
        },
        spices: {
          insights: [{
            id: 3,
            type: 'opportunity',
            title: 'Organic Spice Trend',
            description: 'Organic spices outperforming conventional by 31%',
            confidence: 94,
            impact: 'high'
          }],
          actions: [{
            id: 2,
            title: 'Organic Expansion',
            description: 'Increase organic spice promotional frequency',
            estimatedImpact: '+15-20% offset boost',
            effort: 'medium',
            priority: 'high'
          }]
        }
      };

      return recommendations[desk] || {
        insights: [{
          id: 3,
          type: 'info',
          title: 'Category Analysis',
          description: `${desk} category performance is within expected range`,
          confidence: 85,
          impact: 'medium'
        }],
        actions: [{
          id: 2,
          title: 'Standard Optimization',
          description: 'Continue current pricing strategy with minor adjustments',
          estimatedImpact: '+3-5% improvement',
          effort: 'low',
          priority: 'medium'
        }]
      };
    };

    const handleRefresh = async () => {
      setRefreshing(true);
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRefreshing(false);
    };

    const getInsightIcon = (type) => {
      switch (type) {
        case 'critical': return 'alert-circle';
        case 'warning': return 'alert-triangle';
        case 'opportunity': return 'lightbulb';
        default: return 'info';
      }
    };

    const getInsightColor = (type) => {
      switch (type) {
        case 'critical': return 'text-red-600 bg-red-50 border-red-200';
        case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'opportunity': return 'text-green-600 bg-green-50 border-green-200';
        default: return 'text-blue-600 bg-blue-50 border-blue-200';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'bg-red-100 text-red-700';
        case 'medium': return 'bg-yellow-100 text-yellow-700';
        case 'low': return 'bg-green-100 text-green-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const recommendations = generateSmartRecommendations();

    return (
      <div className="ai-assistant-card" data-name="smart-recommendations" data-file="components/SmartRecommendations.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <div className="icon-sparkles text-sm text-white"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Smart Recommendations</h3>
              <span className="ai-badge">AI Powered</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-1 hover:bg-indigo-100 rounded transition-colors"
            >
              <div className={`icon-refresh-cw text-sm text-indigo-600 ${refreshing ? 'animate-spin' : ''}`}></div>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-indigo-100 rounded"
            >
              <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-sm text-indigo-600`}></div>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-indigo-50 rounded-lg p-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-indigo-600 hover:text-indigo-700'
                  }`}
                >
                  <div className={`icon-${tab.icon} text-xs sm:text-sm`}></div>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* AI Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-3">
                {recommendations.insights.map(insight => (
                  <div key={insight.id} className={`recommendation-insight border rounded-lg p-3 ${getInsightColor(insight.type)}`}>
                    <div className="flex items-start space-x-2">
                      <div className={`icon-${getInsightIcon(insight.type)} text-sm mt-0.5 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <h5 className="text-sm font-semibold leading-tight break-words">{insight.title}</h5>
                          <span className="text-xs font-medium whitespace-nowrap flex-shrink-0">
                            {insight.confidence}% confident
                          </span>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed break-words mb-2">{insight.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-2 py-0.5 bg-white bg-opacity-60 rounded-full whitespace-nowrap">
                            {insight.impact} impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions Tab */}
            {activeTab === 'actions' && (
              <div className="space-y-3">
                {recommendations.actions.map(action => (
                  <div key={action.id} className="recommendation-action">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h5 className="text-sm font-semibold text-[var(--text-primary)] leading-tight break-words flex-1">{action.title}</h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${getPriorityColor(action.priority)}`}>
                        {action.priority}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed break-words">{action.description}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-green-600 font-medium break-words flex-1">{action.estimatedImpact}</span>
                      <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Trends Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-3">
                {recommendations.trends.map(trend => (
                  <div key={trend.id} className="recommendation-action">
                    <div className="flex items-start space-x-2">
                      <div className={`icon-${trend.trend === 'positive' ? 'trending-up' : trend.trend === 'negative' ? 'trending-down' : 'minus'} text-sm mt-0.5 flex-shrink-0 ${
                        trend.trend === 'positive' ? 'text-green-600' : trend.trend === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-2 leading-tight break-words">{trend.title}</h5>
                        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed break-words">{trend.description}</p>
                        <div className="text-xs text-indigo-600 font-medium break-words">
                          Prediction: {trend.prediction}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-indigo-200 pt-3">
              <div className="text-xs text-[var(--text-secondary)] text-center">
                Recommendations updated every {selectedPeriod === 'week' ? '2 hours' : selectedPeriod === 'month' ? '6 hours' : '12 hours'}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('SmartRecommendations component error:', error);
    return null;
  }
}