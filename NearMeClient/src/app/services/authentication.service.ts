import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { User } from 'src/model/user.model';
import { environment } from 'src/environments/environment.prod';
import { UserRoleType } from 'src/model/enums/user-role-type.enum';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentUser: Observable<User> = new Observable<User>();
  public currentUserId: Observable<string> = new Observable<string>();
  constructor(private router: Router, private http: HttpClient) {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
    if (currentUser !== null) {
      this.currentUserIdSubject = new BehaviorSubject<string>(currentUser.id);
    }
    this.currentUserId = this.currentUserIdSubject.asObservable();
  }

  /**
   * Gets current user value from localStorage
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Gets current user value from localStorage
   */
  public get currentUserIdValue(): string {
    return this.currentUserIdSubject.value;
  }

  /**
   * Logs in user into system
   * @param username username
   * @param password password
   * @returns login
   */
  login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
      .pipe(map(user => {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.currentUserIdSubject.next(user.id);
          return user;
        }
      }));
  }

  updateUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUserIdSubject.next(user.id);
  }


  /**
   * Removes jwt token from storage
   */
  removeToken(redirect = true): any {
    // localStorage.clear();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentUserIdSubject.next(null);
    if (redirect) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Sends logout request and removes user from local storage to log user out
   */
  logout(redirect = true): any {
    this.http.get<any>(`${environment.apiUrl}/auth/logout`)
      .pipe(takeUntil(this.unsubscribe)).subscribe(result => this.removeToken(redirect));
  }

  /**
   * Gets last login of user
   */
  get lastLogin(): moment.Moment {
    const decodeToken: any = jwt_decode(this.currentUserValue.token);
    return moment.unix(decodeToken.iat);
  }

  /**
   * checks if user is authorized or not depending on the role
   * @param allowedRole role
   * @returns true if authorized
   */
  isAuthorized(allowedRole: UserRoleType): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRole == null) {
      return true;
    }

    // decode token to read the payload details
    const decodeToken: any = jwt_decode(this.currentUserValue.token); 
    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return decodeToken.roles.includes(allowedRole.valueOf());
  }

  /**
   * Gets logged user
   * @returns user
   */
  getLoggedUser(): any {
    if (this.currentUserIdValue && this.currentUserIdValue !== undefined) {
      return this.http.get<User>(`${environment.apiUrl}/auth/me`);
    }
    return of();
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
