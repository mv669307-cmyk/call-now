// =========================================================================
// GLOBAL NAVIGATION AND THEME FUNCTIONS (Used on ALL Pages)
// =========================================================================

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("show");
    applyNavTheme();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("preferredTheme", isDark ? "dark" : "light");
    applyNavTheme();
}

function applyNavTheme() {
    const navMenu = document.getElementById("navMenu");
    const isDarkBody = document.body.classList.contains("dark-mode");
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        if (isDarkBody) {
            navMenu.style.backgroundColor = 'var(--dark-nav-mobile-bg)';
            navMenu.querySelectorAll('a').forEach(link => {
                link.style.color = 'var(--dark-nav-mobile-link)';
            });
            navMenu.querySelector('.theme-toggle span').style.color = 'var(--dark-nav-mobile-link)';
        } else {
            navMenu.style.backgroundColor = 'var(--light-nav-mobile-bg)';
            navMenu.querySelectorAll('a').forEach(link => {
                link.style.color = 'var(--light-nav-mobile-link)';
            });
            navMenu.querySelector('.theme-toggle span').style.color = 'var(--light-nav-mobile-link)';
        }
    } else {
        navMenu.style.backgroundColor = '';
        navMenu.querySelectorAll('a').forEach(link => {
            link.style.color = 'white';
            link.style.borderBottomColor = '';
        });
        navMenu.querySelector('.theme-toggle span').style.color = 'white';
    }
}

// =========================================================================
// HOMEPAGE SPECIFIC LOGIC (index.html)
// =========================================================================

// Popup functions
function showPopup() {
    const popup = document.getElementById('offlinePopup');
    if (popup) popup.classList.add('show');
}

function hidePopup() {
    const popup = document.getElementById('offlinePopup');
    if (popup) popup.classList.remove('show');
}

let currentUserIsOnline = false;
let count = 20;
let countdownInterval = null;

function startInitialCountdown() {
    const videoBtn = document.getElementById('videoCallBtn');
    const chatBtn = document.getElementById('chatNowBtn');
    
    if (!videoBtn || !chatBtn) return;

    if (countdownInterval === null) {
        countdownInterval = setInterval(() => {
            count--;
            videoBtn.textContent = `Video Call (wait...${count})`;
            chatBtn.textContent = `Chat Now (wait...${count})`;

            if (count <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = "finished";
                videoBtn.textContent = "Video Call";
                chatBtn.textContent = "Chat Now";
                videoBtn.disabled = false;
                chatBtn.disabled = false;
                videoBtn.classList.add("enabled");
                chatBtn.classList.add("enabled");

                videoBtn.removeEventListener("click", handleCallButtonClick);
                chatBtn.removeEventListener("click", handleCallButtonClick);
                videoBtn.addEventListener("click", handleCallButtonClick);
                chatBtn.addEventListener("click", handleCallButtonClick);
            }
        }, 1000);
    }
}

function handleCallButtonClick() {
    if (currentUserIsOnline) {
        localStorage.setItem("preferredTheme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        window.location.href = "second-page.html";
    } else {
        showPopup();
    }
}

const names = ["Priya Sharma", "Anjali Singh", "Kashvi jain", "Anaya Singh", "Kiara Reddy", "Shanaya Mehta", "Myra Patel", "Siya Gupta", "Zara Khan", "Aditi Rao", "Ria Das", "Jia Verma", "Neha Verma", "Ritika Mehta", "Pooja Gupta", "Kajal Yadav", "Divya Rai", "Sakshi Dubey", "Aisha Khan", "Sana Ali"];
const cities = ["Delhi", "Mumbai", "Kolkata", "Bangalore", "Pune", "Chennai", "Jaipur", "Kolkata", "Hyderabad", "Ahmedabad", "Delhi", "Mumbai", "Kolkata", "Bangalore", "Pune", "Chennai", "Jaipur", "Hyderabad", "Ahmedabad", "Lucknow"];
const imageSources = [
    "img/d1.webp", "img/d2.webp", "img/d3.webp", "img/d4.webp", "img/d5.webp", "img/d6.webp", "img/d7.webp", "img/d8.webp", "img/d9.webp", "img/d10.webp", 
    "img/d11.webp", "img/d12.webp", "img/d13.webp", "img/d14.webp", "img/d15.webp", "img/d16.webp", "img/d17.webp", "img/d18.webp", "img/d19.webp", "img/d20.webp"
];

function loadRandomProfile() {
    const img = document.getElementById("profileImg");
    const nameCity = document.getElementById("nameCity");
    const status = document.getElementById("status");
    const videoBtn = document.getElementById('videoCallBtn');
    const chatBtn = document.getElementById('chatNowBtn');

    if (!img || !nameCity || !status) return;

    const randName = names[Math.floor(Math.random() * names.length)];
    const randCity = cities[Math.floor(Math.random() * cities.length)];
    const randImg = imageSources[Math.floor(Math.random() * imageSources.length)];
    currentUserIsOnline = Math.random() < 0.6;

    img.src = randImg;
    nameCity.textContent = `${randName}, ${randCity}`;
    status.textContent = currentUserIsOnline ? "Online" : "Offline";
    status.className = "status " + (currentUserIsOnline ? "online" : "offline");

    if (countdownInterval === "finished") {
        if(videoBtn) videoBtn.disabled = false;
        if(chatBtn) chatBtn.disabled = false;
        if(videoBtn) videoBtn.classList.add("enabled");
        if(chatBtn) chatBtn.classList.add("enabled");
    } else {
        if(videoBtn) videoBtn.disabled = true;
        if(chatBtn) chatBtn.disabled = true;
        if(videoBtn) videoBtn.classList.remove("enabled");
        if(chatBtn) chatBtn.classList.remove("enabled");
    }
}


// =========================================================================
// SECOND-PAGE.HTML (App Icons) SPECIFIC LOGIC
// =========================================================================

function redirectToChat() {
    window.location.href = "chat-page.html";
}

function startAppCountdown() {
    const boxes = document.querySelectorAll(".chat-box");
    if (boxes.length === 0) return;

    const countdownOptions = [15, 25, 30, 40]; 

    boxes.forEach((box) => {
        let countdown = countdownOptions[Math.floor(Math.random() * countdownOptions.length)];
        const button = box.querySelector("button");
        const countdownEl = box.querySelector(".countdown");
        
        button.disabled = true;
        countdownEl.textContent = `Chat in ${countdown} seconds`;

        const interval = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(interval);
                countdownEl.style.display = "none";
                button.disabled = false;
                button.addEventListener("click", redirectToChat);
            } else {
                countdownEl.textContent = `Chat in ${countdown} seconds`;
            }
        }, 1000);
    });
}

// =========================================================================
// CHAT-PAGE.HTML (Profile Grid/Progress Bar) SPECIFIC LOGIC
// =========================================================================

const girlProfiles = [
    { name: "Priya", city: "Mumbai", img: "img/d20.webp", isOnline: true }, { name: "Anjali", city: "Delhi", img: "img/d19.webp", isOnline: true }, { name: "Neha", city: "Bangalore", img: "img/d18.webp", isOnline: true }, { name: "Sonia", city: "Hyderabad", img: "img/d17.webp", isOnline: true }, 
    { name: "Riya", city: "Chennai", img: "img/d16.webp", isOnline: true }, { name: "Pooja", city: "Kolkata", img: "img/d15.webp", isOnline: true }, { name: "Divya", city: "Pune", img: "img/d14.webp", isOnline: true }, { name: "Kavita", city: "Ahmedabad", img: "img/d13.webp", isOnline: true }, 
    { name: "Meera", city: "Jaipur", img: "img/d12.webp", isOnline: true }, { name: "Shreya", city: "Lucknow", img: "img/d11.webp", isOnline: true }, { name: "Tanvi", city: "Chandigarh", img: "img/d10.webp", isOnline: true }, { name: "Isha", city: "Bhopal", img: "img/d9.webp", isOnline: true }
];

function createProfileCard(profile) {
    const card = document.createElement("div");
    card.className = "profile-card hidden-placeholder"; 
    
    card.addEventListener('click', () => {
        localStorage.setItem('selectedGirlProfile', JSON.stringify(profile)); 
        window.location.href = "chat-interface.html"; 
    });

    card.innerHTML = `
        <div class="shimmer-effect"></div>
        <img src="${profile.img}" alt="${profile.name}" class="profile-img">
        <div class="status ${profile.isOnline ? 'online' : 'offline'}">${profile.isOnline ? 'Online' : 'Offline'}</div>
        <div class="profile-name">${profile.name}</div>
        <div class="profile-city">${profile.city}</div>
    `;
    return card;
}

function loadProfilesWithProgressBar() {
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    const profilesBox = document.getElementById('profilesBox');
    const profilesContainer = document.getElementById('profilesContainer');
    const girlBusyAlert = document.getElementById('girlBusyAlert');
    const findSecretGirlsBtn = document.getElementById('findSecretGirlsBtn');

    if (!progressBarContainer || !profilesBox || !profilesContainer || !findSecretGirlsBtn) return;

    if (girlBusyAlert) {
        girlBusyAlert.style.display = 'flex';
    }
    findSecretGirlsBtn.style.display = 'none';

    progressBarContainer.style.display = 'flex';
    profilesBox.style.display = 'block';
    profilesContainer.innerHTML = ''; 

    const shimmerPlaceholders = [];
    for (let i = 0; i < girlProfiles.length; i++) {
        const placeholder = createProfileCard(girlProfiles[i]);
        placeholder.classList.add('hidden-placeholder');
        profilesContainer.appendChild(placeholder);
        shimmerPlaceholders.push(placeholder);
    }

    let progress = 0;
    const totalDuration = 10000;
    const totalSteps = 100;
    const intervalTime = totalDuration / totalSteps;
    
    const revealStartPercent = 25;
    const profilesToRevealCount = girlProfiles.length;
    const percentageRangeForReveal = totalSteps - revealStartPercent;
    
    const progressInterval = setInterval(() => {
        if (progress <= totalSteps) {
            if(progressBar) progressBar.style.width = progress + '%';
            if(progressPercentage) progressPercentage.textContent = progress + '%';

            // Set text color for progress percentage based on theme
            if (document.body.classList.contains('dark-mode')) {
                if(progressText) progressText.style.color = 'var(--dark-text)';
            } else {
                if(progressText) progressText.style.color = 'var(--light-text)';
            }

            // Profile Reveal Logic
            if (progress >= revealStartPercent) {
                const progressInRevealPhase = progress - revealStartPercent;
                const profilesToShow = Math.min(
                    profilesToRevealCount,
                    Math.floor((progressInRevealPhase / percentageRangeForReveal) * profilesToRevealCount)
                );

                for (let i = 0; i < profilesToShow; i++) {
                    const card = shimmerPlaceholders[i];
                    if (card && card.classList.contains('hidden-placeholder')) {
                        card.classList.remove('hidden-placeholder');
                        card.classList.add('visible');
                    }
                }
            }
            progress++;
        } else {
            clearInterval(progressInterval);
            shimmerPlaceholders.forEach(card => {
                card.classList.remove('hidden-placeholder');
                card.classList.add('visible');
            });
            progressBarContainer.style.display = 'none';
            findSecretGirlsBtn.style.display = 'block';

            if (girlBusyAlert) {
                girlBusyAlert.style.display = 'none';
            }
        }
    }, intervalTime);
}

// =========================================================================
// LOCAL-PROFILES.HTML (Form/Map) SPECIFIC LOGIC
// =========================================================================

const indianStatesAndCities = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"], "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"], "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"], "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"], "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur-Ramanujganj", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"], "Goa": ["North Goa", "South Goa"], "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Valsad", "Vadodara"], "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"], "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"], "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"], "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"], "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"], "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Bhopal", "Barwani", "Betul", "Bhind", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"], "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nashik", "Nanded", "Nandurbar", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"], "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"], "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"], "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"], "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"], "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"], "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar (Mohali)", "Shaheed Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"], "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"], "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"], "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"], "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"], "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"], "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"], "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"], "West Bengal": ["Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};
// Dummy Girl Profiles for local search (images are generic, but you can assign specific ones)
const localGirlProfiles = [
    { name: "Aisha", img: "img/d1.webp", isOnline: true }, { name: "Bhavna", img: "img/d2.webp", isOnline: true }, { name: "Chitra", img: "img/d3.webp", isOnline: true }, { name: "Deepa", img: "img/d4.webp", isOnline: true }, { name: "Ekta", img: "img/d5.webp", isOnline: true }, { name: "Falguni", img: "img/d6.webp", isOnline: true }, { name: "Geeta", img: "img/d7.webp", isOnline: true }, { name: "Heena", img: "img/d8.webp", isOnline: true }, { name: "Indu", img: "img/d9.webp", isOnline: true }, { name: "Jaya", img: "img/d10.webp", isOnline: true }, 
    { name: "Kiran", img: "img/d11.webp", isOnline: true }, { name: "Lata", img: "img/d12.webp", isOnline: true }, { name: "Mona", img: "img/d13.webp", isOnline: true }, { name: "Nisha", img: "img/d14.webp", isOnline: true }, { name: "Omisha", img: "img/d15.webp", isOnline: true }, { name: "Priyanka", img: "img/d16.webp", isOnline: true }, { name: "Roshni", img: "img/d17.webp", isOnline: true }, { name: "Sapna", img: "img/d18.webp", isOnline: true }, { name: "Tina", img: "img/d19.webp", isOnline: true }, { name: "Uma", img: "img/d20.webp", isOnline: true }
];

// --- Form Element References (Scoped for local-profiles.html) ---
const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');
const girlsCheckbox = document.getElementById('girlsCheckbox');
const womenCheckbox = document.getElementById('womenCheckbox');
const findGirlsForm = document.getElementById('findGirlsForm');
const validationAlert = document.getElementById('validationAlert');
const validationAlertMessage = document.getElementById('validationAlertMessage');

// --- Progress Bar & Profile Display References ---
const progressBarContainer = document.getElementById('progressBarContainer');
const progressBar = document.getElementById('progressBar');
const progressPercentage = document.getElementById('progressPercentage');
const progressText = document.getElementById('progressText');
const foundProfilesSection = document.getElementById('foundProfilesSection');
const profilesFoundCount = document.getElementById('profilesFoundCount');
const foundProfilesGrid = document.getElementById('foundProfilesGrid');

// --- Form Logic Functions ---

function populateStates() {
    if (!stateSelect) return;
    for (const state in indianStatesAndCities) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }
}

function showValidationAlert(message) {
    if (!validationAlertMessage || !validationAlert) return;
    validationAlertMessage.textContent = message;
    validationAlert.style.display = 'flex';
}

function createFoundProfileCard(profile, selectedCityForDisplay) {
    const card = document.createElement("div");
    card.className = "found-profile-card visible"; 
    card.innerHTML = `
        <div class="shimmer-effect"></div>
        <img src="${profile.img}" alt="${profile.name}">
        <div class="status ${profile.isOnline ? 'online' : 'offline'}">${profile.isOnline ? 'Online' : 'Offline'}</div>
        <div class="name">${profile.name}</div>
        <div class="city">${selectedCityForDisplay}</div>
        <button class="chat-now-btn">Chat Now</button>
    `;
    
    card.querySelector('.chat-now-btn').addEventListener('click', () => {
        localStorage.setItem('selectedGirlProfile', JSON.stringify({
            name: profile.name,
            city: selectedCityForDisplay, 
            img: profile.img,
            isOnline: profile.isOnline
        }));
        window.location.href = "chat-interface.html";
    });
    
    setTimeout(() => {
        const img = card.querySelector('img');
        if (img) img.classList.add('unblurred');
        const shimmer = card.querySelector('.shimmer-effect');
        if (shimmer) shimmer.style.display = 'none';
    }, 1000); 

    return card;
}

function loadLocalProfilesWithProgressBar(selectedCity) {
    if (!progressBarContainer || !foundProfilesSection || !foundProfilesGrid) return;

    progressBarContainer.style.display = 'flex';
    foundProfilesSection.style.display = 'none'; 
    foundProfilesGrid.innerHTML = ''; 
    validationAlert.style.display = 'none'; 

    let progress = 0;
    const totalDuration = 10000; // 10 seconds
    const totalSteps = 100;
    const intervalTime = totalDuration / totalSteps;

    const revealStartPercent = 25;
    const numberOfProfilesToDisplay = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
    const shuffledProfiles = [...localGirlProfiles].sort(() => 0.5 - Math.random());
    const selectedProfiles = shuffledProfiles.slice(0, numberOfProfilesToDisplay);

    const profilesToRevealCount = selectedProfiles.length;
    const percentageRangeForReveal = totalSteps - revealStartPercent;
    
    const progressInterval = setInterval(() => {
        if (progress <= totalSteps) {
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressPercentage) progressPercentage.textContent = progress + '%';
            if (progressText) progressText.textContent = "Finding local girls from your area..."; 

            if (document.body.classList.contains('dark-mode')) {
                if (progressText) progressText.style.color = 'var(--dark-text)';
            } else {
                if (progressText) progressText.style.color = (progress > 50) ? 'white' : 'black';
            }
            
            if (progress >= revealStartPercent) {
                const progressInRevealPhase = progress - revealStartPercent;
                const profilesToShow = Math.min(
                    profilesToRevealCount,
                    Math.floor((progressInRevealPhase / percentageRangeForReveal) * profilesToRevealCount)
                );

                for (let i = foundProfilesGrid.children.length; i < profilesToShow; i++) {
                    const card = createFoundProfileCard(selectedProfiles[i], selectedCity);
                    foundProfilesGrid.appendChild(card);
                }
            }
            progress++;
        } else {
            clearInterval(progressInterval);
            progressBarContainer.style.display = 'none';
            foundProfilesSection.style.display = 'block';
            
            Array.from(foundProfilesGrid.children).forEach(card => {
                const img = card.querySelector('img');
                if (img) img.classList.add('unblurred');
                const shimmer = card.querySelector('.shimmer-effect');
                if (shimmer) shimmer.style.display = 'none';
            });
            
            if (profilesFoundCount) profilesFoundCount.textContent = `${numberOfProfilesToDisplay} profiles found in ${selectedCity}`;
        }
    }, intervalTime);
}

// --- Event Listener Assignments (For local-profiles.html) ---

if (stateSelect && citySelect) {
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = '<option value="">-- Select City --</option>';
        citySelect.disabled = true;

        if (selectedState) {
            const cities = indianStatesAndCities[selectedState];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            citySelect.disabled = false;
        }
    });
}

if (findGirlsForm) {
    findGirlsForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const selectedState = stateSelect.value;
        const selectedCity = citySelect.value;
        const isGirlsChecked = girlsCheckbox.checked;
        const isWomenChecked = womenCheckbox.checked;

        let errorMessage = '';

        if (!selectedState) {
            errorMessage = "Please select a State.";
        } else if (!selectedCity) {
            errorMessage = "Please select a City.";
        } else if (!isGirlsChecked && !isWomenChecked) {
            errorMessage = "Please select at least 'Girls' or 'Women'.";
        }

        if (errorMessage) {
            showValidationAlert(errorMessage);
            progressBarContainer.style.display = 'none';
            foundProfilesSection.style.display = 'none';
        } else {
            validationAlert.style.display = 'none';
            loadLocalProfilesWithProgressBar(selectedCity); 
        }
    });
}


// =========================================================================
// CHAT-INTERFACE.HTML SPECIFIC LOGIC (Requires full implementation)
// =========================================================================

let chatDatabase = { qaPairs: [], fallbacks: [] }; // Initial database structure (only used for fallback here)
let typingIndicatorElement = null;
let isFirstMessage = true;
let botReplyCount = 0;
const customReplies = ["kuch romantic poocho na...", "thoda wait kr skte ho kya... ruko"]; 

// --- Bot Response Logic ---
async function findResponse(userMessage) {
    if (botReplyCount < customReplies.length) {
        const response = customReplies[botReplyCount];
        botReplyCount++;
        return response;
    }
    // After two replies, the bot stops responding.
    return ""; 
}

// --- Message Utilities ---
function createMessageStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'message-status';
    const doubleTick = document.createElement('span');
    doubleTick.className = 'double-tick';
    doubleTick.innerHTML = '✓✓';
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    statusDiv.appendChild(doubleTick);
    statusDiv.appendChild(time);
    return statusDiv;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const imgElement = document.getElementById('girlProfileImg');

    typingIndicatorElement = document.createElement('div');
    typingIndicatorElement.className = 'typing-indicator';
    
    if (imgElement) {
        const profileImg = document.createElement('img');
        profileImg.src = imgElement.src;
        profileImg.style.width = '20px';
        profileImg.style.height = '20px';
        profileImg.style.borderRadius = '50%';
        typingIndicatorElement.appendChild(profileImg);
    }

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'typing-dots';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        dotsContainer.appendChild(dot);
    }
    typingIndicatorElement.appendChild(dotsContainer);

    chatMessages.appendChild(typingIndicatorElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    if (typingIndicatorElement && typingIndicatorElement.parentNode) {
        typingIndicatorElement.parentNode.removeChild(typingIndicatorElement);
        typingIndicatorElement = null;
    }
}

function calculateResponseTime(message) {
    const baseTime = 1500;
    const lengthFactor = message.length * 20;
    const randomFactor = Math.random() * 500;
    return Math.min(baseTime + lengthFactor + randomFactor, 5000);
}

// --- Main Send Message Function ---
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageText = messageInput.value.trim();

    if (messageText) {
        // 1. Remove welcome message on first interaction
        if (isFirstMessage) {
            const welcomeMsg = chatMessages.querySelector('.welcome-message');
            if (welcomeMsg) welcomeMsg.remove();
            isFirstMessage = false;
        }

        // 2. Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message sent';
        userMessageDiv.textContent = messageText;
        const messageStatus = createMessageStatus();
        userMessageDiv.appendChild(messageStatus);
        chatMessages.appendChild(userMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 3. Clear input and disable controls
        messageInput.value = '';
        sendMessageBtn.disabled = true;
        messageInput.disabled = true; 

        // 4. Simulate delivery status
        setTimeout(() => {
            const doubleTick = messageStatus.querySelector('.double-tick');
            if (doubleTick) doubleTick.classList.add('delivered');
        }, 1000); // Delivered after 1 second

        const botResponsePromise = findResponse(messageText);
        
        // 5. Simulate Bot Typing/Response
        setTimeout(async () => {
            const botResponse = await botResponsePromise;

            if (botResponse) {
                showTypingIndicator();
                const typingDuration = calculateResponseTime(botResponse);

                setTimeout(() => {
                    hideTypingIndicator();

                    // Add bot's reply
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'message received';
                    replyDiv.textContent = botResponse;
                    chatMessages.appendChild(replyDiv);

                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, typingDuration);
            }
            
            // 6. Re-enable input (Crucial: Re-enable whether bot replies or not)
            messageInput.disabled = false;
            sendMessageBtn.disabled = false;
            messageInput.focus();

        }, 3000); // Start thinking/typing simulation after 3 seconds
    }
}

// --- Profile Loader (Used in Chat Interface) ---
function loadSelectedGirl() {
    const selectedGirlData = localStorage.getItem('selectedGirlProfile');
    const chatMessages = document.getElementById('chatMessages');

    if (selectedGirlData) {
        const girl = JSON.parse(selectedGirlData);
        const imgElement = document.getElementById('girlProfileImg');
        const nameElement = document.getElementById('girlName');
        const statusElement = document.getElementById('girlStatus');

        if (imgElement) imgElement.src = girl.img;
        if (imgElement) imgElement.alt = girl.name;
        if (nameElement) nameElement.textContent = girl.name;
        
        if (statusElement) {
            statusElement.textContent = girl.isOnline ? 'Online' : 'Offline';
            statusElement.className = 'status ' + (girl.isOnline ? 'online' : 'offline');
        }
    } else {
        const imgElement = document.getElementById('girlProfileImg');
        const nameElement = document.getElementById('girlName');
        const statusElement = document.getElementById('girlStatus');

        if (imgElement) imgElement.src = "img/d1.webp"; 
        if (imgElement) imgElement.alt = "Priya";
        if (nameElement) nameElement.textContent = "Priya Sharma";
        if (statusElement) {
            statusElement.textContent = 'Online';
            statusElement.className = 'status online';
        }
    }

    const welcomeMsg = chatMessages ? chatMessages.querySelector('.welcome-message') : null;
    if (welcomeMsg) welcomeMsg.style.display = 'block';
}

// =========================================================================
// GLOBAL INITIALIZATION LOGIC (Runs on ALL Pages via DOMContentLoaded)
// =========================================================================

function loadSelectedGirl() {
    const selectedGirlData = localStorage.getItem('selectedGirlProfile');
    const chatMessages = document.getElementById('chatMessages');

    if (selectedGirlData) {
        const girl = JSON.parse(selectedGirlData);
        const imgElement = document.getElementById('girlProfileImg');
        const nameElement = document.getElementById('girlName');
        const statusElement = document.getElementById('girlStatus');

        if (imgElement) imgElement.src = girl.img;
        if (imgElement) imgElement.alt = girl.name;
        if (nameElement) nameElement.textContent = girl.name;
        
        if (statusElement) {
            statusElement.textContent = girl.isOnline ? 'Online' : 'Offline';
            statusElement.className = 'status ' + (girl.isOnline ? 'online' : 'offline');
        }
    } else {
        const imgElement = document.getElementById('girlProfileImg');
        const nameElement = document.getElementById('girlName');
        const statusElement = document.getElementById('girlStatus');

        if (imgElement) imgElement.src = "img/d1.webp"; 
        if (imgElement) imgElement.alt = "Priya";
        if (nameElement) nameElement.textContent = "Priya Sharma";
        if (statusElement) {
            statusElement.textContent = 'Online';
            statusElement.className = 'status online';
        }
    }

    const welcomeMsg = chatMessages ? chatMessages.querySelector('.welcome-message') : null;
    if (welcomeMsg) welcomeMsg.style.display = 'block';
}

// =========================================================================
// GLOBAL INITIALIZATION LOGIC (Runs on ALL Pages)
// =========================================================================

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Apply Theme Globally
    const savedTheme = localStorage.getItem("preferredTheme");
    const themeSwitch = document.getElementById("themeSwitch");
    
    if (savedTheme === null || savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeSwitch) themeSwitch.checked = true;
        if (savedTheme === null) localStorage.setItem("preferredTheme", "dark");
    }
    
    if (typeof applyNavTheme === 'function') {
        applyNavTheme();
        window.addEventListener('resize', applyNavTheme);
    }
    
    // --- AD PLACEMENT INITIALIZATION (Must run early) ---
    initializeAds();
    
    // --- ANCHOR AD INITIALIZATION (Sticky Footer) ---
    initializeAnchorAd();
    
    // 2. Run Page-Specific Logic
    
    // B. Logic for second-page.html (App Icons/Countdown)
    if (document.querySelector(".chat-box")) {
        startAppCountdown();
    }
    
    // C. Logic for chat-page.html (Profile Grid/Progress Bar)
    const profilesContainer = document.getElementById('profilesContainer');
    const findSecretGirlsBtn = document.getElementById('findSecretGirlsBtn');

    if (profilesContainer) {
        loadProfilesWithProgressBar();
        if (findSecretGirlsBtn) {
             findSecretGirlsBtn.addEventListener('click', () => {
                 window.location.href = "local-profiles.html"; 
             });
        }
    }
    
    // D. Logic for local-profiles.html (Form/Map)
    const findGirlsForm = document.getElementById('findGirlsForm');
    if (findGirlsForm) {
        populateStates();
        // The rest of the form logic is handled via the event listeners defined in that section.
    }

    // E. Logic for chat-interface.html (Live Chat)
    if (document.getElementById('chatMessages')) {
        loadSelectedGirl();
        await loadChatDatabase(); 
        
        // Bind chat event listeners
        document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
        document.getElementById('messageInput').addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
        document.getElementById('messageInput').focus();
    }
});


// =========================================================================
// AD PLACEMENT LOGIC (Used on all pages with ad containers)
// =========================================================================

function placeAdUnit(containerId, adSlotId, adFormat = 'auto', fullWidthResponsive = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // The Client ID MUST match the one in js/ad-loader.js
    const ADSENSE_CLIENT_ID = 'pub-7489296441212977'; 

    // 1. Create the <ins> tag
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.style.width = '100%';
    ins.style.height = '100%';
    
    ins.setAttribute('data-ad-client', ADSENSE_CLIENT_ID); 
    ins.setAttribute('data-ad-slot', adSlotId); // The unique ID for this specific ad slot
    ins.setAttribute('data-ad-format', adFormat);
    ins.setAttribute('data-full-width-responsive', fullWidthResponsive.toString());

    // 2. Clear placeholder content and append the ins tag
    container.innerHTML = '';
    container.appendChild(ins);

    // 3. Push the ad request (Google's standard code)
    try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
            // Fallback for slower loading
            setTimeout(() => {
                if (window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            }, 1000);
        }
    } catch (e) {
        console.error('AdSense push error:', e);
    }
}

// Global Ad Initialization Function (This targets all your placeholder IDs)
function initializeAds() {
    // Check if mobile or desktop
    const isMobile = window.innerWidth < 768;
    
    // !!! CRITICAL: YOU MUST REPLACE THE DUMMY 10-DIGIT SLOT IDs BELOW WITH YOUR ACTUAL ADSENSE SLOT IDs !!!
    
    // Header/Top Banner Slot (Desktop only)
    if (!isMobile) {
        placeAdUnit('ad-container-1', '4082944763', 'auto', true); 
    }

    // Side Ad Left (Desktop only)
    if (!isMobile) {
        placeAdUnit('ad-container-2', '7120171644', 'auto', false); 
    }
    
    // Side Ad Right (Desktop only)
    if (!isMobile) {
        placeAdUnit('ad-container-3', '6325964721', 'auto', false); 
    }
    
    // In-Article Ad Slot
    if (isMobile) {
        placeAdUnit('ad-container-article', '5609324014', 'auto', false);
    } else {
        placeAdUnit('ad-container-article', '5609324014', 'auto', false);
    }

    // Mobile Header Ad Slot
    if (isMobile) {
        placeAdUnit('ad-container-mobile-header', '1073638042', 'auto', true); 
    }
}

// =========================================================================
// ANCHOR AD INITIALIZATION (Sticky Footer Ad)
// =========================================================================

function initializeAnchorAd() {
    const anchorAdContainer = document.getElementById('anchorAd');
    if (!anchorAdContainer) return;

    // Add body padding to prevent content from being covered by sticky ad
    document.body.classList.add('has-anchor-ad');

    // Push the ad to Google's adsbygoogle queue
    setTimeout(() => {
        if (window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                console.log('Anchor ad initialized');
            } catch (e) {
                console.error('Anchor ad error:', e);
            }
        }
    }, 500);
}