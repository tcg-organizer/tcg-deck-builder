// On click function to grab search value after page load

$(function () {

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
                url: `/api/search/pokemon/${pokemon}`

            }).then(function (data) {
                $("#cardHome").empty();

                console.log(data);

                //displays each card in the comeHard div in cardSearch.handlebars
                for (var i = 0; i < data.cardData.length; i++) {

                    var newDiv1 = $("<div class='col-xl-4 col-md-6 col-xs-12 card-margin'></div>");

                    var newDiv2 = $("<div class='card grey center' style='width: 20rem;'>");

                    var newImg = $("<img class='card-img-top' alt='Card Image'>");

                    newImg.attr("src", data.cardData[i].image);

                    newImg.appendTo(newDiv2);
                    newDiv2.appendTo(newDiv1);

                    var newDiv3 = $("<div class='card-body'></div>");
                    newDiv3.html("<h4>Card Id:</h4><a href='#' class='btn btn-primary cardButton' data-id='" + data.cardData[i].url + "' data-toggle='modal' data-target='#cardModal'>View Card Data</a>");


                    newDiv3.appendTo(newDiv2);
                    $("#cardHome").append(newDiv1);
                }

                //checks for additional pages to query (the first query scrapes the first page only)
                if (data.numPages > 1) {

                    $("#cardHome").append(loadingImg);

                    for (var j = 2; j < data.numPages; j++) {
                        $.ajax({
                            method: "POST",
                            url: `/api/search/pokemon2/${pokemon}/${j}`
                        }).then(function (data) {
                            console.log(data);


                            $("#loader" ).remove();

                            //displays each card in the comeHard div in cardSearch.handlebars
                            for (var i = 0; i < data.cardData.length; i++) {
                                var newDiv1 = $("<div class='col-xl-4 col-md-6 col-xs-12 card-margin'></div>");

                                var newDiv2 = $("<div class='card grey center' style='width: 20rem;'>");

                                var newImg = $("<img class='card-img-top' alt='Card Image'>");
                                newImg.attr("src", data.cardData[i].image);
                                newImg.appendTo(newDiv2);
                                newDiv2.appendTo(newDiv1);

                                var newDiv3 = $("<div class='card-body'></div>");

                                newDiv3.html("<h4>Card Id:</h4><a href='#' class='btn btn-primary cardButton' data-id='" + data.cardData[i].url + "' data-toggle='modal' data-target='#cardModal'>View Card Data</a>");

                                newDiv3.appendTo(newDiv2);
                                $("#cardHome").append(newDiv1);
                            }
                        })
                    }
                }

            });
        }
    });


    $(document).on("click", ".cardButton", function (event) {

        event.preventDefault();

        let cardURL = $(this).attr("data-id");
        cardURL = cardURL.substring(23);
        cardURL = cardURL.split("/");
        cardURL = cardURL.join("+");

        console.log(cardURL);

        $.ajax({
            method: "POST",
            url: `/api/search/url/${cardURL}`

        }).then(function (data) {
            console.log(data);
            $("#pokemonName").text(data.name);
            $("#pokemonImage").attr("src", data.image);
            $("#cardType").text("Card Type: " + data.type);

            $(document).on("click",".addCard", function(event){
                event.preventDefault();
                $.ajax({
                    method: "POST",
                    url:
                })

            });
        });
    });

});