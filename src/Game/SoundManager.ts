class SoundManager {

	// 场景一背景音乐
	private chapter1_sound: egret.Sound; 

	// 场景1_2电话声音
	private chapter1_2_01: egret.Sound;
	private chapter1_2_01_soundChannel: egret.SoundChannel;

	// 场景1_2时钟声音
	private chapter1_2_02: egret.Sound;
	private chapter1_2_02_soundChannel: egret.SoundChannel;

	// 场景2_1电话挂断声音
	private chapter2_01: egret.Sound;
	private chapter2_01_soundChannel: egret.SoundChannel;

	// 场景2_2敲门声音
	private chapter2_04: egret.Sound;
	private chapter2_04_soundChannel: egret.SoundChannel;

	// 场景4开门声
	private chapter4_01: egret.Sound;
	private chapter4_01_soundChannel: egret.SoundChannel;

	// 场景4结束尖叫声
	private chapter4_end: egret.Sound;
	private chapter4_end_soundChannel: egret.SoundChannel;

	// 场景6搁置电话声音
	private chapter6_02: egret.Sound;
	private chapter6_02_soundChannel: egret.SoundChannel;

	// 场景6晏子出现声音
	private chapter6_04: egret.Sound;
	private chapter6_04_soundChannel: egret.SoundChannel;

	// 场景7拿起电话声音
	private chapter7_01: egret.Sound;
	private chapter7_01_soundChannel: egret.SoundChannel;

	// 场景7拨打电话声音
	private chapter7_02: egret.Sound;
	private chapter7_02_soundChannel: egret.SoundChannel;

	// 场景7_2警车声音
	private chapter7_2_01: egret.Sound;
	private chapter7_2_01_soundChannel: egret.SoundChannel;

	// 场景7_4庆祝音乐
	private chapter7_4_01: egret.Sound;
	private chapter7_4_01_soundChannel: egret.SoundChannel;

	// 场景8_1启动车子
	private chapter8_1_04: egret.Sound;
	private chapter8_1_04_soundChannel: egret.SoundChannel;

	// 场景8_2开车声音
	private chapter8_2_01: egret.Sound;
	private chapter8_2_01_soundChannel: egret.SoundChannel;

	// 场景8_3电话声音
	private chapter9_1_03: egret.Sound;
	private chapter9_1_03_soundChannel: egret.SoundChannel;

	// 场景8_4电话铃声
	private chapter9_1_04: egret.Sound;
	private chapter9_1_04_soundChannel: egret.SoundChannel;

	// 场景8_4电话铃声
	private chapter9_2_01: egret.Sound;
	private chapter9_2_01_soundChannel: egret.SoundChannel;

	// 脚步声
	private chapter10_2_01: egret.Sound;
	private chapter10_2_01_soundChannel: egret.SoundChannel;

	private chapter10_3_01: egret.Sound;
	private chapter10_3_01_soundChannel: egret.SoundChannel;

	// 心跳声
	private chapter11_01: egret.Sound;
	private chapter11_01_soundChannel: egret.SoundChannel;

	private static shared: SoundManager;

	public static getInstance() {
		if(!SoundManager.shared){
			SoundManager.shared = new SoundManager();
		}
		return SoundManager.shared;
	}

	public constructor() {
		this.chapter1_sound = new egret.Sound();
		this.chapter1_sound = RES.getRes("ch1_bg_mp3");

		this.chapter1_2_01 = new egret.Sound();
		this.chapter1_2_01 = RES.getRes("ch1_2_01_mp3");

		this.chapter1_2_02 = new egret.Sound();
		this.chapter1_2_02 = RES.getRes("ch1_2_02_mp3");

		this.chapter2_01 = new egret.Sound();
		this.chapter2_01 = RES.getRes("ch2_01_mp3");

		this.chapter2_04 = new egret.Sound();
		this.chapter2_04 = RES.getRes("ch2_04_mp3");

		this.chapter4_01 = new egret.Sound();
		this.chapter4_01 = RES.getRes("ch4_01_mp3");

		this.chapter4_end = new egret.Sound();
		this.chapter4_end = RES.getRes("ch4_end_mp3");

		this.chapter6_02 = new egret.Sound();
		this.chapter6_02 = RES.getRes("ch6_02_mp3");

		this.chapter6_04 = new egret.Sound();
		this.chapter6_04 = RES.getRes("ch6_04_mp3");

		this.chapter7_01 = new egret.Sound();
		this.chapter7_01 = RES.getRes("ch7_01_mp3");

		this.chapter7_02 = new egret.Sound();
		this.chapter7_02 = RES.getRes("ch7_02_mp3");

		this.chapter7_2_01 = new egret.Sound();
		this.chapter7_2_01 = RES.getRes("ch7_2_01_mp3");

		this.chapter7_4_01 = new egret.Sound();
		this.chapter7_4_01 = RES.getRes("ch7_4_01_mp3");

		this.chapter8_1_04 = new egret.Sound();
		this.chapter8_1_04 = RES.getRes("ch8_1_04_mp3");

		this.chapter8_2_01 = new egret.Sound();
		this.chapter8_2_01 = RES.getRes("ch8_2_01_mp3");

		this.chapter9_1_03 = new egret.Sound();
		this.chapter9_1_03 = RES.getRes("ch9_1_03_mp3");

		this.chapter9_1_04 = new egret.Sound();
		this.chapter9_1_04 = RES.getRes("ch9_1_04_mp3");

		this.chapter9_2_01 = new egret.Sound();
		this.chapter9_2_01 = RES.getRes("ch9_2_01_mp3");

		this.chapter10_2_01 = new egret.Sound();
		this.chapter10_2_01 = RES.getRes("ch10_2_01_mp3");

		this.chapter10_3_01 = new egret.Sound();
		this.chapter10_3_01 = RES.getRes("ch10_3_01_mp3");

		this.chapter11_01 = new egret.Sound();
		this.chapter11_01 = RES.getRes("ch11_01_mp3");
	}

	// 播放音效
	public playChapterMusic (musicName: string) {
		if (this.isEffect) {
			switch (musicName) {
				case "ch1_bg_mp3":
					this.chapter1_sound.play(0, 1);
					break;

				case "ch1_2_01_mp3":
					this.chapter1_2_01_soundChannel = this.chapter1_2_01.play(0, 1);
					break;

				case "ch1_2_02_mp3":
					this.chapter1_2_02_soundChannel = this.chapter1_2_02.play(0, 1);
					break;

				case "ch2_01_mp3":
					this.chapter2_01_soundChannel = this.chapter2_01.play(0, 1);					
					break;

				case "ch2_04_mp3":
					this.chapter2_04_soundChannel = this.chapter2_04.play(0, 1);														
					break;

				case "ch4_01_mp3":
					this.chapter4_01_soundChannel = this.chapter4_01.play(0, 1);												
					break;

				case "ch4_end_mp3":
					this.chapter4_end_soundChannel = this.chapter4_end.play(0, 1);												
					break;

				case "ch6_02_mp3":
					this.chapter6_02_soundChannel = this.chapter6_02.play(0, 1);												
					break;

				case "ch6_04_mp3":
					this.chapter6_04_soundChannel = this.chapter6_04.play(0, 1);												
					break;

				case "ch7_01_mp3":
					this.chapter7_01_soundChannel = this.chapter7_01.play(0, 1);												
					break;

				case "ch7_02_mp3":
					this.chapter7_02_soundChannel = this.chapter7_02.play(0, 1)												
					break;

				case "ch7_2_01_mp3":
					this.chapter7_2_01_soundChannel = this.chapter7_2_01.play(0, 1)												
					break;

				case "ch7_4_01_mp3":
					this.chapter7_4_01_soundChannel = this.chapter7_4_01.play(0, 1)												
					break;

				case "ch8_1_04_mp3":
					this.chapter8_1_04_soundChannel = this.chapter8_1_04.play(0, 1)												
					break;

				case "ch8_2_01_mp3":
					this.chapter8_2_01_soundChannel = this.chapter8_2_01.play(0, 1)												
					break;

				case "ch9_1_03_mp3":
					this.chapter9_1_03_soundChannel = this.chapter9_1_03.play(0, 1);												
					break;

				case "ch9_1_04_mp3":
					this.chapter9_1_04_soundChannel = this.chapter9_1_04.play(0, 1);												
					break;

				case "ch9_2_01_mp3":
					this.chapter9_2_01_soundChannel = this.chapter9_2_01.play(0, 1);												
					break;

				case "ch10_2_01_mp3":
					this.chapter10_2_01_soundChannel = this.chapter10_2_01.play(0, 1);												
					break;

				case "ch10_3_01_mp3":
					this.chapter10_3_01_soundChannel = this.chapter10_3_01.play(0, 1);												
					break;

				case "ch11_01_mp3":
					this.chapter11_01_soundChannel = this.chapter11_01.play(0, 1);												
					break;
			}
		}
	}

	// 暂停声音
	public stopChapterMusic (musicName: string) {
		switch (musicName) {
			case "ch1_2_01_mp3":
				this.chapter1_2_01_soundChannel.stop();
				break;

			case "ch1_2_02_mp3":
				this.chapter1_2_02_soundChannel.stop();
				break;

			case "ch2_01_mp3":
				this.chapter2_01_soundChannel.stop();
				break;

			case "ch2_04_mp3":
				this.chapter2_04_soundChannel.stop();
				break;

			case "ch6_02_mp3":
				this.chapter6_02_soundChannel.stop();
				break;

			case "ch6_04_mp3":
				this.chapter6_04_soundChannel.stop();
				break;

			case "ch7_01_mp3":
				this.chapter7_01_soundChannel.stop();
				break;

			case "ch7_02_mp3":
				this.chapter7_02_soundChannel.stop();
				break;

			case "ch7_2_01_mp3":
				this.chapter7_2_01_soundChannel.stop();
				break;
		}
	}

	// 获得当前声音状态
	public getMusicStatus () {
		if (this.isMusic) {
			GameData.isMusicOn = true;
		} else {
			GameData.isMusicOn = false;
		}
	}

	// 获取背景音乐是否播放
	public get isMusic() {
		let ret = egret.localStorage.getItem("isMusic");
		if(ret == null || ret == "") {

			//如果获取到ret是null或者""说明是程序第一次运行 默认播放声音
			return true;
		} else {
			return ret == "1";
		}
	}

	public set isEffect(val) {
		if(val){
			egret.localStorage.setItem("isSound", "1");
		}else{
			egret.localStorage.setItem("isSound", "0");
		}
	}

	public get isEffect() {
		let ret = egret.localStorage.getItem("isSound");
		if( ret == null || ret == ""){
			return true;
		}else{
			return ret == "1";
		}
	}
}