function Header({ selectedDesk, onDeskChange }) {
  try {
    return (
      <div className="app-header" data-name="header" data-file="components/Header.js">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Rebalancer Progress Dashboard
          </h1>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
