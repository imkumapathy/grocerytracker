export class Item{
    name:string;
    id:string;
    collapsed: boolean;
    selectedGrocery:string;  
    selectedGroceryItem: GroceryItem;
    metricsAvailable: string[];
    metric: string;
    numberOfDaysValue:number;
    personcount:number;
    quantity:number;
}

export class GroceryItem{
    name:string;
    category:string;
    peruse:number;
    metric: string;
    type:string;
    disabled:string;
    metricsAvailable:string[];
    perUseMinValue: number;
    perUseMetric: string;

}