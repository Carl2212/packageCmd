import { Component, ViewChild } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { AuthService, Company } from "../../auth/auth.module";

@Component({
  templateUrl: "setting-company.html"
})

export class SettingCompany{
  @ViewChild('company') company: NavController;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private viewCtrl : ViewController
  ) {
  }

  ngOnInit() {
    this.company.push(Company);
    this.authService.stateChange.takeUntil(this.viewCtrl.willUnload)
      .subscribe((state: number) => {
        if (state === 32) {
          this.navCtrl.pop();
        }
      });
  }
}