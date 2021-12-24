import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeauthGuardService implements CanDeactivate<DeactivateThis> {

  constructor() {
  }

  canDeactivate(
    component: DeactivateThis,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

export interface DeactivateThis {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
