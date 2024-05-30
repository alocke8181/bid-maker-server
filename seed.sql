INSERT INTO users (username, password)
VALUES ('testuser','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO bids (name, user_id)
VALUES ('test bid',1);

INSERT INTO workdays (name, bid_id)
VALUES ('test workday',1)

INSERT INTO units (name, start_time, end_time, allow_breaks)
VALUES ('test unit 1', '09:00:00', '17:00:00',FALSE),
        ('test unit 2','07:00:00','00:30:00',FALSE),
        ('test unit 3', '07:00:00','19:00:00',TRUE);

INSERT INTO shifts (shift_num, workday_id, driver_name, hours)
VALUES (1,1,'test driver 1',8.00),
        (2,1,'test driver 2',9.25),
        (3,1,NULL,8.75)

INSERT INTO blocks (name, unit_id, shift_id, start_time, end_time, pretrip, posttrip, can_overlap, dc_to, dc_from)
VALUES ('1A',1,1,'09:00:00','17:00:00',15,5,FALSE,0,0),
        ('2A',2,2,'07:00:00','16:00:00',15,0,FALSE,0,15),
        ('2B',2,3,'16:00:00','00:30:00',0,5,FALSE,15,0),
        ('3A',3,NULL,'07:00:00','11:00:00',15,5,FALSE,0,0),
        ('3B',3,NULL,'15:00:00','19:00:00',15,5,FALSE,0,0);

INSERT INTO units_blocks (unit_id, block_id)
VALUES (1,1),(2,2),(2,3),(3,4),(3,5);

INSERT INTO shifts_blocks (shift_id, block_id)
VALUES (1,1),(2,2),(3,3);