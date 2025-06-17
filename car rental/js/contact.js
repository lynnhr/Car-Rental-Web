// Hon mn jib kel l inputs ta3 l form (First Name, Last Name, Email, Message)
const inputs = document.querySelectorAll(".contact-input");

// Hon mn jib l toggle button taba3 l dark mode
const toggleBtn = document.querySelector(".theme-toggle");

// Hon mn jib kel l elements bel page (bas l user y2aleb dark/light mode)
const allElements = document.querySelectorAll("*");

// Lama l user yekbos 3al toggle button:
toggleBtn.addEventListener("click", () => {
    // Mn3ml toggle lal class "dark" 3al body
    document.body.classList.toggle("dark");

    // 3a kel l elements mn3tihon smooth transition l chi 1 second
    allElements.forEach((el) => {
        el.classList.add("transition");

        // Ba3d 1 second mnshil l transition so it doesn't stay always
        setTimeout(() => {
            el.classList.remove("transition");
        }, 1000);
    })
});

// 3al inputs (lama y3ml focus w lama y3ml blur)
inputs.forEach((ipt) => {
    // Lama y3ml focus (yballesh yektob):
    ipt.addEventListener("focus", () => {

        // Mnhot l class "focus" tb3 l styling
        ipt.parentNode.classList.add("focus");

        // Mnhot l class "not-empty" dghre (hata law ma katab shi b3d)
        ipt.parentNode.classList.add("not-empty");
    });
    // Lama y3ml blur:
    ipt.addEventListener("blur", () => {

        // If the input is still empty, mnshil l class "not-empty"
        if (ipt.value == "") {
            ipt.parentNode.classList.remove("not-empty");
        }
        // deyman mnshil l "focus" bas y3ml blur
        ipt.parentNode.classList.remove("focus");
    });
});

// *** ADDED: Form Validation ***
const form = document.getElementById('contactForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendMessageBtn = document.getElementById('sendMessageBtn'); // Get the button

sendMessageBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission

    let isValid = true;

    if (firstNameInput.value.trim() === '') {
        alert('Please enter your first name.');
        isValid = false;
        firstNameInput.focus();
    } else if (lastNameInput.value.trim() === '') {
        alert('Please enter your last name.');
        isValid = false;
        lastNameInput.focus();
    } else if (emailInput.value.trim() === '') {
        alert('Please enter your email.');
        isValid = false;
        emailInput.focus();
    } else if (messageInput.value.trim() === '') {
        alert('Please enter your message.');
        isValid = false;
        messageInput.focus();
    }

    if (isValid) {
        // If all fields are valid, redirect
        alert('Message sent successfully!');
        window.location.href = 'Home.html';

    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlayDim');
        const openBtn = document.getElementById('openSidebar');
        const closeBtn = document.getElementById('closeSidebar');
        
        function openSidebar() {
          sidebar.classList.add('open');
          overlay.classList.add('visible');
        }
        function closeSidebar() {
          sidebar.classList.remove('open');
          overlay.classList.remove('visible');
        }
        
        openBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
         // Custom cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
});

document.getElementById('openSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
  });
  
 