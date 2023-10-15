// alert('Deu bom')
//verificar se está linkado html com javascript

//criou uma variavelconstante para o botão
const button = document.querySelector(".button-task")
//quando se escreve "document" se refere ao html, queryselector para pegar um elemento do html
//criou uma variavel botao para pegar o elemento  do html "document" com o "querySelector",
//referenciando a classe css do botão

//mesma lógica para o input
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')


//cria um array para armazenar o valor recebido pela função
let myList = []



function newTask(){
  myList.push({
    task: input.value,
    done: false
//objeto recebe o valor do input da task, outro chamado "done" que por padrão terá falso para
//saber se a tarefa foi concluida ou não
  })
  //irá se ultilizar um objeto
  //pode usar o metodo push para toda vez que clicar no botão , ativar a função, que vai..
  //pega o valor da varivel input e por no array "myList"
  input.value = ' '
  //para após de adicionar , limpar o campo
  showTask()
}

function showTask(){
    //${taskreceive.done} usado para criar condição que se for true cria a classe "done"
    let newItem = ''
    myList.forEach((taskReceive, posicao) => {
        newItem = newItem + `<li class="task ${taskReceive.done && "done"}">
                       <img src="./img/checked.png" alt="checked" onclick="taskDone(${posicao})">
                       <p>${taskReceive.task}</p>
                       <img src="./img/trash.png" alt="trash" onclick="deleteTask(${posicao})">
                   </li>`
                   //segundo paramentro "posição" ou index para pegar o valor específico do array
                   //pela posição e passar para função
    })
    //forEach vai iterar o array, e vai pegar os valores iterados...
    //passar em função, onde o item do array que é um objeto  se torna a variavel taskreceive.task
    //para receber apenas o "task"
    //monta o item "li" do html agora com a variavel recebida da iteração do array
    //newItem+ para pegar o que já tem e adicionar um novo
    completeList.innerHTML = newItem
    //com o inner html adiciona à lista completa na página html...
    //a estrutura criada na variavel newItem 
    localStorage.setItem('list', JSON.stringify(myList))
    //comando para salvar itens no local storage do navegador(setItem), primeiro o nome,após os itens(so aceita strings)
    //JSON.stringify(),transforma tudo dentro dele em uma string
}
//função que irá mostrar na tela o que foi guardado no array usando innerHtml
//manda um html pronto do que foi digitado no input , recebido pela função newTask, passado pro array..
//após isso recebido pela função showTask para ser passado um html "li"(item de lista) novo pra página
function deleteTask(posicao){
    myList.splice(posicao,1)
    //metodo splice deleta dentro do array, primeiro passa a posição(que seria o parametro)
    //após quantos itens apartir dessa posição
    //função irá pegar o parametro index passado no foreach e deletar 
    showTask()
    //chama a função showTask para de igual modo deletar a estrutura html e não apenas o valor
}


function taskDone(posicao){
    myList[posicao].done = !myList[posicao].done

    showTask()

} 
//função recebe posição do array , no item done do objeto
//com o "!", inverte o valor recebido da posição  "done" do 
function reloadScreen(){
    const localstoragetask = localStorage.getItem('list')
    //variável criada para armazenar o que for guardado no local storage
    //".getitem" para pegar item que está no local storage
    if(localstoragetask){
        myList = JSON.parse(localstoragetask)
    }

    showTask()
    //coloca o armazenado no local storage no array e usa o JSON.parse para transforma devolta em objeto
}
reloadScreen()
button.addEventListener('click', newTask)
//"de olho no botão", qualquer evento relacionado ao botão ele avisa
//no caso configurado para quando o botão for clicado 'click'
//após isso chama a função "inputValue" previamente definida

        //    <li class="task">
        //         <img src="./img/checked.png" alt="checked">
        //         <!--imagem de check antes da palavra da lista-->
        //         <p>Estudar programação</p>
        //         <img src="./img/trash.png" alt="trash">
        //         <!--imagem de trash após-->
        //     </li>