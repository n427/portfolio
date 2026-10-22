const DEFAULT_SCRIPT_URL = "https://cloud.umami.is/script.js";

export type UmamiConfig = {
  src: string;
  websiteId: string;
  domains?: string;
};

/**
 * Builds the Umami tag config, or null when no website id is configured.
 * Keeping this pure makes the "analytics stays off unless configured"
 * rule testable without rendering the layout.
 */
export function resolveUmamiConfig(
  websiteId: string | undefined,
  scriptUrl?: string,
  domains?: string,
): UmamiConfig | null {
  const id = websiteId?.trim();
  if (!id) return null;

  const config: UmamiConfig = {
    src: scriptUrl?.trim() || DEFAULT_SCRIPT_URL,
    websiteId: id,
  };

  const allowed = domains?.trim();
  if (allowed) config.domains = allowed;

  return config;
}

export const UMAMI_CONFIG = resolveUmamiConfig(
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS,
);
