UPDATE events
	SET users_invited=$1
	WHERE event_id=$2;
