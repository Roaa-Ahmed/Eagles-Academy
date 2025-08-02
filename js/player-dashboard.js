// Training schedule
const trainingDays = [1, 3, 6] // Monday=1, Wednesday=3, Saturday=6

// Current state
let currentPlayer = null
const currentDate = new Date()
const currentMonth = new Date(2025, 7) // August = 7 (0-indexed)

// Players database - نفس البيانات اللي في admin dashboard
const playersDatabase = {
  1: { id: 1, name: "Yassin Ahmed", position: "Forward", paymentStatus: "pending", attendance: { "2025-01": {} } },
  2: {
    id: 2,
    name: "Mohamed Abdelmoaty",
    position: "Midfielder",
    paymentStatus: "pending",
    attendance: { "2025-01": {} },
  },
  3: {
    id: 3,
    name: "Abdelrahman Elbeshnawy",
    position: "Defender",
    paymentStatus: "pending",
    attendance: { "2025-01": {} },
  },
  4: {
    id: 4,
    name: "Abdelrahman Essam",
    position: "Defender",
    paymentStatus: "pending",
    attendance: { "2025-01": {} },
  },
  5: { id: 5, name: "Adam Ahmed", position: "Midfielder", paymentStatus: "pending", attendance: { "2025-01": {} } },
  6: { id: 6, name: "Adam", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  7: { id: 7, name: "Ahmed", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  8: { id: 8, name: "Fathy Samara", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  9: { id: 9, name: "Hamza", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  10: { id: 10, name: "Haron", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  11: { id: 11, name: "Mahmoud Khela", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  12: { id: 12, name: "Mohamed Khela", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  13: { id: 13, name: "Osama", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  14: { id: 14, name: "Mohamed Wael", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  15: { id: 15, name: "Yehia", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  16: { id: 16, name: "Yassin", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  17: { id: 17, name: "Ahmed Mohamed", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  18: { id: 18, name: "Malek Mohamed", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  19: { id: 19, name: "Ali", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  20: { id: 20, name: "Omar", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  21: { id: 21, name: "Seif", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  22: { id: 22, name: "Youssef", position: "Defender", paymentStatus: "pending", attendance: { "2025-01": {} } },
  23: {
    id: 23,
    name: "Youssef Salem",
    position: "Goalkeeper",
    paymentStatus: "pending",
    attendance: { "2025-01": {} },
  },
  24: { id: 24, name: "Ahmed Hany", position: "Goalkeeper", paymentStatus: "pending", attendance: { "2025-01": {} } },
  25: { id: 25, name: "Seif Saad", position: "Goalkeeper", paymentStatus: "pending", attendance: { "2025-01": {} } },
  26: { id: 26, name: "Seif Elbaz", position: "Goalkeeper", paymentStatus: "pending", attendance: { "2025-01": {} } },
}

// تحميل البيانات المحدثة من admin dashboard
function loadUpdatedPlayerData() {
  const savedData = localStorage.getItem("eaglesPlayersData")
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      console.log("📥 Loading updated data from admin dashboard:", parsedData)

      // تحديث بيانات اللاعبين بالتغييرات من الأدمن
      Object.keys(parsedData).forEach((playerId) => {
        const playerIdNum = Number.parseInt(playerId)
        if (playersDatabase[playerIdNum]) {
          // دمج البيانات الجديدة مع الموجودة
          playersDatabase[playerIdNum] = {
            ...playersDatabase[playerIdNum],
            ...parsedData[playerId],
          }
          console.log(`✅ Updated player ${playerIdNum} data:`, playersDatabase[playerIdNum])
        }
      })

      return true
    } catch (error) {
      console.error("❌ Error loading admin data:", error)
      return false
    }
  } else {
    console.log("📝 No admin data found in localStorage")
    return false
  }
}

// Get player ID from URL
function getPlayerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const playerId = Number.parseInt(urlParams.get("id"))
  console.log("Player ID from URL:", playerId)
  return playerId || null
}

// Initialize dashboard
function initDashboard() {
  console.log("🚀 Initializing player dashboard...")
  showLoadingScreen()

  setTimeout(() => {
    // تحميل أي تحديثات من admin dashboard أولاً
    const dataLoaded = loadUpdatedPlayerData()
    if (dataLoaded) {
      console.log("🔄 Admin data loaded successfully")
    }

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

  // تحديث البيانات من admin dashboard قبل التحميل
  loadUpdatedPlayerData()
  if (currentPlayer && currentPlayer.id) {
    currentPlayer = playersDatabase[currentPlayer.id]
    console.log("Updated current player data:", currentPlayer)
  }

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

  currentMonthElement.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`

  // Calculate due date (last day of month)
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  dueDateElement.textContent = `${lastDay.getDate()} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`

  // Update status badge
  const statusBadge = statusElement.querySelector(".status-badge")
  statusBadge.className = `status-badge ${currentPlayer.paymentStatus}`

  console.log("💰 Current payment status:", currentPlayer.paymentStatus)

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

  console.log("📊 Current attendance data:", attendance)

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

  console.log(`📈 Attendance stats: ${attendedSessions}/${totalSessions} (${attendanceRate}%)`)
}

// Generate calendar
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

    // Check if it's a training day
    if (trainingDays.includes(date.getDay())) {
      dayElement.classList.add("training-day")

      // Check attendance status
      if (attendance[dateKey] === "attended") {
        dayElement.classList.add("attended")
        dayElement.innerHTML += '<i class="fas fa-check"></i>'
        console.log(`✅ Day ${day}: attended`)
      } else if (attendance[dateKey] === "missed") {
        dayElement.classList.add("missed")
        dayElement.innerHTML += '<i class="fas fa-times"></i>'
        console.log(`❌ Day ${day}: missed`)
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

// تحديث تلقائي للبيانات كل 10 ثواني للمزامنة مع تغييرات الأدمن
setInterval(() => {
  if (currentPlayer) {
    const oldPaymentStatus = currentPlayer.paymentStatus
    const oldAttendance = JSON.stringify(currentPlayer.attendance)

    // تحميل البيانات الجديدة من الأدمن
    const dataUpdated = loadUpdatedPlayerData()

    if (dataUpdated && playersDatabase[currentPlayer.id]) {
      const newPlayer = playersDatabase[currentPlayer.id]
      const newPaymentStatus = newPlayer.paymentStatus
      const newAttendance = JSON.stringify(newPlayer.attendance)

      // التحقق من تغيير البيانات
      if (oldPaymentStatus !== newPaymentStatus || oldAttendance !== newAttendance) {
        currentPlayer = newPlayer

        // تحديث لوحة التحكم
        updatePaymentStatus()
        updateAttendanceOverview()
        generateCalendar()

        console.log("🔄 Dashboard refreshed with new admin data")
        showNotification("Dashboard updated with latest data", "info")
      }
    }
  }
}, 10000) // فحص كل 10 ثواني

// تحديث فوري عند العودة للصفحة
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && currentPlayer) {
    console.log("👁️ Page became visible, checking for updates...")

    const oldPaymentStatus = currentPlayer.paymentStatus
    const oldAttendance = JSON.stringify(currentPlayer.attendance)

    const dataUpdated = loadUpdatedPlayerData()

    if (dataUpdated && playersDatabase[currentPlayer.id]) {
      const newPlayer = playersDatabase[currentPlayer.id]
      const newPaymentStatus = newPlayer.paymentStatus
      const newAttendance = JSON.stringify(newPlayer.attendance)

      if (oldPaymentStatus !== newPaymentStatus || oldAttendance !== newAttendance) {
        currentPlayer = newPlayer

        updatePaymentStatus()
        updateAttendanceOverview()
        generateCalendar()

        console.log("🔄 Dashboard refreshed on tab focus")
        showNotification("Dashboard updated!", "success")
      }
    }
  }
})

// مراقب تغييرات localStorage للتحديث الفوري
window.addEventListener("storage", (e) => {
  if (e.key === "eaglesPlayersData" && currentPlayer) {
    console.log("🔄 localStorage change detected, updating dashboard...")

    const oldPaymentStatus = currentPlayer.paymentStatus
    const oldAttendance = JSON.stringify(currentPlayer.attendance)

    loadUpdatedPlayerData()

    if (playersDatabase[currentPlayer.id]) {
      const newPlayer = playersDatabase[currentPlayer.id]
      const newPaymentStatus = newPlayer.paymentStatus
      const newAttendance = JSON.stringify(newPlayer.attendance)

      if (oldPaymentStatus !== newPaymentStatus || oldAttendance !== newAttendance) {
        currentPlayer = newPlayer

        updatePaymentStatus()
        updateAttendanceOverview()
        generateCalendar()

        console.log("🔄 Instant update from localStorage")
        showNotification("Dashboard updated instantly!", "success")
      }
    }
  }
})

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard)
