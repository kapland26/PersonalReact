INSERT INTO users
(auth_id, email, img)
VALUES
($1, $2, $3)
RETURNING *;