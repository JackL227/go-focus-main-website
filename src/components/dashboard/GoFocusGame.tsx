import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const PLAYER_SPEED = 4.2;
const BULLET_SPEED = 8;
const ENEMY_BULLET_SPEED = 3.5;
const MAX_LEVEL = 5;
const SANS = 'system-ui, -apple-system, "Segoe UI", sans-serif';

// ─── Level Configs ────────────────────────────────────────────────────────────
interface LevelConfig {
  cols: number;
  rows: number;
  enemySpeed: number;
  shootInterval: number;
  hasBoss: boolean;
  bossHp: number;
  bgHue: number;
  title: string;
  subtitle: string;
  powerUpChance: number;
  perspectiveStrength: number;
}

const LEVELS: LevelConfig[] = [
  { cols: 6, rows: 3, enemySpeed: 0.55, shootInterval: 100, hasBoss: false, bossHp: 0, bgHue: 220, title: 'System Boot', subtitle: 'Clear the grid', powerUpChance: 0.15, perspectiveStrength: 0 },
  { cols: 7, rows: 3, enemySpeed: 0.7, shootInterval: 80, hasBoss: false, bossHp: 0, bgHue: 260, title: 'Data Stream', subtitle: 'They\'re faster now', powerUpChance: 0.2, perspectiveStrength: 0.15 },
  { cols: 7, rows: 4, enemySpeed: 0.85, shootInterval: 65, hasBoss: false, bossHp: 0, bgHue: 300, title: 'Neural Net', subtitle: 'More enemies approach', powerUpChance: 0.25, perspectiveStrength: 0.3 },
  { cols: 8, rows: 4, enemySpeed: 1.0, shootInterval: 50, hasBoss: false, bossHp: 0, bgHue: 340, title: 'Quantum Core', subtitle: 'The swarm intensifies', powerUpChance: 0.3, perspectiveStrength: 0.45 },
  { cols: 5, rows: 2, enemySpeed: 1.2, shootInterval: 40, hasBoss: true, bossHp: 30, bgHue: 0, title: 'Final Override', subtitle: 'Defeat the Boss', powerUpChance: 0.35, perspectiveStrength: 0.5 },
];

const ROW_COLORS: string[] = ['#f59e0b', '#3b82f6', '#a855f7', '#ef4444'];
const ROW_PTS: number[] = [30, 20, 10, 40];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Enemy { row: number; col: number; alive: boolean; hp: number; maxHp: number; }
interface Bullet { x: number; y: number; friendly: boolean; piercing?: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; r: number; }
interface PowerUp { x: number; y: number; type: 'rapid' | 'shield' | 'triple' | 'piercing'; life: number; }
interface Boss { x: number; y: number; hp: number; maxHp: number; phase: number; shootTimer: number; moveDir: number; alive: boolean; hitFlash: number; }
type Phase = 'idle' | 'playing' | 'gameover' | 'win' | 'levelup' | 'bossintro';

interface Star3D { x: number; y: number; z: number; }

interface GS {
  phase: Phase;
  level: number;
  px: number;
  bullets: Bullet[];
  particles: Particle[];
  enemies: Enemy[];
  powerUps: PowerUp[];
  boss: Boss | null;
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
  // Power-up states
  rapidFire: number;
  shieldActive: number;
  tripleShot: number;
  piercingShot: number;
  // 3D starfield
  stars3D: Star3D[];
  // Level transition
  warpSpeed: number;
  levelupTimer: number;
  // Grid sizing
  ew: number;
  eh: number;
  egx: number;
  egy: number;
}

// ─── 3D Starfield ─────────────────────────────────────────────────────────────
function initStars3D(count: number): Star3D[] {
  const stars: Star3D[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
    });
  }
  return stars;
}

function drawStars3D(ctx: CanvasRenderingContext2D, stars: Star3D[], w: number, h: number, speed: number, hue: number) {
  const cx = w / 2;
  const cy = h / 2;
  for (const star of stars) {
    star.z -= speed;
    if (star.z <= 0.001) {
      star.z = 1;
      star.x = (Math.random() - 0.5) * 2;
      star.y = (Math.random() - 0.5) * 2;
    }
    const sx = cx + (star.x / star.z) * (w * 0.5);
    const sy = cy + (star.y / star.z) * (h * 0.5);
    if (sx < 0 || sx > w || sy < 0 || sy > h) {
      star.z = 1;
      continue;
    }
    const size = Math.max(0.5, (1 - star.z) * 3);
    const alpha = Math.max(0.1, (1 - star.z));

    // Star streak during warp
    if (speed > 0.008) {
      const streakLen = Math.min(speed * 400, 30) * (1 - star.z);
      const dx = sx - cx;
      const dy = sy - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      ctx.save();
      ctx.globalAlpha = alpha * 0.6;
      const grad = ctx.createLinearGradient(sx, sy, sx - nx * streakLen, sy - ny * streakLen);
      grad.addColorStop(0, `hsla(${hue}, 70%, 80%, 1)`);
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = size * 0.8;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - nx * streakLen, sy - ny * streakLen);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `hsl(${hue}, 60%, ${75 + star.z * 25}%)`;
    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────
function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, hue: number) {
  ctx.save();
  ctx.globalAlpha = 0.03;
  const g1 = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.4);
  g1.addColorStop(0, `hsl(${hue}, 70%, 50%)`);
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);
  const g2 = ctx.createRadialGradient(w * 0.75, h * 0.25, 0, w * 0.75, h * 0.25, w * 0.3);
  g2.addColorStop(0, `hsl(${(hue + 60) % 360}, 60%, 50%)`);
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
  perspective: number,
  hp: number, maxHp: number,
) {
  const color = ROW_COLORS[row % ROW_COLORS.length];
  const breathe = Math.sin(frame * 0.04 + col * 0.5 + row * 0.8) * 1.5;
  const r = 13 + breathe;

  // 3D perspective: slight scale based on Y position
  const pScale = 1 + perspective * (cy / 400 - 0.5) * 0.15;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(pScale, pScale);
  ctx.shadowColor = color;
  ctx.shadowBlur = 16 + breathe * 2;

  if (logo) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    ctx.drawImage(logo, -r, -r, r * 2, r * 2);
    ctx.fillStyle = color + '66';
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(0, r + 0.5, 0, 0, Math.PI * 2);
    ctx.strokeStyle = color + '70';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, r + 0.5, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // HP bar for enemies with more than 1 hp
  if (maxHp > 1 && hp > 0) {
    const barW = r * 2;
    const barH = 3;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(-barW / 2, r + 4, barW, barH);
    ctx.fillStyle = color;
    ctx.fillRect(-barW / 2, r + 4, barW * (hp / maxHp), barH);
  }

  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, px: number, py: number, invincible: number, frame: number, shieldActive: boolean) {
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

  // Shield bubble
  if (shieldActive) {
    ctx.beginPath();
    ctx.arc(px, py, 22, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 + Math.sin(frame * 0.1) * 0.15})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = `rgba(34, 211, 238, ${0.04 + Math.sin(frame * 0.1) * 0.02})`;
    ctx.fill();
  }

  ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, b: Bullet) {
  const color = b.friendly ? (b.piercing ? '#f59e0b' : '#22d3ee') : '#f87171';
  const trailLen = b.friendly ? 18 : 12;
  const trailDir = b.friendly ? 1 : -1;

  ctx.save();
  const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + trailLen * trailDir);
  grad.addColorStop(0, color + 'bb');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  const ty = trailDir > 0 ? b.y : b.y - trailLen;
  ctx.fillRect(b.x - 1.5, ty, 3, trailLen);

  ctx.shadowColor = color;
  ctx.shadowBlur = b.piercing ? 12 : 8;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.piercing ? 3 : 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.piercing ? 5 : 3.5, 0, Math.PI * 2);
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

function drawPowerUp(ctx: CanvasRenderingContext2D, p: PowerUp, frame: number) {
  const colors: Record<string, string> = {
    rapid: '#22d3ee', shield: '#3b82f6', triple: '#a855f7', piercing: '#f59e0b',
  };
  const icons: Record<string, string> = {
    rapid: 'R', shield: 'S', triple: 'T', piercing: 'P',
  };
  const color = colors[p.type];
  const bob = Math.sin(frame * 0.06 + p.x) * 3;
  const pulse = 1 + Math.sin(frame * 0.08) * 0.1;

  ctx.save();
  ctx.translate(p.x, p.y + bob);
  ctx.scale(pulse, pulse);

  // Outer glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.fillStyle = color + '20';
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();

  // Inner circle
  ctx.fillStyle = color + '60';
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Letter
  ctx.fillStyle = '#fff';
  ctx.font = `bold 8px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(icons[p.type], 0, 0.5);

  ctx.restore();
}

function drawBoss(ctx: CanvasRenderingContext2D, boss: Boss, frame: number, logo: HTMLImageElement | null) {
  if (!boss.alive) return;
  const { x, y, hp, maxHp, hitFlash } = boss;
  const breathe = Math.sin(frame * 0.03) * 4;
  const r = 35 + breathe;

  ctx.save();
  ctx.translate(x, y);

  // Rotating ring
  ctx.save();
  ctx.rotate(frame * 0.015);
  ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 + Math.sin(frame * 0.05) * 0.15})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, r + 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Second ring, opposite rotation
  ctx.save();
  ctx.rotate(-frame * 0.01);
  ctx.strokeStyle = `rgba(245, 158, 11, ${0.2 + Math.sin(frame * 0.04) * 0.1})`;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 10]);
  ctx.beginPath();
  ctx.arc(0, 0, r + 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Hit flash
  if (hitFlash > 0) {
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 30;
  } else {
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 25;
  }

  // Body
  if (logo) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    ctx.drawImage(logo, -r, -r, r * 2, r * 2);
    ctx.fillStyle = hitFlash > 0 ? 'rgba(255,255,255,0.4)' : 'rgba(239,68,68,0.35)';
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
  } else {
    ctx.fillStyle = hitFlash > 0 ? '#fff' : '#ef4444';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Border ring
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = hitFlash > 0 ? '#fff' : 'rgba(239,68,68,0.6)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // HP bar
  const barW = r * 2.5;
  const barH = 5;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(-barW / 2, r + 18, barW, barH);
  const hpRatio = hp / maxHp;
  const hpColor = hpRatio > 0.5 ? '#ef4444' : hpRatio > 0.25 ? '#f59e0b' : '#22d3ee';
  ctx.fillStyle = hpColor;
  ctx.fillRect(-barW / 2, r + 18, barW * hpRatio, barH);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(-barW / 2, r + 18, barW, barH);

  // BOSS label
  ctx.font = `bold 7px ${SANS}`;
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'center';
  ctx.fillText('BOSS', 0, r + 32);

  ctx.restore();
}

function drawHUD(ctx: CanvasRenderingContext2D, gs: GS, hi: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(5,7,14,0.55)';
  ctx.fillRect(0, 0, gs.canW, 30);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(0, 30, gs.canW, 1);

  // Score
  ctx.font = `500 7px ${SANS}`;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillText('SCORE', 10, 11);
  ctx.font = `700 10px ${SANS}`;
  ctx.fillStyle = '#22d3ee';
  ctx.shadowColor = 'rgba(34,211,238,0.3)';
  ctx.shadowBlur = 4;
  ctx.fillText(String(gs.score), 10, 23);
  ctx.shadowBlur = 0;

  // Level indicator
  ctx.font = `600 8px ${SANS}`;
  ctx.fillStyle = `hsl(${LEVELS[gs.level].bgHue}, 70%, 65%)`;
  const levelText = `LVL ${gs.level + 1}`;
  ctx.fillText(levelText, gs.canW / 2 - ctx.measureText(levelText).width / 2, 13);
  ctx.font = `400 7px ${SANS}`;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  const titleText = LEVELS[gs.level].title.toUpperCase();
  ctx.fillText(titleText, gs.canW / 2 - ctx.measureText(titleText).width / 2, 23);

  // Best
  if (hi > 0) {
    ctx.font = `500 7px ${SANS}`;
    ctx.fillStyle = 'rgba(245,158,11,0.35)';
    const l = `BEST: ${hi}`;
    ctx.fillText(l, gs.canW - ctx.measureText(l).width - 50, 11);
  }

  // Lives
  for (let i = 0; i < gs.lives; i++) {
    ctx.fillStyle = '#f87171';
    ctx.shadowColor = 'rgba(248,113,113,0.35)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(gs.canW - 12 - i * 12, 16, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Active power-ups indicator
  const powers: { label: string; color: string; time: number }[] = [];
  if (gs.rapidFire > 0) powers.push({ label: 'RAPID', color: '#22d3ee', time: gs.rapidFire });
  if (gs.shieldActive > 0) powers.push({ label: 'SHIELD', color: '#3b82f6', time: gs.shieldActive });
  if (gs.tripleShot > 0) powers.push({ label: 'TRIPLE', color: '#a855f7', time: gs.tripleShot });
  if (gs.piercingShot > 0) powers.push({ label: 'PIERCE', color: '#f59e0b', time: gs.piercingShot });

  ctx.shadowBlur = 0;
  powers.forEach((pw, i) => {
    const px = 10 + i * 46;
    const py = gs.canH - 14;
    ctx.fillStyle = pw.color + '30';
    ctx.fillRect(px, py - 6, 40, 10);
    ctx.strokeStyle = pw.color + '60';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(px, py - 6, 40, 10);
    ctx.fillStyle = pw.color;
    ctx.font = `bold 6px ${SANS}`;
    ctx.fillText(pw.label, px + 3, py + 1);
  });

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

// ─── 3D Grid floor ───────────────────────────────────────────────────────────
function drawGridFloor(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number, hue: number, strength: number) {
  if (strength <= 0) return;
  ctx.save();
  ctx.globalAlpha = strength * 0.15;

  const horizon = h * 0.35;
  const gridCount = 20;
  const speed = frame * 0.5;

  // Horizontal lines with perspective
  for (let i = 0; i < gridCount; i++) {
    const t = ((i / gridCount) + (speed % 1) / gridCount) % 1;
    const y = horizon + t * t * (h - horizon);
    const alpha = t * 0.5;
    ctx.strokeStyle = `hsla(${hue}, 60%, 50%, ${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Vertical lines converging to center
  const vanishX = w / 2;
  for (let i = -8; i <= 8; i++) {
    const baseX = vanishX + i * (w / 10);
    ctx.strokeStyle = `hsla(${hue}, 50%, 45%, 0.2)`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo(baseX, h);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── State factory ────────────────────────────────────────────────────────────
function makeGS(canW: number, canH: number, level: number, score: number, lives: number): GS {
  const cfg = LEVELS[level];
  const ew = 30;
  const eh = 30;
  const egx = 10;
  const egy = 12;

  const enemies: Enemy[] = [];
  const hpPerEnemy = level >= 3 ? 2 : 1;
  for (let r = 0; r < cfg.rows; r++)
    for (let c = 0; c < cfg.cols; c++)
      enemies.push({ row: r, col: c, alive: true, hp: hpPerEnemy, maxHp: hpPerEnemy });

  const gridW = cfg.cols * (ew + egx) - egx;

  return {
    phase: 'playing',
    level,
    px: canW / 2,
    bullets: [], particles: [], enemies, powerUps: [],
    boss: cfg.hasBoss ? {
      x: canW / 2, y: 70, hp: cfg.bossHp, maxHp: cfg.bossHp,
      phase: 0, shootTimer: 60, moveDir: 1, alive: true, hitFlash: 0,
    } : null,
    lives, score, dir: 1,
    gridX: (canW - gridW) / 2, gridY: 42, gridVx: cfg.enemySpeed,
    shootCooldown: 0, enemyShootTimer: cfg.shootInterval, invincible: 0,
    frame: 0, keysDown: new Set(), canW, canH,
    shake: 0, flash: 0,
    rapidFire: 0, shieldActive: 0, tripleShot: 0, piercingShot: 0,
    stars3D: initStars3D(150),
    warpSpeed: 0, levelupTimer: 0,
    ew, eh, egx, egy,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const GoFocusGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gsRef = useRef<GS | null>(null);
  const rafRef = useRef<number>(0);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const [hi, setHi] = useState(() => {
    try { return parseInt(localStorage.getItem('gf-inv-hi') ?? '0', 10) || 0; } catch { return 0; }
  });
  const hiRef = useRef(hi);

  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

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

  // ─── Spawn Power-up ──────────────────────────────────────────────────
  const spawnPowerUp = (gs: GS, x: number, y: number) => {
    const cfg = LEVELS[gs.level];
    if (Math.random() > cfg.powerUpChance) return;
    const types: PowerUp['type'][] = ['rapid', 'shield', 'triple', 'piercing'];
    gs.powerUps.push({
      x, y,
      type: types[Math.floor(Math.random() * types.length)],
      life: 400,
    });
  };

  // ─── Level Up ────────────────────────────────────────────────────────
  const startLevel = useCallback((lvl: number, currentScore: number, currentLives: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gs = makeGS(canvas.width, canvas.height, lvl, currentScore, currentLives);
    gsRef.current = gs;
    setLevel(lvl);
    setPhase('playing');
    rafRef.current = requestAnimationFrame(runLoop);
  }, []);

  // ─── Game Loop ────────────────────────────────────────────────────────
  const runLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const gs = gsRef.current;
    if (!canvas || !gs || (gs.phase !== 'playing' && gs.phase !== 'levelup')) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gs.frame++;
    const cfg = LEVELS[gs.level];

    // ─── Level-up warp transition ───────────────────────────────────
    if (gs.phase === 'levelup') {
      gs.levelupTimer--;
      gs.warpSpeed = Math.min(gs.warpSpeed + 0.002, 0.06);

      ctx.fillStyle = '#050710';
      ctx.fillRect(0, 0, gs.canW, gs.canH);
      drawStars3D(ctx, gs.stars3D, gs.canW, gs.canH, gs.warpSpeed, cfg.bgHue);

      // Level text
      const nextLvl = gs.level + 1;
      if (nextLvl < MAX_LEVEL) {
        const nextCfg = LEVELS[nextLvl];
        ctx.save();
        ctx.globalAlpha = Math.min(1, (120 - gs.levelupTimer) / 30);
        ctx.font = `bold 16px ${SANS}`;
        ctx.fillStyle = `hsl(${nextCfg.bgHue}, 70%, 65%)`;
        ctx.textAlign = 'center';
        ctx.fillText(`LEVEL ${nextLvl + 1}`, gs.canW / 2, gs.canH / 2 - 12);
        ctx.font = `500 9px ${SANS}`;
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(nextCfg.title.toUpperCase(), gs.canW / 2, gs.canH / 2 + 6);
        ctx.font = `400 8px ${SANS}`;
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillText(nextCfg.subtitle, gs.canW / 2, gs.canH / 2 + 20);
        ctx.restore();
      }

      if (gs.levelupTimer <= 0) {
        cancelAnimationFrame(rafRef.current);
        startLevel(gs.level + 1, gs.score, gs.lives);
        return;
      }

      rafRef.current = requestAnimationFrame(runLoop);
      return;
    }

    // ─── Input ──────────────────────────────────────────────────────
    const left = gs.keysDown.has('ArrowLeft') || gs.keysDown.has('a') || gs.keysDown.has('A');
    const right = gs.keysDown.has('ArrowRight') || gs.keysDown.has('d') || gs.keysDown.has('D');
    const fire = gs.keysDown.has(' ');

    if (left) gs.px = Math.max(15, gs.px - PLAYER_SPEED);
    if (right) gs.px = Math.min(gs.canW - 15, gs.px + PLAYER_SPEED);

    const cooldownMax = gs.rapidFire > 0 ? 7 : 18;
    if (fire && gs.shootCooldown <= 0) {
      const playerY = gs.canH - 50;
      if (gs.tripleShot > 0) {
        gs.bullets.push({ x: gs.px, y: playerY, friendly: true, piercing: gs.piercingShot > 0 });
        gs.bullets.push({ x: gs.px - 10, y: playerY + 4, friendly: true, piercing: gs.piercingShot > 0 });
        gs.bullets.push({ x: gs.px + 10, y: playerY + 4, friendly: true, piercing: gs.piercingShot > 0 });
      } else {
        gs.bullets.push({ x: gs.px, y: playerY, friendly: true, piercing: gs.piercingShot > 0 });
      }
      gs.shootCooldown = cooldownMax;
    }
    if (gs.shootCooldown > 0) gs.shootCooldown--;

    // Decay power-ups
    if (gs.rapidFire > 0) gs.rapidFire--;
    if (gs.shieldActive > 0) gs.shieldActive--;
    if (gs.tripleShot > 0) gs.tripleShot--;
    if (gs.piercingShot > 0) gs.piercingShot--;

    // ─── Enemy grid ─────────────────────────────────────────────────
    const alive = gs.enemies.filter(e => e.alive);
    const allEnemiesDead = alive.length === 0;
    const bossDead = gs.boss && !gs.boss.alive;

    // Check win condition
    if (allEnemiesDead && (!gs.boss || bossDead)) {
      if (gs.level + 1 >= MAX_LEVEL) {
        endGame('win');
        return;
      }
      // Level up transition
      gs.phase = 'levelup';
      gs.levelupTimer = 120;
      gs.warpSpeed = 0;
      setPhase('levelup');
      rafRef.current = requestAnimationFrame(runLoop);
      return;
    }

    if (alive.length > 0) {
      const leftCol = Math.min(...alive.map(e => e.col));
      const rightCol = Math.max(...alive.map(e => e.col));
      const gridLeft = gs.gridX + leftCol * (gs.ew + gs.egx);
      const gridRight = gs.gridX + rightCol * (gs.ew + gs.egx) + gs.ew;

      gs.gridX += gs.gridVx * gs.dir;
      if (gridRight >= gs.canW - 6 && gs.dir === 1) {
        gs.dir = -1; gs.gridY += 12; gs.gridVx = Math.min(gs.gridVx + 0.06, 2.8);
      }
      if (gridLeft <= 6 && gs.dir === -1) {
        gs.dir = 1; gs.gridY += 12; gs.gridVx = Math.min(gs.gridVx + 0.06, 2.8);
      }

      const bottomRow = Math.max(...alive.map(e => e.row));
      const lowestY = gs.gridY + bottomRow * (gs.eh + gs.egy) + gs.eh + 10;
      if (lowestY >= gs.canH - 52) { endGame('gameover'); return; }

      // Enemy shooting
      gs.enemyShootTimer--;
      if (gs.enemyShootTimer <= 0) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        gs.bullets.push({
          x: gs.gridX + shooter.col * (gs.ew + gs.egx) + gs.ew / 2,
          y: gs.gridY + shooter.row * (gs.eh + gs.egy) + gs.eh,
          friendly: false,
        });
        gs.enemyShootTimer = Math.max(18, cfg.shootInterval - (cfg.cols * cfg.rows - alive.length) * 2);
      }
    }

    // ─── Boss Logic ─────────────────────────────────────────────────
    if (gs.boss && gs.boss.alive) {
      const boss = gs.boss;
      // Move
      boss.x += boss.moveDir * (1.5 + gs.level * 0.3);
      if (boss.x > gs.canW - 50) boss.moveDir = -1;
      if (boss.x < 50) boss.moveDir = 1;

      // Shoot patterns based on HP
      boss.shootTimer--;
      if (boss.shootTimer <= 0) {
        const hpRatio = boss.hp / boss.maxHp;
        if (hpRatio > 0.5) {
          // Single aimed shot
          gs.bullets.push({ x: boss.x, y: boss.y + 40, friendly: false });
        } else if (hpRatio > 0.25) {
          // Spread shot
          for (let i = -1; i <= 1; i++) {
            gs.bullets.push({ x: boss.x + i * 20, y: boss.y + 40, friendly: false });
          }
        } else {
          // Barrage
          for (let i = -2; i <= 2; i++) {
            gs.bullets.push({ x: boss.x + i * 15, y: boss.y + 40, friendly: false });
          }
        }
        boss.shootTimer = Math.max(15, 45 * hpRatio + 10);
      }

      if (boss.hitFlash > 0) boss.hitFlash--;
    }

    // ─── Move bullets ───────────────────────────────────────────────
    for (const b of gs.bullets) b.y += b.friendly ? -BULLET_SPEED : ENEMY_BULLET_SPEED;
    gs.bullets = gs.bullets.filter(b => b.y > -20 && b.y < gs.canH + 20);

    // ─── Friendly bullet → enemy collision ──────────────────────────
    gs.bullets = gs.bullets.filter(b => {
      if (!b.friendly) return true;

      // Boss collision
      if (gs.boss && gs.boss.alive) {
        const boss = gs.boss;
        const dist = Math.sqrt((b.x - boss.x) ** 2 + (b.y - boss.y) ** 2);
        if (dist < 38) {
          boss.hp--;
          boss.hitFlash = 8;
          gs.score += 5;
          setScore(gs.score);
          gs.shake = Math.min(gs.shake + 1.5, 4);

          for (let i = 0; i < 6; i++) {
            gs.particles.push({
              x: b.x, y: b.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 20, maxLife: 20,
              color: '#ef4444', r: 2,
            });
          }

          if (boss.hp <= 0) {
            boss.alive = false;
            gs.score += 500;
            setScore(gs.score);
            gs.shake = 10;
            // Big explosion
            for (let i = 0; i < 60; i++) {
              const angle = (Math.PI * 2 * i) / 60;
              const speed = 2 + Math.random() * 8;
              gs.particles.push({
                x: boss.x, y: boss.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 50 + Math.random() * 30, maxLife: 80,
                color: ['#ef4444', '#f59e0b', '#22d3ee', '#a855f7'][Math.floor(Math.random() * 4)],
                r: 2 + Math.random() * 5,
              });
            }
          }
          return !b.piercing;
        }
      }

      // Regular enemy collision
      for (const e of alive) {
        if (!e.alive) continue;
        const ex = gs.gridX + e.col * (gs.ew + gs.egx) + gs.ew / 2;
        const ey = gs.gridY + e.row * (gs.eh + gs.egy) + gs.eh / 2;
        if (Math.abs(b.x - ex) < 15 && Math.abs(b.y - ey) < 15) {
          e.hp--;
          if (e.hp <= 0) {
            e.alive = false;
            gs.score += ROW_PTS[e.row % ROW_PTS.length];
            setScore(gs.score);
            gs.shake = Math.min(gs.shake + 2.5, 5);
            const color = ROW_COLORS[e.row % ROW_COLORS.length];
            for (let i = 0; i < 16; i++) {
              gs.particles.push({
                x: ex, y: ey,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 38, maxLife: 38,
                color, r: 1.5 + Math.random() * 4,
              });
            }
            spawnPowerUp(gs, ex, ey);
          } else {
            // Hit but not dead
            gs.shake = Math.min(gs.shake + 1, 3);
            for (let i = 0; i < 4; i++) {
              gs.particles.push({
                x: ex, y: ey,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 15, maxLife: 15,
                color: '#fff', r: 1,
              });
            }
          }
          return !!b.piercing; // piercing shots continue
        }
      }
      return true;
    });

    // ─── Enemy bullet → player collision ────────────────────────────
    const playerY = gs.canH - 44;
    if (gs.invincible <= 0) {
      gs.bullets = gs.bullets.filter(b => {
        if (b.friendly) return true;
        if (Math.abs(b.x - gs.px) < 15 && b.y > playerY - 13 && b.y < playerY + 13) {
          if (gs.shieldActive > 0) {
            // Shield absorbs hit
            gs.shieldActive = 0;
            gs.shake = 3;
            for (let i = 0; i < 8; i++) {
              gs.particles.push({
                x: gs.px, y: playerY,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 20, maxLife: 20, color: '#3b82f6', r: 2,
              });
            }
            return false;
          }
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

    // ─── Power-up collection ────────────────────────────────────────
    gs.powerUps = gs.powerUps.filter(p => {
      p.y += 0.8;
      p.life--;
      if (p.life <= 0 || p.y > gs.canH + 20) return false;

      if (Math.abs(p.x - gs.px) < 20 && Math.abs(p.y - playerY) < 20) {
        const duration = 300;
        switch (p.type) {
          case 'rapid': gs.rapidFire = duration; break;
          case 'shield': gs.shieldActive = duration; break;
          case 'triple': gs.tripleShot = duration; break;
          case 'piercing': gs.piercingShot = duration; break;
        }
        // Collect particles
        for (let i = 0; i < 10; i++) {
          const colors: Record<string, string> = {
            rapid: '#22d3ee', shield: '#3b82f6', triple: '#a855f7', piercing: '#f59e0b',
          };
          gs.particles.push({
            x: p.x, y: p.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 20, maxLife: 20,
            color: colors[p.type], r: 2,
          });
        }
        return false;
      }
      return true;
    });

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

    // 3D starfield background
    drawStars3D(ctx, gs.stars3D, gs.canW, gs.canH, 0.003, cfg.bgHue);
    drawNebula(ctx, gs.canW, gs.canH, cfg.bgHue);
    drawGridFloor(ctx, gs.canW, gs.canH, gs.frame, cfg.bgHue, cfg.perspectiveStrength);
    drawHUD(ctx, gs, hiRef.current);

    // Enemies
    for (const e of gs.enemies) {
      if (!e.alive) continue;
      drawEnemy(
        ctx,
        gs.gridX + e.col * (gs.ew + gs.egx) + gs.ew / 2,
        gs.gridY + e.row * (gs.eh + gs.egy) + gs.eh / 2,
        e.row, e.col, gs.frame, logoRef.current,
        cfg.perspectiveStrength,
        e.hp, e.maxHp,
      );
    }

    // Boss
    if (gs.boss) drawBoss(ctx, gs.boss, gs.frame, logoRef.current);

    // Power-ups
    for (const p of gs.powerUps) drawPowerUp(ctx, p, gs.frame);

    // Bullets, player, particles
    for (const b of gs.bullets) drawBullet(ctx, b);
    drawPlayer(ctx, gs.px, playerY, gs.invincible, gs.frame, gs.shieldActive > 0);
    for (const p of gs.particles) drawParticle(ctx, p);
    drawFlash(ctx, gs.canW, gs.canH, gs.flash);

    ctx.restore();

    rafRef.current = requestAnimationFrame(runLoop);
  }, [endGame, startLevel]);

  // Fix startLevel to reference runLoop
  const startLevelRef = useRef(startLevel);
  startLevelRef.current = startLevel;

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gs = makeGS(canvas.width, canvas.height, 0, 0, 3);
    gs.phase = 'playing';
    gsRef.current = gs;
    setPhase('playing');
    setScore(0);
    setLevel(0);
    rafRef.current = requestAnimationFrame(runLoop);
  }, [runLoop]);

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      canvas.width = wrap.clientWidth;
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
      if (!gs || (gs.phase !== 'playing' && gs.phase !== 'levelup')) return;
      if (GAME_KEYS.includes(e.key)) e.preventDefault();
      gs.keysDown.add(e.key);
    };
    const onUp = (e: KeyboardEvent) => gsRef.current?.keysDown.delete(e.key);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  const press = (k: string) => gsRef.current?.keysDown.add(k);
  const release = (k: string) => gsRef.current?.keysDown.delete(k);

  return (
    <div className="flex flex-col w-full h-full bg-[#050710] overflow-hidden select-none">
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

              <p className="text-white/30 text-[10px] mb-3" style={{ fontFamily: SANS }}>
                5 levels · Power-ups · Boss fight
              </p>

              {/* Level preview */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                {LEVELS.map((lvl, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[7px] font-bold"
                      style={{
                        background: `hsla(${lvl.bgHue}, 60%, 50%, 0.15)`,
                        border: `1px solid hsla(${lvl.bgHue}, 60%, 50%, 0.3)`,
                        color: `hsl(${lvl.bgHue}, 60%, 65%)`,
                      }}
                    >
                      {lvl.hasBoss ? (
                        <Zap size={9} />
                      ) : (
                        i + 1
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Point values */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {ROW_COLORS.slice(0, 3).map((c, i) => (
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

              {/* Power-up legend */}
              <div className="flex items-center justify-center gap-2 mb-5">
                {[
                  { label: 'Rapid', color: '#22d3ee', icon: 'R' },
                  { label: 'Shield', color: '#3b82f6', icon: 'S' },
                  { label: 'Triple', color: '#a855f7', icon: 'T' },
                  { label: 'Pierce', color: '#f59e0b', icon: 'P' },
                ].map(pw => (
                  <div key={pw.label} className="flex items-center gap-1">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white"
                      style={{
                        background: pw.color + '30',
                        border: `1px solid ${pw.color}60`,
                      }}
                    >
                      {pw.icon}
                    </div>
                    <span className="text-[7px]" style={{ color: pw.color + 'aa', fontFamily: SANS }}>
                      {pw.label}
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
                {phase === 'win' ? 'System Override Complete!' : 'Game Over'}
              </h2>

              {phase === 'win' && (
                <p className="text-white/40 text-xs mb-2" style={{ fontFamily: SANS }}>
                  All 5 levels cleared!
                </p>
              )}

              <p className="text-white/50 text-sm mb-1" style={{ fontFamily: SANS }}>
                Score: <span className="text-white font-bold">{score}</span>
              </p>
              <p className="text-white/30 text-xs mb-1" style={{ fontFamily: SANS }}>
                Level reached: <span className="font-semibold">{level + 1}</span> — {LEVELS[level].title}
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
      {(phase === 'playing' || phase === 'levelup') && (
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

          {/* Level indicator on mobile */}
          <div className="text-center">
            <span
              className="text-[8px] font-semibold"
              style={{ color: `hsl(${LEVELS[level].bgHue}, 60%, 65%)`, fontFamily: SANS }}
            >
              LVL {level + 1}
            </span>
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
