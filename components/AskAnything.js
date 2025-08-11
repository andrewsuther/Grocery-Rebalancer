function AskAnything({ selectedDesk }) {
  try {
    const [question, setQuestion] = React.useState('');
    const [showSample, setShowSample] = React.useState(true);
    const [isExpanded, setIsExpanded] = React.useState(true);

    const sampleQuestion = `What's the best action I can take today to improve my offset in ${selectedDesk === 'oils' ? 'Oils & Vinegars' : 'Baking'}?`;
    
    const suggestionPrompts = [
      'Best TPR strategy for my desk',
      'Underperforming categories to focus on',
      'Optimal price reduction percentage',
      'Timeline to reach offset goals',
      'Competitor pricing analysis'
    ];

    const placeholderResponse = `Based on your current ${selectedDesk} desk performance and market trends, I recommend implementing a targeted TPR strategy on your top 3 velocity items with a 12-15% price reduction for 2 weeks. This could potentially improve your offset by 8-12% while maintaining margin health. Would you like me to identify specific SKUs and create an action plan?`;

    const handleSampleClick = () => {
      setQuestion(sampleQuestion);
      setShowSample(false);
    };

    const handleSuggestionClick = (suggestion) => {
      setQuestion(suggestion);
      setShowSample(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // This would integrate with AI in the future
      alert('This feature is coming soon! Your question has been noted for development.');
    };

    return (
      <div className="ask-anything-card" data-name="ask-anything" data-file="components/AskAnything.js">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <div className="icon-sparkles text-sm text-white"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Ask Anything</h3>
              <span className="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-purple-100 rounded"
          >
            <div className={`icon-${isExpanded ? 'chevron-up' : 'chevron-down'} text-sm text-purple-600`}></div>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Sample Question */}
            {showSample && (
              <div className="sample-question" onClick={handleSampleClick}>
                <div className="flex items-start space-x-2 mb-2">
                  <div className="icon-help-circle text-sm text-purple-600 mt-0.5"></div>
                  <span className="text-sm font-medium text-purple-800">Sample Question</span>
                </div>
                <p className="text-sm text-purple-700 leading-relaxed">
                  "{sampleQuestion}"
                </p>
                <div className="text-xs text-purple-600 mt-2">Click to try →</div>
              </div>
            )}

            {/* Question Input */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Ask about pricing strategies, performance, or recommendations
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-3 border border-purple-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="3"
                  placeholder="Type your question here..."
                />
              </div>

              <button
                type="submit"
                disabled={!question.trim()}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Ask AI Assistant
              </button>
            </form>

            {/* Suggestion Prompts */}
            <div>
              <div className="text-sm font-medium text-[var(--text-primary)] mb-2">
                Quick Prompts
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestionPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(prompt)}
                    className="suggestion-chip"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Placeholder Response (when sample is used) */}
            {!showSample && question === sampleQuestion && (
              <div className="placeholder-response">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="icon-bot text-sm text-gray-500"></div>
                  <span className="text-sm font-medium text-gray-700">AI Response Preview</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {placeholderResponse}
                </p>
              </div>
            )}

            {/* Development Note */}
            <div className="border-t border-purple-200 pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="ai-powered-badge">AI Powered</span>
                <div className="icon-zap text-sm text-indigo-600"></div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                This feature is powered by AI. In development with our Enablement team.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('AskAnything component error:', error);
    return null;
  }
}