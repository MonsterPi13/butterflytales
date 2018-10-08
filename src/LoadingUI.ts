//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.initView();
        this.createView();
        this.startButterflyMoiveClip();
        // this.playBGM();
    }

    private textField: egret.TextField;
    private BGMChannel: egret.SoundChannel;

    private initView () {
        
        // 初始化背景图片
        let bg: egret.Bitmap = GameUtil.createBitmapByName("cover_jpg");
        bg.width = GameData.STAGE_WIDTH;
        bg.height = GameData.STAGE_HEIGHT;
        this.addChild(bg);

        // 初始化开始按钮  
        // let startButton: egret.Bitmap = GameUtil.createBitmapByName("btn_startGame_png");
        // startButton.x = this.stage.stageWidth - startButton.width >> 1;
        // startButton.y = 1150;
        // this.addChild(startButton);
        // startButton.touchEnabled = true;
        // startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     console.log("点击了开始游戏按钮，进入游戏场景");
        //     SceneController.startGameScene();
        // }, this);
    }

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.x = 630;
        this.textField.y = 520;
        this.textField.width = 960;
        this.textField.height = 100;
        this.textField.size = 40;

    }

    public onProgress(current: number, total: number): void {
        let percent: number = Math.ceil(current / total * 100);
        this.textField.text = `${percent}%`;
    }

    private playBGM () {
        let bgm: egret.Sound = new egret.Sound();
        bgm = RES.getRes("ch7_4_01_mp3");
        this.BGMChannel = bgm.play(0, 1);
    }

    public showTips () {
        this.textField.alpha = 0;
        let tips: egret.TextField = new egret.TextField();
        tips.text = "点击屏幕继续";
        this.addChild(tips);
        tips.y = 1250;
        tips.width = 960;
        tips.height = 100;
        tips.size = 50;
        tips.textAlign = "center";
        egret.Tween.get(tips, {loop: true}).to({
            alpha: 0.1
        }, 1000).to({
            alpha: 1
        }, 1000);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.touchEnabled = false;
            this.removeChild(tips);            
            this.playBGM();
            this.initStartButton();
        }, this, false);
    }

    private initStartButton () {

        // 初始化开始按钮  
        let startButton: egret.Bitmap = GameUtil.createBitmapByName("btn_startGame_png");
        startButton.x = this.stage.stageWidth - startButton.width >> 1;
        startButton.y = 1150;
        startButton.alpha = 0;
        this.addChild(startButton);
        startButton.touchEnabled = true;
        egret.Tween.get(startButton).to({
            alpha: 1
        }, 1000);

        startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            e.stopImmediatePropagation();
            if (!!this.parent)  this.parent.removeChild(this);
            SceneController.startGameScene();
        }, this);
    }

    private startButterflyMoiveClip() {
        let butterflyJson = RES.getRes("butterfly_json");
        let texture = RES.getRes("butterfly_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(butterflyJson, texture);
        let mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("butterfly"));
        mc.x = 300;
        mc.y = 330;
        this.addChild(mc)
        mc.play(-1);
    }
}
