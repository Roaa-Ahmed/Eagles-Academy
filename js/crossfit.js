// CrossFit Champions Data - Professional Layout
const championsData = [
  {
    id: 1,
    name: "-",
    title: "Gold Champion",
    medal: "gold",
    rank: 1,
    year: "-",
    image: "../images/crossfit-gold.jpg",
    achievements: ["Regional Champion", "Best Deadlift", "Endurance Master"],
  },
  {
    id: 2,
    name: "-",
    title: "Silver Champion",
    medal: "silver",
    rank: 2,
    year: "-",
    image: "../images/crossfit-silver.jpg",
    achievements: ["Speed Champion", "Best Squat", "Consistency Award"],
  },
  {
    id: 3,
    name: "-",
    title: "Bronze Champion",
    medal: "bronze",
    rank: 3,
    year: "-",
    image: "../images/crossfit-bronze.jpg",
    achievements: ["Rising Star", "Best Form", "Team Player"],
  },
]

// Create champion card with modern design
function createChampionCard(champion) {
  return `
    <div class="champion-card ${champion.medal}" onclick="goToProfile(${champion.id})">
      <div class="champion-rank">${champion.rank}</div>
      <div class="champion-image-container">
        <div class="champion-image">
          <img src="${champion.image}" alt="${champion.name}" 
               onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:4rem;color:#a0a0a0;\\'>🏆</div>'">
        </div>
      </div>
      <h3 class="champion-name">${champion.name}</h3>
      <p class="champion-title">${champion.title}</p>
      <div class="champion-year">${champion.year}</div>
    </div>
  `
}

// Render champions in grid layout
function renderChampions() {
  const container = document.getElementById("championsGrid")

  // Sort by rank for consistent display
  const sortedChampions = [...championsData].sort((a, b) => a.rank - b.rank)

  container.innerHTML = sortedChampions.map(createChampionCard).join("")

  // Trigger animations
  triggerChampionAnimations()
}

// Modern card reveal animations
function triggerChampionAnimations() {
  const cards = document.querySelectorAll(".champion-card")

  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = "all 0.6s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
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

// Enhanced profile navigation
function goToProfile(championId) {
  const card = document.querySelector(`[onclick="goToProfile(${championId})"]`)
  if (card) {
    // Add modern click effect
    card.style.transform = "scale(0.98)"
    card.style.transition = "transform 0.1s ease"

    // Create ripple effect with original medal colors
    const ripple = document.createElement("div")
    const champion = championsData.find((c) => c.id === championId)

    let rippleColor
    switch (champion.medal) {
      case "gold":
        rippleColor = "rgba(255, 215, 0, 0.4)"
        break
      case "silver":
        rippleColor = "rgba(192, 192, 192, 0.4)"
        break
      case "bronze":
        rippleColor = "rgba(205, 127, 50, 0.4)"
        break
    }

    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, ${rippleColor} 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: modernRipple 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `

    // Add ripple animation if not exists
    if (!document.querySelector("#modern-ripple-style")) {
      const style = document.createElement("style")
      style.id = "modern-ripple-style"
      style.textContent = `
        @keyframes modernRipple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    card.appendChild(ripple)

    setTimeout(() => {
      // Navigate to profile
      window.location.href = `champion-profile.html?id=${championId}`

      // Reset card state
      card.style.transform = ""
      ripple.remove()
    }, 600)
  }
}

// Modern scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"

          // Staggered animations for grids
          if (entry.target.classList.contains("achievement-stats")) {
            const items = entry.target.querySelectorAll(".achievement-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1"
                item.style.transform = "translateY(0)"
              }, index * 150)
            })
          }

          if (entry.target.classList.contains("programs-grid")) {
            const cards = entry.target.querySelectorAll(".program-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, index * 200)
            })
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  const elementsToAnimate = document.querySelectorAll(
    ".section-header, .achievement-stats, .programs-grid, .achievement-item, .program-card",
  )

  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.8s ease"
    observer.observe(el)
  })
}

// Smooth parallax for hero particles
function setupParallax() {
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const particles = document.querySelectorAll(".particle")

    particles.forEach((particle, index) => {
      const speed = 0.1 + index * 0.05
      particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`
    })

    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })
}

// Enhanced hover effects with original medal colors
function setupHoverEffects() {
  const championCards = document.querySelectorAll(".champion-card")

  championCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add glow effect with original medal colors
      const medal = card.classList.contains("gold") ? "gold" : card.classList.contains("silver") ? "silver" : "bronze"

      let glowColor
      switch (medal) {
        case "gold":
          glowColor = "rgba(255, 215, 0, 0.3)"
          break
        case "silver":
          glowColor = "rgba(192, 192, 192, 0.3)"
          break
        case "bronze":
          glowColor = "rgba(205, 127, 50, 0.3)"
          break
      }

      card.style.boxShadow = `0 20px 40px ${glowColor}, 0 10px 15px rgba(0, 0, 0, 0.15)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = ""
    })
  })
}

// Initialize everything
function init() {
  renderChampions()
  setupNavigation()
  setupScrollAnimations()
  setupParallax()
  setupHoverEffects()

  // Add loaded class for any additional animations
  document.body.classList.add("loaded")
}

// Start when DOM is ready
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

// Optimized resize handler
window.addEventListener(
  "resize",
  debounce(() => {
    triggerChampionAnimations()
  }, 250),
)

// Modern keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    const navMenu = document.getElementById("nav-menu")
    const hamburger = document.getElementById("hamburger")
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const bars = hamburger.querySelectorAll(".bar")
      bars.forEach((bar) => {
        bar.style.transform = "none"
        bar.style.opacity = "1"
      })
    }
  }
})

console.log("🚀 Modern CrossFit Champions page loaded successfully!")
