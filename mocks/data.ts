import { User, UsageStats, Schedule, Patrol, Checkpoint, Report, Alert, Message, Settings } from '@/types';

export const mockUser: User = {
  id: '1',
  firstName: 'Tunas Artha',
  lastName: 'Gardatama',
  displayName: 'Tunas Artha Gardatama',
  email: 'puskodal.cc@tag.co.id',
  mobile: '085133914175',
  guardId: '5880',
  address: {
    street: '',
    city: '',
    state: '',
    region: '',
    postalCode: '',
    country: 'Indonesia',
  },
  identification: {
    nationalId: '',
    issuingAuthority: '',
    passportNo: '',
    passportIssueDate: '2026-02-13',
    passportExpiryDate: '2026-02-13',
    passportIssuingAuthority: '',
  },
  physical: {
    height: '',
    weight: '',
    shoeSize: '',
    shirtSize: '',
    gender: 'Male',
  },
};

export const mockUsageStats: UsageStats = {
  checkIns: 0,
  patrolsCompleted: 0,
  reportsSent: 0,
  checkpointsScanned: 0,
  messagesSent: 3,
  hoursWorked: 0,
  otalkUsageLastMonth: 0,
  otalkUsageThisMonth: 0,
};

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: '16hr test',
    date: 'Mon, 14 Nov, 22',
    startTime: '06:00',
    duration: '16h 00m',
    isAssigned: true,
    isActive: false,
  },
  {
    id: '2',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Morning',
    date: 'Tue, 15 Nov, 22',
    startTime: '06:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: true,
  },
  {
    id: '3',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Morning',
    date: 'Wed, 16 Nov, 22',
    startTime: '06:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: false,
  },
  {
    id: '4',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Night',
    date: 'Thu, 17 Nov, 22',
    startTime: '22:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: false,
  },
  {
    id: '5',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Night',
    date: 'Fri, 18 Nov, 22',
    startTime: '22:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: false,
  },
  {
    id: '6',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Afternoon',
    date: 'Sat, 19 Nov, 22',
    startTime: '14:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: false,
  },
  {
    id: '7',
    customer: 'My Customer',
    site: 'Factory',
    shiftType: 'Afternoon',
    date: 'Sun, 20 Nov, 22',
    startTime: '14:00',
    duration: '08h 00m',
    isAssigned: false,
    isActive: false,
  },
];

export const mockPatrols: Patrol[] = [
  {
    id: '1',
    name: 'Patrol 1',
    checkpointCount: 3,
    schedule: 'Sel...',
    timeConstraint: 'Apa Saja',
    isActive: true,
    isStarted: true,
  },
  {
    id: '2',
    name: 'Patrol 2',
    checkpointCount: 3,
    schedule: 'Sel...',
    timeConstraint: 'Apa Saja',
    isActive: false,
    isStarted: false,
  },
];

export const mockCheckpoints: Checkpoint[] = [
  {
    id: '1',
    name: 'Checkpoint 2: Entrance',
    location: 'Main Gate',
    order: 1,
    isScanned: false,
    actions: [
      { id: '1', name: 'Action 1', isCompleted: false },
      { id: '2', name: 'Action 2', isCompleted: false },
    ],
  },
  {
    id: '2',
    name: 'Checkpoint 3: Lobby',
    location: 'Building A',
    order: 2,
    isScanned: false,
    actions: [
      { id: '3', name: 'Check doors', isCompleted: false },
      { id: '4', name: 'Check lights', isCompleted: false },
    ],
  },
  {
    id: '3',
    name: 'Checkpoint 5: Loading Area',
    location: 'Warehouse',
    order: 3,
    isScanned: false,
    actions: [
      { id: '5', name: 'Check cargo', isCompleted: false },
    ],
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    guardName: 'Iwan Warsito',
    guardNickname: 'Iwan',
    description: 'Nothing to report',
    timestamp: '15 Nov 09:27',
    severity: 'normal',
    hasImage: false,
  },
  {
    id: '2',
    guardName: 'Iwan Warsito',
    guardNickname: 'Iwan',
    description: 'Window open',
    timestamp: '15 Nov 09:26',
    severity: 'info',
    hasImage: true,
  },
  {
    id: '3',
    guardName: 'Iwan Warsito',
    guardNickname: 'Iwan',
    description: 'Nothing to report',
    timestamp: '15 Nov 09:26',
    severity: 'normal',
    hasImage: false,
  },
  {
    id: '4',
    guardName: 'Edi Idris',
    guardNickname: 'Edi',
    description: 'Door unlocked',
    timestamp: '15 Nov 09:24',
    severity: 'warning',
    hasImage: true,
  },
  {
    id: '5',
    guardName: 'Edi Idris',
    guardNickname: 'Edi',
    description: 'Window open',
    timestamp: '15 Nov 09:23',
    severity: 'info',
    hasImage: true,
  },
  {
    id: '6',
    guardName: 'Edi Idris',
    guardNickname: 'Edi',
    description: 'Nothing to report',
    timestamp: '15 Nov 09:22',
    severity: 'normal',
    hasImage: false,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Security Breach',
    description: 'Unauthorized access detected at Gate B',
    timestamp: '15 Nov 10:30',
    severity: 'critical',
    isRead: false,
    site: 'Factory',
  },
  {
    id: '2',
    title: 'Patrol Missed',
    description: 'Checkpoint 3 was not scanned during last patrol',
    timestamp: '15 Nov 09:45',
    severity: 'high',
    isRead: false,
    site: 'Factory',
  },
  {
    id: '3',
    title: 'System Update',
    description: 'New patrol route has been assigned',
    timestamp: '15 Nov 08:00',
    severity: 'low',
    isRead: true,
    site: 'Factory',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Control Center',
    content: 'Please report to Gate A for inspection',
    timestamp: '15 Nov 10:00',
    isRead: false,
  },
  {
    id: '2',
    sender: 'Supervisor',
    content: 'Good work on the morning patrol',
    timestamp: '15 Nov 08:30',
    isRead: true,
  },
];

export const defaultSettings: Settings = {
  reportsRefreshInterval: 5,
  rosterRefreshInterval: 60,
  messageRetention: 7,
  messageNotifications: true,
  language: 'en',
};

export const languageOptions = [
  { code: 'en' as const, label: 'English' },
  { code: 'id' as const, label: 'Indonesia' },
];

export const refreshIntervalOptions = {
  reports: [1, 5, 15, 30, 60, 120],
  roster: [15, 30, 60, 120, 240, 480],
};

export const messageRetentionOptions = [1, 3, 7, 14, 30];
