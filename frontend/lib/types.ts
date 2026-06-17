// Shared types matching the backend JSON contract (PROJECT_PLAN.md §7).

export interface ZoneLite {
  zone_id: string;
  risk_score: number;
  color: string;
  radius_m: number;
}

export interface ZoneFull extends ZoneLite {
  name: string;
  lat: number;
  lng: number;
}

export interface TimelineStep {
  datetime: string;
  overall_risk: number;
  zones: ZoneLite[];
}

export interface LegendItem {
  label: string;
  min: number;
  color: string;
}

export interface Route {
  rank: number;
  algorithm: string;
  distance_m: number;
  eta_min: number;
  summary: string;
  polyline: [number, number][];
}

export interface Diversion {
  blocked_segment: string;
  src: { lat: number; lng: number };
  dst: { lat: number; lng: number };
  engine: string;
  routes: Route[];
}

export interface Junction {
  name: string;
  lat: number;
  lng: number;
  risk: number;
  color: string;
}

export interface CongestionSegment {
  polyline: [number, number][];
  color: string;
  weight: number;
}

export interface Incident {
  id: string;
  cause: string;
  lat: number;
  lng: number;
  corridor: string;
  address: string;
  arrived_at: string;
  predicted_priority: "High" | "Low";
  closure_probability: number;
  predicted_clearance_min: number;
  clears_at: string;
  risk_score: number;
  color: string;
  radius_m: number;
  congestion_segments: CongestionSegment[];
  affected_junctions: Junction[];
  recommendation: {
    officers: number;
    barricades: { lat: number; lng: number }[];
    diversion: Diversion | null;
  };
}

export interface LiveFeedResponse {
  endpoint: string;
  sim_time: string;
  next_since: string;
  window_minutes: number;
  summary: {
    active_incidents: number;
    high_priority: number;
    avg_clearance_min: number;
    headline: string;
  };
  new_incidents: Incident[];
  legend: LegendItem[];
}

export interface RiskMapResponse {
  endpoint: string;
  requested_datetime: string;
  day_of_week: string;
  summary: {
    overall_risk: number;
    highest_zone: { name: string; risk_score: number } | null;
    headline: string;
  };
  baseline_zones: ZoneFull[];
  risk_timeline: TimelineStep[];
  legend: LegendItem[];
}

export interface ForecastResponse {
  endpoint: string;
  request_echo: Record<string, unknown>;
  summary: {
    predicted_priority: "High" | "Low";
    road_closure_probability: number;
    peak_risk_score: number;
    peak_window: string;
    headline: string;
  };
  impact_zones: ZoneFull[];
  congestion_segments?: CongestionSegment[];
  timeline: TimelineStep[];
  recommendations: {
    zone_id: string;
    name: string;
    officers: number;
    barricades: { lat: number; lng: number }[];
    diversion: Diversion | null;
  }[];
  legend: LegendItem[];
}

export interface ForecastRequest {
  event_cause: string;
  lat: number;
  lng: number;
  start_datetime: string;
  expected_crowd: number;
  forecast_days: number;
}
