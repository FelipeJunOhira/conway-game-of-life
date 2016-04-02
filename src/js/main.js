import $ from 'jquery';

import MenuController from './controllers/menu_controller';

import LeftMenu from './views/left_menu';
import GameMap from './views/game_map';

import ConwayWorld from './world/conway/conway_world';
import WireWorld from './world/wire/wire_world';

$(document).ready(function() {

  let world = new WireWorld(50, 60);

  let leftMenu = new LeftMenu({
    selector: '#left-menu',
    states: world.states
  });

  let gameMap = new GameMap({
    selector: '#game-map',
    rows: world.rows,
    columns: world.columns
  });

  let menuController = new MenuController({
    leftMenu: leftMenu,
    world: world,
    gameMap: gameMap
  });

  gameMap.cellListener = menuController;

});
