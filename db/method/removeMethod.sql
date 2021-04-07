DELETE FROM user_management_method
WHERE user_id = $1
  AND management_method = $2;

