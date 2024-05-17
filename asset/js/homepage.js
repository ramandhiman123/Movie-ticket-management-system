

function logoutuser() {
    let logout = sessionStorage.removeItem("LoggedInUser");
    if (logout) {
        window.location.href = "login.html";
    } else {
        window.location.href = "homepage.html"
    }
}


const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));
if (loggedInUser && loggedInUser._token !== "") {
    window.location.href = "homepage.html";
} else {
    window.location.href = "login.html";
}


function getMovieDataFromLocalStorage() {
    if (localStorage.getItem('MovieDetails')) {
        return JSON.parse(localStorage.getItem('MovieDetails'));
    } else {
        return [];
    }
}

const movieShows = getMovieDataFromLocalStorage();

const allmovies = document.getElementById('show-list');
const dateselect = document.getElementById('date-filter');

function selecteddateshowallmovies(selectedDate) {
    allmovies.innerHTML = '';
    movieShows.forEach(show => {
        if (selectedDate === show.MovieDate || !selectedDate) {
            const row = document.createElement('tr');
            let bookButton = document.createElement("button");
            if (show.NoOfSeats == 0) {
                show.Status = "Booked";
                bookButton.style.display = "none";
                localStorage.setItem("MovieDetails", JSON.stringify(movieShows));
            }

            bookButton.setAttribute("type", "submit");
            bookButton.setAttribute("class", "btn btn-primary");
            bookButton.setAttribute("id", "bookButton");
            bookButton.setAttribute("onclick", `bookNow('${show.MovieName}')`);
            bookButton.textContent = "Book Now";
            const cell = document.createElement('td');
            cell.appendChild(bookButton);
            row.innerHTML = `
                <td>${show.MovieDate}</td>
                <td>${show.Status}</td>
                <td>${show.NoOfSeats}</td>
            `;
            row.appendChild(cell);
            allmovies.appendChild(row);
        }
    });
}




function bookNow(moviename) {
    let seats = parseInt(prompt("Enter the number of seats for " + moviename + ":"));
    let allmovies = JSON.parse(localStorage.getItem('MovieDetails'));

    let movieFound = false;

    allmovies.forEach(item => {
        if (item.MovieName === moviename) {
            movieFound = true;
            if (item.NoOfSeats >= seats) {
                item.NoOfSeats -= seats;
                let bookedMovies = {
                    MovieName: item.MovieName,
                    Seats: seats,
                }

                let stored = JSON.parse(localStorage.getItem('BookedMovies')) || [];
                stored.push(bookedMovies);
                localStorage.setItem('BookedMovies', JSON.stringify(stored));
                alert(seats + " Seats booked successfully for " + moviename + ".");
                location.reload();
            } else {
                alert("Sorry, " + seats + " seats are not available for " + moviename + ".");
            }
        }

    });

    if (!movieFound) {
        alert("Movie not found or all seats are booked for " + moviename + ".");
    }

    localStorage.setItem("MovieDetails", JSON.stringify(allmovies));
}



selecteddateshowallmovies();

dateselect.addEventListener('change', function () {
    const selectedDate = dateselect.value;
    selecteddateshowallmovies(selectedDate);
});

const myDate = document.getElementById('date-filter');
myDate.min = new Date().toISOString().split('T')[0];

