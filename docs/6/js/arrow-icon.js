class ArrowIconElement extends HTMLElement {
    static get observedAttributes() {return 'sz dir col wid join limit fill'.split(' ');}
    constructor() {
        super();
        this._id = `icon-symbol-arrow`;
        this._sz = `1em`;
        this._col = `currentColor`;
        this._dir = `0`;
        this._wid = `16`;
        this._join = `miter`; // arcs|bevel|miter|miter-clip|round
        this._limit = `4`;
        this._fill = `0`; // fill-opacity
        this._scale = `1`;
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
        else if ('col'===name) {this._col = newValue}
        else if ('wid'===name) {this._wid = newValue}
        else if ('join'===name) {this._join = newValue}
        else if ('limit'===name) {this._limit = newValue}
        else if ('fill'===name) {this._fill = (Number.isFinite(Number(newValue))) ? newValue : (this.hasAttribute(name) ? 1 : 0);}
        if (this.children && this.children[0]) {this.children[0].replaceWith(this.#mkEl())}
    }
    #mkEl() {return this.#getUse(this.#getSize(), this.#getTransform())}
    #getSize() {return ({width:this._sz, height:this._sz})}
    #getTransform() {const T = [this.#getRotate(), this.#getScale()].filter(v=>v); return T ? ({transform:T.join(' ')}) : ({});}
    #getRotate() {const deg = this.#getDegree(); return 0===deg ? '' : `rotate(${deg},128,128)`}
    #getScale() {return '1'===this._scale || 1===this._scale ? '' : `scale(${this._scale}, ${this._scale})`}
    #getDegree() {
             if ('left'===this._dir) {return 0}
        else if ('top-left'===this._dir) {return 45}
        else if ('top'===this._dir) {return 90}
        else if ('top-right'===this._dir) {return 135}
        else if ('right'===this._dir) {return 180}
        else if ('bottom-right'===this._dir) {return 225}
        else if ('bottom'===this._dir) {return 270}
        else if ('bottom-left'===this._dir) {return 315}
        else {
            const deg = parseInt(this._dir);
            if (Number.isNaN(deg)){throw new TypeError(`角度は0〜359かtop,bottom,left,right等の文字列で指定してください。`)}
            else {return deg}
        }
    }
    #getUse(svgAttrs={}, useAttrs={}) {
        console.log(svgAttrs, useAttrs)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        for (let [k,v] of Object.entries(svgAttrs)) {
            svg.setAttribute(k, v);
        }
        for (let [k,v] of Object.entries(useAttrs)) {
            use.setAttribute(k, v);
        }
        use.setAttribute('href', `#${this._id}`);
        use.setAttribute('fill', this._col);
        use.setAttribute('stroke', this._col);
        use.setAttribute('stroke-width', this._wid);
        use.setAttribute('stroke-linejoin', this._join);
        use.setAttribute('stroke-miterlimit', this._limit);
        console.log(this._fill)
        use.setAttribute('fill-opacity', this._fill); // 0.0〜1.0
        svg.setAttribute('viewBox', `0 0 256 256`);
        svg.append(use);
        return svg
    }
    #mkSvgEl(name){return document.createElementNS('http://www.w3.org/2000/svg', name)}
    #getArrowSymbol() {
        const [svg, defs, symbol, path] = 'svg defs symbol path'.split(' ').map(n=>this.#mkSvgEl(n))
//        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
//        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
//        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('style', `pointer-events:all;opacity:1;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1`)
        path.setAttribute('d', 'M120.137 19.176 11.314 128l108.823 108.824V176H248V80H120.137V19.176z')
        symbol.setAttribute('viewBox', '0 0 256 256')
        symbol.setAttribute('id', this._id)
        symbol.append(path)
        defs.append(symbol)
        svg.append(defs)
        return svg
    }
}
customElements.define("icon-arrow", ArrowIconElement, {extends:'i'});
