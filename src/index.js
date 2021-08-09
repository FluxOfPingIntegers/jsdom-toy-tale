let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // My code below
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(result => { 
      result.forEach(toy => addToyCard(toy))
    })

  let toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (e) => {
    let toyName = e.target.name.value;
    let toyImage = e.target.image.value;
    let toy = {name: `${toyName}`, image: `${toyImage}`, likes: 0}
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
      .then(response => response.json())
      .then(result => addToyCard(result))
      .cache( error => {
        window.alert(error.message)
      })
    e.preventDefault()
  })
  
  function addToyCard(toy) {
    const toyCollection = document.querySelector("#toy-collection");
    let card = document.createElement("div")
    card.className = "card"
    toyCollection.append(card);

    let header = document.createElement("H2");
    header.innerText = `${toy.name}`
    card.append(header);

    let img = document.createElement("IMG");
    img.src = `${toy.image}`;
    img.className = "toy-avatar";
    card.append(img);

    let likes = document.createElement("P");
    likes.innerText = `${toy.likes} Likes`;
    card.append(likes);

    let likeBtn = document.createElement("button")
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like"
    likeEventListener(likeBtn, toy, likes);
    card.append(likeBtn);
  }

  function likeEventListener(likeBtn, toy, likes) {
    likeBtn.addEventListener("click", () => {
      toy.likes += 1;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toy)
        })
        .then(response => response.json())
        .then(result => {likes.innerText = `${result.likes} Likes`})
    })
  }
  
});
