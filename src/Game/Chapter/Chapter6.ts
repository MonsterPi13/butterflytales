class Chapter6 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  // 加载漫画点位标识
  private loadingDialogType: string = "cha6_01";

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha6_01: Comic3;
  private cha6_02: Comic2;
  private cha6_03: Comic3;
  private cha6_04: Comic3;

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
    
    let options: Object = {
      mainPic: {
        picName: "ch6_01_png"
      },
      dialog1: {
        picName: "ch6_01_01_png",
        x_axis: 0,
        y_axis: 260,
        textWidth: 260,
        textHeight: 90,
        text_x_axis: 40,
        text_y_axis: 190,
        messages:[
          "这种小伎俩我怎么会上当。",
          "一定要臭骂他们一顿！"
        ]
      },
      sequence: [{
        dialog: "dialog1",
        index: 0,
        mainContent: ""
      }, {
        dialog: "dialog1",
        index: 1,
        mainContent: ""
      }],
      selections: null
    }
    this.cha6_01 = new Comic3(options);
    this.mainContent.addChild(this.cha6_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha6_01") this.cha6_01.loadDialog();
      if (this.loadingDialogType === "cha6_03") this.cha6_03.loadDialog();
      if (this.loadingDialogType === "cha6_04") this.cha6_04.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha6_02_options = {
          pic: "ch6_02_png",
          tips_pic: "",
          music: "ch6_02_mp3",
          animationType: ""
        }
        this.cha6_02 = new Comic2(cha6_02_options);
        this.cha6_02.x = 370;
        this.mainContent.addChild(this.cha6_02);
        break;

      case 2:
        let cha6_03_options: Object = {
          mainPic: {
            picName: "ch6_03_png"
          },
          dialog1: {
            picName: "ch6_03_01_png",
            x_axis: 0,
            y_axis: 800,
            textWidth: 380,
            textHeight: 215,
            text_x_axis: 46,
            text_y_axis: 89,
            messages:[
              "喂？晏子！刚才卫祥都穿帮啦！我才不会上当！你现在在哪呢？",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainContent: ""
          }],
          selections: []
        }
        this.cha6_03 = new Comic3(cha6_03_options);
        this.cha6_03.y = 360;
        this.mainContent.addChild(this.cha6_03);
        this.loadingDialogType = "cha6_03";
        
        break;

      case 3:
        this.removeChild(this.mainContent);
        let cha6_04_options: Object = {
          mainPic: {
            picName: "ch6_04_jpg",
            mainPicTime: 2000
          },
          dialog1: {
            picName: "ch6_04_01_png",
            x_axis: 510,
            y_axis: 160,
            textWidth: 333,
            textHeight: 164,
            text_x_axis: 77,
            text_y_axis: 62,
            messages:[
              "我在家啊。",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainContent: ""
          }],
          selections: [],
          music: ""
        }
        this.cha6_04 = new Comic3(cha6_04_options);
        SoundManager.getInstance().playChapterMusic("ch6_04_mp3");
        this.addChild(this.cha6_04);
        this.loadingDialogType = "cha6_04";
        break;

      case 4:
        SceneController.GameEnd("end_branch_02");
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