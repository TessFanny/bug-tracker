BEGIN;



CREATE DOMAIN email_address AS text CHECK( VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

ALTER TABLE "user"
ALTER COLUMN email TYPE email_address; 


ALTER TABLE bug ADD COLUMN title text ; 
COMMIT;
