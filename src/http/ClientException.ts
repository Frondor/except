import HttpException from "./HttpException";

export default class ClientException extends HttpException {
  statusCode = 400;
}
