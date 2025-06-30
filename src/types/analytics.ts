// Global analytics types
declare global {
  interface Window {
    dataLayer?: AnalyticsEvent[]
  }
}

export interface AnalyticsEvent {
  event: string
  test_name?: string
  variant_id?: string
  conversion_event?: string
  timestamp: string
  email_domain?: string
  step?: string
  [key: string]: string | number | boolean | undefined
}

export interface AnalyticsData extends Record<string, string | number | boolean | undefined> {
  domain?: string
  user_type?: string
  phone_provided?: boolean
}
