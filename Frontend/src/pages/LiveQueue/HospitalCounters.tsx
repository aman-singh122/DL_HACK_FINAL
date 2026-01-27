import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSocket } from "./queue.socket";

/* ================= TYPES ================= */

interface Counter {
  counterId: string;
  name: string;
  department: string;
  queueId: string;
  totalPatients: number;
}

interface QueuePayload {
  _id: string;
  queue: any[];
}

/* ================= COMPONENT ================= */

export default function HospitalCounters() {
  const navigate = useNavigate();
  const [counters, setCounters] = useState<Counter[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    // Dummy initial data (replace with API later)
    setCounters([
      {
        counterId: "1",
        name: "Counter 1",
        department: "General Medicine",
        queueId: "QUEUE_1",
        totalPatients: 8,
      },
      {
        counterId: "2",
        name: "Counter 2",
        department: "Orthopedics",
        queueId: "QUEUE_2",
        totalPatients: 18,
      },
      {
        counterId: "3",
        name: "Counter 3",
        department: "Emergency",
        queueId: "QUEUE_3",
        totalPatients: 32,
      },
    ]);

    queueSocket.connect();

    queueSocket.on("queue-update", (queue: QueuePayload) => {
      setCounters((prev) =>
        prev.map((c) =>
          c.queueId === queue._id
            ? { ...c, totalPatients: queue.queue.length }
            : c
        )
      );
    });

    return () => {
      queueSocket.disconnect();
    };
  }, []);

  /* ================= HELPERS ================= */

  const crowdColor = (count: number) => {
    if (count <= 10) return "bg-green-500";
    if (count <= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const crowdGradient = (count: number) => {
    if (count <= 10) return "from-green-400 to-green-600";
    if (count <= 25) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const crowdLabel = (count: number) => {
    if (count <= 10) return "Low Crowd";
    if (count <= 25) return "Medium Crowd";
    return "Heavy Crowd";
  };

  const loadPercent = (count: number) =>
    Math.min((count / 40) * 100, 100);

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Hospital OPD – Live Crowd Dashboard
        </h1>
        <p className="text-gray-500">
          Real-time OPD counter load & patient flow visualization
        </p>
      </div>

      {/* COUNTER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {counters.map((counter) => (
          <div
            key={counter.counterId}
            onClick={() =>
              navigate(`/live-queue/${counter.queueId}`)
            }
            className={`cursor-pointer rounded-2xl p-6 shadow-lg bg-gradient-to-br ${crowdGradient(
              counter.totalPatients
            )} text-white transition hover:scale-[1.03]`}
          >
            {/* TITLE */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {counter.name}
              </h2>
              <p className="text-sm opacity-90">
                {counter.department}
              </p>
            </div>

            {/* STATS */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm opacity-80">
                  Patients Waiting
                </p>
                <p className="text-4xl font-extrabold">
                  {counter.totalPatients}
                </p>
              </div>

              <span className="rounded-full bg-white/30 px-4 py-1 text-sm font-semibold">
                {crowdLabel(counter.totalPatients)}
              </span>
            </div>

            {/* LOAD BAR */}
            <div className="mt-4">
              <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                <div
                  className={`h-full ${crowdColor(
                    counter.totalPatients
                  )}`}
                  style={{
                    width: `${loadPercent(
                      counter.totalPatients
                    )}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-xs opacity-80">
                Counter Load
              </p>
            </div>

            {/* CTA */}
            <button className="mt-5 w-full rounded-lg bg-white text-black py-2 text-sm font-semibold hover:bg-gray-100">
              View Live Queue →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
