# node-monitor-iota-mam
Node Monitor using IOTA MAM

# Config

Config file must contains:
 * destinationAddress
   * to send initial information and root MAM
 * host
   * Iota Node Host
 * port
   * Iota Node Port
 * id
   * Node ID
 * intervale
   * Interval in millis

# Run

* Nodejs

  * Build
  > npm install

  * Run
  > nodejs index.js

* Docker

  * Build
  > docker build -t node-monitor-iota-mam .

  * Run
  > docker run --name monitor -v /etc/hostname:/etc/hostname:ro -v $PWD/config.json:/opt/monitor/config.json -d node-monitor-iota-mam

# How to work

## First step
Monitor create a transaction to configured destination address to indicate ROOT MAM Address
## Second step
Every 30 seconds monitor will send statistics to ROOT MAM Address

# Example
 1. https://thetangle.org/transaction/PBUCHWQHGGWFHHRZKMOORXRZK9XHNAUFJXCHQBVCSRVUWYCLXPOB9FOZI9UIABMCOQLBEQJEVGAC99999
 2. https://mam.tangle.army/fetch?address=9GKWBZ9TGBKAYUEWPROACYWLYHEJSEGBQBUDMJHSAAOUKAQAFVXSARWQFN9PFLCWOYBWIRAVRHYTDRALB
