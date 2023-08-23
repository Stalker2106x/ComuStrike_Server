█████████████████████████████████████████████████████████████
█─▄▄▄─█─▄▄─█▄─▀█▀─▄█▄─██─▄█─▄▄▄▄█─▄─▄─█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█
█─███▀█─██─██─█▄█─███─██─██▄▄▄▄─███─████─▄─▄██─███─▄▀███─▄█▀█
█▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄█

Unofficial Romustrike server

# Pre-built binary

The server is available in pre-built binaries on Release section

NOTE: The server uses MySQL "MariaDB" engine to persist data.
Install any edition from: https://mariadb.com/downloads/

When the setup is complete, you might want to fill your database with default data.
When you run the server for the first time, pass the switch __--fillDB__

    ./ComuStrike_Server --fillDB

# From source

Requirements:
- NodeJS 18 or later

## Setup

First install server dependencies, by running:

    yarn install

## Start

to run server just start it

    yarn start