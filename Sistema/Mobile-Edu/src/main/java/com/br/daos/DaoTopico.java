package com.br.daos;

import com.br.entidades.Comentario;
import com.br.entidades.Topico;
import com.br.interfaces.InterfaceDaoTopico;
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
public class DaoTopico implements InterfaceDaoTopico {

    @PersistenceContext(unitName = "Mobile-Edu-BD")
    private EntityManager em;

    @Override
    public boolean salvar(Topico topico) {

        try {
            em.persist(topico);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean atualizar(Topico topico) {

        try {
            em.merge(topico);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Topico consultarTopico(int codigo) {

        try {
            return em.find(Topico.class, codigo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean remover(Topico topico) {

        try {
            em.remove(em.merge(topico));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Comentario> comentariosTopico(int codigoTopico) {
        Query query = em.createQuery("select c from Comentario c where c.topico.codigo = :codigo ORDER BY c.codigo DESC");
        query.setParameter("codigo", codigoTopico);

        return (List<Comentario>) query.getResultList();
    }

    @Override
    public List<Topico> listarTopicosUsuario(String login, int codigoGrupo) {

        Query query = em.createQuery("select t from Topico t where t.grupo.codigo = :codigoGrupo and t.loginUsuario = :login");
        query.setParameter("codigoGrupo", codigoGrupo);
        query.setParameter("login", login);

        return (List<Topico>) query.getResultList();
    }
    
    @Override
    public List<Topico> listarArquivos(int codigoGrupo) {
        Query query = em.createQuery("select t from Topico t where t.grupo.codigo = :codigoGrupo and t.tipo = 'Arquivo' ORDER BY t.codigo DESC");
        query.setParameter("codigoGrupo", codigoGrupo);

        return (List<Topico>) query.getResultList();
    }

    @Override
    public List<Topico> listarTopicos(int codigoGrupo) {
        Query query = em.createQuery("select t from Topico t where t.grupo.codigo = :codigoGrupo and t.tipo = 'Publicacao' ORDER BY t.codigo DESC");
        query.setParameter("codigoGrupo", codigoGrupo);

        return (List<Topico>) query.getResultList();
    }

}
