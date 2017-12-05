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
            console.log(JSON.parse(cardData.cards[0].cardData).imageUrl);
            for (let i = 0; i < cardData.cards.length; i++) {
                console.log("inside for loop");
                console.log(JSON.parse(cardData.cards[i].cardData).imageUrl);
                        $("#deckListRow").append(`
                        <div class="col-xl-4 card-margin cardDiv" data-divCardId="${cardData.cards[i].id}">
                        <button class="delete-btn btn btn-small btn-primary" data-cardId="${cardData.cards[i].id}">DELETE</button>
                                <img class="card-img-top" src="${JSON.parse(cardData.cards[i].cardData).imageUrl}" alt="Card image cap">
                        </div>`);
                    }
        })
    });
    
    $("#deleteDeckButton").on("click", function(event){
        event.preventDefault();
        console.log($("#deckList").find(":selected").attr("data-id"));
        $.ajax({
            method: "DELETE",
            url: `/db/decks/${$("#deckList").find(":selected").attr("data-id")}`,
        }).then(function(deleteDeck) {
            console.log(deleteDeck);
            location.reload();
        })
    });
    
    $(document).on("click", ".delete-btn", function(event) {
        event.preventDefault();

        $(".cardDiv").filter(`[data-divCardId=${$(this).attr("data-cardId")}]`).remove();
        $.ajax({
            method: "DELETE",
            url: `/db/cards/${$(this).attr("data-cardId")}`
        }).then(function(deletedCard) {
            console.log(deletedCard);
        });
        
    })
});
