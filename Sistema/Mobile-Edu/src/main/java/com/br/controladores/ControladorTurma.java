package com.br.controladores;

import com.br.entidades.Aluno;
import com.br.entidades.Presenca;
import com.br.entidades.Turma;
import com.br.fachada.Fachada;
import com.br.sessao.PegarUsuarioSessao;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;

/**
 *
 * @author Fatinha de Sousa
 */
@Named(value = "controladorTurma")
@SessionScoped
public class ControladorTurma implements Serializable {

    @EJB
    private Fachada fachada;
    private Turma turma;
    private Aluno aluno;
    private String mensagem;
    private Presenca presenca;

    public ControladorTurma() {
        turma = new Turma();
        aluno = new Aluno();
        presenca = new Presenca();
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Presenca getPresenca() {
        return presenca;
    }

    public void setPresenca(Presenca presenca) {
        this.presenca = presenca;
    }

    public String salvarTurma() {

        turma.setProfessor(PegarUsuarioSessao.pegarProfessorSessao());

        if (fachada.salvarTurma(turma)) {
            turma = new Turma();
            return "page-listar-turmas?faces-redirect=true";
        }

        return "page-add-turma?faces-redirect=true";
    }

    public String paginaInicialTurma(Turma turma) {
        this.turma = turma;

        return "page-inicial-turma?faces-redirect=true";
    }

    public String atualizarTurma() {

        if (fachada.alterarTurma(turma)) {
            return "page-alterar-turma?faces-redirect=true";
        }

        return "page-alterar-turma?faces-redirect=true";
    }

    public String removerTurma() {
        if (fachada.removerTurma(turma)) {
            return "page-listar-turmas?faces-redirect=true";
        }

        return "page-alterar-turma?faces-redirect=true";
    }

    public List<Turma> listarTurmas() {
        return fachada.listarTurmas(PegarUsuarioSessao.pegarProfessorSessao().getLogin());
    }

    public String buscarAluno() {
        this.aluno = fachada.buscarAluno(aluno.getLogin());

        if (this.aluno != null) {
            return "page-buscar-aluno?faces-redirect=true";
        } else {
            aluno = new Aluno();
            mensagem = "Nenhum usuário encontrado";
            return "page-buscar-aluno?faces-redirect=true";
        }
    }

    public String adicionarMembro() {
        turma.getAlunos().add(aluno);
        fachada.alterarTurma(turma);
        return "page-listar-alunos?faces-redirect=true";
    }

    public boolean verificarMembro() {
        return turma.getAlunos().indexOf(aluno) == -1;
    }

    public String removerMembro() {

        turma.getAlunos().remove(aluno);

        if (fachada.alterarTurma(turma)) {
            return "page-buscar-aluno?faces-redirect=true";
        }
        
        return "page-buscar-aluno?faces-redirect=true";

    }
    
    public String presencaPagina(){
        if(fachada.listarPresencaData(new Date()).isEmpty()){
            return "page-add-presenca?faces-redirect=true";
        }else{
            return "page-presenca?faces-redirect=true";
        }
    }
    
    /*Presença*/
    public String salvarPresenca(Aluno aluno){
        presenca.setAluno(aluno);
        presenca.setTurma(turma);
        presenca.setStatus(true);
        presenca.setDescricao("Presente");
        if(fachada.salvarPresenca(presenca)){
            return "page-add-presenca?faces-redirect=true";
        }
        
        return "page-add-presenca?faces-redirect=true";
    }
    
    public String salvarFalta(Aluno aluno){
        presenca.setAluno(aluno);
        presenca.setTurma(turma);
        presenca.setStatus(false);
        presenca.setDescricao("Faltou");
        if(fachada.salvarPresenca(presenca)){
            return "page-add-presenca?faces-redirect=true";
        }
        
        return "page-add-presenca?faces-redirect=true";
    }
    
    public List<Presenca> listarPresencaData(){
        return fachada.listarPresencaData(new Date());
    }
    
    public String paginaPresenca(){
        return "page-presenca?faces-redirect=true";
    }
    
    public int qtdFalta(Presenca presenca){
        
        return fachada.qtdFaltas(presenca.getAluno().getLogin(), turma.getCodigo());
    }
    
    public List<Presenca> listarPresencaTurma(){
        return fachada.listarPresencaTurma(turma.getCodigo());
    }
}
