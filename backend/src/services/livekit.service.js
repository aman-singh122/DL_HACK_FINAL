import { AccessToken } from "livekit-server-sdk";
console.log("API KEY:", process.env.LIVEKIT_API_KEY);
console.log("API SECRET:", process.env.LIVEKIT_API_SECRET);


export const generateLiveKitToken = (roomName, identity) => {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return at.toJwt();
};
