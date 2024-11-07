# hyper-v 使用问题汇总

## 分辨率调整

+ 打开 /etc/default/grub 文件
+ 找到GRUB_CMDLINE_LINUX_DEFAULT属性，在其value上增加`video=hyperv_fb:[分辨率]`

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash video-hyperv_fb:1920x1080"
```

+ 终端运行 `update-grub`
+ 重启服务器`reboot`
