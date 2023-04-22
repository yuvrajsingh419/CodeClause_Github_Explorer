const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchbox = document.querySelector("#search")

const getUser = async(username)=>{
    try {
        const response = await fetch(APIURL + username);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        const card = `
        <div class="card">
                <div>
                    <img src="${data.avatar_url}" class="avatar" alt="Florin Pop">
                </div>
                <div class="user-info">
                    <h2>${data.name} </h2>
                    <p>Bio</p>
    
                    <ul class="info">
                        <li>${data.followers} <strong>Followers</strong></li>
                        <li>${data.following} <strong>Following</strong></li>
                        <li>${data.public_repos} <strong>Repos</strong></li>
                    </ul>
    
                    <div id="repos">
                        
                    </div>
                </div>
            </div>`
            main.innerHTML = card;
            getRepos(username)
    } catch (error) {
        alert("Please enter a valid username.");
    }
}


getUser("bhagirath-wscubetech")


const getRepos = async (username) =>{
    const repos = document.querySelector("#repos")
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json();

    data.forEach(
    (item) => {
        console.log(item)
        const elem=document.createElement("a")
        elem.classList.add("repo")
        elem.href = item.html_url
        elem.innerText=item.name
        elem.target="_blank"
        elem.style.color="white"
        
        repos.appendChild(elem)   
    });
}


const formSubmit=()=>{
    if(searchbox.value!=""){
        getUser(searchbox.value)
        searchbox.value=""
    }
    return false;
}


searchbox.addEventListener("focusout",()=>{
    formSubmit()
})