// ═══════════════════════════════════════════
//  WCE COLLEGE WEBSITE — Full Featured script.js
// ═══════════════════════════════════════════

// ─── HERO SLIDER (with auto-scroll) ─────────────────────────────────
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slide-dots');

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.slide-dot')[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.slide-dot')[currentSlide].classList.add('active');
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
}

// Auto-play slider — starts immediately and runs every 4 seconds
let sliderInterval = setInterval(() => changeSlide(1), 4000);

// Pause on hover, resume on leave
const heroSlider = document.getElementById('hero-slider');
if (heroSlider) {
  heroSlider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  heroSlider.addEventListener('mouseleave', () => {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => changeSlide(1), 4000);
  });
}

// ─── FONT SIZE (+A / -A) — uses CSS zoom for consistent scaling ─────
let zoomLevel = 100;
function changeFontSize(delta) {
  zoomLevel = Math.max(80, Math.min(130, zoomLevel + delta * 10));
  document.documentElement.style.setProperty('--zoom', (zoomLevel / 100).toString());
  // Also update the indicator
  const indicator = document.querySelector('.font-sizer > span:not(button)');
  if (indicator) {
    if (zoomLevel === 100) indicator.textContent = 'A';
    else if (zoomLevel > 100) indicator.textContent = 'A+' + ((zoomLevel - 100)/10);
    else indicator.textContent = 'A-' + ((100 - zoomLevel)/10);
  }
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────
function toggleMobileMenu() {
  const nav = document.getElementById('nav-links');
  const ham = document.getElementById('hamburger');
  nav.classList.toggle('open');
  ham.classList.toggle('active');
}

// Mobile dropdown toggle
if (window.innerWidth <= 768) {
  document.querySelectorAll('.nav-item.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
}

// ─── NAV SCROLL EFFECT ───────────────────────────────────────────────
const topBar = document.getElementById('top-bar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  if (st > 100) {
    topBar.style.transform = 'translateY(-100%)';
    topBar.style.transition = 'transform .3s ease';
  } else {
    topBar.style.transform = 'translateY(0)';
  }
  lastScroll = st;
});

// ─── COUNTER ANIMATION ──────────────────────────────────────────────
const counters = document.querySelectorAll('.stat-val[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(el, target) {
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ─── STUDENTS DATA ───────────────────────────────────────────────────
const students = [
  {
    name: "Jay Shirguppe", branch: "B.Tech (Comps)", year: "2022",
    company: "Rubrik", role: "Software Engineer", pkg: "₹1.5 CR",
    cgpa: "9.7", internships: "3", projects: "11",
    quote: "WCE's rigorous curriculum and competitive culture pushed me to my limits — and beyond. Rubrik was the reward.",
    photo: "students/jay.jpg",
    tags: ["Comps", "Batch 2022", "Rubrik"]
  },
  {
    name: "Ankita Dongare", branch: "B.Tech (IT)", year: "2022",
    company: "Google", role: "Software Engineer", pkg: "₹54 LPA",
    cgpa: "9.6", internships: "2", projects: "9",
    quote: "The project culture at WCE is unmatched. Google's bar was high, but WCE prepared me for every round.",
    photo: "students/ankita.jpg",
    tags: ["IT", "Batch 2022", "Google"]
  },
  {
    name: "Aardhya Pittalwar", branch: "B.Tech (Comps)", year: "2022",
    company: "CRED", role: "Product Engineer", pkg: "₹52 LPA",
    cgpa: "9.5", internships: "2", projects: "8",
    quote: "WCE taught me to think beyond code — systems, products, people. CRED values exactly that mindset.",
    photo: "students/aardhya.jpg",
    tags: ["Comps", "Batch 2022", "CRED"]
  },
  {
    name: "Prajwal Shah", branch: "B.Tech (IT)", year: "2022",
    company: "CRED", role: "Software Engineer", pkg: "₹52 LPA",
    cgpa: "9.4", internships: "2", projects: "10",
    quote: "From day one, WCE pushed us to build real things. That hands-on culture is what CRED's engineering team thrives on.",
    photo: "students/prajwal.jpg",
    tags: ["IT", "Batch 2022", "CRED"]
  },
];

// Render student cards
const row = document.getElementById('students-row');
row.innerHTML = students.map((s, i) => `
  <div class="s-card" onclick="openSModal(${i})">
    <img src="${s.photo}" alt="${s.name}" loading="lazy" />
    <div class="s-card-overlay"></div>
    <div class="s-card-top">${s.pkg}</div>
    <div class="s-card-body">
      <div class="s-card-company">🏢 ${s.company}</div>
      <div class="s-card-name">${s.name}</div>
      <div class="s-card-sub">${s.branch} · ${s.year}</div>
    </div>
  </div>
`).join('');

// Animate cards on scroll into view
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.s-card').forEach(c => cardObserver.observe(c));

// ─── STUDENT MODAL ───────────────────────────────────────────────────
function openSModal(i) {
  const s = students[i];
  document.getElementById('m-photo').src = s.photo;
  document.getElementById('m-photo').alt = s.name;
  document.getElementById('m-pkg').textContent = s.pkg;
  document.getElementById('m-name').textContent = s.name;
  document.getElementById('m-role').textContent = s.role + ' · ' + s.company;
  document.getElementById('m-chips').innerHTML =
    s.tags.map((t, j) => `<span class="m-chip ${j === 2 ? 'green' : ''}">${t}</span>`).join('') +
    `<span class="m-chip">CGPA ${s.cgpa}</span>`;
  document.getElementById('m-quote').textContent = '"' + s.quote + '"';
  document.getElementById('m-stats').innerHTML = `
    <div class="m-stat"><div class="m-stat-v">${s.cgpa}</div><div class="m-stat-l">CGPA</div></div>
    <div class="m-stat"><div class="m-stat-v">${s.internships}</div><div class="m-stat-l">Internships</div></div>
    <div class="m-stat"><div class="m-stat-v">${s.projects}</div><div class="m-stat-l">Projects</div></div>
  `;
  document.getElementById('s-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSModal(e) {
  if (e.target === document.getElementById('s-modal')) closeSModalDirect();
}
function closeSModalDirect() {
  document.getElementById('s-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── DEPARTMENTS DATA (8 departments) ───────────────────────────────
const departments = [
  { name: "Computer Science & Engineering",             short: "CSE",  desc: "Innovating in software and computing",        seats: 180, pkg: "₹18 LPA", faculty: 38, courses: ["B.Tech","M.Tech","PhD"] },
  { name: "Information Technology",                      short: "IT",   desc: "Networks, data & intelligent systems",        seats: 120, pkg: "₹17 LPA", faculty: 28, courses: ["B.Tech","M.Tech"] },
  { name: "Artificial Intelligence & Machine Learning", short: "AIML", desc: "AI, deep learning & data science",            seats: 60,  pkg: "₹16 LPA", faculty: 20, courses: ["B.Tech"] },
  { name: "Electronics Engineering",                     short: "ECE",  desc: "Circuits, VLSI & embedded systems",           seats: 120, pkg: "₹16 LPA", faculty: 30, courses: ["B.Tech","M.Tech"] },
  { name: "Electrical Engineering",                      short: "EE",   desc: "Power systems & energy engineering",          seats: 180, pkg: "₹14 LPA", faculty: 36, courses: ["B.Tech","M.Tech","PhD"] },
  { name: "Mechanical Engineering",                      short: "ME",   desc: "Design, dynamics & manufacturing",            seats: 180, pkg: "₹15 LPA", faculty: 44, courses: ["B.Tech","M.Tech","PhD"] },
  { name: "Civil Engineering",                           short: "CE",   desc: "Building infrastructure of tomorrow",         seats: 180, pkg: "₹14 LPA", faculty: 42, courses: ["B.Tech","M.Tech","PhD"] },
  { name: "Robotics & Automation",                       short: "RA",   desc: "Robotics, control systems & automation",      seats: 60,  pkg: "₹15 LPA", faculty: 16, courses: ["B.Tech"] },
];

// Render department cards
const deptGrid = document.getElementById('dept-grid');
deptGrid.innerHTML = departments.map(d => `
  <div class="dept-card" onclick="openDeptModal('${d.short}')">
    <div class="dept-card-code">${d.short}</div>
    <div class="dept-card-name">${d.name}</div>
    <div class="dept-card-seats">${d.seats} seats · ${d.pkg}</div>
  </div>
`).join('');

// ─── DEPARTMENT SEARCH ───────────────────────────────────────────────
const si = document.getElementById('dept-search');
const sr = document.getElementById('search-results');

si.addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();
  if (!q) { sr.style.display = 'none'; return; }
  const hits = departments.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.short.toLowerCase().includes(q) ||
    d.desc.toLowerCase().includes(q)
  );
  if (!hits.length) { sr.style.display = 'none'; return; }
  sr.innerHTML = hits.map(d => `
    <div class="r-item" onclick="openDeptModal('${d.short}')">
      <strong>${d.name} (${d.short})</strong>
      <span>${d.desc} · ${d.seats} seats</span>
    </div>`).join('');
  sr.style.display = 'block';
});

document.addEventListener('click', e => {
  if (!e.target.closest('.dept-search-bar')) sr.style.display = 'none';
});

// ─── DEPARTMENT MODAL ────────────────────────────────────────────────
function openDeptModal(code) {
  const d = departments.find(x => x.short === code);
  if (!d) return;
  sr.style.display = 'none';
  si.value = '';
  document.getElementById('dp-name').textContent = d.name;
  document.getElementById('dp-desc').textContent = d.desc;
  document.getElementById('dp-code').textContent = d.short;
  document.getElementById('dp-seats').textContent = d.seats;
  document.getElementById('dp-pkg').textContent = d.pkg;
  document.getElementById('dp-faculty').textContent = d.faculty + '+';
  document.getElementById('dp-courses').innerHTML =
    d.courses.map(c => `<span class="dept-course-tag">${c}</span>`).join('');
  document.getElementById('dept-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDeptModal(e) {
  if (e.target === document.getElementById('dept-modal')) closeDeptModalDirect();
}
function closeDeptModalDirect() {
  document.getElementById('dept-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════
//  MULTILINGUAL SUPPORT (EN / HI / MR)
// ═══════════════════════════════════════════

const translations = {
  en: {
    // Top bar
    tenders: "Tenders",
    notices: "Notices/Circulars",
    contact_us: "Contact Us",
    // Nav
    college_name: "Walchand College of Engineering",
    college_sub: "A Government-Aided Autonomous Institute",
    nav_about: "About Us",
    nav_admin: "Administration",
    nav_admissions: "Admissions",
    nav_academics: "Academics",
    nav_research: "Research",
    nav_student_life: "Student Life",
    nav_facilities: "Facilities",
    nav_placement: "Placement",
    nav_careers: "Careers",
    nav_about_short: "About Us",
    // Mega menu
    mega_overview: "Overview",
    mega_glance: "WCE at a Glance",
    mega_vision: "Vision & Mission",
    mega_accred: "Accreditations",
    mega_departments: "Departments",
    mega_resources: "Resources",
    fee_structure: "Fee Structure",
    // Hero
    hero_title: "Walchand College<br>of Engineering",
    hero_tagline: "A Government-Aided Autonomous Institute affiliated to Shivaji University, Kolhapur. NBA Accredited & NAAC A+ Accredited.",
    hl_campus: "Acre Campus",
    hl_depts: "Departments",
    hl_naac: "NAAC Grade",
    cta_explore: "Explore More",
    // Announcements
    announcements: "Announcements",
    // Stats
    stat_highest: "Highest Package",
    stat_avg: "Average Package",
    stat_companies: "Recruiting Companies",
    stat_rate: "Placement Rate",
    // Sections
    sec_top_students: "Top Placed Students",
    sec_top_students_short: "Top Students",
    sec_about: "About Walchand College of Engineering",
    about_p1: 'Established in <strong>1947</strong>, Walchand College of Engineering, Sangli is a <strong>Government-Aided Autonomous Institute</strong> affiliated to Shivaji University, Kolhapur. It is one of the oldest and most prestigious engineering institutions in Maharashtra.',
    about_p2: 'Spread over a <strong>140-acre campus</strong>, WCE offers undergraduate, postgraduate, and doctoral programs across 8 engineering departments. The college is <strong>NBA Accredited</strong> and <strong>NAAC A+ Accredited</strong>.',
    badge_auto: "Autonomous",
    sec_departments: "Explore Departments",
    sec_contact: "Get In Touch",
    // Contact
    co_address: "Address",
    co_phone: "Phone",
    co_email: "Email",
    co_website: "Website",
    // Footer
    footer_desc: "Walchand College of Engineering, Sangli — A premier Government-Aided Autonomous Institute since 1947.",
    footer_quick: "Quick Links",
    footer_campus: "Campus",
    // Modal
    pkg_offered: "Package Offered",
    // Chatbot
    chat_title: "WCE Assistant",
    chat_status: "Online • Ask me anything",
    chat_welcome: "Hi! I'm the WCE Assistant 👋 How can I help you today? You can ask about admissions, placements, departments, fees, and more!",
    chat_placeholder: "Type your message...",
    chat_q_admissions: "🎓 Admissions",
    chat_q_placements: "💼 Placements",
    chat_q_departments: "📚 Departments",
    chat_q_facilities: "🏛️ Facilities",
    chat_q_fees: "💰 Fees",
    chat_q_hostel: "🏠 Hostel",
  },
  hi: {
    tenders: "निविदाएं",
    notices: "सूचनाएं/परिपत्र",
    contact_us: "संपर्क करें",
    college_name: "वालचंद कॉलेज ऑफ इंजीनियरिंग",
    college_sub: "एक सरकारी सहायता प्राप्त स्वायत्त संस्थान",
    nav_about: "हमारे बारे में",
    nav_admin: "प्रशासन",
    nav_admissions: "प्रवेश",
    nav_academics: "शिक्षा",
    nav_research: "अनुसंधान",
    nav_student_life: "छात्र जीवन",
    nav_facilities: "सुविधाएं",
    nav_placement: "प्लेसमेंट",
    nav_careers: "करियर",
    nav_about_short: "हमारे बारे में",
    mega_overview: "अवलोकन",
    mega_glance: "WCE एक नज़र में",
    mega_vision: "दृष्टि और मिशन",
    mega_accred: "प्रत्यायन",
    mega_departments: "विभाग",
    mega_resources: "संसाधन",
    fee_structure: "शुल्क संरचना",
    hero_title: "वालचंद कॉलेज<br>ऑफ इंजीनियरिंग",
    hero_tagline: "शिवाजी विश्वविद्यालय, कोल्हापुर से संबद्ध एक सरकारी सहायता प्राप्त स्वायत्त संस्थान। NBA और NAAC A+ मान्यता प्राप्त।",
    hl_campus: "एकड़ परिसर",
    hl_depts: "विभाग",
    hl_naac: "NAAC ग्रेड",
    cta_explore: "और जानें",
    announcements: "घोषणाएं",
    stat_highest: "सर्वोच्च पैकेज",
    stat_avg: "औसत पैकेज",
    stat_companies: "भर्ती करने वाली कंपनियां",
    stat_rate: "प्लेसमेंट दर",
    sec_top_students: "शीर्ष प्लेस्ड छात्र",
    sec_top_students_short: "शीर्ष छात्र",
    sec_about: "वालचंद कॉलेज ऑफ इंजीनियरिंग के बारे में",
    about_p1: '<strong>1947</strong> में स्थापित, वालचंद कॉलेज ऑफ इंजीनियरिंग, सांगली शिवाजी विश्वविद्यालय, कोल्हापुर से संबद्ध एक <strong>सरकारी सहायता प्राप्त स्वायत्त संस्थान</strong> है। यह महाराष्ट्र के सबसे पुराने और प्रतिष्ठित इंजीनियरिंग संस्थानों में से एक है।',
    about_p2: '<strong>140-एकड़</strong> के परिसर में फैला, WCE 8 इंजीनियरिंग विभागों में स्नातक, स्नातकोत्तर और डॉक्टरेट कार्यक्रम प्रदान करता है। कॉलेज <strong>NBA मान्यता प्राप्त</strong> और <strong>NAAC A+ मान्यता प्राप्त</strong> है।',
    badge_auto: "स्वायत्त",
    sec_departments: "विभाग खोजें",
    sec_contact: "संपर्क करें",
    co_address: "पता",
    co_phone: "फ़ोन",
    co_email: "ईमेल",
    co_website: "वेबसाइट",
    footer_desc: "वालचंद कॉलेज ऑफ इंजीनियरिंग, सांगली — 1947 से एक प्रमुख सरकारी सहायता प्राप्त स्वायत्त संस्थान।",
    footer_quick: "त्वरित लिंक",
    footer_campus: "परिसर",
    pkg_offered: "प्रस्तावित पैकेज",
    chat_title: "WCE सहायक",
    chat_status: "ऑनलाइन • कुछ भी पूछें",
    chat_welcome: "नमस्ते! मैं WCE सहायक हूँ 👋 आज मैं आपकी कैसे मदद कर सकता हूँ? प्रवेश, प्लेसमेंट, विभागों, शुल्क और बहुत कुछ के बारे में पूछें!",
    chat_placeholder: "अपना संदेश टाइप करें...",
    chat_q_admissions: "🎓 प्रवेश",
    chat_q_placements: "💼 प्लेसमेंट",
    chat_q_departments: "📚 विभाग",
    chat_q_facilities: "🏛️ सुविधाएं",
    chat_q_fees: "💰 शुल्क",
    chat_q_hostel: "🏠 छात्रावास",
  },
  mr: {
    tenders: "निविदा",
    notices: "सूचना/परिपत्रक",
    contact_us: "संपर्क साधा",
    college_name: "वालचंद कॉलेज ऑफ इंजिनीअरिंग",
    college_sub: "शासकीय अनुदानित स्वायत्त संस्था",
    nav_about: "आमच्याबद्दल",
    nav_admin: "प्रशासन",
    nav_admissions: "प्रवेश",
    nav_academics: "शैक्षणिक",
    nav_research: "संशोधन",
    nav_student_life: "विद्यार्थी जीवन",
    nav_facilities: "सुविधा",
    nav_placement: "प्लेसमेंट",
    nav_careers: "करिअर",
    nav_about_short: "आमच्याबद्दल",
    mega_overview: "आढावा",
    mega_glance: "WCE एक नजरेत",
    mega_vision: "दृष्टी आणि ध्येय",
    mega_accred: "मान्यता",
    mega_departments: "विभाग",
    mega_resources: "संसाधने",
    fee_structure: "शुल्क रचना",
    hero_title: "वालचंद कॉलेज<br>ऑफ इंजिनीअरिंग",
    hero_tagline: "शिवाजी विद्यापीठ, कोल्हापूर शी संलग्न शासकीय अनुदानित स्वायत्त संस्था. NBA आणि NAAC A+ मान्यताप्राप्त.",
    hl_campus: "एकर परिसर",
    hl_depts: "विभाग",
    hl_naac: "NAAC श्रेणी",
    cta_explore: "अधिक जाणून घ्या",
    announcements: "घोषणा",
    stat_highest: "सर्वोच्च पॅकेज",
    stat_avg: "सरासरी पॅकेज",
    stat_companies: "भरती करणाऱ्या कंपन्या",
    stat_rate: "प्लेसमेंट दर",
    sec_top_students: "उत्कृष्ट प्लेस्ड विद्यार्थी",
    sec_top_students_short: "उत्कृष्ट विद्यार्थी",
    sec_about: "वालचंद कॉलेज ऑफ इंजिनीअरिंग बद्दल",
    about_p1: '<strong>1947</strong> मध्ये स्थापित, वालचंद कॉलेज ऑफ इंजिनीअरिंग, सांगली ही शिवाजी विद्यापीठ, कोल्हापूर शी संलग्न <strong>शासकीय अनुदानित स्वायत्त संस्था</strong> आहे. महाराष्ट्रातील सर्वात जुन्या आणि प्रतिष्ठित अभियांत्रिकी संस्थांपैकी एक.',
    about_p2: '<strong>140-एकर</strong> परिसरात पसरलेले, WCE 8 अभियांत्रिकी विभागांमध्ये पदवी, पदव्युत्तर आणि डॉक्टरेट कार्यक्रम प्रदान करते. <strong>NBA मान्यताप्राप्त</strong> आणि <strong>NAAC A+ मान्यताप्राप्त</strong>.',
    badge_auto: "स्वायत्त",
    sec_departments: "विभाग शोधा",
    sec_contact: "संपर्क साधा",
    co_address: "पत्ता",
    co_phone: "फोन",
    co_email: "ईमेल",
    co_website: "वेबसाइट",
    footer_desc: "वालचंद कॉलेज ऑफ इंजिनीअरिंग, सांगली — 1947 पासून एक प्रमुख शासकीय अनुदानित स्वायत्त संस्था.",
    footer_quick: "जलद दुवे",
    footer_campus: "परिसर",
    pkg_offered: "ऑफर केलेले पॅकेज",
    chat_title: "WCE सहाय्यक",
    chat_status: "ऑनलाइन • काहीही विचारा",
    chat_welcome: "नमस्कार! मी WCE सहाय्यक आहे 👋 आज मी तुम्हाला कशी मदत करू शकतो? प्रवेश, प्लेसमेंट, विभाग, शुल्क आणि बरेच काही विचारा!",
    chat_placeholder: "तुमचा संदेश टाइप करा...",
    chat_q_admissions: "🎓 प्रवेश",
    chat_q_placements: "💼 प्लेसमेंट",
    chat_q_departments: "📚 विभाग",
    chat_q_facilities: "🏛️ सुविधा",
    chat_q_fees: "💰 शुल्क",
    chat_q_hostel: "🏠 वसतिगृह",
  }
};

let currentLang = 'en';

function toggleLangMenu() {
  const dropdown = document.getElementById('lang-dropdown');
  dropdown.classList.toggle('open');
}

// Close lang dropdown when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.lang-selector')) {
    document.getElementById('lang-dropdown').classList.remove('open');
  }
});

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      // Check if content has HTML (like <strong> tags)
      if (t[key].includes('<')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Update current language display
  document.getElementById('current-lang').textContent = lang.toUpperCase();

  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang === 'en' ? 'en' : lang === 'hi' ? 'hi' : 'mr';

  // Close dropdown
  document.getElementById('lang-dropdown').classList.remove('open');
}

// ─── CHATBOT ─────────────────────────────────────────────────────────
const KB = {
  admission: {
    en: "WCE admissions via MHT-CET / JEE Main through Maharashtra DTE portal. Cutoff: 85–98 percentile depending on branch.",
    hi: "WCE प्रवेश MHT-CET / JEE Main के माध्यम से महाराष्ट्र DTE पोर्टल से। कटऑफ: शाखा के अनुसार 85-98 पर्सेंटाइल।",
    mr: "WCE प्रवेश MHT-CET / JEE Main द्वारे महाराष्ट्र DTE पोर्टलवरून. कटऑफ: शाखेनुसार 85-98 पर्सेंटाइल."
  },
  placement: {
    en: "Highest: ₹1.5 CR (Rubrik), Average: ₹12 LPA. 300+ companies recruit from WCE including Google, Microsoft, CRED, Amazon.",
    hi: "सर्वोच्च: ₹1.5 CR (Rubrik), औसत: ₹12 LPA। 300+ कंपनियां WCE से भर्ती करती हैं जिनमें Google, Microsoft, CRED, Amazon शामिल हैं।",
    mr: "सर्वोच्च: ₹1.5 CR (Rubrik), सरासरी: ₹12 LPA. 300+ कंपन्या WCE मधून भरती करतात — Google, Microsoft, CRED, Amazon."
  },
  department: {
    en: "8 departments: Computer Science, Information Technology, AI & Machine Learning, Electronics, Electrical, Mechanical, Civil, and Robotics & Automation. All offer B.Tech; most offer M.Tech and PhD.",
    hi: "8 विभाग: कंप्यूटर साइंस, आईटी, AI और मशीन लर्निंग, इलेक्ट्रॉनिक्स, इलेक्ट्रिकल, मैकेनिकल, सिविल, रोबोटिक्स और ऑटोमेशन। सभी B.Tech प्रदान करते हैं।",
    mr: "8 विभाग: कंप्युटर सायन्स, IT, AI & मशीन लर्निंग, इलेक्ट्रॉनिक्स, इलेक्ट्रिकल, मेकॅनिकल, सिव्हिल, रोबोटिक्स & ऑटोमेशन. सर्व B.Tech देतात."
  },
  fee: {
    en: "Annual tuition approx ₹75,000–₹1,10,000 for B.Tech. Scholarships available for merit and SC/ST/OBC students.",
    hi: "B.Tech के लिए वार्षिक शुल्क लगभग ₹75,000–₹1,10,000। मेरिट और SC/ST/OBC छात्रों के लिए छात्रवृत्ति उपलब्ध।",
    mr: "B.Tech साठी वार्षिक शुल्क अंदाजे ₹75,000–₹1,10,000. गुणवत्ता आणि SC/ST/OBC विद्यार्थ्यांसाठी शिष्यवृत्ती उपलब्ध."
  },
  facility: {
    en: "140-acre campus with smart classrooms, digital library, sports complex, hostels, cafeteria, 24×7 Wi-Fi.",
    hi: "140-एकड़ परिसर — स्मार्ट कक्षाएं, डिजिटल लाइब्रेरी, स्पोर्ट्स कॉम्प्लेक्स, छात्रावास, कैफेटेरिया, 24×7 Wi-Fi।",
    mr: "140-एकर परिसर — स्मार्ट वर्गखोल्या, डिजिटल ग्रंथालय, क्रीडा संकुल, वसतिगृह, कॅफेटेरिया, 24×7 Wi-Fi."
  },
  hostel: {
    en: "Separate hostels for boys and girls. Fee ₹40,000–₹70,000/year including meals.",
    hi: "लड़कों और लड़कियों के लिए अलग छात्रावास। शुल्क ₹40,000–₹70,000/वर्ष भोजन सहित।",
    mr: "मुलांसाठी आणि मुलींसाठी वेगळे वसतिगृह. शुल्क ₹40,000–₹70,000/वर्ष जेवण सह."
  },
  contact: {
    en: "📍 Vishrambag, Sangli – 416415. 📞 +91 233 2300383. ✉ info@walchandsangli.ac.in",
    hi: "📍 विश्रामबाग, सांगली – 416415। 📞 +91 233 2300383। ✉ info@walchandsangli.ac.in",
    mr: "📍 विश्रामबाग, सांगली – 416415. 📞 +91 233 2300383. ✉ info@walchandsangli.ac.in"
  },
  rank: {
    en: "NAAC A+ accredited. NBA accredited departments. Ranked among top 50 engineering colleges in Maharashtra.",
    hi: "NAAC A+ मान्यता प्राप्त। NBA मान्यता प्राप्त विभाग। महाराष्ट्र के शीर्ष 50 इंजीनियरिंग कॉलेजों में रैंक।",
    mr: "NAAC A+ मान्यताप्राप्त. NBA मान्यताप्राप्त विभाग. महाराष्ट्रातील शीर्ष 50 अभियांत्रिकी महाविद्यालयांमध्ये रँक."
  },
};

function getReply(m) {
  m = m.toLowerCase();
  let key = null;
  if (m.includes('admission') || m.includes('apply') || m.includes('cet') || m.includes('cutoff') || m.includes('प्रवेश')) key = 'admission';
  else if (m.includes('placement') || m.includes('package') || m.includes('job') || m.includes('salary') || m.includes('recruiter') || m.includes('प्लेसमेंट') || m.includes('पॅकेज')) key = 'placement';
  else if (m.includes('department') || m.includes('branch') || m.includes('course') || m.includes('विभाग')) key = 'department';
  else if (m.includes('fee') || m.includes('cost') || m.includes('scholarship') || m.includes('शुल्क')) key = 'fee';
  else if (m.includes('facilit') || m.includes('campus') || m.includes('lab') || m.includes('library') || m.includes('सुविधा') || m.includes('परिसर')) key = 'facility';
  else if (m.includes('hostel') || m.includes('accommodation') || m.includes('room') || m.includes('छात्रावास') || m.includes('वसतिगृह')) key = 'hostel';
  else if (m.includes('contact') || m.includes('address') || m.includes('phone') || m.includes('email') || m.includes('संपर्क') || m.includes('पत्ता')) key = 'contact';
  else if (m.includes('rank') || m.includes('naac') || m.includes('nba') || m.includes('accredit') || m.includes('मान्यता')) key = 'rank';

  if (key && KB[key]) {
    return KB[key][currentLang] || KB[key].en;
  }

  const defaults = {
    en: "I can help with admissions, placements, departments, fees, facilities, hostels, rankings, and contact info. What would you like to know?",
    hi: "मैं प्रवेश, प्लेसमेंट, विभागों, शुल्क, सुविधाओं, छात्रावास, रैंकिंग और संपर्क जानकारी में मदद कर सकता हूं। आप क्या जानना चाहेंगे?",
    mr: "मी प्रवेश, प्लेसमेंट, विभाग, शुल्क, सुविधा, वसतिगृह, रँकिंग आणि संपर्क माहितीमध्ये मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?"
  };
  return defaults[currentLang] || defaults.en;
}

function toggleChat() {
  document.getElementById('chat-win').classList.toggle('open');
}

function addMsg(txt, cls) {
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  if (cls === 'bot') {
    div.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble">${txt}</div>`;
  } else {
    div.innerHTML = `<div class="msg-avatar">👤</div><div class="msg-bubble">${txt}</div>`;
  }
  const msgs = document.getElementById('c-msgs');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendMsg() {
  const inp = document.getElementById('c-input');
  const t = inp.value.trim();
  if (!t) return;
  addMsg(t, 'user');
  inp.value = '';
  // Add typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble" style="opacity:.6">Typing...</div>`;
  const msgs = document.getElementById('c-msgs');
  msgs.appendChild(typingDiv);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    const ti = document.getElementById('typing-indicator');
    if (ti) ti.remove();
    addMsg(getReply(t), 'bot');
  }, 600);
}

function qMsg(t) {
  addMsg(t, 'user');
  setTimeout(() => addMsg(getReply(t), 'bot'), 500);
  document.getElementById('chat-win').classList.add('open');
}

// ─── KEYBOARD CLOSE ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSModalDirect(); closeDeptModalDirect(); }
});

// ─── TOP SEARCH BAR FUNCTIONALITY ───────────────────────────────
const topSearch = document.getElementById("top-search");

topSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = this.value.trim().toLowerCase();

    // 🔥 CONDITIONS FOR AIML PAGE
    if (
      query.includes("aiml") ||
      query.includes("ai") ||
      query.includes("machine learning")
    ) {
      window.location.href = "aiml.html";
    }

    // 👉 You can add more pages like this
    else if (query.includes("cse")) {
      window.location.href = "cse.html";
    }
    else if (query.includes("it")) {
      window.location.href = "it.html";
    }

    else {
      alert("No page found for: " + query);
    }
  }
});
// ─── TOP SEARCH (WORKING VERSION) ─────────────────────────────

// run after page fully loads
document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("top-search");

  // Enter key
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleTopSearch();
    }
  });

});
function handleTopSearch(e) {
  e.preventDefault(); // stop page reload

  const query = document.getElementById("top-search").value.trim().toLowerCase();

  console.log("Search query:", query); // DEBUG

  if (
    query === "aiml" ||
    query.includes("ai") ||
    query.includes("machine learning")
  ) {
    window.location.href = "aiml.html";
  }
  else if (query.includes("cse")) {
    window.location.href = "cse.html";
  }
  else if (query.includes("it")) {
    window.location.href = "it.html";
  }
  else {
    alert("No page found for: " + query);
  }

  return false;
}