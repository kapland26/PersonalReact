UPDATE users
	SET username=$1, name=$2, email=$3, img=$4
	WHERE user_id=$5;
SELECT * FROM users
    WHERE user_id=$5;