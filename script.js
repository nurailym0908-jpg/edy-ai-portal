// ==================== ҰЛТТЫҚ ПЛАТФОРМА STATE-І ====================
let state = {
    studentName: "",
    studentGmail: "",
    userRole: "student", // 'student' немесе 'teacher'
    interests: [],
    joinedActivities: [],
    volunteerHours: 0,
    badges: [],
    activities: [], // Серверден немесе fallback-тен келеді
    activeTab: "dashboard",
    
    // Тест күйі
    quizAnswers: [],
    currentQuizIndex: 0
};

// Мұғалім Тексеру жүйесі үшін өтінімдер дерекқоры және ЖИ Авто-бағалауы
let pendingReviews = [
    { id: 1, name: "Арман Серіков", gmail: "arman@gmail.com", actTitle: "Eco Green Экологиялық Тобы", hours: 10, icon: "🌱", aiGrade: "A", aiFeedback: "ЖИ Тексеруі: Оқушы 10 сағаттық экологиялық жобаны (Eco Green) толық атқарды, ағаш егу жұмыстарын өте мазмұнды сипаттаған. Мақұлдауды ұсынамын." },
    { id: 2, name: "Аружан Марат", gmail: "aruzhan@gmail.com", actTitle: "Қызыл Жарты Ай Жастар Ұйымы", hours: 10, icon: "❤️", aiGrade: "A", aiFeedback: "ЖИ Тексеруі: Оқушы Қызыл Жарты Ай ұйымында алғашқы медициналық көмекті сәтті меңгерген. Сағаттарды толық растау ұсынылады." },
    { id: 3, name: "Мәди Санжар", gmail: "madi@gmail.com", actTitle: "Мектептің Баскетбол Құрамасы", hours: 0, icon: "🏀", aiGrade: "B", aiFeedback: "ЖИ Тексеруі: Оқушы баскетбол құрамасының дайындығына белсенді қатысқан. Қатысуы сенімді және толық расталды." }
];

// Тіркелген оқушылардың базасы (Тексеруші панеліне көрсету үшін)
let registeredStudents = [
    { name: "Арман Серіков", gmail: "arman@gmail.com", role: "Оқушы", clubsCount: 2, hours: 20 },
    { name: "Аружан Марат", gmail: "aruzhan@gmail.com", role: "Оқушы", clubsCount: 1, hours: 10 },
    { name: "Мәди Санжар", gmail: "madi@gmail.com", role: "Оқушы", clubsCount: 3, hours: 0 },
    { name: "Жанерке Нұрлан", gmail: "zhanerke@gmail.com", role: "Оқушы", clubsCount: 0, hours: 0 }
];

// Қызығушылықтар сәйкестігін анықтайтын тест (Академиялық емес мектеп сценарийлері)
const QUIZ_QUESTIONS = [
    {
        question: "Сабақтар аяқталған соң жұма күні бос уақытыңызды қалай өткізгіңіз келеді?",
        options: [
            { text: "Сыныптастармен спорт алаңында баскетбол немесе футбол ойнап", category: "Sports" },
            { text: "Музыка аспабында ойнап, сурет салып немесе театр сахнасын дайындап", category: "Arts" },
            { text: "Робот бөлшектерін құрастырып немесе бағдарламалау кодын жазып", category: "Tech" },
            { text: "Өзекті мектеп немесе әлеуметтік тақырыптарды қызу талқылап, debat ойнап", category: "Social" }
        ]
    },
    {
        question: "Мектепте үлкен қайырымдылық жәрмеңкесі өтуде. Қай рөлді таңдар едіңіз?",
        options: [
            { text: "Спорттық алаң мен логистиканы дайындап, қозғалысты бақылау", category: "Sports" },
            { text: "Концерттік бағдарламада өнер көрсету немесе баннерлер безендіру", category: "Arts" },
            { text: "Сандық тіркеу жүйесін жасап, қайырымдылық деректерін талдау", category: "Tech" },
            { text: "Қонақтардың алдында сөз сөйлеп, оларды еріктілікке үндеу", category: "Social" }
        ]
    },
    {
        question: "Бірлескен жобалық топта жұмыс істегенде сіздің басты артықшылығыңыз қандай?",
        options: [
            { text: "Команда рухын көтеріп, қысым астында физикалық жұмыс істей алу", category: "Sports" },
            { text: "Ерекше стиль, бірегей дизайн мен креативті шешімдер ұсыну", category: "Arts" },
            { text: "Күрделі есептерді шешу, жоспарлау және техникалық құралдарды баптау", category: "Tech" },
            { text: "Өз идеяңды нанымды жеткізу, пікірталастарда топты қорғау", category: "Social" }
        ]
    },
    {
        question: "Саябақты қалпына келтіруге бағытталған экологиялық шарада не істейсіз?",
        options: [
            { text: "Ағаш отырғызуға көмектесіп, ауыр физикалық жұмыстарды орындау", category: "Sports" },
            { text: "Саябақтың ландшафттық нобайын сызып, әдемі гүлдер таңдау", category: "Arts" },
            { text: "Саябақты автоматты суару жүйесінің сенсорларын бағдарламалау", category: "Tech" },
            { text: "Қалалық әкімшілікке өтінім жолдап, презентациясын қорғау", category: "Social" }
        ]
    },
    {
        question: "Профиліңіздің шкафында қай жетістік белгісінің жарқырап тұрғанын қалайсыз?",
        options: [
            { text: "🏆 Мектептің Үздік Спортшысы (MVP)", category: "Sports" },
            { text: "🎨 Мәдениет және Өнер майталманы", category: "Arts" },
            { text: "🤖 STEM Робототехника Пионері", category: "Tech" },
            { text: "🗣️ Элиталық Шешен және Дебатшы", category: "Social" }
        ]
    }
];

// Fallback үйірмелер тізімі (Қазақша)
const FALLBACK_ACTIVITIES = [
    {
        "id": "debate-club",
        "title": "Пікірсайыс клубы және Модельдік сот",
        "category": "clubs",
        "desc": "Сөз сөйлеу, зерттеу және көпшілік алдында сөйлеу өнерін меңгеріңіз. Аймақтық мектеп турнирлеріне дайындалып, қызықты сот процестеріне қатысыңыз.",
        "schedule": "Сейсенбі және Бейсенбі, 16:00 - 17:30",
        "location": "304-кабинет (Дәріс залы)",
        "memberCount": 24,
        "tags": ["Пікірсайыс", "Шешендік өнер", "Көшбасшылық"],
        "icon": "🗣️"
    },
    {
        "id": "robotics-club",
        "title": "Робототехника және AI зертханасы",
        "category": "clubs",
        "desc": "Автономды роботтарды құрастырыңыз, сымдарын жалғап, бағдарламалаңыз. VEX Robotics маусымдық жарыстарына қатысып, машиналық оқыту негіздерін үйреніңіз.",
        "schedule": "Дүйсенбі және Сәрсенбі, 15:30 - 17:30",
        "location": "STEM инженерлік зертханасы",
        "memberCount": 18,
        "tags": ["Робототехника", "Кодтау", "Инженерия"],
        "icon": "🤖"
    },
    {
        "id": "chess-guild",
        "title": "Гроссмейстерлік шахмат клубы",
        "category": "clubs",
        "desc": "Стратегиялық жоспарлау мен тактикалық дәлдікті дамытыңыз. Апталық турнирлер, шахмат жұмбақтары және гроссмейстерлердің кәсіби талдаулары болады.",
        "schedule": "Жұма, 15:30 - 17:00",
        "location": "Мектеп кітапханасының тыныш аймағы",
        "memberCount": 32,
        "tags": ["Strategy", "Chess", "Analytical"],
        "icon": "♟️"
    },
    {
        "id": "basketball-team",
        "title": "Мектептің Баскетбол Құрамасы",
        "category": "sports",
        "desc": "Жоғары қарқынды жаттығулар, қорғаныс тактикасы және лига чемпионаттары. Мектеп құрамасына қосылып, жоғары физикалық шыдамдылықты қалыптастырыңыз.",
        "schedule": "Дүйсенбі/Сәрсенбі/Жұма, 06:30 - 08:00",
        "location": "Бас спорт залы",
        "memberCount": 15,
        "tags": ["Баскетбол", "Фитнес", "Командалық жұмыс"],
        "icon": "🏀"
    },
    {
        "id": "soccer-varsity",
        "title": "Футбол Құрама Командасы",
        "category": "sports",
        "desc": "Ептілікті, стратегиялық орналасуды және физикалық төзімділікті арттырыңыз. Шабуыл тактикасын меңгеріп, мектепаралық лигада бақ сынаңыз.",
        "schedule": "Сейсенбі және Жұма, 16:00 - 18:00",
        "location": "Мектептің футбол алаңы",
        "memberCount": 22,
        "tags": ["Футбол", "Жеңіл атлетика", "Төзімділік"],
        "icon": "⚽"
    },
    {
        "id": "volleyball-club",
        "title": "Волейбол Үйірмесі (Co-Ed)",
        "category": "sports",
        "desc": "Жаңадан бастаушыларға да, тәжірибелі ойыншыларға да өте ыңғайлы. Допты беру, қабылдау және соққы жасауды үйреніп, демалыс күндері турнирлерге қатысыңыз.",
        "schedule": "Бейсенбі, 16:00 - 18:00",
        "location": "Сыртқы құм алаңдары",
        "memberCount": 20,
        "tags": ["Волейбол", "Реакция", "Демалыс"],
        "icon": "🏐"
    },
    {
        "id": "eco-green-team",
        "title": "Eco Green Экологиялық Тобы",
        "category": "volunteering",
        "desc": "Жергілікті экологиялық өзгерістерге жетекшілік етіңіз. Мектеп бойынша қайта өңдеуді ұйымдастырыңыз, бақшалар жасап, ағаш отырғызыңыз.",
        "schedule": "Сенбі, 10:00 - 13:00",
        "location": "Мектеп бағы және қалалық саябақтар",
        "memberCount": 45,
        "tags": ["Экология", "Бағбандық", "Қоғамдық қызмет"],
        "icon": "🌱"
    },
    {
        "id": "library-assistants",
        "title": "Кітапхана және Сауаттылық Кеңесі",
        "category": "volunteering",
        "desc": "Кітаптарды цифрландыруға көмектесіңіз, апталық кітап жәрмеңкелерін өткізіңіз және бастауыш сынып оқушыларына арналған үйірмелерді жүргізіңіз.",
        "schedule": "Сәрсенбі, 15:30 - 17:00",
        "location": "Мектеп кітапханасы",
        "memberCount": 14,
        "tags": ["Тьюторлық", "Кітаптар", "Білім беру"],
        "icon": "📚"
    },
    {
        "id": "red-cross-youth",
        "title": "Қызыл Жарты Ай Жастар Ұйымы",
        "category": "volunteering",
        "desc": "Алғашқы медициналық көмек көрсету, жүрек-өкпе реанимациясы бойынша сертификатталған дайындықтан өтіңіз. Қайырымдылық және денсаулық науқандарын басқарыңыз.",
        "schedule": "Дүйсенбі, 16:00 - 17:30",
        "location": "Биология зертханасы А",
        "memberCount": 28,
        "tags": ["Алғашқы көмек", "Еріктілік", "Денсаулық сақтау"],
        "icon": "❤️"
    },
    {
        "id": "school-concert",
        "title": "Жылдық көктемгі симфониялық концерт",
        "category": "events",
        "desc": "Орындаушылық өнердің ең жоғары деңгейіндегі шоу. Мектеп симфониялық оркестріне, хорына немесе заманауи джаз ансамбліне қосылып, сахнада өнер көрсетіңіз.",
        "schedule": "Тыңдау: 10 қыркүйек. Концерт: 15 мамыр.",
        "location": "Үлкен акт залы",
        "memberCount": 60,
        "tags": ["Музыка", "Орындаушылық өнер", "Оркестр"],
        "icon": "🎻"
    },
    {
        "id": "charity-gala",
        "title": "Көктемгі қайырымдылық гала-кеші",
        "category": "events",
        "desc": "Билеттерді тіркеуді, қайырымдылық аукциондарын және фуршетті ұйымдастырыңыз. Оқушылар басқаратын бұл салтанатты кештен түскен барлық қаражат баспаналарға беріледі.",
        "schedule": "Жоспарлау кездесулері: Жұма, 16:00. Кеш: 12 сәуір.",
        "location": "Салтанат залы",
        "memberCount": 25,
        "tags": ["Іс-шараларды жоспарлау", "Қайырымдылық", "Әлеуметтік қызмет"],
        "icon": "✨"
    },
    {
        "id": "esports-cup",
        "title": "EduAI мектепаралық киберспорт кубогы",
        "category": "events",
        "desc": "Командаңызды жинап, мектепаралық киберспорт лигасында мектеп намысын қорғаңыз. Тікелей трансляциялар мен кастингтер ұйымдастыру мүмкіндіктері кіреді.",
        "schedule": "Тіркелу мерзімі: 1 қараша. Ойындар: Жұма күндері.",
        "location": "Онлайн / STEM Hub алаңы",
        "memberCount": 50,
        "tags": ["Киберспорт", "Ойындар", "Медиа өндіріс"],
        "icon": "🎮"
    }
];

let activeQuizResultArchetype = ""; // Тест қорытындысындағы бағыт сақтау

// ==================== QOSYMSHANY ISKE QOSU ====================
document.addEventListener("DOMContentLoaded", () => {
    loadLocalState();
    initializeView();
    fetchActivities();
});

// localStorage-дан жүктеу
function loadLocalState() {
    state.studentName = localStorage.getItem("eduai_name") || "";
    state.studentGmail = localStorage.getItem("eduai_gmail") || "";
    state.userRole = localStorage.getItem("eduai_role") || "student";
    
    try {
        state.interests = JSON.parse(localStorage.getItem("eduai_interests")) || [];
        state.joinedActivities = JSON.parse(localStorage.getItem("eduai_joined")) || [];
        state.badges = JSON.parse(localStorage.getItem("eduai_badges")) || [];
    } catch (e) {
        state.interests = [];
        state.joinedActivities = [];
        state.badges = [];
    }
    
    state.volunteerHours = parseInt(localStorage.getItem("eduai_volunteer_hours")) || 0;
}

// Күйді localStorage-қа синхрондау
function syncLocalState() {
    localStorage.setItem("eduai_name", state.studentName);
    localStorage.setItem("eduai_gmail", state.studentGmail);
    localStorage.setItem("eduai_role", state.userRole);
    localStorage.setItem("eduai_interests", JSON.stringify(state.interests));
    localStorage.setItem("eduai_joined", JSON.stringify(state.joinedActivities));
    localStorage.setItem("eduai_badges", JSON.stringify(state.badges));
    localStorage.setItem("eduai_volunteer_hours", state.volunteerHours.toString());
}

// Бастапқы интерфейс панельдерін баптау
function initializeView() {
    const loginScreen = document.getElementById("guest-login-screen");
    const appShell = document.getElementById("app-shell");
    
    if (state.studentName && state.studentGmail) {
        loginScreen.style.display = "none";
        appShell.style.display = "flex";
        
        // Рөлге байланысты менюді жасыру/көрсету
        setupRoleLayout();
        
        // Деректерді интерфейске байлау
        updateProfileBindings();
        updateDashboardGreeting();
        updateStatsMetrics();
        
        if (state.userRole === "teacher") {
            renderTeacherReviews();
            renderTeacherStudents();
            updateTeacherMetrics();
        }
    } else {
        loginScreen.style.display = "flex";
        appShell.style.display = "none";
    }
}

// Рөлге сәйкес навигация мен менюлерді жүктеу
function setupRoleLayout() {
    const studentSidebar = document.getElementById("student-sidebar-menu");
    const teacherSidebar = document.getElementById("teacher-sidebar-menu");
    const studentMobile = document.getElementById("student-mobile-menu");
    const teacherMobile = document.getElementById("teacher-mobile-menu");
    
    if (state.userRole === "teacher") {
        studentSidebar.style.display = "none";
        studentMobile.style.display = "none";
        teacherSidebar.style.display = "flex";
        teacherMobile.style.display = "flex";
        switchSection("teacher-dashboard");
    } else {
        studentSidebar.style.display = "flex";
        studentMobile.style.display = "flex";
        teacherSidebar.style.display = "none";
        teacherMobile.style.display = "none";
        switchSection("dashboard");
    }
}

// Серверден іс-шараларды жүктеу
function fetchActivities() {
    fetch("/api/activities")
        .then(res => res.json())
        .then(data => {
            state.activities = data;
            renderAllViews();
        })
        .catch(err => {
            console.warn("Flask API-мен байланыс орнатылмады. Фаллбэк қазақша үйірмелер жүктеледі.");
            state.activities = FALLBACK_ACTIVITIES;
            renderAllViews();
        });
}

// Барлық панельдерді жаңартып шығу
function renderAllViews() {
    renderDashboardRecommendations();
    renderCatalog();
    renderProfileSchedule();
    renderProfileInterests();
    renderProfileBadges();
}

// ==================== РӨЛДЕРДІ ТАҢДАУ ЖӘНЕ ТІРКЕЛУ ====================

// Тіркелу кезінде оқушы/мұғалім рөлін таңдау
function selectUserRole(element, role) {
    const selectorLabels = document.querySelectorAll(".interest-checkbox-label");
    selectorLabels.forEach(lbl => {
        if(lbl.id === "role-option-student" || lbl.id === "role-option-teacher") {
            lbl.classList.remove("selected");
        }
    });
    
    element.classList.add("selected");
    state.userRole = role;
    
    // Егер мұғалім таңдалса, қызығушылықтар бөлімін жасыру
    const interestsBox = document.getElementById("student-interests-box");
    if (role === "teacher") {
        interestsBox.style.transition = "opacity 0.3s ease, height 0.3s ease";
        interestsBox.style.opacity = "0";
        setTimeout(() => interestsBox.style.display = "none", 300);
    } else {
        interestsBox.style.display = "block";
        setTimeout(() => interestsBox.style.opacity = "1", 50);
    }
}

// Оқушының қызығушылықтарын сұрыптау свитчі
function toggleInterestSelection(element) {
    element.classList.toggle("selected");
}

// Тіркелу формасын растап, жүйеге кіру
function submitGuestLogin() {
    const nameInput = document.getElementById("student-name-input").value.trim();
    const gmailInput = document.getElementById("student-gmail-input").value.trim();
    
    if (!nameInput) {
        showToast("⚠️ Тіркелу үшін аты-жөніңізді енгізіңіз!", "var(--accent-pink)");
        return;
    }
    
    if (!gmailInput || !gmailInput.includes("@")) {
        showToast("⚠️ Сауатты Gmail поштаңызды енгізіңіз!", "var(--accent-pink)");
        return;
    }
    
    let selectedInterests = [];
    
    if (state.userRole === "student") {
        const selectedInterestCards = document.querySelectorAll("#student-interests-box .interest-checkbox-label.selected");
        selectedInterestCards.forEach(card => {
            selectedInterests.push(card.getAttribute("data-value"));
        });
        
        if (selectedInterests.length === 0) {
            showToast("⚠️ Ең құрығанда бір қызығушылық бағытын таңдаңыз!", "var(--accent-pink)");
            return;
        }
    }
    
    // Жаңа тіркелуді сақтау
    state.studentName = nameInput;
    state.studentGmail = gmailInput;
    state.interests = selectedInterests;
    state.joinedActivities = [];
    state.volunteerHours = 0;
    
    if (state.userRole === "student") {
        state.badges = ["🎓 Сыныптан тыс зерттеуші"];
    } else {
        state.badges = ["🏫 Бас тексеруші (Тәрбие ісі)"];
    }
    
    syncLocalState();
    
    // Жүйеге кіру анимациясы
    const loginScreen = document.getElementById("guest-login-screen");
    const appShell = document.getElementById("app-shell");
    
    loginScreen.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    loginScreen.style.opacity = "0";
    loginScreen.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        loginScreen.style.display = "none";
        appShell.style.display = "flex";
        appShell.style.opacity = "0";
        appShell.style.transition = "opacity 0.4s ease";
        
        setupRoleLayout();
        updateProfileBindings();
        updateDashboardGreeting();
        updateStatsMetrics();
        fetchActivities();
        
        if (state.userRole === "teacher") {
            renderTeacherReviews();
            renderTeacherStudents();
            updateTeacherMetrics();
        }
        
        setTimeout(() => {
            appShell.style.opacity = "1";
            showToast(`🚀 EduAI платформасына қош келдіңіз, ${state.studentName}!`, "var(--accent-cyan)");
        }, 50);
        
    }, 400);
}

// ==================== ОҚУШЫ: БАҚЫЛАУ ТАҚТАСЫ ====================

// Қарсы алу сөзін оқушының деңгейіне қарай ЖИ Адаптивті сәулеті бойынша құбылту (Personalization)
function updateDashboardGreeting() {
    const greetingText = document.getElementById("dashboard-greeting");
    if (!greetingText) return;
    
    const countClubs = state.joinedActivities.length;
    const countHours = state.volunteerHours;
    
    if (countClubs === 0 && countHours === 0) {
        // 1-деңгей: Бастаушы деңгей (Beginner / Awaiting)
        greetingText.innerHTML = `Сәлем, ${state.studentName}! Сыныптан тыс іс-шараларды әлі зерттемедіңіз бе? Бүгін мектебіңізде сізді қызықтыратын жаңа үйірмелер ашылды!`;
    } else if (countClubs >= 3 || countHours >= 20) {
        // 3-деңгей: Озық оқушы / Көшбасшы деңгей (Leader / Advanced)
        greetingText.innerHTML = `Сәлем, ${state.studentName}! Сіз мектеп өмірінде нағыз батырсыз! Сыныптан тыс белсенділік көрсеткіштеріңіз өте жоғары. Көшбасшылық өтінімдеріңізді көріңіз.`;
    } else {
        // 2-деңгей: Белсенді орташа деңгей (Active / Intermediate)
        greetingText.innerHTML = `Сәлем, ${state.studentName}! Жақсы қарқын алып келесіз. Бүгін сіз қатысатын үйірмелерде жаңа дайындықтар мен оқиғалар күтуде. Кестеңізді тексеріңіз!`;
    }
}

// Оқушы статистикаларын жаңарту
function updateStatsMetrics() {
    const dbClubs = document.getElementById("stats-clubs-count");
    const dbVolHours = document.getElementById("stats-volunteer-hours");
    const dbBadges = document.getElementById("stats-badge-count");
    
    const profJoined = document.getElementById("profile-joined-count");
    const profVolLogged = document.getElementById("profile-volunteer-logged");
    const profBadges = document.getElementById("profile-badges-unlocked-count");
    
    const countClubs = state.joinedActivities.length;
    const countHours = state.volunteerHours;
    const countBadges = state.badges.length;
    
    if (dbClubs) dbClubs.innerText = countClubs.toString();
    if (dbVolHours) dbVolHours.innerText = countHours.toString();
    if (dbBadges) dbBadges.innerText = countBadges.toString();
    
    if (profJoined) profJoined.innerText = countClubs.toString();
    if (profVolLogged) profVolLogged.innerText = countHours.toString();
    if (profBadges) profBadges.innerText = countBadges.toString();
}

// Қызығушылықтарына сәйкес ұсыныстарды шығару
function renderDashboardRecommendations() {
    const container = document.getElementById("dashboard-recommendations-list");
    if (!container) return;
    
    container.innerHTML = "";
    
    let matches = [];
    
    state.activities.forEach(act => {
        let isMatch = false;
        
        state.interests.forEach(interest => {
            if (interest === "Sports" && act.category === "sports") isMatch = true;
            if (interest === "Arts" && act.tags.some(t => ["Музыка", "Орындаушылық өнер", "Оркестр"].includes(t))) isMatch = true;
            if (interest === "Tech" && act.tags.some(t => ["Робототехника", "Кодтау", "Инженерия", "Стратегия", "Киберспорт", "Ойындар"].includes(t))) isMatch = true;
            if (interest === "Social" && act.tags.some(t => ["Пікірсайыс", "Шешендік өнер", "Көшбасшылық", "Іс-шараларды жоспарлау"].includes(t))) isMatch = true;
            if (interest === "Volunteering" && act.category === "volunteering") isMatch = true;
        });
        
        if (isMatch && !state.joinedActivities.includes(act.id)) {
            matches.push(act);
        }
    });
    
    if (matches.length === 0) {
        matches = state.activities.filter(act => !state.joinedActivities.includes(act.id));
    }
    
    const displayList = matches.slice(0, 2);
    
    if (displayList.length === 0) {
        container.innerHTML = `
            <div class="glass-card" style="grid-column: span 2; text-align: center; padding: 30px;">
                <p style="color: var(--text-muted); font-size: 0.9rem;">🎉 Мектептегі барлық ұсынылған сыныптан тыс іс-шараларға тіркелдіңіз!</p>
            </div>
        `;
        return;
    }
    
    displayList.forEach(act => {
        const isJoined = state.joinedActivities.includes(act.id);
        const card = document.createElement("div");
        card.className = "glass-card activity-card";
        
        card.innerHTML = `
            <div class="card-category" style="color: var(--accent-cyan); font-weight: 700;">${act.category === 'clubs' ? 'ҮЙІРМЕ' : act.category === 'sports' ? 'СПОРТ' : act.category === 'volunteering' ? 'ЕРІКТІЛІК' : 'ІС-ШАРА'}</div>
            <h4 class="card-title">${act.icon} ${act.title}</h4>
            <p class="card-desc">${act.desc.substring(0, 105)}...</p>
            <div class="card-meta">
                <div class="meta-item">
                    📍 <span>${act.location.split(' ')[0]}</span>
                </div>
                <button class="glass-btn" style="padding: 6px 14px; font-size: 0.78rem; border-radius: 8px;" onclick="toggleJoinActivity('${act.id}')">
                    ${isJoined ? 'Шығу' : 'Тіркелу'}
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ==================== ОҚУШЫ: ІС-ШАРАЛАР КАТАЛОГЫ ====================

let activeCatalogFilter = "all";

function filterCatalog(category, buttonElement) {
    activeCatalogFilter = category;
    
    const tabs = document.querySelectorAll(".catalog-tab");
    tabs.forEach(t => t.classList.remove("active"));
    buttonElement.classList.add("active");
    
    renderCatalog();
}

function renderCatalog() {
    const container = document.getElementById("catalog-items-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    const filtered = state.activities.filter(act => {
        if (activeCatalogFilter === "all") return true;
        return act.category === activeCatalogFilter;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="glass-card" style="grid-column: span 3; text-align: center; padding: 40px;">
                <p style="color: var(--text-muted);">Бұл санатта мектепте әзірге белсенді іс-шаралар тіркелмеген.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(act => {
        const isJoined = state.joinedActivities.includes(act.id);
        const card = document.createElement("div");
        card.className = "glass-card activity-card";
        
        let badgesHtml = "";
        act.tags.forEach(tag => {
            badgesHtml += `<span class="glass-badge" style="font-size: 0.65rem; padding: 2px 8px; margin-right: 4px; margin-top: 4px;">${tag}</span>`;
        });
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <span class="glass-badge purple" style="font-size: 0.65rem;">${act.category === 'clubs' ? 'үйірме' : act.category === 'sports' ? 'спорт' : act.category === 'volunteering' ? 'еріктілік' : 'іс-шара'}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px;">
                    👤 ${act.memberCount} қатысушы
                </span>
            </div>
            
            <h4 class="card-title">${act.icon} ${act.title}</h4>
            <p class="card-desc">${act.desc}</p>
            
            <div style="margin-bottom: 16px; display: flex; flex-wrap: wrap;">
                ${badgesHtml}
            </div>
            
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    📅 <span>${act.schedule}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    📍 <span>${act.location}</span>
                </div>
            </div>
            
            <div class="card-meta" style="margin-top: auto;">
                <span style="font-size: 0.75rem; font-weight: 600; color: ${isJoined ? '#10b981' : 'var(--text-muted)'}">
                    ${isJoined ? '● Қатысуда' : 'Тіркелмеген'}
                </span>
                <button class="${isJoined ? 'glass-btn-secondary' : 'glass-btn'}" style="padding: 8px 16px; font-size: 0.8rem; border-radius: 10px;" onclick="toggleJoinActivity('${act.id}')">
                    ${isJoined ? 'Шығу' : 'Тіркелу'}
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Үйірмеге жазылу / шығу әрекеті
function toggleJoinActivity(activityId) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;
    
    const index = state.joinedActivities.indexOf(activityId);
    
    if (index > -1) {
        state.joinedActivities.splice(index, 1);
        
        if (activity.category === "volunteering") {
            state.volunteerHours = Math.max(0, state.volunteerHours - 10);
        }
        
        showToast(`❌ ${activity.title} үйірмесінен шықтыңыз`, "var(--accent-pink)");
    } else {
        state.joinedActivities.push(activityId);
        
        if (activity.category === "volunteering") {
            state.volunteerHours += 10;
            
            if (state.volunteerHours >= 20 && !state.badges.includes("🤝 Қоғам Батыры")) {
                state.badges.push("🤝 Қоғам Батыры");
                showToast("🏆 ЖЕТІСТІК АШЫЛДЫ: Қоғам Батыры медалі!", "linear-gradient(135deg, #10b981, #06b6d4)");
            }
        }
        
        if (state.joinedActivities.length >= 3 && !state.badges.includes("🏆 Белсенді Көшбасшы")) {
            state.badges.push("🏆 Белсенді Көшбасшы");
            showToast("🏆 ЖЕТІСТІК АШЫЛДЫ: Белсенді Көшбасшы медалі!", "linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))");
        }
        
        showToast(`✅ ${activity.title} үйірмесіне сәтті жазылдыңыз!`, "var(--accent-cyan)");
    }
    
    syncLocalState();
    updateStatsMetrics();
    updateDashboardGreeting(); // Сәлемдесу мәтінін адаптивті жаңарту
    renderAllViews();
}

// ==================== AI КЕҢЕСШІ (CHAT MENTOR) ====================

function sendMentorChatMessage() {
    const chatInput = document.getElementById("mentor-chat-input");
    const container = document.getElementById("mentor-chat-messages-container");
    if (!chatInput || !chatInput.value.trim()) return;
    
    const messageText = chatInput.value.trim();
    chatInput.value = "";
    
    appendChatBubble(messageText, "user");
    
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble bot typing-indicator-bubble";
    typingBubble.innerHTML = `<span style="display:inline-flex; gap: 4px;"><span class="dot-blink" style="animation: blink 1.4s infinite both;">●</span><span class="dot-blink" style="animation: blink 1.4s infinite both 0.2s;">●</span><span class="dot-blink" style="animation: blink 1.4s infinite both 0.4s;">●</span></span>`;
    container.appendChild(typingBubble);
    container.scrollTop = container.scrollHeight;
    
    fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: messageText,
            name: state.studentName,
            interests: state.interests
        })
    })
    .then(res => res.json())
    .then(data => {
        const typing = container.querySelector(".typing-indicator-bubble");
        if (typing) typing.remove();
        
        appendChatBubble(data.response, "bot");
    })
    .catch(err => {
        console.error(err);
        const typing = container.querySelector(".typing-indicator-bubble");
        if (typing) typing.remove();
        
        // Фаллбэк жауап (Қазақша)
        setTimeout(() => {
            const fallbackResponse = `Кеңесші: Өте жақсы сұрақ, ${state.studentName}! Сыныптан тыс іс-шаралар сіздің болашақ дағдыларыңыз бен көшбасшылық қасиетіңізді дамытады. Мен сізге бірінші кезекте 'Тест' бөліміне өтіп, қызығушылығыңызды нақтылауды немесе 'Каталогтан' белсенді үйірмелерді таңдауды ұсынамын!`;
            appendChatBubble(fallbackResponse, "bot");
        }, 600);
    });
}

function appendChatBubble(text, sender) {
    const container = document.getElementById("mentor-chat-messages-container");
    if (!container) return;
    
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/(\d\.\s)/g, '<br><strong>$1</strong>');
        
    bubble.innerHTML = formattedText;
    
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

function injectQuickQuestion(questionText) {
    const chatInput = document.getElementById("mentor-chat-input");
    if (chatInput) {
        chatInput.value = questionText;
        sendMentorChatMessage();
    }
}

function handleMentorInputKey(event) {
    if (event.key === "Enter") {
        sendMentorChatMessage();
    }
}

// ==================== ОҚУШЫ: ҚЫЗЫҒУШЫЛЫҚТАР ТЕСТІ ЖӘНЕ ЖИ ТАЛДАУЫ ====================

function startExtracurricularQuiz() {
    state.quizAnswers = [];
    state.currentQuizIndex = 0;
    
    document.getElementById("quiz-intro-box").style.display = "none";
    document.getElementById("quiz-results-box").style.display = "none";
    
    const questionBox = document.getElementById("quiz-question-box");
    questionBox.style.display = "block";
    
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const currQuestion = QUIZ_QUESTIONS[state.currentQuizIndex];
    
    const progressPercent = ((state.currentQuizIndex) / QUIZ_QUESTIONS.length) * 100;
    document.getElementById("quiz-fill-ratio").style.width = `${progressPercent}%`;
    
    document.getElementById("quiz-question-number").innerText = `Сұрақ ${state.currentQuizIndex + 1} / ${QUIZ_QUESTIONS.length}`;
    document.getElementById("quiz-question-text").innerText = currQuestion.question;
    
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";
    
    const letters = ["A", "B", "C", "D"];
    currQuestion.options.forEach((opt, idx) => {
        const optionItem = document.createElement("div");
        optionItem.className = "quiz-option-item";
        
        const prevAnswer = state.quizAnswers[state.currentQuizIndex];
        if (prevAnswer && prevAnswer.text === opt.text) {
            optionItem.classList.add("selected");
        }
        
        optionItem.innerHTML = `
            <div class="quiz-option-letter">${letters[idx]}</div>
            <div>${opt.text}</div>
        `;
        
        optionItem.onclick = () => selectQuizOption(opt, optionItem);
        container.appendChild(optionItem);
    });
    
    const prevBtn = document.getElementById("quiz-prev-btn");
    prevBtn.style.visibility = state.currentQuizIndex === 0 ? "hidden" : "visible";
    
    document.getElementById("quiz-next-btn").disabled = (state.quizAnswers[state.currentQuizIndex] === undefined);
}

function selectQuizOption(optionObj, element) {
    const items = document.querySelectorAll(".quiz-option-item");
    items.forEach(it => it.classList.remove("selected"));
    
    element.classList.add("selected");
    
    state.quizAnswers[state.currentQuizIndex] = optionObj;
    document.getElementById("quiz-next-btn").disabled = false;
}

function goToQuizNext() {
    if (state.currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        state.currentQuizIndex++;
        renderQuizQuestion();
    } else {
        calculateQuizResults();
    }
}

function goToQuizPrev() {
    if (state.currentQuizIndex > 0) {
        state.currentQuizIndex--;
        renderQuizQuestion();
    }
}

// ЖИ талдауы бойынша қызығушылықтар сәйкестігін есептеу және карточкаларды шығару
function calculateQuizResults() {
    const counts = { Sports: 0, Arts: 0, Tech: 0, Social: 0 };
    
    state.quizAnswers.forEach(ans => {
        counts[ans.category] = (counts[ans.category] || 0) + 1;
    });
    
    let highestCategory = "Sports";
    let max = 0;
    
    for (const cat in counts) {
        if (counts[cat] > max) {
            max = counts[cat];
            highestCategory = cat;
        }
    }
    
    activeQuizResultArchetype = highestCategory; // Бағытты жаһандық сақтау
    
    let title = "";
    let desc = "";
    let badge = "";
    let badgeIcon = "";
    
    if (highestCategory === "Sports") {
        title = "Шыдамды Спорт Көшбасшысы";
        desc = "ЖИ талдауы бойынша, сіздің ұйымдастырушылық және командалық рухыңыз өте жоғары. Сіз қысым астында жылдам әрекет етіп, физикалық төзімділікті талап ететін іс-шараларда топты оңай соңыңыздан ерте аласыз!";
        badge = "🏆 Мектептің Үздік Спортшысы (MVP)";
        badgeIcon = "🏀";
    } else if (highestCategory === "Arts") {
        title = "Креативті Шығармашылық Шебері";
        desc = "ЖИ қорытындысы бойынша, сіздің ландшафттық және шығармашылық жоспарлау деңгейіңіз басым. Сахналық өнерлер, эстетикалық безендірулер мен мәдени қайырымдылық іс-шаралары сіздің дарыныңызды ашуға ең қолайлы бағыттар болып табылады!";
        badge = "🎨 Мәдениет және Өнер майталманы";
        badgeIcon = "🎭";
    } else if (highestCategory === "Tech") {
        title = "Логикалық STEM Инженері";
        desc = "ЖИ аналитикасы сіздің логикалық-модельдік жүйелерге, бағдарламалауға және тактикалық есептерге бейімділігіңізді анықтады. Робототехника зертханасы, AI үйірмелері немесе шахмат турнирлері сіз үшін таптырмас орта!";
        badge = "🤖 STEM Робототехника Пионері";
        badgeIcon = "🤖";
    } else {
        title = "Стратегиялық Шешен және Белсенді";
        desc = "ЖИ сіздің бойыңыздан керемет шешендік өнер, rhetorical зияткерлік және дебаттық дағдыларды тапты. Мектепте дебат клубының өкілі немесе қайырымдылық акцияларын ұйымдастырушы ретінде сіз ең жоғары белсенділік көрсетесіз!";
        badge = "🗣️ Элиталық Шешен және Дебатшы";
        badgeIcon = "🗣️";
    }
    
    if (!state.badges.includes(badge)) {
        state.badges.push(badge);
        syncLocalState();
        updateStatsMetrics();
        renderProfileBadges();
    }
    
    document.getElementById("quiz-question-box").style.display = "none";
    const resultsBox = document.getElementById("quiz-results-box");
    resultsBox.style.display = "block";
    
    document.getElementById("quiz-archetype-title").innerText = title;
    document.getElementById("quiz-archetype-desc").innerText = desc;
    document.getElementById("quiz-badge-icon").innerText = badgeIcon;
    document.getElementById("quiz-badge-name").innerText = badge;
    
    // ЖИ ұсынған іс-шаралар карточкаларын динамикалық және толықтай интерактивті батырмаларымен салу
    renderQuizRecommendations();
    
    showToast(`🏆 Жана медаль ашылды: ${badge}!`, "linear-gradient(to right, var(--accent-cyan), var(--accent-purple))");
}

// Тест нәтижесіндегі ЖИ ұсыныстарын салу және олардың батырмаларын істету
function renderQuizRecommendations() {
    const container = document.getElementById("quiz-recommendations-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    let filteredRecs = [];
    
    if (activeQuizResultArchetype === "Sports") {
        filteredRecs = state.activities.filter(a => a.category === "sports");
    } else if (activeQuizResultArchetype === "Arts") {
        filteredRecs = state.activities.filter(a => a.tags.some(t => ["Музыка", "Орындаушылық өнер", "Оркестр"].includes(t)) || a.id === "charity-gala");
    } else if (activeQuizResultArchetype === "Tech") {
        filteredRecs = state.activities.filter(a => a.tags.some(t => ["Робототехника", "Кодтау", "Инженерия", "Стратегия", "Шахмат", "Киберспорт", "Ойындар"].includes(t)));
    } else { // Social / Intellectual
        filteredRecs = state.activities.filter(a => a.tags.some(t => ["Пікірсайыс", "Шешендік өнер", "Көшбасшылық"].includes(t)) || a.id === "charity-gala");
    }
    
    // Top 2 recommendations
    const displayRecs = filteredRecs.slice(0, 2);
    
    displayRecs.forEach(act => {
        const isJoined = state.joinedActivities.includes(act.id);
        const card = document.createElement("div");
        card.className = "glass-card activity-card";
        card.style.border = "1px solid rgba(255, 255, 255, 0.15)";
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span class="glass-badge purple" style="font-size: 0.65rem;">${act.category === 'clubs' ? 'үйірме' : act.category === 'sports' ? 'спорт' : act.category === 'volunteering' ? 'еріктілік' : 'іс-шара'}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">👤 ${act.memberCount} қатысушы</span>
            </div>
            <h4 class="card-title" style="font-size: 1.02rem;">${act.icon} ${act.title}</h4>
            <p class="card-desc" style="font-size: 0.78rem; margin-bottom: 12px; line-height:1.4;">${act.desc.substring(0, 95)}...</p>
            
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 16px; margin-top:auto;">
                <div>📅 ${act.schedule.split(',')[0]}</div>
                <div style="color: var(--accent-cyan); margin-top:2px;">📍 ${act.location}</div>
            </div>
            
            <button class="${isJoined ? 'glass-btn-secondary' : 'glass-btn'}" style="padding: 8px 12px; font-size: 0.78rem; border-radius: 8px;" onclick="toggleJoinActivity('${act.id}'); renderQuizRecommendations();">
                ${isJoined ? '✓ Жазылдыңыз' : (act.category === 'volunteering' || act.category === 'events' ? 'Іс-шараға қатысу' : 'Үйірмеге жазылу')}
            </button>
        `;
        container.appendChild(card);
    });
}

// ==================== ОҚУШЫ: МЕНІҢ ПОРТФОЛИОМ ====================

function updateProfileBindings() {
    const userInit = state.studentName ? state.studentName.charAt(0).toUpperCase() : "Ә";
    
    document.getElementById("sidebar-avatar").innerText = userInit;
    document.getElementById("sidebar-name").innerText = state.studentName;
    document.getElementById("mobile-top-avatar").innerText = userInit;
    
    const roleText = state.userRole === "teacher" ? "Тексеруші Мұғалім" : "Оқушы рөлі";
    document.getElementById("sidebar-role").innerText = roleText;
    
    // Оқушы профилін байлау
    const profAvatar = document.getElementById("profile-big-avatar");
    const profName = document.getElementById("profile-full-name");
    const profGmail = document.getElementById("profile-gmail-subtitle");
    
    if (profAvatar) profAvatar.innerText = userInit;
    if (profName) profName.innerText = state.studentName;
    if (profGmail) profGmail.innerText = `${state.studentGmail} | ${roleText} | 11-сынып`;
    
    // Мұғалім профилін байлау
    const teachAvatar = document.getElementById("teacher-big-avatar");
    const teachName = document.getElementById("teacher-full-name");
    const teachGmail = document.getElementById("teacher-gmail-subtitle");
    
    if (teachAvatar) teachAvatar.innerText = userInit;
    if (teachName) teachName.innerText = state.studentName;
    if (teachGmail) teachGmail.innerText = `${state.studentGmail} | Мектеп Тексерушісі (Модератор)`;
}

function renderProfileBadges() {
    const container = document.getElementById("profile-unlocked-badges");
    if (!container) return;
    
    container.innerHTML = "";
    
    state.badges.forEach(badge => {
        const badgeEl = document.createElement("span");
        badgeEl.className = "glass-badge";
        
        if (badge.includes("Үздік") || badge.includes("Батыры")) badgeEl.className = "glass-badge cyan";
        if (badge.includes("Өнер") || badge.includes("Майталманы")) badgeEl.className = "glass-badge pink";
        if (badge.includes("STEM") || badge.includes("Пионері")) badgeEl.className = "glass-badge purple";
        
        badgeEl.style.marginRight = "6px";
        badgeEl.style.marginTop = "6px";
        badgeEl.innerText = badge;
        
        container.appendChild(badgeEl);
    });
}

function renderProfileInterests() {
    const container = document.getElementById("profile-interests-chips");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (state.interests.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Мұғалімдер үшін қызығушылықтар көрсетілмейді.</p>`;
        return;
    }
    
    state.interests.forEach(interest => {
        const chip = document.createElement("span");
        chip.className = "interest-tag";
        
        let prefix = "🏷️";
        if (interest === "Sports") prefix = "🏅 Спорт";
        if (interest === "Arts") prefix = "🎭 Өнер";
        if (interest === "Tech") prefix = "🤖 Технология";
        if (interest === "Social") prefix = "🗣️ Дебат";
        if (interest === "Volunteering") prefix = "🤝 Еріктілік";
        
        chip.innerText = `${prefix}`;
        container.appendChild(chip);
    });
}

function renderProfileSchedule() {
    const container = document.getElementById("profile-schedule-timeline");
    if (!container) return;
    
    container.innerHTML = "";
    
    const joinedList = state.activities.filter(act => state.joinedActivities.includes(act.id));
    
    if (joinedList.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px 10px;">
                <p style="color: var(--text-muted); font-size: 0.82rem;">Тіркелген белсенді іс-шаралар кестесі бос.</p>
                <button class="glass-btn" style="padding: 6px 14px; font-size: 0.78rem; border-radius: 8px; margin-top: 10px;" onclick="switchSection('catalog')">Үйірмеге жазылу</button>
            </div>
        `;
        return;
    }
    
    joinedList.forEach(act => {
        const scheduleItem = document.createElement("div");
        scheduleItem.style.display = "flex";
        scheduleItem.style.justifyContent = "space-between";
        scheduleItem.style.alignItems = "center";
        scheduleItem.style.padding = "12px";
        scheduleItem.style.background = "rgba(255, 255, 255, 0.02)";
        scheduleItem.style.border = "1px solid var(--glass-border)";
        scheduleItem.style.borderRadius = "12px";
        
        scheduleItem.innerHTML = `
            <div>
                <h4 style="font-size: 0.88rem; font-family: var(--font-outfit); font-weight: 600;">${act.icon} ${act.title}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">📅 ${act.schedule}</p>
                <p style="font-size: 0.72rem; color: var(--accent-cyan);">📍 ${act.location}</p>
            </div>
            <button class="glass-btn-secondary" style="padding: 6px 10px; font-size: 0.72rem; border-radius: 8px; color: var(--accent-pink); border-color: rgba(236,72,153,0.15);" onclick="toggleJoinActivity('${act.id}')">
                Шығу
            </button>
        `;
        
        container.appendChild(scheduleItem);
    });
}

// ==================== МҰҒАЛІМ-ТЕКСЕРУШІ ФУНКЦИОНАЛЫ ЖӘНЕ ЖИ АВТО-БАҒАЛАУЫ ====================

// Мұғалім статистикаларын жаңарту
function updateTeacherMetrics() {
    const teachStudentsCount = document.getElementById("teacher-stats-students");
    const teachHoursCount = document.getElementById("teacher-stats-hours");
    const teachPendingCount = document.getElementById("teacher-stats-pending");
    
    let totalHours = 280;
    registeredStudents.forEach(st => {
        totalHours += st.hours;
    });
    
    if (teachStudentsCount) teachStudentsCount.innerText = (registeredStudents.length + 1).toString();
    if (teachHoursCount) teachHoursCount.innerText = `${totalHours} сағат`;
    if (teachPendingCount) teachPendingCount.innerText = pendingReviews.length.toString();
}

// Тексеру өтінімдерін және ЖИ-дің автоматты бағалауын/рецензияларын салу
function renderTeacherReviews() {
    const container = document.getElementById("teacher-review-list");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (pendingReviews.length === 0) {
        container.innerHTML = `
            <div class="glass-card" style="text-align: center; padding: 30px;">
                <p style="color: var(--text-muted); font-size: 0.95rem;">🎉 Қазіргі уақытта тексерілуі тиіс жаңа оқушы өтінімдері жоқ.</p>
            </div>
        `;
        return;
    }
    
    pendingReviews.forEach(rev => {
        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.flexDirection = "column";
        item.style.gap = "12px";
        item.style.padding = "20px";
        item.style.background = "rgba(255, 255, 255, 0.02)";
        item.style.border = "1px solid var(--glass-border)";
        item.style.borderRadius = "20px";
        
        let subtext = rev.hours > 0 ? `Еріктілік сағаттарын растау өтінімі: <strong>${rev.hours} сағат</strong>` : "Үйірмеге жазылуды растау өтінімі";
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="font-size: 1rem; font-family: var(--font-outfit); font-weight: 600;">👨‍🎓 ${rev.name} (${rev.gmail})</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Бағыт: ${rev.icon} ${rev.actTitle}</p>
                    <p style="font-size: 0.8rem; color: var(--accent-cyan); margin-top: 2px;">${subtext}</p>
                </div>
                
                <div style="display: flex; gap: 8px;">
                    <button class="glass-btn" style="padding: 8px 14px; font-size: 0.78rem; border-radius: 8px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-color: rgba(16,185,129,0.3);" onclick="teacherApproveReview(${rev.id})">
                        Мақұлдау
                    </button>
                    <button class="glass-btn-secondary" style="padding: 8px 14px; font-size: 0.78rem; border-radius: 8px; color: var(--accent-pink); border-color: rgba(236,72,153,0.15);" onclick="teacherRejectReview(${rev.id})">
                        Бас тарту
                    </button>
                </div>
            </div>
            
            <!-- ЖИ-дің автоматты Тексеру, Түзету және Рецензия блогы (AI Reflection Auto-Grading & Review) -->
            <div style="padding: 12px 16px; background: rgba(99, 102, 241, 0.06); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; font-size: 0.8rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="color: var(--accent-cyan); font-weight: 700;">🤖 Жасанды Интеллект Авто-Тексеруі:</span>
                    <span class="glass-badge" style="background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.3); color: #34d399; font-size:0.68rem;">Ұсынылатын баға: ${rev.aiGrade}</span>
                </div>
                <p style="color: var(--text-muted); line-height: 1.45;">${rev.aiFeedback}</p>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Өтінімді мақұлдау
function teacherApproveReview(id) {
    const rev = pendingReviews.find(r => r.id === id);
    if (!rev) return;
    
    // Өтінімдер тізімінен алып тастау
    pendingReviews = pendingReviews.filter(r => r.id !== id);
    
    // Егер оқушы тізімде болса, оның сағаттарын қосу
    const student = registeredStudents.find(s => s.name === rev.name);
    if (student) {
        student.hours += rev.hours;
    }
    
    // Егер мұғалім өзінің оқушы ретіндегі парақшасын тексеріп жатса
    if (rev.name === state.studentName) {
        state.volunteerHours += rev.hours;
        syncLocalState();
        updateStatsMetrics();
        updateDashboardGreeting();
    }
    
    showToast(`✅ ${rev.name} үшін ${rev.actTitle} белсенділігі мақұлданды!`, "linear-gradient(135deg, #10b981, #06b6d4)");
    
    renderTeacherReviews();
    renderTeacherStudents();
    updateTeacherMetrics();
}

// Өтінімнен бас тарту
function teacherRejectReview(id) {
    const rev = pendingReviews.find(r => r.id === id);
    if (!rev) return;
    
    pendingReviews = pendingReviews.filter(r => r.id !== id);
    showToast(`❌ ${rev.name} өтінімі қабылданбады.`, "var(--accent-pink)");
    
    renderTeacherReviews();
    updateTeacherMetrics();
}

// Оқушылар кестесін көрсету
function renderTeacherStudents() {
    const tbody = document.getElementById("teacher-students-table-body");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    let displayList = [...registeredStudents];
    if (state.userRole === "student") {
        displayList.unshift({
            name: `${state.studentName} (СІЗ)`,
            gmail: state.studentGmail,
            role: "Оқушы",
            clubsCount: state.joinedActivities.length,
            hours: state.volunteerHours
        });
    }
    
    displayList.forEach(st => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--glass-border)";
        tr.style.transition = "0.2s";
        
        tr.innerHTML = `
            <td style="padding: 12px 16px; font-weight:600;">${st.name}</td>
            <td style="padding: 12px 16px; color:var(--text-muted);">${st.gmail}</td>
            <td style="padding: 12px 16px;"><span class="glass-badge" style="font-size:0.7rem;">${st.role}</span></td>
            <td style="padding: 12px 16px; text-align:center;">${st.clubsCount} үйірме</td>
            <td style="padding: 12px 16px; font-weight:700; color:var(--accent-cyan); text-align:center;">${st.hours} сағат</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Мұғалімнің жаңа іс-шара қосу құралы
function teacherCreateActivity() {
    const title = document.getElementById("add-act-title").value.trim();
    const category = document.getElementById("add-act-category").value;
    const desc = document.getElementById("add-act-desc").value.trim();
    const schedule = document.getElementById("add-act-schedule").value.trim();
    const location = document.getElementById("add-act-location").value.trim();
    
    if (!title || !desc || !schedule || !location) {
        showToast("⚠️ Өтінеміз, барлық міндетті жолдарды толтырыңыз!", "var(--accent-pink)");
        return;
    }
    
    const newAct = {
        id: "custom-" + Date.now(),
        title: title,
        category: category,
        desc: desc,
        schedule: schedule,
        location: location,
        memberCount: 0,
        tags: [category === "clubs" ? "Ақыл-ой" : category === "sports" ? "Спорт" : category === "volunteering" ? "Қоғамдық" : "Мектеп"],
        icon: category === "clubs" ? "🧠" : category === "sports" ? "⚽" : category === "volunteering" ? "🤝" : "✨"
    };
    
    state.activities.unshift(newAct);
    
    document.getElementById("add-act-title").value = "";
    document.getElementById("add-act-desc").value = "";
    document.getElementById("add-act-schedule").value = "";
    document.getElementById("add-act-location").value = "";
    
    showToast(`✅ '${title}' іс-шарасы сәтті қосылды және оқушылар каталогына енгізілді!`, "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))");
    
    renderAllViews();
}

// ==================== СЕКЦИЯЛАР АРАСЫНДА ШАРЛАУ (ROUTING) ====================

function switchSection(sectionId) {
    state.activeTab = sectionId;
    
    const sections = document.querySelectorAll(".app-section");
    sections.forEach(sec => sec.classList.remove("active"));
    
    const activeSec = document.getElementById(`section-${sectionId}`);
    if (activeSec) activeSec.classList.add("active");
    
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(mi => mi.classList.remove("active"));
    
    const activeMenuItem = document.getElementById(`nav-${sectionId}`);
    if (activeMenuItem) activeMenuItem.classList.add("active");
    
    const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
    mobileMenuItems.forEach(mmi => mmi.classList.remove("active"));
    
    const activeMobileMenuItem = document.getElementById(`mobile-nav-${sectionId}`);
    if (activeMobileMenuItem) activeMobileMenuItem.classList.add("active");
    
    const headerTitle = document.getElementById("page-title");
    if (headerTitle) {
        let titleText = "Бақылау тақтасы";
        if (sectionId === "mentor") titleText = "AI Кеңесші сынып бөлмесі";
        if (sectionId === "tests") titleText = "Қызығушылықтар сәйкестігі тесті";
        if (sectionId === "catalog") titleText = "Сыныптан тыс іс-шаралар каталогы";
        if (sectionId === "profile") titleText = "Менің сыныптан тыс портфолиом";
        if (sectionId === "teacher-dashboard") titleText = "Мұғалім-Тексеруші басты беті";
        if (sectionId === "teacher-review") titleText = "Оқушы белсенділіктерін тексеру";
        if (sectionId === "teacher-students") titleText = "Мектеп оқушыларының дерекқоры";
        if (sectionId === "teacher-profile") titleText = "Мұғалімнің жеке кабинеті";
        
        headerTitle.innerText = titleText;
    }
}

// ==================== ЖҮЙЕДЕН ШЫҒУ (LOGOUT) ====================
function logout() {
    localStorage.removeItem("eduai_name");
    localStorage.removeItem("eduai_gmail");
    localStorage.removeItem("eduai_role");
    localStorage.removeItem("eduai_interests");
    localStorage.removeItem("eduai_joined");
    localStorage.removeItem("eduai_badges");
    localStorage.removeItem("eduai_volunteer_hours");
    
    loadLocalState();
    initializeView();
    
    showToast("🚪 Жүйеден сәтті шықтыңыз. Қайта тіркелу қажет.", "var(--accent-indigo)");
}

// ==================== ТОАСТ ХАБАРЛАМАЛАР ЖҮЙЕСІ ====================

function showToast(text, backgroundGradient) {
    const toast = document.getElementById("toast-message");
    if (!toast) return;
    
    toast.innerHTML = text;
    toast.className = "glass-toast";
    
    if (backgroundGradient) {
        if (backgroundGradient.startsWith("linear-gradient")) {
            toast.style.background = backgroundGradient;
        } else {
            toast.style.border = `1px solid ${backgroundGradient}`;
            toast.style.boxShadow = `0 0 20px ${backgroundGradient}40`;
        }
    }
    
    toast.style.display = "flex";
    
    setTimeout(() => {
        toast.style.animation = "toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse forwards";
        setTimeout(() => {
            toast.style.display = "none";
            toast.style.animation = "";
        }, 300);
    }, 4000);
}

function showNotificationToast() {
    showToast("🔔 <strong>Жаңа хабарландыру:</strong> Футбол құрамасына іріктеу кезеңі ертең таңертең басталады!", "var(--accent-indigo)");
}
