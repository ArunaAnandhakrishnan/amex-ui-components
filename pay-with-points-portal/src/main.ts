// Deferred bootstrap is REQUIRED for Module Federation remotes.
// When loaded as a remote inside the shell, Angular must not
// bootstrap immediately — the shell controls the lifecycle.
import('./bootstrap').catch(err => console.error(err));
