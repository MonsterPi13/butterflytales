class Chapter8_2 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  // 点击事件来加载漫画对话标识
  private isLoadingDialog: boolean = false;

  private mainContent: egret.Sprite = new egret.Sprite();

  private cha8_2_01: Comic2;
  private cha8_2_02: Comic2;
  private cha8_2_02_02: Comic2;
  private cha8_2_03: Comic2;

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
  
    let cha8_2_01_options = {
      pic: "ch8_2_01_jpg",
      tips_pic: "",
      music: "ch8_2_01_mp3",
      animationType: ""
    }
    this.cha8_2_01 = new Comic2(cha8_2_01_options);
    this.mainContent.addChild(this.cha8_2_01);
  }

  private onClickView () {
    this.touchEnabled = false;

    switch (this.picIndex) {
      case 1: 
        let cha8_2_02_options = {
          pic: "ch8_2_02_jpg",
          tips_pic: "",
          music: "",
          animationType: ""
        }
        this.cha8_2_02 = new Comic2(cha8_2_02_options);
        this.cha8_2_02.y = 625;
        this.mainContent.addChild(this.cha8_2_02);
        break;

      case 2: 
        let cha8_2_02_02_options = {
          pic: "ch8_2_02_02_jpg",
          tips_pic: "",
          music: "",
          animationType: ""
        }
        this.cha8_2_02_02 = new Comic2(cha8_2_02_02_options);
        this.cha8_2_02_02.y = 625;
        this.mainContent.addChild(this.cha8_2_02_02);
        break;

      case 3: 
        let cha8_2_03_options = {
          pic: "ch8_2_03_jpg",
          tips_pic: "",
          music: "",
          animationType: ""
        }
        this.cha8_2_03 = new Comic2(cha8_2_03_options);
        this.cha8_2_03.y = 1095;
        this.mainContent.addChild(this.cha8_2_03);
        break;

      case 4:
        let selections = [{
          text: "不理他",
          branch: "LOAD_CHAPTER_9_1"
        }, {
          text: "停车询问",
          branch: "LOAD_CHAPTER_10_1"
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