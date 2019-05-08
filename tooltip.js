class Tooltip extends HTMLElement{
    /**Life Cycle customComponent 1..
     * Basic Initialize
     */
    constructor(){
        super();
        console.log('It is working ');
        this.tooltipContainer;
        this.tootipText = 'Some dummy tooltip text ';
        // active shadow dom
        this.attachShadow({mode:'open'});
        // Method 1...
        // const template = document.querySelector("#tooltip-template");
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Method 2 ...
        this.shadowRoot.innerHTML = `
        <style>
            div{
                background-color:black;
                color:white;
                z-index:10;
                position:absolute;
            }
        </style>
         <span>(?)</span>
         <slot>Some default Value</slot>
         `;
    }
    /**
     * Life Cycle customComponent 2..
     * DOM Initialize
     * Attached Element DOM
     */
    connectedCallback(){
        // get data from attrbuite text 
        if(this.hasAttribute('text')){
            this.tootipText = this.getAttribute('text');
        }

        // append dom inside uc-tooltip
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = '(?)';
        const tooltipIcon2 = this.shadowRoot.querySelector('span');
        // add eventlistener for uc-tooltip || use bind to send this object class
        tooltipIcon.addEventListener('mouseenter',this.__showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave',this.__hideTooltip.bind(this));

        tooltipIcon2.addEventListener('mouseenter',this.__showTooltip.bind(this));
        tooltipIcon2.addEventListener('mouseleave',this.__hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
    }
    /** Life Cycle customComponent 2..
     * Clean Work
     * Detached DOM
    */
    disConnectCallback(){}
    /**
     * run show tooltip when mouse enter in us-tooltip
     */
    __showTooltip(){
        this.tooltipContainer = document.createElement('div');
        // this.tooltipContainer.textContent = 'this is tooltip text';
        this.tooltipContainer.textContent = this.tootipText;
        this.shadowRoot.appendChild(this.tooltipContainer);
    } 
    /**
     *  run hid tooltip when mouse leave  in us-tooltip
     */
    __hideTooltip(){
        this.shadowRoot.removeChild(this.tooltipContainer);
    }

}
customElements.define('uc-tooltip',Tooltip);