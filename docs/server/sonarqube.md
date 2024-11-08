# sonarqube

## docker 运行指令

```shell
docker run -d --name sonarqube -p 9000:9000 -v /home/sonarqube_data:/home --restart=always sonarqube:latest
```

说明：运行 sonarqube 最新的镜像，将主机的 9000 端口映射到容器 9000 端口，将容器的`/home`映射到主机`/home/sonarqube_data`，并且把镜像命名为`sonarqube`，设置任何时候开机自启。

运行成功后默认的账号密码：

> 用户名：admin
>
> 密码：admin

后更新为：

> 用户名：admin
>
> 密码：Aa123456

# genebank 运行脚本

```sh
sonar-scanner.bat -D"sonar.projectKey=genebank" -D"sonar.sources=." -D"sonar.host.url=http://172.17.37.49:9000" -D"sonar.token=sqp_2aa61610260e68de7440197e8e1b95ccfb354a8a"
```
