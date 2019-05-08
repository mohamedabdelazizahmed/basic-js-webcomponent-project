class ConfirmLink extends HTMLAnchorElement{
    connectedCallback(){
        this.addEventListener('click',event=>{
            if(!confirm('Do you really want leave ? ')){
                event.preventDefault();
            }
        })
    }
}

customElements.define('uc-confirm-link', ConfirmLink,{ extends:'a' });