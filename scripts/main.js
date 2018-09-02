var _remainderEntries = [];

$(document).ready(function () {
    $('#create-remainder-btn').on('click', createNewRemainder);
    $('#emptyLocalStorage').on('click', function () {
        console.log('removing remainders');
        chrome.storage.local.remove(['remainders'], function () {
            $('#remainders-container').html();
        })
        $('#remainders-container').html('');
    });

    loadRemaindersFromLocalStorage().then((response) => {
        if (_remainderEntries.length) {
            createRemaindersList();
        }
    }, (error) => {
        console.log(error); // TODO: handle exception
    });

    function loadRemaindersFromLocalStorage() {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(['remainders'], function (result) {
                if (result.remainders == undefined) {
                    reject();
                } else {
                    _remainderEntries.length = 0;
                    result.remainders.map((entry) => {
                        _remainderEntries.push(entry);
                        resolve();
                    });
                    console.log("Fetdhed values " + _remainderEntries);
                }
            });
        });
        // if (typeof (Storage) !== "undefined") {
        //     if (localStorage.getItem('remainders') != null) {
        //         __remainderEntries = JSON.parse(localStorage.getItem('remainders'));
        //     }
        // } else {
        //     console.log('Your Browser Doesn\'t Support LocalStorage.');
        // }

    }


    function storeRemaindersToLocalStorage() {
        // if (typeof (Storage) !== "undefined") {
        //     localStorage.setItem('remainders', JSON.stringify(__remainderEntries));
        // } else {
        //     console.log('Your Browser Doesn\'t Support LocalStorage.');
        // }

        return new Promise(function (resolve, reject) {
            chrome.storage.local.set({
                "remainders": _remainderEntries
            }, function () {
                console.log('Stored values ' + _remainderEntries);
                resolve();
            });

        });
    }

    function createRemaindersList() { // add existing remainders to table list
        var remainder_card = null;
        $('#remainders-container').html('');
        _remainderEntries.map(function (item, index) {
            var date = new Date(item.standardTime);
            // var remainder_card = '<tr class="remainder-card" id="remainder_card_' + item.identity + '">' +
            //     '<td><input type="text" data-default-time="' + item.time + '" id="time_picker_' + item.identity + '"></td>' +
            //     '<td><input type="text" data-default-date="' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '" id="date_picker_' + item.identity + '"></td>' +
            //     '<td><button onclick="addRemainder(' + item.identity + ')" class="add_btn">add</button></td>' +
            //     '<td><button onclick="deleteRemainder(' + item.identity + ')" class="delete_btn"><div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 268.476 268.476"><path d="M63.119 250.254s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.035 98.442a8.948 8.948 0 0 1 8.949-8.949 8.95 8.95 0 0 1 8.95 8.949l-8.95 134.238a8.949 8.949 0 1 1-17.898 0l8.949-134.238zm-44.746 0a8.949 8.949 0 0 1 8.949-8.949 8.948 8.948 0 0 1 8.949 8.949V232.68a8.948 8.948 0 0 1-8.949 8.949 8.949 8.949 0 0 1-8.949-8.949V98.442zm-35.797-8.95a8.948 8.948 0 0 1 8.949 8.949l8.95 134.238a8.95 8.95 0 0 1-17.899 0L80.543 98.442a8.95 8.95 0 0 1 8.949-8.95zM218.36 35.811h-39.376V17.899C178.984 4.322 174.593 0 161.086 0H107.39C95.001 0 89.492 6.001 89.492 17.899v17.913H50.116c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431H218.36c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l.001-17.913h53.695v17.913z" fill-rule="evenodd" clip-rule="evenodd"/></svg></div></button></td>' +
            //     '</tr>';

            remainder_card += '<tr class="remainder-card" id="remainder_card_' + item.identity + '">' +
                '<td><input type="text" data-default-time="' + item.time + '" id="time_picker_' + item.identity + '"></td>' +
                '<td><input type="text" data-default-date="' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '" id="date_picker_' + item.identity + '"></td>' +
                '<td><button data-identity="' + item.identity + '" class="add_btn">add</button></td>' +
                '<td><button data-identity="' + item.identity + '" class="delete_btn"><div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 268.476 268.476"><path d="M63.119 250.254s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.035 98.442a8.948 8.948 0 0 1 8.949-8.949 8.95 8.95 0 0 1 8.95 8.949l-8.95 134.238a8.949 8.949 0 1 1-17.898 0l8.949-134.238zm-44.746 0a8.949 8.949 0 0 1 8.949-8.949 8.948 8.948 0 0 1 8.949 8.949V232.68a8.948 8.948 0 0 1-8.949 8.949 8.949 8.949 0 0 1-8.949-8.949V98.442zm-35.797-8.95a8.948 8.948 0 0 1 8.949 8.949l8.95 134.238a8.95 8.95 0 0 1-17.899 0L80.543 98.442a8.95 8.95 0 0 1 8.949-8.95zM218.36 35.811h-39.376V17.899C178.984 4.322 174.593 0 161.086 0H107.39C95.001 0 89.492 6.001 89.492 17.899v17.913H50.116c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431H218.36c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l.001-17.913h53.695v17.913z" fill-rule="evenodd" clip-rule="evenodd"/></svg></div></button></td>' +
                '</tr>';
        });

        $('#remainders-container').prepend(remainder_card);
        $('#remainders-container input[id^=time_picker_]').timeDropper();
        $('#remainders-container input[id^=date_picker_]').dateDropper();
    }

    function createNewRemainder() {

        var currentTimeStamp = new Date().getTime(); // used as unique id 
        // var remainder_card = '<tr class="remainder-card" id="remainder_card_' + currentTimeStamp + '">' +
        //     '<td><input type="text" id="time_picker_' + currentTimeStamp + '"></td>' +
        //     '<td><input type="text" id="date_picker_' + currentTimeStamp + '"></td>' +
        //     '<td><button onclick="addRemainder(' + currentTimeStamp + ')" class="add_btn">add</button></td>' +
        //     '<td><button onclick="deleteRemainder(' + currentTimeStamp + ')" class="delete_btn"><div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 268.476 268.476"><path d="M63.119 250.254s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.035 98.442a8.948 8.948 0 0 1 8.949-8.949 8.95 8.95 0 0 1 8.95 8.949l-8.95 134.238a8.949 8.949 0 1 1-17.898 0l8.949-134.238zm-44.746 0a8.949 8.949 0 0 1 8.949-8.949 8.948 8.948 0 0 1 8.949 8.949V232.68a8.948 8.948 0 0 1-8.949 8.949 8.949 8.949 0 0 1-8.949-8.949V98.442zm-35.797-8.95a8.948 8.948 0 0 1 8.949 8.949l8.95 134.238a8.95 8.95 0 0 1-17.899 0L80.543 98.442a8.95 8.95 0 0 1 8.949-8.95zM218.36 35.811h-39.376V17.899C178.984 4.322 174.593 0 161.086 0H107.39C95.001 0 89.492 6.001 89.492 17.899v17.913H50.116c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431H218.36c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l.001-17.913h53.695v17.913z" fill-rule="evenodd" clip-rule="evenodd"/></svg></div></button></td>' +
        //     '</tr>';

        var remainder_card = '<tr class="remainder-card" id="remainder_card_' + currentTimeStamp + '">' +
            '<td><input type="text" id="time_picker_' + currentTimeStamp + '"></td>' +
            '<td><input type="text" id="date_picker_' + currentTimeStamp + '"></td>' +
            '<td><button data-identity="' + currentTimeStamp + '" class="add_btn">add</button></td>' +
            '<td><button data-identity="' + currentTimeStamp + '" class="delete_btn"><div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 268.476 268.476"><path d="M63.119 250.254s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.035 98.442a8.948 8.948 0 0 1 8.949-8.949 8.95 8.95 0 0 1 8.95 8.949l-8.95 134.238a8.949 8.949 0 1 1-17.898 0l8.949-134.238zm-44.746 0a8.949 8.949 0 0 1 8.949-8.949 8.948 8.948 0 0 1 8.949 8.949V232.68a8.948 8.948 0 0 1-8.949 8.949 8.949 8.949 0 0 1-8.949-8.949V98.442zm-35.797-8.95a8.948 8.948 0 0 1 8.949 8.949l8.95 134.238a8.95 8.95 0 0 1-17.899 0L80.543 98.442a8.95 8.95 0 0 1 8.949-8.95zM218.36 35.811h-39.376V17.899C178.984 4.322 174.593 0 161.086 0H107.39C95.001 0 89.492 6.001 89.492 17.899v17.913H50.116c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431H218.36c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l.001-17.913h53.695v17.913z" fill-rule="evenodd" clip-rule="evenodd"/></svg></div></button></td>' +
            '</tr>';

        $('#remainders-container').prepend(remainder_card);
        $('#remainders-container input[id^=time_picker_' + currentTimeStamp + ']').timeDropper();
        $('#remainders-container input[id^=date_picker_' + currentTimeStamp + ']').dateDropper();

        $('#remainders-container .remainder-card button.add_btn').on('click', addRemainder);
    }

    function deleteRemainder(idToDelete) {

        _remainderEntries.map(function (item, index) {
            if (item.identity == idToDelete) {
                _remainderEntries.splice(index, 1);
            }
        });

        $('#remainder_card_' + idToDelete).remove();

        storeRemaindersToLocalStorage();
        loadRemaindersFromLocalStorage();

        if (_remainderEntries.length > 0) {
            createRemaindersList();
        }
    }

    function addRemainder() {
        var newRemainderId = $(this).data('identity');
        var time = $('#time_picker_' + newRemainderId).val();
        var date = $('#date_picker_' + newRemainderId).val();
        var newTime = null;
        var newDate = null;

        if (time.substring(6, 8) == 'pm') {
            newTime = (Number(time.substring(0, 2)) + 12) + ":" + time.substring(3, 5) + ":00";
        } else {
            newTime = time.substring(0, 5) + ":00";
        }

        newDate = date.replace('st,', ',').replace('nd,', ',').replace('rd,', ',').replace('th,', ',');

        _remainderEntries.push({
            'time': time,
            'date': date,
            'standardTime': newDate + ' ' + newTime,
            'timeStamp': new Date(newDate + ' ' + newTime).getTime(),
            'state': 'active',
            'identity': newRemainderId
        });

        storeRemaindersToLocalStorage().then(function () {
            loadRemaindersFromLocalStorage().then((response) => {
                if (_remainderEntries.length) {
                    createRemaindersList();
                }
            }, (error) => {
                console.log('error'); // TODO: handle exception
            });
        });
    }
});