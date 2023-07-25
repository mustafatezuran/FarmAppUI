import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  providers: [AnimalService]
})

export class AnimalComponent {
  @Input() name: string;
  @Output() refreshParent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private alertify: AlertifyService, private animalService: AnimalService) {}

  deleteAnimal(name: string)
  {
    const animal = {name : name};
    this.animalService.deleteAnimal(animal).subscribe(data => {
      this.refreshParent.emit();
    }, error => {
      this.alertify.error(error);
      this.refreshParent.emit();
    });
  }
}
