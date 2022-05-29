
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserRoleType } from 'src/model/enums/user-role-type.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const currentUser = this.authenticationService.currentUserValue;
        if (route.data.roles && currentUser) {
            for (const role of route.data.roles) {
                if (this.authenticationService.isAuthorized(role)) { return true; }
            }
            
            if (this.authenticationService.isAuthorized(UserRoleType.CLIENT) ||
                this.authenticationService.isAuthorized(UserRoleType.SUPPLIER)) {
                this.router.navigate(['/']);
            }
            return false;
        }
        if (currentUser) {
            return true;
        }
  
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
