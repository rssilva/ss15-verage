var Spaceship = require('./spaceship.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var Interface = require('./interface.js');
var Spaceship = require('./spaceship.js');
var MeteorGroup = require('./meteor-group.js');
var Collision = require('./collision.js');

var width = window.innerWidth;
var height = window.innerHeight > 1440 ? 1440 : window.innerHeight;
<<<<<<< HEAD
var spaceship;

var collisionHandler = function() {
  console.log('collision!');
};
=======
>>>>>>> master

window.main = function() {
  var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
    preload: function() {
      game.load.image('layer01', 'image/layer01.png');
      game.load.image('layer02', 'image/layer02.png');
      game.load.image('layer03', 'image/layer03.png');
      game.load.image('spaceship', 'image/spaceship.png');
      game.load.image('meteor', 'image/meteor.png');

      game.load.audio('engine', 'sound/engine.wav');
      game.load.audio('boost', 'sound/boost.wav');

      this.collision = Collision.initialize(['meteor']);
    },

    create: function() {
      Scenario.initialize(game, width, height);
      this.spaceship = Spaceship.initialize(game);
      Player.initialize(100,100,'Evandro');
      Interface.initialize(game);

      Interface.import({
        name: 'timer',
        module: require('./timer.js')
      });

      Interface.import({
        name: 'life',
        module: require('./life.js')
      }).render('life', '100');

      Interface.import({
        name: 'power',
        module: require('./power.js')
      }).render('power', '100');

      this.meteorGroup = new MeteorGroup(game, 3);
      this.meteorGroup.create();

      var meteorGroup = new MeteorGroup(game, 10);
      this.meteors = meteorGroup.create();
    },

    update: function() {
      var that = this;

      Scenario.render();
      Spaceship.render();
      Interface.render('timer');

      this.meteorGroup.update();

      // this.meteorGroup.collection.forEach(function (meteor) {
      //   game.physics.arcade.collide(spaceship, meteor.sprite, collisionHandler, null, that);
      // });

      game.physics.arcade.collide(this.spaceship, this.meteors, this.collision.handler, null, this);
    }
  }, false, false);
};
