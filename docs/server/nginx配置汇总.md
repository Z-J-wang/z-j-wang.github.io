# nginx 配置汇总

> [!info]
> 记录 Nginx 的常用配置。

## 接口转发配置

```nginx
server {
  listen       9559;
  server_name  10.0.2.15 127.0.0.1;

  location / { #代理url根路径的全部请求

    # 通过add_header给回传给客户端的请求设置跨域配置响应头信息

    # 由于需要传输cookie，需要指定具体的Access-Control-Allow-Origin。不能设置为*
    add_header Access-Control-Allow-Origin http://localhost:3000 always;
    add_header Access-Control-Allow-Headers "Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent";
    add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS";
    # 服务端同意跨域传输凭证,cookie传输必须开启
    add_header Access-Control-Allow-Credentials true;

    if ($request_method = 'OPTIONS') {
      return 200;
    }

    proxy_pass http://dbdev.cngb.org; # 将接口代理到http://dbdev.cngb.org
  }
}
```

说明：监听`10.0.2.15`和` 127.0.0.1`的`9559`端口，劫持其中所有的请求。然后模拟被劫持的请求向`http://dbdev.cngb.org`发起请求。待`http://dbdev.cngb.org`响应请求后，将响应的数据转发给被劫持的请求，并添加所需的响应头。此外，对于`OPTIONS`请求，立即响应 200 状态码。

## nginx ssl(https) 配置

操作：进入 nginx 的配置文件目录:

```shell
cd /usr/local/nginx/conf/
```

打开 `nginx.conf`，添加如下配置

```shell
    # HTTPS server
   	server {
        listen 443 ssl;   #SSL协议访问端口号为443。此处如未添加ssl，可能会造成Nginx无法启动。
        server_name www.example.com;  #将www.example.com修改为您证书绑定的域名，例如：www.example.com。
        root html;
        index index.html index.htm;
        ssl_certificate cert/4336364_www.bmyx.xyz.pem;   #将4336364_www.bmyx.xyz.pem替换成您证书的文件名。
        ssl_certificate_key cert/4336364_www.bmyx.xyz.key;   #将4336364_www.bmyx.xyz.key替换成您证书的密钥文件名。
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
        ssl_prefer_server_ciphers on;
        location / {
                root html;   #站点目录。
                index index.html index.htm;
            }

        # 配置项目 server 的代理
        location /api {
                proxy_pass http://120.78.60.106:3000/;
           	}
      }
```

> 上面有两点要注意
>
> 1. ssl 证书的路径。这里，我将存放到了 `/usr/local/nginx/conf/`下的`cert`文件夹中。所以上面的对证书的配置是这样写的：
>
>    ```shell
>    ssl_certificate cert/4336364_www.bmyx.xyz.pem;
>    ssl_certificate_key cert/4336364_www.bmyx.xyz.key;
>    ```
>
> 2. 项目 server 端的配置。因为一个证书只能配置一个端口。所以想要通过 https 来访问 server 端，就需要进行代理配置。这里，将 server 端的访问路径 `http://120.78.60.106:3000/` 绑定到了证书绑定的域名子路径` /api`。也就是，当用户访问 `https://www.example.com/api`时，nginx 会自动跳转反问 `http://120.78.60.106:3000/`。

修改后的文件如下：

```shell
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
   	server {
        listen 443 ssl;   #SSL协议访问端口号为443。此处如未添加ssl，可能会造成Nginx无法启动。
        server_name localhost;  #将localhost修改为您证书绑定的域名，例如：www.example.com。
        root html;
        index index.html index.htm;
        ssl_certificate cert/4336364_www.bmyx.xyz.pem;   #将domain name.pem替换成您证书的文件名。
        ssl_certificate_key cert/4336364_www.bmyx.xyz.key;   #将domain name.key替换成您证书的密钥文件名。
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
        ssl_prefer_server_ciphers on;
        location / {
                root html;   #站点目录。
                index index.html index.htm;
            }

        # 配置项目 server 的代理
        location /api {
                proxy_pass http://120.78.60.106:3000/;
           	}
      }
}

```
