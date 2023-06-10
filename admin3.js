document.getElementById("findStudent").addEventListener("submit", (e) => {
    e.preventDefault()
    user = document.getElementById("user").value
    fetch("http://localhost:3000/api/v1/admin/find", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("user")
        },
        body: JSON.stringify({user})
    }).then((res) => {
        if(res.status != 200){
            alert("greška")
        }
        else{
            return res.json()
        }
    }).then(data => {
        console.log(data)
        let ach = {}
        users = document.getElementById("users")
        data.forEach(element => {
            console.log(element)
            var div = document.createElement("div")
            var name = document.createElement("h3")
            name.style.display = "inline"
            name.innerHTML = "Korisničko ime: "
            var pname = document.createElement("p")
            pname.innerHTML = element["user_name"]
            div.appendChild(name)
            div.appendChild(pname)
            div.appendChild(document.createElement("br"))

            var name = document.createElement("h3")
            name.style.display = "inline"
            name.innerHTML = "Email adresa: "
            var pname = document.createElement("p")
            pname.innerHTML = element["email"]
            div.appendChild(name)
            div.appendChild(pname)
            div.appendChild(document.createElement("br"))

            var name = document.createElement("h3")
            name.style.display = "inline"
            name.innerHTML = "Bodovi: "
            var pname = document.createElement("p")
            pname.innerHTML = element["points"]
            div.appendChild(name)
            div.appendChild(pname)
            div.appendChild(document.createElement("br"))

            users.appendChild(div)
            users.appendChild(document.createElement("hr"))

        });
    })
})

document.getElementById("logout").addEventListener("click", () => {
    console.log("HEeh")
    localStorage.clear()
    window.location.href = "home.html"
})