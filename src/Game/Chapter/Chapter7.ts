class Chapter7 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha7_01: Comic2;
  private cha7_02: Comic2;
  private cha7_03: Comic3;
  private cha7_04: Comic3;

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
    
    let cha7_01_options = {
      pic: "ch7_01_png",
      tips_pic: "",
      music: "ch7_01_mp3",
      animationType: ""
    }
    this.cha7_01 = new Comic2(cha7_01_options);
    this.mainContent.addChild(this.cha7_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.cha7_03.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha7_02_options = {
          pic: "ch7_02_png",
          tips_pic: "",
          music: "ch7_02_mp3",
          animationType: ""
        }
        this.cha7_02 = new Comic2(cha7_02_options);
        this.cha7_02.x = 425;
        this.mainContent.addChild(this.cha7_02);
        break;

      case 2:
        let cha7_03_options: Object = {
          mainPic: {
            picName: "ch7_03_png"
          },
          dialog1: {
            picName: "ch7_03_01_png",
            x_axis: 0,
            y_axis: 700,
            textWidth: 328,
            textHeight: 200,
            text_x_axis: 56,
            text_y_axis: 123,
            messages:[
              "警察局吗？我有两个朋友现在很反常，我担心他们出什么事了。",
              "我住在蝴蝶社区4座03，能赶紧派警察过来吗？"
            ]
          },
          dialog2: {
            picName: "ch7_04_01_png",
            x_axis: 365,
            y_axis: 740,
            textWidth: 369,
            textHeight: 182,
            text_x_axis: 90,
            text_y_axis: 96,
            messages:[
              "蝴蝶社区4座03？你锁好门窗！警察马上就到！",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: ""
          }, {
            dialog: "dialog1",
            index: 1,
            mainPic: ""
          }, {
            dialog: "dialog2",
            index: 0,
            mainPic: "ch7_04_png"
          }],
          selections: []
        }
        this.cha7_03 = new Comic3(cha7_03_options);
        this.cha7_03.y = 400;
        this.mainContent.addChild(this.cha7_03);
        break;

      case 3:
         GameUtil.loadNextChapter(this, "LOAD_CHAPTER_7_2");
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