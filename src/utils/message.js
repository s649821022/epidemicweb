import { Message } from "element-ui";

class MyMessage {
  constructor() {
    this.config = {
      showClose: true,
      duration: 2000,
    };
  }

  show() {
    Message(JSON.parse(JSON.stringify(this.config)));
  }

  success(message = "恭喜！操作成功！") {
    this.config.type = "success";
    this.config.message = message;
    this.show();
  }

  info(message = "") {
    this.config.type = "info";
    this.config.message = message;
    this.show();
  }

  warning(message = "") {
    this.config.type = "warning";
    this.config.message = message;
    this.show();
  }

  error(message = "") {
    this.config.type = "error";
    this.config.message = message;
    this.show();
  }
}

const message = new MyMessage();
export default message;
