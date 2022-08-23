2022年 8 月 6 日 23:06

---

增加 ``docs`` 目录。

# 如何使用 spring boot 开发一个接口？

修改 src/resources/application.properties 文件为 application.yml

```yaml
spring:
  mvc:
    view:
      prefix: classpath:/templates/
      suffix: .html
    thymeleaf:
      mode: HTML
      encoding: utf-8
      cache: false
    datasource:
      url: jdbc:mysql://localhost:3306/weekly?characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false
      username: root
      password: root
      driver-class-name: com.mysql.cj.jdbc.Driver
    devtools:
      restart:
        enabled: true # 设置开启热部署
    freemarker:
      cache: false # 页面不加载缓存，修改及时生效

mybatis:
  mapper-locations: classpath:mapper/*.xml

server:
  port: 8097
```



文件夹结构：

```tex
- java
  -- com.weekly.baidu
    --- Controller
    --- Entity
    --- mapper
    --- Service
    --- utils
  -- resources
    --- Mapper
    --- static
    --- templates
    --- application.yml
```



在 Entity 中新建一个类：

```java
package com.weekly.baidu.Entity;
import lombok.Data;

@Data
public class User {
    private Integer id;
    private String name;
    private String email;
    private String password;
}
```



在 mapper 中建一个类，mapper 要选择接口类型：

```java
package com.weekly.baidu.mapper;

@Mapper
public interface UserMapper {
    List<User>table();
}
```



在 resources/Mapper 中创建 xml 配置文件：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper/dtd">

<mapper namespace="com.weekly.baidu.mapper.UserMapper">
    <select id="table" resultType="com.weekly.baidu.Entity.User">
    	select * from USER
    </select>
</mapper>
```



在 Service 中新建一个类：

```java
package com.weekly.baidu.Service;

import com.weekly.baidu.Entity.User;
import com.weekly.baidu.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.strereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    public List<User>findAll() {
        return userMapper.table();
    }
}
```



在 Controller 中新建一个类：

```java
package com.weekly.baidu.Controller;

@RestController
@Controller
public class UserController {
    @Autowird
    private UserService userService;
    
    @RequstMapping('/users')
    public List<User> getUser() {
        return userService.findAll();
    }
}
```



# lombok 的作用？



# mapper 是干什么的？



# mybatis

中文文档：https://mybatis.net.cn/getting-started.html



```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>3.5.8</version>
</dependency>
```

