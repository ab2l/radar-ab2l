using RadarAB2L.Util;
using RadarAB2LImagem.Dominio.Servicos;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace RadarAB2LImagem.Servicos
{
    public class ServicoGeradorImagem : IServicoGeradorImagem
    {
        public List<Tuple<string, List<string>, string, int>> ObterEmpresasSorteadas()
        {
            ThreadingUtil.SetarMaxThreads();
            return RadarAB2LUtil.ObterEmpresasRadarAB2L()
                .Where(x => x.BytesImagem != null)
                .GroupBy(x => x.RamoAtuacao, (x, y) => new Tuple<string, List<string>, string, int>(x, y.Select(z => ImagensUtil.ConverterBytesImagemParaBase64(z.BytesImagem)).ToList().Shuffle().ToList(), ImagensUtil.SortearCor(), new Random().Next(32, 50)))
                .ToList().Shuffle().ToList();
        }

        public byte[] ObterImagemCachePNG()
        {
            //Quando subir o webjobs usando o SDK do azure, chamar ele de RoboAB2L. Senão alterar na linha abaixo para o nome certo
            return File.ReadAllBytes(Configs.EnderecoImagemCacheGerada);
        }
    }
}
