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

        // let member = await getData(`/static/js/data/players/.json\#22UL0UL2C.json`)
        let member = await getData(`/static/js/data/${this.params.tag}.json`)
        console.log(this.params.tag);
        console.log(member);
        let clanContent = `<div>
                            <p>${member.name} ${member.tag}</p>
                            <p>Niveau d'Hotel de ville : ${member.townHallLevel}</p>
                            <p>Ligue : ${member.league.name}</p>
                            <p>Trophées actuels : ${member.trophies}</p>
                            <p>Meilleurs trophées : ${member.bestTrophies}</p>
                            <p>Trophées de légendes : ${member.legendStatistics.legendTrophies}</p>
                            <p>Niveau ${member.expLevel}</p>
                            <p>Étoiles de guerre : ${member.warStars}</p>
                            <p>Niveau de Maison d'ouvrier : ${member.builderHallLevel}</p>
                            <p>Role : ${member.role}</p>
                            <p>Dons : ${member.donations}</p>
                            <p>Dons recus : ${member.donationsReceived}</p>
                            <div>
                                <div>
                                    <span>${member.heroes[0].name}</span><small> Niveau : ${member.heroes[0].level}</small>
                                </div>
                                <div>
                                    <span>${member.heroes[1].name}</span><small> Niveau : ${member.heroes[1].level}</small>
                                </div>
                                <div>
                                    <span>${member.heroes[2].name}</span><small> Niveau : ${member.heroes[2].level}}</small>
                                </div>
                                <div>
                                    <span>${member.heroes[3].name}</span><small> Niveau : ${member.heroes[3].level}}</small>
                                </div>
                                <div>
                                    <span>${member.heroes[4].name}</span><small> Niveau : ${member.heroes[4].level}}</small>
                                </div>
                            </div>
                        </div`

        return `<h2>${member.name} du Clan ${member.clan.name}</h2>` + clanContent
    }
}
