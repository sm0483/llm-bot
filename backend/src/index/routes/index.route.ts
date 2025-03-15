import { IRoute } from "../../shared/types/IRoute";
import { Router } from "express";

import IndexController from "../controller/index.controller";

export default class IndexRoute implements IRoute {
  public router: Router = Router();
  private indexController: IndexController;
  public path: string = "/index";

  constructor() {
    this.indexController = new IndexController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(`${this.path}/`, this.indexController.getServer);
  };
}
