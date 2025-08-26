---
title: "笔记：Backlinks功能集成记录"
date: 2025-08-26T22:42:00+08:00
author: "Test Author"
description: "Notes类型文章的Backlinks功能测试"
categories: ["Hugo", "Notes"]
tags: ["backlinks", "notes", "til-integration"]
ShowToc: true
---

## Backlinks集成记录

这是一篇Notes类型的文章，用于测试TIL主题的Backlinks功能在notes section中的表现。

### 功能特性

本笔记记录了以下要点：

- Backlinks在不同section中的表现差异
- Incoming/Outgoing链接的展示方式
- 与PaperMod主题的兼容性测试

### 引用其他文章

建立与其他文章的连接：

- 主要测试文章：{{< backlink "til-backlinks-test" "Backlinks集成测试" >}}
- 分类功能测试：{{< backlink "til-categories-test" "Categories功能演示" >}}

### 技术要点

#### 实现机制

1. 使用Hugo的Scratch功能存储链接关系
2. 通过shortcode建立双向链接
3. 在页面底部展示相关链接

#### 样式集成

- 保持与PaperMod主题的视觉一致性
- 支持暗色模式
- 响应式设计适配移动设备

### 测试结果

预期在页面底部看到：

- Posts部分的相关文章
- Notes部分的相关笔记
- 每个部分按Incoming、Outgoing、Related分类显示

### 代码示例

```hugo
{{</* backlink "article-slug" "Display Text" */>}}
```

这个shortcode会自动：
- 在目标页面的incoming列表中添加当前页面
- 在当前页面的outgoing列表中添加目标页面
- 创建可点击的链接
