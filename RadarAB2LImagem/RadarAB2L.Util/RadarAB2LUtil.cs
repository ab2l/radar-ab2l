using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace RadarAB2L.Util
{
    public class ContextoRadar
    {
        [JsonProperty(PropertyName = "secure_url")]
        public string UrlImagem { get; set; }

        public byte[] RetornarBytesImagem()
        {
            try
            {
                byte[] retorno = null;
                using (WebClient wc = new WebClient())
                {
                    retorno = wc.DownloadData(UrlImagem);
                }
                if (string.IsNullOrWhiteSpace(ImagensUtil.ReconhecerFormatoImagem(retorno))) //Se não for um formato suportado seta null na variável de processamento
                {
                    retorno = null;
                }
                return retorno;
            }
            catch
            {
                return null;
            }
        }
    }
    public class EmpresaRadar
    {
        [JsonProperty(PropertyName = "userContext_business")]
        public string RamoAtuacao { get; set; }

        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "userContext_radar")]
        public ContextoRadar contextoRadar { get; set; }

        [JsonProperty(PropertyName = "userContext_logo")]
        public ContextoRadar contextoLogo { get; set; }

        [JsonProperty(PropertyName = "userContext_background")]
        public ContextoRadar contextoBackground { get; set; }


        public byte[] BytesImagem { get; set; } = null;

        /// <summary>
        /// Chamar para popular os bytes da imagem. Não joga erro; se der pau os bytes da imagem continuam null. Chamar em paralelo
        /// </summary>
        public EmpresaRadar CarregarBytesImagem()
        {
            try
            {
                //Nesta lista eu defino a ordem da prioridade que eu vou dar para conseguir extrair uma imagem.
                List<byte[]> bytesPossiveis = new List<ContextoRadar>() { contextoRadar, contextoLogo, contextoBackground }.Where(x => x != null)
                    .AsParallel()
                    .AsOrdered()
                    .WithDegreeOfParallelism(512)
                    .WithExecutionMode(ParallelExecutionMode.ForceParallelism)
                    .Select(x => x.RetornarBytesImagem()).ToList();

                BytesImagem = bytesPossiveis?.FirstOrDefault(x => (x?.LongLength ?? 0) > 0);
            }
            catch { }

            return this;
        }
    }

    public static class RadarAB2LUtil
    {
        public static List<EmpresaRadar> ObterEmpresasRadarAB2L(bool carregarImagens = true)
        {
            using(WebClient wc = new WebClient())
            {
                //Como suspeito que do outro lado é um Unix, usando encoding UTF8

                ParallelQuery<EmpresaRadar> query = JsonConvert.DeserializeObject<List<EmpresaRadar>>(Encoding.UTF8.GetString(wc.DownloadData(Configs.EndpointRadar)))
                    .AsParallel()
                    .WithDegreeOfParallelism(512)
                    .WithExecutionMode(ParallelExecutionMode.ForceParallelism);

                if (carregarImagens)
                {
                    query = query.Select(x => x.CarregarBytesImagem());
                }
                return query.ToList();
            }
        }
    }
}
