SELECT * FROM attendance 
LEFT JOIN events ON attendance.event_id = CAST(events.event_id AS text)
WHERE attendance.user_id = $1;