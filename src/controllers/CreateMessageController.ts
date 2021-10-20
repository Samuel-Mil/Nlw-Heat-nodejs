import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { message } = req.body;
    const service = new CreateMessageService();

    const createMessage = await service.execute(message, req.user_id);

    return res.json({ createMessage });
  }
}

export { CreateMessageController };
