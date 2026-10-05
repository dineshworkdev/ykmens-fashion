import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import lottie from 'lottie-web/build/player/lottie_light';

/**
 * YK MENS FASHION — Interactive Brand Pet: "Sir Kip" The Tailored Hound
 * 
 * Powered by Lottie (Open-Source Airbnb/Lottie Animation Engine):
 * - Genuinely open-source (MIT licensed) vector runtime with sub-pixel SVG rendering.
 * - Multi-state animation machine:
 *     1. IDLE (frames 0-60): poised posture, chest breathing, subtle tail sway, natural eye blinks.
 *     2. LOOK_USER (frames 60-110): turns toward viewer, perks ears, alert head posture.
 *     3. WALK / PACE (frames 110-150): aristocratic forward strides, rhythmic body bob, paw steps.
 *     4. REACTION (frames 150-180): proud celebratory nod, tail swish, collar gleam on click/tap.
 * - Intentional Hero Movement:
 *     The pet lives inside the Hero composition and moves naturally between vantage points
 *     (idle -> notices user -> paces to new spot -> settles).
 * - Click / Tap Interaction:
 *     Triggers reaction and reveals the authentic brand statement:
 *     "YK MENS FASHION. Built for everyday confidence."
 * - Mobile + Desktop compatible, non-intrusive, zero scroll-jacking.
 */

// Colors in Lottie normalized format [r, g, b, 1]
const C_ESPRESSO = [0.2, 0.145, 0.122, 1];     // #33251F
const C_MOCHA = [0.29, 0.227, 0.196, 1];        // #4A3A32
const C_CREAM = [0.918, 0.875, 0.831, 1];      // #EADFD4
const C_BRASS = [0.769, 0.698, 0.635, 1];      // #C4B2A2
const C_WHITE = [0.98, 0.969, 0.949, 1];       // #FAF7F2
const C_DARK = [0.11, 0.08, 0.06, 1];          // #1C1410

// Authentic Bodymovin / Lottie Character Animation Specification (180 frames @ 30fps)
const petAnimationData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 180,
  w: 200,
  h: 200,
  nm: 'YKTailoredPet',
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Speech / Glint Accent on Collar (Active in Reaction frames 150-180)
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'CollarGlint',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 150, s: [0] },
            { t: 160, s: [100] },
            { t: 175, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [118, 88, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 150, s: [50, 50, 100] },
            { t: 165, s: [130, 130, 100] },
            { t: 180, s: [80, 80, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [6, 6] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 45 },
            },
            { ty: 'fl', c: { a: 0, k: C_WHITE }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },

    // Layer 2: Head & Muzzle (Rotates, turns to user in frames 60-110, nods in 150-180)
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'HeadAssembly',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            // Idle breathing head tilt
            { t: 0, s: [0] },
            { t: 30, s: [-2] },
            { t: 60, s: [0] },
            // Look towards user: perk up
            { t: 80, s: [6] },
            { t: 110, s: [4] },
            // Walking rhythm bob
            { t: 120, s: [-3] },
            { t: 135, s: [3] },
            { t: 150, s: [0] },
            // Reaction celebratory nod
            { t: 160, s: [-8] },
            { t: 172, s: [8] },
            { t: 180, s: [0] },
          ],
        },
        p: { a: 0, k: [112, 78, 0] },
        a: { a: 0, k: [112, 78, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        // Hound Head Profile
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: true,
                  v: [
                    [102, 68],
                    [118, 54],
                    [142, 66],
                    [152, 72],
                    [138, 76],
                    [120, 84],
                    [106, 80],
                  ],
                  i: [
                    [-4, 4],
                    [-8, 0],
                    [-4, -2],
                    [0, 2],
                    [2, 0],
                    [4, 2],
                    [0, -4],
                  ],
                  o: [
                    [4, -4],
                    [8, 0],
                    [4, 2],
                    [0, -2],
                    [-2, 0],
                    [-4, -2],
                    [0, 4],
                  ],
                },
              },
            },
            { ty: 'fl', c: { a: 0, k: C_ESPRESSO }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
        // Eye (Almond with natural blink keyframes)
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: {
                a: 1,
                k: [
                  { t: 0, s: [6, 4] },
                  { t: 42, s: [6, 4] },
                  { t: 45, s: [6, 0.5] }, // blink
                  { t: 48, s: [6, 4] },
                  { t: 155, s: [6, 4] },
                  { t: 158, s: [6, 0.5] }, // pleased wink
                  { t: 162, s: [6, 4] },
                ],
              },
              p: { a: 0, k: [126, 64] },
            },
            { ty: 'fl', c: { a: 0, k: C_WHITE }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
        // Eye Pupil
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [3, 3] },
              p: {
                a: 1,
                k: [
                  { t: 0, s: [127, 64] },
                  { t: 60, s: [127, 64] },
                  { t: 80, s: [128.5, 64.5] }, // looks toward user
                  { t: 150, s: [127, 64] },
                ],
              },
            },
            { ty: 'fl', c: { a: 0, k: C_DARK }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
        // Sleek Folded Hound Ear
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: true,
                  v: [
                    [106, 60],
                    [100, 68],
                    [102, 80],
                    [110, 72],
                  ],
                  i: [
                    [0, -2],
                    [-2, 0],
                    [0, 2],
                    [2, 0],
                  ],
                  o: [
                    [0, 2],
                    [2, 0],
                    [0, -2],
                    [-2, 0],
                  ],
                },
              },
            },
            { ty: 'fl', c: { a: 0, k: C_MOCHA }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },

    // Layer 3: Tailored Ascot / Lapel Collar
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'TailoredCollar',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [110, 92, 0] },
        a: { a: 0, k: [110, 92, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: true,
                  v: [
                    [98, 88],
                    [122, 94],
                    [118, 102],
                    [96, 96],
                  ],
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                },
              },
            },
            { ty: 'fl', c: { a: 0, k: C_CREAM }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
        // Polished Brass Button
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [4.5, 4.5] },
              p: { a: 0, k: [110, 96] },
            },
            { ty: 'fl', c: { a: 0, k: C_BRASS }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },

    // Layer 4: Torso & Chest (Breathing scaleY in idle, pacing bob in walk)
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: 'BodyTorso',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 110, s: [0] },
            { t: 120, s: [2] },
            { t: 135, s: [-2] },
            { t: 150, s: [0] },
          ],
        },
        p: { a: 0, k: [90, 130, 0] },
        a: { a: 0, k: [90, 130, 0] },
        s: {
          a: 1,
          k: [
            // Idle gentle breathing
            { t: 0, s: [100, 100, 100] },
            { t: 30, s: [100, 102.5, 100] },
            { t: 60, s: [100, 100, 100] },
            // Reaction proud chest puff
            { t: 150, s: [100, 100, 100] },
            { t: 165, s: [102, 105, 100] },
            { t: 180, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: true,
                  v: [
                    [80, 94],
                    [114, 98],
                    [108, 142],
                    [68, 146],
                    [64, 118],
                  ],
                  i: [
                    [-4, -6],
                    [6, 4],
                    [2, 6],
                    [-4, 2],
                    [-2, -4],
                  ],
                  o: [
                    [4, 6],
                    [-6, -4],
                    [-2, -6],
                    [4, -2],
                    [2, 4],
                  ],
                },
              },
            },
            { ty: 'fl', c: { a: 0, k: C_ESPRESSO }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },

    // Layer 5: Front Paws / Legs (Animated stepping in Walk frames 110-150)
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: 'FrontLegs',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 110, s: [0] },
            { t: 120, s: [8] },
            { t: 130, s: [-6] },
            { t: 140, s: [6] },
            { t: 150, s: [0] },
          ],
        },
        p: { a: 0, k: [106, 120, 0] },
        a: { a: 0, k: [106, 120, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: true,
                  v: [
                    [102, 114],
                    [112, 114],
                    [114, 154],
                    [100, 154],
                  ],
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                },
              },
            },
            { ty: 'fl', c: { a: 0, k: C_MOCHA }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },

    // Layer 6: Tail with dynamic wagging keyframes
    {
      ddd: 0,
      ind: 6,
      ty: 4,
      nm: 'TailWag',
      sr: 1,
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
      ao: 0,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            // Idle subtle sway
            { t: 0, s: [0] },
            { t: 20, s: [-6] },
            { t: 40, s: [6] },
            { t: 60, s: [0] },
            // Walk swish
            { t: 110, s: [0] },
            { t: 125, s: [-10] },
            { t: 140, s: [10] },
            { t: 150, s: [0] },
            // Reaction joyful rapid wag
            { t: 155, s: [-14] },
            { t: 162, s: [14] },
            { t: 170, s: [-14] },
            { t: 180, s: [0] },
          ],
        },
        p: { a: 0, k: [66, 136, 0] },
        a: { a: 0, k: [66, 136, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  c: false,
                  v: [
                    [66, 136],
                    [52, 134],
                    [44, 124],
                    [48, 114],
                  ],
                  i: [
                    [0, 0],
                    [4, 2],
                    [0, 4],
                    [-2, 0],
                  ],
                  o: [
                    [-4, -2],
                    [-4, -2],
                    [0, -4],
                    [2, 0],
                  ],
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: C_MOCHA },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3.5 },
              lc: 2,
              lj: 2,
            },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
        },
      ],
    },
  ],
};

/**
 * Bodymovin keyframes require bezier easing handles (`i` / `o`) on every
 * keyframe except the last. Without them lottie-web cannot interpolate and
 * produces invalid values (e.g. -999999 positions / giant ellipses), which
 * made the pet render as nothing / an off-canvas blob.
 * This adds standard ease handles to any animated property missing them.
 */
const withKeyframeEasing = (node) => {
  if (Array.isArray(node)) {
    node.forEach(withKeyframeEasing);
    return node;
  }
  if (!node || typeof node !== 'object') return node;

  if (node.a === 1 && Array.isArray(node.k) && node.k.length && typeof node.k[0] === 'object' && 't' in node.k[0]) {
    node.k.forEach((kf, idx) => {
      if (idx < node.k.length - 1) {
        if (!kf.o) kf.o = { x: 0.333, y: 0 };
        if (!kf.i) kf.i = { x: 0.667, y: 1 };
      }
    });
    return node;
  }

  Object.values(node).forEach(withKeyframeEasing);
  return node;
};

// Lottie mutates animationData during parsing, so each instance gets its own normalized copy
const createPetAnimationData = () => withKeyframeEasing(JSON.parse(JSON.stringify(petAnimationData)));

// Hero vantage positions (Desktop coordinates relative to anchor)
const VANTAGE_POSITIONS = [
  { x: 0, y: 0, label: 'Observation' },
  { x: 38, y: -10, label: 'Curious' },
  { x: -30, y: 6, label: 'Promenade' },
];

export const InteractiveBrandPet = ({ className = '' }) => {
  const containerRef = useRef(null);
  const animInstanceRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Position state within hero
  const [currentVantageIndex, setCurrentVantageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Initialize Lottie Open-Source Vector Animation Engine
  useEffect(() => {
    if (!containerRef.current) return;

    animInstanceRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: createPetAnimationData(),
    });

    // Start with IDLE breathing loop (frames 0 to 60)
    animInstanceRef.current.playSegments([0, 60], true);

    return () => {
      animInstanceRef.current?.destroy();
    };
  }, []);

  // Play a specific Lottie segment safely
  const playSegment = useCallback((startFrame, endFrame, loop = false) => {
    if (animInstanceRef.current) {
      animInstanceRef.current.playSegments([startFrame, endFrame], true);
      animInstanceRef.current.setLoop(loop);
    }
  }, []);

  // Periodic natural movement around the hero composition (every 11s)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const patrolTimer = setInterval(() => {
      if (isInteracting) return;

      // 1. Notice / Look at user (frames 60-110)
      playSegment(60, 110, false);

      setTimeout(() => {
        // 2. Walk / Pace to next vantage spot (frames 110-150)
        playSegment(110, 150, true);
        setCurrentVantageIndex((prev) => (prev + 1) % VANTAGE_POSITIONS.length);

        setTimeout(() => {
          // 3. Settle back into poised IDLE breathing (frames 0-60)
          playSegment(0, 60, true);
        }, 1400);
      }, 900);
    }, 11000);

    return () => clearInterval(patrolTimer);
  }, [isInteracting, shouldReduceMotion, playSegment]);

  // User click / tap interaction
  const handleInteraction = (e) => {
    e.stopPropagation();
    setIsInteracting(true);
    setShowMessage(true);

    // Play REACTION celebratory animation segment (frames 150 to 180)
    playSegment(150, 180, false);

    // Resume IDLE and dismiss brand statement naturally
    setTimeout(() => {
      playSegment(0, 60, true);
      setIsInteracting(false);
    }, 1500);

    setTimeout(() => {
      setShowMessage(false);
    }, 3600);
  };

  const currentPos = VANTAGE_POSITIONS[currentVantageIndex];

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? { x: 0, y: 0 }
          : {
              x: currentPos.x,
              y: currentPos.y,
            }
      }
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-20 select-none cursor-pointer flex flex-col items-center ${className}`}
      onClick={handleInteraction}
      role="button"
      tabIndex={0}
      aria-label="Interactive YK Fashion Brand Pet — Sir Kip"
    >
      {/* Brand Statement Bubble (revealed upon click/tap) */}
      {/* Positioning lives on a static wrapper so framer-motion's transform can't override the centering translate */}
      <div className="absolute bottom-[78%] right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 pointer-events-none z-50">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: -2, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative whitespace-nowrap bg-[#33251F] text-[#FAF7F2] px-3.5 py-1.5 rounded-xl shadow-xl border border-[#4A3A32] flex flex-col items-center text-center origin-bottom-right lg:origin-bottom"
            >
              <span className="font-serif font-bold text-xs tracking-wide text-[#FAF7F2]">
                YK MENS FASHION
              </span>
              <span className="text-[10px] font-sans text-[#EADFD4]/90 tracking-normal mt-0.5">
                Built for everyday confidence.
              </span>
              {/* Small speech arrow */}
              <div className="absolute top-full right-7 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 border-[5px] border-transparent border-t-[#33251F]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lottie Vector Runtime Container */}
      <div
        ref={containerRef}
        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center pointer-events-none"
      />
    </motion.div>
  );
};

export default InteractiveBrandPet;
