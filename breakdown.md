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

**What is the end goal which I would like to achieve?**

1. When user click on Remove button for the added item in the cart, only that item gets deleted and rest of the items stays the way they are in the DOM.

- Expected Behaviour:

  - e.g.: Current cart items are:
    1. Pizza
    2. Beer

- Actual Behaviour: User want to delete Pizza from their order.
  - e.g.: after deleting cart items are:
    1. Beer

However, if let's say there are more than two items then the behaviour is unexpected.

- e.g.: User has three items in their cart.
  1. Pizza
  2. Beer
  3. burger

User wish to delete only Burger from their order.

- Expected Behaviour:

  - Cart should has two items left
    1. Pizza
    2. Beer

- Actual Behaviour:
  - Cart is only left with one item.
    1. Beer (the item which was added after Pizza)

**Solution for the issue is:**

1. give an id to the remove button
2. In an "click" eventListener for the document

   - Check if the remove button was clicked
     1. get a hold of the remove button
     2. use **parentElement** property of an HTML element
     - then call **remove()** method on the parent element of that Clicked _Remove button_, and that element will get deleted from the DOM.

**Next Step:**
Calculate the total price of the added items in the cart.

- _Steps:_

  1. create an element in HTML which will display the total price
  2. create a function in JS, which will calculate the total price for the added items.

- **Aside:**
  1. orderedItems array is created at global level
     - Either an item has been added or removed from the cart, the array should get updated.
       **How to?**
       - Breakdown =>
         1. How to add =>
         - If user click on an ADD button =>
           1. create a new object with the item's name and item's price
           2. push that object into an array.
         - If user click on REMOVE button =>
           1. How to delete that object from an array and change the original array.
           - Check if the object's id === id of the clicked button
             - delete that object from an array using spice method which will mutate the original array

**How to update the DOM, when the array of object gets changed?**

1.  Get a hold of the element which displays the total price
2.  update the text content of that element by calling the "getTotalPrice()" function

- update the text content either the item has been added to the cart or it has been removed.
