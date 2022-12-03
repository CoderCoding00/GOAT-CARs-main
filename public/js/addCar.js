const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};



// handle add Car Form
const addCarHandler = async (event) => {
    event.preventDefault();


    const year = document.querySelector('#car-year').value;
    const make = document.querySelector('#car-make').value.trim();
    const model = document.querySelector('#car-model').value.trim();
    const value = document.querySelector('#car-value').value.trim();
    // const image = document.querySelector('#car-image').value.trim();
    const description = document.querySelector('#car-description').value.trim();
    const image = document.querySelector('#car-image')
    const imagefile = image.files[0];
    const formData = await new FormData();
    formData.append('file', imagefile);
    formData.append('upload_preset' , 'goatcars');
    const cloudName = 'dc2xiz0gi';
    const data = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    }).then(r => r.json());

    const cloudinaryUrl = data.url;
    
    if (year && make && model && value && cloudinaryUrl && description) {
        const response = await fetch('/api/car', {
            method: 'POST',
            body: JSON.stringify({ year, make, model, value, cloudinaryUrl, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to add new car')
        }
    }
  };    

// document.querySelector('.newPostForum').addEventListener('submit', newPostHandler);
$('.add-car-form').on('submit', addCarHandler);
