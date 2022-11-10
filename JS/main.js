//Main Variables
let input=document.getElementById("github");
let form=document.querySelector('form');
let button=document.querySelector(".btn");
let showData=document.querySelector(".show-data");
window.onload=function(){
    input.focus();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getRepose();

})



//getRepose Function
function getRepose(){
    if(input.value ==""){
        showData.innerHTML=`<p class='mssg'>Please Write Github Username</p>`;
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((result)=>result.json())
        .then(
            (data)=>{
                // showData.innerHTML="";
                showData.innerHTML=`<p class='mssg r'>Repos from ${input.value}</p>`
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
                if(data.message=='Not Found'){
                    showData.innerHTML=`<p class='mssg'>${input.value} is Not Found </p>`;
                }
                input.value ="";
            }
        )
    }
}