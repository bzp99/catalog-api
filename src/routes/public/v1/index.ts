import auth from "./auth";
import ecosystemsPublicRouter from "./ecosystems.public.router";
import catalogPublicRouter from "./catalog.public.router";
import dataResourcesPublicRouter from "./dataResources.public.router";
import softwareResourcesPublicRouter from "./softwareResources.public.router";
import serviceOfferingsPublicRouter from "./serviceOfferings.public.router";

const routers = [
  {
    prefix: "/auth",
    router: auth,
  },
  {
    prefix: "/ecosystems",
    router: ecosystemsPublicRouter,
  },
  {
    prefix: "/catalog",
    router: catalogPublicRouter,
  },
  {
    prefix: "/dataresources",
    router: dataResourcesPublicRouter,
  },
  {
    prefix: "/softwaresources",
    router: softwareResourcesPublicRouter,
  },
  {
    prefix: "/serviceofferings",
    router: serviceOfferingsPublicRouter,
  },
];

export default {
  prefix: "",
  routers,
};
