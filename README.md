# juicebox 2
So, you want to build a Backend API with:

- An Express web server
- A PostgreSQL database

## Local Development

### Setting Up

First, clone this repo locally, then remove the current `.git` folder. Follow this up with making it a new git repo.

```bash
rm -rf .git

git init
```

Then go to GitHub, create a new repository, and add that remote to this local repo.

Then, run `npm install` to install all node modules.

You should decide on a name for your local testing database, and edit `db/config.json` changing the value of `database`.

Once you decide on that name, make sure to run `npm run seed:dev` from your command line so that you can create tables and seed initial data.

#### Project Structure Description

Top level `index.js` is your Express Server. This should be responsible for starting your server, setting up APIs and connecting to your database.

Inside `/db` you have `config.json` which is responsible for configuring the db connection.
By running `npm run seed:dev`, you can create all of your database tables and seed data.
In `index.js`, you can handle all the logics related to CRUD of users, posts and tags.

Inside `api`, you have all the routes on users, posts and tags.

## Deployment

### Setting up Heroku (once)

```bash
$ heroku create

Creating app... done, ⬢ something-31315
https://something-31315.herokuapp.com/ | https://git.heroku.com/something-31315.git

git init

heroku git:remote -a something-31315

git add .
git commit -am "...."
git push heroku master

At this point, git will transfer your files to Heroku\'s servers, and Heroku will start the process of installing the node modules, and running your start script.
After a while, you\'ll see that things are ok, and you can run:

$ heroku config:set JWT_SECRET="don't tell a soul"

Adding config vars and restarting something-31315... done, vXX
JWT_SECRET: YOUR KEY HERE

$ heroku open

You did not yet set up database:

Log in to dashboard.heroku.com
•	Click your app (whatever you named it)
•	Click Resources
•	In "Add-Ons", search for "Heroku Postgres" and click it when it pops up.
•	In the modal that pops up from there, Choose "Hobby Dev - Free" (should be selected by default) and click Provision.

$heroku run npm run seed:dev

Successfully deployed
You can test:
https://something-31315.herokuapp.com/api/posts

API LISTS:

•	Provide endpoints for users
    o	GET /users (see users)
    o	POST /users/register (sign up)
    o	POST /users/login (sign in)
    o	DELETE /users/:userId (deactivate account)
•	Provide endpoints for posts
    o	GET /posts (see posts)
    o	POST /posts (create post)
    o	PATCH /posts/:postId (update post)
    o	DELETE /posts/:postId (deactivate post)
•	Provide endpoints for tags
    o	GET /tags (list of all tags)
    o	GET /tags/:tagName/posts (list of all posts with that tagname)
