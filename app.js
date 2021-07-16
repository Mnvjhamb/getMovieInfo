$(document).ready(func());
function func() {
  images = document.getElementsByClassName("img");
  movies = document.getElementsByClassName("movie");
  i = 0;
  getUrl = async () => {
    try {
      id = Math.round(Math.random() * 500 + 1);
      var data = await axios.get(`http://api.tvmaze.com/episodes/${id}`);
      console.log(data);
      // console.log(i);
      //   console.log(images[i].src);
      images[i].src = data.data.image.original;
      images[i].id = id;

      var name = document.createElement("h4");
      name.innerHTML = data.data.name;
      name.style.color = "rgb(147 155 157)";
      movies[i].id = `movie${id}`;
      movies[i].appendChild(name);
    } catch (e) {
      await getUrl();
    }
  };
  f = async () => {
    for (j = 0; j < images.length; j++) {
      await getUrl();
      i += 1;
    }
  };
  f();
}

function reload() {
  window.location.reload();
}

async function movieDetails(id) {
  var container = document.getElementById("container");
  container.innerHTML = "";
  var movieDetail = document.createElement("div");
  try {
    var data = await axios.get(`http://api.tvmaze.com/episodes/${id}`);
    console.log(data);

    var name = document.createElement("h1");
    name.innerHTML = data.data.name;
    name.classList.add("display-1");
    movieDetail.appendChild(name);

    var div = document.createElement("div");
    div.classList.add("div");

    var img = document.createElement("img");
    img.src = data.data.image.original;
    img.classList.add("img");
    div.appendChild(img);

    var details = document.createElement("p");
    details.innerHTML = data.data.summary;
    details.classList.add("detailsP");

    var showInfo = document.createElement("div");
    showInfo.innerHTML += "Release Date: " + data.data.airdate + "<br>";
    showInfo.innerHTML += "Time: " + data.data.airtime + "<br>";
    showInfo.innerHTML += "Seasons: " + data.data.season + "<br>";
    showInfo.innerHTML += "Type: " + data.data.type + "<br>";

    showInfo.style.color = "#cb6ced";

    details.append(showInfo);
    div.appendChild(details);

    movieDetail.appendChild(div);
    movieDetail.classList.add("details");
    container.appendChild(movieDetail);
  } catch (e) {
    console.log(e);
  }
}
async function movieDetails2(id) {
  var container = document.getElementById("container");
  container.innerHTML = "";
  var movieDetail = document.createElement("div");
  try {
    var data = await axios.get(
      `http://api.tvmaze.com/singlesearch/shows?q=${id}`
    );
    console.log(data);
    var name = document.createElement("h1");
    name.innerHTML = data.data.name;
    name.classList.add("display-1");
    movieDetail.appendChild(name);

    var div = document.createElement("div");
    div.classList.add("div");

    var img = document.createElement("img");
    img.src = data.data.image.original;
    img.classList.add("img");

    div.appendChild(img);

    var details = document.createElement("p");
    details.innerHTML = data.data.summary;
    details.classList.add("detailsP");

    var showInfo = document.createElement("div");
    showInfo.innerHTML += "Release Date: " + data.data.premiered + "<br>";
    showInfo.innerHTML += "Genres: " + data.data.genres + "<br>";
    showInfo.innerHTML += "Language: " + data.data.language + "<br>";

    showInfo.innerHTML += "Ratings: " + data.data.rating.average + "<br>";
    showInfo.innerHTML += "Type: " + data.data.type + "<br>";

    showInfo.style.color = "#cb6ced";
    details.append(showInfo);
    div.appendChild(details);

    movieDetail.appendChild(div);
    movieDetail.classList.add("details");
    container.appendChild(movieDetail);
  } catch (e) {
    console.log(e);
  }
}

document
  .getElementById("input")
  .addEventListener("keydown", async function (e) {
    if (e.which === 13) {
      e.preventDefault();
      search();
    }
  });

document.getElementById("search").addEventListener("click", search);

async function search() {
  document.getElementById("container").innerHTML = "";
  try {
    var query = document.getElementById("input").value;
    var req = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);

    // console.log(req);
    cont = document.createElement("div");
    cont.id = "cont";
    document.getElementById("container").appendChild(cont);
    if (req.data.length == 0) {
      document.getElementById("cont").innerHTML =
        "<h1>No Such Shows/Movies</h1>";
      return;
    }
    for (var obj of req.data) {
      if (obj.show.image == null) {
        continue;
      }
      var movie = document.createElement("div");
      movie.classList.add("searchedMovie");

      var img = document.createElement("img");
      img.style.height = "300px";
      img.style.width = "300px";
      img.classList.add("img");
      img.id = obj.show.name;
      img.setAttribute("onclick", "movieDetails2(id)");
      // img.addEventListener("click", movieDetails());

      var name = document.createElement("h4");
      name.classList.add("name");

      img.src = obj.show.image.original;
      name.innerHTML = obj.show.name;

      movie.append(img);
      movie.append(name);
      document.getElementById("cont").append(movie);
    }
  } catch (e) {
    console.log("ERROR!!!", e);
  }
}
