UPDATE
  user_info
SET
  pwd_reset_token = $2,
  reset_password_expiration = $3
WHERE
  user_id = $1;

