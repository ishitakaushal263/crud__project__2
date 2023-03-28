let globalarray = [];

let taskyy = document.getElementById("roww_id");

let taskdetail = ()=>{
    let obj = {
        id : `${Date.now()}`,
        url : document.getElementById("image_url").value ,
        title : document.getElementById("task_title").value ,
        type : document.getElementById("task_type").value ,
        description : document.getElementById("task_description").value ,
    };

    taskyy.insertAdjacentHTML('beforeend', card(obj));


    globalarray.push(obj);
    setlocalstorage();

}


let card = ({id , url , title , type , description}) => {
     return `<div style="margin-top: 20px" class="col-md-6 col-lg-4 " id=${id} key=${id} >
      <div class="card">
        <div class="card-header d-flex justify-content-end">
          <button class="btn btn-outline-info" name=${id} onclick="edittask(this)">
            <i class="fa fa-pencil" aria-hidden="true" name=${id} onclick="edittask(this)"></i>
          </button>
          <button class="btn btn-outline-danger" name=${id} onclick="deletetask(this)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <img
          src="${url}"
        />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            ${description}
          </p>
          <span class="badge text-bg-primary">${type}</span>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary">
            Open Task
          </button>
        </div>
      </div>
    </div>`
}

let setlocalstorage =()=>{
    localStorage.setItem("tasky", JSON.stringify({key:globalarray}));
}
let getlocalstorage = ()=>{
   let get_key_value = JSON.parse(localStorage.getItem("tasky"));
   if (get_key_value){
    globalarray = get_key_value.key;
   }
   globalarray.map((carddata)=>{
    taskyy.insertAdjacentHTML('beforeend', card(carddata));
   })  
}

let deletetask = (e)=>{
     let target_id = e.getAttribute("name");
      const neww = globalarray.filter((carddata)=>{
         if(carddata.id!==target_id){
            return carddata.id;
         }
     })
     globalarray= neww;
     setlocalstorage();
     window.location.reload();

}

let edittask = (e) =>{

  console.log(e.parentNode.parentNode.parentNode.childNodes[5]);   //one parent many child // [2] index of child
  // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
  // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")); // attribute and value
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true"));
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true"));
  console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]);
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "savededittask(this)")
  console.log(e.parentNode.parentNode.childNodes[3])
}



 let savededittask = (e)=>{
  const targetID = e.getAttribute("name");
  const newTaskDetails = {
      id: e.parentNode.parentNode.parentNode.getAttribute("id"),
      url: e.parentNode.parentNode.childNodes[3].getAttribute("name"),
      title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
      type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
      description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
  }
  const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
  console.log(refid)
  let objIndex = globalarray.findIndex((obj => obj.id == refid));
  console.log(objIndex)
  globalarray[objIndex] = newTaskDetails

    setlocalstorage();
  window.location.reload();
}
 

