# Mina Hub Server Assistant

<p align="center"> 
  <img src="https://mina.tools/assets/minahub-server.png" height="200">
</p>

⚠️ This is an early private stage of MinaHub, is not ready for usage.

## Getting started

Since this is a WIP, this will not work out of the box. MinaHub client doesn't connect directly to Mina-Hub-Server-Asistant, but instead uses Hasura as proxy.
Therefore you will need Hasura and set up the MHSA (this repo) as remote schema.

Hasura acts as central GraphQL API endpoint for the clients, as GQL schema for Mina Archive and uses MHSA as remote schema for the custom business logic and integration with the Mina blockchain.

### Set up a mina archive node

[https://minaprotocol.com/docs/archive-node](https://minaprotocol.com/docs/archive-node)

### Configure Hasura

`TODO instructions`

### Install the dependencies

`yarn`

### Run server:

`yarn start`

## Todos:

- License (License, disclaimers, non-affiliation with (O1)Labs)
- Improve the queries/mutations (connect the pieces together)
- Testing

# Disclaimer

By using this software you accept the terms and conditions. This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

MinaHub is not affiliated with [TODO]
