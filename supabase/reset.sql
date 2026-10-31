-- ONLY if you already ran an older schema.sql (the demo catalog). This deletes the old tables and their data,
-- so run it once, then run schema.sql and seed.sql again. Do not run it on a database that holds real orders.
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists customers cascade;
drop table if exists products cascade;
drop sequence if exists order_number_seq;
