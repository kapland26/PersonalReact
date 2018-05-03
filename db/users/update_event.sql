UPDATE users
	SET active_event_id=$1
	WHERE user_id=$2;
