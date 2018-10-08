class Chapter15_2 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;


  private mainContent: egret.Sprite = new egret.Sprite();

  private cha15_2_01: Comic2;
  private cha15_2_02: Comic2;
  private cha15_2_03: Comic3;

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
    
    let cha15_2_01_options = {
      pic: "ch15_2_01_jpg",
      tips_pic: "",
      music: "",
      animationType: ""
    }
    this.cha15_2_01 = new Comic2(cha15_2_01_options);
    this.mainContent.addChild(this.cha15_2_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.cha15_2_03.loadDialog();
      this.isLoadingDialog = false;
      return;
    }
    switch (this.picIndex) {
      case 1: 
        let cha15_2_02_options = {
          pic: "ch15_2_02_jpg",
          tips_pic: "",
          music: "",
          animationType: ""
        }
        this.cha15_2_02 = new Comic2(cha15_2_02_options);
        this.cha15_2_02.y = this.cha15_2_01.height;
        this.mainContent.addChild(this.cha15_2_02);
        break;

      case 2:
        let cha15_1_03_options = {
          mainPic: {
            picName: "ch15_2_03_jpg"
          },
          dialog1: {
            picName: "ch15_2_03_01_png",
            x_axis: 30,
            y_axis: 200,
            textWidth: 264,
            textHeight: 161,
            text_x_axis: 145,
            text_y_axis: 252,
            messages:[
              "没人啊？那是谁在敲门？",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: ""
          }],
          selections: [],
          music: ""
        }
        this.cha15_2_03 = new Comic3(cha15_1_03_options);
        this.cha15_2_03.y = this.cha15_2_01.height + this.cha15_2_02.height;
        this.mainContent.addChild(this.cha15_2_03);
        break;

      case 3:
        GameUtil.loadNextChapter(this, GameEvents.LOAD_CHAPTER_15_3);
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