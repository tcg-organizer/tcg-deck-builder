// On click function to grab search value after page load

$(function () {

    $("#submit").on("click", function (event) {

        if ($("#search").val().trim().length === 0 ) {

            // Usually show some kind of error message here

            // Prevent the form from submitting
            event.preventDefault();
        } else {

            let pokemon = $("#search").val().trim();

            // spaces are replaced with "-" to match query syntax
            pokemon = pokemon.replace(" ", "-");

            console.log(pokemon);

            //ajax call to send data to the server
            $.ajax({
                method: "POST",
                url: `/api/search/pokemon/${pokemon}`
            }).then(function(){
                setTimeout(function(){
                    location.reload();
                },1000)
            }).done(function(data){
                console.log(data);
                pokemon = "";
            });
        }
    });


    $("#cardButton").on("click", function(event){
        event.preventDefault();
        let cardURL = $(this).attr("data-id");
        cardURL = cardURL.substring(23);
        cardURL = cardURL.split("/");
        cardURL = cardURL.join("+");

        console.log(cardURL);

        $.ajax({
            method: "POST",
            url: `/api/search/url/${cardURL}`
        }).then(function(){
            // setTimeout(function(){
            //     location.reload();
            // },1000)
        }).done(function(data){
            console.log(data);
        })
    })

});