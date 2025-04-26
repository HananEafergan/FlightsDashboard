import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { LoadingTemplateComponent } from './components/loading-template/loading-template.component';



@NgModule({
  declarations: [
    DurationPipe,
    LoadingTemplateComponent
  ],
  imports: [
  CommonModule
  ],
  exports: [DurationPipe, LoadingTemplateComponent]
})
export class SharedModule { }
