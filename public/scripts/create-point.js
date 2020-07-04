function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // função anonima que retorna um valor.
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }
        
    } )
}

populateUfs()



function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    // função anonima que retorna um valor.
    .then( res => res.json() )
    .then( cities => {
        
        
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled = false
    } )
    
}

//  procura pelo campo utilizando o nome.
 document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
 //ouvidor de eventos 


 //itens de coleta
// variavel          =  procura pelo LI
 const itemsToCollect = document.querySelectorAll(".items-grid li")

 // estrtutura de repetição
 //  criar variavel item que vai receber algo da variavel itemstocolected, nesse caso ira adicionar o evento de click.

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

//criação da função de seleção, quando o evento é disparado em cima ele entra na função. 
function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemID = itemLi.dataset.id

    // console.log('ITEM ID: ', itemID)

//verificar se existem itens selecionados, se sim 
//pegar os itens selecionados

//   criação de variavel = recebe os items do let acima.procura no index do let acima( se achar o item executa a função)
const alreadySelected =selectedItems.findIndex( function(item) {
    //quando for feito o clique a função item ira comparar com o id registrado, caso seja armazenara no alreadyselected
    //essa função pode ser simplificada == item => item==itemID
    const intemFound = item == itemID
    return intemFound
}) 


//se ja estiver selecionado, tirar da seleção
if(alreadySelected >= 0){
    //remover seleção
    const filteredItems = selectedItems.filter(item =>{
     const itemIsDifferent = item != itemID
     return itemIsDifferent
})
selectedItems = filteredItems

//se nao estiver selecionado, adicionar a seleção
}else {
    selectedItems.push(itemID)
}

// console.log('selectedItems: ', selectedItems)
//atualizar o campo escondido com os itens selecionados 
collectedItems.value = selectedItems
}
