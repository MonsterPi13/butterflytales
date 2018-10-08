class Comic4 extends egret.DisplayObjectContainer {

  private options: any;
  private mainPicture: egret.Bitmap;
  private tipsPicArray: Array<egret.Bitmap> = new Array();

  public constructor (options: any) {
    super();
    this.options = options;
    this.initView();
  }

  private initView() {
    this.initMainPic();
    this.initTipsPic();
  }

  private initMainPic () {
    this.mainPicture = GameUtil.createBitmapByName(this.options.pic);
    this.mainPicture.alpha = !!this.options.animationType ? 0 : 1;
    this.mainPicture.anchorOffsetX = this.mainPicture.width >> 1;
    this.mainPicture.anchorOffsetY = this.mainPicture.height >> 1;
    this.mainPicture.x = this.mainPicture.anchorOffsetX;
    this.mainPicture.y = this.mainPicture.anchorOffsetY;
    this.addChild(this.mainPicture);
  }

  private initTipsPic () {
    this.options["tips_pics"].map((item, index) => {
      let tipsPic: egret.Bitmap = GameUtil.createBitmapByName(item["pic"]);
      tipsPic.alpha = 0;
      tipsPic.anchorOffsetX = tipsPic.width >> 1;
      tipsPic.anchorOffsetY = tipsPic.height >> 1;
      tipsPic.x = item["x_axis"] + tipsPic.anchorOffsetX ;
      tipsPic.y = item["y_axis"] + tipsPic.anchorOffsetY;
      this.addChild(tipsPic);
      this.tipsPicArray.push(tipsPic);
    })

    egret.Tween.get(this.mainPicture).to({
      alpha: 1
    }, 500).call(() => {
      this.animateMainPic();
    });
  }

  private animateMainPic () {
    egret.Tween.get(this.mainPicture, {loop: true}).to({
      scaleX: 1
    }, 50).to({
      scaleX: .9,
      scaleY: .9,
      rotation: -3
    }, 50).to({
      scaleX: 1.1,
      scaleY: 1.1,
      rotation: 3
    }, 50).to({
      scaleX: 1.1,
      scaleY: 1.1,
      rotation: -3
    }, 50).to({
      scaleX: 1
    })
    egret.setTimeout(() => {
      egret.Tween.removeTweens(this.mainPicture);
      this.mainPicture.scaleX = 1;
      this.mainPicture.scaleY = 1;
      this.mainPicture.rotation = 0;
      this.animateTipsPic();
    }, this, 500)
  }

  private animateTipsPic () {
    switch (this.options.animationType) {
      case "bounceIn": 
        SoundManager.getInstance().playChapterMusic(this.options.music);   
        let index: number = 0;
        this.aniamteBounceIn(this.tipsPicArray[0], () => {
          this.aniamteBounceIn(this.tipsPicArray[1], () => {
            this.aniamteBounceIn(this.tipsPicArray[2], () => {
              this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);
            })
          })
        })
        break;
    }   
  }

  private aniamteBounceIn(item: any, callback?: Function) {
    // item.alpha = 1;
    egret.Tween.get(item).to({
      alpha: 0,
      scaleX: .3,
      scaleY: .3
    }, 50).to({
      scaleX: 1.1,
      scaleY: 1.1
    }, 50).to({
      scaleX: .9,
      scaleY: .9
    }, 50).to({
      alpha: 1,
      scaleX: 1.03,
      scaleY: 1.03
    }, 50).to({
      scaleX: .97,
      scaleY: .97
    }, 50).to({
      alpha: 1,
      scaleX: 1,
      scaleY: 1
    }).call(() => {
      if (!!callback) callback();
    })
  }

  public stopAnimateTipsPic () {
    this.tipsPicArray.map(item => {
      egret.Tween.removeTweens(item);
    })
  }

}