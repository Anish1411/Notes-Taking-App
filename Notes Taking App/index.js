showNote();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(event) {
  let notesObj = new Array();

  let addTitle = document.getElementById('addTitle');
  let addTxt = document.getElementById('addTxt');

  let notes = localStorage.getItem("notes");

  if (notes != null) {
    notesObj = JSON.parse(notes);
}

let myObj = {
  title: addTitle.value,
  text: addTxt.value
}

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  // console.log(notesObj);
  showNote();
});

function showNote(){
  let notes = localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj = JSON.parse(notes);
  }

  let html="";
  notesObj.forEach(function(element , index) {
    html+=` <div class="noteCard my-2 mx-2 card" id="NoteCard" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${element.title} </h5>
       <p class="card-text" id="notePara"> ${element.text}</p>
        <button id="${index}" onclick="DeleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
</div>`;
    
  });

  let notesElem = document.getElementById("notes");
  if(notesObj.length!=0){
    notesElem.innerHTML=html;
  }
  else{
    notesElem.innerHTML=`Nothing to show! Use "<strong>Add Note</strong>" Button to add new notes`;
  }
}



function DeleteNote(index){
  let notes = localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index , 1);
  localStorage.setItem("notes" , JSON.stringify(notesObj));
  showNote();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let pTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);

        if(pTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
