// Basketball Page - FIFA Animation - SIMPLE VERSION

document.addEventListener("DOMContentLoaded", () => {
  console.log("🏀 Basketball page loading...")

  // Start animation after 2 seconds
  setTimeout(() => {
    startAnimation()
  }, 2000)
})

// دالة تشغيل الأنيميشن - نفس الـ test page بالضبط
function startAnimation() {
  console.log("بدء الأنيميشن...")

  // جيب كل الكروت
  const cards = document.querySelectorAll(".player-card")

  // شغل كل كارت بتأخير
  cards.forEach((card, index) => {
    setTimeout(() => {
      console.log(`تشغيل كارت ${index + 1}`)
      card.classList.add("show")
    }, index * 500) // 500ms تأخير بين كل كارت
  })
}

// دالة إعادة التشغيل
function resetAnimation() {
  console.log("إعادة تشغيل...")

  const cards = document.querySelectorAll(".player-card")
  cards.forEach((card) => {
    card.classList.remove("show")
  })
}
