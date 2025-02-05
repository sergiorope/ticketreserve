#!/bin/bash

mysql -u root -p$MYSQL_ROOT_PASSWORD <<EOF
CREATE DATABASE IF NOT EXISTS ticketreserve;
GRANT ALL PRIVILEGES ON ticketreserve.* TO 'mysql'@'%';

FLUSH PRIVILEGES;
EOF
