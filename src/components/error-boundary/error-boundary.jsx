import React from "react";

import "./error-boundary.styles.scss";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary-overlay">
          <div className="error-boundary-container"></div>
          <h2 className="error-boundary-text">This Page is Lost in Space</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
