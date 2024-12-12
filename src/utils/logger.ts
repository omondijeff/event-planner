type LogLevel = "info" | "warn" | "error" | "debug";

interface LogOptions {
  level?: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

export const Logger = {
  /**
   * Logs a message with the specified options.
   * @param options - Options for the log (level, message, context, error).
   */
  log({ level = "info", message, context = {}, error }: LogOptions): void {
    const timestamp = new Date().toISOString();
    const env = import.meta.env.MODE || "development";

    // Format log entry
    const logEntry = {
      timestamp,
      level,
      message,
      context,
      ...(error ? { error: error.message, stack: error.stack } : {}),
    };

    if (env === "production") {
      // Send logs to an external service
      // this.sendToExternalService(logEntry);
      this.logToConsole(logEntry);
    } else {
      // Log to console in development
      this.logToConsole(logEntry);
    }
  },

  /**
   * Sends logs to an external service in production.
   * Replace this with your actual implementation.
   * @param logEntry - The formatted log entry.
   */
  sendToExternalService(logEntry: Record<string, any>): void {
    // // Replace with an actual service endpoint
    // fetch("https://your-logging-service.example.com/logs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(logEntry),
    // }).catch((err) => {
    //   console.error("Failed to send log to external service:", err);
    // });
  },

  /**
   * Logs to the console in a structured format.
   * @param logEntry - The formatted log entry.
   */
  logToConsole(logEntry: Record<string, any>): void {
    const { level, message, context, error } = logEntry;

    switch (level) {
      case "info":
        console.info(`[INFO] ${message}`, context);
        break;
      case "warn":
        console.warn(`[WARN] ${message}`, context);
        break;
      case "error":
        console.error(`[ERROR] ${message}`, context, error);
        break;
      case "debug":
        console.debug(`[DEBUG] ${message}`, context);
        break;
      default:
        console.log(`[LOG] ${message}`, context);
    }
  },

  /**
   * Log info messages.
   */
  info(message: string, context: Record<string, any> = {}): void {
    this.log({ level: "info", message, context });
  },

  /**
   * Log warnings.
   */
  warn(message: string, context: Record<string, any> = {}): void {
    this.log({ level: "warn", message, context });
  },

  /**
   * Log errors.
   */
  error(message: string, error?: Error, context: Record<string, any> = {}): void {
    this.log({ level: "error", message, context, error });
  },

  /**
   * Log debug messages.
   */
  debug(message: string, context: Record<string, any> = {}): void {
    const env = import.meta.env.MODE || "development";
    if (env !== "production") {
      this.log({ level: "debug", message, context });
    }
  },
};
