class ArrowIconElement extends HTMLElement {
    static get observedAttributes() {return 'sz dir'.split(' ');}
    constructor() {
        super();
        this._id = `icon-symbol-arrow`;
        this._sz = `1em`;
        this._dir = `0`;
        if (!document.querySelector(`#${this._id}`)) {document.querySelector('head').append(this.#getArrowSymbol())}
    }
    connectedCallback() {
        setTimeout(()=>{
            console.log(this.textContent)
            this.append(this.#mkEl())
        });
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`属性 ${name} が変更されました。`);
        let attrs = {}
             if ('sz'===name) {this._sz = newValue}
        else if ('dir'===name) {this._dir = newValue}
        if (this.children && this.children[0]) {this.children[0].replaceWith(this.#mkEl())}
    }
    #mkEl() {return this.#getUse(this.#getSize(this._sz), this.#getTransform(this._dir))}
    #getSize(sz) {return sz ? ({width:sz, height:sz}) : ({})}
    #getTransform(dir) {return dir ? ({transform:`rotate(${this.#getDegree(dir)},128,128)`}) : ({})}
    #getDegree(dir) {
             if ('left'===dir) {return 0}
        else if ('top-left'===dir) {return 45}
        else if ('top'===dir) {return 90}
        else if ('top-right'===dir) {return 135}
        else if ('right'===dir) {return 180}
        else if ('bottom-right'===dir) {return 225}
        else if ('bottom'===dir) {return 270}
        else if ('bottom-left'===dir) {return 315}
        else {
            const deg = parseInt(dir);
            if (Number.isNaN(deg)){throw new TypeError(`角度は0〜359かtop,bottom,left,right等の文字列で指定してください。`)}
            else {return deg}
        }
    }
    // <svg width="1em" height="1em"><use href="#icon-symbol-arrow" transform="rotate(180, 128, 128)"></use></svg>
    #getUse(svgAttrs={}, useAttrs={}) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        for (let [k,v] of Object.entries(svgAttrs)) {
            svg.setAttribute(k, v);
        }
        for (let [k,v] of Object.entries(useAttrs)) {
            use.setAttribute(k, v);
        }
        use.setAttribute('href', `#${this._id}`);
        svg.setAttribute('viewBox', `0 0 256 256`);
        svg.append(use);
        return svg
    }
    #getArrowSymbol() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M121.074.002a6.727 6.727 0 0 0-4.691 2.103L1.836 123.381a6.727 6.727 0 0 0 0 9.238l114.547 121.276a6.727 6.727 0 0 0 11.617-4.62v-73.064h121.484a6.727 6.727 0 0 0 6.727-6.727V86.516a6.727 6.727 0 0 0-6.727-6.727H128V6.725a6.727 6.727 0 0 0-6.926-6.723Zm-6.527 23.64v62.874a6.727 6.727 0 0 0 6.726 6.726h121.485v69.516H121.273a6.727 6.727 0 0 0-6.726 6.726v62.873L15.979 128Z')
        symbol.setAttribute('viewBox', '0 0 256 256')
        symbol.setAttribute('id', this._id)
        symbol.append(path)
        defs.append(symbol)
        svg.append(defs)
        return svg
    }
}
customElements.define("icon-arrow", ArrowIconElement, {extends:'i'});
