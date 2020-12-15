# Pac App API
## Pac app API code

You should first create a .env file with the following variables

- NODE_ENV="development"
- DB_USER="admin"
- DB_PASS="pass1234"
- DB_NAME="pac_db"
- DB_HOST="localhost"
- SECRET="NotSoSecret"

running the following command:

```shell
$ echo "NODE_ENV="development"" > .env
$ echo "DB_USER="admin"" >> .env
$ echo "DB_PASS="pass1234"" >> .env
$ echo "DB_NAME="pac_db"" >> .env
$ echo "DB_HOST="localhost"" >> .env
$ echo "SECRET="NotSoSecret"" >> .env
```

_Note: Double greater than (>>) adds to the file. Single (>) creates non existing files or else, it overwrites it._

Then, install the modules:

```shell
npm install
```

Then, run the following commands to setup the database:

```shell
$ node_modules/.bin/sequelize-cli db:create
$ node_modules/.bin/sequelize-cli db:migrate
$ node_modules/.bin/sequelize-cli db:seed:all
```

And then, run the project:

```shell
$ npm start
```