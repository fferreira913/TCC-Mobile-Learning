package com.br.daos;

import com.br.entidades.Grupo;
import com.br.entidades.Topico;
import com.br.interfaces.InterfaceDaoGrupo;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Fatinha de Sousa
 */
@Stateless
public class DaoGrupo implements InterfaceDaoGrupo {

    @PersistenceContext(unitName = "Mobile-Edu-BD")
    private EntityManager em;

    @Override
    public boolean salvar(Grupo grupo) {

        try {
            em.persist(grupo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean atualizar(Grupo grupo) {

        try {
            em.merge(grupo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Grupo consultar(int codigo) {

        try {
            return em.find(Grupo.class, codigo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean remover(Grupo grupo) {

        try {
            em.remove(em.merge(grupo));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Grupo> gruposProfessor(String login) {
        Query query = em.createQuery("select g from Grupo g where g.professorGrupos.login = :login");
        query.setParameter("login", login);

        return (List<Grupo>) query.getResultList();

    }

    @Override
    public List<Topico> topicosGrupo(int codigoGrupo) {
        Query query = em.createQuery("select t from Topico t where t.grupo.codigo = :codigoGrupo ORDER BY t.codigo DESC");
        query.setParameter("codigoGrupo", codigoGrupo);

        return (List<Topico>) query.getResultList();
    }

    @Override
    public List<Grupo> pesquisarGrupoPorNome(String nome) {
        Query query = em.createQuery("select g from Grupo g where g.nome = :nome");
        query.setParameter("nome", nome);

        return (List<Grupo>) query.getResultList();
    }
}
