// src/pages/WelcomePage.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import dollarTextureImage from "../assets/dollarTextureImage.jpg"; // Adjust the path if necessary

export const WelcomePage = () => {
  const threeRef = useRef();

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.current.appendChild(renderer.domElement);

    // Load the dollar texture
    const textureLoader = new THREE.TextureLoader();
    const dollarTexture = textureLoader.load(dollarTextureImage);

    // Create coins with the dollar texture
    const coins = [];
    const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    const coinMaterial = new THREE.MeshStandardMaterial({
      map: dollarTexture,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.011,
      roughness: 0.1,
    });

    for (let i = 0; i < 30; i++) {
      const coin = new THREE.Mesh(coinGeometry, coinMaterial);
      coin.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      coin.rotation.x = Math.random() * Math.PI;
      coin.rotation.y = Math.random() * Math.PI;
      scene.add(coin);
      coins.push(coin);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Position the camera
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and move coins
      coins.forEach((coin) => {
        coin.rotation.x += 0.01;
        coin.rotation.y += 0.01;
        coin.position.y += Math.sin(Date.now() * 0.001) * 0.01; // Float effect
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      threeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div ref={threeRef} style={styles.threeContainer}></div>
      <div style={styles.content}>
        <Heading text="Welcome to BankIt" />
        <SubHeading text="Your Trusted Digital Banking Solution" />
        <div style={styles.buttonContainer}>
          <Button 
            text="Get Started" 
            onClick={() => window.location.href = '/signin'} 
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#e8f2f4', // Light background color for contrast
  },
  threeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
    padding: '40px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    margin: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  buttonContainer: {
    marginTop: '30px',
  },
};
