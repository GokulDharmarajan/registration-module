import { Component } from '@angular/core';
import {  Router} from "@angular/router";

@Component({
  selector: 'app-sent-email',
  templateUrl: './sent-email.component.html',
  styleUrls: ['./sent-email.component.scss']
})
export class SentEmailComponent {
constructor(private router:Router){}
// toLogin(){
//   this.router.navigate(['toLogin'])
// }
}
