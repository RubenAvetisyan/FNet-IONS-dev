import type { Update } from 'typegram'
import type { Context, Middleware, Telegraf } from 'telegraf'
import { Composer, Scenes } from 'telegraf'
import { errorLog } from '../log'

const WizardScene = Scenes.WizardScene
const Stage = Scenes.Stage

class Scene {
  stepHandler: Composer<Scenes.WizardContext>
  stage: any
  constructor() {
    this.stepHandler = new Composer<Scenes.WizardContext>()
    this.stage = null
  }

  getScens() {
    return this.stage.scenes
  }

  getScen(id: string) {
    return this.stage.scenes.get(id)
  }
}
class SceneRegistrer {
  bot: Telegraf<Context<Update>>
  scene: Scene
  constructor(bot: Telegraf<Context<Update>>) {
    this.scene = new Scene()
    this.bot = bot
  }

  // setStage() {
  //   this.stage = new Scenes.Stage<Scenes.WizardContext>(scenes: Scenes, options: any)
  // }

  stage() {
    return this.scene.stage
  }

  stageMiddleware() {
    return this.scene.stage.middleware()
  }

  setWizardScene(id: string, ...args: Array<Middleware<Context<Update>>>) {
    try {
      return new WizardScene(id, ...args)
    }
    catch (error: any) {
      errorLog(error?.message)
    }
  }

  wizardStep(text: string | Function, callback?: (ctx: any) => any | Composer<Scenes.WizardContext<Scenes.WizardSessionData>>) {
    // if (callback instanceof this.scene.stepHandler)

    return async (ctx: any) => {
      console.log('callback: ', callback)
      callback && await callback(ctx)
      ctx.reply(text instanceof Function ? text(ctx) : text) // enter your name
      return ctx.wizard.next()
    }
  }
}

export { Scene, SceneRegistrer }
