import express from 'express';
import bodyParser from 'body-parser';

const app = express();

//configurar a nossa aplicação para receber os dados do formulário
//você pode escolher entre duas bibliotecas: QS ou QueryString
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0'; //ip refere-se a todas as interfaces (placas de rede) locais

var listaAlunos = []; //variável global - lista para armazenar os alunos cadastrados

//implementar a funcionalidade para entregar um formulário html para o cliente
function cadastroAlunoView(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Alunos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Alunos</h1>
                        <form method="POST" action="/cadastrarAluno" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome"  placeholder="Digite seu nome" >
                             </div>
                             <div class="col-md-4">
                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome" >
                             </div>
                             <div class="col-md-4">
                                <label for="email" class="form-label">email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="email" name="email" >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade" >
                            </div>
                            <div class="col-md-3">
                                <label for="estado" class="form-label">UF</label>
                                <select class="form-select" id="estado" name="estado" >
                                    <option selected value="SP">São Paulo</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cep" class="form-label">Cep:</label>
                                <input type="text" class="form-control" id="cep" name="cep" >
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                            </div>
                            </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
    `);
}

function menuView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Alunos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MENU</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarAluno">Cadastrar Aluno</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function cadastrarAluno(req, resp) {
    //recuperar os dados do formulário enviados para o servidor
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const cep = req.body.cep;

    if (nome && sobrenome && email && cidade && estado && cep) {

        const aluno = { nome, sobrenome, email, cidade, estado, cep };

        //adicionar o aluno na lista
        listaAlunos.push(aluno);

        //mostrar a lista de alunos já cadastrados

        resp.write(`
        <html>
            <head>
                <title>Lista de alunos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cep</th>
                    </tr>
                </thead>
                <tbody>`);
        //adicionar as linhas da tabela
        //para cada aluno, nós devemos criar uma linha na tabela
        for (var i = 0; i < listaAlunos.length; i++) {
            resp.write(`<tr>
                                    <td>${listaAlunos[i].nome}</td>
                                    <td>${listaAlunos[i].sobrenome}</td>
                                    <td>${listaAlunos[i].email}</td>
                                    <td>${listaAlunos[i].cidade}</td>
                                    <td>${listaAlunos[i].estado}</td>
                                    <td>${listaAlunos[i].cep}</td>
                                </tr>
                        `);
        }

        resp.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastrarAluno">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
            `);
    }//fim do if de verificação
    else {//feedback ao usuario
        resp.write(`<html>
                        <head>
                            <title>Cadastro de Alunos</title>
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <div class="container text-center">
                                <h1 class="mb-5">Cadastro de Alunos</h1>
                                <form method="POST" action="/cadastrarAluno" class="border p-3 row g-3" novalidate>
                                    <div class="col-md-4">
                                        <label for="nome" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="nome" name="nome"  placeholder="Digite seu nome" value="${nome}" >
                                    </div>
                            `);
                            if(!nome){
                                resp.write(`
                                <div>
                                    <span><p class="text-danger">Por favor, informe o nome do aluno</p></span>
                                </div>
                            `);}
                            resp.write(`
                                <div class="col-md-4">
                                    <label for="sobrenome" class="form-label">Sobrenome</label>
                                    <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${sobrenome}" >
                                </div>
                                `);
                                if(!sobrenome){
                                    resp.write(`
                                        <div>
                                            <span><p class="text-danger">Por favor, informe o nome do aluno</p></span>
                                        </div>
                                             `);
                                }
                                resp.write(`
                                    <div class="col-md-4">
                                        <label for="email" class="form-label">email</label>
                                        <div class="input-group has-validation">
                                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                                            <input type="text" class="form-control" id="email" name="email value="${email}" >
                                        </div>
                                    </div>
                                    `);
                                    if(!email){
                                        resp.write(`
                                            <div>
                                                <span><p class="text-danger">Por favor, informe o email </p></span>
                                            </div>
                                                 `);
                                    }
                                resp.write(`
                                            <div class="col-md-6">
                                                <label for="cidade" class="form-label">Cidade</label>
                                                <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" >
                                            </div>
                                         `);
                                    if(!cidade){
                                        resp.write(`
                                            <div>
                                                <span><p class="text-danger">Por favor, informe a cidade </p></span>
                                            </div>
                                                 `);
                                    }
                                resp.write(`
                                            <div class="col-md-3">
                                            <label for="estado" class="form-label">UF</label>
                                            <select class="form-select" id="estado" name="estado" value="${estado}" >`);
                                            if(estado == "AC") {
                                                resp.write(`<option selected value="AC">Acre</option>`);
                                            } else {
                                                resp.write(`<option value="AC">Acre</option>`);
                                            }
                                            if(estado == "AL") {
                                                resp.write(`<option selected value="AL">Alagoas</option>`);
                                            } else {
                                                resp.write(`<option value="AL">Alagoas</option>`);
                                            }
                                            if(estado == "AP") {
                                                resp.write(`<option selected value="AP">Amapá</option>`);
                                            } else {
                                                resp.write(`<option value="AP">Amapá</option>`);
                                            }
                                            if(estado == "AM") {
                                                resp.write(`<option selected value="AM">Amazonas</option>`);
                                            } else {
                                                resp.write(`<option value="AM">Amazonas</option>`);
                                            }
                                            if(estado == "BA") {
                                                resp.write(`<option selected value="BA">Bahia</option>`);
                                            } else {
                                                resp.write(`<option value="BA">Bahia</option>`);
                                            }
                                            if(estado == "CE") {
                                                resp.write(`<option selected value="CE">Ceará</option>`);
                                            } else {
                                                resp.write(`<option value="CE">Ceará</option>`);
                                            }
                                            if(estado == "DF") {
                                                resp.write(`<option selected value="DF">Distrito Federal</option>`);
                                            } else {
                                                resp.write(`<option value="DF">Distrito Federal</option>`);
                                            }
                                            if(estado == "ES") {
                                                resp.write(`<option selected value="ES">Espírito Santo</option>`);
                                            } else {
                                                resp.write(`<option value="ES">Espírito Santo</option>`);
                                            }
                                            if(estado == "GO") {
                                                resp.write(`<option selected value="GO">Goiás</option>`);
                                            } else {
                                                resp.write(`<option value="GO">Goiás</option>`);
                                            }
                                            if(estado == "MA") {
                                                resp.write(`<option selected value="MA">Maranhão</option>`);
                                            } else {
                                                resp.write(`<option value="MA">Maranhão</option>`);
                                            }
                                            if(estado == "MT") {
                                                resp.write(`<option selected value="MT">Mato Grosso</option>`);
                                            } else {
                                                resp.write(`<option value="MT">Mato Grosso</option>`);
                                            }
                                            if(estado == "MS") {
                                                resp.write(`<option selected value="MS">Mato Grosso do Sul</option>`);
                                            } else {
                                                resp.write(`<option value="MS">Mato Grosso do Sul</option>`);
                                            }
                                            if(estado == "MG") {
                                                resp.write(`<option selected value="MG">Minas Gerais</option>`);
                                            } else {
                                                resp.write(`<option value="MG">Minas Gerais</option>`);
                                            }
                                            if(estado == "PA") {
                                                resp.write(`<option selected value="PA">Pará</option>`);
                                            } else {
                                                resp.write(`<option value="PA">Pará</option>`);
                                            }
                                            if(estado == "PB") {
                                                resp.write(`<option selected value="PB">Paraíba</option>`);
                                            } else {
                                                resp.write(`<option value="PB">Paraíba</option>`);
                                            }
                                            if(estado == "PR") {
                                                resp.write(`<option selected value="PR">Paraná</option>`);
                                            } else {
                                                resp.write(`<option value="PR">Paraná</option>`);
                                            }
                                            if(estado == "PE") {
                                                resp.write(`<option selected value="PE">Pernambuco</option>`);
                                            } else {
                                                resp.write(`<option value="PE">Pernambuco</option>`);
                                            }
                                            if(estado == "PI") {
                                                resp.write(`<option selected value="PI">Piauí</option>`);
                                            } else {
                                                resp.write(`<option value="PI">Piauí</option>`);
                                            }
                                            if(estado == "RJ") {
                                                resp.write(`<option selected value="RJ">Rio de Janeiro</option>`);
                                            } else {
                                                resp.write(`<option value="RJ">Rio de Janeiro</option>`);
                                            }
                                            if(estado == "RN") {
                                                resp.write(`<option selected value="RN">Rio Grande do Norte</option>`);
                                            } else {
                                                resp.write(`<option value="RN">Rio Grande do Norte</option>`);
                                            }
                                            if(estado == "RS") {
                                                resp.write(`<option selected value="RS">Rio Grande do Sul</option>`);
                                            } else {
                                                resp.write(`<option value="RS">Rio Grande do Sul</option>`);
                                            }
                                            if(estado == "RO") {
                                                resp.write(`<option selected value="RO">Rondônia</option>`);
                                            } else {
                                                resp.write(`<option value="RO">Rondônia</option>`);
                                            }
                                            if(estado == "RR") {
                                                resp.write(`<option selected value="RR">Roraima</option>`);
                                            } else {
                                                resp.write(`<option value="RR">Roraima</option>`);
                                            }
                                            if(estado == "SC") {
                                                resp.write(`<option selected value="SC">Santa Catarina</option>`);
                                            } else {
                                                resp.write(`<option value="SC">Santa Catarina</option>`);
                                            }
                                            if(estado == "SP") {
                                                resp.write(`<option selected value="SP">São Paulo</option>`);
                                            } else {
                                                resp.write(`<option value="SP">São Paulo</option>`);
                                            }
                                            if(estado == "SE") {
                                                resp.write(`<option selected value="SE">Sergipe</option>`);
                                            } else {
                                                resp.write(`<option value="SE">Sergipe</option>`);
                                            }
                                            if(estado == "TO") {
                                                resp.write(`<option selected value="TO">Tocantins</option>`);
                                            } else {
                                                resp.write(`<option value="TO">Tocantins</option>`);
                                            }
                                            resp.write(`
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="cep" class="form-label">Cep:</label>
                                                <input type="text" class="form-control" id="cep" name="cep" value="${cep}" >
                                            </div>
                                    `);
                                    if(!cep){
                                        resp.write(`
                                            <div>
                                                <span><p class="text-danger">Por favor, informe o CEP </p></span>
                                            </div>
                                                 `);
                                    }
                                    resp.write(`
                                        <div class="col-12">
                                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                                        </div>
                                    </form>
                                </div>
                            </body>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                        </html>`);
                                        
                                    
    }
    resp.end();//será enviada a resposta
}

app.get('/', menuView);
app.get('/cadastrarAluno', cadastroAlunoView); //enviar o formulário para cadastrar alunos
//a novidade desta aula é o método POST
app.post('/cadastrarAluno', cadastrarAluno);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});