CREATE TYPE "public"."conversation_status" AS ENUM('UNREAD', 'TO_NURTURE', 'WARM', 'CLOSED', 'IGNORED');--> statement-breakpoint
CREATE TYPE "public"."referral_source" AS ENUM('FRIEND_COWORKER', 'WEB_SEARCH', 'LINKEDIN', 'TWITTER_X', 'INSTAGRAM', 'YOUTUBE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('B2B_FOUNDER', 'B2B_SALESPERSON', 'B2B_CREATOR', 'B2B_MARKETER', 'ENTREPRENEUR', 'PROFESSIONAL', 'JOB_SEEKER', 'STUDENT', 'OTHER');--> statement-breakpoint
CREATE TABLE "action_reminders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"connection_id" text,
	"action_type" text NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ideal_customer_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"target_companies" text[],
	"target_roles" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linkedin_connections" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"linkedin_id" text NOT NULL,
	"full_name" text NOT NULL,
	"profile_url" text,
	"title" text,
	"company" text,
	"is_customer" boolean DEFAULT false,
	"ignore" boolean DEFAULT false,
	"matches_icp" boolean DEFAULT false,
	"connect_date" timestamp,
	"last_interaction" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linkedin_conversations" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"connection_id" text,
	"linkedin_conversation_id" text NOT NULL,
	"status" "conversation_status" DEFAULT 'UNREAD',
	"last_message_at" timestamp,
	"sentiment_analysis" jsonb,
	"recommended_next_step" text,
	"recommended_next_step_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_engagements" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"post_id" text NOT NULL,
	"engager_id" text,
	"engager_linkedin_id" text,
	"engager_name" text,
	"engager_title" text,
	"engager_company" text,
	"engager_profile_url" text,
	"engagement_type" text NOT NULL,
	"is_connection" boolean DEFAULT false,
	"matches_icp" boolean DEFAULT false,
	"recommend_action" text,
	"action_taken" boolean DEFAULT false,
	"engagement_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_views" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"viewer_id" text,
	"viewer_linkedin_id" text,
	"viewer_name" text,
	"viewer_title" text,
	"viewer_company" text,
	"viewer_profile_url" text,
	"is_connection" boolean DEFAULT false,
	"matches_icp" boolean DEFAULT false,
	"recommend_action" text,
	"action_taken" boolean DEFAULT false,
	"view_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_invites" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"company" text,
	"selling_products" text,
	"avg_deal_size" text,
	"role" "user_role",
	"referral_source" "referral_source",
	"linkedin_access_token" text,
	"linkedin_refresh_token" text,
	"linkedin_token_expiry" timestamp,
	"api_tokens" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "action_reminders" ADD CONSTRAINT "action_reminders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_reminders" ADD CONSTRAINT "action_reminders_connection_id_linkedin_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."linkedin_connections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ideal_customer_profiles" ADD CONSTRAINT "ideal_customer_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkedin_connections" ADD CONSTRAINT "linkedin_connections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkedin_conversations" ADD CONSTRAINT "linkedin_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkedin_conversations" ADD CONSTRAINT "linkedin_conversations_connection_id_linkedin_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."linkedin_connections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_engagements" ADD CONSTRAINT "post_engagements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_engagements" ADD CONSTRAINT "post_engagements_engager_id_linkedin_connections_id_fk" FOREIGN KEY ("engager_id") REFERENCES "public"."linkedin_connections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_views" ADD CONSTRAINT "profile_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_views" ADD CONSTRAINT "profile_views_viewer_id_linkedin_connections_id_fk" FOREIGN KEY ("viewer_id") REFERENCES "public"."linkedin_connections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;