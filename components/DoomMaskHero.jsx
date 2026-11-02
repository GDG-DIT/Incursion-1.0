'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function DoomMaskHero() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelAvailable, setModelAvailable] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const interactionStarted = useRef(false);
  const [hint, setHint] = useState('Loading the mask…');

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposed = false;
    let frame = 0;
    let running = false;
    let inView = true;
    let reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isTouch = matchMedia('(pointer: coarse)').matches;
    let renderer;
    let environmentTarget;
    let resizeObserver;
    let intersectionObserver;
    let pivot;
    let maskWidth = 1.7;
    let maskHeight = 2.4;
    let frontZ = 0.7;
    let touchActive = false;
    const meshes = [];
    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const nextLightPosition = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
    const ambient = new THREE.AmbientLight(0x86795f, 1.45);
    const rim = new THREE.DirectionalLight(0x7890d0, 1.25);
    rim.position.set(-3, 3, -4);
    const key = new THREE.DirectionalLight(0xffd29c, 1.1);
    key.position.set(-2.6, 4, 5);
    const torch = new THREE.PointLight(0xffa458, 1.15, 5.4, 2);
    scene.add(ambient, rim, key, torch);

    function makeEnvironment() {
      const envScene = new THREE.Scene();
      envScene.add(new THREE.Mesh(
        new THREE.SphereGeometry(20, 24, 12),
        new THREE.MeshBasicMaterial({ color: 0x020202, side: THREE.BackSide }),
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
      panel(10, 5, [0, 9, 12], 0xffc890, 5.5);
      panel(6, 8, [-12, 2, -6], 0x6f8cff, 2.6);
      panel(8, 6, [11, 1, 4], 0x73d3a3, 1.5);

      const pmrem = new THREE.PMREMGenerator(renderer);
      environmentTarget = pmrem.fromScene(envScene, 0.04);
      pmrem.dispose();
      envScene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      return environmentTarget.texture;
    }

    function resize() {
      if (disposed || !renderer) return;
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const widthFill = camera.aspect < 0.8 ? 1.05 : 0.84;
      const visibleHeight = Math.max(maskHeight / 0.67, (maskWidth / widthFill) / camera.aspect);
      camera.position.set(0, 0, visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      if (pivot) {
        const mobile = width < 760;
        pivot.position.x = mobile ? visibleHeight * camera.aspect * 0.06 : visibleHeight * camera.aspect * 0.17;
        pivot.position.y = mobile ? visibleHeight * 0.02 : 0;
      }
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

      if (meshes.length) {
        scene.updateMatrixWorld(true);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(meshes, false);
        let onMask = false;
        if (hits.length) {
          const hit = hits[0];
          normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld);
          if (normal.dot(raycaster.ray.direction) > 0) normal.negate();
          nextLightPosition.copy(hit.point).addScaledVector(normal, 0.34);
          nextLightPosition.y += 0.08;
          onMask = true;
        } else if (!raycaster.ray.intersectPlane(plane, nextLightPosition)) {
          nextLightPosition.set(pivot.position.x, 0.2, frontZ + 0.34);
        } else {
          nextLightPosition.z = frontZ + 0.34;
        }
        torch.position.lerp(nextLightPosition, 1 - Math.exp(-dt * 8));
        const glow = touchActive || !isTouch ? (onMask ? 1 : 0.65) : 0.35;
        const flicker = reducedMotion ? 1 : 1 + 0.05 * Math.sin(seconds * 11) + 0.025 * Math.sin(seconds * 25);
        torch.intensity = (0.85 + glow * 2.4) * flicker;
        if (pivot && !reducedMotion) {
          const factor = 1 - Math.exp(-dt * 2.8);
          pivot.rotation.y += (pointer.x * 0.12 - pivot.rotation.y) * factor;
          pivot.rotation.x += (-pointer.y * 0.06 - pivot.rotation.x) * factor;
        }
      }

      renderer.render(scene, camera);
    }

    function pointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      if (event.pointerType === 'touch') touchActive = true;
      if (!interactionStarted.current) {
        interactionStarted.current = true;
        setHint('');
      }
      startLoop();
    }

    function pointerUp(event) {
      if (event.pointerType === 'touch') touchActive = false;
    }

    function pointerLeave() {
      touchActive = false;
      pointer.set(0, 0);
    }

    function visibilityChange() {
      if (document.hidden) stopLoop();
      else startLoop();
    }

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      scene.environment = makeEnvironment();
      resize();
    } catch {
      environmentTarget?.dispose();
      renderer?.dispose();
      setModelAvailable(false);
      setHint('Static preview of Doctor Doom’s mask');
      return undefined;
    }

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
    } else {
      window.addEventListener('resize', resize);
    }
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startLoop();
        else stopLoop();
      }, { threshold: 0.02 });
      intersectionObserver.observe(host);
    }
    document.addEventListener('visibilitychange', visibilityChange);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);
    canvas.addEventListener('pointerleave', pointerLeave);

    const loader = new GLTFLoader();
    loader.load('/media/doctor_dooms_mask.glb', (gltf) => {
      if (disposed) {
        gltf.scene.traverse((object) => {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.filter(Boolean).forEach((material) => {
            Object.values(material).forEach((value) => value?.isTexture && value.dispose());
            material.dispose();
          });
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
        if (materials.some((material) => material?.name === 'M_DoomMask_2')) faceBounds.expandByObject(object);
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
        materials.forEach((material) => {
          material.envMapIntensity = 0.7;
          material.needsUpdate = true;
        });
        meshes.push(object);
      });
      resize();
      setModelAvailable(true);
      setModelReady(true);
      setHint(isTouch ? 'Touch and move to reveal the mask.' : 'Move your cursor to reveal the mask.');
      startLoop();
    }, undefined, () => {
      if (disposed) return;
      setModelAvailable(false);
      setHint('Static preview of Doctor Doom’s mask');
    });

    startLoop();

    return () => {
      disposed = true;
      stopLoop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibilityChange);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      canvas.removeEventListener('pointerleave', pointerLeave);
      scene.traverse((object) => {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.filter(Boolean).forEach((material) => {
          Object.values(material).forEach((value) => value?.isTexture && value.dispose());
          material.dispose();
        });
      });
      environmentTarget?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className={`mask-stage${modelAvailable ? '' : ' is-fallback'}${modelReady ? ' is-ready' : ''}`} aria-label="Interactive Doctor Doom mask">
      <img className="mask-fallback" src="/media/doom-closeup.webp" alt="" aria-hidden="true" />
      <canvas ref={canvasRef} className="mask-canvas" aria-label="3D Doctor Doom mask. Move or touch the image to direct the light." role="img" />
      <p className="mask-hint" aria-live="polite">{hint}</p>
    </div>
  );
}
