const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lanes");
const trashCan = document.querySelector(".trash-can");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

trashCan.addEventListener("dragover", (e) => {
    e.preventDefault();
    trashCan.classList.add("drag-over"); // Adiciona estilo de destaque quando está sobre a lixeira
});

trashCan.addEventListener("dragleave", () => {
    trashCan.classList.remove("drag-over"); // Remove estilo de destaque quando deixa a lixeira
});

trashCan.addEventListener("drop", () => {
    const curTask = document.querySelector(".is-dragging");
    curTask.remove(); // Remove a tarefa ao soltá-la na lixeira
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();
        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};
