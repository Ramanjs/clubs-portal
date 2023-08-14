# Clubs Portal IIITD

## Qualitative

Q: What problems did you face while implementing a specific feature?
A: During the implementation of the Google OAuth authentication feature using Passport.js and JWT, I encountered a redirect URI error. This error prevented the Google OAuth from functioning correctly. To resolve the issue, I searched for solutions on Stack Overflow, which helped me identify and fix the problem.

Q: How much documentation did you read while implementing a feature?
A: I relied on multiple sources of documentation. Firstly, I referred to the official documentation of Passport.js, the library used for authentication. This documentation unfortunately did not help me a lot in implementing the Google OAuth strategy. Additionally, I had to consult a related blog post that covered the implementation of Google OAuth using Passport.js. The blog post provided practical examples and additional insights into the integration process.

## Quantitative

1. Record the time taken to implement each single feature.

Google Auth: 4 hrs 30 mins
Clubs Portal API: 8 hrs
Backend APIs:
event: 3 hours
club: 4 hours
user: 1 hour

2. How many lines of code to implement a component?
308
400
300

## Time spent on different components and resources used to solve them

1. Setup development environment with typescript and ESlint

I had previously used typescript and eslint in a project but I did not remember the exact steps to take so I referred to the documentaion of typescript and eslint and read some blogs for the same. Took me about __45 minutes__ to setup the environment.

Links:
* [Linting in TypeScript using ESLint and Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier/)
* [How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)

2. Setting up the express server boilerplate

I could have used `express-generator` but decided against it as I wanted to setup a clean project from scratch myself. For this i referred explicitly to the Express documentation, and some best practices I had learnt from my earlier projects to setup the backend server and get it up and running. This part took me about __2 hours__, looking up the docs and implementing error handling right from the start.

Links:
* [Express Guide: Getting Started](https://expressjs.com/en/starter/hello-world.html)

3. Implementing Google OAuth workflow

Google auth is something I had not done before in any of my previous experience but ofcourse I had a genral idea of how to go about implementing it in Express using Passport. Upon searching the passport documentation for examples regarding the setup of Google auth, I found it to be rather confusing and ambiguous. 
There was only one example and I had to refer to Stack Overflow and other blog posts to understand how it was working under the hood and how I would need to integrate it into my server. After setting up the code, I found that it did not work due to a `redirect_uri_mismatch` error. Again I had to search for this error up on Stack Overflow, but even after trying the approaches mentioned I couldn't get it work properly. This part caused me some frustration as I was doing everything correctly but couldn't seem to get rid of the error. However, I did get it to work but when I started trying in another session of coding. It worked this time because apparantly the problem was that the oath creds took time to update the domains of the website, i'm not sure about how that works but it worked after I left it alone for some time. All in all this wasted about __5 hours__.

Links:
* [passport-google-oauth2 vs passport-google-oauth20 packages](https://stackoverflow.com/questions/55777037/passport-google-oauth2-vs-passport-google-oauth20-packages)
* [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)
* [Google OAuth 2 authorization - Error: redirect_uri_mismatch](https://stackoverflow.com/questions/11485271/google-oauth-2-authorization-error-redirect-uri-mismatch)

4. Implementing middleware for authentication and jsonwebtokens

This part was pretty standard. I was aware of the best practices to follow when using the middleware centered approach of the Express framework. So I coded up all the required components also taking hints from some previous projects I had done and the architecture I had used. __Hours taken: 2__. 

5. Formally defining model schemas

Website models were practically defined in the API specification, so here I just coded up the model schemas in mongoose (ORM wrapper for mongodb). Also tested it out on a local mongodb server by writing some test scripts.
__Hours taken: 3__

5. Developing routers and controllers for the APIs

This process was smooth because we had already agreed upon the APIs to create on the backend and what will be each APIs functioning. This process was done along with developing the frontend. After every APIs development, we would make frontend components and pages that depend upon those APIs. This way frontend and backend development went hand in hand.
__Hours taken: 6__

6. Testing

Testing part was important as well. I set up a testing framework using Jest. I wrote the main test script in JavaScript but since most of the codebase was in TypeScript I had to setup a build script that will transpile to JavaScript before running the test script. I had to refactor our server component to make it compatible with `supertest` the testing library for APIs and server. This took some time due to some errors. Then there was mostly writing integration tests for APIs, which also took significant time.
__Hours taken: 6__

Links:
* [Jest/Supertest errors with TypeError: app.address is not a function](https://stackoverflow.com/questions/65719047/jest-supertest-errors-with-typeerror-app-address-is-not-a-function)
