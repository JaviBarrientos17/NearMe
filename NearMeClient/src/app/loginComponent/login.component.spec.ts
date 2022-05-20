import { AuthenticationService } from 'src/app/services/authentication.service';
import { of, throwError } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [AuthenticationService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    `should redirect to dashboard if login credentials are valid`,
    waitForAsync(
      inject(
        [HttpTestingController, AuthenticationService],
        (
          httpClient: HttpTestingController,
          authService: AuthenticationService
        ) => {
          component.returnUrl = '/';
          const loginResponseMock: any = {
            id: '1',
            username: 'testuser',
            token: 'testtoken',
          };
          const navigateSpy = spyOn(router, 'navigate');
          const spy = spyOn(authService, 'login').and.returnValue(
            of(loginResponseMock)
          );
          component.loginForm.controls.username.setValue('user');
          component.loginForm.controls.password.setValue('123');
          component.onSubmit();
          expect(navigateSpy).toHaveBeenCalledWith([component.returnUrl]);
        }
      )
    )
  );

  it(
    `should show error if login credentials are invalid`,
    waitForAsync(
      inject(
        [HttpTestingController, AuthenticationService],
        (
          httpClient: HttpTestingController,
          authService: AuthenticationService
        ) => {
          const spy = spyOn(authService, 'login').and.callFake(() => {
            return throwError('Bad credentials');
          });
          component.loginForm.controls.username.setValue('user');
          component.loginForm.controls.password.setValue('123');
          component.onSubmit();
          expect(component.submitted).toBeTruthy();
          expect(component.error).toContain('Bad credentials');
        }
      )
    )
  );
});
