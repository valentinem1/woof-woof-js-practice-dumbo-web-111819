const dogsUrl = "http://localhost:3000/pups"



fetch(dogsUrl)
.then(r => r.json())
.then(dogs => dogs.forEach(dog => loadDog(dog)))

function loadDog(dog){
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement("span")
    span.innerText = dog.name
    span.id = dog.id
    dogBar.append(span)
    
    span.addEventListener("click", () => {
        fetch(`${dogsUrl}/${dog.id}`)
        .then(r=> r.json())
        .then(dog => getSingleDog(dog))
    })
}

function getSingleDog(dog){
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ""
    const img = document.createElement("img")
    img.src = dog.image
    const h2 = document.createElement('h2')
    h2.innerText = dog.name
    const button = document.createElement('button')
    button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogInfo.append(img, h2, button)

    button.addEventListener("click", function toggleDog(){

        let dogButton
        if (button.innerText === "Good Dog!"){
            button.innerText = "Bad Dog!"
            dogButton = false
        }else{
            button.innerText = "Good Dog!"
            dogButton = true
        }
        updateDog(dog, dogButton, button)
    })
}

function updateDog(dog, dogButton, button){
    fetch(`${dogsUrl}/${dog.id}`, {
    method: "PATCH",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        isGoodDog: dogButton
        })
    })
    .then(r => r.json())
    .then(dogInfo => button.innerText)
}
