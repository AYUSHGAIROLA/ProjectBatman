import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ){

    }

    canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
        if (localStorage.getItem('isLoggedIn') && (localStorage.getItem('isLoggedIn')=="true")) {
            return true;
        }
        this.navigateToLogin();
        return false;
    }

    navigateToLogin(){
        this.router.navigate(['login'])
    }
}