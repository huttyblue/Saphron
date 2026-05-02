
class class_subpanel_document {
    path = node_path.resolve("./")
    mount = "panel_mountpoint_documents"
    id_internal = 0

    _scroll_area
    _doc
    _span_doc_path

    _dialog_new_document
    _document_name

    constructor(){
        
    }


    refresh(){
        
        var d = this.mount

        var _top =  document.createElement("div");
        _top.className = "panel_documents"
  
        d.appendChild(_top)


        var _toolbar =  document.createElement("div");
        _toolbar.className = "vflex_scrunch"
        _top.appendChild(_toolbar)


        var _btn_new =  document.createElement("button");
        _btn_new.className = "button-icon"
        _btn_new.innerHTML = "<img src='./assets/icons/icon_new.png'>"
        _toolbar.appendChild(_btn_new)
        
        var _btn_save =  document.createElement("button");
        _btn_save.className = "button-icon"
        _btn_save.innerHTML = "<img src='./assets/icons/icon_save.png'>"
        _toolbar.appendChild(_btn_save)

        this._span_doc_path =  document.createElement("span");
        this._span_doc_path.className = "button-icon"
        this._span_doc_path.innerHTML = ""
        _toolbar.appendChild(this._span_doc_path)
        
        
     

        this._scroll_area = document.createElement("div");
        this._scroll_area.className = "scroll_vertical"
      
        _top.appendChild(this._scroll_area)


        this._doc =  document.createElement("div");
        this._doc.className = "document_margin"
        this._doc.innerHTML = "document"
        this._doc.contentEditable = "true"
  
        this._scroll_area.appendChild(this._doc)


        _btn_save.addEventListener('click', this.save_document.bind(this))
        _btn_new.addEventListener('click', this.new_document.bind(this))
        //_btn_up.addEventListener('click', this.nav_up.bind(this))
        
        //this.subpanel_files_refresh()




        // dialog new document

        this._dialog_new_document = document.createElement("div");
        
        this._document_name =  document.createElement("input");
        this._dialog_new_document.appendChild(this._document_name)

        var _btn_confirm =  document.createElement("button");
        _btn_confirm.innerHTML = "Create"
        this._dialog_new_document.appendChild(_btn_confirm)



        _btn_confirm.addEventListener('click', this.confirm_new_document.bind(this))




    }


    new_document(){
        open_dialog("new_document")
        document.getElementById("dialog_mount").innerHTML = ""
        document.getElementById("dialog_mount").appendChild(this._dialog_new_document)
    
    }

    confirm_new_document(){


        this.path = files_panel.path + "/" + this._document_name.value + ".txt"
        this._doc.innerHTML = ""

        const fs = require('node:fs');

        const content = this._doc.innerHTML;

        fs.writeFile(this.path, content, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
            console.log("file saved")
        }
        });
        cancel_dialog()
        
    }

    load_document(_path,_text){
        this._doc.innerHTML = _text
        this._span_doc_path.innerHTML = _path
        this.path = _path
    }
    

    save_document(){
        const fs = require('node:fs');

        const content = this._doc.innerHTML;

        fs.writeFile(this.path, content, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
            console.log("file saved")
        }
        });
    }

    open_text_file(_file){

    
        fetch(_file)
            .then((res) => res.text())
            .then((text) => {
                document.getElementById("area_open_files").innerHTML+="<div class='panel-box'>"
                document.getElementById("area_open_files").innerHTML+=text
        
        
            })
        
    }


   
}