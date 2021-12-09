const Pool = require('pg').Pool;
const pool = new Pool({
 user: "postgres",
 password: "postgres",
 database: "postgres",
 host: "localhost",
 port: "5434"
});
module.exports = pool;

/*
Required database table can be created:

CREATE TABLE posts (
	id			bigint NOT NULL PRIMARY KEY,
	title		character varying,
	body 		character varying,
	imageurl	character varying,
	created_at	timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	likes		integer DEFAULT 0
)
*/