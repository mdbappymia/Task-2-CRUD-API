# Task 2: Product CRUD APP/API

## This api work on localhost

- **CRUD routes:** It should be able to create, read, update, delete unique/single category and products.

- Create product api: http://localhost:5000/products [post request]
- Get products api: http://localhost:5000/products [get request, 20 product at a time]
- Update product api: http://localhost:5000/products/id [put request]
- Delete product api: http://localhost:5000/products/id [delete request]
- Get a single product api: http://localhost:5000/products/id [get request]

- **Categories route:** It should list all categories and the numbers of products inside each categories.
- Category list and number product in a category api: http://localhost:5000/category [get request]
- **Category route:** It should be able to list all products inside category with number of products inside it.
- Get a list of product base on category: http://localhost:5000/category/categoryName [get request]
- **Products route:** The main listing page/api should be able to load and show a specific amount of products.
- The main api is load 20 item of product. Api link: http://localhost:5000 [get request]
- **Product route:** A product must have title, description, price, category, creation and updating time. Product image is optional.
- Update api: http://localhost:5000/products/id [put request]
- **Search Route:** There should be a search route that allows searching through the products by title and description, then **filter** and **sort** them based on price, create and update time.
- Search by title api : http://localhost:5000/search?title=bus [get request]
- Search by description: http://localhost:5000/search?description=hello [get request]
- Sort by price api: http://localhost:5000/sortBy/price [get request]
- Sort by creation time: http://localhost:5000/sortBy/creationTime [get request]
