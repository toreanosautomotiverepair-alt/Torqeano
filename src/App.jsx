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
      { pin: 'B+ Stud (M8)', wireColor: 'RD (2 AWG)', circuit: '
