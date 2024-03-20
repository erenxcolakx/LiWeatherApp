function scrollHorizontally(container, event) {
    var scrollAmount = 130; // You can adjust the scroll amount as needed
    container.scrollLeft += event.deltaY > 0 ? scrollAmount : -scrollAmount;
    event.preventDefault();
  }