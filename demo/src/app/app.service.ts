import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { STORE_LIST } from '../config/app.store';
import { CoreStore, LangService, ProfileService } from "mobility-lib";

@Injectable()
export class AppInit {
  private asyncInitPromises: Promise<any>[] = [];

  constructor(
    private storage: Storage,
    private store: CoreStore,
    private langService: LangService,
    private pfService : ProfileService
  ) {
    this.init();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      Promise.all(this.asyncInitPromises)
        .then(()=>{
          this.store.onChange.subscribe(data => {
            this.storage.set(data.name, data.value);
          });
          return this.pfService.load();
        })
        .then(()=>{
          this.langService.setLang();
          resolve(true)
        });
    })
    }

  init(): void {
    STORE_LIST.forEach(name => {
      let promise = this.storage.get(name);
      this.asyncInitPromises.push(promise);
      promise.then(data => {
        if (data) {
          this.store[name] = data;
        }
      });
    });
  }
}