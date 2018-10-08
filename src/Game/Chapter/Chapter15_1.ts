class Chapter15_1 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha15_1_01: Comic3;
  private cha15_1_02: Comic2;
  private cha15_1_03: Comic4;

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
    
    let cha15_1_01_options = {
      mainPic: {
        picName: "ch15_1_01_png"
      },
      dialog1: {
        picName: "ch15_1_01_01_png",
        x_axis: 60,
        y_axis: 300,
        textWidth: 369,
        textHeight: 182,
        text_x_axis: 90,
        text_y_axis: 96,
        messages:[
          "小茹！我是卫祥！我和晏子刚才路过一家废弃医院，她突然冲了进去！",
          "我跟进去没找到她，她回来了吗？"
        ]
      },
      dialog2: {
        picName: "ch15_1_01_02_png",
        x_axis: 70,
        y_axis: 250,
        textWidth: 250,
        textHeight: 134,
        text_x_axis: 50,
        text_y_axis: 100,
        messages:[
          "晏子没回来啊！你先别急，我马上过去！",
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
        mainPic: ""
      }],
      selections: [],
      music: ""
    }
    this.cha15_1_01 = new Comic3(cha15_1_01_options);
    this.mainContent.addChild(this.cha15_1_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.cha15_1_01.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let cha15_1_02_options = {
          pic: "ch15_1_02_png",
          tips_pic: "",
          music: "ch7_01_mp3",
          animationType: ""
        }
        this.cha15_1_02 = new Comic2(cha15_1_02_options);
        this.cha15_1_02.x = 613;
        this.cha15_1_02.y = 176;
        this.mainContent.addChild(this.cha15_1_02);
        break;

      case 2:
        let cha15_1_03_options = {
          pic: "ch15_1_03_jpg",
          tips_pics: [{
            pic: "ch2_04_02_png",
            x_axis: 160,
            y_axis: 290 
          }, {
            pic: "ch2_04_01_png",
            x_axis: 440,
            y_axis: 130
          }, {
            pic: "ch2_04_03_png",
            x_axis: 530,
            y_axis: 480 
          }],
          music: "ch2_04_mp3",
          animationType: "bounceIn"
        }
        this.cha15_1_03 = new Comic4(cha15_1_03_options);
        this.cha15_1_03.y = this.cha15_1_01.height;
        this.mainContent.addChild(this.cha15_1_03);
        break;

      case 3:
        // GameUtil.loadNextChapter(this, GameEvents.LOAD_CHAPTER_15_2);
        let selections = [{
          text: "直接开门",
          branch: "LOAD_CHAPTER_4"
        }, {
          text: "看猫眼",
          branch: "LOAD_CHAPTER_15_2"
        }];
        let popup: PopUp = GameUtil.initPopup(selections);
        this.addChild(popup);
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