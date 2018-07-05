using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RadarAB2L.Util
{
    public static class Configs
    {
        public static string EndpointRadar { get => "http://radar.ab2l.org.br/api/company"; }
        public static string URLGeradorImagem { get => "https://ab2lradar.azurewebsites.net/Home/RadarHTML"; }
        public static string EnderecoImagemCacheGerada { get => @"D:\home\site\wwwroot\Content\imagem.png"; }
    }
}
