const deleteUserHandler = async (event) => {
    event.preventDefault();
    
    const userId = document.querySelector('#profile-user-id').innerHTML;
    await fetch (`/api/users/${userId}`, {
        method: 'DELETE'
    });
    document.location.replace('/')

}
// document.querySelector('.delete-form').addEventListener('submit', deleteUserHandler)
$('#delete-user-btn').click(deleteUserHandler)