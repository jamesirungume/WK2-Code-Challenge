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
        button.addEventListener("click", () => {
          const animalName = button.dataset.animal;
          const animal = myAnimals.find(a => a.name === animalName);
          if (animal) {
            animal.vote++;
            displayAnimal(animal);
          }
        });
      });
    });

    resetMybutton.addEventListener("click", () => {
      myAnimals.forEach(myAnimal => {
        myAnimal.vote = 0;
      });
      displayAnimal(myAnimals[0]); 
    });
   
    

  function displayAnimal(myAnimal) {
    animalContent.innerHTML = `
      <h1>${myAnimal.name}</h1>
      <h1>${myAnimal.description}</h1>
      <img src="${myAnimal.imageUrl}" alt="james">
      <p>votes: ${myAnimal.vote}</p>
    `;
  }

  const colour = document.querySelector("#giga");
  colour.style.backgroundColor = "indigo";
});