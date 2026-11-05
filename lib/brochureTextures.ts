// High-Resolution 5-Panel Dynamic Canvas Texture Generator for Zigzag Accordion Brochure
// Generates ultra-sharp 1600x2400 canvases with anti-aliasing and clean typography (NO EMOJIS)

// ==========================================
// FRONT PANELS (PANELS 1 - 5)
// ==========================================

// PANEL 1: Frontpage (Cover & Official Group Members - Matching Slide Presentation)
export function createPanel1CoverCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Rich Slide-Matching Plum-Rose Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#5a1d3b');
  bgGrad.addColorStop(0.3, '#45142d');
  bgGrad.addColorStop(0.7, '#320e20');
  bgGrad.addColorStop(1, '#200714');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  // Soft vignette overlay
  const radialVignette = ctx.createRadialGradient(800, 700, 200, 800, 1000, 1200);
  radialVignette.addColorStop(0, 'rgba(244, 114, 182, 0.12)');
  radialVignette.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
  ctx.fillStyle = radialVignette;
  ctx.fillRect(0, 0, 1600, 2400);

  // Outer border trim
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, 1528, 2328);

  const cardX = 64;
  const cardY = 64;
  const cardW = 1472;

  // Top Left: "Ingoude Company" Pill (Direct reference to presentation slide)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.beginPath();
  ctx.roundRect(cardX + 40, cardY + 40, 280, 56, [28]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Ingoude Company', cardX + 180, cardY + 76);

  // Top Right: Category Pill
  ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
  ctx.beginPath();
  ctx.roundRect(cardX + cardW - 360, cardY + 40, 320, 56, [28]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbcfe8';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.fillText('PRESENTATION PORTFOLIO', cardX + cardW - 200, cardY + 76);

  // ========================================================
  // HERO SECTION: Computer + AI Head on Left, Chevron Title on Right
  // ========================================================

  // --- RIGHT: CHEVRON / V-FOLD BROCHURE BANNER (Signature graphic from slide) ---
  const chevX = cardX + 700;
  const chevY = cardY + 130;
  const chevW = 730;
  const chevH = 780;

  // Outer Folded Book / Chevron Polygon
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(chevX, chevY + 70);
  ctx.lineTo(chevX + chevW / 2, chevY);
  ctx.lineTo(chevX + chevW, chevY + 70);
  ctx.lineTo(chevX + chevW, chevY + chevH);
  ctx.lineTo(chevX + chevW / 2, chevY + chevH - 70);
  ctx.lineTo(chevX, chevY + chevH);
  ctx.closePath();

  // Pinkish Salmon gradient
  const chevGrad = ctx.createLinearGradient(chevX, chevY, chevX + chevW, chevY + chevH);
  chevGrad.addColorStop(0, '#f59eb0');
  chevGrad.addColorStop(0.5, '#ea8ea2');
  chevGrad.addColorStop(1, '#db7a90');
  ctx.fillStyle = chevGrad;
  ctx.fill();

  ctx.strokeStyle = '#fbcfe8';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Subtle center crease fold line
  ctx.beginPath();
  ctx.moveTo(chevX + chevW / 2, chevY);
  ctx.lineTo(chevX + chevW / 2, chevY + chevH - 70);
  ctx.strokeStyle = 'rgba(157, 23, 77, 0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Royal Blue Underlined Serif Title (Exact match to reference image)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e3a8a'; // Deep Royal Blue
  ctx.font = 'bold 72px "Georgia", "Times New Roman", serif';
  ctx.fillText('ICT POLICIES', chevX + chevW / 2, chevY + 360);

  // Underline for "ICT POLICIES"
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(chevX + chevW / 2 - 270, chevY + 382);
  ctx.lineTo(chevX + chevW / 2 + 270, chevY + 382);
  ctx.stroke();

  // Second line: "AND ISSUES"
  ctx.fillText('AND ISSUES', chevX + chevW / 2, chevY + 490);

  // Underline for "AND ISSUES"
  ctx.beginPath();
  ctx.moveTo(chevX + chevW / 2 - 250, chevY + 512);
  ctx.lineTo(chevX + chevW / 2 + 250, chevY + 512);
  ctx.stroke();

  ctx.restore();

  // --- LEFT: 3D COMPUTER WORKSTATION & ROBOT AI (Direct match to reference slide) ---
  const compX = cardX + 30;
  const compY = cardY + 160;

  // 1. Desktop Monitor
  // Monitor Bezel & Stand
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(compX + 40, compY + 20, 390, 270, [18]);
  ctx.fill();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Silver stand
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(compX + 215, compY + 290);
  ctx.lineTo(compX + 255, compY + 290);
  ctx.lineTo(compX + 270, compY + 370);
  ctx.lineTo(compX + 200, compY + 370);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(compX + 235, compY + 370, 75, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Screen Content (Deep blue/cyan desktop UI with clock 17:15)
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(compX + 54, compY + 34, 362, 242, [10]);
  ctx.fill();

  // Window header bar
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(compX + 54, compY + 34, 362, 28);

  // Window dots
  const dotColors = ['#ef4444', '#f59e0b', '#10b981'];
  dotColors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(compX + 74 + i * 18, compY + 48, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Digital Clock "17:15"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('17:15', compX + 72, compY + 105);

  ctx.fillStyle = '#bae6fd';
  ctx.font = '500 16px "Segoe UI", sans-serif';
  ctx.fillText('Wed, 11 January', compX + 72, compY + 130);

  // Left vertical colorful dock icons
  const dockColors = ['#38bdf8', '#fb7185', '#facc15', '#a855f7', '#34d399', '#f43f5e'];
  dockColors.forEach((dc, di) => {
    ctx.fillStyle = dc;
    ctx.beginPath();
    ctx.arc(compX + 78, compY + 160 + di * 16, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Main UI window inside monitor
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(compX + 160, compY + 80, 235, 175, [8]);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(compX + 172, compY + 95, 120, 14);

  // UI status rows with pink pill indicators
  for (let r = 0; r < 4; r++) {
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.roundRect(compX + 172, compY + 125 + r * 28, 48, 16, [8]);
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(compX + 230, compY + 130 + r * 28, 145, 8);
  }

  // 2. White Isometric Keyboard
  const kbX = compX + 70;
  const kbY = compY + 420;
  ctx.save();
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(kbX, kbY + 80);
  ctx.lineTo(kbX + 270, kbY - 40);
  ctx.lineTo(kbX + 410, kbY + 10);
  ctx.lineTo(kbX + 140, kbY + 130);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Cylindrical top rail of keyboard
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(kbX + 270, kbY - 40, 30, 10, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Keyboard keys grid illusion
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
  ctx.lineWidth = 1.5;
  for (let ki = 1; ki <= 5; ki++) {
    ctx.beginPath();
    const frac = ki / 6;
    ctx.moveTo(kbX + frac * 140, kbY + 80 + frac * 50);
    ctx.lineTo(kbX + 270 + frac * 140, kbY - 40 + frac * 50);
    ctx.stroke();
  }
  ctx.restore();

  // 3. AI Cybernetic Profile Head (exact match to reference slide)
  const aiX = compX + 430;
  const aiY = compY + 220;

  // Face Silhouette in Cyan/White Profile
  ctx.fillStyle = '#cffafe';
  ctx.beginPath();
  ctx.moveTo(aiX, aiY + 70);
  ctx.quadraticCurveTo(aiX + 20, aiY + 30, aiX + 50, aiY + 10); // Forehead
  ctx.lineTo(aiX + 55, aiY + 60); // Eye brow
  ctx.lineTo(aiX + 40, aiY + 85); // Nose indent
  ctx.lineTo(aiX + 25, aiY + 100); // Nose tip
  ctx.lineTo(aiX + 45, aiY + 120); // Upper lip
  ctx.lineTo(aiX + 35, aiY + 135); // Mouth
  ctx.lineTo(aiX + 45, aiY + 155); // Chin
  ctx.quadraticCurveTo(aiX + 80, aiY + 175, aiX + 90, aiY + 230); // Jaw to neck
  ctx.lineTo(aiX + 160, aiY + 240); // Neck base
  ctx.lineTo(aiX + 160, aiY + 140);
  ctx.closePath();
  ctx.fill();

  // Ear circular headset ring
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(aiX + 140, aiY + 150, 46, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(aiX + 140, aiY + 150, 24, 0, Math.PI * 2);
  ctx.fill();

  // Brain Neural Network Hemisphere (Magenta / Violet glowing lattice)
  const brainNodes = [
    { x: aiX + 70, y: aiY + 20 },
    { x: aiX + 110, y: aiY - 10 },
    { x: aiX + 155, y: aiY - 20 },
    { x: aiX + 200, y: aiY + 0 },
    { x: aiX + 225, y: aiY + 45 },
    { x: aiX + 220, y: aiY + 100 },
    { x: aiX + 190, y: aiY + 135 },
    { x: aiX + 115, y: aiY + 40 },
    { x: aiX + 155, y: aiY + 50 },
    { x: aiX + 175, y: aiY + 85 },
    { x: aiX + 130, y: aiY + 95 },
  ];

  // Synapse connections
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < brainNodes.length; i++) {
    for (let j = i + 1; j < brainNodes.length; j++) {
      const dx = brainNodes[i].x - brainNodes[j].x;
      const dy = brainNodes[i].y - brainNodes[j].y;
      if (Math.hypot(dx, dy) < 85) {
        ctx.beginPath();
        ctx.moveTo(brainNodes[i].x, brainNodes[i].y);
        ctx.lineTo(brainNodes[j].x, brainNodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Neural nodes
  brainNodes.forEach((node) => {
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(node.x, node.y, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // ========================================================
  // BOTTOM SECTION: Official Group Members Card (All 7 Members)
  // ========================================================
  const groupCardY = cardY + 990;
  const groupCardH = 1200;

  ctx.fillStyle = 'rgba(24, 6, 17, 0.88)';
  ctx.beginPath();
  ctx.roundRect(cardX + 40, groupCardY, cardW - 80, groupCardH, [30]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Section Header
  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 38px "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('OFFICIAL GROUP MEMBERS • GROUP 6', cardX + 90, groupCardY + 70);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 24px "Segoe UI", sans-serif';
  ctx.fillText('Grade 10/11 Empowerment Technologies • Presentation Portfolio', cardX + 90, groupCardY + 110);

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 90, groupCardY + 140);
  ctx.lineTo(cardX + cardW - 90, groupCardY + 140);
  ctx.stroke();

  const members = [
    { num: '1', name: 'Romoculo, Romick', role: 'Lead Presenter', roleColor: '#f472b6', lead: true },
    { num: '2', name: 'Timbal, Angela', role: 'Policy Research', roleColor: '#38bdf8' },
    { num: '3', name: 'Atecibo, Roserie', role: 'Ethics Analyst', roleColor: '#cbd5e1' },
    { num: '4', name: 'Sanchez, Jovine', role: 'Cybersecurity', roleColor: '#34d399' },
    { num: '5', name: 'Tabogon, Rhea Jane', role: 'Accessibility', roleColor: '#facc15' },
    { num: '6', name: 'Salado, Charisse', role: 'Digital Rights', roleColor: '#c084fc' },
    { num: '7', name: 'Quijano, Jeromel', role: 'Documentation', roleColor: '#cbd5e1' },
  ];

  const rowStartY = groupCardY + 175;
  const rowH = 122;
  const rowGap = 16;

  members.forEach((m, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = m.lead ? 'rgba(236, 72, 153, 0.18)' : 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(cardX + 90, rY, cardW - 180, rowH, [20]);
    ctx.fill();

    ctx.strokeStyle = m.lead ? 'rgba(236, 72, 153, 0.5)' : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = m.lead ? 2.5 : 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${m.num}. ${m.name}`, cardX + 130, rY + 76);

    ctx.fillStyle = m.roleColor;
    ctx.font = '600 34px "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(m.role, cardX + cardW - 130, rY + 76);
  });

  // Footer Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Cover Frontpage • 3D Zigzag Accordion Portfolio', 800, groupCardY + groupCardH - 35);

  return canvas;
}

// PANEL 2: What is ICT? (Definition & Importance)
export function createPanel2DefinitionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#100412');
  bgGrad.addColorStop(0.4, '#200826');
  bgGrad.addColorStop(0.8, '#390e44');
  bgGrad.addColorStop(1, '#531464');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(32, 8, 38, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#9333ea';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MODULE 01 • OVERVIEW', cardX + 190, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 78px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('What is ICT?', cardX + 60, cardY + 200);

  ctx.fillStyle = '#d8b4fe';
  ctx.font = '500 36px "Segoe UI", sans-serif';
  ctx.fillText('Information and Communication Technology', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const qY = cardY + 360;
  ctx.fillStyle = 'rgba(14, 3, 18, 0.75)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, qY, cardW - 120, 720, [28]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f3e8ff';
  ctx.font = 'italic 46px "Georgia", serif';
  ctx.textAlign = 'center';

  const definitionLines = [
    '“ICT stands for Information and',
    'Communication Technology.',
    '',
    'It helps teachers and students make',
    'learning easier, faster, and more interesting.',
    '',
    'However, we must follow certain rules',
    'to use technology safely and responsibly.”',
  ];

  definitionLines.forEach((line, i) => {
    ctx.fillText(line, 800, qY + 130 + i * 68);
  });

  const pillars = [
    { badge: 'PILLAR 1', title: 'Speed & Access', desc: 'Instant global connectivity and immediate learning resources anywhere.' },
    { badge: 'PILLAR 2', title: 'Empowerment', desc: 'Equipping educators and learners with collaborative digital media tools.' },
    { badge: 'PILLAR 3', title: 'Responsibility', desc: 'Operating with ethical digital awareness and respect for online safety.' },
  ];

  const pStartY = qY + 770;
  pillars.forEach((p, idx) => {
    const py = pStartY + idx * 190;
    ctx.fillStyle = 'rgba(14, 3, 18, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, py, cardW - 120, 160, [20]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#9333ea';
    ctx.beginPath();
    ctx.roundRect(cardX + 100, py + 55, 150, 50, [14]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.badge, cardX + 175, py + 87);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.fillText(p.title, cardX + 280, py + 70);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '32px "Segoe UI", sans-serif';
    ctx.fillText(p.desc, cardX + 280, py + 120);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 2 of 5 • Definition & Core Principles', 800, cardY + cardH - 50);

  return canvas;
}

// PANEL 3: ICT Policies Framework
export function createPanel3PoliciesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#090f1e');
  bgGrad.addColorStop(0.4, '#0f1a34');
  bgGrad.addColorStop(0.8, '#16284f');
  bgGrad.addColorStop(1, '#1e386e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(15, 26, 52, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MODULE 02 • POLICIES', cardX + 190, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('ICT Policies Framework', cardX + 60, cardY + 200);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Official rules and guidelines ensuring safe & responsible technology use', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const policies = [
    {
      num: '1',
      title: 'Data Privacy',
      desc: 'Protecting the personal information of teachers, staff, and students from unauthorized exposure.',
      accent: '#38bdf8',
    },
    {
      num: '2',
      title: 'Cybersecurity',
      desc: 'Keeping accounts, passwords, devices, and networks safe from hackers and malicious software.',
      accent: '#34d399',
    },
    {
      num: '3',
      title: 'Copyright & Fair Use',
      desc: 'Respecting the work of others, giving proper credit, and preventing digital piracy or plagiarism.',
      accent: '#facc15',
    },
    {
      num: '4',
      title: 'Responsible Technology',
      desc: 'Using the internet and digital tools for good, constructive, and productive learning purposes.',
      accent: '#c084fc',
    },
    {
      num: '5',
      title: 'Digital Accessibility',
      desc: 'Making sure all students have equal opportunities, assistive tools, and resources to access technology.',
      accent: '#f472b6',
    },
  ];

  const rowStartY = cardY + 340;
  const rowH = 340;
  const rowGap = 32;

  policies.forEach((p, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(7, 14, 30, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = p.accent;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    ctx.fillStyle = p.accent;
    ctx.font = 'bold 50px "Georgia", serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${p.num}. ${p.title}:`, cardX + 110, rY + 95);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '36px "Segoe UI", sans-serif';

    const words = p.desc.split(' ');
    let line = '';
    let lineY = rY + 175;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 240 && n > 0) {
        ctx.fillText(line, cardX + 110, lineY);
        line = words[n] + ' ';
        lineY += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 110, lineY);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 3 of 5 • Core Policy Guidelines', 800, cardY + cardH - 50);

  return canvas;
}

// PANEL 4: Critical ICT Issues
export function createPanel4IssuesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#1c0409');
  bgGrad.addColorStop(0.4, '#310813');
  bgGrad.addColorStop(0.8, '#4f0d20');
  bgGrad.addColorStop(1, '#73142f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(49, 8, 19, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MODULE 03 • ISSUES', cardX + 190, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Critical ICT Issues', cardX + 60, cardY + 200);

  ctx.fillStyle = '#fca5a5';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Pressing ethical dilemmas and modern risks in cyberspace', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const issues = [
    {
      num: '1',
      title: 'Cyberbullying',
      desc: 'Using technology to hurt, embarrass, harass, or demean others online, causing severe emotional distress.',
      accent: '#f87171',
    },
    {
      num: '2',
      title: 'Digital Divide',
      desc: 'Disparities where students lack gadgets, modern computers, or reliable internet connectivity.',
      accent: '#fb923c',
    },
    {
      num: '3',
      title: 'Fake News & Disinformation',
      desc: 'Rapid viral sharing of false, misleading, or manipulated information across digital platforms.',
      accent: '#facc15',
    },
    {
      num: '4',
      title: 'Internet Addiction',
      desc: 'Spending excessive, uncontrollable time using screens, degrading academic focus and sleep.',
      accent: '#c084fc',
    },
    {
      num: '5',
      title: 'Privacy Violations',
      desc: 'Sharing personal information, private photos, or sensitive student records without consent.',
      accent: '#f43f5e',
    },
  ];

  const rowStartY = cardY + 340;
  const rowH = 340;
  const rowGap = 32;

  issues.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(20, 3, 7, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = item.accent;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    ctx.fillStyle = item.accent;
    ctx.font = 'bold 50px "Georgia", serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${item.num}. ${item.title}:`, cardX + 110, rY + 95);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '36px "Segoe UI", sans-serif';

    const words = item.desc.split(' ');
    let line = '';
    let lineY = rY + 175;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 240 && n > 0) {
        ctx.fillText(line, cardX + 110, lineY);
        line = words[n] + ' ';
        lineY += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 110, lineY);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 4 of 5 • Critical Cyber Threats', 800, cardY + cardH - 50);

  return canvas;
}

// PANEL 5: Conclusion, Ethical Vision & Thank You!
export function createPanel5ConclusionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#100613');
  bgGrad.addColorStop(0.4, '#240a28');
  bgGrad.addColorStop(0.8, '#410e3e');
  bgGrad.addColorStop(1, '#631454');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(38, 9, 36, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#db2777';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 280, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ETHICAL CONCLUSION', cardX + 200, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Ethical Synthesis', cardX + 60, cardY + 200);

  ctx.fillStyle = '#fbcfe8';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Placing human dignity and equity at the center of innovation', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(236, 72, 153, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const q1Y = cardY + 350;
  ctx.fillStyle = 'rgba(15, 3, 15, 0.75)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, q1Y, cardW - 120, 460, [24]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fdf2f8';
  ctx.font = 'italic 40px "Georgia", serif';
  ctx.textAlign = 'center';
  const q1Lines = [
    '“ICT policies are not a mere blueprint or technical',
    'guidelines for hardware and software;',
    'they are ethical frameworks that shape how modern',
    'societies function, communicate, and learn.”',
  ];
  q1Lines.forEach((l, i) => ctx.fillText(l, 800, q1Y + 120 + i * 75));

  const q2Y = q1Y + 500;
  ctx.fillStyle = 'rgba(15, 3, 15, 0.75)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, q2Y, cardW - 120, 460, [24]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fdf2f8';
  ctx.font = 'italic 40px "Georgia", serif';
  const q2Lines = [
    '“Ultimately, the success of any ICT policy depends',
    'on its ability to place human values, equity, and',
    'ethical responsibility at the center of',
    'technological progress.”',
  ];
  q2Lines.forEach((l, i) => ctx.fillText(l, 800, q2Y + 120 + i * 75));

  const tyY = q2Y + 500;
  ctx.fillStyle = 'rgba(219, 39, 119, 0.2)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, tyY, cardW - 120, 360, [28]);
  ctx.fill();
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 84px "Georgia", serif';
  ctx.fillText('Thank You!', 800, tyY + 150);

  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.fillStyle = '#fbcfe8';
  ctx.fillText('Presented by Group 6 • Academic Year 2026', 800, tyY + 240);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.fillText('Panel 5 of 5 • Ethical Vision & Group Acknowledgments', 800, cardY + cardH - 50);

  return canvas;
}

// ==========================================
// REVERSE SIDE PANELS (INSIDE BACK SPREAD)
// ==========================================

// BACK PANEL 1: Legal Frameworks & Acts
export function createPanel1BackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#0c1a2e');
  bgGrad.addColorStop(0.5, '#1e293b');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 280, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LEGAL MANDATES', cardX + 200, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Legal Frameworks', cardX + 60, cardY + 200);

  ctx.fillStyle = '#7dd3fc';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Philippine & International Cyber Legislation', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const acts = [
    {
      badge: 'RA 10173',
      title: 'Data Privacy Act of 2012',
      desc: 'Protects the fundamental right to privacy of communication while ensuring the free flow of information for national growth.',
      color: '#38bdf8',
    },
    {
      badge: 'RA 10175',
      title: 'Cybercrime Prevention Act',
      desc: 'Addresses legal issues concerning computer-related offenses, hacking, illegal interception, identity theft, and cyber libel.',
      color: '#34d399',
    },
    {
      badge: 'RA 8293',
      title: 'Intellectual Property Code',
      desc: 'Secures exclusive rights of creators, educators, and software authors while regulating fair use exemptions in classrooms.',
      color: '#facc15',
    },
    {
      badge: 'DO 40 s.2012',
      title: 'Child Protection Policy',
      desc: 'DepEd institutional mandate safeguarding pupils from bullying, cyberbullying, sexual exploitation, and digital violence.',
      color: '#f472b6',
    },
  ];

  const rowStartY = cardY + 350;
  const rowH = 410;
  const rowGap = 36;

  acts.forEach((act, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = act.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    ctx.fillStyle = act.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 50, 180, 48, [12]);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(act.badge, cardX + 200, rY + 83);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "Georgia", serif';
    ctx.fillText(act.title, cardX + 320, rY + 88);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '36px "Segoe UI", sans-serif';

    const words = act.desc.split(' ');
    let line = '';
    let lineY = rY + 180;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 240 && n > 0) {
        ctx.fillText(line, cardX + 110, lineY);
        line = words[n] + ' ';
        lineY += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 110, lineY);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Inside Fold • Legal Basis & Statutory Rights', 800, cardY + cardH - 50);

  return canvas;
}

// BACK PANEL 2: Cybersafety Best Practices
export function createPanel2BackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#042217');
  bgGrad.addColorStop(0.5, '#064e3b');
  bgGrad.addColorStop(1, '#022c22');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(6, 44, 34, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 280, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SAFETY PROTOCOL', cardX + 200, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Student Cybersafety', cardX + 60, cardY + 200);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Actionable Digital Habits for Every Learner', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const rules = [
    { num: 'RULE 1', title: 'Credential Hygiene', desc: 'Use 14+ character alphanumeric passphrases and activate multi-factor authentication across all school accounts.' },
    { num: 'RULE 2', title: 'Critical Fact-Checking', desc: 'Cross-reference multiple reputable peer-reviewed sources before believing or forwarding sensational viral headlines.' },
    { num: 'RULE 3', title: 'Zero Tolerance on Bullying', desc: 'Never participate in defamatory group chats. Document malicious harassment, block offenders, and inform a trusted teacher.' },
    { num: 'RULE 4', title: 'Controlled Data Footprint', desc: 'Review application permissions regularly. Never disclose physical home locations, contact numbers, or family schedules online.' },
  ];

  const rowStartY = cardY + 350;
  const rowH = 410;
  const rowGap = 36;

  rules.forEach((r, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(4, 30, 23, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(r.num, cardX + 110, rY + 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "Georgia", serif';
    ctx.fillText(r.title, cardX + 110, rY + 130);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '36px "Segoe UI", sans-serif';

    const words = r.desc.split(' ');
    let line = '';
    let lineY = rY + 210;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 240 && n > 0) {
        ctx.fillText(line, cardX + 110, lineY);
        line = words[n] + ' ';
        lineY += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 110, lineY);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Inside Fold • Best Practices & Cybersafe Habits', 800, cardY + cardH - 50);

  return canvas;
}

// BACK PANEL 3: Digital Citizenship Manifesto (Center Panel)
export function createPanel3BackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#1c1304');
  bgGrad.addColorStop(0.5, '#451a03');
  bgGrad.addColorStop(1, '#291002');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(40, 18, 4, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 320, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CITIZENSHIP MANIFESTO', cardX + 220, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Digital Citizenship', cardX + 60, cardY + 200);

  ctx.fillStyle = '#fde68a';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Our Collective Pledge as 21st-Century Innovators', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  // Manifesto Center Card
  const mY = cardY + 360;
  ctx.fillStyle = 'rgba(20, 8, 2, 0.8)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, mY, cardW - 120, 800, [32]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#fef3c7';
  ctx.font = 'italic 46px "Georgia", serif';
  ctx.textAlign = 'center';

  const manifestoText = [
    '“We pledge to harness technology',
    'as an instrument of enlightenment,',
    'collaboration, and human progress.',
    '',
    'We uphold the sanctity of personal privacy,',
    'combat deception with unwavering truth,',
    'and foster digital environments where',
    'every voice is treated with honor.”',
  ];

  manifestoText.forEach((line, i) => {
    ctx.fillText(line, 800, mY + 140 + i * 72);
  });

  // 4 Core Value Badges
  const values = [
    { title: 'INTEGRITY', desc: 'Honest creation & authentic attribution' },
    { title: 'EQUITY', desc: 'Equal opportunity & universal access' },
    { title: 'RESPECT', desc: 'Empathy in all online discourse' },
    { title: 'VIGILANCE', desc: 'Proactive protection against cyber risks' },
  ];

  const vStartY = mY + 860;
  values.forEach((v, idx) => {
    const vx = cardX + 60 + (idx % 2) * 690;
    const vy = vStartY + Math.floor(idx / 2) * 230;

    ctx.fillStyle = 'rgba(30, 12, 3, 0.7)';
    ctx.beginPath();
    ctx.roundRect(vx, vy, 650, 200, [20]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(v.title, vx + 40, vy + 75);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '28px "Segoe UI", sans-serif';
    ctx.fillText(v.desc, vx + 40, vy + 135);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Inside Fold • Core Values & Philosophical Vision', 800, cardY + cardH - 50);

  return canvas;
}

// BACK PANEL 4: Bridging the Digital Divide
export function createPanel4BackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#1a0d24');
  bgGrad.addColorStop(0.5, '#3b124d');
  bgGrad.addColorStop(1, '#1e072b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(35, 10, 48, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#9333ea';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 280, 46, [23]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INCLUSION & ACCESS', cardX + 200, cardY + 92);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Digital Divide Solutions', cardX + 60, cardY + 200);

  ctx.fillStyle = '#e9d5ff';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Strategic Pillars for Universal Technological Equity', cardX + 60, cardY + 260);

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 300);
  ctx.lineTo(cardX + cardW - 60, cardY + 300);
  ctx.stroke();

  const solutions = [
    {
      num: 'STRATEGY 1',
      title: 'Infrastructure & Rural Broadband',
      desc: 'Extending high-speed educational fiber networks and satellite internet to remote and off-grid community schools.',
      accent: '#c084fc',
    },
    {
      num: 'STRATEGY 2',
      title: '1:1 Device Subsidization',
      desc: 'Government and institutional programs granting modern laptops, tablets, and protective equipment to underserved students.',
      accent: '#38bdf8',
    },
    {
      num: 'STRATEGY 3',
      title: 'Assistive Tech Integration',
      desc: 'Implementing screen readers, text-to-speech, and specialized braille displays to ensure total accessibility for students with disabilities.',
      accent: '#34d399',
    },
    {
      num: 'STRATEGY 4',
      title: 'Digital Literacy for All',
      desc: 'Offering comprehensive digital fluency and coding bootcamps for learners, educators, and community stakeholders.',
      accent: '#facc15',
    },
  ];

  const rowStartY = cardY + 350;
  const rowH = 410;
  const rowGap = 36;

  solutions.forEach((s, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(22, 6, 32, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = s.accent;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    ctx.fillStyle = s.accent;
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(s.num, cardX + 110, rY + 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "Georgia", serif';
    ctx.fillText(s.title, cardX + 110, rY + 130);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '36px "Segoe UI", sans-serif';

    const words = s.desc.split(' ');
    let line = '';
    let lineY = rY + 210;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 240 && n > 0) {
        ctx.fillText(line, cardX + 110, lineY);
        line = words[n] + ' ';
        lineY += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 110, lineY);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Inside Fold • Equity & Closing the Gap', 800, cardY + cardH - 50);

  return canvas;
}

// BACK PANEL 5: Official Credits & Institutional Seal
export function createPanel5BackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#16040d');
  bgGrad.addColorStop(0.5, '#3b0a24');
  bgGrad.addColorStop(1, '#1b0310');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(38, 7, 24, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Decorative Seal
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(800, 420, 150, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(800, 420, 135, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 64px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ICT', 800, 442);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 70px "Georgia", serif';
  ctx.fillText('Project Portfolio Credits', 800, 680);

  ctx.fillStyle = '#fbcfe8';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Grade 10/11 Empowerment Technologies • Group 6', 800, 740);

  ctx.strokeStyle = 'rgba(244, 114, 182, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 120, 800);
  ctx.lineTo(cardX + cardW - 120, 800);
  ctx.stroke();

  // Lead Presenter Highlight
  const lY = 860;
  ctx.fillStyle = 'rgba(15, 3, 9, 0.75)';
  ctx.beginPath();
  ctx.roundRect(cardX + 100, lY, cardW - 200, 220, [24]);
  ctx.fill();
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 30px "Segoe UI", sans-serif';
  ctx.fillText('LEAD RESEARCHER & PRESENTER', 800, lY + 70);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px "Georgia", serif';
  ctx.fillText('Romoculo, Romick', 800, lY + 145);

  // Group Contributors Table
  const teamMembers = [
    'Timbal, Angela',
    'Atecibo, Roserie',
    'Sanchez, Jovine',
    'Tabogon, Rhea Jane',
    'Salado, Charisse',
    'Quijano, Jeromel',
  ];

  const tY = 1140;
  ctx.fillStyle = 'rgba(15, 3, 9, 0.6)';
  ctx.beginPath();
  ctx.roundRect(cardX + 100, tY, cardW - 200, 740, [24]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbcfe8';
  ctx.font = 'bold 34px "Segoe UI", sans-serif';
  ctx.fillText('CONTRIBUTING RESEARCH TEAM', 800, tY + 75);

  teamMembers.forEach((member, mIdx) => {
    const rowY = tY + 140 + mIdx * 90;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(cardX + 150, rowY - 40, cardW - 300, 70, [14]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(member, 800, rowY + 10);
  });

  // Thank You Banner
  const tyY = 1940;
  ctx.fillStyle = '#db2777';
  ctx.beginPath();
  ctx.roundRect(cardX + 100, tyY, cardW - 200, 180, [24]);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Georgia", serif';
  ctx.fillText('Thank You for Reviewing Our Portfolio!', 800, tyY + 80);

  ctx.font = '500 28px "Segoe UI", sans-serif';
  ctx.fillText('Department of Information and Communication Technology • 2026', 800, tyY + 130);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '26px "Segoe UI", sans-serif';
  ctx.fillText('Inside Fold • Official Institutional Credits', 800, cardY + cardH - 50);

  return canvas;
}
