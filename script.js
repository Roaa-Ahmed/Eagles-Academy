// DOM Elements
const navbar = document.getElementById("navbar")
const footballBtn = document.getElementById("football-btn")
const basketballBtn = document.getElementById("basketball-btn")
const startJourneyBtn = document.getElementById("start-journey-btn")
const watchStoryBtn = document.getElementById("watch-story-btn")
const joinAcademyBtn = document.getElementById("join-academy-btn")
const playBtn = document.getElementById("play-btn")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

// Navigation scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.8)"
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)"
  }

  // Update parallax effects
  const heroShapes = document.querySelectorAll(".shape")
  heroShapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })

  // Optional: Add parallax to other elements
  const hero = document.querySelector(".hero-content")
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icon =
    type === "error" ? "fas fa-exclamation-triangle" : type === "success" ? "fas fa-check-circle" : "fas fa-info-circle"

  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "error" ? "#ef4444" : type === "success" ? "#10b981" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `

  document.body.appendChild(notification)

  // Slide in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Slide out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  }, 4000)
}

// Sport selection buttons (if they exist)
if (footballBtn) {
  footballBtn.addEventListener("click", () => {
    footballBtn.classList.add("active")
    if (basketballBtn) basketballBtn.classList.remove("active")
  })
}

if (basketballBtn) {
  basketballBtn.addEventListener("click", () => {
    basketballBtn.classList.add("active")
    if (footballBtn) footballBtn.classList.remove("active")
  })
}

// Smooth scroll to About Us section
function scrollToAbout() {
  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Video play button functionality
function playVideo() {
  const video = document.querySelector(".academy-video")
  const overlay = document.querySelector(".video-overlay")

  if (video && video.paused) {
    video.play()
    if (overlay) {
      overlay.style.opacity = "0"
      setTimeout(() => {
        overlay.style.display = "none"
      }, 300)
    }
  }
}

// Reset video overlay when video ends
const academyVideo = document.querySelector(".academy-video")
if (academyVideo) {
  academyVideo.addEventListener("ended", () => {
    const overlay = document.querySelector(".video-overlay")
    if (overlay) {
      overlay.style.display = "flex"
      setTimeout(() => {
        overlay.style.opacity = "1"
      }, 100)
    }
  })
}

// Smooth scrolling for all internal links
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

// Mobile Navigation Toggle
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Discover More button functionality
document.addEventListener("DOMContentLoaded", () => {
  const discoverBtn = document.getElementById("discover-more-btn")
  if (discoverBtn) {
    discoverBtn.addEventListener("click", scrollToAbout)
  }
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"

      // Add a staggered animation effect for child elements
      const children = entry.target.querySelectorAll(".stat-item, .feature")
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = "1"
          child.style.transform = "translateY(0)"
        }, index * 100) // 100ms delay between each child
      })
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".stat-item, .about-text, .video-container, .cta-text, .cta-form")
  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })
})

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent)
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Optional: Hide loading spinner if you have one
  const loader = document.querySelector(".loader")
  if (loader) {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }
})

// Performance Optimization
let ticking = false

function updateScrollEffects() {
  // Update navbar background
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.8)"
  }

  // Update parallax effects
  const scrolled = window.pageYOffset
  const heroShapes = document.querySelectorAll(".shape")
  heroShapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })

  ticking = false
}

// Optimized scroll event handler
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
})

// Accessibility Enhancements
document.addEventListener("keydown", (event) => {
  // Close mobile menu with Escape key
  if (event.key === "Escape") {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }

  // Navigate with arrow keys in mobile menu
  if (navMenu && navMenu.classList.contains("active")) {
    const links = navMenu.querySelectorAll(".nav-link")
    const currentFocus = document.activeElement
    const currentIndex = Array.from(links).indexOf(currentFocus)

    if (event.key === "ArrowDown" && currentIndex < links.length - 1) {
      event.preventDefault()
      links[currentIndex + 1].focus()
    } else if (event.key === "ArrowUp" && currentIndex > 0) {
      event.preventDefault()
      links[currentIndex - 1].focus()
    }
  }
})

// Error Handling
window.addEventListener("error", (event) => {
  console.error("An error occurred:", event.error)
  // You could show a user-friendly error message here
})

document.querySelector(".academy-video")?.addEventListener("error", () => {
  const videoContainer = document.querySelector(".video-container")
  if (videoContainer) {
    videoContainer.innerHTML = `
      <div style="padding: 40px; text-align: center; background: rgba(255,255,255,0.1); border-radius: 20px;">
        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #f59e0b; margin-bottom: 10px;"></i>
        <p>Video temporarily unavailable. Please try again later.</p>
      </div>
    `
  }
})

// Contact form functionality (for contact page)
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit)
  }
}

function handleSubmit(event) {
  event.preventDefault()

  // Get form data
  const name = event.target.querySelector('input[type="text"]').value
  const phone = event.target.querySelector('input[type="tel"]').value
  const sport = event.target.querySelector("select").value

  // Simple validation
  if (!name || !phone || !sport) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Phone number validation (basic check for numbers)
  const phoneRegex = /^[\d\s\-+()]+$/
  if (!phoneRegex.test(phone)) {
    showNotification("Please enter a valid phone number", "error")
    return
  }

  // Show success message
  showNotification(
    `Thank you ${name}! Your registration has been submitted successfully. We'll contact you soon at ${phone} regarding ${getSportName(sport)} training.`,
    "success",
  )

  // Reset form
  event.target.reset()

  // Optional: Add visual feedback (you could add a success animation here)
  const submitBtn = event.target.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!'
  submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)"

  // Reset button after 2 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.style.background = "linear-gradient(135deg, #f59e0b, #d97706)"
  }, 2000)
}

function getSportName(sport) {
  const sportNames = {
    football: "Football",
    basketball: "Basketball",
    crossfit: "CrossFit",
  }
  return sportNames[sport] || sport
}

// Initialize contact form when page loads
document.addEventListener("DOMContentLoaded", initContactForm)

// WhatsApp quick contact
function openWhatsApp() {
  const message = encodeURIComponent("مرحباً، أريد الاستفسار عن أكاديمية النسور")
  window.open(`https://wa.me/201223587365?text=${message}`, "_blank")
}

// Add WhatsApp functionality to buttons
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      openWhatsApp()
    })
  })
})

// Make functions globally available
window.playVideo = playVideo
window.handleSubmit = handleSubmit

console.log("🚀 Eagles Academy website loaded successfully!")
