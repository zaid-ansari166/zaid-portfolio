"use client";
import React from "react";

// Prevents a failure in heavy/3D children (e.g. a missing WebGL context)
// from crashing the entire page. Renders an optional fallback instead.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Swallow — these are typically environment issues (no WebGL), not bugs.
    if (process.env.NODE_ENV !== "production") {
      console.warn("ErrorBoundary caught:", error?.message || error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
