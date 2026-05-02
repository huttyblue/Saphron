
class class_tab_area {

    mount


    _tab_contents_mount
    
    _mounted_object
    _toolbar

    tabs = []
    contents = []
   
    current_tab = 0;

    constructor(){
        
    }



    refresh(){

        var d = this.mount
        
         var _top =  document.createElement("div");
        _top.className = "panel_files"
            d.appendChild(_top)

        this._toolbar =  document.createElement("div");
        this._toolbar.className = "tab_bar"
        _top.appendChild(this._toolbar)

        this._tab_contents_mount =  document.createElement("div");
        this._tab_contents_mount.className = "scroll_vertical"
        _top.appendChild(this._tab_contents_mount)
        
        
    }


    add_tab(_tab_object, _tab_name){
        
        _tab_object.mount = this._tab_contents_mount;
        this.tabs.push(_tab_name)
        this.contents.push(_tab_object)

    }


    refresh_contents(){
        this._toolbar.innerHTML = ""
        this._tab_contents_mount.innerHTML = ""

        for (let i = 0; i < this.tabs.length; i++) {
             var _btn =  new tab_button();
             _btn._name = this.tabs[i]
             _btn._index = i
             _btn._host = this._toolbar
             _btn._tab_area_ref = this;
             _btn.refresh()
            

            if(this.current_tab == i){
                this.contents[i].refresh()
            }
            

        }


        
    }




}


    class tab_button {
    _button
    _name
    _index
    _host
    _tab_area_ref
    

    constructor(){
        
    }

    refresh(){
        this._button =  document.createElement("button");

        if(this._tab_area_ref.current_tab == this._index){
            this._button.className = "button-tab"
        }
        else{
            this._button.className = "button-tab-deselected"
        }


        this._button.className = "button-tab"
  
        this._button.innerHTML = this._name
        this._button.addEventListener('click', this.on_tab_press.bind(this))
        
        this._host.appendChild(this._button)
    }

    on_tab_press(){

       

        this._tab_area_ref.current_tab = this._index
        this._tab_area_ref.refresh_contents()
    }




}