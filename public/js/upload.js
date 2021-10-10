const SelectForm = document.querySelector("#selectFormatForm");
let UploadForm = document.querySelector("#UploadForm");
let items = document.querySelectorAll(".format");


let label = document.createElement("label");
let button = document.createElement("button");
let input = document.createElement("input");

label.htmlFor = "data";
input.id = "data";
button.innerHTML = "Summarize it!";

SelectForm.addEventListener("submit", function(e){
    let choice;
    for(let i in items)
    {
        if(items[i].checked)
        {choice = items[i].id}
    }

    if(choice == "mp4" || choice == "mp3")
    {
        label.innerText = "Select a file: ";
        input.type = "file";
        input.name = "data";
        if(choice == "mp4"){input.accept=".mp4"}
        else{input.accept="mp3";}
    }
    else{
        label.innerText = "Enter your link: ";
        input.type = "text";
    }

    UploadForm.appendChild(label);
    UploadForm.appendChild(input);
    UploadForm.appendChild(button);

    e.preventDefault();
})

/*
<form id="UploadForm">
    <label for="data">Select a file:</label>
    <input type="file" id="data" name="file" value="file">
    <input type="submit" value="Summarize it!">
</form> */