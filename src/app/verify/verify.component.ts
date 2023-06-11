import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(private router: Router, private actRoute: ActivatedRoute, private S: ServiceService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    let token = this.actRoute.snapshot.paramMap.get('token');
    console.log(":  verify oninit" + token);

    this.S.updatIsverified(token).subscribe(data => {
      console.log("isverified updated");
    })
    this.router.navigate(['verified'])
  }

}
