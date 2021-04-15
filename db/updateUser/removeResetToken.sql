UPDATE
  user_info
SET
  pwd_reset_token = ''
WHERE
  user_id = $1;

