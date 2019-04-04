import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { map } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,private _flashMessagesService: FlashMessagesService ) { }
 loginForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {
  		this.loginForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
   login(){
    
    this.isSubmitted = true;
   
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
        console.log(JSON.stringify(res));
        console.log(typeof(res));
        try{
             if(res.statuscode==true){
              this._flashMessagesService.show(JSON.stringify(res.message), { cssClass: 'alert-success', timeout: 50000 });
              this.router.navigateByUrl('/admin');               
          }
          else{
              var msg ='';
              msg = (res.error.username != undefined && res.error.username.message != undefined)?res.error.username.message:'';
              msg += (res.error.password != undefined && res.error.password.message != undefined)?res.error.password.message:'';
              this._flashMessagesService.show(msg, { cssClass: 'alert-error', timeout: 50000 });

          }
        }
        catch(e){
          console.log(e);
        }
   });   
  
  }

}
