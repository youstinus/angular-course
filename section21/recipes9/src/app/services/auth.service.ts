import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refrashToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any = null
    signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3nvul4X6Ukz9uWfNI6mL0EelzvEKpkDc';
    signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3nvul4X6Ukz9uWfNI6mL0EelzvEKpkDc';

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.signupUrl,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                }))
    }

    signin(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.signinUrl,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                }))
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate
        } = JSON.parse(localStorage.getItem('userData'))

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate)

        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration)
        }
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleAuthentication(
        email: string,
        localId: string,
        idToken: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            localId,
            idToken,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address already exist';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email address was not found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password'
                break;
            case 'USER_DISABLED':
                errorMessage = 'User blocked'
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Using password is disabled. Contact support'
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts. Try again later'
                break;
        }
        return throwError(errorMessage)
    }
}