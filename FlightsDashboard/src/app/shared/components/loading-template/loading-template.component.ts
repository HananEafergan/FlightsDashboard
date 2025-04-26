import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-template',
  standalone: false,
  templateUrl: './loading-template.component.html',
  styleUrl: './loading-template.component.scss'
})
export class LoadingTemplateComponent {
  @Input() loadingText: string = 'loading, please wait';
}
