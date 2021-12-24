import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
}) // used instead of adding provider to a app_module. this  one uses lazy loading
export class CounterService {
  private activeCounter = 0;
  private inactiveCounter = 0;

  incrementActive() {
    this.activeCounter++;
    console.log(this.activeCounter);
  }

  incrementInactive() {
    this.inactiveCounter++;
    console.log(this.inactiveCounter);
  }

  constructor() {
  }
}
