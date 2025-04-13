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
        //else if ('wid'===name) {this._wid = newValue}
        else if ('wid'===name) {
            this._wid = Number(newValue)
            const diff = this._wid - 16; // 作成時のstroke-widthは16。そこからの差分で拡縮比を算出する
            this._scale = 1 + ((diff / 256) * ((0<diff) ? -1 : 1));
//            0 < diff ? 1 + diff : 1 - diff
//            this._scale = diff / 256 // 作成時の全体サイズは256。
            /*
            if (16===this._wid) {this._scale=1}
            else {
                const diff = this._wid - 16; // 作成時のstroke-widthは16。そこからの差分で拡縮比を算出する
                1 + (diff * ((0<diff) ? -1 : 1))
                0 < diff ? 1 + diff : 1 - diff
                this._scale = diff / 256 // 作成時の全体サイズは256。
            }
            */
        }
        else if ('join'===name) {this._join = newValue}
        else if ('limit'===name) {this._limit = newValue}
        //else if ('fill'===name) {this._fill = newValue}
        //else if ('fill'===name) {this._fill = this.hasAttribute(name) ? 1 : 0}
        //else if ('fill'===name) {this._fill = (newValue) ? newValue : (this.hasAttribute(name) ? 1 : 0);}
        //else if ('fill'===name) {console.log(newValue, typeof newValue, Number.isFinite(Number(newValue)));this._fill = (Number.isFinite(Number(newValue))) ? newValue : (this.hasAttribute(name) ? 1 : 0);}
        else if ('fill'===name) {this._fill = (Number.isFinite(Number(newValue))) ? newValue : (this.hasAttribute(name) ? 1 : 0);}
        if (this.children && this.children[0]) {this.children[0].replaceWith(this.#mkEl())}
    }
    #mkEl() {return this.#getUse(this.#getSize(), this.#getTransform())}
    #getSize() {return ({width:this._sz, height:this._sz})}
    //#getTransform(dir) {return dir ? ({transform:`rotate(${this.#getDegree(dir)},128,128)`}) : ({})}
    //#getTransform(dir) {return dir ? ({transform:`${this.#getRotate()} ${this.#getScale()}`}) : ({})}
    #getTransform() {const T = [this.#getRotate(), this.#getScale()].filter(v=>v); return T ? ({transform:T.join(' ')}) : ({});}
    //#getRotate() {return `rotate(${this.#getDegree()},128,128)`}
    #getRotate() {const deg = this.#getDegree(); return 0===deg ? '' : `rotate(${deg},128,128)`}
    //#getScale() {return `scale(${this._scale}, ${this._scale})`}
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
    // <svg width="1em" height="1em"><use href="#icon-symbol-arrow" transform="rotate(180, 128, 128)"></use></svg>
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
        //use.setAttribute('fill-opacity', this._fill ? 1 : 0); // 0.0〜1.0
        use.setAttribute('fill-opacity', this._fill); // 0.0〜1.0
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
        //path.setAttribute('style', `pointer-events:all;opacity:1;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1`)
        path.setAttribute('style', `pointer-events:all;opacity:1;stroke-linecap:square;stroke-dasharray:none;stroke-opacity:1`)
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
