class Chapter1_2 extends egret.DisplayObjectContainer{
  
  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  // 点击是否加载选择框标识
  private selectionData: any[];

  private cha1_2_01: Comic2;
  private cha1_2_02: Comic2;
  private cha1_2_03: Comic3;

  public constructor () {
    super();
    this.initView();
    this.addListenerEvent();
  }

  public initView () {
    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.addChild(bg);    

    let cha1_2_01_Options = {
      pic: "ch1_2_01_png",
      tips_pic: "ch1_2_02_png",
      tips_pic_axis: {
        x: 0,
        y: 30
      },
      music: "ch1_2_01_mp3",
      animationType: "tada"
    }
    this.cha1_2_01 = new Comic2(cha1_2_01_Options);
    this.addChild(this.cha1_2_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      this.isLoadingDialog = false;
      this.cha1_2_03.loadDialog();
      return;
    }

    if (!!this.selectionData) {
      let popup: PopUp = GameUtil.initPopup(this.selectionData);
      this.addChild(popup);
      return;
    }

    switch (this.picIndex) {
      case 1:
        SoundManager.getInstance().stopChapterMusic("ch1_2_01_mp3");
        this.cha1_2_01.stopAnimateTipsPic();

        let cha1_2_02_Options = {
          pic: "ch1_2_03_png",
          tips_pic: "ch1_2_04_png",
          tips_pic_axis: {
            x: 330,
            y: 100
          },
          music: "ch1_2_02_mp3",
          animationType: "fadeIn"
        }
        this.cha1_2_02 = new Comic2(cha1_2_02_Options);        
        this.cha1_2_02.x = 340;
        this.addChild(this.cha1_2_02);
        break;

      case 2:
        SoundManager.getInstance().stopChapterMusic("ch1_2_02_mp3");
        
        let options: Object = {
          mainPic: {
            picName: "ch1_2_05_png"
          },
          dialog1: {
            picName: "ch1_2_06_png",
            x_axis: 520,
            y_axis: 590,
            textWidth: 290,
            textHeight: 140,
            text_x_axis: 78,
            text_y_axis: 110,
            messages:[
              "你好，你找哪位？",
              "晏子？怎么了？"
            ]
          },
          dialog2: {
            picName: "ch1_2_07_png",
            x_axis: 60,
            y_axis: 330,
            textWidth: 290,
            textHeight: 205,
            text_x_axis: 50,
            text_y_axis: 66,
            messages:[
              "小茹！",          
              "卫祥和我路过城西头的废弃医院时突然跑了进去，还叫我跟他一起进去。",
              "我胆子小，在门口等了他一个小时了他还没出来！",
              "我好害怕！他不会出什么事了吧？"
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
            dialog: "dialog1",
            index: 1,
            mainPic: ""
          }, {
            dialog: "dialog2",
            index: 1,
            mainPic: ""
          }, {
            dialog: "dialog2",
            index: 2,
            mainPic: "ch1_2_05_01_png"
          }, {
            dialog: "dialog2",
            index: 3,
            mainPic: ""
          }],
          selections: [{
            text: "安慰她",
            branch: "LOAD_CHAPTER_2"
          }, {
            text: "去找她",
            branch: "LOAD_CHAPTER_8_1"
          }]
        }
        this.cha1_2_03 = new Comic3(options);
        this.cha1_2_03.y = 300;
        this.addChild(this.cha1_2_03);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);
        break;
    }
    this.picIndex ++;
  }

  private addListenerEvent () {
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);

    this.addEventListener(GameEvents.LOAD_NEXT_COMIC, () => {
      this.touchEnabled = true;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_DIALOG, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.isLoadingDialog = true;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_SECTION, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.selectionData = evt.data;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_CHAPTER, (evt: egret.TouchEvent) => {
      // console.log(evt.data);
      GameUtil.loadNextChapter(this, evt.data);
    }, this);
  }
}