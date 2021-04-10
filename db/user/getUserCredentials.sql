SELECT
  user_id,
  hash
FROM
  user_info
WHERE
  email = $1;

