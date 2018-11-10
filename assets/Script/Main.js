// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        hotdog: cc.Prefab,
        container: cc.Node,

        wsc:cc.Node,

        btnStop: Boolean,
        stopLabel:cc.Label,
        timeLabel:cc.Label,

        successLabel:cc.Label,
        gameOverPanel:cc.Node,

        shotAudio:cc.AudioClip,
        missAudio:cc.AudioClip,
        winAudio:cc.AudioClip,

        startMillisec:0,
        deltaTime:0,

        hotdogArr:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btnStop = false;

        this.stopLabel.string = "点击屏幕吃热狗";


        this.node.on('delHotDog', function (data) {
            this.clearHotDog();
        }, this);

        
        this.startTimer();
        
    },

    startTimer (){
        this.startMillisec = Date.now();
        this.schedule(function(){
            var newMillisec = Date.now();            
            var delta = newMillisec - this.startMillisec;
            this.deltaTime = delta;
            var sec = parseInt(delta/1000);
            var mill = Math.round(delta%1000);
            this.timeLabel.string = sec + "秒" + mill;
        },0.1,10000,0);
    },

    addHotDog (){
        var hd = cc.instantiate(this.hotdog);
        this.hotdogArr.push(hd);
        this.container.addChild(hd);
        var comp = hd.getComponent("Hotdog");
        comp.move();
    },

    start () {

    },

    btnClick (){
        this.btnStop = !this.btnStop;
        var anim = this.wsc.getComponent(cc.Animation);
        if (this.btnStop) {//停止
            cc.audioEngine.play(this.shotAudio, false, 1); 
            anim.play('zoom');
            this.stopHotDog();
            this.stopLabel.string = "没吃到";

            var currentHd = this.getCurrentHotDog();
            var y = currentHd.position.y;

            // cc.log("y:"+y);
            if (y>-5 && y < 30) {
                this.unscheduleAllCallbacks(this);//终止时间

                cc.audioEngine.play(this.winAudio, false, 1); 
                var comp = currentHd.getComponent("Hotdog");
                comp.runAnim();

                this.scheduleOnce(function() {
                    var sec = parseInt(this.deltaTime/1000);
                    var mill = Math.round(this.deltaTime%1000);
                    this.gameOverPanel.active = true;
                    this.successLabel.string = "恭喜您！\n只需要"+sec+"秒"+mill+"就可以吃到热狗!";
                }, 0.5);
            }
        }else{ //继续
            this.clearHotDog();
            this.stopLabel.string = "点击屏幕吃热狗";
        }
    },

    stopHotDog (){
        if (this.hotdogArr.length>=1) {
            var hd = this.hotdogArr[0];
            hd.stopAllActions();
        }
    },

    getCurrentHotDog (){
        var hotdog;
        if (this.hotdogArr.length>=1) {
            hotdog = this.hotdogArr[0];
            hotdog.stopAllActions();
        }
        return hotdog;
    },

    clearHotDog (){
        if (this.hotdogArr.length>=1) {
            var hd = this.hotdogArr[0];    
            if (hd) {
                hd.removeFromParent();    
                // this.hotdogArr.pop();
                this.hotdogArr.splice(0,this.hotdogArr.length);
            }
        }        
    },

    replay (){
        cc.log("replay");
        this.clearHotDog();
        this.gameOverPanel.active = false;
        this.deltaTime = 0;
        this.startTimer();  
        this.btnStop = false;      
    },

    share (){
        cc.log("share");
    },

    update (dt) {
        if (this.hotdogArr.length == 0) {
            this.addHotDog();
        }
    },
});
