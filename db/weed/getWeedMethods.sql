SELECT
  method_id,
  name,
  description
FROM
  management_method
WHERE
  weed_id = $1;

