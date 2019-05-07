import $ from 'jquery';

// require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function($) {
  'use strict'; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    DOM.$newList = $('#new-list-template');
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
  function createDialogs() {}
  function createCard() {}

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);

    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();

    /* Clone new list template */
    let newColumn = $('<div class="column"></div>').append(
      DOM.$newList
        .clone()
        .removeAttr('id')
        .show()
    );

    $(this)
      .parent()
      .before(newColumn);
  }

  function deleteList() {
    // $(this)
    //   .offsetParent() // .list
    //   .parent()       // .column
    //   .remove();

    $(this)
      .closest('.column')
      .remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();

    let cardInput = $(this).find('input');
    cardInput.css('border', 'none');
    let newCardTitle = cardInput.val();

    // Is the title actually set to something?
    if (newCardTitle.length > 3) {
      $(this)
        .closest('li.add-new')
        .before(
          '<li class= "card">' +
            newCardTitle +
            '<button class="button delete">X</button></li>'
        );
    } else {
      cardInput.css('border', '2px solid red');
    }

    cardInput.val('');
  }

  function deleteCard() {
    $(this)
      .closest('.card')
      .remove();
  }

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');

    // Förslag på privata metoder
    captureDOMEls();

    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})($);

//usage
$('document').ready(function() {
  jtrello.init();
});
