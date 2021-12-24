import {Component, Input, OnInit} from '@angular/core';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  // providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  accounts: {name: string, status: string}[] = [];

  constructor(
    // private loggingService: LoggingService,
    private accountsService: AccountsService) {

  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
    // this.loggingService.logStatusChanged(status);
  }
}
