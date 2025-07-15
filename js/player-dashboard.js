// Player data structure - نضيف بيانات أكتر للاعبين
const playersDatabase = {
  1: {
    id: 1,
    name: "Yassin Ahmed",
    position: "Forward",
    paymentStatus: "paid", // paid, pending, overdue
    paymentDate: "2025-08-15",
    attendance: {
      "2025-08": {
        // Training days: Sunday=0, Tuesday=2, Thursday=4
        // أغسطس 2025 - أيام التدريب فقط
        "2025-08-03": "attended", // Sunday
        "2025-08-05": "missed", // Tuesday
        "2025-08-07": "attended", // Thursday
        "2025-08-10": "attended", // Sunday
        "2025-08-12": "missed", // Tuesday
        "2025-08-14": "attended", // Thursday
        "2025-08-17": "attended", // Sunday
        "2025-08-19": "attended", // Tuesday
        "2025-08-21": "missed", // Thursday
        "2025-08-24": "attended", // Sunday
        "2025-08-26": "attended", // Tuesday
        "2025-08-28": "pending", // Thursday
        "2025-08-31": "pending", // Sunday
      },
    },
    activities: [
      { date: "2025-08-28", type: "checkin", time: "16:30", description: "Checked in for training" },
      { date: "2025-08-26", type: "attendance", description: "Attended Sunday training session" },
      { date: "2025-08-23", type: "attendance", description: "Attended Thursday training session" },
      { date: "2025-08-21", type: "attendance", description: "Attended Tuesday training session" },
      { date: "2025-08-15", type: "payment", description: "Monthly payment received" },
    ],
  },
  2: {
    id: 2,
    name: "Mohamed Ali",
    position: "Midfielder",
    paymentStatus: "pending",
    paymentDate: null,
    attendance: {
      "2025-08": {
        "2025-08-03": "missed", // Sunday
        "2025-08-05": "attended", // Tuesday
        "2025-08-07": "attended", // Thursday
        "2025-08-10": "attended", // Sunday
        "2025-08-12": "attended", // Tuesday
        "2025-08-14": "missed", // Thursday
        "2025-08-17": "attended", // Sunday
        "2025-08-19": "missed", // Tuesday
        "2025-08-21": "attended", // Thursday
        "2025-08-24": "attended", // Sunday
        "2025-08-26": "attended", // Tuesday
        "2025-08-28": "pending", // Thursday
        "2025-08-31": "pending", // Sunday
      },
    },
    activities: [
      { date: "2025-08-28", type: "attendance", description: "Attended Tuesday training session" },
      { date: "2025-08-26", type: "absence", description: "Missed Sunday training session" },
      { date: "2025-08-23", type: "attendance", description: "Attended Thursday training session" },
    ],
  },
  // نضيف لاعبين أكتر للتجربة
  3: {
    id: 3,
    name: "Ahmed Hassan",
    position: "Defender",
    paymentStatus: "overdue",
    paymentDate: null,
    attendance: {
      "2025-08": {
        "2025-08-03": "attended", // Sunday
        "2025-08-05": "missed", // Tuesday
        "2025-08-07": "missed", // Thursday
        "2025-08-10": "missed", // Sunday
        "2025-08-12": "attended", // Tuesday
        "2025-08-14": "attended", // Thursday
        "2025-08-17": "missed", // Sunday
        "2025-08-19": "attended", // Tuesday
        "2025-08-21": "attended", // Thursday
        "2025-08-24": "attended", // Sunday
        "2025-08-26": "missed", // Tuesday
        "2025-08-28": "pending", // Thursday
        "2025-08-31": "pending", // Sunday
      },
    },
  },
}

// Training schedule - أيام التدريب في الأسبوع
const trainingDays = [0, 2, 4] // Sunday=0, Tuesday=2, Thursday=4

// Current state
let currentPlayer = null
const currentDate = new Date()
// نبدأ من أغسطس 2025
const currentMonth = new Date(2025, 7) // August = 7 (0-indexed)

// Get player ID from URL
function getPlayerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const playerId = Number.parseInt(urlParams.get("id"))
  console.log("Player ID from URL:", playerId)
  return playerId || null
}

// Initialize dashboard
function initDashboard() {
  console.log("🚀 Initializing dashboard...")
  showLoadingScreen()

  setTimeout(() => {
    const playerId = getPlayerIdFromURL()
    console.log("Looking for player with ID:", playerId)

    if (!playerId) {
      console.error("No player ID found in URL")
      showError("No player ID provided. Redirecting to login...")
      setTimeout(() => {
        window.location.href = "pages/login.html"
      }, 2000)
      return
    }

    if (!playersDatabase[playerId]) {
      console.error("Player not found in database:", playerId)
      console.log("Available players:", Object.keys(playersDatabase))
      showError("Player not found. Redirecting to login...")
      setTimeout(() => {
        window.location.href = "pages/login.html"
      }, 2000)
      return
    }

    currentPlayer = playersDatabase[playerId]
    console.log("Player found:", currentPlayer)

    loadPlayerDashboard()
    hideLoadingScreen()
  }, 1500)
}

// Load player dashboard
function loadPlayerDashboard() {
  console.log("Loading dashboard for:", currentPlayer.name)
  updatePlayerHeader()
  updatePaymentStatus()
  updateAttendanceOverview()
  generateCalendar()
  startRealTimeClock()
}

// Update player header
function updatePlayerHeader() {
  document.getElementById("playerName").textContent = currentPlayer.name
  document.getElementById("playerPosition").textContent = currentPlayer.position
  document.getElementById("playerId").textContent = `#${currentPlayer.id}`

  // Update page title
  document.title = `${currentPlayer.name} - Dashboard - Eagles Academy`
}

// Update payment status
function updatePaymentStatus() {
  const statusElement = document.getElementById("paymentStatus")
  const currentMonthElement = document.getElementById("currentMonth")
  const dueDateElement = document.getElementById("dueDate")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // عرض شهر أغسطس 2025
  currentMonthElement.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`

  // Calculate due date (last day of month)
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  dueDateElement.textContent = `${lastDay.getDate()} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`

  // Update status badge
  const statusBadge = statusElement.querySelector(".status-badge")
  statusBadge.className = `status-badge ${currentPlayer.paymentStatus}`

  switch (currentPlayer.paymentStatus) {
    case "paid":
      statusBadge.textContent = "Paid ✓"
      statusBadge.style.background = "#10b981"
      break
    case "pending":
      statusBadge.textContent = "Pending"
      statusBadge.style.background = "#f59e0b"
      break
    case "overdue":
      statusBadge.textContent = "Overdue"
      statusBadge.style.background = "#ef4444"
      break
  }
}

// Update attendance overview
function updateAttendanceOverview() {
  const currentMonthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`
  const attendance = currentPlayer.attendance[currentMonthKey] || {}

  let totalSessions = 0
  let attendedSessions = 0
  let missedSessions = 0

  // Count training days in current month
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    if (trainingDays.includes(date.getDay())) {
      totalSessions++
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      if (attendance[dateKey] === "attended") {
        attendedSessions++
      } else if (attendance[dateKey] === "missed") {
        missedSessions++
      }
    }
  }

  const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0

  document.getElementById("totalSessions").textContent = totalSessions
  document.getElementById("attendedSessions").textContent = attendedSessions
  document.getElementById("missedSessions").textContent = missedSessions
  document.getElementById("attendanceRate").textContent = `${attendanceRate}%`
}

// Generate calendar - مبسط أكتر
function generateCalendar() {
  const calendar = document.getElementById("attendanceCalendar")
  const monthElement = document.getElementById("calendarMonth")

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  monthElement.textContent = `${monthNames[month]} ${year}`

  // Clear calendar
  calendar.innerHTML = ""

  // Create calendar header
  const header = document.createElement("div")
  header.className = "calendar-header"
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day-name"
    dayElement.textContent = day
    header.appendChild(dayElement)
  })
  calendar.appendChild(header)

  // Create calendar body
  const body = document.createElement("div")
  body.className = "calendar-body"

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const currentMonthKey = `${year}-${String(month + 1).padStart(2, "0")}`
  const attendance = currentPlayer.attendance[currentMonthKey] || {}

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div")
    emptyDay.className = "calendar-day empty"
    body.appendChild(emptyDay)
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day"
    dayElement.textContent = day

    const date = new Date(year, month, day)
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    // Check if it's a training day (Sunday, Tuesday, Thursday only)
    if (trainingDays.includes(date.getDay())) {
      dayElement.classList.add("training-day")

      // Check attendance status
      if (attendance[dateKey] === "attended") {
        dayElement.classList.add("attended")
        dayElement.innerHTML += '<i class="fas fa-check"></i>'
      } else if (attendance[dateKey] === "missed") {
        dayElement.classList.add("missed")
        dayElement.innerHTML += '<i class="fas fa-times"></i>'
      } else if (attendance[dateKey] === "pending") {
        // لسه مجاش وقته
        dayElement.classList.add("training-day")
      }
    }

    // Mark today
    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add("today")
    }

    body.appendChild(dayElement)
  }

  calendar.appendChild(body)
}

// Check-in functionality
function checkIn() {
  const now = new Date()
  const today = now.toDateString()

  // Check if today is a training day
  if (!trainingDays.includes(now.getDay())) {
    showNotification("Today is not a training day!", "warning")
    return
  }

  // Update current time in modal
  document.getElementById("currentTime").textContent = now.toLocaleTimeString()
  document.getElementById("currentDate").textContent = today

  showModal("checkinModal")
}

// Confirm check-in
function confirmCheckIn() {
  const now = new Date()
  const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  // Initialize attendance object if it doesn't exist
  if (!currentPlayer.attendance[currentMonthKey]) {
    currentPlayer.attendance[currentMonthKey] = {}
  }

  // Record check-in
  currentPlayer.attendance[currentMonthKey][dateKey] = "attended"

  // Update dashboard
  updateAttendanceOverview()
  generateCalendar()

  closeModal("checkinModal")
  showNotification("Check-in successful!", "success")
}

// Navigation functions
function previousMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1)
  generateCalendar()
  updateAttendanceOverview()
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1)
  generateCalendar()
  updateAttendanceOverview()
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

// View profile
function viewProfile() {
  window.location.href = `player-profile.html?id=${currentPlayer.id}`
}

// Logout
function logout() {
  localStorage.removeItem("eaglesAcademyUser")

  // تحديد المسار الصحيح للعودة لصفحة تسجيل الدخول
  const currentPath = window.location.pathname
  let loginPath = ""

  if (currentPath.includes("/pages/")) {
    loginPath = "login.html"
  } else {
    loginPath = "pages/login.html"
  }

  window.location.href = loginPath
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

function startRealTimeClock() {
  setInterval(() => {
    const now = new Date()
    const timeElement = document.getElementById("currentTime")
    if (timeElement) {
      timeElement.textContent = now.toLocaleTimeString()
    }
  }, 1000)
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard)



