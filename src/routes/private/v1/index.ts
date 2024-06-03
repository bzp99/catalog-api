import dataResourcesPrivateRouter from "./dataResources.private.router";
import ecosystemsPrivateRouter from "./ecosystems.private.router";
import negotiationPrivateRouter from "./negotiation.private.router";
import serviceOfferingsPrivateRouter from "./serviceOfferings.private.router";
import softwareResourcesPrivateRouter from "./softwareResources.private.router";

const routers = [
  {
    prefix: "/dataresources",
    router: dataResourcesPrivateRouter,
  },
  {
    prefix: "/ecosystems",
    router: ecosystemsPrivateRouter,
  },
  {
    prefix: "/negotiation",
    router: negotiationPrivateRouter,
  },
  {
    prefix: "/serviceofferings",
    router: serviceOfferingsPrivateRouter,
  },
  {
    prefix: "/softwaresources",
    router: softwareResourcesPrivateRouter,
  },
];

export default {
  prefix: "",
  routers,
};
