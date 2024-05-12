Use Users;

create table Users
( id integer primary key,
  username varchar(30),
  password char(64)
);

create table Meeting
( id integer primary key,
  name varchar(50) unique,
  start_date date,
  end_date date,
  start_time time,
  end_time time
);

create table Voting
( id integer primary key,
  user_id integer,
  meeting_id integer,
  vote_date date,
  vote_time time
);

alter table Voting add foreign key (user_id) references Users(id);
alter table Voting add foreign key (meeting_id) references Meeting(id);

alter table Users add constraint ck_password check(password <= 8 and password >= 16)
--alter table Users add constraint ck_username check(username >= 'a' and username <= 'z')
alter table Meeting add constraint ck_mtg_data check(start_date >= '2024-01-01' and end_date <= '2024-12-31' and start_date <= end_date)
alter table Meeting add constraint ck_mtg_time check(start_time >= '00:00:00' and end_time <= '23:59:59' and start_time <= end_time)
alter table Voting add constraint ck_vt_date check(vote_date >= '2024-01-01' and vote_date <= '2024-12-31')
alter table Voting add constraint ck_vt_time check(vote_time >= '00:00:00' and vote_time <= '23:59:59')


