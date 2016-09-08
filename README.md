# gitHired

> A job task manager that helps user organize job history based on company, position and deadline. Users can setup a progressbar to keep track of the
job hunting process.

## Table of Contents

1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. Considerations
    3. [Road Map](#roadmap)
<!-- 6. [Contributing](#contributing) -->

## Team

  - __Product Owner__: Ellie Roussopoulos
  - __Scrum Master__: Jack Sapperstein
  - __Development Team Members__: Yueh Chou

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

### Considerations
- Modals are currently implemented in totally different ways. Compare what happens when you click "Add Job" button in listing to when you click the Edit button for a job. Edit button needs to be done as it is because it needs to call $uibModal.open, so that it can have access to the "resolve" key.
- There are 3 unique spots in the app which independently reference the different possible statuses a user can set:
  - progressionArr, in listing.js. This is used as an array so we can easily increment progression by 1, and so that we can utilize ng-options.
  - progressionObj, in listing.js. This is used as an obj so we can easily find the values associated with a given status name with minimal time complexity.
  - orders, in router.js. This is used to add a numerical "order" based on status, so that jobs can be sorted by status.

### Roadmap

- Bugs
  - Using edit modal currently live-updates the page. Should not update page until submit button is pressed.
  - Modal close transitions are inconsistent. Add job fades out, but edit/delete instantly disappear. Add job currently is implemented in a different way, so maybe implement it as edit is.
- Add a search filter that will help to narrow down the work search. (This may already be in place)
- Synergy with LinkedIn. Embedded feed with suggested jobs, icon directly on linkedin which adds it to your listing, etc.
- Instead of deleting jobs, send them to an "archive" so that you can retrieve them later if needed. Especially because you may not want to include accepted/declined jobs.
- An attachment feature that allows user to link to their local cover letters, resume, etc.
- Addl fields. Contact info, salary, etc. Doesn't necessarily have to be shown outside of EDIT modal
- Expand user profile. Perhaps request more info on signup.
- Coding Cleanup
Progress Bar - Current implementation is extremely WET and uses some static variables. Totally functional but if you change how it works, errors are likely.
Combine the add and edit modal into one modal.
- If you can, make it prettier lol
