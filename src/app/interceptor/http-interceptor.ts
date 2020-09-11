import {Injectable} from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,
HttpErrorResponse} from  '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
@Injectable()
export class HttpInterservice implements HttpInterceptor{

    intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{

        let jwt=sessionStorage.getItem("Token");

        request=request.clone({
            setHeaders:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*',
                'Cache-Control':'no-cache',
                'JWT':`${jwt}`
                //or
                // 'Authorization':`${jwt}`
            }
        });
        return next.handle(request)
        .pipe(
            retry(1),
            catchError((error:HttpErrorResponse)=>{
                let errorMessage=''
                let err:any;
                if(error.error instanceof ErrorEvent){
                    errorMessage=`Error:${error.error.message}`;

                }
                else{
                    err=error;
                    return throwError(err.error);
                }

                return throwError(errorMessage);
            })
        )
    }
}