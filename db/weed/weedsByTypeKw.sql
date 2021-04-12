SELECT
  *
FROM
  weed
WHERE
  veg_type = $1
  AND (common_name LIKE % $1 %
    OR botanical_name LIKE % $1 %);

