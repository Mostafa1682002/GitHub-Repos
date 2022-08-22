//Main Variables
let input=document.getElementById("github");
let button=document.querySelector(".btn");
let showData=document.querySelector(".show-data");

button.addEventListener("click",(e)=>e.preventDefault())

window.onload=function(){
    input.focus();
}




button.onclick=function(){
    getRepose();
}



//getRepose Function
function getRepose(){
    if(input.value ==""){
        showData.innerHTML=`<span>Please Write Github Username</span>`;
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`).then(
            (result)=>{
                return result.json();
            }
        ).then(
            (data)=>{
                showData.innerHTML="";
                for(let x=0;x<data.length;x++){
                    let divRepo=document.createElement("div");
                    divRepo.className="repose";
                    let nameRepo=document.createElement("div");
                    nameRepo.className="name-repose";
                    let nameRepoText=document.createTextNode(`${data[x].name}`);
                    nameRepo.appendChild(nameRepoText);

                    divRepo.appendChild(nameRepo);
                    
                    let links=document.createElement("div");
                    links.className="links";
                    let start=document.createElement("span");
                    start.className="start";
                    let startText=document.createTextNode(`Start ${data[x].stargazers_count}`);
                    start.appendChild(startText);
                    links.appendChild(start);
                    let visite=document.createElement("a");
                    visite.className="visite";
                    visite.setAttribute("href",`https://github.com/${input.value}/${data[x].name}`);
                    visite.setAttribute("target",`_blank`);
                    let visiteText=document.createTextNode("Visite");
                    visite.appendChild(visiteText);
                    links.appendChild(visite);
                    
                    divRepo.appendChild(links);
                    
                    showData.appendChild(divRepo);
                }
                console.log(data);
            }
        )
    }
}