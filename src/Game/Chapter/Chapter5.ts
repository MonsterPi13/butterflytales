class Chapter5 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  // 加载漫画点位标识
  private loadingDialogType: string = "cha5_01";

  // 点击是否加载选择框标识
  private selectionData: any[];

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha5_01: Comic3;
  private cha5_02: Comic3;

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
        picName: "ch5_01_jpg"
      },
      dialog1: {
        picName: "ch5_01_01_png",
        x_axis: 215,
        y_axis: 0,
        textWidth: 306,
        textHeight: 140,
        text_x_axis: 43,
        text_y_axis: 41,
        messages:[
          "晏子没回来，我再打电话联系她试试！",
        ]
      },
      dialog2: {
        picName: "ch5_01_02_png",
        x_axis: 50,
        y_axis: 110,
        textWidth: 308,
        textHeight: 139,
        text_x_axis: 54,
        text_y_axis: 51,
        messages:[
          "好！如果她回来了打电话给我！"
        ]
      },
      sequence: [{
        dialog: "dialog1",
        index: 0,
        mainContent: ""
      }, {
        dialog: "dialog2",
        index: 0,
        mainContent: ""
      }],
      selections: null
    }
    this.cha5_01 = new Comic3(options);
    this.mainContent.addChild(this.cha5_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha5_01") this.cha5_01.loadDialog();
      if (this.loadingDialogType === "cha5_02") this.cha5_02.loadDialog();
      this.isLoadingDialog = false;
      return;
    }

    if (!!this.selectionData) {
      let popup: PopUp = GameUtil.initPopup(this.selectionData);
      this.addChild(popup);
      return;
    }

    switch (this.picIndex) {
      case 1: 
        let options: Object = {
          mainPic: {
            picName: "ch5_02_jpg"
          },
          dialog1: {
            picName: "ch5_02_01_png",
            x_axis: 0,
            y_axis: 400,
            textWidth: 333,
            textHeight: 146,
            text_x_axis: 80,
            text_y_axis: 248,
            messages:[
              "卫祥和晏子说的不一样啊，这是怎么回事？",
            ]
          },
          sequence: [{
            dialog: "dialog1",
            index: 0,
            mainContent: ""
          }],
          selections: [{
              text: "这一定是恶作剧",
              branch: "LOAD_CHAPTER_6"
            }, {
              text: "可能真出事了，先报警再说",
              branch: "LOAD_CHAPTER_7"
            }
          ]
        }
        this.cha5_02 = new Comic3(options);
        this.cha5_02.y = 600;
        this.mainContent.addChild(this.cha5_02);
        this.loadingDialogType = "cha5_02";
        break;

      case 2:
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
      this.touchEnabled = true;
      this.selectionData = evt.data;
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