// src/utils/physics.js
import * as THREE from "three";

export const GRAVITY = new THREE.Vector3(0, -0.4, 0);
export const AIR_DRAG = 0.985;

export const WIND_LEFT_TO_RIGHT = new THREE.Vector3(1, 0.05, 0);
export const WIND_RIGHT_TO_LEFT = new THREE.Vector3(-1, 0.05, 0);
