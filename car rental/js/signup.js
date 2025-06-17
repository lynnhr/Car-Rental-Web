const container = document.querySelector('.container');
const registerBtn=document.querySelector('.register_btn');
const loginBtn = document.querySelector('.login_btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


document.addEventListener('DOMContentLoaded', () => {
   
    const container = document.querySelector('.container');
    const loginForm = document.querySelector('.form_box.login form');
    const registerForm = document.querySelector('.form_box.register form');
    const loginBtn = document.querySelector('.login_btn');
    const registerBtn = document.querySelector('.register_btn');

   
    const userSystem = {
        users: [],
        currentUser: null,

        
        init() {
            
            this.loadFromLocalStorage();
            
            
            this.setupEventListeners();
            
            
            this.updateAuthUI();
        },

       
        saveToLocalStorage() {
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        },

        
        loadFromLocalStorage() {
            const savedUsers = localStorage.getItem('users');
            const savedCurrentUser = localStorage.getItem('currentUser');
            
            if (savedUsers) this.users = JSON.parse(savedUsers);
            if (savedCurrentUser) this.currentUser = JSON.parse(savedCurrentUser);
            
           
            if (this.users.length === 0) {
                this.users = [
                    { 
                        id: 1, 
                        username: 'demo', 
                        email: 'demo@example.com', 
                        password: 'password123' 
                    }
                ];
                this.saveToLocalStorage();
            }
        },

       
        setupEventListeners() {
            
            if (registerBtn) {
                registerBtn.addEventListener('click', () => {
                    container.classList.add('active');
                });
            }
            
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    container.classList.remove('active');
                });
            }
            
           
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.loginUser();
                });
            }
            
           
            if (registerForm) {
                registerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.registerUser();
                });
            }
        },

       
        registerUser() {
            const username = document.querySelector('.form_box.register input[type="text"]').value;
            const email = document.querySelector('.form_box.register input[type="email"]').value;
            const password = document.querySelector('.form_box.register input[type="password"]').value;
            
            
            if (!username || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            
            const userExists = this.users.some(user => 
                user.username === username || user.email === email
            );
            
            if (userExists) {
                alert('Username or email already exists!');
                return;
            }
            
           
            const newUser = {
                id: this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1,
                username,
                email,
                password
            };
            
           
            this.users.push(newUser);
            
           
            this.currentUser = newUser;
            
           
            this.saveToLocalStorage();
            
            
            this.updateAuthUI();
            
           
            document.querySelector('.form_box.register form').reset();
            
            
            alert('Registration successful! please login to continue.');
            


        },

        
        loginUser() {
            const username = document.querySelector('.form_box.login input[type="text"]').value;
            const password = document.querySelector('.form_box.login input[type="password"]').value;
            
           
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }
            
           
            const user = this.users.find(user => 
                (user.username === username || user.email === username) && 
                user.password === password
            );
            
            if (!user) {
                alert('Invalid username or password!');
                return;
            }
            
            
            this.currentUser = user;
            
            
            this.saveToLocalStorage();
            
            
            this.updateAuthUI();
            
            
            document.querySelector('.form_box.login form').reset();
            
            
            
            window.location.href = '../html/home.html';

        },

        
        logoutUser() {
            this.currentUser = null;
            this.saveToLocalStorage();
            this.updateAuthUI();
            
        },

        
        updateAuthUI() {
            if (this.currentUser) {
                // User is logged in
                console.log('User is logged in:', this.currentUser);
                
               
            } else {
                // User is logged out
                console.log('No user is logged in');
                

            }
        }
    };

    
    userSystem.init();
    
    
    window.userSystem = userSystem;
});

// Fix for HTML structure issues (if any)
document.addEventListener('DOMContentLoaded', () => {
    // Check if forms are properly closed
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        
    });
});



