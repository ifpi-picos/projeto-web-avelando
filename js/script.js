const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

document.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    var section2 = document.querySelector(".second-section").offsetTop;
    var headerHeight = header.offsetHeight;

    if (window.pageYOffset >= section2 - headerHeight) {
        header.classList.add("hide-header");
    } else {
        header.classList.remove("hide-header");
    }
});

fetch('/data/breaths.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('respirations-container');

        container.innerHTML = '';

        data.respirations.forEach(respiration => {

            const respirationDiv = document.createElement('div');
            respirationDiv.classList.add('img');

            const image = document.createElement('img');
            image.src = respiration.image;
            image.alt = respiration.title;
            respirationDiv.appendChild(image);

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = respiration.title;
            titleDiv.appendChild(titleH3);
            respirationDiv.appendChild(titleDiv);

            container.appendChild(respirationDiv);
        });
    })

    .catch(error => {
        console.error('Erro ao carregar os dados das respirações:', error);
    });

fetch('/data/hashiras.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('hashiras-container');

        container.innerHTML = '';

        data.hashiras.forEach(hashira => {

            const hashiraDiv = document.createElement('div');
            hashiraDiv.classList.add('img');

            const image = document.createElement('img');
            image.src = hashira.image;
            image.alt = hashira.title;
            hashiraDiv.appendChild(image);

            image.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = hashira.title;
                document.getElementById('modal-description').textContent = hashira.description;
                modal.style.display = 'block';
            });

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = hashira.title;
            titleDiv.appendChild(titleH3);
            hashiraDiv.appendChild(titleDiv);

            container.appendChild(hashiraDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os dados dos hashiras:', error);
    });

fetch('/data/kizuki.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('superiors-container');

        container.innerHTML = '';

        Object.values(data.superiors).forEach(superior => {
            const superiorsDiv = document.createElement('div');
            superiorsDiv.classList.add('img');

            const image = document.createElement('img');
            image.src = superior.image;
            image.alt = superior.title;
            superiorsDiv.appendChild(image);

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = superior.title;
            titleDiv.appendChild(titleH3);
            superiorsDiv.appendChild(titleDiv);

            container.appendChild(superiorsDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados dos 12 Kizuki:', error);
    });

fetch('/data/kizuki.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('lower-container');

        container.innerHTML = '';

        Object.values(data.lowers).forEach(lower => {
            const lowersDiv = document.createElement('div');
            lowersDiv.classList.add('img');

            const image = document.createElement('img');
            image.src = lower.image;
            image.alt = lower.title;
            lowersDiv.appendChild(image);

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = lower.title;
            titleDiv.appendChild(titleH3);
            lowersDiv.appendChild(titleDiv);

            container.appendChild(lowersDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados dos 12 Kizuki:', error);
    });