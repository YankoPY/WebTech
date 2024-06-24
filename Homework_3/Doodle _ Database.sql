Use Users;

create table Users
( user_id integer primary key,
  username varchar(30) not null unique,
  password varchar(64) not null,
  email varchar(100) not null unique
);


create table Meeting
( meeting_id integer primary key,
  title varchar(50) not null unique,
  description text,
  created_by integer,
  start_date date check(start_date >= '2024-01-01'),
  end_date date check(end_date <= '2024-12-31'),
  start_time time check(start_time >= '09:00:00'),
  end_time time check (end_time <= '19:00:00'),
  foreign key (created_by) references Users(user_id)
);

create table Voting
( vote_id integer primary key,
  user_id integer,
  meeting_id integer,
  vote_date date check(vote_date >= '2024-01-01' and vote_date <= '2024-12-31'),
  vote_time time check(vote_time >= '09:00:00' and vote_time <= '19:00:00'),
  foreign key (user_id) references Users(user_id),
  foreign key (meeting_id) references Meeting(meeting_id),
  unique (user_id, meeting_id)
);


