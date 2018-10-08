class Chapter4 extends egret.DisplayObjectContainer {

  private picIndex: number = 1;

  private mainContent: egret.Sprite;

  private cha4_01: Comic2;
  private cha4_02: Comic2;

  public constructor () {
    super();
    this.initView();
    this.addListenerEvent();
  }

  private initView () {
    this.mainContent = new egret.Sprite();
    this.addChild(this.mainContent);

    let bg: egret.Shape = new egret.Shape();
    bg.graphics.beginFill(0x000000);
    bg.graphics.drawRect(0, 0, GameData.STAGE_WIDTH, GameData.STAGE_HEIGHT);
    bg.graphics.endFill();
    this.mainContent.addChild(bg); 

    let ch4_01_Options = {
      pic: "ch4_01_png",
      tips_pic: "ch4_01_01_png",
      tips_pic_axis: {
        x: 80,
        y: 110
      },
      music: "ch4_01_mp3",
      animationType: "fadeIn"
    }
    this.cha4_01 = new Comic2(ch4_01_Options);
    this.addChild(this.cha4_01);
  }

  private onClickView () {
    this.touchEnabled = false;
    switch (this.picIndex) {
      case 1:
        let cha4_02_Options = {
          pic: "ch4_02_png",
          tips_pic: "",
          tips_pic_axis: {},
          music: "",
          animationType: ""
        }
        this.cha4_02 = new Comic2(cha4_02_Options);
        this.cha4_02.y = 265;
        this.addChild(this.cha4_02);
        break;

      case 2:
        this.removeChild(this.mainContent);
        let img: egret.Bitmap = GameUtil.createBitmapByName("ch4_end_jpg");
        img.width = GameData.STAGE_WIDTH;
        img.height = GameData.STAGE_HEIGHT;
        this.addChild(img);
        SoundManager.getInstance().playChapterMusic("ch4_end_mp3");
        this.touchEnabled = true;
        break;

      case 3:
        SceneController.GameEnd("end_branch_01");
        break;

    }
    this.picIndex ++;
  }

  private addListenerEvent () {
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this);

    this.addEventListener(GameEvents.LOAD_NEXT_COMIC, () => {
      this.touchEnabled = true;
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_SECTION, (evt: egret.Event) => {
      let popup: PopUp = GameUtil.initPopup(evt.data);
      this.addChild(popup);
    }, this);

    this.addEventListener(GameEvents.LOAD_NEXT_CHAPTER, (evt: egret.TouchEvent) => {
      GameUtil.loadNextChapter(this, evt.data);
    }, this);
  }
}