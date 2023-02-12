💡 **List out things needs to accomplish in order to submit this project:**

4. If an item is already present in the cart and user tried to add the same item, then the item in the cart should display something like that:

- Example:
  - cartItemName x total number of items price should be double

8. Bug:

- Sometimes when there are similar items in the cart, user removes few of them and some are still left, the total price gets to 0.

- if there are similar items in the cart and the user delete an item but the similar one is still present in the cart, the array's length decreased by two => Meaning all of the items related to deleted items gets deleted from the cart.

<!-- BREAKDOWN -->

**QUESTIONS:**
Root Cause: Because each of the similar elements will have same id

**Solution:**
If each element will have unique Id

<!-- STEPS -->

1. create uuid in data.js for each of the object.
2. Check if uuid is the same when you call that in js

<!--  -->

9. Alter the position of the footer and made it stick to the bottom of the page.

10. Code Refactoring

11. Change variable names to more descriptive names

12. Style the back button below the header so user can see it.

13. If there is time:

- let the user add the review for the item
- Let the user add rating to their experience.

15. When none of the items are left in the cart, price section should display to none

16. complete Order button should display to none.

<!-- BREAKDOWN THE EVENT LISTENERS INTO THEIR OWN PART -->

1. Extract the events for the menu-sections into their own function
2. store the add and remove click event into their own function
3. Store the checkout, pay, close event into their own function
