class PopUp extends egret.DisplayObjectContainer {
  public constructor (options: any) {
    super();
    this.initOptions(options);
  }

  private initOptions (options: any) {

    let mask: egret.Shape = new egret.Shape();
    mask.graphics.beginFill(0x000000, .6);
    mask.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    mask.graphics.endFill();
    this.addChild(mask);

    let rect: egret.Shape = new egret.Shape();
    rect.graphics.beginFill(0x000000, 1);
    rect.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, 200);
    rect.graphics.endFill();
    rect.y = GameData.STAGE_HEIGHT / 2 - 100;
    this.addChild(rect);

    options.map((item, index) => {
      let option: egret.TextField = new egret.TextField();
      option.bold = true;
      option.text = item["text"];
      option.textColor = 0xffffff;
      option.size = 60;
      option.width = GameData.STAGE_WIDTH;
      option.height = 100;
      option.textAlign = egret.HorizontalAlign.CENTER;
      option.verticalAlign = egret.VerticalAlign.MIDDLE;
      option.touchEnabled = true;
      option.y = index === 1 ? GameData.STAGE_HEIGHT / 2 - 100 :  GameData.STAGE_HEIGHT / 2;
      this.addChild(option);
      option.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        this.dispatchEventWith(GameEvents.LOAD_NEXT_CHAPTER, true, item["branch"])
      }, this); 
    })
  }
}