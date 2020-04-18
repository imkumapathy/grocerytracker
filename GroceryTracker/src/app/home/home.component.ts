import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { GroceryService } from '../services/groceryServices'

import { GroceryItem, Item } from '../model/groceryItem'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item;
  itemCount = 1;
  items = [];
  metrics = [];
  addBtnDisabled = false;
  removeBtnDisabled = true;
  groceryItems: GroceryItem[];
  selectedGrocery: any;
  constructor(private http: HttpClient, private groceryService: GroceryService) {
    this.items = [];
    this.metrics = [{ name: 'gallon', type: 'liquid' }, { name: 'liters', type: 'liquid' }, { name: 'kilogram', type: 'solid' }, { name: 'gram', type: 'solid' }]
  }

  ngOnInit(): void {
    this.item = { name: '', id: '', collapsed: false, selectedGrocery: '', personcount: 1 };
    this.item.name = "Item_" + this.itemCount;
    this.item.id = this.itemCount;

    this.items.push(this.item);
    this.getAllItems();

  }

  getAllItems(): void {
    this.groceryService.getAllItems().subscribe(data => {
      let allGroceryItems = data['feed']['entry'];
      let allEnabledGroceryItems = allGroceryItems.filter(x => x.gsx$disabled.$t == "FALSE");

      this.formatData(allEnabledGroceryItems);
    });
  }

  formatData(allEnabledGroceryItems) {
    var groItems: GroceryItem[] = [];
    allEnabledGroceryItems.forEach(element => {
      let groceryItem: GroceryItem = {
        name: element.gsx$name.$t,
        category: element.gsx$category.$t,
        disabled: element.gsx$disabled.$t,
        metric: element.gsx$metric.$t,
        peruse: element.gsx$peruse.$t,
        type: element.gsx$type.$t,
        perUseMinValue: element.gsx$peruseminvalue.$t,
        perUseMetric: element.gsx$perusemetric.$t,
        metricsAvailable: []
      };
      groceryItem.metricsAvailable = this.groceryService.getMetricForGroceryItem(groceryItem.type);
      groItems.push(groceryItem);
    });
    this.groceryItems = groItems;
  }

  getAvailableMetrics(item: GroceryItem): any {
    return
  }

  addItem(): void {
    this.itemCount++;
    this.item = {};
    this.item = { name: "Item_" + this.itemCount, id: this.itemCount, collapsed: false, selectedGrocery: '', personcount: 1 };
    this.items.push(this.item);
    this.expandItem(this.item);
    console.log(this.itemCount);
    this.disableAddButton();
  }

  collapseItem(item): void {
    this.items.forEach(x => x.collapsed = true);
    item.collapsed = true;
  }

  expandItem(item): void {
    this.items.forEach(x => x.collapsed = true);
    item.collapsed = false;
  }

  removeItem(item): void {
    this.itemCount--;
    this.items = this.items.filter(function (itemValue) { return itemValue.id != item.id; })
    this.disableAddButton();

  }

  disableAddButton() {
    if (this.itemCount > 10) {
      this.addBtnDisabled = true;

    }
    else {
      this.addBtnDisabled = false;
    }
    const addItemBtn = document.getElementById('addItemButton');
    addItemBtn['disabled'] = this.addBtnDisabled;
    console.log(this.addBtnDisabled);
  }

  isQuantityYouHaveDisabled(item) {
    if (item.selectedGrocery == null || item.selectedGrocery == '') {
      return true;
    }
    else {
      return false;
    }
  }

  onGroceryItemChange(item: Item) {
    var selectedGroceryItem = this.groceryItems.filter(x => x.name == item.selectedGrocery);
    item.selectedGroceryItem = selectedGroceryItem[0];
    item.metricsAvailable = item.selectedGroceryItem.metricsAvailable;

  }

  onQuantityChange(item: Item) {
    var selectedValue = item.selectedGroceryItem;
    var metric = item.metric;
    var multiplier = this.groceryService.selectMultiplier(item.metric);

    item.numberOfDaysValue = (item.quantity * multiplier) / (item.personcount * item.selectedGroceryItem.perUseMinValue);
  }

}
