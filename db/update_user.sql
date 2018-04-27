UPDATE users
	SET username=$1, name=$2
	WHERE user_id=$3;
