angular.module('starter').factory('fac', function($state, $http) {

    var obj =  {
      
      salvar: function(aluno) {
        var url = "http://192.168.2.5:8080/App-Servidor/Cadastro";
        var status = "";

        $http.post(url, aluno).then(function(response) {
            status = response.data;
            
            if(status.localeCompare('true') == 0){
                alert("Cadastro realizado com sucesso!");
                $state.go("login");  
            }else{
                alert("Login/Email indisponivel!");
                $state.go("cadastro");
            }
            
        });
      },

      loginAluno: function(aluno){

        var alunoObj = {
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

        var url = "http://192.168.2.5:8080/App-Servidor/Login"
        $http.post(url, aluno).then(function(response){
            alunoObj = response.data;

            if(alunoObj.login != null){
              $state.go("app.home", {login:alunoObj.login})
            }else{
              alert("Usuário inválido!");
              $state.go("login");
            }

        });
      },

      salvarTopico: function(topico){
        var url = "http://192.168.2.5:8080/App-Servidor/Topicos"
        $http.post(url, topico).then(function(response){
            $state.go("app.homeGrupo")
        }); 
      },

      removerTopicos: function(topico){
        var url = "http://192.168.2.5:8080/App-Servidor/RemoverTopico"
        $http.post(url, topico).then(function(response){
            alert(response.data);
            $state.go("app.homeGrupo")
        });
      },

      alterarTopicos: function(topico){
        var url = "http://192.168.2.5:8080/App-Servidor/AtualizarTopico"
        $http.post(url, topico).then(function(response){
            alert(response.data);
        });
        
      },

      salvarComentario: function(comentario){
        var url = "http://192.168.2.5:8080/App-Servidor/Comentarios"
        $http.post(url, comentario).then(function(response){
        });
      },

      removerComentario: function(comentario){
        var url = "http://192.168.2.5:8080/App-Servidor/RemoverComentario"
        $http.post(url, comentario).then(function(response){
            alert(response.data);
        });
      },

      alterarComentarios: function(comentario){
        var url = "http://192.168.2.5:8080/App-Servidor/AlterarComentario"
        $http.post(url, comentario).then(function(response){
            alert(response.data);
        });
      },

      enviarRespostas: function(respondeTeste){
        var url = "http://192.168.2.5:8080/App-Servidor/ResponderTeste"
        $http.post(url, respondeTeste).then(function(response){
            //alert(response.data);
            $state.go("app.responderTeste")
        });
      },

      atualizarPerfil: function(alunoPerfil){
        var url = "http://192.168.2.5:8080/App-Servidor/AtualizarAluno"
        $http.post(url, alunoPerfil).then(function(response){
            alert(response.data);
            $state.go("app.configuracoesInfo")
        });
      },

      atualizarFoto: function(alunoFoto){
        var url = "http://192.168.2.5:8080/App-Servidor/AtualizarAluno"
        $http.post(url, alunoFoto).then(function(response){
            alert(response.data);
            $state.go("app.alterarFoto")
        });
      },

      solicitacaoGrupo: function(participaGrupo){
        var url = "http://192.168.2.5:8080/App-Servidor/GruposPesquisa"
        $http.post(url, participaGrupo).then(function(response){
            alert(response.data);
            $state.go("app.solicitacaoGrupo")
        });
      },

      removerSolicitacaoGrupo: function(participaGrupo){
        var url = "http://192.168.2.5:8080/App-Servidor/RemoverSolicitacao"
        $http.post(url, participaGrupo).then(function(response){
            alert(response.data);
            $state.go("app.solicitacaoGrupo")
        });
      },

      recuperarSenha: function(assunto){
         var url = "http://192.168.2.5:8080/App-Servidor/RecuperarSenha"
          $http.post(url, assunto).then(function(response){
              alert(response.data);
              $state.go("senha")
          });
      },

      removerArquivos: function(arquivo){
        var url = "http://192.168.2.5:8080/App-Servidor/RemoverTopico"
        $http.post(url, topico).then(function(response){
            alert(response.data);
            $state.go("app.arquivos")
        });
      },
    }

    return obj;

})










