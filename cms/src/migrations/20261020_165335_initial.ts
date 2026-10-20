import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pt', 'en', 'es');
  CREATE TABLE "units_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "units_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "units" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"coming_soon" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "units_locales" (
  	"name" varchar NOT NULL,
  	"card_label" varchar,
  	"summary" varchar,
  	"card_capacity" varchar,
  	"kicker" varchar,
  	"description" varchar,
  	"capacity" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "units_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xl_url" varchar,
  	"sizes_xl_width" numeric,
  	"sizes_xl_height" numeric,
  	"sizes_xl_mime_type" varchar,
  	"sizes_xl_filesize" numeric,
  	"sizes_xl_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"units_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_amenities_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"phone" varchar,
  	"email" varchar,
  	"whatsapp" varchar,
  	"instagram_url" varchar,
  	"instagram_handle" varchar,
  	"facebook_url" varchar,
  	"maps_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"brand_name" varchar,
  	"tagline" varchar,
  	"nav_home" varchar,
  	"nav_stay" varchar,
  	"nav_house" varchar,
  	"nav_geres" varchar,
  	"nav_gallery" varchar,
  	"nav_contact" varchar,
  	"book_label" varchar,
  	"address" varchar,
  	"whatsapp_message" varchar,
  	"footer_intro" varchar,
  	"footer_nav_title" varchar,
  	"footer_contact_title" varchar,
  	"footer_follow_title" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_news_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_news_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_geres_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_geres_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_reviews_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_reviews_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"where" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"geres_image1_id" integer,
  	"geres_image2_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"hero_arrival_label" varchar,
  	"hero_departure_label" varchar,
  	"hero_select_date_label" varchar,
  	"hero_availability_label" varchar,
  	"intro_eyebrow" varchar,
  	"intro_text" varchar,
  	"intro_signature" varchar,
  	"units_eyebrow" varchar,
  	"units_title" varchar,
  	"units_link_label" varchar,
  	"units_soon_badge" varchar,
  	"amenities_eyebrow" varchar,
  	"amenities_title" varchar,
  	"news_eyebrow" varchar,
  	"news_title" varchar,
  	"news_text" varchar,
  	"news_badge" varchar,
  	"geres_eyebrow" varchar,
  	"geres_title" varchar,
  	"geres_text" varchar,
  	"geres_link_label" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_title" varchar,
  	"gallery_link_label" varchar,
  	"reviews_eyebrow" varchar,
  	"reviews_title" varchar,
  	"cta_eyebrow" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "stay" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stay_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"intro" varchar,
  	"labels_soon_badge" varchar,
  	"labels_view_photos" varchar,
  	"labels_photos" varchar,
  	"labels_soon_note" varchar,
  	"labels_book" varchar,
  	"amenities_eyebrow" varchar,
  	"amenities_title" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "house_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "house_values_items_locales" (
  	"numeral" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "house" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"story_image1_id" integer,
  	"story_image2_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "house_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"story_eyebrow" varchar,
  	"story_title" varchar,
  	"story_text" varchar,
  	"values_eyebrow" varchar,
  	"values_title" varchar,
  	"quote_text" varchar,
  	"quote_author" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "geres_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "geres_activities_items_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "geres_distances_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "geres_distances_items_locales" (
  	"time" varchar,
  	"place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "geres" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "geres_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"activities_eyebrow" varchar,
  	"activities_title" varchar,
  	"distances_eyebrow" varchar,
  	"distances_title" varchar,
  	"cta_title" varchar,
  	"cta_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "gallery_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"cta_title" varchar,
  	"cta_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "contact_booking_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_booking_perks_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"booking_widget" varchar,
  	"map_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"booking_eyebrow" varchar,
  	"booking_title" varchar,
  	"booking_text" varchar,
  	"booking_whatsapp_label" varchar,
  	"booking_arrival_label" varchar,
  	"booking_departure_label" varchar,
  	"booking_availability_label" varchar,
  	"details_eyebrow" varchar,
  	"details_title" varchar,
  	"details_phone_label" varchar,
  	"details_email_label" varchar,
  	"details_address_label" varchar,
  	"map_label" varchar,
  	"map_link_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "units_tags" ADD CONSTRAINT "units_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_tags_locales" ADD CONSTRAINT "units_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units" ADD CONSTRAINT "units_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "units_locales" ADD CONSTRAINT "units_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_rels" ADD CONSTRAINT "units_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_rels" ADD CONSTRAINT "units_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_units_fk" FOREIGN KEY ("units_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_amenities" ADD CONSTRAINT "site_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_amenities_locales" ADD CONSTRAINT "site_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_news_items" ADD CONSTRAINT "home_news_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_news_items_locales" ADD CONSTRAINT "home_news_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_geres_stats" ADD CONSTRAINT "home_geres_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_geres_stats_locales" ADD CONSTRAINT "home_geres_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_geres_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_reviews_items" ADD CONSTRAINT "home_reviews_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_reviews_items_locales" ADD CONSTRAINT "home_reviews_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_reviews_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_geres_image1_id_media_id_fk" FOREIGN KEY ("geres_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_geres_image2_id_media_id_fk" FOREIGN KEY ("geres_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stay" ADD CONSTRAINT "stay_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stay_locales" ADD CONSTRAINT "stay_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stay"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_values_items" ADD CONSTRAINT "house_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_values_items_locales" ADD CONSTRAINT "house_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_story_image1_id_media_id_fk" FOREIGN KEY ("story_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_story_image2_id_media_id_fk" FOREIGN KEY ("story_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house_locales" ADD CONSTRAINT "house_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_activities_items" ADD CONSTRAINT "geres_activities_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geres_activities_items" ADD CONSTRAINT "geres_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_activities_items_locales" ADD CONSTRAINT "geres_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_distances_items" ADD CONSTRAINT "geres_distances_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_distances_items_locales" ADD CONSTRAINT "geres_distances_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres_distances_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres" ADD CONSTRAINT "geres_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geres_locales" ADD CONSTRAINT "geres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sections" ADD CONSTRAINT "gallery_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sections_locales" ADD CONSTRAINT "gallery_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_booking_perks" ADD CONSTRAINT "contact_booking_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_booking_perks_locales" ADD CONSTRAINT "contact_booking_perks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_booking_perks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "units_tags_order_idx" ON "units_tags" USING btree ("_order");
  CREATE INDEX "units_tags_parent_id_idx" ON "units_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "units_tags_locales_locale_parent_id_unique" ON "units_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "units_tags_locales_parent_id_idx" ON "units_tags_locales" USING btree ("_parent_id");
  CREATE INDEX "units_image_idx" ON "units" USING btree ("image_id");
  CREATE INDEX "units_updated_at_idx" ON "units" USING btree ("updated_at");
  CREATE INDEX "units_created_at_idx" ON "units" USING btree ("created_at");
  CREATE UNIQUE INDEX "units_locales_locale_parent_id_unique" ON "units_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "units_locales_parent_id_idx" ON "units_locales" USING btree ("_parent_id");
  CREATE INDEX "units_rels_order_idx" ON "units_rels" USING btree ("order");
  CREATE INDEX "units_rels_parent_idx" ON "units_rels" USING btree ("parent_id");
  CREATE INDEX "units_rels_path_idx" ON "units_rels" USING btree ("path");
  CREATE INDEX "units_rels_media_id_idx" ON "units_rels" USING btree ("media_id");
  CREATE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xl_sizes_xl_filename_idx" ON "media" USING btree ("sizes_xl_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_units_id_idx" ON "payload_locked_documents_rels" USING btree ("units_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_amenities_order_idx" ON "site_amenities" USING btree ("_order");
  CREATE INDEX "site_amenities_parent_id_idx" ON "site_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_amenities_locales_locale_parent_id_unique" ON "site_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_amenities_locales_parent_id_idx" ON "site_amenities_locales" USING btree ("_parent_id");
  CREATE INDEX "site_logo_light_idx" ON "site" USING btree ("logo_light_id");
  CREATE INDEX "site_logo_dark_idx" ON "site" USING btree ("logo_dark_id");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_locales_parent_id_idx" ON "site_locales" USING btree ("_parent_id");
  CREATE INDEX "home_news_items_order_idx" ON "home_news_items" USING btree ("_order");
  CREATE INDEX "home_news_items_parent_id_idx" ON "home_news_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_news_items_locales_locale_parent_id_unique" ON "home_news_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_news_items_locales_parent_id_idx" ON "home_news_items_locales" USING btree ("_parent_id");
  CREATE INDEX "home_geres_stats_order_idx" ON "home_geres_stats" USING btree ("_order");
  CREATE INDEX "home_geres_stats_parent_id_idx" ON "home_geres_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_geres_stats_locales_locale_parent_id_unique" ON "home_geres_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_geres_stats_locales_parent_id_idx" ON "home_geres_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "home_reviews_items_order_idx" ON "home_reviews_items" USING btree ("_order");
  CREATE INDEX "home_reviews_items_parent_id_idx" ON "home_reviews_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_reviews_items_locales_locale_parent_id_unique" ON "home_reviews_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_reviews_items_locales_parent_id_idx" ON "home_reviews_items_locales" USING btree ("_parent_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_geres_geres_image1_idx" ON "home" USING btree ("geres_image1_id");
  CREATE INDEX "home_geres_geres_image2_idx" ON "home" USING btree ("geres_image2_id");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_locales_parent_id_idx" ON "home_locales" USING btree ("_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "stay_hero_hero_image_idx" ON "stay" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "stay_locales_locale_parent_id_unique" ON "stay_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stay_locales_parent_id_idx" ON "stay_locales" USING btree ("_parent_id");
  CREATE INDEX "house_values_items_order_idx" ON "house_values_items" USING btree ("_order");
  CREATE INDEX "house_values_items_parent_id_idx" ON "house_values_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "house_values_items_locales_locale_parent_id_unique" ON "house_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "house_values_items_locales_parent_id_idx" ON "house_values_items_locales" USING btree ("_parent_id");
  CREATE INDEX "house_hero_hero_image_idx" ON "house" USING btree ("hero_image_id");
  CREATE INDEX "house_story_story_image1_idx" ON "house" USING btree ("story_image1_id");
  CREATE INDEX "house_story_story_image2_idx" ON "house" USING btree ("story_image2_id");
  CREATE UNIQUE INDEX "house_locales_locale_parent_id_unique" ON "house_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "house_locales_parent_id_idx" ON "house_locales" USING btree ("_parent_id");
  CREATE INDEX "geres_activities_items_order_idx" ON "geres_activities_items" USING btree ("_order");
  CREATE INDEX "geres_activities_items_parent_id_idx" ON "geres_activities_items" USING btree ("_parent_id");
  CREATE INDEX "geres_activities_items_image_idx" ON "geres_activities_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "geres_activities_items_locales_locale_parent_id_unique" ON "geres_activities_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "geres_activities_items_locales_parent_id_idx" ON "geres_activities_items_locales" USING btree ("_parent_id");
  CREATE INDEX "geres_distances_items_order_idx" ON "geres_distances_items" USING btree ("_order");
  CREATE INDEX "geres_distances_items_parent_id_idx" ON "geres_distances_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "geres_distances_items_locales_locale_parent_id_unique" ON "geres_distances_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "geres_distances_items_locales_parent_id_idx" ON "geres_distances_items_locales" USING btree ("_parent_id");
  CREATE INDEX "geres_hero_hero_image_idx" ON "geres" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "geres_locales_locale_parent_id_unique" ON "geres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "geres_locales_parent_id_idx" ON "geres_locales" USING btree ("_parent_id");
  CREATE INDEX "gallery_sections_order_idx" ON "gallery_sections" USING btree ("_order");
  CREATE INDEX "gallery_sections_parent_id_idx" ON "gallery_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "gallery_sections_locales_locale_parent_id_unique" ON "gallery_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_sections_locales_parent_id_idx" ON "gallery_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "gallery_hero_hero_image_idx" ON "gallery" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "gallery_locales_locale_parent_id_unique" ON "gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_locales_parent_id_idx" ON "gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "gallery_rels_order_idx" ON "gallery_rels" USING btree ("order");
  CREATE INDEX "gallery_rels_parent_idx" ON "gallery_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_rels_path_idx" ON "gallery_rels" USING btree ("path");
  CREATE INDEX "gallery_rels_media_id_idx" ON "gallery_rels" USING btree ("media_id");
  CREATE INDEX "contact_booking_perks_order_idx" ON "contact_booking_perks" USING btree ("_order");
  CREATE INDEX "contact_booking_perks_parent_id_idx" ON "contact_booking_perks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_booking_perks_locales_locale_parent_id_unique" ON "contact_booking_perks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_booking_perks_locales_parent_id_idx" ON "contact_booking_perks_locales" USING btree ("_parent_id");
  CREATE INDEX "contact_hero_hero_image_idx" ON "contact" USING btree ("hero_image_id");
  CREATE INDEX "contact_map_map_image_idx" ON "contact" USING btree ("map_image_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_locales_parent_id_idx" ON "contact_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "units_tags" CASCADE;
  DROP TABLE "units_tags_locales" CASCADE;
  DROP TABLE "units" CASCADE;
  DROP TABLE "units_locales" CASCADE;
  DROP TABLE "units_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_amenities" CASCADE;
  DROP TABLE "site_amenities_locales" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "home_news_items" CASCADE;
  DROP TABLE "home_news_items_locales" CASCADE;
  DROP TABLE "home_geres_stats" CASCADE;
  DROP TABLE "home_geres_stats_locales" CASCADE;
  DROP TABLE "home_reviews_items" CASCADE;
  DROP TABLE "home_reviews_items_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "stay" CASCADE;
  DROP TABLE "stay_locales" CASCADE;
  DROP TABLE "house_values_items" CASCADE;
  DROP TABLE "house_values_items_locales" CASCADE;
  DROP TABLE "house" CASCADE;
  DROP TABLE "house_locales" CASCADE;
  DROP TABLE "geres_activities_items" CASCADE;
  DROP TABLE "geres_activities_items_locales" CASCADE;
  DROP TABLE "geres_distances_items" CASCADE;
  DROP TABLE "geres_distances_items_locales" CASCADE;
  DROP TABLE "geres" CASCADE;
  DROP TABLE "geres_locales" CASCADE;
  DROP TABLE "gallery_sections" CASCADE;
  DROP TABLE "gallery_sections_locales" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "gallery_rels" CASCADE;
  DROP TABLE "contact_booking_perks" CASCADE;
  DROP TABLE "contact_booking_perks_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TYPE "public"."_locales";`)
}
