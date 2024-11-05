import { type HeadConfig } from 'vitepress'

const headConfig: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }], // 设置网站图标
  ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JFDHHFD1SK' }],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JFDHHFD1SK');`
  ],
  [
    'script',
    {},
    `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?aa81c44a00bef60315b1c9b969e03ddf";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`
  ]
]

export default headConfig
