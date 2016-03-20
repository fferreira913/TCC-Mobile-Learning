angular.module('starter')

.controller('loginCtrl', function($scope, $state, $stateParams, $http, fac){
	$scope.aluno = {
        nome:'',
        sobrenome:'',
        login:'',
        senha:'',
        curso:'',
        descricao:'',
        dataParticipacao:'',
        foto:'',
        email:'',
        instituicao:'',
        foto:''
    }

	$scope.salvarAluno = function(){
		fac.salvar($scope.aluno);
	}

	$scope.loginAl = function(){
		fac.loginAluno($scope.aluno);
	}

})

.controller('alunoCtrl', function($scope, $state, $stateParams, $http, fac){

	$scope.alunoSessao = {
        nome:'',
        sobrenome:'',
        login:'',
        senha:'',
        curso:'',
        descricao:'',
        dataParticipacao:'',
        foto:'',
        email:'',
        instituicao:'',
        foto:''
    }

	var caminho = "http://192.168.2.5:8080/App-Servidor/Login?loginAl="
    var url = caminho.concat($stateParams.login);

    $http.get(url).then(function(response){
        $scope.alunoSessao = response.data;
    });

    /*Horario do dia*/
    var aux = "http://192.168.2.5:8080/App-Servidor/Horarios?loginAl=";
    var temp = aux.concat($stateParams.login);

    $http.get(temp).then(function(response) {
        $scope.turmas = response.data;
    });
})

.controller('turmasCtrl', function($scope, $state, $stateParams, $http){

	$scope.login = $stateParams.alunoLogin;

	var caminho = "http://192.168.2.5:8080/App-Servidor/Turmas?loginAl=";
    var url = caminho.concat($stateParams.alunoLogin);

    $http.get(url).then(function(response) {
        $scope.turmasAluno = response.data;
    });

    $scope.codigoTurma = $stateParams.turmaCod;
})

.controller('turmaHomeCtrl', function($scope, $state, $stateParams, $http){

    $scope.codigoTurma = $stateParams.turmaCodigo;

    var caminho = "http://192.168.2.5:8080/App-Servidor/TurmaSelect?codigo=";
    var url = caminho.concat($stateParams.turmaCodigo);

    $http.get(url).then(function(response) {
        $scope.turma = response.data;
    });

    var caminho1 = "http://192.168.2.5:8080/App-Servidor/HorarioDia?codigo=";
    var url1 = caminho1.concat($stateParams.turmaCodigo)
        
    $http.get(url1).then(function(response) {
        $scope.horarioDia = response.data;
    });

    /*
    var caminho2 = "http://192.168.2.9:8080/App-Servidor/HorariosTurma?codigo=";
    var url2 = caminho1.concat($stateParams.turmaCodigo)
        
    $http.get(url2).then(function(response) {
        $scope.horarios = response.data;
    });*/

})

.controller('turmaHorarioCtrl', function($scope, $state, $stateParams, $http){

	$scope.cod = $stateParams.codTurma;

	var caminho = "http://192.168.2.5:8080/App-Servidor/HorariosTurma?codigo=";
	var segunda = caminho.concat($stateParams.codTurma);
    var url = segunda.concat("&dia=Segunda-Feira")
        
    $http.get(url).then(function(response) {
        $scope.horariosSegunda = response.data;
    })

    var caminho1 = "http://192.168.2.5:8080/App-Servidor/HorariosTurma?codigo=";
	var terca = caminho1.concat($stateParams.codTurma);
    var url1 = terca.concat("&dia=Terça-Feira")
        
    $http.get(url1).then(function(response) {
        $scope.horariosTerca = response.data;
    })

    var caminho2 = "http://192.168.2.5:8080/App-Servidor/HorariosTurma?codigo=";
	var quarta = caminho2.concat($stateParams.codTurma);
    var url2 = terca.concat("&dia=Quarta-Feira")
        
    $http.get(url2).then(function(response) {
        $scope.horariosQuarta = response.data;
    })

    var caminho3 = "http://192.168.2.5:8080/App-Servidor/HorariosTurma?codigo=";
	var quinta = caminho3.concat($stateParams.codTurma);
    var url3 = terca.concat("&dia=Quinta-Feira")
        
    $http.get(url3).then(function(response) {
        $scope.horariosQuinta = response.data;
    })

    var caminho4 = "http://192.168.2.5:8080/App-Servidor/HorariosTurma?codigo=";
	var sexta = caminho4.concat($stateParams.codTurma);
    var url4 = terca.concat("&dia=Sexta-Feira")
        
    $http.get(url4).then(function(response) {
        $scope.horariosSexta = response.data;
    })

})

.controller('turmaAlunosCtrl', function($scope, $state, $stateParams, $http){

    $scope.turmaAluno = $stateParams.codigoTurma;

	var caminho = "http://192.168.2.5:8080/App-Servidor/AlunosTurma?codigo=";
	var url = caminho.concat($stateParams.codigoTurma)
        
    $http.get(url).then(function(response) {
        $scope.alunosTurma = response.data;
    })    

})

.controller('alunoDetalheCtrl', function($scope, $state, $stateParams, $http){

    $scope.alunoId = $stateParams.alunoId;
    $scope.turmaAlId = $stateParams.turmaId;

	var caminho = "http://192.168.2.5:8080/App-Servidor/AlunoDetalhe?login=";
    var aux = caminho.concat($stateParams.alunoId)
    var temp = aux.concat("&turma=");
    var url = temp.concat($stateParams.turmaId);

    $http.get(url).then(function(response) {
        $scope.alunoTurma = response.data;
    })    

})

.controller('turmaNotasCtrl', function($scope, $state, $stateParams, $http){

    $scope.notasTurmaId = $stateParams.turmaCod;

	var caminho = "http://192.168.2.5:8080/App-Servidor/NotasTurma?codigo=";
	var url = caminho.concat($stateParams.turmaCod)
        
    $http.get(url).then(function(response) {
        $scope.notas = response.data;
    })    

})

.controller('verNotasCtrl', function($scope, $state, $stateParams, $http){

    $scope.notaCod = $stateParams.notaId;

	var caminho = "http://192.168.2.5:8080/App-Servidor/VerNota?codigo=";
	var url = caminho.concat($stateParams.notaId)
        
    $http.get(url).then(function(response) {
        $scope.nota = response.data;
    })    

})

.controller('gruposCtrl', function($scope, $state, $stateParams, $http){

    $scope.loginAlunoGrupo = $stateParams.loginAluno;

    var caminho = "http://192.168.2.5:8080/App-Servidor/GruposAluno?login=";
    var url = caminho.concat($stateParams.loginAluno)
        
    $http.get(url).then(function(response) {
        $scope.grupos = response.data;
    })    

})

.controller('alunosGrupoCtrl', function($scope, $state, $stateParams, $http){

    $scope.grupoCod = $stateParams.codGrupo;

    var caminho = "http://192.168.2.5:8080/App-Servidor/MembrosGrupo?codigo=";
    var url = caminho.concat($stateParams.codGrupo)
        
    $http.get(url).then(function(response) {
        $scope.membros = response.data;
    })    
})

.controller('arquivosGrupoCtrl', function($scope, $state, $stateParams, $http){

    $scope.grupoCodArquivo = $stateParams.codGrupo;
    
    $scope.file = {
        conteudo: '',
        arquivo: ''
    }
    
    $scope.enviar = function(){
        alert("Descricao: " +$scope.file.arquivo);
        delete $scope.file;
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/Arquivos?grupo=";
    var url = caminho.concat($stateParams.codGrupo)
        
    $http.get(url).then(function(response) {
        $scope.arquivos = response.data;
    })    
})

.controller('infoGrupoCtrl', function($scope, $state, $stateParams, $http){

    $scope.grupoInfo = $stateParams.codGrupo;

    var caminho = "http://192.168.2.5:8080/App-Servidor/GrupoSelect?codigo=";
    var url = caminho.concat($stateParams.codGrupo)
        
    $http.get(url).then(function(response) {
        $scope.grupoSelecionado = response.data;
    })    
})

.controller('resultadosCtrl', function($scope, $state, $stateParams, $http){

    $scope.testeCod = $stateParams.codTeste;

    var caminho = "http://192.168.2.5:8080/App-Servidor/ResultadosTeste?teste=";
    var url = caminho.concat($stateParams.codTeste)
        
    $http.get(url).then(function(response) {
        $scope.resultados = response.data;
    })
})

.controller('alunoDetalheGrupoCtrl', function($scope, $state, $stateParams, $http){

    $scope.alunoGrupo = $stateParams.loginAluno;
    $scope.grupoId = $stateParams.grupoId;
    
    var caminho = "http://192.168.2.5:8080/App-Servidor/AlunoInfo?login=";
    var temp = caminho.concat($stateParams.loginAluno);
    var aux = temp.concat("&grupo=");
    var url = aux.concat($stateParams.grupoId);
        
    $http.get(url).then(function(response) {
        $scope.membroGrupo = response.data;
    })
})

.controller('homeGrupoCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.grupoCodigo = $stateParams.codGrupo;
    $scope.usuarioAluno = $stateParams.loginAluno;

    $scope.topico = {
        conteudo:'',
        loginUsuario: '',
        grupoCod: ''
    }

    $scope.publicar = function(){
        $scope.topico.grupoCod = $scope.grupoCodigo;
        $scope.topico.loginUsuario = $stateParams.loginAluno;
        fac.salvarTopico($scope.topico);
        delete $scope.topico;
    }

    $scope.removerTopico = function(topicoRemover){
        fac.removerTopicos(topicoRemover);
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/GrupoSelect?codigo=";
    var url = caminho.concat($stateParams.codGrupo)
        
    $http.get(url).then(function(response) {
        $scope.grupo = response.data;
    })    

    setInterval(function(){
        var caminhoTopico = "http://192.168.2.5:8080/App-Servidor/Topicos?grupo=";
        var urlTopico = caminhoTopico.concat($stateParams.codGrupo)
            
        $http.get(urlTopico).then(function(response) {
            $scope.topicos = response.data;
        })
    }, 2000);

})

.controller('comentariosCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.topicoCodigo = $stateParams.codigoTopico;
    $scope.alunoidLogin = $stateParams.loginAluno;

    $scope.comentario = {
        conteudo:'',
        usuario:'',
        topico:''
    }

    $scope.comentar = function(){
        $scope.comentario.usuario = $stateParams.loginAluno;
        $scope.comentario.topico = $stateParams.codigoTopico;

        fac.salvarComentario($scope.comentario);
        delete $scope.comentario;
    }

    setInterval(function(){
        var caminho = "http://192.168.2.5:8080/App-Servidor/Comentarios?topico=";
        var url = caminho.concat($stateParams.codigoTopico)
            
        $http.get(url).then(function(response) {
            $scope.comentarios = response.data;
        })
    }, 2000);

    $scope.removerComentarios = function(comentario){
        fac.removerComentario(comentario);
    }
    
})

.controller('alterarComentarioCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.comentarioCodigo = $stateParams.codigoComentario;

    $scope.tempComentario = {
        conteudo:'',
        codigo:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/AlterarComentario?comentario=";
    var url = caminho.concat($stateParams.codigoComentario)
            
    $http.get(url).then(function(response) {
        $scope.tempComentario = response.data;
    })

    $scope.alterarComent = function(){
        fac.alterarComentarios($scope.tempComentario);
    }
})

.controller('alterarTopicoCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.codigoTopicoTem = $stateParams.codigoTopico;

    $scope.tempTopico = {
        conteudo:'',
        codigo:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/AtualizarTopico?topico=";
    var url = caminho.concat($stateParams.codigoTopico)
            
    $http.get(url).then(function(response) {
        $scope.tempTopico = response.data;
    })

    
    $scope.alterarTopico = function(){
        fac.alterarTopicos($scope.tempTopico);
    }
})

.controller('testesGrupoGrupoCtrl', function($scope, $state, $stateParams, $http){

    $scope.grupoCodTestes = $stateParams.codGrupo;
    $scope.alCodigo = $stateParams.loginAluno;

    var caminho = "http://192.168.2.5:8080/App-Servidor/Testes?grupo=";
    var url = caminho.concat($stateParams.codGrupo)
        
    $http.get(url).then(function(response) {
        $scope.testes = response.data;
    })    
})

.controller('verTesteCtrl', function($scope, $state, $stateParams, $http){

    $scope.alunoCod = $stateParams.alunoLogin;
    $scope.testeCodigo = $stateParams.testeCodigo;
    $scope.codigoGrupo = $stateParams.codGrupo;

    $scope.testeTemp = {
        codigo:'',
        assunto:'',
        categoria:'',
        dataEntrega:'',
        disciplina:'',
        professor:'',
        qtdPerguntas:'',
        disponivel:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/VerTeste?teste=";
    var urlTeste = caminho.concat($stateParams.testeCodigo);
    var urlAluno = urlTeste.concat("&aluno=");
    var url = urlAluno.concat($stateParams.alunoLogin)
        
    $http.get(url).then(function(response) {
        $scope.testeTemp = response.data;
    })  
        
})

.controller('responderTesteCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.alunoTesteCodigo = $stateParams.alunoLogin;
    $scope.testeCodigoTeste = $stateParams.testeCodigo;
    $scope.grupoTesteCodigo = $stateParams.codGrupo; 
    $scope.contador = 0;
    $scope.pontuacao = 0;
    $scope.acertos = 0;
    $scope.erros = 0;
    $scope.opcao = false;
    $scope.respondeTeste = {
        grupo: '',
        aluno: '',
        teste: '',
        nota: ''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/ResponderTeste?teste=";  
    var url = caminho.concat($stateParams.testeCodigo);

    $http.get(url).then(function(response) {
        $scope.testeAux = response.data;
    }) 

    $scope.proxima = function(nota, respostaCerta){
        if($scope.contador <= $scope.testeAux.length){

            if(respostaCerta == true){
                $scope.pontuacao = $scope.pontuacao + nota;
                $scope.acertos++;
            }else{
                $scope.erros++;
            }

            $scope.contador++;
        }
    }

    $scope.verResultado = function(){
        $scope.opcao = true;
        $scope.respondeTeste.grupo = $stateParams.codGrupo;
        $scope.respondeTeste.aluno = $stateParams.alunoLogin; 
        $scope.respondeTeste.teste = $stateParams.testeCodigo; 
        $scope.respondeTeste.nota = $scope.pontuacao;

        fac.enviarRespostas($scope.respondeTeste);
    }
})

.controller('perfilCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.loginUser = $stateParams.alunoLogin;

    $scope.alunoPerfil = {
        nome:'',
        sobrenome:'',
        login:'',
        senha:'',
        curso:'',
        descricao:'',
        dataParticipacao:'',
        foto:'',
        email:'',
        instituicao:'',
        foto:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/AtualizarAluno?login=";  
    var url = caminho.concat($stateParams.alunoLogin);

    $http.get(url).then(function(response) {
        $scope.alunoPerfil = response.data;
    })
    
})

.controller('configuracoesInfoCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.loginUserApp = $stateParams.alunoLogin;

    $scope.alunoPerfilInfo = {
        nome:'',
        sobrenome:'',
        login:'',
        senha:'',
        curso:'',
        descricao:'',
        dataParticipacao:'',
        foto:'',
        email:'',
        instituicao:'',
        foto:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/AtualizarAluno?login=";  
    var url = caminho.concat($stateParams.alunoLogin);

    $http.get(url).then(function(response) {
        $scope.alunoPerfilInfo = response.data;
    })

    $scope.alterarPerfil = function(){
        fac.atualizarPerfil($scope.alunoPerfilInfo);
    }
})

.controller('alterarFotoCtrl', function($scope, $state, $stateParams, $http, fac, $cordovaCamera){

    $scope.loginUserFoto = $stateParams.alunoLogin;

    $scope.alunoPerfilFoto = {
        nome:'',
        sobrenome:'',
        login:'',
        senha:'',
        curso:'',
        descricao:'',
        dataParticipacao:'',
        foto:'',
        email:'',
        instituicao:'',
        foto:''
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/AtualizarAluno?login=";  
    var url = caminho.concat($stateParams.alunoLogin);

    $http.get(url).then(function(response) {
        $scope.alunoPerfilFoto = response.data;
    })

    $scope.pegarFoto = function () {
        var option = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 612,
        targetHeight: 612,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(option).then(function(imageDate){
          $scope.fotoPerfil = imageDate;
      }, function(err){
          alert("Erro" + err);
      }); 
    }

    $scope.enviarFoto = function(){
        $scope.alunoPerfilFoto.foto = $scope.fotoPerfil;
        fac.atualizarFoto($scope.alunoPerfilFoto);
    }

})

.controller('pesquisarGrupoCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.alunoGrupoBuscar = $stateParams.alunoLogin;
    $scope.grupo = {
        nome:''
    }

    $scope.buscarGrupo = function(){
        var caminho = "http://192.168.2.5:8080/App-Servidor/GruposPesquisa?grupo=";  
        var url = caminho.concat($scope.grupo.nome);

        $http.get(url).then(function(response) {
            $scope.gruposEncontrados = response.data;
            delete $scope.grupo;
        })
        
    }
})

.controller('solicitacaoGrupoCtrl', function($scope, $state, $stateParams, $http, fac){

    $scope.codigoGrupoSelecionado = $stateParams.grupoCodigo;
    $scope.alunoGrupoLogin = $stateParams.loginAluno;
    $scope.participaGrupo = {
        grupo: $scope.codigoGrupoSelecionado,
        aluno: $scope.alunoGrupoLogin
    }

    var caminho = "http://192.168.2.5:8080/App-Servidor/GrupoSelect?codigo=";  
    var url = caminho.concat($scope.codigoGrupoSelecionado);

    $http.get(url).then(function(response) {
        $scope.grupoSelect = response.data;
    })

    $scope.enviarSolicitacao = function(){
        fac.solicitacaoGrupo($scope.participaGrupo);
    }

    $scope.removerSolicitacao = function(){
        fac.removerSolicitacaoGrupo($scope.participaGrupo);
    }

    var caminhoAux = "http://192.168.2.5:8080/App-Servidor/RemoverSolicitacao?login=";  
    var urlAux = caminho.concat($scope.alunoGrupoLogin);
    var temp = urlAux.concat("&grupo=");
    var urlTemp = temp.concat($scope.codigoGrupoSelecionado);

    $http.get(urlTemp).then(function(response) {
        $scope.opcao = response.data;
    })

})





















