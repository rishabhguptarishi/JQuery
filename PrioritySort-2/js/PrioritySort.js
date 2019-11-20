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
    this.prioritySorting = true;
    this.ascendingOrder = true;
  }

  init(){
    this.setPriorityOfItems();
    this.createButton();
    this.header = $("<h3></h3>").css("display", "inline-block");
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
    let alphabetButton = $("<input>").attr("type", "button").val("Alphabetic Sort").addClass("button").data("type", "alphabetic");
    let priorityButton = $("<input>").attr("type", "button").val("Priority Sort").addClass("button").data("type", "priority");
    let ascending = $("<input>").attr("type", "button").val("Ascending").addClass("button").data("type", "ascending");
    let descending = $("<input>").attr("type", "button").val("Descending").addClass("button").data("type", "descending");
    this.header.append(alphabetButton, priorityButton, ascending, descending);
    this.list.before(this.header);
    this.bindClickToHeaderButtons();
    priorityButton.trigger("click");
    ascending.trigger("click");
  }

  bindClickToHeaderButtons(){
    let _this = this;
    let sortBy;
    let sortingOrder;
    this.header.find("input[type='button']").bind("click", function(){
    var type = $(this).data("type");
    if(type == "alphabetic" || type == "priority"){
      sortBy = type;
      _this.sortByClicked = $(this);
      _this.highlightSortButton($(this));
    }
    if(type == "ascending" || type == "descending"){
      sortingOrder = type;
      _this.sortOrderClicked = $(this);
      _this.highlightOrderButton($(this));
    }
    _this.sortingLists(sortBy, sortingOrder);
    });
  }

  highlightSortButton(button){
    if(this.prioritySorting){
      button.addClass("highlight-button").prev().removeClass("highlight-button");
      this.prioritySorting = false;
    } else {
      button.addClass("highlight-button").next().removeClass("highlight-button");
      this.prioritySorting = true;
    }
  }

  highlightOrderButton(button){
    if(this.ascendingOrder){
      button.addClass("highlight-button").next().removeClass("highlight-button");
      this.ascendingOrder = false;
    } else {
      button.addClass("highlight-button").prev().removeClass("highlight-button");
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
      itemsToShow = this.listItems.length;
      items = this.listItems;
    } else{
      itemsToShow = this.initialCount;
      this.listItems.each(function(index, item){
        if($(item).data("priority-order") > 0){
          items.push(item);
        } else {
          _this.hiddenList.push(item);
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
