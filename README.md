<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/3603793/15134364/c940fec6-1641-11e6-80ad-dd93a3acefdb.png" width="100">
</p>

# Felipe Fialho - Website

[Access the website](http://www.felipefialho.com/)

This project uses Harp, Jade, Stylus, Gulp and Browsersync.

Maybe you want to read about them:
- [Harp](http://harpjs.com/)
- [GulpJS](http://gulpjs.com/)
- [Jade](http://jade-lang.com/)
- [Stylus](http://learnboost.github.io/stylus/)
- [Browsersync](https://www.browsersync.io/)

For grid system uses [Lost](https://github.com/peterramsing/lost) with some help from [Rucksack](http://simplaio.github.io/rucksack/) for animations, reset and a lot of great mixins, [Rupture](https://github.com/jenius/rupture) for responsive utilities. And [Font Magician](https://github.com/jonathantneal/postcss-font-magician/) to get the webfonts.


## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)


```sh
# Clone this repository
$ git clone git@github.com:LFeh/lfeh.github.io.git
$ cd lfeh.github.io/harp/

# install gulp globally
$ npm install -g gulp

# install harp globally
$ npm install -g harp

# install dependencies 
$ npm install

```

With the commands above, you have everything to start.

### Folders and Files

```sh
├── harp.json
├── README.md
├── gulpfile.babel.js
├── package.json
├── public/
│   ├── _partials/*.jade
│   ├── _src
│   │   └── img/*
│   │   └── styl/*.styl
│   │   └── svg/*.svg
│   ├── _assets
│   │   └── css/style.css
│   │   └── img/*
│   │   └── svg/*.svg
│   ├── blog/
│   ├── lab/
│   ├── projects/
│   ├── 404.jade
│   ├── _layout.jade
│   ├── index.jade
│   ├── rss.xml.jade
│   ├── sitemap.xml.jade
```

Those folders and file will change during the project.


### Code Standarts

This project uses my own [Coding Style](https://github.com/felipefialho/coding-style) as code reference.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

To help you, this project has a `npm run fix` command to fix all eslint errors.

This project uses as a base the [Kratos Boilerplate](https://github.com/felipefialho/kratos-boilerplate).


#### Parker CSS

To view a reporter of CSS files, use a `npm run reporter` command.


### Tasks
  
- `gulp css`: compile stylus files 
- `gulp images`: compress image files
- `gulp icons`: generate sprite of icons 
- `gulp watch`: call for watch files 

- `npm start`: run all tasks and initialize watch for changes and a server
- `npm test`: test the javascript and css complexity 
- `npm run lint`: test the javascript
- `npm run reporter`: test css complexity
- `npm run deploy`: deploy to gh pages


## License

[MIT License](http://felipefialho.mit-license.org/) © Luiz Felipe Tartarotti Fialho
