import { post } from "../http"
import { listProducts } from './list'

function search(){
    let string = document.getElementById("students-search-product").value

    post({ string: string }, `product/search`, res => {
        console.log(res)

        listProducts(res)
    })
}

export { search }