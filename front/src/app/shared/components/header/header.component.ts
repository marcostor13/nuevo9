import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHeader: Boolean = false

  constructor(
    private router: Router,
    private authService: AuthService
    ) { 

  }
  ngOnInit(): void {
    
  }  

  toogleMenu(){
    this.menuHeader = this.menuHeader ? false: true
  }

  logout(){
    this.authService.logout()
  }

}
