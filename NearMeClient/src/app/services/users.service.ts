import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { CreateUserRequest } from 'src/model/master-data/create-user-request.model';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public userUpdated: EventEmitter<void> = new EventEmitter();
  private apiUrl = environment.apiUrl;
  private userId: string;
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.authenticationService.currentUserId.pipe(takeUntil(this.unsubscribe)).subscribe(userId => {
      this.userId = userId;
    });
  }

  /**
   * Request password reset token
   * @param data data
   * @returns Observable
   */
  resetPasswordRequest(data: any): any {
    return this.http.post(`${this.apiUrl}/password/reset-password-request`, data);
  }


  /**
   * Validates token
   * @param token token
   * @returns Observable
   */
  validateToken(token: string): any {
    return this.http.get(`${this.apiUrl}/password/validate-token/${token}`);
  }


  /**
   * Creates a new user or updates existing user
   * @param data CreateUserRequest
   * @returns Observable
   */
  createUser(data: CreateUserRequest): any {    
    return this.http.post(`${this.apiUrl}/users/add-user`, data);
  }
  
  /**
   * Updates user
   * @param data user data
   * @returns user updated
   */
  updateUser(data: CreateUserRequest): any {
    return this.http.put(`${this.apiUrl}/users/update-user`, data);
  }

  /**
   * @param idUser id user
   * @returns Observable
   */
  getProfileImage(idUser: string): string {
    return `${this.apiUrl}/users/profile-image/${idUser}`;
  }

  /**
   * upload file to api
   */
  public upload(formData): any {
    return this.http.post<any>(`${this.apiUrl}/users/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  /**
   * Gets a list of users
   * @returns Observable
   */
  public getUsers(): any {
    return this.http.get(`${this.apiUrl}/users/list/`);
  }

  /**
   * Gets logs for user
   * @returns Observable
   */
  public getUserLogs(idUser): any {
    return this.http.get(`${this.apiUrl}/users/list-logs/${idUser}`);
  }

  /**
   * Gets logs for user
   * @returns Observable
   */
  public getLogsForUsers(min, max): any {
    return this.http.get(`${this.apiUrl}/users/list-logs/${min}/${max}`);
  }

  /**
   * Gets last login
   * @returns Observable
   */
  public getLastLogin(): any {
    return this.http.get(`${this.apiUrl}/users/last-login`);
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
