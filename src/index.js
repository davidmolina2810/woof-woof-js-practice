document.addEventListener("DOMContentLoaded", run)

function run() {
  fetchDogs()
}

function fetchDogs() {
  fetch("http://localhost:3000/pups").then(
    res => res.json() 
  ).then(
    doggos => renderDoggos(doggos)
  )
  const filterBtn = document.querySelector("#good-dog-filter")
  filterBtn.addEventListener("click", () => {
    if (filterBtn.innerText === "Filter good dogs: OFF") {
      fetch("http://localhost:3000/pups").then(
      res => res.json()).then(
      doggos => {
      const dogs = doggos.filter(dog => dog.isGoodDog === true)
      filterBtn.innerText = "Filter good dogs: ON"
      renderDoggos(dogs)
      }) 
    } else if (filterBtn.innerText === "Filter good dogs: ON") {
      fetch("http://localhost:3000/pups").then(
      res => res.json()).then(
      doggos => {
      filterBtn.innerText = "Filter good dogs: OFF"
      renderDoggos(doggos)
      }) 
    }
  })
}

function renderDoggos(dogs) {
  const dogParent = document.querySelector("#dog-bar")
  while (dogParent.firstChild) {
    dogParent.removeChild(dogParent.lastChild)
  }
  dogs.forEach(dog => {
    const dogNameSpan = document.createElement("span")
    dogNameSpan.innerText = dog.name
    dogParent.appendChild(dogNameSpan)
    dogNameSpan.addEventListener("click", () => renderDoggoInfo(dog))
  })
}

function renderDoggoInfo(dog) {
  const dogInfoParent = document.querySelector("#dog-info")
  dogInfoParent.innerHTML = ""
  while (dogInfoParent.firstChild) {
    dogInfoParent.removeChild(dogInfoParent.lastChild)
  }
  const dogNameH2 = document.createElement("h2")
  dogNameH2.innerText = dog.name
  const dogImg = document.createElement("img")
  dogImg.src = dog.image
  const isGoodDogBtn = document.createElement('button')
  if (dog.isGoodDog) {
    isGoodDogBtn.innerText = "Good Dog!"
  } else {
    isGoodDogBtn.innerText = "Bad Dog!"
  }
  dogInfoParent.appendChild(dogImg)
  dogInfoParent.appendChild(dogNameH2)
  dogInfoParent.appendChild(isGoodDogBtn)
  toggleGoodBadDog(isGoodDogBtn, dog)
}

function toggleGoodBadDog(button, dog) {
  button.addEventListener("click", () => {
    if (button.innerText === "Good Dog!") {
      button.innerText = "Bad Dog!"
      patchGoodBadDog(dog, false)
    } else {
      button.innerText = "Good Dog!"
      patchGoodBadDog(dog, true)
    }
  })
}

function patchGoodBadDog(dog, bool) {
  fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({"isGoodDog":bool})
    }).then(
      res => res.json()
    ).then(
      dog => console.log(dog)
    )
}

