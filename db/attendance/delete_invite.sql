DELETE FROM attendance
WHERE user_id=CAST($1 AS TEXT) AND event_id=CAST($2 AS TEXT);