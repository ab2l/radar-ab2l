using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RadarAB2L.Util
{
    public static class ThreadingUtil
    {
        public static void SetarMaxThreads()
        {
            try
            {
                int work = 0;
                int io = 0;

                ThreadPool.GetMaxThreads(out work, out io);

                ThreadPool.SetMinThreads(work, io);
            }
            catch { };
        }
    }
}
