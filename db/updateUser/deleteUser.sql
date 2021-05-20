DELETE FROM 
  user_management_method
WHERE 
  user_id = $1;
  
DELETE FROM 
  user_info
WHERE 
  user_id = $1;

