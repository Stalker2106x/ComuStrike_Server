# ComuStrike

Unofficial Romustrike server

# Requirements

- MariaDB
- NodeJS 18 or later

# Setup

to install server dependencies, run:

    yarn install

to inject data in your server database, run:

    $ mysql -u dbuser -p
    mysql> source sql/createMaps.sql
    mysql> source sql/createPlayers.sql

# Start

to run server just start it

    yarn start