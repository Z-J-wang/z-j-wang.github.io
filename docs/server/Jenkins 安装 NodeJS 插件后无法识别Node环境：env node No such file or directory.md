# Jenkins 安装 NodeJS 插件后无法识别 Node 环境：env node No such file or directory

## 分析：

经验证，该问题在使用 Jenkins 官方文档中推荐的 docker 镜像`jenkinsci/blueocean`才会出现。

```bash
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

## 我的解决方法：

改用最新的 Jenkins docker 镜像就不会遇到：

我安装的是最新的 Jenkins docker 镜像：

```bash
docker pull jenkins/jenkins:lts
```

然后运行镜像：

```bash
docker run \
  -u root \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

> 注意`docker run`时，镜像名为`jenkins/jenkins:lts`,而不是`jenkins/jenkins`。两者不同。

## 原因推测

为什么`jenkinsci/blueocean`镜像会出现这个问题还未定位到。

但在试错的过程中有如下发现：

1. `jenkinsci/blueocean`镜像基于`Alpine Linux`系统；`jenkins/jenkins:lts`基于`Debian`系统
2. `jenkinsci/blueocean`的 shell 是 ash，即阉割版的 bash；而`jenkins/jenkins:lts`时完整的 bash。可通过`vi /etc/passwd`命令查看
3. 起初怀疑是**软连接**的原因。但是按照网上的说法进行配置，还是不行。后来发现`jenkinsci/blueocean`镜像无法通过`./node`来运行（`Ubuntu`/`Debian`可以）。因此怀疑`jenkinsci/blueocean`镜像的 shell 无法运行`Node`支持程序。
4. ash 视乎无法识别 Node 二进制文件（执行程序）的路径：[node.js - 在 Jenkins docker 实例上找不到 Node - IT 工具网 (coder.work)](https://www.coder.work/article/5102889)。因此，我参考文章[Understanding /etc/passwd File Format - nixCraft (cyberciti.biz)](https://www.cyberciti.biz/faq/understanding-etcpasswd-file-format/)，尝试在`Alpine Linux`系统中安装 bash，但是还是不行。

至此，我只能怀疑是`jenkinsci/blueocean`镜像采用的`Alpine Linux`系统的问题。按理来说，`Alpine Linux`系统是可以安装使用 NodeJS 的，由于我只是使用过 Ubuntu，所以不能确定。所以大概率是`jenkinsci/blueocean`镜像封装`Alpine Linux`系统时本身的 BUG。

## 最后

目前，通过替换 Jenkins Docker 的镜像可以避免`env node No such file or directory`问题。但是为什么`jenkinsci/blueocean`会出现这个问题，我并没有定位到。期待大佬们的解惑。
