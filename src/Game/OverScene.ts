class OverScene extends egret.DisplayObjectContainer {

  private renderTexture: egret.DisplayObjectContainer;
  private coverImg: egret.Bitmap;
  private coverImg2: egret.Bitmap;
  private endImg: egret.Bitmap;
  private flashImg: egret.Shape;
  private opacity: number = 0;
  private rem: any;

  public constructor () {
    super();
    this.name = "OverScene";
  }
  
  public initGameEnd(branch: string) {
    this.renderTexture = new egret.DisplayObjectContainer();
    this.addChild(this.renderTexture);
    this.renderTexture.alpha = 0;

    let bgImg: egret.Bitmap = GameUtil.createBitmapByName("end_bg_jpg");
    bgImg.width = GameData.STAGE_WIDTH;
    bgImg.height = GameData.STAGE_HEIGHT;
    this.renderTexture.addChild(bgImg);

    let qrCodeImg: egret.Bitmap = GameUtil.createBitmapByName("qr_code_img_png");
    qrCodeImg.x = 0;
    qrCodeImg.y = 850;
    this.renderTexture.addChild(qrCodeImg);

    switch (branch) {
      case "end_branch_01":
        this.endImg = GameUtil.createBitmapByName("end_branch_01_png");
        this.coverImg = GameUtil.createBitmapByName("ch4_end_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover1_png");
        break;

      case "end_branch_02":
        this.endImg = GameUtil.createBitmapByName("end_branch_02_png");
        this.coverImg = GameUtil.createBitmapByName("ch6_04_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover2_png");
        break;

      case "end_branch_03":
        this.endImg = GameUtil.createBitmapByName("end_branch_03_png");
        this.coverImg = GameUtil.createBitmapByName("ch7_4_01_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover3_png");
        break;

      case "end_branch_04":
        this.endImg = GameUtil.createBitmapByName("end_branch_04_png");
        this.coverImg = GameUtil.createBitmapByName("ch9_2_01_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover4_png");
        break;

      case "end_branch_05":
        this.endImg = GameUtil.createBitmapByName("end_branch_05_png");
        this.coverImg = GameUtil.createBitmapByName("ch10_3_01_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover5_png");
        break;

      case "end_branch_06":
        this.endImg = GameUtil.createBitmapByName("end_branch_06_png");
        this.coverImg = GameUtil.createBitmapByName("ch12_2_01_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover6_png");
        break;

      case "end_branch_07":
        this.endImg = GameUtil.createBitmapByName("end_branch_07_png");
        this.coverImg = GameUtil.createBitmapByName("ch15_5_01_jpg");
        this.coverImg2 = GameUtil.createBitmapByName("end_branch_cover7_png");
        break;
    }

    this.coverImg2.alpha = 0;    
    this.coverImg2.width *= 1.63;
    this.coverImg2.height *= 1.63;
    this.coverImg2.anchorOffsetX = this.coverImg2.width >> 1;
    this.coverImg2.anchorOffsetY = this.coverImg2.height >> 1;
    this.coverImg2.rotation = 5;
    this.coverImg2.x = (GameData.STAGE_WIDTH - this.coverImg2.width) / 2 + this.coverImg2.width / 2;
    this.coverImg2.y = (GameData.STAGE_HEIGHT - this.coverImg2.height) / 2 + this.coverImg2.height / 2;
    this.renderTexture.addChild(this.endImg);    
    this.addChild(this.coverImg);
    this.addChild(this.coverImg2);

    this.initShateImage(this.renderTexture);
    egret.setTimeout(() => {
      this.snapShoot();
    }, this, 1000)
  }

  private snapShoot () {
    this.flashImg = new egret.Shape;
    this.flashImg.graphics.beginFill(0xffffff);
    this.flashImg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    this.flashImg.graphics.endFill();
    this.addChild(this.flashImg);

    egret.Tween.get(this.flashImg).to({
      alpha: 0
    }, 100).to({
      alpha: .5
    }, 100).call(() => {
      egret.Tween.get(this.coverImg2).to({
        alpha: 1
      }, 300).call(() => {
        egret.setTimeout(() => {
          egret.Tween.get(this.coverImg2).to({
            alpha: 0,
            width: this.coverImg2.width / 1.63,
            height: this.coverImg2.height / 1.63
          }, 700).call(() => {
          })

          egret.Tween.get(this.coverImg).to({
            alpha: 0,
          }, 700).call(() => {
            // this.alpha = 0;
          })

          this.showShareImage();           
        }, this, 1000)
      })
    }).to({
      alpha: 0
    }, 100)
  }

  private initShateImage(target: egret.DisplayObject) {
    let renderTexture: egret.RenderTexture = new egret.RenderTexture();

    //渲染到临时画布
    renderTexture.drawToTexture(target);

    let shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;

    //把数据赋值给Image
    shareImage.src = renderTexture.toDataURL('image/jpeg');
  }

  private showShareImage(): void {
    document.getElementById("divImage").style.display = "block";
    this.rem = window.requestAnimationFrame(this.addOpacity.bind(this));
  }

  private addOpacity () {
    this.opacity += .01;
    document.getElementById("divImageInner").style.opacity = this.opacity.toString();
    if (this.opacity >= 1) {
       window.cancelAnimationFrame(this.rem);
       this.opacity = 0;
       return;
    }
    this.rem = window.requestAnimationFrame(this.addOpacity.bind(this));    
  }
}