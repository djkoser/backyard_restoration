SELECT
  user_id
FROM
  user_info
WHERE
  email = $1
  AND hash = $2;

