import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SentEmailComponent } from './sent-email/sent-email.component';
import { ToLoginComponent } from './to-login/to-login.component';
import { VerificationComponent } from './verification/verification.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'email',component:SentEmailComponent},
  {path:'verified',component:ToLoginComponent},
  {path:'verification',component:VerificationComponent},
  {path:'verify/:token',component:VerifyComponent},
  {path:'**',component:SignUpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
