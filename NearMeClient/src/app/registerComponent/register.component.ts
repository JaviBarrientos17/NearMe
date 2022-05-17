import { UserService } from './../services/users.service';
import { ToastService } from './../services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  public createUserForm: FormGroup;
  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      surname: [''],
      phone: [''],
      password: [''],

    });
  }

  /**
   * On submit form creates a new user and shows a success or error message
   */
  onSubmit(): void {
    this.userService.createUser(this.createUserForm.value).pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.showUserCreatedMessage();
      this.createUserForm.reset();
      this.createUserForm.controls.email.setValue('');
    }, error => this.showUserCreatedError(error));
  }

  /**
   * Gets createUserForm fields
   */
  get fields(): any { return this.createUserForm.controls; }

  /**
   * Validation getters
   */
  get emailValid(): boolean {
    return !this.fields.email.hasError('email') && this.fields.email.value !== '';
  }
  get emailRequired(): boolean {
    return !this.fields.email.hasError('required') && this.fields.email.value !== '';
  }
  /**
   * Shows user created success message
   */
  showUserCreatedMessage(): void {
    this.toastService.show(
      'userCreated',
      { classname: 'bg-success text-light', delay: 3000 }
    );
  }

  /**
   * Shows user created error message
   */
  showUserCreatedError(error: string): void {
    this.toastService.show(
      'userCreatedError',
      { classname: 'bg-danger text-light', delay: 3000 }
    );
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
