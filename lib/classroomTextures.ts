// Dynamic Canvas Texture Generators for the 3D Classroom Environment

export function createChalkboardCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Dark slate green chalkboard surface
  const bg = ctx.createLinearGradient(0, 0, 1600, 800);
  bg.addColorStop(0, '#15251d');
  bg.addColorStop(0.5, '#1b2f25');
  bg.addColorStop(1, '#13221a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1600, 800);

  // Subtle chalk dust smudges & streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * 1600,
      Math.random() * 800,
      100 + Math.random() * 200,
      30 + Math.random() * 60,
      Math.random() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Wooden / Aluminum border line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 1540, 740);

  // Chalk Title
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 52px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('LESSON: ICT POLICIES & CYBER ETHICS', 80, 110);

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 130);
  ctx.lineTo(1050, 130);
  ctx.stroke();

  // Date and Subject
  ctx.fillStyle = '#fef08a'; // Yellow chalk
  ctx.font = 'bold 32px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('EMPOWERMENT TECH • RM 204', 1520, 110);

  // Left Section: Topics & Core Rules
  ctx.fillStyle = '#ffffff';
  ctx.font = '30px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'left';

  const topics = [
    '• Data Privacy Act & Student Protection',
    '• Cybersecurity: Passwords & MFA Hygiene',
    '• Intellectual Property & Fair Use Guidelines',
    '• Eradicating Cyberbullying & Online Hate',
    '• Bridging the Digital Divide with Equity',
  ];

  topics.forEach((t, i) => {
    ctx.fillText(t, 80, 200 + i * 50);
  });

  // Right Section: Chalk Diagram (Security Shield & Network Nodes)
  ctx.strokeStyle = '#93c5fd'; // Light blue chalk
  ctx.lineWidth = 3.5;
  // Shield doodle
  ctx.beginPath();
  ctx.moveTo(1250, 220);
  ctx.lineTo(1370, 220);
  ctx.lineTo(1370, 340);
  ctx.quadraticCurveTo(1370, 420, 1310, 460);
  ctx.quadraticCurveTo(1250, 420, 1250, 340);
  ctx.closePath();
  ctx.stroke();

  // Checkmark inside shield
  ctx.beginPath();
  ctx.moveTo(1280, 330);
  ctx.lineTo(1305, 360);
  ctx.lineTo(1345, 300);
  ctx.stroke();

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 24px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SAFE BROWSING', 1310, 500);

  // Bottom Notice
  ctx.fillStyle = '#fbcfe8'; // Pink chalk
  ctx.font = 'italic 28px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('“Think before you click. Place human dignity at the center of tech.”', 80, 530);

  ctx.fillStyle = '#6ee7b7'; // Mint green chalk
  ctx.font = 'bold 26px "Courier New", monospace, sans-serif';
  ctx.fillText('ASSIGNMENT: Review 3D Zigzag Accordion Portfolio on the desk.', 80, 600);

  return canvas;
}

export function createFloorCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Warm classroom linoleum / wood parquet pattern
  ctx.fillStyle = '#c79c6e'; // Warm oak tone
  ctx.fillRect(0, 0, 1024, 1024);

  // Planks
  const plankHeight = 64;
  for (let y = 0; y < 1024; y += plankHeight) {
    const shift = (y / plankHeight) % 2 === 0 ? 0 : 128;
    for (let x = -128; x < 1024; x += 256) {
      const px = x + shift;
      // Slight tone variation per plank
      const tone = Math.sin((px * 13 + y * 7)) * 12;
      ctx.fillStyle = `rgb(${195 + tone}, ${150 + tone * 0.8}, ${105 + tone * 0.6})`;
      ctx.fillRect(px, y, 254, plankHeight - 2);

      // Plank grain lines
      ctx.strokeStyle = 'rgba(120, 80, 45, 0.2)';
      ctx.lineWidth = 1.5;
      for (let g = 0; g < 4; g++) {
        ctx.beginPath();
        const gy = y + 10 + g * 12;
        ctx.moveTo(px, gy);
        ctx.lineTo(px + 254, gy + (Math.sin(px + g) * 3));
        ctx.stroke();
      }
    }
  }

  return canvas;
}

export function createPosterCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Bright educational poster
  const bg = ctx.createLinearGradient(0, 0, 600, 800);
  bg.addColorStop(0, '#0284c7');
  bg.addColorStop(1, '#0369a1');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 600, 800);

  // White inner frame
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.strokeRect(25, 25, 550, 750);

  // Header tag
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.roundRect(100, 50, 400, 60, [30]);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DIGITAL CITIZENSHIP', 300, 92);

  // Main title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Georgia", serif';
  ctx.fillText('BE CYBERSMART', 300, 180);

  // 4 Rules badges & text (No emojis)
  const rules = [
    { num: '01', title: 'Protect Privacy', desc: 'Never share passwords or confidential data.' },
    { num: '02', title: 'Be Respectful', desc: 'Zero tolerance for online harassment.' },
    { num: '03', title: 'Verify Facts', desc: 'Fact-check sources before sharing news.' },
    { num: '04', title: 'Balance Time', desc: 'Maintain healthy screen-time limits.' },
  ];

  rules.forEach((r, idx) => {
    const y = 250 + idx * 115;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(60, y, 480, 95, [18]);
    ctx.fill();

    // Number Badge Circle
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(115, y + 48, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(r.num, 115, y + 55);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.fillText(r.title, 170, y + 40);

    ctx.fillStyle = '#475569';
    ctx.font = '16px "Segoe UI", sans-serif';
    ctx.fillText(r.desc, 170, y + 70);
    ctx.textAlign = 'center';
  });

  return canvas;
}

