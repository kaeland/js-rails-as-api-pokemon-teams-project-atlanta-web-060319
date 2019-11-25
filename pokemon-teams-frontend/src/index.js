const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function () {
  fetchTrainers()
})

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers) {
  const main = document.querySelector("main")

  trainers.map((trainer) => {
    const div = document.createElement("div")
    div.className = "card"
    div.setAttribute("data-id", trainer.id)

    const p = document.createElement("p")
    p.innerText = trainer.name
    div.appendChild(p)

    const button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", addPokemonToTrainer)
    div.appendChild(button)


    const ul = document.createElement("ul")
    trainer.pokemons.map(pokemon => {
      const li = document.createElement("li")
      li.innerText = `${pokemon.nickname} (${pokemon.species})`

      const button = document.createElement("button")
      button.className = "release"
      button.setAttribute("data-pokemon-id", pokemon.id)
      button.innerText = "Release"
      button.addEventListener("click", releasePokemon)

      li.appendChild(button)
      ul.appendChild(li)
    })
    div.appendChild(ul)
    main.appendChild(div)
  })
}

function addPokemonToTrainer(event) {
  event.preventDefault()
  const trainerId = event.target.dataset.trainerId

  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pokemon: {
        trainer_id: trainerId
      }
    })
  }).then(res => res.json())
    .then(pokemon => {
      console.log(pokemon)

      let ul = document.querySelector(`[data-id="${pokemon.trainer_id}"] > ul`)

      const li = document.createElement("li")
      li.innerText = `${pokemon.nickname} (${pokemon.species})`

      const button = document.createElement("button")
      button.className = "release"
      button.setAttribute("data-pokemon-id", pokemon.id)
      button.innerText = "Release"

      li.appendChild(button)
      ul.appendChild(li)
    })
}

function releasePokemon(event) {
  
}





