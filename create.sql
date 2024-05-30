\echo 'Del and recreate db?'
\prompt 'Yes or ctrl-c to canx' foo

DROP DATABASE bid_maker;
CREATE DATABASE bid_maker;
\connect bid_maker;

\i schema.sql;
\i seed.sql;

\echo 'same for test db?'
\prompt 'yes or ctr-c to canx > ' foo

DROP DATABASE bid_maker_test;
CREATE DATABASE bid_maker_test;
\connect bid_maker_test

\i capstone2-schema.sql