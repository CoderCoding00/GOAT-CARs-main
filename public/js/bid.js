
// const socket = io('https://goatcars.herokuapp.com')
// It is used for local environment
const socket = io('http://localhost:3001')
socket.on('connection');

socket.on('message', (data) => {
    document.querySelector('#bid-text').innerHTML = data;
})

const sendBid = (message) => {
    socket.emit('message', message)
};

// handle add Car Form
const bidHandler = async (event) => {
    event.preventDefault();
    
    const bid = document.querySelector('#bid-amount').value;
    const auction = document.querySelector('#auction-id').innerHTML;
    const currentBid = document.querySelector('#current-bid-view').innerHTML;
    

        if (!bid) {
        $('#alert-bid').removeClass('hide');
    } else if (Number(bid) < Number(currentBid)) {
        $('#alert-bid').removeClass('hide');
    } else {
        const response = await fetch(`/api/auction/${auction}`, {
            method: 'PUT',
            body: JSON.stringify({ bid }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const username = document.querySelector('#bid-username').innerHTML;
            const bidformat = parseInt(bid).toLocaleString();
            const bidInput = `${username} BID $${bidformat}`;
            sendBid(bidInput);
            
            document.location.replace(`/auction/bid/${auction}`)
        } else {
            alert('Failed to add bid')
        }
    }
  };    

// document.querySelector('.newPostForum').addEventListener('submit', newPostHandler);
$('.bid-form').on('submit', bidHandler);
