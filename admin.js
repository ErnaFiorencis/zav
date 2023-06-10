document.getElementById("type").addEventListener("change", (e) => {
    let type = document.getElementById("type").value
    if(type == 2){
        document.getElementById("a").value = "tocno"
        document.getElementById("b").value = "netocno"
        document.getElementById("a").style.display = "inline"
        document.getElementById("b").style.display = "inline"
        document.getElementById("c").style.display = "none"
        document.getElementById("d").style.display = "none"
        document.getElementById("answers").style.display = "inline"
    }
    else if(type == 1){
        document.getElementById("a").style.display = "inline"
        document.getElementById("b").style.display = "inline"
        document.getElementById("c").style.display = "inline"
        document.getElementById("d").style.display = "inline"
        document.getElementById("answers").style.display = "inline"
    }
    else if(type == 3){
        document.getElementById("a").style.display = "none"
        document.getElementById("b").style.display = "none"
        document.getElementById("c").style.display = "none"
        document.getElementById("d").style.display = "none"
        document.getElementById("answers").style.display = "none"
    }
} )

document.getElementById("questions").addEventListener("submit", (e) => {
    questionText = document.getElementById("question").value
    type = document.getElementById("type").value
    if(type == 1){
        questionOptions = document.getElementById("a").value + "-" + document.getElementById("b").value + "-" + document.getElementById("c").value + "-" + document.getElementById("d").value
    }
    else if(type == 2){
        questionOptions = document.getElementById("a").value + "-" + document.getElementById("b").value
    }
    else if(type == 3){
        questionOptions = ""
    }
    correctAnswer = document.getElementById("answer").value
    dificulty = document.getElementById("level").value
    category = document.getElementById("categorySelect").value
    place = document.getElementById("placeSelect").value
    grade = document.getElementById("grade").value
    
    fetch("http://localhost:3000/api/v1/admin/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("user")
        },
        body: JSON.stringify({questionText, questionOptions, correctAnswer, dificulty, category, place, grade, type})
    }).then((res) => {
        if(res.status != 201){
            alert("greška")
        }
    })
})



function add(){
    fetch("http://localhost:3000/api/v1/admin/categories", {
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
        console.log(data)
        select = document.getElementById("categorySelect")
        data.forEach(element => {
            var opt = document.createElement('option');
            opt.value = element["category_id"];
            opt.innerHTML = element["category_name"];
            select.appendChild(opt);
        })
    })

    fetch("http://localhost:3000/api/v1/admin/places", {
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
        p = data[0]["enum_range"].slice(1, -1).split(",")
        select = document.getElementById("placeSelect")
        p.forEach(element => {
            var opt = document.createElement('option');
            opt.value = element;
            opt.innerHTML = element;
            select.appendChild(opt);
        });
    })
}

add()

document.getElementById("logout").addEventListener("click", () => {
    console.log("HEeh")
    localStorage.clear()
    window.location.href = "home.html"
})