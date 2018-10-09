class Chapter12_1 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  // 加载漫画点位标识
  private loadingDialogType: string = "cha12_1_02";

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha12_1_01: Comic2;
  private cha12_1_02: Comic3;
  private cha12_1_03: Comic3;
  private cha12_1_04: Comic3;
  // private cha10_1_03: Comic2;
  // private cha10_1_04: Comic2;

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
  
    let cha12_1_01_options = {
      pic: "ch12_1_01_png",
      tips_pic: "",
      music: "",
      animationType: ""
    }
    this.cha12_1_01 = new Comic2(cha12_1_01_options);
    this.mainContent.addChild(this.cha12_1_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha12_1_02")  this.cha12_1_02.loadDialog();
      if (this.loadingDialogType === "cha12_1_03")  this.cha12_1_03.loadDialog();
      if (this.loadingDialogType === "cha12_1_04")  this.cha12_1_04.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha12_1_02_options = {
          mainPic: {
            picName: "ch12_1_02_png"
          },
          dialog1: {
            picName: "ch12_1_02_01_png",
            x_axis: 390,
            y_axis: 20,
            textWidth: 207,
            textHeight: 100,
            text_x_axis: 90,
            text_y_axis: 60,
            messages:[
              "看电视熬到天亮再说吧。"
            ]
          },
          dialog2: {
            picName: "ch12_1_02_02_png",
            x_axis: 225,
            y_axis: 425,
            textWidth: 261,
            textHeight: 140,
            text_x_axis: 57,
            text_y_axis: 37,
            messages:[
              "下面为您播报一条突发新闻。",
              "今夜12时左右，我市废弃医院发现两人遇害。"
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: ""
          }, {
            dialog: "dialog2",
            index: 0,
            mainPic: ""
          }, {
            dialog: "dialog2",
            index: 1,
            mainPic: "ch12_1_02_03_png"
          }],
          selections: [],
          music: ""
        }
        this.cha12_1_02 = new Comic3(cha12_1_02_options);
        this.mainContent.addChild(this.cha12_1_02);
        break;

      case 2: 

        let cha12_1_03_options = {
          mainPic: {
            picName: "ch12_1_03_jpg"
          },
          dialog1: {
            picName: "ch12_1_03_01_png",
            x_axis: 385,
            y_axis: 175,
            textWidth: 344,
            textHeight: 143,
            text_x_axis: 84,
            text_y_axis: 64,
            messages:[
              "目前警方已封锁现场。"
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
        this.cha12_1_03 = new Comic3(cha12_1_03_options);
        this.cha12_1_03.y = this.cha12_1_02.height;
        this.mainContent.addChild(this.cha12_1_03);
        this.loadingDialogType = "cha12_1_03"
        break;
      case 3: 

        let cha12_1_04_options = {
          mainPic: {
            picName: "ch12_1_03_02_jpg"
          },
          dialog1: {
            picName: "ch12_1_03_05_png",
            x_axis: 330,
            y_axis: 450,
            textWidth: 254,
            textHeight: 132,
            text_x_axis: 18,
            text_y_axis: 20,
            messages:[
              "据知情人士透露，两名死者中男性为卫某。",
              "女性为晏某。两人为情侣关系。",
              "案发现场还发现受害者血书。",
              "我台将持续为您追踪报道。"
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: ""
          }, {
            dialog: "dialog1",
            index: 1,
            mainPic: "ch12_1_03_03_jpg"
          }, {
            dialog: "dialog1",
            index: 2,
            mainPic: "ch12_1_03_04_jpg"
          }, {
            dialog: "dialog1",
            index: 3,
            mainPic: "ch12_1_03_04_jpg"
          }],
          selections: [],
          music: ""
        }
        this.cha12_1_04 = new Comic3(cha12_1_04_options);
        this.cha12_1_04.y = this.cha12_1_02.height;
        this.mainContent.addChild(this.cha12_1_04);
        this.loadingDialogType = "cha12_1_04"
        break;

        case 4:
          GameUtil.loadNextChapter(this, "LOAD_CHAPTER_12_2");
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
}