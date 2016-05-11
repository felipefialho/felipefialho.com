<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/3603793/15134364/c940fec6-1641-11e6-80ad-dd93a3acefdb.png" width="100">
</p>

# Felipe Fialho - Website

This project uses Hexo, Jade, Stylus, Gulp and Browsersync.

Maybe you want to read about them:
- [Hexo](https://hexo.io/)
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
$ git clone git@github.com:LFeh/kratos-boilerplate.git
$ cd kratos-boilerplate

# install gulp globally
$ npm install -g hexo-cli
$ npm install -g gulp

# install dependencies
$ npm install

```

With the commands above, you have everything to start.

### Folders and Files

```sh
├── _config.yml
├── README.md
├── build
│   ├── css
│   │   └── style.css
│   ├── img/
│   ├── svg/
│   ├── index.html
├── gulpfile.babel.js
├── package.json
└── src
│   ├── img
│   ├── svg
│   ├── styl
│   │   ├── _core/*.styl
│   │   ├── atoms/*.styl
│   │   ├── molecules/*.styl
│   │   ├── organisms/*.styl
│   │   ├── widgets/*.styl
│   │   ├── pages/*.styl
│   │   └── style.styl
└── scaffolds/
└── themes/
```

Those folders and file will change during the project.


### Code Standarts

This project uses my own [Coding Style](https://github.com/LFeh/coding-style) as code reference.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

To help you, this project has a `npm run fix` command to fix all jscs errors.

This project uses as a base the [Kratos Boilerplate](https://github.com/LFeh/kratos-boilerplate).

### Tasks

- `gulp`: run all tasks and initialize watch for changes and a server
- `gulp css`: compile stylus files
- `gulp images`: compress image files
- `gulp icons`: generate sprite of icons
- `gulp browser-sync`: inicialize a server
- `gulp watch`: call for watch files
- `gulp build`: run all tasks


## License

[MIT License](http://felipefialho.mit-license.org/) © Luiz Felipe Tartarotti Fialho
