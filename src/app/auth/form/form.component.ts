import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(public navigationServiceProvider: NavigationService) {
    this.navigationServiceProvider.navigateToFormList();
  }
}
