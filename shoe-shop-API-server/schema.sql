DROP TABLE IF EXISTS shoes CASCADE;

CREATE TABLE shoes (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  brand varchar(255),
  name varchar(255),
  price integer, 
  category varchar(255) 
);

INSERT INTO shoes (brand,name,price,category)
VALUES
 
  ('Nike','air maxx 270',150,'running'),
  ('Hoka','Clifton 8',140,'running'),
  ('adidas','Ultraboost 5.0 DNA',180,'running'),  
  ('Birkenstock','Arizona',140,'sandals'),
  ('Merrell','Moab 2',80,'hiking');

 