# Pic'd Up
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description 
  Pic'd Up provides a space for photographers and potential clients to connect. 

  ### Photographers
  Photographers can showcase their work, uploading images to their profiles and adding a short bio. 
  ### Clients
  Clients can browse photographer's work and receive contact information to book the perfect photographer for their event.

  ## Table of Contents
  * [Links](#links)
  * [Techonologies](#techonologies)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributors](#contributors)
  * [Questions](#questions)
  * [License](#license)
  
  ## Links
  Production Site: [`waterwaysrentals.herokuapp.com`](https://waterwaysrentals.herokuapp.com/)<br/>
  GitHub Repo: [`justpuzey/water-sports-xchange`](https://github.com/justpuzey/water-sports-xchange/)
  
  ## Techonologies
  Water Ways uses Model-View-Controller web application framework to control data, routes, and render the UI

  * Express - Web framework used for managing routes
  * Sequelize - Utilizes models to manage MySQL data structures
  * Handlebars - Leverages templates to generate front-end views
  * Stripe - The site relies on Stripe for cart/checkout functions including payment processing and PCI data storage
  * express session - middleware used to assits in user session managment
  * bcrypt - Used for user password hashing
  
  ## Installation
  <p><i>Steps required to install application, dependencies and configure the environment:</i></p>

  1. Navigate to the root folder
  2. Create dotenv folder to store DB Name, User Name, and Password for MySQL database as well as the non-public key for Stripe
  3. Use the command prompt to enter command: `npm install` to install dependencies

  ## Usage
  <p><i>Instructions for application usage including examples:</i></p>

  ### Home Page
  From the home page, users can login, or select a category to browse available product
  ![home page](./public/assets/home.png)

  ### Product List Page
  The product list page allows users to view current product by category, or select All in the nav to view all available product. Users can select product to view more information
  ![product list page](./public/assets/product-list.png)

  ### Product Detail Page
  The Product Detail Page shows additional information about the item and allows users to select a button to begin checkout process
  ![product detail page](./public/assets/product-detail.png)
  
   ### Checkout
   Test Credit Card #: 4242424242424242
   EXP Date: any date in future
   CVC: any 3 digit #

  ## Contributors
  <p><i>Project Contributors/Authors:</i></p>
  * Justin Puzey
  * Christina Pagan
  * Andres
  * Candice Whiskey

  ## License
  The MIT License
  
  