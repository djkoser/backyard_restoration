UPDATE 
  user_native_plant
SET 
  project_notes = $3
WHERE 
  user_id = $1 AND
  native_id = $2; 