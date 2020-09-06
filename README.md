# Sublit
*SubLit is a platform where students can post listings and students looking to sublet can find places. They can then chat in the web app to discuss a sublet agreement. This is the repository for the front end. API is deployed on Heroku at https://sublit-cs52-project.herokuapp.com/*

## Technical Overview

#### Languages
  * ES6 JavaScript
  * HTML for structure
  * CSS for styling
  
#### Libraries
  * `React.js` for components
  * `Redux.js` for managing state
  
#### APIs
  * Our own API for managing listings (CRUD), authentication, and chat
  * `Google Maps JavaScript` API for displaying map of Hanover with markers and auto-completing address in `new_listing.js`

#### Cloud Services
  * MongoDB used on API
  * AWS S3 used for image uploading

## Project Structure
* `src/`
  * `components/`
    * overview of main components below
   * `actions/`
     * `index.js`
       * contains actions for:
          * performing CRUD operations on listings 
          * authorizing/deauthorizing users (sign in/up and sign out) 
          * creating conversations and sending/getting messages
          * handling errors
   * `reducers/`
     * `listings_reducer.js`: manages all lisstings and current listings
     * `auth_reducer.js`: manages authorizing/deauthorizing user and storing user object
     * `chat_reducer.js`: manages list of conversations and current conversation
     * `error_reducer.js`: manages whether there is an error and if so stores error message 
    
    
    
## Components

There are five pages in this web app:  
1. `sign_in.js` and `sign_up.js`: where users can create accounts or sign in. checks for a @dartmouth.edu email address. sends email for verification, which is required to access site.
2. `main_page.js`: all the listings are here stored here. a map using GoogleMaps API displays all listings with pins. users can filter listings by date available, rooms available, rent, and whether the listing is a full house/apartment. 
3. `listing.js`: each listing expands into its own page with more detail and information, including images and the ability to message the user. if this is your listing, you have the ability to edit or delete it.
4. `new_listing.js`: students with leases can create a new listing.
5. `chat.js` and `convo.js`: where students can talk to one another about listings.


## Setup
1. `git clone https://github.com/mattroth17/sublit`
2. `yarn install`
3. `yarn start`

### To Connect to Local API
* switch out `ROOT_URL` in `src/actions/index.js` by commenting out heroku url and uncommenting localhost url

## Deployment

The page is deployed on surge, and the listings and users are stored in mongoDB's cloud services. 
[deployed site](https://sublit.surge.sh/)

* Page is also now deployed at sublit.io

### To Deploy
1. `yarn deploy`

## Authors
Caroline Tornquist, Chase Krivickas, Jack Vasu, Jonah Kalsner Kershen, Matthew Roth, Sada Nichols-Worley

## Screen Caps

#### Landing Page
<img width="1353" alt="Screen Shot 2020-09-05 at 8 21 54 PM" src="https://user-images.githubusercontent.com/59703535/92316116-72102080-efb5-11ea-9021-7a02e068eaf5.png">

#### Main Page 
<img width="1362" alt="Screen Shot 2020-09-05 at 8 23 16 PM" src="https://user-images.githubusercontent.com/59703535/92316125-a2f05580-efb5-11ea-9ec3-9d7589226669.png">

#### Chat
<img width="1371" alt="Screen Shot 2020-09-05 at 8 24 02 PM" src="https://user-images.githubusercontent.com/59703535/92316129-bef3f700-efb5-11ea-9d13-48460f66f0bc.png">

#### Listing
<img width="1358" alt="Screen Shot 2020-09-05 at 8 24 32 PM" src="https://user-images.githubusercontent.com/59703535/92316134-d0d59a00-efb5-11ea-9d39-824e276eb776.png">
