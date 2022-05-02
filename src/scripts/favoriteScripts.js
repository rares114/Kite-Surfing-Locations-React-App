
export  function added() {
    document.getElementById("addFav").style.visibility = "hidden"
    document.getElementById("removeFav").style.visibility = "visible"
}

export function removed() {
    document.getElementById("removeFav").style.visibility = "hidden"
    document.getElementById("addFav").style.visibility = "visible"
}