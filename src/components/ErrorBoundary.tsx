import React, { Component, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorBoundaryProps {
  fallback?: ReactNode | ((error: Error | null) => ReactNode);
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error);
      }
      return (
        this.props.fallback || (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Algo salió mal. Por favor, reinicia la aplicación.
            </Text>
          </View>
        )
      );
    }
    return this.props.children;
  }
}
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});
