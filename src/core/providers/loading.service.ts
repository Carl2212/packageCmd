import { Injectable } from '@angular/core';
import { Loading, LoadingController, LoadingOptions } from "ionic-angular";

@Injectable()
export class LoadingService {
  private loader : Loading;

  constructor(
    private loading: LoadingController) {
      this.create();
  }

  create(opt? : LoadingOptions) {
    this.loader = this.loading.create(opt)
    return this.loader;
  }

  dismiss() {
    this.loader.dismiss();
  }
}
