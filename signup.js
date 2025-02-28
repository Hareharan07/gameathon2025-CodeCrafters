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

firebase.auth().languageCode = 'en';

const signupForm = document.getElementById('signupform');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const fullnameInput = document.getElementById('fullname');

async function checkAuthMethods() {
    try {
        const methods = await firebase.auth().fetchSignInMethodsForEmail('test@test.com');
        console.log('Auth methods available:', methods);
    } catch (error) {
        console.error('Auth configuration error:', error);
    }
}

checkAuthMethods();

signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.signup-submit-btn');
    submitBtn.classList.add('loading');
    
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const fullName = fullnameInput.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        submitBtn.classList.remove('loading');
        return;
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
    
        try {
            await firebase.database().ref('users/' + user.uid).set({
                fullName: fullName,
                email: email,
                createdAt: Date.now()
            });
    
            sessionStorage.setItem('currentUser', JSON.stringify({
                name: fullName,
                email: email,
                uid: user.uid
            }));
    
            window.location.href = 'home.html';
        } catch (dbError) {
            console.error('Database Error:', dbError);
            alert('Account created but some data could not be saved. Please try updating your profile later.');
            window.location.href = 'profile.html';
        }
    } catch (error) {
        console.error('Signup Error:', error);
        if (error.code === 'PERMISSION_DENIED') {
            alert('Database permission error. Please contact support.');
        } else {
            alert(error.message);
        }
        submitBtn.classList.remove('loading');
    }
});

window.addEventListener('load', () => {
    signupForm.reset();
    sessionStorage.removeItem('currentUser');
});