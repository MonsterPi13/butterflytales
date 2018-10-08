class Comic extends egret.DisplayObjectContainer {


  private mainPicture: egret.Bitmap;
  private messageBox: egret.Sprite;

  private dialog_text: egret.TextField;
  private messageText: string;

  public constructor (pic: string, dialogWidth: number, messageText: string, messageBox_xAxis: number,  messageBox_yAxis: number) {
    super();
    this.initPic(pic);
    this.initMessageBox(dialogWidth, messageText, messageBox_xAxis, messageBox_yAxis);
  }

  private initPic (pic: string) {
    this.mainPicture = GameUtil.createBitmapByName(pic);
    this.mainPicture.alpha = 0;
    this.addChild(this.mainPicture);
  }

  private initMessageBox (dialogWidth: number, messageText: string, messageBox_xAxis: number, messageBox_yAxis: number) {

    this.messageBox = new egret.Sprite();
    this.messageBox.x = messageBox_xAxis;
    this.messageBox.y = messageBox_yAxis;
    this.messageBox.alpha = 0;
    this.addChild(this.messageBox);

    // 对话框背景
    let messageBoxBg: egret.Shape = new egret.Shape();
    messageBoxBg.graphics.beginFill(0x000000);
    messageBoxBg.graphics.drawRoundRect(0, 0, dialogWidth, 108, 30, 30);
    messageBoxBg.graphics.endFill();
    this.messageBox.addChild(messageBoxBg);

    // 对话框文案
    this.dialog_text = new egret.TextField();
    this.messageText = messageText;
    this.dialog_text.width = dialogWidth - 40;
    this.dialog_text.height = 108;
    this.dialog_text.textColor = 0xffffff;
    this.dialog_text.size = 36;
    this.dialog_text.x = 20;
    this.dialog_text.y = 13;
    this.dialog_text.lineSpacing = 12;
    this.dialog_text.multiline = true;
    // this.dialog_text.verticalAlign = egret.VerticalAlign.MIDDLE;
    this.messageBox.addChild(this.dialog_text);
  }

  private typerEffect(obj, content: string = "", interval: number = 100, backFun: Function = null):void{
    let strArr: Array<any> = content.split("");
    let len: number = strArr.length;
    for (let i = 0; i < len; i++) {
      egret.setTimeout(function () {              
        obj.appendText(strArr[Number(this)]);
        if ((Number(this) >= len - 1) && (backFun != null)) {
          backFun();
        }
      }, i, interval * i);              
    }
  }

  public animatePic () {
    let mainPicTween: egret.Tween = egret.Tween.get(this.mainPicture);
    mainPicTween.to({
      alpha: 1
    }, 1000).call(() => {
      this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);
    })
  }

  public loadingDialog () {
    this.animateMessageBox();
  }

  // 
  private animateMessageBox () {
    let messageBoxTween: egret.Tween = egret.Tween.get(this.messageBox);    
    messageBoxTween.to({
      alpha: 1
    }, 1000).call(function () {
      this.typerEffect(this.dialog_text, this.messageText, 20, function () {
        this.dispatchEventWith(GameEvents.LOAD_NEXT_COMIC, true);
      }.bind(this))
    }.bind(this))
  }
}