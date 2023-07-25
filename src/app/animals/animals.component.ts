import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { AlertifyService } from '../services/alertify.service';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  providers: [AnimalService]
})

export class AnimalsComponent implements OnInit {

  animals: Animal[] = [];
  error: any;

  constructor(private alertify: AlertifyService, private animalService: AnimalService) {}

  ngOnInit(): void {
    this.getAnimals();
  }

  addAnimal(nameInput: any)
  {
    if(nameInput.value.trim() === "")
    {
      this.alertify.warning("Please enter the name of animal!");
      return;
    }

    const animal = {name : nameInput.value.trim()};

    this.animalService.addAnimal(animal).subscribe(data => {
      nameInput.value = "";
      this.getAnimals();
    }, error => {
      this.alertify.error(error);
      this.getAnimals();
    });
  }

  getAnimals(){
    this.animalService.getAnimals().subscribe(data => {
      this.animals = data;
    }, error => this.error = error);
  }
}
