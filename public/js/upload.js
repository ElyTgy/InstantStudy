const SelectForm = document.querySelector("#selectFormatForm");
let UploadForm = document.querySelector("#UploadForm");
let items = document.querySelectorAll(".format");

SelectForm.addEventListener("submit", function(e){
    for(let i in items)
    {
        let choice;
        if(items[i].checked)
        {choice = items[i].id}
    }

    document.createElement
    e.preventDefault();
})


/*
<form id="UploadForm">
    <label for="file">Select a file:</label>
    <input type="file" id="file" name="file" value="file">
    <input type="submit" value="Summarize it!">
</form> */