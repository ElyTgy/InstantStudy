const SelectForm = document.querySelector("#selectFormatForm");
let UploadForm = document.querySelector("#UploadForm");
let items = document.querySelectorAll(".format");
let logo = document.querySelector("#logo");


let label = document.createElement("label");
let button = document.createElement("button");
let input = document.createElement("input");
let loading = document.createElement("h5");
let loadingExplain = document.createElement("h6");

label.htmlFor = "data";
input.id = "data";
input.required = true;
button.innerHTML = "Summarize it!";
loading.innerText = "Loading data...";
loading.className = "my-5 mx-5 text-center";
loadingExplain.innerText = "This might take a while, so hang tight and don't close the browser!!";
loadingExplain.className = "my-5 mx-5 text-center";

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


UploadForm.addEventListener("submit", function(e){
    logo.after(loadingExplain);
    logo.after(loading);
})
/*
<form id="UploadForm">
    <label for="data">Select a file:</label>
    <input type="file" id="data" name="file" value="file">
    <input type="submit" value="Summarize it!">
</form> */