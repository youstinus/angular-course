import { Component, OnInit } from '@angular/core';

import { ServersService } from '../../services/servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
    /*const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });*/
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  /*onReload() {
    this.router.navigate(['/servers'], {relativeTo: this.route});
  }*/
}
