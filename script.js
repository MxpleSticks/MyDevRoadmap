document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const progressImage = document.getElementById("language-progress");

    // Updated language sections with Docker and AWS added
    const languageSections = {
        javascript: [
            "js-w1-3", "js-w4-8", "node-w1-4", "node-w5-8", "js-proj-w1-4", "js-proj-w5-8"
        ],
        postgresql: [
            "pg-w1-2", "pg-w3-4", "pg-int-w1-4", "pg-int-w5-8", "pg-adv-w1-4", "pg-adv-w5-8"
        ],
        ruby: [
            "ruby-w1-4", "rails-w1-4", "rails-w5-8", "ruby-adv-w1-4", "ruby-adv-w5-8"
        ],
        java: [
            "java-w1-4", "java-w5-8", "java-ent-w1-6", "java-ent-w7-12", "java-adv-w1-6", "java-adv-w7-12"
        ],
        swift: [
            "swift-w1-8", "swift-ios-w1-6", "swift-ios-w7-12", "swift-adv-w1-6", "swift-adv-w7-12"
        ],
        python: [
            "python-w1-52"
        ],
        docker: [
            "docker-w1-2"
        ],
        aws: [
            "aws-w1-4"
        ]
    };

    // Rest of the code remains unchanged
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === "true") {
            checkbox.checked = true;
        }
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateProgressImage();
        });
    });

    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        const savedText = localStorage.getItem(textarea.id);
        if (savedText) {
            textarea.value = savedText;
        }
        textarea.addEventListener("input", () => {
            localStorage.setItem(textarea.id, textarea.value);
        });
    });

    const links = document.querySelectorAll(".sidebar nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    function updateProgressImage() {
        let completedLanguages = 0;

        for (const [language, checkboxIds] of Object.entries(languageSections)) {
            const allChecked = checkboxIds.every(id => {
                const checkbox = document.getElementById(id);
                return checkbox && checkbox.checked;
            });
            if (allChecked) {
                completedLanguages++;
            }
        }

        progressImage.src = `lang${completedLanguages}.jpg`;
        progressImage.alt = `Completed ${completedLanguages} languages`;
    }

    updateProgressImage();
});
