import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../model/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.authenticate) {
      this.router.navigateByUrl('/admin/auth');
      return false;
    }
    return true;
  }
}
