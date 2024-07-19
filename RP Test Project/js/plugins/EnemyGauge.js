// EnemyGauge.js Ver.3.0.3

/*:
* @target MZ
* @plugindesc Displays the enemy's HP gauge at specific times.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/486325593.html
* @help Ver.3.0.3
* By default, the gauge is displayed when an enemy is selected,
* when HP changes, when damage occurs, and when a state is added.
*
* @param chaseEnemy
* @text Chase Enemy
* @desc Chasing enemies moving from their home position.
* @type boolean
* @default false
*
* @param gaugeStyle
* @text Gauge Style
* @desc Change the display style.
* @type select
* @default default1
* @option Default
* @value default1
* @option Also Battle Start
* @value default2
* @option Always
* @value always
*
* @param displayTiming
* @text Display Timing
* @desc Display timing of gauges and icons.
* This parameter is valid only if Icon Format is "synch".
* @type select
* @default affectedStatus
* @option When Damaged
* @value damaged
* @option When Affected Status
* @value affectedStatus
*
* @param iconStyle
* @text Icon Style
* @desc Displays state icons above gauges.
* @type select
* @default sync
* @option MZ Default
* @value false
* @option Sync to Gauge
* @value sync
* @option Always
* @value always
*
* @param gaugePosition
* @text Gauge Position
* @desc Specifies the origin.
* @type select
* @default center
* @option Center of Enemy
* @value center
* @option Bottom of Enemy
* @value bottom
* @option Top of Enemy
* @value top
*
* @param gaugeOffsetY
* @text Gauge Offset Y
* @desc Shift the position by the specified number.
* @type number
* @min -999999
* @default 80
*
* @param iconOffsetY
* @text Icon Offset Y
* @desc Offsets the icon from the gauge by the specified number.
* @type number
* @min -999999
* @default 0
*
* @param gaugeWidth
* @text Gauge Width
* @type number
* @default 128
*
* @param gaugeHeight
* @text Gauge Height
* @type number
* @default 8
*
* @param lineWidth
* @text Line Width
* @desc The thickness of the line used for the gauge.
* Depending on the height of the gauge, it will not draw correctly.
* @type number
* @default 1
*
* @param waitDuration
* @text Wait Duration
* @desc It is the time from when the gauge moves until it disappears.
* @type number
* @default 128
*
* @param fadeDuration
* @text Fade Duration
* @desc Specifies how long the fadeout should occupy the wait duration.
* @type number
* @default 10
*
* @param smoothness
* @text Smoothness
* @desc Smoothness of movement of the gauge.
* @type number
* @default 15
*
* @param damagePosition
* @text Damage Position
* @desc Specify the reference point of the display position.
* @type select
* @default center
* @option Center of Enemy
* @value center
* @option Bottom of Enemy
* @value bottom
* @option Top of Enemy
* @value top
*
* @param damageOffsetY
* @text Damage OffsetY
* @desc Shifts the position of the damage popup by the specified number.
* @type number
* @min -999999
* @default 0
*
*/

/*:ja
* @target MZ
* @plugindesc 特定タイミングでエネミーのHPゲージを表示します。(Ver.3.0.2)
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/486325593.html
* @help 標準では敵の選択時、HP変化時、ダメージポップアップ時、ステート付与時に
* ゲージを表示します。
*
* コアスクリプトの一部を使用している為、このプラグインの使用には
* ツクールMZのユーザー登録が必要です。
*
* [更新履歴]
* 2022/04/06：Ver.1.0.0　公開。
* 2022/05/26：Ver.2.0.0　アイコン表示機能追加。パラメータ追加。
* 2022/06/03：Ver.2.0.1　バグ修正。
* 2022/06/07：Ver.3.0.0　処理の見直し。エネミーに追従するかどうかを設定可能に。
* 2022/06/07：Ver.3.0.1　表示タイミングを微調整可能に。
* 2022/06/12：Ver.3.0.2　表示タイミングを修正。
* 2022/07/28：Ver.3.0.3　不具合修正。線の太さを変更するパラメータを追加。
*
* @param chaseEnemy
* @text エネミーに追従
* @desc エネミーが定位置から動いたときに追従します。
* @type boolean
* @default false
*
* @param gaugeStyle
* @text ゲージ形式
* @desc 表示形式を変更します。
* @type select
* @default default1
* @option 標準
* @value default1
* @option 戦闘開始時にも表示
* @value default2
* @option 常に表示
* @value always
*
* @param displayTiming
* @text 表示タイミング
* @desc ゲージとアイコンの表示タイミングです。
* アイコン形式がsyncの時のみ有効なパラメータです。
* @type select
* @default affectedStatus
* @option 被ダメージ時
* @value damaged
* @option ステート影響時
* @value affectedStatus
*
* @param iconStyle
* @text アイコン形式
* @desc ステートアイコンをゲージの上に表示します。
* @type select
* @default sync
* @option MZ標準
* @value false
* @option ゲージと同期
* @value sync
* @option 常に表示
* @value always
*
* @param gaugePosition
* @text ゲージ位置
* @desc 表示位置の基準点を指定します。
* @type select
* @default center
* @option エネミーの中央
* @value center
* @option エネミーの足元
* @value bottom
* @option エネミーの頭上
* @value top
*
* @param gaugeOffsetY
* @text ゲージオフセットY
* @desc 指定した数だけ位置をずらします。
* @type number
* @min -999999
* @default 80
*
* @param iconOffsetY
* @text アイコンオフセットY
* @desc 指定した数だけゲージからのアイコンの位置をずらします。
* @type number
* @min -999999
* @default 0
*
* @param gaugeWidth
* @text ゲージ横幅
* @desc ゲージの横幅です。
* @type number
* @default 128
*
* @param gaugeHeight
* @text ゲージ高さ
* @desc ゲージの高さです。
* @type number
* @default 8
*
* @param lineWidth
* @text 線の太さ
* @desc ゲージに使用される線の太さです。
* ゲージの高さによっては正しく描画されません。
* @type number
* @default 1
*
* @param waitDuration
* @text ウェイト時間
* @desc ゲージ動作後、消えるまでの時間です。
* @type number
* @default 128
*
* @param fadeDuration
* @text フェード時間
* @desc ウェイト時間のうち、フェードアウトに占める時間を指定します。
* @type number
* @default 10
*
* @param smoothness
* @text 滑らかさ
* @desc ゲージの動きの滑らかさ。
* @type number
* @default 15
*
* @param damagePosition
* @text ダメージ位置
* @desc 表示位置の基準点を指定します。
* @type select
* @default center
* @option エネミーの中央
* @value center
* @option エネミーの足元
* @value bottom
* @option エネミーの頭上
* @value top
*
* @param damageOffsetY
* @text ダメージオフセットY
* @desc 指定した数だけダメージポップアップの位置をずらします。
* @type number
* @min -999999
* @default 0
*
*/

'use strict';
{

	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameter = PluginManager.parameters(pluginName);

	const chaseEnemy = parameter["chaseEnemy"] === "true";
	const gaugeStyle = parameter["gaugeStyle"];
	const displayTiming = parameter["displayTiming"];
	const iconStyle = parameter["iconStyle"] === "false" ? false : parameter["iconStyle"];
	const gaugePosition = parameter["gaugePosition"];
	const gaugeOffsetY = Number(parameter["gaugeOffsetY"]);
	const iconOffsetY = Number(parameter["iconOffsetY"]);
	const gaugeWidth = Number(parameter["gaugeWidth"]);
	const gaugeHeight = Number(parameter["gaugeHeight"]);
	const lineWidth = Number(parameter["lineWidth"] || 1);
	const waitDuration = Number(parameter["waitDuration"]);
	const fadeDuration = Number(parameter["fadeDuration"]);
	const smoothness = Number(parameter["smoothness"]);
	const damagePosition = parameter["damagePosition"];
	const damageOffsetY = Number(parameter["damageOffsetY"]);

	//-----------------------------------------------------------------------------
	// Game_Temp

	const _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.call(this);
		this._battleEnemyGaugeQueue = [];
	};

	Game_Temp.prototype.requestBattleEnemyGauge = function(target) {
		const request = { target: target };
		this._battleEnemyGaugeQueue.push(request);
	};

	Game_Temp.prototype.retrieveBattleEnemyGauge = function() {
		return this._battleEnemyGaugeQueue.shift();
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle

	const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
	Spriteset_Battle.prototype.createLowerLayer = function() {
		_Spriteset_Battle_createLowerLayer.call(this);
		this.createEnemyGaugeSprite();
	};

	Spriteset_Battle.prototype.createEnemyGaugeSprite = function() {
		const enemySprites = this._enemySprites;
		this._enemyGaugeSprites = [];
		for (const enemySprite of enemySprites) {
			const gauge = new Sprite_BattleEnemyStatus(enemySprite);
			gauge.setup(enemySprite._battler);
			enemySprite._statusSprite = gauge;
			this._enemyGaugeSprites.push(gauge);
			this._battleField.addChild(gauge);
		}
	};

	const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
	Spriteset_Battle.prototype.update = function() {
		_Spriteset_Battle_update.call(this);
		this.updateEnemyGauges();
	};

	Spriteset_Battle.prototype.updateEnemyGauges = function() {
	    this.processEnemyGaugeRequests();
	};

	Spriteset_Battle.prototype.processEnemyGaugeRequests = function() {
	    for (;;) {
	        const request = $gameTemp.retrieveBattleEnemyGauge();
	        if (request) {
	            this.visibleEnemyGauge(request);
	        } else {
	            break;
	        }
	    }
	};

	Spriteset_Battle.prototype.visibleEnemyGauge = function(request) {
		const sprite = this._enemyGaugeSprites.find(sprite => sprite._battlerObj === request.target);
		if (sprite) {
			sprite.requestVisible();
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_BattleEnemyStatus

	function Sprite_BattleEnemyStatus() {
		this.initialize(...arguments);
	}

	Sprite_BattleEnemyStatus.prototype = Object.create(Sprite.prototype);
	Sprite_BattleEnemyStatus.prototype.constructor = Sprite_BattleEnemyGauge;

	const _Sprite_Gauge_initialize = Sprite_Gauge.prototype.initialize;
	Sprite_BattleEnemyStatus.prototype.initialize = function(target) {
		Sprite.prototype.initialize.call(this);
		this.initMembers(target);
		this.createHpGaugeSprite();
		if (iconStyle) {
			this.createBuffIconSprite();
			this.createStateIconSprite();
		}
	};

	Sprite_BattleEnemyStatus.prototype.initMembers = function(target) {
		this._battlerObj = null;
		this._target = target;
		this._waitDuration = 0;
		this._died = false;
		this._lastCollapseType = null;
		this._requestVisible = false;
		this._result = null;
	};

	Sprite_BattleEnemyStatus.prototype.setOpacity = function(opacity) {
		this.opacity = opacity;
	};

	if (iconStyle === "always") {
		Sprite_BattleEnemyStatus.prototype.setOpacity = function(opacity) {
			this._hpGaugeSprite.opacity = opacity;
		};
	}

	Sprite_BattleEnemyStatus.prototype.gaugeWidth = function() {
		return this._hpGaugeSprite.bitmapWidth();
	};

	Sprite_BattleEnemyStatus.prototype.gaugeHeight = function() {
		return this._hpGaugeSprite.gaugeHeight();
	};

	Sprite_BattleEnemyStatus.prototype.createHpGaugeSprite = function() {
		const sprite = new Sprite_BattleEnemyGauge();
		this._hpGaugeSprite = sprite;
		this.addChild(sprite);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
	};
		
	Sprite_BattleEnemyStatus.prototype.createBuffIconSprite = function() {
		const sprite = new Sprite_BattleEnemyIcon();
		this._buffIconSprite = sprite;
		this.addChild(sprite);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		sprite.x = Math.floor((this.gaugeWidth() - ImageManager.iconWidth)/2);
		sprite.y = -Math.floor((ImageManager.iconHeight + this.gaugeHeight())/2)+iconOffsetY;
	};
		
	Sprite_BattleEnemyStatus.prototype.createStateIconSprite = function() {
		const sprite = new Sprite_BattleEnemyIcon();
		this._stateIconSprite = sprite;
		this.addChild(sprite);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		sprite.x = Math.floor((this.gaugeWidth() - ImageManager.iconWidth)/2);
		sprite.y = -Math.floor((ImageManager.iconHeight + this.gaugeHeight())/2)+iconOffsetY;
	};

	Sprite_BattleEnemyStatus.prototype.setup = function(battler) {
		this._battlerObj = battler;
		this._hpGaugeSprite.setup(battler, "hp");
		if (iconStyle) {
			this._buffIconSprite.setup(battler, "buff");
			this._stateIconSprite.setup(battler, "state");
		}
	};
	Sprite_BattleEnemyStatus.prototype.startVisible = function() {
		this.setOpacity(255);
		if (this.canAddWait()) {
			this._waitDuration = waitDuration;
		} else if (this.isEnemySelecting()) {
			this._waitDuration = 0;
		}
		this._requestVisible = false;
	};

	Sprite_BattleEnemyStatus.prototype.requestVisible = function() {
		this._requestVisible = true;
	};

	Sprite_BattleEnemyStatus.prototype.endVisible = function() {
		this._waitDuration = 0;
		this.setOpacity(0);
	};

	Sprite_BattleEnemyStatus.prototype.update = function() {
		Sprite.prototype.update.call(this);
		this.updateOpacity();
		if (this.canMove()) {
			this.updatePosition();
		}
		this.updateIconSprites();
	};

	Sprite_BattleEnemyStatus.prototype.canMove = function() {
		return this._battlerObj.isAlive();
	};

	Sprite_BattleEnemyStatus.prototype.updateIconSprites = function() {};

	if (iconStyle) {
		Sprite_BattleEnemyStatus.prototype.updateIconSprites = function() {
			if (this._battlerObj.stateIcons().length > 0) {
				this._buffIconSprite.x = Math.floor((this.gaugeWidth() - ImageManager.iconWidth)/2) - ImageManager.iconWidth;
			} else {
				this._buffIconSprite.x = this._stateIconSprite.x;
			}
			let opacity = 255;
			if (SceneManager._scene._enemyWindow.active && !this._battlerObj.isSelected()) {
				opacity = 128;
			}
			this._buffIconSprite.opacity = this._stateIconSprite.opacity = opacity;
		};
	}

	Sprite_BattleEnemyStatus.prototype.updatePosition = function() {
		const sprite = this._target;
		this.x = sprite._homeX;
		this.y = sprite._homeY;
		if (chaseEnemy) {
			this.x += sprite._offsetX;
			this.y += sprite._offsetY;
		}
		const bitmapHeight = Math.floor(sprite.mainSprite().height/2);
		this.y -= bitmapHeight;
		this.y += gaugeOffsetY;
	};

	if (gaugePosition === "bottom") {
		Sprite_BattleEnemyStatus.prototype.updatePosition = function() {
			const sprite = this._target;
			this.x = sprite._homeX;
			this.y = sprite._homeY;
			if (chaseEnemy) {
				this.x += sprite._offsetX;
				this.y += sprite._offsetY;
			}
			this.y += gaugeOffsetY;
		};
	} else if (gaugePosition === "top") {
		Sprite_BattleEnemyStatus.prototype.updatePosition = function() {
			const sprite = this._target;
			this.x = sprite._homeX;
			this.y = sprite._homeY;
			if (chaseEnemy) {
				this.x += sprite._offsetX;
				this.y += sprite._offsetY;
			}
			const bitmapHeight = sprite.mainSprite().height;
			this.y -= bitmapHeight;
			this.y += gaugeOffsetY;
		};
	}

	const collapseSet = new Set(["collapse", "bossCollapse", "instantCollapse"]);
	Sprite_BattleEnemyStatus.prototype.updateOpacity = function() {
		const collapseType = collapseSet.has(this._target._effectType) && this._target._effectType || null;
		if (this.canVisible()) {
			this.startVisible();
		} else if (this._waitDuration > 0) {
			this._waitDuration--;
			this.setOpacity(255);
			if (this.isEnemyCollapsed(collapseType) && this._waitDuration > fadeDuration){
				this._waitDuration = fadeDuration;
			}
			if (this._waitDuration <= fadeDuration) {
				const opacity = (255 * this._waitDuration) / fadeDuration;
				this.setOpacity(opacity); 
			}
		} else {
			this.endVisible();
		}
		this._lastCollapseType = collapseType;
	};

	Sprite_BattleEnemyStatus.prototype.canAddWait = function() {
		return this._requestVisible;
	};

	Sprite_BattleEnemyStatus.prototype.canVisible = function() {
		if (this.isEnemyDamaging()) {
			this._requestVisible = true;
			return true;
		} else if (this.isEnemySelecting()) {
			return true;
		}
		return false;
	};

	if (gaugeStyle === "always") {
		Sprite_BattleEnemyStatus.prototype.canAddWait = function() {
			return true;
		};

		Sprite_BattleEnemyStatus.prototype.canVisible = function() {
			return this._battlerObj.isAlive();
		};
	}

	Sprite_BattleEnemyStatus.prototype.isEnemyCollapsed = function(collapseType) {
		return this._battlerObj.isDead() && this._lastCollapseType && this._lastCollapseType !== collapseType;
	};

	Sprite_BattleEnemyStatus.prototype.isEnemyDamaging = function() {
		return this._requestVisible || this._battlerObj.isAlive() && this._hpGaugeSprite.isGaugeMoving();
	};

	Sprite_BattleEnemyStatus.prototype.isEnemySelecting = function() {
		return BattleManager.isInputting() && this._battlerObj.isSelected();
	};

	//-----------------------------------------------------------------------------
	// Sprite_BattleEnemyGauge

	function Sprite_BattleEnemyGauge() {
		this.initialize(...arguments);
	}

	Sprite_BattleEnemyGauge.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_BattleEnemyGauge.prototype.constructor = Sprite_BattleEnemyGauge;

	const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
	Sprite_BattleEnemyGauge.prototype.initMembers = function() {
		_Sprite_Gauge_initMembers.call(this);
		this._oneBreak = gaugeStyle === "default1";
	};

	Sprite_BattleEnemyGauge.prototype.bitmapWidth = function() {
		return gaugeWidth;
	};

	Sprite_BattleEnemyGauge.prototype.bitmapHeight = function() {
		return this.gaugeHeight();
	};

	Sprite_BattleEnemyGauge.prototype.textHeight = function() {
		return this.gaugeHeight();
	};

	Sprite_BattleEnemyGauge.prototype.gaugeHeight = function() {
		return gaugeHeight;
	};

	Sprite_BattleEnemyGauge.prototype.gaugeX = function() {
		return 0;
	};

	Sprite_BattleEnemyGauge.prototype.isGaugeMoving = function() {
		return !!this._duration;
	}

	Sprite_BattleEnemyGauge.prototype.smoothness = function() {
		if (this._oneBreak) {
			this._oneBreak = false;
			return 1;
		}
		return smoothness;
	};

	Sprite_BattleEnemyGauge.prototype.drawGaugeRect = function(x, y, width, height) {
		const rate = this.gaugeRate();
		const fillW = Math.floor((width - lineWidth*4) * rate);
		const fillH = height - lineWidth*4;
		const color0 = this.gaugeBackColor();
		const color1 = this.gaugeColor1();
		const color2 = this.gaugeColor2();
		const color3 = ColorManager.normalColor();
		this.bitmap.fillRect(x, y, width, height, color3);
		this.bitmap.fillRect(x+lineWidth, y+lineWidth, width-lineWidth*2, height-lineWidth*2, color0);
		this.bitmap.gradientFillRect(x + lineWidth*2, y + lineWidth*2, fillW, fillH, color1, color2);
	};

	Sprite_BattleEnemyGauge.prototype.drawLabel = function() {};

	Sprite_BattleEnemyGauge.prototype.drawValue = function() {};

	//-----------------------------------------------------------------------------
	// Sprite_Enemy

	const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
	Sprite_Enemy.prototype.initMembers = function() {
		_Sprite_Enemy_initMembers.call(this);
		this._statusSprite = null;
	};

	const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
	Sprite_Enemy.prototype.setBattler = function(battler) {
		_Sprite_Enemy_setBattler.call(this, battler);
		if (this._statusSprite) {
			this._statusSprite.setup(battler);
		}
	};

	const _Sprite_Enemy_createStateIconSprite = Sprite_Enemy.prototype.createStateIconSprite
	Sprite_Enemy.prototype.createStateIconSprite = function() {
		_Sprite_Enemy_createStateIconSprite.call(this);
		if (iconStyle) this._stateIconSprite.hide();
	};

	Sprite_Enemy.prototype.damageOffsetY = function() {
		const offsetY = damageOffsetY;
		return Sprite_Battler.prototype.damageOffsetY.call(this) + offsetY;
	};

	if (damagePosition === "top") {
		Sprite_Enemy.prototype.damageOffsetY = function() {
			const fontSize = Sprite_Damage.prototype.fontSize();
			const bitmapHeight = this.mainSprite().height;
			const offsetY = -bitmapHeight + fontSize + damageOffsetY;
			return Sprite_Battler.prototype.damageOffsetY.call(this) + offsetY;
		};
	} else if (damagePosition === "center") {
		Sprite_Enemy.prototype.damageOffsetY = function() {
			const fontSize = Sprite_Damage.prototype.fontSize();
			const bitmapHeight = this.mainSprite().height;
			const offsetY = -(bitmapHeight - fontSize)/2 + damageOffsetY;
			return Sprite_Battler.prototype.damageOffsetY.call(this) + offsetY;
		};
	}

	//-----------------------------------------------------------------------------
	// Sprite_BattleEnemyIcon

	function Sprite_BattleEnemyIcon() {
		this.initialize(...arguments);
	}

	Sprite_BattleEnemyIcon.prototype = Object.create(Sprite_StateIcon.prototype);
	Sprite_BattleEnemyIcon.prototype.constructor = Sprite_BattleEnemyIcon;

	Sprite_BattleEnemyIcon.prototype.initMembers = function() {
		Sprite_StateIcon.prototype.initMembers.call(this);
		this._statusType = "";
	};

	Sprite_BattleEnemyIcon.prototype.setup = function(battler, statusType) {
		Sprite_StateIcon.prototype.setup.call(this, battler);
		this._statusType = statusType;
	};

	Sprite_BattleEnemyIcon.prototype.update = function() {
		Sprite_StateIcon.prototype.update.call(this);
		this.visible = this.canVisible();
	};

	Sprite_BattleEnemyIcon.prototype.canVisible = function() {
		return this._iconIndex > 0;
	};

	Sprite_BattleEnemyIcon.prototype.updateIcon = function() {
		const icons = [];
		if (this.shouldDisplay()) {
			icons.push(...this.icons());
		}
		if (icons.length > 0) {
			this._animationIndex++;
			if (this._animationIndex >= icons.length) {
				this._animationIndex = 0;
			}
			this._iconIndex = icons[this._animationIndex];
		} else {
			this._animationIndex = 0;
			this._iconIndex = 0;
		}
	};

	Sprite_BattleEnemyIcon.prototype.icons = function() {
		switch (this._statusType) {
		case "buff":
			return this._battler.buffIcons();
		case "state":
			return this._battler.stateIcons();
		default:
			return this._battler.allIcons();
		}
	};

	//-----------------------------------------------------------------------------
	// Window_BattleLog

	const _Window_BattleLog_popupDamage = Window_BattleLog.prototype.popupDamage;
	Window_BattleLog.prototype.popupDamage = function(target) {
		_Window_BattleLog_popupDamage.call(this, target);
		if (target.isEnemy() && target.result().hpEffect) {
			$gameTemp.requestBattleEnemyGauge(target);
		}
	};

	if (iconStyle === "sync" && displayTiming === "affectedStatus") {
		const _Window_BattleLog_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
		Window_BattleLog.prototype.displayAffectedStatus = function(target) {
			_Window_BattleLog_displayAffectedStatus.call(this, target);
			if (target.isEnemy() && target.result().hasEffectIcon) {
				$gameTemp.requestBattleEnemyGauge(target);
			}
		};
	}

	//-----------------------------------------------------------------------------
	// Game_Enemy

	if (iconStyle === "sync" && displayTiming === "affectedStatus") {
		const _Game_Enemy_addState = Game_Enemy.prototype.addState;
		Game_Enemy.prototype.addState = function(stateId) {
			const affected = this.isStateAddable(stateId);
			const iconIndex = $dataStates[stateId].iconIndex || 0;
			_Game_Enemy_addState.call(this, stateId);
			if (affected && iconIndex > 0) {
				$gameTemp.requestBattleEnemyGauge(this);
			}
		};

		const _Game_Enemy_removeState = Game_Enemy.prototype.removeState;
		Game_Enemy.prototype.removeState = function(stateId) {
			const affected = this.isStateAffected(stateId);
			const iconIndex = $dataStates[stateId].iconIndex || 0;
			_Game_Enemy_removeState.call(this, stateId);
			if (affected && iconIndex > 0) {
				$gameTemp.requestBattleEnemyGauge(this);
			}
		};

		const _Game_Enemy_addBuff = Game_Enemy.prototype.addBuff;
		Game_Enemy.prototype.addBuff = function(paramId, turns) {
			const affected = this.isAlive();
			const iconIndex = this.buffIconIndex(this._buffs[paramId], paramId);
			_Game_Enemy_addBuff.call(this, paramId, turns);
			if (affected && iconIndex > 0) {
				$gameTemp.requestBattleEnemyGauge(this);
			}
		};

		const _Game_Enemy_addDebuff = Game_Enemy.prototype.addDebuff;
		Game_Enemy.prototype.addDebuff = function(paramId, turns) {
			const affected = this.isAlive();
			const iconIndex = this.buffIconIndex(this._buffs[paramId], paramId);
			_Game_Enemy_addDebuff.call(this, paramId, turns);
			if (affected && iconIndex > 0) {
				$gameTemp.requestBattleEnemyGauge(this);
			}
		};

		const _Game_Enemy_removeBuff = Game_Enemy.prototype.removeBuff;
		Game_Enemy.prototype.removeBuff = function(paramId) {
			const affected = this.isAlive() && this.isBuffOrDebuffAffected(paramId);
			const iconIndex = this.buffIconIndex(this._buffs[paramId], paramId);
			_Game_Enemy_removeBuff.call(this, paramId);
			if (affected && iconIndex > 0) {
				$gameTemp.requestBattleEnemyGauge(this);
			}
		};
	}

	//-----------------------------------------------------------------------------
	// Game_Action

	Game_Action.prototype.hasEffectIcon = function(target) {
		return this.hasStateIcon(target) || this.hasBuffIcon(target);
	};

	Game_Action.prototype.hasStateIcon = function(target) {
		const result = target.result();
		const stateIcons = result.addedStates.concat(result.removedStates)
		.map(paramId => $dataStates[paramId].iconIndex)
		.filter(iconIndex => iconIndex > 0);
		return stateIcons.length > 0;
	};

	Game_Action.prototype.hasBuffIcon = function(target) {
		const result = target.result();
		const buffIcons = result.addedBuffs.concat(result.addedDebuffs, result.removedBuffs)
		.map(paramId => Game_BattlerBase.prototype.buffIconIndex(target._buffs[paramId], paramId))
		.filter(iconIndex => iconIndex > 0);
		return buffIcons.length > 0;
	};

	const _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		_Game_Action_apply.call(this, target)
		const result = target.result();
		result.hpEffect = this.isHpEffect();
		result.hasEffectIcon = iconStyle === "sync" && displayTiming === "affectedStatus" && this.hasEffectIcon(target);
	};

	//-----------------------------------------------------------------------------
	// Game_ActionResult

	const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
	Game_ActionResult.prototype.clear = function() {
		_Game_ActionResult_clear.call(this);
		this.hpEffect = false;
		this.hasEffectIcon = false;
	};

}