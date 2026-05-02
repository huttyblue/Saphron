
const electron = require('electron')

class class_subpanel_files {
    path = node_path.resolve("./")
    mount
    id_internal = 0

    _files_list
    _path_readout

    _dialog_new_folder
    _folder_name
    constructor(){
        
    }

    refresh(){
        //var d = document.getElementById(this.mount)
        console.log(this.mount)
        var d = this.mount

        var _top =  document.createElement("div");
        _top.className = "panel_files"
    
        d.appendChild(_top)

        // var _top =  document.createElement("div");
        // _top.className = "vsplit"
        // _top.style = "width:146px"
        // d.appendChild(_top)


        var _toolbar =  document.createElement("div");
        _toolbar.className = "vflex_scrunch"
        _top.appendChild(_toolbar)

        
 
        // toolbar
        this._path_readout =document.createElement("input");
        this._path_readout.value = node_path.resolve(this.path)
        _toolbar.appendChild(this._path_readout)

        var _btn_refresh =  document.createElement("button");
        _btn_refresh.className = "button-icon"
        _btn_refresh.innerHTML = "<img src='./assets/icons/icon_refresh.png'>"
       
        _toolbar.appendChild(_btn_refresh)

        var _btn_up =  document.createElement("button");
        _btn_up.className = "button-icon"
        _btn_up.innerHTML = "<img src='./assets/icons/icon_up.png'>"
       
        _toolbar.appendChild(_btn_up)
        


        var _btn_new_folder =  document.createElement("button");
        _btn_new_folder.className = "button-icon"
        _btn_new_folder.innerHTML = "<img src='./assets/icons/icon_new_folder.png'>"
       
        _toolbar.appendChild(_btn_new_folder)
     

        this._files_list = document.createElement("div");
        this._files_list.className = "scroll_vertical"
        _top.appendChild(this._files_list)

        _btn_refresh.addEventListener('click', this.subpanel_files_refresh.bind(this))
        _btn_up.addEventListener('click', this.nav_up.bind(this))
        _btn_new_folder.addEventListener('click', this.new_folder.bind(this))
        
        this.subpanel_files_refresh()






        // dialog new folder

        this._dialog_new_folder = document.createElement("div");
        
        this._folder_name =  document.createElement("input");
        this._dialog_new_folder.appendChild(this._folder_name)

        var _btn_confirm =  document.createElement("button");
        _btn_confirm.innerHTML = "Create"
        this._dialog_new_folder.appendChild(_btn_confirm)



        _btn_confirm.addEventListener('click', this.confirm_new_folder.bind(this))



    }

    subpanel_files_refresh(){
        this.list_dir(this._files_list)
    }

    nav_up(){
        console.log(this.path)
        this.path = this.path.substring(0, this.path.lastIndexOf("\\"))
        console.log(this.path)
        this._path_readout.value = node_path.resolve(this.path)
        this.list_dir(this._files_list)
    }

    nav_to(_newpath){
        console.log(this._new_path)
        this.path = _newpath
        this._path_readout.value = node_path.resolve(this.path)
        this.list_dir(this._files_list)
    }

    new_folder(){
        open_dialog("new_document")
        document.getElementById("dialog_mount").innerHTML = ""
        document.getElementById("dialog_mount").appendChild(this._dialog_new_folder)
    }

    confirm_new_folder(){
        const fs = require('node:fs');

        const folderName = this.path + "/" + this._folder_name.value;

        try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        } catch (err) {
        console.error(err);
        }
        cancel_dialog()
    }


    list_dir(d){
        //const testFolder = './';
        const fs = require('fs');
        this._files_list.innerHTML = ""
        fs.readdirSync(this.path).forEach(file => {
            // will also include directory names
            //console.log(file);
            //console.log(node_path.resolve(this.path));

            // var inputElement = document.createElement('button');
            // document.getElementById("file_list").appendChild(inputElement)
            // inputElement.innerHTML = testFolder+file
            // inputElement.addEventListener('click', function(){
            //     console.log("test")
            //     open_text_file()
            // });

            var _file_button =  new file_button()
            _file_button._path = this.path+file
            _file_button._name = file
            _file_button._host = this._files_list
            _file_button._parent = this
            _file_button.refresh()


          
        
            // _top.appendChild(_btn_up)
            
            // this._files_list.innerHTML+="<button onclick=\"open_text_file('" + this.path+file+ "')\">"+file+"</button>"
            // this._files_list.innerHTML+="<br>"
        });
    
    
        
    }


    
    

}




class file_button {
    _button
    _path
    _host
    _name
    _parent

    constructor(){
        
    }

    refresh(){
        this._button =  document.createElement("button");
        this._button.className = "button-file"
        if(this._name.search(".txt") != -1){
            this._button.innerHTML = "<img src='./assets/icons/icon_file.png'>" + this._name
            this._button.addEventListener('click', this.open_document.bind(this))
        }
        else if(this._name.indexOf('.') != -1){
            this._button.innerHTML = "<img src='./assets/icons/icon_object.png'>" + this._name

        }
        if(this._name.indexOf('.') == -1){
            this._button.innerHTML = "<img src='./assets/icons/icon_folder.png'>" + this._name
            this._button.addEventListener('click', this.open_folder.bind(this))
        }
       
        this._host.appendChild(this._button)
    }

    open_folder(){
        this._parent.nav_to(this._parent.path + "\\" + this._name)
    }

    open_document(){
        console.log(this._parent.path + "\\" + this._name)
        
        open_text_file(this._parent.path + "\\" + this._name, this._name)
    }


}
