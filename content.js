// =========================
// CONFIG
// =========================

const NEW_LOGO =
  "https://github.com/call30-sketch/paduaimage/blob/main/padualogo.png?raw=true";

const NEW_BELL =
  "https://github.com/call30-sketch/paduaimage/blob/main/bell.png?raw=true";

const NEW_MAGNIFY =
  "https://github.com/call30-sketch/paduaimage/blob/main/magnyfying%20glass.png?raw=true";

const NEW_TRAIN =
  "https://github.com/call30-sketch/paduaimage/blob/main/train.png?raw=true";

const FINAL_HEADER_TEXT = "MOD MADE BY ADAM CALLEJA";

// =========================
// CORE FUNCTIONS
// =========================

function removeProfileImages() {
    const images = document.querySelectorAll('img[src*="portrait.php"]');
    images.forEach(img => img.remove());
}

function replaceImages() {
    const images = document.querySelectorAll('img[src*="logo.php"]');

    images.forEach(img => {
        if (img.src !== NEW_LOGO) {
            img.src = NEW_LOGO;
            img.srcset = `${NEW_LOGO} 1x, ${NEW_LOGO} 2x`;
        }
    });
}

// =========================
// NOTICES HEADER
// =========================

function modifyNoticesHeader() {
    document.querySelectorAll("h2.subheader").forEach(el => {
        if (el.textContent.includes("Notices")) {
            el.textContent = "things no one reads";

            el.style.fontSize = "32px";
            el.style.color = "black";
            el.style.fontWeight = "bold";
        }
    });
}

// =========================
// NOTIFICATION BELL
// =========================

function modifyNotificationBell() {

    const notificationBtn = document.querySelector("#notification-toggle");
    if (!notificationBtn) return;

    notificationBtn.classList.remove("icon-notifications");

    const count = notificationBtn.querySelector("[data-unread-count]");
    if (count) count.remove();

    if (!notificationBtn.querySelector(".custom-bell")) {

        const bellImg = document.createElement("img");
        bellImg.src = NEW_BELL;
        bellImg.className = "custom-bell";

        bellImg.style.width = "72px";
        bellImg.style.height = "72px";
        bellImg.style.objectFit = "contain";
        bellImg.style.display = "block";

        notificationBtn.appendChild(bellImg);
    }
}

// =========================
// SEARCH ICON REPLACEMENT
// =========================

function replaceSearchIcon() {

    const searchBtn = document.querySelector("button.c-search-input__button.icon-search");
    if (!searchBtn) return;

    searchBtn.classList.remove("icon-search");

    if (!searchBtn.querySelector(".custom-magnify")) {

        searchBtn.innerHTML = "";

        const img = document.createElement("img");
        img.src = NEW_MAGNIFY;
        img.className = "custom-magnify";

        img.style.width = "72px";
        img.style.height = "72px";
        img.style.objectFit = "contain";
        img.style.display = "block";

        searchBtn.appendChild(img);
    }
}

// =========================
// TIMETABLE REPLACEMENT
// =========================

function modifyTimetableLink() {

    const timetableLink = document.querySelector("a.icon-timetable");
    if (!timetableLink) return;

    // replace text
    const span = timetableLink.querySelector("span");
    if (span) {
        span.textContent = "train_schedule";
    }

    // remove old icon class (if any icon system exists)
    timetableLink.classList.remove("icon-timetable");

    // prevent duplicates
    if (!timetableLink.querySelector(".custom-train")) {

        // optional: clear existing icon-only styling artifacts
        // (keeps link clickable text + icon)
        
        const img = document.createElement("img");
        img.src = NEW_TRAIN;
        img.className = "custom-train";

        img.style.width = "30px";
        img.style.height = "30px";
        img.style.objectFit = "contain";
        img.style.display = "inline-block";
        img.style.marginRight = "6px";
        img.style.verticalAlign = "middle";

        timetableLink.insertBefore(img, timetableLink.firstChild);
    }
}



function changeBackgroundColor() {
    const applyStyle = () => {
        const style = document.getElementById("force-bg-style") || document.createElement("style");
        style.id = "force-bg-style";

        style.textContent = `
            html, body, #container, #content, .row, .columns, .island {
                background-color: #f2f2f2 !important;
            }
        `;
        
        document.head.appendChild(style);
    };

    // Run immediately
    applyStyle();

    // Keep reapplying in case the site overwrites it
    const observer = new MutationObserver(() => applyStyle());
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
// =========================
// TEXT REPLACEMENTS
// =========================

function replaceText() {

    document.querySelectorAll("h1").forEach(h1 => {
        if (h1.textContent.includes("Good Morning")) {
            h1.textContent = h1.textContent.replace(/Good Morning/g, "BAD Morning");
        }
    });

    document.querySelectorAll("strong").forEach(el => {
        if (el.textContent.includes("Adam Calleja")) {
            el.textContent = el.textContent.replace(
                /Adam Calleja/g,
                "Adam CALLeja 💵💰"
            );
        }
    });

    document.querySelectorAll("a.icon-approve span").forEach(span => {
        if (span.textContent.includes("Grades")) {
            span.textContent = span.textContent.replace(/Grades/g, "Your A+'s");
        }
    });

    document.querySelectorAll("a.icon-settings span").forEach(span => {
        if (span.textContent.includes("Insights")) {
            span.textContent = span.textContent.replace(/Insights/g, "Your GPA");
        }
    });

    document.querySelectorAll("a.icon-calendar span").forEach(span => {
        if (span.textContent.includes("Calendar")) {
            span.textContent = span.textContent.replace(/Calendar/g, "📅📆🗓️");
        }
    });

    document.querySelectorAll("a.icon-news span").forEach(span => {
        if (span.textContent.includes("Notices")) {
            span.textContent = span.textContent.replace(/Notices/g, "News 📰🗞️");
        }
    });

    document.querySelectorAll("[data-timetable-header]").forEach(header => {
        if (header.textContent !== FINAL_HEADER_TEXT) {
            header.textContent = FINAL_HEADER_TEXT;
            header.style.color = "black";
        }
    });

    // Good Afternoon -> BAD Afternoon (KEEP BOLD TEXT)
    document.querySelectorAll("h1").forEach(h1 => {

        const strong = h1.querySelector("strong");

        if (h1.textContent.includes("Good Afternoon")) {

            // replace only the visible text part of the h1
            h1.innerHTML = h1.innerHTML.replace(
                "Good Afternoon",
                "BAD Afternoon"
            );
        }
    });

    document.querySelectorAll("th").forEach(th => {

        if (th.textContent.includes("Pd 1")) {
            th.textContent = th.textContent.replace(/Pd 1/g, "HELL");
        }

        if (th.textContent.includes("Pd 3")) {
            th.textContent = th.textContent.replace(/Pd 3/g, "Shortest period");
        }

        if (th.textContent.includes("Pd 5")) {
            th.textContent = th.textContent.replace(/Pd 5/g, "THE END");
        }
    });
}

// =========================
// BATCH RUNNER
// =========================

let scheduled = false;

function runAll() {
    scheduled = false;

    removeProfileImages();
    replaceImages();
    replaceText();
    modifyNoticesHeader();
    modifyNotificationBell();
    replaceSearchIcon();
    modifyTimetableLink();
    changeBackgroundColor;
}

// =========================
// MUTATION OBSERVER
// =========================

const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(runAll);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// =========================
// INITIAL RUN
// =========================

runAll();