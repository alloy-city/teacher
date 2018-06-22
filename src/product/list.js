import { selected } from '../student'

function _addListHeader(list, title){
    let head = document.createElement("h4")
    head.innerText = title
    list.appendChild(head)
}

function _accessButton(user_id, product_id){
    let accessButton = document.createElement("button")
    accessButton.classList.add("btn", "btn-warning", "btn-xs", "pull-right")
    accessButton.innerText = "Donner en access"
    accessButton.addEventListener("click", () => {
        Coordinator.Product.giveAccess(user_id, product_id)
    })

    return accessButton
}

function _suggestButton(user_id, product_id) {
    let suggestButton = document.createElement("button")
    suggestButton.classList.add("btn", "btn-success", "btn-xs", "pull-right")
    suggestButton.innerText = "Suggérer"
    suggestButton.addEventListener("click", () => {
        Coordinator.Product.suggest(user_id, product_id)
    })

    return suggestButton
}

function _enlistButton(user_id, course_id) {
    let enlistButton = document.createElement("button")
    enlistButton.classList.add("btn", "btn-info", "btn-xs", "pull-right")
    enlistButton.innerText = "Inscrire"
    enlistButton.addEventListener("click", () => {
        Coordinator.Course.enlist(user_id, course_id)
    })

    return enlistButton
}

function listProducts(products){
    let lessonsList = document.getElementById("students-search-product-results-lessons")
    let chaptersList = document.getElementById("students-search-product-results-chapters")
    let packsList = document.getElementById("students-search-product-results-packs")
    let coursesList = document.getElementById("students-search-product-results-courses")
    
    lessonsList.innerHTML = ""
    chaptersList.innerHTML = ""
    packsList.innerHTML = ""
    coursesList.innerHTML = ""

    if (products.lessons.length > 0) _addListHeader(lessonsList, "Leçons")
    for (let lesson of products.lessons){
        let item = document.createElement("li")
        item.classList.add("list-group-item", "list-group-item-primary")
        item.innerHTML = `<b>${lesson.title}</b> ${ lesson.subtitle ? lesson.subtitle : "" } | ${lesson.description} | Prix: ${numberToBRL(lesson.price)}`

        item.appendChild(_accessButton(selected._id, lesson._id))
        item.appendChild(_suggestButton(selected._id, lesson._id))
        
        lessonsList.appendChild(item)
    }

    if (products.chapters.length > 0) _addListHeader(chaptersList, "Chapitres")
    for (let chapter of products.chapters){
        let item = document.createElement("li")
        item.classList.add("list-group-item", "list-group-item-success")
        item.innerHTML = `<b>${chapter.title}</b> ${ chapter.subtitle ? chapter.subtitle : "" } | ${chapter.description} | Prix: ${numberToBRL(chapter.price)}`

        item.appendChild(_accessButton(selected._id, chapter._id))
        item.appendChild(_suggestButton(selected._id, chapter._id))

        chaptersList.appendChild(item)
    }

    if (products.packs.length > 0) _addListHeader(packsList, "Packs")
    for (let pack of products.packs){
        let item = document.createElement("li")
        item.classList.add("list-group-item", "list-group-item-info")
        item.innerHTML = `<b>${pack.title}</b> ${ pack.subtitle ? pack.subtitle : "" } | ${pack.description} | Prix: ${numberToBRL(pack.price)}`

        item.appendChild(_suggestButton(selected._id, pack._id))

        packsList.appendChild(item)
    }

    if (products.courses.length > 0) _addListHeader(coursesList, "Parcours")
    for (let course of products.courses){
        let item = document.createElement("li")
        item.classList.add("list-group-item", "list-group-item-warning")
        item.innerHTML = `<b>${course.title}</b> ${ course.subtitle ? course.subtitle : "" } | ${course.description} | Prix: ${numberToBRL(course.price)}`

        item.appendChild(_suggestButton(selected._id, course._id))
        item.appendChild(_enlistButton(selected._id, course._id))

        coursesList.appendChild(item)
    }
}

export { listProducts }