--liquibase formatted sql
--changeset hoaian:issue-4
ALTER TABLE promotion_usage ALTER COLUMN created_on SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE promotion_usage ALTER COLUMN created_by SET DEFAULT 'system';