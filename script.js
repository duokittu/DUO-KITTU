// State management
let userData = {
    name: '', dob: '', qualification: '', degree: '', branch: '', industry: '', selectedDomain: '', currentStep: 1
};

// 🔥 LIFE SUCCESS QUOTES - Auto change every 7 seconds ALL PAGES
const motivationQuotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Success is not final, failure is not fatal: It is the courage to continue." - Winston Churchill',
    '"Your time is limited, don\'t waste it living someone else\'s life." - Steve Jobs',
    '"The future belongs to those who believe in their dreams." - Eleanor Roosevelt',
    '"Dream big and dare to fail." - Norman Vaughan',
    '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
    '"The only impossible journey is the one you never begin." - Tony Robbins',
    '"Change your thoughts and you change your world." - Norman Vincent Peale',
    '"Believe you can and you\'re halfway there." - Theodore Roosevelt',
    '"Success usually comes to those too busy looking for it." - Henry David Thoreau'
];

let quoteInterval;

// ✅ PERFECT PREVIOUS BUTTON - Page 6→5→4→3→2→1
function goPrevious() {
    if (document.getElementById('domainDetails').classList.contains('active')) {
        document.getElementById('domainDetails').classList.remove('active');
        document.getElementById('mainPage').classList.add('active');
        showStep(5);
    } else if (userData.currentStep > 1) {
        userData.currentStep--;
        showStep(userData.currentStep);
    } else {
        goBackToLogin();
    }
}

// 🔥 AUTO QUOTES - EVERY 7 SECONDS ON ALL PAGES
function startQuoteAnimation() {
    stopQuoteAnimation();
    let quoteIndex = 0;
    quoteInterval = setInterval(() => {
        const quotes = document.querySelectorAll('.page-quote');
        quotes.forEach(quote => {
            quote.textContent = motivationQuotes[quoteIndex];
        });
        quoteIndex = (quoteIndex + 1) % motivationQuotes.length;
    }, 7000);
}

function stopQuoteAnimation() {
    if (quoteInterval) clearInterval(quoteInterval);
}

// Navigation
function goBackToLogin() {
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    stopQuoteAnimation();
}

function goToLogin() {
    document.getElementById('welcomePage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    stopQuoteAnimation();
}

function goBack() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('welcomePage').classList.add('active');
    stopQuoteAnimation();
}

function goToMain() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('mainPage').classList.add('active');
    startQuoteAnimation();
}

// ✅ PERSONALIZED LOGIN - "Hello [Name]! Welcome to DUO KITTU"
function handleLogin(event) {
    event.preventDefault();
    userData.name = document.getElementById('userName').value.trim();
    userData.dob = document.getElementById('dob').value;
    
    if (!userData.name) {
        alert('Please enter your name!');
        return;
    }
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // 🔥 PERSONALIZED WELCOME MESSAGE
    const welcomeMsg = `Hello ${userData.name}! Welcome to DUO KITTU Career Path 🚀`;
    document.getElementById('mainQuote').textContent = welcomeMsg;
    
    goToMain();
    showStep(1);
}

function setMinMaxDate() {
    const today = new Date();
    document.getElementById('dob').max = `${today.getFullYear()}-12-31`;
    document.getElementById('dob').min = '1970-01-01';
}

// Domain data (6-10 domains each branch)
const domainData = {
    ece: {
        software: {domains:[{name:'Embedded Systems',icon:'microchip'},{name:'VLSI Design',icon:'circuit-board'},{name:'IoT Development',icon:'network-wired'},{name:'Signal Processing',icon:'wave-square'},{name:'Wireless Communication',icon:'wifi'},{name:'FPGA Programming',icon:'code'},{name:'Automotive Electronics',icon:'car'},{name:'RF Engineering',icon:'broadcast-tower'},{name:'5G/6G Technology',icon:'tower-cell'}]},
        hardware: {domains:[{name:'PCB Design',icon:'layer-group'},{name:'Analog Circuit Design',icon:'plug'},{name:'Power Electronics',icon:'bolt'},{name:'Hardware Testing',icon:'vial'},{name:'ASIC Design',icon:'microchip'},{name:'Robotics Hardware',icon:'robot'},{name:'Sensor Technology',icon:'thermometer-half'},{name:'Control Systems',icon:'sliders'},{name:'Semiconductor Design',icon:'microchip'}]}
    },
    cse: {
        software: {domains:[{name:'Full Stack Development',icon:'laptop-code'},{name:'Data Science',icon:'chart-line'},{name:'Cloud Computing',icon:'cloud'},{name:'Cybersecurity',icon:'shield-alt'},{name:'DevOps Engineering',icon:'cogs'},{name:'AI/ML Engineering',icon:'brain'},{name:'Blockchain Development',icon:'link'},{name:'Mobile App Development',icon:'mobile-alt'},{name:'Big Data Engineering',icon:'database'}]},
        hardware: {domains:[{name:'Computer Hardware Design',icon:'desktop'},{name:'Network Hardware Engineering',icon:'network-wired'},{name:'Server Architecture',icon:'server'},{name:'Data Center Hardware',icon:'building'},{name:'GPU Programming',icon:'microchip'},{name:'Firmware Development',icon:'code'},{name:'Hardware Security',icon:'shield-alt'},{name:'Quantum Computing Hardware',icon:'atom'}]}
    },
    eee: {
        software: {domains:[{name:'Power Systems Software',icon:'bolt'},{name:'SCADA Systems',icon:'tachometer-alt'},{name:'Automation PLC Programming',icon:'industry'},{name:'Renewable Energy Software',icon:'solar-panel'},{name:'Smart Grid Technology',icon:'network-wired'},{name:'Electrical CAD Software',icon:'drafting-compass'},{name:'EV Charging Systems',icon:'charging-station'}]},
        hardware: {domains:[{name:'Power Electronics',icon:'bolt'},{name:'Electrical Machine Design',icon:'plug'},{name:'Control Systems Hardware',icon:'sliders'},{name:'Renewable Energy Systems',icon:'solar-panel'},{name:'High Voltage Engineering',icon:'bolt'},{name:'Switchgear Design',icon:'plug-circle-bolt'},{name:'Transformer Design',icon:'plug'},{name:'EV Battery Systems',icon:'car-battery'}]}
    },
    cyber: {
        software: {domains:[{name:'Ethical Hacking',icon:'skull-crossbones'},{name:'Penetration Testing',icon:'bug'},{name:'Security Operations (SOC)',icon:'shield-alt'},{name:'Malware Analysis',icon:'virus'},{name:'Digital Forensics',icon:'search'},{name:'Security Architecture',icon:'lock'},{name:'Threat Intelligence',icon:'eye'},{name:'Cloud Security',icon:'cloud'}]},
        hardware: {domains:[{name:'Hardware Security Modules',icon:'microchip'},{name:'Secure Hardware Design',icon:'shield-halved'},{name:'IoT Security Hardware',icon:'network-wired'},{name:'Cryptographic Hardware',icon:'key'},{name:'Secure Chip Design',icon:'microchip'},{name:'Tamper-Proof Hardware',icon:'lock'}]}
    },
    civil: {
        software: {domains:[{name:'BIM (Building Information Modeling)',icon:'drafting-compass'},{name:'Structural Analysis Software',icon:'calculator'},{name:'Project Management Software',icon:'clipboard-list'},{name:'GIS & Remote Sensing',icon:'map'},{name:'Construction Management',icon:'hard-hat'},{name:'Smart City Planning',icon:'city'},{name:'Earthquake Engineering Software',icon:'mountain-city'}]},
        hardware: {domains:[{name:'Surveying Equipment',icon:'ruler-combined'},{name:'Construction Machinery Design',icon:'tractor'},{name:'Structural Materials Testing',icon:'vial'},{name:'Geotechnical Instrumentation',icon:'mountain-sun'},{name:'Bridge Design Engineering',icon:'bridge'},{name:'Smart Building Sensors',icon:'thermometer-half'}]}
    },
    mech: {
        software: {domains:[{name:'CAD/CAM Design',icon:'drafting-compass'},{name:'FEA (Finite Element Analysis)',icon:'calculator'},{name:'Automotive Design Software',icon:'car'},{name:'Robotics Simulation',icon:'robot'},{name:'CFD (Computational Fluid Dynamics)',icon:'wind'},{name:'Product Lifecycle Management',icon:'clipboard-list'},{name:'EV Design Software',icon:'car-battery'}]},
        hardware: {domains:[{name:'Machine Design',icon:'cogs'},{name:'Automotive Engineering',icon:'car-side'},{name:'Robotics Hardware',icon:'robot'},{name:'Manufacturing Automation',icon:'industry'},{name:'Thermal Systems Design',icon:'fire'},{name:'EV Mechanical Systems',icon:'car-battery'},{name:'Additive Manufacturing',icon:'layer-group'},{name:'Mechatronics Systems',icon:'microchip'}]}
    },
    it: {
        software: {domains:[{name:'Web Development',icon:'globe'},{name:'Database Administration',icon:'database'},{name:'Network Administration',icon:'network-wired'},{name:'ERP Implementation',icon:'cogs'},{name:'IT Support & Services',icon:'headset'},{name:'Enterprise Architecture',icon:'building-columns'},{name:'Digital Transformation',icon:'laptop-code'}]},
        hardware: {domains:[{name:'Network Hardware Engineering',icon:'router'},{name:'Server Management',icon:'server'},{name:'Data Center Operations',icon:'building'},{name:'IT Infrastructure Design',icon:'plug'},{name:'Storage Solutions',icon:'hard-drive'},{name:'Cloud Hardware',icon:'cloud'}]}
    },
    ai: {
        software: {domains:[{name:'Machine Learning Engineer',icon:'brain'},{name:'Deep Learning',icon:'robot'},{name:'Natural Language Processing',icon:'comments'},{name:'Computer Vision',icon:'eye'},{name:'AI Research',icon:'flask'},{name:'MLOps Engineering',icon:'cogs'},{name:'Generative AI',icon:'wand-sparkles'},{name:'Reinforcement Learning',icon:'dice'}]},
        hardware: {domains:[{name:'AI Hardware Acceleration',icon:'microchip'},{name:'Edge AI Devices',icon:'network-wired'},{name:'GPU Computing for AI',icon:'memory'},{name:'Neuromorphic Computing',icon:'brain-circuit'},{name:'TPU Design',icon:'microchip'},{name:'AI Chip Architecture',icon:'processor'}]}
    }
};

// Domain details
const domainDetails = {
    'Embedded Systems': {
        skills: ['C/C++ Programming','RTOS Development','Microcontroller Programming','Hardware-Software Integration','I2C/SPI/UART Protocols','Firmware Optimization'],
        fundamentals: ['Digital Electronics','Microprocessor Architecture','Embedded C','Interfacing Protocols','Real-Time Systems','Power Management'],
        requirements: ['B.E/B.Tech ECE/EEE','2+ Embedded Projects','ARM/STM32 Knowledge','RTOS Certification','Debugging Tools','Protocol Analyzers'],
        scope: 'Excellent - 30% growth in India',
        salary: {fresher: '₹5-10 LPA', mid: '₹12-25 LPA', senior: '₹30-60 LPA'},
        companies: ['Texas Instruments','NXP Semiconductors','Bosch','Continental','Tata Elxsi','L&T Technology','Qualcomm','Robert Bosch'],
        books: ['"Embedded Systems" by Raj Kamal',"The Art of Electronics by Paul Horowitz","Programming Embedded Systems by Michael Barr"]
    },
    'Full Stack Development': {
        skills: ['React.js/Vue.js','Node.js/Express','MongoDB/PostgreSQL','RESTful APIs','Docker & Kubernetes','CI/CD Pipelines'],
        fundamentals: ['HTML/CSS/JavaScript','Data Structures','Database Design','API Development','Cloud Computing','DevOps'],
        requirements: ['B.E/B.Tech CSE/IT','3+ Full Stack Projects','GitHub Portfolio','AWS/Azure Certification','Docker Proficiency'],
        scope: 'Outstanding - 40% growth',
        salary: {fresher: '₹6-12 LPA', mid: '₹15-30 LPA', senior: '₹40-80 LPA'},
        companies: ['Google India','Microsoft India','Amazon India','Flipkart','Paytm','Zoho','Freshworks','TCS Digital'],
        books: ['"Clean Code" by Robert C. Martin',"You Don\'t Know JS by Kyle Simpson","Designing Data-Intensive Applications"]
    }
};

function getGenericDomainInfo(domainName) {
    return {
        skills: ['Advanced Programming','Domain Expertise','Problem Solving','Cloud Computing','Agile Methodology','Team Collaboration'],
        fundamentals: ['Core Concepts','Mathematical Foundations','System Design','Industry Standards','Case Studies'],
        requirements: ['B.E/B.Tech Relevant Branch','2+ Projects','Certifications','Internships','Communication Skills'],
        scope: 'Excellent growth in India 25-35%',
        salary: {fresher: '₹5-12 LPA', mid: '₹15-30 LPA', senior: '₹35-70 LPA'},
        companies: ['TCS','Infosys','Wipro','HCL','Cognizant','Tech Mahindra','L&T Infotech','Accenture'],
        books: ['"Clean Code" by Robert C. Martin',"Design Patterns by Gang of Four","Introduction to Algorithms"]
    };
}

// Navigation functions
function nextStep(currentStepNum) {
    const currentStep = document.querySelector(`.step[data-step="${currentStepNum}"]`);
    currentStep.classList.remove('active');
    userData.currentStep = currentStepNum + 1;
    if (currentStepNum === 4) {
        showDomains();
    } else {
        showStep(userData.currentStep);
    }
    updateProgressBar(userData.currentStep - 1);
}

function showStep(stepNum) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector(`.step[data-step="${stepNum}"]`).classList.add('active');
}

function updateProgressBar(activeStepIndex) {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.toggle('active', index <= activeStepIndex);
    });
}

// Option selection
document.addEventListener('click', function(e) {
    const card = e.target.closest('.option-card');
    if (!card) return;
    
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    const stepNum = parseInt(document.querySelector('.step.active').dataset.step);
    if (stepNum === 1) userData.qualification = card.dataset.qual;
    else if (stepNum === 2) userData.degree = card.dataset.degree;
    else if (stepNum === 3) userData.branch = card.dataset.branch;
    else if (stepNum === 4) userData.industry = card.dataset.industry;
});

function showDomains() {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step[data-step="5"]').classList.add('active');
    userData.currentStep = 5;
    
    const domains = domainData[userData.branch]?.[userData.industry]?.domains || [];
    document.getElementById('domainsGrid').innerHTML = domains.map(domain => `
        <div class="option-card domain-option" data-domain="${domain.name}">
            <i class="fas fa-${domain.icon}"></i><h3>${domain.name}</h3>
        </div>
    `).join('');
    document.querySelector('.confirm-btn').style.display = 'block';
    updateProgressBar(4);
}

function showDomainDetails() {
    const selectedDomain = document.querySelector('.domain-option.selected');
    if (!selectedDomain) return alert('Please select a domain!');
    
    userData.selectedDomain = selectedDomain.dataset.domain;
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('domainDetails').classList.add('active');
    populateDomainDetails();
}

document.addEventListener('click', function(e) {
    const domainCard = e.target.closest('.domain-option');
    if (domainCard) {
        document.querySelectorAll('.domain-option').forEach(c => c.classList.remove('selected'));
        domainCard.classList.add('selected');
    }
});

function populateDomainDetails() {
    const domainInfo = domainDetails[userData.selectedDomain] || getGenericDomainInfo(userData.selectedDomain);
    document.getElementById('domainTitle').textContent = userData.selectedDomain;
    
    document.getElementById('skillsList').innerHTML = domainInfo.skills.map(skill => `<li>${skill}</li>`).join('');
    document.getElementById('fundamentalsList').innerHTML = domainInfo.fundamentals.map(fund => `<li>${fund}</li>`).join('');
    document.getElementById('requirementsList').innerHTML = domainInfo.requirements.map(req => `<li>${req}</li>`).join('');
    
    document.getElementById('salaryInfo').innerHTML = `
        <h4>📈 Salary Progression (India)</h4>
        <p><strong>Fresher:</strong> ${domainInfo.salary.fresher}</p>
        <p><strong>2-5 Years:</strong> ${domainInfo.salary.mid}</p>
        <p><strong>Senior:</strong> ${domainInfo.salary.senior}</p>
        <p><em>${domainInfo.scope}</em></p>
    `;
    
    document.getElementById('companiesList').innerHTML = domainInfo.companies.map(company => `<li>${company}</li>`).join('');
    document.getElementById('booksList').innerHTML = domainInfo.books.map(book => `<li>${book}</li>`).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setMinMaxDate();
    startQuoteAnimation();
});
