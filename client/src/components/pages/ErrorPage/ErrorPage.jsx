import React, { Component } from "react";

import View from "../layout/View.jsx";
import Logger from "../../lib/logg.js";
import SageAdvice from "./SageAdvice.jsx";

const label = "ErrorBoundary";
const { loggError } = new Logger({ label });

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    loggError("Something went wrong! Displaying fallback UI", error, info);
  }

  render() {
    const { debug } = this.props;
    if (this.state.hasError || debug) {
      return (
        <View animateChildren={true} responsive={true} key="error-view">
          <SageAdvice />
        </View>
      );
    }

    //no error, so show normal pages
    return this.props.children;
  }
}

export default ErrorBoundary;
