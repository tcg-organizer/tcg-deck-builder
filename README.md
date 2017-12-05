 ![pokeball](https://cdn.emojidex.com/emoji/px32/pokeball.png "pokeball") ![Charmander](https://cdn.emojidex.com/emoji/px32/Charmander.png "Charmander") ![Squirtle](https://cdn.emojidex.com/emoji/px32/Squirtle.png "Squirtle") ![Bulbasaur](https://cdn.emojidex.com/emoji/px32/Bulbasaur.png "Bulbasaur")  ...
# TCG-Deck-Builder



### **Users builds decks using pokemon data from the official Pokemon TCG website.**



<h4 align="left">SAMPLE CARD</h4>

![](https://assets.pokemon.com/assets/cms2/img/cards/web/POP3/POP%20Series_3_EN_9.png)

List of Packages
----------------
| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| handlebars.js  :wavy_dash:      | Templating engine                                                     |
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4 middleware.                                                 |
| Pokemontcgsdk                   | An api that searches the pokemon tcg website for card data            |
| dotenv                          | Handles environment variables                                         |

Resources Referenced
--------------------
- [The Difference Between URLs and URIs](https://danielmiessler.com/study/url-uri/) - Rest APIs

 MVC Design Model Employed (Model, View & Control)
--------------------------------------------------
*   Model: Where the business logic of the app resides. Interacts with data store.
*   View:  Where UI is managed.
*   Controller: Where routes were created, and logic set up within those routes where required. User requests managed here and data from the model received and based on the users authorization the request or denied request is passed back to the view.



