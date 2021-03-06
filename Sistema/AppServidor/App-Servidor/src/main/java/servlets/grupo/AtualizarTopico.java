package servlets.grupo;

import com.br.dao.Dao;
import com.br.entidades.Grupo;
import com.br.entidades.Topico;
import com.br.util.FormatData;
import com.br.util.UtilTest;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 *
 * @author Fatinha de Sousa
 */
@WebServlet(name = "AtualizarTopico", urlPatterns = {"/AtualizarTopico"})
public class AtualizarTopico extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        String codigo = request.getParameter("topico");

        if (!codigo.equalsIgnoreCase("undefined")) {
            Dao dao = new Dao();
            Topico topico = dao.consultarTopico(Integer.parseInt(codigo));
            
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("codigo", topico.getCodigo());
            jSONObject.put("conteudo", topico.getConteudo());
            jSONObject.put("data", FormatData.parseDateString(topico.getDataCriacao()));
            jSONObject.put("loginUsuario", topico.getLoginUsuario());
            jSONObject.put("tipo", topico.getTipo());
            
            OutputStream os = response.getOutputStream();
            os.write(jSONObject.toString().getBytes());

            os.flush();
            os.close();

        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if (request.getMethod().equalsIgnoreCase("POST")) {
            PrintWriter printWriter = response.getWriter();
            response.setContentType("text/html");

            String json = UtilTest.streamToString(request.getInputStream());
            JSONObject jSONObject = UtilTest.getJSON(json);

            Dao dao = new Dao();
            Topico topico = dao.consultarTopico(jSONObject.getInt("codigo"));
            topico.setConteudo(jSONObject.getString("conteudo"));
            
            if (dao.alterarTopico(topico)) {
                printWriter.write("Alterado!");
                printWriter.flush();
                printWriter.close();
            } else {
                printWriter.write("Erro!");
                printWriter.flush();
                printWriter.close();
            }
        }
    }
}
