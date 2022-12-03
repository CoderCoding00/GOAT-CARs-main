
// handle Signup form
  const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#forum-post-title').value.trim();
    const description = document.querySelector('#forum-post-descr').value.trim();
    const category = document.querySelector('input[name="categories"]:checked').nextElementSibling.innerHTML.trim();
    
    if (title && description && category) {
        const response = await fetch('/api/forum', {
            method: 'POST',
            body: JSON.stringify({ title, description, category }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/forum')
        } else {
            alert('Failed to post new forum')
        }
    }
  };    

// document.querySelector('.newPostForum').addEventListener('submit', newPostHandler);
$('.newPostForum').on('submit', newPostHandler);
