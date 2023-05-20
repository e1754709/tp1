import Clan from "./views/Clan.js"
import Members from "./views/Members.js"
import MemberView from "./views/MemberView.js"

//10 Regex
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

//11 Get parametres
const getParams = match => {
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])
    const values = match.result.slice()

    return Object.fromEntries(keys.map((key, i) => {
        // console.log(key);
        return [key, values[i]]
    }))
}

//1 router
const router = async () => {

    const routes = [
        {path: "/",                   view: Clan},
        {path: "/members",            view: Members},
        {path: "/member/:tag",         view: MemberView}
    ]

    //2 match function
    const potentialMatches = routes.map( route => {

        return {
            route : route,
            result : location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)
    console.log(match)
    if(!match){
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    //8 Render view
    const view = new match.route.view(getParams(match))
    //const view = new Members()
    document.querySelector("#app").innerHTML = await view.getHtml()
}

//5 naviguer state
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

//9 use nav back button
window.addEventListener("popstate", router)


//4 executer la route
document.addEventListener("DOMContentLoaded", () => {
    //6 SPA link
    document.body.addEventListener("click", evt => {
        if(evt.target.matches("[data-link]")){
            evt.preventDefault()
            navigateTo(evt.target.href)
        }
    })
    router()
})