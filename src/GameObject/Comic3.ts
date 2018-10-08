/**
 * 对话形式的漫画
 */
class Comic3 extends egret.DisplayObjectContainer{


  private options: Object;
  private messageIndex: number = 0;
  private limitedMessageNumber: number;

  private mainPicture: egret.Bitmap;

  private currentDialog: string;

  // 对话框
  private dialogMessageBox: egret.Sprite = new egret.Sprite();
  private dialogText: egret.TextField = new egret.TextField();

  public constructor (option: Object) {
    super();
    this.options = option;
    this.limitedMessageNumber = option["sequence"].length;
    this.initView();
  }

  private initView () {
    this.initPic();
  }

  private initPic () {
    // debugger;
    let mainPic: Object = this.options["mainPic"];
    this.mainPicture = GameUtil.createBitmapByName(mainPic["picName"]);
    this.mainPicture.alpha = 0;
    this.addChild(this.mainPicture);

    egret.Tween.get(this.mainPicture).to({
      alpha: 1
    }, 1000).call(() => {
      this.dispatchEventWith(GameEvents.LOAD_NEXT_DIALOG, true);
    })
  }

  // 初始化对话框
  private initDialog () {
    let currentDialog: string = this.options["sequence"][this.messageIndex]["dialog"];
    let currentMessageIndex: number = this.options["sequence"][this.messageIndex]["index"];
    let Dialog: Object = this.options[currentDialog];

    this.dialogMessageBox.alpha = 0;        
    this.dialogMessageBox.x = Dialog["x_axis"];
    this.dialogMessageBox.y = Dialog["y_axis"];
    this.addChild(this.dialogMessageBox);

    // 对话框背景
    let dialogPicture: egret.Bitmap = GameUtil.createBitmapByName(Dialog["picName"]);
    this.dialogMessageBox.addChild(dialogPicture);

    // 对话框文案
    this.dialogText.width = Dialog["textWidth"];
    this.dialogText.scrollRect = new egret.Rectangle(0, 0, this.dialogText.width, Dialog["textHeight"]);
    this.dialogText.textColor = 0x000000;
    this.dialogText.size = 36;
    this.dialogText.x = Dialog["text_x_axis"];
    this.dialogText.y = Dialog["text_y_axis"];
    this.dialogText.lineSpacing = 12;
    this.dialogText.multiline = true;
    this.dialogText.verticalAlign = egret.VerticalAlign.MIDDLE;
    this.dialogMessageBox.addChild(this.dialogText);

    
    egret.Tween.get(this.dialogMessageBox).to({
      alpha: 1
    }, 500).call(() => {

      // 查看当前comic页面背景
      let currentComicPic: string = this.options["sequence"][this.messageIndex]["mainPic"];
      if (!!currentComicPic) {
        let mainPic: egret.Bitmap = GameUtil.createBitmapByName(currentComicPic);
        mainPic.alpha = 0;        
        this.addChildAt(mainPic, 1);
        egret.Tween.get(mainPic).to({
          alpha: 1
        }, 1000)
        .call(() => {
          if (!!this.mainPicture.parent) this.mainPicture.parent.removeChild(this.mainPicture);
        })
      }

      this.typerEffect(this.dialogText, Dialog["messages"][currentMessageIndex], 20, () => {

        this.messageIndex ++;
        if (!!this.options["music"])  SoundManager.getInstance().playChapterMusic(this.options["music"]);
        if (this.messageIndex === this.limitedMessageNumber) {
          let data =  !!this.options["selections"] ? this.options["selections"] : "";
          this.dispatchEventWith(GameEvents.LOAD_NEXT_SECTION, true, data);
        } else {
          this.dispatchEventWith(GameEvents.LOAD_NEXT_DIALOG, true);
        }
      });
    })
  }

  public loadDialog () {
    egret.Tween.get(this.dialogMessageBox).to({
      alpha: 0
    }, 500).call(() => {
      if (!!this.dialogMessageBox.parent) this.dialogMessageBox.parent.removeChild(this.dialogMessageBox);
      this.dialogMessageBox = new egret.Sprite();
      if(!!this.dialogText.parent)  this.dialogText.parent.removeChild(this.dialogText);
      this.dialogText = new egret.TextField();
      this.initDialog();
    });
  }
  
  private typerEffect(obj, content: string = "", interval: number = 200, backFun: Function = null):void{
    let strArr: Array<any> = content.split("");
    let len: number = strArr.length;
    let currentHeight: number = obj.scrollRect.height;
  
    for (let i = 0; i < len; i++) {
      egret.setTimeout(function () {
        if (currentHeight < obj.height) {
          obj.scrollRect.y += 48;
          currentHeight = obj.height;
        }
        obj.appendText(strArr[Number(this)]);
        if ((Number(this) >= len - 1) && (backFun != null)) {
          backFun();
        }
      }, i, interval * i);              
    }
  }

}