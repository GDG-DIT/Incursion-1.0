"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef, useLayoutEffect, type MutableRefObject } from "react";
import * as THREE from "three";
import type { Room } from "./Hall";
export type Progress = MutableRefObject<number>;
const finalProgress = 1.35;
const stops = [0, 0.1, 0.23, 0.34, 0.46, 0.62, 0.76, 0.86, 1, 1.1, 1.23, finalProgress];
const positions = [
  [0, 4.4, 16],
  [0, 4, 10],
  [0, 4, 4],
  [0, 4, -25],
  [0, 6, -116],
  [1, 7, -160],
  [-2, 11, -208],
  [0, 14, -320],
  [0, 17, -379],
  [0, 20, -410],
  [0, 14, -455],
  [0, 10, -500],
];
const targets = [
  [0, 4.1, -9],
  [0, 4, 0],
  [0, 4, -20],
  [0, 4, -80],
  [0, 8, -165],
  [0, 10, -210],
  [0, 18, -270],
  [0, 20, -410],
  [0, 22, -430],
  [0, 20, -520],
  [0, 16, -620],
  [0, 16, -760],
];
const ease = (t: number) => t * t * (3 - 2 * t);
export function JourneyCamera({
  progress,
  reduced,
  room,
  onReady,
}: {
  progress: Progress;
  reduced: boolean;
  room: Room;
  onReady: () => void;
}) {
  const { camera, pointer } = useThree();
  const value = useRef(0),
    frames = useRef(0),
    look = useRef(new THREE.Vector3(0, 4, -9)),
    desired = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    if (frames.current++ === 3) onReady();
    value.current = THREE.MathUtils.damp(
      value.current,
      progress.current,
      reduced ? 1000 : 5,
      Math.min(dt, 0.1),
    );
    let p = value.current;
    if (reduced) p = p < 0.4 ? 0 : p < 0.8 ? 0.62 : finalProgress;
    let i = 0;
    while (i < stops.length - 2 && p > stops[i + 1]) i++;
    const f = ease(
      THREE.MathUtils.clamp((p - stops[i]) / (stops[i + 1] - stops[i]), 0, 1),
    );
    const a = positions[i],
      b = positions[i + 1],
      c = targets[i],
      d = targets[i + 1];
    let x = THREE.MathUtils.lerp(a[0], b[0], f),
      y = THREE.MathUtils.lerp(a[1], b[1], f),
      z = THREE.MathUtils.lerp(a[2], b[2], f);
    if (p < 0.04) {
      if (room === "mission") x = -6;
      if (room === "tracks") x = 6;
      if (room === "timeline") {
        y = 4.7;
        z = 1;
      }
    }
    const damping = reduced ? 1 : 1 - Math.exp(-4 * Math.min(dt, 0.1));
    camera.position.lerp(
      desired.current.set(
        x + (reduced ? 0 : pointer.x * 0.12),
        y + (reduced ? 0 : pointer.y * 0.07),
        z,
      ),
      damping,
    );
    look.current.set(
      THREE.MathUtils.lerp(c[0], d[0], f),
      THREE.MathUtils.lerp(c[1], d[1], f),
      THREE.MathUtils.lerp(c[2], d[2], f),
    );
    camera.lookAt(look.current);
  });
  return null;
}
export function Visibility({
  progress,
  min,
  max,
  children,
  reduced = false,
}: {
  progress: Progress;
  min: number;
  max: number;
  children: React.ReactNode;
  reduced?: boolean;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    const p = reduced
      ? progress.current < 0.4
        ? 0
        : progress.current < 0.8
          ? 0.62
          : finalProgress
      : progress.current;
    if (g.current) g.current.visible = p >= min && p <= max;
  });
  return <group ref={g}>{children}</group>;
}
function Facade({
  h,
  w,
  seed,
  inverted,
}: {
  h: number;
  w: number;
  seed: number;
  inverted: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const floors = Math.floor(h / 2);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    let index = 0;
    for (let i = 0; i < floors; i++)
      for (let j = -1; j <= 1; j++) {
        matrix.makeTranslation(j * w * 0.28, i * 2 + 1.2, w * 0.41);
        mesh.current.setMatrixAt(index, matrix);
        color.set(
          (i + j + seed) % 4 === 0
            ? inverted
              ? "#bba2ff"
              : "#e6a26c"
            : "#121c25",
        );
        mesh.current.setColorAt(index++, color);
      }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor)
      mesh.current.instanceColor.needsUpdate = true;
  }, [floors, w, seed, inverted]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, floors * 3]}>
      <planeGeometry args={[w * 0.13, 0.55]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}
function Tower({
  x,
  z,
  h,
  w,
  seed,
  inverted = false,
}: {
  x: number;
  z: number;
  h: number;
  w: number;
  seed: number;
  inverted?: boolean;
}) {
  return (
    <group
      position={[x, inverted ? 48 : 0, z]}
      rotation={[inverted ? Math.PI : 0, 0, ((seed % 5) - 2) * 0.025]}
    >
      <mesh position={[0, h * 0.5, 0]}>
        <boxGeometry args={[w, h, w * 0.8]} />
        <meshStandardMaterial
          color={inverted ? "#242c48" : "#28333b"}
          roughness={0.93}
          metalness={0.2}
        />
      </mesh>
      <Facade h={h} w={w} seed={seed} inverted={inverted} />
      <mesh position={[w * 0.18, h + 0.6, 0]} rotation={[0, 0.25, 0.25]}>
        <boxGeometry args={[w * 0.55, 1.8, w * 0.65]} />
        <meshStandardMaterial color="#30383e" />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[(i - 1) * w * 0.3, h + 1.5 + Math.sin(seed + i), 0]}
        >
          <boxGeometry args={[0.08, 3, 0.08]} />
          <meshStandardMaterial color="#7a807b" />
        </mesh>
      ))}
    </group>
  );
}
function Ruins({ inverted = false }: { inverted?: boolean }) {
  const data = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        return {
          x: side * (10 + (i % 3) * 7),
          z: -125 - Math.floor(i / 2) * 7,
          h: 8 + ((i * 17) % 23),
          w: 4 + (i % 4),
          seed: i,
        };
      }),
    [],
  );
  return (
    <group>
      {data.map((b, i) => (
        <Tower key={i} {...b} inverted={inverted} />
      ))}
    </group>
  );
}
function AftermathCity({
  debrisRef,
}: {
  debrisRef: React.Ref<THREE.Group>;
}) {
  const floatingTowers = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const row = Math.floor(i / 2);
        return {
          x: side * (26 + row * 12),
          z: -520 - row * 24,
          h: 16 + ((i * 13) % 24),
          w: 5 + (i % 3) * 2,
          seed: i + 80,
        };
      }),
    [],
  );
  const fragments = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        position: [
          Math.sin(i * 7.7) * (24 + (i % 4) * 9),
          7 + ((i * 13) % 48),
          -650 - ((i * 29) % 390),
        ] as [number, number, number],
        rotation: [i * 0.71, i * 0.43, i * 0.29] as [number, number, number],
        size: 1.2 + (i % 4) * 0.55,
      })),
    [],
  );
  return (
    <group>
      <group position={[0, 0, -400]}>
        <Ruins />
        {floatingTowers.map((tower) => (
          <Tower key={tower.seed} {...tower} inverted />
        ))}
      </group>
      <group ref={debrisRef}>
        {fragments.map((fragment, i) => (
          <mesh
            key={i}
            position={fragment.position}
            rotation={fragment.rotation}
          >
            <dodecahedronGeometry args={[fragment.size, 0]} />
            <meshStandardMaterial
              color={i % 4 === 0 ? "#73685c" : "#3e4845"}
              roughness={0.94}
              metalness={0.12}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
export function OtherWorlds({
  progress,
  reduced,
  mobile,
}: {
  progress: Progress;
  reduced: boolean;
  mobile: boolean;
}) {
  const portal = useRef<THREE.Group>(null),
    collision = useRef<THREE.Group>(null),
    debris = useRef<THREE.Group>(null),
    collisionLight = useRef<THREE.PointLight>(null),
    rupture = useRef<THREE.Group>(null),
    ruptureLight = useRef<THREE.PointLight>(null),
    finalWorld = useRef<THREE.Group>(null),
    horizonPlanet = useRef<THREE.Group>(null),
    finalDebris = useRef<THREE.Group>(null),
    finalKeyLight = useRef<THREE.DirectionalLight>(null),
    finalFillLight = useRef<THREE.PointLight>(null),
    collisionMaterials = useRef<
      Array<{
        material: THREE.Material;
        opacity: number;
        transparent: boolean;
        depthWrite: boolean;
      }>
    >([]);
  const finalMaterials = useRef<typeof collisionMaterials.current>([]),
    debrisPositions = useRef<THREE.Vector3[]>([]),
    debrisRotations = useRef<THREE.Euler[]>([]),
    finalFragmentPositions = useRef<THREE.Vector3[]>([]),
    finalFragmentRotations = useRef<THREE.Euler[]>([]);
  const { scene } = useThree();
  const green = useMemo(() => new THREE.Color("#091a14"), []),
    blue = useMemo(() => new THREE.Color("#101722"), []),
    purple = useMemo(() => new THREE.Color("#160f28"), []),
    impactSky = useMemo(() => new THREE.Color("#2a2028"), []),
    aftermathSky = useMemo(() => new THREE.Color("#111816"), []),
    skyColor = useMemo(() => new THREE.Color(), []);
  useLayoutEffect(() => {
    const capture = (roots: Array<THREE.Group | null>) => {
      const materials: typeof collisionMaterials.current = [];
      roots.forEach((root) => {
        root?.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const meshMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          meshMaterials.forEach((material) => {
            materials.push({
              material,
              opacity: material.opacity,
              transparent: material.transparent,
              depthWrite: material.depthWrite,
            });
            material.transparent = true;
            material.depthWrite = false;
            material.needsUpdate = true;
          });
        });
      });
      return materials;
    };
    const collisionSet = capture([collision.current, debris.current]);
    const finalSet = capture([finalWorld.current]);
    collisionMaterials.current = collisionSet;
    finalMaterials.current = finalSet;
    debrisPositions.current =
      debris.current?.children.map((object) => object.position.clone()) ?? [];
    debrisRotations.current =
      debris.current?.children.map((object) => object.rotation.clone()) ?? [];
    finalFragmentPositions.current =
      finalDebris.current?.children.map((object) => object.position.clone()) ?? [];
    finalFragmentRotations.current =
      finalDebris.current?.children.map((object) => object.rotation.clone()) ?? [];
    return () => {
      [...collisionSet, ...finalSet].forEach(
        ({ material, opacity, transparent, depthWrite }) => {
          material.opacity = opacity;
          material.transparent = transparent;
          material.depthWrite = depthWrite;
          material.needsUpdate = true;
        },
      );
      collisionMaterials.current = [];
      finalMaterials.current = [];
      debrisPositions.current = [];
      debrisRotations.current = [];
      finalFragmentPositions.current = [];
      finalFragmentRotations.current = [];
    };
  }, []);
  useFrame(({ clock }, dt) => {
    const p = reduced
      ? progress.current < 0.4
        ? 0
        : progress.current < 0.8
          ? 0.62
          : finalProgress
      : progress.current;
    const impact = THREE.MathUtils.smoothstep(p, 0.94, 1.12);
    const ruptureFade = 1 - THREE.MathUtils.smoothstep(p, 1.14, 1.27);
    const departure = THREE.MathUtils.smoothstep(p, 1.02, 1.17);
    const arrival = THREE.MathUtils.smoothstep(p, 0.96, 1.17);
    const collisionOpacity = 1 - departure;
    collisionMaterials.current.forEach(({ material, opacity }) => {
      material.opacity = opacity * collisionOpacity;
    });
    finalMaterials.current.forEach(({ material, opacity }) => {
      material.opacity = opacity * arrival;
    });
    const phase = THREE.MathUtils.smoothstep(p, 0.82, 1.12);
    skyColor.copy(purple).lerp(impactSky, phase).lerp(aftermathSky, arrival);
    if (p < 0.4)
      skyColor.copy(green).lerp(blue, THREE.MathUtils.smoothstep(p, 0, 0.4));
    else if (p < 0.8)
      skyColor.copy(blue).lerp(purple, THREE.MathUtils.smoothstep(p, 0.4, 0.8));
    (scene.background as THREE.Color)?.copy(skyColor);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(skyColor);
      scene.fog.near = THREE.MathUtils.lerp(35, 22, arrival);
      scene.fog.far = THREE.MathUtils.lerp(p < 0.4 ? 80 : 160, 245, arrival);
    }
    if (portal.current) {
      portal.current.scale.setScalar(
        0.01 + THREE.MathUtils.smoothstep(p, 0, 0.16),
      );
      if (!reduced) portal.current.rotation.z += Math.min(dt, 0.05) * 0.18;
    }
    if (collision.current) {
      const converge = THREE.MathUtils.smoothstep(p, 0.8, 1);
      collision.current.children.slice(0, 2).forEach((world, i) => {
        world.position.x =
          (i === 0 ? -1 : 1) * THREE.MathUtils.lerp(31, 18, converge);
      });
      collision.current.position.y = THREE.MathUtils.lerp(
        12,
        0,
        THREE.MathUtils.smoothstep(p, 0.8, 1),
      ) + impact * 22;
      if (collisionLight.current)
        collisionLight.current.intensity = 700 * collisionOpacity;
      if (!reduced)
        collision.current.rotation.z =
          Math.sin(clock.elapsedTime * 0.12) * 0.035 * collisionOpacity;
    }
    if (debris.current) {
      const blast = THREE.MathUtils.smoothstep(p, 0.97, 1.14);
      debris.current.children.forEach((rock, i) => {
        const origin = debrisPositions.current[i];
        const rotation = debrisRotations.current[i];
        if (!origin || !rotation) return;
        rock.position.copy(origin).multiplyScalar(1 + blast * 2.2);
        rock.rotation.set(
          rotation.x + blast * (i % 3) * 0.55,
          rotation.y + blast * (i % 4) * 0.4,
          rotation.z + blast * (i % 5) * 0.35,
        );
      });
      debris.current.position.y = Math.sin(clock.elapsedTime * 0.32) * 0.35;
      if (!reduced) debris.current.rotation.y = Math.sin(clock.elapsedTime * 0.16) * 0.04;
    }
    if (rupture.current) {
      const expansion = THREE.MathUtils.smoothstep(p, 0.94, 1.12);
      rupture.current.visible = expansion > 0.001 && ruptureFade > 0.001;
      rupture.current.scale.setScalar(0.06 + expansion * 7.2);
      rupture.current.position.z = -464 + expansion * 22;
      if (!reduced)
        rupture.current.rotation.z = Math.sin(clock.elapsedTime * 0.7) * 0.025;
      rupture.current.children.forEach((ring, i) => {
        if (!(ring instanceof THREE.Mesh)) return;
        const material = ring.material as THREE.MeshBasicMaterial;
        material.opacity = (0.22 + (i % 2) * 0.14) * expansion * ruptureFade;
      });
      if (ruptureLight.current)
        ruptureLight.current.intensity = 360 * expansion * ruptureFade;
    }
    if (horizonPlanet.current && !reduced)
      horizonPlanet.current.rotation.y = Math.sin(clock.elapsedTime * 0.035) * 0.04;
    if (finalDebris.current && !reduced) {
      finalDebris.current.children.forEach((fragment, i) => {
        const origin = finalFragmentPositions.current[i];
        const rotation = finalFragmentRotations.current[i];
        if (!origin || !rotation) return;
        const drift = clock.elapsedTime * 0.12 + i * 1.7;
        fragment.position.set(
          origin.x + Math.sin(drift) * 0.75,
          origin.y + Math.sin(drift * 0.73) * 0.55,
          origin.z + Math.cos(drift * 0.61) * 0.45,
        );
        fragment.rotation.set(
          rotation.x + Math.sin(drift * 0.6) * 0.06,
          rotation.y + Math.cos(drift * 0.8) * 0.08,
          rotation.z + Math.sin(drift * 0.7) * 0.04,
        );
      });
    }
    if (finalWorld.current) {
      finalWorld.current.visible = arrival > 0.001;
    }
    if (finalKeyLight.current) finalKeyLight.current.intensity = 2.2 * arrival;
    if (finalFillLight.current) finalFillLight.current.intensity = 210 * arrival;
  });
  return (
    <>
      <Visibility reduced={reduced} progress={progress} min={0.005} max={0.46}>
        <group position={[0, 4, 2]} ref={portal}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, 0, i * 0.3]}>
              <torusGeometry
                args={[2.7 + i * 0.19, 0.035 + i * 0.012, 8, 80]}
              />
              <meshBasicMaterial
                color={i === 1 ? "#e5ffc7" : "#5effab"}
                toneMapped={false}
              />
            </mesh>
          ))}
          <mesh>
            <circleGeometry args={[2.65, 64]} />
            <meshBasicMaterial
              color="#041514"
              transparent
              opacity={0.92}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight color="#69ffc2" intensity={50} distance={16} />
        </group>
        {Array.from({ length: 28 }, (_, i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 0.6) * 0.5, 4, -i * 4]}
            rotation={[0, 0, i * 0.19]}
          >
            <torusGeometry args={[2.9 + i * 0.045, 0.025, 6, 48]} />
            <meshBasicMaterial
              color={i % 3 ? "#39997e" : "#b7e8e4"}
              transparent
              opacity={0.65}
              toneMapped={false}
            />
          </mesh>
        ))}
        {!reduced && (
          <Sparkles
            count={mobile ? 80 : 220}
            scale={[5, 5, 85]}
            position={[0, 4, -40]}
            speed={2}
            size={3}
            color="#98ffdf"
          />
        )}
      </Visibility>
      <Visibility reduced={reduced} progress={progress} min={0.34} max={0.98}>
        <Ruins />
        <Ruins inverted />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -180]}>
          <planeGeometry args={[150, 190]} />
          <meshStandardMaterial
            color="#19232b"
            roughness={0.65}
            metalness={0.3}
          />
        </mesh>
        {Array.from({ length: 22 }, (_, i) => (
          <mesh
            key={i}
            position={[0, 0.02, -120 - i * 6]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.18, 2.5]} />
            <meshBasicMaterial color="#807b63" />
          </mesh>
        ))}
        {Array.from({ length: 40 }, (_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin(i * 13) * 9,
              0.3 + (i % 3) * 0.25,
              -120 - i * 2.7,
            ]}
            rotation={[i * 0.7, i * 0.4, i * 0.5]}
          >
            <boxGeometry args={[0.7 + (i % 3), 0.6, 1.2]} />
            <meshStandardMaterial color="#475056" roughness={1} />
          </mesh>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} position={[(i % 2 ? 1 : -1) * 7, 1, -140 - i * 22]}>
            <pointLight color="#f2793f" intensity={45} distance={15} />
            <mesh rotation={[-Math.PI / 2, 0, 0.3]}>
              <planeGeometry args={[3, 0.18]} />
              <meshBasicMaterial color="#ff9e62" toneMapped={false} />
            </mesh>
          </group>
        ))}
        <directionalLight
          position={[10, 35, -160]}
          color="#97c9ea"
          intensity={2}
        />
        {!reduced && (
          <Sparkles
            count={mobile ? 90 : 250}
            scale={[55, 35, 130]}
            position={[0, 15, -175]}
            size={2}
            speed={0.3}
            color="#c2c6d7"
          />
        )}
      </Visibility>
      <Visibility reduced={reduced} progress={progress} min={0.75} max={1.18}>
        <Stars
          radius={110}
          depth={70}
          count={mobile ? 700 : 1800}
          factor={4}
          saturation={0.2}
          fade
          speed={reduced ? 0 : 0.2}
        />
        <group position={[0, 20, -435]}>
          <group ref={collision}>
            {[-1, 1].map((side) => (
              <group
                key={side}
                position={[side * 18, side * 5, 0]}
                rotation={[0, 0, side * 0.35]}
              >
                <mesh>
                  <sphereGeometry args={[23, 48, 32]} />
                  <meshStandardMaterial
                    color={side < 0 ? "#194b51" : "#553854"}
                    emissive={side < 0 ? "#10403a" : "#402243"}
                    emissiveIntensity={0.45}
                    roughness={0.7}
                    wireframe={false}
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[23.15, 28, 18]} />
                  <meshBasicMaterial
                    color={side < 0 ? "#63d5c2" : "#c69ae9"}
                    wireframe
                    transparent
                    opacity={0.16}
                  />
                </mesh>
                <mesh rotation={[0.8, side * 0.3, 0]}>
                  <torusGeometry args={[25, 0.09, 8, 100]} />
                  <meshBasicMaterial
                    color={side < 0 ? "#82ffca" : "#d7b1ff"}
                    toneMapped={false}
                  />
                </mesh>
              </group>
            ))}
            <mesh rotation={[0, 0, -0.17]}>
              <planeGeometry args={[0.35, 70]} />
              <meshBasicMaterial
                color="#f3e1ff"
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </mesh>
            <pointLight
              ref={collisionLight}
              color="#c6a5ff"
              intensity={700}
              distance={110}
            />
          </group>
          <group ref={debris}>
            {Array.from({ length: 55 }, (_, i) => (
              <mesh
                key={i}
                position={[
                  Math.sin(i * 9) * 40,
                  Math.cos(i * 7) * 28,
                  Math.sin(i * 3) * 18 + 25,
                ]}
                rotation={[i, 0.5 * i, 0.3 * i]}
              >
                <boxGeometry args={[0.3 + (i % 4), 0.4 + (i % 3), 0.5]} />
                <meshStandardMaterial
                  color="#7e858a"
                  metalness={0.6}
                  roughness={0.7}
                />
              </mesh>
            ))}
          </group>
        </group>
      </Visibility>
      <group ref={rupture} position={[0, 20, -464]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0.15 + i * 0.12, i * 0.18, i * 0.08]}>
            <torusGeometry args={[5 + i * 2.6, 0.045 + i * 0.012, 8, 128]} />
            <meshBasicMaterial
              color={i === 0 ? "#f1d6ad" : i === 1 ? "#d3a9c9" : "#a9d6d0"}
              toneMapped={false}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
        <pointLight
          ref={ruptureLight}
          color="#e6c9df"
          intensity={0}
          distance={180}
        />
      </group>
      <group ref={finalWorld}>
        <directionalLight
          ref={finalKeyLight}
          position={[-32, 58, -720]}
          color="#ddc6a0"
          intensity={0}
        />
        <pointLight
          ref={finalFillLight}
          position={[0, 38, -890]}
          color="#a890b4"
          intensity={0}
          distance={260}
        />
        <group ref={horizonPlanet} position={[0, 82, -1060]}>
          <mesh>
            <sphereGeometry args={[78, 48, 32]} />
            <meshStandardMaterial
              color="#493c48"
              emissive="#302137"
              emissiveIntensity={0.42}
              roughness={0.88}
              metalness={0.08}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[78.25, 32, 24]} />
            <meshBasicMaterial
              color="#d1a7cb"
              wireframe
              transparent
              opacity={0.11}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[1.16, 0.08, -0.12]}>
            <torusGeometry args={[92, 0.16, 8, 128]} />
            <meshBasicMaterial
              color="#cfb1a0"
              toneMapped={false}
              transparent
              opacity={0.58}
              depthWrite={false}
            />
          </mesh>
        </group>
        <AftermathCity debrisRef={finalDebris} />
      </group>
      <Visibility
        reduced={reduced}
        progress={progress}
        min={0.75}
        max={finalProgress}
      >
        <Stars
          radius={160}
          depth={260}
          count={mobile ? 900 : 2200}
          factor={3.2}
          saturation={0.12}
          fade
          speed={reduced ? 0 : 0.12}
        />
      </Visibility>
    </>
  );
}
