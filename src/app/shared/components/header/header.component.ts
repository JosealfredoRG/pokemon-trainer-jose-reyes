import { Component, Input } from '@angular/core';
import { ViewEnum } from '../../../core/models/view.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() currentView: ViewEnum = ViewEnum.Profile;
  @Input() TrainerName?: String= '';
  ViewEnum = ViewEnum;
 

}
