import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface BusEvent {
  type: string;
  payload?: any;
}

/**
 * Event Bus Service (from doc section 9)
 *
 * Enables communication between Shell and remote MFEs
 * without tight coupling.
 *
 * Usage in Shell:
 *   eventBus.emit({ type: 'USER_LOGGED_IN', payload: { username } });
 *
 * Usage in any MFE (via window event or shared service):
 *   window.dispatchEvent(new CustomEvent('mfe-event', { detail: event }));
 *
 * Available event types:
 *   USER_LOGGED_IN   — emitted after successful login
 *   USER_LOGGED_OUT  — emitted after logout
 *   NAVIGATE         — request shell to navigate
 *   NOTIFICATION     — show a toast/notification
 */
@Injectable({ providedIn: 'root' })
export class EventBusService {

  private bus$ = new Subject<BusEvent>();

  /** Emit an event to all subscribers */
  emit(event: BusEvent): void {
    this.bus$.next(event);
    // Also dispatch as browser CustomEvent so MFEs can listen without import
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mfe-bus', { detail: event }));
    }
  }

  /** Listen to all events */
  on(): Observable<BusEvent> {
    return this.bus$.asObservable();
  }

  /** Listen to a specific event type */
  on$(type: string): Observable<any> {
    return this.bus$.pipe(
      filter(e => e.type === type),
      map(e => e.payload)
    );
  }
}
