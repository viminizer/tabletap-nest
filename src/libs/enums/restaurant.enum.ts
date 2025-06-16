export enum ERestaurantStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
}
/*
Pending: New restaurant requests need admin approval.
Active: Normal operating restaurants.
Closed: Temporarily closed (e.g., off-hours or holidays).
Suspended: Restaurant banned or suspended.
Archived: Removed from active listings but kept for records.
Draft: Being created or edited, not live yet.
*/
