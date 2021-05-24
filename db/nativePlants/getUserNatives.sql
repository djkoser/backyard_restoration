SELECT
  np.native_id,
  np.common_name,
  np.botanical_name, 
  np.moisture,
  np.sun,
  np.height,
  np.bloom_time,
  np.src,
  unp.project_notes
FROM 
  user_native_plant unp
JOIN 
  native_plant np ON np.native_id = unp.native_id
WHERE 
  unp.user_id = $1; 
