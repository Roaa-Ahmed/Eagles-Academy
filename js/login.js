// DOM Elements
const loginForm = document.getElementById("loginForm")
const loginSubmitBtn = document.getElementById("loginSubmitBtn")
const loginCard = document.getElementById("loginCard")
const successCard = document.getElementById("successCard")
const welcomeMessage = document.getElementById("welcomeMessage")
const userDetails = document.getElementById("userDetails")
const registrationModal = document.getElementById("registrationModal")
const notificationContainer = document.getElementById("notificationContainer")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

// Admin credentials - ID عادي من 1-100
const ADMIN_ID = "99"

// Initialize the page
function init() {
  checkExistingLogin()
  setupEventListeners()
  setupNavigation()
  console.log("🚀 Login page loaded successfully!")
}

// Check if user is already logged in
function checkExistingLogin() {
  const savedUser = localStorage.getItem("eaglesAcademyUser")
  if (savedUser) {
    const user = JSON.parse(savedUser)
    showSuccessCard(user)
  }
}

// Setup event listeners
function setupEventListeners() {
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeRegistrationModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeRegistrationModal()
    }
  })
}

// Setup navigation
function setupNavigation() {
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      const bars = hamburger.querySelectorAll(".bar")
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) bar.style.opacity = "0"
          if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        }
      })
    })
  }

  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const bars = hamburger.querySelectorAll(".bar")
      bars.forEach((bar) => {
        bar.style.transform = "none"
        bar.style.opacity = "1"
      })
    })
  })
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault()

  setLoadingState(true)

  const formData = new FormData(loginForm)
  const playerData = {
    name: formData.get("playerName").trim(),
    phone: formData.get("playerPhone").trim(),
    id: formData.get("playerId").trim(),
  }

  const validation = validateLoginData(playerData)
  if (!validation.isValid) {
    setLoadingState(false)
    showNotification(validation.message, "error")
    return
  }

  setTimeout(() => {
    localStorage.setItem("eaglesAcademyUser", JSON.stringify(playerData))
    showSuccessCard(playerData)
    setLoadingState(false)

    const welcomeText = playerData.id === ADMIN_ID ? "Welcome, Administrator!" : `Welcome back, ${playerData.name}!`
    showNotification(welcomeText, "success")
  }, 1500)
}

// Validate login data
function validateLoginData(data) {
  if (!data.name || !data.phone || !data.id) {
    return {
      isValid: false,
      message: "Please fill in all required fields",
    }
  }

  // التحقق من الاسم (بدون أرقام، حروف فقط)
  const nameRegex = /^[a-zA-Z\s]{2,}$/
  if (!nameRegex.test(data.name)) {
    return {
      isValid: false,
      message: "Please enter a valid name (letters only, minimum 2 characters)",
    }
  }

  // التحقق من رقم الهاتف
  const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/
  if (!phoneRegex.test(data.phone)) {
    return {
      isValid: false,
      message: "Please enter a valid phone number",
    }
  }

  // التحقق من الـ ID (من 1-100 فقط)
  const playerId = Number.parseInt(data.id)
  if (isNaN(playerId) || playerId < 1 || playerId > 100) {
    return {
      isValid: false,
      message: "ID must be a number between 1 and 100",
    }
  }

  return { isValid: true }
}

// Set loading state
function setLoadingState(loading) {
  if (loading) {
    loginSubmitBtn.disabled = true
    loginSubmitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Logging in...</span>
        `
    loginSubmitBtn.classList.add("loading")
  } else {
    loginSubmitBtn.disabled = false
    loginSubmitBtn.innerHTML = `
            <i class="fas fa-sign-in-alt"></i>
            <span>Login to Academy</span>
        `
    loginSubmitBtn.classList.remove("loading")
  }
}

// Show success card
function showSuccessCard(user) {
  loginCard.style.display = "none"

  // Check if user is admin
  const isAdmin = user.id === ADMIN_ID
  const userType = isAdmin ? "Administrator" : "Active Player"
  const welcomeText = isAdmin ? `Welcome, Administrator!` : `Welcome back, ${user.name}!`

  welcomeMessage.textContent = welcomeText

  userDetails.innerHTML = `
        <div class="user-detail">
            <strong>Name:</strong>
            <span>${user.name}</span>
        </div>
        <div class="user-detail">
            <strong>Phone:</strong>
            <span>${user.phone}</span>
        </div>
        <div class="user-detail">
            <strong>${isAdmin ? "Admin" : "Player"} ID:</strong>
            <span>#${user.id}</span>
        </div>
        <div class="user-detail">
            <strong>Status:</strong>
            <span style="color: ${isAdmin ? "#f59e0b" : "#10b981"}; font-weight: 600;">${userType}</span>
        </div>
    `

  successCard.style.display = "block"
}

// Go to dashboard
function goToDashboard() {
  const savedUser = localStorage.getItem("eaglesAcademyUser")
  if (savedUser) {
    const user = JSON.parse(savedUser)

    const currentPath = window.location.pathname
    let dashboardPath = ""

    // Check if user is admin
    if (user.id === ADMIN_ID) {
      // Redirect to admin dashboard
      if (currentPath.includes("/pages/")) {
        dashboardPath = `../admin-dashboard.html?id=${user.id}`
      } else {
        dashboardPath = `admin-dashboard.html?id=${user.id}`
      }
    } else {
      // Redirect to player dashboard
      if (currentPath.includes("/pages/")) {
        dashboardPath = `../player-dashboard.html?id=${user.id}`
      } else {
        dashboardPath = `player-dashboard.html?id=${user.id}`
      }
    }

    console.log("Redirecting to:", dashboardPath)
    console.log("User data:", user)

    window.location.href = dashboardPath
  } else {
    showNotification("No user data found. Please login again.", "error")
  }
}

// Logout function
function logout() {
  localStorage.removeItem("eaglesAcademyUser")
  loginCard.style.display = "block"
  successCard.style.display = "none"
  loginForm.reset()
  showNotification("You have been logged out successfully", "info")
}

// Show registration info modal
function showRegistrationInfo() {
  registrationModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close registration modal
function closeRegistrationModal() {
  registrationModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icon = getNotificationIcon(type)

  notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `

  notificationContainer.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)

  notification.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  })
}

// Get notification icon based on type
function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-triangle",
    warning: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
  }
  return icons[type] || icons.info
}

// Make functions globally available
window.showRegistrationInfo = showRegistrationInfo
window.closeRegistrationModal = closeRegistrationModal
window.logout = logout
window.goToDashboard = goToDashboard

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
})
