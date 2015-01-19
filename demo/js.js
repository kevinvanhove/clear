/*
    
@@@@@@@@@@@@@@@@@@@@@@
demo
@@@@@@@@@@@@@@@@@@@@@@

about               A Clear 0.2 Demo
author              kevin

*/

var demo = function(){

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  CLEAR SETUP
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        var clear = CLEAR("demo")

        var UI = clear.UI
        var APP = clear.APP
        var DATA = clear.DATA

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  DATA
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        DATA("tv", function(){

            return {

                name:"tv",
                price:{normal:200, promo:149},
                active:false,

            }

        })

        DATA("internet", function(){

            return {

                pack:[

                    {name:"bizz", price:15}, 
                    {name:"comfort", price:20}, 
                    {name:"maxi", price:25}

                ]

            }

        })

        DATA.service("products", "http://www.getProducts.com/products.json")

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  EVENT
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        /// terms

            UI("termsYes").click(function(){

                DATA("tv").active = true
                UI.copyText({from:"termsYes", to:"terms"})

                APP.session("tv", "yes")

            })

            UI("termsNo").click(function(){

                DATA("tv").active = false
                UI.copyText({from:"termsNo", to:"terms"})

                APP.session("tv", "no")

            })

        /// internet

            UI.radioGroup("product-internet", [

                function(info){

                    APP.session("internet", "bizz")

                },

                function(info){

                    APP.session("internet", "comfort")

                },

                function(info){

                    APP.session("internet", "maxi")

                }

            ])

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  CHAPTER
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        APP.chapter("basket", function(){

            APP.session("internet")
            APP.session("tv")

            APP.action("internet")
            APP.action("tv") 
            APP.action("order") 

        })

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  ACTION
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        APP.action("internet", function(){

            var index = UI.radioGroup("product-internet").index
            var internetPrice = DATA("internet").pack[index].price
            
            UI("price").html("Price for internet: &euro;" + internetPrice)

        })

        APP.action("tv", function(){

            var promo = DATA("tv").price.promo

            if(DATA("tv").active){

                UI("tv").html(" + TV included (&euro;" + promo + ")")

            } else {

                UI("tv").html("")

            }
            
        })

        APP.action("order", function(){

            var index = UI.radioGroup("product-internet").index
            var internetPrice = DATA("internet").pack[index].price

            if(DATA("tv").active){

                var tvPrice = DATA("tv").price.promo

            } else {

                var tvPrice = 0

            }

            var total = internetPrice + tvPrice

            UI("total").html("&euro;" + total)

        })

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ✚  RETURN : METHOD AND PROPERTY RETURNS TO THE NAMESPACE
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

        console.log(clear)

}()












































