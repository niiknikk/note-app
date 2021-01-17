const add = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(function(note){
        addNewNote(note);
    });
}
add.addEventListener('click', function(){
    addNewNote();
});

function addNewNote ( text = '' ){
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `        
    <div class="tools">
        <button class="edit"><img src="https://img.icons8.com/nolan/64/copy.png"/>
        </button>
        <button class="delete"><img src="https://img.icons8.com/nolan/64/delete-forever.png"/>
        </button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
    

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    textArea.addEventListener('input', function(e){
        const { value } = e.target;
        main.innerHTML = marked(value);

        updateLS();
    });

    deleteBtn.addEventListener('click', function(){
        note.remove();

        updateLS();
    });

    editBtn.addEventListener('click', function(){
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    document.body.appendChild(note);
}


function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    
    notesText.forEach( function(note){
        notes.push(note.value);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));

}