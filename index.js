const $notes_area = document.querySelector('.notes_area');
const $plus = document.querySelector('.plus');

let note_hold = false;
const NotesAreaWidth = $notes_area.offsetWidth;
const NotesAreaHeight = $notes_area.offsetHeight;
let $selectedNote = null;
let selectedNoteNumber = null;
let notes = [];
let noteWidth = 0;
let noteHeight = 0;
let startCoords = {
    x: 0,
    y: 0
}
let distance = {
    x: 0,
    y: 0
}

if (!!getLS('info')) {
    notes = getLS('info');
    noteGen(notes);
}
function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

$notes_area.addEventListener('input', function (e) {
    if (e.target.classList.contains('note_title')) {
        $selectedTitle = e.target;
        notes[selectedNoteNumber].title = $selectedTitle.value;
    }
    if (e.target.classList.contains('note_text')) {
        $selectedText = e.target;
        notes[selectedNoteNumber].text = $selectedText.value;
    }
    setLS('info', notes);
});


function noteGen(info) {
    let temp = '';
    for (let i = 0; i < info.length; i++) {
        temp += '<div class="note" style="left: ' + info[i].x + 'px; top: ' + info[i].y + 'px;" data-index="' + i + '"><textarea class="note_title" placeholder="Notes">' + info[i].title + '</textarea> <hr> <textarea class="note_text" placeholder="Typing...">' + info[i].text + '</textarea></div>'
    }
    $notes_area.innerHTML = temp;
    noteWidth = document.querySelector('.note').offsetWidth;
    noteHeight = document.querySelector('.note').offsetHeight;
}
$plus.addEventListener('click', function () {
    notes.push({
        x: 0,
        y: 0,
        title: "",
        text: ""
    });
    noteGen(notes);
});
function notePos(x, y) {
    $selectedNote.style.left = x + 'px';
    $selectedNote.style.top = y + 'px';
}

$notes_area.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('note')) {
        note_hold = true;
        $selectedNote = e.target;
        selectedNoteNumber = e.target.getAttribute('data-index');
        startCoords.x = e.pageX;
        startCoords.y = e.pageY;
    }
});
$notes_area.addEventListener('mouseup', function (e) {
    note_hold = false;
    notes[selectedNoteNumber].x = distance.x;
    notes[selectedNoteNumber].y = distance.y;
    setLS('info', notes);
});

$notes_area.addEventListener('mousemove', function (e) {
    if (note_hold) {
        distance.x = notes[selectedNoteNumber].x + (e.pageX - startCoords.x);
        distance.y = notes[selectedNoteNumber].y + (e.pageY - startCoords.y);

        if (distance.x <= 0) {
            distance.x = 0;
        }
        if (distance.x >= (NotesAreaWidth - noteWidth)) {
            distance.x = NotesAreaWidth - noteWidth;
        }

        if (distance.y <= 0) {
            distance.y = 0;
        }
        if (distance.y >= (NotesAreaHeight - noteHeight)) {
            distance.y = NotesAreaHeight - noteHeight;
        }
        notePos(distance.x, distance.y);
    }
});
     