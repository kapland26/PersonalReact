INSERT INTO events(end_user_amount, users_invited, users_remaining, host, name)
VALUES($1, $2, $2, $3, $4);
SELECT LASTVAL();