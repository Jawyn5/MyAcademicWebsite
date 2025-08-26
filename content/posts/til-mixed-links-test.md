---
title: "混合链接测试：连接Posts和Notes"
date: 2025-08-26T22:45:00+08:00
author: "Test Author" 
description: "测试同时连接Posts和Notes板块的backlinks显示"
categories: ["Hugo", "TIL", "Testing"]
tags: ["mixed-links", "posts", "notes"]
ShowToc: true
---

## 混合链接测试

这篇文章用于测试当一个页面同时链接到Posts和Notes板块的文章时，backlinks的显示情况。

## 引用Posts板块文章

引用博客文章：
- {{< backlink "til-categories-test" "Categories功能测试" >}}
- {{< backlink "til-backlinks-test" "Backlinks功能测试" >}}

## 引用Notes板块文章

引用笔记文章：
- {{< backlink "til-categories-notes-test" "Categories功能笔记" >}}
- {{< backlink "til-backlinks-notes-test" "Backlinks功能笔记" >}}

## 预期效果

根据新的动态显示逻辑，由于这篇文章同时连接了Posts和Notes板块的文章，所以在页面底部应该能看到：

1. **Posts部分** - 显示相关的博客文章
   - Outgoing: Categories功能测试、Backlinks功能测试
   
2. **Notes部分** - 显示相关的笔记文章
   - Outgoing: Categories功能笔记、Backlinks功能笔记

## 与TIL主题的对比

在TIL主题中，如果一个页面同时连接了posts和notes，graph network会显示所有连接，backlinks部分也会相应地显示两个板块的内容。

这种设计让用户能够清楚地看到知识之间的跨领域连接。
