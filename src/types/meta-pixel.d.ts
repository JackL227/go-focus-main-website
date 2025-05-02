
// Meta Pixel Types Declaration
interface Window {
  fbq: (
    command: 'init' | 'track' | 'trackCustom' | 'trackSingle' | 'trackSingleCustom', 
    eventType: string,
    parameters?: Record<string, unknown>
  ) => void;
  _fbq: any;
}
