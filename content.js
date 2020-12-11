
// find and click on the disguised dropdown

const getChosenFromDisguisedDropdown = () => {
    
}

const chooseRoomType = () => {
   
    const roomTypeDropdown = document.querySelector('div[role=button]')
    roomTypeDropdown.click()

    // filter options to find the one we want and click on it
    const options = document.querySelectorAll('div[role=option]')

    const optionParam = 'Quarto inteiro'.toLowerCase()
    let chosen;

    for(let i = 0; i < options.length; i++){
        title = options[i].firstElementChild.firstElementChild.innerText.toLowerCase()
        if(title === optionParam){
            chosen = options[i]
        }
    }
    chosen.click()
}

const choosePropertyType = () => {
    const id="description-dropdown-property-type-group"
    const propertyTypeDropDown = document.getElementById(id)
    propertyTypeDropDown.click()
    
    const options = document.querySelectorAll('div[role=option]')
    const propertyTypeParam =  'Casa'.toLowerCase()
    let chosen;
    for(let i = 0; i < options.length; i++){
        const title = options[i].firstElementChild.firstElementChild.innerText.toLowerCase()
        if(title === propertyTypeParam){
            chosen = options[i]
        }
    }
    chosen.click()
    dividedDropdown = document.getElementById("divided-dropdown-property-type")
    dividedDropdown.click()
}

chrome.runtime.onMessage.addListener((url) => {
    if(url === 'https://www.airbnb.com.br/become-a-host') chooseRoomType()
    if(url === 'https://www.airbnb.com.br/become-a-host/room') choosePropertyType()
})
