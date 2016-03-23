import $ from 'jquery';

import MenuController from './controllers/menu_controller';

import LeftMenu from './views/left_menu';
import GameMap from './views/game_map';

// import CellMap from './models/cell_map';

import ConwayWorld from './world/conway/conway_world';

$(document).ready(function() {

  let world = new ConwayWorld(80, 100);

  let leftMenu = new LeftMenu('#left-menu');
  // let cellMap = new CellMap(80, 100, ConwayGameOfLifeRule);
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
