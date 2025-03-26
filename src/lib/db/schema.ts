import { pgTable, text, timestamp, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Enums
export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'CUSTOMER', 'B2B_FOUNDER', 'B2B_SALESPERSON', 'B2B_CREATOR', 'B2B_MARKETER', 'ENTREPRENEUR', 'PROFESSIONAL', 'JOB_SEEKER', 'STUDENT', 'OTHER']);
export const referralSourceEnum = pgEnum('referral_source', ['FRIEND_COWORKER', 'WEB_SEARCH', 'LINKEDIN', 'TWITTER_X', 'INSTAGRAM', 'YOUTUBE', 'OTHER']);
export const conversationStatusEnum = pgEnum('conversation_status', ['UNREAD', 'TO_NURTURE', 'WARM', 'CLOSED', 'IGNORED']);

// Users
export const users = pgTable('users', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('CUSTOMER').notNull(),
  company: text('company'),
  sellingProducts: text('selling_products'),
  avgDealSize: text('avg_deal_size'),
  referralSource: referralSourceEnum('referral_source'),
  linkedinAccessToken: text('linkedin_access_token'),
  linkedinRefreshToken: text('linkedin_refresh_token'),
  linkedinTokenExpiry: timestamp('linkedin_token_expiry'),
  apiTokens: integer('api_tokens').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// team invites
export const teamInvites = pgTable('team_invites', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  email: text('email').notNull(),
  status: text('status').default('PENDING').notNull(), // PENDING, ACCEPTED, DECLINED
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Admins
export const admins = pgTable('admins', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ICP - Ideal Customer Profile
export const idealCustomerProfiles = pgTable('ideal_customer_profiles', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  targetCompanies: text('target_companies').array(),
  targetRoles: text('target_roles').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// LinkedIn Connections
export const linkedinConnections = pgTable('linkedin_connections', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  linkedinId: text('linkedin_id').notNull(),
  fullName: text('full_name').notNull(),
  profileUrl: text('profile_url'),
  title: text('title'),
  company: text('company'),
  isCustomer: boolean('is_customer').default(false),
  ignore: boolean('ignore').default(false),
  matchesIcp: boolean('matches_icp').default(false),
  connectDate: timestamp('connect_date'),
  lastInteraction: timestamp('last_interaction'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// LinkedIn Messages / Conversations
export const linkedinConversations = pgTable('linkedin_conversations', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  connectionId: text('connection_id').references(() => linkedinConnections.id),
  linkedinConversationId: text('linkedin_conversation_id').notNull(),
  status: conversationStatusEnum('status').default('UNREAD'),
  lastMessageAt: timestamp('last_message_at'),
  sentimentAnalysis: jsonb('sentiment_analysis'),
  recommendedNextStep: text('recommended_next_step'),
  recommendedNextStepDate: timestamp('recommended_next_step_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// LinkedIn Profile Views
export const profileViews = pgTable('profile_views', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  viewerId: text('viewer_id').references(() => linkedinConnections.id),
  viewerLinkedinId: text('viewer_linkedin_id'),
  viewerName: text('viewer_name'),
  viewerTitle: text('viewer_title'),
  viewerCompany: text('viewer_company'),
  viewerProfileUrl: text('viewer_profile_url'),
  isConnection: boolean('is_connection').default(false),
  matchesIcp: boolean('matches_icp').default(false),
  recommendAction: text('recommend_action'),
  actionTaken: boolean('action_taken').default(false),
  viewDate: timestamp('view_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// LinkedIn Post Engagements
export const postEngagements = pgTable('post_engagements', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  postId: text('post_id').notNull(),
  engagerId: text('engager_id').references(() => linkedinConnections.id),
  engagerLinkedinId: text('engager_linkedin_id'),
  engagerName: text('engager_name'),
  engagerTitle: text('engager_title'),
  engagerCompany: text('engager_company'),
  engagerProfileUrl: text('engager_profile_url'),
  engagementType: text('engagement_type').notNull(), // like, comment, share
  isConnection: boolean('is_connection').default(false),
  matchesIcp: boolean('matches_icp').default(false),
  recommendAction: text('recommend_action'),
  actionTaken: boolean('action_taken').default(false),
  engagementDate: timestamp('engagement_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Action Reminders
export const actionReminders = pgTable('action_reminders', {
  id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  connectionId: text('connection_id').references(() => linkedinConnections.id),
  actionType: text('action_type').notNull(), // message, connect, follow-up
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});