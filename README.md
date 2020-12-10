## Stranger's Things
Building A Front-End, now with CRUD
We are going to be consuming another API, which is hosted at Stranger's Things API.

This one is different, in that it allows us to do more than request data... it also allows us to create data! In order to do this we will have to learn about CRUD (an acronym for Create, Read, Update, Destroy), how to improve our fetch game, and about user authentication via JSON Web Tokens (JWT).

By the end of this you'll have a deeper grasp of what we can do on the front end, and start to have an idea of what's going on inside of servers when we interact with them.

## The Mantra
Data-flow
Remember, like all applications we've developed so far, the overall flow looks like this:

Fetch initial data and build application state
Build initial interface from application state
Attach data to interface where necessary
Set up all event listeners for interface
Event listeners might transform interaction into API requests (THIS IS NEW)
User interaction triggers listeners, which in turn update data in multiple places:
Pass update requests to API (THIS IS NEW)
API returns success or failure for update
On success, update state to reflect change
On failure, render useful error message to user
If state changed, re-render changed portions of interface

## Grading Stranger's Things (Requirements & Mockup)
Common Requirements account for 30% of your grade, where Application Specific Requirements account for 70%.

For each listed requirement or story you can score as follows:

Common Requirement (Instructor/Eng Stories)	Application Specific Requirement (User Stories)
2 Points	Student shows mastery of material	Student has completely fulfilled story requrement
1 Point	Student has partially incorrect understanding of material	Student has partially fulfilled story requirement, with some progress
0 Points	Student has deep misunderstandings of material	Student has not attempted to fulfill the story requirement, or has done so with very little progress
Common Requirements (30%)
As an instructor I want to see you demonstrate mastery (when appropriate) of:

Javascript Basics
variable declaration (correct use of let and const)
loop usage (map, forEach, for or while loops)
control structures (if, else, else if, ternaries)
function declaration
function invocation
usage of basic data types
usage of complex data types, like arrays and objects
AJAX Basics
usage of HTTP Methods (GET/POST/PATCH/DELETE)
handling of asychronous coding for requests
usage of try/catch blocks within async functions
updating the DOM with results of data requests
Front-End Basics including:
DOM Manipulation with jQuery
templating & rendering
event handlers
the (update state -> render -> interact with ui) loop
CSS Basics including:
proper use of Flex / Grid for creating layouts
proper use of cascading and specificity to prevent bleed into unrelated elements
Developing a good User Experience (UX) through a clean interface
As an engineering manager I want to see code (HTML, CSS, and JS) that:

is cleanly written
has no unused functions or variables
has expressive variable, function, and CSS class names
is organized into a coherent flow
Application Specific Requirements (70%)
Your task is to build out a Craigslist-Lite, complete with users, posts, and messages.

Unauthenticated Users should be able to:

See a list of all posts
Sign up for an account with username and password
Sign in with correct username/password combination
Unauthenticated Users should not be able to (neither in the fetch call nor should it "appear" possible in the UI):

Create a new post
Delete any post
Send a message to the author of any post
Authenticated Users should be able to:

Create a new post
Delete a post for which they are the author
Send a message to the author of any post for which they are not the author
See all messages for any post for which they are the author
See all messages they've received in a special view
Authenticated Users should not be able to (neither in the fetch call nor should it "appear" possible in the UI):

Delete posts for which they are not the author
Send a message to themselves
All users should be able to:

Filter posts with a simple text matcher (no fetch call needed here)
Navigate the app without reloading the page (location.reload() or other "hard reload" methods do not count)
Opportunity for EXTRA CREDIT of up to 5% added to your overall score. Authenticated Users would be delighted to be able to:

Edit a post for which they are the author

## Suggested Development Path
While the goal is for you to work through the details of a larger-scale application on your own, and to read and absorb the documentation provided by the API we are using, I have provided some thoughts on the path you might take through the different requirements below.

REGISTER / LOGIN / LOGOUT
Since so much of the app requires users to be able to be logged in, starting here is probably prudent.

First you need to create a form which sends the correct data to the backend. Your register form should have a place to enter a username, a place to enter a password, and a place to enter password confirmation.

Perhaps you want to set a min property on password and username length, and you should definitely make them required on the form inputs.

If the form is filled out sufficiently, you'll need to make a correct AJAX request to the back end (see documentation). On successful user creation, you'll be given a token.

That token will need to be stored somewhere, perhaps localStorage, and sent with all future requests. Any fetch request with a valid token is considered authenticated, and the user corresponding to the token is assumed by the API to be the one making the requests.

Once you can register, you should offer a form to be able to login, and a button to be able to log out.

Remember, the presence of the token in localStorage should be how your front end treats the user as logged in/logged out, for all decisions it needs to make regarding rendering.

It might be useful for you to create some helper functions around this:

logIn - which sets the token in localStorage
logOut - which clears the token in localStorage
isLoggedIn - which lets you know if there's a current user logged in
And also, since you'll need them for fetch requests:

makeHeaders - which creates a headers object with our without the bearer token depending on what is in localStorage
For now, there are some "testing" API routes that let you see if you're currently logged in. You can hit them with fetch with headers (both logged in and logged out), and if you're setting them correctly you'll see the different responses you'll get.

You should also provide feedback on the form if the user provides incorrect credentials, as well as if the user tries to provide bad usernames or passwords.

POST FORM
You should make a form for users to make new listings. The fields for the form should match the fields that the API expects, and the submit button should be intercepted so that you can create the right fetch request.

This form could live in an aside that you show only to logged in users, or on submit you could show a modal that requires a person to sign in/sign up before you create the post. If you choose to show the form for logged in users only, make sure to update the interface whenever the user logs in... not only on page load.

The returned object is the new post. Since your state will keep track of all available posts, it might be wise to add the returned one to that array and call a re-render when it comes back.

POSTS VIEW
Next you should work on providing a pleasant view for all active posts.

As the app loads you should fetch the initial posts, and populate them into the element which holds the posts.

When you make a GET request to /api/posts, if you don't send a token, the API will only provide you with all posts. If you do, the posts made by the active user will also have the messages on them included.

There's an additional field provided by the API, isAuthor, which is only true for posts made by the user represented by the auth token.Make sure to suppress/show certain functionality for posts based on whether or not the current user is in fact the author.

DELETE BUTTON
Your posts should have a way for the active user to delete them, only if isAuthor is true for the post. Go ahead and add that now.

You'll also have to add a click handler to make that DELETE request. For each post, the delete handler will need a way to recover the post._id to help form the correct URL for the request.

On successful delete, make sure to remove that post from the page as well as from the array that is holding all posts in state.

MESSAGES FORM
For any post, you should add a form to send a message to the post author, only if there is a logged in user and the logged in user is not the one who made it.

The message form really only needs a text input, and a button to create the message.

Again, like the delete button, the submit handler will need a way to know how to form the correct URL so that the API responds, so make sure you're recovering it from the post element, if you're attaching it as data to begin with.

LOADING THE USER OBJECT ON PAGE LOAD
On page load, if there is a user logged in, you can make a GET request to /api/users/me and be given a user object. It will have all messages they've received, as well as all posts they've made (with messages partitioned by post).

It would be most useful to do this as part of your bootstrapping whenever the page is loaded.

SEARCH FORM
As part of your listings, add a little search form. Listen to the user typing into the field, and filter the listings in your state based on that. Re-render the filtered listings.

One thing that is tempting is to replace the state with the results of the filter, but this will mean that if the user deletes the filter, or chooses to filter a new term, that you'd have to re-fetch the original list of postings.

Instead, keep a searchTerm in your state, and when you render, render the postList (or whatever you call it) after the filter is applied. Below is a very loose attempt at providing some structure.

let state = {
  posts: [],
  searchTerm: '',
}

function renderPostList(postList) {
  // renders, doesn't care about what's in postList
}

function postMatches(post, text) {
  // return true if any of the fields you want to check against include the text
  // strings have an .includes() method 
}

let filteredPosts = state.posts.filter(post => postMatches(post, state.searchTerm));
renderPostList(filteredPosts) // only renders posts which pass postMatches
