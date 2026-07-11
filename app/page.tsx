"use client";

import { useState } from "react";
import {
  Heart,
  Thermometer,
  Activity,
  Pill,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Info,
  MapPin,
  Cross,
  Baby,
  FlaskConical,
  Syringe,
  FileText,
  Stethoscope,
  DollarSign,
  Hospital,
  Scan,
  Dumbbell,
  Clock,
  ShieldQuestion,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const vitals = [
  { day: "Sat 20", date: "Jun 20", temp: 36.4, sys: 123, dia: 70, pulse: 72 },
  { day: "Sun 21", date: "Jun 21", temp: 35.7, sys: 126, dia: 70, pulse: 61 },
  { day: "Mon 22", date: "Jun 22", temp: 36.0, sys: 132, dia: 79, pulse: 65 },
  { day: "Tue 23", date: "Jun 23", temp: 35.9, sys: 106, dia: 60, pulse: 71 },
  { day: "Wed 24", date: "Jun 24", temp: 35.8, sys: 131, dia: 74, pulse: 63 },
  { day: "Thu 25", date: "Jun 25", temp: 36.2, sys: 124, dia: 72, pulse: 68 },
  { day: "Fri 26", date: "Jun 26", temp: 36.2, sys: 137, dia: 95, pulse: 70 },
  { day: "Sat 27", date: "Jun 27", temp: 35.1, sys: 162, dia: 92, pulse: 73 },
  { day: "Sun 28", date: "Jun 28", temp: 36.1, sys: 130, dia: 83, pulse: 73 },
  { day: "Mon 29", date: "Jun 29", temp: 36.3, sys: 114, dia: 61, pulse: 73 },
  { day: "Tue 30", date: "Jun 30", temp: 36.5, sys: 124, dia: 73, pulse: 75 },
  { day: "Wed 1", date: "Jul 1", temp: 36.2, sys: 128, dia: 66, pulse: 68 },
  { day: "Thu 2", date: "Jul 2", temp: 35.9, sys: 127, dia: 78, pulse: 67 },
  { day: "Fri 3", date: "Jul 3", temp: 36.1, sys: 134, dia: 74, pulse: 71 },
  { day: "Mon 6", date: "Jul 6", temp: 36.1, sys: 125, dia: 72, pulse: 95 },
  { day: "Tue 7", date: "Jul 7", temp: 36.5, sys: 120, dia: 65, pulse: 81 },
  { day: "Wed 8", date: "Jul 8", temp: 35.5, sys: 134, dia: 72, pulse: 78 },
  { day: "Thu 9", date: "Jul 9", temp: 35.5, sys: 128, dia: 71, pulse: 87 },
  { day: "Fri 10", date: "Jul 10", temp: 36.5, sys: 159, dia: 91, pulse: 78 },
  {
    day: "Fri Eve 10",
    date: "Jul 10",
    temp: 36.5,
    sys: 104,
    dia: 59,
    pulse: 92,
  },
  {
    day: "Sat Mor 11",
    date: "Jul 11",
    temp: 36.5,
    sys: 137,
    dia: 80,
    pulse: 73,
  },
];

// Prescription written by the neurologist at the Friday Jul 3, 2026 hospital visit.
// status: "new" = not seen before, "continued" = was already being taken,
// "dose-changed" = same drug, dose/frequency updated, "unclear" = needs pharmacist confirmation.
const currentPrescription = [
  {
    name: "Atorvastatin 40mg",
    generic: "Atorvastatin",
    dose: "1 tablet",
    frequency: "Once daily — at night",
    duration: "Ongoing",
    purpose: "Lowers cholesterol and helps reduce the risk of another stroke",
    status: "continued",
  },
  {
    name: "Citicoline 500mg",
    generic: "Citicoline",
    dose: "1 tablet",
    frequency: "Once daily",
    duration: "Ongoing",
    purpose: "Supports brain cell recovery after the stroke",
    status: "continued",
  },
  {
    name: "Vitamin C 500mg",
    generic: "Ascorbic Acid",
    dose: "1 tablet",
    frequency: "Three times daily",
    duration: "Ongoing",
    purpose: "Antioxidant that supports the immune system",
    status: "dose-changed",
    note: "Frequency increased — was twice daily, now three times daily",
  },
  {
    name: "Neurovite Forte",
    generic: "B-Complex vitamins",
    dose: "1 capsule",
    frequency: "Once daily",
    duration: "Ongoing",
    purpose: "Nerve support / vitamin supplement",
    status: "continued",
  },
  {
    name: "Vitamin E 1000iu",
    generic: "Tocopherol",
    dose: "1 tablet",
    frequency: "Once daily",
    duration: "Ongoing",
    purpose: "Antioxidant that supports nerve and blood vessel health",
    status: "new",
  },
  {
    name: "Dabigatran 110mg",
    generic: "Dabigatran (Pradaxa)",
    dose: "1 tablet",
    frequency: "Once daily",
    duration: "Ongoing",
    purpose: "Prevents blood clots (anticoagulant)",
    status: "continued",
  },
  {
    name: "Co-Diovan 40/10mg",
    generic: "Valsartan / Amlodipine",
    dose: "1 tablet",
    frequency: "Once daily",
    duration: "Ongoing",
    purpose: "Blood pressure control (combination therapy)",
    status: "new",
    note: "Confirm with the doctor whether this replaces Cardiotan (Telmisartan/Amlodipine) or is taken alongside it — both are BP combination drugs, so double-dosing should be avoided.",
  },
  {
    name: "Cefixime 200mg",
    generic: "Cefixime",
    dose: "1 tablet",
    frequency: "Twice daily (BD)",
    duration: "5-day course",
    startDate: "Jul 3, 2026",
    endDate: "Jul 7, 2026",
    purpose: "Antibiotic — treats a bacterial infection",
    status: "new",
    courseStatus: "ongoing",
  },
  {
    name: "Azithromycin 500mg",
    generic: "Azithromycin",
    dose: "1 tablet",
    frequency: "Once daily",
    duration: "3-day course",
    startDate: "Jul 3, 2026",
    endDate: "Jul 5, 2026",
    purpose: "Antibiotic — treats a bacterial/respiratory infection",
    status: "new",
    courseStatus: "completed",
  },
  {
    name: "Grimesyts",
    generic: "Not identified",
    dose: "—",
    frequency: "—",
    duration: "—",
    purpose:
      "This name doesn't match a drug we can identify from the note. Please confirm the exact name and dose with the pharmacist or prescribing doctor before giving it.",
    status: "unclear",
  },
];

const statusStyles: Record<string, { label: string; classes: string }> = {
  new: { label: "New", classes: "bg-blue-100 text-blue-700" },
  continued: { label: "Continued", classes: "bg-slate-100 text-slate-600" },
  "dose-changed": {
    label: "Dose changed",
    classes: "bg-amber-100 text-amber-700",
  },
  unclear: { label: "Needs confirmation", classes: "bg-red-100 text-red-700" },
};

const dischargeMeds = [
  {
    name: "Cardiotan 40mg/10mg",
    generic: "Telmisartan / Amlodipine",
    qty: 2,
    unitPrice: 1900,
    total: 3800,
    pharmacy: "Medville Pharmacy",
    date: "Jul 6, 2026",
    purpose: "Blood pressure control",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Syschol 500mg Tab",
    generic: "Citicoline",
    qty: 2,
    unitPrice: 3500,
    total: 7000,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Brain recovery / neuroprotection",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    name: "Pradaxa 110mg",
    generic: "Dabigatran",
    qty: 2,
    unitPrice: 18500,
    total: 37000,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Blood clot prevention (anticoagulant)",
    badge: "bg-red-100 text-red-700",
  },
  {
    name: "Neurovite Forte Tab",
    generic: "B-Complex vitamins",
    qty: 2,
    unitPrice: 1850,
    total: 3700,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Nerve support / vitamin supplement",
    badge: "bg-green-100 text-green-700",
  },
  {
    name: "Astyfer Cap",
    generic: "Iron supplement",
    qty: 1,
    unitPrice: 2200,
    total: 2200,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Iron deficiency / blood support",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    name: "Teva 40mg Atorvastatin",
    generic: "Atorvastatin",
    qty: 1,
    unitPrice: 2400,
    total: 2400,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Cholesterol / stroke risk reduction",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Co-Codamol 30/500mg",
    generic: "Codeine + Paracetamol",
    qty: 1,
    unitPrice: 4500,
    total: 4500,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Pain relief",
    badge: "bg-slate-100 text-slate-700",
  },
  {
    name: "Flutex 20mg",
    generic: "Fluoxetine",
    qty: 2,
    unitPrice: 1600,
    total: 3200,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Post-stroke depression support",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    name: "Mason Vitamin C 500mg",
    generic: "Ascorbic Acid",
    qty: 14,
    unitPrice: 120,
    total: 1680,
    pharmacy: "Grace & Mercy Pharmacy",
    date: "Jun 19, 2026",
    purpose: "Immune support / antioxidant",
    badge: "bg-teal-100 text-teal-700",
  },
];

const admissionExpenses = [
  {
    category: "Injections & Infusions",
    icon: "syringe",
    color: "bg-red-50 border-red-100",
    badgeColor: "bg-red-100 text-red-700",
    items: [
      {
        name: "Meropenem 1G injection ×4 + Levofloxacin 500mg/100ml ×4",
        date: "Jun 12, 2026",
        amount: 44800,
        pharmacy: "Church House Medical — FMC",
      },
      {
        name: "Meronem 1G ×2 vials + Levofloxacin infusion ×2",
        date: "Jun 14, 2026",
        amount: 51400,
        pharmacy: "Church House Medical — FMC",
      },
      {
        name: "Zironem inj 1G (Meropenem) ×2 + Levofloxacin infusion ×2",
        date: "Jun 18, 2026",
        amount: 24700,
        pharmacy: "Divine Mercy Pharmacy",
      },
      {
        name: "Syschol-500 Citicoline tablets (1 sachet)",
        date: "Jun 13, 2026",
        amount: 4100,
        pharmacy: "Church House Medical — FMC",
      },
    ],
  },
  {
    category: "Medical Supplies",
    icon: "pill",
    color: "bg-blue-50 border-blue-100",
    badgeColor: "bg-blue-100 text-blue-700",
    items: [
      {
        name: "10ml syringes ×5 + 5ml syringes ×5",
        date: "Jun 12, 2026",
        amount: 800,
        pharmacy: "Church House Medical — FMC",
      },
      {
        name: "Water for injection ×3 + Urine bag + 2-way catheter size 18",
        date: "Jun 7, 2026",
        amount: 1950,
        pharmacy: "Church House Medical — FMC",
      },
      {
        name: "Adult diapers (Dr Brown, large) ×10",
        date: "Jun 18, 2026",
        amount: 10000,
        pharmacy: "Church House Medical — FMC",
      },
      {
        name: "Latex gloves ×1 pack",
        date: "Jun 18, 2026",
        amount: 5000,
        pharmacy: "Church House Medical — FMC",
      },
    ],
  },
  {
    category: "Diagnostics & Imaging",
    icon: "scan",
    color: "bg-purple-50 border-purple-100",
    badgeColor: "bg-purple-100 text-purple-700",
    items: [
      {
        name: "CT Brain scan + CT Film ×2 (Medserve)",
        date: "Jun 6, 2026",
        amount: 91400,
        pharmacy: "NSIA Umuahia Diagnostic Centre",
      },
      {
        name: "Chest X-Ray AP",
        date: "Jun 4, 2026",
        amount: 0,
        pharmacy: "NSIA Umuahia Diagnostic Centre",
        note: "Amount not on receipt",
      },
      {
        name: "Lab tests: FBC, ESR, Urinalysis, Biochemistry, Microscopy Urine",
        date: "Jun 3, 2026",
        amount: 13700,
        pharmacy: "Medserve / NSIA Umuahia",
      },
    ],
  },
  {
    category: "Physiotherapy",
    icon: "dumbbell",
    color: "bg-green-50 border-green-100",
    badgeColor: "bg-green-100 text-green-700",
    items: [
      {
        name: "5 sessions physiotherapy (Quickhealth Intelligence)",
        date: "Jun 2026",
        amount: 29000,
        pharmacy: "Quickhealth Intelligence Ltd.",
      },
      {
        name: "5 sessions physiotherapy (FMC — in-patient adult)",
        date: "Jun 16, 2026",
        amount: 15000,
        pharmacy: "Federal Medical Centre Umuahia",
      },
    ],
  },
];

const ctReport = {
  date: "03-06-2026",
  hospital: "Federal Medical Centre (Queen Elizabeth Hospital)",
  department: "Radiology Department",
  indication: "Ischemic stroke R/o Hemorrhagic stroke",
  technique:
    "Scanogram followed by 5mm non-contrast enhanced axial slices with sagittal, coronal reconstructions and 3D volume rendering taken from vertex to base of skull",
  scanogram: "Prominence of sulci and gyri noted",
  findings:
    "Cerebral hemispheres normal in density with normal grey-white matter differentiation. No midline shift. Cerebral fissures appear normal. Both lateral, third and fourth ventricles appear normal. Midbrain, medulla, pituitary gland, cerebellum, cerebellopontine angles, globes and orbit are normal. Mastoid air cells and basal skull foramina have normal densities.",
  keyFinding:
    "A hypodense, oval-shaped lesion with average 19.0 HU measuring 7.10 × 6.40mm is seen in the pons.",
  conclusion: ["Pontine infarct", "Senile atrophy"],
  radiologist:
    "Drs. Tuuma-Leele/Ogbuchi/Uhara/Ngwu/Udeagu (Consultant Radiologist)",
};

function bpStatus(sys: number, dia: number) {
  if (sys < 90 || dia < 60)
    return { label: "Low", color: "text-blue-600 bg-blue-50" };
  if (sys <= 120 && dia <= 80)
    return { label: "Normal", color: "text-green-600 bg-green-50" };
  if (sys <= 130 && dia <= 80)
    return { label: "Elevated", color: "text-yellow-600 bg-yellow-50" };
  if (sys <= 139 || dia <= 89)
    return { label: "High Stage 1", color: "text-orange-600 bg-orange-50" };
  return { label: "High Stage 2", color: "text-red-600 bg-red-50" };
}

function tempStatus(t: number) {
  if (t < 36.1) return { label: "Low", color: "text-blue-600" };
  if (t <= 37.2) return { label: "Normal", color: "text-green-600" };
  return { label: "Fever", color: "text-red-600" };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 text-sm bg-white border shadow-lg border-slate-200 rounded-xl">
        <p className="mb-1 font-semibold text-slate-700">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="text-xs">
            {p.name}: <span className="font-medium">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type TabSection =
  | "vitals"
  | "current"
  | "meds"
  | "admission"
  | "imaging"
  | "profile";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"bp" | "temp" | "pulse">("bp");
  const [expandedMed, setExpandedMed] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedRx, setExpandedRx] = useState<number | null>(null);
  const [section, setSection] = useState<TabSection>("vitals");
  const [ctExpanded, setCtExpanded] = useState(false);

  const latest = vitals[vitals.length - 1];
  const bp = bpStatus(latest.sys, latest.dia);
  const tp = tempStatus(latest.temp);

  const dischargeMedTotal = dischargeMeds.reduce((s, m) => s + m.total, 0);
  const admissionTotal = admissionExpenses
    .flatMap((c) => c.items)
    .reduce((s, i) => s + i.amount, 0);
  const grandTotal = dischargeMedTotal + admissionTotal;

  const newCount = currentPrescription.filter((m) => m.status === "new").length;
  const ongoingCourse = currentPrescription.filter(
    (m) => m.courseStatus === "ongoing",
  );

  const navItems: { id: TabSection; label: string }[] = [
    { id: "vitals", label: "Vitals" },
    { id: "current", label: "Current Prescription" },
    { id: "meds", label: "Discharge Meds" },
    { id: "admission", label: "Admission Costs" },
    { id: "imaging", label: "CT Scan Report" },
    { id: "profile", label: "Patient Profile" },
  ];

  return (
    <main className="min-h-screen pb-16 bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="max-w-3xl px-4 pt-5 pb-0 mx-auto">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl shrink-0">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                Recovery Tracker
              </p>
              <h1 className="text-xl font-bold leading-tight text-slate-900">
                Kalu Okeke Nwankwo
              </h1>
              <p className="text-xs text-slate-500">
                74y · Male · Post-stroke care · Discharged Fri Jun 20, 2026
              </p>
            </div>
          </div>
          {/* Nav tabs */}
          <div className="flex gap-1 pb-0 overflow-x-auto scrollbar-hide">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`text-xs font-medium px-3 py-2 rounded-t-lg whitespace-nowrap border-b-2 transition-colors ${section === n.id ? "border-blue-600 text-blue-600 bg-blue-50" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl px-4 py-5 mx-auto space-y-5">
        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Diagnosis: Pontine infarct</span> ·
            Stroke onset Jun 2, 2026 · Right-side paralysis + aphasia ·
            Physiotherapy ongoing · Check BP daily · Neurology review Fri Jul 3,
            2026 added {newCount} new medications
          </p>
        </div>

        {/* ─── VITALS SECTION ─── */}
        {section === "vitals" && (
          <>
            <section>
              <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase text-slate-400">
                Today — {latest.date}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white border rounded-2xl border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-50">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Blood Pressure
                    </span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">
                    {latest.sys}
                    <span className="text-sm font-normal text-slate-400">
                      /{latest.dia}
                    </span>
                  </p>
                  <p className="mb-2 text-xs text-slate-400">mmHg</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${bp.color}`}
                  >
                    {bp.label}
                  </span>
                </div>
                <div className="p-4 bg-white border rounded-2xl border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-50">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Temperature
                    </span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">
                    {latest.temp}
                    <span className="text-sm font-normal text-slate-400">
                      °C
                    </span>
                  </p>
                  <p className="mb-2 text-xs text-slate-400">body temp</p>
                  <span className={`text-xs font-medium ${tp.color}`}>
                    {tp.label}
                  </span>
                </div>
                <div className="p-4 bg-white border rounded-2xl border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-50">
                      <Activity className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Pulse
                    </span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">
                    {latest.pulse}
                    <span className="text-sm font-normal text-slate-400">
                      {" "}
                      bpm
                    </span>
                  </p>
                  <p className="mb-2 text-xs text-slate-400">beats/min</p>
                  <span className="text-xs font-medium text-green-600">
                    Normal
                  </span>
                </div>
              </div>
            </section>

            <section className="p-5 bg-white border rounded-2xl border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-800">
                  6-Day Trend
                </h2>
                <div className="flex gap-1">
                  {(["bp", "temp", "pulse"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === t ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      {t === "bp" ? "BP" : t === "temp" ? "Temp" : "Pulse"}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={vitals}
                  margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {activeTab === "bp" && (
                    <>
                      <ReferenceLine
                        y={130}
                        stroke="#fbbf24"
                        strokeDasharray="4 4"
                        strokeWidth={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="sys"
                        name="Systolic"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#ef4444" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="dia"
                        name="Diastolic"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#3b82f6" }}
                      />
                    </>
                  )}
                  {activeTab === "temp" && (
                    <>
                      <ReferenceLine
                        y={37.2}
                        stroke="#f97316"
                        strokeDasharray="4 4"
                        strokeWidth={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        name="Temp (°C)"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#f97316" }}
                      />
                    </>
                  )}
                  {activeTab === "pulse" && (
                    <>
                      <ReferenceLine
                        y={100}
                        stroke="#8b5cf6"
                        strokeDasharray="4 4"
                        strokeWidth={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="pulse"
                        name="Pulse (bpm)"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#8b5cf6" }}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section className="overflow-hidden bg-white border rounded-2xl border-slate-100">
              <div className="px-5 py-4 border-b border-slate-50">
                <h2 className="text-sm font-semibold text-slate-800">
                  Daily Vitals Log
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs tracking-wider uppercase bg-slate-50 text-slate-400">
                      <th className="px-5 py-3 font-medium text-left">Date</th>
                      <th className="px-4 py-3 font-medium text-center">
                        Temp °C
                      </th>
                      <th className="px-4 py-3 font-medium text-center">BP</th>
                      <th className="px-4 py-3 font-medium text-center">
                        Pulse
                      </th>
                      <th className="px-4 py-3 font-medium text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitals.map((v, i) => {
                      const s = bpStatus(v.sys, v.dia);
                      const isLatest = i === vitals.length - 1;
                      return (
                        <tr
                          key={v.day}
                          className={`border-t border-slate-50 ${isLatest ? "bg-blue-50/40" : "hover:bg-slate-50"}`}
                        >
                          <td className="px-5 py-3 font-medium text-slate-700">
                            {v.date}{" "}
                            {isLatest && (
                              <span className="text-xs font-normal text-blue-500">
                                (today)
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600">
                            {v.temp}
                          </td>
                          <td className="px-4 py-3 font-semibold text-center text-slate-800">
                            {v.sys}/{v.dia}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600">
                            {v.pulse}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.color}`}
                            >
                              {s.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ─── CURRENT PRESCRIPTION SECTION ─── */}
        {section === "current" && (
          <>
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-2xl">
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-900">
                    Neurology review — Friday, Jul 3, 2026
                  </p>
                  <p className="mt-1 text-xs text-blue-800">
                    {newCount} new medication{newCount !== 1 ? "s" : ""} added,
                    one dose adjusted. Two short antibiotic courses were started
                    —{" "}
                    {ongoingCourse.length > 0
                      ? `${ongoingCourse.map((m) => m.name.split(" ")[0]).join(", ")} still ongoing.`
                      : "both now completed."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {currentPrescription.map((m, i) => {
                const st = statusStyles[m.status];
                return (
                  <div
                    key={i}
                    className={`bg-white border rounded-2xl overflow-hidden ${expandedRx === i ? "border-slate-300" : "border-slate-100"}`}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3"
                      onClick={() => setExpandedRx(expandedRx === i ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 border rounded-xl shrink-0 ${m.status === "unclear" ? "bg-red-50 border-red-100" : "bg-slate-50 border-slate-100"}`}
                        >
                          {m.status === "unclear" ? (
                            <ShieldQuestion className="w-4 h-4 text-red-500" />
                          ) : (
                            <Pill className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {m.name}
                          </p>
                          <p className="text-xs text-slate-400">{m.generic}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${st.classes}`}
                        >
                          {st.label}
                        </span>
                        {expandedRx === i ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {expandedRx === i && (
                      <div className="px-5 pt-1 pb-4 space-y-3 text-xs border-t border-slate-50">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          <div>
                            <p className="text-slate-400 mb-0.5">Dose</p>
                            <p className="font-semibold text-slate-700">
                              {m.dose}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400 mb-0.5">Frequency</p>
                            <p className="font-semibold text-slate-700">
                              {m.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400 mb-0.5">Duration</p>
                            <p className="font-semibold text-slate-700">
                              {m.duration}
                            </p>
                          </div>
                        </div>
                        {m.startDate && (
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <p className="text-slate-600">
                              {m.startDate} → {m.endDate}
                              {m.courseStatus === "completed" && (
                                <span className="ml-2 font-medium text-green-600">
                                  Course completed
                                </span>
                              )}
                              {m.courseStatus === "ongoing" && (
                                <span className="ml-2 font-medium text-orange-600">
                                  Course ongoing
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-slate-400 mb-0.5">What it's for</p>
                          <p className="leading-relaxed text-slate-700">
                            {m.purpose}
                          </p>
                        </div>
                        {m.note && (
                          <div className="p-2 border border-amber-100 bg-amber-50 rounded-lg">
                            <p className="text-amber-800">{m.note}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="px-1 text-xs text-slate-400">
              This list is built from your notes, not the original prescription
              pad — please double-check doses against the doctor's script,
              especially for "Grimesyts" above.
            </p>
          </>
        )}

        {/* ─── MEDICATIONS SECTION ─── */}
        {section === "meds" && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                Discharge Medications
              </h2>
              <span className="px-3 py-1 text-xs font-medium bg-white border rounded-full text-slate-500 border-slate-200">
                ₦{dischargeMedTotal.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              {dischargeMeds.map((m, i) => (
                <div
                  key={i}
                  className={`bg-white border rounded-2xl overflow-hidden ${expandedMed === i ? "border-slate-300" : "border-slate-100"}`}
                >
                  <button
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                    onClick={() => setExpandedMed(expandedMed === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 border rounded-xl bg-slate-50 border-slate-100">
                        <Pill className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {m.name}
                        </p>
                        <p className="text-xs text-slate-400">{m.generic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700">
                        ₦{m.total.toLocaleString()}
                      </span>
                      {expandedMed === i ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                  {expandedMed === i && (
                    <div className="grid grid-cols-2 gap-3 px-5 pt-1 pb-4 text-xs border-t border-slate-50 sm:grid-cols-3">
                      <div>
                        <p className="text-slate-400 mb-0.5">Purpose</p>
                        <p className="font-medium text-slate-700">
                          {m.purpose}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-0.5">Quantity</p>
                        <p className="font-semibold text-slate-700">
                          {m.qty} unit{m.qty > 1 ? "s" : ""} × ₦
                          {m.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-0.5">Pharmacy</p>
                        <p className="font-semibold text-slate-700">
                          {m.pharmacy}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-0.5">Date</p>
                        <p className="font-semibold text-slate-700">{m.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── ADMISSION COSTS SECTION ─── */}
        {section === "admission" && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 text-center bg-white border rounded-2xl border-slate-100">
                <p className="mb-1 text-xs text-slate-400">Discharge meds</p>
                <p className="text-lg font-bold text-slate-800">
                  ₦{dischargeMedTotal.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center bg-white border rounded-2xl border-slate-100">
                <p className="mb-1 text-xs text-slate-400">Admission costs</p>
                <p className="text-lg font-bold text-slate-800">
                  ₦{admissionTotal.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center bg-blue-600 rounded-2xl">
                <p className="mb-1 text-xs text-blue-200">Grand total</p>
                <p className="text-lg font-bold text-white">
                  ₦{grandTotal.toLocaleString()}
                </p>
              </div>
            </div>

            {admissionExpenses.map((cat, ci) => {
              const catTotal = cat.items.reduce((s, i) => s + i.amount, 0);
              const IconComp =
                cat.icon === "syringe"
                  ? Syringe
                  : cat.icon === "scan"
                    ? Scan
                    : cat.icon === "dumbbell"
                      ? Dumbbell
                      : Pill;
              return (
                <div key={ci}>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border ${cat.color} ${expandedExp === ci ? "" : ""}`}
                    onClick={() =>
                      setExpandedExp(expandedExp === ci ? null : ci)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-semibold text-slate-800">
                        {cat.category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.badgeColor}`}
                      >
                        {cat.items.length} items
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800">
                        ₦{catTotal.toLocaleString()}
                      </span>
                      {expandedExp === ci ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                  {expandedExp === ci && (
                    <div className="pl-1 mt-1 space-y-1">
                      {cat.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="flex items-start justify-between gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium leading-snug text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {item.pharmacy} · {item.date}
                            </p>
                            {(item as any).note && (
                              <p className="text-xs text-amber-600 mt-0.5">
                                {(item as any).note}
                              </p>
                            )}
                          </div>
                          <p className="text-sm font-bold text-slate-800 whitespace-nowrap">
                            {item.amount > 0
                              ? `₦${item.amount.toLocaleString()}`
                              : "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ─── CT SCAN / IMAGING SECTION ─── */}
        {section === "imaging" && (
          <>
            {/* Key conclusion card */}
            <div className="p-4 border border-red-200 bg-red-50 rounded-2xl">
              <div className="flex items-start gap-3">
                <Scan className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1 text-sm font-bold text-red-800">
                    CT Scan Conclusion
                  </p>
                  {ctReport.conclusion.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-red-900">
                        {c}
                      </span>
                    </div>
                  ))}
                  <p className="mt-2 text-xs text-red-700">
                    Key finding: Hypodense oval lesion — 7.10 × 6.40mm — in the
                    pons
                  </p>
                </div>
              </div>
            </div>

            {/* Full report */}
            <div className="overflow-hidden bg-white border border-slate-100 rounded-2xl">
              <button
                className="flex items-center justify-between w-full px-5 py-4"
                onClick={() => setCtExpanded(!ctExpanded)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-800">
                    Full Radiology Report
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {ctReport.date}
                  </span>
                </div>
                {ctExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {ctExpanded && (
                <div className="px-5 pb-5 space-y-4 text-sm border-t border-slate-50">
                  <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-400">Hospital</p>
                      <p className="font-medium text-slate-700">
                        {ctReport.hospital}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Department</p>
                      <p className="font-medium text-slate-700">
                        {ctReport.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Indication</p>
                      <p className="font-medium text-slate-700">
                        {ctReport.indication}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Date</p>
                      <p className="font-medium text-slate-700">
                        {ctReport.date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-slate-400">
                      Scanogram finding
                    </p>
                    <p className="text-slate-700">{ctReport.scanogram}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-slate-400">
                      Non-contrast CT findings
                    </p>
                    <p className="leading-relaxed text-slate-700">
                      {ctReport.findings}
                    </p>
                  </div>
                  <div className="p-3 border border-red-100 bg-red-50 rounded-xl">
                    <p className="mb-1 text-xs font-semibold tracking-wider text-red-500 uppercase">
                      Key finding
                    </p>
                    <p className="font-medium text-red-800">
                      {ctReport.keyFinding}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-slate-400">Radiologist</p>
                    <p className="text-xs text-slate-700">
                      {ctReport.radiologist}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Other scans */}
            <div className="p-4 space-y-3 bg-white border border-slate-100 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-800">
                Other Imaging / Diagnostics
              </h3>
              {[
                {
                  label: "CT Brain (FMC — initial)",
                  date: "Jun 2–3, 2026",
                  note: "Neusoft system — FEDERAL MEDICAL CENTRE UMUAHIA",
                  ref: "P-202606032873",
                },
                {
                  label: "CT Brain (Medserve / NSIA)",
                  date: "Jun 6, 2026",
                  note: "₦91,400 · MRN: 146310",
                  ref: "Barcode: 100167909",
                },
                {
                  label: "Chest X-Ray (AP)",
                  date: "Jun 4, 2026",
                  note: "NSIA Umuahia Diagnostic Center · Ref #245774",
                  ref: "Kalu Nwankwo 74M",
                },
                {
                  label: "Lab tests: FBC, ESR, Urinalysis, Biochemistry Urine",
                  date: "Jun 3, 2026",
                  note: "₦13,700 · Medserve",
                  ref: "Barcode: 100167656",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-t border-slate-50 first:border-0 first:pt-0"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Scan className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {s.label}
                    </p>
                    <p className="text-xs text-slate-400">
                      {s.date} · {s.note}
                    </p>
                    <p className="text-xs text-slate-300">{s.ref}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── PATIENT PROFILE ─── */}
        {section === "profile" && (
          <>
            <div className="p-5 space-y-4 bg-white border rounded-2xl border-slate-100">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Full name</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Kalu Okeke Nwankwo
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Baby className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Children</p>
                    <p className="text-sm font-semibold text-slate-800">
                      5 children{" "}
                      <span className="font-normal text-slate-500">
                        (3 daughters, 2 sons)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cross className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Religion</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Christian
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Stroke onset</p>
                    <p className="text-sm font-semibold text-slate-800">
                      June 2, 2026 (~11:00am)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Presenting symptoms
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      Right-side paralysis · Speech difficulty (aphasia)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Referred from → to</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Madonna Hospital → FMC Umuahia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical history */}
            <div className="p-5 bg-white border rounded-2xl border-slate-100">
              <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase text-slate-400">
                Medical History Flags
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Non-smoker", ok: true },
                  { label: "Occasional drinker", ok: null },
                  { label: "No asthma", ok: true },
                  { label: "No ulcer", ok: true },
                  { label: "Previous malaria", ok: null },
                  { label: "Non-polygamous", ok: true },
                  { label: "Physiotherapy ongoing", ok: true },
                  { label: "Home BP monitoring", ok: true },
                ].map((f) => (
                  <span
                    key={f.label}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${f.ok === true ? "bg-green-50 text-green-700 border-green-100" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                  >
                    {f.ok === true ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Info className="w-3 h-3" />
                    )}
                    {f.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Discovery story */}
            <div className="p-4 border bg-slate-50 border-slate-100 rounded-2xl">
              <h2 className="mb-2 text-xs font-semibold tracking-widest uppercase text-slate-400">
                How It Was Discovered
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">
                On the morning of June 2nd, he came out of his room to the
                sitting room. His wife greeted him but received no response. She
                left and came back around 11am and greeted him again — that was
                when the family realized he could not speak and could not move
                his right side.
              </p>
            </div>

            {/* Care timeline */}
            <div className="p-5 bg-white border rounded-2xl border-slate-100">
              <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase text-slate-400">
                Care Timeline
              </h2>
              <div className="space-y-3">
                {[
                  {
                    date: "Jun 2",
                    label: "Stroke onset",
                    note: "Right paralysis + aphasia discovered ~11am",
                    color: "bg-red-500",
                  },
                  {
                    date: "Jun 2",
                    label: "Emergency admission — Madonna Hospital",
                    note: "Initial emergency care",
                    color: "bg-orange-400",
                  },
                  {
                    date: "Jun 2–3",
                    label: "Referred to FMC Umuahia",
                    note: "Federal Medical Centre — Queen Elizabeth Hospital",
                    color: "bg-blue-500",
                  },
                  {
                    date: "Jun 3",
                    label: "CT scan + lab tests",
                    note: "Pontine infarct confirmed · ₦13,700 labs",
                    color: "bg-purple-500",
                  },
                  {
                    date: "Jun 6",
                    label: "Repeat CT Brain (Medserve)",
                    note: "₦91,400 · Enhanced CT with 3D reconstruction",
                    color: "bg-purple-400",
                  },
                  {
                    date: "Jun 7–18",
                    label: "In-patient treatment",
                    note: "IV Meropenem + Levofloxacin · Physiotherapy starts",
                    color: "bg-teal-500",
                  },
                  {
                    date: "Jun 20",
                    label: "Discharged",
                    note: "Sent home with medications · Home BP monitoring begins",
                    color: "bg-green-500",
                  },
                  {
                    date: "Jun 24",
                    label: "Physiotherapy session",
                    note: "First post-discharge physio visit",
                    color: "bg-green-400",
                  },
                  {
                    date: "Jul 3",
                    label: "Neurology review",
                    note: "New medications and antibiotic courses prescribed",
                    color: "bg-blue-500",
                  },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${t.color} mt-2 shrink-0`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-slate-400">
                          {t.date}
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {t.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{t.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <p className="pt-2 text-xs text-center text-slate-400">
          For family monitoring purposes only · Always follow your doctor's
          advice
        </p>
      </div>
    </main>
  );
}
