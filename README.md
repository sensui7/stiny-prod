# Stiny [![CircleCI](https://circleci.com/gh/sensui7/stiny-prod.svg?style=svg)](https://circleci.com/gh/sensui7/stiny-prod)
Personal website for my girlfriend Ciny and me! We take a lot of photos and do a lot of cooking, so I thought it would be a fun idea to learn/relearn a bunch of technologies I've used at previous internships to build something that we'd both use.

*Still a work in progress; some features left to do below:*
- ~~Google Refresh Token & Keep Logged In~~
- Removing many photos at once
- ~~Editing name & preview photo for recipe~~
- Categorizing recipes (change UI / flexibility)
- Consistent progress bar design for all operations with the backend
- Arrows and easy to navigate photo carousel (more needed)

# Instructions
To run this locally, execute in order:
- `npm install` to install the dependencies
- `npm start` to run the start script

# Backup
- [Snapshot Error](https://stackoverflow.com/questions/56656925/mongoexport-error-failed-failed-to-parse-unrecognized-field-snapshot)
  - Versioning issue; simply use the force table scan flag (scans without usage of id for collections)
- `mongoexport --forceTableScan --host <clusters> --ssl --username admin --password <password> --collection <collection_name> --out <output file name and extension>`
  - Checkout command-line tools for reference on MongoDB Atlas


# Technologies
This project was built with tools/frameworks etc.
- `CircleCI`
  - Great for CI/CD pipeline where a deployment would occur after successful tests
- `Cloudinary`
  - Needed a service to store photos while providing an easy to use API
- `Node.js`
  - A modern platform for building scalable network applications
- `React.js` 
  - A modern library for building user interfaces
- `Materialize CSS` 
  - A modern library for designing user interfaces
- `MongoDB`
  - A modern and flexible NoSQL database
- `Mongoose`
  - An object data modeling library used with Node and MongoDB; great for data validation etc.
- `Jest`
  - Testing library for React code
- `Mocha`
  - Testing library for Node code
- `Heroku`
  - Hosting website
- `MongoDB Atlas`
  - Hosting website for MongoDB
- `TinyMCE`
  - Online rich-text editor; used mostly for the recipes portion of the website
- `Cron Job`
  - To ensure quick access due to Heroku dynos taking breaks after 30 minutes of idle activity
  - https://cron-job.org/en/members/jobs/
