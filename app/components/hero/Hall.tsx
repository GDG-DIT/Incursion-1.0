"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Sparkles } from "@react-three/drei";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import gsap from "gsap";
import {
  JourneyCamera,
  OtherWorlds,
  Visibility,
  type Progress,
} from "./Journey";

export type Room = "hall" | "mission" | "tracks" | "timeline" | "rift";
type V3 = [number, number, number];
type Props = {
  room: Room;
  onRoom: (r: Room) => void;
  reduced: boolean;
  mobile: boolean;
  entered: boolean;
  onReady: () => void;
  replayKey: number;
  progress: Progress;
};
function useStone() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!,
      img = ctx.createImageData(256, 256);
    let seed = 173;
    for (let i = 0; i < img.data.length; i += 4) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const n = 165 + (seed / 4294967296) * 65;
      img.data[i] = n;
      img.data[i + 1] = n;
      img.data[i + 2] = n - 7;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
function Block({
  p,
  s,
  color = "#39453a",
  stone,
  gold = false,
}: {
  p: V3;
  s: V3;
  color?: string;
  stone?: THREE.Texture;
  gold?: boolean;
}) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial
        map={stone}
        color={color}
        metalness={gold ? 0.72 : 0.18}
        roughness={gold ? 0.32 : 0.76}
      />
    </mesh>
  );
}
function Window({
  position,
  rotation = 0,
  warm = false,
}: {
  position: V3;
  rotation?: number;
  warm?: boolean;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Block p={[0, 7, -0.15]} s={[2.8, 13, 0.3]} color="#6b6242" gold />
      <mesh position={[0, 7, 0.025]}>
        <planeGeometry args={[2.5, 12.6]} />
        <shaderMaterial
          vertexShader={
            "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}"
          }
          fragmentShader={`varying vec2 vUv;void main(){float n=fract(sin(dot(floor(vUv*500.),vec2(127.1,311.7)))*43758.5453);vec3 base=mix(vec3(.13,.38,.29),vec3(1.,.89,.52),${warm ? ".72" : ".28"}+vUv.y*.28);gl_FragColor=vec4(base*(.78+n*.22),1.);}`}
          toneMapped={false}
        />
      </mesh>
      {[-0.9, 0, 0.9].map((x) => (
        <Block
          key={x}
          p={[x, 7, 0.09]}
          s={[0.075, 12.7, 0.09]}
          color="#283c2f"
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Block
          key={i}
          p={[0, 1.1 + i * 1.7, 0.12]}
          s={[2.5, 0.075, 0.12]}
          color="#293b2d"
        />
      ))}
      {[2.7, 6.1, 9.5, 12.4].map((y) => (
        <group key={y} position={[0, y, 0.2]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.45, 0.51, 4]} />
            <meshBasicMaterial color="#4f5939" side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.56, 0.6, 24]} />
            <meshBasicMaterial color="#686b41" side={THREE.DoubleSide} />
          </mesh>
          {[-1, 1].map((side) => (
            <mesh key={side} rotation={[0, 0, (side * Math.PI) / 4]}>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <meshStandardMaterial color="#716d48" metalness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
function Architecture({ stone }: { stone: THREE.Texture }) {
  return (
    <>
      <Block p={[0, 13, -15.5]} s={[30, 28, 1]} stone={stone} color="#24372d" />
      <Block p={[0, -0.35, 5]} s={[30, 0.6, 52]} stone={stone} />
      {/* Solid masonry, rear wall, entry portal and continuous barrel vault. */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Block
            p={[side * 14.5, 6, 5]}
            s={[1, 12, 42]}
            stone={stone}
            color="#26392e"
          />
          {[-10, -2, 6, 14].map((z) => (
            <Window
              key={z}
              position={[side * 13.94, 0, z]}
              rotation={(side * -Math.PI) / 2}
            />
          ))}
          {[-13, -6, 1, 8, 15, 22].map((z) => (
            <group key={z}>
              <Block
                p={[side * 12, 6, z]}
                s={[1.35, 12, 1.65]}
                stone={stone}
                color="#344136"
              />
              <Block
                p={[side * 12, 0.5, z]}
                s={[2.15, 1, 2.35]}
                stone={stone}
                color="#444b38"
              />
              {[1.1, 10.9, 11.35].map((y) => (
                <Block
                  key={y}
                  p={[side * 12, y, z]}
                  s={[1.75, 0.17, 2]}
                  color="#85744c"
                  gold
                />
              ))}
              <Block
                p={[side * 11.3, 6, z + 0.82]}
                s={[0.07, 9.5, 0.05]}
                color="#b3a36b"
                gold
              />
              <mesh
                position={[side * 9.7, 11, z]}
                rotation={[0, 0, side * -0.53]}
              >
                <boxGeometry args={[0.85, 8, 1.5]} />
                <meshStandardMaterial
                  map={stone}
                  color="#2c4033"
                  roughness={0.75}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}
      <mesh position={[0, 11, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[14.4, 14.4, 42, 40, 1, true, Math.PI / 2, Math.PI]}
        />
        <meshStandardMaterial
          map={stone}
          color="#22362c"
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>
      {[-13, -6, 1, 8, 15, 22].map((z) => (
        <mesh key={z} position={[0, 11, z]}>
          <torusGeometry args={[12.6, 0.25, 6, 40, Math.PI]} />
          <meshStandardMaterial
            color="#5d6247"
            metalness={0.3}
            roughness={0.65}
          />
        </mesh>
      ))}
      {[-10.5, -6.7, -2.9, 2.9, 6.7, 10.5].map((x) => (
        <Window key={x} position={[x, 0, -14.9]} warm={Math.abs(x) < 7} />
      ))}
      <Block
        p={[0, 9, -14.1]}
        s={[1.8, 18, 1.3]}
        color="#3a4131"
        stone={stone}
      />
      {[-0.65, 0.65].map((x) => (
        <Block
          key={x}
          p={[x, 9, -13.4]}
          s={[0.08, 17, 0.08]}
          color="#b29452"
          gold
        />
      ))}
      {[-1, 1].map((s) => (
        <Block
          key={s}
          p={[s * 10, 8, 23]}
          s={[9, 16, 1]}
          stone={stone}
          color="#293b30"
        />
      ))}
      <Block p={[0, 20, 23]} s={[30, 16, 1.5]} stone={stone} color="#25362c" />
    </>
  );
}
function EmptyThrone({ stone }: { stone: THREE.Texture }) {
  return (
    <group>
      {Array.from({ length: 9 }, (_, i) => (
        <group key={i}>
          <RoundedBox
            position={[0, 0.14 + i * 0.27, -9.8 - i * 0.24]}
            args={[14 - i * 0.75, 0.28, 8 - i * 0.58]}
            radius={0.055}
            smoothness={2}
            bevelSegments={2}
          >
            <meshStandardMaterial
              map={stone}
              color={i % 2 ? "#55543d" : "#626047"}
              metalness={0.28}
              roughness={0.56}
            />
          </RoundedBox>
          <Block
            p={[0, 0.285 + i * 0.27, -5.8 - i * 0.53]}
            s={[13.8 - i * 0.75, 0.025, 0.055]}
            color="#bba06b"
            gold
          />
        </group>
      ))}
      <group position={[0, 2.45, -11.5]}>
        <RoundedBox
          args={[3.4, 5.3, 0.65]}
          position={[0, 2.65, 0]}
          radius={0.1}
          smoothness={2}
        >
          <meshStandardMaterial
            map={stone}
            color="#797351"
            metalness={0.45}
            roughness={0.4}
          />
        </RoundedBox>
        <Block p={[0, 2.9, 0.36]} s={[2.8, 4.4, 0.12]} color="#1d3429" />
        {[-1.35, 1.35].map((x) => (
          <Block
            key={x}
            p={[x, 3, 0.48]}
            s={[0.045, 4.3, 0.07]}
            color="#c3a666"
            gold
          />
        ))}
        <Block
          p={[0, 1, 1]}
          s={[3.3, 0.5, 2.2]}
          color="#6b674a"
          stone={stone}
        />
        <Block p={[0, 1.29, 1]} s={[2.65, 0.12, 1.7]} color="#203e30" />
        {[-1.65, 1.65].map((x) => (
          <group key={x}>
            <Block
              p={[x, 0.85, 1.1]}
              s={[0.4, 1.7, 2.6]}
              color="#5d6045"
              stone={stone}
            />
            <Block
              p={[x, 1.75, 1.1]}
              s={[0.6, 0.18, 2.8]}
              color="#ae9157"
              gold
            />
          </group>
        ))}
        <mesh position={[0, 4.5, 0.52]} rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.38, 0.46, 4]} />
          <meshStandardMaterial
            color="#d4b46a"
            emissive="#69551d"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
function Lamps({ onRoom }: { onRoom: (r: Room) => void }) {
  return (
    <>
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 8.5, 0, -5]}
          onClick={() => onRoom(side === -1 ? "mission" : "tracks")}
        >
          <Block p={[0, 0.16, 0]} s={[1.8, 0.32, 1.8]} color="#6b694c" gold />
          <mesh position={[0, 1.7, 0]}>
            <cylinderGeometry args={[0.17, 0.32, 3.2, 12]} />
            <meshStandardMaterial
              color="#645d3a"
              metalness={0.8}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, 3.3, 0]}>
            <cylinderGeometry args={[0.85, 0.28, 0.5, 24]} />
            <meshStandardMaterial
              color="#987d43"
              metalness={0.65}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 3.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.76, 32]} />
            <meshBasicMaterial color="#ffe8a3" toneMapped={false} />
          </mesh>
          <pointLight
            position={[0, 3.8, 0]}
            color="#ffd889"
            intensity={28}
            distance={10}
            decay={2}
          />
        </group>
      ))}
    </>
  );
}
const floorFunctions = `varying vec2 vFloor;uniform float energy;uniform float time;
vec2 hash22(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
float edgeDistance(vec2 p){vec2 cell=floor(p),f=fract(p),nearest=vec2(0.);float d=9.;
for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 g=vec2(float(x),float(y));vec2 r=g+hash22(cell+g)-f;float q=dot(r,r);if(q<d){d=q;nearest=r;}}
float edge=9.;for(int y=-2;y<=2;y++)for(int x=-2;x<=2;x++){vec2 g=vec2(float(x),float(y));vec2 r=g+hash22(cell+g)-f;if(dot(nearest-r,nearest-r)>.0001)edge=min(edge,dot(.5*(nearest+r),normalize(r-nearest)));}return edge;}`;
function Floor({
  entered,
  reduced,
  room,
}: Pick<Props, "entered" | "reduced" | "room">) {
  const uniforms = useMemo(
      () => ({ energy: { value: 0 }, time: { value: 0 } }),
      [],
    ),
    glow = useRef<THREE.PointLight>(null);
  useEffect(() => {
    const t = gsap.to(uniforms.energy, {
      value: !entered ? 0 : room === "rift" ? 2.2 : 0.7,
      duration: reduced ? 0 : room === "rift" ? 2 : 3,
      delay: entered && room === "hall" && !reduced ? 0.7 : 0,
      ease: "sine.inOut",
    });
    return () => {
      t.kill();
    };
  }, [entered, reduced, room, uniforms]);
  useFrame((_, dt) => {
    if (!reduced) uniforms.time.value += Math.min(dt, 0.05);
    if (glow.current) glow.current.intensity = uniforms.energy.value * 38;
  });
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 5]}>
        <planeGeometry args={[28, 40]} />
        <meshStandardMaterial
          color="#3f4a3a"
          roughness={0.42}
          metalness={0.4}
          onBeforeCompile={(shader) => {
            shader.uniforms.energy = uniforms.energy;
            shader.uniforms.time = uniforms.time;
            shader.vertexShader =
              "varying vec2 vFloor;\n" +
              shader.vertexShader.replace(
                "#include <begin_vertex>",
                "#include <begin_vertex>\nvFloor=position.xy;",
              );
            shader.fragmentShader =
              floorFunctions +
              "\n" +
              shader.fragmentShader.replace(
                "#include <emissivemap_fragment>",
                `#include <emissivemap_fragment>
float edge=edgeDistance(vFloor*.65);float disk=1.-smoothstep(6.8,8.,length(vFloor));float fissure=(1.-smoothstep(.008,.035,edge))*disk;
float grain=hash22(floor(vFloor*240.)).x;diffuseColor.rgb*=.68+grain*.3;diffuseColor.rgb*=mix(1.,.18,fissure);
float surge=.85+.15*sin(time*1.1-length(vFloor)*2.);totalEmissiveRadiance+=vec3(.12,1.,.28)*fissure*energy*surge*2.5;
totalEmissiveRadiance+=vec3(.025,.18,.05)*exp(-edge*18.)*disk*energy;`,
              );
          }}
        />
      </mesh>
      {[3.3, 5.7, 7.9].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 5]}>
          <ringGeometry args={[r, r + 0.045, 128]} />
          <meshStandardMaterial
            color="#928758"
            metalness={0.8}
            roughness={0.38}
          />
        </mesh>
      ))}
      <pointLight
        ref={glow}
        position={[0, 1.2, 5]}
        color="#60ff92"
        distance={18}
        intensity={20}
      />
      {Array.from({ length: 16 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 8) * 7.3,
            0.01,
            5 + Math.sin((i * Math.PI) / 8) * 7.3,
          ]}
          rotation={[-Math.PI / 2, 0, (-i * Math.PI) / 8]}
        >
          <planeGeometry args={[0.15, 0.55]} />
          <meshStandardMaterial
            color="#9c925d"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}
      {!reduced && entered && (
        <Sparkles
          count={90}
          scale={[13, 0.8, 13]}
          position={[0, 0.35, 5]}
          size={2}
          speed={room === "rift" ? 0.8 : 0.2}
          color="#a5ff96"
        />
      )}
    </>
  );
}
function Rays() {
  return (
    <>
      {[-1, 1].flatMap((side) =>
        [0, 1, 2].map((i) => {
          const start = new THREE.Vector3(side * (4 + i * 2.5), 14 + i, -14),
            end = new THREE.Vector3(side * (-1 + i), 0.1, 6 + i * 3),
            d = start.clone().sub(end);
          return (
            <mesh
              key={`${side}-${i}`}
              position={start.clone().add(end).multiplyScalar(0.5)}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                d.clone().normalize(),
              )}
            >
              <cylinderGeometry args={[0.35, 2.5, d.length(), 24, 1, true]} />
              <shaderMaterial
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
                vertexShader={
                  "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}"
                }
                fragmentShader={
                  "varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),4.);float ends=sin(vUv.y*3.14159);gl_FragColor=vec4(.95,.79,.4,edge*ends*.032);}"
                }
              />
            </mesh>
          );
        }),
      )}
    </>
  );
}
function Doors({
  entered,
  reduced,
  replayKey,
}: Pick<Props, "entered" | "reduced" | "replayKey">) {
  const left = useRef<THREE.Group>(null),
    right = useRef<THREE.Group>(null);
  useEffect(() => {
    if (!left.current || !right.current) return;
    const a = gsap.to(left.current.rotation, {
      y: entered ? -1.5 : 0,
      duration: reduced || !entered ? 0 : 2.6,
      ease: "power2.inOut",
    });
    const b = gsap.to(right.current.rotation, {
      y: entered ? 1.5 : 0,
      duration: reduced || !entered ? 0 : 2.6,
      ease: "power2.inOut",
    });
    return () => {
      a.kill();
      b.kill();
    };
  }, [entered, reduced, replayKey]);
  return (
    <>
      {[-1, 1].map((side) => (
        <group
          key={side}
          ref={side === -1 ? left : right}
          position={[side * 5.5, 0, 23]}
        >
          <group position={[-side * 2.75, 0, 0]}>
            <Block p={[0, 6, 0]} s={[5.5, 12, 0.65]} color="#20362a" />
            {[-2.35, 2.35].map((x) => (
              <Block
                key={x}
                p={[x, 6, 0.38]}
                s={[0.09, 11.4, 0.1]}
                color="#a68d52"
                gold
              />
            ))}
            {[0.5, 3, 9, 11.5].map((y) => (
              <Block
                key={y}
                p={[0, y, 0.38]}
                s={[4.8, 0.08, 0.1]}
                color="#a68d52"
                gold
              />
            ))}
            <mesh position={[0, 6, 0.4]} rotation={[0, 0, Math.PI / 4]}>
              <ringGeometry args={[1.1, 1.2, 4]} />
              <meshStandardMaterial
                color="#d3b97d"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>
      ))}
    </>
  );
}
function Rift({ active, reduced }: { active: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null),
    beam = useRef<THREE.Mesh>(null),
    intensity = useRef({ value: 0 });
  useEffect(() => {
    const t = gsap.to(intensity.current, {
      value: active ? 1 : 0,
      duration: reduced ? 0 : 2.4,
      ease: "sine.inOut",
    });
    return () => {
      t.kill();
    };
  }, [active, reduced]);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.visible = intensity.current.value > 0.005;
      group.current.scale.setScalar(0.6 + intensity.current.value * 0.4);
      if (!reduced)
        group.current.rotation.y +=
          Math.min(dt, 0.05) * 0.12 * intensity.current.value;
    }
    if (beam.current) {
      beam.current.scale.y = Math.max(0.001, intensity.current.value);
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        intensity.current.value * 0.08;
    }
  });
  return (
    <group position={[0, 0.12, 5]}>
      <group ref={group}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2 + i * 0.24, i * 0.3, 0]}
            position={[0, 0.2 + i * 0.65, 0]}
          >
            <torusGeometry args={[2.7 - i * 0.6, 0.018, 6, 90]} />
            <meshBasicMaterial
              color="#aaffbc"
              toneMapped={false}
              transparent
              opacity={0.65}
            />
          </mesh>
        ))}
        {!reduced && active && (
          <Sparkles
            count={100}
            scale={[4, 5, 4]}
            position={[0, 2.5, 0]}
            size={2.5}
            speed={0.5}
            color="#aeffc2"
          />
        )}
      </group>
      <mesh ref={beam} position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.1, 1.2, 5, 32, 1, true]} />
        <meshBasicMaterial
          color="#65ffb0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
function Scene(props: Props) {
  const stone = useStone();
  return (
    <>
      <JourneyCamera {...props} />
      <color attach="background" args={["#0a1711"]} />
      <fog attach="fog" args={["#1c2b20", 28, 66]} />
      <ambientLight intensity={0.6} color="#a4baa5" />
      <hemisphereLight args={["#e4dcaf", "#183d2c", 0.85]} />
      <directionalLight position={[4, 14, -11]} intensity={4} color="#ffe0a0" />
      <directionalLight position={[0, 7, 12]} intensity={1.1} color="#adccb4" />
      <pointLight
        position={[0, 9, -12]}
        intensity={100}
        color="#ffe4a3"
        distance={24}
      />
      <Visibility
        reduced={props.reduced}
        progress={props.progress}
        min={0}
        max={0.29}
      >
        <Architecture stone={stone} />
        <EmptyThrone stone={stone} />
        <Lamps onRoom={props.onRoom} />
        <Floor
          entered={props.entered}
          reduced={props.reduced}
          room={props.room}
        />
        <Rays />
        <Doors {...props} />
        <Rift
          active={props.entered && props.room === "rift"}
          reduced={props.reduced}
        />
      </Visibility>
      <OtherWorlds
        progress={props.progress}
        reduced={props.reduced}
        mobile={props.mobile}
      />
      {!props.reduced && (
        <Sparkles
          count={props.mobile ? 60 : 160}
          scale={[23, 13, 34]}
          position={[0, 6, 0]}
          size={1.8}
          speed={0.12}
          color="#ead9a4"
        />
      )}
    </>
  );
}
class Boundary extends Component<
  { children: ReactNode; onError: () => void },
  { bad: boolean }
> {
  state = { bad: false };
  static getDerivedStateFromError() {
    return { bad: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.bad ? null : this.props.children;
  }
}
function NoWebGL({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return (
    <p className="fallback">
      The 3D hall needs WebGL. Registration and navigation remain available.
    </p>
  );
}
export default function Hall(props: Props) {
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => {
    setFailed(true);
    props.onReady();
  }, [props.onReady]);
  if (failed) return <NoWebGL onReady={props.onReady} />;
  return (
    <Boundary onError={fail}>
      <Canvas
        dpr={[1, props.mobile ? 1 : 1.5]}
        camera={{ position: [0, 4.4, 16], fov: 53 }}
        gl={{
          antialias: !props.mobile,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        fallback={<NoWebGL onReady={props.onReady} />}
      >
        <Scene {...props} />
      </Canvas>
    </Boundary>
  );
}
