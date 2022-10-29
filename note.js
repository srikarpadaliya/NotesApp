

display();
let butt = document.getElementById("addBtn");


butt.addEventListener("click", (element) => {
    let text = document.getElementById("addTxt");
    let title  = document.getElementById("title");

    //let status = document.getElementById("mark")

    let notes = localStorage.getItem("note");
    if (notes == null) {
        objnotes = [];
    }
    else {
        objnotes = JSON.parse(notes);
    }
    let obj = {
        text: text.value,
        title: title.value,
        status: "Mark as Important",
        styli: "background-color:white; border-color: #007BFF; color:#007BFF"
    };
    objnotes.push(obj);

    localStorage.setItem("note", JSON.stringify(objnotes));
    text.value = "";
    title.value = "";
    display();
});


function display() {

    let notes = localStorage.getItem("note");
    if (notes == null) {
        objnotes = [];
    }
    else {
        objnotes = JSON.parse(notes);
    }

    let html = "";

    objnotes.forEach((element, index) => {

        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-primary btn-sm col-xs-2 margin-left">Delete Note</button>
                        <button id="mark${index}" onclick="markNote(${index})" class="btn  btn-sm  margin-left" style= "${element.styli}">${element.status}</button>
                    </div>
                </div>`;
    });

    let vari = document.getElementById('notes')

    if (objnotes.length != 0) {
        vari.innerHTML = html;
    }

    else {
        vari.innerHTML = "No notes to display click add notes to add a note";
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("note");
    if (notes == null) {
        objnotes = [];
    }
    else {
        objnotes = JSON.parse(notes);
    }

    objnotes.splice(index, 1);

    localStorage.setItem("note", JSON.stringify(objnotes));

    display();
}

let search_notes = document.getElementById('searchTxt');

search_notes.addEventListener("input", () => {

    let val = search_notes.value.toLowerCase();

    let cardclass = document.getElementsByClassName('notecard');

    Array.from(cardclass).forEach((element) => {

        let text = element.getElementsByTagName('p')[0].innerText;

        if (text.includes(val)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }

    })
})

function highlight()
{
    // creating new mark instance
var ob = new Mark(document.querySelectorAll(".card-text"));


ob.mark(document.getElementById("searchTxt").value);

}

function markNote(ind) {
   /* let mark = document.getElementById(`${index}`);
    // let html = mark.getElementsByTagName('h7')[0];

    console.log(mark.innerText);
    if(mark.innerText==="Marked")
    {
    mark.innerText = "Mark as Important";
    }
    else{
        mark.innerText = "Marked";
    }
    console.log(mark.innerText);


    console.log(`${index}`)
    //display(); */
   // let marking = document.getElementById(`mark${ind}`);
   // console.log(marking)
    
    
    let notes = localStorage.getItem("note");
    objnotes = JSON.parse(notes);
    objnotes.forEach((elem, index) => {
    
        if(index === ind)
        {
            if(elem.status === "Marked")
            {
            elem.status = "Mark as Important";
            elem.styli = "background-color:white; border-color: #007BFF ; color:#007BFF";
        }
        else
        {
            elem.status = "Marked";
            elem.styli = "background-color:steelblue; border-color: white; color:white";
            
            }
        }
    });

    localStorage.setItem("note", JSON.stringify(objnotes));
    display();
}

