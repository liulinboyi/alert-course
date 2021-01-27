'use strict';

const Controller = require('egg').Controller;
const classSchedule = require('../model/classSchedule.json')

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = classSchedule;
  }
}

module.exports = HomeController;
