import { Component, OnInit, } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
// import { Subscription } from "rxjs";
import { dialog } from './dialog.component';
import { AuthService } from "./auth/auth.service";
// import { ErrorService } from "./error/error.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  price: number = 0;
  cartItems = [];
  flag =false
  userIsAuthenticated = false;
  show=true;

  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }
  openDialog(): void {
    this.dialog.open(dialog,{data:this.cartItems});
  
   
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        setTimeout(() => {
          this.userIsAuthenticated = isAuthenticated;
        }, 1000)
      });
  }
  addToCart(amount: number, name: string) {
    let obj = {
      itemName: name,
      value: amount,
      quantity: 1
    }
    if (this.cartItems.length != 0) {
      for (const i in this.cartItems) {
        if (this.cartItems[i].itemName === name) {
           this.flag =true
           console.log('for loop');
          this.cartItems[i].quantity += 1
          this.cartItems[i].value *=2
        }
      }
    }
    if(this.flag===false){
      this.cartItems.push(obj)
    }
    this.flag= false
  }
  onLogout() {
    this.authService.logout();
    this.show=true
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  open(){

    console.log('working');
    this.show=false
  } 

}
