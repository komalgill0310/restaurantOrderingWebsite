How to render the ordered items on the DOM, when user click on "+" button

1. What needs to update in HTML in order to display the item which user wish to order.
   - Ordered-items div inside a main section
     1. How to update the HTML of the pre-checkout-state's section.
        - Breakdown:
          1. Attach an EventListener to the entire document
             1. First Detect if the "+" button was clicked.
                - Give a data-attribute the "+" button
                - Check if the data-attribute of a clicked button is data-attribute' name
                  1. Call handleAddItemClick(data-attribute's name)
                     - this function will update the display property to "Block" level of pre-checkout-state
                     - Call renderOrderedItems(data-attribute's name)
                       1. This function will update the HTMl of the div of id = Ordered-items
                       - It will call another function => getMenuItemsHtml(data-attribute's name)
                         1. this function will create an empty string
                         2. Call another function => getOrderedItems(data-attribute's name)
                         - loop through a returned array of object from getOrderedItem()
                           1. Store that data into a empty string variable locally
                           2. Return that string variable
                         - this function will create an object for the item which user would like to place an order for.
                           - Obj = {
                             name: name of the item,
                             price: price of the item,
                             id: data-attribute's value
                             }
                         - Create an empty array at global level
                         - push that object to an array
                         - return that array

How to remove an item from the DOM when user click on the "remove" button

1. First Detect if the "remove" button was clicked using the data-attribute's name

   - handleRemoveItemclick(data-attribute's name)
     1. This function will call another function => removeItemFromCart(data-attribute's name),
        - it will delete the Object with that key from the array.

2. How to update the DOM when the item has been removed from the array.

- What needs to update in DOM
  1. Update the HTML of ordered-items's div
  - What functions are rendering the items on the Div when clicked on an "add" button
    1. renderOrderedItem
    2. getMenuItemHtml
    3. getOrderedItems
    - this function is pushing an object to an array when click on an "add" button
    - Made a condition
      1. if the parameter's value === add button dataset's value
      - then only create a new object and push that object into an array.
      - otherwise just return an array of object.
        - cause, removeItemFromCart() will update the array of object globally.

**Issue:**

- Inside renderOrderItem(), _Logic is:_
  1. Whatever the HTML is already there, display that HTML and also display whatever the output you get from calling getMenuItemsHtml
     **Work on this logic => so that only the item which user wish to delete, gets deleted and rest of the DOM, stays the way it is.**
