# Sync vs async messaging with Dapr and JavaScript

Examples of sync and async messaging with Dapr and JavaScript.

## Prerequisites

Ensure you have the following installed before proceeding:

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
- [NodeJS](https://nodejs.org/)
- Optional: [VS Code](https://code.visualstudio.com/) with the [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

## Synchronous messaging

### Run the sync messaging example

1. Open a terminal and navigate to the `sync` folder.
2. Run the following command to install the dependencies:

    For macOS & Linux:

    ```bash
    npm run install:mac
    ```

    For Windows:

    ```bash
    npm run install:win
    ```

3. Run the apps with Dapr multi-app run (macOS or Linux only):

    ```bash
    dapr run -f .
    ```

   Or run the apps separately with the Dapr CLI:

    Navigate to the `payment` folder and run:

    ```bash
    dapr run --app-port 5502 --app-id payment --app-protocol http --dapr-http-port 3502 -- npm start
    ```

    Open a new terminal and navigate to the `registration` folder and run:

    ```bash
    dapr run --app-port 5501 --app-id registration --app-protocol http --dapr-http-port 3501 -- npm start
    ```

4. Make a request to the `register` endpoint of the registration service.

    > If you're using VS Code with the REST client you can use the [local-sync-test.http file](local-sync-test.http).

    ```bash
    curl --request POST \
    --url http://localhost:5501/register \
    --header 'content-type: application/json' \
    --data '{"name": "Stu Dent","email": "stu@dent.com","class": "digital media","cost": 500}'
    ```

    Expected response:

    ```txt
    Registration received for Stu Dent
    ```

    The application log of the payment service should show the following:

    ```txt
    == APP == Payment received: { email: 'stu@dent.com', cost: 500 }
    ```

    You've now successfully made a request to the registration service and that service made a synchronous call to the payment service.

### Add resiliency

The `sync/resources` folder contains a `resiliency.yaml` file that contains resiliency policies that the registration service will use when making requests to the payment service.

1. Inspect the [`resiliency.yaml`](sync/resources/resiliency.yaml) file and check the scope, policies, and target elements.
2. Open a terminal and navigate to the `registration` folder and run:

    ```bash
    dapr run --app-port 5502 --app-id registration --app-protocol http --dapr-http-port 3502 --resources-path ../resources -- npm start
    ```

    > Note that the `--resources-path` argument is used to specify the location of the `resiliency.yaml` file.

3. Ensure the `payment` service is no longer running. If it is running, stop the service to simulate an error with the service in order to trigger the resiliency policy.

4. Make a request to the `register` endpoint of the registration service.

    > If you're using VS Code with the REST client you can use the [local-sync-test.http file](local-sync-test.http).

    ```bash
    curl --request POST \
    --url http://localhost:5501/register \
    --header 'content-type: application/json' \
    --data '{"name": "Stu Dent","email": "stu@dent.com","class": "digital media","cost": 500}'
    ```

    Expected response:

    ```txt
    INFO[XXXX] Error processing operation endpoint[payment, payment:pay]. Retrying in 5s…
    ```

5. Before the request times out, open a new terminal and navigate to the `payment` folder and start the payment service:

    ```bash
    dapr run --app-port 5501 --app-id registration --app-protocol http --dapr-http-port 3501 -- npm start
    ```

    Expected application log for the registration service:

    ```txt
    INFO[XXX] Recovered processing operation endpoint[payment, payment:pay]
    ```

    Now you know how to use resiliency policies to handle transient errors when doing synchronous messaging with Dapr.
