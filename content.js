
// aux function START
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


const chooseRadioByValue = (value) => {
    document.querySelector(`input[type=radio][value=${value}]`).click()
}

const getDefaultNumber = (el) => {
    const re = /\d/
    text = re.exec(el.innerText)[0]
    return parseInt(text)
}

const clickInc = (button, diff) => {
    const nOfClicks = Math.abs(diff)
    for(let i = 0; i < nOfClicks; i++) button.click()
}

const  handleInc = (numberParam, incSelectorIndex) => {
    const incElement = document.querySelectorAll('div[role=group]')[incSelectorIndex]
    const defaultNumber = getDefaultNumber(incElement)
    const diff = numberParam - defaultNumber
    const button = diff > 0 ? 
                        incElement.querySelectorAll('button')[1] 
                        : incElement.querySelectorAll('button')[0]


    clickInc(button, diff)


}

const getButtonFromInnerText = (buttons_list, query) => {
    for (let i = 0; i < buttons_list.length; i++) {
       let title = buttons_list[i].innerText.toLowerCase()
        if(title === query.toLowerCase()){
            return buttons_list[i]
        }
        
    }
}

const getIncIndexByQuery = (query) => {
    const re = new RegExp(query, 'i')
    all_incs = document.querySelectorAll('div[role=group]')
    for (let i = 0; i < all_incs.length; i++) {
        let iterationMatch = re.exec(all_incs[i].innerText)
        if(iterationMatch !== null){
            if (iterationMatch[0] === query) return i;
        }
    }
}
// aux function END
////////////////////////////////////

const chooseRoomType = () => {
   
    const roomTypeDropdown = document.querySelector('div[role=button]')
    roomTypeDropdown.click()
    // filter options to find the one we want and click on it
    const optionParam = 'Quarto inteiro'.toLowerCase()
    const chosen = getChosenFromDisguisedDropdown(optionParam, 2)
    chosen.click()
}

const handleRoomPage = () => {
    
    // property type
    chooseFromDisguisedDropdown("description-dropdown-property-type-group", 'Apartamento', 2)
    
    // divided property type
    chooseFromDisguisedDropdown("divided-dropdown-property-type", 'Apartamento', 1)

    // room type
    chooseFromDisguisedDropdown("description-dropdown-room_type", 'Quarto inteiro', 2)
    chooseRadioByValue('keep_personal_belonging_here')
    
}

const handleBedroomsPage = () => {
   //select number of guests
   handleInc(3, 0)

   // select number of beds
   handleInc(3, 1)

   const buttons_in_page = document.querySelectorAll('button')

   const addBedsButton = getButtonFromInnerText(buttons_in_page, 'Adicionar camas')
   addBedsButton.click()

   const typeOfBedIndex = getIncIndexByQuery('Sofá')
   handleInc(2, typeOfBedIndex)
 
}


// "main"
chrome.runtime.onMessage.addListener((url) => {
    if(url === 'https://www.airbnb.com.br/become-a-host'){
        chooseRoomType()
    }
    
    if(url === 'https://www.airbnb.com.br/become-a-host/room'){
        alert('Pressione o botão mais uma vez para preencher os dois campos restantes')
        handleRoomPage()  
    } 

    if(url === 'https://www.airbnb.com.br/become-a-host/bedrooms'){
        handleBedroomsPage()  
    } 
})
