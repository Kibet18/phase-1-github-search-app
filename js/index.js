//Capture HTML elements
const form = document.getElementById('githubForm');
const textBox = document.getElementById('search');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repos-list');


//Searching for users via the github api user end point
function searchUser(username){
    let name = document.createElement('li');
    name.id = 'username';
    name.textContent = username.login;
    name.onclick = ()=>{
        getRepos(username.login);
    }
    userList.appendChild(name);
    let avatar = document.createElement('img');
    avatar.src = username.avatar_url;
    avatar.alt = `This is the avatar for ${username.login}`;
    avatar.id = 'avatar';
    name.appendChild(avatar);
    let profileLink = document.createElement('a');
    profileLink.id = 'userLink';
    profileLink.href = username.html_url;
    profileLink.textContent = `Link to ${username.login}'s profile`;
    name.appendChild(profileLink);
}


//Function for fetching data with user endpoint
function fetchUserData(name){
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
    .then((data)=>{
        for(let i in data){
            let itemObj = data[i];
            if(typeof itemObj === 'object'){
                itemObj.forEach((details)=>{
                    searchUser(details);
                })
            }
        }
    })
    .catch(err => console.error(err))
}

//Submit event for the form
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name = textBox.value;
    fetchUserData(name);
})

//Fetch user repositories
function getRepos(name){
    fetch(`https://api.github.com/users/${name}/repos`)
    .then(res=>res.json())
    .then((data)=>{
        data.forEach((repo)=>{
            let list = document.createElement('li');
            list.textContent = repo.name;
            repoList.appendChild(list);
            let link = document.createElement('a');
            link.textContent = `This is a link to ${repo.name}`;
            link.href = repo.html_url;
            list.appendChild(link);
        })
    })
    .catch(err=>console.error(err))
}