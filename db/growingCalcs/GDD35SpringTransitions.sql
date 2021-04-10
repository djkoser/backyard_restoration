-- Select Dates of non-zero GDD 35 in which 90 percent of the 28 days before or after it were below GDD35
-- Non-Zero GDD35 days identified as the start of winter exhibit zero GDD35 in 90 percent of the 28 days following and 95 percent non-zero GDD35 prior. Spring days are the opposite. Both sets are found upon each query, but only the top or bottom of the list is selected based upon ASC or DESC order selection.
SELECT
  *
FROM (
  SELECT
    obs_date,
    ROW_NUMBER() OVER (PARTITION BY (obs_year) ORDER BY obs_date ASC) rn
FROM (
SELECT
  tmin.observation_date obs_date,
  tmin.temperature tmin_temp,
  tmax.temperature tmax_temp,
  (((tmax.temperature + tmin.temperature) / 2) - 35) gdd,
  DATE_TRUNC('year', tmin.observation_date) obs_year,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 1) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 2) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n2_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 3) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n3_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 4) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n4_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 5) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n5_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 6) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n6_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 7) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n7_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 8) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n8_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 9) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n9_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 10) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n10_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 11) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n11_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 12) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n12_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 13) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n13_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 14) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n14_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 15) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n15_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 16) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n16_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 17) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n17_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 18) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n18_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 19) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n19_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 20) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n20_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 21) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n21_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 22) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n22_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 23) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n23_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 24) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n24_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 25) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n25_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 26) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n26_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 27) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n27_gdd,
  CASE WHEN LEAD((((tmax.temperature + tmin.temperature) / 2) - 35), 28) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS n28_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 1) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 2) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l2_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 3) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l3_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 4) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l4_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 5) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l5_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 6) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l6_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 7) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l7_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 8) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l8_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 9) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l9_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 10) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l10_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 11) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l11_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 12) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l12_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 13) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l13_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 14) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l14_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 15) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l15_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 16) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l16_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 17) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l17_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 18) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l18_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 19) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l19_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 20) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l20_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 21) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l21_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 22) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l22_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 23) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l23_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 24) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l24_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 25) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l25_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 26) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l26_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 27) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l27_gdd,
  CASE WHEN LAG((((tmax.temperature + tmin.temperature) / 2) - 35), 28) OVER (ORDER BY tmin.observation_date) > 0 THEN
    1
  ELSE
    0
  END AS l28_gdd
FROM
  tmin
  JOIN tmax ON tmin.observation_date = tmax.observation_date) tmp
WHERE (gdd > 0
  AND ((l_gdd + l2_gdd + l3_gdd + l4_gdd + l5_gdd + l6_gdd + l7_gdd + l8_gdd + l9_gdd + l10_gdd + l11_gdd + l12_gdd + l13_gdd + l14_gdd + l15_gdd + l16_gdd + l17_gdd + l18_gdd + l19_gdd + l20_gdd + l21_gdd + l22_gdd + l23_gdd + l24_gdd + l25_gdd + l26_gdd + l27_gdd + l28_gdd) / 28) < 0.05
  AND ((n_gdd + n2_gdd + n3_gdd + n4_gdd + n5_gdd + n6_gdd + n7_gdd + n8_gdd + n9_gdd + n10_gdd + n11_gdd + n12_gdd + n13_gdd + n14_gdd + n15_gdd + n16_gdd + n17_gdd + n18_gdd + n19_gdd + n20_gdd + n21_gdd + n22_gdd + n23_gdd + n24_gdd + n25_gdd + n26_gdd + n27_gdd + n28_gdd) / 28) > 0.95)
  OR (gdd > 0
    AND ((n_gdd + n2_gdd + n3_gdd + n4_gdd + n5_gdd + n6_gdd + n7_gdd + n8_gdd + n9_gdd + n10_gdd + n11_gdd + n12_gdd + n13_gdd + n14_gdd + n15_gdd + n16_gdd + n17_gdd + n18_gdd + n19_gdd + n20_gdd + n21_gdd + n22_gdd + n23_gdd + n24_gdd + n25_gdd + n26_gdd + n27_gdd + n28_gdd) / 28) < 0.05
    AND ((l_gdd + l2_gdd + l3_gdd + l4_gdd + l5_gdd + l6_gdd + l7_gdd + l8_gdd + l9_gdd + l10_gdd + l11_gdd + l12_gdd + l13_gdd + l14_gdd + l15_gdd + l16_gdd + l17_gdd + l18_gdd + l19_gdd + l20_gdd + l21_gdd + l22_gdd + l23_gdd + l24_gdd + l25_gdd + l26_gdd + l27_gdd + l28_gdd) / 28) > 0.95)) tmp1
WHERE
  rn = 1
