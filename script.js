document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const progressImage = document.getElementById("language-progress");

    // Updated language sections with Redis added
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
        ],
        redis: [
            "redis-w1-2"
        ]
    };

    // Checkbox state persistence, progress update, and confetti animation
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === "true") {
            checkbox.checked = true;
        }
        checkbox.addEventListener("change", (e) => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateProgressImage();
            if (e.target.checked) {
                triggerConfetti(e.target);
            }
        });
    });

    // Textarea state persistence
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

    // Smooth scrolling for all sidebar links, including dropdown items
    const links = document.querySelectorAll(".sidebar nav ul li a, .dropdown-menu li a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
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

    // Confetti animation function
    function triggerConfetti(checkbox) {
        const rect = checkbox.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        const confetti = [];
        const colors = ["#ff0", "#f00", "#0f0", "#00f", "#f0f"];

        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: x,
                y: y,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 6,
                speedY: Math.random() * -8 - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                spin: (Math.random() - 0.5) * 4
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeConfetti = false;

            confetti.forEach((piece, index) => {
                piece.x += piece.speedX;
                piece.y += piece.speedY;
                piece.speedY += 0.2; // Gravity
                piece.rotation += piece.spin;

                if (piece.y < canvas.height) {
                    activeConfetti = true;
                    ctx.save();
                    ctx.translate(piece.x, piece.y);
                    ctx.rotate(piece.rotation * Math.PI / 180);
                    ctx.fillStyle = piece.color;
                    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                    ctx.restore();
                }
            });

            if (activeConfetti) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(canvas);
            }
        }

        animate();
    }

    updateProgressImage();
});
