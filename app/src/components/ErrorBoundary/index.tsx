import React, { Component } from "react";
import PageError from "../../pages/PageError";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    //this.setState({})
    console.log("Error");
  }

  static getDerivedStateFromError(error: any): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <PageError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
