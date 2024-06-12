export const Modal = (modalData = []) =>{
    const pageContentModal = 
    `
        <div class="content-modal">
            <ul class="modal">
                ${modalData.map(data=>
                    `
                        <li>${data.id}</li>
                    `
                )}
            </ul>       
        </div>
    
    `
    const logicPageContentModal = () =>{
        console.log(modalData)
    }
    return {
        pageContentModal,
        logicPageContentModal
    }
}