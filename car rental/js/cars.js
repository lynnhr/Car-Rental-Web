
let allCars = [];
let filteredCars = [];
let currentUser = { name: "Guest User", email: "guest@example.com" };
let favorites = [];
let editingCarId = null;

const menuToggle = document.getElementById('menuToggle');
 const navLinks = document.getElementById('navLinks');
 const sidebar = document.getElementById('sidebar');
 const overlay = document.getElementById('overlayDim');
 const openBtn = document.getElementById('openSidebar');
 const closeBtn = document.getElementById('closeSidebar');
 
 function openSidebar() {
   sidebar.classList.add('open');
   overlay.classList.add('visible');
 }
 function closeSidebar() {
   sidebar.classList.remove('oapen');
   overlay.classList.remove('visible');
 }
 
 openBtn.addEventListener('click', openSidebar);
 closeBtn.addEventListener('click', closeSidebar);
 overlay.addEventListener('click', closeSidebar);

 const searchInput = document.getElementById('searchInput');
 const searchButton = document.getElementById('searchButton');
 
 function searchCars() {
   const searchTerm = searchInput.value.toLowerCase().trim();
   
  
   if (!searchTerm) {
     applyFilters();
     return;
   }
   
  
   applyFilters();
   

   filteredCars = filteredCars.filter(car => {
     return car.title.toLowerCase().includes(searchTerm) || 
            car.brand.toLowerCase().includes(searchTerm) || 
            car.model.toLowerCase().includes(searchTerm) ||
            car.description.toLowerCase().includes(searchTerm) ||
            car.category.toLowerCase().includes(searchTerm);
   });
   
   renderCars();
 }
 

 searchButton.addEventListener('click', searchCars);
 searchInput.addEventListener('keypress', function(e) {
   if (e.key === 'Enter') {
     searchCars();
   }
 });
 
 


const carsContainer = document.getElementById('carsContainer');
const emptyState = document.getElementById('emptyState');
const brandFilter = document.getElementById('brandFilter');
const categoryFilter = document.getElementById('categoryFilter');
const colorFilter = document.getElementById('colorFilter');
const priceFilter = document.getElementById('priceFilter');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const addCarBtn = document.getElementById('addCarBtn');
const carModal = document.getElementById('carModal');
const contactModal = document.getElementById('contactModal');
const closeCarModal = document.getElementById('closeCarModal');
const closeContactModal = document.getElementById('closeContactModal');
const carForm = document.getElementById('carForm');
const contactForm = document.getElementById('contactForm');
const modalTitle = document.getElementById('modalTitle');
const saveCarBtn = document.getElementById('saveCarBtn');
const cancelCarForm = document.getElementById('cancelCarForm');
const cancelContactForm = document.getElementById('cancelContactForm');
const profileButton = document.getElementById('profileButton');
const profileMenu = document.getElementById('profileMenu');
const alertContainer = document.getElementById('alertContainer');


function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

function saveCars() {
  localStorage.setItem('cars', JSON.stringify(allCars));
}

function loadCars() {
  const storedCars = localStorage.getItem('cars');
  // if (storedCars) {
  //   allCars = JSON.parse(storedCars);
  // } else {
  //   initializeSampleCars();
  // }
  initializeSampleCars();
  filteredCars = [...allCars];
}

function initializeSampleCars() {
  allCars = [
    {
      id: generateId(),
      title: "The mid-engine Sport Car for two",
      brand: "Porsche",
      model: "718",
      description: "Impressive sports car with incredible handling and performance.",
      price: 72800,
      category: "Sport",
      color: "Black",
      image: "../images/718.avif",
      owner: "Rami Awad",
      ownerEmail: "rami@example.com"
    },
    {
      id: generateId(),
      title: "Impressive Sports Car with up to 5 seats",
      brand: "Porsche",
      model: "Cayenne",
      description: "Luxury SUV with sports car performance.",
      price: 86800,
      category: "SUV",
      color: "Gray",
      image: "../images/grey.avif",
      owner: "Elias Timani",
      ownerEmail: "elias@example.com"
    },
    {
      id: generateId(),
      title: "The sports car of compact SUVs",
      brand: "Porsche",
      model: "Macan",
      description: "Compact SUV with the heart of a sports car.",
      price: 63100,
      category: "SUV",
      color: "Blue",
      image: "../images/macan.avif",
      owner: "Philipe Haber",
      ownerEmail: "philipe@example.com"
    },
    {
      id: generateId(),
      title: "Luxury Electric Sedan",
      brand: "Tesla",
      model: "Model S",
      description: "High-performance electric vehicle with cutting-edge technology.",
      price: 89990,
      category: "Electric",
      color: "White",
      image: "../images/macanT.avif",
      owner: "Maya Johnson",
      ownerEmail: "maya@example.com"
    },
    {
      id: generateId(),
      title: "Tesla Cybertruck",
      brand: "Tesla",
      model: "Model S",
      description: "Full Self-Driving (Supervised) capability, 0-60 mph in 2.9 seconds.",
      price:190000,
      category: "Electric",
      color: "Gray",
      image: "../images/tesla-gray.jpeg",
      owner: "Celine Khoury",
      ownerEmail: "celine@hotmail.com"
    },
    {
      id: generateId(),
      title: "Tesla Model S",
      brand: "Tesla",
      model: "Model S",
      description: "Luxury Electric Sedan with advanced features.",
      price: 70000,
      category: "Electric",
      color: "Red",
      image: "../images/tesla-red.jpeg",
      owner: "Sara Alayan",
      ownerEmail: "sara@hotmail.com"
    },
    {
      id: generateId(),
      title: "Porsche Macan",
      brand: "Porsche",
      model: "Model S",
      description: "Luxury Electric Sedan with advanced features.",
      price: 97000,
      category: "SUV",
      color: "Orange",
      image: "../images/porsche-green.avif",
      owner: "Mona Diab",
      ownerEmail: "mona22@hotmail.com"
    },
    {
      id: generateId(),
      title: "Tesla Model Y",
      brand: "Tesla",
      model: "Model Y",
      description: "Luxury Electric Sedan with advanced features.",
      price: 150000,
      category: "Electric",
      color: "White",
      image: "../images/tesla-modely-white.avif",
      owner: "Jack Hills",
      ownerEmail: "jack@gmail.com"
      }
  ];
  saveCars();
}

function renderCars() {
  
  carsContainer.innerHTML = '';
  
 
  if (filteredCars.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  
  filteredCars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.id = car.id;
    
    const isFavorite = favorites.includes(car.id);
    const isOwner = car.ownerEmail === currentUser.email;
    
    card.innerHTML = `
      <div class="car-image" onclick="openPreviewModal('${car.id}')">
        <img src="${car.image}" alt="${car.brand} ${car.model}">
        <span class="car-category">${car.category}</span>
        <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-id="${car.id}">
          ${isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="car-info">
        <h3>${car.title}</h3>
        <p class="car-brand">${car.brand} - ${car.model}</p>
        <p class="car-color"><span class="color-dot" style="background-color: ${car.color}"></span> ${car.color}</p>
        <p class="car-description">${car.description}</p>
        <div class="car-price">$${car.price.toLocaleString()}</div>
        <div class="car-actions">
          ${isOwner ? `
            <button class="btn btn-secondary edit-car" data-id="${car.id}">Edit</button>
            <button class="btn btn-danger delete-car" data-id="${car.id}">Delete</button>
          ` : `
            <button class="btn btn-primary contact-seller" data-id="${car.id}">Contact Seller</button>
          `}
        </div>
      </div>
    `;
    
    carsContainer.appendChild(card);
  });
  
  
  attachCarCardEventListeners();
}

function attachCarCardEventListeners() {
 
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const carId = this.dataset.id;
      toggleFavorite(carId);
    });
  });
  
  
  document.querySelectorAll('.edit-car').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const carId = this.dataset.id;
      openEditCarModal(carId);
    });
  });
  
 
  document.querySelectorAll('.delete-car').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const carId = this.dataset.id;
      deleteCar(carId);
    });
  });
  

  document.querySelectorAll('.contact-seller').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const carId = this.dataset.id;
      openContactModal(carId);
    });
  });
}

function toggleFavorite(carId) {
  const index = favorites.indexOf(carId);
  if (index === -1) {
    favorites.push(carId);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderCars();
}

function populateFilterOptions() {
 
  const clearOptions = (select) => {
    const defaultOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(defaultOption);
  };
  
  clearOptions(brandFilter);
  clearOptions(colorFilter);
  
 
  const brands = [...new Set(allCars.map(car => car.brand))];
  const colors = [...new Set(allCars.map(car => car.color))];
  
  
  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
  

  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    colorFilter.appendChild(option);
  });
}

function applyFilters() {
  const brand = brandFilter.value;
  const category = categoryFilter.value;
  const color = colorFilter.value;
  const maxPrice = priceFilter.value ? parseFloat(priceFilter.value) : Number.MAX_SAFE_INTEGER;
  
  filteredCars = allCars.filter(car => {
    return (!brand || car.brand === brand) &&
           (!category || car.category === category) &&
           (!color || car.color === color) &&
           car.price <= maxPrice;
  });
  
  renderCars();
}

function resetFilters() {
  brandFilter.value = '';
  categoryFilter.value = '';
  colorFilter.value = '';
  priceFilter.value = '';
  
  filteredCars = [...allCars];
  renderCars();
}

function openAddCarModal() {

  carForm.reset();
  document.getElementById('carId').value = '';
  modalTitle.textContent = 'Add New Car';
  editingCarId = null;
  

  carModal.style.display = 'block';
}

function openEditCarModal(carId) {
  const car = allCars.find(car => car.id === carId);
  if (!car) return;
  
 
  document.getElementById('carId').value = car.id;
  document.getElementById('carTitle').value = car.title;
  document.getElementById('carBrand').value = car.brand;
  document.getElementById('carModel').value = car.model;
  document.getElementById('carCategory').value = car.category;
  document.getElementById('carDescription').value = car.description;
  document.getElementById('carColor').value = car.color;
  document.getElementById('carPrice').value = car.price;
  document.getElementById('carImage').value = car.image;
  
 
  document.getElementById('carTitle').disabled = true;

  modalTitle.textContent = 'Edit Car';
  editingCarId = carId;
  
  
  carModal.style.display = 'block';
}

function saveCar(e) {
  e.preventDefault();
  
  const carId = document.getElementById('carId').value || generateId();
  const car = {
    id: carId,
    title: document.getElementById('carTitle').value,
    brand: document.getElementById('carBrand').value,
    model: document.getElementById('carModel').value,
    category: document.getElementById('carCategory').value,
    description: document.getElementById('carDescription').value,
    color: document.getElementById('carColor').value,
    price: parseFloat(document.getElementById('carPrice').value),
    image: document.getElementById('carImage').value,
    owner: currentUser.name,
    ownerEmail: currentUser.email
  };
  
  if (editingCarId) {
    
    const index = allCars.findIndex(c => c.id === editingCarId);
    if (index !== -1) {
      allCars[index] = car;
    }
  } else {
   
    allCars.push(car);
  }
  
  
  saveCars();
  filteredCars = [...allCars];
  populateFilterOptions();
  renderCars();

  carModal.style.display = 'none';
  

  showAlert(editingCarId ? 'Car updated successfully!' : 'Car added successfully!', 'success');
  
  editingCarId = null;
}

function deleteCar(carId) {
  if (confirm('Are you sure you want to delete this car?')) {
    allCars = allCars.filter(car => car.id !== carId);
    filteredCars = filteredCars.filter(car => car.id !== carId);
    
  
    saveCars();
    populateFilterOptions();
    renderCars();
    
   
    showAlert('Car deleted successfully!', 'success');
  }
}

function openContactModal(carId) {
  const car = allCars.find(car => car.id === carId);
  if (!car) return;
  
 
  document.getElementById('contactCarId').value = carId;
  
 
  contactModal.style.display = 'block';
}

function sendContactMessage(e) {
  e.preventDefault();
  
  const carId = document.getElementById('contactCarId').value;
  const car = allCars.find(car => car.id === carId);
  
  if (!car) {
    showAlert('Car not found!', 'error');
    return;
  }
  
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const phone = document.getElementById('contactPhone').value;
  const message = document.getElementById('contactMessage').value;
  
  
  contactModal.style.display = 'none';
  contactForm.reset();
  
 
  showAlert(`Message sent to ${car.owner}!`, 'success');
}

function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  alertContainer.appendChild(alert);
  
 
  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => {
      alert.remove();
    }, 500);
  }, 3000);
}

function toggleProfileMenu() {
  profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to close modals when clicking outside or on the close button
function closeModals(e) {
  if (e.target === carModal || e.target === closeCarModal) {
    carModal.style.display = 'none';
  }
  if (e.target === contactModal || e.target === closeContactModal) {
    contactModal.style.display = 'none';
  }
}


function setupEventListeners() {
 
  applyFiltersBtn.addEventListener('click', applyFilters);
  resetFiltersBtn.addEventListener('click', resetFilters);
  
 
  addCarBtn.addEventListener('click', openAddCarModal);
  document.getElementById('addFirstCar').addEventListener('click', openAddCarModal);
  
  
  closeCarModal.addEventListener('click', () => carModal.style.display = 'none');
  closeContactModal.addEventListener('click', () => contactModal.style.display = 'none');
  
 
  window.addEventListener('click', closeModals);
  

  carForm.addEventListener('submit', saveCar);
  contactForm.addEventListener('submit', sendContactMessage);
  

  cancelCarForm.addEventListener('click', () => carModal.style.display = 'none');
  cancelContactForm.addEventListener('click', () => contactModal.style.display = 'none');
  

  profileButton.addEventListener('click', toggleProfileMenu);

  document.addEventListener('click', function(e) {
    if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
      profileMenu.style.display = 'none';
    }
  });
  

  document.getElementById('manageListings').addEventListener('click', function(e) {
    e.preventDefault();
    filteredCars = allCars.filter(car => car.ownerEmail === currentUser.email);
    renderCars();
    profileMenu.style.display = 'none';
  });
  
  document.getElementById('favoritesLink').addEventListener('click', function(e) {
    e.preventDefault();
    filteredCars = allCars.filter(car => favorites.includes(car.id));
    renderCars();
    profileMenu.style.display = 'none';
  });
  
  document.getElementById('logoutLink').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '../html/signup.html';
  });
}


function initApp() {
 
  loadCars();
  

  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
  

  populateFilterOptions();
  

  setupEventListeners();
  

  renderCars();
  

  window.allCars = allCars;
  window.filteredCars = filteredCars;
  window.currentUser = currentUser;
  window.favorites = favorites;
  window.renderCars = renderCars;
  window.saveCars = saveCars;
  window.generateId = generateId;
}


document.addEventListener('DOMContentLoaded', initApp);

const previewModal = document.getElementById('previewModal');
const closePreviewModal = document.getElementById('closePreviewModal');
const previewCarImage = document.getElementById('previewCarImage');
const previewTitle = document.getElementById('previewTitle');
const previewDescription = document.getElementById('previewDescription');
const previewOwner = document.getElementById('previewOwner');
const previewEmail = document.getElementById('previewEmail');
const previewContactBtn = document.getElementById('previewContactBtn');

function openPreviewModal(carId) {
  const car = allCars.find(c => c.id === carId);
  if (!car) return;

  previewCarImage.src = car.image;
  previewTitle.textContent = `${car.brand} ${car.model}`;
  previewDescription.textContent = car.description;
  previewOwner.textContent = car.owner;
  previewEmail.textContent = car.ownerEmail;

  previewContactBtn.onclick = function () {
    openContactModal(carId);
    previewModal.style.display = 'none';
  };

  previewModal.style.display = 'block';
}

closePreviewModal.onclick = () => {
  previewModal.style.display = 'none';
};

window.addEventListener('click', function (e) {
  if (e.target === previewModal) {
    previewModal.style.display = 'none';
  }
});
