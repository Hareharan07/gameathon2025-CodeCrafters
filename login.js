const firebaseConfig = {
    apiKey: "AIzaSyBqDJlD1jZ3EDZ6_bMmFSLFprpJJFRUdnQ",
    authDomain: "signupform-757a2.firebaseapp.com",
    databaseURL: "https://signupform-757a2-default-rtdb.firebaseio.com",
    projectId: "signupform-757a2",
    storageBucket: "signupform-757a2.firebasestorage.app",
    messagingSenderId: "674699353582",
    appId: "1:674699353582:web:7472850bf7fd331a81c2ff"
};

firebase.initializeApp(firebaseConfig);

function getInputVal(id) {
    return document.getElementById(id).value.trim();
}

document.getElementById('loginform').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.login-submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const email = getInputVal('login-email');
    const password = getInputVal('login-password');
    const remember = document.getElementById('remember').checked;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const snapshot = await firebase.database().ref('users/' + user.uid).once('value');
        const userData = snapshot.val();

        if (userData) {
            if (remember) {
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('userEmail');
            }

            sessionStorage.setItem('currentUser', JSON.stringify({
                uid: user.uid,
                name: userData.fullName,
                email: userData.email,
                avatarURL: userData.avatarURL || 'src/OIP.jpg'
            }));

            window.location.href = 'home.html';
        } else {
            throw new Error('User data not found');
        }
    } catch (error) {
        console.error('Login Error:', error);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Invalid password. Please try again.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your internet connection.';
                break;
            default:
                errorMessage = 'Login failed. Please try again.';
        }
        alert(errorMessage);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});

document.querySelector('.forgot-password').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = getInputVal('login-email');
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }

    try {
        await firebase.auth().sendPasswordResetEmail(email);
        alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
        console.error('Password Reset Error:', error);
        alert('Error sending reset email. Please try again.');
    }
});