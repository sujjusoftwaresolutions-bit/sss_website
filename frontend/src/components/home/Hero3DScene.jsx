import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for whole 3D interactive system
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Sphere / Icosahedron (Inner solid glowing core + outer wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111c38,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x071126,
      emissiveIntensity: 0.6,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Outer Wireframe Cage (Gold)
    const wireGeo = new THREE.IcosahedronGeometry(1.34, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Brand Gold
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Glowing Inner Mini Core
    const innerGeo = new THREE.SphereGeometry(0.75, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf4c542,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 2. Orbital Tech Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Electric cyan
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.85, 0.018, 16, 60);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Gold
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.015, 16, 70);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo3 = new THREE.TorusGeometry(2.55, 0.012, 16, 80);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    mainGroup.add(ring3);

    // 3. Floating Orbiting Satellites (Tech nodes)
    const satellites = [];
    const satData = [
      { geo: new THREE.OctahedronGeometry(0.18), col: 0xd4af37, radius: 2.1, speed: 0.018, axis: 'y', offset: 0 },
      { geo: new THREE.TetrahedronGeometry(0.16), col: 0x38bdf8, radius: 2.4, speed: -0.014, axis: 'x', offset: 2 },
      { geo: new THREE.IcosahedronGeometry(0.15), col: 0xf4c542, radius: 2.7, speed: 0.012, axis: 'z', offset: 4 },
      { geo: new THREE.DodecahedronGeometry(0.14), col: 0x60a5fa, radius: 1.9, speed: -0.02, axis: 'y', offset: 1.5 },
    ];

    satData.forEach((data) => {
      const mat = new THREE.MeshStandardMaterial({
        color: data.col,
        emissive: data.col,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(data.geo, mat);
      mainGroup.add(mesh);
      satellites.push({ mesh, ...data, angle: data.offset });
    });

    // 4. Background 3D Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xd4af37);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? colorGold : colorCyan;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 3, 20);
    goldPoint.position.set(4, 3, 4);
    scene.add(goldPoint);

    const bluePoint = new THREE.PointLight(0x38bdf8, 3, 20);
    bluePoint.position.set(-4, -3, 3);
    scene.add(bluePoint);

    // Mouse & Touch Interactivity
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        targetRotationY = x * 0.45;
        targetRotationX = -y * 0.45;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow when not dragging
      if (!isDragging) {
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      }

      // Core rotation
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;
      wireMesh.rotation.y -= 0.003;
      wireMesh.rotation.z += 0.002;
      innerCore.rotation.y += 0.008;

      // Rings rotation
      ring1.rotation.z += 0.007;
      ring2.rotation.y += 0.006;
      ring3.rotation.x += 0.005;

      // Satellites orbital motion
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 1.5) * (sat.radius * 0.5);
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.02;
      });

      // Particles subtle float
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Floating gentle bounce
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
      {/* Three.js canvas container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Interactive 3D AI Core - Drag to rotate"
      />

      {/* Floating Glassmorphic Badges around the 3D core to attract students */}
      <div className="absolute -top-2 right-4 sm:right-8 z-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
        <div className="px-3.5 py-2 rounded-2xl bg-brand-navy/80 border border-brand-gold/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <p className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">Cutting-Edge</p>
            <p className="text-xs font-outfit font-bold text-white">AI & ML Projects</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-2 sm:left-4 z-20 pointer-events-none animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
        <div className="px-3.5 py-2 rounded-2xl bg-brand-navy/80 border border-sky-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-2">
          <span className="text-lg">🎓</span>
          <div>
            <p className="text-[10px] text-sky-400 uppercase tracking-wider font-bold">Certified</p>
            <p className="text-xs font-outfit font-bold text-white">Student Internships</p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-3 sm:right-2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-medium text-gray-300">Interactive 3D · Drag Me</span>
      </div>
    </div>
  );
};

export default Hero3DScene;
