

let sessiondata = JSON.parse(sessionStorage.getItem("LoggedInUser"));
let signin = document.getElementById('login');
let register = document.getElementById('signup');
let allmovies = document.getElementById('allmovies');
let logout = document.getElementById('logout');

if (sessiondata && sessiondata._token != 0) {
    signin.style.display = "none";
    register.style.display = "none";
    allmovies.style.display = "inline";
    logout.style.display = "inline";
} else {
    allmovies.style.display = "none";
    signin.style.display = "inline";
    register.style.display = "inline";
    logout.style.display = "none";
}

function logoutuser() {
    let logout = sessionStorage.removeItem("LoggedInUser");
    if (logout) {
        window.location.href = "login.html";
    } else {
        window.location.href = "dashboard.html"
    }
}

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let moviename = document.querySelector('.moviename').value;
    let noofseats = document.querySelector('.noofseats').value;
    let moviedate = document.querySelector('.moviedate').value;
    let moviestarttime = document.querySelector('.starttime').value;
    let movieendtime = document.querySelector('.endtime').value;


    let MovieData = {
        MovieName: moviename,
        NoOfSeats: noofseats,
        MovieDate: moviedate,
        MovieStartTime: moviestarttime,
        MovieEndTime: movieendtime,
        Status: "Available",
    };

    let moviedetails = JSON.parse(localStorage.getItem('MovieDetails')) || [];
    moviedetails.push(MovieData);

    localStorage.setItem('MovieDetails', JSON.stringify(moviedetails));

    document.querySelector('.moviename').value = "";
    document.querySelector('.noofseats').value = "";
    document.querySelector('.moviedate').value = "";
    document.querySelector('.starttime').value = "";
    document.querySelector('.endtime').value = "";

    alert('Movie added Successfully');
    location.reload();
})


let allMovies = JSON.parse(localStorage.getItem("MovieDetails"));
let bookedMovies = JSON.parse(localStorage.getItem("BookedMovies"));

let movieCounts = {};

allMovies.forEach(bookedMovie => {
    bookedMovies.forEach(movie => {
        if (bookedMovie.MovieName === movie.MovieName) {
            if (movieCounts[bookedMovie.MovieName]) {
                movieCounts[bookedMovie.MovieName]++;
            } else {
                movieCounts[bookedMovie.MovieName] = 1;
            }
        }
    });
});

let movieCountsArray = [];

Object.keys(movieCounts).forEach(movieName => {
    movieCountsArray.push({ name: movieName, count: movieCounts[movieName] });
});


document.addEventListener("DOMContentLoaded", function () {
    let AllMovies = JSON.parse(localStorage.getItem("MovieDetails"));
    const tableBody = document.querySelector('#movietable tbody');

    if (AllMovies && Array.isArray(AllMovies)) {
        AllMovies.forEach(movie => {
            const row = document.createElement('tr');

            const movieColumn = document.createElement("td");
            movieColumn.textContent = movie.MovieName;
            row.appendChild(movieColumn);

            const moviestarttime = document.createElement("td");
            moviestarttime.textContent = movie.MovieStartTime;
            row.appendChild(moviestarttime);

            const movieendtime = document.createElement("td");
            movieendtime.textContent = movie.MovieEndTime;
            row.appendChild(movieendtime);

            const NoOfSeats = document.createElement("td");
            NoOfSeats.textContent = movie.NoOfSeats;
            row.appendChild(NoOfSeats);

            const MovieDate = document.createElement("td");
            MovieDate.textContent = movie.MovieDate;
            row.appendChild(MovieDate);


            const bookingreceived = document.createElement("td");

            movieCountsArray.forEach(element => {
                if (element.name === movie.MovieName) {
                    bookingreceived.textContent = element.count;
                }
            })
            row.appendChild(bookingreceived);
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        const messageCell = document.createElement('td');
        messageCell.textContent = "No movies found";
        row.appendChild(messageCell);
        tableBody.appendChild(row);
    }
});

const inputdatefield = document.getElementById('moviedate');
inputdatefield.min = new Date().toISOString().split('T')[0];

