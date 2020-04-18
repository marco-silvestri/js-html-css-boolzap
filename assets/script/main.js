$(document).ready(function () {

    /* References */

    var buttonSubmit = $('.app__col-right__chat-bar__send-button i');
    var inputArea = $('.app__col-right__chat-bar input');
    var chatBox = $('.app__col-right__chat-box');

    /* Global Referincing for Templates */

    var cloneTemplateMessage;
    var cloneTemplateText;
    var cloneTemplateTime;

    //Add the note on the click of the SEND button
    buttonSubmit.click(addNewElement);


    // Add the new note on the hit of ENTER and flip the send icon depending on the content of the inputArea
    inputArea.keyup(function(e){
        if (e.which == 13 || e.keyCode == 13){ //13 is ENTER
            addNewElement();
        }
        else if (e.which == 8 || e.keyCode == 8){ //8 is BACKSPACE
            var iconFlipper = false;
        }
        else {
            var iconFlipper = true;
        }

        if (iconFlipper){
            buttonSubmit.removeClass('fa-microphone').addClass('fa-paper-plane');
        }
        else if (!iconFlipper && inputArea.val() == null || inputArea.val().trim() == '') {
            buttonSubmit.removeClass('fa-paper-plane').addClass('fa-microphone');
        }
    });

    /****************
    *  Functions
    *****************/

    // Add a new non-empty element
    function addNewElement(){
        if (inputArea.val() == null || inputArea.val().trim() == '') {
            inputArea.val('');
        }
        else {
            getTemplates();
            cloneTemplateText.prepend(inputArea.val().trim());
            cloneTemplateTime.prepend(getTimeFormatted());
            cloneTemplateMessage.addClass('message--sent').append(cloneTemplateText, cloneTemplateTime);
            chatBox.append(cloneTemplateMessage);
            inputArea.val('');
            setTimeout(addAutoAnswer, 2000);  
        }
    };

    function addAutoAnswer(){
        getTemplates();
        cloneTemplateText.prepend(pickRandomAnswer());
        cloneTemplateTime.prepend(getTimeFormatted());
        cloneTemplateMessage.removeClass('message--sent').addClass('message--received').append(cloneTemplateText, cloneTemplateTime);
        chatBox.append(cloneTemplateMessage);
    };

    // Add the digit 0 to the time if the value has only one digit
    function addZero(time) {
        if (time < 10) {
            time = "0" + time;
        }
            return time;
    };

    function getTemplates(){
        cloneTemplateMessage = $('.templates .app__col-right__chat-box__message').clone();
        cloneTemplateText = $('.templates .app__col-right__chat-box__message .message__body').clone();
        cloneTemplateTime = $('.templates .app__col-right__chat-box__message .message__time').clone();
    }

    // User friendly time format
    function getTimeFormatted() {
        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + "." + m;
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
            'Lo sai che posso trattenere il respire per 10 minuti?',
            'Si, ma scrivilo meglio.',
            'lol',
            'ahahah',
            'mmm?',
            'rotfl'
        ];

        var randomNumber = Math.random() * answersCollection.length | 0;
        return answersCollection[randomNumber];
    };

});