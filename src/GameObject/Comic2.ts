/**
 * 有动画的漫画
 */
class Comic2 extends egret.DisplayObjectContainer {

  private mainPicture: egret.Bitmap;
  private tipsPic: egret.Bitmap;
  private options: any;
  private tipsPicType: string;

  private messageBox: egret.Sprite;

  private dialog_text: egret.TextField;
  private messageText: string;

  public constructor (options) {
    super();
    this.options = options;
    this.initPic();
  }

  private initPic () {
    this.mainPicture = GameUtil.createBitmapByName(this.options.pic);
    this.mainPicture.alpha = !!this.options.tips_pic && !this.options.animationType ? 1 : 0;
    this.addChild(this.mainPicture);

    if (!this.options.tips_pic) {
      egret.Tween.get(this.mainPicture).to({
          alpha: 1
        }, 1000).call(() => {
          if (!!this.options.music) SoundManager.getInstance().playChapterMusic(this.options.music);
          this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);
      });
      return;
    }

    this.tipsPic = GameUtil.createBitmapByName(this.options.tips_pic);
    this.tipsPic.alpha = !!this.options.animationType ? 0 : 1;
    this.tipsPic.anchorOffsetX = this.tipsPic.width >> 1;
    this.tipsPic.anchorOffsetY = this.tipsPic.height >> 1;
    this.tipsPic.x = this.options.tips_pic_axis["x"] + this.tipsPic.anchorOffsetX;
    this.tipsPic.y = this.options.tips_pic_axis["y"] + this.tipsPic.anchorOffsetY;
    this.addChild(this.tipsPic);

    egret.Tween.get(this.mainPicture).to({
      alpha: 1
    }, 1000).call(() => {
      this.animateTipsPic();
   });
  }

  private animateTipsPic () {
    switch (this.options.animationType) {
      case "tada": 
        this.animateTada();
        SoundManager.getInstance().playChapterMusic(this.options.music);
        break;

      case "fadeIn":
        this.aniamteFadeIn();
        SoundManager.getInstance().playChapterMusic(this.options.music);
        break;
    }   
  }

  // tada动画
  private animateTada () {
    this.tipsPic.alpha = 1;
    egret.Tween.get(this.tipsPic, {loop: true}).to({
      scaleX: 1
    }, 100, ).to({
      scaleX: .97,
      scaleY: .97,
      scaleZ: .97,
      rotation: -6
    }, 100, egret.Ease.bounceIn).to({
      scaleX: 1.03,
      scaleY: 1.03,
      scaleZ: 1.03,
      rotation: 6
    }, 100).to({
      scaleX: 1.03,
      scaleY: 1.03,
      scaleZ: 1.03,
      rotation: -6
    }, 100).to({
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    }, 100).call(() => {
      this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);      
    });
    egret.setTimeout(() => {
      egret.Tween.removeTweens(this.tipsPic);
    }, this, 2000)
  }

  // fadeIn动画
  private aniamteFadeIn () {
    egret.Tween.get(this.tipsPic).to({
      alpha: 1
    }, 1000).call(() => {
      this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);      
    })
  }

  public stopAnimateTipsPic () {
    egret.Tween.removeTweens(this.tipsPic);
  }
}