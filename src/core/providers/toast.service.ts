import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {
    
  }

  success(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      cssClass: 'success',
    });
    toast.present();
  }

  warning(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: 'warning',
    });
    toast.present();
  }

  error(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: 'error',
    });
    toast.present();
  }
}