BEGIN;


DROP TABLE IF EXISTS usernames;


create table usernames (
    name CITEXT PRIMARY KEY,
	password VARCHAR(50)
);
insert into usernames (name, password) values ('aysam', '1234');
insert into usernames (name, password) values ('najwan', '1234');
insert into usernames (name, password) values ('yousef', '1234');
insert into usernames (name, password) values ('mario', '1234');
insert into usernames (name, password) values ('rabeea', '1234');
insert into usernames (name, password) values ('ivan', '1234');
insert into usernames (name, password) values ('lina', '1234');
insert into usernames (name, password) values ('mina', '1234');
insert into usernames (name, password) values ('shireen', '1234');
insert into usernames (name, password) values ('fatima', '1234');
insert into usernames (name, password) values ('mahmood', '1234');
insert into usernames (name, password) values ('francis', '1234');



COMMIT;

