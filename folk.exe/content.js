const IMAGE_URL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/images%20(3).jpg";
const FLAG_URL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/folk";

// Inject CSS
function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .folk-spin {
            display: inline-block !important;
            animation-name: spin;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    `;
    document.head.appendChild(style);
}

// Random spin
function applyRandomSpin(el) {
    const duration = (Math.random() * 3 + 2).toFixed(2);
    const delay = (Math.random() * 3).toFixed(2);

    el.classList.add("folk-spin");
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
}

// FORCE replace image
function replaceImage(img) {
    img.src = IMAGE_URL;
    img.srcset = "";
    img.removeAttribute("srcset");

    // kill lazy loading tricks
    img.removeAttribute("data-src");
    img.removeAttribute("data-srcset");
    img.removeAttribute("loading");

    applyRandomSpin(img);
}

// Replace all images
function replaceImages() {
    document.querySelectorAll("img").forEach(replaceImage);
}

// Replace text safely
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue.trim() !== "") {
            const span = document.createElement("span");
            span.textContent = "FOLK VALLEY";
            applyRandomSpin(span);
            node.parentNode.replaceChild(span, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)) return;

        node.childNodes.forEach(child => replaceText(child));
    }
}

// Watch for new content / sites fighting back
function observeChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            // New nodes
            m.addedNodes.forEach(node => {
                replaceText(node);

                if (node.querySelectorAll) {
                    node.querySelectorAll("img").forEach(replaceImage);
                }
            });

            // Attribute changes (site tries to change images back)
            if (m.type === "attributes" && m.target.tagName === "IMG") {
                replaceImage(m.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"]
    });
}

// MAIN
fetch(FLAG_URL)
    .then(res => res.text())
    .then(text => {
        if (text.trim() === "TRUE") {
            injectStyles();
            replaceImages();
            replaceText(document.body);
            observeChanges();
        } else {
            console.log("Flag not TRUE — nothing applied.");
        }
    })
    .catch(err => console.error(err));