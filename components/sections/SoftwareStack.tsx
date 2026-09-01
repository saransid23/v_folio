"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SectionReveal from "@/components/animations/SectionReveal";
import ScrollTextHighlight from "@/components/animations/ScrollTextHighlight";

function SoftwareBox({ texturePath }: { texturePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(texturePath);

  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation + mouse tilt follow
    const targetRotY = (state.clock.elapsedTime * 0.25) + (state.pointer.x * 0.5);
    const targetRotX = (Math.sin(state.clock.elapsedTime * 0.5) * 0.1) - (state.pointer.y * 0.5);
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);

    // Bounce and hover forward pop
    const targetY = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    
    const targetZ = hovered ? 0.6 : 0;
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    
    const targetScale = hovered ? 1.5 : 1.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.8, 1.8, 0.25]} />
      <meshStandardMaterial
        attach="material-4" // Front
        map={texture}
        roughness={0.2}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.08}
      />
      <meshStandardMaterial
        attach="material-5" // Back
        map={texture}
        roughness={0.2}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.08}
      />
      {["material-0", "material-1", "material-2", "material-3"].map((mat) => (
        <meshStandardMaterial
          key={mat}
          attach={mat}
          color="#ffffff"
          roughness={0.3}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
}

function PremiereScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[0, 0, 5]} intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[-5, 5, 2]} intensity={2.0} color="#D60001" />
      <pointLight position={[5, -5, 2]} intensity={2.0} color="#00f2fe" />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <SoftwareBox texturePath="/premier image.jpg" />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI} minPolarAngle={0} />
    </Canvas>
  );
}

function CapCutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[0, 0, 5]} intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[-5, 5, 2]} intensity={2.0} color="#D60001" />
      <pointLight position={[5, -5, 2]} intensity={2.0} color="#00f2fe" />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <SoftwareBox texturePath="/capcut image.png" />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI} minPolarAngle={0} />
    </Canvas>
  );
}

export default function SoftwareStack() {
  return (
    <div className="relative">
      
      {/* Slide 1: Premiere Pro (Sticky top-0, z-10) */}
      <div className="sticky top-0 h-dvh w-full z-10 bg-accent overflow-hidden border-t border-white/15 flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Info Column */}
          <div className="flex flex-col justify-center text-left max-w-xl">
            <SectionReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4 block">
                professional post-production
              </span>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-sans font-black text-[38px] md:text-[54px] lg:text-[70px] text-white uppercase leading-[0.95] tracking-tighter mb-8">
                ADOBE<br />
                PREMIERE<br />
                <span className="font-display italic font-normal text-black">pro.</span>
              </h2>
            </SectionReveal>

            <ScrollTextHighlight
              text="For high-end commercials, short films, and long-form narratives, I rely on Adobe Premiere Pro. It is the cornerstone of my narrative editing workflow."
              className="font-sans text-[15px] md:text-[17px] leading-relaxed font-light mb-6"
            />

            <div className="border-l-2 border-black pl-4 py-1">
              <h4 className="font-sans font-bold text-white text-lg tracking-wide uppercase mb-1">
                cinematic narrative editor
              </h4>
              <ScrollTextHighlight
                text="I use it for advanced timeline edits, seamless pacing and dialogue flows, precision sound design, color grading integration, and professional cinema deliverables."
                className="font-sans text-[13px] leading-relaxed font-light"
              />
            </div>
          </div>

          {/* 3D Showcase Column */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <PremiereScene />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.2em] text-white/40 uppercase pointer-events-none">
              Move mouse to tilt · Click &amp; Drag to rotate
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2: CapCut Pro (Relative, z-20. Slides directly ON TOP of Premiere, then scrolls away normally) */}
      <div className="relative h-dvh w-full z-20 bg-surface overflow-hidden border-t border-white/15 flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Info Column */}
          <div className="flex flex-col justify-center text-left max-w-xl">
            <SectionReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4 block">
                viral short-form content
              </span>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-sans font-black text-[38px] md:text-[54px] lg:text-[70px] text-white uppercase leading-[0.95] tracking-tighter mb-8">
                CAPCUT<br />
                PROFESSIONAL<br />
                <span className="font-display italic font-normal text-black">editor.</span>
              </h2>
            </SectionReveal>

            <ScrollTextHighlight
              text="For rapid-turnaround social edits, TikTok trends, and short-form storytelling, I leverage CapCut Pro. It is key to capture fast engagement."
              className="font-sans text-[15px] md:text-[17px] leading-relaxed font-light mb-6"
            />

            <div className="border-l-2 border-black pl-4 py-1">
              <h4 className="font-sans font-bold text-white text-lg tracking-wide uppercase mb-1">
                social content engine
              </h4>
              <ScrollTextHighlight
                text="I use it for mobile-first styling, trendy kinetic subtitles, quick transition-based cuts, smart keyframe tracking, and optimized direct-to-social visual assets."
                className="font-sans text-[13px] leading-relaxed font-light"
              />
            </div>
          </div>

          {/* 3D Showcase Column */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <CapCutScene />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.2em] text-white/40 uppercase pointer-events-none">
              Move mouse to tilt · Click &amp; Drag to rotate
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
