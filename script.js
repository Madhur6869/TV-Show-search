const form = document.body.querySelector(".inputform");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  //Remove previous search results
  const container = document.querySelector(".show-container");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  //Api call will Query from form
  const searchterm = form.elements.query.value;
  const config = { params: { q: searchterm } };
  try {
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    console.log(res);
    makesection(res.data);
  } catch (e) {
    console.log("Error", e);
  }
});

const showcontainer = document.querySelector(".show-container");
const makesection = (api) => {
  console.log("Inside function");
  for (let i of api) {
    //row
    const row = document.createElement("div");
    row.classList.add("row", "rounded");
    //Show poster
    const poster = document.createElement("div");
    poster.classList.add("col-2", "poster");
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = i.show.image.medium;
    poster.appendChild(image);
    //Show info
    const details = document.createElement("div");
    details.classList.add("col-10", "details");

    const title = document.createElement("h2");
    title.classList.add("show-name");
    title.innerText = i.show.name;

    const summary = document.createElement("p");
    summary.classList.add("summary");
    summary.innerHTML = i.show.summary;

    const lang = document.createElement("div");
    lang.classList.add("lang");
    lang.innerHTML = `<b>Language:</b> ${i.show.language}`;
    const genre = document.createElement("div");

    genre.classList.add("genre");
    const genre_api = i.show.genres;
    const genre_text = genre_api.join(", ");
    genre.innerHTML = `<b>Genre:</b> ${genre_text}`;
    details.appendChild(title);
    details.appendChild(summary);
    details.appendChild(lang);
    details.appendChild(genre);

    row.appendChild(poster);
    row.appendChild(details);

    showcontainer.appendChild(row);
  }
};
