class saphron_button {
    _button
    _path
    _host
    _name
    _parent

    constructor(){
        
    }

    refresh(){
        this._button =  document.createElement("button");
        this._button.className = "saphron_button"
       
		this._button.innerHTML = this._name
		this._button.addEventListener('click', this.open_document.bind(this))
	
       console.log("press")
        this._host.appendChild(this._button)
    }

    

    open_document(){
        
        console.log("press")
        load_saph_project(document.getElementById("smount"),project_path+"/"+this._path)
    }


}







var smount = document.getElementById("smount");
//smount.innerHTML = "Saphron Loaded"


function load_saph_project(_mount, _path){
	fetch(_path)
	.then(response => response.text())
	.then((data) => {
		load_saph(smount, data)
	  })
	
}





function load_saph(_mount, _data){
	var data_ar = _data.split('\n')

	var return_html = ""
	var on_next = ""
	var previous_tag = ""
	var ac = smount;

	for(var i = 0; i < data_ar.length; i++){
		if(on_next != ""){
			if(on_next.indexOf("filelist") != -1){
				
				return_html += "<h4 class='saphron_header4'>" + data_ar[i] + "</h4>"
				var ar_file_list = list_files_for(data_ar[i])
				for(var j = 0; j < ar_file_list.length; j++){
					//return_html += "<br><button class='saphron_button'>" + ar_file_list[j].toString().substring(0,ar_file_list[j].search(".saph")) + "</button>";
					var _saphron_button =  new saphron_button()
					_saphron_button._path = "/Pages/"+data_ar[i]+"/"+ar_file_list[j]
					_saphron_button._name = ar_file_list[j].toString().substring(0,ar_file_list[j].search(".saph"))
					_saphron_button._parent = this
					_saphron_button._host = ac
					_saphron_button.refresh()
					
					
					console.log(ar_file_list[j].toString())
				}

				on_next = ""
				
			}
		}
			else{
			if(data_ar[i].charAt(0) == ">"){
				//return_html += previous_tag;
				
			}
			else{
				var _new = document.createElement("span");
				_new.textContent = data_ar[i]
				ac.appendChild(_new)
				
			}

			if(data_ar[i].indexOf(">header") != -1){
				var _new = document.createElement("h1");
				_new.className = 'saphron_header'
				_new.innerHTML = data_ar[i+1]
				smount.appendChild(_new)
				i += 1;
				
			
			}


			if(data_ar[i].indexOf(">panel") != -1){
				var _new = document.createElement("div");
				_new.className = 'saphron_panel'
				smount.appendChild(_new)
				ac = _new 
			}

			if(data_ar[i].indexOf(">filelist") != -1){
				var _new = document.createElement("div");
				_new.className = 'saphron_panel'
				smount.appendChild(_new)
				ac = _new;
				on_next = "filelist"
				//previous_tag = "</div>"
			}



			if(data_ar[i].indexOf(">footer") != -1){
				return_html += ""
			}

		}
		//console.log(return_html)

	}

	//smount.innerHTML += return_html

}

function list_files_for(_name){
	var fs = require('fs');
	var files = fs.readdirSync(project_path + '/Pages/'+_name.trim())
	//console.log(files)
	return files
}



