# 发现问题：edge 浏览器的效率模式会导致 setTimeout_setInterval 变慢

## 问题描述

当 edge 浏览器启用效率模式后，setTimeout/setInterval 运行一段时间后，执行间隔会变慢。

开启后：
![在这里插入图片描述](./images/1.png)
关闭效率模式：

![在这里插入图片描述](./images/2.png)
