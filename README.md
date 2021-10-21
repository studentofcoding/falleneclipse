# FRONTEND : Setting up Candy machine mint page

This Candy-Machine-Mint project is designed to be customable with React compoment, please read the documentation listed below to get the basic :
* [React official doc](https://reactjs.org/tutorial/tutorial.html)
* [React Codecamp tutorial](https://www.youtube.com/watch?v=nTeuhbP7wdE)

The project itself are consist of several js component that can be customized based on your needs
* Components folder that include Footer and Header
* Pages folder that inlcude faq, home, and roadmap.js
* Wallet.js to control the wallet details
* and others (candy-machine.js, and index.js in which we will keep it default)

### Prerequisites

* Ensure you have recent versions of both `node` and `yarn` installed.

* Follow the instructions [here](https://docs.solana.com/cli/install-solana-cli-tools) to install the Solana Command Line Toolkit.

* Follow the instructions [here](https://hackmd.io/@levicook/HJcDneEWF) to install the Metaplex Command Line Utility.
  * Installing the Command Line Package is currently an advanced task that will be simplified eventually.

### Installation

1. Fork the project, then clone down. Example:
```
git clone git@github.com:exiled-apes/name_of_project.git
```

2. Build the project. Example:
```
cd name_of_project && yarn install && yarn build
```

3. Define your environment variables using the instructions below, and start up the server with `npm start`.

#### Environment Variables

To run the project, first create a `.env` file at the root directory and define the following variables:

```
REACT_APP_CANDY_MACHINE_CONFIG="redacted"
```

This is a Solana account address. You can get the value for this from the `.cache/temp` file. This file is created when you run the `metaplex upload` command in terminal.

```
REACT_APP_CANDY_MACHINE_ID="redacted"
```

Same as above; this is a Solana account address. You can get the value for this from the `./cache/temp` file. This file is created when you run the `metaplex upload` command in terminal.

```
REACT_APP_CANDY_START_DATE=1630422000000
```

This is a unix time stamp that configures when your mint will be open.

```
REACT_APP_SOLANA_NETWORK=devnet
```

This identifies the Solana network you want to connect to. Options are `devnet`, `testnet`, and `mainnet`.

```
REACT_APP_SOLANA_RPC_HOST=https://explorer-api.devnet.solana.com
```

This identifies the RPC server your web app will access the Solana network through.

```
REACT_APP_TREASURY_ADDRESS="redacted"
```

This the Solana address that receives the funds gathered during the minting process. More docs coming as we can test this.

# BACKEND : Integrate with candy machine mint

* Pull and Install the repository from [this](https://github.com/metaplex-foundation/metaplex)
* Follow the guide and reference below

#### CANDY MACHINE TUTORIAL REFERENCE
* [levicook](https://hackmd.io/@levicook/HJcDneEWF)
* [Nicholas Oxford](https://dev.to/nicholasoxford/getting-started-with-metaplex-a-solana-nft-journey-pt-1-1jff)

```

Install and build

```
yarn install
yarn build
yarn run package:linuxb
OR
yarn run package:linux
OR
yarn run package:macos
```

You can now either use `metaplex` OR the `ts-node cli` to execute the following commands.

1. Upload your images and metadata. Refer to the NFT [standard](https://docs.metaplex.com/nft-standard) for the correct format.

```
metaplex upload ~/nft-test/mini_drop --keypair ~/.config/solana/id.json
ts-node cli upload ~/nft-test/mini_drop --keypair ~/.config/solana/id.json
```

2. Verify everything is uploaded. Rerun the first command until it is.

```
metaplex verify --keypair ~/.config/solana/id.json
ts-node cli verify --keypair ~/.config/solana/id.json
```

3. Create your candy machine. It can cost up to ~15 solana per 10,000 images.

```
metaplex create_candy_machine -k ~/.config/solana/id.json -p 1
ts-node cli create_candy_machine -k ~/.config/solana/id.json -p 3
```

4. Set the start date and update the price of your candy machine.

```
metaplex update_candy_machine -k ~/.config/solana/id.json -d "20 Apr 2021 04:20:00 GMT" -p 0.1
ts-node cli update_candy_machine -k ~/.config/solana/id.json -d "20 Apr 2021 04:20:00 GMT" -p 0.1
```

5. Test mint a token (provided it's after the start date)

```
metaplex mint_one_token -k ~/.config/solana/id.json
ts-node cli mint_one_token -k ~/.config/solana/id.json
```

6. Check if you received any tokens.

```
spl-token accounts
```

7. If you are listed as a creator, run this command to sign your NFTs post sale. This will sign only the latest candy machine that you've created (stored in .cache/candyMachineList.json).

```
metaplex sign_candy_machine_metadata -k ~/.config/solana/id.json
ts-node cli sign_candy_machine_metadata -k ~/.config/solana/id.json
```

8. If you wish to sign metadata from another candy machine run with the --cndy flag.

```
metaplex sign_candy_machine_metadata -k ~/.config/solana/id.json --cndy CANDY_MACHINE_ADDRESS_HERE
ts-node cli sign_candy_machine_metadata -k ~/.config/solana/id.json --cndy CANDY_MACHINE_ADDRESS_HERE
```

