class OverScene extends egret.DisplayObjectContainer {

  private endImg: egret.Bitmap;
  private opacity: number = 0;
  private rem: any;

  public constructor () {
    super();
    this.name = "OverScene";
    this.alpha = 0;
  }
  
  public initGameEnd(branch: string) {
    let bgImg: egret.Bitmap = GameUtil.createBitmapByName("end_bg_jpg");
    bgImg.width = GameData.STAGE_WIDTH;
    bgImg.height = GameData.STAGE_HEIGHT;
    this.addChild(bgImg);

    switch (branch) {
      case "end_branch_01":
        this.endImg = GameUtil.createBitmapByName("end_branch_01_png");
        break;

      case "end_branch_02":
        this.endImg = GameUtil.createBitmapByName("end_branch_02_png");
        break;

      case "end_branch_03":
        this.endImg = GameUtil.createBitmapByName("end_branch_03_png");
        break;

      case "end_branch_04":
        this.endImg = GameUtil.createBitmapByName("end_branch_04_png");
        break;

      case "end_branch_05":
        this.endImg = GameUtil.createBitmapByName("end_branch_05_png");
        break;

      case "end_branch_06":
        this.endImg = GameUtil.createBitmapByName("end_branch_06_png");
        break;

      case "end_branch_07":
        this.endImg = GameUtil.createBitmapByName("end_branch_07_png");
        break;
    }
    this.addChild(this.endImg);

    let qrCodeImg: egret.Bitmap = GameUtil.createBitmapByName("qr_code_img_png");
    qrCodeImg.x = 0;
    qrCodeImg.y = 850;
    this.addChild(qrCodeImg);

    this.shareImage(this);
  }

  public shareImage(target: egret.DisplayObject): void {
    let renderTexture: egret.RenderTexture = new egret.RenderTexture();

    //渲染到临时画布
    renderTexture.drawToTexture(target);

    let shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;

    //把数据赋值给Image
    shareImage.src = renderTexture.toDataURL('image/jpeg');
    
    document.getElementById("divImage").style.display = "block";
    this.rem = window.requestAnimationFrame(this.addOpacity.bind(this));
  }

  public addOpacity () {
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