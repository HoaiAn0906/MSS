--liquibase formatted sql

--changeset HoaiAn:create-tables
-- ----------------------------
-- Sequence structure for brand_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."brand_id_seq";
CREATE SEQUENCE "public"."brand_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."brand_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."category_id_seq";
CREATE SEQUENCE "public"."category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."category_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_attribute_group_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_attribute_group_id_seq";
CREATE SEQUENCE "public"."product_attribute_group_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_attribute_group_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_attribute_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_attribute_id_seq";
CREATE SEQUENCE "public"."product_attribute_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_attribute_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_attribute_template_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_attribute_template_id_seq";
CREATE SEQUENCE "public"."product_attribute_template_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_attribute_template_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_attribute_value_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_attribute_value_id_seq";
CREATE SEQUENCE "public"."product_attribute_value_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_attribute_value_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_category_id_seq";
CREATE SEQUENCE "public"."product_category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_category_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_id_seq";
CREATE SEQUENCE "public"."product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_image_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_image_id_seq";
CREATE SEQUENCE "public"."product_image_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_image_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_option_combination_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_option_combination_id_seq";
CREATE SEQUENCE "public"."product_option_combination_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_option_combination_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_option_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_option_id_seq";
CREATE SEQUENCE "public"."product_option_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_option_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_option_value_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_option_value_id_seq";
CREATE SEQUENCE "public"."product_option_value_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_option_value_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_related_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_related_id_seq";
CREATE SEQUENCE "public"."product_related_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_related_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for product_template_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_template_id_seq";
CREATE SEQUENCE "public"."product_template_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."product_template_id_seq" OWNER TO "admin";

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS "public"."brand";
CREATE TABLE "public"."brand" (
  "id" int8 NOT NULL DEFAULT nextval('brand_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "slug" varchar(255) COLLATE "pg_catalog"."default",
  "is_published" bool
)
;
ALTER TABLE "public"."brand" OWNER TO "admin";

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS "public"."category";
CREATE TABLE "public"."category" (
  "id" int8 NOT NULL DEFAULT nextval('category_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "display_order" int2,
  "meta_description" varchar(255) COLLATE "pg_catalog"."default",
  "meta_keyword" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "slug" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" int8,
  "is_published" bool,
  "image_id" int8
)
;
ALTER TABLE "public"."category" OWNER TO "admin";

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "public"."product";
CREATE TABLE "public"."product" (
  "id" int8 NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "description" text COLLATE "pg_catalog"."default",
  "gtin" varchar(255) COLLATE "pg_catalog"."default",
  "has_options" bool,
  "is_allowed_to_order" bool,
  "is_featured" bool,
  "is_published" bool,
  "is_visible_individually" bool,
  "meta_description" varchar(255) COLLATE "pg_catalog"."default",
  "meta_keyword" varchar(255) COLLATE "pg_catalog"."default",
  "meta_title" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "price" float8,
  "short_description" varchar(255) COLLATE "pg_catalog"."default",
  "sku" varchar(255) COLLATE "pg_catalog"."default",
  "slug" varchar(255) COLLATE "pg_catalog"."default",
  "specification" text COLLATE "pg_catalog"."default",
  "thumbnail_media_id" int8,
  "brand_id" int8,
  "parent_id" int8,
  "stock_tracking_enabled" bool DEFAULT true,
  "tax_included" bool,
  "stock_quantity" int8 DEFAULT 0,
  "tax_class_id" int8,
  "weight" numeric DEFAULT 0,
  "length" numeric DEFAULT 0,
  "width" numeric DEFAULT 0,
  "height" numeric DEFAULT 0,
  "dimension_unit" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."product" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_attribute
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_attribute";
CREATE TABLE "public"."product_attribute" (
  "id" int8 NOT NULL DEFAULT nextval('product_attribute_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "product_attribute_group_id" int8
)
;
ALTER TABLE "public"."product_attribute" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_attribute_group
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_attribute_group";
CREATE TABLE "public"."product_attribute_group" (
  "id" int8 NOT NULL DEFAULT nextval('product_attribute_group_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."product_attribute_group" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_attribute_template
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_attribute_template";
CREATE TABLE "public"."product_attribute_template" (
  "id" int8 NOT NULL DEFAULT nextval('product_attribute_template_id_seq'::regclass),
  "product_attribute_id" int8 NOT NULL,
  "product_template_id" int8 NOT NULL,
  "display_order" int4 NOT NULL
)
;
ALTER TABLE "public"."product_attribute_template" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_attribute_value
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_attribute_value";
CREATE TABLE "public"."product_attribute_value" (
  "id" int8 NOT NULL DEFAULT nextval('product_attribute_value_id_seq'::regclass),
  "value" varchar(255) COLLATE "pg_catalog"."default",
  "product_id" int8 NOT NULL,
  "product_attribute_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_attribute_value" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_category";
CREATE TABLE "public"."product_category" (
  "id" int8 NOT NULL DEFAULT nextval('product_category_id_seq'::regclass),
  "display_order" int4 NOT NULL,
  "is_featured_product" bool NOT NULL,
  "category_id" int8 NOT NULL,
  "product_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_category" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_image
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_image";
CREATE TABLE "public"."product_image" (
  "id" int8 NOT NULL DEFAULT nextval('product_image_id_seq'::regclass),
  "image_id" int8,
  "product_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_image" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_option
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_option";
CREATE TABLE "public"."product_option" (
  "id" int8 NOT NULL DEFAULT nextval('product_option_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."product_option" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_option_combination
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_option_combination";
CREATE TABLE "public"."product_option_combination" (
  "id" int8 NOT NULL DEFAULT nextval('product_option_combination_id_seq'::regclass),
  "display_order" int4 NOT NULL,
  "value" varchar(255) COLLATE "pg_catalog"."default",
  "product_id" int8 NOT NULL,
  "product_option_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_option_combination" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_option_value
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_option_value";
CREATE TABLE "public"."product_option_value" (
  "id" int8 NOT NULL DEFAULT nextval('product_option_value_id_seq'::regclass),
  "display_order" int4 NOT NULL,
  "display_type" varchar(255) COLLATE "pg_catalog"."default",
  "value" varchar(255) COLLATE "pg_catalog"."default",
  "product_id" int8 NOT NULL,
  "product_option_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_option_value" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_related
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_related";
CREATE TABLE "public"."product_related" (
  "id" int8 NOT NULL DEFAULT nextval('product_related_id_seq'::regclass),
  "product_id" int8 NOT NULL,
  "related_product_id" int8 NOT NULL
)
;
ALTER TABLE "public"."product_related" OWNER TO "admin";

-- ----------------------------
-- Table structure for product_template
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_template";
CREATE TABLE "public"."product_template" (
  "id" int8 NOT NULL DEFAULT nextval('product_template_id_seq'::regclass),
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_on" timestamp(6),
  "last_modified_by" varchar(255) COLLATE "pg_catalog"."default",
  "last_modified_on" timestamp(6),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."product_template" OWNER TO "admin";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."brand_id_seq"
OWNED BY "public"."brand"."id";
SELECT setval('"public"."brand_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."category_id_seq"
OWNED BY "public"."category"."id";
SELECT setval('"public"."category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_attribute_group_id_seq"
OWNED BY "public"."product_attribute_group"."id";
SELECT setval('"public"."product_attribute_group_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_attribute_id_seq"
OWNED BY "public"."product_attribute"."id";
SELECT setval('"public"."product_attribute_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_attribute_template_id_seq"
OWNED BY "public"."product_attribute_template"."id";
SELECT setval('"public"."product_attribute_template_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_attribute_value_id_seq"
OWNED BY "public"."product_attribute_value"."id";
SELECT setval('"public"."product_attribute_value_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_category_id_seq"
OWNED BY "public"."product_category"."id";
SELECT setval('"public"."product_category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_id_seq"
OWNED BY "public"."product"."id";
SELECT setval('"public"."product_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_image_id_seq"
OWNED BY "public"."product_image"."id";
SELECT setval('"public"."product_image_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_option_combination_id_seq"
OWNED BY "public"."product_option_combination"."id";
SELECT setval('"public"."product_option_combination_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_option_id_seq"
OWNED BY "public"."product_option"."id";
SELECT setval('"public"."product_option_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_option_value_id_seq"
OWNED BY "public"."product_option_value"."id";
SELECT setval('"public"."product_option_value_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_related_id_seq"
OWNED BY "public"."product_related"."id";
SELECT setval('"public"."product_related_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_template_id_seq"
OWNED BY "public"."product_template"."id";
SELECT setval('"public"."product_template_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table brand
-- ----------------------------
ALTER TABLE "public"."brand" ADD CONSTRAINT "brand_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table category
-- ----------------------------
ALTER TABLE "public"."category" ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_attribute
-- ----------------------------
ALTER TABLE "public"."product_attribute" ADD CONSTRAINT "product_attribute_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_attribute_group
-- ----------------------------
ALTER TABLE "public"."product_attribute_group" ADD CONSTRAINT "product_attribute_group_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_attribute_template
-- ----------------------------
ALTER TABLE "public"."product_attribute_template" ADD CONSTRAINT "product_attribute_template_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_attribute_value
-- ----------------------------
ALTER TABLE "public"."product_attribute_value" ADD CONSTRAINT "product_attribute_value_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_category
-- ----------------------------
ALTER TABLE "public"."product_category" ADD CONSTRAINT "product_category_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_image
-- ----------------------------
ALTER TABLE "public"."product_image" ADD CONSTRAINT "product_image_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_option
-- ----------------------------
ALTER TABLE "public"."product_option" ADD CONSTRAINT "product_option_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_option_combination
-- ----------------------------
ALTER TABLE "public"."product_option_combination" ADD CONSTRAINT "product_option_combination_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_option_value
-- ----------------------------
ALTER TABLE "public"."product_option_value" ADD CONSTRAINT "product_option_value_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_related
-- ----------------------------
ALTER TABLE "public"."product_related" ADD CONSTRAINT "product_related_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_template
-- ----------------------------
ALTER TABLE "public"."product_template" ADD CONSTRAINT "product_template_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table category
-- ----------------------------
ALTER TABLE "public"."category" ADD CONSTRAINT "fk2y94svpmqttx80mshyny85wqr" FOREIGN KEY ("parent_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "fkgmb19wbjvpu06559t7w33wqoc" FOREIGN KEY ("parent_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product" ADD CONSTRAINT "fks6cydsualtsrprvlf2bb3lcam" FOREIGN KEY ("brand_id") REFERENCES "public"."brand" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_attribute
-- ----------------------------
ALTER TABLE "public"."product_attribute" ADD CONSTRAINT "fkrj91gkq3vj79a1l1tmrncwaiv" FOREIGN KEY ("product_attribute_group_id") REFERENCES "public"."product_attribute_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_attribute_template
-- ----------------------------
ALTER TABLE "public"."product_attribute_template" ADD CONSTRAINT "fk_attribute_atributetemplate" FOREIGN KEY ("product_attribute_id") REFERENCES "public"."product_attribute" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_attribute_template" ADD CONSTRAINT "fk_template_atributetemplate" FOREIGN KEY ("product_template_id") REFERENCES "public"."product_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_attribute_value
-- ----------------------------
ALTER TABLE "public"."product_attribute_value" ADD CONSTRAINT "fkejch53yke5ufe6w72yjpnakoi" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_attribute_value" ADD CONSTRAINT "fkqgk2xbdl46wt0h9i5uheps5ke" FOREIGN KEY ("product_attribute_id") REFERENCES "public"."product_attribute" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_category
-- ----------------------------
ALTER TABLE "public"."product_category" ADD CONSTRAINT "fk2k3smhbruedlcrvu6clued06x" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_category" ADD CONSTRAINT "fkkud35ls1d40wpjb5htpp14q4e" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_image
-- ----------------------------
ALTER TABLE "public"."product_image" ADD CONSTRAINT "fk6oo0cvcdtb6qmwsga468uuukk" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_option_combination
-- ----------------------------
ALTER TABLE "public"."product_option_combination" ADD CONSTRAINT "fk3r4w3siw3js19wv4lsd7cfuj1" FOREIGN KEY ("product_option_id") REFERENCES "public"."product_option" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_option_combination" ADD CONSTRAINT "fka4qh7bl0gs7m2oyiqcbcy8yx4" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_option_value
-- ----------------------------
ALTER TABLE "public"."product_option_value" ADD CONSTRAINT "fk2orsp8e9oenavxnq98nbxrm1s" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_option_value" ADD CONSTRAINT "fkhsycxdkv3mfsvu2l8f1i1vy11" FOREIGN KEY ("product_option_id") REFERENCES "public"."product_option" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_related
-- ----------------------------
ALTER TABLE "public"."product_related" ADD CONSTRAINT "product_related_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_related" ADD CONSTRAINT "product_related_related_product_id_fkey" FOREIGN KEY ("related_product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
