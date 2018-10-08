class Chapter7_3 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  // 加载漫画点位标识
  private loadingDialogType: string = "cha7_3_01";

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha7_3_01: Comic3;
  private cha7_3_02: Comic3;

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
    
    let cha7_3_01_options: Object = {
      mainPic: {
        picName: "ch7_3_01_jpg"
      },
      dialog1: {
        picName: "ch7_3_01_01_png",
        x_axis: 260,
        y_axis: 270,
        textWidth: 248,
        textHeight: 91,
        text_x_axis: 47,
        text_y_axis: 56,
        messages:[
          "你认识这两个人吗？",
        ]
      },
      sequence: [{
        dialog: "dialog1",
        index: 0,
        mainPic: ""
      }],
      selections: []
    }
    this.cha7_3_01 = new Comic3(cha7_3_01_options);
    this.mainContent.addChild(this.cha7_3_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha7_3_01") this.cha7_3_01.loadDialog();
      if (this.loadingDialogType === "cha7_3_02") this.cha7_3_02.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha7_3_02_options: Object = {
          mainPic: {
            picName: "ch7_3_02_jpg"
          },
          dialog1: {
            picName: "ch7_3_02_01_png",
            x_axis: 500,
            y_axis: 631,
            textWidth: 330,
            textHeight: 149,
            text_x_axis: 85,
            text_y_axis: 76,
            messages:[
              "认识，晏子和卫祥，他们怎么了？",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: ""
          }],
          selections: []
        }
        this.cha7_3_02 = new Comic3(cha7_3_02_options);
        this.cha7_3_02.y = 631;
        this.mainContent.addChild(this.cha7_3_02);
        this.loadingDialogType = "cha7_3_02";
        break;
      case 2:
        GameUtil.loadNextChapter(this, "LOAD_CHAPTER_7_4");
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