import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "medisphere",
  brokers: ["localhost:9092"], // later cloud broker
});

export default kafka;
