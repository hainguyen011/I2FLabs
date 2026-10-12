export declare const DeviceTier: {
  readonly ULTRA: "ULTRA";
  readonly BALANCED: "BALANCED";
  readonly ECO: "ECO";
};

export declare class HardwareGovernor {
  currentTier: string;
  evaluateHardwareProfile(): string;
  getTier(): string;
  isRadarPermitted(): boolean;
  getMaxCacheDepth(): number;
  getReachRadius(): number;
  getRecommendedParticleCount(defaultCount?: number): number;
  getRecommendedPixelRatio(): number;
  isAntialiasEnabled(): boolean;
  getPowerPreference(): 'low-power' | 'high-performance';
  isWebGLSupported(): boolean;
}

export declare const hardwareGovernor: HardwareGovernor;

export declare class IntentRadar {
  constructor(governor: HardwareGovernor, onIntent: (id: string) => void);
  start(): void;
  destroy(): void;
  registerTargets(targets: Array<{ id: string; element: HTMLElement }>): void;
}

export declare class AevumOmegaEngine {
  governor: HardwareGovernor;
  radar: IntentRadar;
  boot(): void;
  warmup(targetId?: string): void;
  speculativePrewarm(targetId: string): void;
}

export declare const omegaEngine: AevumOmegaEngine;

