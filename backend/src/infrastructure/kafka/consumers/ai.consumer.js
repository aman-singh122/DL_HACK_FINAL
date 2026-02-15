import { kafkaConsumer } from "../kafka.client.js";
import redis from "../../cache/redis.client.js";

export const startAIConsumer = async () => {
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topic: "health-events",
    fromBeginning: false,
  });

  await kafkaConsumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      console.log("📥 Event received:", event.type);

      // Example: increment monthly counter in Redis
      if (event.type === "APPOINTMENT_BOOKED") {
        const key = `user:${event.userId}:appointments`;
        await redisClient.incr(key);
      }

      if (event.type === "TRIAGE_COMPLETED") {
        const key = `user:${event.userId}:triage_count`;
        await redisClient.incr(key);
      }
    },
  });
};
