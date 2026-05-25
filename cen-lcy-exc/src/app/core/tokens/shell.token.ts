import { InjectionToken } from '@angular/core';

/**
 * Provided as `true` by CenLcyExcRemoteEntryModule when loaded via MFE.
 * NOT provided standalone (port 4210) — @Optional() returns null.
 * Shell-hosted  → AmexPageShell embedded mode (no header/footer/sidebar)
 * Standalone    → AmexPageShell renders full ONLS chrome
 */
export const SHELL_HOSTED = new InjectionToken<boolean>('SHELL_HOSTED');
