import $ from "jquery";

// require('webpack-jquery-ui');
import "../css/styles.css";
import { isNullOrUndefined } from "util";

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function($) {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $(".board");
    DOM.$listDialog = $("#list-creation-dialog");
    DOM.$columns = $(".column");
    DOM.$lists = $(".list");
    DOM.$cards = $(".card");

    DOM.$newListButton = $("button#new-list");
    DOM.$deleteListButton = $(".list-header > button.delete");

    DOM.$newCardForm = $("form.new-card");
    DOM.$deleteCardButton = $(".card > button.delete");
  }

  function createTabs() {}
  function createDialogs() {}
  function createCard() {}

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$board.on("click", "button#new-list", createList);
    // DOM.$deleteListButton.on("click", deleteList);
    DOM.$board.on("click", ".list-header > button.delete", deleteList);

    DOM.$newCardForm.on("submit", createCard);
    // DOM.$deleteCardButton.on("click", deleteCard);
    DOM.$board.on("click", ".card > button.delete", deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    // console.log("This should create a new list");
    $(this).parent().before(
      `<div class="column">
              <div class="list">
                  <div class="list-header">
                      New column
                      <button class="button delete">X</button>
                  </div>
                  <ul class="list-cards">
                      <li class="add-new">
                          <form class="new-card" action="index.html">
                              <input type="text" name="title" placeholder="Please name the card" />
                              <button class="button add">Add new card</button>
                          </form>
                      </li>
                  </ul>
              </div>
          </div>`);
    }
    $(this);
    // debugger;

  //   $(this).parent().before(
  //   `<div class="column">
  //           <div class="list">
  //               <div class="list-header">
  //                   New column
  //                   <button class="button delete">X</button>
  //               </div>
  //               <ul class="list-cards">
  //                   <li class="add-new">
  //                       <form class="new-card" action="index.html">
  //                           <input type="text" name="title" placeholder="Please name the card" />
  //                           <button class="button add">Add new card</button>
  //                       </form>
  //                   </li>
  //               </ul>
  //           </div>
  //       </div>`);
  // }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    $(this)
      .offsetParent()
      .parent()
      .remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let cardInput = $(this).find("input");
    let newCardTitle = cardInput.val();

    $(this)
      .closest(".add-new")
      .before(
        '<li class= "card">' +
          newCardTitle +
          '<button class="button delete">X</button></li>'
      );

    cardInput.val("");
  }

  function deleteCard() {
    $(this)
      .closest(".card")
      .remove(); //gör samma sak med remove lists
    console.log("This should delete the card you clicked on");
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(":::: Initializing JTrello ::::");
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
    $;
    // debugger;
  }

  // All kod här
  return {
    init: init
  };
})($);

//usage
$("document").ready(function() {
  jtrello.init();
});
