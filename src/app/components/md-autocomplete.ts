/**
 * Created by silver_android on 06/12/16.
 */
import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from "@angular/core";

@Component({
  selector: "md-autocomplete",
  templateUrl: 'templates/md-autocomplete.component.html',
})
export class MdAutocomplete implements OnInit {
  @Input('placeholder')
  placeholder: string;

  @Input('required')
  required: boolean = false;

  @Input('items')
  items = [];

  @Input('itemText')
  itemText: string;

  @Input('getMatches')
  getMatches: Function;

  @Input('selectedItem')
  selectedItem;

  @Output()
  selectedItemChange = new EventEmitter();

  @Input('searchText')
  searchText: string;

  @Output()
  searchTextChange = new EventEmitter();

  popupVisible = false;

  private matches = [];

  ngOnInit() {
    this.setMatches();
  }

  onEnter() {
    this.setMatches();
    this.popupVisible = true;
  }

  onLeave() {
    this.popupVisible = true;
  }

  //[(value)] is buggy and does not propagate changes on the md-input so we can get the value correctly
  onKeyUp(event) {
    this.searchText = event.target.value;
    this.searchTextChange.emit(this.searchText);

    this.setMatches();
  }

  select(item) {
    this.selectedItemChange.emit(item);
    this.searchText = item[this.itemText];
    this.popupVisible = false;
  }

  private setMatches() {
    if (this.searchText) {
      this.matches = this.getMatches(this.items, this.itemText, this.searchText);
    } else {
      this.matches = this.items;
    }
  }
}
