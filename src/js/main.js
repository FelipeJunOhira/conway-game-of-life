import $ from 'jquery';

import MenuController from './controllers/menu_controller';

import LeftMenu from './views/left_menu';
import GameMap from './views/game_map';

import CellMap from './models/cell_map';

$(document).ready(function() {

  let leftMenu = new LeftMenu('#left-menu');
  let cellMap = new CellMap(80, 100);
  let gameMap = new GameMap({
    selector: '#game-map',
    rows: cellMap.rows,
    columns: cellMap.columns
  });

  let menuController = new MenuController({
    leftMenu: leftMenu,
    cellMap: cellMap,
    gameMap: gameMap
  });

  gameMap.cellListener = menuController;

});
