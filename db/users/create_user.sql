INSERT INTO users
(auth_id, img)
VALUES
($1, $2)
RETURNING *;