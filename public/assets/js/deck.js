$.ajax({
    method: "GET",
    url: "/db/decks"
}).done(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        $("#deckList").append(`<option class="deckName" data-id="${data[i].id}">${data[i].deckName}</option>`);
    }
});

$(function () {
    
    $(document).on("change", "select", "#deckList", function(event) {
        event.preventDefault();
        $("#deckListRow").empty();
        $.ajax({
            method: "GET",
            url: `db/decks/${$("#deckList").find(":selected").attr("data-id")}`
        }).then(function(cardData) {
            console.log(cardData);
            console.log(JSON.parse(cardData.cards[0].cardData).image);
            for (let i = 0; i < cardData.cards.length; i++) {
                console.log("inside for loop");
                console.log(JSON.parse(cardData.cards[i].cardData).image);
                        $("#deckListRow").append(`
                        <div class="col-xl-4 card-margin">
                                <img class="card-img-top" src="${JSON.parse(cardData.cards[i].cardData).image}" alt="Card image cap">
                        </div>`);
                    }
        })
    });
    
    // $.ajax({
    //     method: "GET",
    //     url: "/db/decks"
    // }).done(function (data) {
    //     console.log(data);
    //     for (let i = 0; i < data.length; i++) {
    //         $("#deckListRow").append(`
    //         <div class="col-xl-4 card-margin">
    //             <div class="card center" style="width: 20rem;">
    //                 <img class="card-img-top" src="./assets/img/cardBack.png" alt="Card image cap">
    //                 <div class="card-body">
    //                 <h4 class="card-title">${data[i].deckName}</h4>
    //                 <a href="#" class="btn btn-primary view-deck" data-deckId=${data[i].id}>View Decklist</a>
    //                 </div>
    //             </div>
    //         </div>`);
    //     }
    // });
    // $(document).on("click", ".view-deck", function(event) {
    //     $.ajax({
    //         method: "GET",
    //         url: `db/decks/${$(this).attr("data-deckId")}`
    //     }).then(function(cardData) {
    //         console.log(cardData);
    //     })
    // })
});
