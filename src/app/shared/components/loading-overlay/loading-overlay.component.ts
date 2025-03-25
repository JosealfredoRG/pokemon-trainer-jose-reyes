import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit{
  show: boolean = false;

  constructor(private generalService:GeneralService){

  }
  ngOnInit(): void {    
    this.generalService.showLoader$.subscribe((showLoader:boolean)=>{      
      this.show = showLoader
    });
  }

}
