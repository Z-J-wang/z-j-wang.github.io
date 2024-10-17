# 自定义弹窗（@CustomDialog）



## 要点一：必须定义一个`CustomDialogController`类型的成员变量

`@CustomDialog`组件必须定义一个`CustomDialogController`类型的成员变量。该成员变量有如下特点：

1. 不需要实例化
2. 在调用时不用传参

### 不需要实例化

`CustomDialogController`成员变量不用初始化，因为就算成员变量，一样会在父组件调用时被覆盖。

不初始化写法：

```tsx
// 不实例化写法
@CustomDialog
export struct CustomDialogExample {
  controller: CustomDialogController

  build() {}
}
```

初始化写法：

```tsx
@CustomDialog
export struct CustomDialogExample {
  controller: CustomDialogExample = new CustomDialogController({
    builder: CustomDialogExample()
  })

  build() {}
}
```

> 注意： 初始化时，`builder`的值应当是当前组件本身

### 在调用时不用传参

和普通组件不一样，在父组件调用自定义弹窗组件时，不需要传递为`CustomDialogController`类型的初成员变量传递参数。

普通组件：

```tsx
@Component
struct MyComponent {
  private countDownFrom: number = 0;
  private color: Color = Color.Blue;

  build() {
  }
}

@Entry
@Component
struct ParentComponent {
  private someColor: Color = Color.Pink;

  build() {
    Column() {
      // 创建MyComponent实例，并将创建MyComponent成员变量countDownFrom初始化为10，将成员变量color初始化为this.someColor
      MyComponent({ countDownFrom: 10, color: this.someColor })
    }
  }
}
```

自定义弹窗组件：

```tsx
 @Entry
 @Component
 struct CustomDialogUser {
   dialogController: CustomDialogController = new CustomDialogController({
     // 自定义弹窗组件不需要设置
     builder: CustomDialogExample(),
   })
 }
```

> 注意：父组件实例化自动定义弹窗组件时，会自动给`CustomDialogController`类型的初成员变量赋值，该值为父组件的`CustomDialogController`实例。该行为会覆盖已存在的值。

