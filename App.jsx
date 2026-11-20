```react
import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Plus,
  Search,
  Car,
  Phone,
  ShieldAlert,
  Navigation,
  Trash2,
  X,
  Sun,
  Moon,
  RotateCcw,
  FileText,
  DollarSign,
  Cpu,
  ChevronRight,
  CheckSquare,
  Square,
  Calendar,
  Sparkles,
  CircuitBoard,
  Zap,
  Activity
} from 'lucide-react';

// Initial realistic mobile mechanic job dataset
const INITIAL_JOBS = [
  {
    id: 'JOB-1042',
    customer: 'Marcus Vance',
    phone: '(313) 555-0194',
    vehicle: '2019 Ford F-150 XLT 5.0L V8',
    vin: '1FTEW1E58KFA49201',
    location: '27410 Michigan Ave, Inkster, MI',
    distanceMiles: 3.2,
    driveMinutes: 8,
    scheduledTime: '08:30 AM',
    status: 'Repairing',
    priority: 'High',
    issue: 'No-start condition, clicking starter & low cranking voltage',
    baseMinutes: 90,
    etaOffsetMinutes: 0,
    dtcCodes: ['P0562', 'P0615'],
    invoiceStatus: 'Approved',
    laborRate: 125,
    notes: 'Battery tested at 11.4V under load. Replaced starter motor and cleaned ground strap on frame rail.',
    checklist: [
      { id: 'c1', text: 'Load test AGM battery & alternator output', done: true },
      { id: 'c2', text: 'Inspect starter relay & voltage drop across cable', done: true },
      { id: 'c3', text: 'Remove & replace starter assembly', done: true },
      { id: 'c4', text: 'Clear DTCs & verify hot restart', done: false }
    ],
    parts: [
      { id: 'p1', name: 'Remanufactured Starter Motor', sku: 'STR-8841', price: 189.0, status: 'Installed' },
      { id: 'p2', name: 'Heavy Duty Ground Strap', sku: 'GND-12', price: 24.5, status: 'Installed' }
    ]
  },
  {
    id: 'JOB-1043',
    customer: 'Elena Rostova',
    phone: '(734) 555-0148',
    vehicle: '2018 Honda Accord EX-L 1.5T',
    vin: '1HGCV1F54JA082914',
    location: '1420 S Inkster Rd, Inkster, MI',
    distanceMiles: 4.8,
    driveMinutes: 12,
    scheduledTime: '10:30 AM',
    status: 'Diagnosing',
    priority: 'Urgent',
    issue: 'Rough idle, misfire under boost & fuel smell in cabin',
    baseMinutes: 120,
    etaOffsetMinutes: 15,
    dtcCodes: ['P0300', 'P0302', 'P0172'],
    invoiceStatus: 'Quote Sent',
    laborRate: 125,
    notes: 'Checking high-pressure fuel injectors—known TSB/recall overlap on 1.5T engines.',
    checklist: [
      { id: 'c1', text: 'Scan Mode 06 misfire counters per cylinder', done: true },
      { id: 'c2', text: 'Inspect spark plugs & ignition coil boots', done: true },
      { id: 'c3', text: 'Perform fuel rail pressure leak-down test', done: false },
      { id: 'c4', text: 'Verify open NHTSA fuel pump recall eligibility', done: false }
    ],
    parts: [
      { id: 'p1', name: 'NGK Laser Iridium Spark Plugs (Set of 4)', sku: 'NGK-95660', price: 76.0, status: 'On Van' }
    ]
  },
  {
    id: 'JOB-1044',
    customer: 'Midwest Courier Fleet #09',
    phone: '(313) 555-0822',
    vehicle: '2020 Ram ProMaster 2500 3.6L',
    vin: '3C6TRVDG2LE114820',
    location: '29150 Annapolis St, Westland, MI',
    distanceMiles: 6.4,
    driveMinutes: 15,
    scheduledTime: '01:15 PM',
    status: 'Waiting on Parts',
    priority: 'Medium',
    issue: 'Front brake pads metal-on-metal & seized caliper slide pin',
    baseMinutes: 105,
    etaOffsetMinutes: 0,
    dtcCodes: [],
    invoiceStatus: 'Approved',
    laborRate: 135,
    notes: 'Commercial fleet account. Local hub delivering heavy-duty rotors at 1:00 PM.',
    checklist: [
      { id: 'c1', text: 'Lift front axle & remove wheels', done: true },
      { id: 'c2', text: 'Compress pistons & service bracket slide pins', done: false },
      { id: 'c3', text: 'Install HD rotors & ceramic fleet pads', done: false },
      { id: 'c4', text: 'Torque lug nuts to 140 ft-lbs & bed brakes', done: false }
    ],
    parts: [
      { id: 'p1', name: 'Severe Duty Front Brake Pad Set', sku: 'BPD-2500HD', price: 94.0, status: 'In Transit' },
      { id: 'p2', name: 'Coated Vented Front Rotors (Pair)', sku: 'ROT-9910', price: 168.0, status: 'In Transit' }
    ]
  },
  {
    id: 'JOB-1045',
    customer: 'Devon Brooks',
    phone: '(313) 555-0371',
    vehicle: '2017 Chevrolet Silverado 1500 5.3L',
    vin: '3GCUKREC9HG339102',
    location: '3100 Beech Daly Rd, Dearborn Heights, MI',
    distanceMiles: 5.1,
    driveMinutes: 11,
    scheduledTime: '03:30 PM',
    status: 'En Route',
    priority: 'Low',
    issue: 'AC blowing warm air & serpentine belt squeal on cold start',
    baseMinutes: 75,
    etaOffsetMinutes: 0,
    dtcCodes: ['B0163'],
    invoiceStatus: 'Quote Sent',
    laborRate: 125,
    notes: 'Bring R-134a manifold gauges, UV dye kit, and tensioner assembly.',
    checklist: [
      { id: 'c1', text: 'Inspect belt tensioner & idler pulley bearings', done: false },
      { id: 'c2', text: 'Check static & operating refrigerant pressures', done: false },
      { id: 'c3', text: 'Evacuate, vacuum test & recharge R-134a system', done: false }
    ],
    parts: [
      { id: 'p1', name: 'Drive Belt & Tensioner Kit', sku: 'GAT-90K392', price: 112.0, status: 'On Van' }
    ]
  }
];

// NHTSA-style Recall & TSB Reference Database
const RECALL_DATABASE = [
  {
    id: 'NHTSA-23V858',
    make: 'Honda',
    model: 'Accord / Civic / CR-V',
    years: '2017–2020',
    vinPrefix: '1HG',
    component: 'Fuel System, Gasoline: Delivery: Fuel Pump',
    severity: 'Critical',
    summary: 'Low-pressure fuel pump impeller may deform and cause fuel pump failure, resulting in engine stall while driving.',
    remedy: 'Inspect fuel pump module serial number and replace impeller/pump assembly free of charge at dealer or log for fleet warranty.'
  },
  {
    id: 'NHTSA-21V537',
    make: 'Ford',
    model: 'F-150 (5.0L / 3.5L)',
    years: '2018–2020',
    vinPrefix: '1FT',
    component: 'Electrical System: Starter / Battery Cable Routing',
    severity: 'High',
    summary: 'Positive battery cable insulation may chafe against front frame bracket, causing intermittent no-crank or thermal event.',
    remedy: 'Inspect B+ starter cable routing, install protective conduit sleeve, and torque starter terminal nut to 18 Nm.'
  },
  {
    id: 'NHTSA-22V764',
    make: 'Ram',
    model: 'ProMaster 1500 / 2500 / 3500',
    years: '2019–2021',
    vinPrefix: '3C6',
    component: 'Service Brakes, Hydraulic: Antilock / Traction Control',
    severity: 'Medium',
    summary: 'ABS hydraulic control unit valve may stick during rapid braking events, increasing stopping distance.',
    remedy: 'Perform ABS module bleed procedure and verify HCU part batch code.'
  },
  {
    id: 'NHTSA-20V314',
    make: 'Chevrolet',
    model: 'Silverado 1500 / Tahoe',
    years: '2015–2018',
    vinPrefix: '3GC',
    component: 'Service Brakes, Hydraulic: Power Assist: Vacuum Pump',
    severity: 'High',
    summary: 'Engine-driven vacuum pump output may degrade over time, requiring increased brake pedal effort at low speeds.',
    remedy: 'Reprogram EBCM with updated hydraulic brake boost calibration and test vacuum pump pull.'
  },
  {
    id: 'NHTSA-24V112',
    make: 'Toyota',
    model: 'Camry / RAV4 Hybrid',
    years: '2020–2023',
    vinPrefix: '4T1',
    component: 'Air Bags: Frontal: Sensor / Occupant Classification',
    severity: 'Critical',
    summary: 'OCS sensor solder joint may crack, preventing front passenger airbag deployment in a crash.',
    remedy: 'Inspect OCS sensor lot number and replace front passenger seat weight sensors if affected.'
  }
];

// Interactive Wiring Schematics & Connector Pinout Reference Data
const SCHEMATIC_SYSTEMS = [
  {
    id: 'SCH-F150-START',
    title: 'Starter & Cranking Circuit (5.0L Coyote)',
    vehicleMatch: '2018–2020 Ford F-150',
    relatedJobId: 'JOB-1042',
    systemTag: 'Starting / Charging',
    connectorName: 'C197B Starter Solenoid & BJB Relay',
    voltageSpec: '12.6V Static / ≥10.5V Cranking',
    liveSignalLabel: 'S-Terminal Crank Trigger Active (12.1V)',
    nodes: [
      { id: 'bat', label: 'AGM Battery (12.6V)', x: 60, y: 70, color: '#10b981', detail: 'Hot at all times • 760 CCA' },
      { id: 'bjb', label: 'BJB Mega Fuse (250A)', x: 240, y: 70, color: '#f59e0b', detail: 'Battery Junction Box • <0.1V drop max' },
      { id: 'rel', label: 'Starter Relay #42', x: 430, y: 70, color: '#38bdf8', detail: 'PCM Ground-Controlled Coil (Pin 85/86)' },
      { id: 'sol', label: 'Starter Solenoid (C197B)', x: 430, y: 205, color: '#f43f5e', detail: 'Pin 1 S-Term (YE-VT) • B+ Stud (RD)' },
      { id: 'gnd', label: 'Frame Ground G102', x: 150, y: 205, color: '#a855f7', detail: 'Engine Block to RH Frame Rail • <0.2Ω' }
    ],
    wires: [
      { from: 'bat', to: 'bjb', color: '#ef4444', gauge: '2 AWG RD', live: true },
      { from: 'bjb', to: 'rel', color: '#f59e0b', gauge: '12 AWG RD-BN', live: true },
      { from: 'rel', to: 'sol', color: '#38bdf8', gauge: '14 AWG YE-VT (Crank)', live: true },
      { from: 'sol', to: 'gnd', color: '#a855f7', gauge: '2 AWG BK-GY (GND)', live: false }
    ],
    pinouts: [
      { pin: 'Pin 1 (S-Term)', wireColor: 'YE-VT', circuit: 'Starter Solenoid Control', expected: '0V Key-On / 11.8–12.4V Crank', status: 'Test Point' },
      { pin: 'B+ Stud (M8)', wireColor: 'RD (2 AWG)', circuit: 'Battery Main Feed', expected: '12.4–12.7V Constant', status: 'Hot Always' },
      { pin: 'Relay Pin 85', wireColor: 'GN-OG', circuit: 'PCM Starter Relay Control', expected: 'Ground (<0.2V) When Cranking', status: 'PCM Logic' },
      { pin: 'Case / G102', wireColor: 'BK-GY', circuit: 'Engine-to-Chassis Ground', expected: '<0.2V Voltage Drop Under Load', status: 'Ground' }
    ]
  },
  {
    id: 'SCH-ACCORD-FUEL',
    title: 'High-Pressure Fuel & Injector Driver (1.5T)',
    vehicleMatch: '2018–2021 Honda Accord 1.5T',
    relatedJobId: 'JOB-1043',
    systemTag: 'Fuel / Direct Injection',
    connectorName: 'PCM Connector A (49-Pin) & GDI Rail',
    voltageSpec: '65V Boosted Peak / 12V Hold',
    liveSignalLabel: 'PWM Duty Cycle 14.2% @ Idle (740 RPM)',
    nodes: [
      { id: 'fuse', label: 'IG1 Fuel Fuse #14 (15A)', x: 60, y: 70, color: '#f59e0b', detail: 'Under-Hood Fuse Box • Key-On Power' },
      { id: 'pcm', label: 'PCM Boost Driver IC', x: 250, y: 70, color: '#38bdf8', detail: '65V Capacitor Boost Circuit' },
      { id: 'inj2', label: 'Cyl #2 GDI Injector', x: 440, y: 70, color: '#f43f5e', detail: 'Coil Resistance: 1.1–1.4Ω @ 68°F' },
      { id: 'frp', label: 'Fuel Rail Pressure Sensor', x: 250, y: 205, color: '#10b981', detail: '5V Ref • Signal 1.45V @ 725 PSI' },
      { id: 'lp', label: 'In-Tank LP Pump', x: 60, y: 205, color: '#a855f7', detail: '58 PSI Supply • Recall 23V858 Check' }
    ],
    wires: [
      { from: 'fuse', to: 'pcm', color: '#f59e0b', gauge: '18 AWG YEL/BLK', live: true },
      { from: 'pcm', to: 'inj2', color: '#38bdf8', gauge: '18 AWG BLU (HSD+)', live: true },
      { from: 'pcm', to: 'frp', color: '#10b981', gauge: '20 AWG GRN (5V SIG)', live: true },
      { from: 'lp', to: 'frp', color: '#a855f7', gauge: 'Fuel Line 58 PSI', live: false }
    ],
    pinouts: [
      { pin: 'A14 (INJ2+)', wireColor: 'BLU', circuit: 'Injector #2 High-Side Boost', expected: '65V Peak Pulse (Scope)', status: 'High Voltage' },
      { pin: 'A15 (INJ2-)', wireColor: 'BRN/WHT', circuit: 'Injector #2 Low-Side Control', expected: '12V Hold / PWM Ground', status: 'PCM Switch' },
      { pin: 'B22 (FRP SIG)', wireColor: 'GRN', circuit: 'Rail Pressure Sensor Output', expected: '1.4V Idle / 3.8V WOT', status: '5V Analog' },
      { pin: 'C04 (VCC)', wireColor: 'YEL/RED', circuit: 'Sensor 5V Reference', expected: '4.95–5.05V Regulated', status: 'Reference' }
    ]
  },
  {
    id: 'SCH-SILVERADO-AC',
    title: 'A/C Compressor Clutch & Pressure Transducer',
    vehicleMatch: '2014–2018 Chevy Silverado 5.3L',
    relatedJobId: 'JOB-1045',
    systemTag: 'HVAC / Electrical',
    connectorName: 'X105 A/C Compressor & E38 ECM',
    voltageSpec: '12.6V Clutch Engage / 5V Sensor',
    liveSignalLabel: 'High-Side Pressure: 148 PSI (1.82V)',
    nodes: [
      { id: 'acfuse', label: 'A/C Clutch Fuse #28 (10A)', x: 60, y: 70, color: '#f59e0b', detail: 'Underhood Electrical Center' },
      { id: 'acrel', label: 'A/C Clutch Relay', x: 250, y: 70, color: '#38bdf8', detail: 'ECM Pin X1-43 Ground Control' },
      { id: 'clutch', label: 'Compressor Clutch Coil', x: 440, y: 70, color: '#10b981', detail: '3.4–4.1Ω Resistance • Diode Protected' },
      { id: 'acp', label: 'A/C Pressure Sensor', x: 250, y: 205, color: '#f43f5e', detail: '3-Wire Transducer on Liquid Line' }
    ],
    wires: [
      { from: 'acfuse', to: 'acrel', color: '#f59e0b', gauge: '18 AWG RD/WH', live: true },
      { from: 'acrel', to: 'clutch', color: '#10b981', gauge: '18 AWG DK-GN', live: true },
      { from: 'acrel', to: 'acp', color: '#38bdf8', gauge: '20 AWG GY (5V REF)', live: true }
    ],
    pinouts: [
      { pin: 'X105 Pin A', wireColor: 'DK-GN', circuit: 'A/C Clutch Supply Voltage', expected: '12.4–14.2V When Commanded', status: 'Power' },
      { pin: 'X105 Pin B', wireColor: 'BK', circuit: 'Compressor Ground G104', expected: '<0.1V Drop to Battery Neg', status: 'Ground' },
      { pin: 'ACP Pin 2', wireColor: 'RD/BK', circuit: 'A/C Refrigerant Pressure Sig', expected: '0.5V (0 PSI) – 4.5V (425 PSI)', status: '5V Sensor' }
    ]
  }
];

const STATUS_STYLES = {
  'En Route': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  'Diagnosing': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Waiting on Parts': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Repairing': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Completed': 'bg-slate-500/20 text-slate-300 border-slate-500/40'
};

const PRIORITY_STYLES = {
  Urgent: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  High: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Low: 'bg-slate-500/15 text-slate-400 border-slate-500/30'
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'schematics' | 'recalls' | 'route'
  const [selectedSchematicId, setSelectedSchematicId] = useState(SCHEMATIC_SYSTEMS[0].id);
  const [activeNodeId, setActiveNodeId] = useState('sol');
  const [liveTraceActive, setLiveTraceActive] = useState(true);
  const [intakeLinkCopied, setIntakeLinkCopied] = useState(false);
  const [customerSheet, setCustomerSheet] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    vin: '',
    location: '',
    parkingNotes: '',
    priority: 'High',
    issue: ''
  });
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('torqeano_jobs_v1');
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [selectedJobId, setSelectedJobId] = useState('JOB-1042');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recallSearch, setRecallSearch] = useState('');
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    vin: '',
    location: '',
    priority: 'High',
    issue: '',
    baseMinutes: 90,
    scheduledTime: '04:45 PM'
  });

  // New Part & DTC Input States
  const [newDtc, setNewDtc] = useState('');
  const [newPartName, setNewPartName] = useState('');
  const [newPartPrice, setNewPartPrice] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('torqeano_jobs_v1', JSON.stringify(jobs));
    } catch {
      // Ignore storage quota errors
    }
  }, [jobs]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) || jobs[0] || null,
    [jobs, selectedJobId]
  );

  // Calculate dynamic completion percentage and remaining ETA minutes
  const getJobMetrics = (job) => {
    const totalTasks = job.checklist.length || 1;
    const completedTasks = job.checklist.filter((c) => c.done).length;
    const progress = job.status === 'Completed' ? 100 : Math.round((completedTasks / totalTasks) * 100);

    const totalEstimated = Math.max(15, job.baseMinutes + (job.etaOffsetMinutes || 0));
    const remainingMinutes =
      job.status === 'Completed'
        ? 0
        : Math.max(10, Math.round(totalEstimated * (1 - progress / 100)));

    // Compute clock ETA from current time
    const etaDate = new Date(Date.now() + remainingMinutes * 60000);
    const etaClock = etaDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const partsTotal = job.parts.reduce((acc, p) => acc + Number(p.price || 0), 0);
    const laborHours = +(totalEstimated / 60).toFixed(2);
    const laborTotal = +(laborHours * (job.laborRate || 125)).toFixed(2);
    const grandTotal = +(partsTotal + laborTotal).toFixed(2);

    return { progress, remainingMinutes, etaClock, partsTotal, laborTotal, grandTotal, totalEstimated };
  };

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.customer.toLowerCase().includes(q) ||
        job.vehicle.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.vin.toLowerCase().includes(q) ||
        job.issue.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [jobs, statusFilter, searchQuery]);

  // Filtered Recalls
  const filteredRecalls = useMemo(() => {
    const q = recallSearch.toLowerCase().trim();
    if (!q) return RECALL_DATABASE;
    return RECALL_DATABASE.filter(
      (r) =>
        r.make.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q) ||
        r.vinPrefix.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.component.toLowerCase().includes(q)
    );
  }, [recallSearch]);

  // Update helpers
  const updateJob = (jobId, updater) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? (typeof updater === 'function' ? updater(job) : { ...job, ...updater }) : job))
    );
  };

  const toggleChecklistItem = (jobId, itemId) => {
    updateJob(jobId, (job) => {
      const updatedChecklist = job.checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );
      const allDone = updatedChecklist.length > 0 && updatedChecklist.every((i) => i.done);
      return {
        ...job,
        checklist: updatedChecklist,
        status: allDone ? 'Completed' : job.status === 'Completed' ? 'Repairing' : job.status
      };
    });
  };

  const adjustEta = (jobId, deltaMinutes) => {
    updateJob(jobId, (job) => ({
      ...job,
      etaOffsetMinutes: (job.etaOffsetMinutes || 0) + deltaMinutes
    }));
    triggerToast(`Adjusted ETA by ${deltaMinutes > 0 ? `+${deltaMinutes}` : deltaMinutes} mins`);
  };

  const handleAddDtc = (e) => {
    e.preventDefault();
    if (!newDtc.trim() || !selectedJob) return;
    const formatted = newDtc.trim().toUpperCase();
    if (!selectedJob.dtcCodes.includes(formatted)) {
      updateJob(selectedJob.id, { dtcCodes: [...selectedJob.dtcCodes, formatted] });
    }
    setNewDtc('');
  };

  const handleRemoveDtc = (code) => {
    if (!selectedJob) return;
    updateJob(selectedJob.id, {
      dtcCodes: selectedJob.dtcCodes.filter((c) => c !== code)
    });
  };

  const handleAddPart = (e) => {
    e.preventDefault();
    if (!newPartName.trim() || !selectedJob) return;
    const part = {
      id: `p-${Date.now()}`,
      name: newPartName.trim(),
      sku: `PRT-${Math.floor(1000 + Math.random() * 9000)}`,
      price: parseFloat(newPartPrice) || 0,
      status: 'On Van'
    };
    updateJob(selectedJob.id, { parts: [...selectedJob.parts, part] });
    setNewPartName('');
    setNewPartPrice('');
    triggerToast('Part added to work order');
  };

  const handleAddChecklistTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !selectedJob) return;
    const task = {
      id: `c-${Date.now()}`,
      text: newTaskText.trim(),
      done: false
    };
    updateJob(selectedJob.id, { checklist: [...selectedJob.checklist, task] });
    setNewTaskText('');
  };

  const handleAttachRecallToJob = (recall) => {
    if (!selectedJob) return;
    const task = {
      id: `rec-${Date.now()}`,
      text: `Verify ${recall.id}: ${recall.component}`,
      done: false
    };
    updateJob(selectedJob.id, {
      checklist: [...selectedJob.checklist, task],
      notes: `${selectedJob.notes}\n[Recall Flagged ${recall.id}]: ${recall.summary}`.trim()
    });
    setActiveTab('jobs');
    triggerToast(`Attached ${recall.id} to ${selectedJob.id}`);
  };

  const selectedSchematic = useMemo(
    () => SCHEMATIC_SYSTEMS.find((s) => s.id === selectedSchematicId) || SCHEMATIC_SYSTEMS[0],
    [selectedSchematicId]
  );

  const handleLogPinoutCheckToJob = (pinRow) => {
    if (!selectedJob) return;
    const task = {
      id: `sch-${Date.now()}`,
      text: `Verify ${selectedSchematic.title} [${pinRow.pin} • ${pinRow.wireColor}]: ${pinRow.expected}`,
      done: false
    };
    updateJob(selectedJob.id, {
      checklist: [...selectedJob.checklist, task]
    });
    triggerToast(`Added ${pinRow.pin} test step to ${selectedJob.id}`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJob.customer.trim() || !newJob.vehicle.trim()) return;
    const created = {
      id: `JOB-${Math.floor(1046 + Math.random() * 900)}`,
      customer: newJob.customer.trim(),
      phone: newJob.phone.trim() || '(313) 555-0199',
      vehicle: newJob.vehicle.trim(),
      vin: newJob.vin.trim().toUpperCase() || '1FA6P8CF5L5102938',
      location: newJob.location.trim() || 'Inkster / Metro Detroit Dispatch',
      distanceMiles: 4.1,
      driveMinutes: 10,
      scheduledTime: newJob.scheduledTime || '04:45 PM',
      status: 'En Route',
      priority: newJob.priority,
      issue: newJob.issue.trim() || 'Mobile field inspection & diagnostics',
      baseMinutes: Number(newJob.baseMinutes) || 90,
      etaOffsetMinutes: 0,
      dtcCodes: [],
      invoiceStatus: 'Quote Sent',
      laborRate: 125,
      notes: 'Logged via TorqEano Mobile Dispatch.',
      checklist: [
        { id: `c-${Date.now()}-1`, text: 'Perform initial OBD-II full module scan', done: false },
        { id: `c-${Date.now()}-2`, text: 'Visual underhood & battery health inspection', done: false },
        { id: `c-${Date.now()}-3`, text: 'Complete repair & verify road test', done: false }
      ],
      parts: []
    };
    setJobs((prev) => [created, ...prev]);
    setSelectedJobId(created.id);
    setShowNewJobModal(false);
    setNewJob({
      customer: '',
      phone: '',
      vehicle: '',
      vin: '',
      location: '',
      priority: 'High',
      issue: '',
      baseMinutes: 90,
      scheduledTime: '04:45 PM'
    });
    triggerToast(`Created ${created.id} for ${created.customer}`);
  };

  const handleResetDemo = () => {
    setJobs(INITIAL_JOBS);
    setSelectedJobId(INITIAL_JOBS[0].id);
    localStorage.removeItem('torqeano_jobs_v1');
    triggerToast('Reset dispatch board to default shift data');
  };

  // Summary metrics
  const activeCount = jobs.filter((j) => j.status !== 'Completed').length;
  const completedCount = jobs.filter((j) => j.status === 'Completed').length;
  const totalShiftRevenue = jobs.reduce((sum, j) => sum + getJobMetrics(j).grandTotal, 0);

  // Theme classes
  const bgMain = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900';
  const bgCard = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const bgSubCard = darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const inputStyle = darkMode
    ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${bgMain} font-sans pb-16`}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-semibold shadow-2xl animate-bounce">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Wrench className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 px-1 h-4 rounded-md bg-slate-950 text-amber-400 text-[9px] font-black flex items-center justify-center border border-amber-500/60 tracking-tighter">
                TE
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight">
                  <span className="text-amber-500">Tor</span>q<span className="text-amber-500">Eano</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Unit #04 • Online
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${textMuted}`}>Mobile Field Service & Fleet Diagnostics</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className={`flex items-center p-1 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'jobs'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : `${textMuted} hover:text-amber-400`
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Jobs ({activeCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('schematics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'schematics'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : `${textMuted} hover:text-amber-400`
              }`}
            >
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>Schematics</span>
            </button>
            <button
              onClick={() => setActiveTab('recalls')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'recalls'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : `${textMuted} hover:text-amber-400`
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Recalls</span>
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'route'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : `${textMuted} hover:text-amber-400`
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Route</span>
            </button>
            <button
              onClick={() => setActiveTab('intake')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'intake'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : `${textMuted} hover:text-amber-400`
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Job Sheet</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewJobModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden md:inline">Log New Job</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle High-Contrast Theme"
              className={`p-2 rounded-xl border transition-colors ${bgCard} hover:border-amber-500/50`}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={handleResetDemo}
              title="Reset Shift Data"
              className={`p-2 rounded-xl border transition-colors ${bgCard} hover:border-rose-500/50`}
            >
              <RotateCcw className={`w-4 h-4 ${textMuted}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Shift KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className={`p-4 rounded-2xl border ${bgCard}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Active Queue</span>
              <Wrench className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black">{activeCount} Jobs</div>
            <p className={`text-xs mt-0.5 ${textMuted}`}>{completedCount} completed today</p>
          </div>

          <div className={`p-4 rounded-2xl border ${bgCard}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Current Job ETA</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {selectedJob ? getJobMetrics(selectedJob).etaClock : '--:--'}
            </div>
            <p className={`text-xs mt-0.5 ${textMuted}`}>
              {selectedJob ? `${getJobMetrics(selectedJob).remainingMinutes} mins remaining` : 'No active selection'}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${bgCard}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Open Recalls</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-400">{RECALL_DATABASE.length} Alerts</div>
            <p className={`text-xs mt-0.5 ${textMuted}`}>NHTSA VIN match active</p>
          </div>

          <div className={`p-4 rounded-2xl border ${bgCard}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Shift Estimate</span>
              <DollarSign className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black">${totalShiftRevenue.toLocaleString()}</div>
            <p className={`text-xs mt-0.5 ${textMuted}`}>Parts + mobile labor</p>
          </div>
        </div>

        {/* TAB 1: JOBS & WORK ORDER WORKSPACE */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Job Queue & Filters */}
            <div className="lg:col-span-5 space-y-4">
              {/* Search & Status Pills */}
              <div className={`p-4 rounded-2xl border space-y-3 ${bgCard}`}>
                <div className="relative">
                  <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customer, VIN, vehicle, or ID..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${inputStyle}`}
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['All', 'Repairing', 'Diagnosing', 'Waiting on Parts', 'En Route', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                        statusFilter === st
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : `${bgSubCard} ${textMuted} hover:border-amber-500/40`
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Cards List */}
              <div className="space-y-3">
                {filteredJobs.length === 0 ? (
                  <div className={`p-8 rounded-2xl border text-center ${bgCard}`}>
                    <p className={`text-sm ${textMuted}`}>No service orders match your filter.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => {
                    const metrics = getJobMetrics(job);
                    const isSelected = selectedJob?.id === job.id;
                    return (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${bgCard} ${
                          isSelected
                            ? 'ring-2 ring-amber-500 border-amber-500'
                            : 'hover:border-amber-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-amber-500">{job.id}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${STATUS_STYLES[job.status]}`}>
                                {job.status}
                              </span>
                            </div>
                            <h3 className="font-bold text-base mt-1">{job.vehicle}</h3>
                            <p className={`text-xs ${textMuted}`}>{job.customer} • {job.scheduledTime}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${PRIORITY_STYLES[job.priority]}`}>
                            {job.priority}
                          </span>
                        </div>

                        <p className={`text-xs line-clamp-2 mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {job.issue}
                        </p>

                        {/* ETA & Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 font-semibold text-emerald-400">
                              <Clock className="w-3.5 h-3.5" />
                              ETA {metrics.etaClock} ({metrics.remainingMinutes}m left)
                            </span>
                            <span className="font-bold">{metrics.progress}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                              style={{ width: `${metrics.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Interactive Work Order & ETA Detail Panel */}
            <div className="lg:col-span-7">
              {selectedJob ? (
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-6 ${bgCard}`}>
                  {/* Header & Status Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800/70">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                          {selectedJob.id}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          VIN: {selectedJob.vin}
                        </span>
                      </div>
                      <h2 className="text-xl font-black">{selectedJob.vehicle}</h2>
                      <p className={`text-sm mt-0.5 ${textMuted}`}>
                        {selectedJob.customer} • {selectedJob.phone}
                      </p>
                      <p className={`text-xs flex items-center gap-1 mt-1 ${textMuted}`}>
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {selectedJob.location}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
                        Job Status
                      </label>
                      <select
                        value={selectedJob.status}
                        onChange={(e) => updateJob(selectedJob.id, { status: e.target.value })}
                        className={`px-3 py-2 rounded-xl border text-xs font-bold outline-none ${inputStyle}`}
                      >
                        <option value="En Route">En Route</option>
                        <option value="Diagnosing">Diagnosing</option>
                        <option value="Waiting on Parts">Waiting on Parts</option>
                        <option value="Repairing">Repairing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic ETA Controls */}
                  {(() => {
                    const metrics = getJobMetrics(selectedJob);
                    return (
                      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${bgSubCard}`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                              Estimated Completion
                            </span>
                          </div>
                          <div className="text-2xl font-black mt-1">
                            {metrics.etaClock}{' '}
                            <span className={`text-xs font-semibold ${textMuted}`}>
                              ({metrics.remainingMinutes}m left • {metrics.progress}% complete)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => adjustEta(selectedJob.id, -15)}
                            className="px-3 py-2 rounded-xl border border-slate-700 hover:border-emerald-400 text-xs font-bold transition-colors"
                          >
                            -15m ETA
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustEta(selectedJob.id, 15)}
                            className="px-3 py-2 rounded-xl border border-slate-700 hover:border-amber-400 text-xs font-bold transition-colors"
                          >
                            +15m ETA
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Repair Checklist */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Diagnostic & Repair Checklist
                    </h3>
                    <div className="space-y-2">
                      {selectedJob.checklist.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleChecklistItem(selectedJob.id, item.id)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${bgSubCard} hover:border-amber-500/50`}
                        >
                          {item.done ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Square className={`w-4 h-4 shrink-0 ${textMuted}`} />
                          )}
                          <span className={`text-xs sm:text-sm ${item.done ? 'line-through opacity-60' : 'font-medium'}`}>
                            {item.text}
                          </span>
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleAddChecklistTask} className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        placeholder="Add repair or test step..."
                        className={`flex-1 px-3 py-2 rounded-xl border text-xs outline-none ${inputStyle}`}
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                      >
                        Add Step
                      </button>
                    </form>
                  </div>

                  {/* OBD-II Fault Codes */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-sky-400" />
                      OBD-II Fault Codes (DTCs)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.dtcCodes.length === 0 ? (
                        <span className={`text-xs ${textMuted}`}>No DTCs logged</span>
                      ) : (
                        selectedJob.dtcCodes.map((code) => (
                          <span
                            key={code}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold"
                          >
                            {code}
                            <button
                              type="button"
                              onClick={() => handleRemoveDtc(code)}
                              className="hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                    <form onSubmit={handleAddDtc} className="flex gap-2">
                      <input
                        type="text"
                        value={newDtc}
                        onChange={(e) => setNewDtc(e.target.value)}
                        placeholder="e.g. P0300"
                        className={`w-36 px-3 py-1.5 rounded-xl border text-xs font-mono uppercase outline-none ${inputStyle}`}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl border border-slate-700 hover:border-amber-500 text-xs font-bold"
                      >
                        + DTC
                      </button>
                    </form>
                  </div>

                  {/* Parts & Estimate Summary */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${bgSubCard}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider">Parts & Estimate</h3>
                      <span className="text-sm font-black text-emerald-400">
                        Total: ${getJobMetrics(selectedJob).grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedJob.parts.map((part) => (
                        <div key={part.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                          <div>
                            <span className="font-semibold">{part.name}</span>
                            <span className={`ml-2 font-mono ${textMuted}`}>({part.sku})</span>
                          </div>
                          <span className="font-bold">${Number(part.price || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddPart} className="flex flex-col sm:flex-row gap-2 pt-1">
                      <input
                        type="text"
                        value={newPartName}
                        onChange={(e) => setNewPartName(e.target.value)}
                        placeholder="Part name..."
                        className={`flex-1 px-3 py-1.5 rounded-xl border text-xs outline-none ${inputStyle}`}
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={newPartPrice}
                        onChange={(e) => setNewPartPrice(e.target.value)}
                        placeholder="Price ($)"
                        className={`w-28 px-3 py-1.5 rounded-xl border text-xs outline-none ${inputStyle}`}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                      >
                        + Part
                      </button>
                    </form>
                  </div>

                  {/* Technician Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                      Technician Notes
                    </label>
                    <textarea
                      rows={3}
                      value={selectedJob.notes}
                      onChange={(e) => updateJob(selectedJob.id, { notes: e.target.value })}
                      className={`w-full p-3 rounded-xl border text-xs outline-none resize-none ${inputStyle}`}
                    />
                  </div>
                </div>
              ) : (
                <div className={`p-8 rounded-2xl border text-center ${bgCard}`}>
                  <p className={`text-sm ${textMuted}`}>Select a job from the queue to view details.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE WIRING SCHEMATICS & PINOUTS */}
        {activeTab === 'schematics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: Circuit & Vehicle Selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className={`p-4 rounded-2xl border ${bgCard}`}>
                <h2 className="text-base font-black flex items-center gap-2">
                  <CircuitBoard className="w-5 h-5 text-amber-500" />
                  Live Wiring & Pinout Library
                </h2>
                <p className={`text-xs mt-1 ${textMuted}`}>
                  Tap any circuit node to inspect live meter specs & pinouts
                </p>
              </div>

              {SCHEMATIC_SYSTEMS.map((sys) => {
                const isSelected = sys.id === selectedSchematic.id;
                return (
                  <div
                    key={sys.id}
                    onClick={() => {
                      setSelectedSchematicId(sys.id);
                      setActiveNodeId(sys.nodes[0]?.id || null);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${bgCard} ${
                      isSelected ? 'ring-2 ring-amber-500 border-amber-500' : 'hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 text-[10px] font-bold uppercase tracking-wider border border-sky-500/30">
                        {sys.systemTag}
                      </span>
                      <span className="text-[11px] font-mono text-amber-500">{sys.id}</span>
                    </div>
                    <h3 className="font-bold text-sm mt-1">{sys.title}</h3>
                    <p className={`text-xs mt-0.5 ${textMuted}`}>{sys.vehicleMatch}</p>
                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold">{sys.voltageSpec}</span>
                      <span className={textMuted}>{sys.pinouts.length} Pins</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Main Panel: Interactive SVG Wiring Diagram & Connector Pinout Table */}
            <div className="lg:col-span-8 space-y-5">
              <div className={`p-5 rounded-2xl border space-y-4 ${bgCard}`}>
                {/* Header & Live Trace Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
                  <div>
                    <h3 className="text-lg font-black">{selectedSchematic.title}</h3>
                    <p className={`text-xs ${textMuted}`}>
                      {selectedSchematic.vehicleMatch} • {selectedSchematic.connectorName}
                    </p>
                  </div>

                  <button
                    onClick={() => setLiveTraceActive(!liveTraceActive)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      liveTraceActive
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                        : `${bgSubCard} ${textMuted}`
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>{liveTraceActive ? 'Live Signal Trace: ON' : 'Live Signal Trace: OFF'}</span>
                  </button>
                </div>

                {/* Live Telemetry Banner */}
                <div className={`px-3.5 py-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${bgSubCard}`}>
                  <span className="flex items-center gap-2 font-mono font-bold text-amber-400">
                    <Zap className="w-4 h-4 text-amber-500" />
                    {selectedSchematic.liveSignalLabel}
                  </span>
                  <span className={textMuted}>Spec: {selectedSchematic.voltageSpec}</span>
                </div>

                {/* Interactive Schematic Canvas */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 overflow-x-auto">
                  <svg viewBox="0 0 620 270" className="w-full min-w-[540px] h-auto select-none">
                    {/* Subtle Blueprint Grid */}
                    <defs>
                      <pattern id="blueprintGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1e293b" strokeWidth="0.7" />
                      </pattern>
                    </defs>
                    <rect width="620" height="270" fill="url(#blueprintGrid)" rx="10" />

                    {/* Draw Wires Between Nodes */}
                    {selectedSchematic.wires.map((wire, i) => {
                      const fromNode = selectedSchematic.nodes.find((n) => n.id === wire.from);
                      const toNode = selectedSchematic.nodes.find((n) => n.id === wire.to);
                      if (!fromNode || !toNode) return null;

                      const x1 = fromNode.x + 70;
                      const y1 = fromNode.y + 22;
                      const x2 = toNode.x + 70;
                      const y2 = toNode.y + 22;
                      const midX = (x1 + x2) / 2;
                      const midY = (y1 + y2) / 2;

                      return (
                        <g key={i}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={wire.color}
                            strokeWidth="3.5"
                            strokeDasharray={liveTraceActive && wire.live ? '8 5' : undefined}
                            opacity="0.9"
                          >
                            {liveTraceActive && wire.live && (
                              <animate
                                attributeName="stroke-dashoffset"
                                from="26"
                                to="0"
                                dur="1s"
                                repeatCount="indefinite"
                              />
                            )}
                          </line>
                          <rect
                            x={midX - 44}
                            y={midY - 10}
                            width="88"
                            height="18"
                            rx="4"
                            fill="#0f172a"
                            stroke="#334155"
                            strokeWidth="1"
                          />
                          <text
                            x={midX}
                            y={midY + 3}
                            textAnchor="middle"
                            fill="#cbd5e1"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {wire.gauge}
                          </text>
                        </g>
                      );
                    })}

                    {/* Draw Interactive Component Nodes */}
                    {selectedSchematic.nodes.map((node) => {
                      const isNodeSelected = activeNodeId === node.id;
                      return (
                        <g
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className="cursor-pointer"
                        >
                          <rect
                            x={node.x}
                            y={node.y}
                            width="145"
                            height="46"
                            rx="9"
                            fill="#0f172a"
                            stroke={isNodeSelected ? '#f59e0b' : node.color}
                            strokeWidth={isNodeSelected ? '2.5' : '1.5'}
                          />
                          <circle cx={node.x + 12} cy={node.y + 15} r="4" fill={node.color} />
                          <text
                            x={node.x + 22}
                            y={node.y + 18}
                            fill="#f8fafc"
                            fontSize="10.5"
                            fontWeight="bold"
                          >
                            {node.label.length > 21 ? `${node.label.slice(0, 20)}…` : node.label}
                          </text>
                          <text
                            x={node.x + 12}
                            y={node.y + 34}
                            fill="#94a3b8"
                            fontSize="8.8"
                          >
                            {node.detail.length > 26 ? `${node.detail.slice(0, 25)}…` : node.detail}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected Node Live Probe Readout */}
                {(() => {
                  const currentNode =
                    selectedSchematic.nodes.find((n) => n.id === activeNodeId) || selectedSchematic.nodes[0];
                  return currentNode ? (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Selected Probe Component
                        </span>
                        <h4 className="font-bold text-sm">{currentNode.label}</h4>
                        <p className={`text-xs ${textMuted}`}>{currentNode.detail}</p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                        PROBE READY
                      </span>
                    </div>
                  ) : null;
                })()}

                {/* Connector Pinout & Expected Meter Values Table */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Connector Pinout & Multimeter Reference
                    </h4>
                    {selectedJob && (
                      <span className={`text-[11px] ${textMuted}`}>
                        Active Job: <strong className="text-amber-400">{selectedJob.id}</strong>
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                          <th className="py-2.5 px-3">Pin / Cavity</th>
                          <th className="py-2.5 px-3">Wire Color</th>
                          <th className="py-2.5 px-3">Circuit Function</th>
                          <th className="py-2.5 px-3">Expected Value</th>
                          <th className="py-2.5 px-3 text-right">Work Order</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {selectedSchematic.pinouts.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-bold text-amber-400">{row.pin}</td>
                            <td className="py-2.5 px-3 font-mono">{row.wireColor}</td>
                            <td className="py-2.5 px-3 font-medium">{row.circuit}</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-semibold">{row.expected}</td>
                            <td className="py-2.5 px-3 text-right">
                              {selectedJob && (
                                <button
                                  onClick={() => handleLogPinoutCheckToJob(row)}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-[11px] transition-colors"
                                >
                                  + Log Check
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NHTSA RECALLS & TSB LOOKUP */}
        {activeTab === 'recalls' && (
          <div className="space-y-5">
            <div className={`p-5 rounded-2xl border ${bgCard}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    NHTSA Safety Recalls & Technical Bulletins
                  </h2>
                  <p className={`text-xs mt-0.5 ${textMuted}`}>
                    Search by Make, Model, VIN prefix (e.g., 1HG, 1FT, 3C6), or NHTSA Campaign ID
                  </p>
                </div>

                <div className="relative w-full md:w-80">
                  <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                  <input
                    type="text"
                    value={recallSearch}
                    onChange={(e) => setRecallSearch(e.target.value)}
                    placeholder="Filter recalls or enter VIN prefix..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecalls.map((rec) => (
                <div key={rec.id} className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${bgCard}`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-400 font-mono text-xs font-bold border border-rose-500/30">
                        {rec.id}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        VIN Prefix: {rec.vinPrefix}*
                      </span>
                    </div>
                    <h3 className="text-base font-black">
                      {rec.years} {rec.make} {rec.model}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">{rec.component}</p>
                    <p className={`text-xs mt-2.5 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {rec.summary}
                    </p>
                    <div className={`mt-3 p-3 rounded-xl border text-xs ${bgSubCard}`}>
                      <strong className="text-emerald-400">Remedy:</strong> {rec.remedy}
                    </div>
                  </div>

                  {selectedJob && (
                    <button
                      onClick={() => handleAttachRecallToJob(rec)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add Recall Inspection to {selectedJob.id} ({selectedJob.customer})
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ROUTE & DISPATCH TIMELINE */}
        {activeTab === 'route' && (
          <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${bgCard}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-sky-400" />
                  Mobile Service Route & Stop Schedule
                </h2>
                <p className={`text-xs ${textMuted}`}>
                  Inkster / Metro Detroit Dispatch Corridor • Optimized Stop Order
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
                Total Route: {jobs.reduce((s, j) => s + (j.distanceMiles || 4), 0).toFixed(1)} mi
              </span>
            </div>

            <div className="space-y-4">
              {jobs.map((job, idx) => {
                const metrics = getJobMetrics(job);
                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setActiveTab('jobs');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${bgSubCard} hover:border-amber-500`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm">{job.scheduledTime}</span>
                          <span className="text-xs font-mono text-amber-500">{job.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${STATUS_STYLES[job.status]}`}>
                            {job.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-base mt-0.5">
                          {job.customer} — {job.vehicle}
                        </h3>
                        <p className={`text-xs flex items-center gap-1 mt-1 ${textMuted}`}>
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          {job.location} ({job.distanceMiles} mi • ~{job.driveMinutes}m drive)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 pl-11 md:pl-0">
                      <div className="text-left md:text-right">
                        <div className="text-xs font-bold text-emerald-400">Est. Finish: {metrics.etaClock}</div>
                        <div className={`text-xs ${textMuted}`}>{metrics.totalEstimated} mins booked</div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${textMuted}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SENDABLE CUSTOMER JOB SHEET & INTAKE FORM */}
        {activeTab === 'intake' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Shareable Link & Text/SMS Invite Generator */}
            <div className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border space-y-4 ${bgCard}`}>
              <div>
                <h2 className="text-lg font-black flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-500" />
                  Send Job Sheet to Customer
                </h2>
                <p className={`text-xs mt-1 ${textMuted}`}>
                  Copy a ready-to-send text/link so customers can submit their car info, location, and issue before you roll out.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-2 ${bgSubCard}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Customer Intake Link
                </span>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value="https://torqeano.app/intake/unit-04"
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${inputStyle}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const shareText =
                        'Hi! Please fill out your TorqEano Mobile Mechanic Job Sheet (Car Year/Make/Model, VIN, Location/Address, and Issue) here: https://torqeano.app/intake/unit-04';
                      navigator.clipboard?.writeText(shareText);
                      setIntakeLinkCopied(true);
                      triggerToast('Copied customer job sheet invite!');
                      setTimeout(() => setIntakeLinkCopied(false), 2500);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
                  >
                    {intakeLinkCopied ? 'Copied!' : 'Copy SMS'}
                  </button>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 text-xs ${bgSubCard}`}>
                <p className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                  What Customers Fill Out
                </p>
                <ul className={`space-y-1.5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <li>• Full Name & Callback Phone Number</li>
                  <li>• Vehicle Year, Make, Model & Trim / Engine</li>
                  <li>• Street Address / Where They Live & Parking Notes</li>
                  <li>• Symptoms, Warning Lights & Priority</li>
                </ul>
              </div>
            </div>

            {/* Right: Customer Job Sheet Form (Live Preview + Submit to Queue) */}
            <div className={`lg:col-span-7 p-5 sm:p-6 rounded-2xl border ${bgCard}`}>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/70">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                    Customer View • Job Sheet
                  </span>
                  <h3 className="text-lg font-black mt-1">Vehicle & Service Request Sheet</h3>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customerSheet.customer.trim() || !customerSheet.vehicle.trim()) return;
                  const created = {
                    id: `JOB-${Math.floor(1046 + Math.random() * 900)}`,
                    customer: customerSheet.customer.trim(),
                    phone: customerSheet.phone.trim() || '(313) 555-0199',
                    vehicle: customerSheet.vehicle.trim(),
                    vin: customerSheet.vin.trim().toUpperCase() || 'PENDING-VIN-CHECK',
                    location: customerSheet.location.trim() || 'Customer Address Not Provided',
                    distanceMiles: 4.5,
                    driveMinutes: 11,
                    scheduledTime: 'Next Open Slot',
                    status: 'En Route',
                    priority: customerSheet.priority,
                    issue: customerSheet.issue.trim() || 'Customer submitted service request',
                    baseMinutes: 90,
                    etaOffsetMinutes: 0,
                    dtcCodes: [],
                    invoiceStatus: 'Quote Sent',
                    laborRate: 125,
                    notes: customerSheet.parkingNotes.trim()
                      ? `Parking/Access: ${customerSheet.parkingNotes.trim()}`
                      : 'Submitted via Customer Job Sheet.',
                    checklist: [
                      { id: `c-${Date.now()}-1`, text: 'Confirm vehicle info, VIN & location on arrival', done: false },
                      { id: `c-${Date.now()}-2`, text: 'Diagnose reported symptom & scan codes', done: false },
                      { id: `c-${Date.now()}-3`, text: 'Complete repair & test operation', done: false }
                    ],
                    parts: []
                  };
                  setJobs((prev) => [created, ...prev]);
                  setSelectedJobId(created.id);
                  setCustomerSheet({
                    customer: '',
                    phone: '',
                    vehicle: '',
                    vin: '',
                    location: '',
                    parkingNotes: '',
                    priority: 'High',
                    issue: ''
                  });
                  setActiveTab('jobs');
                  triggerToast(`Job sheet submitted — ${created.id} added to queue!`);
                }}
                className="space-y-3.5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={customerSheet.customer}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, customer: e.target.value })}
                      placeholder="Full name"
                      className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Phone Number *</label>
                    <input
                      required
                      type="text"
                      value={customerSheet.phone}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, phone: e.target.value })}
                      placeholder="(313) 555-0123"
                      className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Car Year, Make & Model *</label>
                    <input
                      required
                      type="text"
                      value={customerSheet.vehicle}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, vehicle: e.target.value })}
                      placeholder="e.g. 2016 Toyota Camry SE 2.5L"
                      className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">VIN (Optional)</label>
                    <input
                      type="text"
                      value={customerSheet.vin}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, vin: e.target.value })}
                      placeholder="17-character VIN"
                      className={`w-full px-3 py-2 rounded-xl border text-sm font-mono uppercase outline-none ${inputStyle}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Where You Live / Car Location *</label>
                    <input
                      required
                      type="text"
                      value={customerSheet.location}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, location: e.target.value })}
                      placeholder="Street address, city, ZIP"
                      className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Driveway / Parking Notes</label>
                    <input
                      type="text"
                      value={customerSheet.parkingNotes}
                      onChange={(e) => setCustomerSheet({ ...customerSheet, parkingNotes: e.target.value })}
                      placeholder="e.g. Silver car in right driveway"
                      className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">What's Going On With the Car? *</label>
                  <textarea
                    required
                    rows={3}
                    value={customerSheet.issue}
                    onChange={(e) => setCustomerSheet({ ...customerSheet, issue: e.target.value })}
                    placeholder="Describe noises, warning lights, starting trouble, or repairs needed..."
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none ${inputStyle}`}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all"
                  >
                    Submit Job Sheet to Dispatch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* NEW JOB MODAL */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${bgCard}`}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-black flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-500" />
                Log New Mobile Service Job
              </h3>
              <button onClick={() => setShowNewJobModal(false)} className={`p-1 rounded-lg ${textMuted} hover:text-white`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Customer Name *</label>
                  <input
                    required
                    type="text"
                    value={newJob.customer}
                    onChange={(e) => setNewJob({ ...newJob, customer: e.target.value })}
                    placeholder="e.g. Jordan Taylor"
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newJob.phone}
                    onChange={(e) => setNewJob({ ...newJob, phone: e.target.value })}
                    placeholder="(313) 555-0199"
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Year / Make / Model *</label>
                  <input
                    required
                    type="text"
                    value={newJob.vehicle}
                    onChange={(e) => setNewJob({ ...newJob, vehicle: e.target.value })}
                    placeholder="2020 Ford Explorer XLT"
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">VIN (17-Digit)</label>
                  <input
                    type="text"
                    value={newJob.vin}
                    onChange={(e) => setNewJob({ ...newJob, vin: e.target.value })}
                    placeholder="1FMSK8DH5LGA..."
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono uppercase outline-none ${inputStyle}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Service Location / Address</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  placeholder="Street address or cross-streets"
                  className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Priority</label>
                  <select
                    value={newJob.priority}
                    onChange={(e) => setNewJob({ ...newJob, priority: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Est. Mins</label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={newJob.baseMinutes}
                    onChange={(e) => setNewJob({ ...newJob, baseMinutes: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Arrival Slot</label>
                  <input
                    type="text"
                    value={newJob.scheduledTime}
                    onChange={(e) => setNewJob({ ...newJob, scheduledTime: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inputStyle}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Reported Symptom / Repair Needed</label>
                <textarea
                  rows={2}
                  value={newJob.issue}
                  onChange={(e) => setNewJob({ ...newJob, issue: e.target.value })}
                  placeholder="Describe customer complaint or requested service..."
                  className={`w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none ${inputStyle}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
                >
                  Create & Dispatch Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```
