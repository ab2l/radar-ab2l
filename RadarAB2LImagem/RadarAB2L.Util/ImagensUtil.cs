using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Windows.Forms;

namespace RadarAB2L.Util
{
    public static class ImagensUtil
    {
        

        public static string ReconhecerFormatoImagem(byte[] bytesImagem)
        {
            try
            {
                using (MemoryStream ms = new MemoryStream(bytesImagem))
                {
                    using (Bitmap bmp = new Bitmap(ms))
                    {
                        if (ImageFormat.Bmp.Equals(bmp.RawFormat))
                        {
                            return "bmp";
                        }
                        else if (ImageFormat.Emf.Equals(bmp.RawFormat))
                        {
                            return "emf";
                        }
                        else if (ImageFormat.Exif.Equals(bmp.RawFormat))
                        {
                            return "Exif";
                        }
                        else if (ImageFormat.Gif.Equals(bmp.RawFormat))
                        {
                            return "gif";
                        }
                        else if (ImageFormat.Icon.Equals(bmp.RawFormat))
                        {
                            return "ico";
                        }
                        else if (ImageFormat.Jpeg.Equals(bmp.RawFormat))
                        {
                            return "jpg";
                        }
                        else if (ImageFormat.MemoryBmp.Equals(bmp.RawFormat))
                        {
                            return "bmp";
                        }
                        else if (ImageFormat.Png.Equals(bmp.RawFormat))
                        {
                            return "png";
                        }
                        else if (ImageFormat.Tiff.Equals(bmp.RawFormat))
                        {
                            return "tiff";
                        }
                        else if (ImageFormat.Wmf.Equals(bmp.RawFormat))
                        {
                            return "wmf";
                        }
                        else
                        {
                            return null;
                        }
                    }
                }

            }
            catch //Se não conseguiu nem decodificar, retorna NULL pq não é imagem suportada
            {
                return null;
            }
        }


        /// <summary>
        /// Sorteia uma cor dentre as possiveis (registradas no vetor de cores possiveis) e retorna o codigo html desta cor
        /// </summary>
        /// <returns></returns>
        public static string SortearCor()
        {
            List<Color> coresPossiveis = new List<Color>() { Color.Red, Color.Green, Color.Blue, Color.Purple, Color.Black, Color.Gray, Color.Orange, Color.Pink };
            return ColorTranslator.ToHtml(coresPossiveis.Shuffle().First());
        }

        public static string ConverterBytesImagemParaBase64(byte[] fileBytes)
        {
            return ConverterBytesImagemParaBase64(fileBytes, "Imagem." + ReconhecerFormatoImagem(fileBytes));
        }

        public static string ConverterBytesImagemParaBase64(Byte[] FileBytes, string nomeArquivo)
        {
            return "data:" + MimeMapping.GetMimeMapping(nomeArquivo) + ";base64," + Convert.ToBase64String(FileBytes);
        }

        public static Tuple<int, int> CalcularTamanhoImagemNecessaria()
        {
            int CountEmpresas = RadarAB2LUtil.ObterEmpresasRadarAB2L(false).Count;

            int areaNecessaria = 64000 + CountEmpresas * 32000;

            int ladoMenor = (int)Math.Ceiling(Math.Sqrt(areaNecessaria));

            return new Tuple<int, int>(ladoMenor * 2, ladoMenor);
        }
    }
}
