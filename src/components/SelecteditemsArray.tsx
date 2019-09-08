class SelectedItemsArray {
  selectedItemsArray = [];

  pushItem(option) {
    this.selectedItemsArray.push(option);
  }

  getArray() {
    return this.selectedItemsArray;
  }
}

export default SelectedItemsArray;
