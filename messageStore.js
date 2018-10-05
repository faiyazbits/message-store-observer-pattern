
function MessageStore() {
    this.messages = [];
    this.messageObservers = {};
    this.messageCount = 0;

    this.addMessage = function (newMessage) {
        this.messages.push(newMessage);
        this.messageCount++;
        this.fireMessageObservers("ADD", newMessage);

    };
    this.removeMessage = function () {
        if (this.messages.length > 0) {
            var removedMessage = this.messages.shift();
            this.messageCount--;
            this.fireMessageObservers("REMOVE", removedMessage);
        }
    };

    this.addMessageObserver = function (eventname, observer) {
        var observerList = this.messageObservers[eventname];
        if (observerList) {
            observerList.push(observer);
        } else {
            var newObserverList = [];
            newObserverList.push(observer);
            this.messageObservers[eventname] = newObserverList;
        }
    };

    this.fireMessageObservers = function (type, actualvalue) {
        var observers = this.messageObservers[type] || [];
        observers.forEach(function (callback) {
            callback(actualvalue);
        });
    }
}





