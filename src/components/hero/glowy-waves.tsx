"use client";

import { useEffect, useRef } from "react";

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const WAVE_PALETTE: WaveConfig[] = [
  { offset: 0, amplitude: 105, frequency: 0.003, color: "rgba(58, 125, 0, 0.85)", opacity: 0.65 },
  { offset: Math.PI / 2, amplitude: 135, frequency: 0.0026, color: "rgba(191, 255, 0, 0.7)", opacity: 0.5 },
  { offset: Math.PI, amplitude: 90, frequency: 0.0034, color: "rgba(212, 203, 194, 0.75)", opacity: 0.4 },
  { offset: Math.PI * 1.5, amplitude: 120, frequency: 0.0022, color: "rgba(26, 26, 26, 0.45)", opacity: 0.35 },
  { offset: Math.PI * 2, amplitude: 82, frequency: 0.004, color: "rgba(113, 113, 122, 0.5)", opacity: 0.3 },
  { offset: Math.PI * 0.75, amplitude: 95, frequency: 0.0028, color: "rgba(100, 200, 80, 0.65)", opacity: 0.45 },
];

export function GlowyWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReduced = motionQuery.matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const drawWave = (wave: WaveConfig) => {
      const mouseInfluence = prefersReduced ? 10 : 70;
      const influenceRadius = prefersReduced ? 160 : 320;

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 50;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#F5F0EB");
      gradient.addColorStop(1, "#EDE7DF");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      const smoothing = prefersReduced ? 0.04 : 0.1;

      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#F5F0EB");
      gradient.addColorStop(1, "#EDE7DF");
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      WAVE_PALETTE.forEach(drawWave);
      animationId = requestAnimationFrame(animate);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
      if (prefersReduced) {
        cancelAnimationFrame(animationId);
        drawStaticFrame();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    if (prefersReduced) {
      drawStaticFrame();
    } else {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
