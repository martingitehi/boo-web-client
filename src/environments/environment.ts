// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiConfig:{
    baseUrl: 'http://192.168.137.1:3000/api/',
    authUrl: 'http://192.168.137.1:3000/auth/'
  },
  firebase: {
    apiKey: "AIzaSyCjBF66UIKv9QqBojQUyN11m5lYDnr4cTk",
    authDomain: "boo-app-3e2f2.firebaseapp.com",
    databaseURL: "https://boo-app-3e2f2.firebaseio.com",
    projectId: "boo-app-3e2f2",
    storageBucket: "boo-app-3e2f2.appspot.com",
    messagingSenderId: "50927489917"
  }
};
