class ArrowIconElement extends HTMLElement {
    static get observedAttributes() {
        return 'sz dir'.sprit(' ');
    }
    constructor() {
        super();
        this._id = `icon-symbol-arrow`;
        this._sz = `1em`;
        this._dir = `0`;
        console.log('AAAAAAAAA')
        if (!document.querySelector(this._id)) {document.querySelector('head').append(this.#getArrowSymbol())}
    }
    connectedCallback() {
        console.log("カスタム要素がページに追加されました。");
        setTimeout(()=>{
            console.log(this.textContent)
            //this.#mkel()
            //this.append(this.#getUse(this.#getSize(newValue), this.#getDir(newValue)))
            //this.append(this.#getUse(this.#getSize(this._sz), this.#getTransform(this._dir)))
            this.append(this.#mkEl())
        });
    }
    disconnectedCallback() {
        console.log("カスタム要素がページから除去されました。");
    }
    adoptedCallback() {
        console.log("カスタム要素が新しいページへ移動されました。");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`属性 ${name} が変更されました。`);
        let attrs = {}
             if ('sz'===name) {this._sz = newValue}
        else if ('dir'===name) {this._dir = newValue}
        //if (this.children) {this.children[0].replaceWith(this.#getUse(this.#getSize(this._sz), this.#Transform(this._dir)))}
        if (this.children) {this.children[0].replaceWith(this.#mkEl())}
    }
    #mkEl() {return this.#getUse(this.#getSize(this._sz), this.#getTransform(this._dir))}
    #getSize(sz) {return sz ? ({width:sz, height:sz}) : ({})}
    #getTransform(dir) {return dir ? ({transform:`rotate(${this.#getDegree(dir)},128,128)`}) : ({})}
    #getDegree(dir) {
        /*
        if ('0'===dir || 'left'===dir) {return 0}
        else if ('45'===dir || 'top-left'===dir) {return 45}
        else if ('90'===dir || 'top'===dir) {return 90}
        else if ('135'===dir || 'top-right'===dir) {return 135}
        else if ('180'===dir || 'right'===dir) {return 180}
        else if ('225'===dir || 'bottom-right'===dir) {return 225}
        else if ('270'===dir || 'bottom'===dir) {return 270}
        else if ('315'===dir || 'bottom-left'===dir) {return 315}
        */
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
//            if (0<= deg < 360) {return deg}
//            else {throw new TypeError(`角度は0〜359かtop,bottom,left,right等の文字列で指定してください。`)}
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
        svg.append(use);
        return svg
    }
    #getArrowSymbol() { return `<svg><defs><symbol viewBox="0 0 256 256" id="${this._id}"><path d="M121.074.002a6.727 6.727 0 0 0-4.691 2.103L1.836 123.381a6.727 6.727 0 0 0 0 9.238l114.547 121.276a6.727 6.727 0 0 0 11.617-4.62v-73.064h121.484a6.727 6.727 0 0 0 6.727-6.727V86.516a6.727 6.727 0 0 0-6.727-6.727H128V6.725a6.727 6.727 0 0 0-6.926-6.723Zm-6.527 23.64v62.874a6.727 6.727 0 0 0 6.726 6.726h121.485v69.516H121.273a6.727 6.727 0 0 0-6.726 6.726v62.873L15.979 128Z"/></defs></svg>`}
//    #getArrowSvg() { return `<svg viewBox="0 0 256 256"><path d="M121.074.002a6.727 6.727 0 0 0-4.691 2.103L1.836 123.381a6.727 6.727 0 0 0 0 9.238l114.547 121.276a6.727 6.727 0 0 0 11.617-4.62v-73.064h121.484a6.727 6.727 0 0 0 6.727-6.727V86.516a6.727 6.727 0 0 0-6.727-6.727H128V6.725a6.727 6.727 0 0 0-6.926-6.723Zm-6.527 23.64v62.874a6.727 6.727 0 0 0 6.726 6.726h121.485v69.516H121.273a6.727 6.727 0 0 0-6.726 6.726v62.873L15.979 128Z"/></svg>`}
}
customElements.define("icon-arrow", ArrowIconElement, {extends:'i'});
