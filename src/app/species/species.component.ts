import { Component } from '@angular/core';

@Component({
  selector: 'species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent {
  species: string[] = ["All Animal Species", "Panthera", "Canis", "Felis", "Elephas", "Gorilla"];
}
