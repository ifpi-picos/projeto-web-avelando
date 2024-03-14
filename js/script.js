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

document.addEventListener('scroll', () => {
    let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    let scrolled = (scrollTop / docHeight) * 100;

    document.getElementById('progress-bar').style.width = `${scrolled}%`;
    document.getElementById('progress-img').style.left = `${scrolled}%`;
});

fetch('/data/breaths.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('respirations-container');
        container.innerHTML = '';

        data.respirations.forEach(respiration => {
        const respirationDiv = document.createElement('div');
        respirationDiv.classList.add('icon');

        fetch(respiration.image)
            .then(response => response.text())
            .then(svg => {
            respirationDiv.innerHTML = svg; 

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = respiration.title;
            titleDiv.appendChild(titleH3);
            respirationDiv.appendChild(titleDiv);

            respirationDiv.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = respiration.title;
                document.getElementById('modal-description').textContent = respiration.description;
                modal.style.display = 'block';
            });

            container.appendChild(respirationDiv);
            })
            .catch(error => {
            console.error('Erro ao carregar o SVG:', error);
            });
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

            const bgDiv = document.createElement('div');
            bgDiv.classList.add('hashira-bg');
            bgDiv.style.background = `linear-gradient(to bottom, ${hashira.backgroundColor} 0%, #eeeeed 100%)`;

            const image = document.createElement('img');
            image.src = hashira.image;
            image.alt = hashira.title;

            bgDiv.appendChild(image);

            hashiraDiv.appendChild(bgDiv);

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = hashira.title;
            titleDiv.appendChild(titleH3);

            hashiraDiv.appendChild(titleDiv);

            hashiraDiv.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = hashira.title;
                document.getElementById('modal-description').textContent = hashira.description;
                modal.style.display = 'block';
            });

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

            image.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = superior.title;
                document.getElementById('modal-description').textContent = superior.description;
                modal.style.display = 'block';
            });

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = superior.title;
            titleDiv.appendChild(titleH3);
            superiorsDiv.appendChild(titleDiv);

            superiorsDiv.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = superior.title;
                document.getElementById('modal-description').textContent = superior.description;
                modal.style.display = 'block';
            });

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

            image.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = lower.title;
                document.getElementById('modal-description').textContent = lower.description;
                modal.style.display = 'block';
            });

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = lower.title;
            titleDiv.appendChild(titleH3);
            lowersDiv.appendChild(titleDiv);

            lowersDiv.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = lower.title;
                document.getElementById('modal-description').textContent = lower.description;
                modal.style.display = 'block';
            });

            container.appendChild(lowersDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados dos 12 Kizuki:', error);
    });

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;

    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    function setActiveLink(sectionId) {
        removeActiveClasses();
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${sectionId}`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    function activateCurrentSection() {
        const scrollPosition = window.scrollY + headerHeight;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                setActiveLink(section.id);
            }
        });

        if (window.scrollY === 0) {
            removeActiveClasses();
        }
    }

    window.addEventListener('scroll', activateCurrentSection);

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').replace('#', '');
            const section = document.getElementById(sectionId);

            if (section) {
                const offset = headerHeight + window.innerHeight * -0.01;
                const sectionTop = section.offsetTop;

                window.scrollTo({
                    top: sectionTop - offset,
                    behavior: 'smooth'
                });

                setActiveLink(sectionId);
            }
        });
    });

    activateCurrentSection();
});

window.onload = function() {
    const carousel = document.getElementById('carousel-items');
    const description = document.getElementById('person-description');
    const carouselIndicators = document.getElementById('carousel-indicators');

    function createIndicators(num) {
        for (let i = 0; i < num; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicator.onclick = () => {
                setActive(i);
            };
            carouselIndicators.appendChild(indicator);
        }
    }
    
    function setActiveIndicator(index) {
        Array.from(carouselIndicators.children).forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    fetch('data/persons.json')
        .then(response => response.json())
        .then(data => {
            const persons = data.persons;
            let activeIndex = 0;

            createIndicators(Object.keys(data.persons).length);

            Object.keys(persons).forEach((key, index) => {
                const person = persons[key];
                const img = document.createElement('img');
                img.src = person.image;
                img.alt = person.title;
                img.classList.add('carousel-img');
                img.onclick = () => {
                    setActive(index);
                };
                carousel.appendChild(img);
            });
            
            function setActive(index) {
                activeIndex = index;
                const activeImg = carousel.children[activeIndex];
                const offset = -activeImg.offsetLeft + carousel.offsetWidth / 2 - activeImg.offsetWidth / 2;
                carousel.style.transform = `translateX(${offset}px)`;
                
                updateActiveImage();
                setActiveIndicator(index);
            }
            
            function checkImagesLoaded() {
                const images = carousel.getElementsByTagName('img');
                let loaded = true;
            
                for (let img of images) {
                    if (!img.complete) {
                        loaded = false;
                        break;
                    }
                }
            
                if (loaded) {
                    setActive(0);
                } else {
                    setTimeout(checkImagesLoaded, 100);
                }
            };

            function updateActiveImage() {
                Array.from(carousel.children).forEach((img, index) => {
                    const person = persons[Object.keys(persons)[index]];
                    console.log(person.title);
            
                    if (index === activeIndex) {
                        img.classList.add('active');
            
                        description.innerHTML = '';
            
                        const titleDiv = document.createElement('div');
                        titleDiv.classList.add('name');
                        const titleH3 = document.createElement('h3');
                        titleH3.textContent = person.title;
                        titleDiv.appendChild(titleH3);
                        description.appendChild(titleDiv);
            
                        if (person.description) {
                            const descriptionP = document.createElement('p');
                            descriptionP.textContent = person.description;
                            description.appendChild(descriptionP);
                        }
            
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
            checkImagesLoaded();
            setActive(0);
        })
        
        
        .catch(error => {
            console.error('Error loading the JSON file:', error);
            description.innerHTML = "<p>Error loading the character data.</p>";
        });
    };

