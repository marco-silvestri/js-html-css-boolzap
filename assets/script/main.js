$(document).ready(function () {

    /* References */

    var buttonSubmit = $('.app__col-right__chat-bar__send-button i');
    var inputArea = $('.app__col-right__chat-bar input');
    var chatBox = $('.app__col-right__chat-box');

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
            var cloneTemplateMessage = $('.templates .app__col-right__chat-box__message.message--sent').clone();
            var cloneTemplateText = $('.templates .app__col-right__chat-box__message.message--sent .message__body').clone();
            var cloneTemplateTime = $('.templates .app__col-right__chat-box__message.message--sent .message__time').clone();
            cloneTemplateText.prepend(inputArea.val().trim());
            cloneTemplateTime.prepend(timeFormatter());
            cloneTemplateMessage.append(cloneTemplateText, cloneTemplateTime);
            chatBox.append(cloneTemplateMessage);
            inputArea.val('');    
        }
    }

    // Add the digit 0 to the time if the value has only one digit
    function addZero(time) {
        if (time < 10) {
            time = "0" + time;
        }
            return time;
    }

    // User friendly time format
    function timeFormatter() {
        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + "." + m;
    }

});