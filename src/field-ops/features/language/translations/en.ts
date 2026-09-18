export const en = {
  // Navigation
  nav_home: "Operations",
  nav_report: "Report",
  nav_my_reports: "My Reports",
  nav_alerts: "Alerts",
  nav_sync: "Sync Queue",

  // Operations / Dashboard
  ops_title: "Field Operations Command",
  ops_gps_status: "GPS Status",
  ops_gps_active: "Active Precision Fix",
  ops_gps_disabled: "Location Denied",
  ops_conn_status: "Connectivity",
  ops_online: "Online (Sync Active)",
  ops_offline: "Offline (Local Queue)",
  ops_pending_sync: "Pending Sync",
  ops_active_alerts: "Active Alerts",
  ops_last_sync: "Last Synced",
  ops_assigned_area: "Assigned Area",
  ops_quick_report: "Report New Incident",
  ops_recent_reports: "Recent Incident Logs",
  ops_no_recent_reports: "No incident reports filed yet.",

  // Incident Form
  report_title: "Field Incident Report",
  step_location: "1. Location Fix",
  step_details: "2. Incident Details",
  step_photo: "3. Photograph & Submit",
  loc_btn_capture: "Capture Current GPS",
  loc_retrying: "Acquiring Satellite Lock...",
  loc_lat: "Latitude",
  loc_lng: "Longitude",
  loc_accuracy: "Accuracy",
  loc_time: "Recorded At",
  loc_permission_denied: "GPS permission was denied by device. Please enable location permissions in browser settings.",
  loc_retry_btn: "Retry GPS Permission",

  // Types
  type_ROAD_BLOCKED: "Road Blocked / Obstruction",
  type_ROAD_DAMAGE: "Road Surface Damage",
  type_LANDSLIDE: "Landslide / Slope Debris",
  type_FLOOD: "Flooding / Waterlogging",
  type_HEAVY_RAINFALL: "Heavy Rainfall / Poor Visibility",
  type_BRIDGE_ISSUE: "Bridge Accessibility Issue",
  type_CONGESTION: "Heavy Transport Congestion",
  type_TRANSPORT_DISRUPTION: "Transport Disruption",
  type_REMOTE_AREA_ACCESS_ISSUE: "Remote Area Cut-off",
  type_OTHER: "Other Logistics Incident",

  // Severity
  sev_label: "Disruption Severity",
  sev_low: "Low",
  sev_low_desc: "Minor issue, movement still possible.",
  sev_medium: "Medium",
  sev_medium_desc: "Movement affected but possible.",
  sev_high: "High",
  sev_high_desc: "Major disruption requiring attention.",
  sev_critical: "Critical",
  sev_critical_desc: "Route/accessibility severely affected or emergency response required.",

  // Form Fields
  desc_label: "Incident Description",
  desc_placeholder: "Describe the nature of obstruction, current weather, and immediate accessibility status...",
  road_label: "Road / Highway Name (Optional)",
  road_placeholder: "e.g. NH-27, SH-3, Nongpoh bypass",
  landmark_label: "Nearby Landmark (Optional)",
  landmark_placeholder: "e.g. 2km after Sonapur Toll Plaza",
  obstruction_length_label: "Estimated Obstruction Length",
  obstruction_placeholder: "e.g. 30 meters",
  accessibility_label: "Vehicle Accessibility",
  acc_all: "All Vehicles (Slow)",
  acc_light_only: "Light Vehicles (LMV) Only",
  acc_4x4_only: "High-Clearance / 4x4 Only",
  acc_none: "Completely Impassable (None)",

  // Photo
  photo_title: "Field Photograph",
  photo_subtitle: "Attach or take clear photo of obstruction for verification.",
  photo_btn_camera: "Take Photo",
  photo_btn_upload: "Upload Image",
  photo_btn_remove: "Remove Photo",
  photo_compressing: "Optimizing image for low bandwidth...",

  // Submission & Queue
  btn_submit_report: "Submit Incident Report",
  submitting_report: "Processing report...",
  msg_saved_offline: "Saved offline — will sync when connection returns.",
  msg_report_submitted: "Report submitted successfully to central command.",
  
  // Statuses
  status_DRAFT: "Draft",
  status_QUEUED: "Queued Offline",
  status_SYNCING: "Syncing...",
  status_SUBMITTED: "Report Received",
  status_VERIFIED: "Report Verified",
  status_REJECTED: "Requires Correction",
  status_RESOLVED: "Issue Resolved",

  // Sync Queue
  sync_title: "Offline Synchronization Queue",
  sync_btn_now: "Sync Now",
  sync_auto_note: "Reports synchronize automatically whenever internet connectivity returns.",
  sync_empty: "No reports pending sync. Local cache is synchronized.",
  sync_pending_count: "reports waiting to sync",

  // Alerts
  alerts_title: "Active Operational Alerts",
  alert_ack_btn: "Acknowledge Alert",
  alert_ack_done: "Acknowledged",
  alert_realtime_badge: "Live Alert Feed",
  alert_no_active: "No active alerts in your jurisdiction.",

  // Common Buttons & Messages
  btn_back: "Back",
  btn_cancel: "Cancel",
  btn_save: "Save",
  btn_filter: "Filter",
  btn_details: "View Details",
  err_network: "Network unavailable. Report stored in local device queue.",
  err_unknown: "An unexpected error occurred. Please try again."
};
