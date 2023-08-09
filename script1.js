class Produto { // classe

    constructor(){ //método
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        
    }

    /* salvar() chamada quando se adiciona produto. 
    a funcao validaCampos() confere se os campos estao preenchidos
    se estiverem preenchidos chama a função adicionar() onde se adicionam os itens no array
    */
    salvar(){ 
    
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if(this.editId == null) {
                this.adicionar(produto);
            }else{
                this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() { 
        //método - lista os elementos do vetor para exibir ao usuário na tabela 'tbody'
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        //vetor onde são armazenados os dados e exibidos na tabela tbody
        for(let i = 0; i < this.arrayProdutos.length; i++){
           
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');
        
            let imgEdit = document.createElement('img');
            imgEdit.src = 'edit.svg';
            imgEdit.setAttribute("onclick","produto.preparaEditar(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'delete.svg';
            imgDelete.setAttribute("onclick","produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
  
        }
    }

    adicionar(produto) {  
        /*método adicionar() onde se adicionam os itens no array e 
        monta no for[] para exibir ao usuário */

        produto.preco = parseFloat(produto.preco) //converte o string para number
        this.arrayProdutos.push(produto); //adiciona item ao array
        this.id++;
    }

    atualizar(id, produto) { //método
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEditar(dados) {//método
        this.editId = dados.id;
        
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';


    }

    lerDados() {//método
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validaCampos(produto){
        //método que percorre os campos de string e verifica se os mesmos estão preenchidos
        // se estiverem vazios, retorna o alert com as respectivas mensagens.
        let msg = '';
        
        if(produto.nomeProduto == ''){
            msg += '- Informe o nome do Produto \n';
        }

        if(produto.preco == ''){
            msg += '- Informe o preço do Produto \n';
        }

        if(msg != ''){
           alert(msg);
           return false
        }

        return true;
    }

    cancelar(){
        //método
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;

    }

    deletar(id){
        if(confirm('Deseja realmente deletar o produto do ID ' + id)) {
            let tbody =  document.getElementById('tbody');
           
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id)
                this.arrayProdutos.splice(i,1);
                tbody.deleteRow(i);
            }
            }
            console.log(this.arrayProdutos);
    }

}

var produto = new Produto() //método construtor