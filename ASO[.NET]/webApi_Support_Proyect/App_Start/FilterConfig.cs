﻿using System.Web;
using System.Web.Mvc;

namespace webApi_Support_Proyect
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
