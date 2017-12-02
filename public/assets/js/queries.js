// On click function to grab search value after page load

$(function () {

    //if enter pressed while search bar is focused
    $('#search').keypress(function (e) {
        //Enter key pressed
        if (e.which == 13) {
            //Trigger search button click event
            $('#submit').click();
        }
    });

    $("#submit").on("click", function (event) {

        if ($("#search").val().trim().length === 0) {

            // Usually show some kind of error message here

            // Prevent the form from submitting
            event.preventDefault();
        } else {

            $("#cardHome").empty();

            var loadingImg = $("<img class='img-responsive center' alt='Loading Image' id='loader'>");
            loadingImg.attr("src", "./assets/img/pokemon_loading.gif");
            $("#cardHome").append(loadingImg);

            let pokemon = $("#search").val().trim();

            // spaces are replaced with "-" to match query syntax
            pokemon = pokemon.replace(" ", "-");

            console.log(pokemon);

            //ajax call to send data to the server
            $.ajax({
                method: "POST",
                url: `/api/search/pokemon/${pokemon}`,
                timeout: 5000,
                error: function(xmlhttprequest, textstatus, message) {
                    if(textstatus==="timeout") {
                        alert("got timeout");
                    } else {
                        alert(textstatus);
                    }
                }

            }).then(function (data) {

                $("#cardHome").empty();

                console.log(data);

                //displays each card in the comeHard div in cardSearch.handlebars
                for (var i = 0; i < data.cardData.length; i++) {

                    var newDiv1 = $("<div class='col-xl-4 col-md-6 col-xs-12 card-margin'></div>");

                    var newDiv2 = $("<div class='card grey center' style='width: 20rem;'>");

                    var newImg = $("<img class='card-img-top img-responsive' alt='Card Image'>");

                    newImg.attr("src", data.cardData[i].image);

                    newImg.appendTo(newDiv2);
                    newDiv2.appendTo(newDiv1);

                    var newDiv3 = $("<div class='card-body'></div>");
                    newDiv3.html("<a href='#' class='btn btn-primary cardButton' data-id='" + data.cardData[i].url + "' data-toggle='modal' data-target='#cardModal'>View Card Data</a>");

                    newDiv3.appendTo(newDiv2);
                    $("#cardHome").append(newDiv1);
                }

                var pageNum = 2;

                //infinite scrolling option, but it's a little touchy...
                // $(window).scroll(function () {
                //     if ($(document).height() === $(window).scrollTop() + $(window).height()) {
                        //checks for additional pages to query (the first query scrapes the first page only)

                        if (pageNum <= data.numPages) {


                            console.log(data.numPages);
                            console.log(pageNum);
                            //loading image
                            $("#cardHome").append(loadingImg);

                            //api call for each additional page from data
                            $.ajax({
                                method: "POST",
                                url: `/api/search/pokemon2/${pokemon}/${pageNum}`
                            }).then(function (data2) {
                                console.log(`/api/search/pokemon2/${pokemon}/${pageNum}`);
                                console.log(data2);
                                pageNum += 1;
                                console.log(pageNum);

                                //removed loading image
                                $("#loader").remove();

                                //displays each card in the comeHard div in cardSearch.handlebars
                                for (var j = 0; j < data2.cardData.length; j++) {
                                    var newDiv1 = $("<div class='col-xl-4 col-md-6 col-xs-12 card-margin'></div>");

                                    var newDiv2 = $("<div class='card grey center' style='width: 20rem;'>");

                                    var newImg = $("<img class='card-img-top img-responsive' alt='Card Image'>");

                                    newImg.attr("src", data2.cardData[j].image);
                                    newImg.appendTo(newDiv2);
                                    newDiv2.appendTo(newDiv1);

                                    var newDiv3 = $("<div class='card-body'></div>");

                                    newDiv3.html("<a href='#' class='btn btn-primary cardButton' data-id='" + data2.cardData[j].url + "' data-toggle='modal' data-target='#cardModal'>View Card Data</a>");

                                    newDiv3.appendTo(newDiv2);
                                    $("#cardHome").append(newDiv1);
                                }

                            });
                        }

                //     }
                // });

            });
        }

    });


    var singleCardData;
    var deckName;

    $(document).on("click", ".cardButton", function (event) {

        event.preventDefault();

        $("#pokemonImage").attr("src", "./assets/img/pokemon_loading.gif");

        let cardURL = $(this).attr("data-id");
        cardURL = cardURL.substring(23);
        cardURL = cardURL.split("/");
        cardURL = cardURL.join("+");

        console.log(cardURL);

        //call to populate card modal with card data
        $.ajax({
            method: "POST",
            url: `/api/search/url/${cardURL}`
        }).then(function (data) {
            console.log(data);
            singleCardData = data;
            $("#pokemonName").text(data.name);
            $("#pokemonImage").attr("src", data.image);
            $("#cardType").text("Card Type: " + data.type);
        });

        $.ajax({
            method: "GET",
            url: "/db/decks"
        }).done(function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                $("#deckNames").append(`<option class="deckName" data-id="${data[i].id}">${data[i].deckName}</option>`);
                console.log(data[i].id);
            }
        });

    
        $(document).on("click", ".addCard", function (event) {
            event.preventDefault();
            
            console.log($("#deckNames").find(":selected").attr("data-id"));
    
            if ($("#deckNames").find(":selected").attr("data-id") === "new-deck") {
                console.log("new deck was selected");
                $("#addNewDeck").show();
               

                $("#submitNewDeck").on("click", function(event) {
                    event.preventDefault();
                    $("#addNewDeck").hide();
                    console.log($("#newDeckText").val());
                    $.ajax({
                        method: "POST",
                        url: "/db/decks",
                        data: {"newDeckName" : $("#newDeckText").val()}
                }).then(function(data) {
                    $("#newDeckHelpBlock").show();
                        $("#deckNames").append(`<option class="deckName" data-id="${data.id}" selected="selected">${data.deckName}</option>`);
                        console.log(data);
                    })
                })
            } else {
                $.ajax({
                    method: "POST",
                    url: "/db/cards",
                    data: {"cardData": singleCardData, "deckId": $( "#deckNames").find(":selected").attr("data-id")}
                }).then(function () {
                    $("#newDeckHelpBlock").hide();
                    console.log("Your card was sent to " + $( "#deckNames").find(":selected").val() + "!");
                });
            }
        });
    });
});

