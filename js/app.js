let urls = [
  "./images/apple.svg",
  "./images/apple.svg",
  "./images/netlify.svg",
  "./images/netlify.svg",
  "./images/facebook.webp",
  "./images/facebook.webp",
  "./images/youtube.webp",
  "./images/youtube.webp",
  "./images/github.png",
  "./images/github.png",
  "./images/google.png",
  "./images/google.png",
];

let wrapper = document.querySelector(".wrapper");
function game() {
  let indexes = [];

  let clickedCards = [];

  let moves = 0;
  let matches = 0;
  let gameOver = false;

  let cards = document.querySelectorAll(".card");

  document.querySelector(".matches").textContent = 0;
  document.querySelector(".moves").textContent = 0;

  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }

  for (let i = 0; i < urls.length; i++) {
    let r = Math.floor(Math.random() * urls.length);
    while (indexes.includes(r)) {
      r = Math.floor(Math.random() * urls.length);
    }

    indexes.push(r);

    let card = document.createElement("div");
    card.classList.add("card");

    let cardImage = document.createElement("div");
    cardImage.classList.add("card-img");

    let img = document.createElement("img");
    img.setAttribute("src", urls[r]);

    cardImage.append(img);

    card.append(cardImage);

    wrapper.append(card);

    card.addEventListener("click", (e) => {
      if (
        e.target.tagName === "IMG" ||
        e.target.className === "card-img" ||
        gameOver
      ) {
        return;
      }

      clickedCards.push(card);
      card.classList.add("open");

      if (clickedCards.length % 2 === 0) {
        moves++;
        document.querySelector(".moves").textContent = moves;
        setTimeout(() => {
          let url1 = clickedCards[0].querySelector("img").getAttribute("src");
          let url2 = clickedCards[1].querySelector("img").getAttribute("src");

          if (url1 === url2) {
            matches++;
            document.querySelector(".matches").textContent = matches;
            if (matches === urls.length / 2) {
              setTimeout(() => {
                let retry = confirm(
                  "Tabrilimiz. Yuttidiz. Qayta O'ynashshi xoxlisizmi?"
                );

                if (retry) {
                  game();
                }
              }, 100);
            } else {
              if (moves === 10) {
                gameOver = true;
                let retry = confirm("Yutqazdiz. Qayta O'ynashshi xoxlisizmi?");

                if (retry) {
                  game();
                }
              }
            }
          } else {
            clickedCards[0].classList.remove("open");
            clickedCards[1].classList.remove("open");
            if (moves === 10) {
              gameOver = true;
              let retry = confirm("Yutqazdiz. Qayta O'ynashshi xoxlisizmi?");

              if (retry) {
                game();
              }
            }
          }
          clickedCards.shift();
          clickedCards.shift();
        }, 1000);
      }
    });
  }
}

game();
