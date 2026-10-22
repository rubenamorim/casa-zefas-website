import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_payload_llm_instructions_entity_type" AS ENUM('collection', 'global');
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
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_units_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_units_v_version_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_units_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_coming_soon" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_units_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_card_label" varchar,
  	"version_summary" varchar,
  	"version_card_capacity" varchar,
  	"version_kicker" varchar,
  	"version_description" varchar,
  	"version_capacity" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_units_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_key" varchar,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"original_filename" varchar,
  	"original_url" varchar,
  	"original_mime_type" varchar,
  	"original_filesize" numeric,
  	"original_width" numeric,
  	"original_height" numeric,
  	"original_prefix" varchar,
  	"original__objectkey" varchar,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"variants_thumb_url" varchar,
  	"variants_thumb_width" numeric,
  	"variants_thumb_height" numeric,
  	"variants_thumb_mime_type" varchar,
  	"variants_thumb_filesize" numeric,
  	"variants_thumb_filename" varchar,
  	"variants_thumb_prefix" varchar,
  	"variants_thumb__objectkey" varchar,
  	"variants_large_url" varchar,
  	"variants_large_width" numeric,
  	"variants_large_height" numeric,
  	"variants_large_mime_type" varchar,
  	"variants_large_filesize" numeric,
  	"variants_large_filename" varchar,
  	"variants_large_prefix" varchar,
  	"variants_large__objectkey" varchar,
  	"variants_xl_url" varchar,
  	"variants_xl_width" numeric,
  	"variants_xl_height" numeric,
  	"variants_xl_mime_type" varchar,
  	"variants_xl_filesize" numeric,
  	"variants_xl_filename" varchar,
  	"variants_xl_prefix" varchar,
  	"variants_xl__objectkey" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_seed_key" varchar,
  	"version_prefix" varchar DEFAULT '',
  	"version__objectkey" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_original_filename" varchar,
  	"version_original_url" varchar,
  	"version_original_mime_type" varchar,
  	"version_original_filesize" numeric,
  	"version_original_width" numeric,
  	"version_original_height" numeric,
  	"version_original_prefix" varchar,
  	"version_original__objectkey" varchar,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"version_variants_thumb_url" varchar,
  	"version_variants_thumb_width" numeric,
  	"version_variants_thumb_height" numeric,
  	"version_variants_thumb_mime_type" varchar,
  	"version_variants_thumb_filesize" numeric,
  	"version_variants_thumb_filename" varchar,
  	"version_variants_thumb_prefix" varchar,
  	"version_variants_thumb__objectkey" varchar,
  	"version_variants_large_url" varchar,
  	"version_variants_large_width" numeric,
  	"version_variants_large_height" numeric,
  	"version_variants_large_mime_type" varchar,
  	"version_variants_large_filesize" numeric,
  	"version_variants_large_filename" varchar,
  	"version_variants_large_prefix" varchar,
  	"version_variants_large__objectkey" varchar,
  	"version_variants_xl_url" varchar,
  	"version_variants_xl_width" numeric,
  	"version_variants_xl_height" numeric,
  	"version_variants_xl_mime_type" varchar,
  	"version_variants_xl_filesize" numeric,
  	"version_variants_xl_filename" varchar,
  	"version_variants_xl_prefix" varchar,
  	"version_variants_xl__objectkey" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_media_v_locales" (
  	"version_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_media_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_users_v_version_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "_users_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_email" varchar NOT NULL,
  	"version_reset_password_token" varchar,
  	"version_reset_password_expiration" timestamp(3) with time zone,
  	"version_salt" varchar,
  	"version_hash" varchar,
  	"version_reset_password_requested_at" timestamp(3) with time zone,
  	"version_login_attempts" numeric DEFAULT 0,
  	"version_lock_until" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_users_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  
  CREATE TABLE "payload_llm_instructions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_slug" varchar NOT NULL,
  	"entity_type" "enum_payload_llm_instructions_entity_type" NOT NULL,
  	"additional_instructions" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  
  CREATE TABLE "site_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_site_v_version_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_amenities_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_light_id" integer,
  	"version_logo_dark_id" integer,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_whatsapp" varchar,
  	"version_instagram_url" varchar,
  	"version_instagram_handle" varchar,
  	"version_facebook_url" varchar,
  	"version_maps_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_v_locales" (
  	"version_brand_name" varchar,
  	"version_tagline" varchar,
  	"version_nav_home" varchar,
  	"version_nav_stay" varchar,
  	"version_nav_house" varchar,
  	"version_nav_geres" varchar,
  	"version_nav_gallery" varchar,
  	"version_nav_contact" varchar,
  	"version_book_label" varchar,
  	"version_address" varchar,
  	"version_whatsapp_message" varchar,
  	"version_footer_intro" varchar,
  	"version_footer_nav_title" varchar,
  	"version_footer_contact_title" varchar,
  	"version_footer_follow_title" varchar,
  	"version_copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_home_v_version_news_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_news_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_geres_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_geres_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_reviews_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_reviews_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"where" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_geres_image1_id" integer,
  	"version_geres_image2_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_hero_primary_cta" varchar,
  	"version_hero_secondary_cta" varchar,
  	"version_hero_arrival_label" varchar,
  	"version_hero_departure_label" varchar,
  	"version_hero_select_date_label" varchar,
  	"version_hero_availability_label" varchar,
  	"version_intro_eyebrow" varchar,
  	"version_intro_text" varchar,
  	"version_intro_signature" varchar,
  	"version_units_eyebrow" varchar,
  	"version_units_title" varchar,
  	"version_units_link_label" varchar,
  	"version_units_soon_badge" varchar,
  	"version_amenities_eyebrow" varchar,
  	"version_amenities_title" varchar,
  	"version_news_eyebrow" varchar,
  	"version_news_title" varchar,
  	"version_news_text" varchar,
  	"version_news_badge" varchar,
  	"version_geres_eyebrow" varchar,
  	"version_geres_title" varchar,
  	"version_geres_text" varchar,
  	"version_geres_link_label" varchar,
  	"version_gallery_eyebrow" varchar,
  	"version_gallery_title" varchar,
  	"version_gallery_link_label" varchar,
  	"version_reviews_eyebrow" varchar,
  	"version_reviews_title" varchar,
  	"version_cta_eyebrow" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "stay_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_stay_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_stay_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_intro" varchar,
  	"version_labels_soon_badge" varchar,
  	"version_labels_view_photos" varchar,
  	"version_labels_photos" varchar,
  	"version_labels_soon_note" varchar,
  	"version_labels_book" varchar,
  	"version_amenities_eyebrow" varchar,
  	"version_amenities_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stay_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  
  CREATE TABLE "house_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_house_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_house_v_version_values_items_locales" (
  	"numeral" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_house_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_story_image1_id" integer,
  	"version_story_image2_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_house_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_story_eyebrow" varchar,
  	"version_story_title" varchar,
  	"version_story_text" varchar,
  	"version_values_eyebrow" varchar,
  	"version_values_title" varchar,
  	"version_quote_text" varchar,
  	"version_quote_author" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_house_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  
  CREATE TABLE "geres_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_geres_v_version_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_geres_v_version_activities_items_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_geres_v_version_distances_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_geres_v_version_distances_items_locales" (
  	"time" varchar,
  	"place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_geres_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_geres_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_activities_eyebrow" varchar,
  	"version_activities_title" varchar,
  	"version_distances_eyebrow" varchar,
  	"version_distances_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_geres_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
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
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_gallery_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_gallery_v_version_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_gallery_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_gallery_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_gallery_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "contact_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_contact_v_version_booking_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_v_version_booking_perks_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_booking_widget" varchar,
  	"version_map_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_contact_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_booking_eyebrow" varchar,
  	"version_booking_title" varchar,
  	"version_booking_text" varchar,
  	"version_booking_whatsapp_label" varchar,
  	"version_booking_arrival_label" varchar,
  	"version_booking_departure_label" varchar,
  	"version_booking_availability_label" varchar,
  	"version_details_eyebrow" varchar,
  	"version_details_title" varchar,
  	"version_details_phone_label" varchar,
  	"version_details_email_label" varchar,
  	"version_details_address_label" varchar,
  	"version_map_label" varchar,
  	"version_map_link_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "units_tags" ADD CONSTRAINT "units_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_tags_locales" ADD CONSTRAINT "units_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units" ADD CONSTRAINT "units_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "units_locales" ADD CONSTRAINT "units_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_rels" ADD CONSTRAINT "units_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_rels" ADD CONSTRAINT "units_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "units_rels" ADD CONSTRAINT "units_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v_version_tags" ADD CONSTRAINT "_units_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_units_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v_version_tags_locales" ADD CONSTRAINT "_units_v_version_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_units_v_version_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v" ADD CONSTRAINT "_units_v_parent_id_units_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."units"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_units_v" ADD CONSTRAINT "_units_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_units_v_locales" ADD CONSTRAINT "_units_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_units_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v_rels" ADD CONSTRAINT "_units_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_units_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v_rels" ADD CONSTRAINT "_units_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_units_v_rels" ADD CONSTRAINT "_units_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v_locales" ADD CONSTRAINT "_media_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v_version_sessions" ADD CONSTRAINT "_users_v_version_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_users_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v" ADD CONSTRAINT "_users_v_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_users_v_rels" ADD CONSTRAINT "_users_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_users_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v_rels" ADD CONSTRAINT "_users_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_units_fk" FOREIGN KEY ("units_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_llm_instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_amenities" ADD CONSTRAINT "site_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_amenities_locales" ADD CONSTRAINT "site_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_amenities" ADD CONSTRAINT "_site_v_version_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_amenities_locales" ADD CONSTRAINT "_site_v_version_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v_version_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_light_id_media_id_fk" FOREIGN KEY ("version_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_locales" ADD CONSTRAINT "_site_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_rels" ADD CONSTRAINT "_site_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_rels" ADD CONSTRAINT "_site_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_news_items" ADD CONSTRAINT "_home_v_version_news_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_news_items_locales" ADD CONSTRAINT "_home_v_version_news_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_geres_stats" ADD CONSTRAINT "_home_v_version_geres_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_geres_stats_locales" ADD CONSTRAINT "_home_v_version_geres_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_geres_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_reviews_items" ADD CONSTRAINT "_home_v_version_reviews_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_reviews_items_locales" ADD CONSTRAINT "_home_v_version_reviews_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_reviews_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_geres_image1_id_media_id_fk" FOREIGN KEY ("version_geres_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_geres_image2_id_media_id_fk" FOREIGN KEY ("version_geres_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stay" ADD CONSTRAINT "stay_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stay_locales" ADD CONSTRAINT "stay_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stay"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stay_rels" ADD CONSTRAINT "stay_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stay"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stay_rels" ADD CONSTRAINT "stay_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stay_v" ADD CONSTRAINT "_stay_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stay_v_locales" ADD CONSTRAINT "_stay_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stay_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stay_v_rels" ADD CONSTRAINT "_stay_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_stay_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stay_v_rels" ADD CONSTRAINT "_stay_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_values_items" ADD CONSTRAINT "house_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_values_items_locales" ADD CONSTRAINT "house_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_story_image1_id_media_id_fk" FOREIGN KEY ("story_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house" ADD CONSTRAINT "house_story_image2_id_media_id_fk" FOREIGN KEY ("story_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "house_locales" ADD CONSTRAINT "house_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."house"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_rels" ADD CONSTRAINT "house_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."house"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "house_rels" ADD CONSTRAINT "house_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_house_v_version_values_items" ADD CONSTRAINT "_house_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_house_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_house_v_version_values_items_locales" ADD CONSTRAINT "_house_v_version_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_house_v_version_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_house_v" ADD CONSTRAINT "_house_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_house_v" ADD CONSTRAINT "_house_v_version_story_image1_id_media_id_fk" FOREIGN KEY ("version_story_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_house_v" ADD CONSTRAINT "_house_v_version_story_image2_id_media_id_fk" FOREIGN KEY ("version_story_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_house_v_locales" ADD CONSTRAINT "_house_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_house_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_house_v_rels" ADD CONSTRAINT "_house_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_house_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_house_v_rels" ADD CONSTRAINT "_house_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_activities_items" ADD CONSTRAINT "geres_activities_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geres_activities_items" ADD CONSTRAINT "geres_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_activities_items_locales" ADD CONSTRAINT "geres_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_distances_items" ADD CONSTRAINT "geres_distances_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_distances_items_locales" ADD CONSTRAINT "geres_distances_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres_distances_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres" ADD CONSTRAINT "geres_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geres_locales" ADD CONSTRAINT "geres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_rels" ADD CONSTRAINT "geres_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."geres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geres_rels" ADD CONSTRAINT "geres_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_version_activities_items" ADD CONSTRAINT "_geres_v_version_activities_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_geres_v_version_activities_items" ADD CONSTRAINT "_geres_v_version_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_geres_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_version_activities_items_locales" ADD CONSTRAINT "_geres_v_version_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_geres_v_version_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_version_distances_items" ADD CONSTRAINT "_geres_v_version_distances_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_geres_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_version_distances_items_locales" ADD CONSTRAINT "_geres_v_version_distances_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_geres_v_version_distances_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v" ADD CONSTRAINT "_geres_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_geres_v_locales" ADD CONSTRAINT "_geres_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_geres_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_rels" ADD CONSTRAINT "_geres_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_geres_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_geres_v_rels" ADD CONSTRAINT "_geres_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sections" ADD CONSTRAINT "gallery_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sections_locales" ADD CONSTRAINT "gallery_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_version_sections" ADD CONSTRAINT "_gallery_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_version_sections_locales" ADD CONSTRAINT "_gallery_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v_locales" ADD CONSTRAINT "_gallery_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_rels" ADD CONSTRAINT "_gallery_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_rels" ADD CONSTRAINT "_gallery_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_rels" ADD CONSTRAINT "_gallery_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_booking_perks" ADD CONSTRAINT "contact_booking_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_booking_perks_locales" ADD CONSTRAINT "contact_booking_perks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_booking_perks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_rels" ADD CONSTRAINT "contact_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_rels" ADD CONSTRAINT "contact_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_version_booking_perks" ADD CONSTRAINT "_contact_v_version_booking_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_version_booking_perks_locales" ADD CONSTRAINT "_contact_v_version_booking_perks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v_version_booking_perks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v" ADD CONSTRAINT "_contact_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_v" ADD CONSTRAINT "_contact_v_version_map_image_id_media_id_fk" FOREIGN KEY ("version_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_v_locales" ADD CONSTRAINT "_contact_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_rels" ADD CONSTRAINT "_contact_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_rels" ADD CONSTRAINT "_contact_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "units_tags_order_idx" ON "units_tags" USING btree ("_order");
  CREATE INDEX "units_tags_parent_id_idx" ON "units_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "units_tags_locales_parent_id_locale_unique" ON "units_tags_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "units_image_idx" ON "units" USING btree ("image_id");
  CREATE INDEX "units_updated_at_idx" ON "units" USING btree ("updated_at");
  CREATE INDEX "units_created_at_idx" ON "units" USING btree ("created_at");
  CREATE UNIQUE INDEX "units_locales_parent_id_locale_unique" ON "units_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "units_rels_order_idx" ON "units_rels" USING btree ("order");
  CREATE INDEX "units_rels_parent_idx" ON "units_rels" USING btree ("parent_id");
  CREATE INDEX "units_rels_path_idx" ON "units_rels" USING btree ("path");
  CREATE INDEX "units_rels_media_id_idx" ON "units_rels" USING btree ("media_id");
  CREATE INDEX "units_rels_users_id_idx" ON "units_rels" USING btree ("users_id");
  CREATE INDEX "_units_v_version_tags_order_idx" ON "_units_v_version_tags" USING btree ("_order");
  CREATE INDEX "_units_v_version_tags_parent_id_idx" ON "_units_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_units_v_version_tags_locales_parent_id_locale_unique" ON "_units_v_version_tags_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_units_v_parent_idx" ON "_units_v" USING btree ("parent_id");
  CREATE INDEX "_units_v_version_version_image_idx" ON "_units_v" USING btree ("version_image_id");
  CREATE INDEX "_units_v_version_version_updated_at_idx" ON "_units_v" USING btree ("version_updated_at");
  CREATE INDEX "_units_v_version_version_created_at_idx" ON "_units_v" USING btree ("version_created_at");
  CREATE INDEX "_units_v_created_at_idx" ON "_units_v" USING btree ("created_at");
  CREATE INDEX "_units_v_updated_at_idx" ON "_units_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_units_v_locales_parent_id_locale_unique" ON "_units_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_units_v_rels_order_idx" ON "_units_v_rels" USING btree ("order");
  CREATE INDEX "_units_v_rels_parent_idx" ON "_units_v_rels" USING btree ("parent_id");
  CREATE INDEX "_units_v_rels_path_idx" ON "_units_v_rels" USING btree ("path");
  CREATE INDEX "_units_v_rels_media_id_idx" ON "_units_v_rels" USING btree ("media_id");
  CREATE INDEX "_units_v_rels_users_id_idx" ON "_units_v_rels" USING btree ("users_id");
  CREATE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_original_original_filename_idx" ON "media" USING btree ("original_filename");
  CREATE INDEX "media_variants_thumb_variants_thumb_filename_idx" ON "media" USING btree ("variants_thumb_filename");
  CREATE INDEX "media_variants_large_variants_large_filename_idx" ON "media" USING btree ("variants_large_filename");
  CREATE INDEX "media_variants_xl_variants_xl_filename_idx" ON "media" USING btree ("variants_xl_filename");
  CREATE UNIQUE INDEX "media_locales_parent_id_locale_unique" ON "media_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_users_id_idx" ON "media_rels" USING btree ("users_id");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_seed_key_idx" ON "_media_v" USING btree ("version_seed_key");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_original_version_original_filename_idx" ON "_media_v" USING btree ("version_original_filename");
  CREATE INDEX "_media_v_version_variants_thumb_version_variants_thumb_f_idx" ON "_media_v" USING btree ("version_variants_thumb_filename");
  CREATE INDEX "_media_v_version_variants_large_version_variants_large_f_idx" ON "_media_v" USING btree ("version_variants_large_filename");
  CREATE INDEX "_media_v_version_variants_xl_version_variants_xl_filenam_idx" ON "_media_v" USING btree ("version_variants_xl_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_media_v_locales_parent_id_locale_unique" ON "_media_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_media_v_rels_order_idx" ON "_media_v_rels" USING btree ("order");
  CREATE INDEX "_media_v_rels_parent_idx" ON "_media_v_rels" USING btree ("parent_id");
  CREATE INDEX "_media_v_rels_path_idx" ON "_media_v_rels" USING btree ("path");
  CREATE INDEX "_media_v_rels_users_id_idx" ON "_media_v_rels" USING btree ("users_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_users_id_idx" ON "users_rels" USING btree ("users_id");
  CREATE INDEX "_users_v_version_sessions_order_idx" ON "_users_v_version_sessions" USING btree ("_order");
  CREATE INDEX "_users_v_version_sessions_parent_id_idx" ON "_users_v_version_sessions" USING btree ("_parent_id");
  CREATE INDEX "_users_v_parent_idx" ON "_users_v" USING btree ("parent_id");
  CREATE INDEX "_users_v_version_version_updated_at_idx" ON "_users_v" USING btree ("version_updated_at");
  CREATE INDEX "_users_v_version_version_created_at_idx" ON "_users_v" USING btree ("version_created_at");
  CREATE INDEX "_users_v_version_version_email_idx" ON "_users_v" USING btree ("version_email");
  CREATE INDEX "_users_v_created_at_idx" ON "_users_v" USING btree ("created_at");
  CREATE INDEX "_users_v_updated_at_idx" ON "_users_v" USING btree ("updated_at");
  CREATE INDEX "_users_v_rels_order_idx" ON "_users_v_rels" USING btree ("order");
  CREATE INDEX "_users_v_rels_parent_idx" ON "_users_v_rels" USING btree ("parent_id");
  CREATE INDEX "_users_v_rels_path_idx" ON "_users_v_rels" USING btree ("path");
  CREATE INDEX "_users_v_rels_users_id_idx" ON "_users_v_rels" USING btree ("users_id");
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
  CREATE INDEX "payload_llm_instructions_entity_slug_idx" ON "payload_llm_instructions" USING btree ("entity_slug");
  CREATE INDEX "payload_llm_instructions_updated_at_idx" ON "payload_llm_instructions" USING btree ("updated_at");
  CREATE INDEX "payload_llm_instructions_created_at_idx" ON "payload_llm_instructions" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_rels_order_idx" ON "payload_llm_instructions_rels" USING btree ("order");
  CREATE INDEX "payload_llm_instructions_rels_parent_idx" ON "payload_llm_instructions_rels" USING btree ("parent_id");
  CREATE INDEX "payload_llm_instructions_rels_path_idx" ON "payload_llm_instructions_rels" USING btree ("path");
  CREATE INDEX "payload_llm_instructions_rels_users_id_idx" ON "payload_llm_instructions_rels" USING btree ("users_id");
  CREATE INDEX "site_amenities_order_idx" ON "site_amenities" USING btree ("_order");
  CREATE INDEX "site_amenities_parent_id_idx" ON "site_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_amenities_locales_parent_id_locale_unique" ON "site_amenities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "site_logo_light_idx" ON "site" USING btree ("logo_light_id");
  CREATE INDEX "site_logo_dark_idx" ON "site" USING btree ("logo_dark_id");
  CREATE UNIQUE INDEX "site_locales_parent_id_locale_unique" ON "site_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "site_rels_order_idx" ON "site_rels" USING btree ("order");
  CREATE INDEX "site_rels_parent_idx" ON "site_rels" USING btree ("parent_id");
  CREATE INDEX "site_rels_path_idx" ON "site_rels" USING btree ("path");
  CREATE INDEX "site_rels_users_id_idx" ON "site_rels" USING btree ("users_id");
  CREATE INDEX "_site_v_version_amenities_order_idx" ON "_site_v_version_amenities" USING btree ("_order");
  CREATE INDEX "_site_v_version_amenities_parent_id_idx" ON "_site_v_version_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_v_version_amenities_locales_parent_id_locale_unique" ON "_site_v_version_amenities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_site_v_version_version_logo_light_idx" ON "_site_v" USING btree ("version_logo_light_id");
  CREATE INDEX "_site_v_version_version_logo_dark_idx" ON "_site_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_v_locales_parent_id_locale_unique" ON "_site_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_site_v_rels_order_idx" ON "_site_v_rels" USING btree ("order");
  CREATE INDEX "_site_v_rels_parent_idx" ON "_site_v_rels" USING btree ("parent_id");
  CREATE INDEX "_site_v_rels_path_idx" ON "_site_v_rels" USING btree ("path");
  CREATE INDEX "_site_v_rels_users_id_idx" ON "_site_v_rels" USING btree ("users_id");
  CREATE INDEX "home_news_items_order_idx" ON "home_news_items" USING btree ("_order");
  CREATE INDEX "home_news_items_parent_id_idx" ON "home_news_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_news_items_locales_parent_id_locale_unique" ON "home_news_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "home_geres_stats_order_idx" ON "home_geres_stats" USING btree ("_order");
  CREATE INDEX "home_geres_stats_parent_id_idx" ON "home_geres_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_geres_stats_locales_parent_id_locale_unique" ON "home_geres_stats_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "home_reviews_items_order_idx" ON "home_reviews_items" USING btree ("_order");
  CREATE INDEX "home_reviews_items_parent_id_idx" ON "home_reviews_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_reviews_items_locales_parent_id_locale_unique" ON "home_reviews_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_geres_geres_image1_idx" ON "home" USING btree ("geres_image1_id");
  CREATE INDEX "home_geres_geres_image2_idx" ON "home" USING btree ("geres_image2_id");
  CREATE UNIQUE INDEX "home_locales_parent_id_locale_unique" ON "home_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "home_rels_users_id_idx" ON "home_rels" USING btree ("users_id");
  CREATE INDEX "_home_v_version_news_items_order_idx" ON "_home_v_version_news_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_news_items_parent_id_idx" ON "_home_v_version_news_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_news_items_locales_parent_id_locale_unique" ON "_home_v_version_news_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_home_v_version_geres_stats_order_idx" ON "_home_v_version_geres_stats" USING btree ("_order");
  CREATE INDEX "_home_v_version_geres_stats_parent_id_idx" ON "_home_v_version_geres_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_geres_stats_locales_parent_id_locale_unique" ON "_home_v_version_geres_stats_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_home_v_version_reviews_items_order_idx" ON "_home_v_version_reviews_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_reviews_items_parent_id_idx" ON "_home_v_version_reviews_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_reviews_items_locales_parent_id_locale_uniqu" ON "_home_v_version_reviews_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_geres_version_geres_image1_idx" ON "_home_v" USING btree ("version_geres_image1_id");
  CREATE INDEX "_home_v_version_geres_version_geres_image2_idx" ON "_home_v" USING btree ("version_geres_image2_id");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_home_v_locales_parent_id_locale_unique" ON "_home_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_media_id_idx" ON "_home_v_rels" USING btree ("media_id");
  CREATE INDEX "_home_v_rels_users_id_idx" ON "_home_v_rels" USING btree ("users_id");
  CREATE INDEX "stay_hero_hero_image_idx" ON "stay" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "stay_locales_parent_id_locale_unique" ON "stay_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "stay_rels_order_idx" ON "stay_rels" USING btree ("order");
  CREATE INDEX "stay_rels_parent_idx" ON "stay_rels" USING btree ("parent_id");
  CREATE INDEX "stay_rels_path_idx" ON "stay_rels" USING btree ("path");
  CREATE INDEX "stay_rels_users_id_idx" ON "stay_rels" USING btree ("users_id");
  CREATE INDEX "_stay_v_version_hero_version_hero_image_idx" ON "_stay_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_stay_v_created_at_idx" ON "_stay_v" USING btree ("created_at");
  CREATE INDEX "_stay_v_updated_at_idx" ON "_stay_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_stay_v_locales_parent_id_locale_unique" ON "_stay_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_stay_v_rels_order_idx" ON "_stay_v_rels" USING btree ("order");
  CREATE INDEX "_stay_v_rels_parent_idx" ON "_stay_v_rels" USING btree ("parent_id");
  CREATE INDEX "_stay_v_rels_path_idx" ON "_stay_v_rels" USING btree ("path");
  CREATE INDEX "_stay_v_rels_users_id_idx" ON "_stay_v_rels" USING btree ("users_id");
  CREATE INDEX "house_values_items_order_idx" ON "house_values_items" USING btree ("_order");
  CREATE INDEX "house_values_items_parent_id_idx" ON "house_values_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "house_values_items_locales_parent_id_locale_unique" ON "house_values_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "house_hero_hero_image_idx" ON "house" USING btree ("hero_image_id");
  CREATE INDEX "house_story_story_image1_idx" ON "house" USING btree ("story_image1_id");
  CREATE INDEX "house_story_story_image2_idx" ON "house" USING btree ("story_image2_id");
  CREATE UNIQUE INDEX "house_locales_parent_id_locale_unique" ON "house_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "house_rels_order_idx" ON "house_rels" USING btree ("order");
  CREATE INDEX "house_rels_parent_idx" ON "house_rels" USING btree ("parent_id");
  CREATE INDEX "house_rels_path_idx" ON "house_rels" USING btree ("path");
  CREATE INDEX "house_rels_users_id_idx" ON "house_rels" USING btree ("users_id");
  CREATE INDEX "_house_v_version_values_items_order_idx" ON "_house_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_house_v_version_values_items_parent_id_idx" ON "_house_v_version_values_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_house_v_version_values_items_locales_parent_id_locale_uniqu" ON "_house_v_version_values_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_house_v_version_hero_version_hero_image_idx" ON "_house_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_house_v_version_story_version_story_image1_idx" ON "_house_v" USING btree ("version_story_image1_id");
  CREATE INDEX "_house_v_version_story_version_story_image2_idx" ON "_house_v" USING btree ("version_story_image2_id");
  CREATE INDEX "_house_v_created_at_idx" ON "_house_v" USING btree ("created_at");
  CREATE INDEX "_house_v_updated_at_idx" ON "_house_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_house_v_locales_parent_id_locale_unique" ON "_house_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_house_v_rels_order_idx" ON "_house_v_rels" USING btree ("order");
  CREATE INDEX "_house_v_rels_parent_idx" ON "_house_v_rels" USING btree ("parent_id");
  CREATE INDEX "_house_v_rels_path_idx" ON "_house_v_rels" USING btree ("path");
  CREATE INDEX "_house_v_rels_users_id_idx" ON "_house_v_rels" USING btree ("users_id");
  CREATE INDEX "geres_activities_items_order_idx" ON "geres_activities_items" USING btree ("_order");
  CREATE INDEX "geres_activities_items_parent_id_idx" ON "geres_activities_items" USING btree ("_parent_id");
  CREATE INDEX "geres_activities_items_image_idx" ON "geres_activities_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "geres_activities_items_locales_parent_id_locale_unique" ON "geres_activities_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "geres_distances_items_order_idx" ON "geres_distances_items" USING btree ("_order");
  CREATE INDEX "geres_distances_items_parent_id_idx" ON "geres_distances_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "geres_distances_items_locales_parent_id_locale_unique" ON "geres_distances_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "geres_hero_hero_image_idx" ON "geres" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "geres_locales_parent_id_locale_unique" ON "geres_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "geres_rels_order_idx" ON "geres_rels" USING btree ("order");
  CREATE INDEX "geres_rels_parent_idx" ON "geres_rels" USING btree ("parent_id");
  CREATE INDEX "geres_rels_path_idx" ON "geres_rels" USING btree ("path");
  CREATE INDEX "geres_rels_users_id_idx" ON "geres_rels" USING btree ("users_id");
  CREATE INDEX "_geres_v_version_activities_items_order_idx" ON "_geres_v_version_activities_items" USING btree ("_order");
  CREATE INDEX "_geres_v_version_activities_items_parent_id_idx" ON "_geres_v_version_activities_items" USING btree ("_parent_id");
  CREATE INDEX "_geres_v_version_activities_items_image_idx" ON "_geres_v_version_activities_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_geres_v_version_activities_items_locales_parent_id_locale_u" ON "_geres_v_version_activities_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_geres_v_version_distances_items_order_idx" ON "_geres_v_version_distances_items" USING btree ("_order");
  CREATE INDEX "_geres_v_version_distances_items_parent_id_idx" ON "_geres_v_version_distances_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_geres_v_version_distances_items_locales_parent_id_locale_un" ON "_geres_v_version_distances_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_geres_v_version_hero_version_hero_image_idx" ON "_geres_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_geres_v_created_at_idx" ON "_geres_v" USING btree ("created_at");
  CREATE INDEX "_geres_v_updated_at_idx" ON "_geres_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_geres_v_locales_parent_id_locale_unique" ON "_geres_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_geres_v_rels_order_idx" ON "_geres_v_rels" USING btree ("order");
  CREATE INDEX "_geres_v_rels_parent_idx" ON "_geres_v_rels" USING btree ("parent_id");
  CREATE INDEX "_geres_v_rels_path_idx" ON "_geres_v_rels" USING btree ("path");
  CREATE INDEX "_geres_v_rels_users_id_idx" ON "_geres_v_rels" USING btree ("users_id");
  CREATE INDEX "gallery_sections_order_idx" ON "gallery_sections" USING btree ("_order");
  CREATE INDEX "gallery_sections_parent_id_idx" ON "gallery_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "gallery_sections_locales_parent_id_locale_unique" ON "gallery_sections_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "gallery_hero_hero_image_idx" ON "gallery" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "gallery_locales_parent_id_locale_unique" ON "gallery_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "gallery_rels_order_idx" ON "gallery_rels" USING btree ("order");
  CREATE INDEX "gallery_rels_parent_idx" ON "gallery_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_rels_path_idx" ON "gallery_rels" USING btree ("path");
  CREATE INDEX "gallery_rels_media_id_idx" ON "gallery_rels" USING btree ("media_id");
  CREATE INDEX "gallery_rels_users_id_idx" ON "gallery_rels" USING btree ("users_id");
  CREATE INDEX "_gallery_v_version_sections_order_idx" ON "_gallery_v_version_sections" USING btree ("_order");
  CREATE INDEX "_gallery_v_version_sections_parent_id_idx" ON "_gallery_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_gallery_v_version_sections_locales_parent_id_locale_unique" ON "_gallery_v_version_sections_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_gallery_v_version_hero_version_hero_image_idx" ON "_gallery_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_gallery_v_created_at_idx" ON "_gallery_v" USING btree ("created_at");
  CREATE INDEX "_gallery_v_updated_at_idx" ON "_gallery_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_gallery_v_locales_parent_id_locale_unique" ON "_gallery_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_gallery_v_rels_order_idx" ON "_gallery_v_rels" USING btree ("order");
  CREATE INDEX "_gallery_v_rels_parent_idx" ON "_gallery_v_rels" USING btree ("parent_id");
  CREATE INDEX "_gallery_v_rels_path_idx" ON "_gallery_v_rels" USING btree ("path");
  CREATE INDEX "_gallery_v_rels_media_id_idx" ON "_gallery_v_rels" USING btree ("media_id");
  CREATE INDEX "_gallery_v_rels_users_id_idx" ON "_gallery_v_rels" USING btree ("users_id");
  CREATE INDEX "contact_booking_perks_order_idx" ON "contact_booking_perks" USING btree ("_order");
  CREATE INDEX "contact_booking_perks_parent_id_idx" ON "contact_booking_perks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_booking_perks_locales_parent_id_locale_unique" ON "contact_booking_perks_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "contact_hero_hero_image_idx" ON "contact" USING btree ("hero_image_id");
  CREATE INDEX "contact_map_map_image_idx" ON "contact" USING btree ("map_image_id");
  CREATE UNIQUE INDEX "contact_locales_parent_id_locale_unique" ON "contact_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "contact_rels_order_idx" ON "contact_rels" USING btree ("order");
  CREATE INDEX "contact_rels_parent_idx" ON "contact_rels" USING btree ("parent_id");
  CREATE INDEX "contact_rels_path_idx" ON "contact_rels" USING btree ("path");
  CREATE INDEX "contact_rels_users_id_idx" ON "contact_rels" USING btree ("users_id");
  CREATE INDEX "_contact_v_version_booking_perks_order_idx" ON "_contact_v_version_booking_perks" USING btree ("_order");
  CREATE INDEX "_contact_v_version_booking_perks_parent_id_idx" ON "_contact_v_version_booking_perks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contact_v_version_booking_perks_locales_parent_id_locale_un" ON "_contact_v_version_booking_perks_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_contact_v_version_hero_version_hero_image_idx" ON "_contact_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_contact_v_version_map_version_map_image_idx" ON "_contact_v" USING btree ("version_map_image_id");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_contact_v_locales_parent_id_locale_unique" ON "_contact_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_contact_v_rels_order_idx" ON "_contact_v_rels" USING btree ("order");
  CREATE INDEX "_contact_v_rels_parent_idx" ON "_contact_v_rels" USING btree ("parent_id");
  CREATE INDEX "_contact_v_rels_path_idx" ON "_contact_v_rels" USING btree ("path");
  CREATE INDEX "_contact_v_rels_users_id_idx" ON "_contact_v_rels" USING btree ("users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "units_tags" CASCADE;
  DROP TABLE "units_tags_locales" CASCADE;
  DROP TABLE "units" CASCADE;
  DROP TABLE "units_locales" CASCADE;
  DROP TABLE "units_rels" CASCADE;
  DROP TABLE "_units_v_version_tags" CASCADE;
  DROP TABLE "_units_v_version_tags_locales" CASCADE;
  DROP TABLE "_units_v" CASCADE;
  DROP TABLE "_units_v_locales" CASCADE;
  DROP TABLE "_units_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_media_v_locales" CASCADE;
  DROP TABLE "_media_v_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "_users_v_version_sessions" CASCADE;
  DROP TABLE "_users_v" CASCADE;
  DROP TABLE "_users_v_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_llm_instructions" CASCADE;
  DROP TABLE "payload_llm_instructions_rels" CASCADE;
  DROP TABLE "site_amenities" CASCADE;
  DROP TABLE "site_amenities_locales" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "site_rels" CASCADE;
  DROP TABLE "_site_v_version_amenities" CASCADE;
  DROP TABLE "_site_v_version_amenities_locales" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "_site_v_locales" CASCADE;
  DROP TABLE "_site_v_rels" CASCADE;
  DROP TABLE "home_news_items" CASCADE;
  DROP TABLE "home_news_items_locales" CASCADE;
  DROP TABLE "home_geres_stats" CASCADE;
  DROP TABLE "home_geres_stats_locales" CASCADE;
  DROP TABLE "home_reviews_items" CASCADE;
  DROP TABLE "home_reviews_items_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_news_items" CASCADE;
  DROP TABLE "_home_v_version_news_items_locales" CASCADE;
  DROP TABLE "_home_v_version_geres_stats" CASCADE;
  DROP TABLE "_home_v_version_geres_stats_locales" CASCADE;
  DROP TABLE "_home_v_version_reviews_items" CASCADE;
  DROP TABLE "_home_v_version_reviews_items_locales" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "stay" CASCADE;
  DROP TABLE "stay_locales" CASCADE;
  DROP TABLE "stay_rels" CASCADE;
  DROP TABLE "_stay_v" CASCADE;
  DROP TABLE "_stay_v_locales" CASCADE;
  DROP TABLE "_stay_v_rels" CASCADE;
  DROP TABLE "house_values_items" CASCADE;
  DROP TABLE "house_values_items_locales" CASCADE;
  DROP TABLE "house" CASCADE;
  DROP TABLE "house_locales" CASCADE;
  DROP TABLE "house_rels" CASCADE;
  DROP TABLE "_house_v_version_values_items" CASCADE;
  DROP TABLE "_house_v_version_values_items_locales" CASCADE;
  DROP TABLE "_house_v" CASCADE;
  DROP TABLE "_house_v_locales" CASCADE;
  DROP TABLE "_house_v_rels" CASCADE;
  DROP TABLE "geres_activities_items" CASCADE;
  DROP TABLE "geres_activities_items_locales" CASCADE;
  DROP TABLE "geres_distances_items" CASCADE;
  DROP TABLE "geres_distances_items_locales" CASCADE;
  DROP TABLE "geres" CASCADE;
  DROP TABLE "geres_locales" CASCADE;
  DROP TABLE "geres_rels" CASCADE;
  DROP TABLE "_geres_v_version_activities_items" CASCADE;
  DROP TABLE "_geres_v_version_activities_items_locales" CASCADE;
  DROP TABLE "_geres_v_version_distances_items" CASCADE;
  DROP TABLE "_geres_v_version_distances_items_locales" CASCADE;
  DROP TABLE "_geres_v" CASCADE;
  DROP TABLE "_geres_v_locales" CASCADE;
  DROP TABLE "_geres_v_rels" CASCADE;
  DROP TABLE "gallery_sections" CASCADE;
  DROP TABLE "gallery_sections_locales" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "gallery_rels" CASCADE;
  DROP TABLE "_gallery_v_version_sections" CASCADE;
  DROP TABLE "_gallery_v_version_sections_locales" CASCADE;
  DROP TABLE "_gallery_v" CASCADE;
  DROP TABLE "_gallery_v_locales" CASCADE;
  DROP TABLE "_gallery_v_rels" CASCADE;
  DROP TABLE "contact_booking_perks" CASCADE;
  DROP TABLE "contact_booking_perks_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "contact_rels" CASCADE;
  DROP TABLE "_contact_v_version_booking_perks" CASCADE;
  DROP TABLE "_contact_v_version_booking_perks_locales" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "_contact_v_locales" CASCADE;
  DROP TABLE "_contact_v_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_payload_llm_instructions_entity_type";`)
}
