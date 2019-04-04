import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public  login<T>(userInfo: User):Observable<T>{ 

     return this.http.post<T>('http://192.168.1.25:3000/login/check',userInfo ).pipe(map(
      (response) => { localStorage.setItem('ACCESS_TOKEN', "access_token");return response;}
     
    ));
    
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
