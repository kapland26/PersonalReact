INSERT INTO events(end_user_amount, users_invited, users_remaining, host, users_accepted)
VALUES($1, $2, $2, $3, 0);
SELECT LASTVAL();