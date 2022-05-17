import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public loginForm: FormGroup;
  public submitted = false;
  public BAD_CREDENTIALS_ERROR_KEY = 'badCredentialsError';
  // This url indicates the page the user was on before going to the login page
  public returnUrl: string;
  public error: string;

  /**
   * Gets loginForm fields
   */
  get fields(): any { return this.loginForm.controls; }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // when already logged redirect to dashboard
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * Determines whether submit on
   * @returns void
   */
  onSubmit(): void {
    this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   break;
    // }


    this.authenticationService.login(this.fields.username.value, this.fields.password.value)
      .pipe(first()).pipe(takeUntil(this.unsubscribe), catchError(e => this.error = e)).subscribe(data => {

        this.router.navigate([this.returnUrl]);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
