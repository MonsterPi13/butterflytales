class SceneController {

	private _stage: egret.DisplayObjectContainer;

  private startScene: StartScene;
	private gameScene: GameScene;
	private overScene: OverScene;
	public constructor () {
    this.startScene = new StartScene();
		this.gameScene = new GameScene();
		this.overScene = new OverScene();
	}

	static sceneController:SceneController;
	static get instance () {
		if(!this.sceneController){
			this.sceneController = new SceneController();
		}
		return this.sceneController;
	}

	public setStage(s: egret.DisplayObjectContainer) {
		this._stage = s;
	}

	/**
	 * 游戏初始化（进入开始游戏场景）
	 */
	static initGame () {
		let stage: egret.DisplayObjectContainer = this.instance._stage;
		stage.addChild(this.instance.startScene);
	}

	/**
	 * 游戏开始（进入游戏场景）
	 */
	static startGameScene () {
		let stage:egret.DisplayObjectContainer = this.instance._stage;

    if (this.instance.startScene.parent) {
      stage.removeChild(this.instance.startScene);
      this.instance.startScene = new StartScene();
    }

    if (this.instance.gameScene.parent) {
      stage.removeChild(this.instance.gameScene);
      this.instance.gameScene = new GameScene();
    }
    stage.addChild(this.instance.gameScene);
	}
	
	// // 开始游戏
	// static startGame () {

	// 	//定时器开始
	// 	this.instance.gameScene.startTicker();
	// }

	/**
	 * 游戏结束
	 */
	static GameEnd(branch: string){
		let stage = this.instance._stage;
    if (this.instance.gameScene.parent) {
      stage.removeChild(this.instance.gameScene);
      this.instance.gameScene = new GameScene();
    }
		stage.addChild(this.instance.overScene);
		this.instance.overScene.initGameEnd(branch);
	}
}