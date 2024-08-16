//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.46;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.46] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x337b09=_0x4272;(function(_0xe809e2,_0x27fb27){const _0x44a8f6=_0x4272,_0x31cd32=_0xe809e2();while(!![]){try{const _0x5e49cf=-parseInt(_0x44a8f6(0x303))/0x1*(parseInt(_0x44a8f6(0x13a))/0x2)+-parseInt(_0x44a8f6(0x295))/0x3+parseInt(_0x44a8f6(0x16f))/0x4+-parseInt(_0x44a8f6(0x304))/0x5+-parseInt(_0x44a8f6(0x214))/0x6*(parseInt(_0x44a8f6(0x2cb))/0x7)+-parseInt(_0x44a8f6(0x201))/0x8*(-parseInt(_0x44a8f6(0x164))/0x9)+-parseInt(_0x44a8f6(0x24c))/0xa*(-parseInt(_0x44a8f6(0x23a))/0xb);if(_0x5e49cf===_0x27fb27)break;else _0x31cd32['push'](_0x31cd32['shift']());}catch(_0x4f6df6){_0x31cd32['push'](_0x31cd32['shift']());}}}(_0x2c24,0x47600));function _0x4272(_0x6fdfd4,_0x3c57ad){const _0x2c24a=_0x2c24();return _0x4272=function(_0x427245,_0x337a3d){_0x427245=_0x427245-0xc8;let _0x4fbf2d=_0x2c24a[_0x427245];return _0x4fbf2d;},_0x4272(_0x6fdfd4,_0x3c57ad);}var label=_0x337b09(0x2c2),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x54426f){const _0x3deb29=_0x337b09;return _0x54426f[_0x3deb29(0x35a)]&&_0x54426f[_0x3deb29(0x31f)][_0x3deb29(0x1a4)]('['+label+']');})[0x0];function _0x2c24(){const _0x3112ca=['5430xkiJKV','onExpireStateJS','Parse_Notetags_Skill_Cost','applyStateTurnManipulationEffects','testApply','MAXMP','getStateIdWithName','onAddBuffJS','currentValue','_actor','isGroupDefeatStateAffected','Sprite_StateIcon_loadBitmap','buff','registerCommand','MaxTurns','isStateExpired','MatchLabelGaugeColor','meetsPassiveStateConditionSwitches','makeSuccess','setPassiveStateSlipDamageJS','commandNameWindowCenter','Game_BattlerBase_states','process_VisuMZ_SkillsStatesCore_State_Notetags','states','SkillSceneAdjustSkillList','setDebuffTurns','makeItemList','Sprite_Gauge_currentMaxValue','uiInputPosition','user','Window_StatusBase_placeGauge','frameCount','mainCommandWidth','ParseSkillChangessIntoData','split','setItem','hasSkill','onExpireDebuff','addPassiveStatesTraitSets','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','_result','getColor','ARRAYFUNC','buffColor','onEraseDebuff','_stypeId','_animationIndex','drawActorStateData','POSITIVE','magicSkills','TurnOffsetY','drawItemStyleIcon','ceil','width','removeStatesByCategory','CalcJS','onAddStateCustomJS','_hidden','clearStatesWithStateRetain','GaugeDrawJS','clear','actorId','onExpireBuffJS','LayoutStyle','checkSkillConditionsNotetags','currentMaxValueSkillsStatesCore','Game_Battler_addBuff','_stateDisplay','allSwitchOn','getStateData','drawTextEx','getSkillChangesFromState','Game_BattlerBase_buffIconIndex','164487CTYqbi','iconHeight','CheckVisibleSwitchNotetags','checkSkillTypeMatch','_categoryWindow','removeStatesByCategoryAll','Parse_Notetags_State_PassiveJS','prepareResetStateCounts','ColorPositive','filter','updateStatesActionEnd','mainAreaTop','onExpireState','Game_Battler_addState','valueOutlineColor','IconStypeNorm','endAction','usableSkills','addStateTurns','StackBuffMax','LUK','meetsSkillConditionsEnableJS','push','isBuffOrDebuffAffected','onEraseBuff','Game_BattlerBase_resetStateCounts','meetsSkillConditions','rgba(0,\x200,\x200,\x201)','State-%1-%2','drawActorBuffRates','makeCommandList','redraw','stateTpSlipDamageJS','_commandNameWindow','setStateRetainType','ParseStateNotetags','_battler','_stateData','inBattle','meetsSkillConditionsGlobalJS','adjustSkillCost','gaugeLineHeight','_data','_checkingPassiveStates','match','SkillsStatesCore','NEGATIVE','Sprite_Gauge_setup','isStateRestrict','updatedLayoutStyle','HiddenSkillTypes','commandStyleCheck','skillLearn','ParseClassIDs','95438UwBgDQ','maxSlipDamage','itemWindowRectSkillsStatesCore','getCurrentTroopUniqueID','skill','_classIDs','%1%','isSkillTypeMatchForUse','getStypeIdWithName','Name','Game_BattlerBase_increaseBuff','removeBuffsAuto','ARRAYNUM','_stateMaxTurns','indexOf','convertGaugeTypeSkillsStatesCore','clearStateOrigin','ConvertParams','paySkillCost','uiMenuStyle','LabelOutlineWidth','makeResistedStateCategories','skillTpCost','EnableLayout','_skillTypeWindow','mpCost','drawActorStateTurns','sortSkillList','helpWindowRect','getCurrentStateOriginKey','LabelOutlineSolid','Sprite_Gauge_gaugeRate','SortByIDandPriority','_turnDisplaySprite','anchor','_statusWindow','number','onEraseBuffGlobalJS','fontBold','CheckIncompatibleStates','statePassiveConditionJS','Scene_Skill_skillTypeWindowRect','heal','concat','GroupDigits','valueOutlineWidth','remove','getPassiveStatesFromObj','Enemy','allSwitchOff','drawIcon','bypassRemoveStatesByDamage','textSizeEx','addWindow','Game_Actor_skillTypes','Sprite_Gauge_initMembers','4159XjVcBm','1692820wbJLja','stateId','members','Game_Battler_addDebuff','ALL','BattleManager_endAction','_colorCache','NUM','statesByCategory','changeTextColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onAddDebuff','skillVisibleJS','_scene','slipTp','boxWidth','map','Game_Troop_setup','shift','meetsPassiveStateConditionClasses','paramBuffRate','Scene_Skill_itemWindowRect','_cache_getPassiveStateConditionSwitchData','ColorNeutral','setup','Skills','onAddDebuffGlobalJS','description','gaugeColor2','Weapon-%1-%2','_endingBattle','none','length','_stypeIDs','skillId','CmdWidth','canClearState','<troop-%1>','shopStatusWindowRect','skillCostSeparator','round','helpAreaTop','ATK','process_VisuMZ_SkillsStatesCore_Skill_Notetags','sortPriority','ActorIDs','replace','CheckVisibleBattleNotetags','TurnOffsetX','_cache_getPassiveStatesFromObj','_subject','addPassiveStatesByPluginParameters','Game_BattlerBase_refresh','log','Game_BattlerBase_isStateResist','regenerateAll','stateAddJS','_skillIDs','parameters','ShowShopStatus','isPartyAllAffectedByGroupDefeatStates','labelFontFace','drawFullGauge','slipMp','isStateRemoved','ParseSkillNotetags','clearStates','getPassiveStateConditionClassesData','checkShowHideJS','Game_BattlerBase_eraseBuff','allIcons','refresh','Settings','_buffs','isSkillHidden','gaugeRate','skillEnableJS','_cache','GaugeMaxJS','SkillConditionJS','Turns','LabelFontMainType','isStateAddable','Window_StatusBase_drawActorIcons','actions','labelOutlineColor','status','return\x200','isCommandEnabled','SortSkillTypesAbc','statusWindowRect','StackDebuffMax','gainSilentTp','onExpireStateCustomJS','mpDamage','updateVisibility','SkillSceneStatusBgType','loadBitmap','Parse_Notetags_State_Category','iconText','onEraseStateGlobalJS','process_VisuMZ_SkillsStatesCore_Notetags','isPlaytest','Parse_Notetags_Skill_JS','drawActorIcons','parse','buttonAssistText1','AutoAddState','numberFontFace','Game_BattlerBase_skillTpCost','Game_Action_testApply','stateMpSlipHealJS','currentMaxValue','\x5cI[%1]%2','ShowTurns','checkCacheKey','allowCreateShopStatusWindow','applySkillsStatesCoreEffects','_currentTroopUniqueID','fontSize','resetStateCounts','makeAdditionalSkillCostText','onEraseDebuffJS','onEraseStateJS','isMaxDebuffAffected','debuffTurns','EnemyIndex','_checkingVisuMzPassiveStateObjects','TurnFontSize','setActor','stateExpireJS','fillRect','<member-%1>','add','Window_SkillList_maxCols','helpWindowRectSkillsStatesCore','addDebuffTurns','StateID','DEF','test','mainAreaHeight','ReapplyRules','stateData','textColor','death','isBuffAffected','itemLineRect','retrieveStateColor','clamp','Parse_Notetags_Skill_Sorting','_skillChangesFromState','changeSkillsThroughStateEffects','ColorNegative','initialize','mainFontSize','MDF','onExpireStateGlobalJS','categories','drawParamText','PassiveConditionJS','callUpdateHelp','initMembers','_stateRetainType','addPassiveStatesByNotetag','Scene_Skill_createItemWindow','getStateRetainType','commandNameWindowDrawText','makeCommandName','equipBattleSkills','iconIndex','outlineColor','convertTargetToStateOriginKey','stateHpSlipDamageJS','trim','Sprite_StateIcon_updateFrame','buffTurns','meetsStateCondition','setStateTurns','Parse_Notetags_State_SlipEffectJS','isStateCategoryResisted','keys','Window_SkillList_updateHelp','onAddState','removeByDamage','Window_SkillType_initialize','auto','placeExactGauge','center','opacity','TurnEndOnMap','setStateData','valueFontSize','passiveStateObjects','_tempActor','addPassiveStatesFromOtherPlugins','TextJS','VisuMZ_1_ItemsEquipsCore','Game_BattlerBase_recoverAll','_shopStatusWindow','ParseAllNotetags','GaugeCurrentJS','checkShowHideNotetags','call','fontFace','isUseSkillsStatesCoreUpdatedLayout','statusWidth','state','Actor','ShowJS','applyStateCategoryRemovalEffects','shopStatusWindowRectSkillsStatesCore','Param','skillMpCost','calcWindowHeight','note','stateTurns','setupSkillsStatesCore','buffIconIndex','createKeyJS','Game_Switches_onChange','MultiplierJS','exit','SkillMenuStatusRect','decreaseBuff','ShowData','Buffs','greater','onRemoveState','Game_BattlerBase_clearStates','_tempBattler','onChange','CoreEngine','_cache_getPassiveStateConditionClassesData','76kQuLvg','removeStatesByDamage','overwriteBuffTurns','commandName','hasStateCategory','getSkillIdWithName','ListWindowCols','uiHelpPosition','_stateTurns','meetsPassiveStateConditions','setBuffTurns','drawActorBuffTurns','createItemWindow','localeCompare','updateTurnDisplaySprite','toUpperCase','createPassiveStatesCache','StateTurnsActorChangeBy','damage','shopStatusWidth','isSceneBattle','gradientFillRect','isMaxBuffAffected','clearAllStateOrigins','traitsSet','Game_BattlerBase_traitsSet','ColorBuff','anySwitchOff','Game_Action_applyItemUserEffect','isSkillCostShown','MAT','STRUCT','ValueOutlineWidth','BattleHiddenSkillTypes','EVAL','isStateAffected','removeState','Game_Battler_regenerateAll','prototype','isRightInputMode','stateEraseJS','clearStateRetainType','9yBddPc','onExpireDebuffGlobalJS','lineHeight','itemWindowRect','recover\x20all','VisuMZ_1_MainMenuCore','item','contents','onAddStateMakeCustomSlipValues','constructor','gaugeBackColor','1974816cyHhhh','removeOtherStatesOfSameCategory','Scene_Skill_statusWindowRect','makeCurrentTroopUniqueID','autoRemovalTiming','icon','format','addChild','index','active','stateMpSlipDamageJS','VisuMZ_1_ElementStatusCore','ColorDebuff','_checkingTraitsSetSkillsStatesCore','onEraseDebuffGlobalJS','multiclasses','createCommandNameWindow','VisuMZ_0_CoreEngine','isBottomHelpMode','onEraseBuffJS','redrawSkillsStatesCore','currentClass','priority','onAddStateGlobalJS','Game_Actor_forgetSkill','_states','applyBuffTurnManipulationEffects','passiveStates','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','value','SkillID','canUse','onExpireBuff','labelFontSize','_itemWindow','learnSkill','Game_BattlerBase_overwriteBuffTurns','PassiveStates','onDatabaseLoaded','onBattleEnd','convertPassiveStates','stateMaximumTurns','_stored_state-%1-color','reset','_stored_debuffColor','isAlive','clearStateData','setStatusWindow','onAddStateJS','stateHpSlipHealJS','getStateOriginByKey','_currentActor','_stateIDs','includes','Sprite_Gauge_currentValue','name','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isBuffPrevented','onAddDebuffJS','allBattleMembers','includesSkillsStatesCore','canPaySkillCost','increaseBuff','tpCost','isSkillUsableForAutoBattle','recoverAll','resetFontSettings','hasState','Enemy-%1-%2','addState','onExpireBuffGlobalJS','onRegenerateCustomStateDamageOverTime','canChangeSkillsThroughStateEffects','addBuffTurns','skills','Game_BattlerBase_initMembers','gainHp','Game_BattlerBase_decreaseBuff','drawActorIconsAllTurnCounters','rgba(0,\x200,\x200,\x200)','getStateDisplay','getStateOrigin','drawExtendedSkillsStatesCoreStatus','AGI','CanPayJS','PayJS','Window_SkillList_includes','FUNC','isPassiveStateStackable','initMembersSkillsStatesCore','Item-%1-%2','ARRAYJSON','hpDamage','Costs','Game_Battler_isStateAddable','onEraseStateCustomJS','commandStyle','mainFontFace','adjustItemWidthByShopStatus','getSkillTypes','updateStateTurns','forgetSkill','ActionEndUpdate','Game_Actor_learnSkill','ignore','drawExtendedParameter','sort','floor','currentDisplayedValue','placeGauge','text','multiClass','DisplayedParams','commandNameWindowDrawBackground','itemTextAlign','updateCommandNameWindow','clearStateDisplay','iconWidth','RefreshCacheVar','ValueFontMainType','setStateOrigin','max','getColorDataFromPluginParameters','anySwitchOn','isUseModernControls','success','maxItems','removeStatesAuto','labelOutlineWidth','%1\x20%2\x20%3','meetsPassiveStateConditionJS','toLowerCase','Sprite_Gauge_redraw','VisuMZ_2_ClassChangeSystem','_costSettings','_stateOrigin','createShopStatusWindow','Game_BattlerBase_skillMpCost','innerWidth','isDebuffAffected','StateTurnsEnemyChangeTo','Scene_Boot_onDatabaseLoaded','SortByIDandPriorityUsingIDs','Window_SkillStatus_refresh','checkSkillConditionsSwitchNotetags','enemyId','1716832YwlsAS','meetsPassiveStateGlobalConditionJS','isLearnedSkill','CheckVisibleSkillNotetags','deadMembers','skillTypeWindowRect','_skills','stateTpSlipHealJS','_lastStatesActionEndFrameCount','maxCols','Skill-%1-%2','isStateResist','isActor','addPassiveStates','addDebuff','getClassIdWithName','ValueOutlineSolid','Game_Battler_onBattleEnd','eraseBuff','138gdDsII','setBackgroundType','drawItem','statusWindowRectSkillsStatesCore','DataFontSize','recalculateSlipDamageJS','height','aliveMembers','createTurnDisplaySprite','eraseState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_passiveStateResults','createSkillCostText','bitmap','canSortSkillTypeList','untitled','regenerateAllSkillsStatesCore','itemAt','StateTurnsEnemyChangeBy','slipHp','_stateSteps','buttonAssistSwitch','passiveStateIDs','MAXHP','isAllDead','DataOffsetY','skillTypes','groupDefeat','Window_SkillList_setActor','JSON','applyDebuffTurnManipulationEffects','addBuff','alterSkillName','Game_BattlerBase_eraseState','_buffTurns','Game_Unit_deadMembers','Gauge','right','9097hXzajk','DataOffsetX','_stored_buffColor','drawText','drawSkillCost','Parse_Notetags_State_ApplyRemoveLeaveJS','testSkillStatesCoreNotetags','onAddBuff','States','<actor-%1>','onAddBuffGlobalJS','changeOutlineColor','actor','createAllSkillCostText','resetTextColor','applyItemUserEffect','drawItemStyleIconText','updateHelp'];_0x2c24=function(){return _0x3112ca;};return _0x2c24();}VisuMZ[label][_0x337b09(0x34c)]=VisuMZ[label][_0x337b09(0x34c)]||{},VisuMZ[_0x337b09(0x2dc)]=function(_0x37984f,_0x472b60){const _0x1910ef=_0x337b09;for(const _0xf97d43 in _0x472b60){if(_0xf97d43[_0x1910ef(0x2c1)](/(.*):(.*)/i)){const _0x133b4a=String(RegExp['$1']),_0x49ffcc=String(RegExp['$2'])['toUpperCase']()[_0x1910ef(0xfe)]();let _0x1d8550,_0x1d988d,_0x5d1ee6;switch(_0x49ffcc){case _0x1910ef(0x30b):_0x1d8550=_0x472b60[_0xf97d43]!==''?Number(_0x472b60[_0xf97d43]):0x0;break;case _0x1910ef(0x2d7):_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON['parse'](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d[_0x1910ef(0x314)](_0x17b275=>Number(_0x17b275));break;case _0x1910ef(0x15c):_0x1d8550=_0x472b60[_0xf97d43]!==''?eval(_0x472b60[_0xf97d43]):null;break;case'ARRAYEVAL':_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d[_0x1910ef(0x314)](_0x5d5745=>eval(_0x5d5745));break;case _0x1910ef(0x231):_0x1d8550=_0x472b60[_0xf97d43]!==''?JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43]):'';break;case _0x1910ef(0x1ca):_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d[_0x1910ef(0x314)](_0x25fa86=>JSON[_0x1910ef(0x36d)](_0x25fa86));break;case _0x1910ef(0x1c6):_0x1d8550=_0x472b60[_0xf97d43]!==''?new Function(JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43])):new Function(_0x1910ef(0x35b));break;case _0x1910ef(0x276):_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d[_0x1910ef(0x314)](_0x229adb=>new Function(JSON[_0x1910ef(0x36d)](_0x229adb)));break;case'STR':_0x1d8550=_0x472b60[_0xf97d43]!==''?String(_0x472b60[_0xf97d43]):'';break;case'ARRAYSTR':_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON['parse'](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d['map'](_0x10b3e8=>String(_0x10b3e8));break;case _0x1910ef(0x159):_0x5d1ee6=_0x472b60[_0xf97d43]!==''?JSON[_0x1910ef(0x36d)](_0x472b60[_0xf97d43]):{},_0x37984f[_0x133b4a]={},VisuMZ[_0x1910ef(0x2dc)](_0x37984f[_0x133b4a],_0x5d1ee6);continue;case'ARRAYSTRUCT':_0x1d988d=_0x472b60[_0xf97d43]!==''?JSON['parse'](_0x472b60[_0xf97d43]):[],_0x1d8550=_0x1d988d[_0x1910ef(0x314)](_0x55d04f=>VisuMZ['ConvertParams']({},JSON[_0x1910ef(0x36d)](_0x55d04f)));break;default:continue;}_0x37984f[_0x133b4a]=_0x1d8550;}}return _0x37984f;},(_0x4ab37d=>{const _0x312e83=_0x337b09,_0x1a489a=_0x4ab37d[_0x312e83(0x1a6)];for(const _0x524366 of dependencies){if(!Imported[_0x524366]){alert(_0x312e83(0x18b)[_0x312e83(0x175)](_0x1a489a,_0x524366)),SceneManager[_0x312e83(0x12e)]();break;}}const _0x1cbec9=_0x4ab37d['description'];if(_0x1cbec9[_0x312e83(0x2c1)](/\[Version[ ](.*?)\]/i)){const _0x2d3cb6=Number(RegExp['$1']);_0x2d3cb6!==VisuMZ[label]['version']&&(alert(_0x312e83(0x1a7)[_0x312e83(0x175)](_0x1a489a,_0x2d3cb6)),SceneManager[_0x312e83(0x12e)]());}if(_0x1cbec9['match'](/\[Tier[ ](\d+)\]/i)){const _0x2a8d0c=Number(RegExp['$1']);_0x2a8d0c<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x312e83(0x175)](_0x1a489a,_0x2a8d0c,tier)),SceneManager[_0x312e83(0x12e)]()):tier=Math[_0x312e83(0x1e8)](_0x2a8d0c,tier);}VisuMZ[_0x312e83(0x2dc)](VisuMZ[label][_0x312e83(0x34c)],_0x4ab37d[_0x312e83(0x33e)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x337b09(0x1a6)],'SkillActorPaySkillCost',_0x159749=>{const _0xfe3975=_0x337b09;VisuMZ[_0xfe3975(0x2dc)](_0x159749,_0x159749);const _0x437072=_0x159749[_0xfe3975(0x331)]||[],_0x9b77d7=Number(_0x159749[_0xfe3975(0x18d)]),_0x1ef715=$dataSkills[_0x9b77d7];if(!_0x1ef715)return;for(const _0x29650e of _0x437072){const _0x24ac37=$gameActors[_0xfe3975(0x246)](_0x29650e);if(!_0x24ac37)continue;_0x24ac37[_0xfe3975(0x2dd)](_0x1ef715);}}),PluginManager[_0x337b09(0x259)](pluginData[_0x337b09(0x1a6)],'SkillEnemyPaySkillCost',_0x31f6a7=>{const _0x1440c9=_0x337b09;VisuMZ['ConvertParams'](_0x31f6a7,_0x31f6a7);const _0xe6fa18=_0x31f6a7[_0x1440c9(0xcf)]||[],_0x20b250=Number(_0x31f6a7[_0x1440c9(0x18d)]),_0x4ab2df=$dataSkills[_0x20b250];if(!_0x4ab2df)return;for(const _0x5df70c of _0xe6fa18){const _0x51627b=$gameTroop[_0x1440c9(0x306)]()[_0x5df70c];if(!_0x51627b)continue;_0x51627b[_0x1440c9(0x2dd)](_0x4ab2df);}}),PluginManager[_0x337b09(0x259)](pluginData[_0x337b09(0x1a6)],_0x337b09(0x14b),_0xebf98e=>{const _0x74bcbc=_0x337b09;VisuMZ[_0x74bcbc(0x2dc)](_0xebf98e,_0xebf98e);const _0x1282c4=_0xebf98e[_0x74bcbc(0x331)]||[],_0x50d211=Number(_0xebf98e[_0x74bcbc(0xda)]),_0x5b4c23=Number(_0xebf98e[_0x74bcbc(0x354)]),_0x3e46ae=_0xebf98e[_0x74bcbc(0x36f)];for(const _0x96b4c6 of _0x1282c4){const _0x1a3071=$gameActors[_0x74bcbc(0x246)](_0x96b4c6);if(!_0x1a3071)continue;_0x3e46ae&&!_0x1a3071[_0x74bcbc(0x15d)](_0x50d211)?(_0x1a3071['addState'](_0x50d211),_0x1a3071[_0x74bcbc(0x102)](_0x50d211,_0x5b4c23)):_0x1a3071['addStateTurns'](_0x50d211,_0x5b4c23);}}),PluginManager[_0x337b09(0x259)](pluginData['name'],'StateTurnsActorChangeTo',_0x1210f4=>{const _0x111dd9=_0x337b09;VisuMZ['ConvertParams'](_0x1210f4,_0x1210f4);const _0x542814=_0x1210f4[_0x111dd9(0x331)]||[],_0x220316=Number(_0x1210f4['StateID']),_0x3f9e38=Math[_0x111dd9(0x1e8)](Number(_0x1210f4[_0x111dd9(0x354)]),0x0),_0x40a238=_0x1210f4[_0x111dd9(0x36f)];for(const _0x5ebbed of _0x542814){const _0x169008=$gameActors[_0x111dd9(0x246)](_0x5ebbed);if(!_0x169008)continue;_0x40a238&&!_0x169008[_0x111dd9(0x15d)](_0x220316)&&_0x169008[_0x111dd9(0x1b4)](_0x220316),_0x169008[_0x111dd9(0x102)](_0x220316,_0x3f9e38);}}),PluginManager[_0x337b09(0x259)](pluginData[_0x337b09(0x1a6)],_0x337b09(0x226),_0x15cca4=>{const _0x3eb17b=_0x337b09;if(!$gameParty[_0x3eb17b(0x2bb)]())return;VisuMZ[_0x3eb17b(0x2dc)](_0x15cca4,_0x15cca4);const _0x2e6b79=_0x15cca4[_0x3eb17b(0xcf)]||[],_0x4b76cf=Number(_0x15cca4['StateID']),_0x4db004=Number(_0x15cca4[_0x3eb17b(0x354)]),_0x535746=_0x15cca4[_0x3eb17b(0x36f)];for(const _0x3df299 of _0x2e6b79){const _0x5dcd8a=$gameTroop[_0x3eb17b(0x306)]()[_0x3df299];if(!_0x5dcd8a)continue;_0x535746&&!_0x5dcd8a['isStateAffected'](_0x4b76cf)?(_0x5dcd8a[_0x3eb17b(0x1b4)](_0x4b76cf),_0x5dcd8a[_0x3eb17b(0x102)](_0x4b76cf,_0x4db004)):_0x5dcd8a[_0x3eb17b(0x2a7)](_0x4b76cf,_0x4db004);}}),PluginManager[_0x337b09(0x259)](pluginData[_0x337b09(0x1a6)],_0x337b09(0x1fb),_0x5eee57=>{const _0x38ed36=_0x337b09;if(!$gameParty['inBattle']())return;VisuMZ[_0x38ed36(0x2dc)](_0x5eee57,_0x5eee57);const _0x57e07d=_0x5eee57[_0x38ed36(0xcf)]||[],_0x2f2251=Number(_0x5eee57[_0x38ed36(0xda)]),_0x3729a6=Math[_0x38ed36(0x1e8)](Number(_0x5eee57[_0x38ed36(0x354)]),0x0),_0x3b9e35=_0x5eee57[_0x38ed36(0x36f)];for(const _0x2c4854 of _0x57e07d){const _0x4684dd=$gameTroop[_0x38ed36(0x306)]()[_0x2c4854];if(!_0x4684dd)continue;_0x3b9e35&&!_0x4684dd[_0x38ed36(0x15d)](_0x2f2251)&&_0x4684dd[_0x38ed36(0x1b4)](_0x2f2251),_0x4684dd[_0x38ed36(0x102)](_0x2f2251,_0x3729a6);}}),VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1fc)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype'][_0x337b09(0x195)]=function(){const _0x1539d6=_0x337b09;VisuMZ[_0x1539d6(0x2c2)][_0x1539d6(0x1fc)][_0x1539d6(0x11b)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ['SkillsStatesCore'][_0x1539d6(0x2f2)]();},Scene_Boot['prototype'][_0x337b09(0x369)]=function(){const _0x5b2e0b=_0x337b09;if(VisuMZ[_0x5b2e0b(0x118)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x5b2e0b(0x262)]();},Scene_Boot[_0x337b09(0x160)][_0x337b09(0x32f)]=function(){const _0x1e5d00=_0x337b09;for(const _0x279d21 of $dataSkills){if(!_0x279d21)continue;VisuMZ[_0x1e5d00(0x2c2)][_0x1e5d00(0x24e)](_0x279d21),VisuMZ[_0x1e5d00(0x2c2)][_0x1e5d00(0xe6)](_0x279d21),VisuMZ[_0x1e5d00(0x2c2)][_0x1e5d00(0x36b)](_0x279d21);}},Scene_Boot[_0x337b09(0x160)][_0x337b09(0x262)]=function(){const _0x50d675=_0x337b09;for(const _0x42ceea of $dataStates){if(!_0x42ceea)continue;VisuMZ['SkillsStatesCore'][_0x50d675(0x366)](_0x42ceea),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS'](_0x42ceea),VisuMZ[_0x50d675(0x2c2)][_0x50d675(0x103)](_0x42ceea),VisuMZ[_0x50d675(0x2c2)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x42ceea);}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x345)]=VisuMZ[_0x337b09(0x345)],VisuMZ[_0x337b09(0x345)]=function(_0x5bf973){const _0x34eed2=_0x337b09;VisuMZ['SkillsStatesCore']['ParseSkillNotetags']['call'](this,_0x5bf973),VisuMZ[_0x34eed2(0x2c2)][_0x34eed2(0x24e)](_0x5bf973),VisuMZ[_0x34eed2(0x2c2)][_0x34eed2(0xe6)](_0x5bf973),VisuMZ[_0x34eed2(0x2c2)]['Parse_Notetags_Skill_JS'](_0x5bf973);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2b8)]=VisuMZ[_0x337b09(0x2b8)],VisuMZ[_0x337b09(0x2b8)]=function(_0x38a505){const _0x3dd253=_0x337b09;VisuMZ[_0x3dd253(0x2c2)][_0x3dd253(0x2b8)][_0x3dd253(0x11b)](this,_0x38a505),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category'](_0x38a505),VisuMZ[_0x3dd253(0x2c2)][_0x3dd253(0x29b)](_0x38a505),VisuMZ[_0x3dd253(0x2c2)]['Parse_Notetags_State_SlipEffectJS'](_0x38a505),VisuMZ[_0x3dd253(0x2c2)][_0x3dd253(0x23f)](_0x38a505);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x24e)]=function(_0x5891c7){const _0x16b2a3=_0x337b09,_0x234b8c=_0x5891c7[_0x16b2a3(0x127)];_0x234b8c['match'](/<MP COST:[ ](\d+)>/i)&&(_0x5891c7[_0x16b2a3(0x2e4)]=Number(RegExp['$1'])),_0x234b8c[_0x16b2a3(0x2c1)](/<TP COST:[ ](\d+)>/i)&&(_0x5891c7[_0x16b2a3(0x1ae)]=Number(RegExp['$1']));},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0xe6)]=function(_0x593123){const _0x2ab0f6=_0x337b09;if(!_0x593123)return;_0x593123[_0x2ab0f6(0x330)]=0x32;const _0x141abd=_0x593123[_0x2ab0f6(0x127)]||'';_0x141abd[_0x2ab0f6(0x2c1)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x593123['sortPriority']=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore']['skillEnableJS']={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x310)]={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x36b)]=function(_0x43a7df){const _0x252403=_0x337b09,_0x41b789=_0x43a7df[_0x252403(0x127)];if(_0x41b789['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1d5437=String(RegExp['$1']),_0x263697=_0x252403(0x21e)[_0x252403(0x175)](_0x1d5437);VisuMZ[_0x252403(0x2c2)][_0x252403(0x350)][_0x43a7df['id']]=new Function(_0x252403(0x2cf),_0x263697);}if(_0x41b789[_0x252403(0x2c1)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1a7c28=String(RegExp['$1']),_0xddd846=_0x252403(0x30e)[_0x252403(0x175)](_0x1a7c28);VisuMZ[_0x252403(0x2c2)][_0x252403(0x310)][_0x43a7df['id']]=new Function(_0x252403(0x2cf),_0xddd846);}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x366)]=function(_0x583b27){const _0x38d36f=_0x337b09;_0x583b27['categories']=[_0x38d36f(0x308),'ANY'];const _0x59b481=_0x583b27['note'],_0x49a98e=_0x59b481['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x49a98e)for(const _0xd13492 of _0x49a98e){_0xd13492[_0x38d36f(0x2c1)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x568190=String(RegExp['$1'])['toUpperCase']()[_0x38d36f(0xfe)]()['split'](',');for(const _0x48670b of _0x568190){_0x583b27['categories'][_0x38d36f(0x2ab)](_0x48670b['trim']());}}if(_0x59b481[_0x38d36f(0x2c1)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x576e0e=RegExp['$1'][_0x38d36f(0x26e)](/[\r\n]+/);for(const _0x43687b of _0x576e0e){_0x583b27['categories'][_0x38d36f(0x2ab)](_0x43687b[_0x38d36f(0x149)]()[_0x38d36f(0xfe)]());}}_0x59b481[_0x38d36f(0x2c1)](/<POSITIVE STATE>/i)&&_0x583b27[_0x38d36f(0xee)][_0x38d36f(0x2ab)](_0x38d36f(0x27c)),_0x59b481[_0x38d36f(0x2c1)](/<NEGATIVE STATE>/i)&&_0x583b27['categories'][_0x38d36f(0x2ab)](_0x38d36f(0x2c3));},VisuMZ[_0x337b09(0x2c2)]['statePassiveConditionJS']={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x29b)]=function(_0x5c0af0){const _0x63cd82=_0x337b09,_0x15a833=_0x5c0af0[_0x63cd82(0x127)];if(_0x15a833[_0x63cd82(0x2c1)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x35d8ea=String(RegExp['$1']),_0x52d5ee='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x63cd82(0x175)](_0x35d8ea);VisuMZ['SkillsStatesCore'][_0x63cd82(0x2f3)][_0x5c0af0['id']]=new Function(_0x63cd82(0x11f),_0x52d5ee);}},VisuMZ[_0x337b09(0x2c2)]['stateHpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0x337b09(0x1a0)]={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x179)]={},VisuMZ['SkillsStatesCore'][_0x337b09(0x373)]={},VisuMZ['SkillsStatesCore'][_0x337b09(0x2b5)]={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x208)]={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x103)]=function(_0x256949){const _0x158631=_0x337b09,_0x3767fe=_0x256949['note'],_0x51e23b=_0x158631(0x273);if(_0x3767fe[_0x158631(0x2c1)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0xbdd8b1=String(RegExp['$1']),_0x5d0ad8=_0x51e23b['format'](_0xbdd8b1,_0x158631(0x14c),-0x1,'slipHp');VisuMZ['SkillsStatesCore']['stateHpSlipDamageJS'][_0x256949['id']]=new Function(_0x158631(0x305),_0x5d0ad8);}else{if(_0x3767fe['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x3050ba=String(RegExp['$1']),_0x3c65b4=_0x51e23b['format'](_0x3050ba,_0x158631(0x2f5),0x1,_0x158631(0x227));VisuMZ[_0x158631(0x2c2)][_0x158631(0x1a0)][_0x256949['id']]=new Function(_0x158631(0x305),_0x3c65b4);}}if(_0x3767fe[_0x158631(0x2c1)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x358ae2=String(RegExp['$1']),_0x16aa99=_0x51e23b[_0x158631(0x175)](_0x358ae2,_0x158631(0x14c),-0x1,_0x158631(0x343));VisuMZ[_0x158631(0x2c2)][_0x158631(0x179)][_0x256949['id']]=new Function(_0x158631(0x305),_0x16aa99);}else{if(_0x3767fe[_0x158631(0x2c1)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x375938=String(RegExp['$1']),_0x413366=_0x51e23b[_0x158631(0x175)](_0x375938,'heal',0x1,'slipMp');VisuMZ['SkillsStatesCore']['stateMpSlipHealJS'][_0x256949['id']]=new Function(_0x158631(0x305),_0x413366);}}if(_0x3767fe[_0x158631(0x2c1)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x56de7f=String(RegExp['$1']),_0x2a2d08=_0x51e23b[_0x158631(0x175)](_0x56de7f,_0x158631(0x14c),-0x1,_0x158631(0x312));VisuMZ[_0x158631(0x2c2)][_0x158631(0x2b5)][_0x256949['id']]=new Function('stateId',_0x2a2d08);}else{if(_0x3767fe[_0x158631(0x2c1)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x1a3b9e=String(RegExp['$1']),_0x4a1e28=_0x51e23b[_0x158631(0x175)](_0x1a3b9e,_0x158631(0x2f5),0x1,_0x158631(0x312));VisuMZ[_0x158631(0x2c2)][_0x158631(0x208)][_0x256949['id']]=new Function(_0x158631(0x305),_0x4a1e28);}}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x33c)]={},VisuMZ[_0x337b09(0x2c2)]['stateEraseJS']={},VisuMZ[_0x337b09(0x2c2)]['stateExpireJS']={},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x23f)]=function(_0x172fad){const _0x2dd0d5=_0x337b09,_0x4fb312=_0x172fad[_0x2dd0d5(0x127)],_0x44f0c5='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x4fb312[_0x2dd0d5(0x2c1)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x4bbc67=String(RegExp['$1']),_0x311b47=_0x44f0c5['format'](_0x4bbc67);VisuMZ[_0x2dd0d5(0x2c2)][_0x2dd0d5(0x33c)][_0x172fad['id']]=new Function(_0x2dd0d5(0x305),_0x311b47);}if(_0x4fb312[_0x2dd0d5(0x2c1)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x33a89a=String(RegExp['$1']),_0x51e14d=_0x44f0c5[_0x2dd0d5(0x175)](_0x33a89a);VisuMZ[_0x2dd0d5(0x2c2)][_0x2dd0d5(0x162)][_0x172fad['id']]=new Function(_0x2dd0d5(0x305),_0x51e14d);}if(_0x4fb312['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3c753c=String(RegExp['$1']),_0x4762c9=_0x44f0c5[_0x2dd0d5(0x175)](_0x3c753c);VisuMZ['SkillsStatesCore'][_0x2dd0d5(0xd3)][_0x172fad['id']]=new Function(_0x2dd0d5(0x305),_0x4762c9);}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2f2)]=function(){const _0xa4d66e=_0x337b09;if(!VisuMZ['SkillsStatesCore'][_0xa4d66e(0x34c)]['States'][_0xa4d66e(0x1d5)])return;for(const _0x5194be of $dataStates){if(!_0x5194be)continue;_0x5194be['restriction']===0x4&&_0x5194be[_0xa4d66e(0x173)]===0x1&&(_0x5194be[_0xa4d66e(0x173)]=0x2);}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x12b)]=function(_0x53ce00,_0x53164a){const _0x1bd6de=_0x337b09;if(VisuMZ[_0x1bd6de(0x12b)])return VisuMZ[_0x1bd6de(0x12b)](_0x53ce00,_0x53164a);let _0x1b9709='';if($dataActors['includes'](_0x53ce00))_0x1b9709='Actor-%1-%2'[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataClasses[_0x1bd6de(0x1a4)](_0x53ce00))_0x1b9709='Class-%1-%2'[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataSkills['includes'](_0x53ce00))_0x1b9709=_0x1bd6de(0x20b)['format'](_0x53ce00['id'],_0x53164a);if($dataItems[_0x1bd6de(0x1a4)](_0x53ce00))_0x1b9709=_0x1bd6de(0x1c9)[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataWeapons['includes'](_0x53ce00))_0x1b9709=_0x1bd6de(0x321)[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataArmors[_0x1bd6de(0x1a4)](_0x53ce00))_0x1b9709='Armor-%1-%2'[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataEnemies['includes'](_0x53ce00))_0x1b9709=_0x1bd6de(0x1b3)[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);if($dataStates[_0x1bd6de(0x1a4)](_0x53ce00))_0x1b9709=_0x1bd6de(0x2b1)[_0x1bd6de(0x175)](_0x53ce00['id'],_0x53164a);return _0x1b9709;},DataManager[_0x337b09(0x210)]=function(_0x405d91){const _0x45ee7e=_0x337b09;_0x405d91=_0x405d91[_0x45ee7e(0x149)]()[_0x45ee7e(0xfe)](),this[_0x45ee7e(0x2d0)]=this['_classIDs']||{};if(this[_0x45ee7e(0x2d0)][_0x405d91])return this[_0x45ee7e(0x2d0)][_0x405d91];for(const _0x56bacf of $dataClasses){if(!_0x56bacf)continue;let _0x3f3881=_0x56bacf[_0x45ee7e(0x1a6)];_0x3f3881=_0x3f3881['replace'](/\x1I\[(\d+)\]/gi,''),_0x3f3881=_0x3f3881[_0x45ee7e(0x332)](/\\I\[(\d+)\]/gi,''),this[_0x45ee7e(0x2d0)][_0x3f3881[_0x45ee7e(0x149)]()[_0x45ee7e(0xfe)]()]=_0x56bacf['id'];}return this[_0x45ee7e(0x2d0)][_0x405d91]||0x0;},DataManager[_0x337b09(0x1d2)]=function(_0x46e4f8){const _0x79d8c0=_0x337b09;this[_0x79d8c0(0x325)]=this[_0x79d8c0(0x325)]||{};if(this['_stypeIDs'][_0x46e4f8['id']])return this[_0x79d8c0(0x325)][_0x46e4f8['id']];this[_0x79d8c0(0x325)][_0x46e4f8['id']]=[_0x46e4f8['stypeId']];if(_0x46e4f8['note'][_0x79d8c0(0x2c1)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d2c2a=JSON[_0x79d8c0(0x36d)]('['+RegExp['$1'][_0x79d8c0(0x2c1)](/\d+/g)+']');this[_0x79d8c0(0x325)][_0x46e4f8['id']]=this['_stypeIDs'][_0x46e4f8['id']]['concat'](_0x4d2c2a);}else{if(_0x46e4f8['note'][_0x79d8c0(0x2c1)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x104240=RegExp['$1']['split'](',');for(const _0x5d534f of _0x104240){const _0x4e6080=DataManager['getStypeIdWithName'](_0x5d534f);if(_0x4e6080)this[_0x79d8c0(0x325)][_0x46e4f8['id']][_0x79d8c0(0x2ab)](_0x4e6080);}}}return this['_stypeIDs'][_0x46e4f8['id']];},DataManager[_0x337b09(0x2d3)]=function(_0x417ca5){const _0x34ae7a=_0x337b09;_0x417ca5=_0x417ca5['toUpperCase']()[_0x34ae7a(0xfe)](),this[_0x34ae7a(0x325)]=this[_0x34ae7a(0x325)]||{};if(this[_0x34ae7a(0x325)][_0x417ca5])return this[_0x34ae7a(0x325)][_0x417ca5];for(let _0x377937=0x1;_0x377937<0x64;_0x377937++){if(!$dataSystem['skillTypes'][_0x377937])continue;let _0x14a13e=$dataSystem[_0x34ae7a(0x22e)][_0x377937][_0x34ae7a(0x149)]()[_0x34ae7a(0xfe)]();_0x14a13e=_0x14a13e[_0x34ae7a(0x332)](/\x1I\[(\d+)\]/gi,''),_0x14a13e=_0x14a13e[_0x34ae7a(0x332)](/\\I\[(\d+)\]/gi,''),this[_0x34ae7a(0x325)][_0x14a13e]=_0x377937;}return this[_0x34ae7a(0x325)][_0x417ca5]||0x0;},DataManager[_0x337b09(0x13f)]=function(_0x51869e){const _0x237a8d=_0x337b09;_0x51869e=_0x51869e[_0x237a8d(0x149)]()[_0x237a8d(0xfe)](),this[_0x237a8d(0x33d)]=this[_0x237a8d(0x33d)]||{};if(this[_0x237a8d(0x33d)][_0x51869e])return this[_0x237a8d(0x33d)][_0x51869e];for(const _0x5cccaa of $dataSkills){if(!_0x5cccaa)continue;this[_0x237a8d(0x33d)][_0x5cccaa[_0x237a8d(0x1a6)][_0x237a8d(0x149)]()['trim']()]=_0x5cccaa['id'];}return this[_0x237a8d(0x33d)][_0x51869e]||0x0;},DataManager[_0x337b09(0x252)]=function(_0x92a2c5){const _0x356f3b=_0x337b09;_0x92a2c5=_0x92a2c5[_0x356f3b(0x149)]()[_0x356f3b(0xfe)](),this[_0x356f3b(0x1a3)]=this[_0x356f3b(0x1a3)]||{};if(this[_0x356f3b(0x1a3)][_0x92a2c5])return this[_0x356f3b(0x1a3)][_0x92a2c5];for(const _0xe90161 of $dataStates){if(!_0xe90161)continue;this[_0x356f3b(0x1a3)][_0xe90161[_0x356f3b(0x1a6)][_0x356f3b(0x149)]()[_0x356f3b(0xfe)]()]=_0xe90161['id'];}return this[_0x356f3b(0x1a3)][_0x92a2c5]||0x0;},DataManager[_0x337b09(0x198)]=function(_0x1cd54c){const _0x395ee7=_0x337b09;this[_0x395ee7(0x2d8)]=this['_stateMaxTurns']||{};if(this['_stateMaxTurns'][_0x1cd54c])return this[_0x395ee7(0x2d8)][_0x1cd54c];return $dataStates[_0x1cd54c][_0x395ee7(0x127)][_0x395ee7(0x2c1)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x395ee7(0x2d8)][_0x1cd54c]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x1cd54c]=VisuMZ[_0x395ee7(0x2c2)][_0x395ee7(0x34c)][_0x395ee7(0x242)][_0x395ee7(0x25a)],this[_0x395ee7(0x2d8)][_0x1cd54c];},DataManager['getSkillChangesFromState']=function(_0x207e77){const _0x3681a3=_0x337b09;if(!_0x207e77)return{};this['_skillChangesFromState']=this[_0x3681a3(0xe7)]||{};if(this['_skillChangesFromState'][_0x207e77['id']]!==undefined)return this[_0x3681a3(0xe7)][_0x207e77['id']];const _0x3086d4=_0x207e77[_0x3681a3(0x127)]||'',_0x1c6893={};{const _0x301e6e=_0x3086d4[_0x3681a3(0x2c1)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x301e6e)for(const _0x1668e0 of _0x301e6e){_0x1668e0[_0x3681a3(0x2c1)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x110e8c=String(RegExp['$1']),_0x5dffa7=String(RegExp['$2']);VisuMZ[_0x3681a3(0x2c2)]['ParseSkillChangessIntoData'](_0x1c6893,_0x110e8c,_0x5dffa7);}}if(_0x3086d4[_0x3681a3(0x2c1)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x3d2b4b=String(RegExp['$1'])[_0x3681a3(0x26e)](/[\r\n]+/)[_0x3681a3(0x2f9)]('');for(const _0x5db7a8 of _0x3d2b4b){if(_0x5db7a8[_0x3681a3(0x2c1)](/(.*)[ ]>>>[ ](.*)/i)){let _0x2cec1e=String(RegExp['$1']),_0x18d2bd=String(RegExp['$2']);VisuMZ[_0x3681a3(0x2c2)][_0x3681a3(0x26d)](_0x1c6893,_0x2cec1e,_0x18d2bd);}}}return this['_skillChangesFromState'][_0x207e77['id']]=_0x1c6893,this[_0x3681a3(0xe7)][_0x207e77['id']];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x26d)]=function(_0x180aa8,_0x2bd5fb,_0xd0d7d0){const _0x3af751=_0x337b09;/^\d+$/[_0x3af751(0xdc)](_0x2bd5fb)?_0x2bd5fb=Number(_0x2bd5fb):_0x2bd5fb=DataManager[_0x3af751(0x13f)](_0x2bd5fb),/^\d+$/['test'](_0xd0d7d0)?_0xd0d7d0=Number(_0xd0d7d0):_0xd0d7d0=DataManager[_0x3af751(0x13f)](_0xd0d7d0),_0x180aa8[_0x2bd5fb]=_0xd0d7d0;},ColorManager[_0x337b09(0x1e9)]=function(_0x48c1f3,_0x33f2f7){const _0x460ccd=_0x337b09;return _0x33f2f7=String(_0x33f2f7),this[_0x460ccd(0x30a)]=this[_0x460ccd(0x30a)]||{},_0x33f2f7[_0x460ccd(0x2c1)](/#(.*)/i)?this[_0x460ccd(0x30a)][_0x48c1f3]='#%1'[_0x460ccd(0x175)](String(RegExp['$1'])):this[_0x460ccd(0x30a)][_0x48c1f3]=this[_0x460ccd(0xe0)](Number(_0x33f2f7)),this[_0x460ccd(0x30a)][_0x48c1f3];},ColorManager[_0x337b09(0x275)]=function(_0x28361d){const _0x2e6f8c=_0x337b09;return _0x28361d=String(_0x28361d),_0x28361d[_0x2e6f8c(0x2c1)](/#(.*)/i)?'#%1'[_0x2e6f8c(0x175)](String(RegExp['$1'])):this[_0x2e6f8c(0xe0)](Number(_0x28361d));},ColorManager['stateColor']=function(_0x47fa09){const _0x40ab4b=_0x337b09;if(typeof _0x47fa09===_0x40ab4b(0x2ef))_0x47fa09=$dataStates[_0x47fa09];const _0x3c2052=_0x40ab4b(0x199)[_0x40ab4b(0x175)](_0x47fa09['id']);this[_0x40ab4b(0x30a)]=this['_colorCache']||{};if(this[_0x40ab4b(0x30a)][_0x3c2052])return this[_0x40ab4b(0x30a)][_0x3c2052];const _0xce877c=this[_0x40ab4b(0xe4)](_0x47fa09);return this[_0x40ab4b(0x1e9)](_0x3c2052,_0xce877c);},ColorManager[_0x337b09(0xe4)]=function(_0x1dae45){const _0x1ddf36=_0x337b09,_0x59bb24=_0x1dae45[_0x1ddf36(0x127)];if(_0x59bb24[_0x1ddf36(0x2c1)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x59bb24['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore']['Settings'][_0x1ddf36(0x242)][_0x1ddf36(0x29d)];else return _0x59bb24[_0x1ddf36(0x2c1)](/<NEGATIVE STATE>/i)?VisuMZ[_0x1ddf36(0x2c2)][_0x1ddf36(0x34c)][_0x1ddf36(0x242)][_0x1ddf36(0xe9)]:VisuMZ['SkillsStatesCore']['Settings'][_0x1ddf36(0x242)][_0x1ddf36(0x31b)];}},ColorManager['buffColor']=function(){const _0x42238a=_0x337b09,_0x35a42f=_0x42238a(0x23c);this[_0x42238a(0x30a)]=this[_0x42238a(0x30a)]||{};if(this[_0x42238a(0x30a)][_0x35a42f])return this[_0x42238a(0x30a)][_0x35a42f];const _0x430415=VisuMZ[_0x42238a(0x2c2)]['Settings']['Buffs'][_0x42238a(0x154)];return this[_0x42238a(0x1e9)](_0x35a42f,_0x430415);},ColorManager['debuffColor']=function(){const _0xed6166=_0x337b09,_0x5d1f94=_0xed6166(0x19b);this[_0xed6166(0x30a)]=this[_0xed6166(0x30a)]||{};if(this[_0xed6166(0x30a)][_0x5d1f94])return this[_0xed6166(0x30a)][_0x5d1f94];const _0x8936bd=VisuMZ[_0xed6166(0x2c2)][_0xed6166(0x34c)][_0xed6166(0x132)][_0xed6166(0x17b)];return this[_0xed6166(0x1e9)](_0x5d1f94,_0x8936bd);},SceneManager['isSceneBattle']=function(){const _0x473d29=_0x337b09;return this['_scene']&&this[_0x473d29(0x311)][_0x473d29(0x16d)]===Scene_Battle;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x309)]=BattleManager[_0x337b09(0x2a5)],BattleManager['endAction']=function(){const _0x465a49=_0x337b09;this[_0x465a49(0x29f)](),VisuMZ[_0x465a49(0x2c2)][_0x465a49(0x309)][_0x465a49(0x11b)](this);},BattleManager[_0x337b09(0x29f)]=function(){const _0x580253=_0x337b09,_0x4ae8f7=VisuMZ[_0x580253(0x2c2)][_0x580253(0x34c)][_0x580253(0x242)];if(!_0x4ae8f7)return;if(_0x4ae8f7[_0x580253(0x1d5)]===![])return;if(!this['_subject'])return;this[_0x580253(0x336)][_0x580253(0x29f)]();},Game_Battler[_0x337b09(0x160)][_0x337b09(0x29f)]=function(){const _0x557efa=_0x337b09;if(BattleManager['_phase']!=='action')return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x557efa(0x26b)])return;this[_0x557efa(0x209)]=Graphics[_0x557efa(0x26b)];for(const _0x583cee of this[_0x557efa(0x188)]){const _0x23a3a0=$dataStates[_0x583cee];if(!_0x23a3a0)continue;if(_0x23a3a0['autoRemovalTiming']!==0x1)continue;this[_0x557efa(0x142)][_0x583cee]>0x0&&this[_0x557efa(0x142)][_0x583cee]--;}this[_0x557efa(0x1ee)](0x1);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1d3)]=function(){const _0x18fc50=_0x337b09,_0x48561d=VisuMZ[_0x18fc50(0x2c2)][_0x18fc50(0x34c)][_0x18fc50(0x242)];for(const _0x4ca2ca of this['_states']){const _0x4ec131=$dataStates[_0x4ca2ca];if(_0x48561d&&_0x48561d[_0x18fc50(0x1d5)]!==![]){if(_0x4ec131&&_0x4ec131[_0x18fc50(0x173)]===0x1)continue;}this[_0x18fc50(0x142)][_0x4ca2ca]>0x0&&this[_0x18fc50(0x142)][_0x4ca2ca]--;}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x12c)]=Game_Switches['prototype']['onChange'],Game_Switches[_0x337b09(0x160)][_0x337b09(0x137)]=function(){const _0x2c731=_0x337b09;VisuMZ[_0x2c731(0x2c2)][_0x2c731(0x12c)][_0x2c731(0x11b)](this);const _0x5ef699=VisuMZ[_0x2c731(0x2c2)]['Settings'][_0x2c731(0x194)]['RefreshCacheSwitch']??!![];if(!_0x5ef699)return;if(SceneManager[_0x2c731(0x14e)]())for(const _0x32af57 of BattleManager[_0x2c731(0x1aa)]()){if(_0x32af57)_0x32af57['refresh']();}},VisuMZ['SkillsStatesCore']['Game_Variables_onChange']=Game_Variables[_0x337b09(0x160)][_0x337b09(0x137)],Game_Variables['prototype']['onChange']=function(){const _0x3eacb3=_0x337b09;VisuMZ[_0x3eacb3(0x2c2)]['Game_Variables_onChange'][_0x3eacb3(0x11b)](this);const _0x2d2944=VisuMZ[_0x3eacb3(0x2c2)][_0x3eacb3(0x34c)][_0x3eacb3(0x194)][_0x3eacb3(0x1e5)]??!![];if(!_0x2d2944)return;if(SceneManager[_0x3eacb3(0x14e)]())for(const _0x414da9 of BattleManager[_0x3eacb3(0x1aa)]()){if(_0x414da9)_0x414da9[_0x3eacb3(0x34b)]();}},VisuMZ['SkillsStatesCore'][_0x337b09(0x156)]=Game_Action[_0x337b09(0x160)]['applyItemUserEffect'],Game_Action[_0x337b09(0x160)][_0x337b09(0x249)]=function(_0x362b23){const _0x585d6c=_0x337b09;VisuMZ[_0x585d6c(0x2c2)][_0x585d6c(0x156)][_0x585d6c(0x11b)](this,_0x362b23),this[_0x585d6c(0x379)](_0x362b23);},Game_Action[_0x337b09(0x160)][_0x337b09(0x379)]=function(_0x162088){const _0x93958a=_0x337b09;this[_0x93958a(0x122)](_0x162088),this[_0x93958a(0x24f)](_0x162088),this[_0x93958a(0x189)](_0x162088),this[_0x93958a(0x232)](_0x162088);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x372)]=Game_Action['prototype'][_0x337b09(0x250)],Game_Action[_0x337b09(0x160)][_0x337b09(0x250)]=function(_0x411ca8){const _0x12dac7=_0x337b09;if(this[_0x12dac7(0x240)](_0x411ca8))return!![];return VisuMZ[_0x12dac7(0x2c2)][_0x12dac7(0x372)][_0x12dac7(0x11b)](this,_0x411ca8);},Game_Action[_0x337b09(0x160)][_0x337b09(0x240)]=function(_0x76b916){const _0x1be29d=_0x337b09;if(!this[_0x1be29d(0x16a)]())return;const _0x329a46=this['item']()[_0x1be29d(0x127)];if(_0x329a46[_0x1be29d(0x2c1)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x4ace81=String(RegExp['$1']);if(_0x76b916['isStateCategoryAffected'](_0x4ace81))return!![];}if(_0x329a46['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x24d2d4=Number(RegExp['$1']);if(_0x76b916[_0x1be29d(0x15d)](_0x24d2d4))return!![];}else{if(_0x329a46[_0x1be29d(0x2c1)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x1de44a=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x76b916[_0x1be29d(0x15d)](_0x1de44a))return!![];}}return![];},Game_Action[_0x337b09(0x160)][_0x337b09(0x122)]=function(_0x269231){const _0x4763b3=_0x337b09;if(_0x269231[_0x4763b3(0x263)]()['length']<=0x0)return;const _0x47750b=this[_0x4763b3(0x16a)]()[_0x4763b3(0x127)];{const _0x5c93c7=_0x47750b[_0x4763b3(0x2c1)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x5c93c7)for(const _0x281169 of _0x5c93c7){_0x281169[_0x4763b3(0x2c1)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x431d40=String(RegExp['$1']);_0x269231[_0x4763b3(0x29a)](_0x431d40);}}{const _0x22e42a=_0x47750b[_0x4763b3(0x2c1)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x22e42a)for(const _0x43e7d1 of _0x22e42a){_0x43e7d1['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x41373b=String(RegExp['$1']),_0x495254=Number(RegExp['$2']);_0x269231[_0x4763b3(0x282)](_0x41373b,_0x495254);}}},Game_Action[_0x337b09(0x160)][_0x337b09(0x24f)]=function(_0x520066){const _0x3d1968=_0x337b09,_0x5abb68=this['item']()['note'],_0x3f08f4=_0x5abb68[_0x3d1968(0x2c1)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x3f08f4)for(const _0x52936c of _0x3f08f4){let _0x34a7cc=0x0,_0x5bb71a=0x0;if(_0x52936c[_0x3d1968(0x2c1)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x34a7cc=Number(RegExp['$1']),_0x5bb71a=Number(RegExp['$2']);else _0x52936c[_0x3d1968(0x2c1)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x34a7cc=DataManager[_0x3d1968(0x252)](RegExp['$1']),_0x5bb71a=Number(RegExp['$2']));_0x520066[_0x3d1968(0x102)](_0x34a7cc,_0x5bb71a),this[_0x3d1968(0x25e)](_0x520066);}const _0x2203cf=_0x5abb68[_0x3d1968(0x2c1)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2203cf)for(const _0x371e1f of _0x2203cf){let _0x4a6bee=0x0,_0x4652bc=0x0;if(_0x371e1f[_0x3d1968(0x2c1)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x4a6bee=Number(RegExp['$1']),_0x4652bc=Number(RegExp['$2']);else _0x371e1f[_0x3d1968(0x2c1)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x4a6bee=DataManager[_0x3d1968(0x252)](RegExp['$1']),_0x4652bc=Number(RegExp['$2']));_0x520066[_0x3d1968(0x2a7)](_0x4a6bee,_0x4652bc),this[_0x3d1968(0x25e)](_0x520066);}},Game_Action['prototype'][_0x337b09(0x189)]=function(_0x27da44){const _0x1c9def=_0x337b09,_0x330c4a=[_0x1c9def(0x22b),_0x1c9def(0x251),_0x1c9def(0x32e),_0x1c9def(0xdb),_0x1c9def(0x158),_0x1c9def(0xec),_0x1c9def(0x1c2),_0x1c9def(0x2a9)],_0x1155e6=this['item']()['note'],_0xbeba7d=_0x1155e6[_0x1c9def(0x2c1)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0xbeba7d)for(const _0x1f4b3e of _0xbeba7d){_0x1f4b3e['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x434d38=_0x330c4a['indexOf'](String(RegExp['$1'])[_0x1c9def(0x149)]()),_0x30e24c=Number(RegExp['$2']);_0x434d38>=0x0&&(_0x27da44[_0x1c9def(0x144)](_0x434d38,_0x30e24c),this['makeSuccess'](_0x27da44));}const _0x11c323=_0x1155e6[_0x1c9def(0x2c1)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x11c323)for(const _0x49a45c of _0xbeba7d){_0x49a45c['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x37f057=_0x330c4a[_0x1c9def(0x2d9)](String(RegExp['$1'])['toUpperCase']()),_0x5b06e3=Number(RegExp['$2']);_0x37f057>=0x0&&(_0x27da44[_0x1c9def(0x1b8)](_0x37f057,_0x5b06e3),this[_0x1c9def(0x25e)](_0x27da44));}},Game_Action[_0x337b09(0x160)][_0x337b09(0x232)]=function(_0x2d89e3){const _0x45f1f9=_0x337b09,_0xd7150a=[_0x45f1f9(0x22b),_0x45f1f9(0x251),_0x45f1f9(0x32e),_0x45f1f9(0xdb),_0x45f1f9(0x158),'MDF',_0x45f1f9(0x1c2),'LUK'],_0x500f9b=this[_0x45f1f9(0x16a)]()['note'],_0x3cf106=_0x500f9b['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x3cf106)for(const _0x13be7c of _0x3cf106){_0x13be7c[_0x45f1f9(0x2c1)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3cfef7=_0xd7150a[_0x45f1f9(0x2d9)](String(RegExp['$1'])['toUpperCase']()),_0xc23f3=Number(RegExp['$2']);_0x3cfef7>=0x0&&(_0x2d89e3[_0x45f1f9(0x265)](_0x3cfef7,_0xc23f3),this[_0x45f1f9(0x25e)](_0x2d89e3));}const _0x3f1ab8=_0x500f9b[_0x45f1f9(0x2c1)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3f1ab8)for(const _0x437be4 of _0x3cf106){_0x437be4[_0x45f1f9(0x2c1)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x184a31=_0xd7150a['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0xeaa14c=Number(RegExp['$2']);_0x184a31>=0x0&&(_0x2d89e3['addDebuffTurns'](_0x184a31,_0xeaa14c),this[_0x45f1f9(0x25e)](_0x2d89e3));}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1ba)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xf2)]=function(){const _0x3d833d=_0x337b09;this['_cache']={},this[_0x3d833d(0x1c8)](),VisuMZ['SkillsStatesCore'][_0x3d833d(0x1ba)][_0x3d833d(0x11b)](this);},Game_BattlerBase['prototype'][_0x337b09(0x1c8)]=function(){const _0x1b8bae=_0x337b09;this[_0x1b8bae(0xf3)]='',this[_0x1b8bae(0x2ba)]={},this[_0x1b8bae(0x28f)]={},this['_stateOrigin']={};},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x4bcd8b){const _0x433531=_0x337b09;return this[_0x433531(0x351)]=this[_0x433531(0x351)]||{},this[_0x433531(0x351)][_0x4bcd8b]!==undefined;},VisuMZ[_0x337b09(0x2c2)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x34b)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x34b)]=function(){const _0x3d0f3f=_0x337b09;this[_0x3d0f3f(0x351)]={},VisuMZ['SkillsStatesCore'][_0x3d0f3f(0x338)][_0x3d0f3f(0x11b)](this);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x235)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x21d)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x21d)]=function(_0xb235ce){const _0x3a7747=_0x337b09;let _0x543516=this[_0x3a7747(0x15d)](_0xb235ce);VisuMZ[_0x3a7747(0x2c2)][_0x3a7747(0x235)]['call'](this,_0xb235ce);if(_0x543516&&!this[_0x3a7747(0x15d)](_0xb235ce))this['onRemoveState'](_0xb235ce);},Game_BattlerBase[_0x337b09(0x160)]['onRemoveState']=function(_0x532907){const _0x3e7089=_0x337b09;this[_0x3e7089(0x19d)](_0x532907),this[_0x3e7089(0x1e3)](_0x532907);},VisuMZ[_0x337b09(0x2c2)]['Game_Battler_onBattleEnd']=Game_Battler[_0x337b09(0x160)][_0x337b09(0x196)],Game_Battler[_0x337b09(0x160)][_0x337b09(0x196)]=function(){const _0x306abe=_0x337b09;VisuMZ[_0x306abe(0x2c2)][_0x306abe(0x212)]['call'](this),this[_0x306abe(0x151)]();},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2ae)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xc9)],Game_BattlerBase['prototype'][_0x337b09(0xc9)]=function(_0x485bc2){const _0x2e0eb8=_0x337b09,_0xbda2c5=$dataStates[_0x485bc2],_0x410791=this['stateTurns'](_0x485bc2),_0x518684=this['getStateReapplyRulings'](_0xbda2c5)[_0x2e0eb8(0x1f2)]()[_0x2e0eb8(0xfe)]();switch(_0x518684){case _0x2e0eb8(0x1d7):if(_0x410791<=0x0)this['prepareResetStateCounts'](_0x485bc2);break;case _0x2e0eb8(0x19a):this[_0x2e0eb8(0x29c)](_0x485bc2);break;case'greater':this[_0x2e0eb8(0x29c)](_0x485bc2),this[_0x2e0eb8(0x142)][_0x485bc2]=Math['max'](this[_0x2e0eb8(0x142)][_0x485bc2],_0x410791);break;case'add':this[_0x2e0eb8(0x29c)](_0x485bc2),this[_0x2e0eb8(0x142)][_0x485bc2]+=_0x410791;break;default:this[_0x2e0eb8(0x29c)](_0x485bc2);break;}if(this[_0x2e0eb8(0x15d)](_0x485bc2)){const _0x419d86=DataManager[_0x2e0eb8(0x198)](_0x485bc2);this[_0x2e0eb8(0x142)][_0x485bc2]=this[_0x2e0eb8(0x142)][_0x485bc2]['clamp'](0x0,_0x419d86);}},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x29c)]=function(_0xf51fd){const _0x3b359a=_0x337b09;VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x3b359a(0x11b)](this,_0xf51fd);},Game_BattlerBase[_0x337b09(0x160)]['getStateReapplyRulings']=function(_0x366de2){const _0x142f95=_0x337b09,_0x28c3ae=_0x366de2[_0x142f95(0x127)];return _0x28c3ae[_0x142f95(0x2c1)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x142f95(0x2c2)]['Settings'][_0x142f95(0x242)][_0x142f95(0xde)];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x193)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x13c)],Game_BattlerBase['prototype'][_0x337b09(0x13c)]=function(_0xa9ad7a,_0x4adc66){const _0x408397=_0x337b09,_0x59b26a=VisuMZ[_0x408397(0x2c2)]['Settings'][_0x408397(0x132)][_0x408397(0xde)],_0x80cec5=this[_0x408397(0x100)](_0xa9ad7a);switch(_0x59b26a){case _0x408397(0x1d7):if(_0x80cec5<=0x0)this[_0x408397(0x236)][_0xa9ad7a]=_0x4adc66;break;case _0x408397(0x19a):this[_0x408397(0x236)][_0xa9ad7a]=_0x4adc66;break;case _0x408397(0x133):this[_0x408397(0x236)][_0xa9ad7a]=Math['max'](_0x80cec5,_0x4adc66);break;case _0x408397(0xd6):this[_0x408397(0x236)][_0xa9ad7a]+=_0x4adc66;break;default:VisuMZ[_0x408397(0x2c2)]['Game_BattlerBase_overwriteBuffTurns'][_0x408397(0x11b)](this,_0xa9ad7a,_0x4adc66);break;}const _0x2e4cb5=VisuMZ['SkillsStatesCore'][_0x408397(0x34c)][_0x408397(0x132)][_0x408397(0x25a)];this[_0x408397(0x236)][_0xa9ad7a]=this[_0x408397(0x236)][_0xa9ad7a][_0x408397(0xe5)](0x0,_0x2e4cb5);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x256)]=function(){const _0x9ec5c0=_0x337b09;if(this['_cache'][_0x9ec5c0(0x22f)]!==undefined)return this['_cache'][_0x9ec5c0(0x22f)];this[_0x9ec5c0(0x351)][_0x9ec5c0(0x22f)]=![];const _0x3af23a=this[_0x9ec5c0(0x263)]();for(const _0x5baca4 of _0x3af23a){if(!_0x5baca4)continue;if(_0x5baca4['note'][_0x9ec5c0(0x2c1)](/<GROUP DEFEAT>/i)){this[_0x9ec5c0(0x351)][_0x9ec5c0(0x22f)]=!![];break;}}return this[_0x9ec5c0(0x351)]['groupDefeat'];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x237)]=Game_Unit['prototype'][_0x337b09(0x205)],Game_Unit[_0x337b09(0x160)][_0x337b09(0x205)]=function(){const _0x4eaf14=_0x337b09;let _0xa6abb1=VisuMZ[_0x4eaf14(0x2c2)][_0x4eaf14(0x237)][_0x4eaf14(0x11b)](this);return BattleManager[_0x4eaf14(0x322)]&&(_0xa6abb1=_0xa6abb1[_0x4eaf14(0x2f6)](this[_0x4eaf14(0x306)]()[_0x4eaf14(0x29e)](_0xc1d967=>_0xc1d967[_0x4eaf14(0x256)]()))),_0xa6abb1;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x135)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x346)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x346)]=function(){const _0x3e44ad=_0x337b09;this['getStateRetainType']()!==''?this[_0x3e44ad(0x286)]():(VisuMZ[_0x3e44ad(0x2c2)][_0x3e44ad(0x135)][_0x3e44ad(0x11b)](this),this['initMembersSkillsStatesCore']());},Game_Actor[_0x337b09(0x160)][_0x337b09(0x346)]=function(){const _0x1af9cc=_0x337b09;this[_0x1af9cc(0x228)]=this[_0x1af9cc(0x228)]||{},Game_Battler['prototype']['clearStates'][_0x1af9cc(0x11b)](this);},Game_BattlerBase['prototype'][_0x337b09(0x286)]=function(){const _0xfc4380=_0x337b09,_0x231484=this[_0xfc4380(0x263)]();for(const _0x2f38e9 of _0x231484){if(_0x2f38e9&&this[_0xfc4380(0x328)](_0x2f38e9))this[_0xfc4380(0x21d)](_0x2f38e9['id']);}this[_0xfc4380(0x351)]={};},Game_BattlerBase[_0x337b09(0x160)]['canClearState']=function(_0x48270a){const _0x2362ec=_0x337b09,_0x258c8b=this[_0x2362ec(0xf6)]();if(_0x258c8b!==''){const _0x167135=_0x48270a[_0x2362ec(0x127)];if(_0x258c8b===_0x2362ec(0xe1)&&_0x167135[_0x2362ec(0x2c1)](/<NO DEATH CLEAR>/i))return![];if(_0x258c8b===_0x2362ec(0x168)&&_0x167135[_0x2362ec(0x2c1)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x2362ec(0x15d)](_0x48270a['id']);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xf6)]=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2b7)]=function(_0x5c048a){const _0x40a8bd=_0x337b09;this[_0x40a8bd(0xf3)]=_0x5c048a;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x163)]=function(){const _0x1d0a61=_0x337b09;this[_0x1d0a61(0xf3)]='';},VisuMZ['SkillsStatesCore']['Game_BattlerBase_die']=Game_BattlerBase[_0x337b09(0x160)]['die'],Game_BattlerBase[_0x337b09(0x160)]['die']=function(){const _0x28aa5d=_0x337b09;this[_0x28aa5d(0x2b7)]('death'),VisuMZ['SkillsStatesCore']['Game_BattlerBase_die'][_0x28aa5d(0x11b)](this),this['clearStateRetainType']();},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x116)]=Game_BattlerBase['prototype'][_0x337b09(0x1b0)],Game_BattlerBase['prototype'][_0x337b09(0x1b0)]=function(){const _0x38ff1a=_0x337b09;this[_0x38ff1a(0x2b7)](_0x38ff1a(0x168)),VisuMZ[_0x38ff1a(0x2c2)][_0x38ff1a(0x116)][_0x38ff1a(0x11b)](this),this[_0x38ff1a(0x163)]();},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2bd)]=function(_0x44925e,_0x189693,_0x311178){return _0x189693;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1ac)]=function(_0x1adb7d){const _0x4c832f=_0x337b09;for(settings of VisuMZ[_0x4c832f(0x2c2)][_0x4c832f(0x34c)]['Costs']){let _0x2c96e4=settings[_0x4c832f(0x283)][_0x4c832f(0x11b)](this,_0x1adb7d);_0x2c96e4=this[_0x4c832f(0x2bd)](_0x1adb7d,_0x2c96e4,settings);if(!settings[_0x4c832f(0x1c3)]['call'](this,_0x1adb7d,_0x2c96e4))return![];}return!![];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2dd)]=function(_0x7b1710){const _0x30b5c6=_0x337b09;for(settings of VisuMZ[_0x30b5c6(0x2c2)][_0x30b5c6(0x34c)][_0x30b5c6(0x1cc)]){let _0x51fe3c=settings[_0x30b5c6(0x283)][_0x30b5c6(0x11b)](this,_0x7b1710);_0x51fe3c=this[_0x30b5c6(0x2bd)](_0x7b1710,_0x51fe3c,settings),settings[_0x30b5c6(0x1c4)][_0x30b5c6(0x11b)](this,_0x7b1710,_0x51fe3c);}},VisuMZ[_0x337b09(0x2c2)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2af)],Game_BattlerBase[_0x337b09(0x160)]['meetsSkillConditions']=function(_0x5721a3){const _0x536c1f=_0x337b09;if(!_0x5721a3)return![];if(!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions'][_0x536c1f(0x11b)](this,_0x5721a3))return![];if(!this[_0x536c1f(0x28c)](_0x5721a3))return![];if(!this[_0x536c1f(0x2aa)](_0x5721a3))return![];if(!this[_0x536c1f(0x2bc)](_0x5721a3))return![];return!![];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x28c)]=function(_0x5ecb92){const _0x5e4961=_0x337b09;if(!this[_0x5e4961(0x1ff)](_0x5ecb92))return![];return!![];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1ff)]=function(_0x56c20b){const _0x41ef8d=_0x337b09,_0x29f6cd=_0x56c20b[_0x41ef8d(0x127)];if(_0x29f6cd[_0x41ef8d(0x2c1)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x14966f=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1'][_0x41ef8d(0x2c1)](/\d+/g)+']');for(const _0x2d2302 of _0x14966f){if(!$gameSwitches[_0x41ef8d(0x18c)](_0x2d2302))return![];}return!![];}if(_0x29f6cd[_0x41ef8d(0x2c1)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4539c3=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1'][_0x41ef8d(0x2c1)](/\d+/g)+']');for(const _0xbc056f of _0x4539c3){if(!$gameSwitches[_0x41ef8d(0x18c)](_0xbc056f))return![];}return!![];}if(_0x29f6cd[_0x41ef8d(0x2c1)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d1446=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1'][_0x41ef8d(0x2c1)](/\d+/g)+']');for(const _0x4b2b65 of _0x4d1446){if($gameSwitches[_0x41ef8d(0x18c)](_0x4b2b65))return!![];}return![];}if(_0x29f6cd['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x144b02=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1'][_0x41ef8d(0x2c1)](/\d+/g)+']');for(const _0x3bc8fd of _0x144b02){if(!$gameSwitches['value'](_0x3bc8fd))return!![];}return![];}if(_0x29f6cd[_0x41ef8d(0x2c1)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b211d=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x161a18 of _0x5b211d){if(!$gameSwitches['value'](_0x161a18))return!![];}return![];}if(_0x29f6cd[_0x41ef8d(0x2c1)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xb6c776=JSON[_0x41ef8d(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x21584b of _0xb6c776){if($gameSwitches['value'](_0x21584b))return![];}return!![];}return!![];},Game_BattlerBase[_0x337b09(0x160)]['meetsSkillConditionsEnableJS']=function(_0x4594ec){const _0xd16ac9=_0x337b09,_0x28c752=_0x4594ec[_0xd16ac9(0x127)],_0x5196ff=VisuMZ[_0xd16ac9(0x2c2)][_0xd16ac9(0x350)];return _0x5196ff[_0x4594ec['id']]?_0x5196ff[_0x4594ec['id']][_0xd16ac9(0x11b)](this,_0x4594ec):!![];},Game_BattlerBase[_0x337b09(0x160)]['meetsSkillConditionsGlobalJS']=function(_0x504f65){const _0x2d0d76=_0x337b09;return VisuMZ[_0x2d0d76(0x2c2)][_0x2d0d76(0x34c)][_0x2d0d76(0x31d)][_0x2d0d76(0x353)]['call'](this,_0x504f65);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1f8)]=Game_BattlerBase['prototype'][_0x337b09(0x125)],Game_BattlerBase[_0x337b09(0x160)]['skillMpCost']=function(_0x44ed50){const _0x498733=_0x337b09;for(settings of VisuMZ[_0x498733(0x2c2)][_0x498733(0x34c)][_0x498733(0x1cc)]){if(settings[_0x498733(0x2d4)]['toUpperCase']()==='MP'){let _0xce3b13=settings[_0x498733(0x283)]['call'](this,_0x44ed50);return _0xce3b13=this[_0x498733(0x2bd)](_0x44ed50,_0xce3b13,settings),_0xce3b13;}}return VisuMZ['SkillsStatesCore'][_0x498733(0x1f8)][_0x498733(0x11b)](this,_0x44ed50);},VisuMZ['SkillsStatesCore'][_0x337b09(0x371)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2e1)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2e1)]=function(_0x2beeb8){const _0x514c1a=_0x337b09;for(settings of VisuMZ[_0x514c1a(0x2c2)][_0x514c1a(0x34c)][_0x514c1a(0x1cc)]){if(settings['Name'][_0x514c1a(0x149)]()==='TP'){let _0x523269=settings[_0x514c1a(0x283)]['call'](this,_0x2beeb8);return _0x523269=this['adjustSkillCost'](_0x2beeb8,_0x523269,settings),_0x523269;}}return VisuMZ['SkillsStatesCore'][_0x514c1a(0x371)][_0x514c1a(0x11b)](this,_0x2beeb8);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1b2)]=function(_0x3e742c){const _0x5d0518=_0x337b09;if(typeof _0x3e742c===_0x5d0518(0x2ef))_0x3e742c=$dataStates[_0x3e742c];return this[_0x5d0518(0x263)]()[_0x5d0518(0x1a4)](_0x3e742c);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x261)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x263)],Game_BattlerBase[_0x337b09(0x160)]['states']=function(){const _0x23714f=_0x337b09;let _0x2ece63=VisuMZ[_0x23714f(0x2c2)][_0x23714f(0x261)][_0x23714f(0x11b)](this);if($gameTemp['_checkingPassiveStates'])return _0x2ece63;return $gameTemp[_0x23714f(0x2c0)]=!![],this[_0x23714f(0x20e)](_0x2ece63),$gameTemp[_0x23714f(0x2c0)]=undefined,_0x2ece63;},Game_BattlerBase[_0x337b09(0x160)]['addPassiveStates']=function(_0x857a8c){const _0x401a91=_0x337b09,_0x561075=this['passiveStates']();for(state of _0x561075){if(!state)continue;if(!this[_0x401a91(0x1c7)](state)&&_0x857a8c['includes'](state))continue;_0x857a8c[_0x401a91(0x2ab)](state);}_0x561075[_0x401a91(0x324)]>0x0&&_0x857a8c['sort']((_0x29ce10,_0x2226e2)=>{const _0x5cbda7=_0x401a91,_0x3fba5a=_0x29ce10[_0x5cbda7(0x185)],_0x39fba3=_0x2226e2[_0x5cbda7(0x185)];if(_0x3fba5a!==_0x39fba3)return _0x39fba3-_0x3fba5a;return _0x29ce10-_0x2226e2;});},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1c7)]=function(_0x57e943){const _0x246b80=_0x337b09;return _0x57e943[_0x246b80(0x127)][_0x246b80(0x2c1)](/<PASSIVE STACKABLE>/i);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x337b09(0x160)]['traitsSet'],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x152)]=function(_0x17583){const _0x27aea6=_0x337b09;this[_0x27aea6(0x17c)]=!![];let _0x341103=VisuMZ[_0x27aea6(0x2c2)][_0x27aea6(0x153)][_0x27aea6(0x11b)](this,_0x17583);return this[_0x27aea6(0x17c)]=undefined,_0x341103;},Game_BattlerBase['prototype'][_0x337b09(0x197)]=function(){const _0x145355=_0x337b09;let _0xb46021=[];this[_0x145355(0x21f)]=this[_0x145355(0x21f)]||{};for(;;){_0xb46021=[];let _0x18764d=!![];for(const _0x2c77e8 of this[_0x145355(0x351)][_0x145355(0x18a)]){const _0x5e46a4=$dataStates[_0x2c77e8];if(!_0x5e46a4)continue;let _0x5f47fb=this[_0x145355(0x143)](_0x5e46a4);this['_passiveStateResults'][_0x2c77e8]!==_0x5f47fb&&(_0x18764d=![],this[_0x145355(0x21f)][_0x2c77e8]=_0x5f47fb);if(!_0x5f47fb)continue;_0xb46021[_0x145355(0x2ab)](_0x5e46a4);}if(_0x18764d)break;else{if(!this[_0x145355(0x17c)])this[_0x145355(0x34b)]();this['createPassiveStatesCache']();}}return _0xb46021;},Game_BattlerBase[_0x337b09(0x160)]['meetsPassiveStateConditions']=function(_0x42f058){const _0x160b1e=_0x337b09;if(!this['meetsPassiveStateConditionClasses'](_0x42f058))return![];if(!this[_0x160b1e(0x25d)](_0x42f058))return![];if(!this[_0x160b1e(0x1f1)](_0x42f058))return![];if(!this[_0x160b1e(0x202)](_0x42f058))return![];return!![];},Game_BattlerBase[_0x337b09(0x160)]['meetsPassiveStateConditionClasses']=function(_0x592d37){return!![];},Game_Actor[_0x337b09(0x160)][_0x337b09(0x317)]=function(_0x37f2ca){const _0x320014=_0x337b09,_0x4ac580=DataManager['getPassiveStateConditionClassesData'](_0x37f2ca);if(_0x4ac580[_0x320014(0x184)][_0x320014(0x324)]>0x0){const _0x43ca61=_0x4ac580[_0x320014(0x184)];if(!_0x43ca61[_0x320014(0x1a4)](this[_0x320014(0x184)]()))return![];}if(_0x4ac580[_0x320014(0x1de)][_0x320014(0x324)]>0x0){const _0x5898f0=_0x4ac580['multiClass'];let _0x57c378=[this[_0x320014(0x184)]()];Imported[_0x320014(0x1f4)]&&this[_0x320014(0x17e)]&&(_0x57c378=this[_0x320014(0x17e)]());if(_0x5898f0[_0x320014(0x29e)](_0x3c6d84=>_0x57c378[_0x320014(0x1a4)](_0x3c6d84))[_0x320014(0x324)]<=0x0)return![];}return Game_BattlerBase[_0x320014(0x160)][_0x320014(0x317)]['call'](this,_0x37f2ca);},DataManager[_0x337b09(0x347)]=function(_0x5f40b2){const _0x3f63fb=_0x337b09,_0x4ce69d={'currentClass':[],'multiClass':[]};if(!_0x5f40b2)return _0x4ce69d;this[_0x3f63fb(0x139)]=this[_0x3f63fb(0x139)]||{};if(this[_0x3f63fb(0x139)][_0x5f40b2['id']]!==undefined)return this[_0x3f63fb(0x139)][_0x5f40b2['id']];const _0x565c4b=_0x5f40b2[_0x3f63fb(0x127)]||'';if(_0x565c4b[_0x3f63fb(0x2c1)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1f4d7d=String(RegExp['$1'])[_0x3f63fb(0x26e)](',')[_0x3f63fb(0x314)](_0x265f93=>_0x265f93[_0x3f63fb(0xfe)]());_0x4ce69d['currentClass']=VisuMZ[_0x3f63fb(0x2c2)][_0x3f63fb(0x2ca)](_0x1f4d7d);}if(_0x565c4b[_0x3f63fb(0x2c1)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0xf638d2=String(RegExp['$1'])[_0x3f63fb(0x26e)](',')[_0x3f63fb(0x314)](_0x2451ed=>_0x2451ed[_0x3f63fb(0xfe)]());_0x4ce69d[_0x3f63fb(0x1de)]=VisuMZ[_0x3f63fb(0x2c2)][_0x3f63fb(0x2ca)](_0xf638d2);}return this[_0x3f63fb(0x139)][_0x5f40b2['id']]=_0x4ce69d,this[_0x3f63fb(0x139)][_0x5f40b2['id']];},VisuMZ[_0x337b09(0x2c2)]['ParseClassIDs']=function(_0x50b18c){const _0x2ec88d=_0x337b09,_0x3aeed8=[];for(let _0x46a578 of _0x50b18c){_0x46a578=(String(_0x46a578)||'')['trim']();const _0x3e84ee=/^\d+$/['test'](_0x46a578);_0x3e84ee?_0x3aeed8[_0x2ec88d(0x2ab)](Number(_0x46a578)):_0x3aeed8[_0x2ec88d(0x2ab)](DataManager[_0x2ec88d(0x210)](_0x46a578));}return _0x3aeed8['map'](_0x57ad32=>$dataClasses[Number(_0x57ad32)])['remove'](null);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x25d)]=function(_0x25dd0d){const _0x5563c8=_0x337b09,_0x2e8e11=DataManager['getPassiveStateConditionSwitchData'](_0x25dd0d);if(_0x2e8e11[_0x5563c8(0x290)]&&_0x2e8e11[_0x5563c8(0x290)][_0x5563c8(0x324)]>0x0){const _0x58e340=_0x2e8e11[_0x5563c8(0x290)];for(const _0x296ec7 of _0x58e340){if(!$gameSwitches[_0x5563c8(0x18c)](_0x296ec7))return![];}}if(_0x2e8e11['anySwitchOn']&&_0x2e8e11[_0x5563c8(0x1ea)][_0x5563c8(0x324)]>0x0){const _0x3055ad=_0x2e8e11['anySwitchOn'];let _0x401d16=!![];for(const _0x1891e of _0x3055ad){if($gameSwitches[_0x5563c8(0x18c)](_0x1891e)){_0x401d16=![];break;}}if(_0x401d16)return![];}if(_0x2e8e11[_0x5563c8(0x2fc)]&&_0x2e8e11[_0x5563c8(0x2fc)]['length']>0x0){const _0x4588ea=_0x2e8e11['allSwitchOff'];for(const _0x5f860f of _0x4588ea){if($gameSwitches[_0x5563c8(0x18c)](_0x5f860f))return![];}}if(_0x2e8e11[_0x5563c8(0x155)]&&_0x2e8e11[_0x5563c8(0x155)][_0x5563c8(0x324)]>0x0){const _0x2bca25=_0x2e8e11[_0x5563c8(0x155)];let _0xbd549b=!![];for(const _0x2e0330 of _0x2bca25){if(!$gameSwitches[_0x5563c8(0x18c)](_0x2e0330)){_0xbd549b=![];break;}}if(_0xbd549b)return![];}return!![];},DataManager['getPassiveStateConditionSwitchData']=function(_0x5ce78e){const _0x369837=_0x337b09;let _0xd7d66b={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x5ce78e)return _0xd7d66b;const _0x20410b=_0x5ce78e['id'];this[_0x369837(0x31a)]=this[_0x369837(0x31a)]||{};if(this[_0x369837(0x31a)][_0x20410b]!==undefined)return this[_0x369837(0x31a)][_0x20410b];const _0x4458a7=_0x5ce78e[_0x369837(0x127)]||'';return _0x4458a7[_0x369837(0x2c1)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0xd7d66b[_0x369837(0x290)]=String(RegExp['$1'])['split'](',')[_0x369837(0x314)](_0x536e48=>Number(_0x536e48))),_0x4458a7[_0x369837(0x2c1)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0xd7d66b[_0x369837(0x1ea)]=String(RegExp['$1'])['split'](',')[_0x369837(0x314)](_0x4d7aea=>Number(_0x4d7aea))),_0x4458a7['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0xd7d66b[_0x369837(0x2fc)]=String(RegExp['$1'])[_0x369837(0x26e)](',')[_0x369837(0x314)](_0x129b20=>Number(_0x129b20))),_0x4458a7[_0x369837(0x2c1)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0xd7d66b[_0x369837(0x155)]=String(RegExp['$1'])[_0x369837(0x26e)](',')[_0x369837(0x314)](_0x7abb94=>Number(_0x7abb94))),this['_cache_getPassiveStateConditionSwitchData'][_0x20410b]=_0xd7d66b,this[_0x369837(0x31a)][_0x20410b];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1f1)]=function(_0x1f82f4){const _0x33f93a=_0x337b09,_0x493799=VisuMZ[_0x33f93a(0x2c2)][_0x33f93a(0x2f3)];if(_0x493799[_0x1f82f4['id']]&&!_0x493799[_0x1f82f4['id']]['call'](this,_0x1f82f4))return![];return!![];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x202)]=function(_0x53b75c){const _0x80bb43=_0x337b09;return VisuMZ[_0x80bb43(0x2c2)][_0x80bb43(0x34c)][_0x80bb43(0x194)][_0x80bb43(0xf0)][_0x80bb43(0x11b)](this,_0x53b75c);},Game_BattlerBase[_0x337b09(0x160)]['passiveStates']=function(){const _0x1f5b32=_0x337b09;if(this[_0x1f5b32(0x377)](_0x1f5b32(0x18a)))return this[_0x1f5b32(0x197)]();if(this[_0x1f5b32(0xd0)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x1f5b32(0x14a)](),this[_0x1f5b32(0xd0)]=undefined,this[_0x1f5b32(0x197)]();},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x14a)]=function(){const _0x96f8fa=_0x337b09;this[_0x96f8fa(0xd0)]=!![],this[_0x96f8fa(0x351)][_0x96f8fa(0x18a)]=[],this[_0x96f8fa(0x113)](),this[_0x96f8fa(0xf4)](),this[_0x96f8fa(0x337)](),this[_0x96f8fa(0x351)][_0x96f8fa(0x18a)]=this[_0x96f8fa(0x351)][_0x96f8fa(0x18a)][_0x96f8fa(0x1d9)]((_0x462b6d,_0x57abb1)=>_0x462b6d-_0x57abb1),this[_0x96f8fa(0xd0)]=undefined;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x113)]=function(){const _0x71120c=_0x337b09;if(Imported[_0x71120c(0x17a)])this[_0x71120c(0x272)]();},Game_BattlerBase[_0x337b09(0x160)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xf4)]=function(){const _0x25b5f5=_0x337b09,_0x28586a=this['_cache'][_0x25b5f5(0x18a)]||[],_0x4535f=this[_0x25b5f5(0x111)]();this['_cache'][_0x25b5f5(0x18a)]=_0x28586a||[];for(const _0xc6eba0 of _0x4535f){if(!_0xc6eba0)continue;const _0x5e93aa=DataManager[_0x25b5f5(0x2fa)](_0xc6eba0);for(const _0x404faf of _0x5e93aa){this['_cache'][_0x25b5f5(0x18a)][_0x25b5f5(0x2ab)](_0x404faf);}}},DataManager['getPassiveStatesFromObj']=function(_0x364af7){const _0x25489e=_0x337b09;if(!_0x364af7)return[];const _0x2b67d1=VisuMZ['SkillsStatesCore']['createKeyJS'](_0x364af7,_0x25489e(0x22a));this[_0x25489e(0x335)]=this[_0x25489e(0x335)]||{};if(this['_cache_getPassiveStatesFromObj'][_0x2b67d1]!==undefined)return this[_0x25489e(0x335)][_0x2b67d1];const _0xf219bd=[],_0xe39250=_0x364af7[_0x25489e(0x127)]||'',_0x575d37=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x5a2631=_0xe39250[_0x25489e(0x2c1)](_0x575d37);if(_0x5a2631)for(const _0x3c11e2 of _0x5a2631){_0x3c11e2[_0x25489e(0x2c1)](_0x575d37);const _0x391952=String(RegExp['$1'])['split'](',')[_0x25489e(0x314)](_0x560ce6=>_0x560ce6[_0x25489e(0xfe)]());for(const _0x5dc1b2 of _0x391952){const _0x21073a=/^\d+$/['test'](_0x5dc1b2);let _0x1dec76=0x0;_0x21073a?_0x1dec76=Number(_0x5dc1b2):_0x1dec76=DataManager[_0x25489e(0x252)](_0x5dc1b2),_0x1dec76&&_0xf219bd[_0x25489e(0x2ab)](_0x1dec76);}}return this[_0x25489e(0x335)][_0x2b67d1]=_0xf219bd,this['_cache_getPassiveStatesFromObj'][_0x2b67d1];},Game_BattlerBase['prototype'][_0x337b09(0x337)]=function(){const _0x1165a0=_0x337b09,_0x15d8cc=VisuMZ[_0x1165a0(0x2c2)][_0x1165a0(0x34c)]['PassiveStates']['Global'];this[_0x1165a0(0x351)]['passiveStates']=this[_0x1165a0(0x351)][_0x1165a0(0x18a)][_0x1165a0(0x2f6)](_0x15d8cc);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x128)]=function(_0x55c26c){const _0x1152b9=_0x337b09;if(typeof _0x55c26c!==_0x1152b9(0x2ef))_0x55c26c=_0x55c26c['id'];return this[_0x1152b9(0x142)][_0x55c26c]||0x0;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x102)]=function(_0x54e5b1,_0x59baa4){const _0x314f1a=_0x337b09;if(typeof _0x54e5b1!==_0x314f1a(0x2ef))_0x54e5b1=_0x54e5b1['id'];if(this[_0x314f1a(0x15d)](_0x54e5b1)){const _0x583833=DataManager[_0x314f1a(0x198)](_0x54e5b1);this[_0x314f1a(0x142)][_0x54e5b1]=_0x59baa4['clamp'](0x0,_0x583833);if(this[_0x314f1a(0x142)][_0x54e5b1]<=0x0)this['removeState'](_0x54e5b1);}},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2a7)]=function(_0x5e4d35,_0x564df9){const _0x5ba75e=_0x337b09;if(typeof _0x5e4d35!==_0x5ba75e(0x2ef))_0x5e4d35=_0x5e4d35['id'];this['isStateAffected'](_0x5e4d35)&&(_0x564df9+=this[_0x5ba75e(0x128)](_0x5e4d35),this['setStateTurns'](_0x5e4d35,_0x564df9));},VisuMZ['SkillsStatesCore'][_0x337b09(0x349)]=Game_BattlerBase['prototype'][_0x337b09(0x213)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x213)]=function(_0x2e4c08){const _0x54775c=_0x337b09,_0x41dc64=this[_0x54775c(0x34d)][_0x2e4c08];VisuMZ[_0x54775c(0x2c2)][_0x54775c(0x349)][_0x54775c(0x11b)](this,_0x2e4c08);if(_0x41dc64>0x0)this['onEraseBuff'](_0x2e4c08);if(_0x41dc64<0x0)this[_0x54775c(0x278)](_0x2e4c08);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2d5)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1ad)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1ad)]=function(_0x471e08){const _0x60273e=_0x337b09;VisuMZ['SkillsStatesCore'][_0x60273e(0x2d5)][_0x60273e(0x11b)](this,_0x471e08);if(!this[_0x60273e(0x2ac)](_0x471e08))this[_0x60273e(0x213)](_0x471e08);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1bc)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x130)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x130)]=function(_0x594544){const _0x421a97=_0x337b09;VisuMZ[_0x421a97(0x2c2)][_0x421a97(0x1bc)][_0x421a97(0x11b)](this,_0x594544);if(!this[_0x421a97(0x2ac)](_0x594544))this['eraseBuff'](_0x594544);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2ad)]=function(_0x36a0a6){},Game_BattlerBase[_0x337b09(0x160)]['onEraseDebuff']=function(_0x2e7a53){},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x150)]=function(_0x32fe19){const _0x5f0c9b=_0x337b09;return this[_0x5f0c9b(0x34d)][_0x32fe19]===VisuMZ['SkillsStatesCore'][_0x5f0c9b(0x34c)][_0x5f0c9b(0x132)][_0x5f0c9b(0x2a8)];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xcd)]=function(_0x33b666){const _0x10295e=_0x337b09;return this[_0x10295e(0x34d)][_0x33b666]===-VisuMZ[_0x10295e(0x2c2)]['Settings'][_0x10295e(0x132)][_0x10295e(0x35f)];},VisuMZ[_0x337b09(0x2c2)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x12a)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x12a)]=function(_0x177a5e,_0x1c7313){const _0x549336=_0x337b09;return _0x177a5e=_0x177a5e[_0x549336(0xe5)](-0x2,0x2),VisuMZ[_0x549336(0x2c2)][_0x549336(0x294)][_0x549336(0x11b)](this,_0x177a5e,_0x1c7313);},Game_BattlerBase[_0x337b09(0x160)]['paramBuffRate']=function(_0x2d8c97){const _0x45f760=_0x337b09,_0x31d374=this[_0x45f760(0x34d)][_0x2d8c97];return VisuMZ['SkillsStatesCore']['Settings'][_0x45f760(0x132)][_0x45f760(0x12d)][_0x45f760(0x11b)](this,_0x2d8c97,_0x31d374);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x100)]=function(_0x3bb492){const _0x2ee9ab=_0x337b09;return this[_0x2ee9ab(0x236)][_0x3bb492]||0x0;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xce)]=function(_0x26bcc0){const _0x25e30d=_0x337b09;return this[_0x25e30d(0x100)](_0x26bcc0);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x144)]=function(_0x30b58f,_0x2b86c5){const _0xfe81fa=_0x337b09;if(this[_0xfe81fa(0xe2)](_0x30b58f)){const _0x1c401c=VisuMZ['SkillsStatesCore']['Settings'][_0xfe81fa(0x132)][_0xfe81fa(0x25a)];this[_0xfe81fa(0x236)][_0x30b58f]=_0x2b86c5['clamp'](0x0,_0x1c401c);}},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1b8)]=function(_0x59310f,_0x11f370){const _0x113dca=_0x337b09;this['isBuffAffected'](_0x59310f)&&(_0x11f370+=this['buffTurns'](stateId),this[_0x113dca(0x144)](_0x59310f,_0x11f370));},Game_BattlerBase['prototype'][_0x337b09(0x265)]=function(_0x416025,_0x1a8a28){const _0x577281=_0x337b09;if(this[_0x577281(0x1fa)](_0x416025)){const _0x42226b=VisuMZ['SkillsStatesCore'][_0x577281(0x34c)]['Buffs']['MaxTurns'];this[_0x577281(0x236)][_0x416025]=_0x1a8a28['clamp'](0x0,_0x42226b);}},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xd9)]=function(_0x2e49a1,_0x946ec3){const _0xae5577=_0x337b09;this[_0xae5577(0x1fa)](_0x2e49a1)&&(_0x946ec3+=this['buffTurns'](stateId),this[_0xae5577(0x265)](_0x2e49a1,_0x946ec3));},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xdf)]=function(_0x4c9872){const _0x4eb605=_0x337b09;if(typeof _0x4c9872!==_0x4eb605(0x2ef))_0x4c9872=_0x4c9872['id'];return this[_0x4eb605(0x2ba)]=this[_0x4eb605(0x2ba)]||{},this['_stateData'][_0x4c9872]=this[_0x4eb605(0x2ba)][_0x4c9872]||{},this[_0x4eb605(0x2ba)][_0x4c9872];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x291)]=function(_0xb32f00,_0x29fdf7){const _0x251c71=_0x337b09;if(typeof _0xb32f00!==_0x251c71(0x2ef))_0xb32f00=_0xb32f00['id'];const _0x11b8c4=this[_0x251c71(0xdf)](_0xb32f00);return _0x11b8c4[_0x29fdf7];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x10f)]=function(_0x10896d,_0xe715a3,_0x155437){const _0x21e0c4=_0x337b09;if(typeof _0x10896d!=='number')_0x10896d=_0x10896d['id'];const _0x50663a=this[_0x21e0c4(0xdf)](_0x10896d);_0x50663a[_0xe715a3]=_0x155437;},Game_BattlerBase[_0x337b09(0x160)]['clearStateData']=function(_0x4a8896){const _0x586909=_0x337b09;if(typeof _0x4a8896!==_0x586909(0x2ef))_0x4a8896=_0x4a8896['id'];this[_0x586909(0x2ba)]=this['_stateData']||{},this[_0x586909(0x2ba)][_0x4a8896]={};},Game_BattlerBase['prototype'][_0x337b09(0x1bf)]=function(_0x36ef31){const _0x14eb4c=_0x337b09;if(typeof _0x36ef31!=='number')_0x36ef31=_0x36ef31['id'];return this['_stateDisplay']=this[_0x14eb4c(0x28f)]||{},this['_stateDisplay'][_0x36ef31]===undefined&&(this['_stateDisplay'][_0x36ef31]=''),this['_stateDisplay'][_0x36ef31];},Game_BattlerBase[_0x337b09(0x160)]['setStateDisplay']=function(_0xa2c5b,_0x32700e){const _0x22438e=_0x337b09;if(typeof _0xa2c5b!==_0x22438e(0x2ef))_0xa2c5b=_0xa2c5b['id'];this[_0x22438e(0x28f)]=this['_stateDisplay']||{},this[_0x22438e(0x28f)][_0xa2c5b]=_0x32700e;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1e3)]=function(_0x8e5bc1){const _0x4cc709=_0x337b09;if(typeof _0x8e5bc1!=='number')_0x8e5bc1=_0x8e5bc1['id'];this[_0x4cc709(0x28f)]=this[_0x4cc709(0x28f)]||{},this[_0x4cc709(0x28f)][_0x8e5bc1]='';},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1c0)]=function(_0x5e4ccc){const _0x3b4f46=_0x337b09;if(typeof _0x5e4ccc!=='number')_0x5e4ccc=_0x5e4ccc['id'];this[_0x3b4f46(0x1f6)]=this[_0x3b4f46(0x1f6)]||{},this[_0x3b4f46(0x1f6)][_0x5e4ccc]=this['_stateOrigin'][_0x5e4ccc]||_0x3b4f46(0x269);const _0x2dbfd3=this['_stateOrigin'][_0x5e4ccc];return this[_0x3b4f46(0x1a1)](_0x2dbfd3);},Game_BattlerBase[_0x337b09(0x160)]['setStateOrigin']=function(_0x2cc7c5,_0x308df7){const _0x4005fe=_0x337b09;this[_0x4005fe(0x1f6)]=this['_stateOrigin']||{};const _0xde225d=_0x308df7?this['convertTargetToStateOriginKey'](_0x308df7):this['getCurrentStateOriginKey']();this[_0x4005fe(0x1f6)][_0x2cc7c5]=_0xde225d;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2db)]=function(_0x5a527b){const _0x2fa761=_0x337b09;this['_stateOrigin']=this[_0x2fa761(0x1f6)]||{},delete this[_0x2fa761(0x1f6)][_0x5a527b];},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x151)]=function(){const _0x256f86=_0x337b09;this[_0x256f86(0x1f6)]={};},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2e8)]=function(){const _0x34f3ac=this['getCurrentStateActiveUser']();return this['convertTargetToStateOriginKey'](_0x34f3ac);},Game_BattlerBase[_0x337b09(0x160)]['getCurrentStateActiveUser']=function(){const _0x49b502=_0x337b09;if($gameParty[_0x49b502(0x2bb)]()){if(BattleManager[_0x49b502(0x336)])return BattleManager[_0x49b502(0x336)];else{if(BattleManager[_0x49b502(0x1a2)])return BattleManager[_0x49b502(0x1a2)];}}else{const _0x358783=SceneManager['_scene'];if(![Scene_Map,Scene_Item]['includes'](_0x358783[_0x49b502(0x16d)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0xfc)]=function(_0x5e73c4){const _0xa84b9=_0x337b09;if(!_0x5e73c4)return _0xa84b9(0x269);if(_0x5e73c4[_0xa84b9(0x20d)]())return _0xa84b9(0x243)[_0xa84b9(0x175)](_0x5e73c4[_0xa84b9(0x289)]());else{const _0x251ea5='<enemy-%1>'[_0xa84b9(0x175)](_0x5e73c4[_0xa84b9(0x200)]()),_0x9eb46d=_0xa84b9(0xd5)[_0xa84b9(0x175)](_0x5e73c4['index']()),_0xa1569=_0xa84b9(0x329)['format']($gameTroop[_0xa84b9(0x2ce)]());return _0xa84b9(0x1f0)[_0xa84b9(0x175)](_0x251ea5,_0x9eb46d,_0xa1569);}return _0xa84b9(0x269);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x1a1)]=function(_0x3becd3){const _0x3a6071=_0x337b09;if(_0x3becd3==='user')return this;else{if(_0x3becd3[_0x3a6071(0x2c1)](/<actor-(\d+)>/i))return $gameActors[_0x3a6071(0x246)](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x3becd3[_0x3a6071(0x2c1)](/<troop-(\d+)>/i)){const _0x3e706f=Number(RegExp['$1']);if(_0x3e706f===$gameTroop['getCurrentTroopUniqueID']()){if(_0x3becd3[_0x3a6071(0x2c1)](/<member-(\d+)>/i))return $gameTroop[_0x3a6071(0x306)]()[Number(RegExp['$1'])];}}if(_0x3becd3['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2a2)]=Game_Battler[_0x337b09(0x160)][_0x337b09(0x1b4)],Game_Battler[_0x337b09(0x160)][_0x337b09(0x1b4)]=function(_0x3cea1c){const _0x433743=_0x337b09,_0x2115d8=this[_0x433743(0x356)](_0x3cea1c);VisuMZ['SkillsStatesCore'][_0x433743(0x2a2)][_0x433743(0x11b)](this,_0x3cea1c);if(_0x2115d8&&this[_0x433743(0x1b2)]($dataStates[_0x3cea1c])){this[_0x433743(0x107)](_0x3cea1c);;}},VisuMZ[_0x337b09(0x2c2)]['Game_Battler_isStateAddable']=Game_Battler[_0x337b09(0x160)][_0x337b09(0x356)],Game_Battler[_0x337b09(0x160)]['isStateAddable']=function(_0x5648f6){const _0x7da6d5=_0x337b09,_0x207780=$dataStates[_0x5648f6];if(_0x207780&&_0x207780[_0x7da6d5(0x127)][_0x7da6d5(0x2c1)](/<NO DEATH CLEAR>/i))return!this[_0x7da6d5(0x20c)](_0x5648f6)&&!this[_0x7da6d5(0x2c5)](_0x5648f6)&&!this[_0x7da6d5(0x274)][_0x7da6d5(0x344)](_0x5648f6);return VisuMZ[_0x7da6d5(0x2c2)][_0x7da6d5(0x1cd)][_0x7da6d5(0x11b)](this,_0x5648f6);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x107)]=function(_0x14231d){const _0x36023b=_0x337b09;this[_0x36023b(0x1e7)](_0x14231d),this[_0x36023b(0x170)](_0x14231d),this[_0x36023b(0x16c)](_0x14231d),this[_0x36023b(0x284)](_0x14231d),this[_0x36023b(0x186)](_0x14231d);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x134)]=function(_0x33e42b){const _0x27fffa=_0x337b09;this[_0x27fffa(0x1ce)](_0x33e42b),this['onEraseStateGlobalJS'](_0x33e42b),Game_BattlerBase[_0x27fffa(0x160)][_0x27fffa(0x134)][_0x27fffa(0x11b)](this,_0x33e42b);},Game_Battler[_0x337b09(0x160)]['removeStatesAuto']=function(_0x548212){const _0xa27f58=_0x337b09;for(const _0x78466b of this[_0xa27f58(0x263)]()){this[_0xa27f58(0x25b)](_0x78466b['id'])&&_0x78466b[_0xa27f58(0x173)]===_0x548212&&(this['removeState'](_0x78466b['id']),this[_0xa27f58(0x2a1)](_0x78466b['id']),this['onExpireStateGlobalJS'](_0x78466b['id']));}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x2a1)]=function(_0x594e94){this['onExpireStateCustomJS'](_0x594e94);},Game_Battler['prototype'][_0x337b09(0x284)]=function(_0x66732b){const _0x399539=_0x337b09;if(this[_0x399539(0x112)]||this[_0x399539(0x136)])return;const _0x2d4ec5=VisuMZ[_0x399539(0x2c2)][_0x399539(0x33c)];if(_0x2d4ec5[_0x66732b])_0x2d4ec5[_0x66732b]['call'](this,_0x66732b);},Game_Battler['prototype'][_0x337b09(0x1ce)]=function(_0x1bed0f){const _0x52d87c=_0x337b09;if(this[_0x52d87c(0x112)]||this['_tempBattler'])return;const _0x5f580d=VisuMZ[_0x52d87c(0x2c2)]['stateEraseJS'];if(_0x5f580d[_0x1bed0f])_0x5f580d[_0x1bed0f][_0x52d87c(0x11b)](this,_0x1bed0f);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x361)]=function(_0x228581){const _0x1e7ecc=_0x337b09;if(this['_tempActor']||this[_0x1e7ecc(0x136)])return;const _0x4ca124=VisuMZ[_0x1e7ecc(0x2c2)]['stateExpireJS'];if(_0x4ca124[_0x228581])_0x4ca124[_0x228581][_0x1e7ecc(0x11b)](this,_0x228581);},Game_Battler[_0x337b09(0x160)]['onAddStateGlobalJS']=function(_0xba0233){const _0x5ae3c4=_0x337b09;if(this[_0x5ae3c4(0x112)]||this[_0x5ae3c4(0x136)])return;try{VisuMZ[_0x5ae3c4(0x2c2)]['Settings'][_0x5ae3c4(0x242)][_0x5ae3c4(0x19f)]['call'](this,_0xba0233);}catch(_0xf207e3){if($gameTemp[_0x5ae3c4(0x36a)]())console[_0x5ae3c4(0x339)](_0xf207e3);}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x368)]=function(_0xa72a9e){const _0x9545c8=_0x337b09;if(this[_0x9545c8(0x112)]||this[_0x9545c8(0x136)])return;try{VisuMZ['SkillsStatesCore'][_0x9545c8(0x34c)][_0x9545c8(0x242)][_0x9545c8(0xcc)][_0x9545c8(0x11b)](this,_0xa72a9e);}catch(_0x118a51){if($gameTemp[_0x9545c8(0x36a)]())console[_0x9545c8(0x339)](_0x118a51);}},Game_Battler[_0x337b09(0x160)][_0x337b09(0xed)]=function(_0x1d5659){const _0x3c7fbb=_0x337b09;if(this[_0x3c7fbb(0x112)]||this[_0x3c7fbb(0x136)])return;try{VisuMZ[_0x3c7fbb(0x2c2)][_0x3c7fbb(0x34c)][_0x3c7fbb(0x242)][_0x3c7fbb(0x24d)][_0x3c7fbb(0x11b)](this,_0x1d5659);}catch(_0x35df9a){if($gameTemp[_0x3c7fbb(0x36a)]())console['log'](_0x35df9a);}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x30c)]=function(_0x132664){const _0x138f5e=_0x337b09;return _0x132664=_0x132664[_0x138f5e(0x149)]()[_0x138f5e(0xfe)](),this[_0x138f5e(0x263)]()[_0x138f5e(0x29e)](_0x126591=>_0x126591['categories'][_0x138f5e(0x1a4)](_0x132664));},Game_Battler[_0x337b09(0x160)]['removeStatesByCategory']=function(_0x56966a,_0x2e8fe3){const _0x46ce98=_0x337b09;_0x56966a=_0x56966a[_0x46ce98(0x149)]()[_0x46ce98(0xfe)](),_0x2e8fe3=_0x2e8fe3||0x0;const _0x2c5138=this[_0x46ce98(0x30c)](_0x56966a),_0x47e6c3=[];for(const _0x549923 of _0x2c5138){if(!_0x549923)continue;if(_0x2e8fe3<=0x0)break;_0x47e6c3[_0x46ce98(0x2ab)](_0x549923['id']),this[_0x46ce98(0x274)]['success']=!![],_0x2e8fe3--;}while(_0x47e6c3[_0x46ce98(0x324)]>0x0){this[_0x46ce98(0x15e)](_0x47e6c3[_0x46ce98(0x316)]());}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x29a)]=function(_0x2e2e20,_0x59e75e){const _0x2bc54a=_0x337b09;_0x2e2e20=_0x2e2e20['toUpperCase']()[_0x2bc54a(0xfe)](),_0x59e75e=_0x59e75e||[];const _0x342f5b=this[_0x2bc54a(0x30c)](_0x2e2e20),_0x90c814=[];for(const _0x38f1c4 of _0x342f5b){if(!_0x38f1c4)continue;if(_0x59e75e[_0x2bc54a(0x1a4)](_0x38f1c4))continue;_0x90c814[_0x2bc54a(0x2ab)](_0x38f1c4['id']),this[_0x2bc54a(0x274)][_0x2bc54a(0x1ec)]=!![];}while(_0x90c814[_0x2bc54a(0x324)]>0x0){this[_0x2bc54a(0x15e)](_0x90c814[_0x2bc54a(0x316)]());}},Game_Battler[_0x337b09(0x160)]['isStateCategoryAffected']=function(_0x22c7a0){return this['totalStateCategoryAffected'](_0x22c7a0)>0x0;},Game_Battler[_0x337b09(0x160)][_0x337b09(0x13e)]=function(_0xb01259){return this['totalStateCategory'](_0xb01259)>0x0;},Game_Battler[_0x337b09(0x160)]['totalStateCategoryAffected']=function(_0x1ded5d){const _0x5bf65c=_0x337b09,_0x3e8beb=this['statesByCategory'](_0x1ded5d)[_0x5bf65c(0x29e)](_0x405b2d=>this['isStateAffected'](_0x405b2d['id']));return _0x3e8beb[_0x5bf65c(0x324)];},Game_Battler[_0x337b09(0x160)]['totalStateCategory']=function(_0x27d33e){const _0x405f96=_0x337b09,_0x18a451=this[_0x405f96(0x30c)](_0x27d33e);return _0x18a451[_0x405f96(0x324)];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x33a)]=Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x20c)],Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x20c)]=function(_0x3e1dcd){const _0x5efa1f=_0x337b09,_0x52080b=$dataStates[_0x3e1dcd];if(_0x52080b&&_0x52080b[_0x5efa1f(0xee)][_0x5efa1f(0x324)]>0x0)for(const _0x262608 of _0x52080b['categories']){if(this[_0x5efa1f(0x104)](_0x262608))return!![];}return VisuMZ['SkillsStatesCore'][_0x5efa1f(0x33a)][_0x5efa1f(0x11b)](this,_0x3e1dcd);},Game_BattlerBase['prototype']['isStateCategoryResisted']=function(_0x26e6e0){const _0x5a2427=_0x337b09;let _0xa10693='stateCategoriesResisted';if(this[_0x5a2427(0x377)](_0xa10693))return this[_0x5a2427(0x351)][_0xa10693]['includes'](_0x26e6e0);return this['_cache'][_0xa10693]=this['makeResistedStateCategories'](),this[_0x5a2427(0x351)][_0xa10693][_0x5a2427(0x1a4)](_0x26e6e0);},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x2e0)]=function(){const _0x3216b8=_0x337b09,_0x5e71c1=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x525a71=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x1b0838=[];for(const _0x37e101 of this['traitObjects']()){if(!_0x37e101)continue;const _0x10ef2a=_0x37e101[_0x3216b8(0x127)],_0x291488=_0x10ef2a['match'](_0x5e71c1);if(_0x291488)for(const _0x406a20 of _0x291488){_0x406a20[_0x3216b8(0x2c1)](_0x5e71c1);const _0x19cc97=String(RegExp['$1'])[_0x3216b8(0x26e)](',')[_0x3216b8(0x314)](_0x502e1d=>String(_0x502e1d)[_0x3216b8(0x149)]()[_0x3216b8(0xfe)]());_0x1b0838=_0x1b0838[_0x3216b8(0x2f6)](_0x19cc97);}if(_0x10ef2a[_0x3216b8(0x2c1)](_0x525a71)){const _0x10e5ca=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x3216b8(0x314)](_0x317bb3=>String(_0x317bb3)[_0x3216b8(0x149)]()[_0x3216b8(0xfe)]());_0x1b0838=_0x1b0838[_0x3216b8(0x2f6)](_0x10e5ca);}}return _0x1b0838;},Game_BattlerBase[_0x337b09(0x160)][_0x337b09(0x170)]=function(_0x5ef59a){const _0x134853=_0x337b09,_0x4087b0=$dataStates[_0x5ef59a];if(!_0x4087b0)return;const _0x3d4799=_0x4087b0[_0x134853(0x127)]||'',_0x449ebc=_0x3d4799[_0x134853(0x2c1)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x449ebc){const _0x9a5958=[_0x4087b0];for(const _0x5225b0 of _0x449ebc){_0x5225b0['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x3be3e9=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x3be3e9,_0x9a5958);}}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x13b)]=function(){const _0x288330=_0x337b09;for(const _0x19e3eb of this['states']()){if(!_0x19e3eb[_0x288330(0x108)])continue;if(this[_0x288330(0x2fe)](_0x19e3eb))continue;Math['randomInt'](0x64)<_0x19e3eb['chanceByDamage']&&this[_0x288330(0x15e)](_0x19e3eb['id']);}},VisuMZ[_0x337b09(0x2c2)]['Game_Battler_addBuff']=Game_Battler[_0x337b09(0x160)][_0x337b09(0x233)],Game_Battler['prototype'][_0x337b09(0x233)]=function(_0x24544b,_0x40e21b){const _0x4e6d9c=_0x337b09;VisuMZ[_0x4e6d9c(0x2c2)][_0x4e6d9c(0x28e)][_0x4e6d9c(0x11b)](this,_0x24544b,_0x40e21b),this[_0x4e6d9c(0xe2)](_0x24544b)&&this[_0x4e6d9c(0x241)](_0x24544b,_0x40e21b);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x1a8)]=function(_0x1b1a64){},VisuMZ['SkillsStatesCore'][_0x337b09(0x307)]=Game_Battler[_0x337b09(0x160)][_0x337b09(0x20f)],Game_Battler[_0x337b09(0x160)]['addDebuff']=function(_0x19b091,_0x5cad87){const _0x12013e=_0x337b09;VisuMZ[_0x12013e(0x2c2)][_0x12013e(0x307)][_0x12013e(0x11b)](this,_0x19b091,_0x5cad87),this[_0x12013e(0x1fa)](_0x19b091)&&this[_0x12013e(0x30f)](_0x19b091,_0x5cad87);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x2d6)]=function(){const _0x4536df=_0x337b09;for(let _0x2bb345=0x0;_0x2bb345<this['buffLength']();_0x2bb345++){if(this['isBuffExpired'](_0x2bb345)){const _0x2a76e5=this[_0x4536df(0x34d)][_0x2bb345];this['removeBuff'](_0x2bb345);if(_0x2a76e5>0x0)this['onExpireBuff'](_0x2bb345);if(_0x2a76e5<0x0)this['onExpireDebuff'](_0x2bb345);}}},Game_Battler['prototype'][_0x337b09(0x241)]=function(_0x54a1ee,_0x1dbd7d){const _0x40cc71=_0x337b09;this[_0x40cc71(0x244)](_0x54a1ee,_0x1dbd7d);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x30f)]=function(_0x1006a0,_0x3aa07f){const _0x4edb99=_0x337b09;this[_0x4edb99(0x31e)](_0x1006a0,_0x3aa07f);},Game_Battler['prototype'][_0x337b09(0x2ad)]=function(_0x5859ba){const _0x4a2fe5=_0x337b09;Game_BattlerBase[_0x4a2fe5(0x160)][_0x4a2fe5(0x2ad)][_0x4a2fe5(0x11b)](this,_0x5859ba),this[_0x4a2fe5(0x2f0)](_0x5859ba);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x278)]=function(_0x128100){const _0x3570ca=_0x337b09;Game_BattlerBase[_0x3570ca(0x160)][_0x3570ca(0x278)][_0x3570ca(0x11b)](this,_0x128100),this[_0x3570ca(0x17d)](_0x128100);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x18f)]=function(_0xd5c4b8){this['onExpireBuffGlobalJS'](_0xd5c4b8);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x271)]=function(_0x10885d){const _0x25a51e=_0x337b09;this[_0x25a51e(0x165)](_0x10885d);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x244)]=function(_0x4d3126,_0x2e9752){const _0x5c1e59=_0x337b09;VisuMZ[_0x5c1e59(0x2c2)][_0x5c1e59(0x34c)][_0x5c1e59(0x132)][_0x5c1e59(0x253)][_0x5c1e59(0x11b)](this,_0x4d3126,_0x2e9752);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x31e)]=function(_0x3d5801,_0x225e74){const _0x29a4a0=_0x337b09;VisuMZ[_0x29a4a0(0x2c2)][_0x29a4a0(0x34c)]['Buffs'][_0x29a4a0(0x1a9)][_0x29a4a0(0x11b)](this,_0x3d5801,_0x225e74);},Game_BattlerBase['prototype'][_0x337b09(0x2f0)]=function(_0x218b3d){const _0x1f792a=_0x337b09;VisuMZ[_0x1f792a(0x2c2)][_0x1f792a(0x34c)][_0x1f792a(0x132)][_0x1f792a(0x182)][_0x1f792a(0x11b)](this,_0x218b3d);},Game_BattlerBase[_0x337b09(0x160)]['onEraseDebuffGlobalJS']=function(_0x3ce439){const _0x5c48df=_0x337b09;VisuMZ[_0x5c48df(0x2c2)][_0x5c48df(0x34c)][_0x5c48df(0x132)][_0x5c48df(0xcb)][_0x5c48df(0x11b)](this,_0x3ce439);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x1b5)]=function(_0x180b49){const _0x4a3f9a=_0x337b09;VisuMZ[_0x4a3f9a(0x2c2)]['Settings'][_0x4a3f9a(0x132)][_0x4a3f9a(0x28a)][_0x4a3f9a(0x11b)](this,_0x180b49);},Game_Battler[_0x337b09(0x160)][_0x337b09(0x165)]=function(_0xbdfafc){const _0xb9eec8=_0x337b09;VisuMZ['SkillsStatesCore']['Settings'][_0xb9eec8(0x132)]['onExpireDebuffJS']['call'](this,_0xbdfafc);},Game_Battler['prototype']['onAddStateMakeCustomSlipValues']=function(_0x1bcbcb){const _0x1a017c=_0x337b09,_0x4adfac=VisuMZ[_0x1a017c(0x2c2)],_0x5a9571=[_0x1a017c(0xfd),'stateHpSlipHealJS',_0x1a017c(0x179),_0x1a017c(0x373),_0x1a017c(0x2b5),_0x1a017c(0x208)];for(const _0xeffe88 of _0x5a9571){_0x4adfac[_0xeffe88][_0x1bcbcb]&&_0x4adfac[_0xeffe88][_0x1bcbcb][_0x1a017c(0x11b)](this,_0x1bcbcb);}},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x15f)]=Game_Battler[_0x337b09(0x160)][_0x337b09(0x33b)],Game_Battler['prototype']['regenerateAll']=function(){const _0x465fe6=_0x337b09;this[_0x465fe6(0x219)](),VisuMZ[_0x465fe6(0x2c2)][_0x465fe6(0x15f)][_0x465fe6(0x11b)](this),this['setPassiveStateSlipDamageJS'](),this[_0x465fe6(0x224)]();},Game_Battler[_0x337b09(0x160)][_0x337b09(0x25f)]=function(){const _0x2b4ce1=_0x337b09;for(const _0x5145ee of this[_0x2b4ce1(0x18a)]()){if(!_0x5145ee)continue;this['onAddStateMakeCustomSlipValues'](_0x5145ee['id']);}},Game_Battler[_0x337b09(0x160)]['recalculateSlipDamageJS']=function(){const _0x357fb6=_0x337b09;for(const _0x4f18a5 of this[_0x357fb6(0x263)]()){if(!_0x4f18a5)continue;_0x4f18a5['note'][_0x357fb6(0x2c1)](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0x4f18a5['id']);}},Game_Battler['prototype'][_0x337b09(0x224)]=function(){const _0x2421fa=_0x337b09;if(!this[_0x2421fa(0x19c)]())return;const _0x4a72f3=this[_0x2421fa(0x263)]();for(const _0x58af75 of _0x4a72f3){if(!_0x58af75)continue;this[_0x2421fa(0x1b6)](_0x58af75);}},Game_Battler[_0x337b09(0x160)][_0x337b09(0x1b6)]=function(_0x8e83a4){const _0x171825=_0x337b09,_0x2e7e9e=this[_0x171825(0x291)](_0x8e83a4['id'],'slipHp')||0x0,_0x185f11=-this[_0x171825(0x2cc)](),_0x291fa8=Math[_0x171825(0x1e8)](_0x2e7e9e,_0x185f11);if(_0x291fa8!==0x0){const _0x55d26a=this[_0x171825(0x274)]['hpDamage']||0x0;this[_0x171825(0x1bb)](_0x291fa8),this[_0x171825(0x274)][_0x171825(0x1cb)]+=_0x55d26a;}const _0x2a0f5c=this[_0x171825(0x291)](_0x8e83a4['id'],_0x171825(0x343))||0x0;if(_0x2a0f5c!==0x0){const _0x16a578=this['_result'][_0x171825(0x362)]||0x0;this['gainMp'](_0x2a0f5c),this[_0x171825(0x274)][_0x171825(0x362)]+=_0x16a578;}const _0x4f29b2=this[_0x171825(0x291)](_0x8e83a4['id'],_0x171825(0x312))||0x0;_0x4f29b2!==0x0&&this[_0x171825(0x360)](_0x4f29b2);},VisuMZ['SkillsStatesCore'][_0x337b09(0x301)]=Game_Actor['prototype'][_0x337b09(0x22e)],Game_Actor[_0x337b09(0x160)]['skillTypes']=function(){const _0x44d149=_0x337b09,_0x23c599=VisuMZ[_0x44d149(0x2c2)][_0x44d149(0x301)][_0x44d149(0x11b)](this),_0x5af6b6=VisuMZ[_0x44d149(0x2c2)][_0x44d149(0x34c)]['Skills'];let _0x373b81=_0x5af6b6[_0x44d149(0x2c7)];return $gameParty['inBattle']()&&(_0x373b81=_0x373b81[_0x44d149(0x2f6)](_0x5af6b6[_0x44d149(0x15b)])),_0x23c599[_0x44d149(0x29e)](_0x5472c5=>!_0x373b81['includes'](_0x5472c5));},Game_Actor['prototype'][_0x337b09(0x2a6)]=function(){const _0x364879=_0x337b09;return this[_0x364879(0x1b9)]()[_0x364879(0x29e)](_0x4821d1=>this['isSkillUsableForAutoBattle'](_0x4821d1));},Game_Actor[_0x337b09(0x160)][_0x337b09(0x1af)]=function(_0x3efc21){const _0x6656f7=_0x337b09;if(!this[_0x6656f7(0x18e)](_0x3efc21))return![];if(!_0x3efc21)return![];if(!this[_0x6656f7(0x2d2)](_0x3efc21))return![];if(this[_0x6656f7(0x34e)](_0x3efc21))return![];return!![];},Game_Actor[_0x337b09(0x160)][_0x337b09(0x2d2)]=function(_0x439f43){const _0x2fd961=_0x337b09,_0x1f2e80=this[_0x2fd961(0x22e)](),_0x5cb225=DataManager[_0x2fd961(0x1d2)](_0x439f43),_0x10c66d=_0x1f2e80[_0x2fd961(0x29e)](_0x22f7a2=>_0x5cb225[_0x2fd961(0x1a4)](_0x22f7a2));return _0x10c66d[_0x2fd961(0x324)]>0x0;},Game_Actor[_0x337b09(0x160)]['isSkillHidden']=function(_0x47fe97){const _0x121857=_0x337b09;if(!VisuMZ[_0x121857(0x2c2)][_0x121857(0x333)](this,_0x47fe97))return!![];if(!VisuMZ[_0x121857(0x2c2)][_0x121857(0x297)](this,_0x47fe97))return!![];if(!VisuMZ['SkillsStatesCore'][_0x121857(0x204)](this,_0x47fe97))return!![];return![];},Game_Actor[_0x337b09(0x160)]['passiveStateObjects']=function(){const _0x339663=_0x337b09;let _0x430b17=[this['actor'](),this[_0x339663(0x184)]()];_0x430b17=_0x430b17['concat'](this['equips']()['filter'](_0x3585f0=>_0x3585f0));for(const _0x4884ee of this[_0x339663(0x207)]){const _0x1849b9=$dataSkills[_0x4884ee];if(_0x1849b9)_0x430b17[_0x339663(0x2ab)](_0x1849b9);}return _0x430b17;},Game_Actor[_0x337b09(0x160)][_0x337b09(0x337)]=function(){const _0x408093=_0x337b09;Game_Battler[_0x408093(0x160)][_0x408093(0x337)][_0x408093(0x11b)](this);const _0x5bfe16=VisuMZ['SkillsStatesCore'][_0x408093(0x34c)][_0x408093(0x194)][_0x408093(0x120)];this[_0x408093(0x351)][_0x408093(0x18a)]=this[_0x408093(0x351)][_0x408093(0x18a)]['concat'](_0x5bfe16);},VisuMZ['SkillsStatesCore'][_0x337b09(0x1d6)]=Game_Actor[_0x337b09(0x160)][_0x337b09(0x192)],Game_Actor[_0x337b09(0x160)][_0x337b09(0x192)]=function(_0xe3d089){const _0x28c5c2=_0x337b09;VisuMZ[_0x28c5c2(0x2c2)][_0x28c5c2(0x1d6)]['call'](this,_0xe3d089),this[_0x28c5c2(0x351)]={},this['passiveStates']();},VisuMZ['SkillsStatesCore'][_0x337b09(0x187)]=Game_Actor[_0x337b09(0x160)][_0x337b09(0x1d4)],Game_Actor[_0x337b09(0x160)][_0x337b09(0x1d4)]=function(_0x53d47b){const _0x5342ae=_0x337b09;VisuMZ[_0x5342ae(0x2c2)]['Game_Actor_forgetSkill'][_0x5342ae(0x11b)](this,_0x53d47b),this[_0x5342ae(0x351)]={},this['passiveStates']();},Game_Actor[_0x337b09(0x160)]['stepsForTurn']=function(){const _0x1f055d=_0x337b09;return VisuMZ[_0x1f055d(0x2c2)]['Settings'][_0x1f055d(0x242)][_0x1f055d(0x10e)]??0x14;},Game_Enemy[_0x337b09(0x160)][_0x337b09(0x111)]=function(){const _0x20e021=_0x337b09;let _0x37f647=[this['enemy']()];return _0x37f647[_0x20e021(0x2f6)](this[_0x20e021(0x1b9)]());},Game_Enemy['prototype'][_0x337b09(0x337)]=function(){const _0x1b814b=_0x337b09;Game_Battler[_0x1b814b(0x160)][_0x1b814b(0x337)][_0x1b814b(0x11b)](this);const _0x41fbb0=VisuMZ['SkillsStatesCore'][_0x1b814b(0x34c)][_0x1b814b(0x194)][_0x1b814b(0x2fb)];this[_0x1b814b(0x351)][_0x1b814b(0x18a)]=this['_cache']['passiveStates'][_0x1b814b(0x2f6)](_0x41fbb0);},Game_Enemy[_0x337b09(0x160)][_0x337b09(0x1b9)]=function(){const _0xf09451=_0x337b09,_0x1e9955=[];for(const _0x580edd of this['enemy']()[_0xf09451(0x358)]){const _0x351df5=$dataSkills[_0x580edd[_0xf09451(0x326)]];if(_0x351df5&&!_0x1e9955[_0xf09451(0x1a4)](_0x351df5))_0x1e9955[_0xf09451(0x2ab)](_0x351df5);}return _0x1e9955;},Game_Enemy[_0x337b09(0x160)][_0x337b09(0x101)]=function(_0x196770){return this['hasState']($dataStates[_0x196770]);},VisuMZ[_0x337b09(0x2c2)]['Game_Unit_isAllDead']=Game_Unit[_0x337b09(0x160)][_0x337b09(0x22c)],Game_Unit[_0x337b09(0x160)][_0x337b09(0x22c)]=function(){const _0x4e1668=_0x337b09;if(this[_0x4e1668(0x340)]())return!![];return VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead'][_0x4e1668(0x11b)](this);},Game_Unit[_0x337b09(0x160)][_0x337b09(0x340)]=function(){const _0x10beae=_0x337b09,_0x470a82=this[_0x10beae(0x21b)]();for(const _0x32e3f6 of _0x470a82){if(!_0x32e3f6[_0x10beae(0x256)]())return![];}return!![];},VisuMZ[_0x337b09(0x2c2)]['Game_Troop_setup']=Game_Troop[_0x337b09(0x160)]['setup'],Game_Troop[_0x337b09(0x160)][_0x337b09(0x31c)]=function(_0x176f0c){const _0x4c8b62=_0x337b09;VisuMZ[_0x4c8b62(0x2c2)][_0x4c8b62(0x315)]['call'](this,_0x176f0c),this[_0x4c8b62(0x172)]();},Game_Troop['prototype'][_0x337b09(0x172)]=function(){const _0x261afc=_0x337b09;this['_currentTroopUniqueID']=Graphics[_0x261afc(0x26b)];},Game_Troop[_0x337b09(0x160)][_0x337b09(0x2ce)]=function(){const _0x4b7dd1=_0x337b09;return this[_0x4b7dd1(0x37a)]=this[_0x4b7dd1(0x37a)]||Graphics['frameCount'],this[_0x4b7dd1(0x37a)];},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x181)]=function(){const _0x213afb=_0x337b09;if(ConfigManager[_0x213afb(0x2de)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x213afb(0x141)];else{if(this[_0x213afb(0x11d)]())return this[_0x213afb(0x2c6)]()['match'](/LOWER/i);else Scene_ItemBase[_0x213afb(0x160)][_0x213afb(0x161)][_0x213afb(0x11b)](this);}},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x161)]=function(){const _0x58fee7=_0x337b09;if(ConfigManager[_0x58fee7(0x2de)]&&ConfigManager[_0x58fee7(0x268)]!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x58fee7(0x11d)]()?this[_0x58fee7(0x2c6)]()[_0x58fee7(0x2c1)](/RIGHT/i):Scene_ItemBase[_0x58fee7(0x160)]['isRightInputMode']['call'](this);},Scene_Skill[_0x337b09(0x160)]['updatedLayoutStyle']=function(){const _0x29ef55=_0x337b09;return VisuMZ['SkillsStatesCore'][_0x29ef55(0x34c)][_0x29ef55(0x31d)][_0x29ef55(0x28b)];},Scene_Skill[_0x337b09(0x160)]['isUseModernControls']=function(){const _0x14541b=_0x337b09;return this[_0x14541b(0x299)]&&this[_0x14541b(0x299)][_0x14541b(0x1eb)]();},Scene_Skill[_0x337b09(0x160)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x39e408=_0x337b09;return VisuMZ[_0x39e408(0x2c2)]['Settings'][_0x39e408(0x31d)][_0x39e408(0x2e2)];},VisuMZ[_0x337b09(0x2c2)]['Scene_Skill_helpWindowRect']=Scene_Skill[_0x337b09(0x160)][_0x337b09(0x2e7)],Scene_Skill['prototype'][_0x337b09(0x2e7)]=function(){const _0x54c20d=_0x337b09;return this[_0x54c20d(0x11d)]()?this[_0x54c20d(0xd8)]():VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x54c20d(0x11b)](this);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0xd8)]=function(){const _0x42c3a0=_0x337b09,_0x29cd25=0x0,_0x2f82be=this[_0x42c3a0(0x32d)](),_0x40fd89=Graphics['boxWidth'],_0x5421d3=this['helpAreaHeight']();return new Rectangle(_0x29cd25,_0x2f82be,_0x40fd89,_0x5421d3);},VisuMZ['SkillsStatesCore'][_0x337b09(0x2f4)]=Scene_Skill[_0x337b09(0x160)][_0x337b09(0x206)],Scene_Skill['prototype'][_0x337b09(0x206)]=function(){const _0x348506=_0x337b09;return this[_0x348506(0x11d)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x348506(0x2c2)][_0x348506(0x2f4)][_0x348506(0x11b)](this);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x26c)]=function(){const _0x351d7e=_0x337b09;return VisuMZ[_0x351d7e(0x2c2)][_0x351d7e(0x34c)][_0x351d7e(0x31d)][_0x351d7e(0x327)]??Scene_MenuBase[_0x351d7e(0x160)][_0x351d7e(0x26c)][_0x351d7e(0x11b)](this);},Scene_Skill[_0x337b09(0x160)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x4725e7=_0x337b09,_0x286ded=this[_0x4725e7(0x26c)](),_0x21778b=this[_0x4725e7(0x126)](0x3,!![]),_0x5e8314=this[_0x4725e7(0x161)]()?Graphics[_0x4725e7(0x313)]-_0x286ded:0x0,_0x9a1cf9=this[_0x4725e7(0x2a0)]();return new Rectangle(_0x5e8314,_0x9a1cf9,_0x286ded,_0x21778b);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x171)]=Scene_Skill[_0x337b09(0x160)][_0x337b09(0x35e)],Scene_Skill[_0x337b09(0x160)]['statusWindowRect']=function(){const _0x5666f4=_0x337b09;return this[_0x5666f4(0x11d)]()?this[_0x5666f4(0x217)]():VisuMZ[_0x5666f4(0x2c2)][_0x5666f4(0x171)][_0x5666f4(0x11b)](this);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x217)]=function(){const _0x5e8b51=_0x337b09,_0x456a0e=Graphics['boxWidth']-this['mainCommandWidth'](),_0x121df5=this['_skillTypeWindow'][_0x5e8b51(0x21a)],_0x4a1666=this[_0x5e8b51(0x161)]()?0x0:Graphics[_0x5e8b51(0x313)]-_0x456a0e,_0x354d94=this['mainAreaTop']();return new Rectangle(_0x4a1666,_0x354d94,_0x456a0e,_0x121df5);},VisuMZ['SkillsStatesCore'][_0x337b09(0xf5)]=Scene_Skill['prototype'][_0x337b09(0x146)],Scene_Skill[_0x337b09(0x160)][_0x337b09(0x146)]=function(){const _0x454eae=_0x337b09;VisuMZ[_0x454eae(0x2c2)]['Scene_Skill_createItemWindow'][_0x454eae(0x11b)](this),this[_0x454eae(0x378)]()&&this[_0x454eae(0x1f7)]();},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x319)]=Scene_Skill['prototype']['itemWindowRect'],Scene_Skill[_0x337b09(0x160)][_0x337b09(0x167)]=function(){const _0x4df9f2=_0x337b09;if(this[_0x4df9f2(0x11d)]())return this[_0x4df9f2(0x2cd)]();else{const _0x41212b=VisuMZ[_0x4df9f2(0x2c2)][_0x4df9f2(0x319)][_0x4df9f2(0x11b)](this);return this[_0x4df9f2(0x378)]()&&this[_0x4df9f2(0x1d1)]()&&(_0x41212b[_0x4df9f2(0x281)]-=this[_0x4df9f2(0x14d)]()),_0x41212b;}},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x2cd)]=function(){const _0x29eafe=_0x337b09,_0x2fffdf=Graphics[_0x29eafe(0x313)]-this[_0x29eafe(0x14d)](),_0x4bf639=this[_0x29eafe(0xdd)]()-this['_statusWindow'][_0x29eafe(0x21a)],_0x450936=this[_0x29eafe(0x161)]()?Graphics[_0x29eafe(0x313)]-_0x2fffdf:0x0,_0x361f06=this[_0x29eafe(0x2ee)]['y']+this[_0x29eafe(0x2ee)][_0x29eafe(0x21a)];return new Rectangle(_0x450936,_0x361f06,_0x2fffdf,_0x4bf639);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x378)]=function(){const _0x416722=_0x337b09;if(!Imported[_0x416722(0x115)])return![];else return this[_0x416722(0x11d)]()?!![]:VisuMZ[_0x416722(0x2c2)][_0x416722(0x34c)][_0x416722(0x31d)][_0x416722(0x33f)];},Scene_Skill['prototype'][_0x337b09(0x1d1)]=function(){const _0x1dd836=_0x337b09;return VisuMZ[_0x1dd836(0x2c2)][_0x1dd836(0x34c)][_0x1dd836(0x31d)][_0x1dd836(0x264)];},Scene_Skill['prototype'][_0x337b09(0x1f7)]=function(){const _0x18329a=_0x337b09,_0x26b58e=this[_0x18329a(0x32a)]();this[_0x18329a(0x117)]=new Window_ShopStatus(_0x26b58e),this[_0x18329a(0x300)](this[_0x18329a(0x117)]),this[_0x18329a(0x191)][_0x18329a(0x19e)](this[_0x18329a(0x117)]);const _0x5ee165=VisuMZ[_0x18329a(0x2c2)][_0x18329a(0x34c)][_0x18329a(0x31d)][_0x18329a(0x364)];this['_shopStatusWindow'][_0x18329a(0x215)](_0x5ee165||0x0);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x32a)]=function(){const _0x2faf35=_0x337b09;return this[_0x2faf35(0x11d)]()?this[_0x2faf35(0x123)]():VisuMZ[_0x2faf35(0x2c2)][_0x2faf35(0x34c)]['Skills'][_0x2faf35(0x12f)]['call'](this);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x123)]=function(){const _0x3d9448=_0x337b09,_0x400595=this[_0x3d9448(0x14d)](),_0x358cac=this[_0x3d9448(0x191)][_0x3d9448(0x21a)],_0x44ad45=this['isRightInputMode']()?0x0:Graphics[_0x3d9448(0x313)]-this[_0x3d9448(0x14d)](),_0x4b5245=this[_0x3d9448(0x191)]['y'];return new Rectangle(_0x44ad45,_0x4b5245,_0x400595,_0x358cac);},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x14d)]=function(){const _0x1c80e5=_0x337b09;return Imported[_0x1c80e5(0x115)]?Scene_Shop[_0x1c80e5(0x160)][_0x1c80e5(0x11e)]():0x0;},Scene_Skill[_0x337b09(0x160)][_0x337b09(0x36e)]=function(){const _0x431a6d=_0x337b09;return this[_0x431a6d(0x2e3)]&&this[_0x431a6d(0x2e3)][_0x431a6d(0x178)]?TextManager[_0x431a6d(0x229)]:'';},VisuMZ['SkillsStatesCore'][_0x337b09(0x302)]=Sprite_Gauge['prototype'][_0x337b09(0xf2)],Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0xf2)]=function(){const _0xd64703=_0x337b09;VisuMZ[_0xd64703(0x2c2)][_0xd64703(0x302)][_0xd64703(0x11b)](this),this[_0xd64703(0x1f5)]=null;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2c4)]=Sprite_Gauge[_0x337b09(0x160)]['setup'],Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x31c)]=function(_0x41830a,_0x403ff2){const _0x2961e4=_0x337b09;this[_0x2961e4(0x129)](_0x41830a,_0x403ff2),_0x403ff2=_0x403ff2[_0x2961e4(0x1f2)](),VisuMZ[_0x2961e4(0x2c2)][_0x2961e4(0x2c4)][_0x2961e4(0x11b)](this,_0x41830a,_0x403ff2);},Sprite_Gauge['prototype'][_0x337b09(0x129)]=function(_0x497d2d,_0x530a98){const _0x34e4d4=_0x337b09,_0x296c5d=VisuMZ[_0x34e4d4(0x2c2)][_0x34e4d4(0x34c)][_0x34e4d4(0x1cc)][_0x34e4d4(0x29e)](_0x384884=>_0x384884[_0x34e4d4(0x2d4)][_0x34e4d4(0x149)]()===_0x530a98['toUpperCase']());_0x296c5d[_0x34e4d4(0x324)]>=0x1?this['_costSettings']=_0x296c5d[0x0]:this[_0x34e4d4(0x1f5)]=null;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1a5)]=Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x254)],Sprite_Gauge[_0x337b09(0x160)]['currentValue']=function(){const _0x5eca44=_0x337b09;return this['_battler']&&this['_costSettings']?this['currentValueSkillsStatesCore']():VisuMZ[_0x5eca44(0x2c2)][_0x5eca44(0x1a5)][_0x5eca44(0x11b)](this);},Sprite_Gauge[_0x337b09(0x160)]['currentValueSkillsStatesCore']=function(){const _0x562c28=_0x337b09;return this[_0x562c28(0x1f5)][_0x562c28(0x119)][_0x562c28(0x11b)](this[_0x562c28(0x2b9)]);},VisuMZ['SkillsStatesCore'][_0x337b09(0x267)]=Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x374)],Sprite_Gauge['prototype'][_0x337b09(0x374)]=function(){const _0x180e53=_0x337b09;return this[_0x180e53(0x2b9)]&&this['_costSettings']?this[_0x180e53(0x28d)]():VisuMZ[_0x180e53(0x2c2)][_0x180e53(0x267)][_0x180e53(0x11b)](this);},Sprite_Gauge['prototype'][_0x337b09(0x28d)]=function(){const _0x150bf8=_0x337b09;return this[_0x150bf8(0x1f5)][_0x150bf8(0x352)][_0x150bf8(0x11b)](this[_0x150bf8(0x2b9)]);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2ea)]=Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x34f)],Sprite_Gauge[_0x337b09(0x160)]['gaugeRate']=function(){const _0x33201c=_0x337b09,_0x441e71=VisuMZ[_0x33201c(0x2c2)]['Sprite_Gauge_gaugeRate'][_0x33201c(0x11b)](this);return _0x441e71[_0x33201c(0xe5)](0x0,0x1);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1f3)]=Sprite_Gauge['prototype'][_0x337b09(0x2b4)],Sprite_Gauge[_0x337b09(0x160)]['redraw']=function(){const _0x2c1331=_0x337b09;this[_0x2c1331(0x2b9)]&&this['_costSettings']?(this[_0x2c1331(0x221)]['clear'](),this[_0x2c1331(0x183)]()):VisuMZ[_0x2c1331(0x2c2)][_0x2c1331(0x1f3)][_0x2c1331(0x11b)](this);},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x1db)]=function(){const _0x505fbf=_0x337b09;let _0x4d40b3=this[_0x505fbf(0x254)]();return Imported[_0x505fbf(0x180)]&&this['useDigitGrouping']()&&(_0x4d40b3=VisuMZ[_0x505fbf(0x2f7)](_0x4d40b3)),_0x4d40b3;},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x183)]=function(){const _0x27dc48=_0x337b09;this[_0x27dc48(0x221)]['clear'](),this[_0x27dc48(0x1f5)][_0x27dc48(0x287)][_0x27dc48(0x11b)](this);},Sprite_Gauge['prototype'][_0x337b09(0x342)]=function(_0x1f0544,_0x343764,_0x2bbd2b,_0x1f11cb,_0x42297d,_0x2e1553){const _0x121815=_0x337b09,_0x2640fa=this[_0x121815(0x34f)](),_0x2e8b76=Math[_0x121815(0x1da)]((_0x42297d-0x2)*_0x2640fa),_0x533ff8=_0x2e1553-0x2,_0x1fd2ba=this[_0x121815(0x16e)]();this[_0x121815(0x221)][_0x121815(0xd4)](_0x2bbd2b,_0x1f11cb,_0x42297d,_0x2e1553,_0x1fd2ba),this[_0x121815(0x221)][_0x121815(0x14f)](_0x2bbd2b+0x1,_0x1f11cb+0x1,_0x2e8b76,_0x533ff8,_0x1f0544,_0x343764);},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x341)]=function(){const _0x26d86a=_0x337b09,_0x4733c3=VisuMZ[_0x26d86a(0x2c2)]['Settings'][_0x26d86a(0x238)];return _0x4733c3[_0x26d86a(0x355)]==='number'?$gameSystem[_0x26d86a(0x370)]():$gameSystem[_0x26d86a(0x1d0)]();},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x190)]=function(){const _0x6c30e4=_0x337b09,_0x2286bf=VisuMZ[_0x6c30e4(0x2c2)]['Settings'][_0x6c30e4(0x238)];return _0x2286bf['LabelFontMainType']===_0x6c30e4(0x2ef)?$gameSystem[_0x6c30e4(0xeb)]()-0x6:$gameSystem[_0x6c30e4(0xeb)]()-0x2;},Sprite_Gauge[_0x337b09(0x160)]['valueFontFace']=function(){const _0x3a3298=_0x337b09,_0x1e39f1=VisuMZ[_0x3a3298(0x2c2)][_0x3a3298(0x34c)][_0x3a3298(0x238)];return _0x1e39f1[_0x3a3298(0x1e6)]==='number'?$gameSystem[_0x3a3298(0x370)]():$gameSystem[_0x3a3298(0x1d0)]();},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x110)]=function(){const _0x841d86=_0x337b09,_0x5cd324=VisuMZ[_0x841d86(0x2c2)][_0x841d86(0x34c)][_0x841d86(0x238)];return _0x5cd324[_0x841d86(0x1e6)]===_0x841d86(0x2ef)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x841d86(0xeb)]()-0x2;},Sprite_Gauge[_0x337b09(0x160)]['labelColor']=function(){const _0x1aeb97=_0x337b09,_0x3ecbf1=VisuMZ[_0x1aeb97(0x2c2)][_0x1aeb97(0x34c)]['Gauge'];if(_0x3ecbf1['MatchLabelColor']){if(_0x3ecbf1[_0x1aeb97(0x25c)]===0x1)return this['gaugeColor1']();else{if(_0x3ecbf1[_0x1aeb97(0x25c)]===0x2)return this[_0x1aeb97(0x320)]();}}const _0x2e1ec1=_0x3ecbf1['PresetLabelGaugeColor'];return ColorManager[_0x1aeb97(0x275)](_0x2e1ec1);},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x359)]=function(){const _0xe0c8c3=_0x337b09,_0x1654a3=VisuMZ[_0xe0c8c3(0x2c2)][_0xe0c8c3(0x34c)][_0xe0c8c3(0x238)];if(this[_0xe0c8c3(0x1ef)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x1654a3[_0xe0c8c3(0x2e9)]?'rgba(0,\x200,\x200,\x201)':ColorManager['outlineColor']();},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x1ef)]=function(){const _0x2d2107=_0x337b09;return VisuMZ[_0x2d2107(0x2c2)][_0x2d2107(0x34c)][_0x2d2107(0x238)][_0x2d2107(0x2df)]||0x0;},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x2a3)]=function(){const _0x26cebd=_0x337b09,_0x3de3a1=VisuMZ['SkillsStatesCore']['Settings']['Gauge'];if(this[_0x26cebd(0x2f8)]()<=0x0)return _0x26cebd(0x1be);else return _0x3de3a1[_0x26cebd(0x211)]?_0x26cebd(0x2b0):ColorManager[_0x26cebd(0xfb)]();},Sprite_Gauge[_0x337b09(0x160)][_0x337b09(0x2f8)]=function(){const _0x297ca4=_0x337b09;return VisuMZ[_0x297ca4(0x2c2)][_0x297ca4(0x34c)][_0x297ca4(0x238)][_0x297ca4(0x15a)]||0x0;},VisuMZ[_0x337b09(0x2c2)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x337b09(0x160)]['loadBitmap'],Sprite_StateIcon[_0x337b09(0x160)][_0x337b09(0x365)]=function(){const _0x56e1da=_0x337b09;VisuMZ[_0x56e1da(0x2c2)][_0x56e1da(0x257)][_0x56e1da(0x11b)](this),this[_0x56e1da(0x21c)]();},Sprite_StateIcon['prototype'][_0x337b09(0x21c)]=function(){const _0x3a4848=_0x337b09,_0x275fa8=Window_Base[_0x3a4848(0x160)][_0x3a4848(0x166)]();this[_0x3a4848(0x2ec)]=new Sprite(),this[_0x3a4848(0x2ec)][_0x3a4848(0x221)]=new Bitmap(ImageManager[_0x3a4848(0x1e4)],_0x275fa8),this[_0x3a4848(0x2ec)][_0x3a4848(0x2ed)]['x']=this[_0x3a4848(0x2ed)]['x'],this[_0x3a4848(0x2ec)][_0x3a4848(0x2ed)]['y']=this['anchor']['y'],this[_0x3a4848(0x176)](this['_turnDisplaySprite']),this[_0x3a4848(0x16b)]=this[_0x3a4848(0x2ec)][_0x3a4848(0x221)];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0xff)]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x337b09(0x160)]['updateFrame']=function(){const _0x131d3c=_0x337b09;VisuMZ[_0x131d3c(0x2c2)][_0x131d3c(0xff)]['call'](this),this[_0x131d3c(0x148)]();},Sprite_StateIcon[_0x337b09(0x160)][_0x337b09(0x23d)]=function(_0xa4b5ec,_0x129d28,_0x33e9ae,_0x266471,_0x61ae97){const _0x488aef=_0x337b09;this[_0x488aef(0x16b)][_0x488aef(0x23d)](_0xa4b5ec,_0x129d28,_0x33e9ae,_0x266471,this[_0x488aef(0x16b)][_0x488aef(0x21a)],_0x61ae97);},Sprite_StateIcon['prototype'][_0x337b09(0x148)]=function(){const _0x285ccb=_0x337b09;this[_0x285ccb(0x1b1)](),this[_0x285ccb(0x16b)][_0x285ccb(0x288)]();const _0x1f6aff=this['_battler'];if(!_0x1f6aff)return;const _0x549dd5=_0x1f6aff[_0x285ccb(0x263)]()['filter'](_0x308333=>_0x308333['iconIndex']>0x0),_0x57de86=[...Array(0x8)[_0x285ccb(0x105)]()][_0x285ccb(0x29e)](_0x3c232b=>_0x1f6aff[_0x285ccb(0x258)](_0x3c232b)!==0x0),_0xebdd3c=this[_0x285ccb(0x27a)],_0x4e1b1d=_0x549dd5[_0xebdd3c];if(_0x4e1b1d)Window_Base[_0x285ccb(0x160)]['drawActorStateTurns'][_0x285ccb(0x11b)](this,_0x1f6aff,_0x4e1b1d,0x0,0x0),Window_Base['prototype'][_0x285ccb(0x27b)][_0x285ccb(0x11b)](this,_0x1f6aff,_0x4e1b1d,0x0,0x0);else{const _0x1ecd09=_0x57de86[_0xebdd3c-_0x549dd5[_0x285ccb(0x324)]];if(_0x1ecd09===undefined)return;Window_Base[_0x285ccb(0x160)][_0x285ccb(0x145)]['call'](this,_0x1f6aff,_0x1ecd09,0x0,0x0),Window_Base['prototype']['drawActorBuffRates'][_0x285ccb(0x11b)](this,_0x1f6aff,_0x1ecd09,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x337b09(0x1b1)]=function(){const _0x240f77=_0x337b09;this[_0x240f77(0x16b)][_0x240f77(0x11c)]=$gameSystem[_0x240f77(0x1d0)](),this[_0x240f77(0x16b)][_0x240f77(0xc8)]=$gameSystem[_0x240f77(0xeb)](),this[_0x240f77(0x248)]();},Sprite_StateIcon[_0x337b09(0x160)][_0x337b09(0x248)]=function(){const _0x3ad4bf=_0x337b09;this['changeTextColor'](ColorManager['normalColor']()),this[_0x3ad4bf(0x245)](ColorManager[_0x3ad4bf(0xfb)]());},Sprite_StateIcon[_0x337b09(0x160)][_0x337b09(0x30d)]=function(_0x5c4739){const _0x49ec25=_0x337b09;this['contents'][_0x49ec25(0xe0)]=_0x5c4739;},Sprite_StateIcon[_0x337b09(0x160)][_0x337b09(0x245)]=function(_0x5c51cd){const _0x20a3c2=_0x337b09;this[_0x20a3c2(0x16b)][_0x20a3c2(0xfb)]=_0x5c51cd;},Sprite_StateIcon[_0x337b09(0x160)]['hide']=function(){const _0x3d5aa5=_0x337b09;this[_0x3d5aa5(0x285)]=!![],this[_0x3d5aa5(0x363)]();},Window_Base['prototype'][_0x337b09(0x23e)]=function(_0x3c4276,_0x534e05,_0x3427c7,_0x3ae8cc,_0x73db7c){const _0xedf6b2=_0x337b09,_0x24f464=this[_0xedf6b2(0x247)](_0x3c4276,_0x534e05),_0xedc6bf=this['textSizeEx'](_0x24f464,_0x3427c7,_0x3ae8cc,_0x73db7c),_0x47c457=_0x3427c7+_0x73db7c-_0xedc6bf[_0xedf6b2(0x281)];this['drawTextEx'](_0x24f464,_0x47c457,_0x3ae8cc,_0x73db7c),this[_0xedf6b2(0x1b1)]();},Window_Base[_0x337b09(0x160)]['createAllSkillCostText']=function(_0x53a77e,_0x3718c8){const _0x5ef132=_0x337b09;let _0xad3eb2='';for(settings of VisuMZ[_0x5ef132(0x2c2)]['Settings'][_0x5ef132(0x1cc)]){if(!this['isSkillCostShown'](_0x53a77e,_0x3718c8,settings))continue;if(_0xad3eb2[_0x5ef132(0x324)]>0x0)_0xad3eb2+=this[_0x5ef132(0x32b)]();_0xad3eb2+=this[_0x5ef132(0x220)](_0x53a77e,_0x3718c8,settings);}_0xad3eb2=this[_0x5ef132(0xca)](_0x53a77e,_0x3718c8,_0xad3eb2);if(_0x3718c8['note'][_0x5ef132(0x2c1)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0xad3eb2['length']>0x0)_0xad3eb2+=this[_0x5ef132(0x32b)]();_0xad3eb2+=String(RegExp['$1']);}return _0xad3eb2;},Window_Base[_0x337b09(0x160)][_0x337b09(0xca)]=function(_0x53657c,_0x212f7c,_0x262ee0){return _0x262ee0;},Window_Base[_0x337b09(0x160)][_0x337b09(0x157)]=function(_0x192133,_0x43f762,_0xf25de){const _0x293402=_0x337b09;let _0x284cb3=_0xf25de[_0x293402(0x283)][_0x293402(0x11b)](_0x192133,_0x43f762);return _0x284cb3=_0x192133['adjustSkillCost'](_0x43f762,_0x284cb3,_0xf25de),_0xf25de[_0x293402(0x121)]['call'](_0x192133,_0x43f762,_0x284cb3,_0xf25de);},Window_Base[_0x337b09(0x160)][_0x337b09(0x220)]=function(_0x57d322,_0x3fe3fb,_0x4812e6){const _0x582c59=_0x337b09;let _0x7f8ae4=_0x4812e6[_0x582c59(0x283)]['call'](_0x57d322,_0x3fe3fb);return _0x7f8ae4=_0x57d322[_0x582c59(0x2bd)](_0x3fe3fb,_0x7f8ae4,_0x4812e6),_0x4812e6[_0x582c59(0x114)][_0x582c59(0x11b)](_0x57d322,_0x3fe3fb,_0x7f8ae4,_0x4812e6);},Window_Base[_0x337b09(0x160)][_0x337b09(0x32b)]=function(){return'\x20';},Window_Base[_0x337b09(0x160)][_0x337b09(0x36c)]=function(_0x5a9927,_0x1c6fe8,_0x608cc6,_0x13fcf8){const _0x540fb1=_0x337b09;if(!_0x5a9927)return;VisuMZ[_0x540fb1(0x2c2)][_0x540fb1(0x357)][_0x540fb1(0x11b)](this,_0x5a9927,_0x1c6fe8,_0x608cc6,_0x13fcf8),this[_0x540fb1(0x1bd)](_0x5a9927,_0x1c6fe8,_0x608cc6,_0x13fcf8);},Window_Base[_0x337b09(0x160)][_0x337b09(0x1bd)]=function(_0x5b5471,_0x2669f4,_0x1342dc,_0x16b582){const _0x2b0a9a=_0x337b09;_0x16b582=_0x16b582||0x90;const _0x47b0eb=ImageManager['iconWidth'],_0x2f5657=_0x5b5471[_0x2b0a9a(0x34a)]()['slice'](0x0,Math[_0x2b0a9a(0x1da)](_0x16b582/_0x47b0eb)),_0x30e6a1=_0x5b5471[_0x2b0a9a(0x263)]()[_0x2b0a9a(0x29e)](_0x132d33=>_0x132d33[_0x2b0a9a(0xfa)]>0x0),_0x470d2a=[...Array(0x8)[_0x2b0a9a(0x105)]()][_0x2b0a9a(0x29e)](_0x49db83=>_0x5b5471[_0x2b0a9a(0x258)](_0x49db83)!==0x0),_0x2c9aa4=[];let _0x165acb=_0x2669f4;for(let _0x1c3416=0x0;_0x1c3416<_0x2f5657['length'];_0x1c3416++){this[_0x2b0a9a(0x1b1)]();const _0x45fb80=_0x30e6a1[_0x1c3416];if(_0x45fb80)!_0x2c9aa4['includes'](_0x45fb80)&&this[_0x2b0a9a(0x2e5)](_0x5b5471,_0x45fb80,_0x165acb,_0x1342dc),this[_0x2b0a9a(0x27b)](_0x5b5471,_0x45fb80,_0x165acb,_0x1342dc),_0x2c9aa4[_0x2b0a9a(0x2ab)](_0x45fb80);else{const _0x61da5=_0x470d2a[_0x1c3416-_0x30e6a1[_0x2b0a9a(0x324)]];this[_0x2b0a9a(0x145)](_0x5b5471,_0x61da5,_0x165acb,_0x1342dc),this[_0x2b0a9a(0x2b2)](_0x5b5471,_0x61da5,_0x165acb,_0x1342dc);}_0x165acb+=_0x47b0eb;}},Window_Base['prototype'][_0x337b09(0x2e5)]=function(_0x110f53,_0x568c17,_0x34b8d8,_0x55db8d){const _0xab2bef=_0x337b09;if(!VisuMZ[_0xab2bef(0x2c2)][_0xab2bef(0x34c)][_0xab2bef(0x242)][_0xab2bef(0x376)])return;if(!_0x110f53['isStateAffected'](_0x568c17['id']))return;if(_0x568c17[_0xab2bef(0x173)]===0x0)return;if(_0x568c17['note'][_0xab2bef(0x2c1)](/<HIDE STATE TURNS>/i))return;const _0x59d87a=_0x110f53[_0xab2bef(0x128)](_0x568c17['id']),_0x31d44a=ImageManager[_0xab2bef(0x1e4)],_0x2904ec=ColorManager['stateColor'](_0x568c17);this['changeTextColor'](_0x2904ec),this[_0xab2bef(0x245)](_0xab2bef(0x2b0)),this[_0xab2bef(0x16b)][_0xab2bef(0x2f1)]=!![],this[_0xab2bef(0x16b)][_0xab2bef(0xc8)]=VisuMZ['SkillsStatesCore'][_0xab2bef(0x34c)]['States'][_0xab2bef(0xd1)],_0x34b8d8+=VisuMZ[_0xab2bef(0x2c2)][_0xab2bef(0x34c)][_0xab2bef(0x242)][_0xab2bef(0x334)],_0x55db8d+=VisuMZ['SkillsStatesCore'][_0xab2bef(0x34c)][_0xab2bef(0x242)][_0xab2bef(0x27e)],this[_0xab2bef(0x23d)](_0x59d87a,_0x34b8d8,_0x55db8d,_0x31d44a,'right'),this['contents'][_0xab2bef(0x2f1)]=![],this[_0xab2bef(0x1b1)]();},Window_Base['prototype'][_0x337b09(0x27b)]=function(_0x46bb36,_0x4728c1,_0x114bc3,_0x11b82a){const _0x424f81=_0x337b09;if(!VisuMZ[_0x424f81(0x2c2)][_0x424f81(0x34c)][_0x424f81(0x242)][_0x424f81(0x131)])return;const _0x5e6107=ImageManager[_0x424f81(0x1e4)],_0xdd6834=ImageManager[_0x424f81(0x296)]/0x2,_0x5c8f57=ColorManager['normalColor']();this[_0x424f81(0x30d)](_0x5c8f57),this[_0x424f81(0x245)](_0x424f81(0x2b0)),this[_0x424f81(0x16b)][_0x424f81(0x2f1)]=!![],this['contents'][_0x424f81(0xc8)]=VisuMZ[_0x424f81(0x2c2)][_0x424f81(0x34c)][_0x424f81(0x242)][_0x424f81(0x218)],_0x114bc3+=VisuMZ[_0x424f81(0x2c2)][_0x424f81(0x34c)][_0x424f81(0x242)]['DataOffsetX'],_0x11b82a+=VisuMZ['SkillsStatesCore'][_0x424f81(0x34c)][_0x424f81(0x242)][_0x424f81(0x22d)];const _0x1cfb78=String(_0x46bb36[_0x424f81(0x1bf)](_0x4728c1['id']));this[_0x424f81(0x23d)](_0x1cfb78,_0x114bc3,_0x11b82a,_0x5e6107,_0x424f81(0x10c)),this[_0x424f81(0x16b)][_0x424f81(0x2f1)]=![],this[_0x424f81(0x1b1)]();},Window_Base[_0x337b09(0x160)]['drawActorBuffTurns']=function(_0x5746f8,_0x2a2f84,_0x6785d3,_0x5afc0d){const _0x14d34c=_0x337b09;if(!VisuMZ['SkillsStatesCore'][_0x14d34c(0x34c)][_0x14d34c(0x132)][_0x14d34c(0x376)])return;const _0x527cef=_0x5746f8['buff'](_0x2a2f84);if(_0x527cef===0x0)return;const _0xfa9d11=_0x5746f8[_0x14d34c(0x100)](_0x2a2f84),_0x3f2252=ImageManager[_0x14d34c(0x1e4)],_0x226eb0=_0x527cef>0x0?ColorManager[_0x14d34c(0x277)]():ColorManager['debuffColor']();this['changeTextColor'](_0x226eb0),this['changeOutlineColor'](_0x14d34c(0x2b0)),this[_0x14d34c(0x16b)][_0x14d34c(0x2f1)]=!![],this[_0x14d34c(0x16b)][_0x14d34c(0xc8)]=VisuMZ['SkillsStatesCore'][_0x14d34c(0x34c)][_0x14d34c(0x132)][_0x14d34c(0xd1)],_0x6785d3+=VisuMZ['SkillsStatesCore'][_0x14d34c(0x34c)][_0x14d34c(0x132)][_0x14d34c(0x334)],_0x5afc0d+=VisuMZ['SkillsStatesCore']['Settings']['Buffs']['TurnOffsetY'],this[_0x14d34c(0x23d)](_0xfa9d11,_0x6785d3,_0x5afc0d,_0x3f2252,'right'),this[_0x14d34c(0x16b)][_0x14d34c(0x2f1)]=![],this[_0x14d34c(0x1b1)]();},Window_Base[_0x337b09(0x160)][_0x337b09(0x2b2)]=function(_0x4cfc56,_0x257272,_0x39c4b6,_0x26b33b){const _0x330a34=_0x337b09;if(!VisuMZ[_0x330a34(0x2c2)][_0x330a34(0x34c)][_0x330a34(0x132)][_0x330a34(0x131)])return;const _0x509a54=_0x4cfc56[_0x330a34(0x318)](_0x257272),_0x31a983=_0x4cfc56['buff'](_0x257272),_0x3b450d=ImageManager[_0x330a34(0x1e4)],_0x1a670a=ImageManager['iconHeight']/0x2,_0x5e0b88=_0x31a983>0x0?ColorManager[_0x330a34(0x277)]():ColorManager['debuffColor']();this['changeTextColor'](_0x5e0b88),this[_0x330a34(0x245)](_0x330a34(0x2b0)),this[_0x330a34(0x16b)][_0x330a34(0x2f1)]=!![],this[_0x330a34(0x16b)][_0x330a34(0xc8)]=VisuMZ[_0x330a34(0x2c2)][_0x330a34(0x34c)][_0x330a34(0x132)][_0x330a34(0x218)],_0x39c4b6+=VisuMZ[_0x330a34(0x2c2)][_0x330a34(0x34c)]['Buffs'][_0x330a34(0x23b)],_0x26b33b+=VisuMZ[_0x330a34(0x2c2)][_0x330a34(0x34c)][_0x330a34(0x132)][_0x330a34(0x22d)];const _0x3d27b3=_0x330a34(0x2d1)[_0x330a34(0x175)](Math[_0x330a34(0x32c)](_0x509a54*0x64));this[_0x330a34(0x23d)](_0x3d27b3,_0x39c4b6,_0x26b33b,_0x3b450d,'center'),this[_0x330a34(0x16b)]['fontBold']=![],this[_0x330a34(0x1b1)]();},VisuMZ[_0x337b09(0x2c2)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x337b09(0x160)][_0x337b09(0x1dc)],Window_StatusBase[_0x337b09(0x160)][_0x337b09(0x1dc)]=function(_0x3a98f5,_0x4ba989,_0x1cbb70,_0x327c9a){const _0x4d2997=_0x337b09;if(_0x3a98f5[_0x4d2997(0x20d)]())_0x4ba989=this[_0x4d2997(0x2da)](_0x3a98f5,_0x4ba989);this['placeExactGauge'](_0x3a98f5,_0x4ba989,_0x1cbb70,_0x327c9a);},Window_StatusBase[_0x337b09(0x160)][_0x337b09(0x10b)]=function(_0x2f1721,_0x52ff4c,_0x2522b8,_0x1c3db7){const _0x16f6b1=_0x337b09;if([_0x16f6b1(0x323),_0x16f6b1(0x223)][_0x16f6b1(0x1a4)](_0x52ff4c[_0x16f6b1(0x1f2)]()))return;VisuMZ[_0x16f6b1(0x2c2)][_0x16f6b1(0x26a)][_0x16f6b1(0x11b)](this,_0x2f1721,_0x52ff4c,_0x2522b8,_0x1c3db7);},Window_StatusBase[_0x337b09(0x160)][_0x337b09(0x2da)]=function(_0x4023bb,_0x50977d){const _0x29c48b=_0x337b09,_0x2b411f=_0x4023bb['currentClass']()['note'];if(_0x50977d==='hp'&&_0x2b411f[_0x29c48b(0x2c1)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x50977d==='mp'&&_0x2b411f[_0x29c48b(0x2c1)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x50977d==='tp'&&_0x2b411f[_0x29c48b(0x2c1)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x50977d;}},VisuMZ['SkillsStatesCore'][_0x337b09(0x357)]=Window_StatusBase[_0x337b09(0x160)]['drawActorIcons'],Window_StatusBase['prototype']['drawActorIcons']=function(_0x166b79,_0x365874,_0xdd3dc2,_0x3a31ad){const _0x3c38b0=_0x337b09;if(!_0x166b79)return;Window_Base[_0x3c38b0(0x160)][_0x3c38b0(0x36c)]['call'](this,_0x166b79,_0x365874,_0xdd3dc2,_0x3a31ad);},VisuMZ['SkillsStatesCore'][_0x337b09(0x109)]=Window_SkillType[_0x337b09(0x160)][_0x337b09(0xea)],Window_SkillType[_0x337b09(0x160)][_0x337b09(0xea)]=function(_0x13ad87){const _0x377ffd=_0x337b09;VisuMZ[_0x377ffd(0x2c2)][_0x377ffd(0x109)][_0x377ffd(0x11b)](this,_0x13ad87),this[_0x377ffd(0x17f)](_0x13ad87);},Window_SkillType[_0x337b09(0x160)]['createCommandNameWindow']=function(_0x3a77cd){const _0x1a2229=_0x337b09,_0x37ccf0=new Rectangle(0x0,0x0,_0x3a77cd['width'],_0x3a77cd[_0x1a2229(0x21a)]);this[_0x1a2229(0x2b6)]=new Window_Base(_0x37ccf0),this[_0x1a2229(0x2b6)][_0x1a2229(0x10d)]=0x0,this['addChild'](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_SkillType[_0x337b09(0x160)][_0x337b09(0xf1)]=function(){const _0x29392e=_0x337b09;Window_Command[_0x29392e(0x160)]['callUpdateHelp'][_0x29392e(0x11b)](this);if(this[_0x29392e(0x2b6)])this[_0x29392e(0x1e2)]();},Window_SkillType['prototype'][_0x337b09(0x1e2)]=function(){const _0x142df5=_0x337b09,_0x73881f=this['_commandNameWindow'];_0x73881f['contents'][_0x142df5(0x288)]();const _0x2a8889=this['commandStyleCheck'](this[_0x142df5(0x177)]());if(_0x2a8889===_0x142df5(0x174)&&this[_0x142df5(0x1ed)]()>0x0){const _0x2c0d25=this[_0x142df5(0xe3)](this['index']());let _0x59e71a=this['commandName'](this[_0x142df5(0x177)]());_0x59e71a=_0x59e71a[_0x142df5(0x332)](/\\I\[(\d+)\]/gi,''),_0x73881f[_0x142df5(0x1b1)](),this[_0x142df5(0x1e0)](_0x59e71a,_0x2c0d25),this[_0x142df5(0xf7)](_0x59e71a,_0x2c0d25),this[_0x142df5(0x260)](_0x59e71a,_0x2c0d25);}},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x1e0)]=function(_0x5aae41,_0x4ac7df){},Window_SkillType[_0x337b09(0x160)][_0x337b09(0xf7)]=function(_0x1a3b5e,_0x3ca125){const _0x1b744d=_0x337b09,_0x3da5d2=this['_commandNameWindow'];_0x3da5d2[_0x1b744d(0x23d)](_0x1a3b5e,0x0,_0x3ca125['y'],_0x3da5d2[_0x1b744d(0x1f9)],_0x1b744d(0x10c));},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x260)]=function(_0x5bb41e,_0x1c354c){const _0x5185=_0x337b09,_0x46b746=this[_0x5185(0x2b6)],_0x1678e8=$gameSystem['windowPadding'](),_0x5bbf99=_0x1c354c['x']+Math[_0x5185(0x1da)](_0x1c354c[_0x5185(0x281)]/0x2)+_0x1678e8;_0x46b746['x']=_0x46b746[_0x5185(0x281)]/-0x2+_0x5bbf99,_0x46b746['y']=Math[_0x5185(0x1da)](_0x1c354c[_0x5185(0x21a)]/0x2);},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x1eb)]=function(){const _0x1ebc6c=_0x337b09;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x1ebc6c(0x160)][_0x1ebc6c(0x1eb)][_0x1ebc6c(0x11b)](this);},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x2b3)]=function(){const _0x3c8cc2=_0x337b09;if(!this[_0x3c8cc2(0x255)])return;const _0x418cbe=this[_0x3c8cc2(0x255)][_0x3c8cc2(0x22e)]();for(const _0x1a78dd of _0x418cbe){const _0x299d18=this[_0x3c8cc2(0xf8)](_0x1a78dd);this['addCommand'](_0x299d18,_0x3c8cc2(0x2cf),!![],_0x1a78dd);}},Window_SkillType['prototype'][_0x337b09(0xf8)]=function(_0x21023e){const _0x3777b2=_0x337b09;let _0x3bf08d=$dataSystem['skillTypes'][_0x21023e];if(_0x3bf08d[_0x3777b2(0x2c1)](/\\I\[(\d+)\]/i))return _0x3bf08d;if(this[_0x3777b2(0x1cf)]()==='text')return _0x3bf08d;const _0x3123dc=VisuMZ[_0x3777b2(0x2c2)][_0x3777b2(0x34c)][_0x3777b2(0x31d)],_0x3a40da=$dataSystem[_0x3777b2(0x27d)][_0x3777b2(0x1a4)](_0x21023e),_0x2a1a78=_0x3a40da?_0x3123dc['IconStypeMagic']:_0x3123dc[_0x3777b2(0x2a4)];return _0x3777b2(0x375)['format'](_0x2a1a78,_0x3bf08d);},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x1e1)]=function(){const _0x2e2b91=_0x337b09;return VisuMZ['SkillsStatesCore'][_0x2e2b91(0x34c)][_0x2e2b91(0x31d)]['CmdTextAlign'];},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x216)]=function(_0x2e71b5){const _0x349da8=_0x337b09,_0x470eb7=this[_0x349da8(0x2c8)](_0x2e71b5);if(_0x470eb7===_0x349da8(0x367))this['drawItemStyleIconText'](_0x2e71b5);else _0x470eb7==='icon'?this[_0x349da8(0x27f)](_0x2e71b5):Window_Command[_0x349da8(0x160)]['drawItem'][_0x349da8(0x11b)](this,_0x2e71b5);},Window_SkillType['prototype'][_0x337b09(0x1cf)]=function(){const _0x4c32f=_0x337b09;return VisuMZ[_0x4c32f(0x2c2)]['Settings']['Skills']['CmdStyle'];},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x2c8)]=function(_0x3d2523){const _0x44fb10=_0x337b09;if(_0x3d2523<0x0)return'text';const _0x28bd8f=this[_0x44fb10(0x1cf)]();if(_0x28bd8f!==_0x44fb10(0x10a))return _0x28bd8f;else{if(this[_0x44fb10(0x1ed)]()>0x0){const _0x2d802e=this['commandName'](_0x3d2523);if(_0x2d802e['match'](/\\I\[(\d+)\]/i)){const _0x5e6fa7=this[_0x44fb10(0xe3)](_0x3d2523),_0x37fe61=this[_0x44fb10(0x2ff)](_0x2d802e)['width'];return _0x37fe61<=_0x5e6fa7[_0x44fb10(0x281)]?_0x44fb10(0x367):_0x44fb10(0x174);}}}return _0x44fb10(0x1dd);},Window_SkillType['prototype'][_0x337b09(0x24a)]=function(_0x2176fb){const _0x2a2677=_0x337b09,_0x16db06=this[_0x2a2677(0xe3)](_0x2176fb),_0x29178f=this[_0x2a2677(0x13d)](_0x2176fb),_0x401767=this['textSizeEx'](_0x29178f)[_0x2a2677(0x281)];this['changePaintOpacity'](this[_0x2a2677(0x35c)](_0x2176fb));const _0x1f556b=this[_0x2a2677(0x1e1)]();if(_0x1f556b===_0x2a2677(0x239))this[_0x2a2677(0x292)](_0x29178f,_0x16db06['x']+_0x16db06[_0x2a2677(0x281)]-_0x401767,_0x16db06['y'],_0x401767);else{if(_0x1f556b===_0x2a2677(0x10c)){const _0x450573=_0x16db06['x']+Math['floor']((_0x16db06[_0x2a2677(0x281)]-_0x401767)/0x2);this[_0x2a2677(0x292)](_0x29178f,_0x450573,_0x16db06['y'],_0x401767);}else this[_0x2a2677(0x292)](_0x29178f,_0x16db06['x'],_0x16db06['y'],_0x401767);}},Window_SkillType[_0x337b09(0x160)][_0x337b09(0x27f)]=function(_0x4fe414){const _0x3a361a=_0x337b09;this[_0x3a361a(0x13d)](_0x4fe414)[_0x3a361a(0x2c1)](/\\I\[(\d+)\]/i);const _0x2c9adb=Number(RegExp['$1'])||0x0,_0x2ae121=this[_0x3a361a(0xe3)](_0x4fe414),_0xccb067=_0x2ae121['x']+Math[_0x3a361a(0x1da)]((_0x2ae121[_0x3a361a(0x281)]-ImageManager[_0x3a361a(0x1e4)])/0x2),_0x42a0ac=_0x2ae121['y']+(_0x2ae121['height']-ImageManager[_0x3a361a(0x296)])/0x2;this[_0x3a361a(0x2fd)](_0x2c9adb,_0xccb067,_0x42a0ac);},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1fe)]=Window_SkillStatus[_0x337b09(0x160)][_0x337b09(0x34b)],Window_SkillStatus[_0x337b09(0x160)][_0x337b09(0x34b)]=function(){const _0x196837=_0x337b09;VisuMZ[_0x196837(0x2c2)][_0x196837(0x1fe)][_0x196837(0x11b)](this);if(this[_0x196837(0x255)])this[_0x196837(0x1c1)]();},Window_SkillStatus[_0x337b09(0x160)][_0x337b09(0x1c1)]=function(){const _0x2d339c=_0x337b09;if(!Imported[_0x2d339c(0x180)])return;if(!Imported[_0x2d339c(0x169)])return;const _0x168681=this[_0x2d339c(0x2be)]();let _0x41d4f3=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x7e8096=this[_0x2d339c(0x1f9)]-_0x41d4f3-0x2;if(_0x7e8096>=0x12c){const _0x2e52ea=VisuMZ[_0x2d339c(0x138)][_0x2d339c(0x34c)][_0x2d339c(0x124)][_0x2d339c(0x1df)],_0x2ca955=Math['floor'](_0x7e8096/0x2)-0x18;let _0x1d55b2=_0x41d4f3,_0x5ca9c6=Math['floor']((this['innerHeight']-Math[_0x2d339c(0x280)](_0x2e52ea[_0x2d339c(0x324)]/0x2)*_0x168681)/0x2),_0x3dae3d=0x0;for(const _0x5ee91b of _0x2e52ea){this[_0x2d339c(0x1d8)](_0x1d55b2,_0x5ca9c6,_0x2ca955,_0x5ee91b),_0x3dae3d++,_0x3dae3d%0x2===0x0?(_0x1d55b2=_0x41d4f3,_0x5ca9c6+=_0x168681):_0x1d55b2+=_0x2ca955+0x18;}}this[_0x2d339c(0x1b1)]();},Window_SkillStatus[_0x337b09(0x160)]['drawExtendedParameter']=function(_0x3dc513,_0x31c947,_0xfbd15c,_0x3b1d0d){const _0x3a5d02=_0x337b09,_0xccdb8c=this[_0x3a5d02(0x2be)]();this[_0x3a5d02(0x1b1)](),this[_0x3a5d02(0xef)](_0x3dc513,_0x31c947,_0xfbd15c,_0x3b1d0d,!![]),this['resetTextColor'](),this['contents'][_0x3a5d02(0xc8)]-=0x8;const _0x4b30a3=this['_actor']['paramValueByName'](_0x3b1d0d,!![]);this[_0x3a5d02(0x16b)]['drawText'](_0x4b30a3,_0x3dc513,_0x31c947,_0xfbd15c,_0xccdb8c,_0x3a5d02(0x239));},VisuMZ['SkillsStatesCore'][_0x337b09(0x1c5)]=Window_SkillList[_0x337b09(0x160)]['includes'],Window_SkillList[_0x337b09(0x160)][_0x337b09(0x1a4)]=function(_0x4e14b2){return this['includesSkillsStatesCore'](_0x4e14b2);},VisuMZ[_0x337b09(0x2c2)]['Window_SkillList_maxCols']=Window_SkillList['prototype'][_0x337b09(0x20a)],Window_SkillList['prototype'][_0x337b09(0x20a)]=function(){const _0x2bab11=_0x337b09;return SceneManager['_scene'][_0x2bab11(0x16d)]===Scene_Battle?VisuMZ[_0x2bab11(0x2c2)][_0x2bab11(0xd7)][_0x2bab11(0x11b)](this):VisuMZ[_0x2bab11(0x2c2)]['Settings'][_0x2bab11(0x31d)][_0x2bab11(0x140)];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x230)]=Window_SkillList[_0x337b09(0x160)][_0x337b09(0xd2)],Window_SkillList['prototype'][_0x337b09(0xd2)]=function(_0x2f5e3a){const _0x5d4c04=_0x337b09,_0x56e042=this[_0x5d4c04(0x255)]!==_0x2f5e3a;VisuMZ['SkillsStatesCore'][_0x5d4c04(0x230)][_0x5d4c04(0x11b)](this,_0x2f5e3a),_0x56e042&&(this[_0x5d4c04(0x2ee)]&&this[_0x5d4c04(0x2ee)][_0x5d4c04(0x16d)]===Window_ShopStatus&&this['_statusWindow'][_0x5d4c04(0x26f)](this['itemAt'](0x0)));},Window_SkillList[_0x337b09(0x160)]['setStypeId']=function(_0x5120ff){const _0x2af086=_0x337b09;if(this[_0x2af086(0x279)]===_0x5120ff)return;this[_0x2af086(0x279)]=_0x5120ff,this[_0x2af086(0x34b)](),this['scrollTo'](0x0,0x0),this[_0x2af086(0x2ee)]&&this['_statusWindow'][_0x2af086(0x16d)]===Window_ShopStatus&&this[_0x2af086(0x2ee)]['setItem'](this[_0x2af086(0x225)](0x0));},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x1ab)]=function(_0x3b7d21){const _0x3cc9fc=_0x337b09;if(!_0x3b7d21)return VisuMZ[_0x3cc9fc(0x2c2)][_0x3cc9fc(0x1c5)][_0x3cc9fc(0x11b)](this,_0x3b7d21);if(!this[_0x3cc9fc(0x298)](_0x3b7d21))return![];if(!this[_0x3cc9fc(0x11a)](_0x3b7d21))return![];if(!this[_0x3cc9fc(0x348)](_0x3b7d21))return![];return!![];},Window_SkillList[_0x337b09(0x160)]['checkSkillTypeMatch']=function(_0x3b9bb6){const _0x48bae0=_0x337b09;return DataManager[_0x48bae0(0x1d2)](_0x3b9bb6)[_0x48bae0(0x1a4)](this[_0x48bae0(0x279)]);},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x11a)]=function(_0x5a326d){const _0x72beae=_0x337b09;if(!VisuMZ[_0x72beae(0x2c2)][_0x72beae(0x333)](this['_actor'],_0x5a326d))return![];if(!VisuMZ[_0x72beae(0x2c2)]['CheckVisibleSwitchNotetags'](this[_0x72beae(0x255)],_0x5a326d))return![];if(!VisuMZ['SkillsStatesCore'][_0x72beae(0x204)](this[_0x72beae(0x255)],_0x5a326d))return![];return!![];},VisuMZ[_0x337b09(0x2c2)]['CheckVisibleBattleNotetags']=function(_0x3ddea5,_0x1471e9){const _0x531497=_0x337b09,_0x463488=_0x1471e9[_0x531497(0x127)];if(_0x463488[_0x531497(0x2c1)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x531497(0x2bb)]())return![];else return _0x463488[_0x531497(0x2c1)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ['SkillsStatesCore'][_0x337b09(0x297)]=function(_0x4b6894,_0x2df7b4){const _0x323560=_0x337b09,_0xee2103=_0x2df7b4[_0x323560(0x127)];if(_0xee2103[_0x323560(0x2c1)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4194a4=JSON[_0x323560(0x36d)]('['+RegExp['$1'][_0x323560(0x2c1)](/\d+/g)+']');for(const _0x40aade of _0x4194a4){if(!$gameSwitches[_0x323560(0x18c)](_0x40aade))return![];}return!![];}if(_0xee2103[_0x323560(0x2c1)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f439f=JSON[_0x323560(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x612222 of _0x5f439f){if(!$gameSwitches[_0x323560(0x18c)](_0x612222))return![];}return!![];}if(_0xee2103[_0x323560(0x2c1)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33e7bb=JSON[_0x323560(0x36d)]('['+RegExp['$1'][_0x323560(0x2c1)](/\d+/g)+']');for(const _0x256c04 of _0x33e7bb){if($gameSwitches[_0x323560(0x18c)](_0x256c04))return!![];}return![];}if(_0xee2103[_0x323560(0x2c1)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6b5930=JSON[_0x323560(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x23e6e6 of _0x6b5930){if(!$gameSwitches[_0x323560(0x18c)](_0x23e6e6))return!![];}return![];}if(_0xee2103['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xabe6a0=JSON['parse']('['+RegExp['$1'][_0x323560(0x2c1)](/\d+/g)+']');for(const _0x5a8527 of _0xabe6a0){if(!$gameSwitches[_0x323560(0x18c)](_0x5a8527))return!![];}return![];}if(_0xee2103['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27cf59=JSON[_0x323560(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16f924 of _0x27cf59){if($gameSwitches[_0x323560(0x18c)](_0x16f924))return![];}return!![];}return!![];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x204)]=function(_0x4e694a,_0x108279){const _0x406c9a=_0x337b09,_0x18137d=_0x108279[_0x406c9a(0x127)];if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8a82be=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x3cd60c of _0x8a82be){if(!_0x4e694a[_0x406c9a(0x203)](_0x3cd60c))return![];}return!![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x587a45=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x47ccd0 of _0x587a45){const _0x2bcdab=DataManager['getSkillIdWithName'](_0x47ccd0);if(!_0x2bcdab)continue;if(!_0x4e694a['isLearnedSkill'](_0x2bcdab))return![];}return!![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26d43f=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x135e34 of _0x26d43f){if(!_0x4e694a[_0x406c9a(0x203)](_0x135e34))return![];}return!![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xd43b29=RegExp['$1']['split'](',');for(const _0x23cd3c of _0xd43b29){const _0x13dcdc=DataManager[_0x406c9a(0x13f)](_0x23cd3c);if(!_0x13dcdc)continue;if(!_0x4e694a[_0x406c9a(0x203)](_0x13dcdc))return![];}return!![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x220a6e=JSON['parse']('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x573467 of _0x220a6e){if(_0x4e694a[_0x406c9a(0x203)](_0x573467))return!![];}return![];}else{if(_0x18137d['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2d6859=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x3d51b7 of _0x2d6859){const _0x680604=DataManager[_0x406c9a(0x13f)](_0x3d51b7);if(!_0x680604)continue;if(_0x4e694a[_0x406c9a(0x203)](_0x680604))return!![];}return![];}}if(_0x18137d['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bf5da=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x3565db of _0x3bf5da){if(!_0x4e694a[_0x406c9a(0x203)](_0x3565db))return!![];}return![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2960c6=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x1ea6e1 of _0x2960c6){const _0x40b7da=DataManager[_0x406c9a(0x13f)](_0x1ea6e1);if(!_0x40b7da)continue;if(!_0x4e694a[_0x406c9a(0x203)](_0x40b7da))return!![];}return![];}}if(_0x18137d['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5052b3=JSON['parse']('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x52abc1 of _0x5052b3){if(!_0x4e694a[_0x406c9a(0x203)](_0x52abc1))return!![];}return![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x335bab=RegExp['$1']['split'](',');for(const _0xc5ae1b of _0x335bab){const _0x2177e2=DataManager[_0x406c9a(0x13f)](_0xc5ae1b);if(!_0x2177e2)continue;if(!_0x4e694a['isLearnedSkill'](_0x2177e2))return!![];}return![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34a850=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x5a62cb of _0x34a850){if(_0x4e694a[_0x406c9a(0x203)](_0x5a62cb))return![];}return!![];}else{if(_0x18137d['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4733df=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x2cf28b of _0x4733df){const _0x19d728=DataManager[_0x406c9a(0x13f)](_0x2cf28b);if(!_0x19d728)continue;if(_0x4e694a[_0x406c9a(0x203)](_0x19d728))return![];}return!![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5adcb2=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0xdcd374 of _0x5adcb2){if(!_0x4e694a[_0x406c9a(0x270)](_0xdcd374))return![];}return!![];}else{if(_0x18137d['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x241a8e=RegExp['$1']['split'](',');for(const _0x2a36d8 of _0x241a8e){const _0x3ca82f=DataManager[_0x406c9a(0x13f)](_0x2a36d8);if(!_0x3ca82f)continue;if(!_0x4e694a[_0x406c9a(0x270)](_0x3ca82f))return![];}return!![];}}if(_0x18137d['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x269acf=JSON['parse']('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x3de931 of _0x269acf){if(!_0x4e694a['hasSkill'](_0x3de931))return![];}return!![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e9185=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x5609be of _0x1e9185){const _0x16ebb8=DataManager[_0x406c9a(0x13f)](_0x5609be);if(!_0x16ebb8)continue;if(!_0x4e694a['hasSkill'](_0x16ebb8))return![];}return!![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36b16e=JSON[_0x406c9a(0x36d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x20486c of _0x36b16e){if(_0x4e694a[_0x406c9a(0x270)](_0x20486c))return!![];}return![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x380e0f=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x2bb750 of _0x380e0f){const _0xc88f4a=DataManager['getSkillIdWithName'](_0x2bb750);if(!_0xc88f4a)continue;if(_0x4e694a[_0x406c9a(0x270)](_0xc88f4a))return!![];}return![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x339d55=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x443b27 of _0x339d55){if(!_0x4e694a['hasSkill'](_0x443b27))return!![];}return![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4286ad=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x25896c of _0x4286ad){const _0x44031f=DataManager[_0x406c9a(0x13f)](_0x25896c);if(!_0x44031f)continue;if(!_0x4e694a[_0x406c9a(0x270)](_0x44031f))return!![];}return![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c5588=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x4a5932 of _0x5c5588){if(!_0x4e694a['hasSkill'](_0x4a5932))return!![];}return![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xbe13b2=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x2bcc26 of _0xbe13b2){const _0x511c06=DataManager[_0x406c9a(0x13f)](_0x2bcc26);if(!_0x511c06)continue;if(!_0x4e694a[_0x406c9a(0x270)](_0x511c06))return!![];}return![];}}if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49c03d=JSON[_0x406c9a(0x36d)]('['+RegExp['$1'][_0x406c9a(0x2c1)](/\d+/g)+']');for(const _0x374cbf of _0x49c03d){if(_0x4e694a[_0x406c9a(0x270)](_0x374cbf))return![];}return!![];}else{if(_0x18137d[_0x406c9a(0x2c1)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x513d91=RegExp['$1'][_0x406c9a(0x26e)](',');for(const _0x189a84 of _0x513d91){const _0x3fb12f=DataManager[_0x406c9a(0x13f)](_0x189a84);if(!_0x3fb12f)continue;if(_0x4e694a[_0x406c9a(0x270)](_0x3fb12f))return![];}return!![];}}return!![];},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x348)]=function(_0x3e7f7c){const _0x58091b=_0x337b09,_0x3cf934=_0x3e7f7c[_0x58091b(0x127)],_0x10a2af=VisuMZ[_0x58091b(0x2c2)][_0x58091b(0x310)];return _0x10a2af[_0x3e7f7c['id']]?_0x10a2af[_0x3e7f7c['id']][_0x58091b(0x11b)](this,_0x3e7f7c):!![];},VisuMZ[_0x337b09(0x2c2)]['Window_SkillList_makeItemList']=Window_SkillList[_0x337b09(0x160)][_0x337b09(0x266)],Window_SkillList[_0x337b09(0x160)][_0x337b09(0x266)]=function(){const _0x39ad5d=_0x337b09;VisuMZ['SkillsStatesCore']['Window_SkillList_makeItemList'][_0x39ad5d(0x11b)](this),this[_0x39ad5d(0x222)]()&&this[_0x39ad5d(0x2e6)](),this[_0x39ad5d(0x1b7)]()&&this['changeSkillsThroughStateEffects']();},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x222)]=function(){return!![];},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x2e6)]=function(){const _0x10d915=_0x337b09,_0x572bda=VisuMZ[_0x10d915(0x2c2)][_0x10d915(0x34c)][_0x10d915(0x31d)][_0x10d915(0x35d)]||[];return _0x572bda&&_0x572bda[_0x10d915(0x1a4)](this[_0x10d915(0x279)])?this[_0x10d915(0x2bf)][_0x10d915(0x1d9)]((_0x4f0f52,_0x390f5f)=>{const _0x116c62=_0x10d915;if(!!_0x4f0f52&&!!_0x390f5f)return _0x4f0f52[_0x116c62(0x1a6)][_0x116c62(0x147)](_0x390f5f['name']);return 0x0;}):VisuMZ[_0x10d915(0x2c2)]['SortByIDandPriority'](this['_data']),this[_0x10d915(0x2bf)];},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x2eb)]=function(_0x89e7a3){const _0x3011fa=_0x337b09;return _0x89e7a3[_0x3011fa(0x1d9)]((_0x475438,_0x32a77f)=>{const _0x1e7ec0=_0x3011fa;if(!!_0x475438&&!!_0x32a77f){if(_0x475438['sortPriority']===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x475438);if(_0x32a77f['sortPriority']===undefined)VisuMZ[_0x1e7ec0(0x2c2)][_0x1e7ec0(0xe6)](_0x32a77f);const _0x52fc50=_0x475438[_0x1e7ec0(0x330)],_0x9c7a6=_0x32a77f['sortPriority'];if(_0x52fc50!==_0x9c7a6)return _0x9c7a6-_0x52fc50;return _0x475438['id']-_0x32a77f['id'];}return 0x0;}),_0x89e7a3;},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x1fd)]=function(_0x1b7d8b){const _0x1fdc35=_0x337b09;return _0x1b7d8b[_0x1fdc35(0x1d9)]((_0x1e7008,_0x4de04d)=>{const _0x145313=_0x1fdc35,_0x25f795=$dataSkills[_0x1e7008],_0x4113e6=$dataSkills[_0x4de04d];if(!!_0x25f795&&!!_0x4113e6){if(_0x25f795[_0x145313(0x330)]===undefined)VisuMZ[_0x145313(0x2c2)]['Parse_Notetags_Skill_Sorting'](_0x25f795);if(_0x4113e6[_0x145313(0x330)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x4113e6);const _0x1717fd=_0x25f795['sortPriority'],_0x26d6ad=_0x4113e6[_0x145313(0x330)];if(_0x1717fd!==_0x26d6ad)return _0x26d6ad-_0x1717fd;return _0x1e7008-_0x4de04d;}return 0x0;}),_0x1b7d8b;},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x1b7)]=function(){const _0xcd50b9=_0x337b09;if(!this['_actor'])return![];if([_0xcd50b9(0x2c9),_0xcd50b9(0xf9),'equipPassives'][_0xcd50b9(0x1a4)](this[_0xcd50b9(0x279)]))return![];return!![];},Window_SkillList[_0x337b09(0x160)][_0x337b09(0xe8)]=function(){const _0x1b596c=_0x337b09,_0xd78c58=this[_0x1b596c(0x255)][_0x1b596c(0x263)]();for(const _0x167eb8 of _0xd78c58){const _0x3dd770=DataManager[_0x1b596c(0x293)](_0x167eb8);for(const _0x48538c in _0x3dd770){const _0x4df071=$dataSkills[Number(_0x48538c)]||null,_0x35d08f=$dataSkills[Number(_0x3dd770[_0x48538c])]||null;while(this[_0x1b596c(0x2bf)][_0x1b596c(0x1a4)](_0x4df071)){const _0x12174b=this[_0x1b596c(0x2bf)][_0x1b596c(0x2d9)](_0x4df071);this[_0x1b596c(0x2bf)][_0x12174b]=_0x35d08f;}}}},VisuMZ[_0x337b09(0x2c2)]['Window_SkillList_drawItem']=Window_SkillList['prototype'][_0x337b09(0x216)],Window_SkillList['prototype'][_0x337b09(0x216)]=function(_0xb72069){const _0x4dc0a7=_0x337b09,_0x41c7be=this[_0x4dc0a7(0x225)](_0xb72069),_0x589954=_0x41c7be?_0x41c7be[_0x4dc0a7(0x1a6)]:'';if(_0x41c7be)this[_0x4dc0a7(0x234)](_0x41c7be);VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem'][_0x4dc0a7(0x11b)](this,_0xb72069);if(_0x41c7be)_0x41c7be['name']=_0x589954;},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x234)]=function(_0x4fca0f){const _0x3709b5=_0x337b09;if(_0x4fca0f&&_0x4fca0f[_0x3709b5(0x127)][_0x3709b5(0x2c1)](/<LIST NAME:[ ](.*)>/i)){_0x4fca0f['name']=String(RegExp['$1'])[_0x3709b5(0xfe)]();for(;;){if(_0x4fca0f[_0x3709b5(0x1a6)][_0x3709b5(0x2c1)](/\\V\[(\d+)\]/gi))_0x4fca0f[_0x3709b5(0x1a6)]=_0x4fca0f[_0x3709b5(0x1a6)][_0x3709b5(0x332)](/\\V\[(\d+)\]/gi,(_0x332fe8,_0x186a35)=>$gameVariables['value'](parseInt(_0x186a35)));else break;}}},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x23e)]=function(_0x71bfa4,_0x529ccd,_0xaba810,_0x5a5269){const _0x4a65ab=_0x337b09;Window_Base['prototype'][_0x4a65ab(0x23e)][_0x4a65ab(0x11b)](this,this['_actor'],_0x71bfa4,_0x529ccd,_0xaba810,_0x5a5269);},Window_SkillList[_0x337b09(0x160)][_0x337b09(0x19e)]=function(_0x44dd07){const _0x284d8a=_0x337b09;this[_0x284d8a(0x2ee)]=_0x44dd07,this['callUpdateHelp']();},VisuMZ[_0x337b09(0x2c2)][_0x337b09(0x106)]=Window_SkillList['prototype'][_0x337b09(0x24b)],Window_SkillList[_0x337b09(0x160)][_0x337b09(0x24b)]=function(){const _0xa20c04=_0x337b09;VisuMZ['SkillsStatesCore'][_0xa20c04(0x106)]['call'](this),this[_0xa20c04(0x2ee)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0xa20c04(0x2ee)][_0xa20c04(0x26f)](this[_0xa20c04(0x16a)]());};