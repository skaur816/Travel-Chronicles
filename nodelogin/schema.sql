CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

-- Parameters mostl likely require renaming. Docker middleware used to deal with 
db_mysql:
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: 1qaz
      TZ: Asia/Shanghai
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    ports:
      - 3306:3306
    restart: always