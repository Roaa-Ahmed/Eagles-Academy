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

// Initialize the page
function init() {
  // Check if user is already logged in
  checkExistingLogin()

  // Setup event listeners
  setupEventListeners()

  // Setup navigation
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
  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeRegistrationModal()
    }
  })

  // Keyboard shortcuts
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

  // Close menu when clicking on links
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

  // Show loading state
  setLoadingState(true)

  // Get form data
  const formData = new FormData(loginForm)
  const playerData = {
    name: formData.get("playerName").trim(),
    phone: formData.get("playerPhone").trim(),
    id: formData.get("playerId").trim(),
  }

  // Validate form data
  const validation = validateLoginData(playerData)
  if (!validation.isValid) {
    setLoadingState(false)
    showNotification(validation.message, "error")
    return
  }

  // Simulate API call delay
  setTimeout(() => {
    // Save user data
    localStorage.setItem("eaglesAcademyUser", JSON.stringify(playerData))

    // Show success
    showSuccessCard(playerData)
    setLoadingState(false)

    // Show welcome notification
    showNotification(`Welcome back, ${playerData.name}!`, "success")
  }, 1500)
}

// Validate login data
function validateLoginData(data) {
  // Check if all fields are filled
  if (!data.name || !data.phone || !data.id) {
    return {
      isValid: false,
      message: "Please fill in all required fields",
    }
  }

  // Validate name (at least 2 characters, only letters and spaces)
  const nameRegex = /^[a-zA-Z\s]{2,}$/
  if (!nameRegex.test(data.name)) {
    return {
      isValid: false,
      message: "Please enter a valid name (letters only, minimum 2 characters)",
    }
  }

  // Validate phone number
  const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/
  if (!phoneRegex.test(data.phone)) {
    return {
      isValid: false,
      message: "Please enter a valid phone number",
    }
  }

  // Validate Player ID (numbers from 1-100 only)
  const playerId = Number.parseInt(data.id)
  if (isNaN(playerId) || playerId < 1 || playerId > 100) {
    return {
      isValid: false,
      message: "Player ID must be a number between 1 and 100",
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
  // Hide login card
  loginCard.style.display = "none"

  // Update success card content
  welcomeMessage.textContent = `Welcome back, ${user.name}!`

  // Update user details
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
            <strong>Player ID:</strong>
            <span>#${user.id}</span>
        </div>
        <div class="user-detail">
            <strong>Status:</strong>
            <span style="color: #10b981; font-weight: 600;">Active Player</span>
        </div>
    `

  // Show success card
  successCard.style.display = "block"
}

// Go to dashboard - هنا المشكلة!
function goToDashboard() {
  const savedUser = localStorage.getItem("eaglesAcademyUser")
  if (savedUser) {
    const user = JSON.parse(savedUser)

    // تحديد المسار الصحيح حسب مكان الملف
    // إذا كان login.html في مجلد pages
    const currentPath = window.location.pathname
    let dashboardPath = ""

    if (currentPath.includes("/pages/")) {
      // إذا كنا في مجلد pages، نرجع للمجلد الرئيسي
      dashboardPath = `../player-dashboard.html?id=${user.id}`
    } else {
      // إذا كنا في المجلد الرئيسي
      dashboardPath = `player-dashboard.html?id=${user.id}`
    }

    console.log("Redirecting to:", dashboardPath)
    console.log("User data:", user)

    // التوجه للـ dashboard
    window.location.href = dashboardPath
  } else {
    showNotification("No user data found. Please login again.", "error")
  }
}

// Logout function
function logout() {
  // Remove user data
  localStorage.removeItem("eaglesAcademyUser")

  // Show login card
  loginCard.style.display = "block"
  successCard.style.display = "none"

  // Reset form
  loginForm.reset()

  // Show notification
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

  // Add to container
  notificationContainer.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)

  // Add click to dismiss
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

// Enhanced form interactions
function setupFormEnhancements() {
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    // Add focus effects
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused")

      // Real-time validation
      if (input.value.trim()) {
        validateField(input)
      }
    })

    // Real-time formatting for phone number
    if (input.type === "tel") {
      input.addEventListener("input", formatPhoneNumber)
    }

    // Real-time formatting for Player ID
    if (input.name === "playerId") {
      input.addEventListener("input", formatPlayerId)
    }
  })
}

// Validate field
function validateField(input) {
  const value = input.value.trim()
  let isValid = true
  let message = ""

  switch (input.name) {
    case "playerName":
      const nameRegex = /^[a-zA-Z\s]{2,}$/
      isValid = nameRegex.test(value)
      message = "Name should contain only letters and be at least 2 characters"
      break

    case "playerPhone":
      const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/
      isValid = phoneRegex.test(value)
      message = "Please enter a valid phone number"
      break

    case "playerId":
      const playerId = Number.parseInt(value)
      isValid = !isNaN(playerId) && playerId >= 1 && playerId <= 100
      message = "Player ID must be a number between 1 and 100"
      break
  }

  // Update field appearance
  if (isValid) {
    input.style.borderColor = "#10b981"
    removeFieldError(input)
  } else {
    input.style.borderColor = "#ef4444"
    showFieldError(input, message)
  }

  return isValid
}

// Show field error
function showFieldError(input, message) {
  removeFieldError(input)

  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

  input.parentElement.parentElement.appendChild(errorDiv)
}

// Remove field error
function removeFieldError(input) {
  const existingError = input.parentElement.parentElement.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
}

// Format phone number
function formatPhoneNumber(e) {
  let value = e.target.value.replace(/\D/g, "")

  if (value.startsWith("20")) {
    value = "+" + value
  } else if (value.startsWith("01")) {
    value = "+20" + value.substring(1)
  }

  e.target.value = value
}

// Format Player ID
function formatPlayerId(e) {
  // Only allow numbers
  e.target.value = e.target.value.replace(/[^0-9]/g, "")

  // Limit to 3 digits max (since max is 100)
  if (e.target.value.length > 3) {
    e.target.value = e.target.value.slice(0, 3)
  }

  // Check if value is within range
  const value = Number.parseInt(e.target.value)
  if (value > 100) {
    e.target.value = "100"
  }
}

// Add smooth animations
function addAnimations() {
  // Animate particles
  const particles = document.querySelectorAll(".particle")
  particles.forEach((particle, index) => {
    particle.style.animationDelay = `${index * 2}s`
  })

  // Add entrance animations to form elements
  const formElements = document.querySelectorAll(".form-group")
  formElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "all 0.5s ease"

    setTimeout(
      () => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      200 + index * 100,
    )
  })
}

// Make functions globally available
window.showRegistrationInfo = showRegistrationInfo
window.closeRegistrationModal = closeRegistrationModal
window.logout = logout
window.goToDashboard = goToDashboard

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
  setupFormEnhancements()
  addAnimations()
})

// Handle page visibility for better UX
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Check if user is still logged in when page becomes visible
    checkExistingLogin()
  }
})



