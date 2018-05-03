UPDATE events
	SET users_remaining=$1
	WHERE event_id=$2;
