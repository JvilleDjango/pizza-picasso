import React, { type ErrorInfo, type PropsWithChildren } from 'react'
import './error-boundary.module.scss'

interface ErrorBoundaryState {
  hasErrored: boolean
}

class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasErrored: false,
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasErrored: true }
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error(error)
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary-overlay">
          <div className="error-boundary-container"></div>
          <h2 className="error-boundary-text">This page is lost in space</h2>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
