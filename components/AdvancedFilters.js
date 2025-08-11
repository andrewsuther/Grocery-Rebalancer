function AdvancedFilters({ filters, onFilterChange, showFilters, onToggleFilters, data, selectedPeriod }) {
  try {
    const [activeFilterGroup, setActiveFilterGroup] = React.useState('search');

    const filterGroups = [
      { id: 'search', label: 'Search & Quick Filters', icon: 'search' },
      { id: 'performance', label: 'Performance Filters', icon: 'target' },
      { id: 'categories', label: 'Category Filters', icon: 'grid-3x3' },
      { id: 'advanced', label: 'Advanced Options', icon: 'settings' }
    ];

    const actionTypes = ['TPR', 'Cover', 'Fat5', 'Everyday'];
    const statusOptions = ['on-track', 'behind', 'critical'];
    const categories = ['dairy', 'produce', 'packaged', 'frozen', 'meat', 'bakery'];

    const handleFilterUpdate = (key, value) => {
      onFilterChange({ [key]: value });
    };

    const handleArrayFilterToggle = (key, value) => {
      const currentArray = filters[key] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      onFilterChange({ [key]: newArray });
    };

    const clearFilters = () => {
      onFilterChange({
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
    };

    const getActiveFiltersCount = () => {
      let count = 0;
      if (filters.search) count++;
      if (filters.actionTypes?.length > 0) count++;
      if (filters.categories?.length > 0) count++;
      if (filters.status?.length > 0) count++;
      if (filters.performanceRange[0] > 0 || filters.performanceRange[1] < 100) count++;
      if (filters.efficiencyRange[0] > 0 || filters.efficiencyRange[1] < 100) count++;
      return count;
    };

    return (
      <div className="filter-panel" data-name="advanced-filters" data-file="components/AdvancedFilters.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <div className="icon-filter text-sm text-purple-600"></div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Advanced Filters</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {getActiveFiltersCount()} active filters
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => onToggleFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className={`icon-${showFilters ? 'chevron-up' : 'chevron-down'} text-sm text-[var(--text-secondary)]`}></div>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-6">
            {/* Filter Group Navigation */}
            <div className="flex flex-wrap gap-2">
              {filterGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setActiveFilterGroup(group.id)}
                  className={`filter-toggle ${
                    activeFilterGroup === group.id ? 'filter-toggle-active' : 'filter-toggle-inactive'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <div className={`icon-${group.icon} text-xs`}></div>
                    <span>{group.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Search & Quick Filters */}
            {activeFilterGroup === 'search' && (
              <div className="filter-group">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => handleFilterUpdate('search', value)}
                  placeholder="Search actions, categories, or performance metrics..."
                  data={data}
                />
                
                <div>
                  <label className="filter-label">Action Types</label>
                  <div className="flex flex-wrap gap-2">
                    {actionTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => handleArrayFilterToggle('actionTypes', type)}
                        className={`filter-toggle ${
                          filters.actionTypes?.includes(type) ? 'filter-toggle-active' : 'filter-toggle-inactive'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Performance Filters */}
            {activeFilterGroup === 'performance' && (
              <div className="filter-group">
                <div>
                  <label className="filter-label">
                    Performance Range: {filters.performanceRange[0]}% - {filters.performanceRange[1]}%
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.performanceRange[0]}
                      onChange={(e) => handleFilterUpdate('performanceRange', [parseInt(e.target.value), filters.performanceRange[1]])}
                      className="filter-range"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.performanceRange[1]}
                      onChange={(e) => handleFilterUpdate('performanceRange', [filters.performanceRange[0], parseInt(e.target.value)])}
                      className="filter-range"
                    />
                  </div>
                </div>

                <div>
                  <label className="filter-label">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => handleArrayFilterToggle('status', status)}
                        className={`filter-toggle ${
                          filters.status?.includes(status) ? 'filter-toggle-active' : 'filter-toggle-inactive'
                        }`}
                      >
                        {status === 'on-track' ? 'On Track' : status === 'behind' ? 'Behind' : 'Critical'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category Filters */}
            {activeFilterGroup === 'categories' && (
              <div className="filter-group">
                <div>
                  <label className="filter-label">Categories</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.categories?.includes(category)}
                          onChange={() => handleArrayFilterToggle('categories', category)}
                          className="filter-checkbox"
                        />
                        <span className="text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Options */}
            {activeFilterGroup === 'advanced' && (
              <div className="filter-group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="filter-label">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterUpdate('sortBy', e.target.value)}
                      className="filter-select"
                    >
                      <option value="performance">Performance</option>
                      <option value="impact">Impact</option>
                      <option value="efficiency">Efficiency</option>
                      <option value="date">Date</option>
                    </select>
                  </div>

                  <div>
                    <label className="filter-label">Sort Order</label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => handleFilterUpdate('sortOrder', e.target.value)}
                      className="filter-select"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="filter-label">Date From</label>
                    <input
                      type="date"
                      value={filters.dateRange?.start || ''}
                      onChange={(e) => handleFilterUpdate('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  <div>
                    <label className="filter-label">Date To</label>
                    <input
                      type="date"
                      value={filters.dateRange?.end || ''}
                      onChange={(e) => handleFilterUpdate('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="filter-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Filter Summary */}
            <div className="filter-summary">
              <div className="text-xs font-medium mb-2">Active Filters:</div>
              <div className="flex flex-wrap gap-1">
                {filters.search && (
                  <span className="filter-tag">
                    Search: "{filters.search}"
                    <button
                      onClick={() => handleFilterUpdate('search', '')}
                      className="filter-tag-remove"
                    >
                      <div className="icon-x text-xs"></div>
                    </button>
                  </span>
                )}
                {filters.actionTypes?.map(type => (
                  <span key={type} className="filter-tag">
                    {type}
                    <button
                      onClick={() => handleArrayFilterToggle('actionTypes', type)}
                      className="filter-tag-remove"
                    >
                      <div className="icon-x text-xs"></div>
                    </button>
                  </span>
                ))}
                {filters.categories?.map(category => (
                  <span key={category} className="filter-tag">
                    {category}
                    <button
                      onClick={() => handleArrayFilterToggle('categories', category)}
                      className="filter-tag-remove"
                    >
                      <div className="icon-x text-xs"></div>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AdvancedFilters component error:', error);
    return null;
  }
}