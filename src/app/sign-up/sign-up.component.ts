import { Component } from '@angular/core';
import {  Router} from "@angular/router";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    id:any;
    username:any;
    useremail:any;
    userpassword:any;
    constructor(private router: Router,private S:ServiceService) { }
  
    createAccount() {
      let data:any={
        username:this.username,
        useremail:this.useremail,
        userpassword:this.userpassword
      }
      console.log(data);
      this.S.createNewUser(data).subscribe((data)=>{        
      })
      this.router.navigate(['email']);
    }
}
