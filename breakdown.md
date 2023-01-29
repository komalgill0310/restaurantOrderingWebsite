**End Goal:**

1. Have the image change related to each section after 15 second✅

Breakdown:

1. create an images folder
2. Find images related to the food which the restaurant will sell
3. store the images in the folder one by one
4. Figure out a way to get the images from the folder dynamically

- Store the images link in an array
- run a for loop on the array
  - Parameters would be: i = 0; i < imagesLink.length; i++
- create random number inside for loop
  - range of random Number will be: 0 till imagesLink.length - 1
- get a hold of the img element which was created in html
- update the img source with the imgLinksArray[randomNum]
- console.log(the imgLinksArray[randomNum])

2. Once you are able to finish the step 1
3. create a set interval => for 1500 second

- Inside set interval, call the function
  ✅

**Next Goal:**

1. call the getRandomImagesLink function dynamically

- call the function with different arguments
- replace the obj's property dynamically
  - In order to replace the prop, use the square bracket notation method

have this image display only when that category is selected.

1. work on displaying pizza images.

Breakdown:

1. First user will click on the pizza div
2. then call this function
3. inside where it is displaying the items of that section
4. At the top, display the images related to that section

Steps to reach there:
**HTML PART=>** ✅

1. create an img element in the section where, the items related to that section is gettting added using JS
2. Section name is: **menu-section-after-clicking**
3. create an image element inside that element
4. set it's src to an empty string

**JS PART=>**✅

1. Get a hold of the image element inside the getImagesLink function
2. update the source of the image element
3. call setInterval on the getImage function

- call setInterval inside the function which is rendering the menu-items on the page

**Next Goal:**

1. Add the images related to each menu-sections in the object

**NEXT GOAL:**

1. Fix the header of the app

Breakdown:

1. update the id and class name for the header if it not clear enough
2. Set the header width and height
