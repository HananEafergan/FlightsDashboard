import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Worker } from '../../../../models/worker.model';

@Component({
  selector: 'app-workers-list',
  standalone: false,
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.scss'
})
export class WorkersListComponent {
  @Input() workers: Worker[] = [];
  @Output() workerSelected: EventEmitter<number> = new EventEmitter<number>();

  selectWorker(worker: Worker){
    this.workerSelected.emit(worker.id);
  }
}
