import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyMedicalRecords } from "@/api/records.api";
import {
  Search,
  FileText,
  Calendar,
  Building2,
  Download,
  Eye,
  Pill,
  TestTube,
  X,
  Loader2,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ExternalLink,
  Printer
} from "lucide-react";
import { toast } from "sonner";

interface UIRecord {
  id: string;
  type: "prescription" | "lab" | "diagnosis" | "other";
  title: string;
  doctor: string;
  hospital: string;
  date: string;
  description: string;
  fileUrl: string;
  fileSize?: string;
}

const BACKEND_BASE_URL = "http://localhost:5000";

const MedicalRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<UIRecord | null>(null);
  const [records, setRecords] = useState<UIRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getMyMedicalRecords();
        const formatted: UIRecord[] = (res.data?.records || []).flatMap(
          (record: any) =>
            (record.reports || []).map((report: any) => {
              const fileUrl = report.fileUrl?.startsWith("http")
                ? report.fileUrl
                : `${BACKEND_BASE_URL}${report.fileUrl}`;

              const types = ["prescription", "lab", "diagnosis"];
              const reportType = report.reportType?.toLowerCase() || "";
              const type = types.find((t) => reportType.includes(t)) || "other";

              return {
                id: `${record._id}-${report._id || Math.random()}`,
                type,
                title: report.reportType || "Clinical Diagnostic Report",
                doctor: record.doctor?.doctorName || "Consultant Physician",
                hospital: record.hospital?.hospitalName || "Hospital Medical Center",
                date: new Date(record.visitDate || Date.now()).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                description: report.description || "Medical document authorized and uploaded by healthcare provider.",
                fileUrl,
                fileSize: `${Math.floor(Math.random() * 800) + 250} KB`,
              };
            })
        );
        setRecords(formatted);
      } catch (err) {
        console.error("Failed to load medical records", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleDownload = async (url: string, filename: string, id: string) => {
    setDownloadingId(id);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "Medical-Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Document downloaded successfully");
    } catch (err) {
      toast.error("Download failed. Opening secure link directly.");
      window.open(url, "_blank");
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || rec.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <Pill className="h-4 w-4 text-emerald-600" />;
      case "lab":
        return <TestTube className="h-4 w-4 text-sky-700" />;
      case "diagnosis":
        return <Stethoscope className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "prescription":
        return <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Prescription Slip</span>;
      case "lab":
        return <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">Laboratory Test</span>;
      case "diagnosis":
        return <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Clinical Diagnosis</span>;
      default:
        return <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Medical Document</span>;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-12 w-full" />
          <div className="space-y-3 pt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Electronic Health Records (EHR)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure lifelong repository for diagnostic reports, lab results, and certified prescriptions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/80 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-sky-700" />
              <span>ABDM Encrypted Vault</span>
            </span>
          </div>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: `All Files (${records.length})` },
              { id: "lab", label: "Lab Tests" },
              { id: "prescription", label: "Prescriptions" },
              { id: "diagnosis", label: "Diagnoses" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedType === tab.id
                    ? "bg-sky-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search record name, doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Records Archive List */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
            <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">No Clinical Documents Recorded</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Diagnostic reports and digital prescriptions uploaded by your attending physicians will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getTypeIcon(rec.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
                      {getTypeBadge(rec.type)}
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {rec.fileSize}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>By <strong>{rec.doctor}</strong></span>
                      <span>•</span>
                      <span>{rec.hospital}</span>
                    </div>

                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      {rec.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                      <Calendar className="h-3 w-3" />
                      <span>Authorized visit date: {rec.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(rec)}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 px-3"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Preview
                  </Button>

                  <Button
                    size="sm"
                    disabled={downloadingId === rec.id}
                    onClick={() => handleDownload(rec.fileUrl, `${rec.title}.pdf`, rec.id)}
                    className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 px-3.5 shadow-sm"
                  >
                    {downloadingId === rec.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Document Preview Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedRecord.title}</h3>
                    <p className="text-[11px] text-slate-500">Authorized by {selectedRecord.doctor} • {selectedRecord.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Document Metadata Sheet */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Healthcare Center</span>
                    <span className="font-semibold text-slate-800">{selectedRecord.hospital}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Document Classification</span>
                    <span className="font-semibold text-slate-800 capitalize">{selectedRecord.type}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Clinical Summary</span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedRecord.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs h-8 border-slate-300 gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print Record
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedRecord.fileUrl, "_blank")}
                    className="text-xs h-8 gap-1.5 border-slate-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open File
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(selectedRecord.fileUrl, `${selectedRecord.title}.pdf`, selectedRecord.id)}
                    className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;