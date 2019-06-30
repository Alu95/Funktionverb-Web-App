var app = new Vue({
  el: '#app',
  data: {
    intro: {
      visible: true,
      game: false,
      h1: 'Funktionsverb',
      des: "Test your Funktionsverb knowledge here.<br>You'll get one or more words, write the right funktionsverb.<br>Click BEGIN to start!",
      footer: '&copy; 2018 - Website by <a href="mailto:alucardsa@live.it">Giampaolo Fois</a> '
    },
    fVerbs: {},
    current: {
      verb: "",
      word: "",
      lastWord: "",
      typed: "",
      propNum: 0,
      wordNum: 0,
      left: 0,
      deleteWords: true
    },
    game: {
      right: 0,
      wrong: 0
    }

  },
  created() {
    this.getObj();
  },
  computed:{
  sentences:function(){
    var sentences = [];
    var keys = Object.keys(this.fVerbs)
    for(var i = 0; i < keys.length; i++){
      sentences.push(this.fVerbs[keys[i]])
      /*for(var j = 0; j < keys[i].length; j++){
        sentences.push(this.fVerbs[keys[i]][j]);
      }*/
    }
    return sentences;
  }
},
  methods: {
    getWord(){
      var keys = Object.keys(this.fVerbs);
      var num = keys.length * Math.random() << 0;
      app.current.propNum = num;
      var words = this.fVerbs[keys[num]];
      var wordPickNum = words.length * Math.random() << 0;
      app.current.wordNum = wordPickNum;
      var wordPick = words[wordPickNum];
      var wordTotal = 0;
      for (var i = 0; i < keys.length; i++){
         wordTotal += this.fVerbs[keys[i]].length;
      }
      this.current.left = wordTotal;
      console.log(this.current.left);

      this.current.verb = keys[num];

      if (wordPick === "" || words.length === 0){
        this.getWord();
      }
      else {
        this.current.word = wordPick;
      }
    },
    getObj(){
      axios.get('fsverb.json')
        .then(function (response) {
          app.fVerbs = response.data.fVerbs;
          app.game.right = app.game.wrong = 0;
          app.getWord();
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    check(){
      var keys = Object.keys(this.fVerbs);
      if (app.current.verb.toLowerCase() === app.current.typed.toLowerCase()){
        app.game.right++;
        if (this.current.deleteWords === true){
          var spliced = this.fVerbs[keys[app.current.propNum]].splice([app.current.wordNum], 1);
          app.current.lastWord = spliced;
        }
      }
      else {
        app.game.wrong++;
      }
      //this.getObj();
      app.current.typed = "";
      app.getWord();
    },
    startGame(){
      app.intro.visible = false;
      app.intro.game = true;
    }

  }

})
