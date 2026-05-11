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

const FINAL_HEADER_TEXT = "day something";

// =========================
// CORE FUNCTIONS
// =========================

function removeProfileImages() {
    document.querySelectorAll('img[src*="portrait.php"]').forEach(img => img.remove());
}

function replaceImages() {
    document.querySelectorAll('img[src*="logo.php"]').forEach(img => {
        if (img.src !== NEW_LOGO) {
            img.src = NEW_LOGO;
            img.srcset = `${NEW_LOGO} 1x, ${NEW_LOGO} 2x`;
        }
    });
}

// =========================
// SAFE TEXT REPLACER (FIXED)
// =========================

function replaceTextGlobally(find, replace) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes(find)) {
            node.nodeValue = node.nodeValue.replace(new RegExp(find, "g"), replace);
        }
    }
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
// SEARCH ICON
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
// TIMETABLE
// =========================

function modifyTimetableLink() {
    const timetableLink = document.querySelector("a.icon-timetable");
    if (!timetableLink) return;

    const span = timetableLink.querySelector("span");
    if (span) span.textContent = "train_schedule";

    timetableLink.classList.remove("icon-timetable");

    if (!timetableLink.querySelector(".custom-train")) {
        const img = document.createElement("img");
        img.src = NEW_TRAIN;
        img.className = "custom-train";

        img.style.width = "30px";
        img.style.height = "30px";
        img.style.marginRight = "6px";
        img.style.verticalAlign = "middle";

        timetableLink.insertBefore(img, timetableLink.firstChild);
    }
}

// =========================
// BACKGROUND FIX
// =========================

function changeBackgroundColor() {
    const style = document.getElementById("force-bg-style") || document.createElement("style");
    style.id = "force-bg-style";

    document.head.appendChild(style);

    let hue = 0;

    function updateColor() {
        hue = (hue + 1) % 360;

        // HSL makes smooth rainbow cycling easy
        const color = `hsl(${hue}, 100%, 50%)`;

        style.textContent = `
            html, body, #container, #content, .row, .columns, .island {
                background-color: ${color} !important;
                transition: background-color 0.1s linear;
            }
        `;

        requestAnimationFrame(updateColor);
    }

    updateColor();
}

// =========================
// TEXT REPLACEMENTS
// =========================

function replaceTileIconsWithEmoji() {
    const EMOJIS = ["😚","☺️","🙂","😏","🤨","☺️","🫡","😏","😜","😛","😌","😓","🤑","😮‍💨","🤯","😩","🥵","🥶","😡","🤬","🤕","🤢"];

    function getRandomEmoji() {
        return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    }

    document.querySelectorAll("li.tile").forEach(tile => {

        if (tile.querySelector(".custom-emoji-tile")) return;

        let foundIcon = false;

        const icons = tile.querySelectorAll("img, i, svg");

        icons.forEach(icon => {
            foundIcon = true;

            const emoji = document.createElement("div");
            emoji.className = "custom-emoji-tile";
            emoji.textContent = getRandomEmoji();

            emoji.style.width = "120.99px";
            emoji.style.height = "121px";
            emoji.style.display = "flex";
            emoji.style.alignItems = "center";
            emoji.style.justifyContent = "center";
            emoji.style.fontSize = "95px";
            emoji.style.margin = "0 auto";

            // ✅ hover animation setup
            emoji.style.transition = "transform 0.2s ease";
            emoji.addEventListener("mouseenter", () => {
                emoji.style.transform = "translateY(-8px)";
            });
            emoji.addEventListener("mouseleave", () => {
                emoji.style.transform = "translateY(0px)";
            });

            icon.replaceWith(emoji);
        });

        if (!foundIcon) {
            const bg = getComputedStyle(tile).backgroundImage;

            if (bg && bg !== "none") {
                tile.style.backgroundImage = "none";

                const emoji = document.createElement("div");
                emoji.className = "custom-emoji-tile";
                emoji.textContent = getRandomEmoji();

                emoji.style.width = "120.99px";
                emoji.style.height = "121px";
                emoji.style.display = "flex";
                emoji.style.alignItems = "center";
                emoji.style.justifyContent = "center";
                emoji.style.fontSize = "95px";
                emoji.style.margin = "0 auto";

                // ✅ hover animation
                emoji.style.transition = "transform 0.2s ease";
                emoji.addEventListener("mouseenter", () => {
                    emoji.style.transform = "translateY(-8px)";
                });
                emoji.addEventListener("mouseleave", () => {
                    emoji.style.transform = "translateY(0px)";
                });

                tile.insertBefore(emoji, tile.firstChild);
            }
        }
    });
}

function replaceText() {

    replaceTextGlobally("Adam Calleja", "Adam CALLeja 💵💰");
    replaceTextGlobally("Good Morning", "BAD Morning");
    replaceTextGlobally("Good Afternoon", "BAD Afternoon");

    document.querySelectorAll("a.icon-approve span").forEach(span => {
        if (span.textContent.includes("Grades")) {
            span.textContent = "Your A+'s";
        }
    });

    document.querySelectorAll("a.icon-settings span").forEach(span => {
        if (span.textContent.includes("Insights")) {
            span.textContent = "Your GPA";
        }
    });

    document.querySelectorAll("a.icon-calendar span").forEach(span => {
        if (span.textContent.includes("Calendar")) {
            span.textContent = "📅📆🗓️";
        }
    });

    document.querySelectorAll("a.icon-news span").forEach(span => {
        if (span.textContent.includes("Notices")) {
            span.textContent = "News 📰🗞️";
        }
    });

    document.querySelectorAll("[data-timetable-header]").forEach(header => {
        if (header.textContent !== FINAL_HEADER_TEXT) {
            header.textContent = FINAL_HEADER_TEXT;
            header.style.color = "black";
        }
    });

    document.querySelectorAll("th").forEach(th => {
        if (th.textContent.includes("Pd 1")) th.textContent = "HELL";
        if (th.textContent.includes("Pd 3")) th.textContent = "Shortest period";
        if (th.textContent.includes("Pd 5")) th.textContent = "THE END";
    });
}

// =========================
// RUNNER
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
    changeBackgroundColor();
    replaceTileIconsWithEmoji();
}

// =========================
// OBSERVER
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
