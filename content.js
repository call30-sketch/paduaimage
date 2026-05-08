// =========================
// CONFIG
// =========================

const NEW_LOGO =
  "https://github.com/call30-sketch/paduaimage/blob/main/padualogo.png?raw=true";

const NEW_BELL =
  "https://github.com/call30-sketch/paduaimage/blob/main/bell.png?raw=true";

const FINAL_HEADER_TEXT = "MOD MADE BY ADAM CALLEJA";

// =========================
// CORE FUNCTIONS
// =========================

function removeProfileImages() {
    const images = document.querySelectorAll('img[src*="portrait.php"]');

    images.forEach(img => {
        img.remove();
    });
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

    const notificationBtn =
        document.querySelector("#notification-toggle");

    if (!notificationBtn) return;

    // remove old bell icon class
    notificationBtn.classList.remove("icon-notifications");

    // remove notification number text (26)
    const count =
        notificationBtn.querySelector("[data-unread-count]");

    if (count) {
        count.remove();
    }

    // prevent duplicate image
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
// TEXT REPLACEMENTS
// =========================

function replaceText() {

    // Good Morning -> BAD Morning
    document.querySelectorAll("h1").forEach(h1 => {
        if (h1.textContent.includes("Good Morning")) {
            h1.textContent =
                h1.textContent.replace(/Good Morning/g, "BAD Morning");
        }
    });

    // Adam Calleja
    document.querySelectorAll("strong").forEach(el => {
        if (el.textContent.includes("Adam Calleja")) {
            el.textContent =
                el.textContent.replace(
                    /Adam Calleja/g,
                    "Adam CALLeja 💵💰"
                );
        }
    });

    // Grades -> Your A+'s
    document.querySelectorAll("a.icon-approve span").forEach(span => {
        if (span.textContent.includes("Grades")) {
            span.textContent =
                span.textContent.replace(
                    /Grades/g,
                    "Your A+'s"
                );
        }
    });

    // timetable headers
    document.querySelectorAll("[data-timetable-header]").forEach(header => {

        if (header.textContent !== FINAL_HEADER_TEXT) {

            header.textContent = FINAL_HEADER_TEXT;
            header.style.color = "black";
        }
    });

    // Pd changes
    document.querySelectorAll("th").forEach(th => {

        if (th.textContent.includes("Pd 1")) {
            th.textContent =
                th.textContent.replace(/Pd 1/g, "HELL");
        }

        if (th.textContent.includes("Pd 5")) {
            th.textContent =
                th.textContent.replace(/Pd 5/g, "HEAVEN");
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