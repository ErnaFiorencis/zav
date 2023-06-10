
function f(){
    fetch("http://localhost:3000/api/v1/students/rang", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("user")
        },
    }).then((res) => {
        if(res.status != 200){
            alert("greška")
        }
        else{
            return res.json()
        }
    }).then(data => {
        if(data[0]){
            document.getElementById("firstUser").innerHTML = data[0]["user_name"]
            document.getElementById("firstPoints").innerHTML = data[0]["points"]
        }
        if(data[1]){
            document.getElementById("sUser").innerHTML = data[1]["user_name"]
            document.getElementById("sPoints").innerHTML = data[1]["points"]
        }
        if(data[2]){
            document.getElementById("tUser").innerHTML = data[2]["user_name"]
            document.getElementById("tPoints").innerHTML = data[2]["points"]
        }
        if(data[3]){
            for (let index = 3; index < data.length; index++) {
                position = document.createElement("span")
                position.innerHTML = index + 1
                user = document.createElement("span")
                user.innerHTML = data[index]["user_name"]
                points = document.createElement("span")
                points.innerHTML = data[index]["points"]

                place = document.createElement("div")
                place.className = "place"
                place.appendChild(position)
                place.appendChild(user)
                place.appendChild(points)

                document.getElementById("rp").appendChild(place)
                
            }
        }
    })
    
}

f()