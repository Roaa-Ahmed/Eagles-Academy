// Extended players data with complete profile information
const allPlayersData = {
  1: {
    id: 1,
    name: "Yassin Ahmed",
    age: 13,
    position: "CDM",
    sport: "Football",
    rating: 0,
    image: "../images/yassin.jpg",
    gallery: [
      { src: "images/yassin-1.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/yassin-2.jpg", category: "matches", alt: "Match Action 1" },
      { src: "images/yassin-3.jpg", category: "training", alt: "Training Session 2" },
    ],
  },
  2: {
    id: 2,
    name: "Mohamed Abdelmoaty",
    age: 16,
    position: "Midfielder",
    sport: "Football",
    rating: 0,
    image: "../images/abdelmoty.jpg",
    gallery: [
      { src: "images/mohamed-1.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/mohamed-2.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  3: {
    id: 3,
    name: "Abdelrahman Elbeshnawy",
    age: 13,
    position: "Defender",
    sport: "Football",
    rating: 0,
    image: "../images/abdelrahman elbeshnawy.jpg",
    gallery: [
      { src: "images/omar-1.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/omar-2.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  4: {
    id: 4,
    name: "Abdelrahman Essam",
    age: 25,
    position: "Defender",
    sport: "Football",
    rating: 0,
    image: "../images/abdelrahman essam.jpg",
    gallery: [
      { src: "images/training-1.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-1.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  5: {
    id: 5,
    name: "Adam Ahmed",
    age: 23,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/adam ahmed.jpg",
    gallery: [
      { src: "images/training-2.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-2.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  6: {
    id: 6,
    name: "Adam",
    age: 22,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/adam.jpg",
    gallery: [
      { src: "images/training-3.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-3.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  7: {
    id: 7,
    name: "Ahmed",
    age: 24,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/ahmed.jpg",
    gallery: [
      { src: "images/training-4.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-4.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  8: {
    id: 8,
    name: "Ali Samara",
    age: 23,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/ali samara.jpg",
    gallery: [
      { src: "images/training-5.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-5.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  9: {
    id: 9,
    name: "Hamza",
    age: 5,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/Hamza.jpg",
    gallery: [
      { src: "images/training-6.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-6.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  10: {
    id: 10,
    name: "Haron",
    age: 25,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/haron.jpg",
    gallery: [
      { src: "images/training-7.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-7.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  11: {
    id: 11,
    name: "Mahmoud Khela",
    age: 26,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/mahmoud khela.jpg",
    gallery: [
      { src: "images/training-8.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-8.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  12: {
    id: 12,
    name: "Mohamed Khela",
    age: 24,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/mohamed khela.jpg",
    gallery: [
      { src: "images/training-9.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-9.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  13: {
    id: 13,
    name: "Osama",
    age: 23,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/osama.jpg",
    gallery: [
      { src: "images/training-10.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-10.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  14: {
    id: 14,
    name: "Mohamed Wael",
    age: 22,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/shokry.jpg",
    gallery: [
      { src: "images/training-11.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-11.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  15: {
    id: 15,
    name: "Yehia",
    age: 25,
    position: "Forward",
    sport: "Football",
    rating: 0,
    image: "../images/yehia.jpg",
    gallery: [
      { src: "images/training-12.jpg", category: "training", alt: "Training Session 1" },
      { src: "images/match-12.jpg", category: "matches", alt: "Match Action 1" },
    ],
  },
  // الحراس
  16: {
    id: 16,
    name: "Youssef Salem",
    age: 24,
    position: "Goalkeeper",
    sport: "Football",
    rating: 0,
    image: "../images/youssef salem.jpg",
    gallery: [
      { src: "images/goalkeeper-1.jpg", category: "training", alt: "Goalkeeper Training 1" },
      { src: "images/goalkeeper-2.jpg", category: "matches", alt: "Match Save 1" },
    ],
  },
  17: {
    id: 17,
    name: "Ahmed Hany",
    age: 23,
    position: "Goalkeeper",
    sport: "Football",
    rating: 0,
    image: "../images/ahmed hany.jpg",
    gallery: [
      { src: "images/goalkeeper-3.jpg", category: "training", alt: "Goalkeeper Training 2" },
      { src: "images/goalkeeper-4.jpg", category: "matches", alt: "Match Save 2" },
    ],
  },
  18: {
    id: 18,
    name: "Seif Saad",
    age: 22,
    position: "Goalkeeper",
    sport: "Football",
    rating: 0,
    image: "../images/saif saad.jpg",
    gallery: [
      { src: "images/goalkeeper-5.jpg", category: "training", alt: "Goalkeeper Training 3" },
      { src: "images/goalkeeper-6.jpg", category: "matches", alt: "Match Save 3" },
    ],
  },
}

// متغيرات عامة
let currentPlayer = null
let currentGallery = []
let currentImageIndex = 0

// Clear all notifications when page loads
function clearAllNotifications() {
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => {
    notification.remove()
  })
}

// Get player ID from URL parameters
function getPlayerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const playerId = Number.parseInt(urlParams.get("id"))
  return playerId || null
}

// Load player data
function loadPlayerData() {
  const playerId = getPlayerIdFromURL()

  // Clear any existing notifications first
  clearAllNotifications()

  // Show loading screen
  showLoadingScreen()

  // Simulate loading data
  setTimeout(() => {
    if (!playerId || !allPlayersData[playerId]) {
      showErrorScreen()
      return
    }

    currentPlayer = allPlayersData[playerId]
    updatePlayerProfile()
    showProfileContainer()
  }, 1500) // 1.5 seconds loading
}

// Update player profile
function updatePlayerProfile() {
  // Update main image with animation
  const profileImage = document.getElementById("profileImage")
  const loadingOverlay = document.getElementById("pictureLoadingOverlay")

  // Add loading class initially
  profileImage.classList.add("loading")

  // Set image source
  profileImage.src = currentPlayer.image

  // Handle image load
  profileImage.onload = () => {
    // Hide loading overlay
    if (loadingOverlay) {
      loadingOverlay.classList.add("hidden")
    }

    // Remove loading class and add loaded class to trigger animation
    setTimeout(() => {
      profileImage.classList.remove("loading")
      profileImage.classList.add("loaded")
    }, 300)
  }

  profileImage.onerror = function () {
    // Hide loading overlay
    if (loadingOverlay) {
      loadingOverlay.classList.add("hidden")
    }

    this.style.display = "none"
    this.parentElement.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:6rem;color:#a0a0a0;">👤</div>'
  }

  // Update information
  document.getElementById("playerName").textContent = currentPlayer.name
  document.getElementById("playerAge").textContent = `${currentPlayer.age} سنة`
  document.getElementById("playerPosition").textContent = currentPlayer.position

  // Update page title
  document.title = `${currentPlayer.name} - Player Profile - Eagles Academy`

  // Update stars
  updateRatingStars()

  // Update gallery
  updateGallery()
}

// Update rating stars
function updateRatingStars() {
  const ratingContainer = document.getElementById("playerRating")
  ratingContainer.innerHTML = ""

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i")
    star.className = "far fa-star"
    star.setAttribute("data-rating", i)
    star.style.cursor = "pointer"
    star.addEventListener("click", () => setRating(i))
    ratingContainer.appendChild(star)
  }

  // Show current rating
  showCurrentRating()
}

// Set rating
function setRating(rating) {
  currentPlayer.rating = rating
  showCurrentRating()
  showNotification(`${currentPlayer.name} rated ${rating} stars!`)
}

// Show current rating
function showCurrentRating() {
  const stars = document.querySelectorAll("#playerRating i")
  stars.forEach((star, index) => {
    if (index < currentPlayer.rating) {
      star.className = "fas fa-star"
      star.style.color = "#ffd700"
    } else {
      star.className = "far fa-star"
      star.style.color = ""
    }
  })
}

// Share Profile Function
function shareProfile() {
  const playerName = currentPlayer.name
  const playerPosition = currentPlayer.position
  const currentUrl = window.location.href

  // Check if Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: `${playerName} - Eagles Academy`,
        text: `Check out ${playerName}, ${playerPosition} at Eagles Academy!`,
        url: currentUrl,
      })
      .then(() => {
        showNotification("Profile shared successfully!")
      })
      .catch((error) => {
        console.log("Error sharing:", error)
        fallbackShare()
      })
  } else {
    // Fallback for browsers that don't support Web Share API
    fallbackShare()
  }
}

// Fallback share function
function fallbackShare() {
  const playerName = currentPlayer.name
  const playerPosition = currentPlayer.position
  const currentUrl = window.location.href
  const shareText = `Check out ${playerName}, ${playerPosition} at Eagles Academy! ${currentUrl}`

  // Create share modal
  const shareModal = document.createElement("div")
  shareModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
  `

  shareModal.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 20px; max-width: 400px; width: 90%;">
      <h3 style="margin-bottom: 20px; text-align: center; color: #1e7e34;">Share ${playerName}'s Profile</h3>
      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        <button onclick="shareToWhatsApp('${encodeURIComponent(shareText)}')" style="background: #25D366; color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </button>
        <button onclick="shareToFacebook('${encodeURIComponent(currentUrl)}')" style="background: #1877F2; color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fab fa-facebook"></i> Facebook
        </button>
        <button onclick="shareToTwitter('${encodeURIComponent(shareText)}')" style="background: #1DA1F2; color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fab fa-twitter"></i> Twitter
        </button>
        <button onclick="copyToClipboard('${currentUrl}')" style="background: #6c757d; color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-copy"></i> Copy Link
        </button>
      </div>
      <button onclick="closeShareModal()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin-top: 20px; width: 100%;">
        Close
      </button>
    </div>
  `

  shareModal.onclick = (e) => {
    if (e.target === shareModal) {
      closeShareModal()
    }
  }

  document.body.appendChild(shareModal)
  window.currentShareModal = shareModal
}

// Share functions
function shareToWhatsApp(text) {
  window.open(`https://wa.me/?text=${text}`, "_blank")
  closeShareModal()
  showNotification("WhatsApp opened for sharing!")
}

function shareToFacebook(url) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  closeShareModal()
  showNotification("Facebook opened for sharing!")
}

function shareToTwitter(text) {
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  closeShareModal()
  showNotification("Twitter opened for sharing!")
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      closeShareModal()
      showNotification("Link copied successfully!")
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      closeShareModal()
      showNotification("Link copied successfully!")
    })
}

function closeShareModal() {
  if (window.currentShareModal) {
    window.currentShareModal.remove()
    window.currentShareModal = null
  }
}

// Update gallery
function updateGallery(filter = "all") {
  const galleryGrid = document.getElementById("galleryGrid")

  // Filter images
  let filteredGallery = currentPlayer.gallery
  if (filter !== "all") {
    filteredGallery = currentPlayer.gallery.filter((item) => item.category === filter)
  }

  currentGallery = filteredGallery

  // Clear and refill gallery
  galleryGrid.innerHTML = ""

  filteredGallery.forEach((item, index) => {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"
    galleryItem.onclick = () => openImageModal(index)

    galleryItem.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" 
           onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;color:#a0a0a0;\\'>📷</div>'">
    `

    galleryGrid.appendChild(galleryItem)
  })
}

// Show loading screen
function showLoadingScreen() {
  document.getElementById("loadingScreen").style.display = "flex"
  document.getElementById("errorScreen").style.display = "none"
  document.getElementById("profileContainer").style.display = "none"
}

// Show error screen
function showErrorScreen() {
  document.getElementById("loadingScreen").style.display = "none"
  document.getElementById("errorScreen").style.display = "flex"
  document.getElementById("profileContainer").style.display = "none"
}

// Show profile container
function showProfileContainer() {
  document.getElementById("loadingScreen").style.display = "none"
  document.getElementById("errorScreen").style.display = "none"
  document.getElementById("profileContainer").style.display = "block"
}

// Open image modal
function openImageModal(index) {
  currentImageIndex = index
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")

  modalImage.src = currentGallery[index].src
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close modal
function closeModal() {
  const modal = document.getElementById("imageModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Previous image
function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--
  } else {
    currentImageIndex = currentGallery.length - 1
  }

  const modalImage = document.getElementById("modalImage")
  modalImage.src = currentGallery[currentImageIndex].src
}

// Next image
function nextImage() {
  if (currentImageIndex < currentGallery.length - 1) {
    currentImageIndex++
  } else {
    currentImageIndex = 0
  }

  const modalImage = document.getElementById("modalImage")
  modalImage.src = currentGallery[currentImageIndex].src
}

// Go back
function goBack() {
  window.history.back()
}

// Show notification - محسنة عشان تمنع التكرار
function showNotification(message) {
  // Clear any existing notifications first
  clearAllNotifications()

  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #1e7e34 0%, #28a745 50%, #20c997 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    animation: slideInRight 0.3s ease;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    letter-spacing: 0.5px;
  `

  document.body.appendChild(notification)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }
  }, 3000)

  // Add click to dismiss
  notification.addEventListener("click", () => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }
  })
}

// Initialize the profile page
function init() {
  // Clear notifications on page load
  clearAllNotifications()

  loadPlayerData()

  // Set up gallery tabs
  const galleryTabs = document.querySelectorAll(".gallery-tab")
  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
      updateGallery(tab.dataset.tab)
    })
  })
}

// Clear notifications when page is about to unload
window.addEventListener("beforeunload", clearAllNotifications)

// Clear notifications when page becomes visible again
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    clearAllNotifications()
  }
})

// Start the application
document.addEventListener("DOMContentLoaded", init)
