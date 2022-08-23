# Automatic_Running_Program
This is a very useful cheating software in some special cases.
# Update
## v_1.0
纯前端实现，采用原生JS并通过XMLHttpRequest对象发送请求，将接收数据在前端处理后展示出来。
## v_2.0
前后端结合，前端还是原生JS，后端采用node.js的express框架，监听8000端口的请求，这样就可以前端在80端口向8000端口请求发送，通过8000端口向另一部服务器发送请求并拿到数据，然后再把数据返回给80端口，80端口经过一定的数据处理表现在网页上。
这样做的好处是比直接前端JS发请求更加安全，核心代码运行在服务器上，避免了核心代码被窥视，不过这样需要处理跨域访问的问题。
