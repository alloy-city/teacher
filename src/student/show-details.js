import { search } from '../product'

function showStudentDetails(user){
    console.log("showStudentDetails called.", user)

    let coordinatorOptions = ""
    if (Auth.userData.accessLevel > 1){
        coordinatorOptions = `
            <div class="col-md-6">
                <form class="" onSubmit="return false;">
                    <div class="form-group">
                        <div class="row space-below">
                            <div class="col-sm-2 text-right">
                                <label for="students-give-xp">XPs</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="number" class="form-control" id="students-give-xp" placeholder="">
                            </div>
                            <div class="col-sm-7">
                                <button id="students-give-xp-submit" type="button" class="btn btn-default">Donnez XPs</button>
                            </div>
                        </div>

                        <div class="row space-below">
                            <div class="col-sm-2 text-right">
                                <label for="publishTestimonyText" class="control-label">Témoignage</label>
                            </div>
                            <div class="col-sm-8">
                                <textarea rows="4" cols="50" class="form-control" id="publishTestimonyText" placeholder=""></textarea>
                            </div>
                            <div class="col-sm-2">
                                <button id="publishTestimonyButton" type="button" class="btn btn-default">Publier</button>
                            </div>
                        </div>

                        <div class="row space-below">
                            <div class="col-sm-2 text-right">
                                <label for="students-search-product">Produit</label>
                            </div>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="students-search-product" placeholder="">
                            </div>
                            <div class="col-sm-2">
                                <button id="students-search-product-submit" type="button" class="btn btn-default">Chercher</button>
                            </div>
                        </div>
                        
                    </div>
                </form>
                <ul id="students-search-product-results-lessons" class="students-search-product-results list-group"></ul>
                <ul id="students-search-product-results-chapters" class="students-search-product-results list-group"></ul>
                <ul id="students-search-product-results-packs" class="students-search-product-results list-group"></ul>
                <ul id="students-search-product-results-courses" class="students-search-product-results list-group"></ul>
            </div>`
    }

    $("#userDetails").html(`
        <div class="row">
            <div class="col-md-6">
                <p><b>email:</b> ${user.mainEmail}</p>
                <p><b>id:</b> ${user._id}</p>
                <p><b>xp:</b> ${user.xp}</p>
                <p><b>name:</b> ${user.name || ""}</p>
                <p><b>nickname:</b> ${user.nickname || ""}</p>
                <p><b>phone:</b> ${user.phones[0] || ""}</p>
                <p><b>CPF:</b> ${user.cpf || ""}</p>
            </div>
            ${coordinatorOptions}
        </div>
        <hr>`
    )

    if (Auth.userData.accessLevel > 1) {
        let searchProduct = document.getElementById("students-search-product-submit")
        searchProduct.addEventListener("click", search)

        let giveXPButton = document.getElementById("students-give-xp-submit")
        giveXPButton.addEventListener("click", Coordinator.giveXP)

        let publishTestimonyButton = document.getElementById("publishTestimonyButton")
        publishTestimonyButton.addEventListener("click", Coordinator.publishTestimony)
    }
}

export { showStudentDetails }