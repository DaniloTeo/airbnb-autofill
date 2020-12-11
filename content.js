

const getElementInnerText = (option, levels) => {
    if (levels == 1){
        return option.firstElementChild.innerText.toLowerCase()
    }
    if(levels == 2){
        return option.firstElementChild.firstElementChild.innerText.toLowerCase()
    }
}

const getChosenFromDisguisedDropdown = (optionParam, levels) => {
    const optionList = document.querySelectorAll('div[role=option]')
    for(let i = 0; i < optionList.length; i++){
        title = getElementInnerText(optionList[i], levels)
        if(title === optionParam){
            return optionList[i]
        }
    }
}

const chooseFromDisguisedDropdown = (id, param, level) => {
    const dropdown = document.getElementById(id)
    dropdown.click()
    const chosen = getChosenFromDisguisedDropdown(param.toLowerCase(), level)

    chosen.click()
}


const chooseRoomType = () => {
   
    const roomTypeDropdown = document.querySelector('div[role=button]')
    roomTypeDropdown.click()

    // filter options to find the one we want and click on it
    const options = document.querySelectorAll('div[role=option]')

    const optionParam = 'Quarto inteiro'.toLowerCase()
    const chosen = getChosenFromDisguisedDropdown(optionParam, options, 2)
    chosen.click()
}

const handleRoomPageTopHalf = () => {
    // property type
    chooseFromDisguisedDropdown("description-dropdown-property-type-group", 'Apartamento', 2)
    
    // divided property type
    chooseFromDisguisedDropdown("divided-dropdown-property-type", 'Apartamento', 1)
    // document.scroll(0,200)
    // //room type
    // const roomTypeDropdown = document.getElementById("description-dropdown-room_type")
    // roomTypeDropdown.click()

    // const roomTypeParam = 'Quarto inteiro'.toLowerCase()
    // const chosenRoom = getChosenFromDisguisedDropdown(roomTypeParam, 2)
    // chosenRoom.click()
}
const handleRoomPageBottomHalf = () => {
    
    chooseFromDisguisedDropdown("description-dropdown-room_type", 'Quarto inteiro', 2)
    
}

chrome.runtime.onMessage.addListener((url) => {
    if(url === 'https://www.airbnb.com.br/become-a-host') chooseRoomType()
    if(url === 'https://www.airbnb.com.br/become-a-host/room') handleRoomPageTopHalf();handleRoomPageBottomHalf();
})
