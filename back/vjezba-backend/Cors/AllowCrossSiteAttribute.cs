using System.Web.Mvc;

public class AllowCrossSiteAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:8000");
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Credentials", "true");
        filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Headers", "*");
        base.OnActionExecuting(filterContext);
    }
}