import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faTachometerAlt  } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  faTachometerAlt = faTachometerAlt
  faDoorOpen = faDoorOpen

  path: String = window.location.pathname

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.authService.logout()
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: "¿Segúro que desea cerrar sesión?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.logout();
      },
      reject: () => {
        // Nothing
      }
    });
  }

}
