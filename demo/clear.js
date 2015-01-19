/*
    
@@@@@@@@@@@@@@@@@@@@@@
clear
@@@@@@@@@@@@@@@@@@@@@@

about               A framework for Co-op Application Building

*/




var CLEAR = function(name){

    var clear = {}

    clear.appName = name

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  UI
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        clear.UI = function(identifier){

            var selector = clear.appName + "-" + identifier
            var selection = document.querySelectorAll("." + selector)

            if(selection.length){

                for(var i = 0, len = selection.length; i < len; i++){

                    var tagName = selection[i].tagName

                    //create <tagname>
                    if(!clear.UI[tagName]){

                        clear.UI[tagName] = {}

                    }

                    //create <tagname> <selector>
                    if(clear.UI[tagName][selector]){

                        //add to the jquery object
                        clear.UI[tagName][selector] = clear.UI[tagName][selector].add(selection[i])


                    } else {

                        //create new jquery object
                        var JQ = $()
                        clear.UI[tagName][selector] = JQ.add(selection[i])

                    }

                }

                return clear.UI[tagName][selector]

            } else {

                console.log("clear // UI(" + identifier + ")" + "is not found in the HTML")
                return $()

            }

        }

        clear.UI.copyText = function(arg){

            var from = clear.UI(arg.from)
            var to = clear.UI(arg.to)

            var fromText = from.text()
            to.text(fromText)

        }

        clear.UI.radioGroup = function(el, callback){

            if(!clear.UI.radioGroup.list){

                clear.UI.radioGroup.list = {}

            }

            if(!clear.UI.radioGroup.list[el]){

                clear.UI.radioGroup.list[el] = {}

            }

            //get beacon
            if(!callback){

                return clear.UI.radioGroup.list[el]

            }

            //set
            if(callback){

                var uiEl = clear.UI(el)
                var info = {}
                    info.tracker = []

                for(var i = 0; i < uiEl.length; i++){

                    uiEl[i].addEventListener("change", function(i){

                        return function(){

                            info.index = i
                            info.tracker.unshift(uiEl[i])
                            clear.UI.radioGroup.list[el] = info

                            if(callback[i]){
                                
                                callback[i].call(uiEl[i], info)

                            }

                        }

                    }(i))

                    if(uiEl[i].checked){

                        info.tracker.unshift(uiEl[i])
                        info.index = i
                        clear.UI.radioGroup.list[el] = info

                    }

                }

                if(callback[info.index]){

                    callback[info.index].call(info.tracker[0], info)

                }

            }


        }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  APP
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
   
        clear.APP = function(){


        }

        clear.APP.session = function(key, value){

            if(!clear.APP["session"]){

                clear.APP["session"] = {}

            }

            if(!clear.APP.session[key]){

                clear.APP.session[key] = {}

            }

            //get
            if(typeof value === "undefined"){

                return clear.APP.session[key].val

            //set
            } else {

                var oldValue = ""

                if(!clear.APP.session[key].onChange){

                    clear.APP.session[key].onChange = {}
                    clear.APP.session[key].onChange.chapter = []
                    clear.APP.session[key].onChange.event = []
                    clear.APP.session[key].onChange.action = []

                }

                oldValue = clear.APP.session[key].val
                clear.APP.session[key].val = value

                if(oldValue !== value){

                    setTimeout(function(){

                        for(var i = 0; i < clear.APP.session[key].onChange.chapter.length; i++){

                            clear.APP.chapter.list[clear.APP.session[key].onChange.chapter[i]]()

                        }

                    },0)

                }

            }

        }

        clear.APP.chapter = function(name, callback){

            //get
            if(!callback){

                clear.APP.chapter.list[name]()

            }

            //set
            if(callback){

                var tracker = getDependency()

                for(var i = 0; i < tracker.length; i++){

                    if(!clear.APP.session[tracker[i]]){

                        clear.APP.session(tracker[i], "")

                    }

                    if(!clear.APP.session[tracker[i]].onChange.chapter){

                        clear.APP.session[tracker[i]].onChange.chapter = []

                    }

                    if(clear.APP.session[tracker[i]].onChange.chapter.indexOf(name) < 0){

                        clear.APP.session[tracker[i]].onChange.chapter.push(name)

                    }

                }

                if(!clear.APP.chapter.list){

                    clear.APP.chapter.list = {}

                }

                clear.APP.chapter.list[name] = callback

            }

            function getDependency(){

                var re = /\bAPP.session\("([^")]+)/g; 
                var str = callback + ""
                var m;
                var arr = []
                 
                while ((m = re.exec(str)) != null) {

                    if (m.index === re.lastIndex) {
                        re.lastIndex++;
                    }

                    arr.push(m[1])
                    
                }

                return arr

            }
            
        }

        clear.APP.action = function(name, callback){

            //get
            if(!callback){

                clear.APP.action.list[name]()

            }

            //set
            if(callback){

                if(!clear.APP.action.list){

                    clear.APP.action.list = {}

                }

                clear.APP.action.list[name] = callback

            }
            
        }


    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  DATA
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        clear.DATA = function(name, callback){

            //get
            if(!callback){

                return clear.DATA.models[name]

            }

            //set
            if(callback){

                if(!clear.DATA.models){

                    clear.DATA.models = {}

                }

                if(!clear.DATA.models[name]){

                    clear.DATA.models[name] = {}

                }

                clear.DATA.models[name] = callback()

            }

        }

        clear.DATA.service = function(){



        }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  RETURN
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        return clear

}


















































