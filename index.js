document.addEventListener('DOMContentLoaded', () => {
  const animalName = document.querySelector("#animalname");
  const animalContent = document.querySelector("#animalcontent");
  const voteButtons = document.querySelectorAll(".votebuttons");
  const resetMybutton = document.querySelector("#resetme")

  fetch("http://localhost:3000/myAnimals")
    .then(resp => resp.json())
    .then(myAnimals => {
      myAnimals.forEach(myAnimal => {
        const selectName = document.createElement('p');
        selectName.textContent = myAnimal.name;
        selectName.addEventListener("click", () => {
          displayAnimal(myAnimal);
        });
        animalName.appendChild(selectName);
      });
      
      voteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
          event.preventDefault(); 
          const animalName = button.dataset.animal;
          const animal = myAnimals.find(a => a.name === animalName);
          if (animal) {
            animal.vote++;
            displayAnimal(animal);
            updateVotesOnServer(myAnimals); 
          }
        });
      });
    });

  resetMybutton.addEventListener("click", () => {
    fetch("http://localhost:3000/myAnimals")
      .then(resp => resp.json())
      .then(myAnimals => {
        myAnimals.forEach(myAnimal => {
          myAnimal.vote = 0;
        });
        displayAnimal(myAnimals[0]);
        updateVotesOnServer(myAnimals); 
      });
  });

  function displayAnimal(myAnimal) {
    animalContent.innerHTML = `
      <h1>${myAnimal.name}</h1>
      <h1>${myAnimal.description}</h1>
      <img src="${myAnimal.imageUrl}" alt="james">
      <p>votes: ${myAnimal.vote}</p>
    `;
  }

  function updateVotesOnServer(myAnimals) {
    fetch("http://localhost:3000/myAnimals", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myAnimals)
    })
      .then(resp => resp.json())
      .then(responseData => {
        // Handle the response if needed
        console.log(responseData);
      });
  }

  const colour = document.querySelector("#giga");
  colour.style.backgroundColor = "indigo";
});
