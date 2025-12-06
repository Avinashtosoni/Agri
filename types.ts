import React from 'react';

// ... (Existing interfaces: Project, Comment, Attachment, BlogPost, NewsEvent, Alumni, NavItem, StatMetric, UserProfile, UserRole)

export interface Project {
  id: string;
  title: string;
  category: 'Training' | 'Research' | 'Workshop' | 'Outreach';
  description: string;
  imageUrl: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  date: string;
  location?: string;
  author?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Attachment {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'image' | 'other';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  category: string;
  status: 'Draft' | 'Published';
  attachments?: Attachment[];
  comments?: Comment[];
  views?: number;
  tags?: string[];
  readTime?: string;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  status: 'Published' | 'Draft';
  category?: string;
  location?: string;
  isFeatured?: boolean;
}

export interface Alumni {
  id: string;
  name: string;
  batch: string;
  degree: string;
  currentPosition?: string;
  company?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  imageUrl: string;
  achievements?: string;
  status: 'Published' | 'Draft';
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface StatMetric {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  change?: string;
}

export type UserRole = 'Admin' | 'Editor' | 'Student' | 'Viewer';

export interface FeaturePermissions {
  [feature: string]: UserRole[];
}

export interface AccessControlConfig {
  permissions: FeaturePermissions;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// --- Navigation & Pages ---

export interface NavSubItemConfig {
  id: string;
  label: string;
  view: string;
  sectionId?: string;
  pageId?: string; // Link to a dynamic page
}

export interface NavItemConfig {
  id: string;
  label: string;
  view: string;
  isVisible: boolean;
  subItems?: NavSubItemConfig[];
  sectionId?: string;
  pageId?: string; // Link to a dynamic page
  backgroundColor?: string; // Custom background color
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML Content
  lastUpdated: string;
  status: 'Published' | 'Draft';
}

export interface HeaderConfig {
  title: string;
  subtitle: string;
  subtext: string;
  hindiName: string;
  location: string;
  logoText: string;
  showLogoImage?: boolean;
  logoUrl?: string;
  backgroundImageUrl?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  headerBackgroundColor: string;
}

export interface PresidentMessageConfig {
  title: string;
  text: string;
  imageUrl: string;
  buttonText: string;
  missionImageUrl?: string; // New field for customizing the mission diagram
}

export interface FooterConfig {
  aboutText: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  memberArea: {
    title: string;
    text: string;
  };
  matsyagram: {
    title: string;
    address: string;
    phone: string;
    mapImageUrl?: string;
  };
  copyrightText: string;
}

export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
}

export interface AnimationConfig {
  showFish: boolean;
  fishSpeed: 'slow' | 'normal' | 'fast';
  showBubbles: boolean;
}

export interface SiteContent {
  header: HeaderConfig;
  theme?: ThemeConfig;
  navItems: NavItemConfig[];
  tickerText: string;
  presidentMessage: PresidentMessageConfig;
  stats: StatMetric[];
  contactInfo: {
    phone1: string;
    phone2: string;
    email: string;
    address: string;
  };
  footer: FooterConfig;
  whatsappConfig: WhatsAppConfig;
  animationConfig?: AnimationConfig;
  accessControl?: AccessControlConfig;
}

// --- Form Interfaces ---
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
}

export interface RegistrationSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Student' | 'Staff' | 'Other';
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface TrainingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  programInterest: string;
  date: string;
  status: 'New' | 'Contacted' | 'Enrolled';
}

// --- Dynamic Form Interfaces ---
export type FormFieldType = 'text' | 'email' | 'textarea' | 'select' | 'number' | 'date' | 'tel';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  options?: string[]; // Comma separated for editing, array for usage
  width?: 'full' | 'half' | 'third'; // Layout control
}

export interface FormDefinition {
  id: string;
  name: string; // Unique key for internal use
  title: string; // Display title
  description?: string;
  fields: FormField[];
  submitButtonText?: string;
  isSystem?: boolean; // If true, cannot be deleted
}

export interface GenericSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  date: string;
  status: 'New' | 'Read' | 'Replied' | 'Pending' | 'Approved' | 'Rejected';
}

export enum ViewState {
  PUBLIC_HOME = 'PUBLIC_HOME',
  PUBLIC_PROJECTS = 'PUBLIC_PROJECTS',
  PUBLIC_BLOG_LIST = 'PUBLIC_BLOG_LIST',
  PUBLIC_BLOG_DETAIL = 'PUBLIC_BLOG_DETAIL',
  PUBLIC_NEWS_DETAIL = 'PUBLIC_NEWS_DETAIL',
  PUBLIC_CONTACT = 'PUBLIC_CONTACT',
  PUBLIC_FORM = 'PUBLIC_FORM',
  PUBLIC_DYNAMIC_PAGE = 'PUBLIC_DYNAMIC_PAGE', // New view for custom pages
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_PROJECTS = 'ADMIN_PROJECTS',
  ADMIN_BLOGS = 'ADMIN_BLOGS',
  ADMIN_NEWS = 'ADMIN_NEWS',
  ADMIN_CONTENT = 'ADMIN_CONTENT',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS',
  ADMIN_FORMS = 'ADMIN_FORMS',
  ADMIN_PAGES = 'ADMIN_PAGES', // New view for page management
  ADMIN_ALUMNI = 'ADMIN_ALUMNI',
  PUBLIC_ALUMNI = 'PUBLIC_ALUMNI',
}