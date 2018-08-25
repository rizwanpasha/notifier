var _remainderEntries = [];

$(document).ready(function () {
    $('#remainders-container input[id^=time_picker_]').timeDropper();
    $('#remainders-container input[id^=date_picker_]').dateDropper();

    $('#create-remainder-btn').on('click', createNewRemainder);
});

function createNewRemainder() {
    var currentTimeStamp = new Date().getTime();
    var remainder_card = '<tr class="remainder-card" id="remainder_card_' + currentTimeStamp + '">' +
        '<td><input type="text" id="time_picker_' + currentTimeStamp + '"></td>' +
        '<td><input type="text" id="date_picker_' + currentTimeStamp + '"></td>' +
        '<td><button onclick="addRemainder(' + currentTimeStamp + ')" class="add_btn">add</button></td>' +
        '<td><button onclick="deleteRemainder(' + currentTimeStamp + ')" class="delete_btn"><div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 268.476 268.476"><path d="M63.119 250.254s3.999 18.222 24.583 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.035 98.442a8.948 8.948 0 0 1 8.949-8.949 8.95 8.95 0 0 1 8.95 8.949l-8.95 134.238a8.949 8.949 0 1 1-17.898 0l8.949-134.238zm-44.746 0a8.949 8.949 0 0 1 8.949-8.949 8.948 8.948 0 0 1 8.949 8.949V232.68a8.948 8.948 0 0 1-8.949 8.949 8.949 8.949 0 0 1-8.949-8.949V98.442zm-35.797-8.95a8.948 8.948 0 0 1 8.949 8.949l8.95 134.238a8.95 8.95 0 0 1-17.899 0L80.543 98.442a8.95 8.95 0 0 1 8.949-8.95zM218.36 35.811h-39.376V17.899C178.984 4.322 174.593 0 161.086 0H107.39C95.001 0 89.492 6.001 89.492 17.899v17.913H50.116c-7.914 0-14.319 6.007-14.319 13.43 0 7.424 6.405 13.431 14.319 13.431H218.36c7.914 0 14.319-6.007 14.319-13.431 0-7.423-6.405-13.431-14.319-13.431zm-57.274 0h-53.695l.001-17.913h53.695v17.913z" fill-rule="evenodd" clip-rule="evenodd"/></svg></div></button></td>' +
        '</tr>';

    $('#remainders-container').prepend(remainder_card);
    $('#remainders-container input[id^=time_picker_' + currentTimeStamp + ']').timeDropper();
    $('#remainders-container input[id^=date_picker_' + currentTimeStamp + ']').dateDropper();
}

function deleteRemainder(idToDelete) {
    $('#remainder_card_' + idToDelete).remove();
}

function addRemainder(newRemainderId) {
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
        'timeStamp': new Date(newDate + ' ' + newTime).getTime()
    });

    console.log(_remainderEntries);
}