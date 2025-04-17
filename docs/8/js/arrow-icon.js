class ArrowIconElement extends HTMLElement {
    //static get observedAttributes() {return 'corn quad portrait landscape path step sz dir col wid join limit fill'.split(' ');}
    static get observedAttributes() {return 'corn path step circle layout sz dir col wid join limit fill'.split(' ');}
    static PATHS = new Map([
        ['base', 'M 120 21 L 13 128 L 120 235 L 120 176 L 243 176 L 243 80 L 120 80 L 120 21 z '],
        ['bi', 'M 86,27 12,128 86,229 V 176 H 170 V 229 L 244,128 170,27 V 80 H 86 Z'],
        ['bi-row-2', 'M 54 19 L 11 63 L 54 106 L 54 83 L 202 83 L 202 108 L 245 64 L 202 21 L 202 42 L 54 42 L 54 19 z '],
        ['row-2', 'M 59 19 L 11 67 L 59 115 L 59 86 L 246 86 L 246 46 L 59 46 L 59 19 z '],
        ['col-2', 'M 60,36 14,128 59,220 59,167 H 112 V 89 H 60 Z'],
        ['path-2', 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z '],
        ['path-3', 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 200 L 11 200 L 11 246 L 196 246 L 243 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z '],
        ['path-4', 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 200 L 61 200 L 61 165 L 12 165 L 12 200 L 11 200 L 11 246 L 196 246 L 243 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z '],
        ['step', 'M 76 20 L 12 84 L 76 147 L 76 106 L 135 106 L 135 198 L 135 247 L 184 247 L 243 247 L 243 198 L 184 198 L 184 106 L 184 106 L 184 57 L 76 57 L 76 20 z '],
        ['quad', 'M 128 9 L 78 38 L 104 38 L 104 103 L 38 103 L 38 78 L 9 128 L 38 178 L 38 152 L 104 152 L 104 218 L 78 218 L 128 247 L 178 218 L 152 218 L 152 152 L 218 152 L 218 178 L 247 128 L 218 78 L 218 103 L 152 103 L 152 38 L 178 38 L 128 9 z '],
        ['circle', 'M 54,67 A 105,105 0 0 0 54,216 105,105 0 0 0 202,216 105,105 0 0 0 227,107 L 193,107 A 74,74 0 0 1 180,193 74,74 0 0 1 76,193 74,74 0 0 1 76,89 74,74 0 0 1 154,73 L 154,91 190,56 154,20 V 40 A 105,105 0 0 0 54,67 Z'],
    ]);
    #getPathName() {
             if (this._layout.startsWith('r')){return `${(2===this._corn) ? 'bi-' : ''}row-2`}
        else if (this._layout.startsWith('c')){return 'col-2'}
        else if (this._layout.startsWith('q')){return 'base'}
        else if (Number.isInteger(this._path) && 0<this._path && this._path<5) {return `path-${this._path}`}
        else if (this._step) {return 'step'}
        else if (this._circle) {return 'circle'}
        else {return 4===this._corn ? 'quad' : (2===this._corn ? 'bi' : 'base')}
    }
    #getPath() {return ArrowIconElement.PATHS.get(this.#getPathName())}
    constructor() {
        super();
        //this._id = `icon-symbol-arrow`;
        this._id = `symbol-arrow-base`;
        // PATHS選択
        this._corn = 1; // 1/2/4
        this._path = 1; // 1/2/3/4
        this._num = 1; // 1/2/4
        this._layout = 'solo'; // solo/col/row/quad  -[iob](in/out/bi)
        this._portrait = false; // 0/1
        this._landscape = false; // 0/1
        this._step = false; // 0/1
        this._quarter = false; // 0/1
        // 属性
        this._sz = `1em`;
        this._col = `currentColor`;
        this._dir = `0`;
        this._wid = `16`;
        this._join = `miter`; // arcs|bevel|miter|miter-clip|round
        this._limit = `4`;
        this._fill = `0`; // fill-opacity
        this._scale = `1`;
        //this._type = `normal`; // normal/bi/half-height/half-width(単方向／双方向／高さ半分／幅半分)
        this._bi = `0`; // 0/1 0:単方向 1:双方向(反対側にも矢印の頭が付く)
//        if (!document.querySelector(`#${this._id}`)) {document.querySelector('head').append(this.#getArrowSymbol())}
        if (!document.querySelector(`#${this._id}`)) {document.querySelector('head').insertAdjacentHTML('beforeend', this.#mkSprite())}
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
    #mkSymbol(id, d) {return `<symbol id="${id}" viewBox="0 0 256 256"><path d="${d}"/></symbol>`}
    #mkSprite() {return `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>${ArrowIconElement.PATHS.map(([k,v])=>this.#mkSymbol(`symbol-arrow-${k}`, v)).join('')}</defs></svg>`}
    /*
    #getPaths() { return {
        ' ': 'M 120 21 L 13 128 L 120 235 L 120 176 L 243 176 L 243 80 L 120 80 L 120 21 z ',
        'bi': 'M 86,27 12,128 86,229 V 176 H 170 V 229 L 244,128 170,27 V 80 H 86 Z',
        'bi-row-2': 'M 54 19 L 11 63 L 54 106 L 54 83 L 202 83 L 202 108 L 245 64 L 202 21 L 202 42 L 54 42 L 54 19 z ',
        'row-2': 'M 59 19 L 11 67 L 59 115 L 59 86 L 246 86 L 246 46 L 59 46 L 59 19 z ',
        'col-2': 'M 60,36 14,128 59,220 59,167 H 112 V 89 H 60 Z',
        'path-2': 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z ',
        'path-3': 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 200 L 11 200 L 11 246 L 196 246 L 243 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z ',
        'path-4': 'M 76 20 L 12 84 L 76 147 L 76 110 L 196 110 L 196 200 L 61 200 L 61 165 L 12 165 L 12 200 L 11 200 L 11 246 L 196 246 L 243 246 L 245 246 L 245 61 L 244 61 L 244 61 L 76 61 L 76 20 z ',
        'step': 'M 76 20 L 12 84 L 76 147 L 76 106 L 135 106 L 135 198 L 135 247 L 184 247 L 243 247 L 243 198 L 184 198 L 184 106 L 184 106 L 184 57 L 76 57 L 76 20 z ',
        'quad': 'M 128 9 L 78 38 L 104 38 L 104 103 L 38 103 L 38 78 L 9 128 L 38 178 L 38 152 L 104 152 L 104 218 L 78 218 L 128 247 L 178 218 L 152 218 L 152 152 L 218 152 L 218 178 L 247 128 L 218 78 L 218 103 L 152 103 L 152 38 L 178 38 L 128 9 z ',
        'quarter': 'M 120 21 L 13 128 L 120 235 L 120 176 L 243 176 L 243 80 L 120 80 L 120 21 z ',
    } }
    */
}
customElements.define("icon-arrow", ArrowIconElement, {extends:'i'});
