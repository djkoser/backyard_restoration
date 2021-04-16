SELECT
  *
FROM
  weed
WHERE
  veg_type = $1
  AND (common_name ILIKE '%' || $2 || '%')
  OR (botanical_name ILIKE '%' || $2 || '%');

