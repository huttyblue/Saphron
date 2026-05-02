class class_data_manager {
    mount
    id_internal = 0


    constructor(){
        
    }

    refresh(){
        //var d = document.getElementById(this.mount)
        console.log(this.mount)
        var d = this.mount

        var _top =  document.createElement("div");
        _top.className = "panel_files"
        _top.innerHTML = "DATA MANAGER"
        d.appendChild(_top)
    }
}