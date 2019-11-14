//语音

var jsSpeak = {
    circle: null, //计数器
    clearMomont: function () { //瞬时清除，类似防抖
      clearInterval(this.circle);
    },
    speakData: function (data, time) { //data 要播放的数据string， time每条语音之间的间隔
      var to_speak = window.speechSynthesis, //api对象
        speackData = data ? data : []; //要说的内容
      var that = this;
      try { //适配c#
        if (!boud) {
          return false
        }
        this.videoPlay(3) //初始化时去掉历史报警队列
        var i = 0;
        this.circle = setInterval(function () { //有间隔的报警方式，无间隔连续报警直接读数组按顺序播放
          boud.speech(speackData[i])
          if (i < speackData.length) {
            i++
          } else {
            clearInterval(that.circle) //播放完毕清除循环，防止耗内存性能
          }
        }, time)
      } catch (error) {
        this.videoPlay(3) //初始化时去掉历史报警队列
        var i = 0;
        this.circle = setInterval(function () { //有间隔的报警方式，无间隔连续报警直接读数组按顺序播放
          to_speak = new SpeechSynthesisUtterance(speackData[i]);
          window.speechSynthesis.speak(to_speak);
          if (i < speackData.length) {
            i++
          } else {
            clearInterval(that.circle) //播放完毕清除循环，耗内存性能
          }
        }, time)
  
      }
    },
    videoPlay: function (key) { //windowAPI的暂停播放取消
      switch (key) {
        case 1: //暂停
          window.speechSynthesis.pause();
          break;
        case 2: //继续
          window.speechSynthesis.resume();
          break;
        case 3: //取消队列
          window.speechSynthesis.cancel();
          break;
      }
  
    },
  }