document.addEventListener("DOMContentLoaded", () => {
    // Load checkbox states
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === "true") {
            checkbox.checked = true;
        }
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });

    // Load and save textarea reflections
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

    // Smooth scrolling for sidebar links
    const links = document.querySelectorAll(".sidebar nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Share Progress Functionality
    const shareButton = document.querySelector(".share-progress");
    const shareModal = document.getElementById("shareModal");
    const closeModal = document.getElementById("closeModal");
    const shareSummary = document.getElementById("shareSummary");
    const copyShare = document.getElementById("copyShare");

    shareButton.addEventListener("click", () => {
        // Generate share summary
        let summary = "My Programming Roadmap Progress (as of " + new Date().toLocaleDateString() + "):\n\n";

        // Count completed tasks per section
        const sections = document.querySelectorAll("section[id]");
        sections.forEach(section => {
            const sectionTitle = section.querySelector("h2").textContent;
            const checkboxesInSection = section.querySelectorAll("input[type='checkbox']");
            const totalTasks = checkboxesInSection.length;
            const completedTasks = Array.from(checkboxesInSection).filter(cb => cb.checked).length;
            
            if (totalTasks > 0) {
                summary += `${sectionTitle}: ${completedTasks}/${totalTasks} tasks completed\n`;
            }
        });

        // Add reflections if present
        summary += "\nReflections:\n";
        textareas.forEach(textarea => {
            if (textarea.value.trim()) {
                const sectionTitle = textarea.closest("section").querySelector("h2").textContent;
                summary += `${sectionTitle}:\n${textarea.value.trim()}\n\n`;
            }
        });

        // Display summary in modal
        shareSummary.value = summary;
        shareModal.style.display = "block";
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        shareModal.style.display = "none";
    });

    // Copy to clipboard
    copyShare.addEventListener("click", () => {
        shareSummary.select();
        document.execCommand("copy");
        alert("Progress copied to clipboard! Share it with your friends or on social media.");
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === shareModal) {
            shareModal.style.display = "none";
        }
    });
});