function SearchBar({ value, onChange, placeholder, data }) {
  try {
    const [showResults, setShowResults] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState([]);
    const searchRef = React.useRef(null);

    const generateSearchSuggestions = (query) => {
      if (!query || !data) return [];

      const suggestions = [];
      const lowerQuery = query.toLowerCase();

      // Search in action types
      if (data.offsetContributors) {
        data.offsetContributors.forEach(contributor => {
          if (contributor.actionTypeName.toLowerCase().includes(lowerQuery)) {
            suggestions.push({
              type: 'action',
              title: contributor.actionTypeName,
              subtitle: `${contributor.actionsTaken} actions taken`,
              icon: 'zap'
            });
          }
        });
      }

      // Search in metrics
      const metrics = [
        { name: 'Total Savings', value: data.metrics?.totalSavings, icon: 'dollar-sign' },
        { name: 'Efficiency Score', value: data.metrics?.efficiencyScore, icon: 'target' },
        { name: 'Price Adjustments', value: data.metrics?.priceAdjustments, icon: 'settings' }
      ];

      metrics.forEach(metric => {
        if (metric.name.toLowerCase().includes(lowerQuery)) {
          suggestions.push({
            type: 'metric',
            title: metric.name,
            subtitle: `Current: ${metric.value}`,
            icon: metric.icon
          });
        }
      });

      // Common search terms
      const commonTerms = [
        { term: 'performance', description: 'Overall performance metrics' },
        { term: 'efficiency', description: 'Pricing efficiency data' },
        { term: 'margin', description: 'Margin recovery information' },
        { term: 'target', description: 'Target achievement status' }
      ];

      commonTerms.forEach(term => {
        if (term.term.toLowerCase().includes(lowerQuery)) {
          suggestions.push({
            type: 'term',
            title: term.term,
            subtitle: term.description,
            icon: 'search'
          });
        }
      });

      return suggestions.slice(0, 5);
    };

    React.useEffect(() => {
      if (value) {
        const results = generateSearchSuggestions(value);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, [value, data]);

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowResults(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (result) => {
      onChange(result.title);
      setShowResults(false);
    };

    return (
      <div className="search-container" ref={searchRef} data-name="search-bar" data-file="components/SearchBar.js">
        <div className="relative">
          <div className="search-icon">
            <div className="icon-search text-sm"></div>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => value && setShowResults(true)}
            placeholder={placeholder}
            className="search-input"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <div className="icon-x text-sm"></div>
            </button>
          )}
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`icon-${result.icon} text-sm text-[var(--text-secondary)]`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--text-primary)]">
                      {result.title}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {result.subtitle}
                    </div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] capitalize">
                    {result.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('SearchBar component error:', error);
    return null;
  }
}