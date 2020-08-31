# Sublit
*SubLit is a platform where students can post listings and students looking to sublet can find places. They can then chat in the web app to discuss a sublet agreement.*

Sublit team:

<img width="608" alt="Screen Shot 2020-08-13 at 1 43 43 PM" src="https://user-images.githubusercontent.com/62867125/90168444-17472880-dd6b-11ea-922d-962cfbbc5aeb.png">

## Final Site
### What worked
All of the components are connected and functional on the frontend and backend. Users are able to sign up/in, and once authorized, can post listings, browse them, edit/delete listings, and chat each other. This application supports all the integral functionality for a subletting site.

### What Didn't 
The page throws an error on the main page saying that Google Javascript API loads twice, but we haven't noticed any actual errors and are not sure how to debug this after multiple meetings. We also ran into a few debugging difficulties with filtering, so we chose to not implement searching for listings by address, name, etc. as originally planned.

## Architecture

There are five pages in this web app:  
1. sign in/up: where users can create accounts or sign in. checks for a @dartmouth.edu email address. sends email for verification, which is required to access site.
2. main page: all the listings are here stored here. a map using GoogleMaps API displays all listings with pins. users can filter listings by date available, rooms available, rent, and whether the listing is a full house/apartment. 
3. single listing: each listing expands into its own page with more detail and information, including images and the ability to message the user. if this is your listing, you have the ability to edit or delete it.
4. new listing: students with leases can create a new listing.
5. chat: where students can talk to one another about listings.

We're using Boostrap to help design the app. 


## Setup

1. `yarn install`
2. `yarn start`

## Deployment

The page is deployed on surge, and the listings and users are stored in mongoDB's cloud services. 
[deployed site](https://sublit.surge.sh/)

### To Deploy
1. `yarn deploy`


## Authors
Caroline Tornquist, Chase Krivickas, Jack Vasu, Jonah Kalsner Kershen, Matthew Roth, Sada Nichols-Worley
