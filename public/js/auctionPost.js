
const auctionPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#auction-post-title').value.trim();
    const car = $('#auction-car-id').find(':selected').val();
    const endDate = $("#datepicker").val();
    const endHour = $('#auction-endHour').val();
    const startBid = $('#starting-bid').val();
    const descr = $('#auction-post-descr').val();
    

    
    if (title && car && endDate && endHour && startBid && descr) {
        const response = await fetch('/api/auction', {
            method: 'POST',
            body: JSON.stringify({ title, descr, endDate, endHour, startBid, car}),
            headers: { 'Content-Type' : 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/auction')
        } else {
            alert('failed to post new auction')
        }
    } else {
        alert('please enter all the information to post auction')
    }
}
$('.newAuctionForum').on('submit', auctionPostHandler);