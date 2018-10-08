class GameUtil {

    static createDialogBg (width: number): egret.Shape {
        let dialog_bg: egret.Shape = new egret.Shape();
        dialog_bg.graphics.beginFill(0x000000);
        dialog_bg.graphics.drawRoundRect(0, 0, width, 108, 30, 30);
        dialog_bg.graphics.endFill();
        return dialog_bg;
    }

    static createText (text: string, width: number, x_axis: number,): egret.TextField {
        let dialog_text: egret.TextField = new egret.TextField();
        dialog_text.text = text;
        dialog_text.width = width;
        dialog_text.height = 108;
        dialog_text.textColor = 0xffffff;
        dialog_text.size = 36;
        dialog_text.x = x_axis;
        dialog_text.lineSpacing = 12;
        dialog_text.multiline = true;
        dialog_text.verticalAlign = egret.VerticalAlign.MIDDLE;
        return dialog_text;
    }

    static createBitmapByName (name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    static initPopup (options: Array<any>): PopUp {
        let selections: PopUp = new PopUp(options);
        return selections;
    }

    static loadNextChapter (object: any, chapter: string) {
        // egret.Tween.get(object).to({
        //     alpha: 0
        // }, 100).call(() => {
        object.dispatchEventWith(chapter, true);            
        if (object.parent)  object.parent.removeChild(object);
        // });
    }
}