# A11y Branch Locator

An accessible Storefinder with search leveraging Google Maps API

## Project dependencies

- [Node](https://nodejs.org/en/download/) : to run `gulp`.
- [NPM](https://www.npmjs.com/get-npm) : also to run `gulp`.
- [Gulp](https://gulpjs.com/) : for compiling, minimizing and linting scss, js and .hbs templates.
- [Handlebars](https://handlebarsjs.com/) : for partials and js templates
- [SCSS/SASS](https://sass-lang.com/) : for css authorship.
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) : for handling the lookups and radius logic.

## Project Setup

This is a static build, using Gulp for task running. It includes [Handlebars templates](http://handlebarsjs.com/) `hbs` that serve as html partials. Compiling, minification, and linting for scss is baked in. A simple, lightweight server is also included via `gulp-live-server`.

Project authorship is performed in the `src` directory, and compiled out to the `dist` folder. The content of the `dist` folder is what you will actually upload to the server.

## Run

### Install Gulp
`npm install gulp` to install gulp

### Install dependencies
`npm install --save-dev` to install gulp dependencies

### Run Gulp
`gulp` to run the project and build into `dist`

### Local Server
Navigate to [http://localhost:8888/](localhost:8888)


## Meat & Potatoes

The meat & potatoes of the locators is found in `src/js/components/branch-locator.js`
