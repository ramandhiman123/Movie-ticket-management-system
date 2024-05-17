document.addEventListener("DOMContentLoaded", function () {
    console.log(noofseats);
    const seatsContainer = document.getElementById('seats');
    const totalSeats = 10;

    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.addEventListener('click', function () {
            bookSeat(seat);
        });
        seatsContainer.appendChild(seat);
    }
});

// Function to book the selected seat
function bookSeat(seat) {
    seat.classList.add('booked'); // Add the 'booked' class to change the color
}