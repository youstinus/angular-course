import {Component, OnInit} from '@angular/core';
import {AccountsService} from './services/accounts.service';
import {LoggingService} from './services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoggingService]
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {

  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
