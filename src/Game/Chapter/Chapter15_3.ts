class Chapter15_3 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha15_3_01: Comic2;
  private cha15_3_02: Comic3;

  public constructor () {
    super();
    this.initView();
    this.addListenerEvent();
  }

  private initView () {
    this.mainContent.width = GameData.STAGE_WIDTH;
    this.mainContent.height = GameData.STAGE_HEIGHT;
    this.addChild(this.mainContent);

    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.mainContent.addChild(bg);
    
    let cha15_3_01_options = {
      pic: "ch15_3_01_png",
      tips_pic: "",
      music: "ch4_01_mp3",
      animationType: ""
    }
    this.cha15_3_01 = new Comic2(cha15_3_01_options);
    this.mainContent.addChild(this.cha15_3_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.cha15_3_02.loadDialog();
      this.isLoadingDialog = false;
      return;
    }
    switch (this.picIndex) {
      case 1: 
        let cha15_3_02_options = {
          mainPic: {
            picName: "ch15_3_02_png"
          },
          dialog1: {
            picName: "ch15_3_02_02_png",
            x_axis: 310,
            y_axis: 400,
            textWidth: 180,
            textHeight: 66,
            text_x_axis: 239,
            text_y_axis: 317,
            messages:[
              "那是什么？",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: "ch15_3_02_01_png"
          }],
          selections: [],
          music: ""
        }
        this.cha15_3_02 = new Comic3(cha15_3_02_options);
        this.mainContent.addChild(this.cha15_3_02);
        break;

      case 2:
        GameUtil.loadNextChapter(this, GameEvents.LOAD_CHAPTER_15_4);
        break;
    }
    this.picIndex ++;
  }

  private addListenerEvent () {
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);

    this.addEventListener(GameEvents.LOAD_NEXT_DIALOG, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.isLoadingDialog = true;
    }, this);

    // comic3派发的事件，根据data来判断是加载下一漫画还是章节
    this.addEventListener(GameEvents.LOAD_NEXT_SECTION, (evt: egret.Event) => {
      let data = evt.data;
      this.touchEnabled = true;
      if (data.length === 0) return;

      egret.setTimeout(() => {
        let popup: PopUp = GameUtil.initPopup(data);
        this.addChild(popup);
      }, this, 1000);
    }, this);

    // comic派发的事件，加载下一副漫画
    this.addEventListener(GameEvents.LOAD_NEXT_COMIC, () => {
      this.touchEnabled = true;
    }, this);

    // popup选择后派发的时间，加载下一章节
    this.addEventListener(GameEvents.LOAD_NEXT_CHAPTER, (evt: egret.TouchEvent) => {
      // console.log(evt.data);
      GameUtil.loadNextChapter(this, evt.data);
    }, this);
  }

  private initEndImg () {
    this.removeChild(this.mainContent);
    let img: egret.Bitmap = GameUtil.createBitmapByName("ch4_end_jpg");
    img.width = GameData.STAGE_WIDTH;
    img.height = GameData.STAGE_HEIGHT;
    this.addChild(img);
    SoundManager.getInstance().playChapterMusic("ch4_end_mp3");
  }
}