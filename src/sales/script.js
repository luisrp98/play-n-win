import { createModal } from '../assets/scripts/modal.js'
const btn_sell = document.querySelector('.btn-sell')

btn_sell.addEventListener('click', () => {
    createModal('modal-sale')
})
