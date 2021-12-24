import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingIterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check request. validate and stuff. controll request.url here
        return next.handle(req).pipe(tap(event => {
            if (event.type == HttpEventType.Response) {
                console.log('Response arrived')
            }
        }))
    }
}