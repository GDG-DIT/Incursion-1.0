// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function UniverseMaskCanvas() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposed = false;
    let frame = 0;
    let running = false;
    let inView = true;
    let renderer;
    let environmentTarget;
    let resizeObserver;
    let pivot;
    let maskWidth = 1.7;
    let maskHeight = 2.4;
    let frontZ = 0.7;
    let scrollProgress = 0;
    const meshes = [];
    const pointer = new THREE.Vector2(0, 0);
    const targetLightPos = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const clock = new THREE.Clock();

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);

    // Boosted theatrical lighting for Doctor Doom
    const ambient = new THREE.AmbientLight(0x8fa396, 1.8);
    const rim = new THREE.DirectionalLight(0x3fe08e, 2.8);
    rim.position.set(-3.5, 3.5, -4);
    const key = new THREE.DirectionalLight(0xffdfba, 1.8);
    key.position.set(-2.6, 4, 5);
    const torch = new THREE.PointLight(0x3fe08e, 2.2, 7.5, 2);
    scene.add(ambient, rim, key, torch);

    const targetRimColor = new THREE.Color(0x3fe08e);
    const currentRimColor = new THREE.Color(0x3fe08e);

    function makeEnvironment() {
      const envScene = new THREE.Scene();
      envScene.add(new THREE.Mesh(
        new THREE.SphereGeometry(20, 24, 12),
        new THREE.MeshBasicMaterial({ color: 0x010302, side: THREE.BackSide }),
      ));

      const panel = (width, height, position, color, strength) => {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color).multiplyScalar(strength),
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
        mesh.position.set(...position);
        mesh.lookAt(0, 0, 0);
        envScene.add(mesh);
      };

      panel(12, 6, [0, 9, 12], 0xffdfb0, 6.0);
      panel(8, 10, [-12, 2, -6], 0x3fe08e, 4.5);
      panel(10, 8, [11, 1, 4], 0x58c0ff, 3.0);

      const pmrem = new THREE.PMREMGenerator(renderer);
      environmentTarget = pmrem.fromScene(envScene, 0.04);
      pmrem.dispose();
      envScene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((m) => m?.dispose());
        else object.material?.dispose();
      });
      return environmentTarget.texture;
    }

    function resize() {
      if (disposed || !renderer) return;
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      const widthFill = camera.aspect < 0.8 ? 0.95 : 0.80;
      const visibleHeight = Math.max(maskHeight / 0.67, (maskWidth / widthFill) / camera.aspect);
      camera.position.set(0, 0, visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }

    function initializeRenderer() {
      if (renderer || disposed) return Boolean(renderer);
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;
        scene.environment = makeEnvironment();
        resize();
        return true;
      } catch {
        renderer = undefined;
        return false;
      }
    }

    function updateScrollProgress() {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
      if (!running && inView && !document.hidden) startLoop();
    }

    function startLoop() {
      if (disposed || running || !inView || document.hidden || !renderer || !meshes.length) return;
      running = true;
      clock.start();
      frame = requestAnimationFrame(draw);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function draw() {
      if (disposed || !running || !inView || document.hidden || !renderer) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
      const dt = Math.min(clock.getDelta(), 0.06);
      const seconds = clock.elapsedTime;

      if (meshes.length && pivot) {
        const width = Math.max(1, window.innerWidth);
        const mobile = width < 768;
        const visibleHeight = Math.max(maskHeight / 0.67, (maskWidth / (camera.aspect < 0.8 ? 1.05 : 0.84)) / camera.aspect);

        // Section-mapped choreographies across normalized progress (0.0 to 1.0)
        const p = scrollProgress;
        const sideX = mobile ? 0 : visibleHeight * camera.aspect * 0.32;

        let targetX = sideX;
        let targetY = mobile ? 0.32 : -0.04;
        let targetZ = mobile ? -0.3 : 0.1;
        let targetRotX = 0;
        let targetRotY = mobile ? 0 : -0.22;
        let targetRotZ = 0;
        let targetScale = mobile ? 0.72 : 0.96;

        if (p < 0.16) {
          // Hero Section: Imposing, clear heroic framing
          targetX = sideX;
          targetY = mobile ? 0.32 : -0.02;
          targetRotY = mobile ? 0 : -0.24;
          targetScale = mobile ? 0.72 : 0.98;
          targetRimColor.setHex(0x3fe08e); // Emerald
        } else if (p < 0.36) {
          // About Section: Glides to Left flank, gazing across mission dossier
          const t = (p - 0.16) / 0.20;
          targetX = THREE.MathUtils.lerp(sideX, mobile ? 0 : -sideX * 0.85, t);
          targetY = THREE.MathUtils.lerp(mobile ? 0.32 : -0.02, 0.10, t);
          targetRotY = THREE.MathUtils.lerp(mobile ? 0 : -0.24, 0.38, t);
          targetRotX = THREE.MathUtils.lerp(0, -0.05, t);
          targetScale = mobile ? 0.65 : 0.88;
          targetRimColor.setHex(0x5ec5ff); // Cosmic Cyan
        } else if (p < 0.56) {
          // Tracks Section: Elevated over the Incursion Chambers
          const t = (p - 0.36) / 0.20;
          targetX = THREE.MathUtils.lerp(mobile ? 0 : -sideX * 0.85, mobile ? 0 : sideX * 0.75, t);
          targetY = THREE.MathUtils.lerp(0.10, 0.20, t);
          targetRotY = THREE.MathUtils.lerp(0.38, -0.30, t);
          targetRotX = THREE.MathUtils.lerp(-0.05, 0.08, t);
          targetScale = mobile ? 0.60 : 0.82;
          targetRimColor.setHex(0x3fe08e); // Emerald Surge
        } else if (p < 0.74) {
          // Schedule Section: Deep atmospheric perspective
          const t = (p - 0.56) / 0.18;
          targetX = THREE.MathUtils.lerp(mobile ? 0 : sideX * 0.75, 0, t);
          targetY = THREE.MathUtils.lerp(0.20, -0.10, t);
          targetZ = THREE.MathUtils.lerp(0.1, -1.4, t);
          targetRotY = THREE.MathUtils.lerp(-0.30, 0, t);
          targetRotX = 0;
          targetScale = mobile ? 0.55 : 0.75;
          targetRimColor.setHex(0xa855f7); // Reality Purple
        } else if (p < 0.88) {
          // Prizes Section: Vibranium Gold specular shine
          const t = (p - 0.74) / 0.14;
          targetX = THREE.MathUtils.lerp(0, mobile ? 0 : sideX * 0.70, t);
          targetY = THREE.MathUtils.lerp(-0.10, -0.12, t);
          targetZ = THREE.MathUtils.lerp(-1.4, 0.05, t);
          targetRotX = THREE.MathUtils.lerp(0, 0.18, t);
          targetRotY = THREE.MathUtils.lerp(0, -0.22, t);
          targetScale = mobile ? 0.65 : 0.90;
          targetRimColor.setHex(0xffd700); // Pure Gold
        } else {
          // Judging & FAQ: Looms in background
          const t = Math.min(1, (p - 0.88) / 0.12);
          targetX = THREE.MathUtils.lerp(mobile ? 0 : sideX * 0.70, 0, t);
          targetY = THREE.MathUtils.lerp(-0.12, -0.20, t);
          targetZ = THREE.MathUtils.lerp(0.05, -2.2, t);
          targetRotX = 0;
          targetRotY = 0;
          targetScale = mobile ? 0.50 : 0.68;
          targetRimColor.setHex(0x3fe08e);
        }

        const lerpFactor = reducedMotion ? 1 : 1 - Math.exp(-dt * 8.5);
        pivot.position.x += (targetX - pivot.position.x) * lerpFactor;
        pivot.position.y += (targetY - pivot.position.y) * lerpFactor;
        pivot.position.z += (targetZ - pivot.position.z) * lerpFactor;
        pivot.scale.setScalar(THREE.MathUtils.lerp(pivot.scale.x, targetScale, lerpFactor));

        // Idle organic breathing / floating
        const idleRotZ = reducedMotion ? 0 : Math.sin(seconds * 1.3) * 0.02;
        const idleFloatY = reducedMotion ? 0 : Math.sin(seconds * 1.5) * 0.04;

        pivot.rotation.x += (targetRotX - pointer.y * 0.08 - pivot.rotation.x) * lerpFactor;
        pivot.rotation.y += (targetRotY + pointer.x * 0.18 - pivot.rotation.y) * lerpFactor;
        pivot.rotation.z += (targetRotZ + idleRotZ - pivot.rotation.z) * lerpFactor;
        pivot.position.y += idleFloatY * dt * 2.0;

        // Smooth color transition for rim light
        currentRimColor.lerp(targetRimColor, 1 - Math.exp(-dt * 4.0));
        rim.color.copy(currentRimColor);

        // Torch light tracking cursor with lively flicker
        targetLightPos.set(pivot.position.x + pointer.x * 1.1, pivot.position.y - pointer.y * 0.7 + 0.25, frontZ + 0.45);
        torch.position.lerp(targetLightPos, 1 - Math.exp(-dt * 8.0));
        const flicker = reducedMotion ? 1 : 1 + 0.04 * Math.sin(seconds * 14) + 0.025 * Math.sin(seconds * 24);
        torch.intensity = 2.2 * flicker;
      }

      renderer.render(scene, camera);
    }

    function pointerMove(event) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      pointer.set(
        (event.clientX / width) * 2 - 1,
        -(event.clientY / height) * 2 + 1,
      );
      if (!running && inView && !document.hidden) startLoop();
    }

    function visibilityChange() {
      if (document.hidden) stopLoop();
      else startLoop();
    }

    function loadMask() {
      if (disposed || !renderer) return;
      const loader = new GLTFLoader();
      loader.load('/media/doctor_dooms_mask.glb', (gltf) => {
        if (disposed) {
          gltf.scene.traverse((obj) => {
            obj.geometry?.dispose();
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.filter(Boolean).forEach((m) => m.dispose());
          });
          return;
        }

        pivot = new THREE.Group();
        scene.add(pivot);
        const model = gltf.scene;
        pivot.add(model);
        model.updateMatrixWorld(true);

        const faceBounds = new THREE.Box3();
        model.traverse((object) => {
          if (!object.isMesh) return;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          if (materials.some((m) => m?.name === 'M_DoomMask_2')) faceBounds.expandByObject(object);
        });
        if (faceBounds.isEmpty()) faceBounds.setFromObject(model);
        const size = faceBounds.getSize(new THREE.Vector3());
        const center = faceBounds.getCenter(new THREE.Vector3());
        const scale = maskHeight / Math.max(size.y, 0.001);
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);
        maskWidth = size.x * scale;
        frontZ = (faceBounds.max.z - center.z) * scale;
        plane.constant = -frontZ;

        model.traverse((object) => {
          if (!object.isMesh) return;
          object.castShadow = false;
          object.receiveShadow = false;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((mat) => {
            if (mat) {
              mat.envMapIntensity = 1.6;
              mat.roughness = Math.min(mat.roughness || 0.4, 0.45);
              mat.metalness = Math.max(mat.metalness || 0.8, 0.85);
              mat.needsUpdate = true;
            }
          });
          meshes.push(object);
        });

        resize();
        updateScrollProgress();
        setReady(true);
        startLoop();
      });
    }

    if (initializeRenderer()) {
      loadMask();
    }

    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('pointermove', pointerMove, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);

    return () => {
      disposed = true;
      stopLoop();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('pointermove', pointerMove);
      document.removeEventListener('visibilitychange', visibilityChange);

      scene.traverse((object) => {
        object.geometry?.dispose();
        const mats = Array.isArray(object.material) ? object.material : [object.material];
        mats.filter(Boolean).forEach((m) => {
          Object.values(m).forEach((v) => v?.isTexture && v.dispose());
          m.dispose();
        });
      });
      environmentTarget?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className={`universe-mask-stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="universe-mask-canvas" />
    </div>
  );
}
