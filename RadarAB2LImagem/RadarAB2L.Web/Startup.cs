using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(RadarAB2L.Web.Startup))]

namespace RadarAB2L.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
#if !DEBUG
            app.UseForcedHttps(443);
#endif
        }
    }
}
