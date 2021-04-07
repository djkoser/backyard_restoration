UPDATE
  user_info
SET
  first_name = $2,
  last_name = $3
WHERE
  user_id = $1;

