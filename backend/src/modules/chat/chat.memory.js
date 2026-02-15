import redis from "../../infrastructure/cache/redis.client.js";

const MAX_HISTORY = 10;

export const saveMessage = async (userId, role, content) => {
  const key = `chat:${userId}`;

  const message = JSON.stringify({
    role,
    content,
  });

  await redis.rpush(key, message);
  await redis.ltrim(key, -MAX_HISTORY, -1);
};

export const getChatHistory = async (userId) => {
  const key = `chat:${userId}`;
  const messages = await redis.lrange(key, 0, -1);

  return messages
    .map((msg) => {
      try {
        return JSON.parse(msg);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
};

