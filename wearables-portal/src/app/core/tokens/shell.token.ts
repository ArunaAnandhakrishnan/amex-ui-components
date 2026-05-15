import { InjectionToken } from '@angular/core';

/**
 * SHELL_HOSTED
 *
 * Provided as `true` by WearablesRemoteEntryModule (entry.module.ts) when
 * this portal is loaded inside the shell via Module Federation.
 *
 * NOT provided when running standalone on port 4206 — Angular's
 * @Optional() injection returns null in that case.
 *
 * Usage in WearablesComponent:
 *   constructor(@Optional() @Inject(SHELL_HOSTED) public isShellHosted: boolean) {}
 *
 * Template:
 *   *ngIf="!isShellHosted"  → only render AmexPageShellComponent standalone
 */
export const SHELL_HOSTED = new InjectionToken<boolean>('SHELL_HOSTED');
