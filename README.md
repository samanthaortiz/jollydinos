 ######################################################################################################
      ___           ___           ___                                  ___           ___     
     /\  \         /\__\         /\  \         _____                  /\  \         /\__\    
    /::\  \       /:/ _/_       /::\  \       /::\  \                |::\  \       /:/ _/_   
   /:/\:\__\     /:/ /\__\     /:/\:\  \     /:/\:\  \               |:|:\  \     /:/ /\__\  
  /:/ /:/  /    /:/ /:/ _/_   /:/ /::\  \   /:/  \:\__\            __|:|\:\  \   /:/ /:/ _/_
 /:/_/:/__/___ /:/_/:/ /\__\ /:/_/:/\:\__\ /:/__/ \:|__|          /::::|_\:\__\ /:/_/:/ /\__\
 \:\/:::::/  / \:\/:/ /:/  / \:\/:/  \/__/ \:\  \ /:/  /          \:\~~\  \/__/ \:\/:/ /:/  /
  \::/~~/~~~~   \::/_/:/  /   \::/__/       \:\  /:/  /            \:\  \        \::/_/:/  /
   \:\~~\        \:\/:/  /     \:\  \        \:\/:/  /              \:\  \        \:\/:/  /  
    \:\__\        \::/  /       \:\__\        \::/  /                \:\__\        \::/  /   
     \/__/         \/__/         \/__/         \/__/                  \/__/         \/__/    

#######################################################################################################

# gitHired

> A job task manager that helps user organize job history based on company, position and deadline. Users can setup a progressbar to keep track of the
job hunting process.

## Team

  - __Product Owner__: Ellie Roussopoulos
  - __Scrum Master__: Jack Sapperstein
  - __Development Team Members__: Yueh Chou

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
### Adding a Job
Pressing the "Add Job" button opens a modal containing several text fields. "Company Name" and "Status" are required. Position, Deadline, and Link are optional, and may be filled as the user sees fit. Link is meant to link to a job application posting on LinkedIn or any other site, if available.
### Editing a Job
Clicking the pencil icon will bring the user to an edit menu, where he or she may edit any fields as needed.
The user may also update his or her progress by clicking the related left and right arrows.
### Deleting a Job
Clicking the red X will permanently delete a job from the user's listing.
### Favoriting a Job
Clicking the gold star will "favorite" a job, allowing a user to sort them easily to keep track of their top choices.

## Requirements

- Node v0.10.x (v4.5.0)
- Angular v1.5.8
- Angular-route v1.5.8
- Body-Parser v1.15.2
- Bower v1.7.9
- Cors v2.8.0
- Express v4.14.0
- Mongoose v4.5.10
- Bcrypt v0.0.3
- Passport v0.3.2
- Moment v2.14.1
- Angular-moment v0.10.3

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

- Login Issues:
    a) started out with FB authenication (client side: auth.js/html); Problems connecting USER DB to JOB DB using FB ID && logout works from login page only -- update? Must use old code for server.js, router.js, & DBS that is commented out
                                          ------OR------
    b) current code updated to use passport. User is able to sign up/log in and redirected to profile -- not set up with angular to redirect to job listings (listing button is hard coded to our listing page). Logout button working currectly from profile page not listing view -- update? 
- Add a search filter that will help us narrow down the work search.
- An attachement feature that allows user to link to their local CV letters/resume/etc.
- (Optional) Combine the add and edit modal into one modal.
- A table for "Contact Information"
- Add to user profile (more info requested at sign up?) -- 
- Coding Cleanup("Progress Bar"/)
View the project roadmap [here](LINK_TO_PROJECT_ISSUES)
- If you can, make it prettier lol


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
