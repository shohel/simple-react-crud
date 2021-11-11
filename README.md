# Simple React Crud Application
A simple react crud application based on functional components

## Installations

### Composer

The vendor directory does not exist by default. Please follow the below procedure in case if you install this plugin from the repository

* Clone this repository and unzip it
* Run the command ```composer install``` 
* Go to plugins from WordPress dashboard and activate the plugin

### NPM

Run the following commands after cloning and change the terminal directory to this cloned directory.

* `npm install`
* Compile react with webpack and watch changes
* `npm run watch`
* Run the grunt task to compile SCSS to CSS
* `grunt watch`

### Production Build

After running the following commands from the terminal, you will get an installable WordPress plugin as a zip file in the root directory.

* `npm run build`
* `grunt build`

## Generate Random Data using WP_Cli
Run `wp rdlist generate`

## Shortcode

Use the below shortcode at any place to render the lists

`[data-list-placeholder]`