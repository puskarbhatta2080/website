"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicLightbox from "@/components/CinematicLightbox";
import type { LightboxImage } from "@/components/CinematicLightbox";

/**
 * BTS / MEMORIS — Evidence & Case File Board
 *
 * A high-tech villain "surveillance & intelligence" UI dashboard.
 * Images are arranged as interconnected nodes with glowing red/amber
 * vector lines, frosted-glass panels, HUD metadata overlays, and
 * telemetry indicators.
 */

const BTS_FILES = [
  "1eb3c7ec-b5f7-48d5-abb6-6c122244f06e.webp",
  "3fc2ad96-4ab6-41fd-994e-ac3ed1bebc50.webp",
  "4a893cd6-11c0-4681-bf97-0e56032a38fc.webp",
  "5a1ed671-4b52-42cb-8995-f17bb58a4c23.webp",
  "8c6d0d32-1871-4da7-9186-f27627be6cf4.webp",
  "9d8ba5e8-b19a-458d-bf7c-99e1018736c2.webp",
  "23d6b1f7-446c-49a4-8035-209bf030d285.webp",
  "43bb180b-1335-4753-89ee-38fa11871471.webp",
  "53fb3a5a-8908-41d2-a754-60a00076bb38.webp",
  "154e2cd6-ad68-4eb5-8c96-343d2c6b23eb.webp",
  "391b465a-6f39-402f-a5ec-16cfa8c19bc5.webp",
  "478cd438-93eb-4911-989c-9954a5943780.webp",
  "484bd65c-32b1-45c5-8943-7c8f5af18f15.webp",
  "910a13eb-9bbb-4d50-bbf0-c26d5895e0c6.webp",
  "5958c07e-ffec-4815-abd5-58a2de2440b1.webp",
  "8835e4d3-b129-4d70-acba-fd1962bca7fd.webp",
  "9473dec5-9ffe-4c9c-bc34-3b329de37bb6.webp",
  "522196b1-6abc-4966-8519-e214c7e1bcc1.webp",
  "a5b5f20f-7bf2-47fe-805f-4c6c02e02608.webp",
  "a8c3e3e8-9123-44ac-9b92-4b22aa580dc0.webp",
  "ab388c23-0fbe-49c6-81ff-f20aed433480.webp",
  "abe3f8a4-20f1-4b4d-ae25-228c55833380.webp",
  "b0d452a8-d63e-4f0b-8cb6-ccbbeb321255.webp",
  "ce379785-cd83-4f01-9bc1-21e1a2cd0ecf.webp",
  "f91369a6-f6fe-41ec-bf4b-54fab4a413ed.webp",
];

// Generate telemetry data for each node
const TELEMETRY = [
  { iso: "800", aperture: "f/2.8", shutter: "1/125", geo: "27.71°N, 85.32°E", time: "23:47:12", frame: "EVI-001" },
  { iso: "1600", aperture: "f/1.8", shutter: "1/60", geo: "27.71°N, 85.32°E", time: "00:12:38", frame: "EVI-002" },
  { iso: "400", aperture: "f/4.0", shutter: "1/250", geo: "27.70°N, 85.33°E", time: "18:05:44", frame: "EVI-003" },
  { iso: "3200", aperture: "f/2.0", shutter: "1/30", geo: "27.72°N, 85.31°E", time: "02:33:09", frame: "EVI-004" },
  { iso: "200", aperture: "f/5.6", shutter: "1/500", geo: "27.71°N, 85.32°E", time: "15:20:55", frame: "EVI-005" },
  { iso: "6400", aperture: "f/1.4", shutter: "1/15", geo: "27.70°N, 85.33°E", time: "03:47:21", frame: "EVI-006" },
];

interface NodeData {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  telemetry: typeof TELEMETRY[0];
}

/** Generate pseudo-random node positions in a clustered layout */
function generateNodes(): NodeData[] {
  const titles = [
    "The Wardrobe Returns", "Mask Tests", "Light & Smoke", "Director's Cut",
    "On Set", "Rehearsal", "Character Prep", "Night Shoot",
    "Prop Testing", "Makeup Trials", "Scene Blocking", "Camera Setup",
    "Dialogue Prep", "Costume Fitting", "Lighting Rig", "Action Rehearse",
    "Green Room", "Script Notes", "BTS POV", "Crew Moment",
    "Sound Check", "Standby", "Final Call", "Cut!", "Wrap Party",
  ];
  const subtitles = [
    "Night rehearsal", "Fear is engineered", "Atmosphere set",
    "Precision in pause", "Live on set", "Silence speaks",
    "Method acting", "After dark", "Prop master", "Face paint",
    "Walk through", "Lens test", "Line run", "Wardrobe check",
    "Rig lights", "Stunt prep", "Off camera", "Page turn",
    "Behind lens", "Team huddle", "Mic check", "Standby mode",
    "Last looks", "Scene done", "That's a wrap",
  ];

  // Pre-defined positions in a network layout
  const positions = [
    { x: 5, y: 10 }, { x: 28, y: 5 }, { x: 52, y: 8 }, { x: 75, y: 12 },
    { x: 15, y: 35 }, { x: 38, y: 30 }, { x: 62, y: 33 }, { x: 85, y: 28 },
    { x: 8, y: 58 }, { x: 30, y: 55 }, { x: 55, y: 52 }, { x: 78, y: 58 },
    { x: 20, y: 78 }, { x: 45, y: 75 }, { x: 68, y: 80 }, { x: 90, y: 72 },
    { x: 5, y: 90 }, { x: 35, y: 92 }, { x: 60, y: 88 }, { x: 82, y: 90 },
    { x: 12, y: 70 }, { x: 48, y: 42 }, { x: 72, y: 45 }, { x: 25, y: 50 }, { x: 50, y: 65 },
  ];

  return titles.slice(0, BTS_FILES.length).map((title, i) => ({
    id: i,
    src: `/BTS/${BTS_FILES[i]}`,
    title,
    subtitle: subtitles[i] || "Evidence capture",
    x: positions[i].x,
    y: positions[i].y,
    telemetry: TELEMETRY[i % TELEMETRY.length],
  }));
}

const ALL_BTS_LIGHTBOX: LightboxImage[] = BTS_FILES.map((f, i) => ({
  src: `/BTS/${f}`,
  alt: `BTS still ${i + 1}`,
}));

/** Generate connections between nearby nodes */
function generateConnections(nodes: NodeData[]) {
  const connections: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Connect nodes within a certain distance (deterministic based on node indices)
      if (dist < 30 && ((i * 7 + j * 13) % 10) > 3) {
        connections.push([i, j]);
      }
    }
  }
  return connections;
}

export default function BtsMemoris() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  const nodes = useMemo(() => generateNodes(), []);
  const connections = useMemo(() => generateConnections(nodes), [nodes]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? ALL_BTS_LIGHTBOX.length - 1 : prev - 1
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === ALL_BTS_LIGHTBOX.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handleNodeHover = useCallback((id: number | null) => {
    setHoveredNode(id);
    if (id !== null) {
      const connected = new Set<number>();
      connections.forEach(([a, b]) => {
        if (a === id) connected.add(b);
        if (b === id) connected.add(a);
      });
      connected.add(id);
      setActiveNodes(connected);
    } else {
      setActiveNodes(new Set());
    }
  }, [connections]);

  return (
    <section
      id="bts"
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: "#0d0f12" }}
    >
      {/* Grid overlay — surveillance grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner vignette with red glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_circle_at_50%_10%,rgba(220,38,38,0.08),transparent_55%),radial-gradient(900px_circle_at_0%_80%,rgba(220,38,38,0.06),transparent_60%),radial-gradient(900px_circle_at_100%_85%,rgba(220,38,38,0.05),transparent_62%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.75))]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header — Surveillance Console */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_12px_rgba(220,38,38,0.85)] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.22em] font-black text-[#dc2626]/80">
                SURVEILLANCE FEED // CLASSIFIED
              </span>
            </div>
            <h3 className="uppercase tracking-[0.18em] font-black text-[#d4d4d8] text-[22px]">
              BTS / MEMORIS
            </h3>
            <p className="mt-3 text-[#d4d4d8]/70 max-w-2xl">
              Intercepted behind-the-scenes intelligence. Connected evidence
              nodes from the antagonist&apos;s workshop.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/gallery/bts"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] px-5 py-2.5 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition"
            >
              View Full Archive →
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-[#dc2626] shadow-[0_0_24px_rgba(220,38,38,0.35)]" />
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/60">
                {BTS_FILES.length} NODES
              </span>
            </div>
          </div>
        </header>

        {/* Status Bar */}
        <div className="mb-6 relative overflow-hidden rounded-[12px] border border-[rgba(220,38,38,0.18)] bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 [background:radial-gradient(600px_circle_at_30%_20%,rgba(220,38,38,0.18),transparent_55%),radial-gradient(600px_circle_at_70%_80%,rgba(220,38,38,0.10),transparent_60%)]" />
          <div className="relative px-4 py-2.5 flex items-center gap-6 text-[10px] uppercase tracking-widest font-black text-[#d4d4d8]/60">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.65)] animate-pulse" />
              FEED LIVE
            </span>
            <span className="text-[#d4d4d8]/30">|</span>
            <span>ENCRYPTION: AES-256</span>
            <span className="text-[#d4d4d8]/30">|</span>
            <span>SIGNAL: STRONG</span>
            <span className="text-[#d4d4d8]/30">|</span>
            <span className="text-[#dc2626]">NODES: {BTS_FILES.length} ACTIVE</span>
          </div>
        </div>

        {/* Evidence Board — Node Network */}
        <div
          className="relative w-full overflow-hidden rounded-[22px] border border-[rgba(220,38,38,0.15)] bg-black/30"
          style={{ minHeight: "900px" }}
        >
          {/* SVG Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(220,38,38,0)" />
                <stop offset="50%" stopColor="rgba(220,38,38,0.35)" />
                <stop offset="100%" stopColor="rgba(220,38,38,0)" />
              </linearGradient>
              <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(220,38,38,0)" />
                <stop offset="50%" stopColor="rgba(220,38,38,0.7)" />
                <stop offset="100%" stopColor="rgba(220,38,38,0)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {connections.map(([a, b], i) => {
              const nodeA = nodes[a];
              const nodeB = nodes[b];
              const isActive =
                activeNodes.has(a) && activeNodes.has(b);
              const isDimmed =
                activeNodes.size > 0 && !isActive;

              return (
                <line
                  key={`conn-${i}`}
                  x1={`${nodeA.x}%`}
                  y1={`${nodeA.y}%`}
                  x2={`${nodeB.x}%`}
                  y2={`${nodeB.y}%`}
                  stroke={isActive ? "rgba(220,38,38,0.7)" : "rgba(220,38,38,0.15)"}
                  strokeWidth={isActive ? 2 : 1}
                  filter={isActive ? "url(#glow)" : undefined}
                  className="transition-all duration-500"
                  style={{
                    opacity: isDimmed ? 0.1 : isActive ? 1 : 0.4,
                  }}
                />
              );
            })}
          </svg>

          {/* Node Cards */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isConnected = activeNodes.has(node.id);
            const isDimmed = activeNodes.size > 0 && !isConnected;

            return (
              <motion.button
                key={node.id}
                onClick={() => openLightbox(node.id)}
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={() => handleNodeHover(null)}
                className="absolute z-10 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: "180px",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: isHovered ? 1.15 : isDimmed ? 0.85 : 1,
                  opacity: isDimmed ? 0.3 : 1,
                  zIndex: isHovered ? 50 : 10,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className="relative overflow-hidden rounded-[14px] backdrop-blur-md transition-all duration-300"
                  style={{
                    background: isHovered
                      ? "rgba(220,38,38,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: isHovered
                      ? "1.5px solid rgba(220,38,38,0.5)"
                      : "1px solid rgba(220,38,38,0.12)",
                    boxShadow: isHovered
                      ? "0 0 40px rgba(220,38,38,0.2), inset 0 0 20px rgba(220,38,38,0.05)"
                      : "0 0 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={node.src}
                      alt={node.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-all duration-500"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-black/30 to-transparent" />

                    {/* Hover scanline effect */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ top: "-100%" }}
                          animate={{ top: "100%" }}
                          exit={{ top: "100%" }}
                          transition={{ duration: 1.5, ease: "linear" }}
                          className="absolute inset-x-0 h-1 bg-[rgba(220,38,38,0.3)] pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* Red dot indicator */}
                    <div className="absolute top-2 left-2">
                      <span className="flex items-center gap-1.5 rounded-full border border-[rgba(220,38,38,0.25)] bg-black/50 backdrop-blur-sm px-2 py-0.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${isHovered ? "bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.85)]" : "bg-[rgba(220,38,38,0.5)]"} transition-all duration-300`} />
                        <span className="text-[8px] uppercase tracking-widest font-black text-[#d4d4d8]">
                          {node.telemetry.frame}
                        </span>
                      </span>
                    </div>

                    {/* Node ID */}
                    <div className="absolute top-2 right-2">
                      <span className="text-[9px] font-mono tracking-wider text-[rgba(220,38,38,0.5)]">
                        #{String(node.id + 1).padStart(3, "0")}
                      </span>
                    </div>
                  </div>

                  {/* HUD Metadata — visible on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-1.5 border-t border-[rgba(220,38,38,0.15)]">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px] font-mono">
                            <span className="text-[rgba(220,38,38,0.5)]">ISO:</span>
                            <span className="text-[#d4d4d8] text-right">{node.telemetry.iso}</span>
                            <span className="text-[rgba(220,38,38,0.5)]">APERTURE:</span>
                            <span className="text-[#d4d4d8] text-right">{node.telemetry.aperture}</span>
                            <span className="text-[rgba(220,38,38,0.5)]">SHUTTER:</span>
                            <span className="text-[#d4d4d8] text-right">{node.telemetry.shutter}</span>
                            <span className="text-[rgba(220,38,38,0.5)]">GEO:</span>
                            <span className="text-[#d4d4d8] text-right truncate">{node.telemetry.geo}</span>
                            <span className="text-[rgba(220,38,38,0.5)]">TIME:</span>
                            <span className="text-[#dc2626] text-right">{node.telemetry.time}</span>
                          </div>

                          {/* Waveform mini visualization */}
                          <div className="flex items-end gap-[2px] h-4 mt-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-full rounded-full"
                                style={{
                                  height: `${20 + Math.sin(i * 1.2 + node.id) * 15 + 10}%`,
                                  background: `rgba(220,38,38,${0.2 + Math.sin(i * 1.2 + node.id) * 0.15 + 0.15})`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Title — always visible */}
                  <div className="p-2.5">
                    <p className="text-[9px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/50">
                      EVIDENCE NODE
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.06em] font-black text-[#d4d4d8] truncate">
                      {node.title}
                    </p>
                  </div>
                </div>

                {/* Connection pulse ring on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-[14px] border-2 border-[rgba(220,38,38,0.3)] pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}

          {/* Center hub — red warning indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border border-[rgba(220,38,38,0.1)] animate-ping [animation-duration:3s]" />
              <div className="absolute inset-2 h-12 w-12 rounded-full border border-[rgba(220,38,38,0.15)] animate-ping [animation-duration:4s]" />
              <div className="absolute inset-4 h-8 w-8 rounded-full bg-[rgba(220,38,38,0.05)]" />
              <div className="absolute inset-[30%] rounded-full bg-[rgba(220,38,38,0.1)] shadow-[0_0_60px_rgba(220,38,38,0.15)]" />
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-extrabold text-[#d4d4d8]/40">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#dc2626]" />
              HOVER TO INSPECT
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#dc2626]" />
              CLICK TO ENLARGE
            </span>
          </div>

          <Link
            href="/gallery/bts"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.25)] px-5 py-2.5 text-[12px] uppercase tracking-widest font-black text-[#d4d4d8] bg-black/10 hover:bg-black/20 shadow-[0_0_30px_rgba(220,38,38,0.10)] transition-all duration-300"
          >
            ACCESS FULL ARCHIVE —
            <span className="text-[#dc2626]">{BTS_FILES.length} NODES</span>
          </Link>
        </div>
      </div>

      {/* Cinematic lightbox */}
      {lightboxOpen && (
        <CinematicLightbox
          images={ALL_BTS_LIGHTBOX}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
  );
}
