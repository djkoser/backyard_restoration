DELETE FROM user_management_method
WHERE user_id = $1
  AND method_id = $2;

