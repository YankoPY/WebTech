Use Users;

create table Users
( id integer primary key,
  username varchar(30) unique check(username like '%_%_%'),
  password varchar(64) unique check(password like '%_._%_%')
);


create table Meeting
( id integer primary key,
  name varchar(50) unique,
  start_date date check(start_date >= '2024-01-01'),
  end_date date check(end_date <= '2024-12-31'),
  start_time time check(start_time >= '09:00:00'),
  end_time time check (end_time <= '19:00:00')
);

create table Voting
( id integer primary key,
  user_id integer,
  meeting_id integer,
  vote_date date check(vote_date >= '2024-01-01' and vote_date <= '2024-12-31'),
  vote_time time check(vote_time >= '09:00:00' and vote_time <= '19:00:00'),
  foreign key (user_id) references Users(id),
  foreign key (meeting_id) references Meeting(id)
);


