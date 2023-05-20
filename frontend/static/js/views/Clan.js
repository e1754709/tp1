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

        let clanContent = `<div class='clan-content'>
                            <p>${data.name}</p>
                            <p>${data.description}</p>
                            <p>Niveau de clan : ${data.clanLevel}</p>
                            <p>Pays : ${data.location.name}</p>
                            <p>Victoires de guerres : ${data.warWins}</p>
                            <p>Ligue de guerre : ${data.warLeague.name}</p>
                        </div>
                        <div>
                            <a href="/members"  data-link >Liste des membres</a>
                        </div>`


        return "<h2>Bienvenu sur le site du clan Paradarkside</h2>" + clanContent
    }
}