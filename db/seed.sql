-- SELECT * FROM user_info;
-- SELECT * FROM weed;
-- SELECT * FROM management_method;
-- SELECT * FROM user_management_method;
DROP TABLE user_management_method;

DROP TABLE management_method;

DROP TABLE user_info;

DROP TABLE weed;

DROP TABLE tmin;

DROP TABLE tmax;

CREATE TABLE tmin (
  id serial PRIMARY KEY,
  temperature int,
  observation_date date
);

CREATE TABLE tmax (
  id serial PRIMARY KEY,
  temperature int,
  observation_date date
);

CREATE TABLE weed (
  weed_id serial PRIMARY KEY,
  common_name text,
  botanical_name text,
  annual_perennial_biennial varchar(1),
  veg_type varchar(1),
  description text,
  src text
);

CREATE TABLE user_info (
  user_id serial PRIMARY KEY,
  email text,
  first_name text,
  last_name text,
  street text,
  city text,
  state text,
  zipcode varchar(5),
  hash VARCHAR(60),
  growing_season_length int,
  first_gdd35 varchar(5),
  hardiness_zone varchar(2)
);

CREATE TABLE management_method (
  method_id serial PRIMARY KEY,
  weed_id int REFERENCES weed (weed_id),
  name text,
  description text,
  april varchar(1),
  may varchar(1),
  june varchar(1),
  july varchar(1),
  august varchar(1),
  september varchar(1),
  october varchar(1),
  november varchar(1),
  december_march varchar(1)
);

CREATE TABLE user_management_method (
  id serial PRIMARY KEY,
  user_id int REFERENCES user_info (user_id),
  method_id int REFERENCES management_method (method_id)
);

INSERT INTO management_method (weed_id, name, description, april, may, june, july, august, september, october, november, december_march)
  VALUES ();

INSERT INTO weed (common_name, botanical_name, annual_perennial_biennial, veg_type, description, src)
  VALUES ();

