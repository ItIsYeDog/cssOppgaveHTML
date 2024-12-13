document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    async function fetchCards() {
        const response = await fetch('http://10.12.12.250:3000/api/cards', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const cards = await response.json();
            cardGrid.innerHTML = cards.map(card => `
                <div class="grid-item">
                    <img src="http://10.12.12.250:3000/${card.image}" alt="">
                    <div class="grid-text">
                        <h1>${card.title}</h1>
                        <h2>${card.subtitle}</h2>
                        <p>${card.description}</p>
                    </div>
                </div>
            `).join('');
        } else {
            console.error('Failed to fetch cards:', response.statusText);
        }
    }

    fetchCards();
});