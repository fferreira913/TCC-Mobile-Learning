package com.br.controladores;

import com.br.entidades.Grupo;
import com.br.entidades.Pergunta;
import com.br.entidades.Teste;
import com.br.fachada.Service;
import com.br.sessao.PegarUsuarioSessao;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Named;

/**
 *
 * @author Fatinha de Sousa
 */
@Named(value = "controladorExercicio")
@SessionScoped
public class ControladorExercicio implements Serializable {

    private Teste exercicio;
    private List<String> grupos;
    private String codigoGrupo;
    private Pergunta pergunta;
    private String grupoCodigo;
    private String mensagem;
    private FacesContext context;
    private boolean opcao;

    @EJB
    Service fachada;

    public ControladorExercicio() {
        exercicio = new Teste();
        grupos = new ArrayList();
        pergunta = new Pergunta();
        codigoGrupo = new String();
        grupoCodigo = new String();
        opcao = false;
    }

    public Teste getExercicio() {
        return exercicio;
    }

    public void setExercicio(Teste exercicio) {
        this.exercicio = exercicio;
    }

    public String getCodigoGrupo() {
        return codigoGrupo;
    }

    public void setCodigoGrupo(String codigoGrupo) {
        this.codigoGrupo = codigoGrupo;
    }

    public Pergunta getPergunta() {
        return pergunta;
    }

    public void setPergunta(Pergunta pergunta) {
        this.pergunta = pergunta;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public boolean isOpcao() {
        return opcao;
    }

    public void setOpcao(boolean opcao) {
        this.opcao = opcao;
    }

    public List<String> listarCategorias() {
        return fachada.categoriaPerguntas(PegarUsuarioSessao.getProfessor().getLogin());
    }

    public String salvarTeste() {
        this.context = FacesContext.getCurrentInstance();
        exercicio.setProfessor(PegarUsuarioSessao.getProfessor());
        exercicio.setDisponivel(true);
        exercicio.setQtdPerguntas(exercicio.getQuestoesExercicios().size());

        if (fachada.salvarExercicio(exercicio)) {
            exercicio = new Teste();

            FacesMessage facesMessage = new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Cadastro efetuado.",
                    "Teste cadastrado com sucesso.");

            context.addMessage(null, facesMessage);
            opcao = true;
        } else {
            FacesMessage facesMessage = new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Erro ao realizar cadastro.",
                    "");

            context.addMessage(null, facesMessage);
            opcao = true;
        }

        return null;
    }

    public String buscarPerguntas() {
        exercicio.setQuestoesExercicios(fachada.listarPerguntasCategoria(exercicio.getCategoria(), exercicio.getQtdPerguntas(),
                PegarUsuarioSessao.getProfessor().getLogin()));
        return "page-cad-teste?faces-redirect=true";
    }

    public List<Teste> testesCadastrados() {
        return fachada.listarTestes(PegarUsuarioSessao.getProfessor().getLogin());
    }

    public String removerTeste() {
        this.context = FacesContext.getCurrentInstance();

        if (fachada.removerExercicio(exercicio)) {
            return "page-listar-testes?faces-redirect=true";
        } else {
            FacesMessage facesMessage = new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Remoção não efetuada.",
                    "Erro ao remover teste.");

            context.addMessage(null, facesMessage);
            opcao = true;

            return null;
        }
    }

    public String visualizarTeste(Teste teste) {
        this.exercicio = teste;

        return "page-alterar-teste?faces-redirect=true";
    }

    public String atualizarTeste() {
        this.context = FacesContext.getCurrentInstance();

        if (fachada.atualizarExercicio(exercicio)) {
            FacesMessage facesMessage = new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Atualização efetuada.",
                    "Teste atualizado com sucesso.");

            context.addMessage(null, facesMessage);
            opcao = true;
        } else {
            FacesMessage facesMessage = new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Atualização não efetuada.",
                    "Erro ao atualizar o teste.");

            context.addMessage(null, facesMessage);
            opcao = true;
        }
        return null;
    }

    public String visualizarPerguntas() {
        return "page-perguntas-teste?faces-redirect=true";
    }

    public String paginaEnviar() {
        return "page-enviar-teste?faces-redirect=true";
    }

    public List<String> getGrupos() {
        return grupos;
    }

    public void setGrupos(List<String> grupos) {
        this.grupos = grupos;
    }

    public List<String> meusGrupos() {
        List<Grupo> gruposProfessor = fachada.meusGrupos(PegarUsuarioSessao.getProfessor().getLogin());

        if (grupos.isEmpty() && gruposProfessor.size() > 0) {

            for (Grupo g : gruposProfessor) {
                grupos.add(String.valueOf(g.getCodigo()) + " - " + g.getNome());
            }
        }

        return grupos;
    }

    public String getGrupoCodigo() {
        return grupoCodigo;
    }

    public void setGrupoCodigo(String grupoCodigo) {
        this.grupoCodigo = grupoCodigo;
    }

    public void pegarCodigoGrupo() {
        System.out.println("Codigo do grupo com Ajax: " + codigoGrupo);
    }

    public String enviarTeste() {
        String codigo[] = codigoGrupo.split(" ");

        Grupo grupo = fachada.buscarGrupoPorCodigo(Integer.parseInt(codigo[0]));

        if (grupo.getTestesGrupo().indexOf(exercicio) == -1) {

            grupo.getTestesGrupo().add(exercicio);
            fachada.atualizarGrupo(grupo);

            return "page-alterar-teste?faces-redirect=true";
        } else {

            this.mensagem = "Esse teste ja foi enviado ao grupo selecionado!";
            return "page-enviar-teste?faces-redirect=true";
        }

    }

    public String cancelarEnvio() {
        return "page-alterar-teste?faces-redirect=true";
    }

    public String concluirEnvio() {
        return "page-listar-testes?faces-redirect=true";
    }
    
    public String paginaCadastrarTeste(){
        this.exercicio = new Teste();
        opcao = false;
        return "page-cad-teste?faces-redirect=true";
    }
    
    public String paginas(){
        opcao = false;
        return "page-listar-testes?faces-redirect=true";
    }
}
