# Ubuntu 指令

## update 和 upgrade 命令的区别

`update` 命令只会获得系统上所有包的最新信息，并不会下载或者安装任何一个包。而是 `apt upgrade` 命令来把这些包下载和升级到最新版本。

————————————————
版权声明：本文为 CSDN 博主「小二上酒 8」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Huangjiazhen711/article/details/126675754

## apt 与 apt-get 的区别

Debian 和 Ubuntu 使用的是 APT 包管理系统。不要和 `apt` 命令弄混了。

有许多和 APT 包管理交互的命令； `apt-get` 、 `apt` 、 `dpkg` 、 `aptitude` 等。

这里面最受欢迎的就是 apt-get 命令。它是一个 低层级(low-level) 且功能丰富的命令。 `apt`是 `apt-get` 命令的一个更新而更简单的版本。
————————————————
版权声明：本文为 CSDN 博主「小二上酒 8」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Huangjiazhen711/article/details/126675754

## Ubuntu Systemctl

systemctl 是 Linux 操作系统中的 systemd 系统和服务管理器，用于管理系统的所有单元，例如服务，套接字，设备等。systemctl 还可以管理进程，使其更加有效和有序。

### 常用命令

> 以 ssh 服务为例

- 查看服务状态：`sudo systemctl status ssh`
- 启动服务：`sudo systemctl start ssh`
- 停止服务：`sudo systemctl stop ssh`
- 重载服务：`sudo systemctl reload ssh`
- 允许开机启动：`systemctl enable ssh`
- 列出所有运行的服务：`systemctl list-units`

## 决当前用户操作 docker 时无权限问题——设立 docker 用户组

```sh
sudo chown root:docker /var/run/docker.sock # 修改docker.sock权限为root:docker
sudo groupadd docker          # 添加docker用户组
sudo gpasswd -a $USER docker  # 将当前用户添加至docker用户组
newgrp docker                 # 更新docker用户组
```

## docker 命令

```sh
docker ps # 罗列运行中的docker镜像
docker search [要查找的镜像] # 根据关键字查找镜像
docker pull [镜像name] # 下载指定镜像

# 运行docker
docker run \
	-u root \
	-d \ # 后台运行容器
	-p 8080:8080 # 	映射容器的端口8080到主机上的端口8080
	-v /home/sonarqube_data:/home \ #将容器的/home目录映射到主机/home/sonarqube_data
	--restart=always \ #设置开机自启，可选值no|on-failure|on-failure:3|always|unless-stopped
	--name [dockerName]
	[镜像name]

docker update [配置项] 修改已有容器配置
docker exec -it [容器名] /bin/bash # 进入容器
```

## ssh 命令

### 连接远程主机

```sh
ssh -p [端口号] [用户名]@[主机IP地址]
```

### 上传文件到服务器

> `scp`命令需安装`openssh-server`，同时要开放目标目录权限。
>
> 开放权限命令：`sudo chmod 777 目录路径`

```sh
scp [可选参数] file_source file_target
```

- file_source：要拷贝的文件或目录，如果为目录时，需要使用`-r`参数；
- file_target：目标目录；

常用可选参数：

- -r： 递归复制整个目录。
- -P port：注意是大写的 P, port 是指定数据传输用到的端口号
