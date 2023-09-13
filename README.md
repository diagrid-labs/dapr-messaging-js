# Sync vs async messaging with Dapr and JavaScript

Examples of sync and async messaging with Dapr and JavaScript.

## Prerequisites

Ensure you have the following installed before proceeding:

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
- [NodeJS](https://nodejs.org/)

## Synchronous messaging

### Run the sync messaging example

1. Open a terminal and navigate to the `sync` folder.
2. Run the following command to install the dependencies:

    ```bash
    npm run install:all
    ```

3. Run the apps with Dapr multi-app run (on macOS or Linux):

    ```bash

    ```bash
    dapr run -f .
    ```

4. Or run the apps separately with the Dapr CLI:

    Navigate to the payment folder and run:

    ```bash
    dapr run --app-port 5502 --app-id payment --app-protocol http --dapr-http-port 3502 -- npm start
    ```

    Open a new terminal and navigate to the registration folder and run:

    ```bash
    dapr run --app-port 5501 --app-id registration --app-protocol http --dapr-http-port 3501 -- npm start
    ```

