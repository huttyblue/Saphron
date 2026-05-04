const node_path = require('node:path');
const app = require('electron')
const ipcRenderer = require('electron').ipcRenderer;


var id_id = 0;
var ar_subwindows = []

var user_path = ""
var project_path = ""



// var tab_area_2 = new class_tab_area()
// tab_area_2.mount = document.getElementById("panel_mountpoint_documents")

// var documents_panel = new class_subpanel_document()
// id_id += 1
// documents_panel.id_internal = id_id;

// tab_area_2.refresh()
// tab_area_2.add_tab(documents_panel, "Docs")
// tab_area_2.refresh_contents()


ipcRenderer.invoke('get_user_path', 'fileName.txt').then(
  result => set_user_data_path(result)
);


//console.log(RemotePlayback.app.getPath('userData'));





function set_user_data_path(_result){
    console.log(_result)
    user_path = _result
    document.getElementById("readouts").innerHTML += "<br>User Path " + user_path
    const fs = require('fs');
    if (fs.existsSync(user_path+"/saphron_config.txt")) {
        document.getElementById("readouts").innerHTML += "<br>Config File Found, Loading Last Project"
        actually_load_project()
    } else {
        document.getElementById("readouts").innerHTML += "<br>No Config File Found"
    }
}


function open_file_dialog(){
    document.getElementById("readouts").innerHTML += "<br>Enter Path of Saphron Project Below"
    document.getElementById("readouts").innerHTML += "<br><input id='project_path'></input>"
    document.getElementById("readouts").innerHTML += "<br><button onclick='load_project()'> Load Project From Path </button>"
}

function load_project(){
    project_path = document.getElementById("project_path").value
    const fs = require('node:fs');


        fs.writeFile(user_path+"/saphron_config.txt", project_path, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
            console.log("file saved")
        }
    });

    actually_load_project()
}

function actually_load_project(){
    const fs = require('fs');
    
   
    const data = fs.readFileSync(user_path+"/saphron_config.txt", 'utf-8');
    project_path = data;
    console.log(data)
    document.getElementById("readouts").innerHTML += "<br>Loaded Project from Path " + project_path

        
    
    document.getElementById("readouts").innerHTML += "<br>Loaded Project from Path 2 " + project_path
    document.getElementById("readouts").style.display = "none"
    load_saph_project(document.getElementById("smount"), project_path + "/Pages/Homepage.saph")

    
}

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
