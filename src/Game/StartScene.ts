class StartScene extends egret.DisplayObjectContainer {

  private BGMChannel: egret.SoundChannel;

  public constructor () {
    super();
    this.name = "StartScene";    
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
  }

  private initView () {
    
    // 初始化背景图片
    let bg: egret.Bitmap = GameUtil.createBitmapByName("cover_jpg");
    bg.width = this.stage.width;
    bg.height = this.stage.height;
    this.addChild(bg);

    // 蝴蝶动画
    let butterflyJson = RES.getRes("butterfly_json");
    let texture = RES.getRes("butterfly_png");
    let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(butterflyJson, texture);
    let mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("butterfly"));
    mc.x = 300;
    mc.y = 330;
    this.addChild(mc)
    mc.play(-1);

    this.showTips();
  }

  private showTips () {
      let tips: egret.TextField = new egret.TextField();
      tips.text = "点击屏幕继续";
      this.addChild(tips);
      tips.y = 1250;
      tips.width = 960;
      tips.height = 100;
      tips.size = 50;
      tips.textAlign = "center";
      egret.Tween.get(tips, {loop: true}).to({
          alpha: 0.1
      }, 1000).to({
          alpha: 1
      }, 1000);
      this.touchEnabled = true;
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
          this.touchEnabled = false;
          this.removeChild(tips);            
          this.playBGM();
          this.initStartButton();
      }, this, false);
  }

  private playBGM () {
      let bgm: egret.Sound = new egret.Sound();
      bgm = RES.getRes("ch7_4_01_mp3");
      this.BGMChannel = bgm.play(0, 1);
  }

  private initStartButton () {

      // 初始化开始按钮  
      let startButton: egret.Bitmap = GameUtil.createBitmapByName("btn_startGame_png");
      startButton.x = this.stage.stageWidth - startButton.width >> 1;
      startButton.y = 1150;
      startButton.alpha = 0;
      this.addChild(startButton);
      startButton.touchEnabled = true;
      egret.Tween.get(startButton).to({
          alpha: 1
      }, 1000);

      startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
          e.stopImmediatePropagation();
          if (!!this.parent)  this.parent.removeChild(this);
          SceneController.startGameScene();
      }, this);
  }
}