var messageStore = null;
$(document).ready(function () {
    messageStore = new MessageStore();
    function Counter() {
        var counterDiv = $("#messageCount");
        var count = 0;
        messageStore.addMessageObserver("ADD", function (message) {
            count++;
            counterDiv.text("");
            counterDiv.text(count);
        });

        messageStore.addMessageObserver("REMOVE", function (removedMessage) {
            count--;
            counterDiv.text("");
            counterDiv.text(count);
        });
    }
    function ColorCoder() {
        var countForColor = 0;
        messageStore.addMessageObserver("ADD", function (message) {
            countForColor++;
            updateIndicatorDisplay();

        });

        messageStore.addMessageObserver("REMOVE", function (removedMessage) {
            countForColor--;
            updateIndicatorDisplay();

        });

        function updateIndicatorDisplay() {
            if (countForColor >= 10) {
                $("#colorCode").css({"background-color": "red"});
            }else{
                $("#colorCode").css({"background-color": "#a94442"});
            }
        }
    }
    function ListDisplay() {
        messageStore.addMessageObserver("ADD", function (message) {
            var value = document.getElementById("messageTextBox").value.toString();
            var messageString = "<p>" + value + "</p>";
            $("#messages").append(messageString);
        });

        messageStore.addMessageObserver("REMOVE", function (removedMessage) {
            $("#messages>p:last").remove();
        });
    }

    Counter();
    ColorCoder();
    ListDisplay();

    $("#addMessage").click(function () {
        var value = document.getElementById("messageTextBox").value.toString();
        messageStore.addMessage(value);
    });

    $("#deleteMessage").click(function () {
        messageStore.removeMessage();

    });


});