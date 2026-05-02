const node_path = require('node:path');
var id_id = 0;
var ar_subwindows = []


// create main windows

var tab_area_1 = new class_tab_area()
tab_area_1.mount = document.getElementById("panel_mountpoint_files")



var files_panel = new class_subpanel_files()
id_id += 1
files_panel.id_internal = id_id;

var data_manager_panel = new class_data_manager()
id_id += 1
data_manager_panel.id_internal = id_id;


tab_area_1.refresh()
tab_area_1.add_tab(files_panel, "Files")
tab_area_1.add_tab(data_manager_panel, "Data")
tab_area_1.refresh_contents()




//tab_area_1.refresh()

//tab_area_1.refresh_contents()

//files_panel.refresh()




var tab_area_2 = new class_tab_area()
tab_area_2.mount = document.getElementById("panel_mountpoint_documents")

var documents_panel = new class_subpanel_document()
id_id += 1
documents_panel.id_internal = id_id;

tab_area_2.refresh()
tab_area_2.add_tab(documents_panel, "Docs")
tab_area_2.refresh_contents()


class class_subwindow {
    custom_var = 0;
    constructor(tag_id){
        this.tag_id = tag_id
    }

    refresh(){
        this.custom_var += 1;
        document.getElementById(this.tag_id).innerHTML = this.custom_var;
    }

}





function spawn_subwindow(){
    id_id += 1;
    var obj_subwindow = new class_subwindow(id_id);
    ar_subwindows.push(obj_subwindow)
    document.getElementById("area_subwindows").innerHTML += "<div id=" + id_id + "></div>"
    ar_subwindows.forEach((element) => element.refresh())
  
}


function full_refresh(){
    document.getElementById("area_subwindows").innerHTML = ""
    ar_subwindows.forEach((element) => {
        document.getElementById("area_subwindows").innerHTML += "<div id=" + element.tag_id + "></div>"
        element.refresh()
})
    
        
}

function testbutton(){
    const testFolder = './';
    const fs = require('fs');
    document.getElementById("file_list").innerHTML = ""
    fs.readdirSync(testFolder).forEach(file => {
    // will also include directory names
    console.log(file);

    // var inputElement = document.createElement('button');
    // document.getElementById("file_list").appendChild(inputElement)
    // inputElement.innerHTML = testFolder+file
    // inputElement.addEventListener('click', function(){
    //     console.log("test")
    //     open_text_file()
    // });

    

    document.getElementById("file_list").innerHTML+="<button onclick=\"open_text_file('" + testFolder+file+ "')\">"+file+"</button>"
    document.getElementById("file_list").innerHTML+="<br>"
});
}



function open_text_file(_file, _name){
    const fs = require('fs');
    console.log(_file)
    // _file = node_path.relative(_file, "./")+_name
    // console.log(_file)
    // _file = "text_file.txt"
    fs.readFile(_file, 'utf-8', (err, data) => {
        documents_panel.load_document(_file,data)
    });
   
    
}


function cancel_dialog(){
    document.getElementById("dialog_host").style.display = 'none';
}

function  open_dialog(_dialog){
    document.getElementById("dialog_host").style.display = 'block';

        
}
