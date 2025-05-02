
// Type definitions for Facebook Pixel
interface Window {
  fbq: (
    command: "init" | "track" | "trackCustom" | "trackSingle" | "trackSingleCustom",
    eventType: string,
    parameters?: Record<string, unknown>
  ) => void;
}

declare function fbq(
  command: "init" | "track" | "trackCustom" | "trackSingle" | "trackSingleCustom",
  eventType: string,
  parameters?: Record<string, unknown>
): void;
