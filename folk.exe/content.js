const FLAG_URL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/flag.txt";
const IMAGE_URL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/images%20(3).jpg";

let activated = false;
let interval;

// ---------------- STYLE ----------------
function injectStyles() {
    if (document.getElementById("folk-style")) return;

    const style = document.createElement("style");
    style.id = "folk-style";
    style.innerHTML = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .folk-spin {
            display: inline-block;
            animation-name: spin;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    `;
    document.head.appendChild(style);
}

// ---------------- SPIN ----------------
function applySpin(el) {
    const duration = (Math.random() * 3 + 2).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);

    el.classList.add("folk-spin");
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
}

// ---------------- IMAGES ----------------
function replaceImage(img) {
    img.src = IMAGE_URL;
    img.srcset = "";
    img.removeAttribute("srcset");
    applySpin(img);
}

function replaceAllImages() {
    document.querySelectorAll("img").forEach(replaceImage);
}

// ---------------- TEXT ----------------
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue.trim()) {
            const span = document.createElement("span");
            span.textContent = "FOLK VALLEY";
            applySpin(span);
            node.replaceWith(span);
        }
        return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)) return;

    Array.from(node.childNodes).forEach(replaceText);
}

// ---------------- OBSERVER ----------------
function observeChanges() {
    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                replaceText(node);

                if (node.querySelectorAll) {
                    node.querySelectorAll("img").forEach(replaceImage);
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// ---------------- ACTIVATE ----------------
function activate() {
    if (activated) return;
    activated = true;

    console.log("FOLK MODE ACTIVATED");

    injectStyles();
    replaceAllImages();
    replaceText(document.body);
    observeChanges();
}

// ---------------- FETCH FLAG ----------------
function checkFlag() {
    const url = FLAG_URL + "?t=" + Date.now(); // 🔥 bypass cache

    fetch(url, {
        cache: "no-store"
    })
    .then(res => res.text())
    .then(text => {
        const flag = text.trim();
        console.log("FLAG:", flag);

        if (flag === "TRUE") {
            activate();
        }
    })
    .catch(err => {
        console.error("FLAG FETCH FAILED:", err);
    });
}

// ---------------- SAFE LOOP ----------------
interval = setInterval(() => {
    try {
        checkFlag();
    } catch (e) {
        console.warn("Context lost, stopping loop");
        clearInterval(interval);
    }
}, 2000);

// initial run
checkFlag();