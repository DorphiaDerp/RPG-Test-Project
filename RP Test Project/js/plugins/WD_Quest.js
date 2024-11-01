//=============================================================================
// Plugin Name: QuestLog
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Create a questlog to manage your quests
// Use: Feel free to use for private and commercial projects. Feel free to edit. Please give credits.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Custom Quest Plugin for RPG Maker MZ
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param linebreak1
 * @text ===Main options===
 * @desc The main window options
 * @default ================
 *
 * @param Title
 * @text Title
 * @desc Set the title of the QuestLog
 * @default QuestLog
 *
 * @param fontsize
 * @text Title Font Size
 * @type number
 * @desc The size of the font for the Scene Title
 * @default 40
 * @min 1
 *
 * @param dynamicDescSize
 * @text Dynamic Description Font Size
 * @type boolean
 * @desc Use dynamic font size for description? The plugin will choose a fitting value from 100 to 10 font size
 * @default false
 * @on Activete
 * @off Deactivate
 *
 * @param paddingValue
 * @text Dynamic Size padding
 * @type number
 * @desc The padding from the left/right border for Auto Sizer
 * @default 50
 *
 * @param descriptionSize
 * @text Quest Description Font Size
 * @type number
 * @desc The size of the font for the description of the Quest (If not Dynamic)
 * @default 20
 * @min 1
 *
 * @param infoalign
 * @text Quest Info Alignment
 * @desc Select how to align the informations in the quest description
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default center
 *
 * @param listSize
 * @text Font Size in the list
 * @type number
 * @desc The size of the font of the Quest's name in the quests list
 * @default 20
 * @min 1
 *
 * @param listAlign
 * @text Quest List Align
 * @desc Select how to align the quest in the QuestLog list
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default center
 *
 * @param linebreak2
 * @text ===Text Options===
 * @desc Select your terms
 * @default ================
 *
 * @param giverprefix
 * @text Giver Prefix
 * @desc How the "From:" prefix is shown in the Quest Giver
 * @default From:
 *
 * @param areaprefix
 * @text Area Prefix
 * @desc How the "Area:" prefix is shown in the Quest Area
 * @default Area:
 *
 * @param statusname
 * @text Status Name
 * @desc How the "Status:" is shown for Quest Completion
 * @default Status:
 *
 * @param questcompleted
 * @text Quest Completed
 * @desc Word to show if quest is completed
 * @default Completed
 *
 * @param questongoing
 * @text Quest Ongoing
 * @desc Word to show if quest is ongoing
 * @default Ongoing
 *
 * @param questfailed
 * @text Quest Failed
 * @desc Word to show if quest is failed
 * @default Failed
 *
 * @param linebreak3
 * @text ===Command Button===
 * @desc Set the preferences for the menu command
 * @default ================
 *
 * @param menucommand
 * @type boolean
 * @text Menu Command
 * @desc Add the Quest command to the game menu
 * @default False
 * @on Show
 * @off Hide
 *
 * @param commandname
 * @text Command Name
 * @desc Set the name of the command (if activated)
 * @default QuestLog
 *
 * @param linebreak4
 * @text ===Graphic Settings===
 * @desc Set the graphic preferences
 * @default ================
 *
 * @param titleFlag
 * @text Show QuestLog Title?
 * @type boolean
 * @desc Choose if you want to show the QuestLog title
 * @default true
 * @on Show
 * @off Hide
 *
 * @param layoutAlign
 * @text QuestLog Layout
 * @desc Select the QuestLog Layout
 * @type select
 * @option Quest List on left, Info on right
 * @value layout1
 * @option Quest List on right, Info on left
 * @value layout2
 * @default layout1
 *
 * @param layoutSize
 * @text Layout Size
 * @desc Select the QuestLog Layout size
 * @type select
 * @option 100% of the Graphic Box (classic)
 * @value size1
 * @option 90% of the Graphic Box (RMMZ style)
 * @value size2
 * @default size1
 *
 * @param touchCancel
 * @text Show Touch Cancel Button?
 * @type boolean
 * @desc Choose if you want to show the touch cancel button (make sure the player has non touch commands if you don't)
 * @default true
 * @on Show
 * @off Hide
 *
 * @param skinSettings
 * @text Custom Skin
 * @type struct<skinSet>
 * @desc If you want to use a custom skin use this settings
 * @default {"skinFlag":"false","skinName":"","redT":"0","greenT":"0","blueT":"0"}
 *
 * @command line1
 * @text --- Quest Management ---
 * @desc Series of commands to manage your quests 
 *
 * @command CreateQuest
 * @text Create Quest
 * @desc Create a new quest.
 * @arg id
 * @type number
 * @text ID
 * @desc The ID of the quest. (Minimum 1)
 * @min 1
 *
 * @arg icon
 * @type icon
 * @text Icon
 * @desc The icon index to display for the quest.
 *
 * @arg name
 * @type string
 * @text Name
 * @desc The name of the quest.
 *
 * @arg longTitle
 * @type string
 * @text Long Title
 * @desc A longer title for the description page, leave blank to use the Quest Name.
 *
 * @arg index
 * @type number
 * @text Index
 * @desc The indexing number for the quest in the list.
 *
 * @arg giver
 * @type string
 * @text Giver
 * @desc Information on the quest giver.
 *
 * @arg area
 * @type string
 * @text Area
 * @desc Information on the location of the quest.
 *
 * @arg description
 * @type string
 * @text Description
 * @desc Information on the quest.
 *
 * @arg status
 * @text Status
 * @type select
 * @option Ongoing
 * @value ongoing
 * @option Completed
 * @value completed
 * @option Failed
 * @value failed
 * @desc Whether the quest is completed, ongoing or failed.
 * @default ongoing
 *
 * @command RemoveQuestNew
 * @text Remove Quest
 * @desc Removes quest searching by ID or Name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to remove (leave 0 if using Name).
 *
 * @arg questName
 * @text Quest Name
 * @desc Name of the quest to be removed (leave blank if using ID).
 * @type text
 *
 * @command SetCompletion
 * @text Set Quest Completion Parameter
 * @desc Sets if a quest is completed or not searching by ID or Name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to edit. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to edit. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg status
 * @text Status
 * @type select
 * @option Ongoing
 * @value ongoing
 * @option Completed
 * @value completed
 * @option Failed
 * @value failed
 * @desc Whether the quest is completed, ongoing or failed.
 * @default ongoing
 *
 * @command EditQuestDescription
 * @text Edit Quest Description
 * @desc Edits the description of a quest by ID or name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to edit. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to edit. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg newDescription
 * @text New Description
 * @desc The new description for the quest.
 * @default
 *
 * @command EditQuestIcon
 * @text Edit Quest Icon
 * @desc Edits the Icon of a quest by ID or name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to edit. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to edit. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg iconID
 * @type icon
 * @text New Icon #
 * @desc The new icon number.
 * @default 0
 *
 * @command line2
 * @text --- Plugin Functionality ---
 * @desc Series of command to change words and fonts.
 *
 * @command SetTitle
 * @text Set QuestLog Title
 * @desc Set the title of the QuestLog.
 *
 * @arg title
 * @text Title
 * @desc The new title of the QuestLog.
 * @type string
 *
 * @command SetQuestTitleFontSize
 * @text Set QuestLog Title's Font Size
 * @desc Sets the font size of the quest title.
 *
 * @arg fontSize
 * @type number
 * @text Font Size
 * @desc The new font size value for the quest title.
 *
 * @command SetQuestInfoFontSize
 * @text Set Quest Description Font Size
 * @desc Set the Font Size of the Quest Description.
 *
 * @arg fontSize
 * @type number
 * @text Font Size
 * @desc The new font size value for the quest title.
 *
 * @command SetQuestListFontSize
 * @text Set Quest List Font Size
 * @desc Set Quests' Name Font Size in the Quest List
 *
 * @arg fontSize
 * @type number
 * @text Font Size
 * @desc The new font size value for the quest title.
 *
 * @command SetGiverPrefix
 * @text Set Giver Prefix
 * @desc Set the prefix for the quest's "Giver:" descriptor.
 *
 * @arg prefix
 * @text Prefix
 * @desc The new prefix for the quest giver (include ":" if you want them).
 * @type string
 *
 * @command SetAreaPrefix
 * @text Set Area Prefix
 * @desc Set the prefix for the quest's "Area:" descriptor.
 *
 * @arg prefix
 * @text Prefix
 * @desc The new prefix for the quest area (include ":" if you want them).
 * @type string
 *
 * @command SetStatusName
 * @text Set Status Prefix
 * @desc Set the name for the quest "Status:" prefix.
 *
 * @arg name
 * @text Name
 * @desc The new name for the quest status (include ":" if you want them).
 * @type string
 *
 * @command SetQuestCompleted
 * @text Set word for "Completed"
 * @desc Set the word for a completed quest.
 *
 * @arg completed
 * @text Completed
 * @desc The word to show for a completed quest.
 * @type string
 *
 * @command SetQuestOngoing
 * @text Set word for "Ongoing"
 * @desc Set the word for an ongoing quest.
 *
 * @arg ongoing
 * @text Ongoing
 * @desc The word to show for an ongoing quest.
 * @type string
 *
 * @command SetCommandName
 * @text Set Command Name
 * @desc Sets the name of the quest command in the game menu.
 *
 * @arg commandName
 * @type string
 * @text Command Name
 * @desc The name to set for the quest command in the game menu.
 *
 * @command line3
 * @text --- Game Editor Functionality ---
 * @desc Series of command to change words and fonts.
 *
 * @command OpenQuestScene
 * @text Open Quest Scene
 * @desc Opens the Quest Scene.
 *
 * @command CheckQuestCompletion
 * @text Check if Quest is completed
 * @desc Checks if Quest is completed and stores result in a Switch or Variable.
 *
 * @arg selectMode
 * @text Use Switch or Variable
 * @type select
 * @option Switch
 * @option Variable
 * @desc Switch is TRUE if completed, FALSE if not. Variable is 0 (ongoing), 1 (completed) or 2 (failed)
 * @default Switch
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to check. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to check. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg switchID
 * @type number
 * @text Switch/Variable ID
 * @desc The ID of the switch or variable to set
 * @default 1
 * @min 1
 *
 * @command line4
 * @text --- Graphic Changes ---
 * @desc Plugin command to change the Graphic settings.
 *
 * @command changeGraphics
 * @text Change Graphic Settings
 * @desc Change to the desired Graphic Settings
 *
 * @arg titleFlag
 * @text Show QuestLog Title?
 * @type select
 * @option Don't change
 * @value title0
 * @option Show Title Window
 * @value title1
 * @option Hide Title Window
 * @value title2
 * @default title0
 * @desc Choose if you want to show the QuestLog title
 *
 * @arg layoutAlign
 * @text QuestLog Layout
 * @desc Select the QuestLog Layout
 * @type select
 * @option Don't change
 * @value layout0
 * @option Quest List on left, Info on right
 * @value layout1
 * @option Quest List on right, Info on left
 * @value layout2
 * @default layout0
 *
 * @arg layoutSize
 * @text Layout Size
 * @desc Select the QuestLog Layout size
 * @type select
 * @option Don't change
 * @value size0
 * @option 100% of the Graphic Box (classic)
 * @value size1
 * @option 90% of the Graphic Box (RMMZ style)
 * @value size2
 * @default size0
 *
 * @arg touchCancel
 * @text Show Touch Cancel Button?
 * @type select
 * @option Don't change
 * @value cancel0
 * @option Show Touch Cancel
 * @value cancel1
 * @option Hide Touch Cancel
 * @value cancel2
 * @default cancel0
 * @desc Choose if you want to show the touch cancel button (make sure the player has non touch commands if you don't)
 *
 * @arg skinSettings
 * @text Custom Skin
 * @type struct<skinSetArg>
 * @desc If you want to use a custom skin use this settings
 * @default {"skinFlag":"skin0","skinName":"","redT":"0","greenT":"0","blueT":"0"}
 *
 * @help WD_Quest.js
 *
 * The plugin creates a QuestLog that can will store your quests.
 *
 * The QuestLog can be called via script SceneManager.push(SceneManager.Scene_Quest);
 * or via Plugin Command or you can set the Parameter Menu Command true
 * to add a command in the game Menu
 *
 * You can edit both via parameter or plugin command (useful for translations)
 * the QuestLog title, the menu command text, the From: prefix, the Area:
 * prefix, the Status: prefix and the text used for "Completed" or "Ongoing"
 * quests
 *
 * The quest can be added via Plugin Command "Create Quest" and then they
 * will be displayed in the QuestLog ordered by their index.
 * Completed quest will still be visible but grayed out and pushed to the 
 * bottom of the list.
 *
 * Quests completion can be changed via Plugin Command, either by name
 * (must be exact name) or by quest ID
 *
 * Quests can also be completely removed (if you don't want to keep them
 * visible once completed or for whatever reason) via Plugin Command
 * either by name (must be exact name) or by quest ID
 *
 * If your game has a lot of quests I strongly advice to keep track of 
 * quest ID in some kind of note as the plugin doesn't show a full
 * list of the stored quest and their IDs
 *
 * NOTE: The Quest Description text can be split in different lines
 * by adding \n in the string. This works only for that field.
 * 
 * EXTERNAL SCRIPT CALL: You can call for "Check Quest Completion" from
 * any plugin or RPG MAKER MZ's Script Call:
 * - use window.WD_Interplugin_Quest.checkCompletionID(#) to search
 *   quest ID # completion
 * - use window.WD_Interplugin_Quest.checkCompletionName(#) to search
 *   quest name # completion
 * The script call will result true if completed or false if failed or
 * ongoing
 *
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 * And if you want a direct line with me, you can join my Discord:
 * https://discord.gg/gaa2E2pJ
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 *
 * //////////////////////////////////////////////////
 * VERSION 1.6.1 Changelog
 * - Changed the Quest Title from DrawText to DrawTextEx. The text will
 *   still be centered but now you can add the standard RMMZ commands 
 *   such as \I for Icons or \C for colours
 * VERSION 1.6 Changelog
 * - Fixed a bug were the old quest files would be deleted if any quest
 *   action (like accepting a quest) would be done after reloading a 
 *   save and before opening the questlog. (Thanks to TewiInaba for the
 *   report)
 * - Fixed a minor bug in the "Complete Quest" command
 * - Changed the Icon selection parameters from a number to an icon
 *   selector
 * - Added an external script call to check quest completion, see help
 * VERSION 1.5 Changelog
 * - Fixed an unexpected behaviour in the Auto Size description text 
 *   that resets the font size after correctly finding the fitting 
 *   value
 * - Added a padding value to the text to have the desired look to 
 *   the text graphic
 * - Added a full support for RMMZ text codes while keeping the alignment
 *   options
 * - Minor tweaks to the Plugin Parameters
 * - Now the plugin will automatically support compatibility with v1.1
 *   or lower without having to choose different files
 * VERSION 1.4 Changelog
 * - Added the setting to show or hide the title in the QuestLog
 * - Added the possibility to switch the quest list / quest info layout
 * - Added the option to use 100% of the graphic box (standard setting
 *   for this plugin) or 90% (standard RPG Maker MZ scene compatible 
 *   with cancel touch button)
 * - Added the possibility to hide the cancel touch button (useful for 
 *   100% size, but make sure the player has access to non touch controls)
 * - Added the possibility to change the windows skin for the QuestLog only,
 *   also you can change the colors tone (by re-selecting the default skin 
 *   you can apply different color tones to it)
 * - Added a new plugin command to change all the above mid-game
 * VERSION 1.3.2 Changelog
 * - Fixed an old part of the code creating two problems: A black layer under
 *   the scene and no centering if the Game UI was changed from the System 2
 *   tab as reported from ryf and Puppet Knight
 * VERSION 1.3.1 Changelog
 * - Hotfix for a small bug that would turn the menu command name to "true",
 *   thanks to ryf for the report!
 * VERSION 1.3 Changelog
 * - Updated the code to a newer version with, but not limited to, tweaks
 *   to the save and load functionality.
 * - Added the "Failed" status to the Quests with the needed changes to 
 *   "Add Quest", "Set Completion" and "Check Completion". Added bits of
 *   code to allow retrocompatibility with the older versions.
 * - Added the option to Autoset the Description Font Size, the plugin will
 *   range from a font size of 100 to a font size of 10, trying to fit the
 *   text both in width and height. You still need to break the lines with
 *   \n as before. The autosize text is only left aligned due to a limitation
 *   of the DrawTextEx feature used. (On the positive side, it should accept
 *   the usual RMMZ text code like \I for icons, didn't tried it)
 * - Added the possibility to add a longer title that will be displayed in the
 *   Quest Informations window (while the short name will be used for the quest
 *   list on the left). If you don't need it just leave blank the field.
 * - Minor fix on a bug that could cause the menu button to change name due to
 *   a conflict with the Quest List items
 * VERSION 1.2.2 Changelog 
 * - Hotfix for changes made in 1.2.1 as Plugin Parameters from Plugin Manager
 *   where not correctly loaded (Report by Grillmonger)
 * VERSION 1.2.1 Changelog 
 * - Fixed an issue reported by Grillmonger where QuestList would wipe if game 
 *   was closed entrely and then reloaded. Upon further investigation the fix 
 *   was extended to the other Plugin Parameters too (Such as Title Font, etc..)
 *   who would not carry over the changes if done via Plugin Command
 * VERSION 1.2 Changelog
 * - Merged "Set Completion by ID / by Name" and "Remove Quest by ID / by Name"
 * - Changed font size for the Quest List and Quest Description, you can change
 *   them via Plugin Parameters or Plugin Command 
 * - Changed the alignemnt con Quest List from "left" to "Center", can be 
 *   changed via Plugin Parameter
 * - Created a command that checks if a quest is completed and stores the
 *   result in a Switch of your choice (ON for Complete, OFF for Ongoing)
 * - Created a plugin command to change the Quest Icon searching it by ID or 
 *   Name
 * VERSION 1.1 Changelog
 * - Added new plugin command to edit an existing quest 
 *   description by ID or Quest Name
 * - Added new Plugin Command to change FontSize
 * //////////////////////////////////////////////////
 *
 */
 /*~struct~skinSet:
 * @param skinFlag
 * @text Use special Window Skin?
 * @type boolean
 * @desc Choose if you want to use a different skin for the QuestLog
 * @default false
 *
 * @param skinName
 * @text Select the Skin
 * @type file
 * @dir img/system
 * @desc The new skin you want to use
 * @default
 * 
 * @param redT
 * @text Red Tone Regulation
 * @type number
 * @desc (Optional) Choose the red tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param greenT
 * @text Green Tone Regulation
 * @type number
 * @desc (Optional) Choose the green tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param blueT
 * @text Blue Tone Regulation
 * @type number
 * @desc (Optional) Choose the blue tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 */
 /*~struct~skinSetArg:
 * @param skinFlag
 * @text Use special Window Skin?
 * @type select
 * @option Don't change
 * @value skin0
 * @option Use Custom
 * @value skin1
 * @option Use Default
 * @value skin2
 * @default skin0
 * @desc Choose if you want to use a different skin for the QuestLog
 *
 * @param skinName
 * @text Select the Skin
 * @type file
 * @dir img/system
 * @desc The new skin you want to use
 * @default
 * 
 * @param redT
 * @text Red Tone Regulation
 * @type number
 * @desc (Optional) Choose the red tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param greenT
 * @text Green Tone Regulation
 * @type number
 * @desc (Optional) Choose the green tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param blueT
 * @text Blue Tone Regulation
 * @type number
 * @desc (Optional) Choose the blue tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 */

!function(){const t=PluginManager.parameters("WD_Quest");let n=t.Title||"QuestLog",i=t.giverprefix||"From:",o=t.areaprefix||"Area:",c=t.statusname||"Status:",l=t.questcompleted||"Completed",g=t.questongoing||"Ongoing",h=t.questfailed||"Failed";var D="true"===t.menucommand;let e=t.commandname||"QuestLog",s=Number(t.fontsize)||40,d=t.infoalign||"center",p=Number(t.descriptionSize)||20,r=Number(t.listSize)||20,O="true"===t.dynamicDescSize,F=Number(t.paddingValue)||50;const R=t.listAlign||"center";let a="true"===t.titleFlag,u=t.layoutAlign||"layout1",m=t.layoutSize||"size1",f="true"===t.touchCancel,S=v(t.skinSettings),y=[],w=-1;if(D){const G=Window_MenuCommand.prototype.addOriginalCommands,$=(Window_MenuCommand.prototype.addOriginalCommands=function(){G.call(this),this.addCommand(e,"quest",!0)},Scene_Menu.prototype.createCommandWindow);Scene_Menu.prototype.createCommandWindow=function(){$.call(this),this._commandWindow.setHandler("quest",this.commandQuest.bind(this))},Scene_Menu.prototype.commandQuest=function(){SceneManager.push(W)}}function W(){this.initialize(...arguments)}function x(){this.initialize(...arguments)}function P(){this.initialize(...arguments)}((W.prototype=Object.create(Scene_MenuBase.prototype)).constructor=W).prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},W.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),a&&this.createTitleWindow(),this.createQuestListWindow(),this.createQuestInfoWindow()},W.prototype.createTitleWindow=function(){var t=this.titleWindowRect();this._titleWindow=new x(t),this.addWindow(this._titleWindow)},W.prototype.titleWindowRect=function(){var t=Graphics.boxHeight*b("Anchor"),e=Graphics.boxWidth,n=.2*b("Height");return new Rectangle(0,t,e,n)},W.prototype.createQuestListWindow=function(){var t=this.questListWindowRect();this._questListWindow=new P(t),this._questListWindow.setHandler("ok",this.onQuestListOk.bind(this)),this._questListWindow.setHandler("cancel",this.onQuestListCancel.bind(this)),this.addWindow(this._questListWindow)},W.prototype.questListWindowRect=function(){var t="layout1"===u?0:.7*Graphics.boxWidth,e=Graphics.boxHeight*b("Anchor")+(a?.2*b("Height"):0),n=.3*Graphics.boxWidth,i=a?.8*b("Height"):b("Height");return new Rectangle(t,e,n,i)},W.prototype.createQuestInfoWindow=function(){var t=this.questInfoWindowRect();this._questInfoWindow=new Q(t),this.addWindow(this._questInfoWindow)},W.prototype.questInfoWindowRect=function(){var t="layout1"===u?.3*Graphics.boxWidth:0,e=Graphics.boxHeight*b("Anchor")+(a?.2*b("Height"):0),n=.7*Graphics.boxWidth,i=a?.8*b("Height"):b("Height");return new Rectangle(t,e,n,i)},W.prototype.onQuestListOk=function(){this._questListWindow.activate()},W.prototype.onQuestListCancel=function(){this.popScene()},W.prototype.needsCancelButton=function(){return f},SceneManager.Scene_Quest=W,((x.prototype=Object.create(Window_Base.prototype)).constructor=x).prototype.initialize=function(t){Window_Base.prototype.initialize.call(this,t),L();var t=this.textSizeExNoReset(n,s),e=(this.innerWidth-t.width)/2,t=(this.innerHeight-t.height)/2;this.drawTextExSizable(n,e,t,this.innerWidth,s)},x.prototype.loadWindowskin=function(){this.windowskin=z()},x.prototype.updateTone=function(){var t=T();this.setTone(t[0],t[1],t[2])},x.prototype.textSizeExNoReset=function(t,e){this.fontSize=e,this.contents.fontSize=e;e=this.createTextState(t,0,0,0);return e.drawing=!1,this.processAllText(e),{width:e.outputWidth,height:e.outputHeight}},x.prototype.drawTextExSizable=function(t,e,n,i,o){this.fontSize=o,this.contents.fontSize=o;o=this.createTextState(t,e,n,i);return this.processAllText(o),o.outputWidth},((P.prototype=Object.create(Window_Command.prototype)).constructor=P).prototype.initialize=function(t){this.sortQuestList(),Window_Command.prototype.initialize.call(this,t)},P.prototype.loadWindowskin=function(){this.windowskin=z()},P.prototype.updateTone=function(){var t=T();this.setTone(t[0],t[1],t[2])},P.prototype.sortQuestList=function(){I();var t=y.map(function(t){t.hasOwnProperty("complete")&&!t.hasOwnProperty("status")&&(t.complete?t.status="completed":t.status="ongoing");return t});var e=t.filter(t=>"ongoing"===t.status),n=(e.sort(function(t,e){return t.index-e.index}),t.filter(t=>"completed"===t.status)),t=(n.sort(function(t,e){return t.index-e.index}),t.filter(t=>"failed"===t.status));t.sort(function(t,e){return t.index-e.index}),e=e.concat(n,t),y=e,q()},P.prototype.makeCommandList=function(){for(let t=0;t<y.length;t++){var e=y[t];L(),this.fontSize=r,this.contents.fontSize=r,this.addCommand(e.name,"questList",!0,t)}},P.prototype.itemTextAlign=function(){return R},P.prototype.drawItem=function(t){I();var e=this.itemRect(t),n=y[t];n&&(e=e.clone(),n.hasOwnProperty("complete")&&!n.hasOwnProperty("status")&&(n.complete?n.status="completed":n.status="ongoing"),"completed"===n.status||!0===n.status?(this.changePaintOpacity(!1),this.changeTextColor("#808080")):"ongoing"===n.status||!1===n.status?(this.changePaintOpacity(!0),this.resetTextColor()):(this.changePaintOpacity(!1),this.changeTextColor("#B22222")),this.drawText(this.commandName(t),e.x,e.y,e.width,this.itemTextAlign()))};let A=P.prototype.update;function Q(){this.initialize(...arguments)}function b(t){return"Width"===t?"size1"===m?Graphics.boxWidth:.9*Graphics.boxWidth:"Height"===t?"size1"===m?Graphics.boxHeight:.9*Graphics.boxHeight:"Anchor"===t?"size1"===m?0:.1:"MaxLines"===t?"size1"===m?11+(a?0:4):10+(a?0:3):void 0}function z(){return S.skinFlag&&""!==S.skinName?ImageManager.loadSystem(S.skinName):ImageManager.loadSystem("Window")}function T(){return S.skinFlag&&""!==S.skinName?[S.redT,S.greenT,S.blueT]:$gameSystem.windowTone()}function v(t){t=JSON.parse(t);return t.skinFlag="true"===t.skinFlag,t.redT=parseInt(t.redT),t.greenT=parseInt(t.greenT),t.blueT=parseInt(t.blueT),t}function _(e){var n,i=e.length;let o=0,s=0,r="",a="Running",u="Waiting",c=!1;for(let t=0;t<i;t++)if("Waiting"===u?"Running"===a?"Running"===a&&"\\"!==e[t]||(a="Locked"):"Locked"===a?a="Locked"!==a||"V"!==e[t]&&"v"!==e[t]?"Locked"!==a||"I"!==e[t]&&"i"!==e[t]?"Locked"!==a||"N"!==e[t]&&"n"!==e[t]?"Locked"!==a||"P"!==e[t]&&"p"!==e[t]?"Locked"!==a||"G"!==e[t]&&"g"!==e[t]?"Locked"!==a||"C"!==e[t]&&"c"!==e[t]?"Locked"!==a||"{"!==e[t]&&"}"!==e[t]&&"$"!==e[t]&&"."!==e[t]&&"|"!==e[t]&&"!"!==e[t]&&">"!==e[t]&&"<"!==e[t]&&"^"!==e[t]?"Locked"===a&&"\\"===e[t]?(o-=1,"Running"):"Locked"!==a||"F"!==e[t]&&"f"!==e[t]?"Running":"FontPt1":(o-=2,"Running"):"Color":(n=TextManager.currencyUnit,o=o-2+n.length,"Running"):"PartyOrPos":"Actor":"Icon":"Variable":"Running"!==a&&"Locked"!==a&&"FontPt1"!==a&&"["===e[t]?u="Running":a="PartyOrPos"!==a||"X"!==e[t]&&"x"!==e[t]?"PartyOrPos"!==a||"Y"!==e[t]&&"y"!==e[t]?"FontPt1"!==a||"S"!==e[t]&&"s"!==e[t]?"Running":"FontSize":"PosY":"PosX":isNaN(parseInt(e[t]))?"]"===e[t]&&0===s||isNaN(parseInt(e[t]))&&"]"!==e[t]?("PosX"!==a&&"PosY"!==a&&"FontSize"!==a?o-=2:o-=3,a="Running",u="Waiting",s=0,r=""):"]"===e[t]&&0!==s&&(c=!0):(s++,r+=e[t]),c){switch(a){case"Variable":var l=$gameVariables.value(parseInt(r)).toString().length;o=o-4-s+l;break;case"Icon":o=o-4-s+2;break;case"Actor":PartyOrPos;var l=$dataActors,g=parseInt(r);o=g<=l.length-1&&0<g?(g=l[g].name,o-4-s+g.length):o-4-s;break;case"PartyOrPos":var g=$gameParty,h=$dataActors,d=parseInt(r);o=d<=h.length-1&&0<d&&g._actors.includes(d)?(h=h[d].name,o-4-s+h.length):o-4-s;break;case"Color":o=o-4-s;break;case"PosX":case"PosY":case"FontSize":o=o-5-s}a="Running",u="Waiting",s=0,r=""}return i+o}function C(e){return y.find(function(t){return t.id===e})}function k(e){return y.find(function(t){return t.name===e})}function N(e){for(let t=0;t<y.length;t++)if(y[t].id===e){y.splice(t,1);break}}function H(e){for(let t=0;t<y.length;t++)if(y[t].name===e){y.splice(t,1);break}}function q(){$gameSystem.saveQuestList(y)}function I(){y=$gameSystem.getQuestList()}function M(){$gameSystem.savePluginParams()}function L(){var t=$gameSystem.getPluginParams();n=t.questTitle,i=t.giverPrefix,o=t.areaPrefix,c=t.statusName,l=t.questCompleted,g=t.questOngoing,h=t.questFailed,e=t.questMenuCommandName,s=t.fontSize,p=t.descriptionSize,r=t.listSize,a=t.titleFlag,u=t.layoutAlign,m=t.layoutSize,S=t.skinSettings,f=t.touchCancel}P.prototype.update=function(){A.call(this);var t=this.index();w!==t&&(w=t,SceneManager._scene._questInfoWindow.refresh())},((Q.prototype=Object.create(Window_Base.prototype)).constructor=Q).prototype.initialize=function(t){Window_Base.prototype.initialize.call(this,t),this._quest=null,this.refresh()},Q.prototype.loadWindowskin=function(){this.windowskin=z()},Q.prototype.updateTone=function(){var t=T();this.setTone(t[0],t[1],t[2])},Q.prototype.setQuest=function(t){this._quest!==t&&(this._quest=t,this.refresh())},Q.prototype.clear=function(){this.setQuest(null)},Q.prototype.refresh=function(){var t;this.contents.clear(),this._quest&&(this.lineHeight(),(t=this._quest).hasOwnProperty("complete")&&!t.hasOwnProperty("status")&&(t.status=t.complete),this.drawQuestIcon(t.icon),this.drawQuestName(t),this.drawQuestGiver(t.giver),this.drawQuestArea(t.area),this.drawQuestInfo(t.description),this.drawQuestStatus(t.status))},Q.prototype.checkQuestName=function(t){return!t.hasOwnProperty("longTitle")||void 0===t.longTitle||""===t.longTitle||"undefined"===t.longTitle?t.name:t.longTitle},Q.prototype.drawQuestIcon=function(t){var e=this.innerWidth/2;this.drawIcon(t,e,10)},Q.prototype.drawQuestName=function(t){var e=1.5*this.lineHeight(),n=this.innerWidth,t=this.checkQuestName(t);this.resetFontSettings(),this.drawText(t,0,e,n,"center")},Q.prototype.drawQuestGiver=function(t){var e=3*this.lineHeight(),n=this.innerWidth;this.resetFontSettings(),L(),this.drawText(i+" "+t,0,e,n,"left")},Q.prototype.drawQuestArea=function(t){var e=4*this.lineHeight(),n=this.innerWidth;this.resetFontSettings(),L(),this.drawText(o+" "+t,0,e,n,"left")},Q.prototype.drawQuestInfo=function(i){var o=6*this.lineHeight(),s=""===c&&""===g&&""===l&&""===h?0:2*this.lineHeight(),t=this.innerWidth,i=(this.lineHeight(),i.split("\\n").join("\n"));let r=26;if(this.resetFontSettings(),O){let t=!0,e,n=100;for(var a=this.exTextAligner(i,d);t;)this.fontSize=n,this.contents.fontSize=n,(!((e=this.textSizeExNoReset(a,n)).width>this.innerWidth-2*F||e.height>this.innerHeight-o-s)||--n<10)&&(t=!1,r=n);var u=(this.innerWidth-e.width)/2;this.drawTextExSizable(a,u,o,this.innerWidth,r)}else{L();u=this.exTextAligner(i,d),i=this.textSizeExNoReset(u,p);this.drawTextExSizable(u,(this.innerWidth-i.width)/2,o,t,p)}this.resetFontSettings()},Q.prototype.textSizeExNoReset=function(t,e){this.fontSize=e,this.contents.fontSize=e;e=this.createTextState(t,0,0,0);return e.drawing=!1,this.processAllText(e),{width:e.outputWidth,height:e.outputHeight}},Q.prototype.drawTextExSizable=function(t,e,n,i,o){this.fontSize=o,this.contents.fontSize=o;o=this.createTextState(t,e,n,i);return this.processAllText(o),o.outputWidth},Q.prototype.exTextAligner=function(e,n){if(e.includes("\n")){var i=e.split("\n");let t=0;var o=[];for(const r of i)_(r)>t&&(t=_(r));for(let e=0;e<i.length;e++)if(_(i[e])<t){var s=t-_(i[e]);switch(n){case"left":o.push(i[e]);break;case"center":for(let t=s;0<t;t--)t%2==0?i[e]=i[e]+" ":i[e]=" "+i[e];o.push(i[e]);break;case"right":for(let t=s;0<t;t--)i[e]=" "+i[e];o.push(i[e])}}else o.push(i[e]);return o.join("\n")}return e},Q.prototype.drawQuestStatus=function(t){var e=this.lineHeight()*b("MaxLines"),n=this.innerWidth;L(),this.resetFontSettings();let i;switch(t){case"ongoing":case!1:i=c+" "+g;break;case"completed":case!0:i=c+" "+l;break;case"failed":i=c+" "+h}this.drawText(i,0,e,n,"right")},W.prototype.update=function(){Scene_Base.prototype.update.call(this),this.updateQuestInfo()},W.prototype.updateQuestInfo=function(){I();var t=this._questListWindow.index(),t=y[t];this._questInfoWindow.setQuest(t)},P.prototype.currentQuest=function(){I();var t=this.index();return y[t]},PluginManager.registerCommand("WD_Quest","CreateQuest",function(t){let e=t.status;void 0!==t.complete&&(e="true"===t.complete?"completed":"ongoing");t={id:Number(t.id),icon:Number(t.icon),name:String(t.name),longTitle:String(t.longTitle),index:Number(t.index),giver:String(t.giver),area:String(t.area),description:String(t.description),status:String(e)};I(),y.push(t),q()}),PluginManager.registerCommand("WD_Quest","SetTitle",function(t){n=String(t.title),M()}),PluginManager.registerCommand("WD_Quest","SetGiverPrefix",function(t){i=String(t.prefix),M()}),PluginManager.registerCommand("WD_Quest","SetAreaPrefix",function(t){o=String(t.prefix),M()}),PluginManager.registerCommand("WD_Quest","SetStatusName",function(t){c=String(t.name),M()}),PluginManager.registerCommand("WD_Quest","SetQuestCompleted",function(t){l=String(t.completed),M()}),PluginManager.registerCommand("WD_Quest","SetQuestOngoing",function(t){g=String(t.ongoing),M()}),PluginManager.registerCommand("WD_Quest","OpenQuestScene",function(){SceneManager.push(SceneManager.Scene_Quest)}),PluginManager.registerCommand("WD_Quest","SetCommandName",function(t){var t=t.commandName;t=t,e=t,M()}),PluginManager.registerCommand("WD_Quest","EditQuestDescription",function(t){var e=Number(t.questID),n=String(t.questName),t=String(t.newDescription);I();let i=null;0<e?i=C(e):""!==n&&(i=k(n)),i&&(i.description=t,q())}),PluginManager.registerCommand("WD_Quest","SetQuestTitleFontSize",function(t){t=Number(t.fontSize);s=t,M()}),PluginManager.registerCommand("WD_Quest","SetQuestInfoFontSize",function(t){t=Number(t.fontSize);p=t,M()}),PluginManager.registerCommand("WD_Quest","SetQuestListFontSize",function(t){t=Number(t.fontSize);r=t,M()}),PluginManager.registerCommand("WD_Quest","SetCompletion",function(t){var e=Number(t.questID),n=String(t.questName);let i=t.status,o=(void 0!==t.completion&&(i=i||("true"===t.completion?"completed":"ongoing")),I(),null);0<e?o=C(e):""!==n&&(o=k(n)),o&&(o.status=i,q())}),PluginManager.registerCommand("WD_Quest","RemoveQuestNew",function(t){var e=Number(t.questID),t=String(t.questName);I(),0<e?(N(e),q()):""!==t&&(H(t),q())}),PluginManager.registerCommand("WD_Quest","CheckQuestCompletion",function(e){var t=Number(e.questID),n=String(e.questName),i=Number(e.switchID),e=String(e.selectMode);I();let o=null;if(0<t?o=C(t):""!==n&&(o=k(n)),o){let t;if(t=o.hasOwnProperty("complete")&&!o.hasOwnProperty("status")?o.complete?"completed":"ongoing":o.status,"Variable"===e)switch(t){case"completed":$gameVariables.setValue(i,0);break;case"ongoing":$gameVariables.setValue(i,1);break;case"failed":$gameVariables.setValue(i,2)}else"completed"===t?$gameSwitches.setValue(i,!0):$gameSwitches.setValue(i,!1)}}),PluginManager.registerCommand("WD_Quest","EditQuestIcon",function(t){var e=Number(t.questID),n=String(t.questName),t=Number(t.iconID);I();let i=null;0<e?i=C(e):""!==n&&(i=k(n)),i&&(i.icon=t,q())}),PluginManager.registerCommand("WD_Quest","changeGraphics",function(t){var e=t.titleFlag,n=t.layoutAlign,i=t.layoutSize,o=t.touchCancel,s=function(t){t=JSON.parse(t);return t.redT=parseInt(t.redT),t.greenT=parseInt(t.greenT),t.blueT=parseInt(t.blueT),t}(t.skinSettings);switch(e){case"title1":a=!0;break;case"title2":a=!1}switch(n){case"layout1":case"layout2":u=n}switch(i){case"size1":case"size2":m=i}switch(o){case"cancel1":f=!0;break;case"cancel2":f=!1}switch(s.skinFlag){case"skin1":S.skinFlag=!0,S.skinName=s.skinName,S.redT=s.redT,S.greenT=s.greenT,S.blueT=s.blueT;break;case"skin2":S.skinFlag=!1}M()}),Game_System.prototype.saveQuestList=function(t){this._questList=t},Game_System.prototype.getQuestList=function(){return this._questList||[]},Game_System.prototype.savePluginParams=function(){this._questPluginParams={questTitle:n,giverPrefix:i,areaPrefix:o,statusName:c,questCompleted:l,questOngoing:g,questFailed:h,questMenuCommandName:e,fontSize:s,descriptionSize:p,listSize:r,titleFlag:a,layoutAlign:u,layoutSize:m,skinSettings:S,touchCancel:f}},Game_System.prototype.getPluginParams=function(){return this._questPluginParams||{questTitle:t.Title||"QuestLog",giverPrefix:t.giverprefix||"From:",areaPrefix:t.areaprefix||"Area:",statusName:t.statusname||"Status:",questCompleted:t.questcompleted||"Completed",questOngoing:t.questongoing||"Ongoing",questFailed:t.questfailed||"Failed",questMenuCommandName:t.commandname||"QuestLog",fontSize:Number(t.fontsize)||40,descriptionSize:Number(t.descriptionSize)||20,listSize:Number(t.listSize)||20,titleFlag:"true"===t.titleFlag,layoutAlign:t.layoutAlign||"layout1",layoutSize:t.layoutSize||"size1",skinSettings:v(t.skinSettings),touchCancel:"true"===t.touchCancel}},PluginManager.registerCommand("WD_Quest","SetCompletionByName",function(t){for(var e=t.questName,n="true"===t.completion?"completed":"ongoing",i=0;i<y.length;i++)if(y[i].name===e){y[i].status=n;break}q()}),PluginManager.registerCommand("WD_Quest","SetCompletionByID",function(t){var e=Number(t.questID),t="true"===t.completion?"completed":"ongoing",n=e,i=t;for(let t=0;t<y.length;t++)if(y[t].id===n){y[t].status=i;break}q()}),PluginManager.registerCommand("WD_Quest","RemoveQuestByID",function(t){N(Number(t.questID)),q()}),PluginManager.registerCommand("WD_Quest","RemoveQuest",function(t){H(t.questName),q()}),window.WD_Interplugin_Quest={checkCompletionID:function(t){{I();let e=null;if(e=0<t?C(t):e){let t;return"completed"===(t=e.hasOwnProperty("complete")&&!e.hasOwnProperty("status")?e.complete?"completed":"ongoing":e.status)}return!1}},checkCompletionName:function(t){I();var e=null;if(e=k(t)){let t;return"completed"===(t=e.hasOwnProperty("complete")&&!e.hasOwnProperty("status")?e.complete?"completed":"ongoing":e.status)}return!1}}}();