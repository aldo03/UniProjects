import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {routerNgProbeToken} from "@angular/router/src/router_module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{

  title = 'app works!';
  input: string;
  username: string;

  constructor(private appService: AppService, private router: Router){}

  getInput(){
    this.input = (<HTMLInputElement>document.getElementById("searchInput")).value;
  }

  login() {
    var user = (<HTMLInputElement>document.getElementById("username")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    if(user==""||password=="") alert("Insert username and password")
    else{
      this.appService.login(user, password).then(result => {
        console.log("USER: " + result.name);
        if (isUndefined(result.name)) {
          console.log("Login Failed");
          alert("Wrong username or password");
        } else {
          console.log("Login Succedeed");
          document.getElementById("logout").setAttribute("style", "display: visible;");
          document.getElementById("login").setAttribute("style", "display: none;");
          (<HTMLElement>document.getElementById("userelem")).innerHTML = 'Hi, '+user;
          document.getElementById("userelem").setAttribute("style", "display: visible;");
          localStorage.setItem("user", user);
        }
      });
    }

  }

  viewProfile(){
    this.username = localStorage.getItem("user");
  }

  logout(){
    document.getElementById("logout").setAttribute("style", "display: none;");
    document.getElementById("login").setAttribute("style", "display: visible;");
    localStorage.removeItem("user");
  }

  ngOnInit(): void {
    if( localStorage.getItem("user")!=null){
      document.getElementById("logout").setAttribute("style", "display: visible;");
      document.getElementById("login").setAttribute("style", "display: none;");
      (<HTMLElement>document.getElementById("userelem")).innerHTML = 'Hi, '+localStorage.getItem("user");
      document.getElementById("userelem").setAttribute("style", "display: visible;");
    }
  }
}
