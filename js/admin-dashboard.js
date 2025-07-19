// Enhanced players database - الأدمن مش موجود هنا
const playersDatabase = {
  1: {
    id: 1,
    name: "Yassin Ahmed",
    position: "Forward",
    paymentStatus: "pending", // سيتم تحديثها من الأدمن
    paymentDate: null,
    attendance: {
      "2025-01": {}, // فارغ - سيتم ملؤه من الأدمن
    },
  },
  2: {
    id: 2,
    name: "Mohamed Ali",
    position: "Midfielder",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-01": {},
    },
  },
  3: {
    id: 3,
    name: "Ahmed Hassan",
    position: "Defender",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-01": {},
    },
  },
  4: {
    id: 4,
    name: "Omar Khaled",
    position: "Goalkeeper",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-01": {},
    },
  },
  5: {
    id: 5,
    name: "Karim Mostafa",
    position: "Midfielder",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-01": {},
    },
  },
  6: {
    id: 6,
    name: "Mahmoud Saeed",
    position: "Defender",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-01": {},
    },
  },
}

// Training schedule
const trainingDays = [0, 2, 4] // Sunday=0, Tuesday=2, Thursday=4

// Admin credentials
const ADMIN_ID = "99" // ID عادي من 1-100

// Current state
const currentDate = new Date()
let selectedDate = formatDate(currentDate)

// Initialize admin dashboard
function initAdminDashboard() {
  console.log("🚀 Initializing admin dashboard...")
  showLoadingScreen()

  setTimeout(() => {
    // Check if user is admin
    const adminId = getAdminIdFromURL()
    if (!adminId || adminId !== ADMIN_ID) {
      showError("Unauthorized access. Redirecting to login...")
      setTimeout(() => {
        window.location.href = "../html/login.html"
      }, 2000)
      return
    }

    loadAdminDashboard()
    hideLoadingScreen()
  }, 1500)
}

// Get admin ID from URL
function getAdminIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  return id === ADMIN_ID ? id : null
}

// Load admin dashboard
function loadAdminDashboard() {
  console.log("Loading admin dashboard...")

  // Set today's date as default
  document.getElementById("attendanceDate").value = selectedDate

  // Load players and update stats
  loadPlayersGrid()
  updateQuickStats()
}

// Load players grid
function loadPlayersGrid() {
  const playersGrid = document.getElementById("playersGrid")
  playersGrid.innerHTML = ""

  Object.values(playersDatabase).forEach((player) => {
    const playerCard = createPlayerCard(player)
    playersGrid.appendChild(playerCard)
  })
}

// Create player card
function createPlayerCard(player) {
  const card = document.createElement("div")
  card.className = "player-card"
  card.id = `player-${player.id}`

  // Get current attendance status
  const currentMonthKey = selectedDate.substring(0, 7) // YYYY-MM
  const attendance = player.attendance[currentMonthKey] || {}
  const todayStatus = attendance[selectedDate] || "pending"

  // Update card appearance based on status
  if (todayStatus === "attended") {
    card.classList.add("present")
  } else if (todayStatus === "missed") {
    card.classList.add("absent")
  }

  // Calculate player stats
  const stats = calculatePlayerStats(player)

  card.innerHTML = `
    <div class="player-header">
      <div class="player-info">
        <h3>${player.name}</h3>
        <p>${player.position}</p>
      </div>
      <div class="player-id">#${player.id}</div>
    </div>
    
    <div class="attendance-controls">
      <button class="attendance-btn present-btn ${todayStatus === "attended" ? "active" : ""}" 
              onclick="markAttendance(${player.id}, 'attended')">
        <i class="fas fa-check"></i>
        Present
      </button>
      <button class="attendance-btn absent-btn ${todayStatus === "missed" ? "active" : ""}" 
              onclick="markAttendance(${player.id}, 'missed')">
        <i class="fas fa-times"></i>
        Absent
      </button>
    </div>
    
    <div class="payment-controls">
      <button class="payment-btn ${player.paymentStatus === "paid" ? "paid" : ""}" 
              onclick="togglePayment(${player.id})">
        <i class="fas fa-money-bill-wave"></i>
        ${player.paymentStatus === "paid" ? "Paid ✓" : "Mark as Paid"}
      </button>
    </div>
    
    <div class="player-stats">
      <span>Attendance: ${stats.attendanceRate}%</span>
      <span>Payment: ${getPaymentStatusText(player.paymentStatus)}</span>
    </div>
    
    <button class="view-details-btn" onclick="viewPlayerDetails(${player.id})">
      <i class="fas fa-eye"></i>
      View Details
    </button>
  `

  return card
}

// Mark attendance for a player
function markAttendance(playerId, status) {
  const player = playersDatabase[playerId]
  if (!player) return

  const currentMonthKey = selectedDate.substring(0, 7)

  // Initialize attendance object if it doesn't exist
  if (!player.attendance[currentMonthKey]) {
    player.attendance[currentMonthKey] = {}
  }

  // Update attendance
  player.attendance[currentMonthKey][selectedDate] = status

  // Update UI
  const playerCard = document.getElementById(`player-${playerId}`)
  playerCard.classList.remove("present", "absent")

  if (status === "attended") {
    playerCard.classList.add("present")
  } else if (status === "missed") {
    playerCard.classList.add("absent")
  }

  // Update buttons
  const presentBtn = playerCard.querySelector(".present-btn")
  const absentBtn = playerCard.querySelector(".absent-btn")

  presentBtn.classList.toggle("active", status === "attended")
  absentBtn.classList.toggle("active", status === "missed")

  // Update quick stats
  updateQuickStats()

  // Show notification
  const statusText = status === "attended" ? "Present" : "Absent"
  showNotification(`${player.name} marked as ${statusText}`, "success")

  // Save to localStorage for persistence
  savePlayersData()
}

// Toggle payment status
function togglePayment(playerId) {
  const player = playersDatabase[playerId]
  if (!player) return

  // Toggle payment status
  if (player.paymentStatus === "paid") {
    player.paymentStatus = "pending"
    player.paymentDate = null
  } else {
    player.paymentStatus = "paid"
    player.paymentDate = formatDate(new Date())
  }

  // Update UI
  const playerCard = document.getElementById(`player-${playerId}`)
  const paymentBtn = playerCard.querySelector(".payment-btn")

  if (player.paymentStatus === "paid") {
    paymentBtn.classList.add("paid")
    paymentBtn.innerHTML = `
      <i class="fas fa-check-circle"></i>
      Paid ✓
    `
  } else {
    paymentBtn.classList.remove("paid")
    paymentBtn.innerHTML = `
      <i class="fas fa-money-bill-wave"></i>
      Mark as Paid
    `
  }

  // Update stats display
  const statsDiv = playerCard.querySelector(".player-stats")
  const stats = calculatePlayerStats(player)
  statsDiv.innerHTML = `
    <span>Attendance: ${stats.attendanceRate}%</span>
    <span>Payment: ${getPaymentStatusText(player.paymentStatus)}</span>
  `

  // Show notification
  const statusText = player.paymentStatus === "paid" ? "Paid" : "Pending"
  showNotification(`${player.name} payment marked as ${statusText}`, "success")

  // Save to localStorage for persistence
  savePlayersData()
}

// Mark all players present
function markAllPresent() {
  Object.keys(playersDatabase).forEach((playerId) => {
    markAttendance(Number.parseInt(playerId), "attended")
  })
  showNotification("All players marked as present", "success")
}

// Mark all players absent
function markAllAbsent() {
  Object.keys(playersDatabase).forEach((playerId) => {
    markAttendance(Number.parseInt(playerId), "missed")
  })
  showNotification("All players marked as absent", "warning")
}

// Set today's date
function setToday() {
  const today = new Date()
  selectedDate = formatDate(today)
  document.getElementById("attendanceDate").value = selectedDate
  loadPlayersGrid()
  updateQuickStats()
  showNotification("Date set to today", "info")
}

// Handle date change
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("attendanceDate")
  if (dateInput) {
    dateInput.addEventListener("change", (e) => {
      selectedDate = e.target.value
      loadPlayersGrid()
      updateQuickStats()
      showNotification(`Date changed to ${selectedDate}`, "info")
    })
  }
})

// Update quick stats
function updateQuickStats() {
  const totalPlayers = Object.keys(playersDatabase).length
  let todayPresent = 0
  let todayAbsent = 0

  const currentMonthKey = selectedDate.substring(0, 7)

  Object.values(playersDatabase).forEach((player) => {
    const attendance = player.attendance[currentMonthKey] || {}
    const todayStatus = attendance[selectedDate]

    if (todayStatus === "attended") {
      todayPresent++
    } else if (todayStatus === "missed") {
      todayAbsent++
    }
  })

  document.getElementById("totalPlayers").textContent = totalPlayers
  document.getElementById("todayPresent").textContent = todayPresent
  document.getElementById("todayAbsent").textContent = todayAbsent
}

// Calculate player statistics
function calculatePlayerStats(player) {
  const currentMonthKey = selectedDate.substring(0, 7)
  const attendance = player.attendance[currentMonthKey] || {}

  let totalSessions = 0
  let attendedSessions = 0

  Object.entries(attendance).forEach(([date, status]) => {
    if (status === "attended" || status === "missed") {
      totalSessions++
      if (status === "attended") {
        attendedSessions++
      }
    }
  })

  const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0

  return {
    totalSessions,
    attendedSessions,
    attendanceRate,
  }
}

// View player details
function viewPlayerDetails(playerId) {
  const player = playersDatabase[playerId]
  if (!player) return

  const stats = calculatePlayerStats(player)

  document.getElementById("modalPlayerName").textContent = player.name

  const detailsContent = document.getElementById("playerDetailsContent")
  detailsContent.innerHTML = `
    <div style="display: grid; gap: 20px;">
      <div class="player-detail-section">
        <h4><i class="fas fa-user"></i> Player Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <strong>Name:</strong> ${player.name}
          </div>
          <div class="detail-item">
            <strong>Position:</strong> ${player.position}
          </div>
          <div class="detail-item">
            <strong>Player ID:</strong> #${player.id}
          </div>
          <div class="detail-item">
            <strong>Payment Status:</strong> 
            <span class="status-badge ${player.paymentStatus}">${getPaymentStatusText(player.paymentStatus)}</span>
          </div>
          ${
            player.paymentDate
              ? `
          <div class="detail-item">
            <strong>Payment Date:</strong> ${player.paymentDate}
          </div>
          `
              : ""
          }
        </div>
      </div>
      
      <div class="player-detail-section">
        <h4><i class="fas fa-chart-bar"></i> Attendance Statistics</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">${stats.totalSessions}</div>
            <div class="stat-label">Total Sessions</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stats.attendedSessions}</div>
            <div class="stat-label">Attended</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stats.totalSessions - stats.attendedSessions}</div>
            <div class="stat-label">Missed</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stats.attendanceRate}%</div>
            <div class="stat-label">Attendance Rate</div>
          </div>
        </div>
      </div>
      
      <div class="player-detail-section">
        <h4><i class="fas fa-link"></i> Quick Actions</h4>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="player-dashboard.html?id=${player.id}" class="btn btn-primary" target="_blank">
            <i class="fas fa-external-link-alt"></i>
            View Player Dashboard
          </a>
          <button class="btn ${player.paymentStatus === "paid" ? "btn-warning" : "btn-success"}" 
                  onclick="togglePayment(${player.id}); closeModal('playerModal');">
            <i class="fas fa-money-bill-wave"></i>
            ${player.paymentStatus === "paid" ? "Mark Unpaid" : "Mark Paid"}
          </button>
        </div>
      </div>
    </div>
  `

  showModal("playerModal")
}

// Get payment status text
function getPaymentStatusText(status) {
  const statusMap = {
    paid: "Paid ✓",
    pending: "Pending",
    overdue: "Overdue",
  }
  return statusMap[status] || status
}

// Save players data to localStorage
function savePlayersData() {
  localStorage.setItem("eaglesPlayersData", JSON.stringify(playersDatabase))
}

// Load players data from localStorage
function loadPlayersData() {
  const savedData = localStorage.getItem("eaglesPlayersData")
  if (savedData) {
    const parsedData = JSON.parse(savedData)
    // Merge with existing data
    Object.keys(parsedData).forEach((playerId) => {
      if (playersDatabase[playerId]) {
        playersDatabase[playerId] = { ...playersDatabase[playerId], ...parsedData[playerId] }
      }
    })
  }
}

// Format date to YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0]
}

// Modal functions
function showModal(modalId) {
  document.getElementById(modalId).classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active")
  document.body.style.overflow = "auto"
}

// Logout
function logout() {
  localStorage.removeItem("eaglesAcademyUser")
  window.location.href = "pages/login.html"
}

// Utility functions
function showLoadingScreen() {
  document.getElementById("loadingScreen").style.display = "flex"
  document.getElementById("dashboardContainer").style.display = "none"
}

function hideLoadingScreen() {
  document.getElementById("loadingScreen").style.display = "none"
  document.getElementById("dashboardContainer").style.display = "block"
}

function showError(message) {
  showNotification(message, "error")
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icon = getNotificationIcon(type)

  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `

  document.getElementById("notificationContainer").appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-triangle",
    warning: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
  }
  return icons[type] || icons.info
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadPlayersData() // Load saved data first
  initAdminDashboard()
})

// Make functions globally available
window.markAttendance = markAttendance
window.togglePayment = togglePayment
window.markAllPresent = markAllPresent
window.markAllAbsent = markAllAbsent
window.setToday = setToday
window.viewPlayerDetails = viewPlayerDetails
window.showModal = showModal
window.closeModal = closeModal
window.logout = logout
