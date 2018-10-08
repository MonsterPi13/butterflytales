class Chapter3 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;
  private isLoadingDialog: boolean = false;

  // 加载漫画点位标识
  private loadingDialogType: string = "cha3_01";

  // 点击是否加载选择框标识
  private selectionData: any[];

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha3_01: Comic3;
  private cha3_02: Comic3;

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
        picName: "ch3_01_jpg"
      },
      dialog1: {
        picName: "ch3_01_01_png",
        x_axis: 135,
        y_axis: 280,
        textWidth: 215,
        textHeight: 100,
        text_x_axis: 60,
        text_y_axis: 75,
        messages:[
          "谁？！"
        ]
      },
      sequence: [{
        dialog: "dialog1",
        index: 0
      }],
      selections: null
    }
    this.cha3_01 = new Comic3(options);
    this.mainContent.addChild(this.cha3_01);
  }

  private onClickView () {
    this.touchEnabled = false;

    if (this.isLoadingDialog) {
      if (this.loadingDialogType === "cha3_01") this.cha3_01.loadDialog();
      if (this.loadingDialogType === "cha3_02") this.cha3_02.loadDialog();
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
            picName: "ch3_02_jpg"
          },
          dialog1: {
            picName: "ch3_02_01_png",
            x_axis: 260,
            y_axis: 130,
            textWidth: 445,
            textHeight: 220,
            text_x_axis: 110,
            text_y_axis: 60,
            messages:[
              "是我！卫祥！我和晏子刚才路过一家废弃医院，她突然冲了进去！我跟进去没找到她，她回来了吗？你快开门！"
            ]
          },
          dialog2: {
          },
          sequence: [{
            dialog: "dialog1",
            index: 0
          }],
          selections: [{
            text: "开门",
            branch: "LOAD_CHAPTER_4"
          }, {
            text: "不开门",
            branch: "LOAD_CHAPTER_5"
          }]
        }
        this.cha3_02 = new Comic3(options);
        this.cha3_02.y = 530;
        this.mainContent.addChild(this.cha3_02);

        this.loadingDialogType = "cha3_02";
        break;


    }
    this.picIndex ++;
  }

  private addListenerEvent () {
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);

    // comic3派发的事件，根据data来判断是加载下一漫画还是章节
    this.addEventListener(GameEvents.LOAD_NEXT_SECTION, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.selectionData = evt.data;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_DIALOG, (evt: egret.Event) => {
      this.touchEnabled = true;
      this.isLoadingDialog = true;
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