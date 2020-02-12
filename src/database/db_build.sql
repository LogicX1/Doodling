BEGIN;


DROP TABLE IF EXISTS usernames;


create table usernames (
	id SERIAL PRIMARY KEY,
    name VARCHAR(100),
	password VARCHAR(50)
);
insert into usernames (id, name, password) values (1,'aysam', '1234');
insert into usernames (id, name, password) values (2,'najwan', '1234');
insert into usernames (id, name, password) values (3,'yousef', '1234');
insert into usernames (id, name, password) values (4,'mario', '1234');
insert into usernames (id, name, password) values (5,'rabeea', '1234');
insert into usernames (id, name, password) values (6,'ivan', '1234');
insert into usernames (id, name, password) values (7,'lina', '1234');
insert into usernames (id, name, password) values (8,'mina', '1234');
insert into usernames (id, name, password) values (9,'shireen', '1234');
insert into usernames (id, name, password) values (10,'fatima', '1234');
insert into usernames (id, name, password) values (11,'mahmood', '1234');
insert into usernames (id, name, password) values (12,'francis', '1234');


COMMIT;

