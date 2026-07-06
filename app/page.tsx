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
  { day: "Wed 6", date: "Jul 6", temp: 36.1, sys: 125, dia: 72, pulse: 95 },
];

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
  // ── New medications from July 3, 2026 visit ──
  {
    name: "Atorvastatin 40mg",
    generic: "Atorvastatin",
    qty: 1,
    unitPrice: 0, // price not provided
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Cholesterol management / secondary stroke prevention",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Citicholine 500mg",
    generic: "Citicoline",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Brain recovery / neuroprotection",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    name: "Vitamin C 500mg",
    generic: "Ascorbic Acid",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Antioxidant support (3 times daily)",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    name: "Neurovite Forte",
    generic: "B-Complex + others",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Nerve support",
    badge: "bg-green-100 text-green-700",
  },
  {
    name: "Vitamin E 1000 IU",
    generic: "Vitamin E",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Antioxidant / vascular support",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Dabigatran 110mg",
    generic: "Dabigatran",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Anticoagulant (stroke prevention)",
    badge: "bg-red-100 text-red-700",
  },
  {
    name: "Co-Diovan 40/10mg",
    generic: "Valsartan / Amlodipine",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Blood pressure control",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Cefixime 200mg",
    generic: "Cefixime",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Antibiotic (twice daily for 5 days)",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Azithromycin 500mg",
    generic: "Azithromycin",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "Antibiotic (once daily for 3 days)",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Grimesyts",
    generic: "Unknown / Brand specific",
    qty: 1,
    unitPrice: 0,
    total: 0,
    pharmacy: "Hospital Pharmacy",
    date: "Jul 3, 2026",
    purpose: "To be clarified with doctor",
    badge: "bg-slate-100 text-slate-700",
  },
];

const admissionExpenses = [
  // ... (unchanged - keeping original)
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

type TabSection = "vitals" | "meds" | "admission" | "imaging" | "profile";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"bp" | "temp" | "pulse">("bp");
  const [expandedMed, setExpandedMed] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
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

  const navItems: { id: TabSection; label: string }[] = [
    { id: "vitals", label: "Vitals" },
    { id: "meds", label: "Medications" },
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
            Physiotherapy ongoing · Check BP daily
          </p>
        </div>

        {/* VITALS SECTION */}
        {section === "vitals" && (
          <>
            {/* ... existing vitals code unchanged ... */}
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
                {/* Temperature and Pulse cards unchanged */}
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

            {/* Trend chart and table remain the same */}
            {/* (omitted for brevity - copy from your original code) */}
          </>
        )}

        {/* MEDICATIONS SECTION - UPDATED */}
        {section === "meds" && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                Current Medications (Updated Jul 3, 2026)
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
                        {m.total > 0 ? `₦${m.total.toLocaleString()}` : "—"}
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
                        <p className="text-slate-400 mb-0.5">Date Added</p>
                        <p className="font-semibold text-slate-700">{m.date}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-0.5">Pharmacy</p>
                        <p className="font-semibold text-slate-700">
                          {m.pharmacy}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs">
              <p className="font-medium text-blue-800 mb-2">Dosage Instructions (Jul 3 update):</p>
              <ul className="space-y-1 text-blue-700">
                <li>• <strong>Atorvastatin 40mg</strong> – Once nightly</li>
                <li>• <strong>Citicholine 500mg</strong> – Once daily</li>
                <li>• <strong>Vitamin C 500mg</strong> – Three times daily</li>
                <li>• <strong>Neurovite Forte</strong> – Once daily</li>
                <li>• <strong>Vitamin E 1000 IU</strong> – Once daily</li>
                <li>• <strong>Dabigatran 110mg</strong> – Once daily</li>
                <li>• <strong>Co-Diovan 40/10mg</strong> – Once daily</li>
                <li>• <strong>Cefixime 200mg</strong> – Twice daily × 5 days</li>
                <li>• <strong>Azithromycin 500mg</strong> – Once daily × 3 days</li>
                <li>• <strong>Grimesyts</strong> – As prescribed</li>
              </ul>
            </div>
          </>
        )}

        {/* Other sections (admission, imaging, profile) remain unchanged */}
        {/* Copy them from your original code if needed */}

        <p className="pt-2 text-xs text-center text-slate-400">
          For family monitoring purposes only · Always follow your doctor's
          advice · Updated with Jul 3, 2026 prescription
        </p>
      </div>
    </main>
  );
}