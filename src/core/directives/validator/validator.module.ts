import { NgModule } from '@angular/core';
import { UniqueValidator } from "./unique.validator";


@NgModule({
  declarations: [
    UniqueValidator
  ],
  exports: [
    UniqueValidator
  ]
})
export class ValidatorModule {

}
