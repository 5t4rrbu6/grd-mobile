export interface User {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  mobile: string;
  guardId: string;
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  identification?: {
    nationalId?: string;
    issuingAuthority?: string;
    passportNo?: string;
    passportIssueDate?: string;
    passportExpiryDate?: string;
    passportIssuingAuthority?: string;
  };
  physical?: {
    height?: string;
    weight?: string;
    shoeSize?: string;
    shirtSize?: string;
    gender?: string;
  };
}

export interface UsageStats {
  checkIns: number;
  patrolsCompleted: number;
  reportsSent: number;
  checkpointsScanned: number;
  messagesSent: number;
  hoursWorked: number;
  otalkUsageLastMonth: number;
  otalkUsageThisMonth: number;
}

export interface ShiftStatus {
  status: 'checked_in' | 'checked_out' | 'not_checked_in';
  site?: string;
  checkInTime?: string;
  checkOutTime?: string;
  lastAction?: string;
  nextShiftSite?: string;
  nextShiftDateTime?: string;
}

export interface Schedule {
  id: string;
  customer: string;
  site: string;
  shiftType: 'Morning' | 'Afternoon' | 'Night' | '16hr test';
  date: string;
  startTime: string;
  duration: string;
  isAssigned: boolean;
  isActive: boolean;
}

export interface Patrol {
  id: string;
  name: string;
  checkpointCount: number;
  schedule: string;
  timeConstraint: string;
  isActive: boolean;
  isStarted: boolean;
}

export interface Checkpoint {
  id: string;
  name: string;
  location: string;
  order: number;
  isScanned: boolean;
  scannedAt?: string;
  actions?: CheckpointAction[];
}

export interface CheckpointAction {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface PatrolStatus {
  site: string;
  activePatrol?: string;
  activePatrolTime?: string;
  type: string;
  checkpointsScanned: number;
  remaining: number;
  nextCheckpoint?: string;
}

export interface Report {
  id: string;
  guardName: string;
  guardNickname: string;
  description: string;
  timestamp: string;
  severity: 'normal' | 'info' | 'warning' | 'critical';
  hasImage: boolean;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  site?: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export type Language = 'en' | 'id';

export interface Settings {
  reportsRefreshInterval: number;
  rosterRefreshInterval: number;
  messageRetention: number;
  messageNotifications: boolean;
  language: Language;
}

export type SeverityLevel = 'normal' | 'info' | 'warning' | 'critical';
