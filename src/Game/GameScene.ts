class GameScene extends egret.DisplayObjectContainer{
  public constructor () {
    super();
    this.name = "GameScene";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_1_2, this.loadChapter1_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_2, this.loadChapter2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_3, this.loadChapter3, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_4, this.loadChapter4, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_5, this.loadChapter5, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_6, this.loadChapter6, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_7, this.loadChapter7, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_7_2, this.loadChapter7_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_7_3, this.loadChapter7_3, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_7_4, this.loadChapter7_4, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_8_1, this.loadChapter8_1, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_8_2, this.loadChapter8_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_9_1, this.loadChapter9_1, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_9_2, this.loadChapter9_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_10_1, this.loadChapter10_1, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_10_2, this.loadChapter10_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_10_3, this.loadChapter10_3, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_11, this.loadChapter11, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_12_1, this.loadChapter12_1, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_12_2, this.loadChapter12_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_15_1, this.loadChapter15_1, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_15_2, this.loadChapter15_2, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_15_3, this.loadChapter15_3, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_15_4, this.loadChapter15_4, this);
    this.addEventListener(GameEvents.LOAD_CHAPTER_15_5, this.loadChapter15_5, this);
  }

  private initView () {
    this.initChapter1();
    // SceneController.GameEnd("end_branch_07");
  }

  private initChapter1 () {
    let chapter: Chapter1_1 = new Chapter1_1();
    this.addChild(chapter);
  }

  private loadChapter1_2 () {
    let chapter: Chapter1_2 = new Chapter1_2();
    this.addChild(chapter);
  }

  private loadChapter2 () {
    let chapter: Chapter2 = new Chapter2();
    this.addChild(chapter);
  }

  private loadChapter3 () {
    let chapter: Chapter3 = new Chapter3();
    this.addChild(chapter);
  }

  private loadChapter4 () {
    let chapter: Chapter4 = new Chapter4();
    this.addChild(chapter);
  }

  private loadChapter5 () {
    let chapter: Chapter5 = new Chapter5();
    this.addChild(chapter);
  }

  private loadChapter6 () {
    let chapter: Chapter6 = new Chapter6();
    this.addChild(chapter);
  }

  private loadChapter7 () {
    let chapter: Chapter7 = new Chapter7();
    this.addChild(chapter);
  }

  private loadChapter7_2 () {
    let chapter: Chapter7_2 = new Chapter7_2();
    this.addChild(chapter);
  }

  private loadChapter7_3 () {
    let chapter: Chapter7_3 = new Chapter7_3();
    this.addChild(chapter);
  }

  private loadChapter7_4 () {
    let chapter: Chapter7_4 = new Chapter7_4();
    this.addChild(chapter);
  }

  private loadChapter8_1 () {
    let chapter: Chapter8_1 = new Chapter8_1();
    this.addChild(chapter);
  }

  private loadChapter8_2 () {
    let chapter: Chapter8_2 = new Chapter8_2();
    this.addChild(chapter);
  }

  private loadChapter9_1 () {
    let chapter: Chapter9_1 = new Chapter9_1();
    this.addChild(chapter);
  }

  private loadChapter9_2 () {
    let chapter: Chapter9_2 = new Chapter9_2();
    this.addChild(chapter);
  }

  private loadChapter10_1 () {
    let chapter: Chapter10_1 = new Chapter10_1();
    this.addChild(chapter);
  }

  private loadChapter10_2 () {
    let chapter: Chapter10_2 = new Chapter10_2();
    this.addChild(chapter);
  }

  private loadChapter10_3 () {
    let chapter: Chapter10_3 = new Chapter10_3();
    this.addChild(chapter);
  }

  private loadChapter11 () {
    let chapter: Chapter11 = new Chapter11();
    this.addChild(chapter);
  }

  private loadChapter12_1 () {
    let chapter: Chapter12_1 = new Chapter12_1();
    this.addChild(chapter);
  }

  private loadChapter12_2 () {
    let chapter: Chapter12_2 = new Chapter12_2();
    this.addChild(chapter);
  }

  private loadChapter15_1 () {
    let chapter: Chapter15_1 = new Chapter15_1();
    this.addChild(chapter);
  }

  private loadChapter15_2 () {
    let chapter: Chapter15_2 = new Chapter15_2();
    this.addChild(chapter);
  }

  private loadChapter15_3 () {
    let chapter: Chapter15_3 = new Chapter15_3();
    this.addChild(chapter);
  }

  private loadChapter15_4 () {
    let chapter: Chapter15_4 = new Chapter15_4();
    this.addChild(chapter);
  }

  private loadChapter15_5 () {
    let chapter: Chapter15_5 = new Chapter15_5();
    this.addChild(chapter);
  }
}