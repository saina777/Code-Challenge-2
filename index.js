let guestList = [];
const guestForm = document.getElementById('guest-form');
const guestListElement = document.getElementById('guest-list');

guestForm.addEventListener('submit', addGuest);

function addGuest(event) {
    event.preventDefault();
    const guestName = document.getElementById('guest-name').value.trim();
    if (guestName !== '') {
        if (guestList.length < 10) {
            const guest = {
                name: guestName,
                rsvp: 'Not Attending'
            };
            guestList.push(guest);
            renderGuestList();
            document.getElementById('guest-name').value = '';
        } else {
            alert('Guest list is full. Cannot add more than 10 guests.');
        }
    }
}

function renderGuestList() {
    guestListElement.innerHTML = '';
    guestList.forEach((guest, index) => {
        const guestItem = document.createElement('li');
        guestItem.classList.add('guest-item');
        guestItem.innerHTML = `
            <span class="name">${guest.name}</span>
            <span class="rsvp ${guest.rsvp === 'Attending' ? 'attending' : 'not-attending'}">${guest.rsvp}</span>
            <button class="rsvp-btn" onclick="toggleRSVP(${index})">Toggle RSVP</button>
            <button class="delete-btn" onclick="deleteGuest(${index})">Remove</button>
        `;
        guestListElement.appendChild(guestItem);
    });
}

function toggleRSVP(index) {
    if (guestList[index].rsvp === 'Attending') {
        guestList[index].rsvp = 'Not Attending';
    } else {
        guestList[index].rsvp = 'Attending';
    }
    renderGuestList();
}

function deleteGuest(index) {
    guestList.splice(index, 1);
    renderGuestList();
}

// Make toggleRSVP and deleteGuest functions accessible from the global scope
window.toggleRSVP = toggleRSVP;
window.deleteGuest = deleteGuest;