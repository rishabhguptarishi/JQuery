class SortingManager{

  constructor(data){
    this.lists = data.lists;
  }

  init(){
    this.createPriorityLists();
  }

  createPriorityLists(){
    this.lists.each(function(index, item){
      let list = new ListSortingManager($(item));
      list.init();
    });
  }
}

class ListSortingManager {

  constructor(list){
    this.list = list;
    this.initialCount = this.list.data("initial-items-count");
    this.listItems = this.list.find("li");
    this.seeAll = false;
    this.prioritySorting = true;
    this.ascendingOrder = true;
  }

  init(){
    this.createButton();
    this.header = $("<h3>").addClass("header");
    this.createButtonsInHeader();
    this.bindClickEvent();
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

  createButtonsInHeader(){
    let _this = this;
    let alphabetButton = $("<input>").attr("type", "button").val("Alphabetic Sort").addClass("button").data("type", "alphabetic");
    alphabetButton.bind('click',function(){
      _this.assignPrioritySort($(this));
    });

    let priorityButton = $("<input>").attr("type", "button").val("Priority Sort").addClass("button").data("type", "priority");
    priorityButton.bind('click',function(){
      _this.assignPrioritySort($(this));
    });

    let ascending = $("<input>").attr("type", "button").val("Ascending").addClass("button").data("type", "ascending");
    ascending.bind('click',function(){
      _this.assignOrderSort($(this));
    });

    let descending = $("<input>").attr("type", "button").val("Descending").addClass("button").data("type", "descending");
    descending.bind('click',function(){
      _this.assignOrderSort($(this));
    });

    this.header.append(alphabetButton, priorityButton, ascending, descending);
    this.list.before(this.header);
    this.setInitialActiveButtons(priorityButton, ascending);
  }

  setInitialActiveButtons(priorityButton, ascending){
    this.sortByClicked = priorityButton;
    this.sortOrderClicked = ascending;
    this.assignPrioritySort(priorityButton);
    this.assignOrderSort(ascending);
  }

  assignPrioritySort(button){
    this.sortByClicked = button;
    this.highlightSortButton(button);
    this.sortingLists(button.data("type"), this.sortOrderClicked.data("type"));
  }

  assignOrderSort(button){
    this.sortOrderClicked = button;
    this.highlightOrderButton(button);
    this.sortingLists(this.sortByClicked.data("type"), button.data("type"));
  }

  highlightSortButton(button){
    if(this.prioritySorting){
      button.addClass("highlight-button").siblings('[value="Alphabetic Sort"]').removeClass("highlight-button");
      this.prioritySorting = false;
    } else {
      button.addClass("highlight-button").siblings('[value="Priority Sort"]').removeClass("highlight-button");
      this.prioritySorting = true;
    }
  }

  highlightOrderButton(button){
    if(this.ascendingOrder){
      button.addClass("highlight-button").siblings('[value="Descending"]').removeClass("highlight-button");
      this.ascendingOrder = false;
    } else {
      button.addClass("highlight-button").siblings('[value="Ascending"]').removeClass("highlight-button");
      this.ascendingOrder = true;
    }
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
      _this.sortingLists(_this.sortByClicked.data("type"), _this.sortOrderClicked.data("type"));
    });
  }

  sortingLists(sortBy, sortingOrder){
    let itemsToShow;
    let items = [];
    let _this = this;
    let sortedList;
    if(this.seeAll){
      this.setPriorityOfItems();
      itemsToShow = this.listItems.length;
      items = this.listItems;
    } else{
      itemsToShow = this.initialCount;
      this.listItems.each(function(index, item){
        if($(item).data("priority-order")){
          items.push(item);
        }
      });
    }
    if(sortBy == "priority"){
      sortedList = this.sortByPriority(sortingOrder, $(items));
    } else{
      sortedList = this.sortByAlphabets(sortingOrder, $(items));
    }
    this.sortedDisplay(sortedList, itemsToShow);
  }

  sortByPriority(sortingOrder, items){
    var priority = items.toArray();
    priority.sort(function(listItem1, listItem2){
      var first = $(listItem1).data("priority-order");
      var second = $(listItem2).data("priority-order");
      if(sortingOrder == "ascending"){
        return first - second;
      } else {
        return second - first;
      }
    });
    return priority;
  }

  sortByAlphabets(sortingOrder, items){
    let allListItems = items.toArray();
    let i = 1;
    allListItems.sort(function(listItem1, listItem2){
      i = (sortingOrder == "ascending") ? 1 : -1;
      if($(listItem1).text() > $(listItem2).text()){
        return 1 * i;
      }
      else{
        return -1 * i;
      }
    });
    return allListItems;
  }

  sortedDisplay(sortedList, itemsToShow){
    let _this = this;
    this.list.empty();
    let visibleList = sortedList.slice(0, itemsToShow);
    this.list.append(visibleList);
  }
}

$(() => {
  data = {
    lists: $("ul.priority-sort"),
  };
  let prioritySort = new SortingManager(data);
  prioritySort.init();
});
