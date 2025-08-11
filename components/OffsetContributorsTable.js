function OffsetContributorsTable({ contributors, selectedPeriod, filters, onFilterChange }) {
  try {
    const [sortField, setSortField] = React.useState('contribution');
    const [sortDirection, setSortDirection] = React.useState('desc');
    const [filterType, setFilterType] = React.useState('all');

    const actionTypes = ['all', 'TPR', 'Cover', 'Fat5', 'Everyday'];

    const handleSort = (field) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
    };

    const filteredAndSortedData = React.useMemo(() => {
      let filtered = contributors;
      
      if (filterType !== 'all') {
        filtered = contributors.filter(item => item.actionType === filterType);
      }

      return filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal) * multiplier;
        }
        return (aVal - bVal) * multiplier;
      });
    }, [contributors, filterType, sortField, sortDirection]);

    const getRowClass = (actionType) => {
      return `action-type-${actionType.toLowerCase()}`;
    };

    const getSortIcon = (field) => {
      if (sortField !== field) return 'chevron-up-down';
      return sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
    };

    return (
      <div className="dashboard-card" data-name="offset-contributors-table" data-file="components/OffsetContributorsTable.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Offset Contributors</h2>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm"
            >
              {actionTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="responsive-table">
          <table className="w-full min-w-max">
            <thead>
              <tr>
                <th 
                  className="table-header cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('actionTypeName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Pricing Action Type</span>
                    <div className={`icon-${getSortIcon('actionTypeName')} text-xs`}></div>
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('actionsTaken')}
                >
                  <div className="flex items-center space-x-1">
                    <span># of Actions</span>
                    <div className={`icon-${getSortIcon('actionsTaken')} text-xs`}></div>
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('forecastedImpact')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Forecasted Impact</span>
                    <div className={`icon-${getSortIcon('forecastedImpact')} text-xs`}></div>
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('actualImpact')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Actual Impact</span>
                    <div className={`icon-${getSortIcon('actualImpact')} text-xs`}></div>
                  </div>
                </th>
                <th 
                  className="table-header cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('contribution')}
                >
                  <div className="flex items-center space-x-1">
                    <span>% Contribution</span>
                    <div className={`icon-${getSortIcon('contribution')} text-xs`}></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((item) => (
                <tr key={item.id} className={getRowClass(item.actionType)}>
                  <td className="table-cell font-medium">{item.actionTypeName}</td>
                  <td className="table-cell">{item.actionsTaken}</td>
                  <td className="table-cell">${item.forecastedImpact.toLocaleString()}</td>
                  <td className="table-cell">${item.actualImpact.toLocaleString()}</td>
                  <td className="table-cell">{item.contribution}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('OffsetContributorsTable component error:', error);
    return null;
  }
}