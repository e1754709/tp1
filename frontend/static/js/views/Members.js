import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("site du clan")
    }

    async getHtml(){
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData("/static/js/data/Paradarkside/Paradarkside.json")
        // const emile = await getData("/static/js/data/players/22UL0UL2C.json")
        console.log("data", data);

        // console.log("emile", emile)
        
        let clanContent = `<div class='member-list'>`
        
        let memberList = data.memberList
        
        memberList.forEach(member => {

            console.log(member.tag.slice(1))
            clanContent += `<div class="member">
                                <p class="name">${member.name}</p>
                                <p class="tag">${member.tag}</p>
                                <a href="/member/${member.tag.slice(1)}">Voir le membre</a>
                            </div>`           
        });

        clanContent += "</div>"



        return "<h2>Liste des joueurs du clan Paradarkside</h2>" + clanContent
    }
}