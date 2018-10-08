class Chapter1_1 extends egret.DisplayObjectContainer{

  private picIndex: number = 1;
  private currentLoadingDialog: string = "ch1_01";
  private ch1_01: Comic;
  private ch1_02: Comic;
  private ch1_03: Comic;

  public constructor () {  
    super();
    this.initView();
    this.touchEnabled = true;
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);
    this.addEventListener(GameEvents.LOAD_NEXT_COMIC, () => {
      this.touchEnabled = true;
    }, this)
  }

  public initView () {
    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.addChild(bg);
    SoundManager.getInstance().playChapterMusic("ch1_bg_mp3");       

    this.ch1_01 = new Comic("ch1_01_png", 440, "我叫小茹，毕业后和闺蜜晏子合租住在一起。", 51, 355);
    this.addChild(this.ch1_01);
    this.ch1_01.animatePic();
  }

  private onClickView () {
    this.touchEnabled = false;
    if (!!this.currentLoadingDialog) {
      switch (this.currentLoadingDialog) {
        case "ch1_01":
          this.ch1_01.loadingDialog();
          this.currentLoadingDialog = "";
          break;

        case "ch1_02":
          this.ch1_02.loadingDialog();
          this.currentLoadingDialog = "";
          break;

        case "ch1_03":
          this.ch1_03.loadingDialog();
          this.currentLoadingDialog = "";
          break;
      }
      return;
    }

    switch (this.picIndex) {

      case 1:
        this.ch1_02 = new Comic("ch1_02_png", 742, "晏子有个男朋友，叫卫祥。因为他经常来接晏子约会，所以我对他有些印象。", 11, 439);
        this.ch1_02.y = 406;
        this.addChild(this.ch1_02);
        this.ch1_02.animatePic();
        this.currentLoadingDialog = "ch1_02";
        break;

      case 2:
        this.ch1_03 = new Comic("ch1_03_png", 742, "今天他们又出去约会了，也不知道几点才能回来。", 41, 480);
        this.ch1_03.y = 970;
        this.addChild(this.ch1_03);
        this.ch1_03.animatePic();
        this.currentLoadingDialog = "ch1_03";
        break;

      case 3:
        egret.Tween.get(this).to({
          alpha: 0
        }).call(function () {
          this.dispatchEventWith(GameEvents.LOAD_CHAPTER_1_2, true);
          !!this.parent && this.parent.removeChild(this);
        }.bind(this));
        break;
    }
    this.picIndex ++;
  }
}