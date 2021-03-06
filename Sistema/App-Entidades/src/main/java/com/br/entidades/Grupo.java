package com.br.entidades;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Fatinha de Sousa
 */
@Entity
public class Grupo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;
    private String nome;
    @Temporal(TemporalType.DATE)
    private Date dataCriacao;
    private String descricao;

    @OneToMany(mappedBy = "grupo", fetch = FetchType.EAGER)
    private List<Topico> topicos;

    @ManyToOne
    private Professor professorGrupos;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Teste> testesGrupo;

    public Grupo() {
        this.topicos = new ArrayList();
        this.testesGrupo = new ArrayList();
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Topico> getTopicos() {
        return topicos;
    }

    public void setTopicos(List<Topico> topicos) {
        this.topicos = topicos;
    }

    public Professor getProfessorGrupos() {
        return professorGrupos;
    }

    public void setProfessorGrupos(Professor professorGrupos) {
        this.professorGrupos = professorGrupos;
    }

    public List<Teste> getTestesGrupo() {
        return testesGrupo;
    }

    public void setTestesGrupo(List<Teste> testesGrupo) {
        this.testesGrupo = testesGrupo;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 19 * hash + this.codigo;
        hash = 19 * hash + Objects.hashCode(this.nome);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Grupo other = (Grupo) obj;
        if (this.codigo != other.codigo) {
            return false;
        }
        if (!Objects.equals(this.nome, other.nome)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Grupo{" + "nome=" + nome + '}';
    }
}
