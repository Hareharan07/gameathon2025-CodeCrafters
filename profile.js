// Firebase configuration
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
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.database().ref('users/' + user.uid).once('value')
    .then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            document.getElementById('user-greeting').textContent = `Welcome, ${userData.fullName}`;
            
            sessionStorage.setItem('currentUser', JSON.stringify({
                uid: user.uid,
                name: userData.fullName,
                email: userData.email,
                avatarURL: userData.avatarURL || 'src/OIP.jpg'
            }));
            
            loadUserCourses(userData.email);
            
            if (userData.avatarURL) {
                updateAvatarImages(userData.avatarURL);
            }
        }
    })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    } else {
        window.location.href = 'login.html';
    }
});

function updateAvatarImages(url) {
    document.getElementById('profile-image').src = url;
    document.querySelectorAll('.profile-pic').forEach(pic => {
        pic.src = url;
    });
}

function loadUserCourses(userEmail) {
    const database = firebase.database();
    const coursesRef = database.ref('userCourses').child(userEmail.replace('.', ','));

    coursesRef.once('value')
        .then((snapshot) => {
            const courses = snapshot.val() || {};
            updateCourseStats(courses);
            updateAchievements(courses);
        })
        .catch(error => {
            console.error('Error loading courses:', error);
        });
}

function updateCourseStats(courses) {
    const coursesList = Object.values(courses);
    const totalCourses = coursesList.length;
    const completedCourses = coursesList.filter(course => course.progress === 100).length;
    const averageProgress = coursesList.reduce((acc, course) => acc + (course.progress || 0), 0) / totalCourses || 0;
    const totalHours = coursesList.reduce((acc, course) => acc + (course.hoursSpent || 0), 0);

    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = totalCourses;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = `${Math.round(averageProgress)}%`;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = Math.round(totalHours);
}

function updateAchievements(courses) {
    const achievements = [];
    const coursesList = Object.values(courses);

    if (coursesList.length >= 3) {
        achievements.push({
            icon: '🏆',
            title: 'Quick Learner',
            description: 'Completed 3 or more courses'
        });
    }
    if (coursesList.some(course => course.score === 100)) {
        achievements.push({
            icon: '⭐',
            title: 'Perfect Score',
            description: '100% in a course assessment'
        });
    }

    const achievementsGrid = document.querySelector('.achievements-grid');
    if (achievementsGrid) {
        achievementsGrid.innerHTML = achievements.map(achievement => `
            <div class="achievement-card">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
            </div>
        `).join('');
    }
}

document.getElementById('avatarUpload').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        alert('Please log in first');
        return;
    }

    try {
        const profileImage = document.getElementById('profile-image');
        const changeAvatarBtn = document.querySelector('.change-avatar-btn');
        profileImage.style.opacity = '0.5';
        changeAvatarBtn.textContent = 'Uploading...';
        changeAvatarBtn.style.pointerEvents = 'none';

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`avatars/${currentUser.uid}/${Date.now()}_${file.name}`);

        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();

        await firebase.database().ref('users/' + currentUser.uid).update({
            avatarURL: downloadURL
        });

        updateAvatarImages(downloadURL);
        profileImage.style.opacity = '1';
        changeAvatarBtn.textContent = 'Change Photo';
        changeAvatarBtn.style.pointerEvents = 'auto';

        const userData = JSON.parse(sessionStorage.getItem('currentUser'));
        userData.avatarURL = downloadURL;
        sessionStorage.setItem('currentUser', JSON.stringify(userData));

    } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('Failed to upload image. Please try again.');
        document.getElementById('profile-image').style.opacity = '1';
        document.querySelector('.change-avatar-btn').textContent = 'Change Photo';
        document.querySelector('.change-avatar-btn').style.pointerEvents = 'auto';
    }
});

document.querySelector('.logout-btn')?.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Logout Error:', error);
            alert('Error logging out. Please try again.');
        });
});