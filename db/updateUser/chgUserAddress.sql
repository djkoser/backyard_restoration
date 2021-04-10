UPDATE
  user_info
SET
  street = $2,
  city = $3,
  state = $4,
  zipcode = $5,
  growing_season_length = $6,
  first_gdd35 = $7,
  hardiness_zone = $8
WHERE
  user_id = $1;

