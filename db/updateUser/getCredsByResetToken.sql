SELECT
  user_id,
  reset_password_expiration
FROM
  user_info
WHERE
  pwd_reset_token = $1;

