DELETE 
  FROM user_native_plant
WHERE 
  user_id = $1 AND native_id = $2;