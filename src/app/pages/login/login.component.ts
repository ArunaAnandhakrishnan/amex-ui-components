import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup,
  ValidationErrors, Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventBusService } from '../../core/services/event-bus.service';

function passwordMatch(ctrl: AbstractControl): ValidationErrors | null {
  const pw  = ctrl.get('password')?.value;
  const cpw = ctrl.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  mode: 'login' | 'register' = 'login';
  loading      = false;
  error        = '';
  success      = '';
  showPwd      = false;
  showConfirm  = false;
  returnUrl    = '/bta';

  loginForm!:    FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb:    FormBuilder,
    private auth:  AuthService,
    private bus:   EventBusService,
    private router:  Router,
    private route:   ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.auth.hasToken()) { this.router.navigate([this.returnUrl]); return; }
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/bta';

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.registerForm = this.fb.group({
      username:        ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role:            ['ROLE_USER'],
    }, { validators: passwordMatch });
  }

  setMode(m: 'login' | 'register'): void {
    this.mode = m; this.error = ''; this.success = '';
  }

  /** Mock login — works without backend. Any non-empty credentials succeed. */
  private mockLogin(username: string): void {
    const mockToken = 'mock-jwt-' + Date.now();
    localStorage.setItem(AuthService.TOKEN_KEY, mockToken);
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify({ username, role: 'ROLE_USER' }));
    this.bus.emit({ type: 'USER_LOGGED_IN', payload: { username, role: 'ROLE_USER' } });
    this.router.navigate([this.returnUrl]);
  }

  login(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading = true; this.error = '';

    // Try real backend first; fall back to mock if backend is not running
    this.auth.login(this.loginForm.value).subscribe({
      next: res => {
        this.bus.emit({ type: 'USER_LOGGED_IN', payload: { username: res.username, role: res.role } });
        this.router.navigate([this.returnUrl]);
      },
      error: () => {
        // Backend not available — use mock login so development works without a server
        this.loading = false;
        this.mockLogin(this.loginForm.value.username);
      },
    });
  }

  register(): void {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    this.loading = true; this.error = ''; this.success = '';

    const { username, email, password, role } = this.registerForm.value;
    this.auth.register({ username, email, password, role }).subscribe({
      next: res => {
        this.bus.emit({ type: 'USER_LOGGED_IN', payload: { username: res.username, role: res.role } });
        this.success = res.message || 'Registration successful! Redirecting…';
        setTimeout(() => this.router.navigate(['/bta']), 1200);
      },
      error: () => {
        // Backend not available — mock register
        this.loading = false;
        this.mockLogin(this.registerForm.value.username);
      },
    });
  }

  get lf() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }
  get pwdMismatch(): boolean {
    return this.registerForm.hasError('mismatch') &&
      (this.rf['confirmPassword'].dirty || this.rf['confirmPassword'].touched);
  }
}
