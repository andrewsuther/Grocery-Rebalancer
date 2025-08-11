function FeedbackButton() {
  try {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [hoveredRating, setHoveredRating] = React.useState(0);
    const [feedback, setFeedback] = React.useState({
      questions: '',
      decisions: '',
      improvements: ''
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleFeedbackChange = (field, value) => {
      setFeedback(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // In a real app, this would send feedback to a backend
      console.log('Feedback submitted:', {
        rating,
        feedback,
        timestamp: new Date().toISOString()
      });
      
      setIsSubmitted(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setRating(0);
        setFeedback({ questions: '', decisions: '', improvements: '' });
      }, 2000);
    };

    const handleClose = () => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    };

    const StarRating = () => {
      return (
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className={`star ${
                star <= (hoveredRating || rating) ? 'star-filled' : 'star-empty'
              }`}
            >
              <div className="icon-star text-xl"></div>
            </button>
          ))}
        </div>
      );
    };

    return (
      <>
        {/* Floating Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="feedback-button"
          data-name="feedback-button"
          data-file="components/FeedbackButton.js"
        >
          <div className="flex items-center space-x-2">
            <div className="icon-help-circle text-lg"></div>
            <span className="font-medium">What's Missing?</span>
          </div>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="feedback-modal" onClick={handleClose}>
            <div className="bg-white rounded-lg p-4 lg:p-6 max-w-sm lg:max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
              {!isSubmitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      Help Us Improve
                    </h3>
                    <button
                      onClick={handleClose}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <div className="icon-x text-lg text-[var(--text-secondary)]"></div>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div className="text-center">
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                        How helpful was this tool today?
                      </label>
                      <StarRating />
                      {rating > 0 && (
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          {rating === 1 && "Not helpful"}
                          {rating === 2 && "Slightly helpful"}
                          {rating === 3 && "Moderately helpful"}
                          {rating === 4 && "Very helpful"}
                          {rating === 5 && "Extremely helpful"}
                        </p>
                      )}
                    </div>

                    {/* Feedback Questions */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          What questions did this not answer?
                        </label>
                        <textarea
                          value={feedback.questions}
                          onChange={(e) => handleFeedbackChange('questions', e.target.value)}
                          className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm resize-none"
                          rows="2"
                          placeholder="Tell us what information you were looking for..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          What decisions did this help you make?
                        </label>
                        <textarea
                          value={feedback.decisions}
                          onChange={(e) => handleFeedbackChange('decisions', e.target.value)}
                          className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm resize-none"
                          rows="2"
                          placeholder="Share how this tool influenced your pricing decisions..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          What would make this better?
                        </label>
                        <textarea
                          value={feedback.improvements}
                          onChange={(e) => handleFeedbackChange('improvements', e.target.value)}
                          className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm resize-none"
                          rows="2"
                          placeholder="Suggest features or improvements..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Thank You Message */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="icon-check text-2xl text-green-600"></div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Your feedback helps us improve the tool for everyone.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('FeedbackButton component error:', error);
    return null;
  }
}