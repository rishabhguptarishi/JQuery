class PrioritySort{

  constructor(data){
    this.lists = data.lists;
  }

  init(){
    this.createPriorityLists();
  }

  createPriorityLists(){
    this.lists.each(function(index, item){
      let list = new PriorityList($(item));
      list.init();
    });
  }
}

class PriorityList{

  constructor(list){
    this.list = list;
    this.initialCount = this.list.data("initial-items-count");
    this.listItems = this.list.find("li");
    this.seeAll = false;
    this.hiddenList = [];
  }

  init(){
    this.setPriorityOfItems();
    this.createButton();
    this.bindClickEvent();
    this.show();
  }

  setPriorityOfItems(){
    this.listItems.each(function(index, item){
      if(!$(item).data("priority-order")){
        $(item).data("priority-order", 0);
      }
    });
  }

  createButton(){
    this.button = $("<input>").attr("type", "button").val("See All");
    this.list.after(this.button);
  }

  bindClickEvent(){
    let _this = this;
    this.button.bind("click", function(){
      if(_this.seeAll){
        $(this).val("See All");
        _this.seeAll = false;
      } else {
        $(this).val("See less");
        _this.seeAll = true;
      }
      _this.show();
    });
  }

  show(){
    let itemsToShow;
    let items = [];
    let _this = this;
    let sortedList;
    if(this.seeAll){
      itemsToShow = this.listItems.length;
      items = this.listItems;
      sortedList = this.sortByAlphabets($(items));
    } else{
      itemsToShow = this.initialCount;
      this.listItems.each(function(index, item){
        if($(item).data("priority-order")> 0){
          items.push(item);
        } else {
          _this.hiddenList.push(item);
        }
      });
      sortedList = this.sortByPriority($(items));
    }
    this.sortedDisplay(sortedList, itemsToShow);
  }

  sortByPriority(items){
    let priority = items.toArray();
    priority.sort(function(listItem1, listItem2){
      let first = $(listItem1).data("priority-order");
      let second = $(listItem2).data("priority-order");
      return first - second;
    });
    return priority;
  }

  sortByAlphabets(items){
    let allListItems = items.toArray();
    allListItems.sort(function(listItem1, listItem2){
      if($(listItem1).text() > $(listItem2).text()){
        return 1;
      }
      else{
        return -1;
      }
    });
    return allListItems;
  }

  sortedDisplay(sortedList, itemsToShow){
    let _this = this;
    $(sortedList).show();
    let visibleList = sortedList.slice(0, itemsToShow);
    this.hiddenList.push(sortedList.slice(itemsToShow, sortedList.length));
    this.hiddenList.forEach(function(item, index){
      $(item).hide();
    })
    visibleList.forEach(function(item, index){
      _this.list.append($(item));
    })
    this.hiddenList = [];
  }
}

$(() => {
  data = {
    lists: $("ul.priority-sort"),
  };
  let prioritySort = new PrioritySort(data);
  prioritySort.init();
});
