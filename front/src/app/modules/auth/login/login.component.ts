import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CUser } from './../../../models/user';
import { GeneralService } from './../../../services/general.service';
import { Message, MessageService } from 'primeng/api'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form:any = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.form).subscribe((user:CUser)=>{
      localStorage.setItem('bintuser', JSON.stringify(user))
      this.router.navigate(['/']);
    }, error =>{
      this.generalService.c('Login Error', error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    })
  }

}
