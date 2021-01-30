import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(
    private api: ApiService,
    private router: Router
    ) { }

  login(data){
    return this.api.api({
      service:'signin',
      data: data,
      type: 'post'
    })   
  }

  register(data) {
    return this.api.api({
      service: 'signup',
      data: data,
      type: 'post'
    })
  }

  isLogin(){
    const user = localStorage.getItem('bintuser')
    if(user && user !== ''){
      return true
    }else{
      return false
    }
  }

  getRole() {
    return localStorage.getItem('bintuser') ? JSON.parse(localStorage.getItem('bintuser'))?.role : null    
  }

  logout(){
    localStorage.removeItem('bintuser');
    this.router.navigate(['/auth/login'])
  }

}
