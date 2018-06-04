using RadarAB2L.Util;
using RadarAB2LImagem.Dominio.Servicos;
using RadarAB2LImagem.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;

namespace RadarAB2L.Web.Controllers
{
    [SessionState(System.Web.SessionState.SessionStateBehavior.Disabled)]
    public class HomeController : Controller
    {
        IServicoGeradorImagem _servicoGeradorImagem;

        public HomeController()
        {
            _servicoGeradorImagem = new ServicoGeradorImagem();
        }

        public ActionResult RadarHTML()
        {
            return View(_servicoGeradorImagem.ObterEmpresasSorteadas());
        }

        public ActionResult RadarHTMLTeste()
        {
            return View();
        }

        public ActionResult RadarPNG()
        {
            byte[] arquivo = _servicoGeradorImagem.ObterImagemCachePNG();
            ContentDisposition cd = new ContentDisposition()
            {
                FileName = "RadarAB2L.png",
                Inline = true
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());
            return File(arquivo, MimeMapping.GetMimeMapping("RadarAB2L.png"));
        }
    }
}