import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const MoleculeViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Dark background
    // Camera
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 10;
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    // DNA Model Generation
    const dnaGroup = new THREE.Group();
    const steps = 20;
    const radius = 1;
    const height = 5;
    const baseColors = [0x22c55e, 0xef4444, 0x3b82f6, 0xf59e0b]; // A, T, C, G
    for (let i = 0; i < steps; i++) {
      const y = (i / steps) * height - height / 2;
      const angle1 = (i / steps) * Math.PI * 4;
      const angle2 = angle1 + Math.PI;
      const p1 = new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius);
      const p2 = new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius);
      // Base Pair
      const basePairGeometry = new THREE.BoxGeometry(p1.distanceTo(p2), 0.1, 0.4);
      const basePairMaterial = new THREE.MeshStandardMaterial({ color: baseColors[i % 4] });
      const basePairMesh = new THREE.Mesh(basePairGeometry, basePairMaterial);
      basePairMesh.position.copy(p1).lerp(p2, 0.5);
      basePairMesh.lookAt(p2);
      dnaGroup.add(basePairMesh);
      // Backbone
      const nextY = ((i + 1) / steps) * height - height / 2;
      const nextAngle1 = ((i + 1) / steps) * Math.PI * 4;
      const p1_next = new THREE.Vector3(Math.cos(nextAngle1) * radius, nextY, Math.sin(nextAngle1) * radius);
      const p2_next = new THREE.Vector3(Math.cos(nextAngle1 + Math.PI) * radius, nextY, Math.sin(nextAngle1 + Math.PI) * radius);
      if (i < steps - 1) {
        const backboneMaterial = new THREE.MeshStandardMaterial({ color: 0xa78bfa });
        const path1 = new THREE.LineCurve3(p1, p1_next);
        const backbone1Geometry = new THREE.TubeGeometry(path1, 1, 0.08, 8, false);
        const backbone1Mesh = new THREE.Mesh(backbone1Geometry, backboneMaterial);
        dnaGroup.add(backbone1Mesh);
        const path2 = new THREE.LineCurve3(p2, p2_next);
        const backbone2Geometry = new THREE.TubeGeometry(path2, 1, 0.08, 8, false);
        const backbone2Mesh = new THREE.Mesh(backbone2Geometry, backboneMaterial);
        dnaGroup.add(backbone2Mesh);
      }
    }
    scene.add(dnaGroup);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="w-full h-full" />;
};
export default MoleculeViewer;