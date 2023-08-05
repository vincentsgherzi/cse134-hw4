const template = document.createElement("template")
template.innerHTML = `
<style>
    .root{
        width: 70%;
        height: 12rem;
        border: 1px solid black;
        padding: 3px;
        display: inline-block;
        border-radius: 15px;
    }

    .layout{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
    }

    .title{
        text-align: center;
    }
</style>
<div class="root">
    <h2 class=title>${this.title}</h2>
    <div class=layout>

        <div>
            <img src=${this.url}><img>
            <a href=${this.link}>${this.link}</a>
        </div>

        <p>${this.description}</p>
        
    </div>
</div>
`

class ProjectCard extends HTMLElement {

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
        let clone = template.content.cloneNode(true)
        this.root.append(clone)
    }

    static get observedAttributes() {
        return ["title", "url", "link", "description"]
    }

    //sync attributes with props
    get title() {
        return this.getAttribute("title")
    }

    get url() {
        return this.getAttribute("url")
    }

    get link() {
        return this.getAttribute("link")
    }

    get description() {
        return this.getAttribute("description")
    }

    set title(value) {
        this.setAttribute("title", value)
    }

    set url(value) {
        this.setAttribute("url", value)
    }

    set link(value) {
        this.setAttribute("link", value)
    }

    set description(value) {
        this.setAttribute("description", value)
    }


    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == "title") {
            let div = this.root.querySelector(".root")
            let h2 = div.getElementsByTagName("h2")[0]
            h2.innerText = newVal
        }

        if (attrName == "url") {
            let div = this.root.querySelector(".root")
            let img = div.getElementsByTagName("img")[0]
            img.src = newVal
        }

        if (attrName == "link") {
            let div = this.root.querySelector(".root")
            let a = div.getElementsByTagName("a")[0]
            a.href = newVal
            a.innerText = newVal
        }

        if (attrName == "description") {
            let div = this.root.querySelector(".root")
            let p = div.getElementsByTagName("p")[0]
            p.innerText = newVal
        }
    }
}

customElements.define("project-card", ProjectCard)