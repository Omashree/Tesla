const menu_toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menu_toggle.addEventListener("click", () => {
    if(menu_toggle.firstElementChild.classList.contains("fa-bars")) {
        menu_toggle.firstElementChild.classList.replace("fa-bars","fa-xmark");
        sidebar.style.left = "0";
    } else {
        menu_toggle.firstElementChild.classList.replace("fa-xmark","fa-bars");
        sidebar.style.left = "-16.65rem";
    }
})

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
    dropdownBtn.style.borderRadius = "1.25rem 1.25rem 0 0";
    clearBtn.style.display = clearBtn.style.display === "block" ? "none" : "block";
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    dropdownContent.style.borderRadius = "0 0 1.25rem 1.25rem";
}

function selectOption(event) {
    const type = event.target.getAttribute("data-type");
    const name = event.target.getAttribute("data-name");

    if (type === "person" && !selectedItems.people.includes(name)) {
        selectedItems.people.push(name);
    } else if (type === "group" && !selectedItems.groups.includes(name)) {
        selectedItems.groups.push(name);
    }

    updateSelectedDisplay();
}

function deselectOption(event) {
    const name = event.target.closest(".selected-item").getAttribute("data-name");
    
    if (selectedItems.people.includes(name)) {
        selectedItems.people = selectedItems.people.filter(person => person !== name);
    } else if (selectedItems.groups.includes(name)) {
        selectedItems.groups = selectedItems.groups.filter(group => group !== name);
    }
    
    updateSelectedDisplay();
}

function updateSelectedDisplay() {
    const selectedText = document.getElementById("selectedText");
    const selectedItemsContainer = document.getElementById("selectedItems");
    selectedItemsContainer.innerHTML = "";

    let displayText = [];
    let totalSelectedCount = selectedItems.people.length + selectedItems.groups.length;

    if (selectedItems.people.length > 0) {
        if (selectedItems.people.length === 1) {
            selectedText.textContent = selectedItems.people[0];
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
        if (selectedItems.groups.length === 1) {
            selectedText.textContent = selectedItems.groups[0];
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

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}
