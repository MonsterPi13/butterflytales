class Chapter2 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha1_2_01: Comic2;
  private cha1_2_02: Comic2;
  private cha1_2_03: Comic3;

  private cha2_01: Comic2;
  private cha2_02: Comic2;
  private cha2_03: Comic4;

  public constructor () {
    super();
    this.initView();
    this.addListenerEvent();
  }

  public initView () {
    this.mainContent.width = GameData.STAGE_WIDTH;
    this.mainContent.height = GameData.STAGE_HEIGHT;
    this.addChild(this.mainContent);

    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.mainContent.addChild(bg);    

    let cha1_2_01_Options = {
      pic: "ch1_2_01_png",
      tips_pic: "ch1_2_02_png",
      tips_pic_axis: {
        x: 0,
        y: 30
      },
      music: "",
      animationType: ""
    }
    this.cha1_2_01 = new Comic2(cha1_2_01_Options);
    this.mainContent.addChild(this.cha1_2_01);

    let cha1_2_02_Options = {
      pic: "ch1_2_03_png",
      tips_pic: "ch1_2_04_png",
      tips_pic_axis: {
        x: 330,
        y: 100
      },
      music: "",
      animationType: ""
    }
    this.cha1_2_02 = new Comic2(cha1_2_02_Options);
    this.cha1_2_02.x = 340;
    this.mainContent.addChild(this.cha1_2_02);
    let options: Object = {
      mainPic: {
        picName: "ch1_2_05_01_png"
      },
      dialog1: {
        picName: "ch1_2_06_png",
        x_axis: 560,
        y_axis: 600,
        textWidth: 290,
        textHeight: 140,
        text_x_axis: 78,
        text_y_axis: 110,
        messages:[
          "晏子，你先别着急，卫祥他不会有事的。",          
          "喂？你听得见吗？晏子？！",
        ]
      },
      dialog2: {},
      sequence: [{
        dialog: "dialog1",
        index: 0,
        mainPic: ""
      }, {
        dialog: "dialog1",
        index: 1,
        mainPic: ""
      }],
      selections: [{
        text: "安慰她",
        branch: "LOAD_CHAPTER_2"
      }, {
        text: "去找她",
        branch: "LOAD_CHAPTER_2"
      }]
    }
    this.cha1_2_03 = new Comic3(options);
    this.cha1_2_03.y = 300;
    this.mainContent.addChild(this.cha1_2_03);
  }

  private initChapter2View() {
    this.mainContent = new egret.Sprite();
    this.addChild(this.mainContent);

    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.mainContent.addChild(bg); 

    let cha2_01_Options = {
      pic: "ch2_01_png",
      tips_pic: "ch2_02_png",
      tips_pic_axis: {
        x: 120,
        y: 40
      },
      music: "ch2_01_mp3",
      animationType: "fadeIn"
    }
    this.cha2_01 = new Comic2(cha2_01_Options);
    this.mainContent.addChild(this.cha2_01);
  }

  private addListenerEvent () {
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);

    this.addEventListener(GameEvents.LOAD_NEXT_SECTION, (evt: egret.Event) => {
      egret.setTimeout(() => {
        egret.Tween.get(this.mainContent).to({
          alpha: 0
        }, 1000).call(() => {
          this.removeChild(this.mainContent);
          this.initChapter2View();
        })
      }, this, 1000)
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_COMIC, () => {
      this.touchEnabled = true;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_DIALOG, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.isLoadingDialog = true;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_CHAPTER, (evt: egret.TouchEvent) => {
      GameUtil.loadNextChapter(this, evt.data);
    }, this);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.cha1_2_03.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    switch (this.picIndex) {
      case 1: 
        SoundManager.getInstance().stopChapterMusic("ch2_01_mp3");
        let cha2_02_Options = {
          pic: "ch2_03_png",
          tips_pic: "",
          tips_pic_axis: {
            x: 120,
            y: 40
          },
          music: "",
          animationType: ""
        }
        this.cha2_02 = new Comic2(cha2_02_Options);
        this.cha2_02.x = 455;
        this.mainContent.addChild(this.cha2_02);
        break;

      case 2:
        let cha2_03_Options = {
          pic: "ch2_04_png",
          tips_pics: [{
            pic: "ch2_04_02_png",
            x_axis: 290,
            y_axis: 550 
          }, {
            pic: "ch2_04_01_png",
            x_axis: 580,
            y_axis: 350
          }, {
            pic: "ch2_04_03_png",
            x_axis: 630,
            y_axis: 710 
          }],
          music: "ch2_04_mp3",
          animationType: "bounceIn"
        }
        this.cha2_03 = new Comic4(cha2_03_Options);
        this.cha2_03.y = 355;
        this.mainContent.addChild(this.cha2_03);
        break;

      case 3:
        SoundManager.getInstance().stopChapterMusic("ch2_04_mp3");
        // this.cha2_03.stopAnimateTipsPic();
        let selections = [{
          text: "询问",
          branch: "LOAD_CHAPTER_3"
        }, {
          text: "保持沉默",
          branch: "LOAD_CHAPTER_11"
        }];
        let popup: PopUp = GameUtil.initPopup(selections);
        this.addChild(popup);
        break;
    }
    this.picIndex ++;
  }
}