---
title: "只连接Notes的测试文章"
date: 2025-08-26T22:47:00+08:00
author: "Test Author"
description: "测试只连接Notes板块时backlinks的显示"
categories: ["Notes", "Testing"]
tags: ["notes-only", "single-section"]
ShowToc: true
---

## 单一Notes连接测试

这篇文章只连接Notes板块的文章，用于测试动态显示逻辑。

## 引用Notes板块文章

只引用笔记类文章：

- {{< backlink "til-categories-notes-test" "Categories功能笔记" >}}
- {{< backlink "til-backlinks-notes-test" "Backlinks功能笔记" >}}

## 预期效果

根据动态显示逻辑，由于这篇文章只连接了Notes板块的文章，所以在页面底部应该只显示：

**Notes部分** - 显示相关的笔记文章
- Outgoing: Categories功能笔记、Backlinks功能笔记

而不会显示Posts部分，即使有related posts存在。

## 测试意义

这个测试验证了我们的动态显示逻辑是否按预期工作：
- 如果同时连接Posts和Notes → 两个板块都显示
- 如果只连接Notes → 只显示Notes板块
- 如果只连接Posts → 只显示Posts板块
