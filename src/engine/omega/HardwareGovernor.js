/**
 * ============================================================================
 * CONFIDENTIAL & PROPRIETARY - I2FLABS INTELLECTUAL PROPERTY
 * ----------------------------------------------------------------------------
 * Aevum OS Proprietary Algorithm: Hardware-Aware Adaptive Governor (HAAG)
 * Patent Application: VN/PCT Pending (I2FLabs Autonomous Systems Lab)
 * Invented by: Zenith (Complexity Architect) & Kael (120Hz Runtime Engineer)
 * ============================================================================
 * NOTICE: This module governs real-time physical device constraints including
 * hardware concurrency, RAM allocation thresholds, and network thermal envelope.
 */

export const DeviceTier = Object.freeze({
  ULTRA: 'ULTRA',       // Desktop Gaming / 120Hz-240Hz ProMotion / RAM >= 8GB
  BALANCED: 'BALANCED', // Mid-range Desktop & Mobile / RAM 4GB - 8GB
  ECO: 'ECO'            // Low-end Mobile / RAM <= 2GB / Battery-Save / 3G Network
});

export class HardwareGovernor {
  constructor() {
    this.currentTier = this.evaluateHardwareProfile();
  }

  evaluateHardwareProfile() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return DeviceTier.BALANCED;
    }

    // 1. Check for User Save-Data Preference
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && (connection.saveData === true || ['slow-2g', '2g', '3g'].includes(connection.effectiveType))) {
      return DeviceTier.ECO;
    }

    // 2. Evaluate Physical Memory & CPU Concurrency
    const ram = navigator.deviceMemory || 4; // Memory in GiB
    const cores = navigator.hardwareConcurrency || 4;

    if (ram <= 2 || cores <= 2) {
      return DeviceTier.ECO;
    }

    if (ram >= 8 && cores >= 8 && (!connection || connection.effectiveType === '4g')) {
      return DeviceTier.ULTRA;
    }

    return DeviceTier.BALANCED;
  }

  getTier() {
    return this.currentTier;
  }

  isRadarPermitted() {
    // Touch devices and ECO tier devices bypass vector calculation to preserve 100% CPU
    if (typeof window === 'undefined') return false;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return false;
    return this.currentTier !== DeviceTier.ECO;
  }

  getMaxCacheDepth() {
    switch (this.currentTier) {
      case DeviceTier.ULTRA:
        return 8;
      case DeviceTier.BALANCED:
        return 4;
      case DeviceTier.ECO:
      default:
        return 2;
    }
  }

  getReachRadius() {
    switch (this.currentTier) {
      case DeviceTier.ULTRA:
        return 200; // px
      case DeviceTier.BALANCED:
        return 120; // px
      case DeviceTier.ECO:
      default:
        return 60;  // px
    }
  }

  // Adaptive WebGL / Three.js Parameters
  getRecommendedParticleCount(defaultCount = 3800) {
    switch (this.currentTier) {
      case DeviceTier.ULTRA:
        return defaultCount;
      case DeviceTier.BALANCED:
        return Math.round(defaultCount * 0.65);
      case DeviceTier.ECO:
      default:
        return Math.round(defaultCount * 0.35);
    }
  }

  getRecommendedPixelRatio() {
    if (typeof window === 'undefined') return 1;
    const dpr = window.devicePixelRatio || 1;
    switch (this.currentTier) {
      case DeviceTier.ULTRA:
        return Math.min(dpr, 2.0);
      case DeviceTier.BALANCED:
        return Math.min(dpr, 1.5);
      case DeviceTier.ECO:
      default:
        return 1.0;
    }
  }

  isAntialiasEnabled() {
    return this.currentTier !== DeviceTier.ECO;
  }

  getPowerPreference() {
    return this.currentTier === DeviceTier.ECO ? 'low-power' : 'high-performance';
  }

  isWebGLSupported() {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (_) {
      return false;
    }
  }
}

export const hardwareGovernor = new HardwareGovernor();

