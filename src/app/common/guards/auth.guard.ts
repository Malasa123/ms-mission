import { AuthService } from 'src/app/common/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
      return this.auth.isLoggedIn.pipe(
          tap(isLoggeedIn => {
              if(!isLoggeedIn) this.router.navigateByUrl('/login');;
          })
      )
  }
}


/**
 * Route guard for preventing authenticated user to route login page
 */

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService,) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.auth.isLoggedIn.pipe(
        map(isLoggeedIn => {
            if(isLoggeedIn) this.router.navigateByUrl('/home/campaigns');
            return !isLoggeedIn
        })
    )
  }
}