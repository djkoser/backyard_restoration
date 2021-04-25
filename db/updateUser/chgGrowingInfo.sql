UPDATE
  user_info
SET
  first_gdd35 = $2,
  last_gdd35 = $3,
  hardiness_zone = $4,
  growing_season_length = $5
WHERE
  user_id = $1;

