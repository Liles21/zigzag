'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  createPanel1CoverCanvas,
  createPanel2DefinitionCanvas,
  createPanel3PoliciesCanvas,
  createPanel4IssuesCanvas,
  createPanel5ConclusionCanvas,
  createPanel1BackCanvas,
  createPanel2BackCanvas,
  createPanel3BackCanvas,
  createPanel4BackCanvas,
  createPanel5BackCanvas,
} from '@/lib/brochureTextures';
import {
  createChalkboardCanvas,
  createFloorCanvas,
  createPosterCanvas,
} from '@/lib/classroomTextures';
import { playPaperRustle, playClickTone } from '@/lib/soundEffects';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Layers,
  ZoomIn,
  ZoomOut,
  Info,
  Users,
  ShieldCheck,
  AlertTriangle,
  Compass,
  FileText,
  Award,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';

export type FoldMode = 'accordion' | 'unfolded' | 'folded';
export type ActivePanel = 0 | 1 | 2 | 3 | 4 | null;

export default function ZigzagBrochure() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // UI States
  const [foldMode, setFoldMode] = useState<FoldMode>('accordion');
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [uiCollapsed, setUiCollapsed] = useState<boolean>(false);

  // References for Three.js 5-panel kinematics and camera animation
  const animStateRef = useRef({
    currentAngle1: -1.0,
    targetAngle1: -1.0,
    currentAngle2: 2.0,
    targetAngle2: 2.0,
    currentAngle3: -2.0,
    targetAngle3: -2.0,
    currentAngle4: 2.0,
    targetAngle4: 2.0,
    currentFlipAngle: 0,
    targetFlipAngle: 0,
    targetCamPos: new THREE.Vector3(0, 2.4, 5.2),
    targetLookAt: new THREE.Vector3(0, 1.25, 0),
    autoRotate: false,
    animatingCamera: true,
  });

  useEffect(() => {
    animStateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Handle fold angles & camera target based on foldMode & activePanel & isFlipped
  const updateTargetAnimation = useCallback(
    (mode: FoldMode, panel: ActivePanel, flipped: boolean) => {
      let a1 = -1.0;
      let a2 = 2.0;
      let a3 = -2.0;
      let a4 = 2.0;
      let camX = 0;
      let camY = 2.3;
      let camZ = 5.2;
      let lookX = 0;
      let lookY = 1.25;
      const lookZ = 0;

      const flipY = flipped ? Math.PI : 0;
      animStateRef.current.targetFlipAngle = flipY;

      if (mode === 'folded') {
        // Completely folded 5-panel pocket booklet
        a1 = -Math.PI + 0.04;
        a2 = Math.PI - 0.05;
        a3 = -Math.PI + 0.05;
        a4 = Math.PI - 0.05;
        camX = 0;
        camY = 2.2;
        camZ = 4.6;
        lookY = 1.05;
      } else if (mode === 'unfolded') {
        // Fully unfolded 5-panel panoramic presentation
        a1 = 0.04;
        a2 = 0.04;
        a3 = 0.04;
        a4 = 0.04;
        camX = 0;
        camY = 2.3;
        camZ = 6.4;
        lookY = 1.05;
      } else {
        // Classic Standing 5-Panel Zigzag Accordion
        a1 = -1.0;
        a2 = 2.0;
        a3 = -2.0;
        a4 = 2.0;
        camX = 0;
        camY = 2.4;
        camZ = 5.6;
        lookY = 1.05;
      }

      // Camera adjustments for active panel zoom (framed higher to leave room below for zero text covering)
      if (panel !== null) {
        if (mode === 'folded') {
          a1 = 0.04;
          a2 = 0.04;
          a3 = 0.04;
          a4 = 0.04;
        }

        const panelOffsets =
          mode === 'accordion'
            ? [-1.35, -0.68, 0.0, 0.68, 1.35]
            : [-2.2, -1.1, 0.0, 1.1, 2.2];
        const focusOffset = panelOffsets[panel] ?? 0;
        camX = flipped ? -focusOffset : focusOffset;
        camY = 1.35;
        camZ = mode === 'accordion' ? 2.5 : 2.2; // Reading close-up range
        lookX = flipped ? -focusOffset : focusOffset;
        lookY = 1.15;
      }

      animStateRef.current.animatingCamera = true;
      animStateRef.current.targetAngle1 = a1;
      animStateRef.current.targetAngle2 = a2;
      animStateRef.current.targetAngle3 = a3;
      animStateRef.current.targetAngle4 = a4;
      animStateRef.current.targetCamPos.set(camX, camY, camZ);
      animStateRef.current.targetLookAt.set(lookX, lookY, lookZ);
    },
    []
  );

  useEffect(() => {
    updateTargetAnimation(foldMode, activePanel, isFlipped);
  }, [foldMode, activePanel, isFlipped, updateTargetAnimation]);

  // Set up Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth > 0 ? container.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 1200);
    const height = container.clientHeight > 0 ? container.clientHeight : (typeof window !== 'undefined' ? window.innerHeight : 800);

    // 1. Scene & Camera (Crisp Bright Classroom Daylight Atmosphere)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.012);

    const aspect = width / height;
    const initialFov = aspect < 1.0 ? Math.min(75, Math.max(45, (45 / aspect) * 0.72)) : 45;
    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 100);
    camera.position.set(0, 2.4, 5.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
    container.style.touchAction = 'none';
    container.appendChild(renderer.domElement);

    // 3. Orbit Controls (Responsive touch gestures & close-up reading zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 0.45; // Macro close-up reading range
    controls.maxDistance = 14.0;
    controls.target.set(0, 1.25, 0);
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    cameraRef.current = camera;
    controlsRef.current = controls;

    // When the user scrolls the wheel or drags orbit controls, immediately let them control zoom freely
    controls.addEventListener('start', () => {
      animStateRef.current.animatingCamera = false;
    });

    const onWheel = () => {
      animStateRef.current.animatingCamera = false;
    };
    renderer.domElement.addEventListener('wheel', onWheel, { passive: true });

    // 4. Pure Daylight Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(-8, 9, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    sunLight.shadow.bias = -0.00005;
    sunLight.shadow.normalBias = 0.02; // Prevents shadow acne / banding
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xd0e3ff, 0.8);
    fillLight.position.set(5, 8, -2);
    scene.add(fillLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.4, 14, Math.PI / 4, 0.35, 1);
    spotLight.position.set(0, 5.5, 2.5);
    spotLight.target.position.set(0, 1.25, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // 5. CLASSROOM ENVIRONMENT
    const classroomGroup = new THREE.Group();

    // Floor
    const floorTexture = new THREE.CanvasTexture(createFloorCanvas());
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(5, 5);

    const floorGeo = new THREE.PlaneGeometry(32, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.5,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -0.01, 2);
    floor.receiveShadow = true;
    classroomGroup.add(floor);

    // Back Wall
    const backWallGeo = new THREE.PlaneGeometry(28, 12);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0xf3efe6,
      roughness: 0.9,
    });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 5, -5.4);
    backWall.receiveShadow = true;
    classroomGroup.add(backWall);

    // Lower Wainscoting Trim
    const wainscotGeo = new THREE.PlaneGeometry(28, 1.2);
    const wainscotMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a3c,
      roughness: 0.7,
    });
    const wainscot = new THREE.Mesh(wainscotGeo, wainscotMat);
    wainscot.position.set(0, 0.6, -5.37);
    classroomGroup.add(wainscot);

    // Chalkboard Frame
    const frameGeo = new THREE.BoxGeometry(7.6, 3.9, 0.06);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x5a381e, roughness: 0.6 });
    const boardFrame = new THREE.Mesh(frameGeo, frameMat);
    boardFrame.position.set(-0.6, 3.4, -5.3);
    classroomGroup.add(boardFrame);

    // Blackboard / Chalkboard (with polygonOffset to prevent blinking)
    const chalkboardTex = new THREE.CanvasTexture(createChalkboardCanvas());
    chalkboardTex.colorSpace = THREE.SRGBColorSpace;
    const boardGeo = new THREE.PlaneGeometry(7.4, 3.7);
    const boardMat = new THREE.MeshStandardMaterial({
      map: chalkboardTex,
      roughness: 0.7,
      metalness: 0.02,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const chalkboard = new THREE.Mesh(boardGeo, boardMat);
    chalkboard.position.set(-0.6, 3.4, -5.25);
    classroomGroup.add(chalkboard);

    // Chalkboard Tray with chalk sticks & eraser
    const trayGeo = new THREE.BoxGeometry(7.4, 0.06, 0.22);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.3, roughness: 0.5 });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.position.set(-0.6, 1.52, -5.14);
    classroomGroup.add(tray);

    const eraserGeo = new THREE.BoxGeometry(0.35, 0.06, 0.12);
    const eraserMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const eraser = new THREE.Mesh(eraserGeo, eraserMat);
    eraser.position.set(1.5, 1.58, -5.14);
    classroomGroup.add(eraser);

    // Poster Frame & Poster
    const posterFrameGeo = new THREE.BoxGeometry(2.1, 2.8, 0.04);
    const posterFrameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const posterFrame = new THREE.Mesh(posterFrameGeo, posterFrameMat);
    posterFrame.position.set(5.2, 3.4, -5.32);
    classroomGroup.add(posterFrame);

    const posterTex = new THREE.CanvasTexture(createPosterCanvas());
    posterTex.colorSpace = THREE.SRGBColorSpace;
    const posterGeo = new THREE.PlaneGeometry(2.0, 2.7);
    const posterMat = new THREE.MeshStandardMaterial({
      map: posterTex,
      roughness: 0.4,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const poster = new THREE.Mesh(posterGeo, posterMat);
    poster.position.set(5.2, 3.4, -5.28);
    classroomGroup.add(poster);

    // Wall Clock
    const clockGroup = new THREE.Group();
    clockGroup.position.set(-0.6, 5.8, -5.3);
    const clockRimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
    const clockRimMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const clockRim = new THREE.Mesh(clockRimGeo, clockRimMat);
    clockRim.rotation.x = Math.PI / 2;
    clockGroup.add(clockRim);

    const clockFaceGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.09, 32);
    const clockFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const clockFace = new THREE.Mesh(clockFaceGeo, clockFaceMat);
    clockFace.rotation.x = Math.PI / 2;
    clockGroup.add(clockFace);

    const hourHandGeo = new THREE.BoxGeometry(0.03, 0.22, 0.02);
    const handMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hourHand = new THREE.Mesh(hourHandGeo, handMat);
    hourHand.rotation.z = -Math.PI / 3;
    hourHand.position.set(-0.06, 0.08, 0.05);
    clockGroup.add(hourHand);

    const minHandGeo = new THREE.BoxGeometry(0.02, 0.32, 0.02);
    const minHand = new THREE.Mesh(minHandGeo, handMat);
    minHand.rotation.z = -Math.PI / 2;
    minHand.position.set(0.12, 0.0, 0.05);
    clockGroup.add(minHand);
    classroomGroup.add(clockGroup);

    // Left Window Wall
    const windowWall = new THREE.Group();
    windowWall.position.set(-9.0, 0, 0);
    windowWall.rotation.y = Math.PI / 2;

    const winWallMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 12),
      new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.9 })
    );
    winWallMesh.position.set(0, 5, 0);
    windowWall.add(winWallMesh);

    const windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    for (let wIdx = -1; wIdx <= 1; wIdx += 2) {
      const winGeo = new THREE.PlaneGeometry(4.2, 4.0);
      const winMesh = new THREE.Mesh(winGeo, windowGlassMat);
      winMesh.position.set(wIdx * 3.5, 4.5, 0.02);
      windowWall.add(winMesh);

      const wFrame = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 4.2, 0.1),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      wFrame.position.set(wIdx * 3.5, 4.5, 0.04);
      windowWall.add(wFrame);

      const crossH = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.08, 0.12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      crossH.position.set(wIdx * 3.5, 4.5, 0.06);
      windowWall.add(crossH);

      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 4.0, 0.12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      crossV.position.set(wIdx * 3.5, 4.5, 0.06);
      windowWall.add(crossV);
    }
    classroomGroup.add(windowWall);

    // Right Wall Bookshelf
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(8.5, 0, -1.5);
    shelfGroup.rotation.y = -Math.PI / 2;

    const bookcaseGeo = new THREE.BoxGeometry(4.0, 5.0, 0.7);
    const bookcaseMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 });
    const bookcase = new THREE.Mesh(bookcaseGeo, bookcaseMat);
    bookcase.position.set(0, 2.5, 0);
    bookcase.castShadow = true;
    shelfGroup.add(bookcase);

    const bookColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0xec4899, 0x06b6d4];
    for (let shelf = 0; shelf < 3; shelf++) {
      for (let b = 0; b < 14; b++) {
        const bHeight = 0.65 + (b % 3) * 0.1;
        const bGeo = new THREE.BoxGeometry(0.12, bHeight, 0.5);
        const bMat = new THREE.MeshStandardMaterial({ color: bookColors[(shelf * 3 + b) % bookColors.length] });
        const book = new THREE.Mesh(bGeo, bMat);
        book.position.set(-1.6 + b * 0.24, 1.2 + shelf * 1.3, 0.05);
        shelfGroup.add(book);
      }
    }
    classroomGroup.add(shelfGroup);

    // Background Student Desks
    const createStudentDesk = (x: number, z: number) => {
      const desk = new THREE.Group();
      desk.position.set(x, 0, z);

      const top = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.08, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.6 })
      );
      top.position.set(0, 1.3, 0);
      top.castShadow = true;
      top.receiveShadow = true;
      desk.add(top);

      const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.4 });
      for (let lx = -1.0; lx <= 1.0; lx += 2.0) {
        for (let lz = -0.55; lz <= 0.55; lz += 1.1) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.3, 12), legMat);
          leg.position.set(lx, 0.65, lz);
          leg.castShadow = true;
          desk.add(leg);
        }
      }

      const chairSeat = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.06, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.6 })
      );
      chairSeat.position.set(0, 0.75, 1.1);
      chairSeat.castShadow = true;
      desk.add(chairSeat);

      const chairBack = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.6, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.6 })
      );
      chairBack.position.set(0, 1.25, 1.5);
      chairBack.castShadow = true;
      desk.add(chairBack);

      return desk;
    };

    classroomGroup.add(createStudentDesk(-4.8, -1.8));
    classroomGroup.add(createStudentDesk(4.8, -1.8));
    classroomGroup.add(createStudentDesk(-5.2, 2.4));
    classroomGroup.add(createStudentDesk(5.2, 2.4));

    // MAIN CLASSROOM DESK (Spacious & Clean - NO overlapping laptop or props!)
    const mainDesk = new THREE.Group();
    const mainTopGeo = new THREE.BoxGeometry(7.2, 0.12, 3.2);
    const mainTopMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.55,
      metalness: 0.05,
    });
    const mainTop = new THREE.Mesh(mainTopGeo, mainTopMat);
    mainTop.position.set(0, 0.06, 0);
    mainTop.castShadow = true;
    mainTop.receiveShadow = true;
    mainDesk.add(mainTop);

    const deskLegMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });
    const legCoords = [
      [-3.3, -1.35],
      [3.3, -1.35],
      [-3.3, 1.35],
      [3.3, 1.35],
    ];
    legCoords.forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.5, 16), deskLegMat);
      leg.position.set(lx, -0.68, lz);
      leg.castShadow = true;
      mainDesk.add(leg);

      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16), deskLegMat);
      foot.position.set(lx, -1.41, lz);
      mainDesk.add(foot);
    });

    // Outer desk props placed far to the sides so there is zero overlap with the brochure
    const penHolder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.1, 0.28, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    );
    penHolder.position.set(-3.1, 0.26, -0.8);
    penHolder.castShadow = true;
    mainDesk.add(penHolder);

    const penColors = [0xef4444, 0x3b82f6, 0x10b981];
    penColors.forEach((col, idx) => {
      const pen = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.35, 8),
        new THREE.MeshStandardMaterial({ color: col })
      );
      pen.position.set(-3.1 + (idx - 1) * 0.04, 0.38, -0.8 + (idx % 2) * 0.03);
      pen.rotation.z = (idx - 1) * 0.15;
      mainDesk.add(pen);
    });

    const notebook = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.03, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.6 })
    );
    notebook.position.set(3.0, 0.13, 0.5);
    notebook.rotation.y = -0.25;
    notebook.castShadow = true;
    mainDesk.add(notebook);

    classroomGroup.add(mainDesk);
    scene.add(classroomGroup);

    // 6. BUILD THE 5-PANEL ZIGZAG ACCORDION BROCHURE MODEL
    // Panel Dimensions
    const panelWidth = 1.35;
    const panelHeight = 2.25;
    const panelDepth = 0.012; // Realistic paper cardstock thickness

    // Generate high-resolution CanvasTextures for all 5 panels
    const frontTex0 = new THREE.CanvasTexture(createPanel1CoverCanvas());
    const frontTex1 = new THREE.CanvasTexture(createPanel2DefinitionCanvas());
    const frontTex2 = new THREE.CanvasTexture(createPanel3PoliciesCanvas());
    const frontTex3 = new THREE.CanvasTexture(createPanel4IssuesCanvas());
    const frontTex4 = new THREE.CanvasTexture(createPanel5ConclusionCanvas());

    const backTex0 = new THREE.CanvasTexture(createPanel1BackCanvas());
    const backTex1 = new THREE.CanvasTexture(createPanel2BackCanvas());
    const backTex2 = new THREE.CanvasTexture(createPanel3BackCanvas());
    const backTex3 = new THREE.CanvasTexture(createPanel4BackCanvas());
    const backTex4 = new THREE.CanvasTexture(createPanel5BackCanvas());

    const textures = [
      frontTex0, frontTex1, frontTex2, frontTex3, frontTex4,
      backTex0, backTex1, backTex2, backTex3, backTex4,
    ];
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbf4ea,
      roughness: 0.7,
      metalness: 0.02,
    });

    const createPanelMaterials = (frontTex: THREE.CanvasTexture, backTex: THREE.CanvasTexture) => {
      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.65,
        metalness: 0.03,
      });
      const backMat = new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.65,
        metalness: 0.03,
      });
      return [
        edgeMaterial, // +X
        edgeMaterial, // -X
        edgeMaterial, // +Y
        edgeMaterial, // -Y
        frontMat,     // +Z Front
        backMat,      // -Z Back
      ];
    };

    const panelBoxGeo = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth);

    // Root Brochure Object
    const brochureRoot = new THREE.Group();
    brochureRoot.position.set(0, panelHeight / 2 + 0.12, 0);

    const flipContainer = new THREE.Group();
    brochureRoot.add(flipContainer);

    // Panel 0 (Cover & Members)
    const panel0 = new THREE.Mesh(panelBoxGeo, createPanelMaterials(frontTex0, backTex0));
    panel0.castShadow = true;
    panel0.receiveShadow = true;
    panel0.userData = { panelIndex: 0 };
    flipContainer.add(panel0);

    // Hinge 1 (located at right edge of Panel 0)
    const hinge1 = new THREE.Group();
    hinge1.position.set(panelWidth / 2, 0, 0);
    panel0.add(hinge1);

    // Panel 1 (What is ICT?)
    const panel1 = new THREE.Mesh(panelBoxGeo, createPanelMaterials(frontTex1, backTex1));
    panel1.position.set(panelWidth / 2, 0, 0);
    panel1.castShadow = true;
    panel1.receiveShadow = true;
    panel1.userData = { panelIndex: 1 };
    hinge1.add(panel1);

    // Hinge 2 (located at right edge of Panel 1)
    const hinge2 = new THREE.Group();
    hinge2.position.set(panelWidth, 0, 0);
    hinge1.add(hinge2);

    // Panel 2 (ICT Policies)
    const panel2 = new THREE.Mesh(panelBoxGeo, createPanelMaterials(frontTex2, backTex2));
    panel2.position.set(panelWidth / 2, 0, 0);
    panel2.castShadow = true;
    panel2.receiveShadow = true;
    panel2.userData = { panelIndex: 2 };
    hinge2.add(panel2);

    // Hinge 3 (located at right edge of Panel 2)
    const hinge3 = new THREE.Group();
    hinge3.position.set(panelWidth, 0, 0);
    hinge2.add(hinge3);

    // Panel 3 (ICT Issues)
    const panel3 = new THREE.Mesh(panelBoxGeo, createPanelMaterials(frontTex3, backTex3));
    panel3.position.set(panelWidth / 2, 0, 0);
    panel3.castShadow = true;
    panel3.receiveShadow = true;
    panel3.userData = { panelIndex: 3 };
    hinge3.add(panel3);

    // Hinge 4 (located at right edge of Panel 3)
    const hinge4 = new THREE.Group();
    hinge4.position.set(panelWidth, 0, 0);
    hinge3.add(hinge4);

    // Panel 4 (Conclusion, Ethics & Thank You)
    const panel4 = new THREE.Mesh(panelBoxGeo, createPanelMaterials(frontTex4, backTex4));
    panel4.position.set(panelWidth / 2, 0, 0);
    panel4.castShadow = true;
    panel4.receiveShadow = true;
    panel4.userData = { panelIndex: 4 };
    hinge4.add(panel4);

    scene.add(brochureRoot);

    // 7. Raycasting for Click & Hover interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const interactivePanels = [panel0, panel1, panel2, panel3, panel4];

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactivePanels, false);
      if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const onPointerDown = () => {
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      renderer.domElement.style.cursor = 'grab';
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactivePanels, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const pIndex = hit.userData.panelIndex as ActivePanel;
        setActivePanel((prev) => (prev === pIndex ? null : pIndex));
        if (soundEnabled) playClickTone();
      }
    };

    // Mobile Touch Tap handling
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1 && Date.now() - touchStartTime < 350) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.hypot(dx, dy) < 14) {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((e.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(interactivePanels, false);
          if (intersects.length > 0) {
            const hit = intersects[0].object as THREE.Mesh;
            const pIndex = hit.userData.panelIndex as ActivePanel;
            setActivePanel((prev) => (prev === pIndex ? null : pIndex));
            if (soundEnabled) playClickTone();
          }
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('mousedown', onPointerDown);
    renderer.domElement.addEventListener('mouseup', onPointerUp);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: true });

    // 8. Responsive Resize & FOV handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth > 0 ? container.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const h = container.clientHeight > 0 ? container.clientHeight : (typeof window !== 'undefined' ? window.innerHeight : 800);
      if (w > 0 && h > 0) {
        const a = w / h;
        camera.aspect = a;

        // Dynamic Responsive FOV adaptation for Mobile Devices
        if (a < 1.0) {
          camera.fov = Math.min(75, Math.max(45, (45 / a) * 0.72));
        } else {
          camera.fov = 45;
        }

        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);
    requestAnimationFrame(handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth kinematic interpolation for 5-panel accordion folding
      const s = animStateRef.current;
      const lerpSpeed = 5.0 * delta;

      s.currentAngle1 = THREE.MathUtils.lerp(s.currentAngle1, s.targetAngle1, lerpSpeed);
      s.currentAngle2 = THREE.MathUtils.lerp(s.currentAngle2, s.targetAngle2, lerpSpeed);
      s.currentAngle3 = THREE.MathUtils.lerp(s.currentAngle3, s.targetAngle3, lerpSpeed);
      s.currentAngle4 = THREE.MathUtils.lerp(s.currentAngle4, s.targetAngle4, lerpSpeed);
      s.currentFlipAngle = THREE.MathUtils.lerp(s.currentFlipAngle, s.targetFlipAngle, lerpSpeed);

      hinge1.rotation.y = s.currentAngle1;
      hinge2.rotation.y = s.currentAngle2;
      hinge3.rotation.y = s.currentAngle3;
      hinge4.rotation.y = s.currentAngle4;
      flipContainer.rotation.y = s.currentFlipAngle;

      // Dynamic Auto-Centering of all 5 panels
      const t1 = s.currentAngle1;
      const t2 = s.currentAngle2;
      const t3 = s.currentAngle3;
      const t4 = s.currentAngle4;

      const p0x = 0;
      const p0z = 0;

      const p1x = panelWidth / 2 + (panelWidth / 2) * Math.cos(t1);
      const p1z = (panelWidth / 2) * Math.sin(t1);

      const p2x = panelWidth / 2 + panelWidth * Math.cos(t1) + (panelWidth / 2) * Math.cos(t1 + t2);
      const p2z = panelWidth * Math.sin(t1) + (panelWidth / 2) * Math.sin(t1 + t2);

      const p3x = panelWidth / 2 + panelWidth * Math.cos(t1) + panelWidth * Math.cos(t1 + t2) + (panelWidth / 2) * Math.cos(t1 + t2 + t3);
      const p3z = panelWidth * Math.sin(t1) + panelWidth * Math.sin(t1 + t2) + (panelWidth / 2) * Math.sin(t1 + t2 + t3);

      const p4x = panelWidth / 2 + panelWidth * Math.cos(t1) + panelWidth * Math.cos(t1 + t2) + panelWidth * Math.cos(t1 + t2 + t3) + (panelWidth / 2) * Math.cos(t1 + t2 + t3 + t4);
      const p4z = panelWidth * Math.sin(t1) + panelWidth * Math.sin(t1 + t2) + panelWidth * Math.sin(t1 + t2 + t3) + (panelWidth / 2) * Math.sin(t1 + t2 + t3 + t4);

      const avgX = (p0x + p1x + p2x + p3x + p4x) / 5;
      const avgZ = (p0z + p1z + p2z + p3z + p4z) / 5;

      // When flipContainer rotates by currentFlipAngle, its centroid (avgX, avgZ) rotates:
      // X_world_offset = avgX * cos(angle) + avgZ * sin(angle)
      // Z_world_offset = -avgX * sin(angle) + avgZ * cos(angle)
      const rotatedCenterX = avgX * Math.cos(s.currentFlipAngle) + avgZ * Math.sin(s.currentFlipAngle);
      const rotatedCenterZ = -avgX * Math.sin(s.currentFlipAngle) + avgZ * Math.cos(s.currentFlipAngle);

      brochureRoot.position.x = THREE.MathUtils.lerp(brochureRoot.position.x, -rotatedCenterX, lerpSpeed);
      brochureRoot.position.z = THREE.MathUtils.lerp(brochureRoot.position.z, -rotatedCenterZ, lerpSpeed);

      // Camera smooth gliding only during auto-transitions (unblocks free user zooming to read)
      if (s.animatingCamera) {
        camera.position.lerp(s.targetCamPos, 4.0 * delta);
        controls.target.lerp(s.targetLookAt, 4.0 * delta);

        if (
          camera.position.distanceTo(s.targetCamPos) < 0.015 &&
          controls.target.distanceTo(s.targetLookAt) < 0.015
        ) {
          camera.position.copy(s.targetCamPos);
          controls.target.copy(s.targetLookAt);
          s.animatingCamera = false;
        }
      }

      if (s.autoRotate) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
      } else {
        controls.autoRotate = false;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onPointerMove);
      renderer.domElement.removeEventListener('mousedown', onPointerDown);
      renderer.domElement.removeEventListener('mouseup', onPointerUp);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      renderer.domElement.removeEventListener('wheel', onWheel);

      cameraRef.current = null;
      controlsRef.current = null;

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      textures.forEach((t) => t.dispose());
      floorTexture.dispose();
      chalkboardTex.dispose();
      posterTex.dispose();
    };
  }, [soundEnabled]);

  // Action Handlers
  const handleToggleFold = (newMode: FoldMode) => {
    setFoldMode(newMode);
    setActivePanel(null);
    if (soundEnabled) playPaperRustle(1.2);
    if (newMode === 'unfolded') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff4d79', '#f472b6', '#38bdf8', '#fbbf24', '#a855f7'],
      });
    }
  };

  const handleSelectPanel = (panelIndex: ActivePanel) => {
    setActivePanel(panelIndex);
    if (soundEnabled) playClickTone();
  };

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
    if (soundEnabled) playPaperRustle(0.9);
  };

  const handleResetCamera = () => {
    setActivePanel(null);
    setIsFlipped(false);
    setFoldMode('accordion');
    if (soundEnabled) playClickTone();
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const dir = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
    const step = direction === 'in' ? 0.9 : -0.9;
    const newCamPos = camera.position.clone().addScaledVector(dir, step);
    const dist = newCamPos.distanceTo(controls.target);
    if (dist >= 0.45 && dist <= 12.0) {
      animStateRef.current.targetCamPos.copy(newCamPos);
      animStateRef.current.targetLookAt.copy(controls.target);
      animStateRef.current.animatingCamera = true;
    }
    if (soundEnabled) playClickTone();
  };

  return (
    <div
      className="relative w-full h-full min-h-screen bg-slate-950 text-white overflow-hidden select-none font-sans"
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      />

      {/* Top Header & Project Brand Pill */}
      <header
        className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-20 flex items-center justify-between pointer-events-none gap-2"
        style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', zIndex: 20 }}
      >
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-black/75 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl border border-pink-500/30 shadow-lg shadow-pink-950/20 max-w-[55%] sm:max-w-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-pink-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-wide text-pink-100 uppercase truncate">
                ICT Policies & Issues
              </h1>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/40 rounded-full hidden md:inline">
                5-Panel 3D Zigzag
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block truncate">
              Interactive WebGL Brochure in ICT Classroom • Group 6
            </p>
          </div>
        </div>

        {/* Quick Toolbar (Sound, Auto-Orbit, Zoom, Flip, Info) */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 bg-black/75 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-lg flex-shrink-0">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              setAutoRotate((prev) => !prev);
              if (soundEnabled) playClickTone();
            }}
            title={autoRotate ? 'Stop Orbiting' : 'Auto-Orbit Scene'}
            className={`p-1.5 sm:p-2 rounded-xl transition ${
              autoRotate ? 'bg-pink-600/30 text-pink-300 border border-pink-500/40' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => handleZoom('in')}
            title="Zoom In to Read"
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-sky-300 hover:bg-white/10 transition"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          </button>

          <button
            onClick={handleToggleFlip}
            title="Flip Front / Back"
            className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1 sm:gap-1.5 transition ${
              isFlipped
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span className="hidden sm:inline">{isFlipped ? 'Back View' : 'Flip Side'}</span>
          </button>

          <button
            onClick={() => setInfoOpen((prev) => !prev)}
            title="Toggle Panel Details HUD"
            className={`p-1.5 sm:p-2 rounded-xl transition ${
              infoOpen ? 'bg-pink-500 text-white' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </header>

      {/* Main Accordion Action Bar (Bottom Floating HUD - Mobile Optimized) */}
      <div
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none w-[calc(100vw-1rem)] sm:w-auto max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)]"
        style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}
      >
        {uiCollapsed ? (
          <button
            onClick={() => setUiCollapsed(false)}
            className="pointer-events-auto flex items-center gap-1.5 bg-black/80 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl border border-pink-500/40 text-xs font-semibold text-pink-300 shadow-2xl hover:bg-black/90 hover:scale-105 transition"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span>Show Controls</span>
          </button>
        ) : (
          <div className="pointer-events-auto bg-black/85 backdrop-blur-xl px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl border border-pink-500/30 shadow-2xl flex flex-col items-center gap-1.5 w-full">
            {/* Top Row: 5 Panels Selector with Mobile-Optimized Labels */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 scrollbar-none justify-start sm:justify-center w-full">
              <button
                onClick={() => handleSelectPanel(0)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  activePanel === 0
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-pink-300 flex-shrink-0" />
                <span className="hidden sm:inline">{isFlipped ? 'Back 1: Legal Frameworks' : 'Frontpage: Cover'}</span>
                <span className="sm:hidden">{isFlipped ? '1: Legal' : '1: Cover'}</span>
              </button>

              <button
                onClick={() => handleSelectPanel(1)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  activePanel === 1
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
                <span className="hidden sm:inline">{isFlipped ? 'Back 2: Cyber Safety' : 'Panel 2: Definition'}</span>
                <span className="sm:hidden">{isFlipped ? '2: Safety' : '2: Def'}</span>
              </button>

              <button
                onClick={() => handleSelectPanel(2)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  activePanel === 2
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                <span className="hidden sm:inline">{isFlipped ? 'Back 3: Copyright Rules' : 'Panel 3: ICT Policies'}</span>
                <span className="sm:hidden">{isFlipped ? '3: Rules' : '3: Policies'}</span>
              </button>

              <button
                onClick={() => handleSelectPanel(3)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  activePanel === 3
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-300 flex-shrink-0" />
                <span className="hidden sm:inline">{isFlipped ? 'Back 4: Digital Divide' : 'Panel 4: ICT Issues'}</span>
                <span className="sm:hidden">{isFlipped ? '4: Divide' : '4: Issues'}</span>
              </button>

              <button
                onClick={() => handleSelectPanel(4)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  activePanel === 4
                    ? 'bg-gradient-to-r from-pink-600 to-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span className="hidden sm:inline">{isFlipped ? 'Back 5: Manifesto & Credits' : 'Panel 5: Conclusion'}</span>
                <span className="sm:hidden">{isFlipped ? '5: Credits' : '5: End'}</span>
              </button>
            </div>

            {/* Bottom Row: Fold Actions & Quick Controls */}
            <div className="flex items-center justify-between w-full pt-1.5 border-t border-white/10 gap-1.5 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleToggleFold('folded')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition ${
                    foldMode === 'folded'
                      ? 'bg-slate-700 text-white shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Layers className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400" />
                  <span>Folded</span>
                </button>

                <button
                  onClick={() => handleToggleFold('accordion')}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition ${
                    foldMode === 'accordion'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md ring-1 ring-pink-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-pink-300" />
                  <span>Zigzag</span>
                </button>

                <button
                  onClick={() => handleToggleFold('unfolded')}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition ${
                    foldMode === 'unfolded'
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md ring-1 ring-rose-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Unfold (Read All)</span>
                  <span className="sm:hidden">Unfold</span>
                </button>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleZoom('in')}
                  title="Zoom In to Read"
                  className="p-1 sm:p-1.5 rounded-lg text-slate-300 hover:text-sky-300 hover:bg-white/10 transition flex items-center gap-0.5 sm:gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[10px] hidden sm:inline">Zoom</span>
                </button>
                <button
                  onClick={() => handleZoom('out')}
                  title="Zoom Out"
                  className="p-1 sm:p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  <ZoomOut className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={handleResetCamera}
                  title="Reset View"
                  className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setUiCollapsed(true)}
                  title="Hide Controls (Unobstructed Full View)"
                  className="px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold text-slate-400 hover:text-pink-300 hover:bg-white/10 transition flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hide</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Panel Detail & Reading HUD (Top Right Drawer - Mobile Friendly) */}
      {infoOpen && (
        <aside className="absolute top-14 sm:top-20 right-2 sm:right-4 left-2 sm:left-auto w-auto sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-md max-h-[calc(100vh-8rem)] overflow-y-auto bg-black/90 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-pink-500/30 shadow-2xl text-slate-200 scrollbar-thin scrollbar-thumb-pink-500/30 z-30">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400 flex items-center gap-1.5 truncate">
              <ZoomIn className="w-3.5 h-3.5 flex-shrink-0" />
              {isFlipped
                ? activePanel === 0
                  ? 'Back 1 • Legal Frameworks'
                  : activePanel === 1
                  ? 'Back 2 • Cyber Safety'
                  : activePanel === 2
                  ? 'Back 3 • Copyright Rules'
                  : activePanel === 3
                  ? 'Back 4 • Digital Divide'
                  : activePanel === 4
                  ? 'Back 5 • Manifesto & Credits'
                  : '5-Panel Back Spread Guide'
                : activePanel === 0
                ? 'Frontpage • ICT Policies & Issues'
                : activePanel === 1
                ? 'Panel 2 • What is ICT?'
                : activePanel === 2
                ? 'Panel 3 • ICT Policies'
                : activePanel === 3
                ? 'Panel 4 • ICT Issues'
                : activePanel === 4
                ? 'Panel 5 • Conclusion & Ethics'
                : '5-Panel Brochure Guide'}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                {isFlipped ? 'Back Side' : 'Front Side'}
              </span>
              <button
                onClick={() => setInfoOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {/* FRONT VIEWS */}
            {!isFlipped && (activePanel === 0 || activePanel === null) && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-rose-950/40 border border-pink-500/30">
                <h3 className="font-bold text-base text-pink-100">Cover Frontpage: ICT Policies and Issues</h3>
                <p className="text-xs text-pink-300/80 mt-0.5">Ingoude Company Presentation Portfolio • Group 6</p>
                <div className="mt-2 text-[11px] text-pink-200/90 leading-relaxed bg-black/25 p-2 rounded-xl border border-pink-500/15">
                  Replicating the official slide cover featuring the 3D desktop workstation, digital clock 17:15, AI neural avatar, and official presentation banner.
                </div>
                <div className="mt-3 pt-2.5 border-t border-pink-500/20">
                  <div className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Official Group Members
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-semibold text-white">1. Romoculo, Romick</span>
                      <span className="text-[10px] text-pink-300">Lead Presenter</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">2. Timbal, Angela</span>
                      <span className="text-[10px] text-slate-400">Policy Research</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">3. Atecibo, Roserie</span>
                      <span className="text-[10px] text-slate-400">Ethics Analyst</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">4. Sanchez, Jovine</span>
                      <span className="text-[10px] text-slate-400">Cybersecurity</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">5. Tabogon, Rhea Jane</span>
                      <span className="text-[10px] text-slate-400">Accessibility</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">6. Salado, Charisse</span>
                      <span className="text-[10px] text-slate-400">Digital Rights</span>
                    </li>
                    <li className="flex items-center justify-between bg-black/30 px-2.5 py-1 rounded-lg border border-pink-500/10">
                      <span className="font-medium text-slate-200">7. Quijano, Jeromel</span>
                      <span className="text-[10px] text-slate-400">Documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!isFlipped && activePanel === 1 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-indigo-950/40 border border-purple-500/30">
                <h3 className="font-bold text-base text-purple-100">What is ICT?</h3>
                <p className="text-xs text-purple-300 mt-1 leading-relaxed">
                  Information and Communications Technology (ICT) refers to unified communications and the integration of telecommunications, computers, and software that enable users to access, store, transmit, and manipulate information.
                </p>
                <div className="mt-3 pt-2.5 border-t border-purple-500/20 text-xs text-slate-300 space-y-1.5">
                  <p>• <strong>Accelerates Education:</strong> Makes interactive learning faster and engaging.</p>
                  <p>• <strong>Global Bridge:</strong> Seamless real-time collaboration across borders.</p>
                  <p>• <strong>Digital Literacy:</strong> Equips youth with essential 21st-century problem solving.</p>
                </div>
              </div>
            )}

            {!isFlipped && activePanel === 2 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-indigo-950/40 border border-blue-500/30">
                <h3 className="font-bold text-base text-blue-100">ICT Policies Framework</h3>
                <p className="text-xs text-blue-300/80 mt-0.5">Core Institutional Standards</p>
                <div className="mt-3 pt-2.5 border-t border-blue-500/20 text-xs text-slate-300 space-y-2">
                  <div>
                    <span className="font-semibold text-blue-300">1. Data Privacy:</span>
                    <p className="text-[11px] text-slate-400">Safeguards sensitive personal information of students, staff, and faculty.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-300">2. Cybersecurity:</span>
                    <p className="text-[11px] text-slate-400">Shields campus networks, accounts, and hardware from unauthorized breaches.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-300">3. Copyright & IP:</span>
                    <p className="text-[11px] text-slate-400">Honors intellectual property, original creations, and fair use standards.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-300">4. Digital Accessibility:</span>
                    <p className="text-[11px] text-slate-400">Guarantees equal technological access and assistive tools for all learners.</p>
                  </div>
                </div>
              </div>
            )}

            {!isFlipped && activePanel === 3 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-950/60 to-rose-950/40 border border-red-500/30">
                <h3 className="font-bold text-base text-red-100">ICT Critical Issues</h3>
                <p className="text-xs text-red-300/80 mt-0.5">Challenges in Modern Cyberspace</p>
                <div className="mt-3 pt-2.5 border-t border-red-500/20 text-xs text-slate-300 space-y-2">
                  <div>
                    <span className="font-semibold text-red-300">1. Cyberbullying:</span>
                    <p className="text-[11px] text-slate-400">Online harassment, hate speech, and intimidation damaging mental health.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-300">2. Digital Divide:</span>
                    <p className="text-[11px] text-slate-400">Disparities in device access and broadband connectivity among rural students.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-300">3. Fake News:</span>
                    <p className="text-[11px] text-slate-400">Viral misinformation distorting public discourse and factual integrity.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-300">4. Internet Addiction:</span>
                    <p className="text-[11px] text-slate-400">Excessive screen time degrading focus, sleep, and physical well-being.</p>
                  </div>
                </div>
              </div>
            )}

            {!isFlipped && activePanel === 4 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-amber-950/40 border border-pink-500/30">
                <h3 className="font-bold text-base text-amber-100">Conclusion & Ethics</h3>
                <p className="text-xs text-amber-300 mt-1 leading-relaxed">
                  ICT policies are not merely restrictions; they are foundational ethical pillars that safeguard our collective future. Responsible technology usage demands placing human dignity, security, and truth at the core of innovation.
                </p>
                <div className="mt-3 pt-2 text-center text-xs font-bold text-pink-300">
                  Thank you for reviewing our interactive presentation!
                </div>
              </div>
            )}

            {/* BACK SIDE VIEWS */}
            {isFlipped && (activePanel === 0 || activePanel === null) && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-950/60 to-slate-950/40 border border-sky-500/30">
                <h3 className="font-bold text-base text-sky-100">Legal Frameworks</h3>
                <p className="text-xs text-sky-300/80 mt-0.5">Key Philippine & International Legislation</p>
                <div className="mt-3 pt-2.5 border-t border-sky-500/20 text-xs text-slate-300 space-y-2">
                  <div className="p-2 bg-black/30 rounded-lg">
                    <span className="font-bold text-sky-300">RA 10173 • Data Privacy Act</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Mandates strict consent and confidentiality in handling student and citizen data.</p>
                  </div>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <span className="font-bold text-emerald-300">RA 10175 • Cybercrime Prevention</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Criminalizes hacking, identity theft, child pornography, and online libel.</p>
                  </div>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <span className="font-bold text-yellow-300">RA 8293 • Intellectual Property</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Defines authors rights, software licensing, and fair use in academic institutions.</p>
                  </div>
                </div>
              </div>
            )}

            {isFlipped && activePanel === 1 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950/40 border border-emerald-500/30">
                <h3 className="font-bold text-base text-emerald-100">Cyber Safety & Student Rules</h3>
                <p className="text-xs text-emerald-300/80 mt-0.5">Digital Footprint & Account Hygiene</p>
                <div className="mt-3 pt-2.5 border-t border-emerald-500/20 text-xs text-slate-300 space-y-1.5">
                  <p>• <strong>Two-Factor Authentication:</strong> Never share OTPs or passwords.</p>
                  <p>• <strong>Phishing Awareness:</strong> Scrutinize email senders and urgent link requests.</p>
                  <p>• <strong>Digital Reputation:</strong> What is posted online leaves a permanent trace.</p>
                </div>
              </div>
            )}

            {isFlipped && activePanel === 2 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950/40 border border-indigo-500/30">
                <h3 className="font-bold text-base text-indigo-100">Copyright & Fair Use Guidelines</h3>
                <p className="text-xs text-indigo-300/80 mt-0.5">Academic Compliance Checklist</p>
                <div className="mt-3 pt-2.5 border-t border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                  <p>• <strong>Attribution:</strong> Always cite the original author or research source.</p>
                  <p>• <strong>Non-Commercial Purpose:</strong> Educational fair use applies strictly to classroom study.</p>
                  <p>• <strong>Open Licenses:</strong> Prioritize Creative Commons (CC-BY) and open-access resources.</p>
                </div>
              </div>
            )}

            {isFlipped && activePanel === 3 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-950/40 border border-cyan-500/30">
                <h3 className="font-bold text-base text-cyan-100">Bridging the Digital Divide</h3>
                <p className="text-xs text-cyan-300/80 mt-0.5">Equity & Inclusion Strategy</p>
                <div className="mt-3 pt-2.5 border-t border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                  <p>• <strong>Public Access Centers:</strong> Subsidized computer labs in remote communities.</p>
                  <p>• <strong>Affordable Broadband:</strong> Universal connectivity initiatives for public schools.</p>
                  <p>• <strong>Device Grant Programs:</strong> Lending laptops and tablets to underprivileged students.</p>
                </div>
              </div>
            )}

            {isFlipped && activePanel === 4 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-rose-950/40 border border-pink-500/30">
                <h3 className="font-bold text-base text-pink-100">Manifesto & Group Credits</h3>
                <p className="text-xs text-pink-300/80 mt-0.5">Department of Information & Communications Technology</p>
                <div className="mt-3 pt-2.5 border-t border-pink-500/20 text-xs text-slate-300 space-y-1.5">
                  <p className="italic text-pink-200">
                    &quot;We pledge to uphold digital ethics, promote equal technological opportunities, and create a secure online environment for all.&quot;
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Group 6 Presentation Portfolio • 2026 Academic Year
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
