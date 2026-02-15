import { kafkaProducer } from "../kafka.client.js";

export const produceAIEvent = async (event) => {
  try {
    await kafkaProducer.send({
      topic: "health-events",
      messages: [
        {
          value: JSON.stringify(event),
        },
      ],
    });

    console.log("📤 Event sent:", event.type);
  } catch (error) {
    console.error("Kafka Producer Error:", error);
  }
};
