█████████████████████████████████████████████████████████████
█─▄▄▄─█─▄▄─█▄─▀█▀─▄█▄─██─▄█─▄▄▄▄█─▄─▄─█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█
█─███▀█─██─██─█▄█─███─██─██▄▄▄▄─███─████─▄─▄██─███─▄▀███─▄█▀█
█▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄█

Unofficial Romustrike master server

# Contributors

- Stalker2106
- SheatNoisette

# Pre-built binary

The server is available in pre-built binaries on Release section

NOTE: The server uses MySQL "MariaDB" engine to persist data.
Install any edition from: https://mariadb.com/downloads/ prior to running the server

To configure your server, you can run it once, and it will create a `config.json` file alongside its binary.
Just edit the `config.json` file to match your DB settings, and the server should start!

# From source

Requirements:
- NodeJS 18 or later

## Setup

First install server dependencies, by running:

    yarn install

## Start

to run server just start it

    yarn start