import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    name: string;

    signInFormVisible = true;

    constructor(private userService: UserService) { }


    ngOnInit(): void {

    }

    signInVisible() {
        this.signInFormVisible = true;
    }

    signUpVisible() {
        this.signInFormVisible = false;
    }

    signup() {
        console.log("signup");
        this.userService.signup(this.email, this.password, this.name);
        this.email = "";
        this.password = "";
        this.name = "";
    }

    login() {
        console.log("login");
        this.userService.login(this.email, this.password);
        this.email = "";
        this.password = "";

    }



}
