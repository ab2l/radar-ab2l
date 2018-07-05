using CefSharp;
using CefSharp.OffScreen;
using RadarAB2L.Util;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace RadarAB2L.GeradorImagemOffAssembly
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Working Directory " + Environment.CurrentDirectory);
            Console.WriteLine("Hosting Environment" + HostingEnvironment.ApplicationPhysicalPath);

            Cef.Initialize(new CefSettings() { WindowlessRenderingEnabled = true });

            while (true)
            {
                try
                {
                    Tuple<int, int> tamanho = ImagensUtil.CalcularTamanhoImagemNecessaria();

                    using (ChromiumWebBrowser browser = new ChromiumWebBrowser(Configs.URLGeradorImagem, new BrowserSettings() { WindowlessFrameRate = 60, BackgroundColor = UInt32.MaxValue }) { Size = new Size(tamanho.Item1, tamanho.Item2) })
                    {
                        while (!browser.IsBrowserInitialized)
                        {
                            Thread.Sleep(1000);
                        }

                        browser.Load(Configs.URLGeradorImagem);
                        while (browser.IsLoading)
                        {
                            Thread.Sleep(1000);
                        }
                        MemoryStream ms = new MemoryStream();
                        int count = 0;

                        while (ms.Length == 0 && count < 100)
                        {
                            Task.Run(() => browser.ScreenshotAsync()).Result?.Save(ms, ImageFormat.Png);
                            count++;
                            Thread.Sleep(1000);
                        }

                        if (count >= 100) //Tentou 100x carregar a pagina e nao veio dado
                        {
                            throw new Exception("Tentou 100x carregar e nao carregou");
                        }

                        File.WriteAllBytes(Configs.EnderecoImagemCacheGerada, ms.ToArray());
                        Console.WriteLine("Gerou imagem " + DateTime.UtcNow.ToString("dd/MM/yyyy - hh:mm:ss"));
                    }
                }
                catch (Exception ex)
                {
                    Console.Write("Erro: " + ex.ToString());
                }

                Thread.Sleep(3600000);
            }
        }
    }
}
