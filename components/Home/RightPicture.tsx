// components/Home/RightPicture.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Picture from '@/public/Pictures/Picture.png';

interface RightPictureProps {
  isParentVisible: boolean;
}

const RightPicture = ({ isParentVisible }: RightPictureProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isParentVisible || !frameRef.current || !tiltRef.current) return;

    // Skip tilt on touch devices — no pointer, no benefit, saves battery.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const frame = frameRef.current;
    const tilt = tiltRef.current;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Smooth the tilt with a small lerp loop — reads as deliberate, not twitchy.
    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      tilt.style.transform = `perspective(1100px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    const handleMove = (e: PointerEvent) => {
      const { left, top, width, height } = frame.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      targetX = x * 5;
      targetY = y * -5;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    frame.addEventListener('pointermove', handleMove);
    frame.addEventListener('pointerleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      frame.removeEventListener('pointermove', handleMove);
      frame.removeEventListener('pointerleave', handleLeave);
    };
  }, [isParentVisible]);

  return (
    <div
      ref={frameRef}
      className="relative mx-auto w-full max-w-[280px] min-[400px]:max-w-[340px] sm:max-w-[420px]"
      style={{
        opacity: isParentVisible ? 1 : 0,
        transform: isParentVisible ? 'translateY(0)' : 'translateY(24px)',
        transition:
          'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 350ms',
      }}
    >
      {/* ---------- Backdrop layers (trimmed on mobile) ---------- */}

      {/* Dot grid — very subtle, sits far behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-20 opacity-[0.35] dark:opacity-[0.25]
                   sm:-inset-16
                   [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)]
                   [background-size:22px_22px]
                   [mask-image:radial-gradient(circle_at_center,black_35%,transparent_75%)]"
      />

      {/* Studio spotlight — single warm source from top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 sm:-inset-20
                   bg-[radial-gradient(60%_55%_at_28%_22%,rgba(249,115,22,0.22),transparent_70%)]
                   dark:bg-[radial-gradient(60%_55%_at_28%_22%,rgba(251,146,60,0.20),transparent_70%)]
                   blur-xl"
      />

      {/* Cool counter-glow — bottom-right, grounds the composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 sm:-inset-16
                   bg-[radial-gradient(50%_45%_at_78%_85%,rgba(56,189,248,0.14),transparent_70%)]
                   blur-2xl"
      />

      {/* ---------- Tilt wrapper ---------- */}
      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{
          transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ---------- Frame ---------- */}
        <div
          className="group relative aspect-square w-full overflow-hidden rounded-[24px] sm:rounded-[28px]
                     border border-(--color-border) bg-(--color-background-secondary)
                     shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_30px_80px_-30px_rgba(0,0,0,0.45)]"
        >
          {/* Portrait */}
          <Image
            src={Picture}
            alt="Ali Haider — Full Stack Developer"
            fill
            priority
            sizes="(max-width: 400px) 280px, (max-width: 640px) 340px, 420px"
            className="object-cover object-center transition-transform duration-[1200ms] ease-out
                       group-hover:scale-[1.04]"
          />

          {/* Warm top rim-light — sells the "lit portrait" illusion */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0
                       bg-gradient-to-b from-white/[0.08] via-transparent to-black/25
                       dark:from-white/[0.06] dark:to-black/40"
          />

          {/* Inner ring for edge definition */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px]
                       ring-1 ring-inset ring-black/5 dark:ring-white/10"
          />

          {/* Film grain — the single biggest "human-made" tell */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: '120px 120px',
            }}
          />
        </div>

        {/* ---------- Info bar ---------- */}
        <div
          className="absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5
                     rounded-2xl border border-(--color-border) bg-(--color-background)/90
                     px-3.5 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]
                     backdrop-blur-md sm:-bottom-5 sm:gap-3 sm:px-4 sm:py-2.5"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-full
                       bg-gradient-to-br from-(--color-primary) to-(--color-primary-dark)
                       text-white shadow-inner sm:h-8 sm:w-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/95" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-roboto-slab text-[10px] font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
              Based in
            </span>
            <span className="font-roboto-slab text-xs font-semibold text-(--color-text-primary)">
              Pakistan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPicture;