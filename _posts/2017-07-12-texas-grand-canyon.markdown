---
layout: post
title: "Texas: Grand Canyon"
img: canyon.jpg # Add image post (optional)
date: 2017-07-12 12:54:00 +0300
description: You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
tag: [Travel, Texas, Canyon]
---
同步、异步、回调，本身没有明确分的这么细致，最近在做面试题时候，发现这个，很多时候知道具体执行顺序，但原理不甚了了。

经过查阅资料，归纳整理，得出这句话：

同步优先、异步靠边、回调垫底（读起来好像不顺）

用公式表达就是：

同步 >= 异步 >= 回调

这口诀有什么用呢？没错，用来对付面试的。

有一道经典的面试题：

      for (var i = 0; i < 5; i++) {
          setTimeout(function() {
              console.log('i: ',i);
          }, 1000);
      }

      console.log(i);

      //输出
      5
      i:  5
      i:  5
      i:  5
      i:  5
      i:  5

好，开始：同步 => 异步 => 回调

1、for循环和循环体外部的console是同步的，所以先执行for循环，再执行外部的console.log。（同步优先）

2、for循环里面有一个setTimeout回调，他是垫底的存在，只能最后执行。（回调垫底）

那么，为什么最先输出的是5呢？

非常好理解，for循环先执行，但是不会给setTimeout传参（回调垫底），等for循环执行完，就会给setTimeout传参，而外部的console打印出5是因为for循环执行完成了。

知乎有大神讲解过 80% 应聘者都不及格的 JS 面试题 ，就是以这个例子为开头的。但是没有说为什么setTimeout是输出5个5。

这里涉及到JavaScript执行栈和消息队列的概念，概念的详细解释可以看阮老师的 JavaScript 运行机制详解:再谈Event Loop – 阮一峰的网络日志，或者看 并发模型与Event Loop




我拿这个例子做一下讲解，JavaScript单线程如何处理回调呢？JavaScript同步的代码是在堆栈中顺序执行的，而setTimeout回调会先放到消息队列，for循环每执行一次，就会放一个setTimeout到消息队列排队等候，当同步的代码执行完了，再去调用消息队列的回调方法。

在这个经典例子中，也就是说，先执行for循环，按顺序放了5个setTimeout回调到消息队列，然后for循环结束，下面还有一个同步的console，执行完console之后，堆栈中已经没有同步的代码了，就去消息队列找，发现找到了5个setTimeout，注意setTimeout是有顺序的。

那么，setTimeout既然在最后才执行，那么他输出的i又是什么呢？答案就是5。。有人说不是废话吗？

现在告诉大家为什么setTimeout全都是5，JavaScript在把setTimeout放到消息队列的过程中，循环的i是不会及时保存进去的，相当于你写了一个异步的方法，但是ajax的结果还没返回，只能等到返回之后才能传参到异步函数中。
在这里也是一样，for循环结束之后，因为i是用var定义的，所以var是全局变量（这里没有函数，如果有就是函数内部的变量），这个时候的i是5，从外部的console输出结果就可以知道。那么当执行setTimeout的时候，由于全局变量的i已经是5了，所以传入setTimeout中的每个参数都是5。很多人都会以为setTimeout里面的i是for循环过程中的i，这种理解是不对的。
