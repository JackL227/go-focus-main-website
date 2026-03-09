import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const COLS = 7;
const ROWS = 3;
const EW = 30;
const EH = 30;
const EGX = 10;
const EGY = 12;
const PLAYER_SPEED = 3.8;
const BULLET_SPEED = 7.5;
const ENEMY_BULLET_SPEED = 3.2;
const GRID_W = COLS * (EW + EGX) - EGX;

const ROW_COLORS: readonly string[] = ['#f59e0b', '#3b82f6', '#a855f7'];
const ROW_PTS: readonly number[] = [30, 20, 10];
const SANS = 'system-ui, -apple-system, "Segoe UI", sans-serif';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Enemy    { row: number; col: number; alive: boolean; }
interface Bullet   { x: number; y: number; friendly: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; r: number; }
type Phase = 'idle' | 'playing' | 'gameover' | 'win';

interface GS {
  phase: Phase;
  px: number;
  bullets: Bullet[];
  particles: Particle[];
  enemies: Enemy[];
  lives: number;
  score: number;
  dir: 1 | -1;
  gridX: number;
  gridY: number;
  gridVx: number;
  shootCooldown: number;
  enemyShootTimer: number;
  invincible: number;
  frame: number;
  keysDown: Set<string>;
  canW: number;
  canH: number;
  shake: number;
  flash: number;
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────

function drawStarfield(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  // Layer 1: Distant (tiny, slow twinkle)
  for (let i = 0; i < 50; i++) {
    const sx = (i * 137 + i * i * 7) % w;
    const sy = ((i * 71 + i * i * 3) % (h - 38)) + 30;
    ctx.globalAlpha = Math.sin(frame * 0.013 + i * 2.1) * 0.18 + 0.2;
    ctx.fillStyle = '#fff';
    ctx.fillRect(sx, sy, 0.7, 0.7);
  }
  // Layer 2: Medium
  for (let i = 0; i < 18; i++) {
    const sx = (i * 211 + i * i * 13) % w;
    const sy = ((i * 97 + i * i * 5) % (h - 42)) + 32;
    ctx.globalAlpha = Math.sin(frame * 0.022 + i * 1.7) * 0.22 + 0.3;
    ctx.fillStyle = i % 4 === 0 ? '#bae6fd' : '#fff';
    ctx.fillRect(sx, sy, 1, 1);
  }
  // Layer 3: Bright (few, prominent)
  for (let i = 0; i < 6; i++) {
    const sx = (i * 283 + i * i * 17) % w;
    const sy = ((i * 127 + i * i * 11) % (h - 50)) + 36;
    ctx.globalAlpha = Math.sin(frame * 0.035 + i * 0.9) * 0.28 + 0.48;
    ctx.fillStyle = i % 3 === 0 ? '#c4b5fd' : '#bae6fd';
    const s = 1.3 + Math.sin(frame * 0.025 + i) * 0.35;
    ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
  }
  ctx.globalAlpha = 1;
}

function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save();
  ctx.globalAlpha = 0.022;
  const g1 = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.4);
  g1.addColorStop(0, '#3b82f6');
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);
  const g2 = ctx.createRadialGradient(w * 0.75, h * 0.25, 0, w * 0.75, h * 0.25, w * 0.3);
  g2.addColorStop(0, '#a855f7');
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function drawEnemy(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  row: number, col: number,
  frame: number,
  logo: HTMLImageElement | null,
) {
  const color = ROW_COLORS[row];
  const breathe = Math.sin(frame * 0.04 + col * 0.5 + row * 0.8) * 1.5;
  const r = 13 + breathe;

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 16 + breathe * 2;

  if (logo) {
    // GoFocus emblem clipped to circle with color tint
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    ctx.drawImage(logo, cx - r, cy - r, r * 2, r * 2);
    ctx.fillStyle = color + '66';
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.restore();
    // Glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, r + 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = color + '70';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, px: number, py: number, invincible: number, frame: number) {
  if (invincible > 0 && Math.floor(invincible / 5) % 2 === 0) return;
  ctx.save();
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 14;

  // Thruster
  const flameH = 8 + Math.sin(frame * 0.5) * 3;
  const fg = ctx.createLinearGradient(px, py + 8, px, py + 8 + flameH);
  fg.addColorStop(0, '#22d3ee');
  fg.addColorStop(0.5, '#fb923c');
  fg.addColorStop(1, 'transparent');
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(px - 4, py + 8);
  ctx.lineTo(px, py + 8 + flameH);
  ctx.lineTo(px + 4, py + 8);
  ctx.closePath();
  ctx.fill();

  // Hull
  ctx.beginPath();
  ctx.moveTo(px, py - 14);
  ctx.lineTo(px - 15, py + 8);
  ctx.lineTo(px - 9, py + 5);
  ctx.lineTo(px, py + 8);
  ctx.lineTo(px + 9, py + 5);
  ctx.lineTo(px + 15, py + 8);
  ctx.closePath();
  const hg = ctx.createLinearGradient(px, py - 14, px, py + 8);
  hg.addColorStop(0, '#67e8f9');
  hg.addColorStop(1, '#0891b2');
  ctx.fillStyle = hg;
  ctx.fill();

  // Cockpit
  ctx.beginPath();
  ctx.arc(px, py - 3, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 0.7;
  ctx.stroke();

  ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, b: Bullet) {
  const color = b.friendly ? '#22d3ee' : '#f87171';
  const trailLen = b.friendly ? 18 : 12;
  const trailDir = b.friendly ? 1 : -1;

  ctx.save();
  // Trail gradient
  const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + trailLen * trailDir);
  grad.addColorStop(0, color + 'bb');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  const ty = trailDir > 0 ? b.y : b.y - trailLen;
  ctx.fillRect(b.x - 1.5, ty, 3, trailLen);

  // Core glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  const t = p.life / p.maxLife;
  ctx.save();
  ctx.globalAlpha = t * t;
  ctx.fillStyle = p.color;
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r * t + 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHUD(ctx: CanvasRenderingContext2D, gs: GS, hi: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(5,7,14,0.5)';
  ctx.fillRect(0, 0, gs.canW, 28);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(0, 28, gs.canW, 1);

  // Score label
  ctx.font = `500 7px ${SANS}`;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillText('SCORE', 10, 11);
  // Score value
  ctx.font = `700 10px ${SANS}`;
  ctx.fillStyle = '#22d3ee';
  ctx.shadowColor = 'rgba(34,211,238,0.3)';
  ctx.shadowBlur = 4;
  ctx.fillText(String(gs.score), 10, 22);
  ctx.shadowBlur = 0;

  // Best center
  if (hi > 0) {
    ctx.font = `500 7px ${SANS}`;
    ctx.fillStyle = 'rgba(245,158,11,0.35)';
    const l = `BEST: ${hi}`;
    ctx.fillText(l, gs.canW / 2 - ctx.measureText(l).width / 2, 18);
  }

  // Lives (dots)
  for (let i = 0; i < gs.lives; i++) {
    ctx.fillStyle = '#f87171';
    ctx.shadowColor = 'rgba(248,113,113,0.35)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(gs.canW - 12 - i * 12, 16, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFlash(ctx: CanvasRenderingContext2D, w: number, h: number, intensity: number) {
  if (intensity <= 0) return;
  ctx.save();
  ctx.globalAlpha = intensity * 0.12;
  const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.8);
  g.addColorStop(0, 'transparent');
  g.addColorStop(1, '#ef4444');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// ─── State factory ────────────────────────────────────────────────────────────
function makeGS(canW: number, canH: number): GS {
  const enemies: Enemy[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      enemies.push({ row: r, col: c, alive: true });

  return {
    phase: 'idle', px: canW / 2,
    bullets: [], particles: [], enemies,
    lives: 3, score: 0, dir: 1,
    gridX: (canW - GRID_W) / 2, gridY: 38, gridVx: 0.55,
    shootCooldown: 0, enemyShootTimer: 100, invincible: 0,
    frame: 0, keysDown: new Set(), canW, canH,
    shake: 0, flash: 0,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const GoFocusGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const gsRef     = useRef<GS | null>(null);
  const rafRef    = useRef<number>(0);
  const logoRef   = useRef<HTMLImageElement | null>(null);

  const [hi, setHi] = useState(() => {
    try { return parseInt(localStorage.getItem('gf-inv-hi') ?? '0', 10) || 0; } catch { return 0; }
  });
  const hiRef = useRef(hi);

  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);

  // Load GoFocus emblem
  useEffect(() => {
    const img = new Image();
    img.src = '/lovable-uploads/gofocus-icon.png';
    img.onload = () => { logoRef.current = img; };
  }, []);

  const saveHi = useCallback((s: number) => {
    const best = Math.max(hiRef.current, s);
    hiRef.current = best;
    setHi(best);
    try { localStorage.setItem('gf-inv-hi', String(best)); } catch { /* noop */ }
  }, []);

  const endGame = useCallback((result: 'gameover' | 'win') => {
    const gs = gsRef.current;
    if (!gs) return;
    gs.phase = result;
    saveHi(gs.score);
    setScore(gs.score);
    setPhase(result);
    cancelAnimationFrame(rafRef.current);
  }, [saveHi]);

  // ─── Game Loop ────────────────────────────────────────────────────────
  const runLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const gs     = gsRef.current;
    if (!canvas || !gs || gs.phase !== 'playing') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gs.frame++;

    // Input
    const left  = gs.keysDown.has('ArrowLeft')  || gs.keysDown.has('a') || gs.keysDown.has('A');
    const right = gs.keysDown.has('ArrowRight') || gs.keysDown.has('d') || gs.keysDown.has('D');
    const fire  = gs.keysDown.has(' ');

    if (left)  gs.px = Math.max(15, gs.px - PLAYER_SPEED);
    if (right) gs.px = Math.min(gs.canW - 15, gs.px + PLAYER_SPEED);

    if (fire && gs.shootCooldown <= 0) {
      gs.bullets.push({ x: gs.px, y: gs.canH - 50, friendly: true });
      gs.shootCooldown = 18;
    }
    if (gs.shootCooldown > 0) gs.shootCooldown--;

    // Enemy grid movement
    const alive = gs.enemies.filter(e => e.alive);
    if (alive.length === 0) { endGame('win'); return; }

    const leftCol   = Math.min(...alive.map(e => e.col));
    const rightCol  = Math.max(...alive.map(e => e.col));
    const gridLeft  = gs.gridX + leftCol * (EW + EGX);
    const gridRight = gs.gridX + rightCol * (EW + EGX) + EW;

    gs.gridX += gs.gridVx * gs.dir;
    if (gridRight >= gs.canW - 6 && gs.dir === 1) {
      gs.dir = -1; gs.gridY += 14; gs.gridVx = Math.min(gs.gridVx + 0.07, 2.8);
    }
    if (gridLeft <= 6 && gs.dir === -1) {
      gs.dir = 1; gs.gridY += 14; gs.gridVx = Math.min(gs.gridVx + 0.07, 2.8);
    }

    const bottomRow = Math.max(...alive.map(e => e.row));
    const lowestY   = gs.gridY + bottomRow * (EH + EGY) + EH + 10;
    if (lowestY >= gs.canH - 52) { endGame('gameover'); return; }

    // Enemy shooting
    gs.enemyShootTimer--;
    if (gs.enemyShootTimer <= 0) {
      const shooter = alive[Math.floor(Math.random() * alive.length)];
      gs.bullets.push({
        x: gs.gridX + shooter.col * (EW + EGX) + EW / 2,
        y: gs.gridY + shooter.row * (EH + EGY) + EH,
        friendly: false,
      });
      gs.enemyShootTimer = Math.max(22, 95 - (COLS * ROWS - alive.length) * 2);
    }

    // Move bullets
    for (const b of gs.bullets) b.y += b.friendly ? -BULLET_SPEED : ENEMY_BULLET_SPEED;
    gs.bullets = gs.bullets.filter(b => b.y > -20 && b.y < gs.canH + 20);

    // Friendly bullet ↔ enemy collision
    gs.bullets = gs.bullets.filter(b => {
      if (!b.friendly) return true;
      for (const e of alive) {
        const ex = gs.gridX + e.col * (EW + EGX) + EW / 2;
        const ey = gs.gridY + e.row * (EH + EGY) + EH / 2;
        if (Math.abs(b.x - ex) < 15 && Math.abs(b.y - ey) < 15) {
          e.alive = false;
          gs.score += ROW_PTS[e.row];
          setScore(gs.score);
          gs.shake = Math.min(gs.shake + 2.5, 5);
          const color = ROW_COLORS[e.row];
          for (let i = 0; i < 16; i++) {
            gs.particles.push({
              x: ex, y: ey,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 38, maxLife: 38,
              color, r: 1.5 + Math.random() * 4,
            });
          }
          return false;
        }
      }
      return true;
    });

    // Enemy bullet ↔ player collision
    const playerY = gs.canH - 44;
    if (gs.invincible <= 0) {
      gs.bullets = gs.bullets.filter(b => {
        if (b.friendly) return true;
        if (Math.abs(b.x - gs.px) < 15 && b.y > playerY - 13 && b.y < playerY + 13) {
          gs.lives--;
          gs.invincible = 80;
          gs.shake = 6;
          gs.flash = 1;
          for (let i = 0; i < 12; i++) {
            gs.particles.push({
              x: gs.px, y: playerY,
              vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
              life: 30, maxLife: 30, color: '#22d3ee', r: 2,
            });
          }
          if (gs.lives <= 0) endGame('gameover');
          return false;
        }
        return true;
      });
    }
    if (gs.invincible > 0) gs.invincible--;

    // Particles
    for (const p of gs.particles) { p.x += p.vx; p.y += p.vy; p.vx *= 0.93; p.vy *= 0.93; p.life--; }
    gs.particles = gs.particles.filter(p => p.life > 0);

    // Decay shake & flash
    if (gs.shake > 0) { gs.shake *= 0.88; if (gs.shake < 0.2) gs.shake = 0; }
    if (gs.flash > 0) { gs.flash *= 0.9; if (gs.flash < 0.05) gs.flash = 0; }

    // ── Render ──
    ctx.save();
    if (gs.shake > 0) {
      ctx.translate(
        (Math.random() - 0.5) * gs.shake * 2,
        (Math.random() - 0.5) * gs.shake * 2,
      );
    }

    ctx.fillStyle = '#050710';
    ctx.fillRect(-5, -5, gs.canW + 10, gs.canH + 10);

    drawNebula(ctx, gs.canW, gs.canH);
    drawStarfield(ctx, gs.canW, gs.canH, gs.frame);
    drawHUD(ctx, gs, hiRef.current);

    for (const e of gs.enemies) {
      if (!e.alive) continue;
      drawEnemy(
        ctx,
        gs.gridX + e.col * (EW + EGX) + EW / 2,
        gs.gridY + e.row * (EH + EGY) + EH / 2,
        e.row, e.col, gs.frame, logoRef.current,
      );
    }
    for (const b of gs.bullets) drawBullet(ctx, b);
    drawPlayer(ctx, gs.px, playerY, gs.invincible, gs.frame);
    for (const p of gs.particles) drawParticle(ctx, p);
    drawFlash(ctx, gs.canW, gs.canH, gs.flash);

    ctx.restore();

    rafRef.current = requestAnimationFrame(runLoop);
  }, [endGame]);

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gs    = makeGS(canvas.width, canvas.height);
    gs.phase    = 'playing';
    gsRef.current = gs;
    setPhase('playing');
    setScore(0);
    rafRef.current = requestAnimationFrame(runLoop);
  }, [runLoop]);

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      canvas.width  = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
      if (gsRef.current) {
        gsRef.current.canW = canvas.width;
        gsRef.current.canH = canvas.height;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Keyboard
  useEffect(() => {
    const GAME_KEYS = [' ', 'ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'];
    const onDown = (e: KeyboardEvent) => {
      const gs = gsRef.current;
      if (!gs || gs.phase !== 'playing') return;
      if (GAME_KEYS.includes(e.key)) e.preventDefault();
      gs.keysDown.add(e.key);
    };
    const onUp = (e: KeyboardEvent) => gsRef.current?.keysDown.delete(e.key);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  // Mobile / pointer
  const press   = (k: string) => gsRef.current?.keysDown.add(k);
  const release = (k: string) => gsRef.current?.keysDown.delete(k);

  return (
    <div className="flex flex-col w-full h-full bg-[#050710] overflow-hidden select-none">
      {/* Canvas area */}
      <div ref={wrapRef} className="relative flex-1 min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ── IDLE SCREEN ── */}
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050710]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center px-6"
            >
              {/* Logo */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-4 w-12 h-12 rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: '0 0 30px rgba(59,130,246,0.2)' }}
              >
                <img
                  src="/lovable-uploads/gofocus-icon.png"
                  alt="GoFocus"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <h2
                className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
              >
                GoFocus{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Invaders
                </span>
              </h2>

              <p className="text-white/30 text-[10px] mb-5" style={{ fontFamily: SANS }}>
                Destroy all GoFocus emblems to win
              </p>

              {/* Point values */}
              <div className="flex items-center justify-center gap-3 mb-5">
                {ROW_COLORS.map((c, i) => (
                  <div key={c} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: c, boxShadow: `0 0 8px ${c}55` }}
                    />
                    <span className="text-[9px] font-medium" style={{ color: c + 'cc', fontFamily: SANS }}>
                      {ROW_PTS[i]} pts
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startGame}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(59,130,246,0.12))',
                  border: '1px solid rgba(34,211,238,0.3)',
                  color: '#22d3ee',
                  boxShadow: '0 0 20px rgba(34,211,238,0.1)',
                  fontFamily: SANS,
                }}
              >
                <Play size={14} />
                Start Game
              </motion.button>

              <p className="text-white/15 text-[8px] mt-4" style={{ fontFamily: SANS }}>
                Arrow keys to move · Space to fire
              </p>

              {hi > 0 && (
                <p className="text-amber-400/40 text-[9px] mt-2 font-medium" style={{ fontFamily: SANS }}>
                  Best: {hi}
                </p>
              )}
            </motion.div>
          </div>
        )}

        {/* ── END SCREEN ── */}
        {(phase === 'gameover' || phase === 'win') && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(5,7,16,0.82)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-center px-6"
            >
              <h2
                className="text-2xl font-bold tracking-tight mb-2"
                style={{
                  color: phase === 'win' ? '#f59e0b' : '#f87171',
                  textShadow: `0 0 24px ${phase === 'win' ? 'rgba(245,158,11,0.4)' : 'rgba(248,113,113,0.4)'}`,
                  fontFamily: 'Poppins, system-ui, sans-serif',
                }}
              >
                {phase === 'win' ? 'Victory!' : 'Game Over'}
              </h2>

              <p className="text-white/50 text-sm mb-1" style={{ fontFamily: SANS }}>
                Score: <span className="text-white font-bold">{score}</span>
              </p>
              <p className="text-amber-400/40 text-xs mb-5" style={{ fontFamily: SANS }}>
                Best: {hi}
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startGame}
                className="inline-flex items-center gap-2 mx-auto px-6 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                style={{
                  background: 'rgba(34,211,238,0.08)',
                  border: '1px solid rgba(34,211,238,0.35)',
                  color: '#22d3ee',
                  boxShadow: '0 0 16px rgba(34,211,238,0.1)',
                  fontFamily: SANS,
                }}
              >
                <RotateCcw size={12} />
                Play Again
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      {/* ── MOBILE CONTROLS ── */}
      {phase === 'playing' && (
        <div
          className="flex items-center justify-between px-3 py-2 shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(5,7,16,0.85)' }}
        >
          <div className="flex gap-1.5">
            <button
              className="w-11 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onPointerDown={() => press('ArrowLeft')}
              onPointerUp={() => release('ArrowLeft')}
              onPointerLeave={() => release('ArrowLeft')}
              aria-label="Move left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="w-11 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onPointerDown={() => press('ArrowRight')}
              onPointerUp={() => release('ArrowRight')}
              onPointerLeave={() => release('ArrowRight')}
              aria-label="Move right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <button
            className="h-9 px-5 rounded-lg text-[10px] font-semibold transition-all active:scale-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(59,130,246,0.1))',
              border: '1px solid rgba(34,211,238,0.3)',
              color: '#22d3ee',
              boxShadow: '0 0 10px rgba(34,211,238,0.1)',
              fontFamily: SANS,
            }}
            onPointerDown={() => press(' ')}
            onPointerUp={() => release(' ')}
            onPointerLeave={() => release(' ')}
            aria-label="Fire"
          >
            FIRE
          </button>
        </div>
      )}
    </div>
  );
};

export default GoFocusGame;
