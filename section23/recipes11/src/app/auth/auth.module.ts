import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        RouterModule,
        SharedModule,
        FormsModule,
        AuthRoutingModule,
    ],
})
export class AuthModule { }