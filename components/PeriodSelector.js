function PeriodSelector({ selectedPeriod, onPeriodChange, selectedView, onViewChange, dateRange, onDateRangeChange, selectedDesk, onDeskChange }) {
  try {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    
    const deskOptions = [
      { value: 'oils', label: 'Oils & Vinegars' },
      { value: 'spices', label: 'Spices & Seasonings' },
      { value: 'condiments', label: 'Condiments & Sauces' },
      { value: 'baking', label: 'Baking Essentials' },
      { value: 'international', label: 'International Foods' },
      { value: 'organic', label: 'Organic Products' },
      { value: 'specialty', label: 'Specialty Items' }
    ];
    
    const periods = [
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'quarter', label: 'This Quarter' }
    ];

    const views = [
      { value: 'division', label: 'Division View' },
      { value: 'category', label: 'Category View' }
    ];

    const quarterOptions = [
      { value: 'q1', label: 'Q1 (Jan-Mar)' },
      { value: 'q2', label: 'Q2 (Apr-Jun)' },
      { value: 'q3', label: 'Q3 (Jul-Sep)' },
      { value: 'q4', label: 'Q4 (Oct-Dec)' }
    ];

    const handleCustomDateChange = (type, value) => {
      onDateRangeChange({
        ...dateRange,
        [type]: value
      });
    };

    return (
      <div className="dashboard-card" data-name="period-selector" data-file="components/PeriodSelector.js">
        <div className="space-y-5">
          {/* View Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              View Type
            </label>
            <div className="grid grid-cols-1 gap-2">
              {views.map((view) => (
                <button
                  key={view.value}
                  onClick={() => onViewChange(view.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedView === view.value
                      ? 'bg-[var(--success-color)] text-white'
                      : 'bg-[var(--secondary-color)] text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desk Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Choose Your Desk
            </label>
            <select
              value={selectedDesk}
              onChange={(e) => onDeskChange(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            >
              {deskOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)] bg-opacity-10 flex items-center justify-center">
              <div className="icon-calendar text-sm text-[var(--primary-color)]"></div>
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Time Period</h3>
          </div>

          {/* Time Period Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => onPeriodChange(period.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-[var(--secondary-color)] text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quarter Selection */}
          {selectedPeriod === 'quarter' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Quarter
              </label>
              <select
                value={dateRange.quarter || 'q1'}
                onChange={(e) => handleCustomDateChange('quarter', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
              >
                {quarterOptions.map(quarter => (
                  <option key={quarter.value} value={quarter.value}>
                    {quarter.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Custom Date Range */}
          <div className="space-y-3 border-t border-[var(--border-color)] pt-4">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-[var(--border-color)] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="icon-settings text-sm text-[var(--text-secondary)]"></div>
              <span className="text-sm text-[var(--text-secondary)]">Custom Date Range</span>
              <div className={`icon-${showDatePicker ? 'chevron-up' : 'chevron-down'} text-sm text-[var(--text-secondary)]`}></div>
            </button>
            
            {showDatePicker && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate || ''}
                    onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate || ''}
                    onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PeriodSelector component error:', error);
    return null;
  }
}