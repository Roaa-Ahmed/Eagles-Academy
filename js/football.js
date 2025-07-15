// بيانات اللاعبين المحدثة مع معرفات فريدة وتصحيح الأنواع
const playersData = [
  {
    id: 1,
    name: "Yassin Ahmed",
    position: "Forward",
    type: "players", // field players
    image: "../images/yassin.jpg",
    rating: 0,
  },
  {
    id: 2,
    name: "Mohamed Abdelmoaty",
    position: "Midfielder",
    type: "players", // field players
    image: "../images/abdelmoty.jpg",
    rating: 0,
  },
  {
    id: 3,
    name: "Abdelrahman Elbeshnawy",
    position: "Defender",
    type: "players", // field players
    image: "../images/abdelrahman elbeshnawy.jpg",
    rating: 0,
  },
  {
    id: 4,
    name: "Abdelrahman Essam",
    position: "Defender",
    type: "players", // field players
    image: "../images/abdelrahman essam.jpg",
    rating: 0,
  },
  {
    id: 5,
    name: "Adam Ahmed",
    position: "Forward",
    type: "players", // field players
    image: "../images/adam ahmed.jpg",
    rating: 0,
  },
  {
    id: 6,
    name: "Adam",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/adam.jpg",
    rating: 0,
  },
  {
    id: 7,
    name: "Ahmed",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/ahmed.jpg",
    rating: 0,
  },
  {
    id: 8,
    name: "Ali Samara",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/ali samara.jpg",
    rating: 0,
  },
  {
    id: 9,
    name: "Hamza",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/Hamza.jpg",
    rating: 0,
  },
  {
    id: 10,
    name: "Haron",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/haron.jpg",
    rating: 0,
  },
  {
    id: 11,
    name: "Mahmoud Khela",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/mahmoud khela.jpg",
    rating: 0,
  },
  {
    id: 12,
    name: "Mohamed Khela",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/mohamed khela.jpg",
    rating: 0,
  },
  {
    id: 13,
    name: "Osama",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/osama.jpg",
    rating: 0,
  },
  {
    id: 14,
    name: "Mohamed Wael",
    position: "Forward",
    type: "players", // field players - كان Players بحرف كبير
    image: "../images/shokry.jpg",
    rating: 0,
  },
  {
    id: 15,
    name: "Yehia",
    position: "Forward",
    type: "players", // field players - كان Players ��حرف كبير
    image: "../images/yehia.jpg",
    rating: 0,
  },
  // الحراس - صححت النوع
  {
    id: 16,
    name: "Youssef Salem",
    position: "Goalkeeper",
    type: "goalkeepers", // كان Goalkeeper
    image: "../images/youssef salem.jpg",
    rating: 0,
  },
  {
    id: 17,
    name: "Ahmed Hany",
    position: "Goalkeeper",
    type: "goalkeepers", // كان Goalkeeper
    image: "../images/ahmed hany.jpg",
    rating: 0,
  },
  {
    id: 18,
    name: "Seif Saad",
    position: "Goalkeeper",
    type: "goalkeepers", // كان Goalkeeper
    image: "../images/saif saad.jpg",
    rating: 0,
  },
]

// Generate stars for rating
function generateStars(playerId, currentRating = 0) {
  return Array(5)
    .fill()
    .map(
      (_, index) =>
        `<span class="star ${index < currentRating ? "filled" : ""}" 
               data-player-id="${playerId}" 
               data-rating="${index + 1}">☆</span>`,
    )
    .join("")
}

// Create player card HTML
function createPlayerCard(player) {
  return `
        <div class="player-card" data-type="${player.type}" onclick="goToProfile(${player.id})">
            <div class="player-image-container">
                <div class="player-image">
                    <img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;color:#6c757d;\\'>👤</div>'">
                </div>
            </div>
            <h3 class="player-name">${player.name}</h3>
            <p class="player-position">${player.position}</p>
            <div class="rating">
                ${generateStars(player.id, player.rating)}
            </div>
        </div>
    `
}

// Card reveal animation
function triggerCardAnimations() {
  const cards = document.querySelectorAll(".player-card")

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.animation = "none"
  })

  cards[0]?.offsetHeight

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = `cardReveal 0.8s ease forwards`
    }, index * 150)
  })
}

// Render players
function renderPlayers(players = playersData) {
  const grid = document.getElementById("playersGrid")

  const existingCards = grid.querySelectorAll(".player-card")
  existingCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0"
      card.style.transform = "translateY(-30px) scale(0.9)"
    }, index * 50)
  })

  setTimeout(
    () => {
      grid.innerHTML = players.map(createPlayerCard).join("")
      triggerCardAnimations()

      // إضافة console.log للتأكد من البيانات
      console.log("Rendered players:", players.length)
      console.log("Players by type:", {
        all: players.length,
        players: players.filter((p) => p.type === "players").length,
        goalkeepers: players.filter((p) => p.type === "goalkeepers").length,
      })
    },
    existingCards.length * 50 + 200,
  )
}

// Filter functionality - محسنة
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // إزالة active من كل الأزرار
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // إضافة active للزر المضغوط
      button.classList.add("active")

      const filter = button.dataset.filter
      let filteredPlayers

      console.log("Filter clicked:", filter) // للتتبع

      if (filter === "all") {
        filteredPlayers = playersData
      } else if (filter === "players") {
        // اللاعبين العاديين (مش حراس)
        filteredPlayers = playersData.filter((player) => player.type === "players")
      } else if (filter === "goalkeepers") {
        // الحراس بس
        filteredPlayers = playersData.filter((player) => player.type === "goalkeepers")
      }

      console.log("Filtered players:", filteredPlayers.length) // للتتبع

      renderPlayers(filteredPlayers)
    })
  })
}

// Navigation functionality
function setupNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

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

// تعديل دالة الانتقال للبروفايل
function goToProfile(playerId) {
  const card = document.querySelector(`[onclick="goToProfile(${playerId})"]`)
  if (card) {
    // إضافة تأثير النقر
    card.style.transform = "scale(0.95)"
    card.style.opacity = "0.8"

    setTimeout(() => {
      // الانتقال لصفحة البروفايل مع معرف اللاعب
      window.location.href = `player-profile.html?id=${playerId}`
    }, 300)
  }
}

// Star rating functionality
function setupStarRating() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("star")) {
      e.stopPropagation()

      const playerId = Number.parseInt(e.target.dataset.playerId)
      const rating = Number.parseInt(e.target.dataset.rating)
      const stars = e.target.parentElement.querySelectorAll(".star")

      const player = playersData.find((p) => p.id === playerId)
      if (player) {
        player.rating = rating
      }

      stars.forEach((star, index) => {
        setTimeout(() => {
          if (index < rating) {
            star.classList.add("filled")
            star.style.transform = "translateY(-3px) scale(1.2)"
          } else {
            star.classList.remove("filled")
            star.style.transform = ""
          }

          setTimeout(() => {
            star.style.transform = index < rating ? "translateY(-2px)" : ""
          }, 200)
        }, index * 50)
      })
    }
  })

  document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("star")) {
      const stars = e.target.parentElement.querySelectorAll(".star")
      const hoverIndex = Array.from(stars).indexOf(e.target)

      stars.forEach((star, index) => {
        if (index <= hoverIndex) {
          star.style.color = "#ffc107"
          star.style.transform = "translateY(-2px) scale(1.1)"
        }
      })
    }
  })

  document.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("star")) {
      const stars = e.target.parentElement.querySelectorAll(".star")
      stars.forEach((star) => {
        if (!star.classList.contains("filled")) {
          star.style.color = "#ddd"
          star.style.transform = ""
        }
      })
    }
  })
}

// Scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  const elementsToAnimate = document.querySelectorAll(".section-header, .filter-buttons")
  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.8s ease"
    observer.observe(el)
  })
}

// Initialize the application
function init() {
  console.log("🚀 Football page loaded!")
  console.log("Total players:", playersData.length)

  renderPlayers()
  setupFilters()
  setupNavigation()
  setupStarRating()
  setupScrollAnimations()

  document.body.classList.add("loaded")
}

// Start the application
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(init, 100)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

window.addEventListener(
  "resize",
  debounce(() => {
    triggerCardAnimations()
  }, 250),
)

