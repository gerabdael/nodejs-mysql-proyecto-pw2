CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    username VARCHAR (16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    public BOOLEAN,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2;


DESCRIBE users;

--LINK
CREATE TABLE lists(
    id INT(11) NOT NULL,
    Description TEXT NOT NULL,
    public BOOLEAN,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) 
);

ALTER TABLE lists
    ADD PRIMARY KEY (id);

ALTER TABLE lists
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
    DESCRIBE lists;

--OBJETOS 
CREATE TABLE toy(
    id INT(11) NOT NULL,
    Description TEXT NOT NULL,
    setiene BOOLEAN,
    price INT(11) NOT NULL,
    lists_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_list FOREIGN KEY (lists_id) REFERENCES lists(id) 
);
ALTER TABLE toy
    ADD PRIMARY KEY (id);

ALTER TABLE toy
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
    
DESCRIBE toy;