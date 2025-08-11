function BenchmarkComparison({ data, selectedPeriod, selectedDesk, selectedView }) {
  try {
    const [activeTab, setActiveTab] = React.useState('industry');
    const [isExpanded, setIsExpanded] = React.useState(true);

    const tabs = [
      { id: 'industry', label: 'Industry Standards', icon: 'building' },
      { id: 'historical', label: 'Historical Baseline', icon: 'calendar' },
      { id: 'peer', label: 'Peer Comparison', icon: 'users' }
    ];

    return (
      <div className="benchmark-card" data-name="benchmark-comparison" data-file="components/BenchmarkComparison.js">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <div className="icon-bar-chart-2 text-lg text-emerald-600"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Performance Benchmarking</h3>
              <p className="text-sm text-[var(--text-secondary)]">Compare against industry standards and historical performance</p>
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
            {/* Tab Navigation */}
            <div className="flex space-x-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`icon-${tab.icon} text-sm`}></div>
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-64">
              {activeTab === 'industry' && (
                <IndustryStandards 
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedDesk={selectedDesk}
                />
              )}
              
              {activeTab === 'historical' && (
                <HistoricalBaseline 
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedView={selectedView}
                />
              )}
              
              {activeTab === 'peer' && (
                <PeerComparison 
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
    console.error('BenchmarkComparison component error:', error);
    return null;
  }
}

function PeerComparison({ data, selectedPeriod, selectedDesk }) {
  const generatePeerData = () => {
    return [
      { name: 'Your Performance', value: 82, type: 'current' },
      { name: 'Top Quartile', value: 92, type: 'benchmark' },
      { name: 'Industry Median', value: 75, type: 'benchmark' },
      { name: 'Bottom Quartile', value: 58, type: 'benchmark' }
    ];
  };

  const peerData = generatePeerData();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {peerData.map((peer, index) => (
          <div key={index} className={`benchmark-score ${
            peer.type === 'current' ? 'score-good' : 'score-average'
          }`}>
            <div className="text-2xl font-bold mb-1">{peer.value}%</div>
            <div className="text-sm font-medium">{peer.name}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-[var(--text-secondary)]">
        Your {selectedDesk} desk ranks in the 65th percentile among similar retailers
      </div>
    </div>
  );
}