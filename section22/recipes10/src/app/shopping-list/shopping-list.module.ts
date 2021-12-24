import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        RouterModule,//.forChild([{ path: 'shopping-list', component: ShoppingListComponent }]),
        FormsModule,
        SharedModule, // if providing in shared module logging then creating new instance of logging
        ShoppingListRoutingModule
    ],
    // providers: [LoggingService] // starting new instance with lazyloading.
    // unneccessarry
    /*exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ]*/
})
export class ShoppingListModule {

}