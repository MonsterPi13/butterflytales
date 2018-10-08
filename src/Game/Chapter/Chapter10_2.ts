class Chapter10_2 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;
  
  // 加载漫画点位标识
  private loadingDialogType: string = "cha10_2_02";

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha10_2_01: Comic2;
  private cha10_2_02: Comic3;
  private cha10_2_03: Comic3;
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
  
    let cha10_2_01_options = {
      pic: "ch10_2_01_jpg",
      tips_pic: "ch10_2_01_01_png",
      tips_pic_axis: {
        x: 525,
        y: 290
      },
      music: "ch10_2_01_mp3",
      animationType: "fadeIn"
    }
    this.cha10_2_01 = new Comic2(cha10_2_01_options);
    this.mainContent.addChild(this.cha10_2_01);
  }

  private onClickView () {
    this.touchEnabled = false;

    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha10_2_02") this.cha10_2_02.loadDialog();
      if (this.loadingDialogType === "cha10_2_03") this.cha10_2_03.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha10_2_02_options = {
          mainPic: {
            picName: "ch10_2_02_jpg"
          },
          dialog1: {
            picName: "ch10_2_02_01_png",
            x_axis: 125,
            y_axis: 0,
            textWidth: 261,
            textHeight: 101,
            text_x_axis: 70,
            text_y_axis: 67,
            messages:[
              "喂！晏子！"
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
        this.cha10_2_02 = new Comic3(cha10_2_02_options);
        this.cha10_2_02.y = 409;
        this.mainContent.addChild(this.cha10_2_02);
        break;

      case 2: 
        let cha10_2_03_options = {
          mainPic: {
            picName: "ch10_2_03_jpg"
          },
          dialog1: {
            picName: "ch10_2_03_01_png",
            x_axis: 410,
            y_axis: 10,
            textWidth: 261,
            textHeight: 140,
            text_x_axis: 120,
            text_y_axis: 66,
            messages:[
              "小茹！卫祥他，好像有点不...不对劲..."
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainPic: "ch10_2_03_02_jpg"
          }],
          selections: [],
          music: ""
        }
        this.cha10_2_03 = new Comic3(cha10_2_03_options);
        this.cha10_2_03.y = 914;
        this.mainContent.addChild(this.cha10_2_03);
        this.loadingDialogType = "cha10_2_03"
        break;

      case 3: 
        GameUtil.loadNextChapter(this, "LOAD_CHAPTER_10_3");
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