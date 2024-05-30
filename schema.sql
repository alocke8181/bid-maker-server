CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL
)

CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
)

CREATE TABLE workdays (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bid_id INTEGER NOT NULL REFERENCES bids ON DELETE CASCADE
)

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    allow_breaks BOOLEAN DEFAULT TRUE
)

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    shift_num INTEGER NOT NULL,
    workday_id INTEGER NOT NULL REFERENCES workdays ON DELETE CASCADE,
    driver_name TEXT,
    hours DECIMAL
)

CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    unit_id INTEGER NOT NULL REFERENCES units ON DELETE CASCADE,
    shift_id INTEGER REFERENCES shifts ON DELETE CASCADE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    pretrip INTEGER,
    posttrip INTEGER,
    can_overlap BOOLEAN NOT NULL,
    dc_to INTEGER,
    dc_from INTEGER
)

CREATE TABLE units_blocks (
    unit_id INTEGER NOT NULL REFERENCES units ON DELETE CASCADE,
    block_id INTEGER NOT NULL REFERENCES blocks ON DELETE CASCADE,
    PRIMARY KEY (unit_id, block_id)
)

CREATE TABLE shifts_blocks (
    shift_id INTEGER NOT NULL REFERENCES shifts ON DELETE CASCADE,
    block_id INTEGER NOT NULL REFERENCES blocks ON DELETE CASCADE,
    PRIMARY KEY (shift_id, block_id)
)