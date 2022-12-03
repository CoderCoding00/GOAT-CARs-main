

const changePasswordHandler = async (event) => {
    event.preventDefault();
    $('#password-alert-repeatpw').addClass('hide')
    $('#password-alert-wrong').addClass('hide')
    $('#password-alert-missing').addClass('hide')

    const currentPassword = document.querySelector('#current-password').value.trim();
    const newPassword = document.querySelector('#new-password').value.trim();
    const confirmPassword = document.querySelector('#new-password-confirm').value.trim();
    const userId = document.querySelector('#profile-user-id').innerHTML;

    if (newPassword !== confirmPassword) {
        $('#password-alert-repeatpw').removeClass('hide')
    } else if (currentPassword) {
        $('#password-alert-wrong').removeClass('hide')
    } else if(currentPassword && newPassword && confirmPassword) {
        $('#changePasswordModal').modal('hide');
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ newPassword }),
            headers: { 'Content-Type' : 'application/json' },
        });
        if (response.ok) {
            await document.location.replace('/');
        } else {
            alert(response.status)
        }
        } else {
            $('#password-alert-missing').removeClass('hide')
        }
    
}

