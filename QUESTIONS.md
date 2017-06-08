##QUESTIONS

1) How do we find what port we're on??????
2) In auth.filters.js (in server folder): are these filters <routes>?? Why are they 'req/res/next'? Why do they requier 'next' to move on? It's just a function being CALLED from a route, isn't it?....


//NOTES FOR OAUTH SECRETS

//secrets.js
const {env} = require('APP');

env.GITHUB_CLIENT_ID = 'ak;lsdjfla;sdjkf;asdjlkf;asdfsd;';

then require it in at the START and gitignore it!!!

//.gitignore

add just "secrets.js" to .gitignore file