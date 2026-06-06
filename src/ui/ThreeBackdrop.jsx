import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 15;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xd6ff75,
      size: 0.018,
      transparent: true,
      opacity: 0.36,
      depthWrite: false
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;

    const onPointerMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.45;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += (pointerY - particles.rotation.x) * 0.018;
      particles.position.x += (pointerX - particles.position.x) * 0.018;
      renderer.render(scene, camera);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true" />;
}
