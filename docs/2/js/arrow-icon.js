class ArrowIconElement extends HTMLElement {
    static get observedAttributes() {return 'sz dir col wid join limit'.split(' ');}
    constructor() {
        super();
        this._id = `icon-symbol-arrow`;
        this._sz = `1em`;
        this._col = `currentColor`;
        this._dir = `0`;
        this._wid = `16`;
        this._join = `miter`; // arcs|bevel|miter|miter-clip|round
        this._limit = `4`;
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
        use.setAttribute('fill', this._col);
        use.setAttribute('stroke', this._col);
        use.setAttribute('stroke-width', this._wid);
        use.setAttribute('stroke-linejoin', this._join);
        use.setAttribute('stroke-miterlimit', this._limit);
//        use.setAttribute('stroke', this._col);
        svg.setAttribute('viewBox', `0 0 256 256`);
        svg.append(use);
        return svg
    }
    #getArrowSymbol() {
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path style="opacity:1;fill:none;fill-opacity:0;stroke:currentColor;stroke-width:16;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M121.273 6.725 6.727 128l114.546 121.275v-79.79h128.211v-82.97h-128.21V6.726z"/></svg>
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M120.137 19.176 11.314 128l108.823 108.824V176H248V80H120.137V19.176z" style="pointer-events:all;opacity:1;fill:none;fill-opacity:0;stroke:currentColor;stroke-width:16;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></svg>
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//        path.setAttribute('style', `pointer-events:all;opacity:1;fill:none;fill-opacity:0;stroke:currentColor;stroke-width:${this._wid};stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`);
//        path.setAttribute('d', 'M121.273 6.725 6.727 128l114.546 121.275v-79.79h128.211v-82.97h-128.21V6.726z')
        //path.setAttribute('style', `pointer-events:all;opacity:1;fill:none;fill-opacity:0;stroke:currentColor;stroke-width:${this._wid};stroke-linecap:square;stroke-linejoin:${this._join};stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`)
        path.setAttribute('style', `pointer-events:all;opacity:1;fill-opacity:0;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1`)
        path.setAttribute('d', 'M120.137 19.176 11.314 128l108.823 108.824V176H248V80H120.137V19.176z')
        
        symbol.setAttribute('viewBox', '0 0 256 256')
        symbol.setAttribute('id', this._id)
        symbol.append(path)
        defs.append(symbol)
        svg.append(defs)
        return svg
    }

    /*
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
    */
}
customElements.define("icon-arrow", ArrowIconElement, {extends:'i'});
