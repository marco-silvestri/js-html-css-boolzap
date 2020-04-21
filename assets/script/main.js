$(document).ready(function () {

    /* References */

    var buttonSubmit = $('.app__col-right__chat-bar__send-button i');
    var chatItem = $('.app__col-left__chat-list__chat-item');
    //var chatTitle = $('.app__col-left__chat-list__chat-item__item-text__contact-name');
    var searchBar = $('.app__col-left__search-bar input');
    var inputArea = $('.app__col-right__chat-bar input');
    var chatBox = $('.app__col-right__chat-box');
    //var appRight = $('#app__col-right');
    var splashScreen = $('.app__col-right__splash-screen');
    var contactName = $('.app__col-right__profile-bar__profile-item__contact-name').children();
    var chatAvatar = $('.app__col-right__profile-bar img');
    
    /* Global Referincing for Templates */

    var chatBoxActive;
    var cloneTemplateMessage;
    var cloneTemplateText;
    var cloneTemplateTime;

    // Add a custom attribute for pointing
    for (var i = 0; i < chatItem.length; i++) {
        chatItem.eq(i).attr('data-contact', i);
        chatBox.eq(i).attr('data-contact', i);
    }

    // Status of the send icon
    var iconFlipper;
    
    // Chat Highlight on click
    chatItem.click(loaderContact);


    //Add the note on the click of the SEND button
    buttonSubmit.click(addNewElement);


    // Add the new note on the hit of ENTER and flip the send icon depending on the content of the inputArea
    inputArea.keyup(function(e){
        if (e.which == 13 || e.keyCode == 13){ //13 is ENTER
            addNewElement();
        }
        else if (e.which == 8 || e.which == 46 || e.keyCode == 8 || e.keyCode == 46 || inputArea.val() == ''){ //8 is BACKSPACE 46 is DEL
            iconFlipper = false;
        }
        else {
            iconFlipper = true;
        }
        flipSendIcon();
    });

    searchBar.keyup(function() {
        var searchKey = $(this).val().toLowerCase().trim();
        searchHighlight(searchKey);
    });

    // Open a contextual menu on message click, pseuso icon is decorative
    $('#app__col-right').on('click', '.app__col-right__chat-box__message', function(){
        $('.dropdown').hide();
        $(this).find('.dropdown').show();
    });

    // Close the contextual menu when leaving the message
    $('#app__col-right').on('mouseleave', '.app__col-right__chat-box__message', function(){
        $('.dropdown').hide();
    });

    // Remove the selected message
    $('#app__col-right').on('click', '.delete-message', function(){
        $(this).parents('.app__col-right__chat-box__message').remove();
    });

    /****************
     *    Functions
    *****************/

    // Add a new non-empty element
    function addNewElement(){
        if (inputArea.val() == null || inputArea.val().trim() == '') {
            inputArea.val('');
        }
        else {
            getTemplates();
            cloneTemplateText.text(inputArea.val().trim());
            cloneTemplateTime.text(getTimeFormatted());
            cloneTemplateMessage.addClass('message--sent').append(cloneTemplateText, cloneTemplateTime);
            chatBoxActive.append(cloneTemplateMessage);
            inputArea.val('');
            iconFlipper = false;
            flipSendIcon();
            scrollMessage();
            setTimeout(addAutoAnswer, 1000);  
        }
    };

    // Add a random answer
    function addAutoAnswer(){
        getTemplates();
        cloneTemplateText.text(pickRandomAnswer());
        cloneTemplateTime.text(getTimeFormatted());
        cloneTemplateMessage.removeClass('message--sent').addClass('message--received').append(cloneTemplateText, cloneTemplateTime);
        chatBoxActive.append(cloneTemplateMessage);
        scrollMessage();
    };

    // Get blank templates
    function getTemplates(){
        chatBoxActive = $('.app__col-right__chat-box.u--active');
        cloneTemplateMessage = $('.templates .app__col-right__chat-box__message').clone();
        cloneTemplateText = $('.templates .app__col-right__chat-box__message .message__body').clone();
        cloneTemplateTime = $('.templates .app__col-right__chat-box__message .message__time').clone();
    }
    
    // Add the digit 0 to the time if the value has only one digit
    function addZero(time) {
        if (time < 10) {
            time = "0" + time;
        }
            return time;
    };

    // User friendly time format
    function getTimeFormatted() {
        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + "." + m;
    };

    // Switch the send icon based on the input
    function flipSendIcon() {
        if (iconFlipper){
            buttonSubmit.removeClass('fa-microphone').addClass('fa-paper-plane');
        }
        else if (!iconFlipper && inputArea.val() == null || inputArea.val().trim() == '') {
            buttonSubmit.removeClass('fa-paper-plane').addClass('fa-microphone');
        }
    };

    // Pick a random answer from a collection
    function pickRandomAnswer() {
        var answersCollection = [
            'Bella zio!',
            'Non capisco, puoi ripetere?',
            'Grazie, ho ricevuto il tuo PayPal.',
            'Va bene, pizza e birra allora?',
            'Anche io!',
            'Preferisco la seconda opzione.',
            'Hai ragione.',
            'Ti capisco perfettamente',
            'Lo sai che posso trattenere il respiro per 10 minuti?',
            'Si, ma scrivilo meglio.',
            'lol',
            'ahahah',
            'mmm?',
            'rotfl'
        ];
        var randomNumber = Math.random() * answersCollection.length | 0;
        return answersCollection[randomNumber];
    };

    // Search function    
    function searchHighlight(searchKey) {
        chatItem.each(function() {
            var thisElement = $(this).find('h2').text().toLowerCase();
            if(thisElement.includes(searchKey)){
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    };

    // Load contact details from the contact list on the left to the top bar on the right
    function loaderContact() {
        var src = $(this).find('img').attr('src');
        var contact = $(this).attr('data-contact');
        chatItem.removeClass('chat-item--active');
        $(this).addClass('chat-item--active');
        splashScreen.remove();
        contactName.text($(this).find('h2').text());
        chatAvatar.attr('src',src);
        chatBox.removeClass('u--active');
        $('.app__col-right__chat-box[data-contact="'+ contact +'"').addClass('u--active');
    };

    // Scroll to the last message
    function scrollMessage() {
        var pixelScroll = chatBoxActive.height();
        chatBox.scrollTop(pixelScroll);
    }
});
