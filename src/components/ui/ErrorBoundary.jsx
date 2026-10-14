import { Component } from 'react';

import ErrorState from './ErrorState.jsx';

// Container: catches render errors anywhere below and shows the designed
// ErrorState instead of a blank screen with a visible way back home.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Kept intentionally: surfacing the cause is what makes the fallback debuggable.
    console.error('Unhandled render error in Garcia Boillos Propiedades:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
