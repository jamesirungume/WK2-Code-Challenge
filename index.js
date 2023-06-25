document.addEventListener('DOMContentLoaded', () => {
    const animalName = document.querySelector("#animalname");
    const animalContent = document.querySelector("#animalcontent");
    const votebutton = 
  
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
      });
  
    function displayAnimal(myAnimal) {
      animalContent.innerHTML = `
        <h1>${myAnimal.name}</h1>
        <h1>${myAnimal.description}</h1>
        <img src="${myAnimal.imageUrl}" alt="james">
        <p>votes: ${myAnimal.vote}</p>
      `;
    }
  });
  colour = document.querySelector("#giga");
  colour.style.backgroundColor = "indigo";