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
        onceflag:Boolean,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.node.position.y = 500;
        
    },

    start () {
        
    },

    move (){
        // cc.log(this.node.position.y);
        // cc.moveBy(1, 0, 500);
        var arr = [
                cc.easeCubicActionIn(),
                cc.easeCubicActionOut(),
                cc.easeCircleActionInOut(),
                cc.easeBounceInOut(),
                cc.easeExponentialInOut(),
                cc.easeQuinticActionInOut(),
                cc.easeQuadraticActionIn(),
                cc.easeQuadraticActionOut(),
                cc.easeElasticInOut(),
                cc.easeSineInOut()
                ];
        var num = this.randNum(1);
        cc.log("随机数："+num);
        var jumpUp = cc.moveBy(2, cc.v2(0, -2000)).easing(arr[num]);        //cc.easeCubicActionOut()

        // easeExponentialInOut,easeCircleActionInOut,easeBounceInOut,easeCubicActionOut
        this.node.runAction(jumpUp);

    },
    randNum(n){
        var rnd="";
        for(var i=0;i<n;i++)
            rnd+=Math.floor(Math.random()*10);
        return rnd;
    },

    runAnim (){
        var anim = this.node.getComponent(cc.Animation);
        anim.play('left');
    },

    del () {
        this.node.removeFromParent();
    },

    update (dt) {
        if (this.node.position.y<-900) {
            let e = new cc.Event.EventCustom('delHotDog', true);
            this.node.dispatchEvent(e);
            this.del();
        }
    },
});
