# BYTEBITE

## LINKS

[Bytebite](TBD.url)
<br/>
[API Docs](https://github.com/bmj1988/byte-bite/wiki)
<br/>
## ABOUT

[![Image from Gyazo](https://i.gyazo.com/616b0d03b97d5cd66d8e9cb4ebbc8570.gif)](https://gyazo.com/616b0d03b97d5cd66d8e9cb4ebbc8570)

Bytebite is an attempt to build Ubereats as faithfully as possible using a Flask backend and React frontend, for educational purposes.

### TEAM

[Gerrod](https://github.com/gerrodww)
<br/>
[Daniel](https://github.com/dlegendre1)
<br/>
[Brian](https://github.com/bmj1988)

### Dockerimage

[Dockerhub](https://hub.docker.com/r/bmj1988/bytebiteimg/)
<br/>
Image: docker.io/bmj1988/bytebiteimg:latest
<br/>
[Deployed](https://byte-bite-img.onrender.com/)

### TECH

SQLite - Development database
<br/>
Render - Production database (Postgresql) and deployment
<br/>
Flask - API server
<br/>
SQLAlchemy - ORM
<br/>
Alembic - Seeding
<br/>
React - Frontend design
<br/>
React-Icons - Various icons
<br/>
Inkscape - Custom SVG Design

### FEATURES

[![Image from Gyazo](https://i.gyazo.com/735ac14b8a052dd86ced2b75cb54fb0b.jpg)](https://gyazo.com/735ac14b8a052dd86ced2b75cb54fb0b)


Bytebite is a clone of UberEats developed for educational purposes by Brian John, Gerrod White, and Daniel Legendre for App Academy. The purpose for the project was to work as a team to create a web application with a Flask backend to culminate the Python portion of the curriculum. Bytebite is meant to provide the software side of a food delivery service which delivers an order from a user to a restaurant, from a restaurant to a driver and from the driver to the user.

### Orders

[![Image from Gyazo](https://i.gyazo.com/3c8def50cff64a735780ad7c55dd89d4.png)](https://gyazo.com/3c8def50cff64a735780ad7c55dd89d4)

[![Image from Gyazo](https://i.gyazo.com/23372e3a4ab5bd91aefb64ae66703308.png)](https://gyazo.com/23372e3a4ab5bd91aefb64ae66703308)

Orders can be created by adding any item from any restaurant to the user's cart. The items in the order and their cost can be accessed at any time from the user's shopping cart located in the navigation bar. The order can be deleted at any time from the cart interface, and also taken to checkout where they will be prompted for payment information and desired delivery options. Old orders are archived in the Order History tab of the menu, and usual or favorite orders can be reordered with the click of a button.

### Restaurants

[![Image from Gyazo](https://i.gyazo.com/3bb06f85c180da280ccad4d9ca9db117.png)](https://gyazo.com/3bb06f85c180da280ccad4d9ca9db117)

Restaurants can be created from the restaurant form page in the options menu. Once a restaurant is created, it is published to the Bytebite main feed where other users can order from it. The restaurants can be managed, edited, and deleted at any time from the manage restaurants page. Restaurants can be searched by name in the search bar so a user can quickly find their favorite restaurant.

### Menu Items

[![Image from Gyazo](https://i.gyazo.com/9dda37a871389c259127fb72dfad1630.jpg)](https://gyazo.com/9dda37a871389c259127fb72dfad1630)

Restaurants all serve menu items. These are represented to the user via image and text descriptions. They can be updated seamlessly through the restaurant management page.

### Reviews

[![Image from Gyazo](https://i.gyazo.com/426a082a269cf188399e70edbdfba9b4.png)](https://gyazo.com/426a082a269cf188399e70edbdfba9b4)

Users can leave reviews on restaurants letting other users and the restaurants know their experiences. These reviews are displayed prominently at the top of a restaurant's page and the ratings are aggregated so that users can tell at a glance how well-liked a restaurant is. Reviews can be updated or deleted at any time through the users reviews page.
