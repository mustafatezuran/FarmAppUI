import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Animal } from "../models/animal";
import { environment } from "../../environments/environment";

@Injectable()
export class AnimalService {
    url = environment.animalServiceUrl;

    constructor(private http: HttpClient){}

    getAnimals() : Observable<Animal[]> {
        return this.http.get<Animal[]>(this.url)
        .pipe(
            catchError(this.handleError)
        );
    }

    addAnimal(animal: Animal): Observable<Animal>
    {
        return this.http.post<Animal>(this.url, animal)
        .pipe(
            catchError(this.handleError)
        );
    }

    deleteAnimal(animal: Animal): Observable<any>
    {
        const deleteUrl = `${this.url}/${animal.name}`; 

        return this.http.delete(deleteUrl)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse)
    {
        console.log(error);

        if(error.status == 404)
            return throwError("Not found");
        else if(error.status == 0)
            return throwError("An unexpected error occured");
        
        return throwError(error.error);
    }
}