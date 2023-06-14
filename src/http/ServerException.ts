import HttpException from "./HttpException";

export default class ServerException extends HttpException {
  statusCode = 500;
}
