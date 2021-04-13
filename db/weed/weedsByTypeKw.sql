SELECT
  *
FROM
  weed
WHERE
  veg_type = $1
  AND (common_name LIKE '%'||$2||'%')
    OR (botanical_name LIKE '%'||$2||'%');

