import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "medisphere",
  brokers: ["localhost:9092"], // change later if cloud
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: "medisphere-group" });

export default kafka;
