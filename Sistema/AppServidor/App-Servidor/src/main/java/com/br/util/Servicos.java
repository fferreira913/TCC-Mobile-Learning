package com.br.util;

import com.br.dao.Dao;
import com.br.entidades.Aluno;
import com.br.entidades.Horario;
import com.br.entidades.Pessoa;
import com.br.entidades.Turma;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Fatinha de Sousa
 */
public class Servicos {

    public static List<Turma> horarioAluno(Aluno aluno) {
        String dia = FormatData.verificarDia(FormatData.pegarDia());

        List<Turma> turmas = new ArrayList<>();

        for (Turma turma1 : aluno.getTurmas()) {

            for (Horario h : turma1.getHorarios()) {
                if (h.getDia().equalsIgnoreCase(dia)) {
                    turmas.add(turma1);
                    break;
                }
            }
        }

        return turmas;
    }
    
    public static Pessoa buscarUsuario(String login){
        Dao dao = new Dao();
        
        if(dao.buscarAluno(login) != null){
            return dao.buscarAluno(login);
        }else{
            return dao.buscarProfessor(login);
        }
    }
}