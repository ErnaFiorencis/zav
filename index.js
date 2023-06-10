const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

console.log(window.innerWidth)
console.log(window.innerHeight)
canvas.width = 1100//0.98 * window.innerWidth // 1100//1074 //1024
canvas.height = 580//0.96* window.innerHeight//580 //576
console.log(canvas.width)

const offset = {
    x: -1250,//-1250 + 0.98 * (window.innerWidth * 1.2 - 1280),
    y: -750//-755 + 0.80 * (window.innerHeight - 601),
}
console.log(offset.x)
console.log(offset.y)

const collisionsMap = []
for(let i = 0; i < collisionsNovo.length; i+=64){
   collisionsMap.push(collisionsNovo.slice(i, 64 + i))
}
//console.log(collisionsMap)

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol != 0){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                symbol: symbol
            }))
    }
    })
})
//console.log(boundaries)

const zoneMap = []
for(let i = 0; i < zonesDataNovo.length; i+=64){
   zoneMap.push(zonesDataNovo.slice(i, 64 + i))
}
const zones = []
zoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol != 0){
            zones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                symbol: symbol
            }))
    }
    })
})

const playerImage = new Image()
playerImage.src = './img/character.png' 

const image = new Image()
image.src = './img/novo4.png'

const foregroundImage = new Image()
foregroundImage.src = './img/novof2.png'

const player = new Sprite({
    position: {
        x: canvas.width/2 - playerImage.width/2, 
        y: canvas.height/2 - playerImage.height/2
    },
    image: playerImage,
    frames: {max: 4, min: 2}
})

const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: image

})

const foreground = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImage

})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    space:{
        pressed: false
    }
}

const testBoundary = new Boundary({
    position:{
        x: 400,
        y: 400
    }
})

const movable = [background, ...boundaries, foreground, ...zones]

function rectangularCollision({rec1, rec2}){
    return(
        rec1.position.x + rec1.width >= rec2.position.x 
        && rec1.position.x  <= rec2.position.x 
          && rec1.position.y  <= rec2.position.y 
        && rec1.position.y + rec1.height >= rec2.position.y )
}

const z = {
    initiated: false,
    recently: 50,
}

function checkLevel(level){
    if(!localStorage.getItem("user")){
        return false
    }
    console.log(level)
    return true
}


function animate(){



    canvas.width =  0.98 * window.innerWidth//1074 //1024
    canvas.height = 0.96* window.innerHeight//580 //576
    
    const animationId = window.requestAnimationFrame(animate)

    background.draw()


    player.draw()
   
    foreground.draw()

    let moving = true
    player.moving = false

    if(z.initiated) return
    //console.log(zone.initiated)

    //activate a zone
    if(keys.w.pressed || keys.s.pressed || keys.d.pressed || keys.a.pressed || keys.space.pressed){

    for (let i = 0; i < zones.length; i++){
        const zone = zones[i]
        if( rectangularCollision({rec1:player, rec2: {...zone, position: {x: zone.position.x, y: zone.position.y + 3}}})
    ){
        //if(z.recently == 0){
            console.log("bakery")
        if(keys.space.pressed && lastKey == 'space'){
            keys.space.pressed = false
            if(zone["symbol"] === 1075){
                if(a){
                    audio.Door.play()
                }
                
                const number = Math.random() * (11 - 1) + 1 //min inclusive, max not
                console.log(Math.floor(number))
                window.document.getElementById("dialogContainer").style.display = "block"
                window.document.getElementById("dialogImage").src = "./img/dialog/box" + Math.floor(number) + ".png"
                window.document.getElementById("dialogText").innerHTML = npc[Math.floor(number)][Math.floor(Math.random() * 2)]
                break   
            }
            else if(zone["symbol"] === 1019){
                if(a){
                    audio.Cow.play()
                }
                
                window.document.getElementById("dialogContainer").style.display = "block"
                window.document.getElementById("dialogImage").src = "./img/dialog/boxCow.png"
    
                window.document.getElementById("dialogText").innerHTML = npcCow[Math.floor(Math.random() * 3)]
                break 
            }
            console.log("activate zone")
            console.log(zone)
            z.initiated = true
            //console.log(zone.initiated)
            audio.Map.stop()
            window.cancelAnimationFrame(animationId)
            p = false
            document.getElementById("up").style.display  ="none"
            document.getElementById("down").style.display  ="none"
            document.getElementById("left").style.display  ="none"
            document.getElementById("right").style.display  ="none"
            document.getElementById("startBox").style.display = "block"
            document.getElementById("cancle").style.display = "block"
            document.getElementById("homeicon").style.display = "none"
            document.getElementById("seticon").style.display = "none"
            document.getElementById("soundicon").style.display = "none"
            document.getElementById("infoicon").style.display = "none"


            chooseZone(zone["symbol"])


            console.log("tu")
            break
        }
        else{
            z.recently -= 1
        }
    }
    }
}
    if(keys.w.pressed && lastKey == 'w'){
        player.frames.valy = 1;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 3}}})
        ){
            console.log("col")
            if(boundary["symbol"] === 1125){
                if(!checkLevel(5)){
                    moving = false
                    break
                }
            }
            else{
                moving = false
                break
            }

        }
        }


        if(moving)
            movable.forEach((movable) => {movable.position.y += 3})
    }
    else if(keys.s.pressed && lastKey == 's'){
        player.frames.valy = 0;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 10}}})
        ){
            console.log("col")
            if(boundary["symbol"] === 1125){
                if(!checkLevel(5)){
                    moving = false
                    break
                }
            }
            else{
                moving = false
                break
            }
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.y -= 3})
    }
    else if(keys.d.pressed && lastKey == 'd'){
        player.frames.valy = 3;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x - 3, y: boundary.position.y}}})
        ){
            console.log("col")
            moving = false
            break
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.x-= 3})
    }
    else if(keys.a.pressed && lastKey == 'a'){
        player.frames.valy = 2;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x + 3, y: boundary.position.y}}})
        ){
            console.log("col")
            moving = false
            break
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.x += 3})
    }

}
animate()



let lastKey = ''
window.addEventListener('keydown', (e) => {
    if(e.keyCode === 32){
        console.log("space")
        keys.space.pressed = true
        lastKey = 'space'
    }
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break       
        case 'h':
            keys.space.pressed = true
            lastKey = 'space'
            break    
    }
    
})


window.addEventListener('keyup', (e) => {
    if(e.keyCode === 32){
        console.log("space")
        keys.space.pressed = false
    }
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break       
        case 'h':
            keys.space.pressed = false
            break     
    }
    
})


async function is_touch_enabled() {
    try{
        document.createEvent("TouchEvent")
        return true
    }
    catch(e) {
        return false
    }
}

is_touch_enabled().then(e => {
    if(e){
        console.log(e)
        document.getElementById("canvas").addEventListener("touchstart", (e)=>{ keys.space.pressed = true; lastKey = 'space'}, false)
        document.getElementById("canvas").addEventListener("touchend", ()=>{ keys.space.pressed =false}, false)
        
        document.getElementById("up").addEventListener("touchstart", (e)=>{ keys.w.pressed = true; lastKey = 'w'}, false)
        document.getElementById("up").addEventListener("touchend", ()=>{ keys.w.pressed =false}, false)
        
        document.getElementById("down").addEventListener("touchstart", (e)=>{ keys.s.pressed = true; lastKey = 's'}, false)
        document.getElementById("down").addEventListener("touchend", ()=>{ keys.s.pressed =false}, false)
        
        document.getElementById("left").addEventListener("touchstart", (e)=>{ keys.a.pressed = true; lastKey = 'a'}, false)
        document.getElementById("left").addEventListener("touchend", ()=>{ keys.a.pressed =false}, false)
        
        document.getElementById("right").addEventListener("touchstart", (e)=>{ keys.d.pressed = true; lastKey = 'd'}, false)
        document.getElementById("right").addEventListener("touchend", ()=>{ keys.d.pressed =false}, false)
    
        document.getElementById("up").style.display  ="flex"
        document.getElementById("down").style.display  ="flex"
        document.getElementById("left").style.display  ="flex"
        document.getElementById("right").style.display  ="flex"
    }
})

document.getElementById("exitDialog").addEventListener("click", () => {
    document.getElementById("dialogContainer").style.display = "none"
})

document.getElementById("homeicon").addEventListener("mouseover", () =>{
    document.getElementById("homeicon").src = "./img/home2.png"
})
document.getElementById("homeicon").addEventListener("mouseout", () =>{
    document.getElementById("homeicon").src = "./img/home.png"
})
document.getElementById("homeicon").addEventListener("click", () => {
    window.location.href = "home.html"
})

document.getElementById("seticon").addEventListener("mouseover", () =>{
    document.getElementById("seticon").src = "./img/set2.png"
})
document.getElementById("seticon").addEventListener("mouseout", () =>{
    document.getElementById("seticon").src = "./img/set.png"
})

document.getElementById("infoicon").addEventListener("mouseover", () =>{
    document.getElementById("infoicon").src = "./img/info2.png"
})
document.getElementById("infoicon").addEventListener("mouseout", () =>{
    document.getElementById("infoicon").src = "./img/info.png"
})
document.getElementById("infoicon").addEventListener("click", () => {
    window.location.href = "howto.html"
})

document.getElementById("soundicon").addEventListener("mouseover", () =>{
    document.getElementById("soundicon").src = (a ? "./img/soundOFF1.png" : "./img/soundON1.png")
})
document.getElementById("soundicon").addEventListener("mouseout", () =>{
    document.getElementById("soundicon").src = (a ? "./img/soundOFF.png" : "./img/soundON.png")
})

document.getElementById("soundicon").addEventListener("click", () =>{
    if(!a){
        a = true
        p = true
        audio.Map.play()
        document.getElementById("soundicon").src = "././img/soundOFF.png"
    }
    else{
        a = false
        audio.Map.stop()
        document.getElementById("soundicon").src = "././img/soundON.png"
    }
})

var a = false
let p = false

addEventListener("keydown", () => {
    console.log(p)
    if(a == true & p == false){
        p = true
        audio.Map.play()
    }
})
