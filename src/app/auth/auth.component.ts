import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading = false;
  error: string = null;




  constructor(private authService:AuthService, private router: Router) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
//Getting data from the form and passing it to authentication
  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }else{
    // console.log(form.value)
    const email = form.value.email;
    const password = form.value.password
    let authObs:Observable<AuthResponse>;

    this.isLoading=true
                                          //auth service code 

      if(this.isLoginMode){
       authObs =  this.authService.login(email, password);
      }
      else{
        //signup logic
       authObs =  this.authService.signUp(email, password)
        }


     authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading=false
      this.router.navigate(['/recipes'])
    },
    errorMessage=>{
      this.error=errorMessage        
      console.log(errorMessage)
      this.isLoading=false
          }
      );
    form.reset()
    }
    
  }

  ngOnInit(): void {
  }

}
