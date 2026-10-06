interface Window {
  /** GA4 event helper; a no-op until analytics consent is granted */
  track?: (event: string, params?: Record<string, unknown>) => void;
}
