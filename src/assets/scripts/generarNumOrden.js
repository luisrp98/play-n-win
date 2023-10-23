export function generarNumOrden() {
    const date = new Date()
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const randomNum = Math.floor(Math.random() * 900) + 100
    const orderNum = `${randomNum}${day}${month}${year}${hour}${minutes}`
    return orderNum
}
