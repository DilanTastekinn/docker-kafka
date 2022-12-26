//console.log("consumer");
const Kafka = require("node-rdkafka");
const eventType = require("../eventType");

var consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

consumer.connect();

consumer
  .on("ready", () => {
    console.log("consumer ready..");
    consumer.subscribe(["test"]);
    consumer.consume();
  })
  .on("data", (data) => {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
  });
