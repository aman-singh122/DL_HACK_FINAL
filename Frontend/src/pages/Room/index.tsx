import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

import axios from "../../lib/axios";

export default function Room() {
  const { appointmentId } = useParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `/appointments/${appointmentId}/token`
        );

        setToken(response.data.token);
      } catch (error) {
        console.error("Failed to fetch token", error);
      }
    };

    if (appointmentId) fetchToken();
  }, [appointmentId]);

  if (!token) {
    return <div>Loading consultation...</div>;
  }
  console.log("TOKEN VALUE:", token);
console.log("TOKEN TYPE:", typeof token);
console.log("LIVEKIT URL:", import.meta.env.VITE_LIVEKIT_URL);



  return (
    <LiveKitRoom
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
