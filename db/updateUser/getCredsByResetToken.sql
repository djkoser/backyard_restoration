SELECT
  *
FROM
  user_info
WHERE
  pwd_reset_token = $1;

