-- ! depreciated: should be used auth provided by supabase
-- CREATE TABLE users (
--   id UUID PRIMARY KEY,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   isActive BOOLEAN NOT NULL DEFAULT TRUE
-- );

CREATE TABLE vehicles (
  id UUID PRIMARY KEY,
  manufacturer VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  plate VARCHAR(255) NOT NULL UNIQUE,
  fuel_type VARCHAR(255) NOT NULL,
  initial_kilometer INT NOT NULL,
  color VARCHAR(255) NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE fuel_supply (
  id INT NOT NULL primary key,
  date_time date NOT NULL,
  current_kilometer INT NOT NULL,
  fuel_type VARCHAR(255) NOT NULL,
  liters INT NOT NULL,
  price_per_liter INT NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  additional_data VARCHAR(255),
  vehicle_id uuid NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE maintenance (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  value INT NOT NULL,
  date date NOT NULL,
  current_kilometer INT NOT NULL,
  kilometer_to_next_maintenance INT NOT NULL,
  date_to_next_maintenance DATE NOT NULL,
  description VARCHAR(255),
  vehicle_id UUID NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE insurance (
  id INT NOT NULL PRIMARY KEY,
  company_name TEXT NOT NULL,
  value INT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  vehicle_id UUID NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE traffic_tickets (
  id INT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  value INT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  vehicle_id UUID NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE notifications (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  vehicle_id UUID NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE plans (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  price_in_Cents INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL
);

CREATE table user_plans (
	id integer primary key,
	is_active boolean not null default false,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id UUID not null,
  plan_id integer not null,
  FOREIGN KEY (user_id) REFERENCES users(id),
  foreign key (plan_id) references plans(id)
);


CREATE TABLE user_payments (
  id INTEGER PRIMARY KEY,
  payment_date DATE,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_plan_id integer not null,
  amount_at_invoice INTEGER,
  percent_late_rate INTEGER,
  amount_paid INTEGER,
  payment_method VARCHAR(255),
  due_date DATE,
  FOREIGN KEY (user_plan_id) REFERENCES user_plans(id)
);

CREATE TABLE manufacturer (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);