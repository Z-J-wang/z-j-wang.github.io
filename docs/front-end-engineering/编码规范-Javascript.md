## 前言

> 本套代码规范大量参考了《 [JavaScript Standard Style(JavaScript 标准编码风格)](https://standardjs.com/)》和《[Airbnb JavaScript 编码规范(涵盖 ECMAScript 6+)](https://www.html.cn/archives/8345)》。以《JavaScript Standard Style》为基础，补充《Airbnb JavaScript 编码规范(涵盖 ECMAScript 6+)》部分规范和一些补充。



## 目录

[TOC]


## 细则

#### 1. 缩进（空格与制表符）

+ 使用两个空格进行缩进

  eslint: [`indent`](http://eslint.org/docs/rules/indent)

  ```js
  function hello (name) {
    console.log('hi', name)
  }
  ```

  

+ **不要使用制表符**。

     eslint: [`no-tabs`](http://eslint.org/docs/rules/no-tabs)

  

+ **不要混合使用空格与制表符作为缩进**。

     eslint: [`no-mixed-spaces-and-tabs`](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs)

  

#### 2. 字符串 String

+ 除需要转义的情况外，**字符串统一使用单引号**。

  eslint: [`quotes`](http://eslint.org/docs/rules/quotes)

  ```js
  console.log('hello there')
  var double = "a string containing 'single' quotes"
  ```
  
  
  
+ **字符串拼接操作符 (Infix operators)** 之间要留空格。

     eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops)

     ```js
     // ✓ ok
     var x = 2
     var message = 'hello, ' + name + '!'
     ```

     ```js
     // ✗ avoid
     var x=2
     var message = 'hello, '+name+'!'
     ```

     

+ **不要使用多行字符串**。

     eslint: [`no-multi-str`](http://eslint.org/docs/rules/no-multi-str)

     ```js
     const message = 'Hello \
                      world'     // ✗ avoid
     ```

     

+ **字符串字面量中也不要使用八进制转义字符**。

     eslint: [`no-octal-escape`](http://eslint.org/docs/rules/no-octal-escape)

     ```js
     const copyright = 'Copyright \251'  // ✗ avoid
     ```

     

+ **正确使用 ES6 中的字符串模板**。

     eslint: [`no-template-curly-in-string`](http://eslint.org/docs/rules/no-template-curly-in-string)

     ```js
     const message = 'Hello ${name}'   // ✗ avoid
     const message = `Hello ${name}`   // ✓ ok
     ```

     

+ **模板字符串中变量前后不加空格**。

     eslint: [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing)

     ```javascript
     const message = `Hello, ${ name }`    // ✗ avoid
     const message = `Hello, ${name}`      // ✓ ok
     ```
     
     
     
+ **禁止不必要的转义**。

        eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)
        
        ```js
        let message = 'Hell\o'  // ✗ avoid
        ```


#### 3. 数字 Number

 + **不要使用八进制字面量**。

      eslint: [`no-octal`](http://eslint.org/docs/rules/no-octal)

      ```js
      const octal = 042         // ✗ avoid
      const decimal = 34        // ✓ ok
      const octalString = '042' // ✓ ok
      ```

   

+ **检查 `NaN` 的正确姿势是使用 `isNaN()`**。

     eslint: [`use-isnan`](http://eslint.org/docs/rules/use-isnan)

     ```javascript
     if (price === NaN) { }      // ✗ avoid
     if (isNaN(price)) { }       // ✓ ok
     ```

  

+ **不要省去小数点前面的0**。

     eslint: [`no-floating-decimal`](http://eslint.org/docs/rules/no-floating-decimal)

     ```js
     const discount = .5      // ✗ avoid
     const discount = 0.5     // ✓ ok
     ```




#### 4. 布尔 Boolean

+ **避免不必要的布尔转换**。

     eslint: [`no-extra-boolean-cast`](http://eslint.org/docs/rules/no-extra-boolean-cast)

     ```js
     const result = true
     if (!!result) {   // ✗ avoid
       // ...
     }
      
     const result = true
     if (result) {     // ✓ ok
       // ...
     }
     ```




#### 5. Symbol

+ **禁止使用 `Symbol` 构造器**。

     eslint: [`no-new-symbol`](http://eslint.org/docs/rules/no-new-symbol)

     ```js
     const foo = new Symbol('foo')   // ✗ avoid
     ```

  

#### 6. 对象 Object

+ **禁止使用 `Object` 构造器**。

     eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object)

     ```js
     let config = new Object()   // ✗ avoid
     ```

  

+ **对象属性换行时注意统一代码风格**。

     eslint: [`object-property-newline`](http://eslint.org/docs/rules/object-property-newline)

     ```js
     const user = {
       name: 'Jane Doe', age: 30,
       username: 'jdoe86'            // ✗ avoidjs
     }
      
     const user = { name: 'Jane Doe', age: 30, username: 'jdoe86' }    // ✓ ok
      
     const user = {
       name: 'Jane Doe',
       age: 30,
       username: 'jdoe86'
     }                                                                 // ✓ ok
     ```

  

+ 使用 `getPrototypeOf` 来替代 **`__proto__`**。

     eslint: [`no-proto`](http://eslint.org/docs/rules/no-proto)

     ```js
     const foo = obj.__proto__               // ✗ avoid
     const foo = Object.getPrototypeOf(obj)  // ✓ ok
     ```

  

+ **不要扩展原生对象**。

     eslint: [`no-extend-native`](http://eslint.org/docs/rules/no-extend-native)

     ```js
     Object.prototype.age = 21     // ✗ avoid
     ```

  

+ **对象中定义了存值器，一定要对应的定义取值器**。

     eslint: [`accessor-pairs`](http://eslint.org/docs/rules/accessor-pairs)

     ```js
     var person = {
       set name (value) {    // ✗ avoid
         this._name = value
       }
     }
      
     var person = {
       set name (value) {
         this._name = value
       },
       get name () {         // ✓ ok
         return this._name
       }
     }
     ```

  

+ **不要将全局对象的属性作为函数调用**。

  eslint: [`no-obj-calls`](http://eslint.org/docs/rules/no-obj-calls)

  ```js
  const math = Math()   // ✗ avoid
  ```

  

+ **对象字面量中不要定义重复的属性**。

     eslint: [`no-dupe-keys`](http://eslint.org/docs/rules/no-dupe-keys)

     ```js
     var user = {
       name: 'Jane Doe',
       name: 'John Doe'    // ✗ avoid
     }
     ```

  

+ **不要对全局只读对象重新赋值**。

     eslint: [`no-global-assign`](http://eslint.org/docs/rules/no-global-assign)

     ```js
     window = {}     // ✗ avoid
     ```

  

+ **避免使用不必要的计算值作对象属性**。

     eslint: [`no-useless-computed-key`](http://eslint.org/docs/rules/no-useless-computed-key)

     ```js
     const user = { ['name']: 'John Doe' }   // ✗ avoid
     const user = { name: 'John Doe' }       // ✓ ok
     ```

  

+ **点号操作符须与属性需在同一行**。

     eslint: [`dot-location`](http://eslint.org/docs/rules/dot-location)

     ```js
       console.
         log('hello')  // ✗ avoid
      
       console
         .log('hello') // ✓ ok
     ```

  

+ **不要解构空值**。

     eslint: [`no-empty-pattern`](http://eslint.org/docs/rules/no-empty-pattern)

     ```js
     const { a: {} } = foo         // ✗ avoid
     const { a: { b } } = foo      // ✓ ok
     ```
     
     
     
+ **使用对象属性速记语法。**

     eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

     ```js
     const lukeSkywalker = 'Luke Skywalker';
     
     // bad
     const obj = {
         lukeSkywalker: lukeSkywalker,
     };
     
     // good
     const obj = {
         lukeSkywalker,
     };
     ```

     

#### 7. 数组 Array

+ **使用数组字面量而不是构造器**。

     eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor)

     ```js
     var nums = new Array(1, 2, 3)   // ✗ avoid
     var nums = [1, 2, 3]            // ✓ ok
     ```

  

+ **禁止使用稀疏数组（Sparse arrays）**。

     eslint: [`no-sparse-arrays`](http://eslint.org/docs/rules/no-sparse-arrays)

     ```js
     let fruits = ['apple',, 'orange']       // ✗ avoid
     ```



#### 8. 变量 Variables

+ 不要定义未使用的变量

  eslint: [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars)

  ```js
  function myFunction () {
    var result = something()   // ✗ avoid
  }
  ```

  

+ **使用浏览器全局变量时加上** `window.` 前缀。

     `document`、`console` 和 `navigator` 除外。

     eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef)

     ```js
     window.alert('hi')   // ✓ ok
     ```

     

+ 总是使用 `const` 或 `let` 来声明变量。 不这样做会导致产生全局变量。 我们希望避免污染全局命名空间。（补充）

  eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

     ```JavaScript
     // bad 
     superPower = new SuperPower(); 
     
     // good
     const superPower = new SuperPower();
     ```



+ **每个 var 关键字**单独声明一个变量。

    eslint: [`one-var`](http://eslint.org/docs/rules/one-var)
    
    
    ```js
    // ✓ ok
    var silent = true
    var verbose = true
     
    // ✗ avoid
    var silent = true, verbose = true
     
    // ✗ avoid
    var silent = true,
        verbose = true
    ```



+ **避免修改使用 `const` 声明的变量**。

    eslint: [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign)

    ```js
    const score = 100
    score = 125       // ✗ avoid
    ```



+ **不要对变量使用 `delete` 操作**。

    eslint: [`no-delete-var`](http://eslint.org/docs/rules/no-delete-var)

    ```js
    var name
    delete name     // ✗ avoid
    ```

    

+ **不要重复声明变量**。

    eslint: [`no-redeclare`](http://eslint.org/docs/rules/no-redeclare)

    ```js
    let name = 'John'
    let name = 'Jane'     // ✗ avoid
     
    let name = 'John'
    name = 'Jane'         // ✓ ok
    ```
    
    
    
+ **避免将变量赋值给自己**。

    eslint: [`no-self-assign`](http://eslint.org/docs/rules/no-self-assign)
    
     ```js
    name = name   // ✗ avoid
     ```

    

+ **避免将变量与自己进行比较操作**。

    esint: [`no-self-compare`](http://eslint.org/docs/rules/no-self-compare)

    ```js
    if (score === score) {}   // ✗ avoid
    ```

    

+ **不要使用 `undefined` 来初始化变量**。

   eslint: [`no-undef-init`](http://eslint.org/docs/rules/no-undef-init)
   
   ```js
   let name = undefined    // ✗ avoid
    
   let name
   name = 'value'          // ✓ ok
   ```




#### 9. 函数 Function

+ 函数声明时括号与函数名间加空格。

  eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren)

  ```js
  function name (arg) { ... }   // ✓ ok
  function name(arg) { ... }    // ✗ avoid
   
  run(function () { ... })      // ✓ ok
  run(function() { ... })       // ✗ avoid
  ```

+ #### **函数调用时标识符与括号间不留间隔**。

     eslint: [`func-call-spacing`](http://eslint.org/docs/rules/func-call-spacing)

     ```js
     console.log ('hello') // ✗ avoid
     console.log('hello')  // ✓ ok
     ```

+ **不要定义冗余的函数参数**。

     eslint: [`no-dupe-args`](http://eslint.org/docs/rules/no-dupe-args)

     ```js
     function sum (a, b, a) {  // ✗ avoid
       // ...
     }
      
     function sum (a, b, c) {  // ✓ ok
       // ...
     }
     ```

+ **不要使用多余的括号包裹函数**。

     eslint: [`no-extra-parens`](http://eslint.org/docs/rules/no-extra-parens)

     ```js
     const myFunc = (function () { })   // ✗ avoid
     const myFunc = function () { }     // ✓ ok
     ```

+ **避免对声明过的函数重新赋值**。

     eslint: [`no-func-assign`](http://eslint.org/docs/rules/no-func-assign)

     ```js
     function myFunc () { }
     myFunc = myOtherFunc    // ✗ avoid
     ```

+ **自调用匿名函数 (IIFEs) 使用括号包裹**。

     eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife)

     ```javascript
     const getName = function () { }()     // ✗ avoid
      
     const getName = (function () { }())   // ✓ ok
     const getName = (function () { })()   // ✓ ok
     ```

+ **避免多余的函数上下文绑定**。

     eslint: [`no-extra-bind`](http://eslint.org/docs/rules/no-extra-bind)

     ```js
     const name = function () {
       getName()
     }.bind(user)    // ✗ avoid
      
     const name = function () {
       this.getName()
     }.bind(user)    // ✓ ok
     ```

     

+ **嵌套的代码块中禁止再定义函数**。

    eslint: [`no-inner-declarations`](http://eslint.org/docs/rules/no-inner-declarations)

    ```js
    if (authenticated) {
      function setAuthUser () {}    // ✗ avoid
    }
    ```

    

+ **避免使用 `arguments.callee` 和 `arguments.caller`**。

   eslint: [`no-caller`](http://eslint.org/docs/rules/no-caller)
   
   ```js
   function foo (n) {
     if (n <= 0) return
    
     arguments.callee(n - 1)   // ✗ avoid
   }
    
   function foo (n) {
     if (n <= 0) return
    
     foo(n - 1)
   }
   ```

   
   
+ **return 语句中的赋值必需有括号包裹**。

  eslint: [`no-return-assign`](http://eslint.org/docs/rules/no-return-assign)

  ```js
   function sum (a, b) {
       return result = a + b     // ✗ avoid
   }
  
   function sum (a, b) {
       return (result = a + b)   // ✓ ok
   }
  ```

+ **禁止使用 `Function` 构造器**。

  eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)
  
  ```js
   var sum = new Function('a', 'b', 'return a + b')    // ✗ avoid
  ```

+ **不要书写不必要的嵌套代码块**。

  eslint: [`no-lone-blocks`](http://eslint.org/docs/rules/no-lone-blocks)
  
  ```js
   function myFunc () {
       {                   // ✗ avoid
           myOtherFunc()
       }
   }
  
   function myFunc () {
       myOtherFunc()       // ✓ ok
   }
  ```

#### 10. 类 Classes & 构造函数 Constructors



+ 总是使用 `class`。避免直接操作 `prototype` 。(补充)

  > 为什么? 因为 `class` 语法更为简洁更易读。

  ```js
  // bad
  function Queue(contents = []) {
      this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
  };
   
  // good
  class Queue {
      constructor(contents = []) {
      this.queue = [...contents];
      }
      pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
      }
  }
  ```

  

+ 使用 `extends` 继承。（补充）

  > ​	为什么？因为 `extends` 是一个内置的原型继承方法并且不会破坏 `instanceof`。

  ```js
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
      Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
      return this.queue[0];
  };
   
  // good
  class PeekableQueue extends Queue {
      peek() {
      return this.queue[0];
      }
  }
  ```



+ 如果没有指定，类有一个默认的构造函数。一个空的构造函数或者只是委托给父类则不是必须的。

   eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

  ```js
  // bad
  class Jedi {
      constructor() {}
   
      getName() {
      return this.name;
      }
  }
   
  // bad
  class Rey extends Jedi {
      constructor(...args) {
      super(...args);
      }
  }
   
  // good
  class Rey extends Jedi {
      constructor(...args) {
      super(...args);
      this.name = 'Rey';
      }
  }
  ```

  

+ **类中不要定义冗余的属性**。

    eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)
    
     ```js
    class Dog {
      bark () {}
      bark () {}    // ✗ avoid
    }
     ```

    

+ **构造函数要以大写字母开头**。

     eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap)

     ```js
     function animal () {}
     var dog = new animal()    // ✗ avoid
      
     function Animal () {}
     var dog = new Animal()    // ✓ ok
     ```

+ **无参的构造函数调用时要带上括号**。

     eslint: [`new-parens`](http://eslint.org/docs/rules/new-parens)

     ```js
     function Animal () {}
     var dog = new Animal    // ✗ avoid
     var dog = new Animal()  // ✓ ok
     ```

+ **子类的构造器中一定要调用 `super`**

    eslint: [`constructor-super`](http://eslint.org/docs/rules/constructor-super)

    ```js
    class Dog {
      constructor () {
        super()   // ✗ avoid
      }
    }
     
    class Dog extends Mammal {
      constructor () {
        super()   // ✓ ok
      }
    }
    ```

    

+ #### **避免对类名重新赋值**。

    eslint: [`no-class-assign`](http://eslint.org/docs/rules/no-class-assign)
    
    ```js
    class Dog {}
    Dog = 'Fido'    // ✗ avoid
    ```

    
    
+ **`new` 创建对象实例后需要赋值给变量**。

       eslint: [`no-new`](http://eslint.org/docs/rules/no-new)
        
       ```js
       new Character()                     // ✗ avoid
       const character = new Character()   // ✓ ok
       ```

+ **使用 `this` 前请确保 `super()` 已调用**。

       eslint: [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super)
        
       ```js
       class Dog extends Animal {
         constructor () {
           this.legs = 4     // ✗ avoid
           super()
         }
       }
       ```

+ **避免不必要的 `.call()` 和 `.apply()`**。

       eslint: [`no-useless-call`](http://eslint.org/docs/rules/no-useless-call)
        
       ```js
       sum.call(null, 1, 2, 3)   // ✗ avoid
       ```

    
   
   
   

#### 11. 空格的添加

+ 关键字后面加空格。

  eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing)

  ```js
  if (condition) { ... }   // ✓ ok
  if(condition) { ... }    // ✗ avoid
  ```

+ **单行代码块两边加空格**。

     eslint: [`block-spacing`](http://eslint.org/docs/rules/block-spacing)

     ```js
       function foo () {return true}    // ✗ avoid
       function foo () { return true }  // ✓ ok
     ```
     
+ **键值对当中冒号与值之间要留空白**。

     ```js
     var obj = { 'key' : 'value' }    // ✗ avoid
     var obj = { 'key' :'value' }     // ✗ avoid
     var obj = { 'key':'value' }      // ✗ avoid
     var obj = { 'key': 'value' }     // ✓ ok
     ```

     

+ **除了缩进，不要使用多个空格**。

     eslint: [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces)

     ```js
     const id =    1234    // ✗ avoid
     const id = 1234       // ✓ ok
     ```

+  **展开运算符与它的表达式间不要留空白**。

     eslint: [`rest-spread-spacing`](http://eslint.org/docs/rules/rest-spread-spacing)

     ```js
     fn(... args)    // ✗ avoid
     fn(...args)     // ✓ ok
     ```

 

+  **遇到分号时空格要后留前不留**。

     eslint: [`semi-spacing`](http://eslint.org/docs/rules/semi-spacing)

     ```js
     for (let i = 0 ;i < items.length ;i++) {...}    // ✗ avoid
     for (let i = 0; i < items.length; i++) {...}    // ✓ ok
     ```
     
      
     
+  **圆括号间不留空格**。

    eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens)

    ```js
    getName( name )     // ✗ avoid
    getName(name)       // ✓ ok
    ```
    
    


+ **代码块首尾留空格**。

     eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

     ```js
     if (admin){...}     // ✗ avoid
     if (admin) {...}    // ✓ ok
     ```

+ **一元运算符后面跟一个空格**。

        eslint: [`space-unary-ops`](http://eslint.org/docs/rules/space-unary-ops)
        
        ```javascript
          typeof!admin        // ✗ avoid
          typeof !admin        // ✓ ok
        ```

+ **行末不留空格**。

        eslint: [`no-trailing-spaces`](http://eslint.org/docs/rules/no-trailing-spaces)



#### 12. 结构体(代码块)

+ 使用大括号包裹所有的多行代码块。

   eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)

  

+ 条件判断结构体

  + **多行 if 语句的**的括号不能省。

       eslint: [`curly`](http://eslint.org/docs/rules/curly)

       ```js
       // ✓ ok
       if (options.quiet !== true) console.log('done')
       ```

       ```js
       // ✓ ok
       if (options.quiet !== true) {
         console.log('done')
       }
       ```

       ```js
       // ✗ avoid
       if (options.quiet !== true)
         console.log('done')
       ```

    

  + **else 关键字要与花括号**保持在同一行。

       eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style)

       ```js
       // ✓ ok
       if (condition) {
         // ...
       } else {
         // ...
       }
       ```

       ```js
       // ✗ avoid
       if (condition)
       {
         // ...
       }
       else
       {
         // ...
       }
       ```

    

  + 始终使用 `===` 替代 `==`。

    例外： `obj == null` 可以用来检查 `null || undefined`。

    eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq)

    ```js
    if (name === 'John')   // ✓ ok
    if (name == 'John')    // ✗ avoid
    ```

    ```js
    if (name !== 'John')   // ✓ ok
    if (name != 'John')    // ✗ avoid
    ```

    

  + **条件语句中赋值语句**使用括号包起来。这样使得代码更加清晰可读，而不会认为是将条件判断语句的全等号（`===`）错写成了等号（`=`）。

       eslint: [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign)

       ```js
       // ✓ ok
       while ((m = text.match(expr))) {
         // ...
       }
        
       // ✗ avoid
       while (m = text.match(expr)) {
         // ...
       }
       ```

    

  + **关系运算符的左值不要做取反操作**。

       eslint: [`no-unsafe-negation`](http://eslint.org/docs/rules/no-unsafe-negation)

       ```js
       if (!key in obj) {}       // ✗ avoid
       ```

    

  + **请书写优雅的条件语句（avoid Yoda conditions）**。

       eslint: [`yoda`](http://eslint.org/docs/rules/yoda)

       ```javascript
       if (42 === age) { }    // ✗ avoid
       if (age === 42) { }    // ✓ ok
       ```

    

+ 循环结构体

  + **循环语句中注意更新循环变量**。

       eslint: [`no-unmodified-loop-condition`](http://eslint.org/docs/rules/no-unmodified-loop-condition)

       ```js
       for (let i = 0; i < items.length; j++) {...}    // ✗ avoid
       for (let i = 0; i < items.length; i++) {...}    // ✓ ok
       ```

    

  + **`switch` 一定要使用 `break` 来将条件分支正常中断**。

       eslint: [`no-fallthrough`](http://eslint.org/docs/rules/no-fallthrough)

       ```js
       switch (filter) {
         case 1:
           doSomething()    // ✗ avoid
         case 2:
           doSomethingElse()
       }
        
       switch (filter) {
         case 1:
           doSomething()
           break           // ✓ ok
         case 2:
           doSomethingElse()
       }
        
       switch (filter) {
         case 1:
           doSomething()
           // fallthrough  // ✓ ok
         case 2:
           doSomethingElse()
       }
       ```

    

  + **`switch` 语句中不要定义重复的 `case` 分支**。

       eslint: [`no-duplicate-case`](http://eslint.org/docs/rules/no-duplicate-case)

       ```js
       switch (id) {
         case 1:
           // ...
         case 1:     // ✗ avoid
       }
       ```

    

+ 三元运算符

  + **对于三元运算符** `?` 和 `:` 与他们所负责的代码处于同一行

       eslint: [`operator-linebreak`](http://eslint.org/docs/rules/operator-linebreak)

       ```js
       // ✓ ok
       var location = env.development ? 'localhost' : 'www.api.com'
        
       // ✓ ok
       var location = env.development
         ? 'localhost'
         : 'www.api.com'
        
       // ✗ avoid
       var location = env.development ?
         'localhost' :
         'www.api.com'
       ```

    

  + **如果有更好的实现，尽量不要使用三元表达式**。

       eslint: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary)

       ```js
       let score = val ? val : 0     // ✗ avoid
       let score = val || 0          // ✓ ok
       ```

    

+ **不要使用标签语句**。

     eslint: [`no-labels`](http://eslint.org/docs/rules/no-labels)

     ```js
     label:
       while (true) {
         break label     // ✗ avoid
       }
     ```

  

+ **禁止使用 `with`**。

     eslint: [`no-with`](http://eslint.org/docs/rules/no-with)

     ```js
     with (val) {...}    // ✗ avoid
     ```

  

+ **避免使用常量作为条件表达式的条件（循环语句除外）**。

     eslint: [`no-constant-condition`](http://eslint.org/docs/rules/no-constant-condition)

     ```js
     if (false) {    // ✗ avoid
       // ...
     }
      
     if (x === 0) {  // ✓ ok
       // ...
     }
      
     while (true) {  // ✓ ok
       // ...
     }
     ```

  

+ `try...catch`结构

  + **`catch` 中不要对错误重新赋值**。

       eslint: [`no-ex-assign`](http://eslint.org/docs/rules/no-ex-assign)

       ```js
       try {
         // ...
       } catch (e) {
         e = 'new value'             // ✗ avoid
       }
        
       try {
         // ...
       } catch (e) {
         const newVal = 'new value'  // ✓ ok
       }
       ```

    

  + **不要丢掉**异常处理中`err`参数。

       eslint: [`handle-callback-err`](http://eslint.org/docs/rules/handle-callback-err)

       ```js
       // ✓ ok
       run(function (err) {
         if (err) throw err
         window.alert('done')
       })
       ```

       ```js
       // ✗ avoid
       run(function (err) {
         window.alert('done')
       })
       ```

    

  + **用 `throw` 抛错时，抛出 `Error` 对象而不是字符串**。

       eslint: [`no-throw-literal`](http://eslint.org/docs/rules/no-throw-literal)

       ```js
       throw 'error'               // ✗ avoid
       throw new Error('error')    // ✓ ok
       ```

    

  + **`finally` 代码块中不要再改变程序执行流程**。

       eslint: [`no-unsafe-finally`](http://eslint.org/docs/rules/no-unsafe-finally)

       ```js
       try {
         // ...
       } catch (e) {
         // ...
       } finally {
         return 42     // ✗ avoid
       }
       ```

    

#### 13. 正则表达式

+ **正则中不要使用控制符**。

     eslint: [`no-control-regex`](http://eslint.org/docs/rules/no-control-regex)

     ```js
     var pattern = /\x1f/    // ✗ avoid
     var pattern = /\x20/    // ✓ ok
     ```

  

+ **正则中不要使用空字符**。

     eslint: [`no-empty-character-class`](http://eslint.org/docs/rules/no-empty-character-class)

     ```js
     const myRegex = /^abc[]/      // ✗ avoid
     const myRegex = /^abc[a-z]/   // ✓ ok
     ```

  

+ **正则中避免使用多个空格**。

     eslint: [`no-regex-spaces`](http://eslint.org/docs/rules/no-regex-spaces)

     ```js
     const regexp = /test   value/   // ✗ avoid
      
     const regexp = /test {3}value/  // ✓ ok
     const regexp = /test value/     // ✓ ok
     ```

  

+ **不要向 `RegExp` 构造器传入非法的正则表达式**。

     eslint: [`no-invalid-regexp`](http://eslint.org/docs/rules/no-invalid-regexp)

     ```js
     RegExp('[a-z')    // ✗ avoid
     RegExp('[a-z]')   // ✓ ok
     ```

  

#### 14. 模块

+ **同一模块有多个导入时一次性写完**。

     eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)

     ```js
     import { myFunc1 } from 'module'
     import { myFunc2 } from 'module'          // ✗ avoid
      
     import { myFunc1, myFunc2 } from 'module' // ✓ ok
     ```

  

+ **禁止使用 `new require`**。

     eslint: [`no-new-require`](http://eslint.org/docs/rules/no-new-require)

     ```js
     const myModule = new require('my-module')    // ✗ avoid
     ```

  

+ **import, export 和解构操作中，禁止赋值到同名变量**。

     eslint: [`no-useless-rename`](http://eslint.org/docs/rules/no-useless-rename)

     ```js
     import { config as config } from './config'     // ✗ avoid
     import { config } from './config'               // ✓ ok
     ```

  

+ 将所有 `import` 导入放在非导入语句的上面。

  eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

  > 由于 `import` 被提升，保持他们在顶部，防止意外的行为。



#### 15. 逗号

+ **逗号后面加空格**。

  eslint: [`comma-spacing`](http://eslint.org/docs/rules/comma-spacing)

  ```js
  // ✓ ok
  var list = [1, 2, 3, 4]
  function greet (name, options) { ... }
  ```

  ```js
  // ✗ avoid
  var list = [1,2,3,4]
  function greet (name,options) { ... }
  ```

  

+ **始终将逗号置于行末**。

     eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style)

     ```js
       var obj = {
         foo: 'foo'
         ,bar: 'bar'   // ✗ avoid
       }
      
       var obj = {
         foo: 'foo',
         bar: 'bar'   // ✓ ok
       }
     ```

  

+ **不允许有多余的行末逗号**。

     eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle)

     ```js
       var obj = {
         message: 'hello',   // ✗ avoid
       }
     ```

  

+ **避免使用逗号操作符**。

     eslint: [`no-sequences`](http://eslint.org/docs/rules/no-sequences)

     ```js
     if (doSomething(), !!test) {}   // ✗ avoid
     ```





#### 16. 命名规则

> 命名要有意义，避免用单字符变量和少见单词来命名。尽量做到通过命名就可以大概知道其作用是什么。

+ 变量、属性和函数名统一采用小驼峰；

  eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html)

  ```js
  function my_function () { }    // ✗ avoid
  function myFunction () { }     // ✓ ok
  
  var my_var = 'hello'           // ✗ avoid
  var myVar = 'hello'            // ✓ ok
  ```

  

+ 类名、构造函数统一采用大驼峰；

   eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap.html)

  

+ 使用大写标识常量；

+ 如果代码引入Jquery，Jquery变量命名以`$`开头；

  

#### 17. 注释

+ **注释首尾留空格**。

     eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

     ```javascript
       //comment           // ✗ avoid
       // comment          // ✓ ok
        
       /*comment*/         // ✗ avoid
       /* comment */       // ✓ ok
     ```

  

+ **单行注释使用 `//` **。将单行注释放在续注释的语句上方。在注释之前放置一个空行，除非它位于代码块的第一行。

  ```js
  // ✗ avoid
  const active = true;  // is current tab
   
  // ✓ ok
  // is current tab
  const active = true;
  ```

  

+ 多行注释使用 `/** ... */` 。

  ```js
  /**
   * 删除图片
   * @param {string} 要删除的文件名
   * @retuen {boolean} 删除的结果
   */
  async delUploadImage(filename) {
      let res = await this.$HttpApi.delUploadImage(filename);
      let flat = false;
      if (res.status === 200) {
          console.log(`删除图片：${this.formItem.imgSrc}`);
          flat = true;
      } else {
          console.log(`删除图片失败`);
          flat = false;
      }
  
      return flat;
  },
  ```

+ `function` 的注释

  + function 没有参数，使用多行注释；

  + function 携带参数，在描述下面添加变量说明以及回传说明

    ```js
    /**
     * close 事件
     */
    handleClose() {
        // 内容省略
    },
    
    /**
     * 删除图片
     * @param {string} 要删除的文件名
     * @retuen {boolean} 删除的结果
     */
    async delUploadImage(filename) {
        let res = await this.$HttpApi.delUploadImage(filename);
        let flat = false;
        if (res.status === 200) {
            console.log(`删除图片：${this.formItem.imgSrc}`);
            flat = true;
        } else {
            console.log(`删除图片失败`);
            flat = false;
        }
    
        return flat;
    },
    ```




+ 变量的注释

  > 变量要尽量保证明了易懂，可以让人快速了解其作用。原则上，变量的说明从变量命名就开始了。也就是，变量的作用最好可以从变量的命名中直接可以得出。如果变量的命名不能很好的体现变量的作用，这时就需要通过注释进行说明了。



#### 18. 一些禁用

+ **禁止使用 `__iterator__`**。

     eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator)

  ```js
     Foo.prototype.__iterator__ = function () {}   // ✗ avoid
  ```

  建议使用高阶函数：

  > 使用 `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / … 来迭代数组, 使用 `Object.keys()` / `Object.values()` / `Object.entries()` 来生成数组，以便可以迭代对象。



+ 如果要使用`for(;;){}`、`forEach`、`for...in...` 和 `for ... of ...`

  ###### 各种遍历方法的优缺点：

  > 参考自：[JS中的forEach,for in,for of和for的遍历优缺点及区别](https://blog.csdn.net/weixin_34128411/article/details/94279246?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)

  ###### for(;;){}

  + 描述：该方法是最原始的遍历方法；
  + 优点：直接明了；
  + 缺点：结构比while循环复杂，容易出编码错误；只能遍历数组；

  

  ###### forEach

  + 描述：接收三个参数，第一个是value，第二个是index，第三个是数组体；用于调用数组的每个元素，并将元素传递给回调函数；
  + 优点：便利的时候更加简洁，效率和for循环相同，不用关心集合下标的问题，减少了出错的效率；
  + 缺点：不能同时遍历多个集合；在遍历的时候无法修改和删除集合数据；方法不能使用break，continue语句跳出循环，或者使用return从函数体返回；对于空数组不会执行回调函数；不能遍历对象；

  

  ###### for...in...

  + 描述：用于循环遍历数组或对象的可枚举属性，遍历的是对象（数组也是对象的一种）的key值；
  + 优点：可以遍历数组的键名，遍历对象简洁方便（常用与对象的遍历）
  + 缺点：某些情况下，会出现随机顺序的遍历，因为里面的key值是string类型，所以增加了转换过程，因此开销较大；因为对象的可枚举属性包括自有属性、继承自原型的属性，所以可能会遍历出意料之外的属性；

  > 如果需要遍历对象的继承属性，`for...in...` 反而是较优的选择。

  

  ###### for ... of ...

  + 描述：它是ES6中新增加的语法，用来循环获取一对键值对中的value。因为数组也是对象的一种，所以也适用于数组的遍历
  + 优点：避免了for in的所有缺点，可以使用break,continue和return；不仅支持数组的遍历，还可以遍历类似数组的对象，支持字符串的遍历；最简洁，最直接的遍历数组的语法；支持map和Set对象遍历；
  + 缺点：不适用于处理原有的原生对象（原生对象是一个子集，包含一些在运动过程中动态创建的对象）；

  

+ **不要使用 `debugger`**。

     eslint: [`no-debugger`](http://eslint.org/docs/rules/no-debugger)

     ```js
     function sum (a, b) {
       debugger      // ✗ avoid
       return a + b
     }
     ```

  

+ **不要使用非法的空白符**。

     eslint: [`no-irregular-whitespace`](http://eslint.org/docs/rules/no-irregular-whitespace)

     ```js
     function myFunc () /*<NBSP>*/{}   // ✗ avoid
     ```

  

+ **`return`，`throw`，`continue` 和 `break` 后不要再跟代码**。

     eslint: [`no-unreachable`](http://eslint.org/docs/rules/no-unreachable)

     ```js
     function doSomething () {
       return true
       console.log('never called')     // ✗ avoid
     }
     ```

  

+ **不允许有连续多行空行**。

     eslint: [`no-multiple-empty-lines`](http://eslint.org/docs/rules/no-multiple-empty-lines)

     ```js
     // ✓ ok
     var value = 'hello world'
     console.log(value)
     ```

     ```js
     // ✗ avoid
     var value = 'hello world'
      
      
     console.log(value)
     ```

  

+ **不要使用 `eval()`**。

     eslint: [`no-eval`](http://eslint.org/docs/rules/no-eval)

     ```js
     eval( "var result = user." + propName ) // ✗ avoid
     var result = user[propName]             // ✓ ok
     ```

  

+ **注意隐式的 `eval()`**。

     eslint: [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval)

     ```js
     setTimeout("alert('Hello world')")                   // ✗ avoid
     setTimeout(function () { alert('Hello world') })     // ✓ ok
     ```

  

+ **不要随意更改关键字的值**。

     eslint: [`no-shadow-restricted-names`](http://eslint.org/docs/rules/no-shadow-restricted-names)

     ```js
     let undefined = 'value'     // ✗ avoid
     ```

  

+ **代码块中避免多余留白**。

     eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks)

     ```js
     if (user) {
                                 // ✗ avoid
       const name = getName()
      
     }
      
     if (user) {
       const name = getName()    // ✓ ok
     }
     ```

  

+ **使用 `__dirname` 和 `__filename` 时尽量避免使用字符串拼接**。

     eslint: [`no-path-concat`](http://eslint.org/docs/rules/no-path-concat)

     ```js
     const pathToFile = __dirname + '/app.js'            // ✗ avoid
     const pathToFile = path.join(__dirname, 'app.js')   // ✓ ok
     ```

  

+ **禁止使用原始包装器**。

     eslint: [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers)

     ```js
  const message = new String('hello')   	// ✗ avoid
  var numberObject = new Number(33)		// ✗ avoid
  var booleanObject = new Boolean(false)	// ✗ avoid
  ```






#### 19. 一些必要的要求

+ **文件末尾留一空行**。

     eslint: [`eol-last`](http://eslint.org/docs/rules/eol-last)

  

+ **`yield \*` 中的 `\*` 前后都要有空格**。

     eslint: [`yield-star-spacing`](http://eslint.org/docs/rules/yield-star-spacing)

     ```javascript
     yield* increment()    // ✗ avoid
     yield * increment()   // ✓ ok
     ```

  

+ **用合法的字符串跟 `typeof` 进行比较操作**。

     eslint: [`valid-typeof`](http://eslint.org/docs/rules/valid-typeof)

     ```javascript
     typeof name === 'undefimed'     // ✗ avoid
     typeof name === 'undefined'     // ✓ ok
     ```




 #### 20. 关于分号

 - 不要使用分号。 (参见：[1](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)，[2](http://inimino.org/~inimino/blog/avascript_semicolons)，[3](https://www.youtube.com/watch?v=gsfbh17Ax9I))

   eslint: [`semi`](http://eslint.org/docs/rules/semi)

   ```js
   window.alert('hi')   // ✓ ok
   window.alert('hi');  // ✗ avoid
   ```

   

 - 不要使用 `(`, `[`, or ``` 等作为一行的开始。在没有分号的情况下代码压缩后会导致报错，而坚持这一规范则可避免出错。

   eslint: [`no-unexpected-multiline`](http://eslint.org/docs/rules/no-unexpected-multiline)

   ```js
   // ✓ ok
   ;(function () {
     window.alert('ok')
   }())
    
   // ✗ avoid
   (function () {
     window.alert('ok')
   }())
   ```

   ```js
   // ✓ ok
   ;[1, 2, 3].forEach(bar)
    
   // ✗ avoid
   [1, 2, 3].forEach(bar)
   ```

   ```js
   // ✓ ok
   ;`hello`.indexOf('o')
    
   // ✗ avoid
   `hello`.indexOf('o')
   ```

   备注：上面的写法只能说聪明过头了。

   相比更加可读易懂的代码，那些看似投巧的写法是不可取的。

   譬如：

   ```
   ;[1, 2, 3].forEach(bar)
   ```

   建议的写法是：

   ```
   var nums = [1, 2, 3]
   nums.forEach(bar)
   ```





## 参考文献

《JavaScript Standard Style(JavaScript 标准编码风格)》: https://standardjs.com/

《Airbnb JavaScript 编码规范(涵盖 ECMAScript 6+)》: https://www.html.cn/archives/8345

