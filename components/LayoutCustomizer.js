function LayoutCustomizer({ config, data, selectedPeriod, selectedView, selectedDesk, filters, onFilterChange }) {
  try {
    const renderComponent = (componentId) => {
      if (!config.visibleComponents[componentId]) return null;

      const componentProps = {
        data,
        selectedPeriod,
        selectedView,
        selectedDesk,
        filters,
        onFilterChange
      };

      switch (componentId) {
        case 'costOffsetBar':
          return (
            <div key={componentId} className="component-card">
              <CostOffsetBar
                percentage={data.costOffset.percentage}
                marginRecovered={data.costOffset.marginRecovered}
                cpiTargetMet={data.costOffset.cpiTargetMet}
              />
            </div>
          );

        case 'progressCards':
          return (
            <div key={componentId} className="component-card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressCard
                  title="Cost Recovery Progress"
                  current={data.costRecovery.current}
                  target={data.costRecovery.target}
                  percentage={data.costRecovery.percentage}
                  status={data.costRecovery.status}
                  icon="dollar-sign"
                />
                <ProgressCard
                  title="CPI Offsetting Progress"
                  current={data.cpiOffsetting.current}
                  target={data.cpiOffsetting.target}
                  percentage={data.cpiOffsetting.percentage}
                  status={data.cpiOffsetting.status}
                  icon="trending-up"
                />
              </div>
            </div>
          );

        case 'yearComparison':
          return (
            <div key={componentId} className="component-card">
              <YearComparison
                selectedPeriod={selectedPeriod}
                selectedView={selectedView}
              />
            </div>
          );

        case 'categoryBreakdown':
          return selectedView === 'division' ? (
            <div key={componentId} className="component-card">
              <CategoryBreakdown
                selectedPeriod={selectedPeriod}
                selectedDesk={selectedDesk}
                data={data}
              />
            </div>
          ) : null;

        case 'categoryComparison':
          return selectedView === 'division' ? (
            <div key={componentId} className="component-card">
              <CategoryComparison
                selectedPeriod={selectedPeriod}
                selectedDesk={selectedDesk}
                data={data}
              />
            </div>
          ) : null;

        case 'interactiveCharts':
          return (
            <div key={componentId} className="component-card">
              <InteractiveCharts
                data={data}
                selectedPeriod={selectedPeriod}
                selectedDesk={selectedDesk}
                selectedView={selectedView}
              />
            </div>
          );

        case 'benchmarkComparison':
          return (
            <div key={componentId} className="component-card">
              <BenchmarkComparison
                data={data}
                selectedPeriod={selectedPeriod}
                selectedDesk={selectedDesk}
                selectedView={selectedView}
              />
            </div>
          );

        case 'offsetContributors':
          return (
            <div key={componentId} className="component-card">
              <OffsetContributorsTable
                contributors={data.offsetContributors}
                selectedPeriod={selectedPeriod}
                filters={filters}
                onFilterChange={onFilterChange}
              />
            </div>
          );

        case 'metrics':
          return (
            <div key={componentId} className="component-card">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Savings"
                  value={`$${data.metrics.totalSavings.toLocaleString()}`}
                  change={data.metrics.savingsChange}
                  icon="piggy-bank"
                />
                <MetricCard
                  title="Price Adjustments"
                  value={data.metrics.priceAdjustments}
                  change={data.metrics.adjustmentsChange}
                  icon="settings"
                />
                <MetricCard
                  title="Efficiency Score"
                  value={`${data.metrics.efficiencyScore}%`}
                  change={data.metrics.efficiencyChange}
                  icon="target"
                />
                <MetricCard
                  title="Items Rebalanced"
                  value={data.metrics.itemsRebalanced.toLocaleString()}
                  change={data.metrics.itemsChange}
                  icon="package"
                />
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    const getLayoutClass = () => {
      switch (config.layout) {
        case 'compact':
          return 'layout-grid-3 layout-compact';
        case 'wide':
          return 'layout-grid-1 layout-wide';
        case 'sidebar':
          return 'layout-sidebar';
        default:
          return 'layout-grid-1';
      }
    };

    const visibleComponents = config.componentOrder
      .filter(componentId => config.visibleComponents[componentId])
      .map(componentId => renderComponent(componentId))
      .filter(component => component !== null);

    return (
      <div className={getLayoutClass()} data-name="layout-customizer" data-file="components/LayoutCustomizer.js">
        {config.layout === 'sidebar' ? (
          <>
            <div className="layout-main">
              {visibleComponents.slice(0, Math.ceil(visibleComponents.length * 0.7))}
            </div>
            <div className="layout-side">
              {visibleComponents.slice(Math.ceil(visibleComponents.length * 0.7))}
            </div>
          </>
        ) : (
          visibleComponents
        )}
      </div>
    );
  } catch (error) {
    console.error('LayoutCustomizer component error:', error);
    return null;
  }
}
