import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent {
  constructor(public navigationServiceProvider: NavigationService) {
    this.navigationServiceProvider.navigateToServiceList();
  }
}
