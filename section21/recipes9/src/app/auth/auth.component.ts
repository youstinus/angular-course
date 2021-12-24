import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
    private closeSub: Subscription

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe()
        }
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email
        const password = form.value.password

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.signin(email, password)
        }
        else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(resData => {
            console.log(resData)
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            console.log(error)
            this.error = error
            this.showErrorAlert(error)
            this.isLoading = false;
        })

        form.reset()
    }

    onHandleError() {
        this.error = null
    }

    private showErrorAlert(message: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef
        hostViewContainerRef.clear()
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory)
        componentRef.instance.message = message
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear()
        })
    }
}