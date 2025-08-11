class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-black"
              >
                Reload Page
              </button>
            </div>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  function App() {
    try {
    // Initialize Chart.js
    const ChartJS = window.Chart;
    
    const [selectedPeriod, setSelectedPeriod] = React.useState('month');
    const [selectedView, setSelectedView] = React.useState('category');
    const [selectedDesk, setSelectedDesk] = React.useState('oils');
    const [simulationMode, setSimulationMode] = React.useState(false);
    const [simulationParams, setSimulationParams] = React.useState({
      promoType: 'TPR',
      priceReduction: 15,
      duration: 2,
      targetCategories: ['dairy']
    });
    const [dateRange, setDateRange] = React.useState({
      quarter: 'q1',
      startDate: '',
      endDate: ''
    });
    const [data, setData] = React.useState(null);
    const [alerts, setAlerts] = React.useState([]);
    const [showAlerts, setShowAlerts] = React.useState(false);
    const [filters, setFilters] = React.useState({
      search: '',
      actionTypes: [],
      performanceRange: [0, 100],
      efficiencyRange: [0, 100],
      dateRange: { start: '', end: '' },
      categories: [],
      status: [],
      sortBy: 'performance',
      sortOrder: 'desc'
    });
    const [showFilters, setShowFilters] = React.useState(false);
    const [showConfig, setShowConfig] = React.useState(false);
    const [dashboardConfig, setDashboardConfig] = React.useState({
      layout: 'default',
      visibleComponents: {
        progressCards: true,
        costOffsetBar: true,
        yearComparison: true,
        categoryBreakdown: true,
        categoryComparison: true,
        interactiveCharts: true,
        benchmarkComparison: true,
        offsetContributors: true,
        metrics: true
      },
      componentOrder: [
        'costOffsetBar',
        'yearComparison',
        'categoryBreakdown', 
        'categoryComparison',
        'interactiveCharts',
        'benchmarkComparison',
        'progressCards',
        'offsetContributors',
        'metrics'
      ]
    });
    const [mobileActiveTab, setMobileActiveTab] = React.useState('dashboard');
    const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  
    React.useEffect(() => {
      setData(getProgressData(selectedPeriod, selectedView, dateRange, simulationMode, simulationParams));
    }, [selectedPeriod, selectedView, dateRange, simulationMode, simulationParams]);
  
    React.useEffect(() => {
      if (data) {
        const newAlerts = generateAlerts(data, selectedPeriod, selectedDesk);
        setAlerts(newAlerts);
      }
    }, [data, selectedPeriod, selectedDesk]);
  
    const handleFilterChange = (newFilters) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
    };
  
    const handleDismissAlert = (alertId) => {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };
  
    const handleConfigChange = (newConfig) => {
      setDashboardConfig(prev => ({ ...prev, ...newConfig }));
    };
  
    const filteredData = React.useMemo(() => {
      if (!data) return null;
      
      return applyFilters(data, filters);
    }, [data, filters]);
  
      if (!data) return null;
  
      return (
        <div className="min-h-screen bg-[var(--secondary-color)]" data-name="app" data-file="app.js">
          {/* Header Icons Section */}
          <div className="header-icons">
            {/* Alerts Toggle Button - Desktop Only */}
            <div 
              className="header-icon-button hidden lg:block"
              onClick={() => setShowAlerts(!showAlerts)}
            >
              <div className="icon-bell text-lg text-[var(--text-primary)]"></div>
              {alerts.filter(alert => !alert.read).length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {alerts.filter(alert => !alert.read).length}
                </div>
              )}
            </div>
            
            {/* Configuration Toggle Button - Desktop Only */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="header-icon-button hidden lg:block bg-[var(--primary-color)] text-white hover:bg-blue-700"
            >
              <div className="icon-settings text-lg"></div>
            </button>
          </div>
  
          {/* Header */}
          <Header />
          
          {/* Header Controls */}
          <div className="header-controls">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-4">
              {/* Simulation Mode Toggle */}
              <div className="flex items-center justify-between lg:justify-start space-x-3 w-full lg:w-auto">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Simulation Mode
                </label>
                <button
                  onClick={() => setSimulationMode(!simulationMode)}
                  className={`simulation-toggle ${
                    simulationMode ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`simulation-toggle-button ${
                      simulationMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* Launchpad Button */}
              <button
                onClick={() => alert('Navigating to Pricing Action Launchpad...')}
                className="launchpad-button w-full lg:w-auto justify-center lg:justify-start"
              >
                <div className="icon-rocket text-sm"></div>
                <span>Go to Launchpad</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 lg:pb-8 lg:pr-4">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h1 className="responsive-text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Rebalancer Progress Bar
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                  Track financial progress toward cost recovery and CPI offsetting goals
                </p>
              </div>
  
  
  
              {/* Simulation Panel */}
              {simulationMode && (
                <div className="mb-8">
                  <SimulationPanel
                    simulationParams={simulationParams}
                    onParamsChange={setSimulationParams}
                    selectedPeriod={selectedPeriod}
                    data={data}
                  />
                </div>
              )}
  
              {/* Main Content Area */}
              <div className="flex flex-col lg:flex-row">
                {/* Dashboard Components */}
                <div className="flex-1 min-w-0 order-2 lg:order-1">
                  {mobileActiveTab === 'dashboard' && (
                    <LayoutCustomizer
                      config={dashboardConfig}
                      data={filteredData}
                      selectedPeriod={selectedPeriod}
                      selectedView={selectedView}
                      selectedDesk={selectedDesk}
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  )}
                  {mobileActiveTab === 'controls' && (
                    <div className="space-y-4 lg:hidden">
                      <PeriodSelector 
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={setSelectedPeriod}
                        selectedView={selectedView}
                        onViewChange={setSelectedView}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        selectedDesk={selectedDesk}
                        onDeskChange={setSelectedDesk}
                      />
                      <AdvancedFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        showFilters={showFilters}
                        onToggleFilters={setShowFilters}
                        data={data}
                        selectedPeriod={selectedPeriod}
                      />
                    </div>
                  )}
                </div>
  
                {/* Right Sidebar with Controls - Desktop Only */}
                <div className="hidden lg:block w-80 flex-shrink-0 ml-6 order-1 lg:order-2">
                  <div className="sticky top-4 space-y-4">
                    <PeriodSelector 
                      selectedPeriod={selectedPeriod}
                      onPeriodChange={setSelectedPeriod}
                      selectedView={selectedView}
                      onViewChange={setSelectedView}
                      dateRange={dateRange}
                      onDateRangeChange={setDateRange}
                      selectedDesk={selectedDesk}
                      onDeskChange={setSelectedDesk}
                    />
                    <AdvancedFilters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      showFilters={showFilters}
                      onToggleFilters={setShowFilters}
                      data={data}
                      selectedPeriod={selectedPeriod}
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* AI Assistant Sidebar - Desktop */}
            <div className="w-full lg:w-80 hidden lg:block">
              <div className="h-screen overflow-y-auto sidebar-scroll p-3 sm:p-4 space-y-4 sm:space-y-6">
                <RebalancerAssistant
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedView={selectedView}
                />
                <SmartRecommendations
                  data={data}
                  selectedPeriod={selectedPeriod}
                  selectedDesk={selectedDesk}
                  simulationMode={simulationMode}
                />
                <AskAnything selectedDesk={selectedDesk} />
              </div>
            </div>
  
            {/* Mobile AI Assistant Overlay */}
            {showMobileSidebar && (
              <div className="lg:hidden">
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowMobileSidebar(false)}
                ></div>
                <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
                  <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--text-primary)]">AI Assistant</h3>
                    <button
                      onClick={() => setShowMobileSidebar(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <div className="icon-x text-lg text-[var(--text-secondary)]"></div>
                    </button>
                  </div>
                  <div className="p-4 space-y-6">
                    <RebalancerAssistant
                      data={data}
                      selectedPeriod={selectedPeriod}
                      selectedView={selectedView}
                    />
                    <SmartRecommendations
                      data={data}
                      selectedPeriod={selectedPeriod}
                      selectedDesk={selectedDesk}
                      simulationMode={simulationMode}
                    />
                    <AskAnything selectedDesk={selectedDesk} />
                  </div>
                </div>
              </div>
            )}
          </div>
  
          {/* Mobile Bottom Navigation */}
          <div className="mobile-nav">
            <div className="flex">
              <button
                onClick={() => setMobileActiveTab('dashboard')}
                className={`mobile-nav-item ${mobileActiveTab === 'dashboard' ? 'active' : ''}`}
              >
                <div className="icon-layout-dashboard text-lg mb-1"></div>
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setMobileActiveTab('controls')}
                className={`mobile-nav-item ${mobileActiveTab === 'controls' ? 'active' : ''}`}
              >
                <div className="icon-sliders text-lg mb-1"></div>
                <span>Controls</span>
              </button>
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="mobile-nav-item"
              >
                <div className="icon-brain text-lg mb-1"></div>
                <span>AI Assistant</span>
              </button>
              <button
                onClick={() => onToggleAlerts(!showAlerts)}
                className="mobile-nav-item relative"
              >
                <div className="icon-bell text-lg mb-1"></div>
                <span>Alerts</span>
                {alerts.filter(alert => !alert.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {alerts.filter(alert => !alert.read).length}
                  </div>
                )}
              </button>
            </div>
          </div>
          
          {/* Alerts System */}
          <AlertsSystem
            alerts={alerts}
            showAlerts={showAlerts}
            onToggleAlerts={setShowAlerts}
            onDismissAlert={handleDismissAlert}
            data={filteredData}
            selectedDesk={selectedDesk}
          />
          
          {/* Dashboard Configuration */}
          <DashboardConfig
            config={dashboardConfig}
            showConfig={showConfig}
            onToggleConfig={setShowConfig}
            onConfigChange={handleConfigChange}
          />
          
          {/* Floating Feedback Button */}
          <FeedbackButton />
        </div>
      );
    } catch (error) {
      console.error('App component error:', error);
      return null;
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );