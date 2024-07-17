//=============================================================================
// Cecilia_NumericalPad.js                                                             
//=============================================================================


/*:
*
* @author Kino
* @plugindesc A numerical pad window for RMMV.
*
* @param Window X Position
* @desc The X Position of the numerical pad window on the scene.
* @default 0
*
* @param Window Y Position
* @desc The Y position of the numerical pad window on the scene.
* @default 210
* 
* @help 
* Version 1.00
//=============================================================================
// Introduction                                                             
//=============================================================================
*
* This plugin creates a new numerical pad, which you can use in your game.
* This pad lets the player enter numbers, remove numbers from the buffer, and
* overall have a more robust numerical pad to use when they need to enter numbers.
* This can be great for things like puzzles, or maybe a math game. It even comes
* with an area to to see the information you typed in.
*
* One of the core features is that you can access the pad just about anywhere
* you can make a script call. The second thing is, it will pause the message
* window until the player is done entering information.
*
* One thing to note is that once you click "OK" on the pad, the pad will close,
* and the input is saved. The script calls below let you access that information,
* or open the pad at your leisure.
*
//=============================================================================
// Script Calls                                                            
//=============================================================================
* Currently there are only two necessary scripts calls for this plugin.
* The four script calls are accessPad, storeInGameVariable, getBufferDirectly.
*
* $numPad.accessPad()
* This script call summons the numpad using the positions you set on screen.
* The numpad is locked to that position unlike other windows of the Cecilia 
* system. With that in mind, you can use the numpad buttons to enter numerical
* information. X clearing one number from the buffer at a time.
*
* $numPad.closePad()
* This script call closed the numpad automatically, and deactivates it.
* 
* $numPad.storeInGameVariable()
* Example: $numPad.storeInGameVariable(6);
* This script call does as it says; it stores the input into a game variable
* after processing. The most important part about this, is that it does this once
* called. So, you need to either set up a wait for the user to input a number, or
* if you're summoning while a message window is open. The message window will wait
* until you click 'OK' on the pad, before advancing the text.
*
* $numPad.storeInGameVariableUponCompletion()
* Example: $numPad.storeInGameVariableUponCompletion(6);
* This does the same thing as the above, but instead the value will be stored once
* the user presses okay, and no waiting is require; it will be done automatically.
* 
* $numPad.getBufferDirectly()
* This does as it says; it will return the number entered into the buffer upon
* completion of processing -- when you hit "OK". Then, you can use it as you want,
* like storing it in a game variable for later use or in some crazy script call. 
* The choice is yours.
* 
//=============================================================================
//  Contact Information
//=============================================================================
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/


(function(){

  var parameters = PluginManager.parameters("Cecilia_NumericalPad");
  var windowXPosition = Number(parameters['Window X Position']);
  var windowYPosition = Number(parameters['Window Y Position']);

  function Setup() {
    'use strict';
//=============================================================================
// CeciliaNumpadManager                                                             
//=============================================================================
    
    function CeciliaNumPadManager() {

    }

    CeciliaNumPadManager.initialize = function() {
      this._numPadWindow = new Cecilia_WindowNumericalPad(windowXPosition, windowYPosition, 200, 250);
    };

    CeciliaNumPadManager.accessPad = function() {
      var scene = SceneManager.getCurrentSceneCLI();
      scene.addCLIWindow("numpad", this._numPadWindow);
      this.openPadIfExists();
    };

    CeciliaNumPadManager.openPadIfExists = function() {
      var scene = SceneManager.getCurrentSceneCLI();
      if(scene.getFromCacheIfExists("numpad") !== null) {
        this.openPad();
      }
    };

    CeciliaNumPadManager.openPad = function() {
      this._numPadWindow.activate();
      this._numPadWindow.open();
    };

    CeciliaNumPadManager.closePad = function() {
      this._numPadWindow.deactivate();
      this._numPadWindow.close();
    };

//=============================================================================
//  CeciliaNumPadDataManager                                                            
//=============================================================================
    function CeciliaNumPadDataManager() {

    }

    CeciliaNumPadDataManager.initialize = function(numPad) {
      this._numPad = numPad;
    };

    CeciliaNumPadDataManager.getBufferDirectly = function() {
      return this._numPad.getSavedBufferInput();
    };

    CeciliaNumPadDataManager.storeInGameVariableUponCompletion = function(gameVariableId) {
      var fnc = this.storeInGameVariable.bind(this, gameVariableId);
      CeciliaNumPadAutoRunner.setAutoRunFunction(fnc);
    };

    CeciliaNumPadDataManager.storeInGameVariable = function(gameVariableId) {
      var data = this._numPad.getSavedBufferInput();
      $gameVariables.setValue(gameVariableId, data);
    };

//=============================================================================
// CeciliaNumPadAutoRunner                                                             
//=============================================================================

    function CeciliaNumPadAutoRunner() {

    }

    CeciliaNumPadAutoRunner.initialize = function(numPadWindow) {
      this._numPad = numPadWindow;
      this.update();
    };

    CeciliaNumPadAutoRunner.update = function() {
      this.requestUpdate();
      if(CeciliaNumPadCompletionHandler.isProcessComplete()) {
        this.autoRunFunction();
        CeciliaNumPadCompletionHandler.clearProcessComplete();
      }
    };

    CeciliaNumPadAutoRunner.requestUpdate = function() {
      requestAnimationFrame(this.update.bind(this));
    };

    CeciliaNumPadAutoRunner.setAutoRunFunction = function(fnc) {
      this._boundFunction = fnc;
    };

     CeciliaNumPadAutoRunner.autoRunFunction = function() {
      if(typeof this._boundFunction === 'function')
        this._boundFunction();
    };

//=============================================================================
// CeciliaNumPadCompletionHandler                                                            
//=============================================================================

    function CeciliaNumPadCompletionHandler() {

    }

    CeciliaNumPadCompletionHandler._processComplete = false;

    CeciliaNumPadCompletionHandler.processComplete = function() {
      this._processComplete = true;
    };

    CeciliaNumPadCompletionHandler.clearProcessComplete = function() {
      this._processComplete = false;
    };

    CeciliaNumPadCompletionHandler.isProcessComplete = function() {
      return this._processComplete;
    };


//=============================================================================
// CeciliaNumPadDataConverter                                                             
//=============================================================================

    function CeciliaNumPadDataConverter() {

    }

    CeciliaNumPadDataConverter.convertDataToNumber = function(numPadData) {
      var data = numPadData.join("");
      var convertedData = Number(data);
      return convertedData; 
    };

//=============================================================================
// Cecilia_WindowNumericalPad                                                           
//=============================================================================
  
    function Cecilia_WindowNumericalPad() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowNumericalPad.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_WindowNumericalPad.prototype.constructor = Cecilia_WindowNumericalPad;

    Cecilia_WindowNumericalPad.prototype.initialize = function(x, y, width, height) {
      this._inputBuffer = [];
      this._inputBufferMaxDisplay = 9;
      this._savedBufferInput = null;
      this._numPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'OK', '0', 'X'];
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      this.close();
      this.lockWindow();
    };

    Cecilia_WindowNumericalPad.prototype.setup = function() {
      this.createNumPadDisplay();
      this.createNumPadLayout();
      this.bindNumPadEvents();
    };

    Cecilia_WindowNumericalPad.prototype.update = function() {
      Cecilia_WindowBase.prototype.update.call(this);
      this.drawInputBufferRectangle();
      this.drawInputBuffer();
      this.drawNumPadButtons();
    };

    Cecilia_WindowNumericalPad.prototype.createNumPadDisplay = function() {
      this.createRow(180);
      this.createColumn(1, 175, 50);
      this.lockColumn(1, 1);
    };

    Cecilia_WindowNumericalPad.prototype.createNumPadLayout = function() {
      for(var y = 1; y < 5; y++) {
        this.createRow(180);
        for(var x = 0; x < 3; x++) {
          this.createColumn(y + 1, 45, 40);
        }
      }
    };

    Cecilia_WindowNumericalPad.prototype.bindNumPadEvents = function() {
      var index = null;
      var rowIndex = null;
      var columnIndex = null;

      for(var y = 0; y < 4; y++) {
        for(var x = 0 ; x < 3; x++) {
          rowIndex = y + 2;
          columnIndex = x + 1;
          index = this.convertToPadIndex(x, y + 1);
          var character = this._numPad[index];
          this.bindCharacterToMethodInGrid(rowIndex, columnIndex, character);
        }
      }
    };

    Cecilia_WindowNumericalPad.prototype.bindCharacterToMethodInGrid = function(rowIndex, columnIndex, character) {
      switch(character) {
        case 'X':
          this.bindAction(rowIndex, columnIndex, this.removeFromInputBuffer.bind(this));
          break;
        case 'OK':
         this.bindAction(rowIndex, columnIndex, this.completeProcessing.bind(this));
         break;
        default:
          this.bindAction(rowIndex, columnIndex, this.addToInputBuffer.bind(this, character));
      }
    };

    Cecilia_WindowNumericalPad.prototype.drawInputBuffer = function() {
      var data = this.getVisibleBuffer();
      var number =  CeciliaNumPadDataConverter.convertDataToNumber(data);
      var text = number.toString();
      var column = this.getColumn(1, 1);
      this.drawText(text, column.x + 15, column.y + 5, column.width - 42);
    };

    Cecilia_WindowNumericalPad.prototype.drawInputBufferRectangle = function() {
      var column = this.getColumn(1, 1);
      this.contents.fillRect(column.x + 10, column.y, column.width - 42, column.height, "#FFFFFF");
      this.contents.clearRect(column.x + 12, column.y + 2, column.width - 46, column.height - 4);
    };

    Cecilia_WindowNumericalPad.prototype.drawNumPadButtons = function() {
      var column = null;
      var index = null;

      for(var y = 0; y < 4; y++) {
        for(var x = 0 ; x < 3; x++) {
          column = this.getColumn(y + 2, x + 1);
          index = this.convertToPadIndex(x, y + 1);
          this.drawText(this._numPad[index], column.x + 13, column.y, column.width);
        }
      }
    };

    Cecilia_WindowNumericalPad.prototype.convertToPadIndex = function(x, y) {
      var index =  (3 * y) - (3 - x);
      return index;
    };

    Cecilia_WindowNumericalPad.prototype.getVisibleBuffer = function() {
      var length = this._inputBuffer.length;
      var start = (length > this._inputBufferMaxDisplay) ? length - this._inputBufferMaxDisplay : 0;
      return this._inputBuffer.slice(start);
    };

    Cecilia_WindowNumericalPad.prototype.removeFromInputBuffer = function() {
      var bufferEnd = this._inputBuffer.length - 1;
      this._inputBuffer.splice(bufferEnd, 1);
    };

    Cecilia_WindowNumericalPad.prototype.addToInputBuffer = function(character) {
      this._inputBuffer.push(character);
    };

    Cecilia_WindowNumericalPad.prototype.completeProcessing = function() {
      this._savedBufferInput =  CeciliaNumPadDataConverter.convertDataToNumber(this._inputBuffer);
      this._inputBuffer.length = 0;
      this.pingCompletionHandler();
      this.deactivate();
      this.close();
    };

    Cecilia_WindowNumericalPad.prototype.pingCompletionHandler = function() {
      CeciliaNumPadCompletionHandler.processComplete();
    };

    Cecilia_WindowNumericalPad.prototype.getSavedBufferInput = function() {
      return this._savedBufferInput;
    };

//=============================================================================
//                                                              
//=============================================================================
    var WindowMessage_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    Window_Message.prototype.isAnySubWindowActive = function() {
      var scene = SceneManager.getCurrentSceneCLI();
      var numPadWindow = scene.getWindowFromCLIList("numpad");
      if(numPadWindow && numPadWindow.active) {
        return true;
      }
      else {
        return WindowMessage_isAnySubWindowActive.call(this);
      }
    }; 

//=============================================================================
// Initialization                                                             
//=============================================================================

    var SceneTitle_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
      SceneTitle_start.call(this);
      CeciliaNumPadManager.initialize();
      CeciliaNumPadDataManager.initialize(CeciliaNumPadManager._numPadWindow);
      CeciliaNumPadAutoRunner.initialize(CeciliaNumPadManager._numPadWindow);
    };

//=============================================================================
// Public API                                                             
//=============================================================================
    window.$numPad = {
      accessPad:function() {
        CeciliaNumPadManager.accessPad();
      },
      openPad: function() {
        CeciliaNumPadManager.openPad();
      },
      closePad: function() {
        CeciliaNumPadManager.closePad();
      },
      getBufferDirectly: function(){
        return CeciliaNumPadDataManager.getBufferDirectly();
      },
      storeInGameVariable: function(gameVariableId) {
        CeciliaNumPadDataManager.storeInGameVariable(gameVariableId);
      },
      storeInGameVariableUponCompletion: function(gameVariableId) {
        CeciliaNumPadDataManager.storeInGameVariableUponCompletion(gameVariableId);
      }
    };

  }

  if(CLIImports.Cecilia)
    Setup();
})();