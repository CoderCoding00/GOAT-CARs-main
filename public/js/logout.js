const logout = async () => {
    // A POST request to destroy the session on the back end when user logout. 
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If user successfully logged out, redirect them to the login page
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
  // document.querySelector('#logout').addEventListener('click', logout);
  $('#logout').on('click', logout);