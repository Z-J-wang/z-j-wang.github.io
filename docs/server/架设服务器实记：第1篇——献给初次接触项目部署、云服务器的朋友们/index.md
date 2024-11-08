---
author: 王志杰
date: 2024-11-08
description: 记录了在阿里云上部署小程序项目的过程，包括购买服务器、配置服务器环境、搭建项目运行环境等步骤。适合初学者参考。
keywords: 服务器部署, 小程序, 云服务器, 阿里云, Ubuntu, Node.js
---

# 架设服务器实记：第 1 篇——献给初次接触项目部署、云服务器的朋友们

## 前言

> 前段时间，朋友托我替他搭建一个小程序，要求不高，只是用来展示一些简单的静态文本且开发时间比较充裕。我没有接触过小程序，但出于好心和本着借此机会学习学习的小程序开发的目的。我答应了下来。编程语言都是有共通性的。所以，经过几天的摸爬滚打后，很快就渐渐上手小程序开发了。之后，我开始紧赶慢赶的开发着。小程序也有了雏形。
> 前几天，朋友决定上线一个出版的小程序。我心想着：“可以呀！这小程序大致框架页出来了，管理后台也搭建完成了。上线没问题的！很 OK!”。于是乎！我开始了运维的工作！
>
> ---
>
> 期间遇到的许多困难。所以特意编写写本文记录一二，以便以后回顾。同时也献给未接触过项目上生产环境的朋友们借鉴。

## 第一步：购买服务器

既然要将项目部署到生产环境，首先就是有一台生产环境的云服务器啦。市面上主流云服务器商有阿里云、腾讯云、华为云等等。根据自己的喜好，随意选择。因为大学的时候我是在阿里云买过服务器的。所以服务器我选择的是阿里云的服务器。阿里云有很多云产品，我们所要购买的是到 ECS 云服务器。选好配置后，就可以下单购买了。这个过程还是很快的。

> 阿里云提供了一个“远程连接”的功能模块，可以直接在网页上连接服务器。在这一点非常方面呀！

## 第二步：配置服务器环境

之前一段时间，因为项目的要求，初略的捣鼓过 Ubuntu 。所以，服务器购买时系统选择我选择的是 Ubuntu 。所以服务器的环境配置还是有些了解而且没太大阻碍的。这里必须要感谢那段时间使用 ubuntu 系统的各种坑。没有那段时间的踩坑，今天这真未必能架设的起服务器来。

服务器架设有两个要点：

1. 项目 Server 端运行环境的搭建
2. 架设 Web 服务器

只有完成这两点，整个项目才能正常的运行起来。

### 项目运行环境的搭建

这一点就不用多说了，项目想要跑起来，运行环境是必不可少的。这里主要是对项目 server 端架设运行环境。为什么前端不用搭建运行环境呢？因为部署到生产环境的前端代码都是静态文件。即使是 vue、angula、react 搭建的项目，部署到生产环境的都通过 webpage 编译打包好的静态文件。所以，前端代码不用搭建运行环境。至于 server 端的运行环境的搭建就需要根据项目所采用的技术来搭建了。我的项目使用的是 nodeJS。所以，环境搭建非常简单，只要安装 node 、npm 、以及 mysql 就行了。

关于如何在指令性的操作系统中安装软件，没接触过的同学可能感觉很难。其实，说难也难，说简单也简单。为什么这么说呢？因为使用正常的安装操作流程确实挺复杂。例如 Linux 安装 Node.js：

1. 下载 Node.js

   ```shell
   wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz
   ```

2. 解压

   ```
   tar xf  node-v10.9.0-linux-x64.tar.xz
   ```

3. 进入解压目录

   ```
   cd node-v10.9.0-linux-x64/
   ```

4. 执行 node 命令 查看版本

   ```shell
   ./bin/node -v
   ```

接着进入解压文件的 bin 目录底下，使用 ln 命令来设置软连接：

```shell
ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/
```

```shell
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```

看上去确实很复杂。但是！但是 Ubuntu 它有 APT 呀！

> Debian 作为 Ubuntu、Linux Mint 和 elementary OS 等 Linux 操作系统的母板，其具有强健的「包管理」系统，它的每个组件和应用程序都内置在系统中安装的软件包中。Debian 使用一套名为 [Advanced Packaging Tool](https://links.jianshu.com/go?to=https%3A%2F%2Fwiki.debian.org%2FApt)（APT）的工具来管理这种包系统，不过请不要把它与 apt 命令混淆，它们之间是其实不是同一个东西。
>
> 在基于 Debian 的 Linux 发行版中，有各种工具可以与 APT 进行交互，以方便用户安装、删除和管理的软件包。apt-get 便是其中一款广受欢迎的命令行工具，另外一款较为流行的是 [Aptitude](https://links.jianshu.com/go?to=https%3A%2F%2Fwiki.debian.org%2FAptitude%3Faction%3Dshow%26redirect%3Daptitude) 这一命令行与 GUI 兼顾的小工具。
>
> 作者：hi_lan
> 链接：https://www.jianshu.com/p/048d9240883e
> 来源：简书
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

所以，我们可以这样：

```shell
sudo apt-get install nodejs
```

```shell
sudo apt-get install npm
```

只需要逐一执行上面两条语句就成功安装 Node.js 了。比 window 安装软件还简单。有木有！

> 不过呢！apt 是个好东西，但是有时候给你挖的坑确实也是非常的大的！

### MySQL 安装

MySQL 安装有一点需要注意，所以这里特意说明一下：

###### 安装

安装还是很简单的，直接执行下面代码：

```shell
sudo apt-get install mysql-server
```

在安装的过程有些版本的 Ubuntu 会提示你设置 root 密码。这时候就需要你输入一个密码了。这个密码你要记住。登陆 mysql 的时候需要用到。

但是呢！有些版本（如：Ubuntu18.04）安装过程是没有这个过程的，它会默认生成一个登录名和密码。默认的登录名和登录密码保存在`/etc/mysql/debian.cnf`下的，在命令行输入：

```shell
sudo vim /etc/mysql/debian.cnf
```

查看。

安装完成后，我们也可以直接在命令行输入:

```shell
mysql
```

就可以直接进入 mysql 了。

但这显然不是我们想要的。所以我们需要设置` root` 账户密码：

- 第一步：设定 `root`密码

  ```shell
  update user set authentication_string=password(' 你的密码 ') where user='root' and host='localhost';
  ```

- 第二步

  ```shell
  update user set plugin="mysql_native_password";
  ```

- 第三步

  ```shell
  flush privileges;
  ```

- 第四步: 退出 MySQL

  ```
  eixt;
  ```

- 最后: 重启 mysql

  ```shell
  sudo service mysql restart
  ```

## 第三步：架设 Web 服务器

这里需要明白的一点是，Web 服务器是一种程序软件，跟我们前面所说的购买的服务器并不是一个东西。前面说的服务器实质上是台主机。

### Web 服务器的定义

> Web 服务器一般指网站服务器，是指驻留于[因特网](https://baike.baidu.com/item/因特网/114119)上某种类型计算机的程序，可以处理浏览器等 Web 客户端的请求并返回相应响应，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个 Web 服务器是 Apache、 Nginx 、IIS。
>
> ----------------------------摘自《[百度百科——WEB 服务器](https://baike.baidu.com/item/WEB%E6%9C%8D%E5%8A%A1%E5%99%A8/8390210?fr=aladdin)》

通俗的讲，Web 服务器是用来处理和网页静态资源（如：HTML、JS、CSS、图片等等）相关的 http 请求的。

### Web 服务器与应用服务器的区别

提到 Web 服务器，那我们就不得不说**应用服务器**了。

> 应用服务器是指通过各种协议把商业逻辑曝露给客户端的程序。它提供了访问商业逻辑的途径以供客户端应用程序使用。
>
> 应用服务器为 Web 应用程序提供一种简单的和可管理的对系统资源的访问机制。它也提供低级的服务，如 HTTP 协议的实现和数据库连接管理。
>
> 常用的应用服务器有：tomcat、weblogic 、jetty 等等。
>
> 更详细的说明可查看：[百度百科——应用服务器](https://baike.baidu.com/item/%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8/4971773?fr=aladdin)、[WEB 服务器、应用程序服务器、HTTP 服务器区别](http://www.cnblogs.com/zhaoyl/archive/2012/10/10/2718575.html)

这样看来，它们两者的区别就是

- Web 服务器负责处理网页的静态资源 HTTP 请求，也就是前端项目编译后的文件；
- 应用服务器负责的是后台 API 的 HTTP 请求。

### 为什么需要使用 Web 服务器？

关于这点其实也很好理解。

我们都知道，浏览器加载网页及相关的资源都是通过向服务器发送 HTTP 请求来获取（这里的服务器并不是 Web 服务器，而是指存放网站资源的主机）。这个过程大致如下：

- 浏览器（客户端）：发送 HTTP request：”我要获取 CSDN LOGO ，路径 URL 是这个`https://csdnimg.cn/cdn/content-toolbar/csdn-logo.png`“
- 服务器：接收到客户端发来的 HTTP request 后，他会解析 HTTP request 的 URL，然后根据解析出来的 URL 读取 URL 指定的资源。最后将 CSDN LOGO 附在 HTTP response 中返回给客户端。

上面就是一次 HTTP 请求的过程了。前面我们说到 Web 服务器负责处理网页的静态资源 HTTP 请求。那么这次请求里 Web 服务器也肯定参与了工作。关于这一点，需要一些[网络工程](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B/3558682?fr=aladdin)的基础知识。

首先明确一点，如果我们想要获取某个服务器里面的资源，那第一步要做的肯定是先访问那个服务器。那如何访问服务器呢？ IP 地址（域名）可以实现（具体原理可查看：《[Web 优化——浏览器访问某个网址背后所做的工作](https://blog.csdn.net/weixin_44869002/article/details/106764779)》）。上面 HTTP request URL 中的`csdnimg.cn`就是域名了。

**那访问到服务器后呢？**

那肯定是根据 URL 域名后面的路径来读取资源啦！

那这部分是怎么实现的呢？Web 服务器做的就是这个工作了。

> 这就好比，服务器是个酒馆，客人根据 IP 地址来关顾你的店，你肯定要有个接待员来接待顾客啦。这个接待员就是 Web 服务器了。

### 部署 Web 服务器

前面说了一大堆，其实 Web 服务器的部署并不难。

- 首先，选择我们需要安装的 Web 服务器。前面说到常用的 Web 服务器有三种：apache、nginx、IIS( window 专用)。我选择的是 Nginx:

  安装 Nginx 也很简单，用 apt 安装一步到位。

  ```shell
  sudo apt-get install nginx
  ```

  > 不过呢！apt 安装确实简单轻松，但是如果你需要安装扩展模块的话。你就悲催了！
  >
  > 所以，建议你采用安装包安装。如何安装，我这里就不说了。具体参考：《[ubuntu 安装 nginx](https://blog.csdn.net/qq_23832313/article/details/83578836)》

- 接着就是，开启 Nginx 服务了

  ```shell
  service nginx start
  ```

  这时你在浏览器中输入服务器的 IP 地址就可以看到 Nginx 的欢迎页。自此安装成功。

- 最后，将前端打包好的代码放到 Nginx 的 www 目录下就可以了。

自此，整个网站就可以正常范围了。只是只能使用 IP 地址访问。但是没关系呀！能用就行了。

第一次部署服务器圆满成功！哈哈哈！！

**真的吗？**

**未完待续……**

---

后续请看：[关于域名、备案、SSL 证书、HTTPS 协议那些事](../架设服务器实记：第2篇——关于域名、备案、SSL证书、HTTPS协议那些事)

---

## 参考文档

1. [百度百科——WEB 服务器](https://baike.baidu.com/item/WEB%E6%9C%8D%E5%8A%A1%E5%99%A8/8390210?fr=aladdin)
2. [百度百科——应用服务器](https://baike.baidu.com/item/%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8/4971773?fr=aladdin)
3. [WEB 服务器、应用程序服务器、HTTP 服务器区别](http://www.cnblogs.com/zhaoyl/archive/2012/10/10/2718575.html)
