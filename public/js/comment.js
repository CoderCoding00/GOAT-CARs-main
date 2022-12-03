
// handle add Car Form
const commentHandler = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector('#comment-post').value;
    const forum = document.querySelector('#forum-id').innerHTML;
    
    

        if (comment) {
        const response = await fetch(`/api/forum/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment, forum }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/forum/view-post/${forum}`)
        } else {
            alert('Failed to add comment')
        }
    }
  };    

// document.querySelector('.newPostForum').addEventListener('submit', newPostHandler);
$('.comment-form').on('submit', commentHandler);
