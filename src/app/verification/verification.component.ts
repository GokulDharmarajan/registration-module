import { Component,OnInit } from '@angular/core';
import {  Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit{
  constructor(private route:Router,private actRoute:ActivatedRoute){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.route.navigate(['toLogin'])
  }

}
