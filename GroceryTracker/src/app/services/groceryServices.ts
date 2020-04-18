import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/index";
import { GroceryItem } from '../model/groceryItem';

@Injectable()
export class GroceryService {

    constructor(private http: HttpClient) {

    }

    getAllItems(): Observable<any[]> {
        const groceryUrl = "https://spreadsheets.google.com/feeds/list/1pMquzdl7L2GOuVochklHjIxVC7BRPVf06ebdmvOPVSU/1/public/values?alt=json";

        return this.http.get<any>(groceryUrl);
    }

    getTypeCategories() {
        const categories = ["pieces", "weight", "volume"]
    }

    getWeightMetrics(): string[] {
        //const weightMetrics = ["tablespoon", "spoon","cups","scoop", "ounce", "pounds", "miligrams", "gram", "kilogram"];
        const weightMetrics = ["pounds", "ounce", "gram", "kilogram"];
        return weightMetrics;
    }

    getVolumeMetrics(): string[] {
        const volumeMetrics = ["liter", "gallon", "glass"]
        return volumeMetrics;
    }

    getPiecesMetrics(): string[] {
        const piecesMetrics = ["pieces"];
        return piecesMetrics;
    }
    getMetricForGroceryItem(itemType): string[] {
        if (itemType == "weight") {
            return this.getWeightMetrics();
        }
        if (itemType == "volume") {
            return this.getVolumeMetrics();
        }
        if (itemType == "pieces") {
            return this.getPiecesMetrics();
        }
    }

    selectMultiplier(selectedWeight): number {
        var multiplier = 1;
        switch (selectedWeight) {
            case "ounce":
                //grams to ounce
                multiplier = 28.35;
                break;
            case "gram":
                multiplier = 1;
                break;
            case "kilogram":
                multiplier = 1000;
                break;
                case "pounds":
                    multiplier = 453.592;

        }

        return multiplier;
    }

}