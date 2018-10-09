const MAM = require('./lib/mam.client.js');
const IOTA = require('iota.lib.js');
var osutils = require('os-utils');

var config = require('./config.json');

const iotaClient = new IOTA({
    host: config.host,
    port: config.port
})

// Initialise MAM State
let mamState = MAM.init(iotaClient);

let root = MAM.getRoot(mamState);

//send root to address
const msg = iotaClient.utils.toTrytes(JSON.stringify({"ts": new Date().getTime(), "root": root, "id": config.id}))
const transfers = [
  {
    value: 0,
    address: config.destinationAddress,
    message: msg,
    tag: "999IOTA99ITALIA99FULLNODE99"
  }
]
const randomSeed = "CFBJPOZBJXJOYCCMBIJLETCEUOLYWGSZKNQXDRCKB9WNRRFTUNVSAMKBZCUNLOUJKTCABJGYS9KHPITSK";

iotaClient.api.sendTransfer(randomSeed, 3, 14, transfers, (error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log("root information sended! TX", success[0].hash)
  }
})

// Publish to tangle
// Create MAM Payload - STRING OF TRYTES
const publish = async packet => {
	console.log("Publishing into MAM. Message:", "'" + packet + "'");

	const trytes = iotaClient.utils.toTrytes(packet)
    const message = MAM.create(mamState, trytes)
    mamState = message.state
    //console.log('State: ', JSON.stringify(mamState))

    console.log('Root: ', root)
    console.log('Address: ', message.address)

    // Attach the payload.
    await MAM.attach(message.payload, message.address)
}

/************** MAIN *****************/
const execute = function() {
    // Publish
	setInterval(function() {
    osutils.cpuUsage(function(v) {
      var payload = {
          "ts": new Date().getTime(),
          "platform" : osutils.platform(),
          "uptime": osutils.sysUptime() / 60000,
          "cpu": {
            "count": osutils.cpuCount(),
            "usage": v
          },
          "load": {
            "avg1": osutils.loadavg(1),
            "avg5": osutils.loadavg(5),
            "avg15": osutils.loadavg(15)
          },
          "memory": {
            "total": osutils.totalmem(),
            "free": osutils.freemem(),
          }
     }

		publish(JSON.stringify(payload));
  });

	}, 30000);
};

console.log("Executing destinationAddress " + config.destinationAddress);
execute();
