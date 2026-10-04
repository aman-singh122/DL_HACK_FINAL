import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "../../lib/axios";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Video, 
  Clock, 
  Lock, 
  AlertCircle,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Room() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/appointments/${appointmentId}/token`
        );
        setToken(response.data.token);
      } catch (err: any) {
        console.error("Failed to fetch LiveKit token", err);
        setError(err.response?.data?.message || "Failed to initialize secure telehealth room.");
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) fetchToken();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white font-sans p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
          <Video className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Connecting Secure Telehealth Suite</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Establishing 256-bit encrypted WebRTC peer connection with hospital video gateway...
          </p>
        </div>
        <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white font-sans p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Telehealth Connection Error</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {error || "Unable to acquire consultation room credentials. Please verify your appointment status."}
          </p>
        </div>
        <Button
          onClick={() => navigate("/appointments")}
          className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-5"
        >
          Return to Appointments
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950 text-white font-sans overflow-hidden">
      {/* Telehealth Top Navigation Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/appointments/${appointmentId}`)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs h-8 px-2 gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit Session</span>
          </Button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center">
              <Stethoscope className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block leading-none">
                Clinical Tele-Consultation Suite
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Session Ref: #{appointmentId?.slice(-6).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-emerald-400">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span>End-to-End Encrypted (AES-256)</span>
          </div>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => navigate(`/appointments/${appointmentId}`)}
            className="text-xs h-8 px-3.5"
          >
            Leave Consultation
          </Button>
        </div>
      </header>

      {/* LiveKit Conference Container */}
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        <LiveKitRoom
          token={token}
          serverUrl={import.meta.env.VITE_LIVEKIT_URL}
          connect={true}
          video={true}
          audio={true}
          data-lk-theme="default"
          style={{ height: "100%", width: "100%" }}
        >
          <VideoConference />
        </LiveKitRoom>
      </div>
    </div>
  );
}
