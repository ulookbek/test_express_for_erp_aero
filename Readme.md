Команда для запуска mysql:
`docker run -v "$PWD/data":/var/lib/mysql --name test-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123123 -e MYSQL_DATABASE=erp_test_db -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin -d mysql:8.0`

Для запуска сервера:
`npm run start`
