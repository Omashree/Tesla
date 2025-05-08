const menu_toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
let lastSelectedRadio = null;

menu_toggle.addEventListener("click", () => {
    if(menu_toggle.firstElementChild.classList.contains("fa-bars")) {
        menu_toggle.firstElementChild.classList.replace("fa-bars","fa-xmark");
        sidebar.style.left = "0";
    } else {
        menu_toggle.firstElementChild.classList.replace("fa-xmark","fa-bars");
        sidebar.style.left = "-16.65rem";
    }
})

document.getElementById("dropBtn").addEventListener("click", () => {
    const dropContent = document.getElementById("dropContent");
    const dropBtn = document.getElementById("dropBtn");
    const i = document.getElementById("i");
    dropBtn.classList.toggle("radius");
    dropContent.style.display = dropContent.style.display === "block" ? "none" : "block";
    dropContent.style.borderRadius = "0 0 1.25rem 1.25rem";
    if(i.classList.contains("fa-sort-down")) {
        i.classList.replace("fa-sort-down","fa-sort-up");
    } else {
        i.classList.replace("fa-sort-up","fa-sort-down");
    }
});

function setTimeframe(timeframe) {
    const selectedTimeframeElement = document.getElementById("selected-timeframe");
    selectedTimeframeElement.textContent = timeframe;
}

let selectedItems = {
    people: [],
    groups: []
};

document.getElementById("dropdownBtn").addEventListener("click", toggleDropdown);

function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    const dropdownBtn = document.getElementById("dropdownBtn");
    const clearBtn = document.getElementById("clearBtn");
    dropdownBtn.classList.toggle("radius");
    clearBtn.style.display = clearBtn.style.display === "block" ? "none" : "block";
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    dropdownContent.style.borderRadius = "0 0 1.25rem 1.25rem";
}

function selectOption(event) {
    const option = event.currentTarget;
    const type = option.getAttribute("data-type");
    const name = option.getAttribute("data-name");
    const icon = option.querySelector("i");

    const isSelected = (
        (type === "person" && selectedItems.people.includes(name)) ||
        (type === "group" && selectedItems.groups.includes(name))
    );

    if (isSelected) {
        if (type === "person") {
            selectedItems.people = selectedItems.people.filter(person => person !== name);
        } else if (type === "group") {
            selectedItems.groups = selectedItems.groups.filter(group => group !== name);
        }
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    } else {
        if (type === "person") {
            selectedItems.people.push(name);
        } else if (type === "group") {
            selectedItems.groups.push(name);
        }

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }

    updateSelectedDisplay();
}

function deselectOption(event) {
    event.stopPropagation();

    const itemElement = event.target.closest(".selected-item");
    const name = itemElement.getAttribute("data-name");

    if (selectedItems.people.includes(name)) {
        selectedItems.people = selectedItems.people.filter(person => person !== name);
    } else if (selectedItems.groups.includes(name)) {
        selectedItems.groups = selectedItems.groups.filter(group => group !== name);
    }

    const optionIcon = document.querySelector(`.option[data-name="${name}"] i`);
    if (optionIcon) {
        optionIcon.classList.remove("fa-solid");
        optionIcon.classList.add("fa-regular");
    }

    updateSelectedDisplay();
}

function updateSelectedDisplay() {
    const selectedText = document.getElementById("selectedText");
    const selectedItemsContainer = document.getElementById("selectedItems");
    selectedItemsContainer.innerHTML = "";

    let totalSelectedCount = selectedItems.people.length + selectedItems.groups.length;

    if (selectedItems.people.length > 0) {
        if (selectedItems.people.length === 1) {
            selectedText.innerHTML = `<b>${selectedItems.people[0]}</b>`;
        } else {
            selectedText.innerHTML = `People: <b>Multiple Selected</b>`;
        }
        selectedItems.people.forEach(name => {
            const item = document.createElement("div");
            item.classList.add("selected-item");
            item.setAttribute("data-name", name);
            item.innerHTML = `${name} <span class="remove" onclick="deselectOption(event)">×</span>`;
            selectedItemsContainer.appendChild(item);
        });
    }

    if (selectedItems.groups.length > 0) {
        if (selectedItems.groups.length === 1 && selectedItems.people.length === 0) {
            selectedText.innerHTML = `<b>${selectedItems.groups[0]}</b>`;
        } else {
            selectedText.innerHTML = `People: <b>Multiple Selected</b>`;
        }
        selectedItems.groups.forEach(name => {
            const item = document.createElement("div");
            item.classList.add("selected-item");
            item.setAttribute("data-name", name);
            item.innerHTML = `${name} <span class="remove" onclick="deselectOption(event)">&nbsp;×</span>`;
            selectedItemsContainer.appendChild(item);
        });
    }

    if (totalSelectedCount === 0) {
        selectedText.textContent = "Select People & Groups";
    }
}

function filterOptions() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const options = document.querySelectorAll(".option");
    const input = document.querySelectorAll(".group-option input");
    
    options.forEach(option => {
        const name = option.textContent.toLowerCase();
        if (name.includes(query)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });

    input.forEach(option => {
        const name = option.textContent.toLowerCase();
        if (name.includes(query)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
}

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", selectOption);
});

function clearSelections() {
    selectedItems.people = [];
    selectedItems.groups = [];
    updateSelectedDisplay();

    document.querySelectorAll('.option i').forEach(icon => {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    });

    lastSelectedRadio = null;
}


window.addEventListener("click", function(event) {
    const dropBtn = document.getElementById("dropBtn");
    const dropContent = document.getElementById("dropContent");
    const i = document.getElementById("i");

    if (!dropBtn.contains(event.target) && !dropContent.contains(event.target)) {
        dropContent.style.display = "none";
        dropBtn.classList.remove("radius");
        if (i.classList.contains("fa-sort-up")) {
            i.classList.replace("fa-sort-up", "fa-sort-down");
        }
    }

    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");
    const clearBtn = document.getElementById("clearBtn");
    const selectedItems = document.getElementById("selectedItems");

    if (
        !dropdownBtn.contains(event.target) &&
        !dropdownContent.contains(event.target) &&
        !clearBtn.contains(event.target) &&
        !selectedItems.contains(event.target)
    ) {
        dropdownContent.style.display = "none";
        clearBtn.style.display = "none";
        dropdownBtn.classList.remove("radius");
    }
});
