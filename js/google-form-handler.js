// Google Form Handler - الحل النهائي! 🎯

// إعدادات Google Form
const GOOGLE_FORM_CONFIG = {
  // حطي رابط Google Form بتاعك هنا
  formUrl: "https://forms.gle/GFdB8XnmfH2Cvghb6", // غيري ده!

  // معلومات الاتصال
  whatsappNumber: "201223587365",
  phoneNumber: "+201223587365",
}

// فتح Google Form
function openGoogleForm() {
  console.log("🚀 Opening Google Form...")

  // إضافة تأثير loading
  const btn = document.querySelector(".google-form-btn")
  const originalContent = btn.innerHTML

  btn.classList.add("loading")
  btn.innerHTML = '<div class="btn-content"><i class="fas fa-spinner fa-spin"></i><span>Opening Form...</span></div>'

  // فتح الفورم في tab جديد
  setTimeout(() => {
    window.open(GOOGLE_FORM_CONFIG.formUrl, "_blank")

    // إظهار رسالة نجاح
    showNotification("Google Form opened! Please fill out the registration form.", "success")

    // إعادة تعيين الزرار
    setTimeout(() => {
      btn.classList.remove("loading")
      btn.innerHTML = originalContent
    }, 2000)
  }, 1000)

  // تتبع الحدث (اختياري)
  trackEvent("registration_form_opened", "google_form")
}

// فتح WhatsApp
function openWhatsApp() {
  console.log("📱 Opening WhatsApp...")

  const message = encodeURIComponent(`Hello Eagles Academy! 🦅

I'm interested in joining your training programs.

Could you please provide me with:
• Available training schedules
• Pricing information
• Registration requirements
• Location details

Thank you!`)

  const whatsappUrl = `https://wa.me/${GOOGLE_FORM_CONFIG.whatsappNumber}?text=${message}`

  window.open(whatsappUrl, "_blank")
  showNotification("Opening WhatsApp to contact Eagles Academy!", "success")

  // تتبع الحدث
  trackEvent("contact_method_used", "whatsapp")
}

// إجراء مكالمة هاتفية
function makePhoneCall() {
  console.log("📞 Initiating phone call...")

  const phoneNumber = GOOGLE_FORM_CONFIG.phoneNumber

  // للأجهزة المحمولة - فتح الـ dialer
  if (isMobileDevice()) {
    window.location.href = `tel:${phoneNumber}`
    showNotification("Opening phone dialer...", "info")
  } else {
    // للكمبيوتر - عرض الرقم ونسخه
    showPhoneModal(phoneNumber)
  }

  // تتبع الحدث
  trackEvent("contact_method_used", "phone")
}

// عرض modal للرقم (للكمبيوتر)
function showPhoneModal(phoneNumber) {
  const modal = document.createElement("div")
  modal.className = "phone-modal"
  modal.innerHTML = `
    <div class="phone-modal-content">
      <div class="phone-modal-header">
        <h3><i class="fas fa-phone"></i> Call Eagles Academy</h3>
        <button class="close-modal" onclick="closePhoneModal()">&times;</button>
      </div>
      <div class="phone-modal-body">
        <p>Call us directly at:</p>
        <div class="phone-number">
          <span>${phoneNumber}</span>
          <button class="copy-btn" onclick="copyPhoneNumber('${phoneNumber}')">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
        <p class="phone-note">
          <i class="fas fa-info-circle"></i>
          Available: Sunday to Thursday, 4:00 PM - 10:00 PM
        </p>
      </div>
    </div>
  `

  // إضافة الـ styles
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"
}

// إغلاق modal الهاتف
function closePhoneModal() {
  const modal = document.querySelector(".phone-modal")
  if (modal) {
    modal.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => {
      modal.remove()
      document.body.style.overflow = "auto"
    }, 300)
  }
}

// نسخ رقم الهاتف
function copyPhoneNumber(phoneNumber) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        showNotification("Phone number copied to clipboard!", "success")

        // تغيير نص الزرار مؤقتاً
        const copyBtn = document.querySelector(".copy-btn")
        const originalText = copyBtn.innerHTML
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'
        copyBtn.style.background = "#10b981"

        setTimeout(() => {
          copyBtn.innerHTML = originalText
          copyBtn.style.background = ""
        }, 2000)
      })
      .catch(() => {
        showNotification("Could not copy number. Please write it down.", "warning")
      })
  } else {
    showNotification("Please write down the number: " + phoneNumber, "info")
  }
}

// فحص إذا كان الجهاز محمول
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// تتبع الأحداث (اختياري - للإحصائيات)
function trackEvent(eventName, method) {
  console.log(`📊 Event tracked: ${eventName} - ${method}`)

  // يمكنك إضافة Google Analytics هنا لو عايزة
  // gtag('event', eventName, { method: method })
}

// دالة إظهار الإشعارات المحسنة
function showNotification(message, type = "info", duration = 5000) {
  // إزالة الإشعارات الموجودة
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((n) => n.remove())

  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-triangle",
    warning: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
  }

  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  }

  notification.innerHTML = `
    <div class="notification-content">
      <i class="${icons[type]}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    font-weight: 600;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    font-size: 14px;
    line-height: 1.4;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  // إظهار الإشعار
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // إخفاء الإشعار تلقائياً
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, duration)
}

// إضافة الـ CSS للـ modal والإشعارات
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
  .phone-modal-content {
    background: white;
    border-radius: 15px;
    padding: 0;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  
  .phone-modal-header {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .phone-modal-header h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .close-modal {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
  }
  
  .close-modal:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .phone-modal-body {
    padding: 25px;
    text-align: center;
  }
  
  .phone-modal-body p {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .phone-number {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    border: 2px solid #e9ecef;
  }
  
  .phone-number span {
    font-size: 20px;
    font-weight: bold;
    color: #f59e0b;
    font-family: monospace;
  }
  
  .copy-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
  }
  
  .copy-btn:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }
  
  .phone-note {
    font-size: 12px;
    color: #6c757d;
    margin-top: 15px;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`

document.head.appendChild(additionalStyles)

// تهيئة الصفحة
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Google Form handler loaded successfully!")

  // فحص إذا كان رابط Google Form محدد
  if (GOOGLE_FORM_CONFIG.formUrl.includes("YOUR_GOOGLE_FORM_LINK")) {
    console.warn("⚠️ Please update the Google Form URL in the configuration!")
  }
})

// جعل الدوال متاحة عالمياً
window.openGoogleForm = openGoogleForm
window.openWhatsApp = openWhatsApp
window.makePhoneCall = makePhoneCall
window.closePhoneModal = closePhoneModal
window.copyPhoneNumber = copyPhoneNumber
