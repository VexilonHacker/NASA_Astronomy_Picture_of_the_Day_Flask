// static/js/apod.js

const loader = document.getElementById('loader');
const container = document.getElementById('apod-container');
const dateInput = document.getElementById('date');

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

const today = new Date();
dateInput.max = formatDate(today);
let currentDate = new Date(dateInput.value);

function fetchApod(dateStr) {
    loader.style.display = 'block';
    container.innerHTML = '';

    fetch(`/get_apod?date=${dateStr}`)
        .then(res => res.json())
        .then(data => {
            loader.style.display = 'none';
            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            currentDate = new Date(data.date);
            dateInput.value = data.date; // keep input in sync
            console.log(dateInput.value);
            const media = data.media_type === 'image'
                ? `<img src="${data.url}" class="fade-in" alt="NASA APOD" />`
                : `<div class="video-wrapper"><iframe src="${data.url}" frameborder="0" allowfullscreen></iframe></div>`;

            container.innerHTML = `
<div class="apod-card">
    <h2>${data.title}</h2>
    <div class="image-wrapper">
        <button id="prev-btn" class="nav-btn left-btn" aria-label="Previous day">◀</button>
        ${media}
        <button id="next-btn" class="nav-btn right-btn" aria-label="Next day">▶</button>
    </div>
    <p class="date">${data.date}</p>
    <p class="description">${data.explanation}</p>
</div>
`;

            document.getElementById('prev-btn').onclick = () => navigateDate(-1);
            document.getElementById('next-btn').onclick = () => navigateDate(1);
        })
        .catch(err => {
            loader.style.display = 'none';
            container.innerHTML = `<p class="error">Failed to load APOD. Try again later.</p>`;
        });
}

function navigateDate(offset) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newDate > today) {
        alert("Can't view future APODs!");
        return;
    }

    currentDate = newDate;
    const newDateStr = formatDate(newDate);
    dateInput.value = newDateStr; // update input value in sync

    fetchApod(newDateStr);
}

function main() {
    // Form submit → load selected date
    document.getElementById('apod-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedDate = dateInput.value;
        currentDate = new Date(selectedDate);
        fetchApod(selectedDate);
    });

    // Load today's image on first load
    fetchApod(formatDate(currentDate));
}

main();
