using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RadarAB2LImagem.Dominio.Servicos
{
    public interface IServicoGeradorImagem
    {
        byte[] ObterImagemCachePNG();

        /// <summary>
        /// 
        /// </summary>
        /// <returns>Lista composta pela categoria das empresas, lista de imagens da categoria em base64 com cabeçalho, cor HTML representando a categoria e um número aleatório usado para sortear
        /// a largura da caixa na tela</returns>
        List<Tuple<string, List<string>, string, int>> ObterEmpresasSorteadas();
    }
}
