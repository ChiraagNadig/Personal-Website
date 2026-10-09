/*================================= experience data ===================================*/
const experiences = [
    {
        logo: "img/logos/google.png",
        role: "Incoming Software Engineer (L3)",
        company: "Google",
        location: "Mountain View, California",
        dates: "Incoming",
        bullets: [
            "Joining Google as a Software Engineer (L3) on the Payments Journey / Payments Autofill team in Mountain View."
        ],
        link: null
    },
    {
        logo: "img/logos/hadrius.png",
        role: "Software Engineer",
        company: "Hadrius (YC W23, AI RegTech Platform)",
        location: "New York, New York",
        dates: "Jun 2026 - Present",
        bullets: [
            "Restored 90% of a customer's missing message data (230,000+ messages lost over 4 months) by root causing a broken deduplication watermark in a shared ingestion pipeline used by 21 providers across 8 companies.",
            "Built a full OAuth/authentication audit backend and an AM/IM Connector Dashboard tracking 8,400+ individual connector instances across 48 provider types (WhatsApp, LinkedIn, Zoom, Teams, and others) for 339 client companies.",
            "Shipped a highlight navigation feature letting reviewers jump directly between flagged phrases in long email threads, cutting review time 35% (measured via PostHog).",
            "Onboarded 3 new archiving integrations (ICE Chat, Cloud9, WebEx), helping close $120K+ in ARR across the three deals."
        ],
        link: { url: "https://www.hadrius.com/", label: "Visit Hadrius" }
    },
    {
        logo: "img/logos/publicis-sapient.svg",
        role: "Software Engineer Intern",
        company: "Publicis Sapient (AI Consulting Firm)",
        location: "Chicago, Illinois",
        dates: "Jun 2025 - Aug 2025",
        bullets: [
            "Implemented a comprehensive testing architecture for a Fortune 500 ($81B) retailer's ad management platform, driving API test coverage from 0% to 92.6% with 272 unit tests at <25s runtime.",
            "Spearheaded AI feature development by creating an AI Smart Scheduler (demoed to executive sponsor) and a database-querying chatbot, and optimized an AI SEO-enhancer's processing time by 80% (80s to <15s) using asynchronous, parallel data chunking.",
            "Served as lead BE architect, designing and building the entire backend API, database schema, and 8+ service modules for the platform."
        ],
        link: { url: "https://tinyurl.com/PSLearnings", label: "Read the Report" }
    },
    {
        logo: "img/logos/quilt-ai.png",
        role: "Research and Development Intern",
        company: "Quilt.AI (AI Consumer Insights Platform)",
        location: "Boston, Massachusetts",
        dates: "Jun 2024 - Aug 2024",
        bullets: [
            "Reduced manual analysis time by 40% for a Coca-Cola campaign by developing an LLM-based classification system that processed 24,000+ names to identify gender, sensitivity, and cultural context.",
            "Co-authored an arXiv research publication comparing GenAI vs. traditional NLP methods, improving sentiment analysis accuracy from 50% to 60% through Llama2 7B fine-tuning with PEFT/LoRA, informing Quilt's AI strategy for client projects."
        ],
        link: { url: "https://tinyurl.com/QuiltLearnings", label: "Read the Report" }
    }
];

/*================================= beyond the classroom data ===================================*/
const campusItems = [
    {
        logo: "img/logos/boozallen.png",
        role: "Full Stack Software Engineer",
        company: "Booz Allen Hamilton",
        sub: "via UMD App Dev Club",
        dates: "Feb 2025 - May 2025",
        description: "Engineered an end-to-end AWS ML pipeline (GLiNER, BART) to extract and summarize content across 300+ federal policies, and architected a secure containerized cloud infrastructure that cut cold start latency 45%.",
        link: { url: "https://www.boozallen.com/", label: "About Booz Allen" }
    },
    {
        icon: "fa-solid fa-magnifying-glass-chart",
        role: "Quantum ML Researcher",
        company: "UMD FIRE Research Program",
        sub: null,
        dates: "Sep 2023 - Jan 2025",
        description: "Achieved 71% precision predicting stock returns with a novel Quantum Gramian Angular Field (QGAF) model deployed on IonQ's quantum processors; findings published by IEEE.",
        link: { url: "https://ieeexplore.ieee.org/document/11416413", label: "Read the Paper" }
    },
    {
        icon: "fa-solid fa-car-side",
        role: "Co-Founder",
        company: "Roam: Student Rideshare App",
        sub: null,
        dates: "Feb 2024 - Jan 2025",
        description: "Co-founded Roam Travel LLC and launched an iOS rideshare app connecting students within college networks, cutting average ride costs 50% vs. Uber/Lyft while leading an 8-person team.",
        link: { url: "https://theroamtravel.com/", label: "Visit theroamtravel.com" }
    }
];

/*================================= shared icon/logo markup helper ===================================*/
function markGlyph(item, imgClass, iconClass) {
    return item.logo
        ? `<img src="${item.logo}" alt="" class="${imgClass}">`
        : `<i class="${item.icon} ${iconClass}" aria-hidden="true"></i>`;
}

/*================================= render sidebar + content ===================================*/
const sidebar = document.getElementById('experience-sidebar');
const content = document.getElementById('experience-content');

function renderExperience(index) {
    const exp = experiences[index];

    content.setAttribute('aria-labelledby', 'exp-tab-' + index);
    content.innerHTML = `
        ${markGlyph(exp, 'exp-logo-lg', 'exp-icon-lg')}
        <h3>${exp.role}</h3>
        <h4>${exp.company}</h4>
        <p class="exp-meta"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${exp.location} &nbsp;&bull;&nbsp; <i class="fa-solid fa-calendar" aria-hidden="true"></i> ${exp.dates}</p>
        <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        ${exp.link ? `<a href="${exp.link.url}" class="btn" target="_blank" rel="noopener">${exp.link.label}</a>` : ''}
    `;

    document.querySelectorAll('.exp-tab').forEach((tab, i) => {
        const selected = i === index;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
    });
}

experiences.forEach((exp, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'exp-tab';
    tab.id = 'exp-tab-' + index;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'experience-content');
    tab.innerHTML = `
        <span class="exp-logo-slot">${markGlyph(exp, 'exp-logo-sm', 'exp-icon-sm')}</span>
        <span class="exp-tab-text">
            <strong>${exp.role}</strong>
            <small>${exp.company}</small>
            <small class="exp-tab-dates">${exp.dates}</small>
        </span>
    `;
    tab.addEventListener('click', () => renderExperience(index));
    tab.addEventListener('keydown', (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = (index + keys[e.key] + experiences.length) % experiences.length;
        renderExperience(next);
        sidebar.children[next].focus();
    });
    sidebar.appendChild(tab);
});

renderExperience(0);

/*================================= render beyond the classroom cards ===================================*/
const campusContainer = document.getElementById('campus-container');

campusItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'campus-box';
    card.innerHTML = `
        ${markGlyph(item, 'campus-logo', 'campus-icon')}
        <h3>${item.role}</h3>
        <h4>${item.company}${item.sub ? `<small> &middot; ${item.sub}</small>` : ''}</h4>
        <p class="campus-dates">${item.dates}</p>
        <p>${item.description}</p>
        <a href="${item.link.url}" class="btn" target="_blank" rel="noopener">${item.link.label}</a>
    `;
    campusContainer.appendChild(card);
});
